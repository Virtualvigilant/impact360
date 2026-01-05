import React, { useState, useEffect } from 'react';
import { Search, Check, X, Eye, Download, Mail, Clock, CheckCircle, XCircle } from 'lucide-react';

// Simulated backend API calls
const api = {
  async getSubmissions() {
    // Replace with actual API call
    return JSON.parse(localStorage.getItem('submissions') || '[]');
  },
  
  async approveSubmission(id, ticketData) {
    const submissions = JSON.parse(localStorage.getItem('submissions') || '[]');
    const submission = submissions.find(s => s.id === id);
    if (submission) {
      submission.status = 'approved';
      submission.ticketId = ticketData.ticketId;
      submission.approvedAt = new Date().toISOString();
      submission.qrCode = ticketData.qrCode;
      localStorage.setItem('submissions', JSON.stringify(submissions));
      
      // Log to audit trail
      this.addAuditLog({
        action: 'APPROVED',
        submissionId: id,
        ticketId: ticketData.ticketId,
        timestamp: new Date().toISOString()
      });
      
      // Send email notification
      await this.sendEmail(submission.email, 'approved', ticketData);
    }
  },
  
  async rejectSubmission(id, reason) {
    const submissions = JSON.parse(localStorage.getItem('submissions') || '[]');
    const submission = submissions.find(s => s.id === id);
    if (submission) {
      submission.status = 'rejected';
      submission.rejectedAt = new Date().toISOString();
      submission.rejectionReason = reason;
      localStorage.setItem('submissions', JSON.stringify(submissions));
      
      // Log to audit trail
      this.addAuditLog({
        action: 'REJECTED',
        submissionId: id,
        reason,
        timestamp: new Date().toISOString()
      });
      
      // Send email notification
      await this.sendEmail(submission.email, 'rejected', { reason });
    }
  },
  
  addAuditLog(log) {
    const logs = JSON.parse(localStorage.getItem('auditLogs') || '[]');
    logs.push(log);
    localStorage.setItem('auditLogs', JSON.stringify(logs));
  },
  
  async sendEmail(email, type, data) {
    // Replace with actual email API (SendGrid, AWS SES, etc.)
    console.log(`Sending ${type} email to ${email}`, data);
    
    // Simulated email sending
    return new Promise(resolve => {
      setTimeout(() => {
        console.log('Email sent successfully');
        resolve(true);
      }, 1000);
    });
  }
};

// Generate unique ticket ID
const generateTicketId = () => {
  const prefix = 'TKT';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
};

// Generate QR code data URL
const generateQRCode = (data) => {
  // In production, use a proper QR code library
  // For demo, return a placeholder
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(data)}`;
};

// Generate PDF ticket (simulation)
const generatePDFTicket = (ticketData) => {
  // In production, use jsPDF or similar library
  // This is a simulation
  const pdfContent = `
    Event Ticket
    Ticket ID: ${ticketData.ticketId}
    Name: ${ticketData.name}
    Email: ${ticketData.email}
    Event: ${ticketData.eventName || 'Main Event'}
    Date: ${new Date().toLocaleDateString()}
    
    QR Code: ${ticketData.qrCode}
  `;
  
  const blob = new Blob([pdfContent], { type: 'application/pdf' });
  return URL.createObjectURL(blob);
};

const AdminDashboard = () => {
  const [submissions, setSubmissions] = useState([]);
  const [filter, setFilter] = useState('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    const data = await api.getSubmissions();
    setSubmissions(data);
  };

  const handleApprove = async (submission) => {
    setLoading(true);
    
    const ticketId = generateTicketId();
    const qrData = JSON.stringify({
      ticketId,
      name: submission.name,
      email: submission.email,
      timestamp: Date.now()
    });
    const qrCode = generateQRCode(qrData);
    
    const ticketData = {
      ticketId,
      qrCode,
      name: submission.name,
      email: submission.email,
      mpesaCode: submission.mpesaCode
    };
    
    // Generate PDF
    const pdfUrl = generatePDFTicket(ticketData);
    
    await api.approveSubmission(submission.id, ticketData);
    await loadSubmissions();
    
    setLoading(false);
    alert(`Ticket approved! Ticket ID: ${ticketId}\nEmail sent to ${submission.email}`);
  };

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      alert('Please provide a rejection reason');
      return;
    }
    
    setLoading(true);
    await api.rejectSubmission(selectedSubmission.id, rejectionReason);
    await loadSubmissions();
    
    setShowRejectModal(false);
    setRejectionReason('');
    setSelectedSubmission(null);
    setLoading(false);
    
    alert('Submission rejected and user notified');
  };

  const filteredSubmissions = submissions
    .filter(s => filter === 'all' || s.status === filter)
    .filter(s => 
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.mpesaCode.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const stats = {
    pending: submissions.filter(s => s.status === 'pending').length,
    approved: submissions.filter(s => s.status === 'approved').length,
    rejected: submissions.filter(s => s.status === 'rejected').length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage ticket submissions and payment verification</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pending</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <Clock className="w-12 h-12 text-yellow-600 opacity-20" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Approved</p>
                <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
              </div>
              <CheckCircle className="w-12 h-12 text-green-600 opacity-20" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Rejected</p>
                <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
              </div>
              <XCircle className="w-12 h-12 text-red-600 opacity-20" />
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, email, or M-Pesa code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('pending')}
                className={`px-4 py-2 rounded-lg font-medium ${
                  filter === 'pending'
                    ? 'bg-yellow-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setFilter('approved')}
                className={`px-4 py-2 rounded-lg font-medium ${
                  filter === 'approved'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Approved
              </button>
              <button
                onClick={() => setFilter('rejected')}
                className={`px-4 py-2 rounded-lg font-medium ${
                  filter === 'rejected'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Rejected
              </button>
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium ${
                  filter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All
              </button>
            </div>
          </div>
        </div>

        {/* Submissions Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">M-Pesa Code</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submitted</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredSubmissions.map((submission) => (
                  <tr key={submission.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{submission.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{submission.email}</td>
                    <td className="px-6 py-4 text-sm font-mono text-gray-900">{submission.mpesaCode}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">KES {submission.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        submission.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        submission.status === 'approved' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {submission.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(submission.submittedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedSubmission(submission)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        
                        {submission.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleApprove(submission)}
                              disabled={loading}
                              className="p-2 text-green-600 hover:bg-green-50 rounded disabled:opacity-50"
                              title="Approve"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedSubmission(submission);
                                setShowRejectModal(true);
                              }}
                              disabled={loading}
                              className="p-2 text-red-600 hover:bg-red-50 rounded disabled:opacity-50"
                              title="Reject"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        
                        {submission.status === 'approved' && (
                          <button
                            className="p-2 text-purple-600 hover:bg-purple-50 rounded"
                            title="Download Ticket"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredSubmissions.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No submissions found
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-bold mb-4">Reject Submission</h3>
            <p className="text-gray-600 mb-4">
              Please provide a reason for rejecting this submission. The user will be notified.
            </p>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Enter rejection reason..."
              className="w-full border border-gray-300 rounded-lg p-3 mb-4 min-h-24"
            />
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectionReason('');
                }}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                disabled={loading || !rejectionReason.trim()}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
              >
                Reject Submission
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {selectedSubmission && !showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-bold">Submission Details</h3>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Name</label>
                <p className="text-lg">{selectedSubmission.name}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Email</label>
                <p className="text-lg">{selectedSubmission.email}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Phone</label>
                <p className="text-lg">{selectedSubmission.phone}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">M-Pesa Transaction Code</label>
                <p className="text-lg font-mono bg-gray-100 p-2 rounded">{selectedSubmission.mpesaCode}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Amount Paid</label>
                <p className="text-lg">KES {selectedSubmission.amount}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">M-Pesa Message</label>
                <p className="text-sm bg-gray-100 p-3 rounded whitespace-pre-wrap">{selectedSubmission.mpesaMessage}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Status</label>
                <p>
                  <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                    selectedSubmission.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    selectedSubmission.status === 'approved' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {selectedSubmission.status.toUpperCase()}
                  </span>
                </p>
              </div>
              
              {selectedSubmission.status === 'approved' && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Ticket ID</label>
                  <p className="text-lg font-mono">{selectedSubmission.ticketId}</p>
                </div>
              )}
              
              {selectedSubmission.status === 'rejected' && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Rejection Reason</label>
                  <p className="text-sm bg-red-50 p-3 rounded">{selectedSubmission.rejectionReason}</p>
                </div>
              )}
              
              <div>
                <label className="text-sm font-medium text-gray-500">Submitted At</label>
                <p className="text-lg">{new Date(selectedSubmission.submittedAt).toLocaleString()}</p>
              </div>
            </div>
            
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setSelectedSubmission(null)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
              
              {selectedSubmission.status === 'pending' && (
                <>
                  <button
                    onClick={() => {
                      handleApprove(selectedSubmission);
                      setSelectedSubmission(null);
                    }}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    <Check className="w-4 h-4 inline mr-2" />
                    Approve
                  </button>
                  <button
                    onClick={() => setShowRejectModal(true)}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    <X className="w-4 h-4 inline mr-2" />
                    Reject
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;