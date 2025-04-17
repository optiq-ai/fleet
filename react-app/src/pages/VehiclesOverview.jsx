import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Card from '../components/common/Card';
import KPICard from '../components/common/KPICard';
import Table from '../components/common/Table';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Pie, Line, Bar } from 'react-chartjs-2';
import vehiclesService from '../services/api/vehiclesService';
import mockVehiclesService from '../services/api/mockVehiclesService';
import mockVehiclesMapService from '../services/api/mockVehiclesMapService';
import mockVehiclesChartsService from '../services/api/mockVehiclesChartsService';
import SuspiciousTransactionsMap from '../components/fraud/SuspiciousTransactionsMap';

// Register ChartJS components
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

/**
 * Vehicles Overview component
 * Provides a comprehensive view of the entire vehicle fleet with key indicators and statistics
 * @returns {JSX.Element} Vehicles Overview component
 */
const VehiclesOverview = () => {
  // State for fleet data
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [kpiData, setKpiData] = useState(null);
  const [mapData, setMapData] = useState([]);
  const [fleetStats, setFleetStats] = useState(null);
  
  // State for chart data
  const [fleetByBrandData, setFleetByBrandData] = useState(null);
  const [fleetByAgeData, setFleetByAgeData] = useState(null);
  const [fuelConsumptionTrendData, setFuelConsumptionTrendData] = useState(null);
  const [maintenanceCostTrendData, setMaintenanceCostTrendData] = useState(null);
  
  // State for UI
  const [activeTab, setActiveTab] = useState('details');
  const [isLoading, setIsLoading] = useState(true);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [isMapLoading, setIsMapLoading] = useState(true);
  const [error, setError] = useState(null);
  const [useMockData, setUseMockData] = useState(true);
  
  // State for filters
  const [filters, setFilters] = useState({
    status: 'all',
    search: '',
    sortBy: 'id',
    sortOrder: 'asc',
    page: 1,
    limit: 10
  });
  
  // Get service based on mock data toggle
  const service = useMockData ? mockVehiclesService : vehiclesService;
  
  // Fetch fleet data
  const fetchFleetData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Fetch vehicles list
      const vehiclesResponse = await service.getVehicles(
        filters.status !== 'all' ? filters.status : undefined,
        filters.search || undefined,
        filters.sortBy,
        filters.sortOrder,
        filters.page,
        filters.limit
      );
      setVehicles(vehiclesResponse);
      
      // Fetch KPI data
      const kpiResponse = await service.getFleetKPIs();
      setKpiData(kpiResponse);
      
      // Fetch map data
      setIsMapLoading(true);
      const mapResponse = await mockVehiclesMapService.getVehicleLocationsForMapComponent();
      setMapData(mapResponse);
      setIsMapLoading(false);
      
      // Fetch fleet statistics
      const statsResponse = await service.getFleetStatistics();
      setFleetStats(statsResponse);
      
      // Fetch chart data
      const fleetByBrandResponse = await mockVehiclesChartsService.getFleetStructureByBrand();
      setFleetByBrandData(fleetByBrandResponse);
      
      const fleetByAgeResponse = await mockVehiclesChartsService.getFleetStructureByAge();
      setFleetByAgeData(fleetByAgeResponse);
      
      const fuelConsumptionTrendResponse = await mockVehiclesChartsService.getFuelConsumptionTrend();
      setFuelConsumptionTrendData(fuelConsumptionTrendResponse);
      
      const maintenanceCostTrendResponse = await mockVehiclesChartsService.getMaintenanceCostTrend();
      setMaintenanceCostTrendData(maintenanceCostTrendResponse);
    } catch (err) {
      console.error('Error fetching fleet data:', err);
      setError('Nie udało się pobrać danych floty. Spróbuj odświeżyć stronę.');
    } finally {
      setIsLoading(false);
    }
  }, [service, filters.status, filters.search, filters.sortBy, filters.sortOrder, filters.page, filters.limit]);
  
  // Fetch vehicle details
  const fetchVehicleDetails = useCallback(async (vehicleId) => {
    if (!vehicleId) return;
    
    setIsDetailLoading(true);
    
    try {
      const vehicleDetails = await service.getVehicleDetails(vehicleId);
      setSelectedVehicle(vehicleDetails);
    } catch (err) {
      console.error('Error fetching vehicle details:', err);
      setError('Nie udało się pobrać szczegółów pojazdu.');
    } finally {
      setIsDetailLoading(false);
    }
  }, [service]);
  
  // Initial data fetch
  useEffect(() => {
    fetchFleetData();
  }, [fetchFleetData]);
  
  // Fetch details when vehicle is selected
  useEffect(() => {
    if (selectedVehicle && selectedVehicle.id) {
      fetchVehicleDetails(selectedVehicle.id);
    }
  }, [selectedVehicle, selectedVehicle?.id, fetchVehicleDetails]);
  
  // Handle filter change
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
  
  // eslint-disable-next-line no-unused-vars
  // Handle sort - used in table column headers for future implementation
  const handleSort = (column) => {
    setFilters({
      ...filters,
      sortBy: column,
      sortOrder: filters.sortBy === column && filters.sortOrder === 'asc' ? 'desc' : 'asc'
    });
  };
  
  // Handle page change
  const handlePageChange = (newPage) => {
    setFilters({
      ...filters,
      page: newPage
    });
  };
  
  // Handle vehicle selection
  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
  };
  
  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  // Handle data source toggle
  const handleToggleDataSource = () => {
    setUseMockData(!useMockData);
  };
  
  // Handle marker click on the map
  const handleMarkerClick = (vehicle) => {
    console.log('Clicked vehicle on map:', vehicle);
    if (vehicle && vehicle.id) {
      handleVehicleSelect({ id: vehicle.id });
    }
  };
  
  // Handle export to CSV
  const handleExportCSV = () => {
    // Implementation for CSV export
    const csvContent = "data:text/csv;charset=utf-8," 
      + "ID,Marka,Model,Rok,Przebieg,Status,Stan techniczny,Kierowca,Ostatni przegląd,Następny przegląd\n"
      + vehicles.data.map(v => 
          `${v.id},${v.make},${v.model},${v.year},${v.mileage},${v.status},${v.healthPercentage}%,${v.driver},${v.lastMaintenance},${v.nextMaintenance}`
        ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "vehicles_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // Handle export to PDF
  const handleExportPDF = () => {
    // Implementation for PDF export
    alert('Eksport do PDF zostanie zaimplementowany w przyszłej wersji.');
  };
  
  // Render KPI cards
  const renderKPICards = () => {
    if (!kpiData) return null;
    
    return (
      <KPIContainer>
        <KPICard 
          title="Pojazdy aktywne" 
          value={kpiData.activeVehicles} 
          total={kpiData.totalVehicles}
          unit="szt."
          trend={kpiData.activeVehiclesTrend}
          trendLabel={`${kpiData.activeVehiclesTrend > 0 ? '+' : ''}${kpiData.activeVehiclesTrend}% vs poprzedni miesiąc`}
          color="#4caf50"
        />
        <KPICard 
          title="Pojazdy w serwisie" 
          value={kpiData.inServiceVehicles} 
          total={kpiData.totalVehicles}
          unit="szt."
          trend={kpiData.inServiceVehiclesTrend}
          trendLabel={`${kpiData.inServiceVehiclesTrend > 0 ? '+' : ''}${kpiData.inServiceVehiclesTrend}% vs poprzedni miesiąc`}
          color="#ff9800"
        />
        <KPICard 
          title="Średni wiek floty" 
          value={kpiData.averageAge} 
          unit="lat"
          trend={kpiData.averageAgeTrend}
          trendLabel={`${kpiData.averageAgeTrend > 0 ? '+' : ''}${kpiData.averageAgeTrend}% vs poprzedni rok`}
          color="#2196f3"
        />
        <KPICard 
          title="Średni przebieg" 
          value={kpiData.averageMileage} 
          unit="km"
          trend={kpiData.averageMileageTrend}
          trendLabel={`${kpiData.averageMileageTrend > 0 ? '+' : ''}${kpiData.averageMileageTrend}% vs poprzedni rok`}
          color="#9c27b0"
        />
        <KPICard 
          title="Wykorzystanie pojazdów" 
          value={kpiData.utilizationRate} 
          unit="%"
          trend={kpiData.utilizationRateTrend}
          trendLabel={`${kpiData.utilizationRateTrend > 0 ? '+' : ''}${kpiData.utilizationRateTrend}% vs poprzedni miesiąc`}
          color="#3f51b5"
        />
        <KPICard 
          title="Zgodność z harmonogramem" 
          value={kpiData.maintenanceComplianceRate} 
          unit="%"
          trend={kpiData.maintenanceComplianceRateTrend}
          trendLabel={`${kpiData.maintenanceComplianceRateTrend > 0 ? '+' : ''}${kpiData.maintenanceComplianceRateTrend}% vs poprzedni miesiąc`}
          color="#009688"
        />
      </KPIContainer>
    );
  };
  
  // Render fleet map
  const renderFleetMap = () => {
    if (!mapData || mapData.length === 0) return null;
    
    return (
      <Card title="Mapa floty">
        <MapContainer>
          {isMapLoading ? (
            <MapPlaceholder>Ładowanie mapy floty...</MapPlaceholder>
          ) : (
            <SuspiciousTransactionsMap 
              transactions={mapData}
              onMarkerClick={handleMarkerClick}
            />
          )}
        </MapContainer>
      </Card>
    );
  };
  
  // Render fleet structure by brand chart
  const renderFleetStructureByBrandChart = () => {
    if (!fleetByBrandData) return null;
    
    const chartData = {
      labels: fleetByBrandData.map(item => item.name),
      datasets: [
        {
          data: fleetByBrandData.map(item => item.value),
          backgroundColor: fleetByBrandData.map(item => item.color),
          borderColor: fleetByBrandData.map(item => item.color),
          borderWidth: 1,
        },
      ],
    };
    
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            boxWidth: 15,
            padding: 15
          }
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const label = context.label || '';
              const value = context.raw || 0;
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = Math.round((value / total) * 100);
              return `${label}: ${value} (${percentage}%)`;
            }
          }
        }
      }
    };
    
    return (
      <Card title="Struktura floty według marek">
        <ChartContainer>
          <Pie data={chartData} options={chartOptions} />
        </ChartContainer>
      </Card>
    );
  };
  
  // Render fleet structure by age chart
  const renderFleetStructureByAgeChart = () => {
    if (!fleetByAgeData) return null;
    
    const chartData = {
      labels: fleetByAgeData.map(item => item.name),
      datasets: [
        {
          data: fleetByAgeData.map(item => item.value),
          backgroundColor: fleetByAgeData.map(item => item.color),
          borderColor: fleetByAgeData.map(item => item.color),
          borderWidth: 1,
        },
      ],
    };
    
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            boxWidth: 15,
            padding: 15
          }
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const label = context.label || '';
              const value = context.raw || 0;
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = Math.round((value / total) * 100);
              return `${label}: ${value} (${percentage}%)`;
            }
          }
        }
      }
    };
    
    return (
      <Card title="Struktura wiekowa pojazdów">
        <ChartContainer>
          <Pie data={chartData} options={chartOptions} />
        </ChartContainer>
      </Card>
    );
  };
  
  // Render fuel consumption trends chart
  const renderFuelConsumptionTrendsChart = () => {
    if (!fuelConsumptionTrendData) return null;
    
    const chartData = {
      labels: fuelConsumptionTrendData.map(item => item.month),
      datasets: [
        {
          label: 'Zużycie paliwa (l/100km)',
          data: fuelConsumptionTrendData.map(item => item.value),
          borderColor: '#2196f3',
          backgroundColor: 'rgba(33, 150, 243, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4
        }
      ]
    };
    
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const label = context.dataset.label || '';
              const value = context.raw || 0;
              return `${label}: ${value} l/100km`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: false,
          grid: {
            color: 'rgba(0, 0, 0, 0.05)'
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      }
    };
    
    return (
      <Card title="Trendy zużycia paliwa">
        <ChartContainer>
          <Line data={chartData} options={chartOptions} />
        </ChartContainer>
      </Card>
    );
  };
  
  // Render maintenance cost trends chart
  const renderMaintenanceCostTrendsChart = () => {
    if (!maintenanceCostTrendData) return null;
    
    const chartData = {
      labels: maintenanceCostTrendData.map(item => item.month),
      datasets: [
        {
          label: 'Koszty utrzymania (PLN)',
          data: maintenanceCostTrendData.map(item => item.value),
          backgroundColor: '#ff9800',
          borderColor: '#ff9800',
          borderWidth: 1,
          borderRadius: 4
        }
      ]
    };
    
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const label = context.dataset.label || '';
              const value = context.raw || 0;
              return `${label}: ${value.toLocaleString()} PLN`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: false,
          grid: {
            color: 'rgba(0, 0, 0, 0.05)'
          },
          ticks: {
            callback: (value) => value.toLocaleString() + ' PLN'
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      }
    };
    
    return (
      <Card title="Trendy kosztów utrzymania">
        <ChartContainer>
          <Bar data={chartData} options={chartOptions} />
        </ChartContainer>
      </Card>
    );
  };
  
  // Render vehicles table
  const renderVehiclesTable = () => {
    if (!vehicles || !vehicles.data) {
      // Return empty table with columns when no data is available
      const columns = [
        { key: 'id', label: 'ID pojazdu' },
        { key: 'make', label: 'Marka' },
        { key: 'model', label: 'Model' },
        { key: 'year', label: 'Rok produkcji' },
        { key: 'mileage', label: 'Przebieg (km)' },
        { key: 'status', label: 'Status' },
        { key: 'healthPercentage', label: 'Stan techniczny' },
        { key: 'driver', label: 'Kierowca' },
        { key: 'lastMaintenance', label: 'Ostatni przegląd' },
        { key: 'nextMaintenance', label: 'Następny przegląd' }
      ];
      
      return (
        <Card title="Lista pojazdów">
          <Table 
            columns={columns}
            data={[]}
            isLoading={isLoading}
            emptyMessage="Brak pojazdów spełniających kryteria"
          />
        </Card>
      );
    }
    
    const columns = [
      { key: 'id', label: 'ID pojazdu' },
      { key: 'make', label: 'Marka' },
      { key: 'model', label: 'Model' },
      { key: 'year', label: 'Rok produkcji' },
      { key: 'mileage', label: 'Przebieg (km)' },
      { key: 'status', label: 'Status' },
      { key: 'healthPercentage', label: 'Stan techniczny' },
      { key: 'driver', label: 'Kierowca' },
      { key: 'lastMaintenance', label: 'Ostatni przegląd' },
      { key: 'nextMaintenance', label: 'Następny przegląd' }
    ];
    
    // Format data for table
    const formattedData = vehicles.data.map(vehicle => ({
      ...vehicle,
      status: getStatusBadge(vehicle.status),
      healthPercentage: getHealthBadge(vehicle.healthPercentage)
    }));
    
    return (
      <Card 
        title="Lista pojazdów" 
        actions={
          <ActionsContainer>
            <Button onClick={handleExportCSV}>Eksport CSV</Button>
            <Button onClick={handleExportPDF}>Eksport PDF</Button>
          </ActionsContainer>
        }
      >
        <FilterContainer>
          <FilterGroup>
            <FilterLabel htmlFor="status">Status</FilterLabel>
            <FilterSelect 
              id="status" 
              name="status" 
              value={filters.status} 
              onChange={handleFilterChange}
            >
              <option value="all">Wszystkie</option>
              <option value="active">Aktywne</option>
              <option value="inService">W serwisie</option>
              <option value="inactive">Nieaktywne</option>
            </FilterSelect>
          </FilterGroup>
          
          <FilterGroup>
            <FilterLabel htmlFor="search">Wyszukaj</FilterLabel>
            <SearchContainer>
              <FilterInput 
                type="text" 
                id="search" 
                name="search" 
                value={filters.search} 
                onChange={handleFilterChange}
                placeholder="ID, marka, model..."
              />
              <SearchButton onClick={handleSearch}>
                <span>🔍</span>
              </SearchButton>
            </SearchContainer>
          </FilterGroup>
        </FilterContainer>
        
        <Table 
          columns={columns}
          data={formattedData}
          onRowClick={handleVehicleSelect}
          isLoading={isLoading}
          emptyMessage="Brak pojazdów spełniających kryteria"
        />
        
        <PaginationContainer>
          <PaginationInfo>
            Pokazuje {vehicles.data.length} z {vehicles.total} pojazdów
          </PaginationInfo>
          <PaginationButtons>
            <Button 
              onClick={() => handlePageChange(filters.page - 1)} 
              disabled={filters.page === 1}
            >
              Poprzednia
            </Button>
            <PageInfo>{filters.page} z {Math.ceil(vehicles.total / filters.limit)}</PageInfo>
            <Button 
              onClick={() => handlePageChange(filters.page + 1)} 
              disabled={filters.page >= Math.ceil(vehicles.total / filters.limit)}
            >
              Następna
            </Button>
          </PaginationButtons>
        </PaginationContainer>
      </Card>
    );
  };
  
  // Render vehicle details
  const renderVehicleDetails = () => {
    if (!selectedVehicle) return null;
    
    return (
      <Card 
        title={`Szczegóły pojazdu: ${selectedVehicle.make} ${selectedVehicle.model} (${selectedVehicle.id})`}
        actions={
          <Button onClick={() => setSelectedVehicle(null)}>Zamknij</Button>
        }
      >
        {isDetailLoading ? (
          <LoadingIndicator>Ładowanie szczegółów pojazdu...</LoadingIndicator>
        ) : (
          <>
            <TabsContainer>
              <Tab 
                active={activeTab === 'details'} 
                onClick={() => handleTabChange('details')}
              >
                Dane techniczne
              </Tab>
              <Tab 
                active={activeTab === 'maintenance'} 
                onClick={() => handleTabChange('maintenance')}
              >
                Historia przeglądów
              </Tab>
              <Tab 
                active={activeTab === 'drivers'} 
                onClick={() => handleTabChange('drivers')}
              >
                Historia kierowców
              </Tab>
              <Tab 
                active={activeTab === 'fuel'} 
                onClick={() => handleTabChange('fuel')}
              >
                Zużycie paliwa
              </Tab>
              <Tab 
                active={activeTab === 'mileage'} 
                onClick={() => handleTabChange('mileage')}
              >
                Przebieg
              </Tab>
              <Tab 
                active={activeTab === 'documents'} 
                onClick={() => handleTabChange('documents')}
              >
                Dokumenty
              </Tab>
            </TabsContainer>
            
            {activeTab === 'details' && (
              <DetailContainer>
                <DetailSection>
                  <DetailTitle>Dane podstawowe</DetailTitle>
                  <DetailGrid>
                    <DetailItem>
                      <DetailLabel>Marka:</DetailLabel>
                      <DetailValue>{selectedVehicle.make}</DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>Model:</DetailLabel>
                      <DetailValue>{selectedVehicle.model}</DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>Rok produkcji:</DetailLabel>
                      <DetailValue>{selectedVehicle.year}</DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>VIN:</DetailLabel>
                      <DetailValue>{selectedVehicle.vin}</DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>Nr rejestracyjny:</DetailLabel>
                      <DetailValue>{selectedVehicle.registrationNumber}</DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>Data rejestracji:</DetailLabel>
                      <DetailValue>{selectedVehicle.registrationDate}</DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>Przebieg:</DetailLabel>
                      <DetailValue>{selectedVehicle.mileage.toLocaleString()} km</DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>Status:</DetailLabel>
                      <DetailValue>{selectedVehicle.status}</DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>Kierowca:</DetailLabel>
                      <DetailValue>{selectedVehicle.driver}</DetailValue>
                    </DetailItem>
                  </DetailGrid>
                </DetailSection>
                
                <DetailSection>
                  <DetailTitle>Dane techniczne</DetailTitle>
                  <DetailGrid>
                    <DetailItem>
                      <DetailLabel>Typ nadwozia:</DetailLabel>
                      <DetailValue>{selectedVehicle.bodyType}</DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>Rodzaj paliwa:</DetailLabel>
                      <DetailValue>{selectedVehicle.fuelType}</DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>Pojemność silnika:</DetailLabel>
                      <DetailValue>{selectedVehicle.engineCapacity} cm³</DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>Moc silnika:</DetailLabel>
                      <DetailValue>{selectedVehicle.enginePower} KM</DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>Skrzynia biegów:</DetailLabel>
                      <DetailValue>{selectedVehicle.transmission}</DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>Napęd:</DetailLabel>
                      <DetailValue>{selectedVehicle.driveType}</DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>Masa własna:</DetailLabel>
                      <DetailValue>{selectedVehicle.weight} kg</DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>Ładowność:</DetailLabel>
                      <DetailValue>{selectedVehicle.loadCapacity} kg</DetailValue>
                    </DetailItem>
                  </DetailGrid>
                </DetailSection>
                
                <DetailSection>
                  <DetailTitle>Stan techniczny</DetailTitle>
                  <ComponentsContainer>
                    {selectedVehicle.components.map((component, index) => (
                      <ComponentItem key={index}>
                        <ComponentName>{component.name}</ComponentName>
                        <ComponentBar>
                          <ComponentBarFill 
                            percentage={component.health}
                            status={getComponentStatus(component.health)}
                          />
                        </ComponentBar>
                        <ComponentValue>{component.health}%</ComponentValue>
                      </ComponentItem>
                    ))}
                  </ComponentsContainer>
                </DetailSection>
              </DetailContainer>
            )}
            
            {activeTab === 'maintenance' && (
              <DetailContainer>
                <Table 
                  columns={[
                    { key: 'date', label: 'Data' },
                    { key: 'type', label: 'Typ' },
                    { key: 'description', label: 'Opis' },
                    { key: 'cost', label: 'Koszt' },
                    { key: 'mileage', label: 'Przebieg' },
                    { key: 'provider', label: 'Serwis' }
                  ]}
                  data={selectedVehicle.maintenanceHistory.map(item => ({
                    ...item,
                    cost: `${item.cost.toLocaleString()} PLN`,
                    mileage: `${item.mileage.toLocaleString()} km`
                  }))}
                  emptyMessage="Brak historii przeglądów"
                />
              </DetailContainer>
            )}
            
            {activeTab === 'drivers' && (
              <DetailContainer>
                <Table 
                  columns={[
                    { key: 'name', label: 'Kierowca' },
                    { key: 'startDate', label: 'Data rozpoczęcia' },
                    { key: 'endDate', label: 'Data zakończenia' },
                    { key: 'mileageDriven', label: 'Przejechane km' },
                    { key: 'incidents', label: 'Incydenty' }
                  ]}
                  data={selectedVehicle.driverHistory.map(item => ({
                    ...item,
                    endDate: item.endDate || 'Aktualny',
                    mileageDriven: `${item.mileageDriven.toLocaleString()} km`
                  }))}
                  emptyMessage="Brak historii kierowców"
                />
              </DetailContainer>
            )}
            
            {activeTab === 'fuel' && (
              <DetailContainer>
                <DetailSection>
                  <DetailTitle>Podsumowanie zużycia paliwa</DetailTitle>
                  <DetailGrid>
                    <DetailItem>
                      <DetailLabel>Średnie zużycie:</DetailLabel>
                      <DetailValue>{selectedVehicle.averageFuelConsumption} l/100km</DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>Całkowite zużycie:</DetailLabel>
                      <DetailValue>{selectedVehicle.totalFuelConsumption.toLocaleString()} l</DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>Całkowity koszt:</DetailLabel>
                      <DetailValue>{selectedVehicle.totalFuelCost.toLocaleString()} PLN</DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>Emisja CO2:</DetailLabel>
                      <DetailValue>{selectedVehicle.co2Emission.toLocaleString()} g</DetailValue>
                    </DetailItem>
                  </DetailGrid>
                </DetailSection>
                
                <DetailSection>
                  <DetailTitle>Historia zużycia paliwa</DetailTitle>
                  <Table 
                    columns={[
                      { key: 'month', label: 'Miesiąc' },
                      { key: 'consumption', label: 'Zużycie (l/100km)' },
                      { key: 'distance', label: 'Dystans (km)' },
                      { key: 'cost', label: 'Koszt (PLN)' }
                    ]}
                    data={selectedVehicle.fuelConsumption.map(item => ({
                      ...item,
                      distance: item.distance.toLocaleString(),
                      cost: item.cost.toLocaleString()
                    }))}
                    emptyMessage="Brak danych o zużyciu paliwa"
                  />
                </DetailSection>
              </DetailContainer>
            )}
            
            {activeTab === 'mileage' && (
              <DetailContainer>
                <DetailSection>
                  <DetailTitle>Podsumowanie przebiegu</DetailTitle>
                  <DetailGrid>
                    <DetailItem>
                      <DetailLabel>Aktualny przebieg:</DetailLabel>
                      <DetailValue>{selectedVehicle.mileage.toLocaleString()} km</DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>Średni miesięczny przebieg:</DetailLabel>
                      <DetailValue>{selectedVehicle.averageMonthlyMileage.toLocaleString()} km</DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>Prognozowany roczny przebieg:</DetailLabel>
                      <DetailValue>{selectedVehicle.projectedAnnualMileage.toLocaleString()} km</DetailValue>
                    </DetailItem>
                  </DetailGrid>
                </DetailSection>
                
                <DetailSection>
                  <DetailTitle>Historia przebiegu</DetailTitle>
                  <Table 
                    columns={[
                      { key: 'month', label: 'Miesiąc' },
                      { key: 'mileage', label: 'Przebieg (km)' },
                      { key: 'monthlyMileage', label: 'Miesięczny przebieg (km)' }
                    ]}
                    data={selectedVehicle.mileageHistory.map(item => ({
                      ...item,
                      mileage: item.mileage.toLocaleString(),
                      monthlyMileage: item.monthlyMileage.toLocaleString()
                    }))}
                    emptyMessage="Brak historii przebiegu"
                  />
                </DetailSection>
              </DetailContainer>
            )}
            
            {activeTab === 'documents' && (
              <DetailContainer>
                <Table 
                  columns={[
                    { key: 'title', label: 'Nazwa dokumentu' },
                    { key: 'type', label: 'Typ' },
                    { key: 'addedDate', label: 'Data dodania' },
                    { key: 'expiryDate', label: 'Data ważności' },
                    { key: 'actions', label: 'Akcje' }
                  ]}
                  data={selectedVehicle.documents.map(doc => ({
                    ...doc,
                    actions: <Button small>Pobierz</Button>
                  }))}
                  emptyMessage="Brak dokumentów"
                />
              </DetailContainer>
            )}
          </>
        )}
      </Card>
    );
  };
  
  // Helper function to get status badge
  const getStatusBadge = (status) => {
    let color;
    let label;
    
    switch (status) {
      case 'active':
        color = '#4caf50';
        label = 'Aktywny';
        break;
      case 'inService':
        color = '#ff9800';
        label = 'W serwisie';
        break;
      case 'inactive':
        color = '#f44336';
        label = 'Nieaktywny';
        break;
      default:
        color = '#9e9e9e';
        label = status;
    }
    
    return <StatusBadge color={color}>{label}</StatusBadge>;
  };
  
  // Helper function to get health badge
  const getHealthBadge = (health) => {
    let color;
    
    if (health >= 75) {
      color = '#4caf50';
    } else if (health >= 50) {
      color = '#ff9800';
    } else {
      color = '#f44336';
    }
    
    return <HealthBadge color={color}>{health}%</HealthBadge>;
  };
  
  // Helper function to get component status
  const getComponentStatus = (health) => {
    if (health >= 75) {
      return 'good';
    } else if (health >= 50) {
      return 'warning';
    } else {
      return 'critical';
    }
  };
  
  return (
    <PageContainer>
      <DataSourceToggle>
        <ToggleLabel>
          API
          <ToggleSwitch 
            checked={useMockData} 
            onClick={handleToggleDataSource}
          />
          Mock
        </ToggleLabel>
      </DataSourceToggle>
      
      {error && (
        <ErrorMessage>{error}</ErrorMessage>
      )}
      
      {isLoading ? (
        <LoadingIndicator>Ładowanie danych floty...</LoadingIndicator>
      ) : (
        <>
          {renderKPICards()}
          
          <GridContainer>
            <GridItem span={2}>
              {renderFleetMap()}
            </GridItem>
            <GridItem>
              {renderFleetStructureByBrandChart()}
            </GridItem>
            <GridItem>
              {renderFleetStructureByAgeChart()}
            </GridItem>
            <GridItem>
              {renderFuelConsumptionTrendsChart()}
            </GridItem>
            <GridItem>
              {renderMaintenanceCostTrendsChart()}
            </GridItem>
          </GridContainer>
          
          {renderVehiclesTable()}
          {renderVehicleDetails()}
        </>
      )}
    </PageContainer>
  );
};

// Styled components
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

const DataSourceToggle = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const ToggleLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
`;

const ToggleSwitch = styled.div`
  position: relative;
  width: 50px;
  height: 24px;
  background-color: ${props => props.checked ? '#3f51b5' : '#ccc'};
  border-radius: 12px;
  margin: 0 8px;
  transition: background-color 0.3s;
  
  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: ${props => props.checked ? '26px' : '2px'};
    width: 20px;
    height: 20px;
    background-color: white;
    border-radius: 50%;
    transition: left 0.3s;
  }
`;

const KPIContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
  margin-bottom: 20px;
  
  @media (max-width: 1400px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 20px;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const GridItem = styled.div`
  grid-column: span ${props => props.span || 1};
  
  @media (max-width: 1200px) {
    grid-column: span 1;
  }
`;

const MapContainer = styled.div`
  height: 400px;
  background-color: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
`;

const MapPlaceholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #666;
`;

const MapImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const MapPoint = styled.div`
  position: absolute;
  top: ${props => props.y}%;
  left: ${props => props.x}%;
  width: 12px;
  height: 12px;
  background-color: ${props => {
    switch (props.status) {
      case 'active': return '#4caf50';
      case 'inService': return '#ff9800';
      case 'inactive': return '#f44336';
      default: return '#9e9e9e';
    }
  }};
  border-radius: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  z-index: 1;
  
  &:hover {
    width: 16px;
    height: 16px;
    z-index: 2;
  }
  
  &:hover > div {
    display: block;
  }
`;

const MapTooltip = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  border-radius: 4px;
  padding: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 3;
  display: none;
  width: 150px;
  font-size: 12px;
  
  div {
    margin-bottom: 4px;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const MapLegend = styled.div`
  position: absolute;
  bottom: 16px;
  left: 16px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 4px;
  padding: 8px;
  z-index: 1;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const LegendPoint = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 8px;
  background-color: ${props => {
    switch (props.status) {
      case 'active': return '#4caf50';
      case 'inService': return '#ff9800';
      case 'inactive': return '#f44336';
      default: return '#9e9e9e';
    }
  }};
`;

const ChartContainer = styled.div`
  height: 300px;
  padding: 16px;
  position: relative;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const FilterLabel = styled.label`
  margin-right: 8px;
  font-weight: 500;
`;

const FilterSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  
  @media (max-width: 768px) {
    flex: 1;
  }
`;

const FilterInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px 0 0 4px;
  
  @media (max-width: 768px) {
    flex: 1;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SearchButton = styled.button`
  padding: 8px 12px;
  background-color: #3f51b5;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  
  &:hover {
    background-color: #303f9f;
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const Button = styled.button`
  padding: ${props => props.small ? '4px 8px' : '8px 16px'};
  background-color: ${props => props.secondary ? '#f5f5f5' : '#3f51b5'};
  color: ${props => props.secondary ? '#333' : 'white'};
  border: none;
  border-radius: 4px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.6 : 1};
  font-size: ${props => props.small ? '12px' : '14px'};
  
  &:hover {
    background-color: ${props => props.secondary ? '#e0e0e0' : '#303f9f'};
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
`;

const PaginationInfo = styled.div`
  color: #666;
`;

const PaginationButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PageInfo = styled.div`
  padding: 0 16px;
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  background-color: ${props => props.color};
  color: white;
  font-size: 12px;
  font-weight: 500;
`;

const HealthBadge = styled.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  background-color: ${props => props.color};
  color: white;
  font-size: 12px;
  font-weight: 500;
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 16px;
  overflow-x: auto;
  
  &::-webkit-scrollbar {
    height: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 2px;
  }
`;

const Tab = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  white-space: nowrap;
  color: ${props => props.active ? '#3f51b5' : '#666'};
  font-weight: ${props => props.active ? '500' : 'normal'};
  border-bottom: 2px solid ${props => props.active ? '#3f51b5' : 'transparent'};
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const DetailSection = styled.div`
  margin-bottom: 16px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const DetailTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
  margin: 0 0 16px 0;
  color: #333;
`;

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const DetailLabel = styled.div`
  color: #666;
  font-size: 14px;
`;

const DetailValue = styled.div`
  font-weight: 500;
  color: #333;
`;

const ComponentsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ComponentItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ComponentName = styled.div`
  font-size: 14px;
  color: #333;
`;

const ComponentBar = styled.div`
  height: 8px;
  background-color: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
`;

const ComponentBarFill = styled.div`
  height: 100%;
  width: ${props => props.percentage}%;
  background-color: ${props => {
    switch (props.status) {
      case 'good': return '#4caf50';
      case 'warning': return '#ff9800';
      case 'critical': return '#f44336';
      default: return '#9e9e9e';
    }
  }};
  border-radius: 4px;
`;

const ComponentValue = styled.div`
  font-size: 12px;
  color: #666;
  text-align: right;
`;

const LoadingIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #666;
`;

const ErrorMessage = styled.div`
  padding: 16px;
  background-color: #ffebee;
  color: #d32f2f;
  border-radius: 4px;
  margin-bottom: 16px;
`;

export default VehiclesOverview;
