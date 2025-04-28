import React, { useState, useEffect } from 'react';
import './TruckFleetDashboard.css';

/**
 * TruckFleetDashboard component
 * 
 * Main dashboard for the truck fleet management module showing key metrics,
 * fleet status, alerts, and quick access to important functions.
 * 
 * @returns {JSX.Element} TruckFleetDashboard component
 */
const TruckFleetDashboard = () => {
  // State for fleet statistics
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
  
  // State for alerts
  const [alerts, setAlerts] = useState([]);
  
  // State for performance metrics
  const [performanceMetrics, setPerformanceMetrics] = useState({
    fuelConsumption: { value: 0, trend: 0 },
    routeCompletionTime: { value: 0, trend: 0 },
    driverWorkTimeUtilization: { value: 0, trend: 0 },
    maintenanceCost: { value: 0, trend: 0 }
  });
  
  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // In a real implementation, this would be an API call
        // For now, we'll simulate loading data with a timeout
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
            {
              id: 1,
              type: 'warning',
              time: '2h ago',
              title: 'Maintenance Due',
              description: 'Truck WA12345 is due for scheduled maintenance in 3 days'
            },
            {
              id: 2,
              type: 'critical',
              time: '5h ago',
              title: 'Driver Hours Alert',
              description: 'Driver John Smith is approaching maximum allowed driving hours'
            },
            {
              id: 3,
              type: 'info',
              time: '8h ago',
              title: 'Route Completed',
              description: 'Route #R-2023-0568 has been completed successfully'
            },
            {
              id: 4,
              type: 'warning',
              time: '1d ago',
              title: 'Toll Payment Due',
              description: 'Toll payment for Germany is due in 5 days'
            }
          ]);
          
          setPerformanceMetrics({
            fuelConsumption: { value: 32.5, trend: -2.3 },
            routeCompletionTime: { value: 2.3, trend: -5.1 },
            driverWorkTimeUtilization: { value: 87, trend: 3.2 },
            maintenanceCost: { value: 1245, trend: 8.5 }
          });
          
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setIsLoading(false);
      }
    };
    
    fetchDashboardData();
    
    // Cleanup function
    return () => {
      // Any cleanup code here
    };
  }, []);
  
  // Handle quick action buttons
  const handleQuickAction = (action) => {
    console.log(`Quick action triggered: ${action}`);
    // In a real implementation, this would navigate to the appropriate page or open a modal
  };
  
  // Loading state
  if (isLoading) {
    return <div className="loading-container">Loading truck fleet dashboard...</div>;
  }
  
  // Format large numbers
  const formatNumber = (num) => {
    return new Intl.NumberFormat().format(num);
  };
  
  // Format distance
  const formatDistance = (km) => {
    return `${formatNumber(km)} km`;
  };
  
  // Format fuel
  const formatFuel = (liters) => {
    return `${formatNumber(liters)} L`;
  };
  
  // Format cargo weight
  const formatCargo = (tons) => {
    return `${formatNumber(tons)} tons`;
  };
  
  return (
    <div className="truck-fleet-dashboard">
      <h1>Truck Fleet Dashboard</h1>
      
      <div className="dashboard-stats">
        <div className="stats-section">
          <h2>Fleet Overview</h2>
          <div className="stats-cards">
            <div className="stats-card">
              <h3>Trucks</h3>
              <div className="stats-value">{fleetStats.activeTrucks}</div>
              <div className="stats-label">Active</div>
              <div className="stats-secondary">
                <span>{fleetStats.inMaintenanceTrucks} in maintenance</span>
              </div>
            </div>
            
            <div className="stats-card">
              <h3>Trailers</h3>
              <div className="stats-value">{fleetStats.activeTrailers}</div>
              <div className="stats-label">Active</div>
              <div className="stats-secondary">
                <span>{fleetStats.inMaintenanceTrailers} in maintenance</span>
              </div>
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
            <div className="stats-card">
              <h3>Planned</h3>
              <div className="stats-value">{fleetStats.plannedRoutes}</div>
            </div>
            
            <div className="stats-card">
              <h3>Active</h3>
              <div className="stats-value">{fleetStats.activeRoutes}</div>
            </div>
            
            <div className="stats-card">
              <h3>Completed</h3>
              <div className="stats-value">{fleetStats.completedRoutes}</div>
              <div className="stats-label">This month</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="dashboard-stats">
        <div className="stats-section">
          <h2>Total Statistics</h2>
          <div className="stats-cards">
            <div className="stats-card">
              <h3>Distance</h3>
              <div className="stats-value">{formatDistance(fleetStats.totalDistance)}</div>
              <div className="stats-label">This month</div>
            </div>
            
            <div className="stats-card">
              <h3>Fuel</h3>
              <div className="stats-value">{formatFuel(fleetStats.fuelConsumption)}</div>
              <div className="stats-label">This month</div>
            </div>
            
            <div className="stats-card">
              <h3>Cargo</h3>
              <div className="stats-value">{formatCargo(fleetStats.totalCargo)}</div>
              <div className="stats-label">This month</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="dashboard-sections">
        <div className="dashboard-section">
          <h2>Fleet Location</h2>
          <div className="map-placeholder">
            <div className="placeholder-text">Map view of truck fleet locations</div>
            <div className="placeholder-subtext">In a real implementation, this would be an interactive map showing the current location of all trucks in the fleet.</div>
          </div>
        </div>
        
        <div className="dashboard-section">
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
      
      <div className="dashboard-sections">
        <div className="dashboard-section">
          <h2>Performance Metrics</h2>
          <div className="metrics-container">
            <div className="metric-item">
              <div className="metric-title">Avg. Fuel Consumption</div>
              <div className="metric-value">{performanceMetrics.fuelConsumption.value} L/100km</div>
              <div className={`metric-trend ${performanceMetrics.fuelConsumption.trend < 0 ? 'positive' : 'negative'}`}>
                {performanceMetrics.fuelConsumption.trend > 0 ? '+' : ''}{performanceMetrics.fuelConsumption.trend}% vs last month
              </div>
            </div>
            
            <div className="metric-item">
              <div className="metric-title">Avg. Route Completion Time</div>
              <div className="metric-value">{performanceMetrics.routeCompletionTime.value} days</div>
              <div className={`metric-trend ${performanceMetrics.routeCompletionTime.trend < 0 ? 'positive' : 'negative'}`}>
                {performanceMetrics.routeCompletionTime.trend > 0 ? '+' : ''}{performanceMetrics.routeCompletionTime.trend}% vs last month
              </div>
            </div>
            
            <div className="metric-item">
              <div className="metric-title">Driver Work Time Utilization</div>
              <div className="metric-value">{performanceMetrics.driverWorkTimeUtilization.value}%</div>
              <div className={`metric-trend ${performanceMetrics.driverWorkTimeUtilization.trend > 0 ? 'positive' : 'negative'}`}>
                {performanceMetrics.driverWorkTimeUtilization.trend > 0 ? '+' : ''}{performanceMetrics.driverWorkTimeUtilization.trend}% vs last month
              </div>
            </div>
            
            <div className="metric-item">
              <div className="metric-title">Maintenance Cost per Truck</div>
              <div className="metric-value">€{performanceMetrics.maintenanceCost.value}</div>
              <div className={`metric-trend ${performanceMetrics.maintenanceCost.trend < 0 ? 'positive' : 'negative'}`}>
                {performanceMetrics.maintenanceCost.trend > 0 ? '+' : ''}{performanceMetrics.maintenanceCost.trend}% vs last month
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="dashboard-sections">
        <div className="dashboard-section">
          <h2>Quick Actions</h2>
          <div className="quick-actions">
            <button className="action-button" onClick={() => handleQuickAction('addTruck')}>Add New Truck</button>
            <button className="action-button" onClick={() => handleQuickAction('addTrailer')}>Add New Trailer</button>
            <button className="action-button" onClick={() => handleQuickAction('addDriver')}>Add New Driver</button>
            <button className="action-button" onClick={() => handleQuickAction('planRoute')}>Plan New Route</button>
            <button className="action-button" onClick={() => handleQuickAction('scheduleMaintenance')}>Schedule Maintenance</button>
            <button className="action-button" onClick={() => handleQuickAction('generateReports')}>Generate Reports</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TruckFleetDashboard;
