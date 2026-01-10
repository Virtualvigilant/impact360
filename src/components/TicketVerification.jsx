import React, { useEffect, useState } from 'react';
import { CheckCircle, User, Mail, Phone, CreditCard, Calendar } from 'lucide-react';

export default function TicketVerification() {
  const [ticketData, setTicketData] = useState(null);

  useEffect(() => {
    // Get ticket info from URL parameters
    const params = new URLSearchParams(window.location.search);
    const data = {
      ticketId: params.get('ticket'),
      name: params.get('name'),
      plan: params.get('plan'),
      verified: params.get('verified') === 'true'
    };
    setTicketData(data);
  }, []);

  if (!ticketData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading ticket...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
        
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-green-100 rounded-full mb-4">
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
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
            <CreditCard className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1">Ticket ID</p>
              <p className="font-mono font-bold text-gray-900 text-sm break-all">
                {ticketData.ticketId}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
            <User className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1">Attendee Name</p>
              <p className="font-bold text-gray-900 text-lg">
                {ticketData.name}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
            <Calendar className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1">Subscription Plan</p>
              <p className="font-semibold text-gray-900">
                {ticketData.plan}
              </p>
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-2 justify-center">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <p className="font-bold text-green-700">
              Valid Entry Pass
            </p>
          </div>
          <p className="text-sm text-green-600 text-center mt-2">
            This ticket has been verified and is valid for event entry
          </p>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-sm text-blue-900 font-semibold mb-2">
            📋 Event Entry Instructions:
          </p>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Show this screen to event staff</li>
            <li>• Bring a valid photo ID</li>
            <li>• Arrive 15 minutes early</li>
          </ul>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Impact360 | Empowering Entrepreneurs
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Scanned on {new Date().toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}