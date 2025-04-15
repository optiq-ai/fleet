import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Card from '../components/common/Card';
import KPICard from '../components/common/KPICard';
import Table from '../components/common/Table';
import FuelConsumptionChart from '../components/charts/FuelConsumptionChart';
import FuelComparisonChart from '../components/charts/FuelComparisonChart';
import CO2EmissionChart from '../components/charts/CO2EmissionChart';
import AnomaliesChart from '../components/charts/AnomaliesChart';
import CostOptimizationChart from '../components/charts/CostOptimizationChart';
import fuelAnalysisService from '../services/api/fuelAnalysisService';
import mockFuelAnalysisService from '../services/api/mockFuelAnalysisService';

/**
 * Fuel Analysis component
 * Provides comprehensive analysis of fuel consumption, anomalies, cost optimization, and CO2 emissions
 * @returns {JSX.Element} Fuel Analysis component
 */
const FuelAnalysis = () => {
  // State for fuel analysis data
  const [kpiData, setKpiData] = useState(null);
  const [fuelConsumption, setFuelConsumption] = useState(null);
  const [fuelComparison, setFuelComparison] = useState(null);
  const [anomalies, setAnomalies] = useState(null);
  const [costOptimization, setCostOptimization] = useState(null);
  const [co2Emission, setCo2Emission] = useState(null);
  
  // State for UI
  const [activeTab, setActiveTab] = useState('consumption');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [useMockData, setUseMockData] = useState(true);
  
  // State for filters
  const [filters, setFilters] = useState({
    period: 'month',
    vehicleId: '',
    driverId: '',
    startDate: '',
    endDate: '',
    compareBy: 'vehicle',
    severity: 'all',
    search: '',
    page: 1,
    limit: 10
  });
  
  // State for pagination
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    totalItems: 0
  });
  
  // Get service based on mock data toggle
  const service = useMockData ? mockFuelAnalysisService : fuelAnalysisService;
  
  // Fetch KPI data
  const fetchKpiData = useCallback(async () => {
    try {
      const data = await service.getKpiData();
      setKpiData(data);
    } catch (err) {
      console.error('Error fetching KPI data:', err);
      setError('Nie udało się pobrać danych KPI');
    }
  }, [service]);
  
  // Fetch fuel consumption data
  const fetchFuelConsumptionData = useCallback(async () => {
    try {
      const data = await service.getFuelConsumptionData(filters);
      setFuelConsumption(data);
    } catch (err) {
      console.error('Error fetching fuel consumption data:', err);
      setError('Nie udało się pobrać danych zużycia paliwa');
    }
  }, [service, filters]);
  
  // Fetch fuel comparison data
  const fetchFuelComparisonData = useCallback(async () => {
    try {
      const data = await service.getFuelComparisonData(filters);
      setFuelComparison(data);
      setPagination({
        page: filters.page,
        totalPages: Math.ceil(data.total / filters.limit),
        totalItems: data.total
      });
    } catch (err) {
      console.error('Error fetching fuel comparison data:', err);
      setError('Nie udało się pobrać danych porównawczych');
    }
  }, [service, filters]);
  
  // Fetch anomalies data
  const fetchAnomaliesData = useCallback(async () => {
    try {
      const data = await service.getAnomaliesData(filters);
      setAnomalies(data);
    } catch (err) {
      console.error('Error fetching anomalies data:', err);
      setError('Nie udało się pobrać danych anomalii');
    }
  }, [service, filters]);
  
  // Fetch cost optimization data
  const fetchCostOptimizationData = useCallback(async () => {
    try {
      const data = await service.getCostOptimizationData(filters);
      setCostOptimization(data);
    } catch (err) {
      console.error('Error fetching cost optimization data:', err);
      setError('Nie udało się pobrać danych optymalizacji kosztów');
    }
  }, [service, filters]);
  
  // Fetch CO2 emission data
  const fetchCo2EmissionData = useCallback(async () => {
    try {
      const data = await service.getCo2EmissionData(filters);
      setCo2Emission(data);
    } catch (err) {
      console.error('Error fetching CO2 emission data:', err);
      setError('Nie udało się pobrać danych emisji CO2');
    }
  }, [service, filters]);
  
  // Fetch all data
  const fetchAllData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      await Promise.all([
        fetchKpiData(),
        fetchFuelConsumptionData(),
        fetchFuelComparisonData(),
        fetchAnomaliesData(),
        fetchCostOptimizationData(),
        fetchCo2EmissionData()
      ]);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Nie udało się pobrać danych analizy paliwa');
    } finally {
      setIsLoading(false);
    }
  }, [
    fetchKpiData,
    fetchFuelConsumptionData,
    fetchFuelComparisonData,
    fetchAnomaliesData,
    fetchCostOptimizationData,
    fetchCo2EmissionData
  ]);
  
  // Fetch data on component mount and when filters change
  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);
  
  // Handle filter change
  const handleFilterChange = (name, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,
      page: name === 'page' ? value : 1 // Reset page when other filters change
    }));
  };
  
  // Handle page change
  const handlePageChange = (page) => {
    handleFilterChange('page', page);
  };
  
  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  // Handle export to CSV
  const handleExportCSV = () => {
    // Implementation for CSV export
    console.log('Exporting to CSV...');
  };
  
  // Handle export to PDF
  const handleExportPDF = () => {
    // Implementation for PDF export
    console.log('Exporting to PDF...');
  };
  
  // Toggle between mock data and API
  const handleToggleMockData = () => {
    setUseMockData(prev => !prev);
  };
  
  // Render loading state
  if (isLoading && !fuelConsumption && !fuelComparison && !anomalies && !costOptimization && !co2Emission) {
    return <LoadingIndicator>Ładowanie danych analizy paliwa...</LoadingIndicator>;
  }
  
  // Render error state
  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }
  
  // Render the component
  return (
    <Container>
      <Header>
        <Title>Analiza Paliwa</Title>
        <Actions>
          <ApiToggle>
            <span>Użyj API</span>
            <ToggleSwitch 
              type="checkbox" 
              checked={!useMockData} 
              onChange={handleToggleMockData} 
            />
            <span>Użyj danych testowych</span>
          </ApiToggle>
        </Actions>
      </Header>
      
      <TabsContainer>
        <Tab 
          active={activeTab === 'consumption'} 
          onClick={() => handleTabChange('consumption')}
        >
          Analiza zużycia paliwa
        </Tab>
        <Tab 
          active={activeTab === 'anomalies'} 
          onClick={() => handleTabChange('anomalies')}
        >
          Wykrywanie anomalii
        </Tab>
        <Tab 
          active={activeTab === 'optimization'} 
          onClick={() => handleTabChange('optimization')}
        >
          Optymalizacja kosztów
        </Tab>
        <Tab 
          active={activeTab === 'co2'} 
          onClick={() => handleTabChange('co2')}
        >
          Monitorowanie emisji CO2
        </Tab>
      </TabsContainer>
      
      {activeTab === 'consumption' && renderFuelAnalysisTab()}
      {activeTab === 'anomalies' && renderAnomaliesTab()}
      {activeTab === 'optimization' && renderOptimizationTab()}
      {activeTab === 'co2' && renderCo2EmissionTab()}
    </Container>
  );
  
  // Render the Fuel Analysis tab content
  function renderFuelAnalysisTab() {
    if (!fuelConsumption || !fuelComparison) {
      return <LoadingIndicator>Ładowanie danych zużycia paliwa...</LoadingIndicator>;
    }
    
    return (
      <TabContent>
        <KpiSection>
          {kpiData && (
            <>
              <KPICard 
                title="Średnie zużycie paliwa"
                value={`${kpiData.averageFuelConsumption} l/100km`}
                change={kpiData.fuelConsumptionChange}
                icon="fuel"
              />
              <KPICard 
                title="Całkowity koszt paliwa"
                value={`${kpiData.totalFuelCost} zł`}
                change={kpiData.fuelCostChange}
                icon="money"
              />
              <KPICard 
                title="Potencjalne oszczędności"
                value={`${kpiData.potentialSavings} zł`}
                change={kpiData.savingsChange}
                icon="savings"
              />
              <KPICard 
                title="Emisja CO2"
                value={`${kpiData.co2Emission} kg`}
                change={kpiData.co2EmissionChange}
                icon="co2"
              />
            </>
          )}
        </KpiSection>
        
        <Card title="Zużycie paliwa w czasie">
          <FilterContainer>
            <FilterGroup>
              <FilterLabel>Okres:</FilterLabel>
              <FilterSelect 
                value={filters.period}
                onChange={(e) => handleFilterChange('period', e.target.value)}
              >
                <option value="day">Dzień</option>
                <option value="week">Tydzień</option>
                <option value="month">Miesiąc</option>
                <option value="year">Rok</option>
              </FilterSelect>
            </FilterGroup>
            
            <FilterGroup>
              <FilterLabel htmlFor="vehicleId">Pojazd</FilterLabel>
              <FilterSelect 
                id="vehicleId" 
                name="vehicleId" 
                value={filters.vehicleId} 
                onChange={(e) => handleFilterChange('vehicleId', e.target.value)}
              >
                <option value="">Wszystkie pojazdy</option>
                <option value="VEH001">VEH001 - Mercedes Actros</option>
                <option value="VEH002">VEH002 - Volvo FH</option>
                <option value="VEH003">VEH003 - Scania R</option>
                <option value="VEH004">VEH004 - MAN TGX</option>
                <option value="VEH005">VEH005 - DAF XF</option>
              </FilterSelect>
            </FilterGroup>
            
            <FilterGroup>
              <FilterLabel htmlFor="driverId">Kierowca</FilterLabel>
              <FilterSelect 
                id="driverId" 
                name="driverId" 
                value={filters.driverId} 
                onChange={(e) => handleFilterChange('driverId', e.target.value)}
              >
                <option value="">Wszyscy kierowcy</option>
                <option value="DRV001">Jan Kowalski</option>
                <option value="DRV002">Anna Nowak</option>
                <option value="DRV003">Piotr Wiśniewski</option>
                <option value="DRV004">Katarzyna Dąbrowska</option>
                <option value="DRV005">Tomasz Lewandowski</option>
              </FilterSelect>
            </FilterGroup>
          </FilterContainer>
          
          {isLoading ? (
            <LoadingIndicator>Ładowanie wykresu...</LoadingIndicator>
          ) : (
            <FuelConsumptionChart 
              data={fuelConsumption.data}
              period={filters.period}
              isLoading={isLoading}
            />
          )}
        </Card>
        
        <Card title="Porównanie zużycia paliwa">
          <FilterContainer>
            <FilterGroup>
              <FilterLabel htmlFor="compareBy">Porównaj według</FilterLabel>
              <FilterSelect 
                id="compareBy" 
                name="compareBy" 
                value={filters.compareBy} 
                onChange={(e) => handleFilterChange('compareBy', e.target.value)}
              >
                <option value="vehicle">Pojazd</option>
                <option value="driver">Kierowca</option>
                <option value="route">Trasa</option>
              </FilterSelect>
            </FilterGroup>
          </FilterContainer>
          
          {isLoading ? (
            <LoadingIndicator>Ładowanie wykresu...</LoadingIndicator>
          ) : (
            <FuelComparisonChart 
              data={fuelComparison.data}
              compareBy={filters.compareBy}
              isLoading={isLoading}
            />
          )}
          
          <TableContainer>
            <Table 
              columns={[
                { key: 'id', label: 'ID' },
                { key: 'name', label: 'Nazwa' },
                { key: 'consumption', label: 'Zużycie (l/100km)' },
                { key: 'distance', label: 'Dystans (km)' },
                { key: 'cost', label: 'Koszt (zł)' },
                { key: 'efficiency', label: 'Efektywność (%)' }
              ]}
              data={fuelComparison.data}
              isLoading={isLoading}
              emptyMessage="Brak danych porównawczych"
            />
          </TableContainer>
          
          <PaginationContainer>
            <PaginationButton 
              disabled={pagination.page === 1}
              onClick={() => handlePageChange(pagination.page - 1)}
            >
              &lt; Poprzednia
            </PaginationButton>
            <PaginationInfo>
              Strona {pagination.page} z {pagination.totalPages}
            </PaginationInfo>
            <PaginationButton 
              disabled={pagination.page === pagination.totalPages}
              onClick={() => handlePageChange(pagination.page + 1)}
            >
              Następna &gt;
            </PaginationButton>
          </PaginationContainer>
        </Card>
      </TabContent>
    );
  }
  
  // Render anomalies tab
  function renderAnomaliesTab() {
    if (!anomalies) {
      return <LoadingIndicator>Ładowanie danych anomalii...</LoadingIndicator>;
    }
    
    return (
      <TabContent>
        <Card 
          title="Wykrywanie anomalii w zużyciu paliwa" 
          actions={
            <ActionsContainer>
              <Button onClick={handleExportCSV}>Eksport CSV</Button>
              <Button onClick={handleExportPDF}>Eksport PDF</Button>
            </ActionsContainer>
          }
        >
          <FilterContainer>
            <FilterGroup>
              <FilterLabel>Okres:</FilterLabel>
              <FilterSelect 
                value={filters.period}
                onChange={(e) => handleFilterChange('period', e.target.value)}
              >
                <option value="day">Dzień</option>
                <option value="week">Tydzień</option>
                <option value="month">Miesiąc</option>
                <option value="year">Rok</option>
              </FilterSelect>
            </FilterGroup>
            
            <FilterGroup>
              <FilterLabel>Poziom ważności:</FilterLabel>
              <FilterSelect 
                value={filters.severity}
                onChange={(e) => handleFilterChange('severity', e.target.value)}
              >
                <option value="all">Wszystkie</option>
                <option value="high">Wysoki</option>
                <option value="medium">Średni</option>
                <option value="low">Niski</option>
              </FilterSelect>
            </FilterGroup>
          </FilterContainer>
          
          {isLoading ? (
            <LoadingIndicator>Ładowanie wykresu...</LoadingIndicator>
          ) : (
            <AnomaliesChart 
              data={anomalies.data}
              period={filters.period}
              isLoading={isLoading}
            />
          )}
          
          <TableContainer>
            <Table 
              columns={[
                { key: 'date', label: 'Data' },
                { key: 'type', label: 'Typ anomalii' },
                { key: 'description', label: 'Opis' },
                { key: 'vehicleId', label: 'Pojazd' },
                { key: 'driverId', label: 'Kierowca' },
                { key: 'severity', label: 'Ważność' },
                { key: 'potentialLoss', label: 'Potencjalna strata (zł)' },
                { key: 'status', label: 'Status' }
              ]}
              data={anomalies.data}
              isLoading={isLoading}
              emptyMessage="Brak wykrytych anomalii"
            />
          </TableContainer>
          
          <PaginationContainer>
            <PaginationButton 
              disabled={pagination.page === 1}
              onClick={() => handlePageChange(pagination.page - 1)}
            >
              &lt; Poprzednia
            </PaginationButton>
            <PaginationInfo>
              Strona {pagination.page} z {pagination.totalPages}
            </PaginationInfo>
            <PaginationButton 
              disabled={pagination.page === pagination.totalPages}
              onClick={() => handlePageChange(pagination.page + 1)}
            >
              Następna &gt;
            </PaginationButton>
          </PaginationContainer>
        </Card>
      </TabContent>
    );
  }
  
  // Render optimization tab
  function renderOptimizationTab() {
    if (!costOptimization) {
      return <LoadingIndicator>Ładowanie danych optymalizacji kosztów...</LoadingIndicator>;
    }
    
    return (
      <TabContent>
        <Card title="Porównanie cen paliwa">
          <TableContainer>
            <Table 
              columns={[
                { key: 'stationName', label: 'Stacja paliw' },
                { key: 'price', label: 'Cena (zł/l)' },
                { key: 'distance', label: 'Odległość (km)' },
                { key: 'rating', label: 'Ocena' },
                { key: 'savings', label: 'Potencjalne oszczędności (zł)' }
              ]}
              data={costOptimization.fuelPriceComparison.stations}
              isLoading={isLoading}
              emptyMessage="Brak danych o cenach paliwa"
            />
          </TableContainer>
          
          <InfoBox>
            <InfoItem>
              <InfoLabel>Rekomendowana stacja:</InfoLabel>
              <InfoValue>{costOptimization.fuelPriceComparison.recommendedStation.stationName}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Średnia cena paliwa:</InfoLabel>
              <InfoValue>{costOptimization.fuelPriceComparison.averagePrice.toFixed(2)} zł/l</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Potencjalne roczne oszczędności:</InfoLabel>
              <InfoValue>{costOptimization.fuelPriceComparison.potentialAnnualSavings} zł</InfoValue>
            </InfoItem>
          </InfoBox>
        </Card>
        
        <Card title="Optymalizacja tras">
          {isLoading ? (
            <LoadingIndicator>Ładowanie wykresu...</LoadingIndicator>
          ) : (
            <CostOptimizationChart 
              data={costOptimization}
              isLoading={isLoading}
            />
          )}
          
          <TableContainer>
            <Table 
              columns={[
                { key: 'name', label: 'Trasa' },
                { key: 'currentDistance', label: 'Obecna odległość (km)' },
                { key: 'optimizedDistance', label: 'Zoptymalizowana odległość (km)' },
                { key: 'currentFuelConsumption', label: 'Obecne zużycie paliwa (l)' },
                { key: 'optimizedFuelConsumption', label: 'Zoptymalizowane zużycie paliwa (l)' },
                { key: 'savings', label: 'Oszczędności (zł)' }
              ]}
              data={costOptimization.routeOptimization.routes}
              isLoading={isLoading}
              emptyMessage="Brak danych o trasach"
            />
          </TableContainer>
          
          <InfoBox>
            <InfoItem>
              <InfoLabel>Całkowite oszczędności:</InfoLabel>
              <InfoValue>{costOptimization.routeOptimization.totalSavings} zł</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Średnie oszczędności na trasę:</InfoLabel>
              <InfoValue>{costOptimization.routeOptimization.averageSavings.toFixed(0)} zł</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Całkowita redukcja dystansu:</InfoLabel>
              <InfoValue>{costOptimization.routeOptimization.totalDistanceReduction} km</InfoValue>
            </InfoItem>
          </InfoBox>
        </Card>
        
        <Card title="Wpływ stylu jazdy">
          <TableContainer>
            <Table 
              columns={[
                { key: 'name', label: 'Zachowanie' },
                { key: 'impact', label: 'Wpływ' },
                { key: 'recommendation', label: 'Rekomendacja' },
                { key: 'potentialSavings', label: 'Potencjalne oszczędności (zł)' }
              ]}
              data={costOptimization.drivingBehavior.behaviors}
              isLoading={isLoading}
              emptyMessage="Brak danych o stylu jazdy"
            />
          </TableContainer>
          
          <InfoBox>
            <InfoItem>
              <InfoLabel>Całkowite potencjalne oszczędności:</InfoLabel>
              <InfoValue>{costOptimization.drivingBehavior.totalPotentialSavings} zł</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Najważniejszy problem:</InfoLabel>
              <InfoValue>{costOptimization.drivingBehavior.topIssue.name}</InfoValue>
            </InfoItem>
          </InfoBox>
        </Card>
        
        <Card title="Wpływ konserwacji">
          <TableContainer>
            <Table 
              columns={[
                { key: 'name', label: 'Problem' },
                { key: 'impact', label: 'Wpływ' },
                { key: 'recommendation', label: 'Rekomendacja' },
                { key: 'potentialSavings', label: 'Potencjalne oszczędności (zł)' }
              ]}
              data={costOptimization.maintenanceImpact.issues}
              isLoading={isLoading}
              emptyMessage="Brak danych o konserwacji"
            />
          </TableContainer>
          
          <InfoBox>
            <InfoItem>
              <InfoLabel>Całkowite potencjalne oszczędności:</InfoLabel>
              <InfoValue>{costOptimization.maintenanceImpact.totalPotentialSavings} zł</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Najważniejszy problem:</InfoLabel>
              <InfoValue>{costOptimization.maintenanceImpact.topIssue.name}</InfoValue>
            </InfoItem>
          </InfoBox>
        </Card>
        
        <Card title="Rekomendacje">
          <TableContainer>
            <Table 
              columns={[
                { key: 'title', label: 'Rekomendacja' },
                { key: 'description', label: 'Opis' },
                { key: 'estimatedSavings', label: 'Szacowane oszczędności (zł)' },
                { key: 'implementationCost', label: 'Koszt wdrożenia (zł)' },
                { key: 'roi', label: 'ROI (%)' },
                { key: 'priority', label: 'Priorytet' }
              ]}
              data={costOptimization.recommendations}
              isLoading={isLoading}
              emptyMessage="Brak rekomendacji"
            />
          </TableContainer>
        </Card>
      </TabContent>
    );
  }
  
  // Render CO2 emission tab
  function renderCo2EmissionTab() {
    if (!co2Emission) {
      return <LoadingIndicator>Ładowanie danych emisji CO2...</LoadingIndicator>;
    }
    
    return (
      <TabContent>
        <KpiSection>
          {co2Emission && (
            <>
              <KPICard 
                title="Całkowita emisja CO2"
                value={`${co2Emission.summary.totalEmission.toFixed(0)} kg`}
                change={co2Emission.summary.emissionTrend}
                icon="co2"
              />
              <KPICard 
                title="Średnia emisja CO2"
                value={`${co2Emission.summary.averageEmission.toFixed(1)} kg`}
                change={co2Emission.summary.emissionTrend}
                icon="co2"
              />
              <KPICard 
                title="Emisja CO2 na km"
                value={`${co2Emission.summary.emissionPerKm.toFixed(2)} kg/km`}
                change={co2Emission.summary.emissionTrend}
                icon="co2"
              />
            </>
          )}
        </KpiSection>
        
        <Card title="Emisja CO2 w czasie">
          <FilterContainer>
            <FilterGroup>
              <FilterLabel>Okres:</FilterLabel>
              <FilterSelect 
                value={filters.period}
                onChange={(e) => handleFilterChange('period', e.target.value)}
              >
                <option value="day">Dzień</option>
                <option value="week">Tydzień</option>
                <option value="month">Miesiąc</option>
                <option value="year">Rok</option>
              </FilterSelect>
            </FilterGroup>
          </FilterContainer>
          
          {isLoading ? (
            <LoadingIndicator>Ładowanie wykresu...</LoadingIndicator>
          ) : (
            <CO2EmissionChart 
              data={co2Emission.data}
              period={filters.period}
              isLoading={isLoading}
            />
          )}
        </Card>
        
        <Card title="Zgodność z normami emisji">
          <TableContainer>
            <Table 
              columns={[
                { key: 'standard', label: 'Standard' },
                { key: 'limit', label: 'Limit (g/km)' },
                { key: 'current', label: 'Aktualna emisja (g/km)' },
                { key: 'status', label: 'Status' },
                { key: 'compliance', label: 'Zgodność (%)' }
              ]}
              data={co2Emission.standards}
              isLoading={isLoading}
              emptyMessage="Brak danych o normach emisji"
            />
          </TableContainer>
        </Card>
        
        <Card title="Cele redukcji emisji">
          <TableContainer>
            <Table 
              columns={[
                { key: 'name', label: 'Cel' },
                { key: 'target', label: 'Wartość docelowa (g/km)' },
                { key: 'current', label: 'Aktualna wartość (g/km)' },
                { key: 'deadline', label: 'Termin' },
                { key: 'progress', label: 'Postęp (%)' }
              ]}
              data={co2Emission.reductionGoals}
              isLoading={isLoading}
              emptyMessage="Brak celów redukcji emisji"
            />
          </TableContainer>
        </Card>
      </TabContent>
    );
  }
};

// Styled components
const Container = styled.div`
  padding: 20px;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin: 0;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
`;

const ApiToggle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
`;

const ToggleSwitch = styled.input`
  position: relative;
  width: 40px;
  height: 20px;
  appearance: none;
  background-color: #ccc;
  border-radius: 10px;
  outline: none;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:checked {
    background-color: #4CAF50;
  }
  
  &:before {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 16px;
    height: 16px;
    background-color: white;
    border-radius: 50%;
    transition: transform 0.3s;
  }
  
  &:checked:before {
    transform: translateX(20px);
  }
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 20px;
`;

const Tab = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  font-weight: ${props => props.active ? '600' : '400'};
  color: ${props => props.active ? '#1976d2' : '#333'};
  border-bottom: 2px solid ${props => props.active ? '#1976d2' : 'transparent'};
  transition: all 0.3s;
  
  &:hover {
    color: #1976d2;
  }
`;

const TabContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const KpiSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 20px;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const FilterLabel = styled.label`
  font-size: 14px;
  color: #666;
`;

const FilterSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background-color: white;
  min-width: 150px;
`;

const TableContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 20px;
`;

const PaginationButton = styled.button`
  padding: 8px 16px;
  background-color: ${props => props.disabled ? '#f5f5f5' : '#1976d2'};
  color: ${props => props.disabled ? '#999' : 'white'};
  border: none;
  border-radius: 4px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  
  &:hover {
    background-color: ${props => props.disabled ? '#f5f5f5' : '#1565c0'};
  }
`;

const PaginationInfo = styled.div`
  font-size: 14px;
  color: #666;
`;

const ActionsContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #1565c0;
  }
`;

const InfoBox = styled.div`
  background-color: #f5f7fa;
  border-radius: 4px;
  padding: 16px;
  margin-top: 20px;
`;

const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const InfoLabel = styled.div`
  font-weight: 500;
  color: #333;
`;

const InfoValue = styled.div`
  color: #1976d2;
  font-weight: 600;
`;

const LoadingIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #666;
`;

const ErrorMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #d32f2f;
  font-weight: 500;
`;

const ChartPlaceholder = styled.div`
  height: 300px;
  background-color: #f5f7fa;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #666;
`;

export default FuelAnalysis;
