import React, { useState, useEffect } from 'react';
import './TruckFleetDashboard.css';

// Import section components
import TruckManagementSection from './TruckManagementSection';
import TrailerManagementSection from './TrailerManagementSection';
import DriverManagementSection from './DriverManagementSection';
import RouteManagementSection from './RouteManagementSection';
import WorkTimeSection from './WorkTimeSection';
import CargoSection from './CargoSection';
import TollSection from './TollSection';
import ServiceSection from './ServiceSection';
import DocumentSection from './DocumentSection';

/**
 * TruckFleetDashboard component
 * 
 * Comprehensive dashboard for truck fleet management, integrating various functionalities
 * into different sections accessible via tabs.
 * 
 * @returns {JSX.Element} TruckFleetDashboard component
 */
const TruckFleetDashboard = () => {
  // State for the active tab/section
  const [activeTab, setActiveTab] = useState('overview');
  
  // State for fleet statistics (overview)
  const [fleetStats, setFleetStats] = useState({
    activeTrucks: 0,
    activeTrailers: 0,
    activeDrivers: 0,
    inMaintenanceTrucks: 0,
    inMaintenanceTrailers: 0,
    plannedRoutes: 0,
    activeRoutes: 0,
    completedRoutes: 0,
    totalDistance: 0,
    fuelConsumption: 0,
    totalCargo: 0
  });
  
  // State for loading status
  const [isLoading, setIsLoading] = useState(true);
  
  // State for alerts (overview)
  const [alerts, setAlerts] = useState([]);
  
  // State for performance metrics (overview)
  const [performanceMetrics, setPerformanceMetrics] = useState({
    fuelConsumption: { value: 0, trend: 0 },
    routeCompletionTime: { value: 0, trend: 0 },
    driverWorkTimeUtilization: { value: 0, trend: 0 },
    maintenanceCost: { value: 0, trend: 0 }
  });
  
  // Fetch initial dashboard data (overview)
  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        // Simulate API call for overview data
        setTimeout(() => {
          setFleetStats({
            activeTrucks: 42,
            activeTrailers: 68,
            activeDrivers: 45,
            inMaintenanceTrucks: 5,
            inMaintenanceTrailers: 3,
            plannedRoutes: 12,
            activeRoutes: 28,
            completedRoutes: 156,
            totalDistance: 245680,
            fuelConsumption: 78450,
            totalCargo: 3240
          });
          
          setAlerts([
            { id: 1, type: 'warning', time: '2h ago', title: 'Maintenance Due', description: 'Truck WA12345 is due for scheduled maintenance in 3 days' },
            { id: 2, type: 'critical', time: '5h ago', title: 'Driver Hours Alert', description: 'Driver John Smith is approaching maximum allowed driving hours' },
            { id: 3, type: 'info', time: '8h ago', title: 'Route Completed', description: 'Route #R-2023-0568 has been completed successfully' },
            { id: 4, type: 'warning', time: '1d ago', title: 'Toll Payment Due', description: 'Toll payment for Germany is due in 5 days' }
          ]);
          
          setPerformanceMetrics({
            fuelConsumption: { value: 32.5, trend: -2.3 },
            routeCompletionTime: { value: 2.3, trend: -5.1 },
            driverWorkTimeUtilization: { value: 87, trend: 3.2 },
            maintenanceCost: { value: 1245, trend: 8.5 }
          });
          
          setIsLoading(false);
        }, 500); // Reduced timeout for faster loading feel
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setIsLoading(false);
      }
    };
    
    fetchDashboardData();
    
  }, []);
  
  // Handle quick action buttons (might be moved or adapted)
  const handleQuickAction = (action) => {
    console.log(`Quick action triggered: ${action}`);
    // Example: Switch tab based on action
    if (action === 'addTruck') setActiveTab('trucks');
    if (action === 'addTrailer') setActiveTab('trailers');
    if (action === 'addDriver') setActiveTab('drivers');
    if (action === 'planRoute') setActiveTab('routes');
    // ... other actions
  };
  
  // Format large numbers
  const formatNumber = (num) => new Intl.NumberFormat().format(num);
  const formatDistance = (km) => `${formatNumber(km)} km`;
  const formatFuel = (liters) => `${formatNumber(liters)} L`;
  const formatCargo = (tons) => `${formatNumber(tons)} tons`;

  // Render the content based on the active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="overview-section">
            {/* Fleet Overview Stats */}
            <div className="dashboard-stats">
              <div className="stats-section">
                <h2>Fleet Overview</h2>
                <div className="stats-cards">
                  <div className="stats-card">
                    <h3>Trucks</h3>
                    <div className="stats-value">{fleetStats.activeTrucks}</div>
                    <div className="stats-label">Active</div>
                    <div className="stats-secondary"><span>{fleetStats.inMaintenanceTrucks} in maintenance</span></div>
                  </div>
                  <div className="stats-card">
                    <h3>Trailers</h3>
                    <div className="stats-value">{fleetStats.activeTrailers}</div>
                    <div className="stats-label">Active</div>
                    <div className="stats-secondary"><span>{fleetStats.inMaintenanceTrailers} in maintenance</span></div>
                  </div>
                  <div className="stats-card">
                    <h3>Drivers</h3>
                    <div className="stats-value">{fleetStats.activeDrivers}</div>
                    <div className="stats-label">Active</div>
                  </div>
                </div>
              </div>
              <div className="stats-section">
                <h2>Routes</h2>
                <div className="stats-cards">
                  <div className="stats-card"><h3>Planned</h3><div className="stats-value">{fleetStats.plannedRoutes}</div></div>
                  <div className="stats-card"><h3>Active</h3><div className="stats-value">{fleetStats.activeRoutes}</div></div>
                  <div className="stats-card"><h3>Completed</h3><div className="stats-value">{fleetStats.completedRoutes}</div><div className="stats-label">This month</div></div>
                </div>
              </div>
            </div>
            {/* Total Stats */}
            <div className="dashboard-stats">
              <div className="stats-section">
                <h2>Total Statistics (This Month)</h2>
                <div className="stats-cards">
                  <div className="stats-card"><h3>Distance</h3><div className="stats-value">{formatDistance(fleetStats.totalDistance)}</div></div>
                  <div className="stats-card"><h3>Fuel</h3><div className="stats-value">{formatFuel(fleetStats.fuelConsumption)}</div></div>
                  <div className="stats-card"><h3>Cargo</h3><div className="stats-value">{formatCargo(fleetStats.totalCargo)}</div></div>
                </div>
              </div>
            </div>
            {/* Map and Alerts */}
            <div className="dashboard-sections">
              <div className="dashboard-section map-section">
                <h2>Fleet Location</h2>
                <div className="map-placeholder">
                  <div className="placeholder-text">Map view of truck fleet locations</div>
                  <div className="placeholder-subtext">Interactive map placeholder</div>
                </div>
              </div>
              <div className="dashboard-section alerts-section">
                <h2>Recent Alerts</h2>
                <div className="alerts-list">
                  {alerts.map(alert => (
                    <div key={alert.id} className={`alert-item alert-${alert.type}`}>
                      <div className="alert-time">{alert.time}</div>
                      <div className="alert-content">
                        <div className="alert-title">{alert.title}</div>
                        <div className="alert-description">{alert.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Performance Metrics */}
            <div className="dashboard-sections">
              <div className="dashboard-section performance-section">
                <h2>Performance Metrics</h2>
                <div className="metrics-container">
                  <div className="metric-item">
                    <div className="metric-title">Avg. Fuel Consumption</div>
                    <div className="metric-value">{performanceMetrics.fuelConsumption.value} L/100km</div>
                    <div className={`metric-trend ${performanceMetrics.fuelConsumption.trend < 0 ? 'positive' : 'negative'}`}>{performanceMetrics.fuelConsumption.trend > 0 ? '+' : ''}{performanceMetrics.fuelConsumption.trend}% vs last month</div>
                  </div>
                  <div className="metric-item">
                    <div className="metric-title">Avg. Route Completion Time</div>
                    <div className="metric-value">{performanceMetrics.routeCompletionTime.value} days</div>
                    <div className={`metric-trend ${performanceMetrics.routeCompletionTime.trend < 0 ? 'positive' : 'negative'}`}>{performanceMetrics.routeCompletionTime.trend > 0 ? '+' : ''}{performanceMetrics.routeCompletionTime.trend}% vs last month</div>
                  </div>
                  <div className="metric-item">
                    <div className="metric-title">Driver Work Time Utilization</div>
                    <div className="metric-value">{performanceMetrics.driverWorkTimeUtilization.value}%</div>
                    <div className={`metric-trend ${performanceMetrics.driverWorkTimeUtilization.trend > 0 ? 'positive' : 'negative'}`}>{performanceMetrics.driverWorkTimeUtilization.trend > 0 ? '+' : ''}{performanceMetrics.driverWorkTimeUtilization.trend}% vs last month</div>
                  </div>
                  <div className="metric-item">
                    <div className="metric-title">Maintenance Cost per Truck</div>
                    <div className="metric-value">€{performanceMetrics.maintenanceCost.value}</div>
                    <div className={`metric-trend ${performanceMetrics.maintenanceCost.trend < 0 ? 'positive' : 'negative'}`}>{performanceMetrics.maintenanceCost.trend > 0 ? '+' : ''}{performanceMetrics.maintenanceCost.trend}% vs last month</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Quick Actions (Optional for Overview) */}
            {/* ... */}
          </div>
        );
      case 'trucks':
        return <TruckManagementSection />;
      case 'trailers':
        return <TrailerManagementSection />;
      case 'drivers':
        return <DriverManagementSection />;
      case 'routes':
        return <RouteManagementSection />;
      case 'work-time':
        return <WorkTimeSection />;
      case 'cargo':
        return <CargoSection />;
      case 'tolls':
        return <TollSection />;
      case 'service':
        return <ServiceSection />;
      case 'documents':
        return <DocumentSection />;
      default:
        return <div>Select a section</div>;
    }
  };

  if (isLoading && activeTab === 'overview') {
    return <div className="loading-container">Loading truck fleet dashboard...</div>;
  }

  return (
    <div className="truck-fleet-dashboard comprehensive-dashboard">
      <h1>Truck Fleet Management</h1>
      
      {/* Tab Navigation */}
      <div className="dashboard-tabs">
        <button 
          className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`tab-button ${activeTab === 'trucks' ? 'active' : ''}`}
          onClick={() => setActiveTab('trucks')}
        >
          Trucks
        </button>
        <button 
          className={`tab-button ${activeTab === 'trailers' ? 'active' : ''}`}
          onClick={() => setActiveTab('trailers')}
        >
          Trailers
        </button>
        <button 
          className={`tab-button ${activeTab === 'drivers' ? 'active' : ''}`}
          onClick={() => setActiveTab('drivers')}
        >
          Drivers
        </button>
        <button 
          className={`tab-button ${activeTab === 'work-time' ? 'active' : ''}`}
          onClick={() => setActiveTab('work-time')}
        >
          Work Time
        </button>
        <button 
          className={`tab-button ${activeTab === 'routes' ? 'active' : ''}`}
          onClick={() => setActiveTab('routes')}
        >
          Routes
        </button>
        <button 
          className={`tab-button ${activeTab === 'cargo' ? 'active' : ''}`}
          onClick={() => setActiveTab('cargo')}
        >
          Cargo
        </button>
        <button 
          className={`tab-button ${activeTab === 'tolls' ? 'active' : ''}`}
          onClick={() => setActiveTab('tolls')}
        >
          Tolls
        </button>
        <button 
          className={`tab-button ${activeTab === 'service' ? 'active' : ''}`}
          onClick={() => setActiveTab('service')}
        >
          Service
        </button>
        <button 
          className={`tab-button ${activeTab === 'documents' ? 'active' : ''}`}
          onClick={() => setActiveTab('documents')}
        >
          Documents
        </button>
      </div>
      
      {/* Tab Content Area */}
      <div className="dashboard-content">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default TruckFleetDashboard;

