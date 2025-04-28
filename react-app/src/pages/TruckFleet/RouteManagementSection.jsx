import React, { useState, useEffect } from 'react';
import './RouteManagement.css'; // We'll create this CSS file later if needed
import {
  RouteStatusDistributionChart,
  OnTimePerformanceChart,
  AverageRouteDurationChart,
  FuelEfficiencyByRouteChart
} from '../../components/charts/RouteCharts'; // Import route charts

// Mock data for routes
const mockRoutes = [
  {
    id: 'RT001',
    origin: 'Warsaw, PL',
    destination: 'Berlin, DE',
    truckId: 'TRK001',
    driverId: 'DRV001',
    driverName: 'John Smith',
    plannedDeparture: '2025-04-28 08:00',
    plannedArrival: '2025-04-28 16:00',
    status: 'active',
    cargoType: 'General Goods',
    cargoWeight: 18.5 // tons
  },
  {
    id: 'RT002',
    origin: 'Paris, FR',
    destination: 'Madrid, ES',
    truckId: 'TRK002',
    driverId: 'DRV002',
    driverName: 'Jane Doe',
    plannedDeparture: '2025-04-27 10:00',
    plannedArrival: '2025-04-29 14:00',
    status: 'active',
    cargoType: 'Refrigerated Goods',
    cargoWeight: 15.0
  },
  {
    id: 'RT003',
    origin: 'Rome, IT',
    destination: 'Vienna, AT',
    truckId: 'TRK004',
    driverId: 'DRV003',
    driverName: 'Peter Jones',
    plannedDeparture: '2025-04-29 06:00',
    plannedArrival: '2025-04-30 18:00',
    status: 'planned',
    cargoType: 'Hazardous Materials',
    cargoWeight: 20.0
  },
  {
    id: 'RT004',
    origin: 'London, UK',
    destination: 'Brussels, BE',
    truckId: 'TRK001',
    driverId: 'DRV001',
    driverName: 'John Smith',
    plannedDeparture: '2025-04-26 09:00',
    plannedArrival: '2025-04-26 17:00',
    status: 'completed',
    cargoType: 'General Goods',
    cargoWeight: 19.0
  }
];

/**
 * RouteManagementSection component
 * 
 * Section within the comprehensive dashboard for managing routes.
 * Displays a list of routes, charts, and allows basic operations.
 * 
 * @returns {JSX.Element} RouteManagementSection component
 */
const RouteManagementSection = () => {
  const [routes, setRoutes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');

  // Fetch route data
  useEffect(() => {
    const fetchRoutes = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        setTimeout(() => {
          setRoutes(mockRoutes);
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching routes:', error);
        setIsLoading(false);
      }
    };
    fetchRoutes();
  }, []);

  // Filter routes based on search term and status
  const filteredRoutes = routes.filter(route => 
    (route.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
     route.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
     route.truckId.toLowerCase().includes(searchTerm.toLowerCase()) ||
     route.driverName.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter === 'all' || route.status === statusFilter)
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

  // Handle viewing route details
  const handleViewDetails = (route) => {
    setSelectedRoute(route);
    console.log('View details for route:', route.id);
  };

  // Handle planning a new route (placeholder)
  const handlePlanRoute = () => {
    console.log('Plan new route clicked');
    // In a real app, this would open a planning interface or modal
  };

  // Handle editing a route (placeholder)
  const handleEditRoute = (route) => {
    console.log('Edit route clicked:', route.id);
    // In a real app, this would open a form or modal with route data
  };

  // Handle deleting a route (placeholder)
  const handleDeleteRoute = (routeId) => {
    console.log('Delete route clicked:', routeId);
    // In a real app, this would show a confirmation dialog and make an API call
    setRoutes(prevRoutes => prevRoutes.filter(route => route.id !== routeId));
  };

  if (isLoading) {
    return <div className="loading-container">Loading routes...</div>;
  }

  return (
    <div className="route-management-section">
      <div className="toolbar">
        <div className="search-filters">
          <input 
            type="text"
            placeholder="Search by Origin, Dest, Truck, Driver..."
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
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="delayed">Delayed</option> {/* Example additional status */}
            <option value="cancelled">Cancelled</option> {/* Example additional status */}
          </select>
        </div>
        <button className="add-button" onClick={handlePlanRoute}>Plan New Route</button>
      </div>

      <div className="route-list-container">
        <table className="route-table">
          <thead>
            <tr>
              <th>Route ID</th>
              <th>Origin</th>
              <th>Destination</th>
              <th>Truck</th>
              <th>Driver</th>
              <th>Departure</th>
              <th>Arrival</th>
              <th>Status</th>
              <th>Cargo</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRoutes.length > 0 ? (
              filteredRoutes.map(route => (
                <tr key={route.id}>
                  <td>{route.id}</td>
                  <td>{route.origin}</td>
                  <td>{route.destination}</td>
                  <td>{route.truckId}</td>
                  <td>{route.driverName}</td>
                  <td>{formatDateTime(route.plannedDeparture)}</td>
                  <td>{formatDateTime(route.plannedArrival)}</td>
                  <td>
                    <span className={`status-badge status-${route.status.toLowerCase()}`}>
                      {route.status}
                    </span>
                  </td>
                  <td>{route.cargoType} ({formatWeight(route.cargoWeight)})</td>
                  <td>
                    <button className="action-button view" onClick={() => handleViewDetails(route)}>View</button>
                    <button className="action-button edit" onClick={() => handleEditRoute(route)}>Edit</button>
                    <button className="action-button delete" onClick={() => handleDeleteRoute(route.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="no-results">No routes found matching your search criteria.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Charts Section */}
      <div className="charts-grid">
        <div className="chart-container"><RouteStatusDistributionChart /></div>
        <div className="chart-container"><OnTimePerformanceChart /></div>
        <div className="chart-container"><AverageRouteDurationChart /></div>
        <div className="chart-container"><FuelEfficiencyByRouteChart /></div>
      </div>

      {/* Placeholder for Route Details Modal/View */}
      {selectedRoute && (
        <div className="details-placeholder">
          <h2>Route Details: {selectedRoute.id}</h2>
          <p>Origin: {selectedRoute.origin}</p>
          <p>Destination: {selectedRoute.destination}</p>
          <p>Truck: {selectedRoute.truckId}</p>
          <p>Driver: {selectedRoute.driverName}</p>
          <p>Status: {selectedRoute.status}</p>
          <p>Cargo: {selectedRoute.cargoType} ({formatWeight(selectedRoute.cargoWeight)})</p>
          <button onClick={() => setSelectedRoute(null)}>Close Details</button>
        </div>
      )}
    </div>
  );
};

export default RouteManagementSection;

