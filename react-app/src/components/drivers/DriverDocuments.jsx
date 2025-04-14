import React from 'react';
import styled from 'styled-components';
import Card from '../common/Card';
import Table from '../common/Table';

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 500;
  color: #333;
  margin: 0 0 16px 0;
`;

const LoadingIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  color: #666;
`;

const AlertContainer = styled.div`
  padding: 12px 16px;
  background-color: #fff3e0;
  border-left: 4px solid #ff9800;
  border-radius: 4px;
  margin-bottom: 16px;
`;

const AlertTitle = styled.div`
  font-weight: 500;
  margin-bottom: 4px;
`;

const AlertMessage = styled.div`
  font-size: 14px;
  color: #666;
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 20px;
`;

const Tab = styled.div`
  padding: 12px 24px;
  cursor: pointer;
  font-weight: ${props => props.active ? '500' : 'normal'};
  color: ${props => props.active ? '#3f51b5' : '#666'};
  border-bottom: 2px solid ${props => props.active ? '#3f51b5' : 'transparent'};
  transition: all 0.3s ease;
  
  &:hover {
    color: #3f51b5;
    background-color: #f5f5f5;
  }
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background-color: ${props => {
    switch (props.status) {
      case 'valid':
        return '#e8f5e9';
      case 'expiring':
        return '#fff8e1';
      case 'expired':
        return '#ffebee';
      default:
        return '#f5f5f5';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'valid':
        return '#2e7d32';
      case 'expiring':
        return '#f57f17';
      case 'expired':
        return '#c62828';
      default:
        return '#666';
    }
  }};
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: ${props => props.primary ? '#3f51b5' : 'white'};
  color: ${props => props.primary ? 'white' : '#3f51b5'};
  border: 1px solid #3f51b5;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.primary ? '#303f9f' : '#f0f0f0'};
  }
  
  &:disabled {
    background-color: #e0e0e0;
    color: #9e9e9e;
    border-color: #e0e0e0;
    cursor: not-allowed;
  }
`;

/**
 * Component for displaying driver documents
 * @param {Object} props - Component props
 * @param {Object} props.documents - Driver documents data
 * @param {boolean} props.isLoading - Loading state
 * @returns {JSX.Element} DriverDocuments component
 */
const DriverDocuments = ({ documents, isLoading }) => {
  const [activeTab, setActiveTab] = React.useState('all');
  
  if (isLoading) {
    return <LoadingIndicator>Ładowanie dokumentów kierowcy...</LoadingIndicator>;
  }
  
  if (!documents || !documents.documents) {
    return <div>Brak danych dokumentów.</div>;
  }
  
  // Check if there are any upcoming expirations
  const hasUpcomingExpirations = documents.upcomingExpirations && documents.upcomingExpirations.length > 0;
  
  // Format document status
  const formatStatus = (status) => {
    switch (status) {
      case 'valid':
        return <StatusBadge status="valid">Ważny</StatusBadge>;
      case 'expiring':
        return <StatusBadge status="expiring">Wygasa wkrótce</StatusBadge>;
      case 'expired':
        return <StatusBadge status="expired">Wygasł</StatusBadge>;
      default:
        return status;
    }
  };
  
  // Filter documents based on active tab
  const filteredDocuments = documents.documents.filter(doc => {
    if (activeTab === 'all') return true;
    return doc.status === activeTab;
  });
  
  // Check if a date is within 30 days
  const isExpiringWithin30Days = (dateString) => {
    const expiryDate = new Date(dateString);
    const today = new Date();
    const diffTime = expiryDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 && diffDays <= 30;
  };
  
  // Check if a date is in the past
  const isExpired = (dateString) => {
    const expiryDate = new Date(dateString);
    const today = new Date();
    return expiryDate < today;
  };
  
  // Update document status based on expiry date
  const documentsWithStatus = filteredDocuments.map(doc => {
    let status = doc.status;
    
    // If status is not explicitly set, determine it from the expiry date
    if (!status) {
      if (isExpired(doc.expiryDate)) {
        status = 'expired';
      } else if (isExpiringWithin30Days(doc.expiryDate)) {
        status = 'expiring';
      } else {
        status = 'valid';
      }
    }
    
    return {
      ...doc,
      status: formatStatus(status)
    };
  });
  
  return (
    <Card>
      <SectionTitle>Dokumenty kierowcy</SectionTitle>
      
      {hasUpcomingExpirations && (
        <AlertContainer>
          <AlertTitle>Zbliżające się terminy ważności</AlertTitle>
          <AlertMessage>
            {documents.upcomingExpirations.map((doc, index) => (
              <div key={index}>
                {doc.type}: wygasa {doc.expiryDate} (pozostało {doc.daysRemaining} dni)
              </div>
            ))}
          </AlertMessage>
        </AlertContainer>
      )}
      
      <TabsContainer>
        <Tab 
          active={activeTab === 'all'} 
          onClick={() => setActiveTab('all')}
        >
          Wszystkie
        </Tab>
        <Tab 
          active={activeTab === 'valid'} 
          onClick={() => setActiveTab('valid')}
        >
          Ważne
        </Tab>
        <Tab 
          active={activeTab === 'expiring'} 
          onClick={() => setActiveTab('expiring')}
        >
          Wygasające
        </Tab>
        <Tab 
          active={activeTab === 'expired'} 
          onClick={() => setActiveTab('expired')}
        >
          Wygasłe
        </Tab>
      </TabsContainer>
      
      <Table 
        columns={[
          { key: 'type', label: 'Typ dokumentu' },
          { key: 'number', label: 'Numer' },
          { key: 'issuedDate', label: 'Data wydania' },
          { key: 'expiryDate', label: 'Data ważności' },
          { key: 'status', label: 'Status' },
          { key: 'actions', label: 'Akcje' }
        ]} 
        data={documentsWithStatus.map(doc => ({
          ...doc,
          actions: (
            <Button>
              Szczegóły
            </Button>
          )
        }))} 
      />
      
      <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
        <Button primary>Dodaj nowy dokument</Button>
      </div>
    </Card>
  );
};

export default DriverDocuments;
