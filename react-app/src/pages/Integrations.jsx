import React, { useState } from 'react';
import styled from 'styled-components';
import IntegrationsDashboard from '../components/integrations/IntegrationsDashboard';
import APIManagement from '../components/integrations/APIManagement';
import ThirdPartyConnectors from '../components/integrations/ThirdPartyConnectors';
import TelematicsIntegration from '../components/integrations/TelematicsIntegration';
import FuelCardIntegration from '../components/integrations/FuelCardIntegration';
import MaintenanceSystemsIntegration from '../components/integrations/MaintenanceSystemsIntegration';
import CustomIntegrations from '../components/integrations/CustomIntegrations';

const Container = styled.div`
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #333;
  margin: 0;
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
`;

const Tab = styled.div`
  padding: 10px 20px;
  cursor: pointer;
  border-bottom: 2px solid ${props => props.active ? '#1a73e8' : 'transparent'};
  color: ${props => props.active ? '#1a73e8' : '#333'};
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  transition: all 0.3s ease;

  &:hover {
    color: #1a73e8;
  }
`;

const ContentContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
`;

const ToggleLabel = styled.span`
  margin-right: 10px;
  font-size: 14px;
  color: #666;
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
    border-radius: 20px;
  }

  span:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }

  input:checked + span {
    background-color: #1a73e8;
  }

  input:checked + span:before {
    transform: translateX(20px);
  }
`;

/**
 * Integrations page component that serves as a container for all integration-related components
 * @returns {JSX.Element} Integrations page
 */
const Integrations = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [useMockData, setUseMockData] = useState(true);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleToggleDataSource = () => {
    setUseMockData(!useMockData);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <IntegrationsDashboard useMockData={useMockData} />;
      case 'api':
        return <APIManagement useMockData={useMockData} />;
      case 'connectors':
        return <ThirdPartyConnectors useMockData={useMockData} />;
      case 'telematics':
        return <TelematicsIntegration useMockData={useMockData} />;
      case 'fuelcards':
        return <FuelCardIntegration useMockData={useMockData} />;
      case 'maintenance':
        return <MaintenanceSystemsIntegration useMockData={useMockData} />;
      case 'custom':
        return <CustomIntegrations useMockData={useMockData} />;
      default:
        return <IntegrationsDashboard useMockData={useMockData} />;
    }
  };

  return (
    <Container>
      <Header>
        <Title>Integrations</Title>
        <ToggleContainer>
          <ToggleLabel>Use Mock Data</ToggleLabel>
          <ToggleSwitch>
            <input 
              type="checkbox" 
              checked={useMockData} 
              onChange={handleToggleDataSource} 
            />
            <span></span>
          </ToggleSwitch>
        </ToggleContainer>
      </Header>

      <TabsContainer>
        <Tab 
          active={activeTab === 'dashboard'} 
          onClick={() => handleTabChange('dashboard')}
        >
          Dashboard
        </Tab>
        <Tab 
          active={activeTab === 'api'} 
          onClick={() => handleTabChange('api')}
        >
          API Management
        </Tab>
        <Tab 
          active={activeTab === 'connectors'} 
          onClick={() => handleTabChange('connectors')}
        >
          Third-Party Connectors
        </Tab>
        <Tab 
          active={activeTab === 'telematics'} 
          onClick={() => handleTabChange('telematics')}
        >
          Telematics
        </Tab>
        <Tab 
          active={activeTab === 'fuelcards'} 
          onClick={() => handleTabChange('fuelcards')}
        >
          Fuel Cards
        </Tab>
        <Tab 
          active={activeTab === 'maintenance'} 
          onClick={() => handleTabChange('maintenance')}
        >
          Maintenance Systems
        </Tab>
        <Tab 
          active={activeTab === 'custom'} 
          onClick={() => handleTabChange('custom')}
        >
          Custom Integrations
        </Tab>
      </TabsContainer>

      <ContentContainer>
        {renderContent()}
      </ContentContainer>
    </Container>
  );
};

export default Integrations;
