import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import Card from '../components/common/Card';
import KPICard from '../components/common/KPICard';
import Table from '../components/common/Table';
import roadTollsService from '../services/api/roadTollsService';
import mockRoadTollsService from '../services/api/mockRoadTollsService';
import RoadTollsActivityMap from '../components/roadtolls/RoadTollsActivityMap';
import RoadTollSpendingTrendsChart from '../components/roadtolls/RoadTollSpendingTrendsChart';

/**
 * Road Tolls component for managing toll expenses, transponders, violations and route optimization
 * @returns {JSX.Element} Road Tolls component
 */
const RoadTolls = () => {
  // React Router location hook to access location state
  const location = useLocation();
  
  // State for data
  const [dashboardData, setDashboardData] = useState(null);
  const [transponders, setTransponders] = useState({ items: [], pagination: {} });
  const [selectedTransponder, setSelectedTransponder] = useState(null);
  const [violations, setViolations] = useState({ items: [], pagination: {} });
  const [selectedViolation, setSelectedViolation] = useState(null);
  const [expenseReports, setExpenseReports] = useState(null);
  const [tollOperators, setTollOperators] = useState({ operators: [], count: 0 });
  const [routeOptimization, setRouteOptimization] = useState({ routes: [], count: 0 });

  // State for UI
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeSubTab, setActiveSubTab] = useState('daily');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [useMockData, setUseMockData] = useState(true);
  
  // Use refs to track loaded data state to avoid re-renders
  const dataLoadedRef = useRef({
    dashboard: false,
    transponders: false,
    violations: false,
    reports: false,
    operators: false,
    optimization: false
  });
  
  // State for filters
  const [transponderFilters, setTransponderFilters] = useState({
    status: 'all',
    search: '',
    page: 1,
    limit: 10
  });
  
  const [violationFilters, setViolationFilters] = useState({
    status: 'all',
    search: '',
    page: 1,
    limit: 10
  });
  
  const [reportFilters, setReportFilters] = useState({
    groupBy: 'vehicle',
    timeRange: 'month'
  });
  
  const [routeFilters, setRouteFilters] = useState({
    origin: '',
    destination: ''
  });

  // Service selection based on mock data toggle
  const service = useMockData ? mockRoadTollsService : roadTollsService;
  
  // Refs for search debounce timers
  const searchTimerRef = useRef(null);

  // Load dashboard data
  const loadDashboardData = useCallback(async () => {
    if (isLoading || dataLoadedRef.current.dashboard) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const data = await service.getRoadTollsDashboard();
      setDashboardData(data);
      dataLoadedRef.current.dashboard = true;
    } catch (err) {
      console.error('Error loading dashboard data:', err);
      setError('Failed to load dashboard data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [service, isLoading]);

  // Load transponders data
  const loadTransponders = useCallback(async (filters = transponderFilters) => {
    if (isLoading) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const data = await service.getTransponders(filters);
      setTransponders(data);
      dataLoadedRef.current.transponders = true;
    } catch (err) {
      console.error('Error loading transponders data:', err);
      setError('Failed to load transponders data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [service, isLoading, transponderFilters]);

  // Load transponder details
  const loadTransponderDetails = useCallback(async (id) => {
    if (isLoading) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const data = await service.getTransponderDetails(id);
      setSelectedTransponder(data);
    } catch (err) {
      console.error(`Error loading transponder details for ID ${id}:`, err);
      setError('Failed to load transponder details. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [service, isLoading]);

  // Load violations data
  const loadViolations = useCallback(async (filters = violationFilters) => {
    if (isLoading) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const data = await service.getViolations(filters);
      setViolations(data);
      dataLoadedRef.current.violations = true;
    } catch (err) {
      console.error('Error loading violations data:', err);
      setError('Failed to load violations data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [service, isLoading, violationFilters]);

  // Load violation details
  const loadViolationDetails = useCallback(async (id) => {
    if (isLoading) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const data = await service.getViolationDetails(id);
      setSelectedViolation(data);
    } catch (err) {
      console.error(`Error loading violation details for ID ${id}:`, err);
      setError('Failed to load violation details. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [service, isLoading]);

  // Load expense reports
  const loadExpenseReports = useCallback(async (filters = reportFilters) => {
    if (isLoading) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const data = await service.getExpenseReports(filters);
      setExpenseReports(data);
      dataLoadedRef.current.reports = true;
    } catch (err) {
      console.error('Error loading expense reports:', err);
      setError('Failed to load expense reports. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [service, isLoading, reportFilters]);

  // Load toll operators
  const loadTollOperators = useCallback(async () => {
    if (isLoading || dataLoadedRef.current.operators) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const data = await service.getTollOperators();
      setTollOperators(data);
      dataLoadedRef.current.operators = true;
    } catch (err) {
      console.error('Error loading toll operators:', err);
      setError('Failed to load toll operators. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [service, isLoading]);

  // Load route optimization
  const loadRouteOptimization = useCallback(async (filters = routeFilters) => {
    if (isLoading) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const data = await service.getRouteOptimization(filters);
      setRouteOptimization(data);
      dataLoadedRef.current.optimization = true;
    } catch (err) {
      console.error('Error loading route optimization:', err);
      setError('Failed to load route optimization. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [service, isLoading, routeFilters]);

  // Handle tab change
  const handleTabChange = useCallback((tab) => {
    if (tab === activeTab) return; // Prevent unnecessary re-renders
    
    setActiveTab(tab);
    setSelectedTransponder(null);
    setSelectedViolation(null);
    
    // Load data based on selected tab only if not already loaded
    switch (tab) {
      case 'dashboard':
        if (!dataLoadedRef.current.dashboard) loadDashboardData();
        break;
      case 'transponders':
        if (!dataLoadedRef.current.transponders) loadTransponders();
        break;
      case 'violations':
        if (!dataLoadedRef.current.violations) loadViolations();
        break;
      case 'reports':
        if (!dataLoadedRef.current.reports) loadExpenseReports();
        break;
      case 'operators':
        if (!dataLoadedRef.current.operators) loadTollOperators();
        break;
      case 'optimization':
        if (!dataLoadedRef.current.optimization) loadRouteOptimization();
        break;
      default:
        break;
    }
  }, [
    activeTab,
    loadDashboardData, 
    loadTransponders, 
    loadViolations, 
    loadExpenseReports, 
    loadTollOperators, 
    loadRouteOptimization
  ]);

  // Handle transponder filters change
  const handleTransponderFilterChange = useCallback((name, value) => {
    const newFilters = { ...transponderFilters, [name]: value };
    if (name !== 'page') {
      newFilters.page = 1; // Reset to first page when filters change
    }
    setTransponderFilters(newFilters);
    
    // Debounce filter changes to prevent excessive API calls
    if (name === 'search') {
      if (searchTimerRef.current) {
        clearTimeout(searchTimerRef.current);
      }
      searchTimerRef.current = setTimeout(() => {
        loadTransponders(newFilters);
        searchTimerRef.current = null;
      }, 300);
    } else {
      loadTransponders(newFilters);
    }
  }, [transponderFilters, loadTransponders]);

  // Handle violation filters change
  const handleViolationFilterChange = useCallback((name, value) => {
    const newFilters = { ...violationFilters, [name]: value };
    if (name !== 'page') {
      newFilters.page = 1; // Reset to first page when filters change
    }
    setViolationFilters(newFilters);
    
    // Debounce filter changes to prevent excessive API calls
    if (name === 'search') {
      if (searchTimerRef.current) {
        clearTimeout(searchTimerRef.current);
      }
      searchTimerRef.current = setTimeout(() => {
        loadViolations(newFilters);
        searchTimerRef.current = null;
      }, 300);
    } else {
      loadViolations(newFilters);
    }
  }, [violationFilters, loadViolations]);

  // Handle report filters change
  const handleReportFilterChange = useCallback((name, value) => {
    const newFilters = { ...reportFilters, [name]: value };
    setReportFilters(newFilters);
    loadExpenseReports(newFilters);
  }, [reportFilters, loadExpenseReports]);

  // Handle route optimization search
  const handleRouteSearch = useCallback((e) => {
    e.preventDefault();
    loadRouteOptimization(routeFilters);
  }, [routeFilters, loadRouteOptimization]);

  // Handle route filter change
  const handleRouteFilterChange = useCallback((name, value) => {
    setRouteFilters(prev => ({ ...prev, [name]: value }));
  }, []);

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(value);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pl-PL');
  };

  // Get status badge variant
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return '#28a745';
      case 'inactive':
        return '#dc3545';
      case 'expired':
        return '#ffc107';
      case 'pending_activation':
        return '#17a2b8';
      case 'new':
        return '#007bff';
      case 'in_progress':
        return '#17a2b8';
      case 'paid':
        return '#28a745';
      case 'disputed':
        return '#ffc107';
      case 'resolved':
        return '#6c757d';
      default:
        return '#6c757d';
    }
  };

  // Initial data load - only once on component mount
  useEffect(() => {
    // Check if we have location state with activeTab
    if (location.state && location.state.activeTab) {
      setActiveTab(location.state.activeTab);
      
      // Load data based on the activeTab from location state
      switch (location.state.activeTab) {
        case 'transponders':
          loadTransponders();
          break;
        case 'violations':
          loadViolations();
          break;
        case 'reports':
          loadExpenseReports();
          break;
        case 'operators':
          loadTollOperators();
          break;
        case 'optimization':
          loadRouteOptimization();
          break;
        default:
          loadDashboardData();
          break;
      }
    } else {
      // Default behavior - load dashboard data
      loadDashboardData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reset data loaded state when mock data toggle changes
  useEffect(() => {
    // Reset data loaded state
    dataLoadedRef.current = {
      dashboard: false,
      transponders: false,
      violations: false,
      reports: false,
      operators: false,
      optimization: false
    };
    
    // Load data for current tab after reset
    const currentTab = activeTab;
    switch (currentTab) {
      case 'dashboard':
        loadDashboardData();
        break;
      case 'transponders':
        loadTransponders();
        break;
      case 'violations':
        loadViolations();
        break;
      case 'reports':
        loadExpenseReports();
        break;
      case 'operators':
        loadTollOperators();
        break;
      case 'optimization':
        loadRouteOptimization();
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useMockData]);

  // Toggle between real and mock data
  const handleToggleDataSource = () => {
    setUseMockData(!useMockData);
  };

  // Render dashboard tab
  const renderDashboard = () => {
    if (!dashboardData) {
      return (
        <LoadingContainer>
          <LoadingIndicator>Ładowanie danych...</LoadingIndicator>
        </LoadingContainer>
      );
    }

    return (
      <PageContainer>
        {/* KPI Cards */}
        <GridSection>
          <KPICard 
            title="Całkowite wydatki" 
            value={formatCurrency(dashboardData.kpi.totalTollExpenses)} 
            icon="💰"
          />
          <KPICard 
            title="Liczba naruszeń" 
            value={dashboardData.kpi.violationsCount} 
            icon="⚠️"
          />
          <KPICard 
            title="Potencjalne oszczędności" 
            value={formatCurrency(dashboardData.kpi.potentialSavings)} 
            icon="💸"
          />
          <KPICard 
            title="Aktywne transpondery" 
            value={dashboardData.kpi.activeTransponders} 
            icon="📡"
          />
        </GridSection>

        {/* Map and Expense Trends */}
        <GridSection columns={2}>
          <Card title="Mapa aktywności opłat drogowych">
            <MapContainer>
              <RoadTollsActivityMap 
                tollPoints={dashboardData.mapData} 
                onMarkerClick={(point) => console.log('Clicked toll point:', point)}
              />
            </MapContainer>
          </Card>
          
          <Card title="Trendy wydatków na opłaty drogowe">
            <TabsContainer>
              <TabsList>
                <TabItem 
                  active={activeSubTab === 'daily'} 
                  onClick={() => setActiveSubTab('daily')}
                >
                  Dzienne
                </TabItem>
                <TabItem 
                  active={activeSubTab === 'weekly'} 
                  onClick={() => setActiveSubTab('weekly')}
                >
                  Tygodniowe
                </TabItem>
                <TabItem 
                  active={activeSubTab === 'monthly'} 
                  onClick={() => setActiveSubTab('monthly')}
                >
                  Miesięczne
                </TabItem>
                <TabItem 
                  active={activeSubTab === 'quarterly'} 
                  onClick={() => setActiveSubTab('quarterly')}
                >
                  Kwartalne
                </TabItem>
              </TabsList>
              <TabContent>
                <RoadTollSpendingTrendsChart
                  data={dashboardData.expenseTrends[activeSubTab]}
                  period={activeSubTab}
                  isLoading={isLoading}
                />
              </TabContent>
            </TabsContainer>
          </Card>
        </GridSection>

        {/* Alerts */}
        <Card title="Alerty">
          <Table 
            headers={['Typ', 'Tytuł', 'Wiadomość', 'Ważność', 'Data']}
            data={dashboardData.alerts.map(alert => [
              <StatusBadge color={getAlertTypeColor(alert.type)}>{alert.type.replace('_', ' ')}</StatusBadge>,
              alert.title,
              alert.message,
              <StatusBadge color={getAlertSeverityColor(alert.severity)}>{alert.severity}</StatusBadge>,
              formatDate(alert.date)
            ])}
          />
        </Card>
      </PageContainer>
    );
  };

  // Helper function for alert type color
  const getAlertTypeColor = (type) => {
    switch (type) {
      case 'payment_due':
        return '#ffc107';
      case 'transponder_inactive':
        return '#dc3545';
      case 'new_violation':
        return '#dc3545';
      case 'transponder_expiring':
        return '#17a2b8';
      default:
        return '#6c757d';
    }
  };

  // Helper function for alert severity color
  const getAlertSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return '#dc3545';
      case 'medium':
        return '#ffc107';
      case 'low':
        return '#17a2b8';
      default:
        return '#6c757d';
    }
  };

  // Render transponders tab
  const renderTransponders = () => {
    if (selectedTransponder) {
      return renderTransponderDetails();
    }

    return (
      <PageContainer>
        <Card title="Filtry">
          <FilterContainer>
            <FilterGroup>
              <FilterLabel>Status</FilterLabel>
              <FilterSelect
                value={transponderFilters.status}
                onChange={(e) => handleTransponderFilterChange('status', e.target.value)}
              >
                <option value="all">Wszystkie</option>
                <option value="active">Aktywne</option>
                <option value="inactive">Nieaktywne</option>
                <option value="expired">Wygasłe</option>
                <option value="pending_activation">Oczekujące na aktywację</option>
              </FilterSelect>
            </FilterGroup>
            <FilterGroup>
              <FilterLabel>Wyszukaj</FilterLabel>
              <FilterInput
                type="text"
                placeholder="Wyszukaj po ID, numerze seryjnym, pojeździe lub kierowcy"
                value={transponderFilters.search}
                onChange={(e) => handleTransponderFilterChange('search', e.target.value)}
              />
            </FilterGroup>
          </FilterContainer>
        </Card>

        <Card title="Inwentaryzacja transponderów">
          {isLoading ? (
            <LoadingContainer>
              <LoadingIndicator>Ładowanie danych...</LoadingIndicator>
            </LoadingContainer>
          ) : (
            <>
              <Table 
                headers={['ID', 'Numer seryjny', 'Status', 'Pojazd', 'Kierowca', 'Ważny do', 'Operator', 'Akcje']}
                data={transponders.items.map(transponder => [
                  transponder.id,
                  transponder.serialNumber,
                  <StatusBadge color={getStatusColor(transponder.status)}>
                    {transponder.status.replace('_', ' ')}
                  </StatusBadge>,
                  transponder.vehiclePlate,
                  transponder.assignedDriver,
                  formatDate(transponder.validTo),
                  transponder.tollOperator,
                  <ActionButton onClick={() => loadTransponderDetails(transponder.id)}>
                    Szczegóły
                  </ActionButton>
                ])}
              />

              {/* Pagination */}
              {transponders.pagination && (
                <PaginationContainer>
                  <PaginationInfo>
                    Pokazuje {((transponders.pagination.page - 1) * transponders.pagination.limit) + 1} - {
                      Math.min(transponders.pagination.page * transponders.pagination.limit, transponders.pagination.totalItems)
                    } z {transponders.pagination.totalItems} transponderów
                  </PaginationInfo>
                  <PaginationButtons>
                    <PaginationButton
                      disabled={transponders.pagination.page <= 1}
                      onClick={() => handleTransponderFilterChange('page', transponders.pagination.page - 1)}
                    >
                      Poprzednia
                    </PaginationButton>
                    <PaginationButton
                      disabled={transponders.pagination.page >= transponders.pagination.totalPages}
                      onClick={() => handleTransponderFilterChange('page', transponders.pagination.page + 1)}
                    >
                      Następna
                    </PaginationButton>
                  </PaginationButtons>
                </PaginationContainer>
              )}
            </>
          )}
        </Card>
      </PageContainer>
    );
  };

  // Render transponder details
  const renderTransponderDetails = () => {
    if (!selectedTransponder) return null;

    return (
      <PageContainer>
        <BackButton onClick={() => setSelectedTransponder(null)}>
          &larr; Powrót do listy
        </BackButton>

        <Card title={`Szczegóły transpondera ${selectedTransponder.id}`}>
          <DetailsGrid>
            <DetailsColumn>
              <DetailsTable>
                <tbody>
                  <tr>
                    <th>ID</th>
                    <td>{selectedTransponder.id}</td>
                  </tr>
                  <tr>
                    <th>Numer seryjny</th>
                    <td>{selectedTransponder.serialNumber}</td>
                  </tr>
                  <tr>
                    <th>Status</th>
                    <td>
                      <StatusBadge color={getStatusColor(selectedTransponder.status)}>
                        {selectedTransponder.status.replace('_', ' ')}
                      </StatusBadge>
                    </td>
                  </tr>
                  <tr>
                    <th>Pojazd</th>
                    <td>{selectedTransponder.vehiclePlate} ({selectedTransponder.vehicleType})</td>
                  </tr>
                  <tr>
                    <th>Kierowca</th>
                    <td>{selectedTransponder.assignedDriver}</td>
                  </tr>
                </tbody>
              </DetailsTable>
            </DetailsColumn>
            <DetailsColumn>
              <DetailsTable>
                <tbody>
                  <tr>
                    <th>Ważny od</th>
                    <td>{formatDate(selectedTransponder.validFrom)}</td>
                  </tr>
                  <tr>
                    <th>Ważny do</th>
                    <td>{formatDate(selectedTransponder.validTo)}</td>
                  </tr>
                  <tr>
                    <th>Operator</th>
                    <td>{selectedTransponder.tollOperator}</td>
                  </tr>
                  <tr>
                    <th>Ostatnio użyty</th>
                    <td>{formatDate(selectedTransponder.lastUsed)}</td>
                  </tr>
                  <tr>
                    <th>Saldo</th>
                    <td>{formatCurrency(selectedTransponder.balance)}</td>
                  </tr>
                </tbody>
              </DetailsTable>
            </DetailsColumn>
          </DetailsGrid>
        </Card>

        <TabsContainer>
          <TabsList>
            <TabItem 
              active={activeSubTab === 'usage'} 
              onClick={() => setActiveSubTab('usage')}
            >
              Historia użycia
            </TabItem>
            <TabItem 
              active={activeSubTab === 'maintenance'} 
              onClick={() => setActiveSubTab('maintenance')}
            >
              Historia konserwacji
            </TabItem>
          </TabsList>
          <TabContent>
            {activeSubTab === 'usage' ? (
              <Table 
                headers={['Data', 'Lokalizacja', 'Kwota']}
                data={selectedTransponder.usageHistory.map(usage => [
                  formatDate(usage.date),
                  usage.location,
                  formatCurrency(usage.amount)
                ])}
              />
            ) : (
              <Table 
                headers={['Data', 'Typ', 'Wykonane przez', 'Notatki']}
                data={selectedTransponder.maintenanceHistory.map(maintenance => [
                  formatDate(maintenance.date),
                  maintenance.type.replace('_', ' '),
                  maintenance.performedBy,
                  maintenance.notes
                ])}
              />
            )}
          </TabContent>
        </TabsContainer>
      </PageContainer>
    );
  };

  // Render violations tab
  const renderViolations = () => {
    if (selectedViolation) {
      return renderViolationDetails();
    }

    return (
      <PageContainer>
        <Card title="Filtry">
          <FilterContainer>
            <FilterGroup>
              <FilterLabel>Status</FilterLabel>
              <FilterSelect
                value={violationFilters.status}
                onChange={(e) => handleViolationFilterChange('status', e.target.value)}
              >
                <option value="all">Wszystkie</option>
                <option value="new">Nowe</option>
                <option value="in_progress">W trakcie</option>
                <option value="paid">Opłacone</option>
                <option value="disputed">Zakwestionowane</option>
                <option value="resolved">Rozwiązane</option>
              </FilterSelect>
            </FilterGroup>
            <FilterGroup>
              <FilterLabel>Wyszukaj</FilterLabel>
              <FilterInput
                type="text"
                placeholder="Wyszukaj po ID, pojeździe, kierowcy lub lokalizacji"
                value={violationFilters.search}
                onChange={(e) => handleViolationFilterChange('search', e.target.value)}
              />
            </FilterGroup>
          </FilterContainer>
        </Card>

        <Card title="Rejestr naruszeń">
          {isLoading ? (
            <LoadingContainer>
              <LoadingIndicator>Ładowanie danych...</LoadingIndicator>
            </LoadingContainer>
          ) : (
            <>
              <Table 
                headers={['ID', 'Data', 'Lokalizacja', 'Pojazd', 'Kierowca', 'Typ', 'Kwota', 'Status', 'Akcje']}
                data={violations.items.map(violation => [
                  violation.id,
                  formatDate(violation.date),
                  violation.location,
                  violation.vehiclePlate,
                  violation.driverName,
                  violation.type.replace('_', ' '),
                  formatCurrency(violation.amount),
                  <StatusBadge color={getStatusColor(violation.status)}>
                    {violation.status.replace('_', ' ')}
                  </StatusBadge>,
                  <ActionButton onClick={() => loadViolationDetails(violation.id)}>
                    Szczegóły
                  </ActionButton>
                ])}
              />

              {/* Pagination */}
              {violations.pagination && (
                <PaginationContainer>
                  <PaginationInfo>
                    Pokazuje {((violations.pagination.page - 1) * violations.pagination.limit) + 1} - {
                      Math.min(violations.pagination.page * violations.pagination.limit, violations.pagination.totalItems)
                    } z {violations.pagination.totalItems} naruszeń
                  </PaginationInfo>
                  <PaginationButtons>
                    <PaginationButton
                      disabled={violations.pagination.page <= 1}
                      onClick={() => handleViolationFilterChange('page', violations.pagination.page - 1)}
                    >
                      Poprzednia
                    </PaginationButton>
                    <PaginationButton
                      disabled={violations.pagination.page >= violations.pagination.totalPages}
                      onClick={() => handleViolationFilterChange('page', violations.pagination.page + 1)}
                    >
                      Następna
                    </PaginationButton>
                  </PaginationButtons>
                </PaginationContainer>
              )}
            </>
          )}
        </Card>
      </PageContainer>
    );
  };

  // Render violation details
  const renderViolationDetails = () => {
    if (!selectedViolation) return null;

    return (
      <PageContainer>
        <BackButton onClick={() => setSelectedViolation(null)}>
          &larr; Powrót do listy
        </BackButton>

        <Card title={`Szczegóły naruszenia ${selectedViolation.id}`}>
          <DetailsGrid>
            <DetailsColumn>
              <DetailsTable>
                <tbody>
                  <tr>
                    <th>ID</th>
                    <td>{selectedViolation.id}</td>
                  </tr>
                  <tr>
                    <th>Data</th>
                    <td>{formatDate(selectedViolation.date)}</td>
                  </tr>
                  <tr>
                    <th>Lokalizacja</th>
                    <td>{selectedViolation.location}</td>
                  </tr>
                  <tr>
                    <th>Pojazd</th>
                    <td>{selectedViolation.vehiclePlate}</td>
                  </tr>
                  <tr>
                    <th>Kierowca</th>
                    <td>{selectedViolation.driverName}</td>
                  </tr>
                </tbody>
              </DetailsTable>
            </DetailsColumn>
            <DetailsColumn>
              <DetailsTable>
                <tbody>
                  <tr>
                    <th>Typ</th>
                    <td>{selectedViolation.type.replace('_', ' ')}</td>
                  </tr>
                  <tr>
                    <th>Kwota</th>
                    <td>{formatCurrency(selectedViolation.amount)}</td>
                  </tr>
                  <tr>
                    <th>Status</th>
                    <td>
                      <StatusBadge color={getStatusColor(selectedViolation.status)}>
                        {selectedViolation.status.replace('_', ' ')}
                      </StatusBadge>
                    </td>
                  </tr>
                  <tr>
                    <th>Termin płatności</th>
                    <td>{formatDate(selectedViolation.dueDate)}</td>
                  </tr>
                  <tr>
                    <th>Opis</th>
                    <td>{selectedViolation.description}</td>
                  </tr>
                </tbody>
              </DetailsTable>
            </DetailsColumn>
          </DetailsGrid>
        </Card>

        <TabsContainer>
          <TabsList>
            <TabItem 
              active={activeSubTab === 'details'} 
              onClick={() => setActiveSubTab('details')}
            >
              Szczegóły
            </TabItem>
            {selectedViolation.disputeHistory && selectedViolation.disputeHistory.length > 0 && (
              <TabItem 
                active={activeSubTab === 'dispute'} 
                onClick={() => setActiveSubTab('dispute')}
              >
                Historia kwestionowania
              </TabItem>
            )}
            {selectedViolation.paymentHistory && selectedViolation.paymentHistory.length > 0 && (
              <TabItem 
                active={activeSubTab === 'payment'} 
                onClick={() => setActiveSubTab('payment')}
              >
                Historia płatności
              </TabItem>
            )}
          </TabsList>
          <TabContent>
            {activeSubTab === 'details' && (
              <div>
                <h4>Dowody naruszenia</h4>
                <p>
                  <a href={selectedViolation.evidenceUrl} target="_blank" rel="noopener noreferrer">
                    Zobacz dowód naruszenia
                  </a>
                </p>

                <h4>Akcje</h4>
                <ActionButtonsContainer>
                  <ActionButton primary>Opłać mandat</ActionButton>
                  <ActionButton warning>Zakwestionuj</ActionButton>
                  <ActionButton>Przypisz do kierowcy</ActionButton>
                </ActionButtonsContainer>
              </div>
            )}
            
            {activeSubTab === 'dispute' && selectedViolation.disputeHistory && (
              <Table 
                headers={['Data', 'Akcja', 'Powód / Wynik', 'Zgłoszone przez', 'Status']}
                data={selectedViolation.disputeHistory.map(dispute => [
                  formatDate(dispute.date),
                  dispute.action.replace('_', ' '),
                  dispute.reason ? dispute.reason.replace('_', ' ') : dispute.outcome,
                  dispute.submittedBy || dispute.processedBy,
                  dispute.status
                ])}
              />
            )}
            
            {activeSubTab === 'payment' && selectedViolation.paymentHistory && (
              <Table 
                headers={['Data', 'Kwota', 'Metoda', 'Referencja']}
                data={selectedViolation.paymentHistory.map(payment => [
                  formatDate(payment.date),
                  formatCurrency(payment.amount),
                  payment.method.replace('_', ' '),
                  payment.reference
                ])}
              />
            )}
          </TabContent>
        </TabsContainer>
      </PageContainer>
    );
  };

  // Render reports tab
  const renderReports = () => {
    if (!expenseReports) {
      return (
        <LoadingContainer>
          <LoadingIndicator>Ładowanie danych...</LoadingIndicator>
        </LoadingContainer>
      );
    }

    return (
      <PageContainer>
        <Card title="Filtry">
          <FilterContainer>
            <FilterGroup>
              <FilterLabel>Grupuj według</FilterLabel>
              <FilterSelect
                value={reportFilters.groupBy}
                onChange={(e) => handleReportFilterChange('groupBy', e.target.value)}
              >
                <option value="vehicle">Pojazd</option>
                <option value="driver">Kierowca</option>
                <option value="route">Trasa</option>
                <option value="period">Okres</option>
              </FilterSelect>
            </FilterGroup>
            <FilterGroup>
              <FilterLabel>Zakres czasu</FilterLabel>
              <FilterSelect
                value={reportFilters.timeRange}
                onChange={(e) => handleReportFilterChange('timeRange', e.target.value)}
                disabled={reportFilters.groupBy !== 'period'}
              >
                <option value="day">Dzień</option>
                <option value="week">Tydzień</option>
                <option value="month">Miesiąc</option>
              </FilterSelect>
            </FilterGroup>
          </FilterContainer>
        </Card>

        <Card title="Podsumowanie">
          <GridSection>
            <KPICard 
              title="Całkowite wydatki" 
              value={formatCurrency(expenseReports.summary.totalExpense)} 
              icon="💰"
            />
            <KPICard 
              title="Średnie wydatki" 
              value={formatCurrency(expenseReports.summary.averageExpense)} 
              icon="📊"
            />
            <KPICard 
              title="Najwyższe wydatki" 
              value={formatCurrency(expenseReports.summary.highestExpense)} 
              icon="⬆️"
            />
            <KPICard 
              title="Najniższe wydatki" 
              value={formatCurrency(expenseReports.summary.lowestExpense)} 
              icon="⬇️"
            />
          </GridSection>
        </Card>

        <Card title={`Raport wydatków ${
          reportFilters.groupBy === 'vehicle' ? 'według pojazdów' :
          reportFilters.groupBy === 'driver' ? 'według kierowców' :
          reportFilters.groupBy === 'route' ? 'według tras' :
          'według okresu'
        }`}>
          {reportFilters.groupBy === 'period' ? (
            <ChartPlaceholder>
              Wykres wydatków według okresu
            </ChartPlaceholder>
          ) : (
            <Table 
              headers={
                reportFilters.groupBy === 'vehicle' ? 
                  ['ID pojazdu', 'Numer rejestracyjny', 'Typ pojazdu', 'Całkowite wydatki', 'Liczba naruszeń', 'Koszt naruszeń', 'Najczęstsza trasa'] :
                reportFilters.groupBy === 'driver' ? 
                  ['ID kierowcy', 'Nazwa kierowcy', 'Całkowite wydatki', 'Liczba naruszeń', 'Koszt naruszeń', 'Przypisane pojazdy'] :
                  ['ID trasy', 'Nazwa trasy', 'Całkowite wydatki', 'Częstotliwość', 'Średni koszt na przejazd', 'Potencjalne oszczędności']
              }
              data={expenseReports.data.map(item => {
                if (reportFilters.groupBy === 'vehicle') {
                  return [
                    item.vehicleId,
                    item.vehiclePlate,
                    item.vehicleType,
                    formatCurrency(item.totalExpense),
                    item.violationsCount,
                    formatCurrency(item.violationsCost),
                    item.mostFrequentRoute
                  ];
                } else if (reportFilters.groupBy === 'driver') {
                  return [
                    item.driverId,
                    item.driverName,
                    formatCurrency(item.totalExpense),
                    item.violationsCount,
                    formatCurrency(item.violationsCost),
                    item.assignedVehicles
                  ];
                } else {
                  return [
                    item.routeId,
                    item.routeName,
                    formatCurrency(item.totalExpense),
                    item.frequency,
                    formatCurrency(item.averageCostPerTrip),
                    formatCurrency(item.potentialSavings)
                  ];
                }
              })}
            />
          )}
        </Card>
      </PageContainer>
    );
  };

  // Render toll operators tab
  const renderTollOperators = () => {
    if (!tollOperators || tollOperators.operators.length === 0) {
      return (
        <LoadingContainer>
          <LoadingIndicator>Ładowanie danych...</LoadingIndicator>
        </LoadingContainer>
      );
    }

    return (
      <PageContainer>
        <Card title="Operatorzy opłat drogowych">
          <Table 
            headers={['Nazwa', 'Kraj', 'Strona internetowa', 'Telefon wsparcia', 'Email wsparcia']}
            data={tollOperators.operators.map(operator => [
              operator.name,
              operator.country,
              <a href={operator.website} target="_blank" rel="noopener noreferrer">
                {operator.website}
              </a>,
              operator.supportPhone,
              <a href={`mailto:${operator.supportEmail}`}>
                {operator.supportEmail}
              </a>
            ])}
          />
        </Card>
      </PageContainer>
    );
  };

  // Render route optimization tab
  const renderRouteOptimization = () => {
    return (
      <PageContainer>
        <Card title="Wyszukaj trasę">
          <form onSubmit={handleRouteSearch}>
            <FilterContainer>
              <FilterGroup>
                <FilterLabel>Początek</FilterLabel>
                <FilterInput
                  type="text"
                  placeholder="Np. Warszawa, Polska"
                  value={routeFilters.origin}
                  onChange={(e) => handleRouteFilterChange('origin', e.target.value)}
                />
              </FilterGroup>
              <FilterGroup>
                <FilterLabel>Cel</FilterLabel>
                <FilterInput
                  type="text"
                  placeholder="Np. Berlin, Niemcy"
                  value={routeFilters.destination}
                  onChange={(e) => handleRouteFilterChange('destination', e.target.value)}
                />
              </FilterGroup>
              <FilterGroup>
                <ActionButton primary type="submit">
                  Szukaj
                </ActionButton>
              </FilterGroup>
            </FilterContainer>
          </form>
        </Card>

        {isLoading ? (
          <LoadingContainer>
            <LoadingIndicator>Ładowanie danych...</LoadingIndicator>
          </LoadingContainer>
        ) : (
          <>
            {routeOptimization.routes.length > 0 ? (
              routeOptimization.routes.map((route) => (
                <Card key={route.id} title={`${route.origin} → ${route.destination}`}>
                  <RouteHeader>
                    Dystans: {route.distance} km | Szacowany czas: {route.estimatedTime}
                  </RouteHeader>
                  <RoutesContainer>
                    <RouteCard>
                      <RouteCardHeader>Trasa standardowa</RouteCardHeader>
                      <RouteCardBody>
                        <DetailsTable>
                          <tbody>
                            <tr>
                              <th>Koszt opłat drogowych</th>
                              <td>{formatCurrency(route.standardRoute.tollCost)}</td>
                            </tr>
                            <tr>
                              <th>Koszt paliwa</th>
                              <td>{formatCurrency(route.standardRoute.fuelCost)}</td>
                            </tr>
                            <tr>
                              <th>Całkowity koszt</th>
                              <td><strong>{formatCurrency(route.standardRoute.totalCost)}</strong></td>
                            </tr>
                            <tr>
                              <th>Punkty poboru opłat</th>
                              <td>{route.standardRoute.tollPoints}</td>
                            </tr>
                          </tbody>
                        </DetailsTable>
                      </RouteCardBody>
                    </RouteCard>
                    <RouteCard>
                      <RouteCardHeader alternative>Trasa alternatywna</RouteCardHeader>
                      <RouteCardBody>
                        <DetailsTable>
                          <tbody>
                            <tr>
                              <th>Koszt opłat drogowych</th>
                              <td>{formatCurrency(route.alternativeRoute.tollCost)}</td>
                            </tr>
                            <tr>
                              <th>Koszt paliwa</th>
                              <td>{formatCurrency(route.alternativeRoute.fuelCost)}</td>
                            </tr>
                            <tr>
                              <th>Całkowity koszt</th>
                              <td><strong>{formatCurrency(route.alternativeRoute.totalCost)}</strong></td>
                            </tr>
                            <tr>
                              <th>Punkty poboru opłat</th>
                              <td>{route.alternativeRoute.tollPoints}</td>
                            </tr>
                          </tbody>
                        </DetailsTable>
                      </RouteCardBody>
                    </RouteCard>
                  </RoutesContainer>
                  
                  <SavingsAlert>
                    <strong>Potencjalne oszczędności: {formatCurrency(route.potentialSavings)}</strong>
                  </SavingsAlert>
                  
                  <ActionButtonsContainer right>
                    <ActionButton primary>Wybierz trasę alternatywną</ActionButton>
                  </ActionButtonsContainer>
                </Card>
              ))
            ) : (
              <InfoAlert>
                Brak danych o trasach. Wprowadź początek i cel, aby wyszukać trasę.
              </InfoAlert>
            )}
          </>
        )}
      </PageContainer>
    );
  };

  return (
    <Container>
      <Header>
        <Title>Opłaty Drogowe</Title>
        <DataSourceToggle>
          <DataSourceLabel>
            Użyj danych testowych
          </DataSourceLabel>
          <DataSourceSwitch 
            checked={useMockData}
            onChange={handleToggleDataSource}
          />
        </DataSourceToggle>
      </Header>

      {error && (
        <ErrorAlert>
          {error}
        </ErrorAlert>
      )}

      <TabsContainer>
        <TabsList>
          <TabItem 
            active={activeTab === 'dashboard'} 
            onClick={() => handleTabChange('dashboard')}
          >
            Dashboard
          </TabItem>
          <TabItem 
            active={activeTab === 'transponders'} 
            onClick={() => handleTabChange('transponders')}
          >
            Transpondery
          </TabItem>
          <TabItem 
            active={activeTab === 'violations'} 
            onClick={() => handleTabChange('violations')}
          >
            Naruszenia
          </TabItem>
          <TabItem 
            active={activeTab === 'reports'} 
            onClick={() => handleTabChange('reports')}
          >
            Raporty
          </TabItem>
          <TabItem 
            active={activeTab === 'operators'} 
            onClick={() => handleTabChange('operators')}
          >
            Operatorzy
          </TabItem>
          <TabItem 
            active={activeTab === 'optimization'} 
            onClick={() => handleTabChange('optimization')}
          >
            Optymalizacja tras
          </TabItem>
        </TabsList>
        <TabContent>
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'transponders' && renderTransponders()}
          {activeTab === 'violations' && renderViolations()}
          {activeTab === 'reports' && renderReports()}
          {activeTab === 'operators' && renderTollOperators()}
          {activeTab === 'optimization' && renderRouteOptimization()}
        </TabContent>
      </TabsContainer>
    </Container>
  );
};

// Styled components
const Container = styled.div`
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
  color: #333;
  margin: 0;
`;

const DataSourceToggle = styled.div`
  display: flex;
  align-items: center;
`;

const DataSourceLabel = styled.span`
  margin-right: 10px;
  font-size: 14px;
  color: #666;
`;

const DataSourceSwitch = styled.input.attrs({ type: 'checkbox' })`
  position: relative;
  width: 40px;
  height: 20px;
  appearance: none;
  background-color: #ccc;
  border-radius: 20px;
  outline: none;
  cursor: pointer;
  transition: background-color 0.3s;

  &:checked {
    background-color: #2196F3;
  }

  &:before {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    top: 2px;
    left: 2px;
    background-color: white;
    transition: transform 0.3s;
  }

  &:checked:before {
    transform: translateX(20px);
  }
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const GridSection = styled.div`
  display: grid;
  grid-template-columns: ${props => props.columns ? `repeat(${props.columns}, 1fr)` : 'repeat(4, 1fr)'};
  gap: 20px;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TabsList = styled.div`
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 16px;
`;

const TabItem = styled.div`
  padding: 10px 16px;
  cursor: pointer;
  font-weight: ${props => props.active ? '500' : 'normal'};
  color: ${props => props.active ? '#007bff' : '#333'};
  border-bottom: 2px solid ${props => props.active ? '#007bff' : 'transparent'};
  
  &:hover {
    color: #007bff;
  }
`;

const TabContent = styled.div`
  flex: 1;
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

const MapPoint = styled.div`
  position: absolute;
  top: ${props => props.y}%;
  left: ${props => props.x}%;
  width: 12px;
  height: 12px;
  background-color: ${props => props.color};
  border-radius: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  
  &:hover::after {
    content: '${props => props.title}';
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 12px;
    white-space: nowrap;
    z-index: 1;
  }
`;

const ChartPlaceholder = styled.div`
  height: 350px;
  background-color: #f5f5f5;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #666;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
`;

const LoadingIndicator = styled.div`
  color: #666;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

const FilterGroup = styled.div`
  flex: 1;
  min-width: 200px;
`;

const FilterLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
`;

const FilterSelect = styled.select`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background-color: white;
`;

const FilterInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
`;

const PaginationInfo = styled.div`
  color: #666;
  font-size: 14px;
`;

const PaginationButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const PaginationButton = styled.button`
  padding: 6px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  &:hover:not(:disabled) {
    background-color: #f5f5f5;
  }
`;

const BackButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const DetailsColumn = styled.div``;

const DetailsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 8px 12px;
    border-bottom: 1px solid #e0e0e0;
    text-align: left;
  }
  
  th {
    font-weight: 500;
    width: 40%;
  }
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

const ActionButton = styled.button`
  padding: 8px 16px;
  border: 1px solid ${props => props.primary ? '#007bff' : props.warning ? '#ffc107' : '#e0e0e0'};
  border-radius: 4px;
  background-color: ${props => props.primary ? '#007bff' : props.warning ? '#ffc107' : 'white'};
  color: ${props => props.primary ? 'white' : props.warning ? '#212529' : '#333'};
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.primary ? '#0069d9' : props.warning ? '#e0a800' : '#f5f5f5'};
  }
`;

const ActionButtonsContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
  justify-content: ${props => props.right ? 'flex-end' : 'flex-start'};
`;

const ErrorAlert = styled.div`
  padding: 12px 16px;
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  margin-bottom: 16px;
`;

const InfoAlert = styled.div`
  padding: 12px 16px;
  background-color: #d1ecf1;
  color: #0c5460;
  border: 1px solid #bee5eb;
  border-radius: 4px;
`;

const SavingsAlert = styled.div`
  padding: 12px 16px;
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
  border-radius: 4px;
  margin-top: 16px;
`;

const RoutesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const RouteCard = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
`;

const RouteCardHeader = styled.div`
  padding: 12px 16px;
  background-color: ${props => props.alternative ? '#28a745' : '#007bff'};
  color: white;
  font-weight: 500;
`;

const RouteCardBody = styled.div`
  padding: 16px;
`;

const RouteHeader = styled.div`
  color: #666;
  margin-bottom: 16px;
`;

export default RoadTolls;
