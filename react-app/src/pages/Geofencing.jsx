import React, { useState } from 'react';
import styled from 'styled-components';
import GeofencingDashboard from '../components/geofencing/GeofencingDashboard';
import GeofenceManager from '../components/geofencing/GeofenceManager';
import AlertConfiguration from '../components/geofencing/AlertConfiguration';
import GeofencingReports from '../components/geofencing/GeofencingReports';
import RouteIntegration from '../components/geofencing/RouteIntegration';
import Card from '../components/common/Card';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: 500;
  color: #333;
  margin: 0 0 8px 0;
`;

const Description = styled.p`
  color: #666;
  margin: 0 0 24px 0;
  font-size: 16px;
  line-height: 1.5;
`;

const TabsContainer = styled.div`
  display: flex;
  overflow-x: auto;
  padding: 4px;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const TabButton = styled.button`
  padding: 12px 20px;
  background-color: transparent;
  border: none;
  border-bottom: 2px solid ${props => props.active ? '#3f51b5' : 'transparent'};
  color: ${props => props.active ? '#3f51b5' : '#666'};
  font-weight: ${props => props.active ? '500' : 'normal'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    color: #3f51b5;
    background-color: #f5f5f5;
  }
  
  @media (max-width: 768px) {
    flex: 1 1 auto;
    text-align: center;
    padding: 10px 12px;
    font-size: 14px;
  }
`;

const TabContent = styled.div`
  margin-top: 20px;
`;

/**
 * Geofencing Component
 * 
 * Main component for geofencing functionality that allows creating virtual geographic boundaries,
 * monitoring vehicle crossings, generating alerts, and analyzing data.
 */
const Geofencing = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <GeofencingDashboard />;
      case 'geofences':
        return <GeofenceManager />;
      case 'alerts':
        return <AlertConfiguration />;
      case 'reports':
        return <GeofencingReports />;
      case 'routes':
        return <RouteIntegration />;
      default:
        return <GeofencingDashboard />;
    }
  };

  return (
    <PageContainer>
      <PageTitle>Geofencing</PageTitle>
      <Description>
        Create virtual boundaries, monitor vehicle crossings, and analyze geofencing data.
      </Description>
      
      <Card>
        <TabsContainer>
          <TabButton 
            active={activeTab === 'dashboard'}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </TabButton>
          <TabButton 
            active={activeTab === 'geofences'}
            onClick={() => setActiveTab('geofences')}
          >
            Manage Geofences
          </TabButton>
          <TabButton 
            active={activeTab === 'alerts'}
            onClick={() => setActiveTab('alerts')}
          >
            Configure Alerts
          </TabButton>
          <TabButton 
            active={activeTab === 'reports'}
            onClick={() => setActiveTab('reports')}
          >
            Reports
          </TabButton>
          <TabButton 
            active={activeTab === 'routes'}
            onClick={() => setActiveTab('routes')}
          >
            Route Integration
          </TabButton>
        </TabsContainer>
      </Card>
      
      <TabContent>
        {renderActiveTab()}
      </TabContent>
    </PageContainer>
  );
};

export default Geofencing;
