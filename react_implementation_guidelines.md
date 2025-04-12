# Struktura komponentów React dla aplikacji Fleet

## Architektura ogólna

Aplikacja Fleet będzie zbudowana w oparciu o nowoczesną architekturę React z wykorzystaniem następujących technologii:

- **React** - biblioteka do budowy interfejsu użytkownika
- **React Router** - do zarządzania nawigacją
- **Redux Toolkit** lub **Context API** - do zarządzania stanem aplikacji
- **Styled Components** lub **Tailwind CSS** - do stylizacji komponentów
- **React Query** - do zarządzania zapytaniami do API i cache'owaniem danych
- **Recharts** lub **Chart.js** - do tworzenia wykresów i wizualizacji
- **Leaflet** lub **Google Maps API** - do integracji map

## Struktura katalogów

```
src/
├── assets/            # Statyczne zasoby (obrazy, ikony, fonty)
├── components/        # Komponenty wielokrotnego użytku
│   ├── common/        # Podstawowe komponenty UI (przyciski, inputy, itp.)
│   ├── layout/        # Komponenty układu (nagłówek, menu boczne, stopka)
│   ├── dashboard/     # Komponenty dashboardu
│   ├── fraud/         # Komponenty wykrywania oszustw
│   ├── statistics/    # Komponenty statystyk
│   ├── vehicles/      # Komponenty zarządzania pojazdami
│   ├── drivers/       # Komponenty zarządzania kierowcami
│   └── maps/          # Komponenty map i geolokalizacji
├── contexts/          # Konteksty React (jeśli używamy Context API)
├── hooks/             # Własne hooki React
├── pages/             # Komponenty stron
│   ├── Dashboard/     # Strona głównego dashboardu
│   ├── FraudDetection/# Strona wykrywania oszustw
│   ├── Statistics/    # Strona statystyk
│   ├── Vehicles/      # Strona zarządzania pojazdami
│   ├── Drivers/       # Strona zarządzania kierowcami
│   └── Settings/      # Strona ustawień
├── redux/             # Konfiguracja Redux (jeśli używamy Redux)
│   ├── slices/        # Slice'y Redux Toolkit
│   └── store.js       # Konfiguracja store'a Redux
├── services/          # Serwisy do komunikacji z API
├── utils/             # Funkcje pomocnicze
├── App.js             # Główny komponent aplikacji
└── index.js           # Punkt wejściowy aplikacji
```

## Hierarchia komponentów

### Komponenty układu (Layout)

```
<App>
  <AuthProvider>
    <Layout>
      <Header />
      <Sidebar />
      <MainContent>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/fraud" element={<FraudDetection />} />
          <Route path="/statistics" element={<Statistics />} />
          {/* Inne ścieżki */}
        </Routes>
      </MainContent>
    </Layout>
  </AuthProvider>
</App>
```

### Komponenty dashboardu

```
<Dashboard>
  <KPISection>
    <KPICard title="Aktywne pojazdy" value={125} />
    <KPICard title="Aktywni kierowcy" value={98} />
    <KPICard title="Koszty dzisiaj" value="12 500 PLN" />
    <KPICard title="Potencjalne oszczędności" value="3 200 PLN" />
  </KPISection>
  
  <FraudSection>
    <SectionHeader title="Wykrywanie oszustw" />
    <FraudAlertsList alerts={alerts} />
    <FraudMap data={fraudMapData} />
    <RiskIndicator value={riskLevel} />
  </FraudSection>
  
  <StatisticsSection>
    <SectionHeader title="Statystyki floty" />
    <FuelConsumptionChart data={fuelData} />
    <DriverEfficiencyRanking drivers={topDrivers} />
    <CostStructureChart data={costData} />
    <RouteCompletionIndicator value={routeCompletionRate} />
  </StatisticsSection>
  
  <VehicleMonitoringSection>
    <SectionHeader title="Monitoring pojazdów" />
    <VehicleMap vehicles={activeVehicles} />
    <VehicleStatusCards statuses={vehicleStatuses} />
  </VehicleMonitoringSection>
</Dashboard>
```

### Komponenty wykrywania oszustw

```
<FraudDetection>
  <FraudOverview>
    <FraudIndicators data={fraudMetrics} />
    <RiskHeatMap data={riskMapData} />
    <FraudTrendChart data={trendData} />
  </FraudOverview>
  
  <FraudAlerts>
    <AlertFilters onFilterChange={handleFilterChange} />
    <AlertsTable alerts={filteredAlerts} onAlertSelect={handleAlertSelect} />
    <AlertDetails alert={selectedAlert} />
    <VerificationTools alert={selectedAlert} onVerify={handleVerify} />
  </FraudAlerts>
  
  <TransactionAnalysis>
    <TransactionSearch onSearch={handleSearch} />
    <TransactionComparison transactions={selectedTransactions} />
    <AnomalyDetection anomalies={detectedAnomalies} />
  </TransactionAnalysis>
  
  <DetectionRules>
    <RulesList rules={detectionRules} onRuleSelect={handleRuleSelect} />
    <RuleEditor rule={selectedRule} onSave={handleRuleSave} />
    <RuleTester rule={selectedRule} onTest={handleRuleTest} />
  </DetectionRules>
</FraudDetection>
```

## Zarządzanie stanem aplikacji

### Struktura stanu Redux

```javascript
{
  auth: {
    user: { id, name, role, ... },
    isAuthenticated: true,
    loading: false,
    error: null
  },
  vehicles: {
    items: [...],
    loading: false,
    error: null,
    filters: { ... },
    selectedVehicle: { ... }
  },
  drivers: {
    items: [...],
    loading: false,
    error: null,
    filters: { ... },
    selectedDriver: { ... }
  },
  fraud: {
    alerts: [...],
    loading: false,
    error: null,
    filters: { ... },
    selectedAlert: { ... },
    riskLevel: 0.75,
    detectionRules: [...]
  },
  statistics: {
    kpis: { ... },
    fuelData: [...],
    costData: [...],
    driverEfficiency: [...],
    loading: false,
    error: null,
    timeRange: 'month'
  },
  maps: {
    vehicles: [...],
    fraudLocations: [...],
    center: { lat, lng },
    zoom: 8
  },
  ui: {
    sidebarOpen: true,
    currentTheme: 'light',
    notifications: [...],
    modal: { isOpen: false, type: null, data: null }
  }
}
```

### Hooki niestandardowe

```javascript
// Hook do zarządzania danymi pojazdów
const useVehicles = (filters) => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(state => state.vehicles);
  
  useEffect(() => {
    dispatch(fetchVehicles(filters));
  }, [dispatch, filters]);
  
  return { vehicles: items, loading, error };
};

// Hook do zarządzania alertami o oszustwach
const useFraudAlerts = (filters) => {
  const dispatch = useDispatch();
  const { alerts, loading, error } = useSelector(state => state.fraud);
  
  useEffect(() => {
    dispatch(fetchFraudAlerts(filters));
  }, [dispatch, filters]);
  
  return { alerts, loading, error };
};

// Hook do zarządzania statystykami
const useStatistics = (timeRange) => {
  const dispatch = useDispatch();
  const { kpis, fuelData, costData, driverEfficiency, loading, error } = useSelector(state => state.statistics);
  
  useEffect(() => {
    dispatch(fetchStatistics(timeRange));
  }, [dispatch, timeRange]);
  
  return { kpis, fuelData, costData, driverEfficiency, loading, error };
};
```

## Responsywność

Aplikacja będzie responsywna dzięki zastosowaniu:

1. **Media queries** - dla różnych rozmiarów ekranów
2. **Flexbox i Grid** - do elastycznego układu komponentów
3. **Podejścia Mobile First** - projektowanie zaczynając od urządzeń mobilnych
4. **Conditional rendering** - wyświetlanie różnych komponentów w zależności od rozmiaru ekranu

```javascript
// Przykład komponentu responsywnego
const ResponsiveDashboard = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  
  return (
    <div className="dashboard">
      {isMobile ? (
        <MobileDashboardView />
      ) : (
        <DesktopDashboardView />
      )}
    </div>
  );
};
```

## Zarządzanie rolami użytkowników

Dostęp do różnych funkcji aplikacji będzie kontrolowany na podstawie roli użytkownika:

```javascript
// Hook do sprawdzania uprawnień
const usePermissions = () => {
  const { user } = useSelector(state => state.auth);
  
  const hasPermission = (permission) => {
    const rolePermissions = {
      admin: ['all'],
      fleetManager: ['dashboard', 'vehicles', 'drivers', 'statistics', 'fraud.view'],
      fraudAnalyst: ['dashboard.limited', 'fraud.all', 'statistics.fraud'],
      dispatcher: ['dashboard.limited', 'vehicles.view', 'routes'],
      driver: ['myRoutes', 'myVehicle', 'myStatistics']
    };
    
    if (rolePermissions[user.role].includes('all')) return true;
    return rolePermissions[user.role].includes(permission);
  };
  
  return { hasPermission };
};

// Komponent warunkowego renderowania na podstawie uprawnień
const PermissionGate = ({ permission, children }) => {
  const { hasPermission } = usePermissions();
  
  if (!hasPermission(permission)) return null;
  return children;
};
```

## Integracja z API

Komunikacja z backendem będzie realizowana za pomocą serwisów API:

```javascript
// Przykładowy serwis API
const fraudService = {
  getAlerts: async (filters) => {
    try {
      const response = await api.get('/fraud/alerts', { params: filters });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch fraud alerts');
    }
  },
  
  getAlertDetails: async (alertId) => {
    try {
      const response = await api.get(`/fraud/alerts/${alertId}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch alert details');
    }
  },
  
  updateAlertStatus: async (alertId, status) => {
    try {
      const response = await api.patch(`/fraud/alerts/${alertId}`, { status });
      return response.data;
    } catch (error) {
      throw new Error('Failed to update alert status');
    }
  }
};
```

## Wytyczne dla implementacji

1. **Modularność** - każdy komponent powinien mieć jedną odpowiedzialność
2. **Reużywalność** - komponenty powinny być projektowane z myślą o wielokrotnym użyciu
3. **Wydajność** - unikać niepotrzebnych renderowań, używać memoizacji
4. **Dostępność** - zapewnić zgodność z WCAG 2.1
5. **Testowanie** - pisać testy jednostkowe i integracyjne
6. **Dokumentacja** - dokumentować komponenty i ich API
7. **Spójność** - zachować spójny styl kodu i nazewnictwo
