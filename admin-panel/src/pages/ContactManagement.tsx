import React, { useEffect, useState } from 'react';
import { Mail, Phone, Building, Calendar, Eye, Download, Search, Filter, X } from 'lucide-react';
import apiService from '../services/api';

interface ContactForm {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  serviceType: string;
  projectDescription: string;
  budget: string;
  timeline: string;
  submittedAt: string;
  status: 'new' | 'reviewed' | 'contacted' | 'archived';
}

const ContactManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [contacts, setContacts] = useState<ContactForm[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedContact, setSelectedContact] = useState<ContactForm | null>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await apiService.listContacts();
        if (res.success) {
          const mapped: ContactForm[] = res.data.map((row: any) => ({
            id: row.id,
            firstName: row.first_name || '',
            lastName: row.last_name || '',
            email: row.email || '',
            phone: row.phone || '',
            company: row.company || '',
            position: row.position || '',
            serviceType: row.service_type || '',
            projectDescription: row.project_description || '',
            budget: row.budget || '',
            timeline: row.timeline || '',
            submittedAt: row.submitted_at,
            status: (row.status || 'new') as ContactForm['status']
          }));
          setContacts(mapped);
        }
      } catch (e: any) {
        setError(e.message || 'Failed to load contacts');
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || contact.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleExportCSV = () => {
    // Create CSV headers
    const headers = [
      'First Name',
      'Last Name',
      'Email',
      'Phone',
      'Company',
      'Position',
      'Service Type',
      'Project Description',
      'Budget',
      'Timeline',
      'Submitted Date',
      'Status'
    ];

    // Create CSV rows
    const rows = filteredContacts.map(contact => [
      contact.firstName,
      contact.lastName,
      contact.email,
      contact.phone,
      contact.company,
      contact.position,
      contact.serviceType,
      `"${contact.projectDescription.replace(/"/g, '""')}"`, // Escape quotes for CSV
      contact.budget,
      contact.timeline,
      new Date(contact.submittedAt).toLocaleDateString(),
      contact.status
    ]);

    // Combine headers and rows
    const csvContent = [headers, ...rows]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    // Create and download the file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', `contacts_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Show success message
    alert(`Successfully exported ${filteredContacts.length} contact${filteredContacts.length !== 1 ? 's' : ''} to CSV file.`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-red-100 text-red-800';
      case 'reviewed': return 'bg-yellow-100 text-yellow-800';
      case 'contacted': return 'bg-blue-100 text-blue-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Contact Management</h1>
        <button
          onClick={handleExportCSV}
          className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          <Download className="w-5 h-5 mr-2" />
          Export CSV
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search contacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="reviewed">Reviewed</option>
              <option value="contacted">Contacted</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>
      </div>

      {/* Contact Forms List */}
      <div className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">{error}</div>
        )}
        {loading && (
          <div className="p-6 text-gray-600">Loading contacts...</div>
        )}
        {filteredContacts.map((contact) => (
          <div key={contact.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-lg">
                    {contact.firstName[0]}{contact.lastName[0]}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {contact.firstName} {contact.lastName}
                  </h3>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <Mail className="w-4 h-4 mr-1" />
                    {contact.email}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <Phone className="w-4 h-4 mr-1" />
                    {contact.phone}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <Building className="w-4 h-4 mr-1" />
                    {contact.company} - {contact.position}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(contact.status)}`}>
                  {contact.status}
                </span>
                <button
                  className="p-2 text-gray-400 hover:text-blue-500"
                  onClick={() => setSelectedContact(contact)}
                  title="View details"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <span className="text-sm font-medium text-gray-700">Service Type:</span>
                <p className="text-sm text-gray-600">{contact.serviceType}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">Budget Range:</span>
                <p className="text-sm text-gray-600">{contact.budget}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">Timeline:</span>
                <p className="text-sm text-gray-600">{contact.timeline}</p>
              </div>
            </div>

            <div className="mb-4">
              <span className="text-sm font-medium text-gray-700">Project Description:</span>
              <p className="text-sm text-gray-600 mt-1">{contact.projectDescription}</p>
            </div>

            <div className="flex justify-between items-center text-sm text-gray-500">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                Submitted: {new Date(contact.submittedAt).toLocaleString()}
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                  Mark as Reviewed
                </button>
                <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Mark as Contacted
                </button>
                <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">
                  Send Response
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{contacts.length}</div>
            <div className="text-sm text-gray-600">Total Contacts</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {contacts.filter(c => c.status === 'new').length}
            </div>
            <div className="text-sm text-gray-600">New Contacts</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {contacts.filter(c => c.status === 'contacted').length}
            </div>
            <div className="text-sm text-gray-600">Contacted</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {contacts.reduce((sum, c) => {
                const budget = c.budget.replace(/[$,+]/g, '').split(' - ')[0];
                return sum + (parseInt(budget) || 0);
              }, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total Budget Interest</div>
          </div>
        </div>
      </div>
      {/* Details Modal */}
      {selectedContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="flex items-center justify-between border-b px-5 py-4">
              <h3 className="text-lg font-semibold text-gray-900">Contact Details</h3>
              <button
                onClick={() => setSelectedContact(null)}
                className="text-gray-400 hover:text-gray-600"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="px-5 py-4 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-500">Name</div>
                  <div className="text-sm text-gray-800 font-medium">{selectedContact.firstName} {selectedContact.lastName}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Email</div>
                  <div className="text-sm text-gray-800">{selectedContact.email}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Phone</div>
                  <div className="text-sm text-gray-800">{selectedContact.phone}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Company</div>
                  <div className="text-sm text-gray-800">{selectedContact.company}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Position</div>
                  <div className="text-sm text-gray-800">{selectedContact.position}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Service Type</div>
                  <div className="text-sm text-gray-800">{selectedContact.serviceType}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Budget</div>
                  <div className="text-sm text-gray-800">{selectedContact.budget}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Timeline</div>
                  <div className="text-sm text-gray-800">{selectedContact.timeline}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Submitted At</div>
                  <div className="text-sm text-gray-800">{new Date(selectedContact.submittedAt).toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Status</div>
                  <span className={`inline-block mt-1 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedContact.status)}`}>
                    {selectedContact.status}
                  </span>
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Project Description</div>
                <div className="text-sm text-gray-800 whitespace-pre-wrap break-words bg-gray-50 p-3 rounded">
                  {selectedContact.projectDescription}
                </div>
              </div>
            </div>
            <div className="px-5 py-4 border-t flex justify-end">
              <button
                onClick={() => setSelectedContact(null)}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactManagement;
