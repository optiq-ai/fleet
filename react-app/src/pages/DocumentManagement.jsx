import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  getDocumentsDashboard, 
  getDocuments, 
  getDocumentCategories, 
  getDocumentAlerts 
} from '../services/api/documentManagementService';
import { 
  getDocumentsDashboard as getMockDocumentsDashboard, 
  getDocuments as getMockDocuments, 
  getDocumentCategories as getMockDocumentCategories, 
  getDocumentAlerts as getMockDocumentAlerts 
} from '../services/api/mockDocumentManagementService';
import DocumentsDashboard from '../components/document-management/DocumentsDashboard';
import VehicleDocuments from '../components/document-management/VehicleDocuments';
import DriverDocuments from '../components/document-management/DriverDocuments';
import OperationalDocuments from '../components/document-management/OperationalDocuments';
import ComplianceDocuments from '../components/document-management/ComplianceDocuments';
import DocumentSearch from '../components/document-management/DocumentSearch';
import DocumentAutomation from '../components/document-management/DocumentAutomation';

const DocumentManagement = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // State for data
  const [dashboardData, setDashboardData] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [documentCategories, setDocumentCategories] = useState([]);
  const [documentAlerts, setDocumentAlerts] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 0 });
  
  // State for filters
  const [filters, setFilters] = useState({
    type: '',
    category: '',
    status: 'active',
    search: '',
    page: 1,
    limit: 10
  });
  
  // State for loading and error
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // State for mock data toggle
  const [useMockData, setUseMockData] = useState(true);
  
  // Function to toggle between real and mock data
  const handleToggleDataSource = () => {
    setUseMockData(!useMockData);
  };
  
  // Function to handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    
    // Reset filters when changing tabs
    if (tab !== 'search') {
      let type = '';
      
      switch (tab) {
        case 'vehicle':
          type = 'vehicle';
          break;
        case 'driver':
          type = 'driver';
          break;
        case 'operational':
          type = 'operational';
          break;
        case 'compliance':
          type = 'compliance';
          break;
        default:
          type = '';
      }
      
      setFilters({
        ...filters,
        type,
        page: 1
      });
    }
  };
  
  // Function to handle filter change
  const handleFilterChange = (name, value) => {
    setFilters({
      ...filters,
      [name]: value,
      page: name === 'page' ? value : 1
    });
  };
  
  // Function to fetch dashboard data
  const fetchDashboardData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = useMockData 
        ? await getMockDocumentsDashboard()
        : await getDocumentsDashboard();
      
      setDashboardData(data);
    } catch (error) {
      setError('Failed to load dashboard data. Please try again later.');
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Function to fetch documents
  const fetchDocuments = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = useMockData 
        ? await getMockDocuments(filters)
        : await getDocuments(filters);
      
      setDocuments(result.data);
      setPagination(result.pagination);
    } catch (error) {
      setError('Failed to load documents. Please try again later.');
      console.error('Error fetching documents:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Function to fetch document categories
  const fetchDocumentCategories = async () => {
    try {
      const categories = useMockData 
        ? await getMockDocumentCategories()
        : await getDocumentCategories();
      
      setDocumentCategories(categories);
    } catch (error) {
      console.error('Error fetching document categories:', error);
    }
  };
  
  // Function to fetch document alerts
  const fetchDocumentAlerts = async () => {
    try {
      const alerts = useMockData 
        ? await getMockDocumentAlerts({ status: 'active' })
        : await getDocumentAlerts({ status: 'active' });
      
      setDocumentAlerts(alerts);
    } catch (error) {
      console.error('Error fetching document alerts:', error);
    }
  };
  
  // Effect to fetch initial data
  useEffect(() => {
    fetchDocumentCategories();
    fetchDocumentAlerts();
  }, [useMockData]);
  
  // Effect to fetch data based on active tab
  useEffect(() => {
    if (activeTab === 'dashboard') {
      fetchDashboardData();
    } else {
      fetchDocuments();
    }
  }, [activeTab, filters, useMockData]);
  
  // Render the component based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <DocumentsDashboard 
            data={dashboardData} 
            alerts={documentAlerts}
            isLoading={isLoading}
            error={error}
            onTabChange={handleTabChange}
          />
        );
      case 'vehicle':
        return (
          <VehicleDocuments 
            documents={documents}
            categories={documentCategories.filter(cat => cat.type === 'vehicle')}
            pagination={pagination}
            filters={filters}
            isLoading={isLoading}
            error={error}
            onFilterChange={handleFilterChange}
          />
        );
      case 'driver':
        return (
          <DriverDocuments 
            documents={documents}
            categories={documentCategories.filter(cat => cat.type === 'driver')}
            pagination={pagination}
            filters={filters}
            isLoading={isLoading}
            error={error}
            onFilterChange={handleFilterChange}
          />
        );
      case 'operational':
        return (
          <OperationalDocuments 
            documents={documents}
            categories={documentCategories.filter(cat => cat.type === 'operational')}
            pagination={pagination}
            filters={filters}
            isLoading={isLoading}
            error={error}
            onFilterChange={handleFilterChange}
          />
        );
      case 'compliance':
        return (
          <ComplianceDocuments 
            documents={documents}
            categories={documentCategories.filter(cat => cat.type === 'compliance')}
            pagination={pagination}
            filters={filters}
            isLoading={isLoading}
            error={error}
            onFilterChange={handleFilterChange}
          />
        );
      case 'search':
        return (
          <DocumentSearch 
            documents={documents}
            categories={documentCategories}
            pagination={pagination}
            filters={filters}
            isLoading={isLoading}
            error={error}
            onFilterChange={handleFilterChange}
          />
        );
      case 'automation':
        return (
          <DocumentAutomation 
            categories={documentCategories}
            isLoading={isLoading}
            error={error}
          />
        );
      default:
        return null;
    }
  };
  
  return (
    <Container>
      <Header>
        <Title>Document Management</Title>
        <DataSourceToggle>
          <span>Data Source:</span>
          <ToggleButton 
            active={useMockData} 
            onClick={handleToggleDataSource}
          >
            {useMockData ? 'Using Mock Data' : 'Using API Data'}
          </ToggleButton>
        </DataSourceToggle>
      </Header>
      
      <TabsContainer>
        <TabButton 
          active={activeTab === 'dashboard'} 
          onClick={() => handleTabChange('dashboard')}
        >
          Dashboard
        </TabButton>
        <TabButton 
          active={activeTab === 'vehicle'} 
          onClick={() => handleTabChange('vehicle')}
        >
          Vehicle Documents
        </TabButton>
        <TabButton 
          active={activeTab === 'driver'} 
          onClick={() => handleTabChange('driver')}
        >
          Driver Documents
        </TabButton>
        <TabButton 
          active={activeTab === 'operational'} 
          onClick={() => handleTabChange('operational')}
        >
          Operational Documents
        </TabButton>
        <TabButton 
          active={activeTab === 'compliance'} 
          onClick={() => handleTabChange('compliance')}
        >
          Compliance Documents
        </TabButton>
        <TabButton 
          active={activeTab === 'search'} 
          onClick={() => handleTabChange('search')}
        >
          Search
        </TabButton>
        <TabButton 
          active={activeTab === 'automation'} 
          onClick={() => handleTabChange('automation')}
        >
          Automation
        </TabButton>
      </TabsContainer>
      
      <ContentContainer>
        {renderContent()}
      </ContentContainer>
    </Container>
  );
};

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px;
  background-color: #f5f7fa;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

const DataSourceToggle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: #666;
`;

const ToggleButton = styled.button`
  background-color: ${props => props.active ? '#4caf50' : '#f1f1f1'};
  color: ${props => props.active ? 'white' : '#333'};
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.active ? '#45a049' : '#e0e0e0'};
  }
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 20px;
  overflow-x: auto;
  padding-bottom: 5px;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

const TabButton = styled.button`
  background-color: ${props => props.active ? '#2196f3' : '#f1f1f1'};
  color: ${props => props.active ? 'white' : '#333'};
  border: none;
  border-radius: 4px;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 14px;
  font-weight: ${props => props.active ? '600' : '400'};
  transition: all 0.3s ease;
  white-space: nowrap;
  
  &:hover {
    background-color: ${props => props.active ? '#1e88e5' : '#e0e0e0'};
  }
`;

const ContentContainer = styled.div`
  flex: 1;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  overflow: auto;
`;

export default DocumentManagement;
