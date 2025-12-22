require('dotenv').config();
const axios = require('axios');

async function testAuth() {
  const consumerKey = process.env.PESAPAL_CONSUMER_KEY;
  const consumerSecret = process.env.PESAPAL_CONSUMER_SECRET;

  console.log('=== Testing PesaPal Authentication ===');
  console.log('Consumer Key length:', consumerKey?.length);
  console.log('Consumer Secret length:', consumerSecret?.length);
  console.log('Consumer Key preview:', consumerKey?.substring(0, 15) + '...');
  console.log('Consumer Secret preview:', consumerSecret?.substring(0, 15) + '...');
  console.log('');

  // Check for common issues
  if (consumerKey?.includes(' ')) console.warn('⚠️  WARNING: Consumer Key contains spaces!');
  if (consumerSecret?.includes(' ')) console.warn('⚠️  WARNING: Consumer Secret contains spaces!');
  if (consumerKey?.includes('"')) console.warn('⚠️  WARNING: Consumer Key contains quotes!');
  if (consumerSecret?.includes('"')) console.warn('⚠️  WARNING: Consumer Secret contains quotes!');
  
  console.log('Making request to PesaPal...');

  try {
    const response = await axios.post(
      'https://cybqa.pesapal.com/pesapalv3/api/Auth/RequestToken',
      {
        consumer_key: consumerKey,
        consumer_secret: consumerSecret
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    );

    console.log('✅ SUCCESS!');
    console.log('Full Response:', JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.log('❌ FAILED!');
    console.log('Error Response:', JSON.stringify(error.response?.data, null, 2));
    console.log('');
    console.log('This means your Consumer Key or Secret is incorrect.');
    console.log('Please double-check the email from PesaPal and copy them again.');
  }
}

testAuth();
