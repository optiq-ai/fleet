import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface AlternativeFuelManagementProps {
  onSaveSettings: (settings: any) => Promise<void>;
  onGenerateReport: (fuelType: string, reportType: string) => Promise<void>;
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
  background-color: var(--color-surface, white);
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
  color: ${props => props.active ? 'var(--color-primary, #3f51b5)' : '#666'};
  border-bottom: 2px solid ${props => props.active ? 'var(--color-primary, #3f51b5)' : 'transparent'};
  transition: all 0.3s ease;
  
  &:hover {
    color: var(--color-primary, #3f51b5);
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
    border-color: var(--color-primary, #3f51b5);
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
    border-color: var(--color-primary, #3f51b5);
    outline: none;
  }
`;

const Button = styled.button`
  padding: 10px 16px;
  background-color: var(--color-primary, #3f51b5);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  
  &:hover {
    background-color: var(--color-primary, #303f9f);
    opacity: 0.9;
  }
  
  &:disabled {
    background-color: #c5cae9;
    cursor: not-allowed;
  }
`;

const SecondaryButton = styled.button`
  padding: 10px 16px;
  background-color: white;
  color: var(--color-primary, #3f51b5);
  border: 1px solid var(--color-primary, #3f51b5);
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

const VehiclesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const VehicleItem = styled.div`
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
`;

const VehicleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const VehicleTitle = styled.div`
  font-weight: 500;
`;

const VehicleBadge = styled.div<{ type: string }>`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  background-color: ${props => 
    props.type === 'CNG' ? '#e8f5e9' : 
    props.type === 'LPG' ? '#fff8e1' : 
    props.type === 'Hydrogen' ? '#e3f2fd' : 
    props.type === 'Biodiesel' ? '#f3e5f5' :
    '#f5f5f5'
  };
  color: ${props => 
    props.type === 'CNG' ? '#2e7d32' : 
    props.type === 'LPG' ? '#f57f17' : 
    props.type === 'Hydrogen' ? '#1565c0' : 
    props.type === 'Biodiesel' ? '#7b1fa2' :
    '#616161'
  };
`;

const VehicleInfo = styled.div`
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

const VehicleInfoItem = styled.div``;

const VehicleInfoLabel = styled.div`
  font-size: 12px;
  color: #666;
  margin-bottom: 4px;
`;

const VehicleInfoValue = styled.div`
  font-weight: 500;
`;

const VehicleActions = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button`
  padding: 6px 12px;
  background-color: white;
  color: var(--color-primary, #3f51b5);
  border: 1px solid var(--color-primary, #3f51b5);
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
    border-color: var(--color-primary, #3f51b5);
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
  background-color: ${props => props.active ? 'var(--color-primary, #3f51b5)' : 'white'};
  color: ${props => props.active ? 'white' : 'var(--color-primary, #3f51b5)'};
  border: 1px solid var(--color-primary, #3f51b5);
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  
  &:hover {
    background-color: ${props => props.active ? 'var(--color-primary, #303f9f)' : '#e8eaf6'};
  }
`;

const ChartContainer = styled.div`
  height: 300px;
  background-color: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  padding: 16px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StatTitle = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
`;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 8px;
`;

const StatTrend = styled.div<{ trend: 'up' | 'down' | 'stable' }>`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: ${props => 
    props.trend === 'up' ? '#4caf50' : 
    props.trend === 'down' ? '#f44336' : 
    '#757575'
  };
`;

const FuelStationsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
`;

const FuelStationItem = styled.div`
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  display: flex;
  align-items: center;
  gap: 16px;
`;

const FuelStationIcon = styled.div<{ type: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => 
    props.type === 'CNG' ? '#e8f5e9' : 
    props.type === 'LPG' ? '#fff8e1' : 
    props.type === 'Hydrogen' ? '#e3f2fd' : 
    props.type === 'Biodiesel' ? '#f3e5f5' :
    '#f5f5f5'
  };
  color: ${props => 
    props.type === 'CNG' ? '#2e7d32' : 
    props.type === 'LPG' ? '#f57f17' : 
    props.type === 'Hydrogen' ? '#1565c0' : 
    props.type === 'Biodiesel' ? '#7b1fa2' :
    '#616161'
  };
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

const FuelStationInfo = styled.div`
  flex: 1;
`;

const FuelStationName = styled.div`
  font-weight: 500;
  margin-bottom: 4px;
`;

const FuelStationAddress = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
`;

const FuelStationDetails = styled.div`
  display: flex;
  gap: 16px;
  font-size: 14px;
`;

const FuelStationStatus = styled.div<{ status: 'available' | 'busy' | 'offline' }>`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  background-color: ${props => 
    props.status === 'available' ? '#e8f5e9' : 
    props.status === 'busy' ? '#fff8e1' : 
    '#ffebee'
  };
  color: ${props => 
    props.status === 'available' ? '#2e7d32' : 
    props.status === 'busy' ? '#f57f17' : 
    '#c62828'
  };
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

const SettingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SettingCard = styled.div`
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #ddd;
  background-color: white;
`;

const SettingTitle = styled.div`
  font-weight: 500;
  margin-bottom: 12px;
`;

const SettingDescription = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
`;

const ToggleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
`;

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  
  &:checked + span {
    background-color: var(--color-primary, #3f51b5);
  }
  
  &:checked + span:before {
    transform: translateX(26px);
  }
`;

const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 34px;
  
  &:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }
`;

const FuelTypeIcon = {
  CNG: '🔵',
  LPG: '🟠',
  Hydrogen: '⚪',
  Biodiesel: '🟣'
};

const AlternativeFuelManagement: React.FC<AlternativeFuelManagementProps> = ({
  onSaveSettings,
  onGenerateReport
}) => {
  const [activeTab, setActiveTab] = useState<'fleet' | 'stations' | 'settings' | 'reports'>('fleet');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [fuelTypeFilter, setFuelTypeFilter] = useState<'all' | 'CNG' | 'LPG' | 'Hydrogen' | 'Biodiesel'>('all');
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [fuelStations, setFuelStations] = useState<any[]>([]);
  
  // Ustawienia zarządzania paliwami alternatywnymi
  const [routeOptimizationEnabled, setRouteOptimizationEnabled] = useState<boolean>(true);
  const [fuelQualityMonitoringEnabled, setFuelQualityMonitoringEnabled] = useState<boolean>(true);
  const [emissionsTrackingEnabled, setEmissionsTrackingEnabled] = useState<boolean>(true);
  const [autoRefuelingAlertsEnabled, setAutoRefuelingAlertsEnabled] = useState<boolean>(false);
  
  // Przykładowe dane
  useEffect(() => {
    // Symulacja pobrania pojazdów z paliwami alternatywnymi
    const sampleVehicles = [
      {
        id: 'af1',
        name: 'Iveco Daily CNG',
        type: 'CNG',
        licensePlate: 'CNG-12345',
        tankCapacity: 120,
        currentLevel: 85,
        range: 380,
        efficiency: 8.5,
        lastRefueled: '2025-04-11T08:30:00Z',
        assignedTo: 'Jan Kowalski',
        status: 'active',
        location: {
          latitude: 52.2297,
          longitude: 21.0122
        }
      },
      {
        id: 'af2',
        name: 'Fiat Ducato LPG',
        type: 'LPG',
        licensePlate: 'LPG-67890',
        tankCapacity: 100,
        currentLevel: 45,
        range: 320,
        efficiency: 12.5,
        lastRefueled: '2025-04-10T17:15:00Z',
        assignedTo: 'Anna Nowak',
        status: 'active',
        location: {
          latitude: 52.2297,
          longitude: 21.0122
        }
      },
      {
        id: 'af3',
        name: 'Toyota Mirai',
        type: 'Hydrogen',
        licensePlate: 'H2-54321',
        tankCapacity: 5.6,
        currentLevel: 3.2,
        range: 450,
        efficiency: 0.9,
        lastRefueled: '2025-04-12T09:30:00Z',
        assignedTo: 'Piotr Wiśniewski',
        status: 'active',
        location: {
          latitude: 52.2297,
          longitude: 21.0122
        }
      },
      {
        id: 'af4',
        name: 'Scania Biodiesel',
        type: 'Biodiesel',
        licensePlate: 'BIO-98765',
        tankCapacity: 400,
        currentLevel: 280,
        range: 850,
        efficiency: 32.5,
        lastRefueled: '2025-04-09T14:45:00Z',
        assignedTo: 'Maria Kowalczyk',
        status: 'maintenance',
        location: {
          latitude: 52.2297,
          longitude: 21.0122
        }
      },
      {
        id: 'af5',
        name: 'Mercedes Sprinter CNG',
        type: 'CNG',
        licensePlate: 'CNG-24680',
        tankCapacity: 110,
        currentLevel: 72,
        range: 420,
        efficiency: 7.8,
        lastRefueled: '2025-04-11T11:30:00Z',
        assignedTo: 'Tomasz Lewandowski',
        status: 'active',
        location: {
          latitude: 52.2297,
          longitude: 21.0122
        }
      }
    ];
    
    setVehicles(sampleVehicles);
    
    // Symulacja pobrania stacji paliw alternatywnych
    const sampleFuelStations = [
      {
        id: 'fs1',
        name: 'Stacja CNG/LPG - Centrala',
        address: 'ul. Główna 1, Warszawa',
        types: ['CNG', 'LPG'],
        pumps: 4,
        status: 'available',
        lastMaintenance: '2025-03-15',
        price: {
          CNG: 3.15,
          LPG: 2.85
        }
      },
      {
        id: 'fs2',
        name: 'Stacja Wodorowa - Wschód',
        address: 'ul. Wschodnia 15, Warszawa',
        types: ['Hydrogen'],
        pumps: 2,
        status: 'busy',
        lastMaintenance: '2025-04-01',
        price: {
          Hydrogen: 45.00
        }
      },
      {
        id: 'fs3',
        name: 'Stacja Biodiesel - Północ',
        address: 'ul. Północna 8, Warszawa',
        types: ['Biodiesel'],
        pumps: 3,
        status: 'available',
        lastMaintenance: '2025-03-20',
        price: {
          Biodiesel: 5.20
        }
      },
      {
        id: 'fs4',
        name: 'Stacja Wielopaliwowa - Zachód',
        address: 'ul. Zachodnia 22, Warszawa',
        types: ['CNG', 'LPG', 'Biodiesel'],
        pumps: 8,
        status: 'available',
        lastMaintenance: '2025-02-10',
        price: {
          CNG: 3.20,
          LPG: 2.90,
          Biodiesel: 5.15
        }
      }
    ];
    
    setFuelStations(sampleFuelStations);
  }, []);
  
  // Filtrowanie pojazdów na podstawie wyszukiwania i filtrów
  const filteredVehicles = vehicles.filter(vehicle => {
    // Filtrowanie według wyszukiwania
    if (searchQuery && !vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !vehicle.licensePlate.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !vehicle.assignedTo.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filtrowanie według typu paliwa
    if (fuelTypeFilter !== 'all' && vehicle.type !== fuelTypeFilter) {
      return false;
    }
    
    return true;
  });
  
  // Filtrowanie stacji paliw na podstawie wyszukiwania i filtrów
  const filteredFuelStations = fuelStations.filter(station => {
    // Filtrowanie według wyszukiwania
    if (searchQuery && !station.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !station.address.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filtrowanie według typu paliwa
    if (fuelTypeFilter !== 'all' && !station.types.includes(fuelTypeFilter)) {
      return false;
    }
    
    return true;
  });
  
  // Obsługa zapisywania ustawień
  const handleSaveSettings = async () => {
    const settings = {
      routeOptimizationEnabled,
      fuelQualityMonitoringEnabled,
      emissionsTrackingEnabled,
      autoRefuelingAlertsEnabled
    };
    
    try {
      await onSaveSettings(settings);
      alert('Ustawienia zostały zapisane');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Wystąpił błąd podczas zapisywania ustawień');
    }
  };
  
  // Obsługa generowania raportu
  const handleGenerateReport = async (fuelType: string, reportType: string) => {
    try {
      await onGenerateReport(fuelType, reportType);
      alert(`Raport ${reportType} dla paliwa ${fuelType} został wygenerowany`);
    } catch (error) {
      console.error('Error generating report:', error);
      alert('Wystąpił błąd podczas generowania raportu');
    }
  };
  
  // Formatowanie daty
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Nie dotyczy';
    
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  
  // Renderowanie zakładki floty
  const renderFleetTab = () => {
    return (
      <>
        <SearchContainer>
          <SearchInput 
            type="text" 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
            placeholder="Szukaj pojazdów po nazwie, numerze rejestracyjnym lub kierowcy..."
          />
        </SearchContainer>
        
        <FilterContainer>
          <FilterButton 
            active={fuelTypeFilter === 'all'} 
            onClick={() => setFuelTypeFilter('all')}
          >
            Wszystkie
          </FilterButton>
          <FilterButton 
            active={fuelTypeFilter === 'CNG'} 
            onClick={() => setFuelTypeFilter('CNG')}
          >
            CNG
          </FilterButton>
          <FilterButton 
            active={fuelTypeFilter === 'LPG'} 
            onClick={() => setFuelTypeFilter('LPG')}
          >
            LPG
          </FilterButton>
          <FilterButton 
            active={fuelTypeFilter === 'Hydrogen'} 
            onClick={() => setFuelTypeFilter('Hydrogen')}
          >
            Wodór
          </FilterButton>
          <FilterButton 
            active={fuelTypeFilter === 'Biodiesel'} 
            onClick={() => setFuelTypeFilter('Biodiesel')}
          >
            Biodiesel
          </FilterButton>
        </FilterContainer>
        
        <StatsGrid>
          <StatCard>
            <StatTitle>Średni poziom paliwa</StatTitle>
            <StatValue>68%</StatValue>
            <StatTrend trend="up">
              <span>↑</span>
              <span>3% w porównaniu do zeszłego tygodnia</span>
            </StatTrend>
          </StatCard>
          <StatCard>
            <StatTitle>Średni zasięg</StatTitle>
            <StatValue>485 km</StatValue>
            <StatTrend trend="stable">
              <span>→</span>
              <span>Bez zmian</span>
            </StatTrend>
          </StatCard>
          <StatCard>
            <StatTitle>Emisje CO2</StatTitle>
            <StatValue>-32%</StatValue>
            <StatTrend trend="down">
              <span>↓</span>
              <span>W porównaniu do floty konwencjonalnej</span>
            </StatTrend>
          </StatCard>
        </StatsGrid>
        
        <ChartContainer>
          Wykres zużycia paliw alternatywnych w czasie
        </ChartContainer>
        
        {filteredVehicles.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px', color: '#ddd' }}>🔍</div>
            <div style={{ fontSize: '16px', marginBottom: '8px' }}>Brak pojazdów</div>
            <div style={{ fontSize: '14px', color: '#999', marginBottom: '16px' }}>
              {searchQuery || fuelTypeFilter !== 'all' ? 
                'Brak wyników dla podanych filtrów' : 
                'Dodaj pojazdy z paliwami alternatywnymi, aby rozpocząć'}
            </div>
            {(searchQuery || fuelTypeFilter !== 'all') && (
              <SecondaryButton onClick={() => {
                setSearchQuery('');
                setFuelTypeFilter('all');
              }}>
                Wyczyść filtry
              </SecondaryButton>
            )}
          </div>
        ) : (
          <VehiclesList>
            {filteredVehicles.map(vehicle => (
              <VehicleItem key={vehicle.id}>
                <VehicleHeader>
                  <VehicleTitle>{vehicle.name} ({vehicle.licensePlate})</VehicleTitle>
                  <VehicleBadge type={vehicle.type}>
                    {vehicle.type}
                  </VehicleBadge>
                </VehicleHeader>
                
                <VehicleInfo>
                  <VehicleInfoItem>
                    <VehicleInfoLabel>Poziom paliwa</VehicleInfoLabel>
                    <VehicleInfoValue>{Math.round((vehicle.currentLevel / vehicle.tankCapacity) * 100)}%</VehicleInfoValue>
                  </VehicleInfoItem>
                  
                  <VehicleInfoItem>
                    <VehicleInfoLabel>Zasięg</VehicleInfoLabel>
                    <VehicleInfoValue>{vehicle.range} km</VehicleInfoValue>
                  </VehicleInfoItem>
                  
                  <VehicleInfoItem>
                    <VehicleInfoLabel>Zużycie</VehicleInfoLabel>
                    <VehicleInfoValue>
                      {vehicle.type === 'Hydrogen' ? 
                        `${vehicle.efficiency} kg/100km` : 
                        `${vehicle.efficiency} l/100km`}
                    </VehicleInfoValue>
                  </VehicleInfoItem>
                  
                  <VehicleInfoItem>
                    <VehicleInfoLabel>Ostatnie tankowanie</VehicleInfoLabel>
                    <VehicleInfoValue>{formatDate(vehicle.lastRefueled)}</VehicleInfoValue>
                  </VehicleInfoItem>
                  
                  <VehicleInfoItem>
                    <VehicleInfoLabel>Przypisany do</VehicleInfoLabel>
                    <VehicleInfoValue>{vehicle.assignedTo}</VehicleInfoValue>
                  </VehicleInfoItem>
                  
                  <VehicleInfoItem>
                    <VehicleInfoLabel>Status</VehicleInfoLabel>
                    <VehicleInfoValue>
                      {vehicle.status === 'active' ? 'Aktywny' : 
                       vehicle.status === 'maintenance' ? 'W konserwacji' : 
                       'Nieaktywny'}
                    </VehicleInfoValue>
                  </VehicleInfoItem>
                </VehicleInfo>
                
                <VehicleActions>
                  <ActionButton onClick={() => handleGenerateReport(vehicle.type, 'efficiency')}>
                    Raport efektywności
                  </ActionButton>
                  <ActionButton onClick={() => handleGenerateReport(vehicle.type, 'emissions')}>
                    Raport emisji
                  </ActionButton>
                  <ActionButton>Zaplanuj tankowanie</ActionButton>
                  <ActionButton>Szczegóły</ActionButton>
                </VehicleActions>
              </VehicleItem>
            ))}
          </VehiclesList>
        )}
      </>
    );
  };
  
  // Renderowanie zakładki stacji paliw
  const renderStationsTab = () => {
    return (
      <>
        <SearchContainer>
          <SearchInput 
            type="text" 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
            placeholder="Szukaj stacji paliw po nazwie lub adresie..."
          />
        </SearchContainer>
        
        <FilterContainer>
          <FilterButton 
            active={fuelTypeFilter === 'all'} 
            onClick={() => setFuelTypeFilter('all')}
          >
            Wszystkie
          </FilterButton>
          <FilterButton 
            active={fuelTypeFilter === 'CNG'} 
            onClick={() => setFuelTypeFilter('CNG')}
          >
            CNG
          </FilterButton>
          <FilterButton 
            active={fuelTypeFilter === 'LPG'} 
            onClick={() => setFuelTypeFilter('LPG')}
          >
            LPG
          </FilterButton>
          <FilterButton 
            active={fuelTypeFilter === 'Hydrogen'} 
            onClick={() => setFuelTypeFilter('Hydrogen')}
          >
            Wodór
          </FilterButton>
          <FilterButton 
            active={fuelTypeFilter === 'Biodiesel'} 
            onClick={() => setFuelTypeFilter('Biodiesel')}
          >
            Biodiesel
          </FilterButton>
        </FilterContainer>
        
        <MapContainer>
          Mapa stacji paliw alternatywnych
        </MapContainer>
        
        <StatsGrid>
          <StatCard>
            <StatTitle>Dostępne stacje</StatTitle>
            <StatValue>
              {fuelStations.filter(station => station.status === 'available').length} / {fuelStations.length}
            </StatValue>
          </StatCard>
          <StatCard>
            <StatTitle>Średnia cena CNG</StatTitle>
            <StatValue>3.18 zł/m³</StatValue>
          </StatCard>
          <StatCard>
            <StatTitle>Średnia cena LPG</StatTitle>
            <StatValue>2.88 zł/l</StatValue>
          </StatCard>
        </StatsGrid>
        
        {filteredFuelStations.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px', color: '#ddd' }}>🔍</div>
            <div style={{ fontSize: '16px', marginBottom: '8px' }}>Brak stacji paliw</div>
            <div style={{ fontSize: '14px', color: '#999', marginBottom: '16px' }}>
              {searchQuery || fuelTypeFilter !== 'all' ? 
                'Brak wyników dla podanych filtrów' : 
                'Dodaj stacje paliw alternatywnych, aby rozpocząć'}
            </div>
            {(searchQuery || fuelTypeFilter !== 'all') && (
              <SecondaryButton onClick={() => {
                setSearchQuery('');
                setFuelTypeFilter('all');
              }}>
                Wyczyść filtry
              </SecondaryButton>
            )}
          </div>
        ) : (
          <FuelStationsList>
            {filteredFuelStations.map(station => (
              <FuelStationItem key={station.id}>
                <FuelStationIcon type={station.types[0]}>
                  {FuelTypeIcon[station.types[0] as keyof typeof FuelTypeIcon]}
                </FuelStationIcon>
                <FuelStationInfo>
                  <FuelStationName>{station.name}</FuelStationName>
                  <FuelStationAddress>{station.address}</FuelStationAddress>
                  <FuelStationDetails>
                    <div>
                      Typy paliw: {station.types.join(', ')}
                    </div>
                    <div>
                      Dystrybutory: {station.pumps}
                    </div>
                    <div>
                      Ceny: {Object.entries(station.price).map(([type, price]) => `${type}: ${price} zł`).join(', ')}
                    </div>
                  </FuelStationDetails>
                </FuelStationInfo>
                <FuelStationStatus status={station.status as any}>
                  {station.status === 'available' ? 'Dostępna' : 
                   station.status === 'busy' ? 'Zajęta' : 
                   'Offline'}
                </FuelStationStatus>
                <VehicleActions>
                  <ActionButton>Szczegóły</ActionButton>
                  <ActionButton>Zarezerwuj</ActionButton>
                </VehicleActions>
              </FuelStationItem>
            ))}
          </FuelStationsList>
        )}
      </>
    );
  };
  
  // Renderowanie zakładki ustawień
  const renderSettingsTab = () => {
    return (
      <>
        <SettingsGrid>
          <SettingCard>
            <SettingTitle>Optymalizacja tras</SettingTitle>
            <SettingDescription>
              Automatycznie planuj trasy z uwzględnieniem zasięgu pojazdu, lokalizacji stacji paliw 
              i aktualnych warunków drogowych.
            </SettingDescription>
            <ToggleContainer>
              <div>Włącz optymalizację tras</div>
              <ToggleSwitch>
                <ToggleInput 
                  type="checkbox" 
                  checked={routeOptimizationEnabled}
                  onChange={() => setRouteOptimizationEnabled(!routeOptimizationEnabled)}
                />
                <ToggleSlider />
              </ToggleSwitch>
            </ToggleContainer>
          </SettingCard>
          
          <SettingCard>
            <SettingTitle>Monitorowanie jakości paliwa</SettingTitle>
            <SettingDescription>
              Monitoruj jakość paliw alternatywnych i otrzymuj powiadomienia o potencjalnych problemach 
              lub niezgodnościach z normami.
            </SettingDescription>
            <ToggleContainer>
              <div>Włącz monitorowanie jakości paliwa</div>
              <ToggleSwitch>
                <ToggleInput 
                  type="checkbox" 
                  checked={fuelQualityMonitoringEnabled}
                  onChange={() => setFuelQualityMonitoringEnabled(!fuelQualityMonitoringEnabled)}
                />
                <ToggleSlider />
              </ToggleSwitch>
            </ToggleContainer>
          </SettingCard>
          
          <SettingCard>
            <SettingTitle>Śledzenie emisji</SettingTitle>
            <SettingDescription>
              Śledź emisje CO2 i innych gazów cieplarnianych dla pojazdów z paliwami alternatywnymi 
              i porównuj je z konwencjonalnymi pojazdami.
            </SettingDescription>
            <ToggleContainer>
              <div>Włącz śledzenie emisji</div>
              <ToggleSwitch>
                <ToggleInput 
                  type="checkbox" 
                  checked={emissionsTrackingEnabled}
                  onChange={() => setEmissionsTrackingEnabled(!emissionsTrackingEnabled)}
                />
                <ToggleSlider />
              </ToggleSwitch>
            </ToggleContainer>
          </SettingCard>
          
          <SettingCard>
            <SettingTitle>Automatyczne alerty tankowania</SettingTitle>
            <SettingDescription>
              Automatycznie wysyłaj powiadomienia do kierowców, gdy poziom paliwa spadnie poniżej 
              określonego progu, z sugestią najbliższych stacji paliw.
            </SettingDescription>
            <ToggleContainer>
              <div>Włącz automatyczne alerty tankowania</div>
              <ToggleSwitch>
                <ToggleInput 
                  type="checkbox" 
                  checked={autoRefuelingAlertsEnabled}
                  onChange={() => setAutoRefuelingAlertsEnabled(!autoRefuelingAlertsEnabled)}
                />
                <ToggleSlider />
              </ToggleSwitch>
            </ToggleContainer>
          </SettingCard>
        </SettingsGrid>
        
        <Card>
          <CardTitle>Ustawienia paliw</CardTitle>
          <CardContent>
            <FormGroup>
              <Label>Preferowany dostawca CNG</Label>
              <Select>
                <option value="supplier1">PGNiG</option>
                <option value="supplier2">Orlen</option>
                <option value="supplier3">BP</option>
                <option value="none">Brak preferencji</option>
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label>Preferowany dostawca LPG</Label>
              <Select>
                <option value="supplier1">Orlen</option>
                <option value="supplier2">BP</option>
                <option value="supplier3">Shell</option>
                <option value="none">Brak preferencji</option>
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label>Preferowany dostawca wodoru</Label>
              <Select>
                <option value="supplier1">Orlen Hydrogen</option>
                <option value="supplier2">Linde</option>
                <option value="none">Brak preferencji</option>
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label>Preferowany dostawca biodiesla</Label>
              <Select>
                <option value="supplier1">Orlen Bio</option>
                <option value="supplier2">Lotos Biopaliwa</option>
                <option value="none">Brak preferencji</option>
              </Select>
            </FormGroup>
          </CardContent>
        </Card>
        
        <ButtonGroup>
          <Button onClick={handleSaveSettings}>Zapisz ustawienia</Button>
        </ButtonGroup>
      </>
    );
  };
  
  // Renderowanie zakładki raportów
  const renderReportsTab = () => {
    return (
      <>
        <Card>
          <CardTitle>Raporty efektywności</CardTitle>
          <CardContent>
            <p>Generuj raporty efektywności dla poszczególnych typów paliw alternatywnych.</p>
            
            <FormGroup>
              <Label>Wybierz typ paliwa</Label>
              <Select>
                <option value="all">Wszystkie paliwa</option>
                <option value="CNG">CNG</option>
                <option value="LPG">LPG</option>
                <option value="Hydrogen">Wodór</option>
                <option value="Biodiesel">Biodiesel</option>
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label>Zakres czasu</Label>
              <Select>
                <option value="week">Ostatni tydzień</option>
                <option value="month">Ostatni miesiąc</option>
                <option value="quarter">Ostatni kwartał</option>
                <option value="year">Ostatni rok</option>
                <option value="custom">Niestandardowy zakres</option>
              </Select>
            </FormGroup>
            
            <ButtonGroup>
              <Button onClick={() => handleGenerateReport('all', 'efficiency')}>
                Generuj raport efektywności
              </Button>
            </ButtonGroup>
          </CardContent>
        </Card>
        
        <Card>
          <CardTitle>Raporty emisji</CardTitle>
          <CardContent>
            <p>Generuj raporty emisji dla poszczególnych typów paliw alternatywnych.</p>
            
            <FormGroup>
              <Label>Wybierz typ paliwa</Label>
              <Select>
                <option value="all">Wszystkie paliwa</option>
                <option value="CNG">CNG</option>
                <option value="LPG">LPG</option>
                <option value="Hydrogen">Wodór</option>
                <option value="Biodiesel">Biodiesel</option>
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label>Typ emisji</Label>
              <Select>
                <option value="co2">CO2</option>
                <option value="nox">NOx</option>
                <option value="pm">Cząstki stałe (PM)</option>
                <option value="all">Wszystkie emisje</option>
              </Select>
            </FormGroup>
            
            <ButtonGroup>
              <Button onClick={() => handleGenerateReport('all', 'emissions')}>
                Generuj raport emisji
              </Button>
            </ButtonGroup>
          </CardContent>
        </Card>
        
        <Card>
          <CardTitle>Raporty kosztów</CardTitle>
          <CardContent>
            <p>Generuj raporty kosztów dla poszczególnych typów paliw alternatywnych.</p>
            
            <FormGroup>
              <Label>Wybierz typ paliwa</Label>
              <Select>
                <option value="all">Wszystkie paliwa</option>
                <option value="CNG">CNG</option>
                <option value="LPG">LPG</option>
                <option value="Hydrogen">Wodór</option>
                <option value="Biodiesel">Biodiesel</option>
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label>Zakres czasu</Label>
              <Select>
                <option value="week">Ostatni tydzień</option>
                <option value="month">Ostatni miesiąc</option>
                <option value="quarter">Ostatni kwartał</option>
                <option value="year">Ostatni rok</option>
                <option value="custom">Niestandardowy zakres</option>
              </Select>
            </FormGroup>
            
            <ButtonGroup>
              <Button onClick={() => handleGenerateReport('all', 'costs')}>
                Generuj raport kosztów
              </Button>
            </ButtonGroup>
          </CardContent>
        </Card>
      </>
    );
  };
  
  return (
    <Container>
      <Header>
        <Title>Zarządzanie paliwami alternatywnymi</Title>
      </Header>
      
      <TabsContainer>
        <Tab 
          active={activeTab === 'fleet'} 
          onClick={() => setActiveTab('fleet')}
        >
          Flota
        </Tab>
        <Tab 
          active={activeTab === 'stations'} 
          onClick={() => setActiveTab('stations')}
        >
          Stacje paliw
        </Tab>
        <Tab 
          active={activeTab === 'settings'} 
          onClick={() => setActiveTab('settings')}
        >
          Ustawienia
        </Tab>
        <Tab 
          active={activeTab === 'reports'} 
          onClick={() => setActiveTab('reports')}
        >
          Raporty
        </Tab>
      </TabsContainer>
      
      {activeTab === 'fleet' && renderFleetTab()}
      {activeTab === 'stations' && renderStationsTab()}
      {activeTab === 'settings' && renderSettingsTab()}
      {activeTab === 'reports' && renderReportsTab()}
    </Container>
  );
};

export default AlternativeFuelManagement;
