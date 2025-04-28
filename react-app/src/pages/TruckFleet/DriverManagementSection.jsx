import React, { useState, useEffect } from 'react';
import './DriverManagement.css'; // We will create this CSS file next
import {
  DriverStatusDistributionChart,
  DriverPerformanceScoreChart,
  DriverViolationsChart,
  DriverTrainingStatusChart,
  DriverAvailabilityChart
} from '../../components/charts/DriverCharts'; // Import driver charts

// Mock data for drivers
const mockDrivers = [
  {
    id: 'DRV001',
    name: 'John Smith',
    licenseNumber: 'SMI987654',
    status: 'active',
    currentTruck: 'TRK001',
    contact: '+1 555-1234',
    licenseExpiry: '2026-10-15',
    medCertExpiry: '2025-08-20'
  },
  {
    id: 'DRV002',
    name: 'Jane Doe',
    licenseNumber: 'DOE123456',
    status: 'active',
    currentTruck: 'TRK002',
    contact: '+1 555-5678',
    licenseExpiry: '2027-03-01',
    medCertExpiry: '2026-01-10'
  },
  {
    id: 'DRV003',
    name: 'Peter Jones',
    licenseNumber: 'JON567890',
    status: 'active',
    currentTruck: 'TRK004',
    contact: '+1 555-9012',
    licenseExpiry: '2025-11-30',
    medCertExpiry: '2025-09-05'
  },
  {
    id: 'DRV004',
    name: 'Alice Brown',
    licenseNumber: 'BRO112233',
    status: 'inactive',
    currentTruck: 'N/A',
    contact: '+1 555-3456',
    licenseExpiry: '2026-05-22',
    medCertExpiry: '2025-12-18'
  },
  {
    id: 'DRV005',
    name: 'Robert Green',
    licenseNumber: 'GRE445566',
    status: 'on_leave',
    currentTruck: 'N/A',
    contact: '+1 555-7890',
    licenseExpiry: '2027-08-14',
    medCertExpiry: '2026-06-25'
  }
];

/**
 * DriverManagementSection component
 * 
 * Section within the comprehensive dashboard for managing drivers.
 * Displays a list of drivers, charts, and allows basic operations.
 * 
 * @returns {JSX.Element} DriverManagementSection component
 */
const DriverManagementSection = () => {
  const [drivers, setDrivers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDriver, setSelectedDriver] = useState(null);

  // Fetch driver data
  useEffect(() => {
    const fetchDrivers = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        setTimeout(() => {
          setDrivers(mockDrivers);
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching drivers:', error);
        setIsLoading(false);
      }
    };
    fetchDrivers();
  }, []);

  // Filter drivers based on search term
  const filteredDrivers = drivers.filter(driver => 
    driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (driver.currentTruck && driver.currentTruck.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Handle viewing driver details
  const handleViewDetails = (driver) => {
    setSelectedDriver(driver);
    console.log('View details for:', driver.id);
    // In a real app, this might open a modal or navigate to a details page
  };

  // Handle adding a new driver (placeholder)
  const handleAddDriver = () => {
    console.log('Add new driver clicked');
    // In a real app, this would open a form or modal
  };

  // Handle editing a driver (placeholder)
  const handleEditDriver = (driver) => {
    console.log('Edit driver clicked:', driver.id);
    // In a real app, this would open a form or modal with driver data
  };

  // Handle deleting a driver (placeholder)
  const handleDeleteDriver = (driverId) => {
    console.log('Delete driver clicked:', driverId);
    // In a real app, this would show a confirmation dialog and make an API call
    // For now, we'll just filter it out from the local state
    setDrivers(prevDrivers => prevDrivers.filter(driver => driver.id !== driverId));
  };

  if (isLoading) {
    return <div className="loading-container">Loading drivers...</div>;
  }

  return (
    <div className="driver-management-section">
      <div className="toolbar">
        <input 
          type="text"
          placeholder="Search drivers (Name, License No, Truck ID)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button className="add-button" onClick={handleAddDriver}>Add New Driver</button>
      </div>

      <div className="driver-list-container">
        <table className="driver-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>License No.</th>
              <th>Status</th>
              <th>Current Truck</th>
              <th>Contact</th>
              <th>License Expiry</th>
              <th>Med Cert Expiry</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDrivers.length > 0 ? (
              filteredDrivers.map(driver => (
                <tr key={driver.id}>
                  <td>{driver.name}</td>
                  <td>{driver.licenseNumber}</td>
                  <td>
                    <span className={`status-badge status-${driver.status.toLowerCase().replace('_', '-')}`}>
                      {driver.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td>{driver.currentTruck || 'N/A'}</td>
                  <td>{driver.contact}</td>
                  <td>{driver.licenseExpiry}</td>
                  <td>{driver.medCertExpiry}</td>
                  <td>
                    <button className="action-button view" onClick={() => handleViewDetails(driver)}>View</button>
                    <button className="action-button edit" onClick={() => handleEditDriver(driver)}>Edit</button>
                    <button className="action-button delete" onClick={() => handleDeleteDriver(driver.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="no-results">No drivers found matching your search criteria.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Charts Section */}
      <div className="charts-grid">
        <div className="chart-container"><DriverStatusDistributionChart /></div>
        <div className="chart-container"><DriverPerformanceScoreChart /></div>
        <div className="chart-container"><DriverViolationsChart /></div>
        <div className="chart-container"><DriverTrainingStatusChart /></div>
        <div className="chart-container full-width"><DriverAvailabilityChart /></div>
      </div>

      {/* Placeholder for Driver Details Modal/View */}
      {selectedDriver && (
        <div className="details-placeholder">
          <h2>Details for {selectedDriver.name}</h2>
          <p>License No: {selectedDriver.licenseNumber}</p>
          <p>Status: {selectedDriver.status}</p>
          <p>Contact: {selectedDriver.contact}</p>
          <p>License Expiry: {selectedDriver.licenseExpiry}</p>
          <button onClick={() => setSelectedDriver(null)}>Close Details</button>
        </div>
      )}
    </div>
  );
};

export default DriverManagementSection;

