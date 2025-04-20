import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Card from '../common/Card';
import Table from '../common/Table';
import GeofencingMap from './GeofencingMap';
import * as geofencingService from '../../services/api/mockGeofencingService';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TimeRangeSelector = styled.div`
  display: flex;
  margin-bottom: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 4px;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

const TimeRangeButton = styled.button`
  padding: 10px 16px;
  background-color: ${props => props.active ? '#3f51b5' : 'transparent'};
  color: ${props => props.active ? 'white' : '#666'};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: ${props => props.active ? '500' : 'normal'};
  
  &:hover {
    background-color: ${props => props.active ? '#3f51b5' : '#e0e0e0'};
  }
  
  @media (max-width: 768px) {
    flex: 1 1 auto;
    padding: 8px 12px;
    font-size: 14px;
  }
`;

const KpiCardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 20px;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const KpiValue = styled.div`
  font-size: 28px;
  font-weight: 500;
  color: #3f51b5;
  margin-bottom: 8px;
`;

const KpiLabel = styled.div`
  font-size: 14px;
  color: #666;
`;

const DashboardRow = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 20px;
  margin-bottom: 20px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const MapPlaceholder = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #666;
  text-align: center;
`;

const TrendsPlaceholder = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  color: #666;
  
  ul {
    margin-top: 10px;
    padding-left: 20px;
  }
  
  li {
    margin-bottom: 5px;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #666;
  font-size: 16px;
`;

const ErrorMessage = styled.div`
  color: #d32f2f;
  padding: 16px;
  background-color: #ffebee;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const NoDataMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #666;
  font-size: 16px;
  background-color: #f5f5f5;
  border-radius: 8px;
`;

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
    return <LoadingContainer>Loading dashboard data...</LoadingContainer>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  if (!dashboardData) {
    return <NoDataMessage>No dashboard data available.</NoDataMessage>;
  }

  return (
    <DashboardContainer>
      {/* Time Range Selector */}
      <TimeRangeSelector>
        <TimeRangeButton 
          active={timeRange === 'day'}
          onClick={() => handleTimeRangeChange('day')}
        >
          Today
        </TimeRangeButton>
        <TimeRangeButton 
          active={timeRange === 'week'}
          onClick={() => handleTimeRangeChange('week')}
        >
          This Week
        </TimeRangeButton>
        <TimeRangeButton 
          active={timeRange === 'month'}
          onClick={() => handleTimeRangeChange('month')}
        >
          This Month
        </TimeRangeButton>
        <TimeRangeButton 
          active={timeRange === 'year'}
          onClick={() => handleTimeRangeChange('year')}
        >
          This Year
        </TimeRangeButton>
      </TimeRangeSelector>

      {/* KPI Cards */}
      <KpiCardsContainer>
        <Card>
          <KpiValue>{dashboardData.kpi.activeGeofences}</KpiValue>
          <KpiLabel>Active Geofences</KpiLabel>
        </Card>
        <Card>
          <KpiValue>{dashboardData.kpi.violationsToday}</KpiValue>
          <KpiLabel>Violations Today</KpiLabel>
        </Card>
        <Card>
          <KpiValue>{dashboardData.kpi.vehiclesInZones}</KpiValue>
          <KpiLabel>Vehicles in Zones</KpiLabel>
        </Card>
        <Card>
          <KpiValue>{dashboardData.kpi.avgTimeInZones} min</KpiValue>
          <KpiLabel>Avg. Time in Zones</KpiLabel>
        </Card>
      </KpiCardsContainer>

      {/* Map and Alerts */}
      <DashboardRow>
        <Card title="Geofencing Map">
          <GeofencingMap 
            geofences={dashboardData.mapData.geofences} 
            vehicles={dashboardData.mapData.vehicles}
          />
        </Card>
        
        <Card title="Recent Alerts">
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
      </DashboardRow>
      
      {/* Statistics */}
      <DashboardRow>
        <Card title="Zone Utilization">
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
        
        <Card title="Violation Trends">
          <TrendsPlaceholder>
            <p>Violation trends chart would be displayed here.</p>
            <p>Last 7 days data:</p>
            <ul>
              {dashboardData.violationTrends.map((trend, index) => (
                <li key={index}>{trend.date}: {trend.count} violations</li>
              ))}
            </ul>
          </TrendsPlaceholder>
        </Card>
      </DashboardRow>
    </DashboardContainer>
  );
};

export default GeofencingDashboard;
