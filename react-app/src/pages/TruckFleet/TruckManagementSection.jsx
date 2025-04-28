import React, { useState, useEffect } from 'react';
import './TruckManagement.css'; // Reuse the existing CSS
import {
  TruckAvailabilityTrendChart, // Replaced TruckStatusDistributionChart
  TruckMileageComparisonChart, // Replaced TruckMileageDistributionChart
  TruckAgeDistributionChart,
  TCOPerTruckChart,            // Replaced TruckMaintenanceCostChart
  FuelEfficiencyByTruckChart   // Replaced TruckUtilizationRateChart
} from '../../components/charts/TruckCharts'; // Import truck charts

// Mock data for trucks (can be moved to a shared location later)
const mockTrucks = [
  {
    id: 'TRK001',
    registrationNumber: 'WA12345',
    make: 'Volvo',
    model: 'FH16',
    year: 2021,
    status: 'active',
    mileage: 150000,
    driver: 'John Smith',
    nextService: '2025-06-15'
  },
  {
    id: 'TRK002',
    registrationNumber: 'WB67890',
    make: 'Scania',
    model: 'R730',
    year: 2020,
    status: 'active',
    mileage: 210000,
    driver: 'Jane Doe',
    nextService: '2025-05-20'
  },
  {
    id: 'TRK003',
    registrationNumber: 'WC11223',
    make: 'Mercedes-Benz',
    model: 'Actros',
    year: 2022,
    status: 'maintenance',
    mileage: 85000,
    driver: 'N/A',
    nextService: 'N/A'
  },
  {
    id: 'TRK004',
    registrationNumber: 'WD44556',
    make: 'MAN',
    model: 'TGX',
    year: 2019,
    status: 'active',
    mileage: 320000,
    driver: 'Peter Jones',
    nextService: '2025-07-01'
  },
  {
    id: 'TRK005',
    registrationNumber: 'WE77889',
    make: 'DAF',
    model: 'XF',
    year: 2021,
    status: 'inactive',
    mileage: 110000,
    driver: 'N/A',
    nextService: '2025-08-10'
  }
];

/**
 * TruckManagementSection component
 * 
 * Section within the comprehensive dashboard for managing trucks.
 * Displays a list of trucks, charts, and allows basic operations.
 * 
 * @returns {JSX.Element} TruckManagementSection component
 */
const TruckManagementSection = () => {
  const [trucks, setTrucks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTruck, setSelectedTruck] = useState(null);

  // Fetch truck data
  useEffect(() => {
    const fetchTrucks = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        setTimeout(() => {
          setTrucks(mockTrucks);
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching trucks:', error);
        setIsLoading(false);
      }
    };
    fetchTrucks();
  }, []);

  // Filter trucks based on search term
  const filteredTrucks = trucks.filter(truck => 
    truck.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    truck.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
    truck.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (truck.driver && truck.driver.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Format mileage
  const formatMileage = (km) => {
    return new Intl.NumberFormat().format(km) + ' km';
  };

  // Handle viewing truck details
  const handleViewDetails = (truck) => {
    setSelectedTruck(truck);
    console.log('View details for:', truck.id);
    // In a real app, this might open a modal or navigate to a details page
  };

  // Handle adding a new truck (placeholder)
  const handleAddTruck = () => {
    console.log('Add new truck clicked');
    // In a real app, this would open a form or modal
  };

  // Handle editing a truck (placeholder)
  const handleEditTruck = (truck) => {
    console.log('Edit truck clicked:', truck.id);
    // In a real app, this would open a form or modal with truck data
  };

  // Handle deleting a truck (placeholder)
  const handleDeleteTruck = (truckId) => {
    console.log('Delete truck clicked:', truckId);
    // In a real app, this would show a confirmation dialog and make an API call
    // For now, we'll just filter it out from the local state
    setTrucks(prevTrucks => prevTrucks.filter(truck => truck.id !== truckId));
  };

  if (isLoading) {
    return <div className="loading-container">Loading trucks...</div>;
  }

  return (
    <div className="truck-management-section">
      {/* Toolbar */}
      <div className="toolbar">
        <input 
          type="text"
          placeholder="Search trucks (Reg. No, Make, Model, Driver)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button className="add-button" onClick={handleAddTruck}>Add New Truck</button>
      </div>

      {/* Truck List */}
      <div className="truck-list-container">
        <table className="truck-table">
          <thead>
            <tr>
              <th>Reg. Number</th>
              <th>Make</th>
              <th>Model</th>
              <th>Year</th>
              <th>Status</th>
              <th>Mileage</th>
              <th>Driver</th>
              <th>Next Service</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTrucks.length > 0 ? (
              filteredTrucks.map(truck => (
                <tr key={truck.id}>
                  <td>{truck.registrationNumber}</td>
                  <td>{truck.make}</td>
                  <td>{truck.model}</td>
                  <td>{truck.year}</td>
                  <td>
                    <span className={`status-badge status-${truck.status.toLowerCase()}`}>
                      {truck.status}
                    </span>
                  </td>
                  <td>{formatMileage(truck.mileage)}</td>
                  <td>{truck.driver || 'N/A'}</td>
                  <td>{truck.nextService}</td>
                  <td>
                    <button className="action-button view" onClick={() => handleViewDetails(truck)}>View</button>
                    <button className="action-button edit" onClick={() => handleEditTruck(truck)}>Edit</button>
                    <button className="action-button delete" onClick={() => handleDeleteTruck(truck.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="no-results">No trucks found matching your search criteria.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Charts Section */}
      <div className="charts-grid">
        <div className="chart-container"><TruckAvailabilityTrendChart /></div>
        <div className="chart-container"><TruckMileageComparisonChart /></div>
        <div className="chart-container"><TruckAgeDistributionChart /></div>
        <div className="chart-container"><TCOPerTruckChart /></div>
        <div className="chart-container full-width"><FuelEfficiencyByTruckChart /></div>
      </div>

      {/* Placeholder for Truck Details Modal/View */}
      {selectedTruck && (
        <div className="details-placeholder">
          <h2>Details for {selectedTruck.registrationNumber}</h2>
          <p>Make: {selectedTruck.make}</p>
          <p>Model: {selectedTruck.model}</p>
          <p>Status: {selectedTruck.status}</p>
          <p>Mileage: {formatMileage(selectedTruck.mileage)}</p>
          <button onClick={() => setSelectedTruck(null)}>Close Details</button>
        </div>
      )}
    </div>
  );
};

export default TruckManagementSection;

