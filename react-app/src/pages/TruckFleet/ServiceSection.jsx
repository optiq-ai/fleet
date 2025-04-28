import React, { useState, useEffect } from 'react';
import './ServiceManagement.css'; // We'll create this CSS file later if needed
import {
  ServiceCostsTrendChart, // Corrected typo
  ServiceCostsByTypeChart, // Corrected name
  ServiceFrequencyByVehicleChart, // Replaced ServiceStatusDistributionChart
  ServiceProviderPerformanceChart // Replaced UpcomingServicesChart
} from '../../components/charts/ServiceCharts'; // Import service charts

// Mock data for service records
const mockServiceRecords = [
  {
    id: 'SRV001',
    truckId: 'TRK001',
    serviceType: 'Scheduled Maintenance A',
    date: '2025-03-15',
    mileage: 145000,
    cost: 850.00,
    currency: 'EUR',
    provider: 'Volvo Service Center Berlin',
    status: 'completed',
    nextServiceDate: '2025-06-15',
    nextServiceMileage: 175000
  },
  {
    id: 'SRV002',
    truckId: 'TRK002',
    serviceType: 'Tire Replacement',
    date: '2025-04-01',
    mileage: 205000,
    cost: 1200.00,
    currency: 'EUR',
    provider: 'Local Tire Shop Paris',
    status: 'completed',
    nextServiceDate: 'N/A',
    nextServiceMileage: 'N/A'
  },
  {
    id: 'SRV003',
    truckId: 'TRK003',
    serviceType: 'Engine Repair',
    date: '2025-04-20',
    mileage: 84500,
    cost: 2500.00,
    currency: 'EUR',
    provider: 'Mercedes-Benz Service Rome',
    status: 'in_progress',
    nextServiceDate: 'N/A',
    nextServiceMileage: 'N/A'
  },
  {
    id: 'SRV004',
    truckId: 'TRK004',
    serviceType: 'Scheduled Maintenance B',
    date: '2025-01-10',
    mileage: 300000,
    cost: 1100.00,
    currency: 'EUR',
    provider: 'MAN Service Center Madrid',
    status: 'completed',
    nextServiceDate: '2025-07-01',
    nextServiceMileage: 350000
  }
];

/**
 * ServiceSection component
 * 
 * Section within the comprehensive dashboard for managing truck service and maintenance.
 * Displays a list of service records, charts, and allows basic operations.
 * 
 * @returns {JSX.Element} ServiceSection component
 */
const ServiceSection = () => {
  const [serviceRecords, setServiceRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [filter, setFilter] = useState({ truckId: '', status: 'all' });

  // Fetch service data
  useEffect(() => {
    const fetchServiceRecords = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        setTimeout(() => {
          setServiceRecords(mockServiceRecords);
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching service records:', error);
        setIsLoading(false);
      }
    };
    fetchServiceRecords();
  }, []);

  // Filter service records
  const filteredRecords = serviceRecords.filter(record => 
    (record.truckId.toLowerCase().includes(searchTerm.toLowerCase()) ||
     record.serviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
     record.provider.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filter.truckId === '' || record.truckId.toLowerCase() === filter.truckId.toLowerCase()) &&
    (filter.status === 'all' || record.status === filter.status)
  );

  // Format currency
  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(amount);
  };

  // Format mileage
  const formatMileage = (km) => {
    if (km === 'N/A') return km;
    return new Intl.NumberFormat().format(km) + ' km';
  };

  // Handle viewing record details
  const handleViewDetails = (record) => {
    setSelectedRecord(record);
    console.log('View details for service record:', record.id);
  };

  // Handle scheduling new service (placeholder)
  const handleScheduleService = () => {
    console.log('Schedule new service clicked');
    // In a real app, this would open a form or modal
  };

  // Handle editing a record (placeholder)
  const handleEditRecord = (record) => {
    console.log('Edit service record clicked:', record.id);
    // In a real app, this would open a form or modal with record data
  };

  // Handle deleting a record (placeholder)
  const handleDeleteRecord = (recordId) => {
    console.log('Delete service record clicked:', recordId);
    // In a real app, this would show a confirmation dialog and make an API call
    setServiceRecords(prevRecords => prevRecords.filter(record => record.id !== recordId));
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(prevFilter => ({ ...prevFilter, [name]: value }));
  };

  // Get unique truck IDs for filter dropdown
  const truckIds = [...new Set(mockServiceRecords.map(rec => rec.truckId))];

  if (isLoading) {
    return <div className="loading-container">Loading service records...</div>;
  }

  return (
    <div className="service-section">
      <div className="toolbar">
        <div className="search-filters">
          <input 
            type="text"
            placeholder="Search by Truck ID, Service Type, Provider..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select 
            name="truckId"
            value={filter.truckId}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="">All Trucks</option>
            {truckIds.map(id => (
              <option key={id} value={id}>{id}</option>
            ))}
          </select>
          <select 
            name="status"
            value={filter.status}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="all">All Statuses</option>
            <option value="scheduled">Scheduled</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <button className="add-button" onClick={handleScheduleService}>Schedule Service</button>
      </div>

      <div className="service-list-container">
        <table className="service-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Truck ID</th>
              <th>Service Type</th>
              <th>Mileage</th>
              <th>Cost</th>
              <th>Provider</th>
              <th>Status</th>
              <th>Next Service</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.length > 0 ? (
              filteredRecords.map(record => (
                <tr key={record.id}>
                  <td>{record.date}</td>
                  <td>{record.truckId}</td>
                  <td>{record.serviceType}</td>
                  <td>{formatMileage(record.mileage)}</td>
                  <td>{formatCurrency(record.cost, record.currency)}</td>
                  <td>{record.provider}</td>
                  <td>
                    <span className={`status-badge status-${record.status.toLowerCase().replace('_', '-')}`}>
                      {record.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td>{record.nextServiceDate} / {formatMileage(record.nextServiceMileage)}</td>
                  <td>
                    <button className="action-button view" onClick={() => handleViewDetails(record)}>View</button>
                    <button className="action-button edit" onClick={() => handleEditRecord(record)}>Edit</button>
                    <button className="action-button delete" onClick={() => handleDeleteRecord(record.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="no-results">No service records found matching your search criteria.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Charts Section */}
      <div className="charts-grid">
        <div className="chart-container"><ServiceCostsTrendChart /></div>
        <div className="chart-container"><ServiceCostsByTypeChart /></div>
        <div className="chart-container"><ServiceFrequencyByVehicleChart /></div>
        <div className="chart-container"><ServiceProviderPerformanceChart /></div>
      </div>

      {/* Placeholder for Service Record Details Modal/View */}
      {selectedRecord && (
        <div className="details-placeholder">
          <h2>Service Record Details: {selectedRecord.id}</h2>
          <p>Truck: {selectedRecord.truckId}</p>
          <p>Service Type: {selectedRecord.serviceType}</p>
          <p>Date: {selectedRecord.date}</p>
          <p>Cost: {formatCurrency(selectedRecord.cost, selectedRecord.currency)}</p>
          <p>Status: {selectedRecord.status.replace('_', ' ')}</p>
          <button onClick={() => setSelectedRecord(null)}>Close Details</button>
        </div>
      )}
    </div>
  );
};

export default ServiceSection;

