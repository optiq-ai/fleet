import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getIntegrationsDashboard } from '../../services/api/integrationsService';

const Container = styled.div`
  padding: 20px;
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const CardTitle = styled.h3`
  font-size: 16px;
  color: #333;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CardIcon = styled.span`
  color: #1a73e8;
`;

const CardValue = styled.div`
  font-size: 32px;
  font-weight: bold;
  color: #1a73e8;
  margin-bottom: 8px;
`;

const CardTrend = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  color: ${props => props.positive ? '#34a853' : props.negative ? '#ea4335' : '#666'};
`;

const TrendIcon = styled.span`
  font-size: 12px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  color: #333;
  margin: 30px 0 15px 0;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

const TableHeader = styled.th`
  padding: 12px 15px;
  text-align: left;
  background-color: #f8f9fa;
  color: #333;
  font-weight: bold;
  border-bottom: 1px solid #eee;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f8f9fa;
  }
  
  &:hover {
    background-color: #f0f5ff;
  }
`;

const TableCell = styled.td`
  padding: 12px 15px;
  border-bottom: 1px solid #eee;
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  background-color: ${props => {
    switch(props.status) {
      case 'active': return '#e6f4ea';
      case 'inactive': return '#f1f3f4';
      case 'error': return '#fce8e6';
      case 'warning': return '#fff8e6';
      case 'syncing': return '#e8f0fe';
      default: return '#f1f3f4';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'active': return '#34a853';
      case 'inactive': return '#5f6368';
      case 'error': return '#ea4335';
      case 'warning': return '#fbbc04';
      case 'syncing': return '#1a73e8';
      default: return '#5f6368';
    }
  }};
`;

const AlertCard = styled.div`
  background-color: ${props => {
    switch(props.priority) {
      case 'high': return '#fce8e6';
      case 'medium': return '#fff8e6';
      case 'low': return '#e8f0fe';
      default: return '#f1f3f4';
    }
  }};
  border-left: 4px solid ${props => {
    switch(props.priority) {
      case 'high': return '#ea4335';
      case 'medium': return '#fbbc04';
      case 'low': return '#1a73e8';
      default: return '#5f6368';
    }
  }};
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 4px;
`;

const AlertTitle = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
  display: flex;
  justify-content: space-between;
`;

const AlertDescription = styled.div`
  font-size: 14px;
  color: #555;
`;

const AlertTime = styled.span`
  font-size: 12px;
  color: #666;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #666;
`;

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #ea4335;
`;

const ActionButton = styled.button`
  background-color: transparent;
  border: none;
  color: #1a73e8;
  cursor: pointer;
  font-size: 14px;
  padding: 5px;
  margin-left: 5px;
  
  &:hover {
    text-decoration: underline;
  }
`;

/**
 * IntegrationsDashboard component displays the status of all integrations,
 * synchronization history, and alerts
 * @param {Object} props - Component props
 * @param {boolean} props.useMockData - Flag to use mock data instead of API
 * @returns {JSX.Element} IntegrationsDashboard component
 */
const IntegrationsDashboard = ({ useMockData = true }) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getIntegrationsDashboard(useMockData);
        setDashboardData(data);
      } catch (err) {
        console.error('Error fetching integrations dashboard data:', err);
        setError('Failed to load integrations dashboard data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [useMockData]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now - date;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffDay > 0) {
      return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
    } else if (diffHour > 0) {
      return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`;
    } else if (diffMin > 0) {
      return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  };

  if (isLoading) {
    return <LoadingContainer>Loading integrations dashboard...</LoadingContainer>;
  }

  if (error) {
    return <ErrorContainer>{error}</ErrorContainer>;
  }

  if (!dashboardData) {
    return <LoadingContainer>No dashboard data available</LoadingContainer>;
  }

  const { stats, integrationStatus, syncHistory, alerts } = dashboardData;

  return (
    <Container>
      <DashboardGrid>
        <Card>
          <CardHeader>
            <CardTitle>
              <CardIcon className="icon icon-plug"></CardIcon>
              Total Integrations
            </CardTitle>
          </CardHeader>
          <CardValue>{stats.totalIntegrations}</CardValue>
          <CardTrend positive={stats.integrationsChange > 0} negative={stats.integrationsChange < 0}>
            <TrendIcon className={`icon ${stats.integrationsChange > 0 ? 'icon-arrow-up' : stats.integrationsChange < 0 ? 'icon-arrow-down' : 'icon-minus'}`}></TrendIcon>
            {Math.abs(stats.integrationsChange)} since last month
          </CardTrend>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <CardIcon className="icon icon-check-circle"></CardIcon>
              Active Integrations
            </CardTitle>
          </CardHeader>
          <CardValue>{stats.activeIntegrations}</CardValue>
          <CardTrend positive={stats.activeIntegrationsChange > 0} negative={stats.activeIntegrationsChange < 0}>
            <TrendIcon className={`icon ${stats.activeIntegrationsChange > 0 ? 'icon-arrow-up' : stats.activeIntegrationsChange < 0 ? 'icon-arrow-down' : 'icon-minus'}`}></TrendIcon>
            {Math.abs(stats.activeIntegrationsChange)} since last month
          </CardTrend>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <CardIcon className="icon icon-exclamation-triangle"></CardIcon>
              Integration Issues
            </CardTitle>
          </CardHeader>
          <CardValue>{stats.integrationIssues}</CardValue>
          <CardTrend positive={stats.integrationIssuesChange < 0} negative={stats.integrationIssuesChange > 0}>
            <TrendIcon className={`icon ${stats.integrationIssuesChange < 0 ? 'icon-arrow-down' : stats.integrationIssuesChange > 0 ? 'icon-arrow-up' : 'icon-minus'}`}></TrendIcon>
            {Math.abs(stats.integrationIssuesChange)} since last month
          </CardTrend>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <CardIcon className="icon icon-sync"></CardIcon>
              Successful Syncs (24h)
            </CardTitle>
          </CardHeader>
          <CardValue>{stats.successfulSyncs24h}</CardValue>
          <CardTrend positive={stats.successfulSyncsChange > 0} negative={stats.successfulSyncsChange < 0}>
            <TrendIcon className={`icon ${stats.successfulSyncsChange > 0 ? 'icon-arrow-up' : stats.successfulSyncsChange < 0 ? 'icon-arrow-down' : 'icon-minus'}`}></TrendIcon>
            {Math.abs(stats.successfulSyncsChange)}% compared to previous 24h
          </CardTrend>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <CardIcon className="icon icon-times-circle"></CardIcon>
              Failed Syncs (24h)
            </CardTitle>
          </CardHeader>
          <CardValue>{stats.failedSyncs24h}</CardValue>
          <CardTrend positive={stats.failedSyncsChange < 0} negative={stats.failedSyncsChange > 0}>
            <TrendIcon className={`icon ${stats.failedSyncsChange < 0 ? 'icon-arrow-down' : stats.failedSyncsChange > 0 ? 'icon-arrow-up' : 'icon-minus'}`}></TrendIcon>
            {Math.abs(stats.failedSyncsChange)}% compared to previous 24h
          </CardTrend>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <CardIcon className="icon icon-clock"></CardIcon>
              Avg. Sync Time
            </CardTitle>
          </CardHeader>
          <CardValue>{stats.avgSyncTime} s</CardValue>
          <CardTrend positive={stats.avgSyncTimeChange < 0} negative={stats.avgSyncTimeChange > 0}>
            <TrendIcon className={`icon ${stats.avgSyncTimeChange < 0 ? 'icon-arrow-down' : stats.avgSyncTimeChange > 0 ? 'icon-arrow-up' : 'icon-minus'}`}></TrendIcon>
            {Math.abs(stats.avgSyncTimeChange)}% compared to previous 24h
          </CardTrend>
        </Card>
      </DashboardGrid>

      <SectionTitle>Integration Status</SectionTitle>
      <Table>
        <thead>
          <tr>
            <TableHeader>Integration</TableHeader>
            <TableHeader>Type</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader>Last Sync</TableHeader>
            <TableHeader>Next Sync</TableHeader>
            <TableHeader>Actions</TableHeader>
          </tr>
        </thead>
        <tbody>
          {integrationStatus.map((integration, index) => (
            <TableRow key={index}>
              <TableCell>{integration.name}</TableCell>
              <TableCell>{integration.type}</TableCell>
              <TableCell>
                <StatusBadge status={integration.status}>
                  {integration.status.charAt(0).toUpperCase() + integration.status.slice(1)}
                </StatusBadge>
              </TableCell>
              <TableCell>{integration.lastSync ? formatTimeAgo(integration.lastSync) : 'Never'}</TableCell>
              <TableCell>{integration.nextSync ? formatDate(integration.nextSync) : 'Not scheduled'}</TableCell>
              <TableCell>
                <ActionButton>Sync Now</ActionButton>
                <ActionButton>Configure</ActionButton>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>

      <SectionTitle>Recent Synchronization History</SectionTitle>
      <Table>
        <thead>
          <tr>
            <TableHeader>Integration</TableHeader>
            <TableHeader>Type</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader>Start Time</TableHeader>
            <TableHeader>Duration</TableHeader>
            <TableHeader>Records Processed</TableHeader>
          </tr>
        </thead>
        <tbody>
          {syncHistory.map((sync, index) => (
            <TableRow key={index}>
              <TableCell>{sync.integrationName}</TableCell>
              <TableCell>{sync.integrationType}</TableCell>
              <TableCell>
                <StatusBadge status={sync.status === 'success' ? 'active' : sync.status === 'in_progress' ? 'syncing' : 'error'}>
                  {sync.status === 'success' ? 'Success' : sync.status === 'in_progress' ? 'In Progress' : 'Failed'}
                </StatusBadge>
              </TableCell>
              <TableCell>{formatTimeAgo(sync.startTime)}</TableCell>
              <TableCell>{sync.duration} s</TableCell>
              <TableCell>{sync.recordsProcessed}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>

      <SectionTitle>Integration Alerts</SectionTitle>
      {alerts.map((alert, index) => (
        <AlertCard key={index} priority={alert.priority}>
          <AlertTitle>
            {alert.title}
            <AlertTime>{formatTimeAgo(alert.timestamp)}</AlertTime>
          </AlertTitle>
          <AlertDescription>{alert.description}</AlertDescription>
        </AlertCard>
      ))}
    </Container>
  );
};

export default IntegrationsDashboard;
