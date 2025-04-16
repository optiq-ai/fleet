import React, { useState, useEffect } from 'react';
import Card from '../common/Card';
import Table from '../common/Table';
import * as geofencingService from '../../services/api/mockGeofencingService';

/**
 * GeofencingDashboard Component
 * 
 * Dashboard for geofencing functionality that displays KPIs, map, alerts, and statistics.
 */
const GeofencingDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState('day');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const data = await geofencingService.getGeofencingDashboard({ timeRange });
        setDashboardData(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [timeRange]);

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
  };

  if (isLoading) {
    return <div className="loading">Loading dashboard data...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!dashboardData) {
    return <div className="no-data">No dashboard data available.</div>;
  }

  return (
    <div className="geofencing-dashboard">
      {/* Time Range Selector */}
      <div className="time-range-selector">
        <button 
          className={`time-range-button ${timeRange === 'day' ? 'active' : ''}`}
          onClick={() => handleTimeRangeChange('day')}
        >
          Today
        </button>
        <button 
          className={`time-range-button ${timeRange === 'week' ? 'active' : ''}`}
          onClick={() => handleTimeRangeChange('week')}
        >
          This Week
        </button>
        <button 
          className={`time-range-button ${timeRange === 'month' ? 'active' : ''}`}
          onClick={() => handleTimeRangeChange('month')}
        >
          This Month
        </button>
        <button 
          className={`time-range-button ${timeRange === 'year' ? 'active' : ''}`}
          onClick={() => handleTimeRangeChange('year')}
        >
          This Year
        </button>
      </div>

      {/* KPI Cards */}
      <div className="kpi-cards">
        <Card className="kpi-card">
          <div className="kpi-value">{dashboardData.kpi.activeGeofences}</div>
          <div className="kpi-label">Active Geofences</div>
        </Card>
        <Card className="kpi-card">
          <div className="kpi-value">{dashboardData.kpi.violationsToday}</div>
          <div className="kpi-label">Violations Today</div>
        </Card>
        <Card className="kpi-card">
          <div className="kpi-value">{dashboardData.kpi.vehiclesInZones}</div>
          <div className="kpi-label">Vehicles in Zones</div>
        </Card>
        <Card className="kpi-card">
          <div className="kpi-value">{dashboardData.kpi.avgTimeInZones} min</div>
          <div className="kpi-label">Avg. Time in Zones</div>
        </Card>
      </div>

      {/* Map and Alerts */}
      <div className="dashboard-row">
        <Card title="Geofencing Map" className="map-card">
          <div className="map-placeholder">
            <p>Interactive map showing geofences and vehicles would be displayed here.</p>
            <p>Total Geofences: {dashboardData.mapData.geofences.length}</p>
            <p>Vehicles Tracked: {dashboardData.mapData.vehicles.length}</p>
          </div>
        </Card>
        
        <Card title="Recent Alerts" className="alerts-card">
          {dashboardData.alerts.length > 0 ? (
            <Table
              headers={['Type', 'Geofence', 'Vehicle', 'Driver', 'Time', 'Status']}
              data={dashboardData.alerts.map(alert => [
                alert.type,
                alert.geofenceName,
                alert.vehiclePlate,
                alert.driverName,
                new Date(alert.timestamp).toLocaleTimeString(),
                alert.status
              ])}
            />
          ) : (
            <p>No recent alerts.</p>
          )}
        </Card>
      </div>
      
      {/* Statistics */}
      <div className="dashboard-row">
        <Card title="Zone Utilization" className="stats-card">
          {dashboardData.zoneUtilization.length > 0 ? (
            <Table
              headers={['Zone', 'Visits', 'Total Time', 'Avg Time']}
              data={dashboardData.zoneUtilization.map(zone => [
                zone.geofenceName,
                zone.visits,
                `${Math.floor(zone.totalTime / 60)} min`,
                `${Math.floor(zone.avgTime / 60)} min`
              ])}
            />
          ) : (
            <p>No zone utilization data available.</p>
          )}
        </Card>
        
        <Card title="Violation Trends" className="trends-card">
          <div className="trends-placeholder">
            <p>Violation trends chart would be displayed here.</p>
            <p>Last 7 days data:</p>
            <ul>
              {dashboardData.violationTrends.map((trend, index) => (
                <li key={index}>{trend.date}: {trend.count} violations</li>
              ))}
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default GeofencingDashboard;
