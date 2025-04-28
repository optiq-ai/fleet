import React, { useState, useEffect } from 'react';
import './DocumentManagement.css'; // We'll create this CSS file later if needed
import {
  DocumentStatusChart,
  UpcomingExpirationsChart,
  DocumentTypeChart,
  DocumentComplianceChart
} from '../../components/charts/DocumentCharts'; // Import document charts

// Mock data for documents
const mockDocuments = [
  {
    id: 'DOC001',
    title: 'Vehicle Registration Certificate',
    truckId: 'TRK001',
    type: 'registration',
    issueDate: '2023-05-10',
    expiryDate: '2026-05-10',
    issuedBy: 'Vehicle Registration Authority',
    status: 'valid',
    fileType: 'pdf',
    fileSize: '1.2 MB'
  },
  {
    id: 'DOC002',
    title: 'Insurance Policy',
    truckId: 'TRK001',
    type: 'insurance',
    issueDate: '2025-01-15',
    expiryDate: '2026-01-15',
    issuedBy: 'EuroTruck Insurance Co.',
    status: 'valid',
    fileType: 'pdf',
    fileSize: '2.5 MB'
  },
  {
    id: 'DOC003',
    title: 'Technical Inspection Certificate',
    truckId: 'TRK002',
    type: 'inspection',
    issueDate: '2024-11-20',
    expiryDate: '2025-11-20',
    issuedBy: 'Technical Inspection Center',
    status: 'valid',
    fileType: 'pdf',
    fileSize: '1.8 MB'
  },
  {
    id: 'DOC004',
    title: 'Driver License - John Smith',
    driverId: 'DRV001',
    type: 'license',
    issueDate: '2021-10-15',
    expiryDate: '2026-10-15',
    issuedBy: 'Driver Licensing Authority',
    status: 'valid',
    fileType: 'pdf',
    fileSize: '0.9 MB'
  },
  {
    id: 'DOC005',
    title: 'CMR Consignment Note',
    routeId: 'RT001',
    type: 'transport',
    issueDate: '2025-04-28',
    expiryDate: 'N/A',
    issuedBy: 'Company',
    status: 'active',
    fileType: 'pdf',
    fileSize: '1.1 MB'
  },
  {
    id: 'DOC006',
    title: 'Maintenance Report',
    truckId: 'TRK003',
    type: 'maintenance',
    issueDate: '2025-04-20',
    expiryDate: 'N/A',
    issuedBy: 'Service Center',
    status: 'active',
    fileType: 'pdf',
    fileSize: '3.2 MB'
  }
];

/**
 * DocumentSection component
 * 
 * Section within the comprehensive dashboard for managing truck-related documents.
 * Displays a list of documents, charts, and allows basic operations.
 * 
 * @returns {JSX.Element} DocumentSection component
 */
const DocumentSection = () => {
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [filter, setFilter] = useState({ type: 'all', status: 'all' });

  // Fetch documents data
  useEffect(() => {
    const fetchDocuments = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        setTimeout(() => {
          setDocuments(mockDocuments);
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching documents:', error);
        setIsLoading(false);
      }
    };
    fetchDocuments();
  }, []);

  // Filter documents
  const filteredDocuments = documents.filter(doc => 
    (doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     (doc.truckId && doc.truckId.toLowerCase().includes(searchTerm.toLowerCase())) ||
     (doc.driverId && doc.driverId.toLowerCase().includes(searchTerm.toLowerCase())) ||
     (doc.routeId && doc.routeId.toLowerCase().includes(searchTerm.toLowerCase()))) &&
    (filter.type === 'all' || doc.type === filter.type) &&
    (filter.status === 'all' || doc.status === filter.status)
  );

  // Handle viewing document details
  const handleViewDocument = (document) => {
    setSelectedDocument(document);
    console.log('View document:', document.id);
    // In a real app, this might open a document viewer or download the file
  };

  // Handle uploading a new document (placeholder)
  const handleUploadDocument = () => {
    console.log('Upload new document clicked');
    // In a real app, this would open a file upload dialog
  };

  // Handle editing a document (placeholder)
  const handleEditDocument = (document) => {
    console.log('Edit document clicked:', document.id);
    // In a real app, this would open a form or modal with document data
  };

  // Handle deleting a document (placeholder)
  const handleDeleteDocument = (documentId) => {
    console.log('Delete document clicked:', documentId);
    // In a real app, this would show a confirmation dialog and make an API call
    setDocuments(prevDocuments => prevDocuments.filter(doc => doc.id !== documentId));
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(prevFilter => ({ ...prevFilter, [name]: value }));
  };

  // Get unique document types for filter dropdown
  const documentTypes = [...new Set(mockDocuments.map(doc => doc.type))];

  if (isLoading) {
    return <div className="loading-container">Loading documents...</div>;
  }

  return (
    <div className="document-section">
      <div className="toolbar">
        <div className="search-filters">
          <input 
            type="text"
            placeholder="Search by Title, Truck ID, Driver ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select 
            name="type"
            value={filter.type}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="all">All Types</option>
            {documentTypes.map(type => (
              <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
            ))}
          </select>
          <select 
            name="status"
            value={filter.status}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="all">All Statuses</option>
            <option value="valid">Valid</option>
            <option value="active">Active</option>
            <option value="expired">Expired</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        <button className="add-button" onClick={handleUploadDocument}>Upload Document</button>
      </div>

      <div className="document-list-container">
        <table className="document-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>Related To</th>
              <th>Issue Date</th>
              <th>Expiry Date</th>
              <th>Issued By</th>
              <th>Status</th>
              <th>File</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDocuments.length > 0 ? (
              filteredDocuments.map(doc => (
                <tr key={doc.id}>
                  <td>{doc.title}</td>
                  <td>{doc.type.charAt(0).toUpperCase() + doc.type.slice(1)}</td>
                  <td>
                    {doc.truckId ? `Truck: ${doc.truckId}` : ''}
                    {doc.driverId ? `Driver: ${doc.driverId}` : ''}
                    {doc.routeId ? `Route: ${doc.routeId}` : ''}
                  </td>
                  <td>{doc.issueDate}</td>
                  <td>{doc.expiryDate}</td>
                  <td>{doc.issuedBy}</td>
                  <td>
                    <span className={`status-badge status-${doc.status.toLowerCase()}`}>
                      {doc.status}
                    </span>
                  </td>
                  <td>{doc.fileType.toUpperCase()} ({doc.fileSize})</td>
                  <td>
                    <button className="action-button view" onClick={() => handleViewDocument(doc)}>View</button>
                    <button className="action-button edit" onClick={() => handleEditDocument(doc)}>Edit</button>
                    <button className="action-button delete" onClick={() => handleDeleteDocument(doc.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="no-results">No documents found matching your search criteria.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Charts Section */}
      <div className="charts-grid">
        <div className="chart-container"><DocumentStatusChart /></div>
        <div className="chart-container"><UpcomingExpirationsChart /></div>
        <div className="chart-container"><DocumentTypeChart /></div>
        <div className="chart-container"><DocumentComplianceChart /></div>
      </div>

      {/* Placeholder for Document Viewer Modal */}
      {selectedDocument && (
        <div className="details-placeholder">
          <h2>Document: {selectedDocument.title}</h2>
          <p>Type: {selectedDocument.type.charAt(0).toUpperCase() + selectedDocument.type.slice(1)}</p>
          <p>Issue Date: {selectedDocument.issueDate}</p>
          <p>Expiry Date: {selectedDocument.expiryDate}</p>
          <p>Status: {selectedDocument.status}</p>
          <p>File: {selectedDocument.fileType.toUpperCase()} ({selectedDocument.fileSize})</p>
          <div className="document-preview-placeholder">
            <p>Document preview would be displayed here in a real application.</p>
          </div>
          <button onClick={() => setSelectedDocument(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default DocumentSection;
