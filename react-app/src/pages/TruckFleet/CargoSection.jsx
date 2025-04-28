import React, { useState, useEffect } from 'react';
import './CargoPlanning.css'; // We'll create this CSS file later if needed
import {
  CargoTypesChart,
  CargoLoadUtilizationChart,
  CargoDamageChart,
  LoadingTimeChart
} from '../../components/charts/CargoCharts'; // Import cargo charts

// Mock data for cargo/loads
const mockCargoLoads = [
  {
    id: 'LD001',
    routeId: 'RT001',
    truckId: 'TRK001',
    trailerId: 'TRL001',
    cargoType: 'General Goods',
    weight: 18.5, // tons
    volume: 80, // cbm
    pickupLocation: 'Warehouse A, Warsaw',
    deliveryLocation: 'Distribution Center B, Berlin',
    pickupTime: '2025-04-28 07:00',
    deliveryTime: '2025-04-28 15:30',
    status: 'in_transit'
  },
  {
    id: 'LD002',
    routeId: 'RT002',
    truckId: 'TRK002',
    trailerId: 'TRL002',
    cargoType: 'Refrigerated Goods',
    weight: 15.0,
    volume: 70,
    pickupLocation: 'Factory C, Paris',
    deliveryLocation: 'Supermarket D, Madrid',
    pickupTime: '2025-04-27 09:00',
    deliveryTime: '2025-04-29 13:00',
    status: 'in_transit'
  },
  {
    id: 'LD003',
    routeId: 'RT003',
    truckId: 'TRK004',
    trailerId: 'TRL003',
    cargoType: 'Hazardous Materials',
    weight: 20.0,
    volume: 65,
    pickupLocation: 'Chemical Plant E, Rome',
    deliveryLocation: 'Industrial Site F, Vienna',
    pickupTime: '2025-04-29 05:00',
    deliveryTime: '2025-04-30 17:00',
    status: 'planned'
  },
  {
    id: 'LD004',
    routeId: 'RT004',
    truckId: 'TRK001',
    trailerId: 'TRL005',
    cargoType: 'General Goods',
    weight: 19.0,
    volume: 85,
    pickupLocation: 'Port G, London',
    deliveryLocation: 'Warehouse H, Brussels',
    pickupTime: '2025-04-26 08:00',
    deliveryTime: '2025-04-26 16:30',
    status: 'delivered'
  }
];

/**
 * CargoSection component
 * 
 * Section within the comprehensive dashboard for cargo planning and tracking.
 * Displays a list of cargo loads, charts, and allows basic operations.
 * 
 * @returns {JSX.Element} CargoSection component
 */
const CargoSection = () => {
  const [cargoLoads, setCargoLoads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLoad, setSelectedLoad] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');

  // Fetch cargo data
  useEffect(() => {
    const fetchCargoLoads = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        setTimeout(() => {
          setCargoLoads(mockCargoLoads);
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching cargo loads:', error);
        setIsLoading(false);
      }
    };
    fetchCargoLoads();
  }, []);

  // Filter cargo loads based on search term and status
  const filteredLoads = cargoLoads.filter(load => 
    (load.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
     load.routeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
     load.truckId.toLowerCase().includes(searchTerm.toLowerCase()) ||
     load.trailerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
     load.cargoType.toLowerCase().includes(searchTerm.toLowerCase()) ||
     load.pickupLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
     load.deliveryLocation.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter === 'all' || load.status === statusFilter)
  );

  // Format date/time
  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return 'N/A';
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateTimeString).toLocaleString(undefined, options);
  };

  // Format weight
  const formatWeight = (tons) => {
    return `${tons} tons`;
  };
  
  // Format volume
  const formatVolume = (cbm) => {
    return `${cbm} cbm`;
  };

  // Handle viewing load details
  const handleViewDetails = (load) => {
    setSelectedLoad(load);
    console.log('View details for load:', load.id);
  };

  // Handle planning a new load (placeholder)
  const handlePlanLoad = () => {
    console.log('Plan new load clicked');
    // In a real app, this would open a planning interface or modal
  };

  // Handle editing a load (placeholder)
  const handleEditLoad = (load) => {
    console.log('Edit load clicked:', load.id);
    // In a real app, this would open a form or modal with load data
  };

  // Handle deleting a load (placeholder)
  const handleDeleteLoad = (loadId) => {
    console.log('Delete load clicked:', loadId);
    // In a real app, this would show a confirmation dialog and make an API call
    setCargoLoads(prevLoads => prevLoads.filter(load => load.id !== loadId));
  };

  if (isLoading) {
    return <div className="loading-container">Loading cargo loads...</div>;
  }

  return (
    <div className="cargo-section">
      <div className="toolbar">
        <div className="search-filters">
          <input 
            type="text"
            placeholder="Search by ID, Route, Truck, Trailer, Cargo, Location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="status-filter"
          >
            <option value="all">All Statuses</option>
            <option value="planned">Planned</option>
            <option value="loading">Loading</option>
            <option value="in_transit">In Transit</option>
            <option value="unloading">Unloading</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <button className="add-button" onClick={handlePlanLoad}>Plan New Load</button>
      </div>

      <div className="cargo-list-container">
        <table className="cargo-table">
          <thead>
            <tr>
              <th>Load ID</th>
              <th>Route ID</th>
              <th>Truck</th>
              <th>Trailer</th>
              <th>Cargo Type</th>
              <th>Weight</th>
              <th>Volume</th>
              <th>Pickup</th>
              <th>Delivery</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLoads.length > 0 ? (
              filteredLoads.map(load => (
                <tr key={load.id}>
                  <td>{load.id}</td>
                  <td>{load.routeId}</td>
                  <td>{load.truckId}</td>
                  <td>{load.trailerId}</td>
                  <td>{load.cargoType}</td>
                  <td>{formatWeight(load.weight)}</td>
                  <td>{formatVolume(load.volume)}</td>
                  <td>{load.pickupLocation}<br/><small>{formatDateTime(load.pickupTime)}</small></td>
                  <td>{load.deliveryLocation}<br/><small>{formatDateTime(load.deliveryTime)}</small></td>
                  <td>
                    <span className={`status-badge status-${load.status.toLowerCase().replace('_', '-')}`}>
                      {load.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td>
                    <button className="action-button view" onClick={() => handleViewDetails(load)}>View</button>
                    <button className="action-button edit" onClick={() => handleEditLoad(load)}>Edit</button>
                    <button className="action-button delete" onClick={() => handleDeleteLoad(load.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" className="no-results">No cargo loads found matching your search criteria.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Charts Section */}
      <div className="charts-grid">
        <div className="chart-container"><CargoTypesChart /></div>
        <div className="chart-container"><CargoLoadUtilizationChart /></div>
        <div className="chart-container"><CargoDamageChart /></div>
        <div className="chart-container"><LoadingTimeChart /></div>
      </div>

      {/* Placeholder for Load Details Modal/View */}
      {selectedLoad && (
        <div className="details-placeholder">
          <h2>Load Details: {selectedLoad.id}</h2>
          <p>Route: {selectedLoad.routeId}</p>
          <p>Truck: {selectedLoad.truckId}</p>
          <p>Trailer: {selectedLoad.trailerId}</p>
          <p>Cargo: {selectedLoad.cargoType} ({formatWeight(selectedLoad.weight)}, {formatVolume(selectedLoad.volume)})</p>
          <p>Status: {selectedLoad.status.replace('_', ' ')}</p>
          <button onClick={() => setSelectedLoad(null)}>Close Details</button>
        </div>
      )}
    </div>
  );
};

export default CargoSection;

