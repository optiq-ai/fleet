import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CommunicationDashboard from '../components/communication/CommunicationDashboard';
import DriverMessaging from '../components/communication/DriverMessaging';
import TeamCollaboration from '../components/communication/TeamCollaboration';
import CustomerCommunication from '../components/communication/CustomerCommunication';
import NotificationCenter from '../components/communication/NotificationCenter';
import CommunicationTemplates from '../components/communication/CommunicationTemplates';
import CommunicationAnalytics from '../components/communication/CommunicationAnalytics';
import { getCommunicationDashboard } from '../services/api/communicationService';
import '../components/communication/IconStyles.css';

const PageContainer = styled.div`
  padding: 20px;
  background-color: #f5f7fa;
  min-height: calc(100vh - 60px);
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
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
  overflow-x: auto;
`;

const TabButton = styled.button`
  padding: 15px 20px;
  background-color: ${props => props.active ? '#f0f5ff' : 'transparent'};
  color: ${props => props.active ? '#1a73e8' : '#555'};
  border: none;
  cursor: pointer;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  border-bottom: ${props => props.active ? '2px solid #1a73e8' : 'none'};
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;

  &:hover {
    background-color: #f8f9fa;
  }
`;

const ContentContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: 20px;
`;

const DataSourceToggle = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
`;

const ToggleLabel = styled.span`
  font-size: 14px;
  margin-right: 8px;
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

const Communication = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [useMockData, setUseMockData] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getCommunicationDashboard(useMockData);
        setDashboardData(data);
      } catch (err) {
        console.error('Error fetching communication dashboard data:', err);
        setError('Nie udało się pobrać danych dashboardu komunikacji.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [useMockData]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleToggleDataSource = () => {
    setUseMockData(!useMockData);
  };

  return (
    <PageContainer>
      <Header>
        <Title>Komunikacja</Title>
        <DataSourceToggle>
          <ToggleLabel>Dane rzeczywiste</ToggleLabel>
          <ToggleSwitch>
            <input 
              type="checkbox" 
              checked={useMockData} 
              onChange={handleToggleDataSource} 
            />
            <span></span>
          </ToggleSwitch>
          <ToggleLabel>Dane testowe</ToggleLabel>
        </DataSourceToggle>
      </Header>

      <TabsContainer>
        <TabButton 
          active={activeTab === 'dashboard'} 
          onClick={() => handleTabChange('dashboard')}
        >
          <span className="icon icon-dashboard"></span> Dashboard
        </TabButton>
        <TabButton 
          active={activeTab === 'driver-messaging'} 
          onClick={() => handleTabChange('driver-messaging')}
        >
          <span className="icon icon-message"></span> Wiadomości do kierowców
        </TabButton>
        <TabButton 
          active={activeTab === 'team-collaboration'} 
          onClick={() => handleTabChange('team-collaboration')}
        >
          <span className="icon icon-users"></span> Współpraca zespołowa
        </TabButton>
        <TabButton 
          active={activeTab === 'customer-communication'} 
          onClick={() => handleTabChange('customer-communication')}
        >
          <span className="icon icon-customer"></span> Komunikacja z klientami
        </TabButton>
        <TabButton 
          active={activeTab === 'notification-center'} 
          onClick={() => handleTabChange('notification-center')}
        >
          <span className="icon icon-bell"></span> Centrum powiadomień
        </TabButton>
        <TabButton 
          active={activeTab === 'templates'} 
          onClick={() => handleTabChange('templates')}
        >
          <span className="icon icon-template"></span> Szablony
        </TabButton>
        <TabButton 
          active={activeTab === 'analytics'} 
          onClick={() => handleTabChange('analytics')}
        >
          <span className="icon icon-chart"></span> Analityka
        </TabButton>
      </TabsContainer>

      <ContentContainer>
        {isLoading && <p>Ładowanie danych...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        
        {!isLoading && !error && (
          <>
            {activeTab === 'dashboard' && <CommunicationDashboard dashboardData={dashboardData} />}
            {activeTab === 'driver-messaging' && <DriverMessaging useMockData={useMockData} />}
            {activeTab === 'team-collaboration' && <TeamCollaboration useMockData={useMockData} />}
            {activeTab === 'customer-communication' && <CustomerCommunication useMockData={useMockData} />}
            {activeTab === 'notification-center' && <NotificationCenter useMockData={useMockData} />}
            {activeTab === 'templates' && <CommunicationTemplates useMockData={useMockData} />}
            {activeTab === 'analytics' && <CommunicationAnalytics useMockData={useMockData} />}
          </>
        )}
      </ContentContainer>
    </PageContainer>
  );
};

export default Communication;
