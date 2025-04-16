import React from 'react';
import styled from 'styled-components';
import './IconStyles.css';

const DocumentsDashboard = ({ data, alerts, isLoading, error, onTabChange }) => {
  if (isLoading) {
    return <LoadingMessage>Loading dashboard data...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  if (!data) {
    return <EmptyMessage>No dashboard data available.</EmptyMessage>;
  }

  return (
    <Container>
      <KPISection>
        <KPICard>
          <KPIIcon>
            <span className="icon icon-file"></span>
          </KPIIcon>
          <KPIContent>
            <KPITitle>Total Documents</KPITitle>
            <KPIValue>{data.documentCounts.total}</KPIValue>
            <KPISubtitle>By Type</KPISubtitle>
            <KPIDetails>
              <KPIDetailItem onClick={() => onTabChange('vehicle')}>
                Vehicle: {data.documentCounts.byType.vehicle}
              </KPIDetailItem>
              <KPIDetailItem onClick={() => onTabChange('driver')}>
                Driver: {data.documentCounts.byType.driver}
              </KPIDetailItem>
              <KPIDetailItem onClick={() => onTabChange('operational')}>
                Operational: {data.documentCounts.byType.operational}
              </KPIDetailItem>
              <KPIDetailItem onClick={() => onTabChange('compliance')}>
                Compliance: {data.documentCounts.byType.compliance}
              </KPIDetailItem>
            </KPIDetails>
          </KPIContent>
        </KPICard>

        <KPICard>
          <KPIIcon className="expiring">
            <span className="icon icon-calendar"></span>
          </KPIIcon>
          <KPIContent>
            <KPITitle>Expiring Documents</KPITitle>
            <KPIValue>{data.expiringDocuments.next30Days}</KPIValue>
            <KPISubtitle>Expiration Timeline</KPISubtitle>
            <KPIDetails>
              <KPIDetailItem className="critical">
                Next 7 Days: {data.expiringDocuments.next7Days}
              </KPIDetailItem>
              <KPIDetailItem className="warning">
                Next 30 Days: {data.expiringDocuments.next30Days}
              </KPIDetailItem>
              <KPIDetailItem>
                Next 90 Days: {data.expiringDocuments.next90Days}
              </KPIDetailItem>
            </KPIDetails>
          </KPIContent>
        </KPICard>

        <KPICard>
          <KPIIcon className="compliance">
            <span className="icon icon-check-circle"></span>
          </KPIIcon>
          <KPIContent>
            <KPITitle>Compliance Rate</KPITitle>
            <KPIValue>{data.complianceRate.overall}%</KPIValue>
            <KPISubtitle>By Document Type</KPISubtitle>
            <KPIDetails>
              <KPIDetailItem>
                Vehicle: {data.complianceRate.byType.vehicle}%
              </KPIDetailItem>
              <KPIDetailItem>
                Driver: {data.complianceRate.byType.driver}%
              </KPIDetailItem>
              <KPIDetailItem>
                Operational: {data.complianceRate.byType.operational}%
              </KPIDetailItem>
              <KPIDetailItem>
                Compliance: {data.complianceRate.byType.compliance}%
              </KPIDetailItem>
            </KPIDetails>
          </KPIContent>
        </KPICard>

        <KPICard>
          <KPIIcon className="activity">
            <span className="icon icon-file"></span>
          </KPIIcon>
          <KPIContent>
            <KPITitle>Recent Activity</KPITitle>
            <KPIValue>{data.recentActivity.added + data.recentActivity.updated}</KPIValue>
            <KPISubtitle>Activity Breakdown</KPISubtitle>
            <KPIDetails>
              <KPIDetailItem>
                Added: {data.recentActivity.added}
              </KPIDetailItem>
              <KPIDetailItem>
                Updated: {data.recentActivity.updated}
              </KPIDetailItem>
              <KPIDetailItem>
                Viewed: {data.recentActivity.viewed}
              </KPIDetailItem>
            </KPIDetails>
          </KPIContent>
        </KPICard>
      </KPISection>

      <AlertsSection>
        <SectionTitle>
          <span className="icon icon-warning"></span> Active Alerts
        </SectionTitle>
        {alerts && alerts.length > 0 ? (
          <AlertsList>
            {alerts.map(alert => (
              <AlertItem key={alert.id} severity={alert.severity}>
                <AlertHeader>
                  <AlertTitle>{alert.message}</AlertTitle>
                  <AlertSeverity severity={alert.severity}>
                    {alert.severity}
                  </AlertSeverity>
                </AlertHeader>
                <AlertDetails>
                  {alert.documentName && (
                    <AlertDetail>Document: {alert.documentName}</AlertDetail>
                  )}
                  {alert.dueDate && (
                    <AlertDetail>Due Date: {new Date(alert.dueDate).toLocaleDateString()}</AlertDetail>
                  )}
                  <AlertDetail>Type: {alert.type}</AlertDetail>
                </AlertDetails>
                <AlertActions>
                  <AlertButton>Acknowledge</AlertButton>
                  <AlertButton primary>Resolve</AlertButton>
                </AlertActions>
              </AlertItem>
            ))}
          </AlertsList>
        ) : (
          <EmptyMessage>No active alerts at this time.</EmptyMessage>
        )}
      </AlertsSection>

      <ActionSection>
        <ActionCard onClick={() => onTabChange('search')}>
          <ActionIcon>
            <span className="icon icon-file"></span>
          </ActionIcon>
          <ActionTitle>Search Documents</ActionTitle>
          <ActionDescription>
            Search and filter documents across all categories
          </ActionDescription>
        </ActionCard>

        <ActionCard onClick={() => onTabChange('vehicle')}>
          <ActionIcon>
            <span className="icon icon-file"></span>
          </ActionIcon>
          <ActionTitle>Vehicle Documents</ActionTitle>
          <ActionDescription>
            Manage registration, insurance, and technical inspection documents
          </ActionDescription>
        </ActionCard>

        <ActionCard onClick={() => onTabChange('driver')}>
          <ActionIcon>
            <span className="icon icon-file"></span>
          </ActionIcon>
          <ActionTitle>Driver Documents</ActionTitle>
          <ActionDescription>
            Manage licenses, certifications, and medical documents
          </ActionDescription>
        </ActionCard>

        <ActionCard onClick={() => onTabChange('automation')}>
          <ActionIcon>
            <span className="icon icon-file"></span>
          </ActionIcon>
          <ActionTitle>Document Automation</ActionTitle>
          <ActionDescription>
            Set up templates, reminders, and automated workflows
          </ActionDescription>
        </ActionCard>
      </ActionSection>
    </Container>
  );
};

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 18px;
  color: #666;
`;

const ErrorMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 18px;
  color: #d32f2f;
  background-color: #ffebee;
  border-radius: 4px;
  padding: 20px;
`;

const EmptyMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  font-size: 16px;
  color: #666;
  background-color: #f5f5f5;
  border-radius: 4px;
  padding: 20px;
`;

const KPISection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
`;

const KPICard = styled.div`
  display: flex;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

const KPIIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  background-color: #e3f2fd;
  color: #2196f3;
  border-radius: 8px;
  margin-right: 15px;
  font-size: 24px;
  
  &.expiring {
    background-color: #fff8e1;
    color: #ffc107;
  }
  
  &.compliance {
    background-color: #e8f5e9;
    color: #4caf50;
  }
  
  &.activity {
    background-color: #e8eaf6;
    color: #3f51b5;
  }
`;

const KPIContent = styled.div`
  flex: 1;
`;

const KPITitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: #666;
  margin: 0 0 5px 0;
`;

const KPIValue = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #333;
  margin-bottom: 10px;
`;

const KPISubtitle = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #888;
  margin-bottom: 5px;
`;

const KPIDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const KPIDetailItem = styled.div`
  font-size: 12px;
  color: #666;
  cursor: pointer;
  
  &:hover {
    color: #2196f3;
    text-decoration: underline;
  }
  
  &.critical {
    color: #d32f2f;
  }
  
  &.warning {
    color: #f57c00;
  }
`;

const AlertsSection = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0 0 20px 0;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const AlertsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const AlertItem = styled.div`
  background-color: ${props => {
    switch (props.severity) {
      case 'critical':
        return '#ffebee';
      case 'warning':
        return '#fff8e1';
      case 'info':
        return '#e3f2fd';
      default:
        return '#f5f5f5';
    }
  }};
  border-left: 4px solid ${props => {
    switch (props.severity) {
      case 'critical':
        return '#d32f2f';
      case 'warning':
        return '#f57c00';
      case 'info':
        return '#2196f3';
      default:
        return '#9e9e9e';
    }
  }};
  border-radius: 4px;
  padding: 15px;
`;

const AlertHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const AlertTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #333;
`;

const AlertSeverity = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: white;
  background-color: ${props => {
    switch (props.severity) {
      case 'critical':
        return '#d32f2f';
      case 'warning':
        return '#f57c00';
      case 'info':
        return '#2196f3';
      default:
        return '#9e9e9e';
    }
  }};
  padding: 4px 8px;
  border-radius: 4px;
  text-transform: uppercase;
`;

const AlertDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 15px;
`;

const AlertDetail = styled.div`
  font-size: 12px;
  color: #666;
  background-color: rgba(0, 0, 0, 0.05);
  padding: 4px 8px;
  border-radius: 4px;
`;

const AlertActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const AlertButton = styled.button`
  background-color: ${props => props.primary ? '#2196f3' : 'transparent'};
  color: ${props => props.primary ? 'white' : '#666'};
  border: ${props => props.primary ? 'none' : '1px solid #ddd'};
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.primary ? '#1e88e5' : '#f5f5f5'};
  }
`;

const ActionSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const ActionCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

const ActionIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  background-color: #e3f2fd;
  color: #2196f3;
  border-radius: 50%;
  margin-bottom: 15px;
  font-size: 24px;
`;

const ActionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 10px 0;
  text-align: center;
`;

const ActionDescription = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
  text-align: center;
`;

export default DocumentsDashboard;
