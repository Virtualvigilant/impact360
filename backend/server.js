require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const crypto = require('crypto');
const cors = require('cors');

const app = express();

// Enable CORS for your frontend
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

// PesaPal API Base URLs
const PESAPAL_BASE_URL = process.env.PESAPAL_ENVIRONMENT === 'sandbox'
  ? 'https://cybqa.pesapal.com/pesapalv3'
  : 'https://pay.pesapal.com/v3';

// Store access token and IPN ID in memory (in production, use Redis or database)
let accessToken = null;
let tokenExpiry = null;
let registeredIpnId = null;


// ===== Get PesaPal Access Token =====
async function getAccessToken() {
  // Return cached token if still valid
  if (accessToken && tokenExpiry && Date.now() < tokenExpiry) {
    console.log('Using cached access token');
    return accessToken;
  }

  try {
    console.log('Requesting new access token...');
    console.log('Using Consumer Key:', process.env.PESAPAL_CONSUMER_KEY?.substring(0, 10) + '...');
    
    const response = await axios.post(
      `${PESAPAL_BASE_URL}/api/Auth/RequestToken`,
      {
        consumer_key: process.env.PESAPAL_CONSUMER_KEY,
        consumer_secret: process.env.PESAPAL_CONSUMER_SECRET
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    );

    // Log the full response to see what PesaPal returns
    console.log('Full PesaPal token response:', JSON.stringify(response.data, null, 2));

    // Try different possible token fields
    accessToken = response.data.token || response.data.access_token || response.data.Token;
    
    if (!accessToken) {
      console.error('❌ No token found in response. Response keys:', Object.keys(response.data));
      throw new Error('Token not found in PesaPal response');
    }

    // Token typically expires in 5 minutes, cache for 4 minutes
    tokenExpiry = Date.now() + (4 * 60 * 1000);
    
    console.log('✅ New access token obtained successfully');
    console.log('Token preview:', accessToken?.substring(0, 20) + '...');
    
    return accessToken;
  } catch (error) {
    console.error('❌ Error getting access token:', error.response?.data || error.message);
    throw new Error('Failed to authenticate with PesaPal');
  }
}

// ===== Register IPN URL (run once) =====
async function registerIPN() {
  // Return cached IPN ID if available
  if (registeredIpnId) {
    return registeredIpnId;
  }

  try {
    const token = await getAccessToken();
    
    const response = await axios.post(
      `${PESAPAL_BASE_URL}/api/URLSetup/RegisterIPN`,
      {
        url: process.env.PESAPAL_IPN_URL,
        ipn_notification_type: 'GET'
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    );

    registeredIpnId = response.data.ipn_id;
    console.log('✅ IPN registered successfully!');
    console.log('📌 IPN ID:', registeredIpnId);
    console.log('💡 Add this to your .env file: PESAPAL_IPN_ID=' + registeredIpnId);
    
    return registeredIpnId;
  } catch (error) {
    // If IPN already registered, try to get existing IPNs
    if (error.response?.status === 409 || error.response?.data?.message?.includes('already registered')) {
      console.log('⚠️  IPN URL already registered, fetching existing IPN...');
      return await getExistingIPN();
    }
    console.error('❌ Error registering IPN:', error.response?.data || error.message);
    throw error;
  }
}

// ===== Get existing IPN URLs =====
async function getExistingIPN() {
  try {
    const token = await getAccessToken();
    
    const response = await axios.get(
      `${PESAPAL_BASE_URL}/api/URLSetup/GetIpnList`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      }
    );

    // Find IPN matching our URL
    const ipnList = response.data;
    const matchingIpn = ipnList.find(ipn => ipn.url === process.env.PESAPAL_IPN_URL);
    
    if (matchingIpn) {
      registeredIpnId = matchingIpn.ipn_id;
      console.log('✅ Found existing IPN ID:', registeredIpnId);
      console.log('💡 Add this to your .env file: PESAPAL_IPN_ID=' + registeredIpnId);
      return registeredIpnId;
    } else {
      console.log('Available IPNs:', ipnList);
      throw new Error('Could not find matching IPN URL');
    }
  } catch (error) {
    console.error('❌ Error fetching IPN list:', error.response?.data || error.message);
    throw error;
  }
}

// ===== Root route =====
app.get('/', (req, res) => {
  res.send('PesaPal Integration Server Running!');
});

// ===== IPN Listener route =====
app.get('/pesapal-ipn', async (req, res) => {
  console.log('PesaPal IPN received:', req.query);
  
  const { OrderTrackingId, OrderMerchantReference } = req.query;

  if (!OrderTrackingId) {
    return res.status(400).send('Missing OrderTrackingId');
  }

  try {
    // Get transaction status
    const token = await getAccessToken();
    const statusResponse = await axios.get(
      `${PESAPAL_BASE_URL}/api/Transactions/GetTransactionStatus?orderTrackingId=${OrderTrackingId}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      }
    );

    console.log('Transaction status:', statusResponse.data);
    
    // TODO: Update your database with the payment status
    // statusResponse.data.payment_status_description can be:
    // - "Completed" - payment successful
    // - "Failed" - payment failed
    // - "Invalid" - invalid transaction
    
    res.status(200).send('OK');
  } catch (error) {
    console.error('Error checking transaction status:', error.response?.data || error.message);
    res.status(500).send('Error processing IPN');
  }
});

// ===== Payment request route =====
app.post('/api/create-payment', async (req, res) => {
  const { plan, amount, period, fullName, phone, email } = req.body;

  // Validate phone number format for Kenya
  let formattedPhone = phone.replace(/\s+/g, '');
  if (formattedPhone.startsWith('0')) {
    formattedPhone = '254' + formattedPhone.substring(1);
  } else if (!formattedPhone.startsWith('254')) {
    formattedPhone = '254' + formattedPhone;
  }

  // Generate unique merchant reference
  const merchantReference = `IMPACT360_${Date.now()}_${Math.random().toString(36).substring(7)}`;

  try {
    // Get access token
    const token = await getAccessToken();

    // Get or register IPN URL (will use cached value if available)
    const ipnId = await registerIPN();

    // Create payment order
    const orderData = {
      id: merchantReference,
      currency: 'KES',
      amount: parseFloat(amount),
      description: `Impact360 ${plan} Subscription - ${period}`,
      callback_url: `${process.env.FRONTEND_URL}/payment-callback`,
      notification_id: ipnId,
      billing_address: {
        email_address: email,
        phone_number: formattedPhone,
        country_code: 'KE',
        first_name: fullName.split(' ')[0] || fullName,
        middle_name: '',
        last_name: fullName.split(' ').slice(1).join(' ') || '',
        line_1: '',
        line_2: '',
        city: '',
        state: '',
        postal_code: '',
        zip_code: ''
      }
    };

    console.log('Creating order:', orderData);

    const response = await axios.post(
      `${PESAPAL_BASE_URL}/api/Transactions/SubmitOrderRequest`,
      orderData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    );

    console.log('PesaPal response:', response.data);

    // Return the redirect URL to the frontend
    res.json({
      success: true,
      message: 'Payment initiated successfully',
      data: {
        order_tracking_id: response.data.order_tracking_id,
        merchant_reference: response.data.merchant_reference,
        redirect_url: response.data.redirect_url,
        // The frontend should redirect user to this URL
        // PesaPal will show payment options including M-Pesa STK Push
      }
    });

  } catch (error) {
    console.error('Payment creation error:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: error.response?.data?.message || 'Failed to create payment',
      error: error.response?.data || error.message
    });
  }
});

// ===== Check payment status route =====
app.get('/api/payment-status/:orderTrackingId', async (req, res) => {
  const { orderTrackingId } = req.params;

  try {
    const token = await getAccessToken();
    
    const response = await axios.get(
      `${PESAPAL_BASE_URL}/api/Transactions/GetTransactionStatus?orderTrackingId=${orderTrackingId}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      }
    );

    res.json({
      success: true,
      data: response.data
    });
  } catch (error) {
    console.error('Status check error:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to check payment status',
      error: error.response?.data || error.message
    });
  }
});

// ===== Start server =====
app.listen(PORT, () => {
  console.log('🚀 ========================================');
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.PESAPAL_ENVIRONMENT || 'sandbox'}`);
  console.log(`📡 IPN URL: ${process.env.PESAPAL_IPN_URL}`);
  console.log('🚀 ========================================');
  console.log('💡 Make sure your ngrok tunnel is running!');
  console.log('💡 Test endpoint: http://localhost:' + PORT);
  console.log('🚀 ========================================');
});