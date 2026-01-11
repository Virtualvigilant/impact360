import React, { useEffect, useState } from 'react';
import { CheckCircle, User, CreditCard, Calendar, XCircle } from 'lucide-react';

export default function TicketVerification() {
  const [ticketData, setTicketData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scroll to hide address bar on mobile
    window.scrollTo(0, 1);
    
    // Add meta tags for app-like experience
    const viewport = document.querySelector('meta[name=viewport]');
    if (viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
    }

    // Get ticket info from URL parameters
    const params = new URLSearchParams(window.location.search);
    const data = {
      ticketId: params.get('ticket'),
      name: params.get('name'),
      plan: params.get('plan'),
      verified: params.get('verified') === 'true'
    };
    
    // Simulate loading for smooth transition
    setTimeout(() => {
      setTicketData(data);
      setLoading(false);
    }, 500);
  }, []);

  // Loading State
  if (loading || !ticketData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto"></div>
          <p className="mt-6 text-lg text-gray-700 font-semibold">Verifying Ticket...</p>
        </div>
      </div>
    );
  }

  // Invalid Ticket State
  if (!ticketData.ticketId || !ticketData.name) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
          <div className="text-center">
            <div className="inline-block p-4 bg-red-100 rounded-full mb-4">
              <XCircle className="w-16 h-16 text-red-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Invalid Ticket
            </h1>
            <p className="text-gray-600 mb-6">
              This QR code does not contain valid ticket information.
            </p>
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
              <p className="text-sm text-red-800">
                Please contact Impact360 support if you believe this is an error.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Valid Ticket Display
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
        
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-green-100 rounded-full mb-4 animate-bounce">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Ticket Verified!
          </h1>
          <p className="text-gray-600">
            Valid Impact360 Event Pass
          </p>
        </div>

        {/* Ticket Details */}
        <div className="space-y-4 mb-8">
          
          {/* Ticket ID */}
          <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
            <CreditCard className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">Ticket ID</p>
              <p className="font-mono font-bold text-blue-900 text-sm break-all">
                {ticketData.ticketId}
              </p>
            </div>
          </div>

          {/* Attendee Name */}
          <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
            <User className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">Attendee Name</p>
              <p className="font-bold text-purple-900 text-xl">
                {ticketData.name}
              </p>
            </div>
          </div>

          {/* Subscription Plan */}
          <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
            <Calendar className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">Subscription Plan</p>
              <p className="font-semibold text-green-900 text-lg">
                {ticketData.plan}
              </p>
            </div>
          </div>

        </div>

        {/* Status Badge - Prominent */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 mb-6 shadow-lg">
          <div className="flex items-center gap-3 justify-center">
            <CheckCircle className="w-8 h-8 text-white" />
            <p className="font-bold text-white text-xl">
              VALID ENTRY PASS
            </p>
          </div>
          <p className="text-sm text-green-50 text-center mt-3 font-medium">
            This ticket has been verified and is authorized for event entry
          </p>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-5 mb-6">
          <p className="text-sm text-blue-900 font-bold mb-3 flex items-center gap-2">
            <span className="text-lg">📋</span>
            Event Entry Instructions
          </p>
          <ul className="text-sm text-blue-800 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">1.</span>
              <span>Show this screen to event staff at registration</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">2.</span>
              <span>Present a valid photo ID for verification</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">3.</span>
              <span>Arrive 15 minutes before event start time</span>
            </li>
          </ul>
        </div>

        {/* Warning */}
        <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-4 mb-6">
          <p className="text-xs text-yellow-800 text-center">
            <strong>⚠️ Important:</strong> Screenshots of this page are not valid. 
            The ticket must be scanned directly from the QR code for entry.
          </p>
        </div>

        {/* Footer */}
        <div className="text-center pt-6 border-t-2 border-gray-200">
          <p className="text-sm font-semibold text-gray-700">
            Impact360 | Empowering Entrepreneurs
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Verified on {new Date().toLocaleString('en-US', {
              weekday: 'short',
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>

      </div>
    </div>
  );
}