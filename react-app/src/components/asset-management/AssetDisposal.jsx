import React, { useState } from 'react';
import styled from 'styled-components';
import './IconStyles.css';

const AssetDisposal = () => {
  const [disposalRequests, setDisposalRequests] = useState([
    {
      id: 'disp-001',
      assetId: 'asset-001',
      assetName: 'Wózek widłowy Toyota',
      requestDate: '2024-03-10',
      requestedBy: 'Jan Kowalski',
      reason: 'Wysokie koszty utrzymania, przestarzała technologia',
      status: 'pending',
      approvalStatus: 'awaiting',
      estimatedValue: 15000,
      disposalMethod: 'sale',
      documents: [
        { id: 'doc-101', name: 'Wniosek o likwidację', type: 'request', fileUrl: '/documents/disposal-001-request.pdf' }
      ]
    },
    {
      id: 'disp-002',
      assetId: 'asset-003',
      assetName: 'Skaner kodów kreskowych Zebra',
      requestDate: '2024-02-15',
      requestedBy: 'Anna Nowak',
      reason: 'Uszkodzenie mechaniczne, nieopłacalna naprawa',
      status: 'approved',
      approvalStatus: 'approved',
      approvedBy: 'Piotr Wiśniewski',
      approvalDate: '2024-02-20',
      estimatedValue: 300,
      disposalMethod: 'recycle',
      documents: [
        { id: 'doc-102', name: 'Wniosek o likwidację', type: 'request', fileUrl: '/documents/disposal-002-request.pdf' },
        { id: 'doc-103', name: 'Zatwierdzenie likwidacji', type: 'approval', fileUrl: '/documents/disposal-002-approval.pdf' }
      ]
    }
  ]);
  
  const [completedDisposals, setCompletedDisposals] = useState([
    {
      id: 'disp-003',
      assetId: 'asset-006',
      assetName: 'Drukarka etykiet Zebra',
      requestDate: '2024-01-05',
      requestedBy: 'Marek Kowalczyk',
      reason: 'Przestarzała technologia, brak wsparcia producenta',
      status: 'completed',
      approvalStatus: 'approved',
      approvedBy: 'Piotr Wiśniewski',
      approvalDate: '2024-01-10',
      completionDate: '2024-01-20',
      disposalMethod: 'sale',
      saleAmount: 800,
      buyer: 'XYZ Logistics',
      documents: [
        { id: 'doc-104', name: 'Wniosek o likwidację', type: 'request', fileUrl: '/documents/disposal-003-request.pdf' },
        { id: 'doc-105', name: 'Zatwierdzenie likwidacji', type: 'approval', fileUrl: '/documents/disposal-003-approval.pdf' },
        { id: 'doc-106', name: 'Umowa sprzedaży', type: 'sale', fileUrl: '/documents/disposal-003-sale.pdf' }
      ]
    }
  ]);
  
  const [showNewRequestModal, setShowNewRequestModal] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [activeTab, setActiveTab] = useState('pending');
  
  const handleNewRequest = () => {
    setShowNewRequestModal(true);
  };
  
  const handleApproveRequest = (request) => {
    setSelectedRequest(request);
    setShowApprovalModal(true);
  };
  
  const handleCompleteDisposal = (request) => {
    setSelectedRequest(request);
    setShowCompletionModal(true);
  };
  
  const handleViewDetails = (request) => {
    // Implementation for viewing disposal details
    console.log('View details for:', request);
  };
  
  return (
    <DisposalContainer>
      <DisposalHeader>
        <h2>Wycofywanie Aktywów</h2>
        <NewRequestButton onClick={handleNewRequest}>
          <span className="icon icon-plus"></span> Nowy wniosek o likwidację
        </NewRequestButton>
      </DisposalHeader>
      
      <TabsContainer>
        <TabButton 
          active={activeTab === 'pending'} 
          onClick={() => setActiveTab('pending')}
        >
          Wnioski oczekujące ({disposalRequests.length})
        </TabButton>
        <TabButton 
          active={activeTab === 'completed'} 
          onClick={() => setActiveTab('completed')}
        >
          Zakończone likwidacje ({completedDisposals.length})
        </TabButton>
      </TabsContainer>
      
      {activeTab === 'pending' && (
        <DisposalTable>
          <thead>
            <tr>
              <th>Aktywo</th>
              <th>Data wniosku</th>
              <th>Wnioskujący</th>
              <th>Powód</th>
              <th>Status zatwierdzenia</th>
              <th>Szacowana wartość</th>
              <th>Metoda likwidacji</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>
            {disposalRequests.map(request => (
              <tr key={request.id}>
                <td>{request.assetName}</td>
                <td>{request.requestDate}</td>
                <td>{request.requestedBy}</td>
                <td>
                  <TruncatedText title={request.reason}>
                    {request.reason}
                  </TruncatedText>
                </td>
                <td>
                  <StatusBadge status={request.approvalStatus}>
                    {request.approvalStatus === 'awaiting' ? 'Oczekuje' : 
                     request.approvalStatus === 'approved' ? 'Zatwierdzony' : 
                     request.approvalStatus === 'rejected' ? 'Odrzucony' : 'Nieznany'}
                  </StatusBadge>
                </td>
                <td>{request.estimatedValue.toLocaleString()} PLN</td>
                <td>
                  {request.disposalMethod === 'sale' ? 'Sprzedaż' : 
                   request.disposalMethod === 'recycle' ? 'Recykling' : 
                   request.disposalMethod === 'donate' ? 'Darowizna' : 
                   request.disposalMethod === 'scrap' ? 'Złomowanie' : 'Nieznana'}
                </td>
                <td>
                  <ActionButtons>
                    <ActionButton onClick={() => handleViewDetails(request)}>
                      <span className="icon icon-eye"></span>
                    </ActionButton>
                    {request.approvalStatus === 'awaiting' && (
                      <ActionButton onClick={() => handleApproveRequest(request)}>
                        <span className="icon icon-check"></span>
                      </ActionButton>
                    )}
                    {request.approvalStatus === 'approved' && (
                      <ActionButton onClick={() => handleCompleteDisposal(request)}>
                        <span className="icon icon-flag"></span>
                      </ActionButton>
                    )}
                  </ActionButtons>
                </td>
              </tr>
            ))}
          </tbody>
        </DisposalTable>
      )}
      
      {activeTab === 'completed' && (
        <DisposalTable>
          <thead>
            <tr>
              <th>Aktywo</th>
              <th>Data wniosku</th>
              <th>Data zakończenia</th>
              <th>Metoda likwidacji</th>
              <th>Kwota sprzedaży</th>
              <th>Nabywca/Odbiorca</th>
              <th>Dokumenty</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>
            {completedDisposals.map(disposal => (
              <tr key={disposal.id}>
                <td>{disposal.assetName}</td>
                <td>{disposal.requestDate}</td>
                <td>{disposal.completionDate}</td>
                <td>
                  {disposal.disposalMethod === 'sale' ? 'Sprzedaż' : 
                   disposal.disposalMethod === 'recycle' ? 'Recykling' : 
                   disposal.disposalMethod === 'donate' ? 'Darowizna' : 
                   disposal.disposalMethod === 'scrap' ? 'Złomowanie' : 'Nieznana'}
                </td>
                <td>{disposal.saleAmount ? `${disposal.saleAmount.toLocaleString()} PLN` : '-'}</td>
                <td>{disposal.buyer || '-'}</td>
                <td>
                  <DocumentCount>
                    {disposal.documents.length} dokument(ów)
                  </DocumentCount>
                </td>
                <td>
                  <ActionButtons>
                    <ActionButton onClick={() => handleViewDetails(disposal)}>
                      <span className="icon icon-eye"></span>
                    </ActionButton>
                  </ActionButtons>
                </td>
              </tr>
            ))}
          </tbody>
        </DisposalTable>
      )}
      
      {/* Modals would be implemented here */}
      {/* New Request Modal */}
      {/* Approval Modal */}
      {/* Completion Modal */}
    </DisposalContainer>
  );
};

// Styled Components
const DisposalContainer = styled.div`
  padding: 20px;
  width: 100%;
`;

const DisposalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  
  h2 {
    margin: 0;
    color: #333;
  }
`;

const NewRequestButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #1976d2;
  }
  
  .icon {
    font-size: 16px;
  }
`;

const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
`;

const TabButton = styled.button`
  padding: 10px 20px;
  background: none;
  border: none;
  border-bottom: 3px solid ${props => props.active ? '#2196f3' : 'transparent'};
  color: ${props => props.active ? '#2196f3' : '#555'};
  font-weight: ${props => props.active ? '600' : '400'};
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    color: #2196f3;
  }
`;

const DisposalTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 12px 16px;
    text-align: left;
    border-bottom: 1px solid #eee;
  }
  
  th {
    background-color: #f8f9fa;
    font-weight: 600;
    color: #555;
    font-size: 14px;
  }
  
  tbody tr:hover {
    background-color: #f5f5f5;
  }
`;

const TruncatedText = styled.div`
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  color: white;
  background-color: ${props => {
    switch (props.status) {
      case 'awaiting':
        return '#ff9800';
      case 'approved':
        return '#4caf50';
      case 'rejected':
        return '#e53935';
      default:
        return '#9e9e9e';
    }
  }};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background-color: #f0f0f0;
  color: #555;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: #e0e0e0;
    color: #333;
  }
  
  .icon {
    font-size: 16px;
  }
`;

const DocumentCount = styled.span`
  display: inline-block;
  padding: 4px 8px;
  background-color: #f0f0f0;
  border-radius: 12px;
  font-size: 12px;
  color: #555;
`;

export default AssetDisposal;
