import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Card from '../components/common/Card';
import KPICard from '../components/common/KPICard';
import Table from '../components/common/Table';
import vehiclesService from '../services/api/vehiclesService';
import mockVehiclesService from '../services/api/mockVehiclesService';

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
  
  // State for UI
  const [activeTab, setActiveTab] = useState('details');
  const [isLoading, setIsLoading] = useState(true);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
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
      const mapResponse = await service.getVehicleLocations();
      setMapData(mapResponse);
      
      // Fetch fleet statistics
      const statsResponse = await service.getFleetStatistics();
      setFleetStats(statsResponse);
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
  }, [selectedVehicle?.id, fetchVehicleDetails]);
  
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
  
  // Handle sort
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
          <MapPlaceholder>
            <MapImage src="/map-placeholder.png" alt="Mapa floty" />
            {mapData.map((vehicle, index) => (
              <MapPoint 
                key={index}
                x={vehicle.coordinates.x} 
                y={vehicle.coordinates.y}
                status={vehicle.status}
                onClick={() => handleVehicleSelect({ id: vehicle.id })}
              >
                <MapTooltip>
                  <div><strong>{vehicle.id}</strong></div>
                  <div>{vehicle.make} {vehicle.model}</div>
                  <div>Status: {vehicle.status}</div>
                </MapTooltip>
              </MapPoint>
            ))}
          </MapPlaceholder>
          <MapLegend>
            <LegendItem>
              <LegendPoint status="active" />
              <span>Aktywny</span>
            </LegendItem>
            <LegendItem>
              <LegendPoint status="inService" />
              <span>W serwisie</span>
            </LegendItem>
            <LegendItem>
              <LegendPoint status="inactive" />
              <span>Nieaktywny</span>
            </LegendItem>
          </MapLegend>
        </MapContainer>
      </Card>
    );
  };
  
  // Render vehicles table
  const renderVehiclesTable = () => {
    if (!vehicles || !vehicles.data) return null;
    
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
                      <DetailLabel>Numer rejestracyjny:</DetailLabel>
                      <DetailValue>{selectedVehicle.registrationNumber}</DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>Data rejestracji:</DetailLabel>
                      <DetailValue>{selectedVehicle.registrationDate}</DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>Przebieg:</DetailLabel>
                      <DetailValue>{selectedVehicle.mileage} km</DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>Status:</DetailLabel>
                      <DetailValue>{selectedVehicle.status}</DetailValue>
                    </DetailItem>
                  </DetailGrid>
                </DetailSection>
                
                <DetailSection>
                  <DetailTitle>Specyfikacja techniczna</DetailTitle>
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
                  <HealthContainer>
                    <HealthGauge value={selectedVehicle.healthPercentage} />
                    <HealthDetails>
                      {selectedVehicle.components && selectedVehicle.components.map((component, index) => (
                        <ComponentHealth key={index}>
                          <ComponentName>{component.name}</ComponentName>
                          <HealthBar>
                            <HealthBarFill 
                              value={component.health} 
                              color={getHealthColor(component.health)}
                            />
                          </HealthBar>
                          <HealthValue>{component.health}%</HealthValue>
                        </ComponentHealth>
                      ))}
                    </HealthDetails>
                  </HealthContainer>
                </DetailSection>
              </DetailContainer>
            )}
            
            {activeTab === 'maintenance' && (
              <DetailContainer>
                <TimelineContainer>
                  {selectedVehicle.maintenanceHistory && selectedVehicle.maintenanceHistory.map((item, index) => (
                    <TimelineItem key={index}>
                      <TimelineDot color={getMaintenanceTypeColor(item.type)} />
                      <TimelineContent>
                        <TimelineDate>{item.date}</TimelineDate>
                        <TimelineTitle>{item.type}</TimelineTitle>
                        <TimelineDescription>{item.description}</TimelineDescription>
                        <TimelineDetails>
                          <span>Koszt: {item.cost} PLN</span>
                          <span>Przebieg: {item.mileage} km</span>
                          <span>Wykonawca: {item.provider}</span>
                        </TimelineDetails>
                      </TimelineContent>
                    </TimelineItem>
                  ))}
                </TimelineContainer>
              </DetailContainer>
            )}
            
            {activeTab === 'drivers' && (
              <DetailContainer>
                <Table 
                  columns={[
                    { key: 'name', label: 'Imię i nazwisko' },
                    { key: 'startDate', label: 'Data rozpoczęcia' },
                    { key: 'endDate', label: 'Data zakończenia' },
                    { key: 'mileageDriven', label: 'Przejechane km' },
                    { key: 'incidents', label: 'Incydenty' }
                  ]}
                  data={selectedVehicle.driverHistory || []}
                  isLoading={false}
                  emptyMessage="Brak historii kierowców"
                />
              </DetailContainer>
            )}
            
            {activeTab === 'fuel' && (
              <DetailContainer>
                <ChartContainer>
                  <ChartTitle>Zużycie paliwa</ChartTitle>
                  <FuelChart data={selectedVehicle.fuelConsumption || []} />
                </ChartContainer>
                <FuelStatsContainer>
                  <FuelStatItem>
                    <FuelStatLabel>Średnie zużycie</FuelStatLabel>
                    <FuelStatValue>{selectedVehicle.averageFuelConsumption} l/100km</FuelStatValue>
                  </FuelStatItem>
                  <FuelStatItem>
                    <FuelStatLabel>Łączne zużycie</FuelStatLabel>
                    <FuelStatValue>{selectedVehicle.totalFuelConsumption} l</FuelStatValue>
                  </FuelStatItem>
                  <FuelStatItem>
                    <FuelStatLabel>Koszt paliwa</FuelStatLabel>
                    <FuelStatValue>{selectedVehicle.totalFuelCost} PLN</FuelStatValue>
                  </FuelStatItem>
                  <FuelStatItem>
                    <FuelStatLabel>Emisja CO2</FuelStatLabel>
                    <FuelStatValue>{selectedVehicle.co2Emission} kg</FuelStatValue>
                  </FuelStatItem>
                </FuelStatsContainer>
              </DetailContainer>
            )}
            
            {activeTab === 'mileage' && (
              <DetailContainer>
                <ChartContainer>
                  <ChartTitle>Przebieg w czasie</ChartTitle>
                  <MileageChart data={selectedVehicle.mileageHistory || []} />
                </ChartContainer>
                <MileageStatsContainer>
                  <MileageStatItem>
                    <MileageStatLabel>Średni miesięczny przebieg</MileageStatLabel>
                    <MileageStatValue>{selectedVehicle.averageMonthlyMileage} km</MileageStatValue>
                  </MileageStatItem>
                  <MileageStatItem>
                    <MileageStatLabel>Łączny przebieg</MileageStatLabel>
                    <MileageStatValue>{selectedVehicle.mileage} km</MileageStatValue>
                  </MileageStatItem>
                  <MileageStatItem>
                    <MileageStatLabel>Prognozowany roczny przebieg</MileageStatLabel>
                    <MileageStatValue>{selectedVehicle.projectedAnnualMileage} km</MileageStatValue>
                  </MileageStatItem>
                </MileageStatsContainer>
              </DetailContainer>
            )}
            
            {activeTab === 'documents' && (
              <DetailContainer>
                <DocumentsGrid>
                  {selectedVehicle.documents && selectedVehicle.documents.map((doc, index) => (
                    <DocumentCard key={index}>
                      <DocumentIcon type={doc.type} />
                      <DocumentInfo>
                        <DocumentTitle>{doc.title}</DocumentTitle>
                        <DocumentMeta>
                          <span>Ważny do: {doc.expiryDate}</span>
                          <span>Dodano: {doc.addedDate}</span>
                        </DocumentMeta>
                      </DocumentInfo>
                      <DocumentActions>
                        <DocumentButton>Podgląd</DocumentButton>
                        <DocumentButton>Pobierz</DocumentButton>
                      </DocumentActions>
                    </DocumentCard>
                  ))}
                </DocumentsGrid>
              </DetailContainer>
            )}
          </>
        )}
      </Card>
    );
  };
  
  // Render fleet statistics
  const renderFleetStatistics = () => {
    if (!fleetStats) return null;
    
    return (
      <StatisticsContainer>
        <Card title="Struktura floty według marek">
          <ChartContainer>
            <PieChart data={fleetStats.fleetByMake} />
          </ChartContainer>
        </Card>
        
        <Card title="Struktura wiekowa pojazdów">
          <ChartContainer>
            <BarChart data={fleetStats.fleetByAge} />
          </ChartContainer>
        </Card>
        
        <Card title="Trendy zużycia paliwa">
          <ChartContainer>
            <LineChart data={fleetStats.fuelConsumptionTrend} />
          </ChartContainer>
        </Card>
        
        <Card title="Trendy kosztów utrzymania">
          <ChartContainer>
            <LineChart data={fleetStats.maintenanceCostTrend} />
          </ChartContainer>
        </Card>
      </StatisticsContainer>
    );
  };
  
  // Helper functions for UI elements
  const getStatusBadge = (status) => {
    const colors = {
      active: '#4caf50',
      inService: '#ff9800',
      inactive: '#f44336'
    };
    
    const labels = {
      active: 'Aktywny',
      inService: 'W serwisie',
      inactive: 'Nieaktywny'
    };
    
    return (
      <Badge color={colors[status]}>
        {labels[status] || status}
      </Badge>
    );
  };
  
  const getHealthBadge = (health) => {
    let color;
    
    if (health >= 80) color = '#4caf50';
    else if (health >= 60) color = '#8bc34a';
    else if (health >= 40) color = '#ffc107';
    else if (health >= 20) color = '#ff9800';
    else color = '#f44336';
    
    return (
      <HealthBadge color={color}>
        {health}%
      </HealthBadge>
    );
  };
  
  const getHealthColor = (health) => {
    if (health >= 80) return '#4caf50';
    else if (health >= 60) return '#8bc34a';
    else if (health >= 40) return '#ffc107';
    else if (health >= 20) return '#ff9800';
    else return '#f44336';
  };
  
  const getMaintenanceTypeColor = (type) => {
    const colors = {
      'Przegląd okresowy': '#2196f3',
      'Naprawa awaryjna': '#f44336',
      'Wymiana oleju': '#4caf50',
      'Wymiana opon': '#ff9800',
      'Inne': '#9e9e9e'
    };
    
    return colors[type] || '#9e9e9e';
  };
  
  // Placeholder chart components
  const PieChart = ({ data }) => (
    <div>Wykres kołowy - dane zostaną zaimplementowane w przyszłej wersji</div>
  );
  
  const BarChart = ({ data }) => (
    <div>Wykres słupkowy - dane zostaną zaimplementowane w przyszłej wersji</div>
  );
  
  const LineChart = ({ data }) => (
    <div>Wykres liniowy - dane zostaną zaimplementowane w przyszłej wersji</div>
  );
  
  const FuelChart = ({ data }) => (
    <div>Wykres zużycia paliwa - dane zostaną zaimplementowane w przyszłej wersji</div>
  );
  
  const MileageChart = ({ data }) => (
    <div>Wykres przebiegu - dane zostaną zaimplementowane w przyszłej wersji</div>
  );
  
  const HealthGauge = ({ value }) => (
    <GaugeContainer>
      <GaugeBackground />
      <GaugeMask value={value} />
      <GaugeCenter>
        <GaugeValue>{value}%</GaugeValue>
        <GaugeLabel>Stan techniczny</GaugeLabel>
      </GaugeCenter>
      <GaugeNeedle value={value} />
    </GaugeContainer>
  );
  
  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Przegląd pojazdów</PageTitle>
        <DataSourceToggle>
          <ToggleLabel>Źródło danych:</ToggleLabel>
          <ToggleButton active={!useMockData} onClick={handleToggleDataSource}>
            API
          </ToggleButton>
          <ToggleButton active={useMockData} onClick={handleToggleDataSource}>
            Mock
          </ToggleButton>
        </DataSourceToggle>
      </PageHeader>
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      {isLoading ? (
        <LoadingIndicator>Ładowanie danych floty...</LoadingIndicator>
      ) : (
        <>
          {renderKPICards()}
          {renderFleetMap()}
          {renderVehiclesTable()}
          {selectedVehicle && renderVehicleDetails()}
          {renderFleetStatistics()}
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

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: 500;
  color: #333;
  margin: 0;
`;

const DataSourceToggle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ToggleLabel = styled.span`
  font-size: 14px;
  color: #666;
`;

const ToggleButton = styled.button`
  padding: 6px 12px;
  background-color: ${props => props.active ? '#3f51b5' : '#f5f5f5'};
  color: ${props => props.active ? 'white' : '#333'};
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.active ? '#303f9f' : '#e0e0e0'};
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

const MapContainer = styled.div`
  position: relative;
  height: 400px;
  background-color: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
`;

const MapPlaceholder = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
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
    if (props.status === 'active') return '#4caf50';
    if (props.status === 'inService') return '#ff9800';
    return '#f44336';
  }};
  border-radius: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  z-index: 2;
  
  &:hover {
    width: 16px;
    height: 16px;
    z-index: 3;
  }
  
  &:hover > div {
    display: block;
  }
`;

const MapTooltip = styled.div`
  display: none;
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 8px;
  width: 150px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 4;
  font-size: 12px;
  
  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 5px;
    border-style: solid;
    border-color: white transparent transparent transparent;
  }
`;

const MapLegend = styled.div`
  position: absolute;
  bottom: 16px;
  right: 16px;
  background-color: white;
  border-radius: 4px;
  padding: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 2;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
  font-size: 12px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const LegendPoint = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => {
    if (props.status === 'active') return '#4caf50';
    if (props.status === 'inService') return '#ff9800';
    return '#f44336';
  }};
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
  min-width: 200px;
  
  &:focus {
    outline: none;
    border-color: #3f51b5;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
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

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const PaginationInfo = styled.div`
  font-size: 14px;
  color: #666;
`;

const PaginationButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PageInfo = styled.div`
  font-size: 14px;
  color: #333;
  padding: 0 8px;
`;

const Badge = styled.span`
  display: inline-block;
  padding: 4px 8px;
  background-color: ${props => props.color};
  color: white;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
`;

const HealthBadge = styled.span`
  display: inline-block;
  padding: 4px 8px;
  background-color: ${props => props.color};
  color: white;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 20px;
  overflow-x: auto;
  
  &::-webkit-scrollbar {
    height: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }
`;

const Tab = styled.div`
  padding: 12px 24px;
  cursor: pointer;
  font-weight: ${props => props.active ? '500' : 'normal'};
  color: ${props => props.active ? '#3f51b5' : '#666'};
  border-bottom: 2px solid ${props => props.active ? '#3f51b5' : 'transparent'};
  transition: all 0.3s ease;
  white-space: nowrap;
  
  &:hover {
    color: #3f51b5;
    background-color: #f5f5f5;
  }
`;

const DetailContainer = styled.div`
  padding: 16px;
`;

const DetailSection = styled.div`
  margin-bottom: 24px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const DetailTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin: 0 0 16px 0;
`;

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  
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
  font-size: 14px;
  color: #666;
`;

const DetailValue = styled.div`
  font-size: 16px;
  color: #333;
`;

const HealthContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const HealthDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ComponentHealth = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ComponentName = styled.div`
  width: 120px;
  font-size: 14px;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const HealthBar = styled.div`
  flex: 1;
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
`;

const HealthBarFill = styled.div`
  height: 100%;
  width: ${props => props.value}%;
  background-color: ${props => props.color};
`;

const HealthValue = styled.div`
  width: 40px;
  font-size: 14px;
  color: #333;
  text-align: right;
`;

const TimelineContainer = styled.div`
  padding: 16px;
`;

const TimelineItem = styled.div`
  display: flex;
  margin-bottom: 24px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 24px;
    left: 8px;
    width: 2px;
    height: calc(100% + 24px);
    background-color: #e0e0e0;
    z-index: 1;
  }
  
  &:last-child::before {
    display: none;
  }
`;

const TimelineDot = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${props => props.color};
  margin-right: 16px;
  margin-top: 4px;
  z-index: 2;
`;

const TimelineContent = styled.div`
  flex: 1;
`;

const TimelineDate = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 4px;
`;

const TimelineTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-bottom: 4px;
`;

const TimelineDescription = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
`;

const TimelineDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  font-size: 14px;
  color: #666;
`;

const ChartContainer = styled.div`
  height: 300px;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
`;

const ChartTitle = styled.h4`
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin: 0 0 16px 0;
`;

const FuelStatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const FuelStatItem = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
`;

const FuelStatLabel = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
`;

const FuelStatValue = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: #333;
`;

const MileageStatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const MileageStatItem = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
`;

const MileageStatLabel = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
`;

const MileageStatValue = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: #333;
`;

const DocumentsGrid = styled.div`
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

const DocumentCard = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 16px;
`;

const DocumentIcon = styled.div`
  width: 40px;
  height: 40px;
  background-color: #e0e0e0;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;

const DocumentInfo = styled.div`
  flex: 1;
`;

const DocumentTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 4px;
`;

const DocumentMeta = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 12px;
  color: #666;
`;

const DocumentActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const DocumentButton = styled.button`
  padding: 4px 8px;
  background-color: white;
  color: #3f51b5;
  border: 1px solid #3f51b5;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  
  &:hover {
    background-color: #f0f0f0;
  }
`;

const StatisticsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
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

const GaugeContainer = styled.div`
  position: relative;
  width: 200px;
  height: 100px;
  margin: 0 auto;
  overflow: hidden;
`;

const GaugeBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 200px;
  height: 200px;
  border-radius: 100px 100px 0 0;
  background: linear-gradient(to right, #f44336 0%, #ffeb3b 50%, #4caf50 100%);
  overflow: hidden;
`;

const GaugeMask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 200px;
  height: 200px;
  background-color: white;
  transform-origin: center bottom;
  transform: rotate(${props => 180 - props.value * 1.8}deg);
`;

const GaugeCenter = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 160px;
  height: 80px;
  background-color: white;
  border-radius: 80px 80px 0 0;
  transform: translateX(-50%);
`;

const GaugeValue = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 24px;
  font-weight: 500;
  color: #333;
`;

const GaugeLabel = styled.div`
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  color: #666;
`;

const GaugeNeedle = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 4px;
  height: 90px;
  background-color: #333;
  transform-origin: bottom center;
  transform: translateX(-50%) rotate(${props => -90 + props.value * 1.8}deg);
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 50%;
    width: 10px;
    height: 10px;
    background-color: #333;
    border-radius: 50%;
    transform: translateX(-50%);
  }
`;

export default VehiclesOverview;
