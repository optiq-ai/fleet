import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface AssetTrackingProps {
  onAddAsset: (asset: any) => Promise<void>;
  onUpdateAsset: (assetId: string, updates: any) => Promise<void>;
  onDeleteAsset: (assetId: string) => Promise<void>;
  onAssignAsset: (assetId: string, assigneeId: string, assigneeType: string) => Promise<void>;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 500;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
`;

const CardTitle = styled.div`
  font-weight: 500;
  font-size: 16px;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardContent = styled.div``;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 20px;
`;

const Tab = styled.div<{ active: boolean }>`
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

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  
  &:focus {
    border-color: #3f51b5;
    outline: none;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  min-height: 100px;
  
  &:focus {
    border-color: #3f51b5;
    outline: none;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  background-color: white;
  
  &:focus {
    border-color: #3f51b5;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 10px 16px;
  background-color: #3f51b5;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  
  &:hover {
    background-color: #303f9f;
  }
  
  &:disabled {
    background-color: #c5cae9;
    cursor: not-allowed;
  }
`;

const SecondaryButton = styled.button`
  padding: 10px 16px;
  background-color: white;
  color: #3f51b5;
  border: 1px solid #3f51b5;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  
  &:hover {
    background-color: #e8eaf6;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

const AssetsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const AssetItem = styled.div<{ status: 'active' | 'maintenance' | 'inactive' }>`
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  border-left: 4px solid ${props => 
    props.status === 'active' ? '#4caf50' : 
    props.status === 'maintenance' ? '#ff9800' : 
    '#f44336'
  };
`;

const AssetHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const AssetTitle = styled.div`
  font-weight: 500;
`;

const AssetStatus = styled.div<{ status: 'active' | 'maintenance' | 'inactive' }>`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  background-color: ${props => 
    props.status === 'active' ? '#e8f5e9' : 
    props.status === 'maintenance' ? '#fff8e1' : 
    '#ffebee'
  };
  color: ${props => 
    props.status === 'active' ? '#2e7d32' : 
    props.status === 'maintenance' ? '#f57f17' : 
    '#c62828'
  };
`;

const AssetInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const AssetInfoItem = styled.div``;

const AssetInfoLabel = styled.div`
  font-size: 12px;
  color: #666;
  margin-bottom: 4px;
`;

const AssetInfoValue = styled.div`
  font-weight: 500;
`;

const AssetActions = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button`
  padding: 6px 12px;
  background-color: white;
  color: #3f51b5;
  border: 1px solid #3f51b5;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  
  &:hover {
    background-color: #e8eaf6;
  }
`;

const SearchContainer = styled.div`
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  
  &:focus {
    border-color: #3f51b5;
    outline: none;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const FilterButton = styled.button<{ active: boolean }>`
  padding: 6px 12px;
  background-color: ${props => props.active ? '#3f51b5' : 'white'};
  color: ${props => props.active ? 'white' : '#3f51b5'};
  border: 1px solid #3f51b5;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  
  &:hover {
    background-color: ${props => props.active ? '#303f9f' : '#e8eaf6'};
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 24px;
  width: 500px;
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const ModalTitle = styled.div`
  font-weight: 500;
  font-size: 18px;
`;

const ModalCloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  
  &:hover {
    color: #000;
  }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 24px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px;
  color: #666;
`;

const EmptyStateIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
  color: #ddd;
`;

const EmptyStateText = styled.div`
  font-size: 16px;
  margin-bottom: 8px;
`;

const EmptyStateSubtext = styled.div`
  font-size: 14px;
  color: #999;
  margin-bottom: 16px;
`;

const MapContainer = styled.div`
  height: 400px;
  background-color: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
`;

const AssetHistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
`;

const AssetHistoryItem = styled.div`
  padding: 12px;
  border-radius: 4px;
  background-color: #f5f5f5;
  font-size: 14px;
`;

const AssetHistoryDate = styled.div`
  font-size: 12px;
  color: #666;
  margin-bottom: 4px;
`;

const AssetHistoryContent = styled.div``;

const AssetTracking: React.FC<AssetTrackingProps> = ({
  onAddAsset,
  onUpdateAsset,
  onDeleteAsset,
  onAssignAsset
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'add' | 'map'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'maintenance' | 'inactive'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'vehicle' | 'equipment' | 'tool'>('all');
  const [assets, setAssets] = useState<any[]>([]);
  const [showAssetModal, setShowAssetModal] = useState<boolean>(false);
  const [showAssignModal, setShowAssignModal] = useState<boolean>(false);
  const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false);
  const [selectedAsset, setSelectedAsset] = useState<any | null>(null);
  
  // Formularz dodawania/edycji zasobu
  const [assetName, setAssetName] = useState<string>('');
  const [assetType, setAssetType] = useState<string>('vehicle');
  const [assetModel, setAssetModel] = useState<string>('');
  const [assetSerialNumber, setAssetSerialNumber] = useState<string>('');
  const [assetPurchaseDate, setAssetPurchaseDate] = useState<string>('');
  const [assetPurchasePrice, setAssetPurchasePrice] = useState<string>('');
  const [assetStatus, setAssetStatus] = useState<string>('active');
  const [assetNotes, setAssetNotes] = useState<string>('');
  
  // Formularz przypisywania zasobu
  const [assigneeType, setAssigneeType] = useState<string>('driver');
  const [assigneeId, setAssigneeId] = useState<string>('');
  
  // Przykładowe dane
  useEffect(() => {
    // Symulacja pobrania zasobów
    const sampleAssets = [
      {
        id: 'asset1',
        name: 'Ciężarówka Volvo FH16',
        type: 'vehicle',
        model: 'Volvo FH16',
        serialNumber: 'VLV-12345-FH16',
        purchaseDate: '2023-06-15',
        purchasePrice: '450000',
        status: 'active',
        assignedTo: {
          id: 'driver1',
          name: 'Jan Kowalski',
          type: 'driver'
        },
        location: {
          latitude: 52.2297,
          longitude: 21.0122
        },
        lastMaintenance: '2025-03-10',
        nextMaintenance: '2025-06-10',
        notes: 'Regularnie serwisowany, w dobrym stanie technicznym.',
        history: [
          {
            date: '2025-04-10T10:30:00Z',
            action: 'maintenance',
            description: 'Wymiana oleju i filtrów'
          },
          {
            date: '2025-03-15T14:15:00Z',
            action: 'assignment',
            description: 'Przypisano do Jana Kowalskiego'
          },
          {
            date: '2025-02-20T09:45:00Z',
            action: 'status_change',
            description: 'Zmieniono status z "maintenance" na "active"'
          }
        ]
      },
      {
        id: 'asset2',
        name: 'Wózek widłowy Toyota',
        type: 'equipment',
        model: 'Toyota 8FBE20',
        serialNumber: 'TYT-8FBE20-7890',
        purchaseDate: '2024-02-10',
        purchasePrice: '120000',
        status: 'maintenance',
        assignedTo: null,
        location: {
          latitude: 52.2297,
          longitude: 21.0122
        },
        lastMaintenance: '2025-04-05',
        nextMaintenance: '2025-07-05',
        notes: 'W trakcie naprawy - uszkodzony układ hydrauliczny.',
        history: [
          {
            date: '2025-04-05T08:30:00Z',
            action: 'status_change',
            description: 'Zmieniono status z "active" na "maintenance"'
          },
          {
            date: '2025-04-05T08:35:00Z',
            action: 'maintenance',
            description: 'Zgłoszenie awarii układu hydraulicznego'
          },
          {
            date: '2024-02-10T11:00:00Z',
            action: 'purchase',
            description: 'Zakupiono nowy wózek widłowy'
          }
        ]
      },
      {
        id: 'asset3',
        name: 'Zestaw narzędzi warsztatowych',
        type: 'tool',
        model: 'Bosch Professional',
        serialNumber: 'BSH-PRO-45678',
        purchaseDate: '2024-09-20',
        purchasePrice: '15000',
        status: 'active',
        assignedTo: {
          id: 'workshop1',
          name: 'Warsztat główny',
          type: 'location'
        },
        location: {
          latitude: 52.2297,
          longitude: 21.0122
        },
        lastMaintenance: '2025-01-15',
        nextMaintenance: '2025-07-15',
        notes: 'Kompletny zestaw narzędzi, przypisany do głównego warsztatu.',
        history: [
          {
            date: '2025-01-15T13:20:00Z',
            action: 'maintenance',
            description: 'Przegląd i konserwacja narzędzi'
          },
          {
            date: '2024-10-05T09:30:00Z',
            action: 'assignment',
            description: 'Przypisano do głównego warsztatu'
          },
          {
            date: '2024-09-20T15:45:00Z',
            action: 'purchase',
            description: 'Zakupiono zestaw narzędzi'
          }
        ]
      },
      {
        id: 'asset4',
        name: 'Van Mercedes Sprinter',
        type: 'vehicle',
        model: 'Mercedes Sprinter 316 CDI',
        serialNumber: 'MRC-SPR-316-9012',
        purchaseDate: '2022-11-05',
        purchasePrice: '180000',
        status: 'inactive',
        assignedTo: null,
        location: {
          latitude: 52.2297,
          longitude: 21.0122
        },
        lastMaintenance: '2024-12-20',
        nextMaintenance: null,
        notes: 'Pojazd wycofany z użytku ze względu na poważne uszkodzenia po wypadku.',
        history: [
          {
            date: '2025-02-10T11:15:00Z',
            action: 'status_change',
            description: 'Zmieniono status z "maintenance" na "inactive"'
          },
          {
            date: '2025-01-25T08:45:00Z',
            action: 'incident',
            description: 'Wypadek drogowy - poważne uszkodzenia pojazdu'
          },
          {
            date: '2024-12-20T14:30:00Z',
            action: 'maintenance',
            description: 'Rutynowy przegląd techniczny'
          }
        ]
      }
    ];
    
    setAssets(sampleAssets);
  }, []);
  
  // Filtrowanie zasobów na podstawie wyszukiwania i filtrów
  const filteredAssets = assets.filter(asset => {
    // Filtrowanie według wyszukiwania
    if (searchQuery && !asset.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !asset.serialNumber.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filtrowanie według statusu
    if (statusFilter !== 'all' && asset.status !== statusFilter) {
      return false;
    }
    
    // Filtrowanie według typu
    if (typeFilter !== 'all' && asset.type !== typeFilter) {
      return false;
    }
    
    return true;
  });
  
  // Obsługa otwierania modalu dodawania/edycji zasobu
  const handleOpenAssetModal = (asset: any = null) => {
    if (asset) {
      // Edycja istniejącego zasobu
      setAssetName(asset.name);
      setAssetType(asset.type);
      setAssetModel(asset.model);
      setAssetSerialNumber(asset.serialNumber);
      setAssetPurchaseDate(asset.purchaseDate);
      setAssetPurchasePrice(asset.purchasePrice);
      setAssetStatus(asset.status);
      setAssetNotes(asset.notes);
      setSelectedAsset(asset);
    } else {
      // Dodawanie nowego zasobu
      setAssetName('');
      setAssetType('vehicle');
      setAssetModel('');
      setAssetSerialNumber('');
      setAssetPurchaseDate('');
      setAssetPurchasePrice('');
      setAssetStatus('active');
      setAssetNotes('');
      setSelectedAsset(null);
    }
    
    setShowAssetModal(true);
  };
  
  // Obsługa zamykania modalu dodawania/edycji zasobu
  const handleCloseAssetModal = () => {
    setShowAssetModal(false);
    setSelectedAsset(null);
  };
  
  // Obsługa otwierania modalu przypisywania zasobu
  const handleOpenAssignModal = (asset: any) => {
    setSelectedAsset(asset);
    setAssigneeType('driver');
    setAssigneeId('');
    setShowAssignModal(true);
  };
  
  // Obsługa zamykania modalu przypisywania zasobu
  const handleCloseAssignModal = () => {
    setShowAssignModal(false);
    setSelectedAsset(null);
  };
  
  // Obsługa otwierania modalu historii zasobu
  const handleOpenHistoryModal = (asset: any) => {
    setSelectedAsset(asset);
    setShowHistoryModal(true);
  };
  
  // Obsługa zamykania modalu historii zasobu
  const handleCloseHistoryModal = () => {
    setShowHistoryModal(false);
    setSelectedAsset(null);
  };
  
  // Obsługa dodawania/edycji zasobu
  const handleSaveAsset = async () => {
    if (!assetName || !assetType || !assetSerialNumber) {
      alert('Proszę wypełnić wszystkie wymagane pola');
      return;
    }
    
    const assetData = {
      name: assetName,
      type: assetType,
      model: assetModel,
      serialNumber: assetSerialNumber,
      purchaseDate: assetPurchaseDate,
      purchasePrice: assetPurchasePrice,
      status: assetStatus,
      notes: assetNotes
    };
    
    try {
      if (selectedAsset) {
        // Edycja istniejącego zasobu
        await onUpdateAsset(selectedAsset.id, assetData);
        
        // Aktualizuj zasób w liście
        setAssets(assets.map(asset => 
          asset.id === selectedAsset.id ? { ...asset, ...assetData } : asset
        ));
      } else {
        // Dodawanie nowego zasobu
        await onAddAsset(assetData);
        
        // Dodaj zasób do listy
        const newAsset = {
          id: `asset${Date.now()}`,
          ...assetData,
          assignedTo: null,
          location: {
            latitude: 52.2297,
            longitude: 21.0122
          },
          lastMaintenance: null,
          nextMaintenance: null,
          history: [
            {
              date: new Date().toISOString(),
              action: 'purchase',
              description: 'Dodano nowy zasób'
            }
          ]
        };
        
        setAssets([newAsset, ...assets]);
      }
      
      handleCloseAssetModal();
    } catch (error) {
      console.error('Error saving asset:', error);
      alert('Wystąpił błąd podczas zapisywania zasobu');
    }
  };
  
  // Obsługa usuwania zasobu
  const handleDeleteAsset = async (assetId: string) => {
    if (window.confirm('Czy na pewno chcesz usunąć ten zasób?')) {
      try {
        await onDeleteAsset(assetId);
        
        // Usuń zasób z listy
        setAssets(assets.filter(asset => asset.id !== assetId));
      } catch (error) {
        console.error('Error deleting asset:', error);
        alert('Wystąpił błąd podczas usuwania zasobu');
      }
    }
  };
  
  // Obsługa przypisywania zasobu
  const handleAssignAsset = async () => {
    if (!selectedAsset || !assigneeId) {
      alert('Proszę wypełnić wszystkie wymagane pola');
      return;
    }
    
    try {
      await onAssignAsset(selectedAsset.id, assigneeId, assigneeType);
      
      // Aktualizuj zasób w liście
      setAssets(assets.map(asset => {
        if (asset.id === selectedAsset.id) {
          const assigneeName = assigneeType === 'driver' ? 'Jan Kowalski' : 
                              assigneeType === 'location' ? 'Warsztat główny' : 
                              'Nieznany';
          
          return {
            ...asset,
            assignedTo: {
              id: assigneeId,
              name: assigneeName,
              type: assigneeType
            },
            history: [
              {
                date: new Date().toISOString(),
                action: 'assignment',
                description: `Przypisano do ${assigneeName}`
              },
              ...asset.history
            ]
          };
        }
        
        return asset;
      }));
      
      handleCloseAssignModal();
    } catch (error) {
      console.error('Error assigning asset:', error);
      alert('Wystąpił błąd podczas przypisywania zasobu');
    }
  };
  
  // Obsługa zmiany statusu zasobu
  const handleChangeStatus = async (assetId: string, newStatus: string) => {
    try {
      await onUpdateAsset(assetId, { status: newStatus });
      
      // Aktualizuj zasób w liście
      setAssets(assets.map(asset => {
        if (asset.id === assetId) {
          const statusText = newStatus === 'active' ? 'aktywny' : 
                            newStatus === 'maintenance' ? 'w konserwacji' : 
                            'nieaktywny';
          
          return {
            ...asset,
            status: newStatus,
            history: [
              {
                date: new Date().toISOString(),
                action: 'status_change',
                description: `Zmieniono status na "${statusText}"`
              },
              ...asset.history
            ]
          };
        }
        
        return asset;
      }));
    } catch (error) {
      console.error('Error changing asset status:', error);
      alert('Wystąpił błąd podczas zmiany statusu zasobu');
    }
  };
  
  // Formatowanie daty
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Brak';
    
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  
  // Formatowanie daty i czasu
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  
  // Renderowanie zakładki wszystkich zasobów
  const renderAssetsTab = () => {
    return (
      <>
        <SearchContainer>
          <SearchInput 
            type="text" 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
            placeholder="Szukaj zasobów po nazwie lub numerze seryjnym..."
          />
        </SearchContainer>
        
        <FilterContainer>
          <div>
            <Label>Status:</Label>
            <FilterContainer>
              <FilterButton 
                active={statusFilter === 'all'} 
                onClick={() => setStatusFilter('all')}
              >
                Wszystkie
              </FilterButton>
              <FilterButton 
                active={statusFilter === 'active'} 
                onClick={() => setStatusFilter('active')}
              >
                Aktywne
              </FilterButton>
              <FilterButton 
                active={statusFilter === 'maintenance'} 
                onClick={() => setStatusFilter('maintenance')}
              >
                W konserwacji
              </FilterButton>
              <FilterButton 
                active={statusFilter === 'inactive'} 
                onClick={() => setStatusFilter('inactive')}
              >
                Nieaktywne
              </FilterButton>
            </FilterContainer>
          </div>
          
          <div>
            <Label>Typ:</Label>
            <FilterContainer>
              <FilterButton 
                active={typeFilter === 'all'} 
                onClick={() => setTypeFilter('all')}
              >
                Wszystkie
              </FilterButton>
              <FilterButton 
                active={typeFilter === 'vehicle'} 
                onClick={() => setTypeFilter('vehicle')}
              >
                Pojazdy
              </FilterButton>
              <FilterButton 
                active={typeFilter === 'equipment'} 
                onClick={() => setTypeFilter('equipment')}
              >
                Sprzęt
              </FilterButton>
              <FilterButton 
                active={typeFilter === 'tool'} 
                onClick={() => setTypeFilter('tool')}
              >
                Narzędzia
              </FilterButton>
            </FilterContainer>
          </div>
        </FilterContainer>
        
        <ButtonGroup style={{ justifyContent: 'flex-start', marginBottom: '20px' }}>
          <Button onClick={() => handleOpenAssetModal()}>Dodaj nowy zasób</Button>
        </ButtonGroup>
        
        {filteredAssets.length === 0 ? (
          <EmptyState>
            <EmptyStateIcon>🔍</EmptyStateIcon>
            <EmptyStateText>Brak zasobów</EmptyStateText>
            <EmptyStateSubtext>
              {searchQuery || statusFilter !== 'all' || typeFilter !== 'all' ? 
                'Brak wyników dla podanych filtrów' : 
                'Dodaj zasoby, aby rozpocząć śledzenie'}
            </EmptyStateSubtext>
            {(searchQuery || statusFilter !== 'all' || typeFilter !== 'all') && (
              <SecondaryButton onClick={() => {
                setSearchQuery('');
                setStatusFilter('all');
                setTypeFilter('all');
              }}>
                Wyczyść filtry
              </SecondaryButton>
            )}
          </EmptyState>
        ) : (
          <AssetsList>
            {filteredAssets.map(asset => (
              <AssetItem key={asset.id} status={asset.status as any}>
                <AssetHeader>
                  <AssetTitle>{asset.name}</AssetTitle>
                  <AssetStatus status={asset.status as any}>
                    {asset.status === 'active' ? 'Aktywny' : 
                     asset.status === 'maintenance' ? 'W konserwacji' : 
                     'Nieaktywny'}
                  </AssetStatus>
                </AssetHeader>
                
                <AssetInfo>
                  <AssetInfoItem>
                    <AssetInfoLabel>Typ</AssetInfoLabel>
                    <AssetInfoValue>
                      {asset.type === 'vehicle' ? 'Pojazd' : 
                       asset.type === 'equipment' ? 'Sprzęt' : 
                       'Narzędzie'}
                    </AssetInfoValue>
                  </AssetInfoItem>
                  
                  <AssetInfoItem>
                    <AssetInfoLabel>Model</AssetInfoLabel>
                    <AssetInfoValue>{asset.model}</AssetInfoValue>
                  </AssetInfoItem>
                  
                  <AssetInfoItem>
                    <AssetInfoLabel>Numer seryjny</AssetInfoLabel>
                    <AssetInfoValue>{asset.serialNumber}</AssetInfoValue>
                  </AssetInfoItem>
                  
                  <AssetInfoItem>
                    <AssetInfoLabel>Data zakupu</AssetInfoLabel>
                    <AssetInfoValue>{formatDate(asset.purchaseDate)}</AssetInfoValue>
                  </AssetInfoItem>
                  
                  <AssetInfoItem>
                    <AssetInfoLabel>Przypisany do</AssetInfoLabel>
                    <AssetInfoValue>
                      {asset.assignedTo ? asset.assignedTo.name : 'Nieprzypisany'}
                    </AssetInfoValue>
                  </AssetInfoItem>
                  
                  <AssetInfoItem>
                    <AssetInfoLabel>Ostatnia konserwacja</AssetInfoLabel>
                    <AssetInfoValue>{formatDate(asset.lastMaintenance)}</AssetInfoValue>
                  </AssetInfoItem>
                </AssetInfo>
                
                <AssetActions>
                  <ActionButton onClick={() => handleOpenAssetModal(asset)}>Edytuj</ActionButton>
                  <ActionButton onClick={() => handleOpenAssignModal(asset)}>Przypisz</ActionButton>
                  <ActionButton onClick={() => handleOpenHistoryModal(asset)}>Historia</ActionButton>
                  
                  <div style={{ position: 'relative' }}>
                    <ActionButton>Zmień status</ActionButton>
                    <div style={{ 
                      position: 'absolute', 
                      top: '40px', 
                      left: 0, 
                      zIndex: 10, 
                      background: 'white', 
                      padding: '10px', 
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)', 
                      borderRadius: '4px', 
                      display: 'none' 
                    }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <ActionButton onClick={() => handleChangeStatus(asset.id, 'active')}>
                          Aktywny
                        </ActionButton>
                        <ActionButton onClick={() => handleChangeStatus(asset.id, 'maintenance')}>
                          W konserwacji
                        </ActionButton>
                        <ActionButton onClick={() => handleChangeStatus(asset.id, 'inactive')}>
                          Nieaktywny
                        </ActionButton>
                      </div>
                    </div>
                  </div>
                  
                  <ActionButton onClick={() => handleDeleteAsset(asset.id)}>Usuń</ActionButton>
                </AssetActions>
              </AssetItem>
            ))}
          </AssetsList>
        )}
      </>
    );
  };
  
  // Renderowanie zakładki mapy
  const renderMapTab = () => {
    return (
      <>
        <MapContainer>
          <div>Mapa z lokalizacją zasobów</div>
        </MapContainer>
        
        <FilterContainer>
          <div>
            <Label>Pokaż na mapie:</Label>
            <FilterContainer>
              <FilterButton active={true}>Wszystkie</FilterButton>
              <FilterButton active={false}>Pojazdy</FilterButton>
              <FilterButton active={false}>Sprzęt</FilterButton>
              <FilterButton active={false}>Narzędzia</FilterButton>
            </FilterContainer>
          </div>
          
          <div>
            <Label>Status:</Label>
            <FilterContainer>
              <FilterButton active={true}>Wszystkie</FilterButton>
              <FilterButton active={false}>Aktywne</FilterButton>
              <FilterButton active={false}>W konserwacji</FilterButton>
              <FilterButton active={false}>Nieaktywne</FilterButton>
            </FilterContainer>
          </div>
        </FilterContainer>
        
        <AssetsList>
          {assets.slice(0, 3).map(asset => (
            <AssetItem key={asset.id} status={asset.status as any}>
              <AssetHeader>
                <AssetTitle>{asset.name}</AssetTitle>
                <AssetStatus status={asset.status as any}>
                  {asset.status === 'active' ? 'Aktywny' : 
                   asset.status === 'maintenance' ? 'W konserwacji' : 
                   'Nieaktywny'}
                </AssetStatus>
              </AssetHeader>
              
              <AssetInfo>
                <AssetInfoItem>
                  <AssetInfoLabel>Lokalizacja</AssetInfoLabel>
                  <AssetInfoValue>
                    {asset.location ? `${asset.location.latitude}, ${asset.location.longitude}` : 'Nieznana'}
                  </AssetInfoValue>
                </AssetInfoItem>
                
                <AssetInfoItem>
                  <AssetInfoLabel>Przypisany do</AssetInfoLabel>
                  <AssetInfoValue>
                    {asset.assignedTo ? asset.assignedTo.name : 'Nieprzypisany'}
                  </AssetInfoValue>
                </AssetInfoItem>
                
                <AssetInfoItem>
                  <AssetInfoLabel>Ostatnia aktualizacja</AssetInfoLabel>
                  <AssetInfoValue>Dziś, 10:30</AssetInfoValue>
                </AssetInfoItem>
              </AssetInfo>
              
              <AssetActions>
                <ActionButton>Szczegóły</ActionButton>
                <ActionButton>Nawiguj</ActionButton>
              </AssetActions>
            </AssetItem>
          ))}
        </AssetsList>
      </>
    );
  };
  
  return (
    <Container>
      <Header>
        <Title>Śledzenie zasobów</Title>
      </Header>
      
      <TabsContainer>
        <Tab 
          active={activeTab === 'all'} 
          onClick={() => setActiveTab('all')}
        >
          Zasoby
        </Tab>
        <Tab 
          active={activeTab === 'map'} 
          onClick={() => setActiveTab('map')}
        >
          Mapa
        </Tab>
      </TabsContainer>
      
      <Card>
        <CardContent>
          {activeTab === 'all' && renderAssetsTab()}
          {activeTab === 'map' && renderMapTab()}
        </CardContent>
      </Card>
      
      {/* Modal dodawania/edycji zasobu */}
      {showAssetModal && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>{selectedAsset ? 'Edytuj zasób' : 'Dodaj nowy zasób'}</ModalTitle>
              <ModalCloseButton onClick={handleCloseAssetModal}>×</ModalCloseButton>
            </ModalHeader>
            
            <FormGroup>
              <Label>Nazwa zasobu *</Label>
              <Input 
                type="text" 
                value={assetName} 
                onChange={(e) => setAssetName(e.target.value)} 
                placeholder="Wprowadź nazwę zasobu"
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Typ zasobu *</Label>
              <Select 
                value={assetType} 
                onChange={(e) => setAssetType(e.target.value)}
              >
                <option value="vehicle">Pojazd</option>
                <option value="equipment">Sprzęt</option>
                <option value="tool">Narzędzie</option>
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label>Model</Label>
              <Input 
                type="text" 
                value={assetModel} 
                onChange={(e) => setAssetModel(e.target.value)} 
                placeholder="Wprowadź model zasobu"
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Numer seryjny *</Label>
              <Input 
                type="text" 
                value={assetSerialNumber} 
                onChange={(e) => setAssetSerialNumber(e.target.value)} 
                placeholder="Wprowadź numer seryjny"
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Data zakupu</Label>
              <Input 
                type="date" 
                value={assetPurchaseDate} 
                onChange={(e) => setAssetPurchaseDate(e.target.value)} 
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Cena zakupu</Label>
              <Input 
                type="number" 
                value={assetPurchasePrice} 
                onChange={(e) => setAssetPurchasePrice(e.target.value)} 
                placeholder="Wprowadź cenę zakupu"
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Status</Label>
              <Select 
                value={assetStatus} 
                onChange={(e) => setAssetStatus(e.target.value)}
              >
                <option value="active">Aktywny</option>
                <option value="maintenance">W konserwacji</option>
                <option value="inactive">Nieaktywny</option>
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label>Notatki</Label>
              <TextArea 
                value={assetNotes} 
                onChange={(e) => setAssetNotes(e.target.value)} 
                placeholder="Wprowadź dodatkowe informacje o zasobie"
              />
            </FormGroup>
            
            <ModalFooter>
              <SecondaryButton onClick={handleCloseAssetModal}>Anuluj</SecondaryButton>
              <Button onClick={handleSaveAsset}>Zapisz</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
      
      {/* Modal przypisywania zasobu */}
      {showAssignModal && selectedAsset && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Przypisz zasób</ModalTitle>
              <ModalCloseButton onClick={handleCloseAssignModal}>×</ModalCloseButton>
            </ModalHeader>
            
            <div>
              <p>Przypisywanie zasobu: <strong>{selectedAsset.name}</strong></p>
              
              <FormGroup>
                <Label>Typ przypisania</Label>
                <Select 
                  value={assigneeType} 
                  onChange={(e) => setAssigneeType(e.target.value)}
                >
                  <option value="driver">Kierowca</option>
                  <option value="location">Lokalizacja</option>
                  <option value="department">Dział</option>
                </Select>
              </FormGroup>
              
              <FormGroup>
                <Label>Wybierz {
                  assigneeType === 'driver' ? 'kierowcę' : 
                  assigneeType === 'location' ? 'lokalizację' : 
                  'dział'
                } *</Label>
                <Select 
                  value={assigneeId} 
                  onChange={(e) => setAssigneeId(e.target.value)}
                >
                  <option value="">Wybierz...</option>
                  {assigneeType === 'driver' && (
                    <>
                      <option value="driver1">Jan Kowalski</option>
                      <option value="driver2">Anna Nowak</option>
                      <option value="driver3">Piotr Wiśniewski</option>
                    </>
                  )}
                  {assigneeType === 'location' && (
                    <>
                      <option value="location1">Warsztat główny</option>
                      <option value="location2">Magazyn centralny</option>
                      <option value="location3">Biuro</option>
                    </>
                  )}
                  {assigneeType === 'department' && (
                    <>
                      <option value="dept1">Logistyka</option>
                      <option value="dept2">Serwis</option>
                      <option value="dept3">Administracja</option>
                    </>
                  )}
                </Select>
              </FormGroup>
              
              <ModalFooter>
                <SecondaryButton onClick={handleCloseAssignModal}>Anuluj</SecondaryButton>
                <Button onClick={handleAssignAsset}>Przypisz</Button>
              </ModalFooter>
            </div>
          </ModalContent>
        </Modal>
      )}
      
      {/* Modal historii zasobu */}
      {showHistoryModal && selectedAsset && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Historia zasobu</ModalTitle>
              <ModalCloseButton onClick={handleCloseHistoryModal}>×</ModalCloseButton>
            </ModalHeader>
            
            <div>
              <p>Historia zasobu: <strong>{selectedAsset.name}</strong></p>
              
              <AssetHistoryList>
                {selectedAsset.history.map((historyItem: any, index: number) => (
                  <AssetHistoryItem key={index}>
                    <AssetHistoryDate>{formatDateTime(historyItem.date)}</AssetHistoryDate>
                    <AssetHistoryContent>{historyItem.description}</AssetHistoryContent>
                  </AssetHistoryItem>
                ))}
              </AssetHistoryList>
              
              <ModalFooter>
                <Button onClick={handleCloseHistoryModal}>Zamknij</Button>
              </ModalFooter>
            </div>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default AssetTracking;
