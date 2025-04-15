import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Card from '../components/common/Card';
import Table from '../components/common/Table';
import tiresService from '../services/api/tiresService';
import mockTiresService from '../services/api/mockTiresService';

/**
 * @typedef {Object} Tire
 * @property {string} id - Tire ID
 * @property {string} brand - Tire brand
 * @property {string} model - Tire model
 * @property {string} size - Tire size
 * @property {string} type - Tire type (summer, winter, all-season)
 * @property {number} treadDepth - Tread depth in mm
 * @property {string} manufactureDate - Date of manufacture
 * @property {number} mileage - Mileage on the tire
 * @property {string} status - Tire status (mounted, warehouse, worn)
 * @property {string} vehicleId - Assigned vehicle ID (if mounted)
 * @property {string} position - Position on vehicle (front-left, rear-right, etc.)
 */

/**
 * @typedef {Object} TireCondition
 * @property {string} tireId - Tire ID
 * @property {number} treadDepth - Tread depth in mm
 * @property {number} pressure - Tire pressure in bar
 * @property {string} wearPattern - Wear pattern description
 * @property {string} recommendedAction - Recommended action
 * @property {string} nextCheckDate - Next check date
 */

/**
 * @typedef {Object} RotationSchedule
 * @property {string} id - Rotation schedule ID
 * @property {string} vehicleId - Vehicle ID
 * @property {string} vehicleName - Vehicle name
 * @property {string} lastRotationDate - Last rotation date
 * @property {string} nextRotationDate - Next rotation date
 * @property {string} status - Schedule status
 * @property {Array<Object>} history - Rotation history
 */

/**
 * @typedef {Object} SeasonalChange
 * @property {string} id - Seasonal change ID
 * @property {string} vehicleId - Vehicle ID
 * @property {string} vehicleName - Vehicle name
 * @property {string} currentSetType - Current tire set type
 * @property {string} nextChangeDate - Next change date
 * @property {string} storageLocation - Storage location for off-season tires
 * @property {Array<Object>} history - Change history
 */

/**
 * @typedef {Object} TireAnalytics
 * @property {Array<Object>} lifespanByBrand - Average lifespan by brand
 * @property {Array<Object>} costAnalysis - Cost analysis data
 * @property {Array<Object>} fuelEfficiency - Fuel efficiency impact data
 * @property {Array<Object>} recommendations - Tire recommendations
 */

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 500;
  color: #333;
  margin: 0 0 16px 0;
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

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 20px;
  padding: 16px;
  background-color: #f5f5f5;
  border-radius: 8px;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FilterLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #333;
`;

const FilterSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 14px;
  min-width: 150px;
  
  &:focus {
    outline: none;
    border-color: #3f51b5;
  }
`;

const FilterInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #3f51b5;
  }
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

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-left: auto;
`;

const GridSection = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 20px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const ChartContainer = styled.div`
  height: 300px;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
`;

const Badge = styled.span`
  display: inline-block;
  padding: 4px 8px;
  background-color: ${props => {
    switch(props.status) {
      case 'mounted': return '#4caf50';
      case 'warehouse': return '#2196f3';
      case 'worn': return '#f44336';
      case 'scheduled': return '#ff9800';
      case 'critical': return '#d32f2f';
      case 'warning': return '#ff9800';
      case 'good': return '#4caf50';
      default: return '#9e9e9e';
    }
  }};
  color: white;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
`;

const DetailContainer = styled.div`
  padding: 16px;
  background-color: #f5f5f5;
  border-radius: 8px;
  margin-top: 20px;
`;

const DetailTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin: 0 0 12px 0;
`;

const DetailRow = styled.div`
  display: flex;
  margin-bottom: 8px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const DetailLabel = styled.div`
  font-weight: 500;
  width: 200px;
  color: #666;
`;

const DetailValue = styled.div`
  flex: 1;
`;

const LoadingIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  color: #666;
`;

const ErrorMessage = styled.div`
  color: #d32f2f;
  padding: 16px;
  background-color: #ffebee;
  border-radius: 4px;
  margin-bottom: 20px;
`;

const TreadDepthIndicator = styled.div`
  width: 100%;
  height: 20px;
  background-color: #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${props => Math.min(100, (props.value / 8) * 100)}%;
    background-color: ${props => {
      if (props.value < 3) return '#f44336';
      if (props.value < 5) return '#ff9800';
      return '#4caf50';
    }};
    transition: width 0.3s ease;
  }
`;

const TreadDepthValue = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.value < 3 ? 'white' : 'black'};
  font-weight: 500;
  font-size: 12px;
  z-index: 1;
`;

const DataSourceToggle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
`;

const ToggleLabel = styled.span`
  font-size: 14px;
  color: #666;
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 30px;
  
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
    border-radius: 34px;
    
    &:before {
      position: absolute;
      content: "";
      height: 22px;
      width: 22px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      transition: .4s;
      border-radius: 50%;
    }
  }
  
  input:checked + span {
    background-color: #3f51b5;
  }
  
  input:checked + span:before {
    transform: translateX(30px);
  }
`;

/**
 * VehicleTires component for managing vehicle tires inventory and maintenance
 * @returns {JSX.Element} VehicleTires component
 */
const VehicleTires = () => {
  // Active tab state
  const [activeTab, setActiveTab] = useState('inventory');
  
  // Data source toggle state (API vs Mock)
  const [useMockData, setUseMockData] = useState(true);
  
  // Tires inventory states
  const [tires, setTires] = useState(null);
  const [selectedTire, setSelectedTire] = useState(null);
  
  // Tire condition states
  const [tireConditions, setTireConditions] = useState(null);
  const [selectedCondition, setSelectedCondition] = useState(null);
  
  // Rotation schedule states
  const [rotationSchedules, setRotationSchedules] = useState(null);
  const [selectedRotation, setSelectedRotation] = useState(null);
  
  // Seasonal change states
  const [seasonalChanges, setSeasonalChanges] = useState(null);
  const [selectedChange, setSelectedChange] = useState(null);
  
  // Analytics states
  const [analytics, setAnalytics] = useState(null);
  
  // Filters state
  const [filters, setFilters] = useState({
    brand: 'all',
    type: 'all',
    status: 'all',
    vehicle: 'all',
    search: '',
    page: 1,
    limit: 10
  });
  
  // Loading and error states
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch data based on active tab
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Select service based on toggle
        const service = useMockData ? mockTiresService : tiresService;
        
        switch(activeTab) {
          case 'inventory':
            console.log('Fetching tires inventory data...');
            const tiresResponse = await service.getTires(
              filters.brand !== 'all' ? filters.brand : undefined,
              filters.type !== 'all' ? filters.type : undefined,
              filters.status !== 'all' ? filters.status : undefined,
              filters.vehicle !== 'all' ? filters.vehicle : undefined,
              filters.search || undefined,
              filters.page,
              filters.limit
            );
            console.log('Tires response:', tiresResponse); // Debug log
            setTires(tiresResponse);
            break;
            
          case 'condition':
            console.log('Fetching tire conditions data...');
            const conditionsResponse = await service.getTireConditions(
              filters.vehicle !== 'all' ? filters.vehicle : undefined,
              filters.page,
              filters.limit
            );
            console.log('Conditions response:', conditionsResponse); // Debug log
            setTireConditions(conditionsResponse);
            break;
            
          case 'rotation':
            console.log('Fetching rotation schedules data...');
            const rotationResponse = await service.getRotationSchedules(
              filters.vehicle !== 'all' ? filters.vehicle : undefined,
              filters.page,
              filters.limit
            );
            console.log('Rotation response:', rotationResponse); // Debug log
            setRotationSchedules(rotationResponse);
            break;
            
          case 'seasonal':
            console.log('Fetching seasonal changes data...');
            const seasonalResponse = await service.getSeasonalChanges(
              filters.vehicle !== 'all' ? filters.vehicle : undefined,
              filters.page,
              filters.limit
            );
            console.log('Seasonal response:', seasonalResponse); // Debug log
            setSeasonalChanges(seasonalResponse);
            break;
            
          case 'analytics':
            console.log('Fetching tire analytics data...');
            const analyticsResponse = await service.getTireAnalytics();
            console.log('Analytics response:', analyticsResponse); // Debug log
            setAnalytics(analyticsResponse);
            break;
            
          default:
            break;
        }
      } catch (err) {
        console.error(`Error fetching ${activeTab} data:`, err);
        setError(`Nie udało się pobrać danych ${getTabName(activeTab)}. Spróbuj odświeżyć stronę.`);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [activeTab, filters, useMockData]);
  
  // Get tire details
  const handleTireSelect = async (tire) => {
    try {
      const service = useMockData ? mockTiresService : tiresService;
      const tireDetails = await service.getTireDetails(tire.id);
      setSelectedTire(tireDetails);
    } catch (err) {
      console.error('Error fetching tire details:', err);
      setError('Nie udało się pobrać szczegółów opony.');
    }
  };
  
  // Get condition details
  const handleConditionSelect = async (condition) => {
    setSelectedCondition(condition);
  };
  
  // Get rotation details
  const handleRotationSelect = async (rotation) => {
    try {
      const service = useMockData ? mockTiresService : tiresService;
      const rotationDetails = await service.getRotationDetails(rotation.id);
      setSelectedRotation(rotationDetails);
    } catch (err) {
      console.error('Error fetching rotation details:', err);
      setError('Nie udało się pobrać szczegółów harmonogramu rotacji.');
    }
  };
  
  // Get seasonal change details
  const handleSeasonalSelect = async (change) => {
    try {
      const service = useMockData ? mockTiresService : tiresService;
      const changeDetails = await service.getSeasonalChangeDetails(change.id);
      setSelectedChange(changeDetails);
    } catch (err) {
      console.error('Error fetching seasonal change details:', err);
      setError('Nie udało się pobrać szczegółów wymiany sezonowej.');
    }
  };
  
  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
      // Reset page when changing filters
      ...(name !== 'page' && { page: 1 })
    });
  };
  
  // Handle search
  const handleSearch = () => {
    setFilters({
      ...filters,
      page: 1
    });
  };
  
  // Handle data source toggle
  const handleToggleDataSource = () => {
    setUseMockData(prev => !prev);
  };
  
  // Export data to CSV
  const handleExportCSV = () => {
    // Implementation would depend on the specific requirements
    alert('Eksport do CSV zostanie zaimplementowany zgodnie z wymaganiami.');
  };
  
  // Export data to PDF
  const handleExportPDF = () => {
    // Implementation would depend on the specific requirements
    alert('Eksport do PDF zostanie zaimplementowany zgodnie z wymaganiami.');
  };
  
  // Helper function to get tab name in Polish
  const getTabName = (tab) => {
    switch(tab) {
      case 'inventory': return 'inwentarza opon';
      case 'condition': return 'stanu opon';
      case 'rotation': return 'harmonogramu rotacji';
      case 'seasonal': return 'wymiany sezonowej';
      case 'analytics': return 'analityki opon';
      default: return tab;
    }
  };
  
  // Render inventory tab content
  const renderInventoryTab = () => {
    if (isLoading) {
      return <LoadingIndicator>Ładowanie danych inwentarza opon...</LoadingIndicator>;
    }
    
    if (error) {
      return <ErrorMessage>{error}</ErrorMessage>;
    }
    
    if (!tires || !tires.data || tires.data.length === 0) {
      return <div>Brak danych inwentarza opon do wyświetlenia.</div>;
    }
    
    const columns = [
      { id: 'id', label: 'ID' },
      { id: 'brand', label: 'Marka' },
      { id: 'model', label: 'Model' },
      { id: 'size', label: 'Rozmiar' },
      { 
        id: 'type', 
        label: 'Typ',
        format: (value) => {
          switch(value) {
            case 'summer': return 'Letnie';
            case 'winter': return 'Zimowe';
            case 'all_season': return 'Całoroczne';
            default: return value;
          }
        }
      },
      { 
        id: 'treadDepth', 
        label: 'Bieżnik (mm)',
        format: (value) => (
          <div style={{ position: 'relative', width: '100px' }}>
            <TreadDepthIndicator value={value}>
              <TreadDepthValue value={value}>{value} mm</TreadDepthValue>
            </TreadDepthIndicator>
          </div>
        )
      },
      { id: 'manufactureDate', label: 'Data produkcji' },
      { id: 'mileage', label: 'Przebieg', format: (value) => `${value} km` },
      { 
        id: 'status', 
        label: 'Status',
        format: (value) => {
          let label = '';
          let status = '';
          
          switch(value) {
            case 'mounted':
              label = 'Zamontowana';
              status = 'mounted';
              break;
            case 'warehouse':
              label = 'Magazyn';
              status = 'warehouse';
              break;
            case 'worn':
              label = 'Zużyta';
              status = 'worn';
              break;
            default:
              label = value;
              status = 'default';
          }
          
          return <Badge status={status}>{label}</Badge>;
        }
      },
      { id: 'vehicleId', label: 'Pojazd' },
      { id: 'position', label: 'Pozycja' }
    ];
    
    return (
      <>
        <FilterContainer>
          <FilterGroup>
            <FilterLabel htmlFor="brand">Marka</FilterLabel>
            <FilterSelect 
              id="brand" 
              name="brand" 
              value={filters.brand} 
              onChange={handleFilterChange}
            >
              <option value="all">Wszystkie</option>
              <option value="michelin">Michelin</option>
              <option value="continental">Continental</option>
              <option value="bridgestone">Bridgestone</option>
              <option value="goodyear">Goodyear</option>
              <option value="pirelli">Pirelli</option>
              <option value="other">Inne</option>
            </FilterSelect>
          </FilterGroup>
          
          <FilterGroup>
            <FilterLabel htmlFor="type">Typ</FilterLabel>
            <FilterSelect 
              id="type" 
              name="type" 
              value={filters.type} 
              onChange={handleFilterChange}
            >
              <option value="all">Wszystkie</option>
              <option value="summer">Letnie</option>
              <option value="winter">Zimowe</option>
              <option value="all_season">Całoroczne</option>
            </FilterSelect>
          </FilterGroup>
          
          <FilterGroup>
            <FilterLabel htmlFor="status">Status</FilterLabel>
            <FilterSelect 
              id="status" 
              name="status" 
              value={filters.status} 
              onChange={handleFilterChange}
            >
              <option value="all">Wszystkie</option>
              <option value="mounted">Zamontowane</option>
              <option value="warehouse">Magazyn</option>
              <option value="worn">Zużyte</option>
            </FilterSelect>
          </FilterGroup>
          
          <FilterGroup>
            <FilterLabel htmlFor="vehicle">Pojazd</FilterLabel>
            <FilterSelect 
              id="vehicle" 
              name="vehicle" 
              value={filters.vehicle} 
              onChange={handleFilterChange}
            >
              <option value="all">Wszystkie</option>
              <option value="V001">V001 - Mercedes Actros</option>
              <option value="V002">V002 - Volvo FH</option>
              <option value="V003">V003 - Scania R</option>
              <option value="V004">V004 - MAN TGX</option>
              <option value="V005">V005 - DAF XF</option>
            </FilterSelect>
          </FilterGroup>
          
          <FilterGroup>
            <FilterLabel htmlFor="search">Wyszukaj</FilterLabel>
            <div style={{ display: 'flex', gap: '8px' }}>
              <FilterInput 
                id="search" 
                name="search" 
                value={filters.search} 
                onChange={handleFilterChange}
                placeholder="ID, marka, model..."
              />
              <Button onClick={handleSearch}>Szukaj</Button>
            </div>
          </FilterGroup>
          
          <ButtonGroup>
            <Button onClick={handleExportCSV}>Eksport CSV</Button>
            <Button onClick={handleExportPDF}>Eksport PDF</Button>
          </ButtonGroup>
        </FilterContainer>
        
        <Table 
          headers={columns.map(col => col.label)}
          data={tires.data.map(tire => columns.map(col => {
            const value = tire[col.id];
            return col.format && typeof col.format === 'function' ? col.format(value) : value;
          }))}
          onRowClick={(rowIndex) => handleTireSelect(tires.data[rowIndex])}
        />
        
        {selectedTire && (
          <DetailContainer>
            <DetailTitle>Szczegóły opony {selectedTire.brand} {selectedTire.model}</DetailTitle>
            
            <DetailRow>
              <DetailLabel>ID:</DetailLabel>
              <DetailValue>{selectedTire.id}</DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>Marka i model:</DetailLabel>
              <DetailValue>{selectedTire.brand} {selectedTire.model}</DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>Rozmiar:</DetailLabel>
              <DetailValue>{selectedTire.size}</DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>Typ:</DetailLabel>
              <DetailValue>
                {selectedTire.type === 'summer' && 'Letnie'}
                {selectedTire.type === 'winter' && 'Zimowe'}
                {selectedTire.type === 'all_season' && 'Całoroczne'}
              </DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>Bieżnik:</DetailLabel>
              <DetailValue>
                <div style={{ width: '200px' }}>
                  <TreadDepthIndicator value={selectedTire.treadDepth}>
                    <TreadDepthValue value={selectedTire.treadDepth}>{selectedTire.treadDepth} mm</TreadDepthValue>
                  </TreadDepthIndicator>
                </div>
              </DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>Data produkcji:</DetailLabel>
              <DetailValue>{selectedTire.manufactureDate}</DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>Przebieg:</DetailLabel>
              <DetailValue>{selectedTire.mileage} km</DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>Status:</DetailLabel>
              <DetailValue>
                <Badge status={selectedTire.status}>
                  {selectedTire.status === 'mounted' && 'Zamontowana'}
                  {selectedTire.status === 'warehouse' && 'Magazyn'}
                  {selectedTire.status === 'worn' && 'Zużyta'}
                </Badge>
              </DetailValue>
            </DetailRow>
            
            {selectedTire.vehicleId && (
              <>
                <DetailRow>
                  <DetailLabel>Przypisany pojazd:</DetailLabel>
                  <DetailValue>{selectedTire.vehicleName} ({selectedTire.vehicleId})</DetailValue>
                </DetailRow>
                
                <DetailRow>
                  <DetailLabel>Pozycja na pojeździe:</DetailLabel>
                  <DetailValue>{selectedTire.position}</DetailValue>
                </DetailRow>
              </>
            )}
            
            <DetailRow>
              <DetailLabel>Dodatkowe informacje:</DetailLabel>
              <DetailValue>{selectedTire.notes || 'Brak dodatkowych informacji'}</DetailValue>
            </DetailRow>
            
            <div style={{ marginTop: '16px' }}>
              <Button onClick={() => setSelectedTire(null)}>Zamknij</Button>
            </div>
          </DetailContainer>
        )}
      </>
    );
  };
  
  // Render condition tab content
  const renderConditionTab = () => {
    if (isLoading) {
      return <LoadingIndicator>Ładowanie danych stanu opon...</LoadingIndicator>;
    }
    
    if (error) {
      return <ErrorMessage>{error}</ErrorMessage>;
    }
    
    if (!tireConditions || !tireConditions.data || tireConditions.data.length === 0) {
      return <div>Brak danych stanu opon do wyświetlenia.</div>;
    }
    
    const columns = [
      { id: 'tireId', label: 'ID Opony' },
      { id: 'vehicleId', label: 'Pojazd' },
      { id: 'position', label: 'Pozycja' },
      { 
        id: 'treadDepth', 
        label: 'Bieżnik (mm)',
        format: (value) => (
          <div style={{ position: 'relative', width: '100px' }}>
            <TreadDepthIndicator value={value}>
              <TreadDepthValue value={value}>{value} mm</TreadDepthValue>
            </TreadDepthIndicator>
          </div>
        )
      },
      { id: 'pressure', label: 'Ciśnienie (bar)' },
      { 
        id: 'wearPattern', 
        label: 'Wzór zużycia',
        format: (value) => {
          switch(value) {
            case 'even': return 'Równomierne';
            case 'center': return 'Środek';
            case 'edges': return 'Krawędzie';
            case 'one_side': return 'Jednostronne';
            case 'patchy': return 'Nierównomierne';
            default: return value;
          }
        }
      },
      { 
        id: 'condition', 
        label: 'Stan',
        format: (value) => {
          let label = '';
          let status = '';
          
          switch(value) {
            case 'good':
              label = 'Dobry';
              status = 'good';
              break;
            case 'warning':
              label = 'Ostrzeżenie';
              status = 'warning';
              break;
            case 'critical':
              label = 'Krytyczny';
              status = 'critical';
              break;
            default:
              label = value;
              status = 'default';
          }
          
          return <Badge status={status}>{label}</Badge>;
        }
      },
      { id: 'lastCheckDate', label: 'Ostatni pomiar' },
      { id: 'nextCheckDate', label: 'Następny pomiar' }
    ];
    
    return (
      <>
        <FilterContainer>
          <FilterGroup>
            <FilterLabel htmlFor="vehicle">Pojazd</FilterLabel>
            <FilterSelect 
              id="vehicle" 
              name="vehicle" 
              value={filters.vehicle} 
              onChange={handleFilterChange}
            >
              <option value="all">Wszystkie</option>
              <option value="V001">V001 - Mercedes Actros</option>
              <option value="V002">V002 - Volvo FH</option>
              <option value="V003">V003 - Scania R</option>
              <option value="V004">V004 - MAN TGX</option>
              <option value="V005">V005 - DAF XF</option>
            </FilterSelect>
          </FilterGroup>
          
          <ButtonGroup>
            <Button onClick={handleExportCSV}>Eksport CSV</Button>
            <Button onClick={handleExportPDF}>Eksport PDF</Button>
          </ButtonGroup>
        </FilterContainer>
        
        <Table 
          headers={columns.map(col => col.label)}
          data={tireConditions.data.map(condition => columns.map(col => {
            const value = condition[col.id];
            return col.format && typeof col.format === 'function' ? col.format(value) : value;
          }))}
          onRowClick={(rowIndex) => handleConditionSelect(tireConditions.data[rowIndex])}
        />
        
        {selectedCondition && (
          <DetailContainer>
            <DetailTitle>Szczegóły stanu opony {selectedCondition.tireId}</DetailTitle>
            
            <DetailRow>
              <DetailLabel>ID Opony:</DetailLabel>
              <DetailValue>{selectedCondition.tireId}</DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>Pojazd:</DetailLabel>
              <DetailValue>{selectedCondition.vehicleId}</DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>Pozycja:</DetailLabel>
              <DetailValue>{selectedCondition.position}</DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>Bieżnik:</DetailLabel>
              <DetailValue>
                <div style={{ width: '200px' }}>
                  <TreadDepthIndicator value={selectedCondition.treadDepth}>
                    <TreadDepthValue value={selectedCondition.treadDepth}>{selectedCondition.treadDepth} mm</TreadDepthValue>
                  </TreadDepthIndicator>
                </div>
              </DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>Ciśnienie:</DetailLabel>
              <DetailValue>{selectedCondition.pressure} bar</DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>Wzór zużycia:</DetailLabel>
              <DetailValue>
                {selectedCondition.wearPattern === 'even' && 'Równomierne'}
                {selectedCondition.wearPattern === 'center' && 'Środek'}
                {selectedCondition.wearPattern === 'edges' && 'Krawędzie'}
                {selectedCondition.wearPattern === 'one_side' && 'Jednostronne'}
                {selectedCondition.wearPattern === 'patchy' && 'Nierównomierne'}
              </DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>Stan:</DetailLabel>
              <DetailValue>
                <Badge status={selectedCondition.condition}>
                  {selectedCondition.condition === 'good' && 'Dobry'}
                  {selectedCondition.condition === 'warning' && 'Ostrzeżenie'}
                  {selectedCondition.condition === 'critical' && 'Krytyczny'}
                </Badge>
              </DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>Zalecane działanie:</DetailLabel>
              <DetailValue>{selectedCondition.recommendedAction}</DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>Ostatni pomiar:</DetailLabel>
              <DetailValue>{selectedCondition.lastCheckDate}</DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>Następny pomiar:</DetailLabel>
              <DetailValue>{selectedCondition.nextCheckDate}</DetailValue>
            </DetailRow>
            
            <div style={{ marginTop: '16px' }}>
              <Button onClick={() => setSelectedCondition(null)}>Zamknij</Button>
            </div>
          </DetailContainer>
        )}
      </>
    );
  };
  
  // Render rotation tab content
  const renderRotationTab = () => {
    if (isLoading) {
      return <LoadingIndicator>Ładowanie danych harmonogramu rotacji...</LoadingIndicator>;
    }
    
    if (error) {
      return <ErrorMessage>{error}</ErrorMessage>;
    }
    
    if (!rotationSchedules || !rotationSchedules.data || rotationSchedules.data.length === 0) {
      return <div>Brak danych harmonogramu rotacji do wyświetlenia.</div>;
    }
    
    const columns = [
      { id: 'id', label: 'ID' },
      { id: 'vehicleId', label: 'ID Pojazdu' },
      { id: 'vehicleName', label: 'Nazwa Pojazdu' },
      { id: 'lastRotationDate', label: 'Ostatnia rotacja' },
      { id: 'nextRotationDate', label: 'Następna rotacja' },
      { 
        id: 'status', 
        label: 'Status',
        format: (value) => {
          let label = '';
          let status = '';
          
          switch(value) {
            case 'scheduled':
              label = 'Zaplanowana';
              status = 'scheduled';
              break;
            case 'overdue':
              label = 'Zaległa';
              status = 'critical';
              break;
            case 'completed':
              label = 'Wykonana';
              status = 'good';
              break;
            default:
              label = value;
              status = 'default';
          }
          
          return <Badge status={status}>{label}</Badge>;
        }
      },
      { id: 'mileageSinceRotation', label: 'Przebieg od rotacji', format: (value) => `${value} km` }
    ];
    
    return (
      <>
        <FilterContainer>
          <FilterGroup>
            <FilterLabel htmlFor="vehicle">Pojazd</FilterLabel>
            <FilterSelect 
              id="vehicle" 
              name="vehicle" 
              value={filters.vehicle} 
              onChange={handleFilterChange}
            >
              <option value="all">Wszystkie</option>
              <option value="V001">V001 - Mercedes Actros</option>
              <option value="V002">V002 - Volvo FH</option>
              <option value="V003">V003 - Scania R</option>
              <option value="V004">V004 - MAN TGX</option>
              <option value="V005">V005 - DAF XF</option>
            </FilterSelect>
          </FilterGroup>
          
          <ButtonGroup>
            <Button onClick={handleExportCSV}>Eksport CSV</Button>
            <Button onClick={handleExportPDF}>Eksport PDF</Button>
            <Button primary>Generuj zlecenie rotacji</Button>
          </ButtonGroup>
        </FilterContainer>
        
        <Table 
          headers={columns.map(col => col.label)}
          data={rotationSchedules.data.map(schedule => columns.map(col => {
            const value = schedule[col.id];
            return col.format && typeof col.format === 'function' ? col.format(value) : value;
          }))}
          onRowClick={(rowIndex) => handleRotationSelect(rotationSchedules.data[rowIndex])}
        />
        
        {selectedRotation && (
          <DetailContainer>
            <DetailTitle>Szczegóły harmonogramu rotacji dla pojazdu {selectedRotation.vehicleName}</DetailTitle>
            
            <DetailRow>
              <DetailLabel>ID:</DetailLabel>
              <DetailValue>{selectedRotation.id}</DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>Pojazd:</DetailLabel>
              <DetailValue>{selectedRotation.vehicleName} ({selectedRotation.vehicleId})</DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>Ostatnia rotacja:</DetailLabel>
              <DetailValue>{selectedRotation.lastRotationDate}</DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>Następna rotacja:</DetailLabel>
              <DetailValue>{selectedRotation.nextRotationDate}</DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>Status:</DetailLabel>
              <DetailValue>
                <Badge status={selectedRotation.status}>
                  {selectedRotation.status === 'scheduled' && 'Zaplanowana'}
                  {selectedRotation.status === 'overdue' && 'Zaległa'}
                  {selectedRotation.status === 'completed' && 'Wykonana'}
                </Badge>
              </DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>Przebieg od rotacji:</DetailLabel>
              <DetailValue>{selectedRotation.mileageSinceRotation} km</DetailValue>
            </DetailRow>
            
            <DetailTitle style={{ marginTop: '20px' }}>Historia rotacji</DetailTitle>
            
            {selectedRotation.history && selectedRotation.history.length > 0 ? (
              selectedRotation.history.map((item, index) => (
                <div key={index} style={{ marginBottom: '12px', padding: '8px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
                  <div><strong>Data:</strong> {item.date}</div>
                  <div><strong>Wykonawca:</strong> {item.technician}</div>
                  <div><strong>Schemat rotacji:</strong> {item.pattern}</div>
                  <div><strong>Notatki:</strong> {item.notes}</div>
                </div>
              ))
            ) : (
              <div>Brak historii rotacji</div>
            )}
            
            <div style={{ marginTop: '16px' }}>
              <Button onClick={() => setSelectedRotation(null)}>Zamknij</Button>
              <Button primary style={{ marginLeft: '8px' }}>Generuj zlecenie rotacji</Button>
            </div>
          </DetailContainer>
        )}
      </>
    );
  };
  
  // Render seasonal tab content
  const renderSeasonalTab = () => {
    if (isLoading) {
      return <LoadingIndicator>Ładowanie danych wymiany sezonowej...</LoadingIndicator>;
    }
    
    if (error) {
      return <ErrorMessage>{error}</ErrorMessage>;
    }
    
    if (!seasonalChanges || !seasonalChanges.data || seasonalChanges.data.length === 0) {
      return <div>Brak danych wymiany sezonowej do wyświetlenia.</div>;
    }
    
    const columns = [
      { id: 'id', label: 'ID' },
      { id: 'vehicleId', label: 'ID Pojazdu' },
      { id: 'vehicleName', label: 'Nazwa Pojazdu' },
      { 
        id: 'currentSetType', 
        label: 'Aktualny zestaw',
        format: (value) => {
          switch(value) {
            case 'summer': return 'Letnie';
            case 'winter': return 'Zimowe';
            case 'all_season': return 'Całoroczne';
            default: return value;
          }
        }
      },
      { id: 'lastChangeDate', label: 'Ostatnia wymiana' },
      { id: 'nextChangeDate', label: 'Następna wymiana' },
      { 
        id: 'status', 
        label: 'Status',
        format: (value) => {
          let label = '';
          let status = '';
          
          switch(value) {
            case 'scheduled':
              label = 'Zaplanowana';
              status = 'scheduled';
              break;
            case 'overdue':
              label = 'Zaległa';
              status = 'critical';
              break;
            case 'completed':
              label = 'Wykonana';
              status = 'good';
              break;
            default:
              label = value;
              status = 'default';
          }
          
          return <Badge status={status}>{label}</Badge>;
        }
      },
      { id: 'storageLocation', label: 'Miejsce przechowywania' }
    ];
    
    return (
      <>
        <FilterContainer>
          <FilterGroup>
            <FilterLabel htmlFor="vehicle">Pojazd</FilterLabel>
            <FilterSelect 
              id="vehicle" 
              name="vehicle" 
              value={filters.vehicle} 
              onChange={handleFilterChange}
            >
              <option value="all">Wszystkie</option>
              <option value="V001">V001 - Mercedes Actros</option>
              <option value="V002">V002 - Volvo FH</option>
              <option value="V003">V003 - Scania R</option>
              <option value="V004">V004 - MAN TGX</option>
              <option value="V005">V005 - DAF XF</option>
            </FilterSelect>
          </FilterGroup>
          
          <ButtonGroup>
            <Button onClick={handleExportCSV}>Eksport CSV</Button>
            <Button onClick={handleExportPDF}>Eksport PDF</Button>
            <Button primary>Generuj zlecenie wymiany</Button>
          </ButtonGroup>
        </FilterContainer>
        
        <Table 
          headers={columns.map(col => col.label)}
          data={seasonalChanges.data.map(change => columns.map(col => {
            const value = change[col.id];
            return col.format && typeof col.format === 'function' ? col.format(value) : value;
          }))}
          onRowClick={(rowIndex) => handleSeasonalSelect(seasonalChanges.data[rowIndex])}
        />
        
        {selectedChange && (
          <DetailContainer>
            <DetailTitle>Szczegóły wymiany sezonowej dla pojazdu {selectedChange.vehicleName}</DetailTitle>
            
            <DetailRow>
              <DetailLabel>ID:</DetailLabel>
              <DetailValue>{selectedChange.id}</DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>Pojazd:</DetailLabel>
              <DetailValue>{selectedChange.vehicleName} ({selectedChange.vehicleId})</DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>Aktualny zestaw:</DetailLabel>
              <DetailValue>
                {selectedChange.currentSetType === 'summer' && 'Letnie'}
                {selectedChange.currentSetType === 'winter' && 'Zimowe'}
                {selectedChange.currentSetType === 'all_season' && 'Całoroczne'}
              </DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>Ostatnia wymiana:</DetailLabel>
              <DetailValue>{selectedChange.lastChangeDate}</DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>Następna wymiana:</DetailLabel>
              <DetailValue>{selectedChange.nextChangeDate}</DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>Status:</DetailLabel>
              <DetailValue>
                <Badge status={selectedChange.status}>
                  {selectedChange.status === 'scheduled' && 'Zaplanowana'}
                  {selectedChange.status === 'overdue' && 'Zaległa'}
                  {selectedChange.status === 'completed' && 'Wykonana'}
                </Badge>
              </DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>Miejsce przechowywania:</DetailLabel>
              <DetailValue>{selectedChange.storageLocation}</DetailValue>
            </DetailRow>
            
            <DetailTitle style={{ marginTop: '20px' }}>Historia wymian</DetailTitle>
            
            {selectedChange.history && selectedChange.history.length > 0 ? (
              selectedChange.history.map((item, index) => (
                <div key={index} style={{ marginBottom: '12px', padding: '8px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
                  <div><strong>Data:</strong> {item.date}</div>
                  <div><strong>Typ wymiany:</strong> {item.changeType === 'summer_to_winter' ? 'Letnie na zimowe' : 'Zimowe na letnie'}</div>
                  <div><strong>Wykonawca:</strong> {item.technician}</div>
                  <div><strong>Notatki:</strong> {item.notes}</div>
                </div>
              ))
            ) : (
              <div>Brak historii wymian</div>
            )}
            
            <div style={{ marginTop: '16px' }}>
              <Button onClick={() => setSelectedChange(null)}>Zamknij</Button>
              <Button primary style={{ marginLeft: '8px' }}>Generuj zlecenie wymiany</Button>
            </div>
          </DetailContainer>
        )}
      </>
    );
  };
  
  // Render analytics tab content
  const renderAnalyticsTab = () => {
    if (isLoading) {
      return <LoadingIndicator>Ładowanie danych analityki opon...</LoadingIndicator>;
    }
    
    if (error) {
      return <ErrorMessage>{error}</ErrorMessage>;
    }
    
    if (!analytics) {
      return <div>Brak danych analityki opon do wyświetlenia.</div>;
    }
    
    return (
      <>
        <ButtonGroup style={{ marginBottom: '20px' }}>
          <Button onClick={handleExportCSV}>Eksport CSV</Button>
          <Button onClick={handleExportPDF}>Eksport PDF</Button>
        </ButtonGroup>
        
        <GridSection>
          <Card title="Średnia żywotność opon według marki">
            <ChartContainer>
              {/* Placeholder for chart */}
              <div style={{ textAlign: 'center', paddingTop: '120px' }}>
                Wykres średniej żywotności opon według marki
              </div>
            </ChartContainer>
          </Card>
          
          <Card title="Koszty związane z oponami">
            <ChartContainer>
              {/* Placeholder for chart */}
              <div style={{ textAlign: 'center', paddingTop: '120px' }}>
                Wykres kosztów związanych z oponami
              </div>
            </ChartContainer>
          </Card>
        </GridSection>
        
        <GridSection>
          <Card title="Wpływ opon na zużycie paliwa">
            <ChartContainer>
              {/* Placeholder for chart */}
              <div style={{ textAlign: 'center', paddingTop: '120px' }}>
                Wykres wpływu opon na zużycie paliwa
              </div>
            </ChartContainer>
          </Card>
          
          <Card title="Rekomendacje opon">
            <div style={{ padding: '16px' }}>
              <h3 style={{ fontSize: '16px', marginBottom: '12px' }}>Top 5 rekomendowanych opon</h3>
              
              {analytics.recommendations && analytics.recommendations.length > 0 ? (
                <div>
                  {analytics.recommendations.map((item, index) => (
                    <div key={index} style={{ marginBottom: '12px', padding: '8px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
                      <div><strong>{item.brand} {item.model}</strong> - {item.size}</div>
                      <div>Ocena: {item.rating}/5</div>
                      <div>Średnia żywotność: {item.averageLifespan} km</div>
                      <div>Wpływ na zużycie paliwa: {item.fuelEfficiencyImpact}%</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div>Brak rekomendacji</div>
              )}
            </div>
          </Card>
        </GridSection>
      </>
    );
  };
  
  return (
    <PageContainer>
      <SectionTitle>Zarządzanie oponami</SectionTitle>
      
      <DataSourceToggle>
        <ToggleLabel>Użyj API</ToggleLabel>
        <ToggleSwitch>
          <input 
            type="checkbox" 
            checked={useMockData} 
            onChange={handleToggleDataSource}
          />
          <span />
        </ToggleSwitch>
        <ToggleLabel>Użyj danych testowych</ToggleLabel>
      </DataSourceToggle>
      
      <TabsContainer>
        <Tab 
          active={activeTab === 'inventory'} 
          onClick={() => setActiveTab('inventory')}
        >
          Inwentarz opon
        </Tab>
        <Tab 
          active={activeTab === 'condition'} 
          onClick={() => setActiveTab('condition')}
        >
          Monitorowanie stanu
        </Tab>
        <Tab 
          active={activeTab === 'rotation'} 
          onClick={() => setActiveTab('rotation')}
        >
          Harmonogram rotacji
        </Tab>
        <Tab 
          active={activeTab === 'seasonal'} 
          onClick={() => setActiveTab('seasonal')}
        >
          Wymiana sezonowa
        </Tab>
        <Tab 
          active={activeTab === 'analytics'} 
          onClick={() => setActiveTab('analytics')}
        >
          Analityka
        </Tab>
      </TabsContainer>
      
      {activeTab === 'inventory' && renderInventoryTab()}
      {activeTab === 'condition' && renderConditionTab()}
      {activeTab === 'rotation' && renderRotationTab()}
      {activeTab === 'seasonal' && renderSeasonalTab()}
      {activeTab === 'analytics' && renderAnalyticsTab()}
    </PageContainer>
  );
};

export default VehicleTires;
