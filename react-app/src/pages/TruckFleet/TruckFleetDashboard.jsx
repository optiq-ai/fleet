import React, { useState, useEffect } from 'react';
import './TruckFleetDashboard.css';

/**
 * TruckFleetDashboard component
 * 
 * Main dashboard for the truck fleet management module
 * 
 * @returns {JSX.Element} TruckFleetDashboard component
 */
const TruckFleetDashboard = () => {
  const [fleetStats, setFleetStats] = useState({
    activeTrucks: 0,
    activeTrailers: 0,
    activeDrivers: 0,
    inMaintenanceTrucks: 0,
    inMaintenanceTrailers: 0,
    plannedRoutes: 0,
    activeRoutes: 0,
    completedRoutes: 0
  });
  
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setFleetStats({
        activeTrucks: 42,
        activeTrailers: 68,
        activeDrivers: 45,
        inMaintenanceTrucks: 5,
        inMaintenanceTrailers: 3,
        plannedRoutes: 12,
        activeRoutes: 28,
        completedRoutes: 156
      });
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
    return <div className="loading-container">Loading truck fleet dashboard...</div>;
  }
  
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
      
      <div className="dashboard-sections">
        <div className="dashboard-section">
          <h2>Fleet Location</h2>
          <div className="map-placeholder">
            <div className="placeholder-text">Map view of truck fleet locations</div>
          </div>
        </div>
        
        <div className="dashboard-section">
          <h2>Recent Alerts</h2>
          <div className="alerts-list">
            <div className="alert-item alert-warning">
              <div className="alert-time">2h ago</div>
              <div className="alert-content">
                <div className="alert-title">Maintenance Due</div>
                <div className="alert-description">Truck WA12345 is due for scheduled maintenance in 3 days</div>
              </div>
            </div>
            
            <div className="alert-item alert-critical">
              <div className="alert-time">5h ago</div>
              <div className="alert-content">
                <div className="alert-title">Driver Hours Alert</div>
                <div className="alert-description">Driver John Smith is approaching maximum allowed driving hours</div>
              </div>
            </div>
            
            <div className="alert-item alert-info">
              <div className="alert-time">8h ago</div>
              <div className="alert-content">
                <div className="alert-title">Route Completed</div>
                <div className="alert-description">Route #R-2023-0568 has been completed successfully</div>
              </div>
            </div>
            
            <div className="alert-item alert-warning">
              <div className="alert-time">1d ago</div>
              <div className="alert-content">
                <div className="alert-title">Toll Payment Due</div>
                <div className="alert-description">Toll payment for Germany is due in 5 days</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="dashboard-sections">
        <div className="dashboard-section">
          <h2>Performance Metrics</h2>
          <div className="metrics-container">
            <div className="metric-item">
              <div className="metric-title">Avg. Fuel Consumption</div>
              <div className="metric-value">32.5 L/100km</div>
              <div className="metric-trend positive">-2.3% vs last month</div>
            </div>
            
            <div className="metric-item">
              <div className="metric-title">Avg. Route Completion Time</div>
              <div className="metric-value">2.3 days</div>
              <div className="metric-trend positive">-5.1% vs last month</div>
            </div>
            
            <div className="metric-item">
              <div className="metric-title">Driver Work Time Utilization</div>
              <div className="metric-value">87%</div>
              <div className="metric-trend positive">+3.2% vs last month</div>
            </div>
            
            <div className="metric-item">
              <div className="metric-title">Maintenance Cost per Truck</div>
              <div className="metric-value">€1,245</div>
              <div className="metric-trend negative">+8.5% vs last month</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="dashboard-sections">
        <div className="dashboard-section">
          <h2>Quick Actions</h2>
          <div className="quick-actions">
            <button className="action-button">Add New Truck</button>
            <button className="action-button">Add New Trailer</button>
            <button className="action-button">Add New Driver</button>
            <button className="action-button">Plan New Route</button>
            <button className="action-button">Schedule Maintenance</button>
            <button className="action-button">Generate Reports</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TruckFleetDashboard;
