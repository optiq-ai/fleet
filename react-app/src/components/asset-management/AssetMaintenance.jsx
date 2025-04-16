import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  getAssetMaintenanceHistory, 
  getAssetMaintenanceSchedule,
  recordAssetMaintenance,
  scheduleAssetMaintenance,
  getAssets
} from '../../services/api/mockAssetManagementService';
import './IconStyles.css';

const AssetMaintenance = () => {
  const [assets, setAssets] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [maintenanceHistory, setMaintenanceHistory] = useState([]);
  const [maintenanceSchedule, setMaintenanceSchedule] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);
  const [isScheduleLoading, setIsScheduleLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('schedule');
  const [showAddScheduleModal, setShowAddScheduleModal] = useState(false);
  const [showRecordMaintenanceModal, setShowRecordMaintenanceModal] = useState(false);
  const [historyFilters, setHistoryFilters] = useState({
    startDate: '',
    endDate: '',
    type: '',
    page: 1,
    limit: 5
  });
  const [historyPagination, setHistoryPagination] = useState({
    total: 0,
    page: 1,
    limit: 5,
    pages: 0
  });

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        setIsLoading(true);
        const response = await getAssets({ status: 'active' });
        setAssets(response.assets);
        
        // Select first asset by default if available
        if (response.assets.length > 0 && !selectedAsset) {
          setSelectedAsset(response.assets[0]);
        }
        
        setError(null);
      } catch (err) {
        console.error('Error fetching assets:', err);
        setError('Nie udało się pobrać listy aktywów. Spróbuj ponownie później.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssets();
  }, []);

  useEffect(() => {
    if (selectedAsset) {
      fetchMaintenanceData();
    }
  }, [selectedAsset, activeTab, historyFilters]);

  const fetchMaintenanceData = async () => {
    if (!selectedAsset) return;

    if (activeTab === 'schedule' || activeTab === 'both') {
      try {
        setIsScheduleLoading(true);
        const schedule = await getAssetMaintenanceSchedule(selectedAsset.id);
        setMaintenanceSchedule(schedule);
      } catch (err) {
        console.error('Error fetching maintenance schedule:', err);
        setError('Nie udało się pobrać harmonogramu konserwacji.');
      } finally {
        setIsScheduleLoading(false);
      }
    }

    if (activeTab === 'history' || activeTab === 'both') {
      try {
        setIsHistoryLoading(true);
        const history = await getAssetMaintenanceHistory(selectedAsset.id, historyFilters);
        setMaintenanceHistory(history.history);
        setHistoryPagination(history.pagination);
      } catch (err) {
        console.error('Error fetching maintenance history:', err);
        setError('Nie udało się pobrać historii konserwacji.');
      } finally {
        setIsHistoryLoading(false);
      }
    }
  };

  const handleAssetChange = (e) => {
    const assetId = e.target.value;
    const asset = assets.find(a => a.id === assetId);
    setSelectedAsset(asset);
    // Reset filters and pagination when changing asset
    setHistoryFilters({
      startDate: '',
      endDate: '',
      type: '',
      page: 1,
      limit: 5
    });
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleHistoryFilterChange = (name, value) => {
    setHistoryFilters(prev => ({
      ...prev,
      [name]: value,
      page: name === 'page' ? value : 1 // Reset to page 1 when changing filters
    }));
  };

  const handleScheduleMaintenance = async (formData) => {
    try {
      await scheduleAssetMaintenance(selectedAsset.id, formData);
      setShowAddScheduleModal(false);
      fetchMaintenanceData();
    } catch (err) {
      console.error('Error scheduling maintenance:', err);
      setError('Nie udało się zaplanować konserwacji.');
    }
  };

  const handleRecordMaintenance = async (formData) => {
    try {
      await recordAssetMaintenance(selectedAsset.id, formData);
      setShowRecordMaintenanceModal(false);
      fetchMaintenanceData();
    } catch (err) {
      console.error('Error recording maintenance:', err);
      setError('Nie udało się zarejestrować konserwacji.');
    }
  };

  const getMaintenanceTypeLabel = (type) => {
    switch (type) {
      case 'inspection':
        return 'Przegląd';
      case 'service':
        return 'Serwis';
      case 'repair':
        return 'Naprawa';
      case 'calibration':
        return 'Kalibracja';
      default:
        return type;
    }
  };

  const getUnitLabel = (unit) => {
    switch (unit) {
      case 'days':
        return 'dni';
      case 'months':
        return 'miesięcy';
      case 'years':
        return 'lat';
      case 'hours':
        return 'godzin';
      case 'kilometers':
        return 'kilometrów';
      default:
        return unit;
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'completed':
        return 'Zakończone';
      case 'scheduled':
        return 'Zaplanowane';
      case 'in_progress':
        return 'W trakcie';
      case 'overdue':
        return 'Zaległe';
      default:
        return status;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return '#4caf50';
      case 'scheduled':
        return '#2196f3';
      case 'in_progress':
        return '#ff9800';
      case 'overdue':
        return '#e53935';
      default:
        return '#9e9e9e';
    }
  };

  const getDueDateColor = (dueDate) => {
    if (!dueDate) return '#9e9e9e';
    
    const today = new Date();
    const due = new Date(dueDate);
    const diffDays = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return '#e53935'; // Overdue
    if (diffDays < 7) return '#ff9800'; // Due soon
    if (diffDays < 30) return '#4caf50'; // Due in a month
    return '#2196f3'; // Due later
  };

  if (isLoading && assets.length === 0) {
    return <LoadingContainer>Ładowanie danych konserwacji...</LoadingContainer>;
  }

  if (error) {
    return <ErrorContainer>{error}</ErrorContainer>;
  }

  return (
    <MaintenanceContainer>
      <MaintenanceHeader>
        <h2>Zarządzanie Konserwacją</h2>
        <ActionButtons>
          <Button 
            onClick={() => setShowRecordMaintenanceModal(true)}
            disabled={!selectedAsset}
          >
            <span className="icon icon-plus"></span> Zarejestruj konserwację
          </Button>
          <Button 
            onClick={() => setShowAddScheduleModal(true)}
            disabled={!selectedAsset}
          >
            <span className="icon icon-calendar"></span> Zaplanuj konserwację
          </Button>
        </ActionButtons>
      </MaintenanceHeader>

      <AssetSelector>
        <AssetSelectorLabel>Wybierz aktywo:</AssetSelectorLabel>
        <AssetSelectorSelect 
          value={selectedAsset?.id || ''}
          onChange={handleAssetChange}
        >
          <option value="">Wybierz aktywo</option>
          {assets.map(asset => (
            <option key={asset.id} value={asset.id}>
              {asset.name} ({asset.serialNumber})
            </option>
          ))}
        </AssetSelectorSelect>
      </AssetSelector>

      {selectedAsset ? (
        <>
          <AssetInfoCard>
            <AssetInfoHeader>
              <AssetName>{selectedAsset.name}</AssetName>
              <AssetSerialNumber>S/N: {selectedAsset.serialNumber}</AssetSerialNumber>
            </AssetInfoHeader>
            <AssetInfoDetails>
              <AssetInfoItem>
                <AssetInfoLabel>Typ:</AssetInfoLabel>
                <AssetInfoValue>{selectedAsset.type}</AssetInfoValue>
              </AssetInfoItem>
              <AssetInfoItem>
                <AssetInfoLabel>Kategoria:</AssetInfoLabel>
                <AssetInfoValue>{selectedAsset.category}</AssetInfoValue>
              </AssetInfoItem>
              <AssetInfoItem>
                <AssetInfoLabel>Producent:</AssetInfoLabel>
                <AssetInfoValue>{selectedAsset.manufacturer}</AssetInfoValue>
              </AssetInfoItem>
              <AssetInfoItem>
                <AssetInfoLabel>Model:</AssetInfoLabel>
                <AssetInfoValue>{selectedAsset.model}</AssetInfoValue>
              </AssetInfoItem>
              <AssetInfoItem>
                <AssetInfoLabel>Lokalizacja:</AssetInfoLabel>
                <AssetInfoValue>{selectedAsset.location}</AssetInfoValue>
              </AssetInfoItem>
              <AssetInfoItem>
                <AssetInfoLabel>Status:</AssetInfoLabel>
                <AssetInfoValue>
                  <StatusBadge color={selectedAsset.status === 'active' ? '#4caf50' : '#ff9800'}>
                    {selectedAsset.status === 'active' ? 'Aktywny' : 'W konserwacji'}
                  </StatusBadge>
                </AssetInfoValue>
              </AssetInfoItem>
            </AssetInfoDetails>
          </AssetInfoCard>

          <TabsContainer>
            <TabButton 
              active={activeTab === 'schedule'} 
              onClick={() => handleTabChange('schedule')}
            >
              <span className="icon icon-calendar"></span> Harmonogram konserwacji
            </TabButton>
            <TabButton 
              active={activeTab === 'history'} 
              onClick={() => handleTabChange('history')}
            >
              <span className="icon icon-history"></span> Historia konserwacji
            </TabButton>
            <TabButton 
              active={activeTab === 'both'} 
              onClick={() => handleTabChange('both')}
            >
              <span className="icon icon-columns"></span> Widok pełny
            </TabButton>
          </TabsContainer>

          <ContentContainer>
            {(activeTab === 'schedule' || activeTab === 'both') && (
              <ContentSection>
                {activeTab === 'both' && <SectionTitle>Harmonogram konserwacji</SectionTitle>}
                
                {isScheduleLoading ? (
                  <LoadingMessage>Ładowanie harmonogramu konserwacji...</LoadingMessage>
                ) : maintenanceSchedule.length > 0 ? (
                  <ScheduleTable>
                    <thead>
                      <tr>
                        <th>Typ</th>
                        <th>Interwał</th>
                        <th>Ostatnio wykonano</th>
                        <th>Następny termin</th>
                        <th>Status</th>
                        <th>Akcje</th>
                      </tr>
                    </thead>
                    <tbody>
                      {maintenanceSchedule.map((item, index) => {
                        const isOverdue = new Date(item.nextDue) < new Date();
                        const isDueSoon = new Date(item.nextDue) < new Date(new Date().setDate(new Date().getDate() + 7));
                        
                        return (
                          <tr key={index}>
                            <td>{getMaintenanceTypeLabel(item.type)}</td>
                            <td>{item.interval} {getUnitLabel(item.unit)}</td>
                            <td>{item.lastPerformed || 'Nigdy'}</td>
                            <td>
                              <DueDate color={getDueDateColor(item.nextDue)}>
                                {item.nextDue}
                              </DueDate>
                            </td>
                            <td>
                              <StatusBadge 
                                color={isOverdue ? '#e53935' : isDueSoon ? '#ff9800' : '#4caf50'}
                              >
                                {isOverdue ? 'Zaległe' : isDueSoon ? 'Wkrótce' : 'Planowe'}
                              </StatusBadge>
                            </td>
                            <td>
                              <ActionButton onClick={() => setShowRecordMaintenanceModal(true)}>
                                <span className="icon icon-check"></span> Wykonaj
                              </ActionButton>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </ScheduleTable>
                ) : (
                  <EmptyMessage>Brak zaplanowanych konserwacji dla tego aktywa</EmptyMessage>
                )}
              </ContentSection>
            )}

            {(activeTab === 'history' || activeTab === 'both') && (
              <ContentSection>
                {activeTab === 'both' && <SectionTitle>Historia konserwacji</SectionTitle>}
                
                <FiltersContainer>
                  <FilterGroup>
                    <FilterLabel>Od daty:</FilterLabel>
                    <FilterInput 
                      type="date" 
                      value={historyFilters.startDate}
                      onChange={(e) => handleHistoryFilterChange('startDate', e.target.value)}
                    />
                  </FilterGroup>
                  <FilterGroup>
                    <FilterLabel>Do daty:</FilterLabel>
                    <FilterInput 
                      type="date" 
                      value={historyFilters.endDate}
                      onChange={(e) => handleHistoryFilterChange('endDate', e.target.value)}
                    />
                  </FilterGroup>
                  <FilterGroup>
                    <FilterLabel>Typ:</FilterLabel>
                    <FilterSelect 
                      value={historyFilters.type}
                      onChange={(e) => handleHistoryFilterChange('type', e.target.value)}
                    >
                      <option value="">Wszystkie</option>
                      <option value="inspection">Przegląd</option>
                      <option value="service">Serwis</option>
                      <option value="repair">Naprawa</option>
                      <option value="calibration">Kalibracja</option>
                    </FilterSelect>
                  </FilterGroup>
                </FiltersContainer>
                
                {isHistoryLoading ? (
                  <LoadingMessage>Ładowanie historii konserwacji...</LoadingMessage>
                ) : maintenanceHistory.length > 0 ? (
                  <>
                    <HistoryList>
                      {maintenanceHistory.map(item => (
                        <HistoryItem key={item.id}>
                          <HistoryHeader>
                            <HistoryType>
                              <TypeIcon>
                                <span className={`icon icon-${
                                  item.type === 'inspection' ? 'search' :
                                  item.type === 'service' ? 'tools' :
                                  item.type === 'repair' ? 'wrench' :
                                  item.type === 'calibration' ? 'sliders' :
                                  'cog'
                                }`}></span>
                              </TypeIcon>
                              {getMaintenanceTypeLabel(item.type)}
                            </HistoryType>
                            <HistoryStatus>
                              <StatusBadge color={getStatusColor(item.status)}>
                                {getStatusLabel(item.status)}
                              </StatusBadge>
                            </HistoryStatus>
                          </HistoryHeader>
                          
                          <HistoryContent>
                            <HistoryDescription>{item.description}</HistoryDescription>
                            
                            {item.findings && (
                              <HistorySection>
                                <HistorySectionLabel>Ustalenia:</HistorySectionLabel>
                                <HistorySectionText>{item.findings}</HistorySectionText>
                              </HistorySection>
                            )}
                            
                            {item.recommendations && (
                              <HistorySection>
                                <HistorySectionLabel>Zalecenia:</HistorySectionLabel>
                                <HistorySectionText>{item.recommendations}</HistorySectionText>
                              </HistorySection>
                            )}
                            
                            <HistoryDetails>
                              <HistoryDetailItem>
                                <HistoryDetailLabel>Zaplanowano:</HistoryDetailLabel>
                                <HistoryDetailValue>{item.scheduledDate}</HistoryDetailValue>
                              </HistoryDetailItem>
                              <HistoryDetailItem>
                                <HistoryDetailLabel>Wykonano:</HistoryDetailLabel>
                                <HistoryDetailValue>{item.completedDate}</HistoryDetailValue>
                              </HistoryDetailItem>
                              <HistoryDetailItem>
                                <HistoryDetailLabel>Wykonawca:</HistoryDetailLabel>
                                <HistoryDetailValue>{item.performedByName}</HistoryDetailValue>
                              </HistoryDetailItem>
                              {item.cost > 0 && (
                                <HistoryDetailItem>
                                  <HistoryDetailLabel>Koszt:</HistoryDetailLabel>
                                  <HistoryDetailValue>{item.cost.toLocaleString()} PLN</HistoryDetailValue>
                                </HistoryDetailItem>
                              )}
                              {item.invoiceNumber && (
                                <HistoryDetailItem>
                                  <HistoryDetailLabel>Faktura:</HistoryDetailLabel>
                                  <HistoryDetailValue>{item.invoiceNumber}</HistoryDetailValue>
                                </HistoryDetailItem>
                              )}
                            </HistoryDetails>
                            
                            {item.documents && item.documents.length > 0 && (
                              <HistoryDocuments>
                                <HistorySectionLabel>Dokumenty:</HistorySectionLabel>
                                <DocumentList>
                                  {item.documents.map(doc => (
                                    <DocumentItem key={doc.id}>
                                      <span className="icon icon-file"></span>
                                      <DocumentLink href={doc.fileUrl} target="_blank">
                                        {doc.name}
                                      </DocumentLink>
                                    </DocumentItem>
                                  ))}
                                </DocumentList>
                              </HistoryDocuments>
                            )}
                          </HistoryContent>
                          
                          <HistoryFooter>
                            <HistoryDate>
                              Utworzono: {new Date(item.createdAt).toLocaleString('pl-PL')}
                            </HistoryDate>
                            {item.nextScheduledDate && (
                              <HistoryNextDate>
                                Następny termin: {item.nextScheduledDate}
                              </HistoryNextDate>
                            )}
                          </HistoryFooter>
                        </HistoryItem>
                      ))}
                    </HistoryList>
                    
                    <PaginationContainer>
                      <PaginationInfo>
                        Wyświetlanie {(historyPagination.page - 1) * historyPagination.limit + 1} - {Math.min(historyPagination.page * historyPagination.limit, historyPagination.total)} z {historyPagination.total} wpisów
                      </PaginationInfo>
                      <PaginationControls>
                        <PaginationButton 
                          disabled={historyPagination.page === 1}
                          onClick={() => handleHistoryFilterChange('page', 1)}
                        >
                          <span className="icon icon-chevron-left"></span>
                          <span className="icon icon-chevron-left"></span>
                        </PaginationButton>
                        <PaginationButton 
                          disabled={historyPagination.page === 1}
                          onClick={() => handleHistoryFilterChange('page', historyPagination.page - 1)}
                        >
                          <span className="icon icon-chevron-left"></span>
                        </PaginationButton>
                        
                        <PaginationText>
                          Strona {historyPagination.page} z {historyPagination.pages}
                        </PaginationText>
                        
                        <PaginationButton 
                          disabled={historyPagination.page === historyPagination.pages}
                          onClick={() => handleHistoryFilterChange('page', historyPagination.page + 1)}
                        >
                          <span className="icon icon-chevron-right"></span>
                        </PaginationButton>
                        <PaginationButton 
                          disabled={historyPagination.page === historyPagination.pages}
                          onClick={() => handleHistoryFilterChange('page', historyPagination.pages)}
                        >
                          <span className="icon icon-chevron-right"></span>
                          <span className="icon icon-chevron-right"></span>
                        </PaginationButton>
                      </PaginationControls>
                    </PaginationContainer>
                  </>
                ) : (
                  <EmptyMessage>Brak historii konserwacji dla tego aktywa</EmptyMessage>
                )}
              </ContentSection>
            )}
          </ContentContainer>
        </>
      ) : (
        <EmptyContainer>
          <EmptyMessage>Wybierz aktywo, aby zobaczyć harmonogram i historię konserwacji</EmptyMessage>
        </EmptyContainer>
      )}

      {/* Add Schedule Modal would go here */}
      
      {/* Record Maintenance Modal would go here */}
    </MaintenanceContainer>
  );
};

// Styled Components
const MaintenanceContainer = styled.div`
  padding: 20px;
  width: 100%;
`;

const MaintenanceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  
  h2 {
    margin: 0;
    color: #333;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
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
  
  &:disabled {
    background-color: #b0bec5;
    cursor: not-allowed;
  }
  
  .icon {
    font-size: 16px;
  }
`;

const AssetSelector = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
`;

const AssetSelectorLabel = styled.label`
  font-weight: 500;
  margin-right: 15px;
  color: #555;
`;

const AssetSelectorSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  font-size: 14px;
  min-width: 300px;
`;

const AssetInfoCard = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
  overflow: hidden;
`;

const AssetInfoHeader = styled.div`
  padding: 15px 20px;
  background: #f8f9fa;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AssetName = styled.h3`
  margin: 0;
  color: #333;
  font-size: 18px;
`;

const AssetSerialNumber = styled.div`
  color: #777;
  font-size: 14px;
`;

const AssetInfoDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
  padding: 20px;
`;

const AssetInfoItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const AssetInfoLabel = styled.div`
  font-size: 12px;
  color: #777;
  margin-bottom: 4px;
`;

const AssetInfoValue = styled.div`
  font-size: 14px;
  color: #333;
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  color: white;
  background-color: ${props => props.color || '#9e9e9e'};
`;

const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
`;

const TabButton = styled.button`
  padding: 12px 20px;
  background: none;
  border: none;
  border-bottom: 3px solid ${props => props.active ? '#2196f3' : 'transparent'};
  color: ${props => props.active ? '#2196f3' : '#555'};
  font-weight: ${props => props.active ? '600' : '400'};
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    color: #2196f3;
    background-color: #f5f5f5;
  }
  
  .icon {
    font-size: 16px;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ContentSection = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

const SectionTitle = styled.div`
  padding: 15px 20px;
  background: #f8f9fa;
  border-bottom: 1px solid #eee;
  font-weight: 600;
  color: #333;
`;

const ScheduleTable = styled.table`
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
  
  tbody tr:last-child td {
    border-bottom: none;
  }
`;

const DueDate = styled.span`
  color: ${props => props.color || '#333'};
  font-weight: 500;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 6px 10px;
  background-color: #f5f5f5;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  
  &:hover {
    background-color: #e0e0e0;
  }
  
  .icon {
    font-size: 14px;
  }
`;

const FiltersContainer = styled.div`
  display: flex;
  gap: 15px;
  padding: 15px;
  border-bottom: 1px solid #eee;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const FilterLabel = styled.label`
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 5px;
  color: #555;
`;

const FilterInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
`;

const FilterSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  font-size: 14px;
`;

const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 15px;
`;

const HistoryItem = styled.div`
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
`;

const HistoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #eee;
`;

const HistoryType = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  color: #333;
`;

const TypeIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background-color: #e3f2fd;
  border-radius: 50%;
  color: #2196f3;
`;

const HistoryStatus = styled.div``;

const HistoryContent = styled.div`
  padding: 16px;
`;

const HistoryDescription = styled.div`
  font-size: 16px;
  margin-bottom: 15px;
`;

const HistorySection = styled.div`
  margin-bottom: 15px;
`;

const HistorySectionLabel = styled.div`
  font-weight: 500;
  margin-bottom: 5px;
  color: #555;
  font-size: 14px;
`;

const HistorySectionText = styled.div`
  font-size: 14px;
  color: #333;
  line-height: 1.5;
`;

const HistoryDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
  margin-bottom: 15px;
  background-color: #f8f9fa;
  padding: 10px;
  border-radius: 4px;
`;

const HistoryDetailItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const HistoryDetailLabel = styled.div`
  font-size: 12px;
  color: #777;
`;

const HistoryDetailValue = styled.div`
  font-size: 14px;
  color: #333;
`;

const HistoryDocuments = styled.div`
  margin-top: 15px;
`;

const DocumentList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const DocumentItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
  background-color: #f5f5f5;
  border-radius: 4px;
  font-size: 12px;
  
  .icon {
    color: #2196f3;
  }
`;

const DocumentLink = styled.a`
  color: #2196f3;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const HistoryFooter = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 16px;
  background-color: #f8f9fa;
  border-top: 1px solid #eee;
  font-size: 12px;
  color: #777;
`;

const HistoryDate = styled.div``;

const HistoryNextDate = styled.div`
  font-weight: 500;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-top: 1px solid #eee;
`;

const PaginationInfo = styled.div`
  font-size: 14px;
  color: #555;
`;

const PaginationControls = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const PaginationButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  color: #555;
  cursor: pointer;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  &:not(:disabled):hover {
    background-color: #f5f5f5;
  }
`;

const PaginationText = styled.div`
  margin: 0 10px;
  font-size: 14px;
  color: #555;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  font-size: 16px;
  color: #555;
`;

const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
  font-size: 14px;
  color: #555;
`;

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  font-size: 16px;
  color: #e53935;
  text-align: center;
  padding: 0 20px;
`;

const EmptyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 20px;
  color: #777;
  font-style: italic;
`;

export default AssetMaintenance;
