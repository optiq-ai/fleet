import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getAssets, getAssetCategories, getAssetLocations } from '../../services/api/mockAssetManagementService';
import './IconStyles.css';

const AssetInventory = () => {
  const [assets, setAssets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [filters, setFilters] = useState({
    type: '',
    category: '',
    status: '',
    location: '',
    search: ''
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch assets with filters and pagination
        const assetsData = await getAssets({
          ...filters,
          page: pagination.page,
          limit: pagination.limit
        });
        
        setAssets(assetsData.assets);
        setPagination(assetsData.pagination);
        
        // Fetch categories and locations for filters
        const categoriesData = await getAssetCategories();
        const locationsData = await getAssetLocations();
        
        setCategories(categoriesData);
        setLocations(locationsData);
        
        setError(null);
      } catch (err) {
        console.error('Error fetching asset inventory data:', err);
        setError('Nie udało się pobrać danych inwentarza. Spróbuj ponownie później.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [filters, pagination.page, pagination.limit]);

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
    // Reset to first page when filters change
    setPagination(prev => ({
      ...prev,
      page: 1
    }));
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      handleFilterChange('search', e.target.value);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.pages) {
      setPagination(prev => ({
        ...prev,
        page: newPage
      }));
    }
  };

  const handleAssetSelect = (asset) => {
    setSelectedAsset(asset);
  };

  const handleCloseDetails = () => {
    setSelectedAsset(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return '#4caf50';
      case 'maintenance':
        return '#ff9800';
      case 'inactive':
        return '#9e9e9e';
      case 'disposed':
        return '#e53935';
      default:
        return '#9e9e9e';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'active':
        return 'Aktywny';
      case 'maintenance':
        return 'W konserwacji';
      case 'inactive':
        return 'Nieaktywny';
      case 'disposed':
        return 'Wycofany';
      default:
        return status;
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'vehicle':
        return 'Pojazd';
      case 'equipment':
        return 'Sprzęt';
      case 'tool':
        return 'Narzędzie';
      case 'part':
        return 'Część';
      case 'accessory':
        return 'Akcesorium';
      default:
        return type;
    }
  };

  if (isLoading && assets.length === 0) {
    return <LoadingContainer>Ładowanie danych inwentarza...</LoadingContainer>;
  }

  if (error) {
    return <ErrorContainer>{error}</ErrorContainer>;
  }

  return (
    <InventoryContainer>
      <InventoryHeader>
        <h2>Inwentarz Aktywów</h2>
        <ActionButtons>
          <Button onClick={() => setShowUploadModal(true)}>
            <span className="icon icon-plus"></span> Dodaj Aktywo
          </Button>
        </ActionButtons>
      </InventoryHeader>

      <FiltersContainer>
        <FilterGroup>
          <FilterLabel>Typ:</FilterLabel>
          <FilterSelect 
            value={filters.type} 
            onChange={(e) => handleFilterChange('type', e.target.value)}
          >
            <option value="">Wszystkie</option>
            <option value="vehicle">Pojazdy</option>
            <option value="equipment">Sprzęt</option>
            <option value="tool">Narzędzia</option>
            <option value="part">Części</option>
            <option value="accessory">Akcesoria</option>
          </FilterSelect>
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>Kategoria:</FilterLabel>
          <FilterSelect 
            value={filters.category} 
            onChange={(e) => handleFilterChange('category', e.target.value)}
          >
            <option value="">Wszystkie</option>
            {categories.map(category => (
              <option key={category.id} value={category.code}>
                {category.name}
              </option>
            ))}
          </FilterSelect>
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>Status:</FilterLabel>
          <FilterSelect 
            value={filters.status} 
            onChange={(e) => handleFilterChange('status', e.target.value)}
          >
            <option value="">Wszystkie</option>
            <option value="active">Aktywne</option>
            <option value="maintenance">W konserwacji</option>
            <option value="inactive">Nieaktywne</option>
            <option value="disposed">Wycofane</option>
          </FilterSelect>
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>Lokalizacja:</FilterLabel>
          <FilterSelect 
            value={filters.location} 
            onChange={(e) => handleFilterChange('location', e.target.value)}
          >
            <option value="">Wszystkie</option>
            {locations.map(location => (
              <option key={location.id} value={location.name}>
                {location.name}
              </option>
            ))}
          </FilterSelect>
        </FilterGroup>

        <SearchContainer>
          <SearchInput 
            placeholder="Szukaj po nazwie, numerze seryjnym..." 
            defaultValue={filters.search}
            onKeyDown={handleSearch}
          />
          <SearchIcon>
            <span className="icon icon-search"></span>
          </SearchIcon>
        </SearchContainer>
      </FiltersContainer>

      <InventoryContent>
        <AssetsTable>
          <thead>
            <tr>
              <th>Nazwa</th>
              <th>Typ</th>
              <th>Kategoria</th>
              <th>Numer seryjny</th>
              <th>Lokalizacja</th>
              <th>Status</th>
              <th>Wartość</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>
            {assets.length > 0 ? (
              assets.map(asset => (
                <tr key={asset.id} onClick={() => handleAssetSelect(asset)}>
                  <td>
                    <AssetNameCell>
                      <AssetIcon>
                        <span className="icon icon-file"></span>
                      </AssetIcon>
                      {asset.name}
                    </AssetNameCell>
                  </td>
                  <td>{getTypeLabel(asset.type)}</td>
                  <td>{asset.category}</td>
                  <td>{asset.serialNumber}</td>
                  <td>{asset.location}</td>
                  <td>
                    <StatusBadge color={getStatusColor(asset.status)}>
                      {getStatusLabel(asset.status)}
                    </StatusBadge>
                  </td>
                  <td>{asset.currentValue ? `${asset.currentValue.toLocaleString()} PLN` : '-'}</td>
                  <td>
                    <ActionButton>
                      <span className="icon icon-ellipsis-v"></span>
                    </ActionButton>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">
                  <EmptyMessage>Brak aktywów spełniających kryteria wyszukiwania</EmptyMessage>
                </td>
              </tr>
            )}
          </tbody>
        </AssetsTable>

        <PaginationContainer>
          <PaginationInfo>
            Wyświetlanie {assets.length > 0 ? (pagination.page - 1) * pagination.limit + 1 : 0} - {Math.min(pagination.page * pagination.limit, pagination.total)} z {pagination.total} aktywów
          </PaginationInfo>
          <PaginationControls>
            <PaginationButton 
              disabled={pagination.page === 1}
              onClick={() => handlePageChange(1)}
            >
              <span className="icon icon-chevron-left"></span>
              <span className="icon icon-chevron-left"></span>
            </PaginationButton>
            <PaginationButton 
              disabled={pagination.page === 1}
              onClick={() => handlePageChange(pagination.page - 1)}
            >
              <span className="icon icon-chevron-left"></span>
            </PaginationButton>
            
            <PaginationText>
              Strona {pagination.page} z {pagination.pages}
            </PaginationText>
            
            <PaginationButton 
              disabled={pagination.page === pagination.pages}
              onClick={() => handlePageChange(pagination.page + 1)}
            >
              <span className="icon icon-chevron-right"></span>
            </PaginationButton>
            <PaginationButton 
              disabled={pagination.page === pagination.pages}
              onClick={() => handlePageChange(pagination.pages)}
            >
              <span className="icon icon-chevron-right"></span>
              <span className="icon icon-chevron-right"></span>
            </PaginationButton>
          </PaginationControls>
        </PaginationContainer>
      </InventoryContent>

      {selectedAsset && (
        <AssetDetailsModal>
          <ModalOverlay onClick={handleCloseDetails} />
          <ModalContent>
            <ModalHeader>
              <h3>Szczegóły Aktywa</h3>
              <CloseButton onClick={handleCloseDetails}>
                <span className="icon icon-times"></span>
              </CloseButton>
            </ModalHeader>
            <ModalBody>
              {isDetailLoading ? (
                <LoadingContainer>Ładowanie szczegółów...</LoadingContainer>
              ) : (
                <AssetDetails>
                  <AssetDetailHeader>
                    <AssetTitle>{selectedAsset.name}</AssetTitle>
                    <StatusBadge color={getStatusColor(selectedAsset.status)}>
                      {getStatusLabel(selectedAsset.status)}
                    </StatusBadge>
                  </AssetDetailHeader>
                  
                  <DetailSection>
                    <DetailSectionTitle>Informacje podstawowe</DetailSectionTitle>
                    <DetailGrid>
                      <DetailItem>
                        <DetailLabel>ID:</DetailLabel>
                        <DetailValue>{selectedAsset.id}</DetailValue>
                      </DetailItem>
                      <DetailItem>
                        <DetailLabel>Typ:</DetailLabel>
                        <DetailValue>{getTypeLabel(selectedAsset.type)}</DetailValue>
                      </DetailItem>
                      <DetailItem>
                        <DetailLabel>Kategoria:</DetailLabel>
                        <DetailValue>{selectedAsset.category}</DetailValue>
                      </DetailItem>
                      <DetailItem>
                        <DetailLabel>Numer seryjny:</DetailLabel>
                        <DetailValue>{selectedAsset.serialNumber}</DetailValue>
                      </DetailItem>
                      <DetailItem>
                        <DetailLabel>Producent:</DetailLabel>
                        <DetailValue>{selectedAsset.manufacturer}</DetailValue>
                      </DetailItem>
                      <DetailItem>
                        <DetailLabel>Model:</DetailLabel>
                        <DetailValue>{selectedAsset.model}</DetailValue>
                      </DetailItem>
                      <DetailItem>
                        <DetailLabel>Lokalizacja:</DetailLabel>
                        <DetailValue>{selectedAsset.location}</DetailValue>
                      </DetailItem>
                      <DetailItem>
                        <DetailLabel>Przypisane do:</DetailLabel>
                        <DetailValue>
                          {selectedAsset.assignedTo ? (
                            <>
                              {selectedAsset.assignedTo.name} 
                              <DetailSubValue>({selectedAsset.assignedTo.type})</DetailSubValue>
                            </>
                          ) : 'Nieprzypisane'}
                        </DetailValue>
                      </DetailItem>
                    </DetailGrid>
                  </DetailSection>
                  
                  <DetailSection>
                    <DetailSectionTitle>Informacje finansowe</DetailSectionTitle>
                    <DetailGrid>
                      <DetailItem>
                        <DetailLabel>Data zakupu:</DetailLabel>
                        <DetailValue>{selectedAsset.purchaseDate}</DetailValue>
                      </DetailItem>
                      <DetailItem>
                        <DetailLabel>Cena zakupu:</DetailLabel>
                        <DetailValue>{selectedAsset.purchasePrice ? `${selectedAsset.purchasePrice.toLocaleString()} PLN` : '-'}</DetailValue>
                      </DetailItem>
                      <DetailItem>
                        <DetailLabel>Aktualna wartość:</DetailLabel>
                        <DetailValue>{selectedAsset.currentValue ? `${selectedAsset.currentValue.toLocaleString()} PLN` : '-'}</DetailValue>
                      </DetailItem>
                      <DetailItem>
                        <DetailLabel>Metoda amortyzacji:</DetailLabel>
                        <DetailValue>{selectedAsset.depreciationMethod === 'straight-line' ? 'Liniowa' : selectedAsset.depreciationMethod}</DetailValue>
                      </DetailItem>
                      <DetailItem>
                        <DetailLabel>Stopa amortyzacji:</DetailLabel>
                        <DetailValue>{selectedAsset.depreciationRate}% rocznie</DetailValue>
                      </DetailItem>
                      <DetailItem>
                        <DetailLabel>Oczekiwany okres użytkowania:</DetailLabel>
                        <DetailValue>{selectedAsset.expectedLifespan} lat</DetailValue>
                      </DetailItem>
                      <DetailItem>
                        <DetailLabel>Data wygaśnięcia gwarancji:</DetailLabel>
                        <DetailValue>{selectedAsset.warrantyExpiryDate}</DetailValue>
                      </DetailItem>
                    </DetailGrid>
                  </DetailSection>
                  
                  {selectedAsset.specifications && (
                    <DetailSection>
                      <DetailSectionTitle>Specyfikacja techniczna</DetailSectionTitle>
                      <DetailGrid>
                        {Object.entries(selectedAsset.specifications).map(([key, value]) => (
                          <DetailItem key={key}>
                            <DetailLabel>{key}:</DetailLabel>
                            <DetailValue>{value}</DetailValue>
                          </DetailItem>
                        ))}
                      </DetailGrid>
                    </DetailSection>
                  )}
                  
                  {selectedAsset.maintenanceSchedule && selectedAsset.maintenanceSchedule.length > 0 && (
                    <DetailSection>
                      <DetailSectionTitle>Harmonogram konserwacji</DetailSectionTitle>
                      <MaintenanceTable>
                        <thead>
                          <tr>
                            <th>Typ</th>
                            <th>Interwał</th>
                            <th>Ostatnio wykonano</th>
                            <th>Następny termin</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedAsset.maintenanceSchedule.map((item, index) => (
                            <tr key={index}>
                              <td>{item.type}</td>
                              <td>{item.interval} {item.unit}</td>
                              <td>{item.lastPerformed}</td>
                              <td>{item.nextDue}</td>
                            </tr>
                          ))}
                        </tbody>
                      </MaintenanceTable>
                    </DetailSection>
                  )}
                  
                  {selectedAsset.documents && selectedAsset.documents.length > 0 && (
                    <DetailSection>
                      <DetailSectionTitle>Dokumenty</DetailSectionTitle>
                      <DocumentList>
                        {selectedAsset.documents.map(doc => (
                          <DocumentItem key={doc.id}>
                            <DocumentIcon>
                              <span className="icon icon-file"></span>
                            </DocumentIcon>
                            <DocumentInfo>
                              <DocumentName>{doc.name}</DocumentName>
                              <DocumentType>{doc.type}</DocumentType>
                            </DocumentInfo>
                            <DocumentAction>
                              <ActionLink href={doc.fileUrl} target="_blank">
                                <span className="icon icon-download"></span>
                              </ActionLink>
                            </DocumentAction>
                          </DocumentItem>
                        ))}
                      </DocumentList>
                    </DetailSection>
                  )}
                  
                  {selectedAsset.notes && (
                    <DetailSection>
                      <DetailSectionTitle>Notatki</DetailSectionTitle>
                      <NotesContent>{selectedAsset.notes}</NotesContent>
                    </DetailSection>
                  )}
                  
                  {selectedAsset.tags && selectedAsset.tags.length > 0 && (
                    <DetailSection>
                      <DetailSectionTitle>Tagi</DetailSectionTitle>
                      <TagsContainer>
                        {selectedAsset.tags.map(tag => (
                          <Tag key={tag}>{tag}</Tag>
                        ))}
                      </TagsContainer>
                    </DetailSection>
                  )}
                  
                  <DetailSection>
                    <DetailSectionTitle>Metadane</DetailSectionTitle>
                    <DetailGrid>
                      <DetailItem>
                        <DetailLabel>Data utworzenia:</DetailLabel>
                        <DetailValue>
                          {new Date(selectedAsset.createdAt).toLocaleString('pl-PL')}
                        </DetailValue>
                      </DetailItem>
                      <DetailItem>
                        <DetailLabel>Ostatnia aktualizacja:</DetailLabel>
                        <DetailValue>
                          {new Date(selectedAsset.updatedAt).toLocaleString('pl-PL')}
                        </DetailValue>
                      </DetailItem>
                      <DetailItem>
                        <DetailLabel>Utworzone przez:</DetailLabel>
                        <DetailValue>{selectedAsset.createdBy}</DetailValue>
                      </DetailItem>
                      <DetailItem>
                        <DetailLabel>Ostatnio sprawdzone przez:</DetailLabel>
                        <DetailValue>{selectedAsset.lastCheckedBy}</DetailValue>
                      </DetailItem>
                      <DetailItem>
                        <DetailLabel>Data ostatniego sprawdzenia:</DetailLabel>
                        <DetailValue>
                          {new Date(selectedAsset.lastCheckedAt).toLocaleString('pl-PL')}
                        </DetailValue>
                      </DetailItem>
                    </DetailGrid>
                  </DetailSection>
                  
                  <ActionButtonsContainer>
                    <SecondaryButton>
                      <span className="icon icon-edit"></span> Edytuj
                    </SecondaryButton>
                    <SecondaryButton>
                      <span className="icon icon-link"></span> Przypisz
                    </SecondaryButton>
                    <SecondaryButton>
                      <span className="icon icon-tools"></span> Zaplanuj konserwację
                    </SecondaryButton>
                    <DangerButton>
                      <span className="icon icon-trash"></span> Usuń
                    </DangerButton>
                  </ActionButtonsContainer>
                </AssetDetails>
              )}
            </ModalBody>
          </ModalContent>
        </AssetDetailsModal>
      )}

      {/* Upload Modal would go here */}
    </InventoryContainer>
  );
};

// Styled Components
const InventoryContainer = styled.div`
  padding: 20px;
  width: 100%;
`;

const InventoryHeader = styled.div`
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
  
  .icon {
    font-size: 16px;
  }
`;

const SecondaryButton = styled(Button)`
  background-color: #f5f5f5;
  color: #333;
  border: 1px solid #ddd;
  
  &:hover {
    background-color: #e0e0e0;
  }
`;

const DangerButton = styled(Button)`
  background-color: #f44336;
  
  &:hover {
    background-color: #d32f2f;
  }
`;

const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 8px;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 180px;
`;

const FilterLabel = styled.label`
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 5px;
  color: #555;
`;

const FilterSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  font-size: 14px;
`;

const SearchContainer = styled.div`
  position: relative;
  flex-grow: 1;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  padding-right: 40px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
`;

const SearchIcon = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #777;
`;

const InventoryContent = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

const AssetsTable = styled.table`
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
  
  tbody tr {
    cursor: pointer;
    transition: background-color 0.2s;
    
    &:hover {
      background-color: #f5f5f5;
    }
  }
`;

const AssetNameCell = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const AssetIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background-color: #e3f2fd;
  border-radius: 4px;
  color: #2196f3;
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

const ActionButton = styled.button`
  background: none;
  border: none;
  color: #777;
  cursor: pointer;
  padding: 5px;
  
  &:hover {
    color: #333;
  }
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

const AssetDetailsModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
  position: relative;
  width: 90%;
  max-width: 900px;
  max-height: 90vh;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  z-index: 1001;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
  
  h3 {
    margin: 0;
    font-size: 18px;
    color: #333;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #777;
  cursor: pointer;
  font-size: 18px;
  
  &:hover {
    color: #333;
  }
`;

const ModalBody = styled.div`
  padding: 20px;
  overflow-y: auto;
  max-height: calc(90vh - 60px);
`;

const AssetDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const AssetDetailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const AssetTitle = styled.h2`
  margin: 0;
  color: #333;
`;

const DetailSection = styled.div`
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
`;

const DetailSectionTitle = styled.div`
  padding: 12px 16px;
  background-color: #f8f9fa;
  font-weight: 600;
  color: #333;
  border-bottom: 1px solid #eee;
`;

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 15px;
  padding: 16px;
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const DetailLabel = styled.div`
  font-size: 12px;
  color: #777;
  margin-bottom: 4px;
`;

const DetailValue = styled.div`
  font-size: 14px;
  color: #333;
`;

const DetailSubValue = styled.span`
  font-size: 12px;
  color: #777;
  margin-left: 5px;
`;

const MaintenanceTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 10px 16px;
    text-align: left;
    border-bottom: 1px solid #eee;
    font-size: 14px;
  }
  
  th {
    background-color: #f8f9fa;
    font-weight: 600;
    color: #555;
  }
  
  tr:last-child td {
    border-bottom: none;
  }
`;

const DocumentList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

const DocumentItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

const DocumentIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: #e3f2fd;
  border-radius: 4px;
  color: #2196f3;
  margin-right: 15px;
`;

const DocumentInfo = styled.div`
  flex: 1;
`;

const DocumentName = styled.div`
  font-weight: 500;
  margin-bottom: 4px;
`;

const DocumentType = styled.div`
  font-size: 12px;
  color: #777;
`;

const DocumentAction = styled.div`
  margin-left: 10px;
`;

const ActionLink = styled.a`
  color: #2196f3;
  text-decoration: none;
  
  &:hover {
    color: #1976d2;
  }
`;

const NotesContent = styled.div`
  padding: 16px;
  font-size: 14px;
  line-height: 1.5;
  color: #555;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 16px;
`;

const Tag = styled.div`
  padding: 4px 10px;
  background-color: #e3f2fd;
  color: #2196f3;
  border-radius: 16px;
  font-size: 12px;
`;

const ActionButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  font-size: 16px;
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

const EmptyMessage = styled.div`
  text-align: center;
  padding: 20px;
  color: #777;
  font-style: italic;
`;

export default AssetInventory;
