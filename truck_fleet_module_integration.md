# Integracja modułu zarządzania flotą tirów z istniejącą funkcjonalnością

## 1. Integracja z główną aplikacją

### 1.1. Modyfikacja App.jsx

Aby zintegrować moduł zarządzania flotą tirów z istniejącą aplikacją, należy dodać nowe trasy w głównym pliku App.jsx:

```jsx
// Dodanie importów dla komponentów floty tirów
import TruckFleetDashboard from './pages/TruckFleet/TruckFleetDashboard';
import TruckManagement from './pages/TruckFleet/TruckManagement';
import TrailerManagement from './pages/TruckFleet/TrailerManagement';
import TruckDrivers from './pages/TruckFleet/TruckDrivers';
import WorkTimeTracking from './pages/TruckFleet/WorkTimeTracking';
import RouteOptimization from './pages/TruckFleet/RouteOptimization';
import CargoPlanning from './pages/TruckFleet/CargoPlanning';
import TollManagement from './pages/TruckFleet/TollManagement';
import TruckService from './pages/TruckFleet/TruckService';
import TruckDocuments from './pages/TruckFleet/TruckDocuments';

// Dodanie tras dla modułu floty tirów w komponencie Routes
<Route path="/truck-fleet" element={
  <Layout>
    <TruckFleetDashboard />
  </Layout>
} key="truck-fleet-dashboard-route" />

<Route path="/truck-fleet/trucks" element={
  <Layout>
    <TruckManagement />
  </Layout>
} key="truck-management-route" />

<Route path="/truck-fleet/trailers" element={
  <Layout>
    <TrailerManagement />
  </Layout>
} key="trailer-management-route" />

<Route path="/truck-fleet/drivers" element={
  <Layout>
    <TruckDrivers />
  </Layout>
} key="truck-drivers-route" />

<Route path="/truck-fleet/work-time" element={
  <Layout>
    <WorkTimeTracking />
  </Layout>
} key="work-time-tracking-route" />

<Route path="/truck-fleet/routes" element={
  <Layout>
    <RouteOptimization />
  </Layout>
} key="route-optimization-route" />

<Route path="/truck-fleet/cargo" element={
  <Layout>
    <CargoPlanning />
  </Layout>
} key="cargo-planning-route" />

<Route path="/truck-fleet/tolls" element={
  <Layout>
    <TollManagement />
  </Layout>
} key="toll-management-route" />

<Route path="/truck-fleet/service" element={
  <Layout>
    <TruckService />
  </Layout>
} key="truck-service-route" />

<Route path="/truck-fleet/documents" element={
  <Layout>
    <TruckDocuments />
  </Layout>
} key="truck-documents-route" />
```

### 1.2. Rozszerzenie menu nawigacyjnego

Należy rozszerzyć istniejący komponent Layout o sekcję dla floty tirów w menu nawigacyjnym:

```jsx
// W komponencie Layout.jsx dodać nową sekcję menu
<div className="sidebar-section">
  <h3 className="sidebar-title">Flota Tirów</h3>
  <ul className="sidebar-menu">
    <li className="sidebar-menu-item">
      <NavLink to="/truck-fleet" className={({ isActive }) => isActive ? 'active' : ''}>
        <span className="sidebar-icon dashboard-icon"></span>
        Dashboard
      </NavLink>
    </li>
    <li className="sidebar-menu-item">
      <NavLink to="/truck-fleet/trucks" className={({ isActive }) => isActive ? 'active' : ''}>
        <span className="sidebar-icon truck-icon"></span>
        Ciągniki
      </NavLink>
    </li>
    <li className="sidebar-menu-item">
      <NavLink to="/truck-fleet/trailers" className={({ isActive }) => isActive ? 'active' : ''}>
        <span className="sidebar-icon trailer-icon"></span>
        Naczepy
      </NavLink>
    </li>
    <li className="sidebar-menu-item">
      <NavLink to="/truck-fleet/drivers" className={({ isActive }) => isActive ? 'active' : ''}>
        <span className="sidebar-icon driver-icon"></span>
        Kierowcy
      </NavLink>
    </li>
    <li className="sidebar-menu-item">
      <NavLink to="/truck-fleet/work-time" className={({ isActive }) => isActive ? 'active' : ''}>
        <span className="sidebar-icon time-icon"></span>
        Czas pracy
      </NavLink>
    </li>
    <li className="sidebar-menu-item">
      <NavLink to="/truck-fleet/routes" className={({ isActive }) => isActive ? 'active' : ''}>
        <span className="sidebar-icon route-icon"></span>
        Trasy
      </NavLink>
    </li>
    <li className="sidebar-menu-item">
      <NavLink to="/truck-fleet/cargo" className={({ isActive }) => isActive ? 'active' : ''}>
        <span className="sidebar-icon cargo-icon"></span>
        Ładunki
      </NavLink>
    </li>
    <li className="sidebar-menu-item">
      <NavLink to="/truck-fleet/tolls" className={({ isActive }) => isActive ? 'active' : ''}>
        <span className="sidebar-icon toll-icon"></span>
        Opłaty drogowe
      </NavLink>
    </li>
    <li className="sidebar-menu-item">
      <NavLink to="/truck-fleet/service" className={({ isActive }) => isActive ? 'active' : ''}>
        <span className="sidebar-icon service-icon"></span>
        Serwis
      </NavLink>
    </li>
    <li className="sidebar-menu-item">
      <NavLink to="/truck-fleet/documents" className={({ isActive }) => isActive ? 'active' : ''}>
        <span className="sidebar-icon document-icon"></span>
        Dokumenty
      </NavLink>
    </li>
  </ul>
</div>
```

## 2. Integracja z modułem Settings

### 2.1. Rozszerzenie FleetConfiguration

Należy rozszerzyć istniejący komponent FleetConfiguration o parametry specyficzne dla tirów:

```jsx
// W komponencie FleetConfiguration.jsx dodać nową sekcję dla parametrów tirów
<SettingsCard title="Parametry ciągników siodłowych">
  <p className="settings-description">
    Ustaw standardowe parametry dla ciągników siodłowych.
  </p>
  
  <h4 className="parameter-section-title">Progi zużycia paliwa (l/100km)</h4>
  <div className="parameter-grid">
    {Object.entries(configuration.truckParameters.fuelConsumptionThresholds).map(([category, value]) => (
      <div key={category} className="parameter-item">
        <SettingsInput
          label={getTruckCategoryLabel(category)}
          value={value}
          type="number"
          onChange={(e) => handleTruckParameterChange(category, 'fuelConsumptionThresholds', e.target.value)}
        />
      </div>
    ))}
  </div>
  
  <h4 className="parameter-section-title">Limity przebiegu (km/rok)</h4>
  <div className="parameter-grid">
    {Object.entries(configuration.truckParameters.mileageLimits).map(([category, value]) => (
      <div key={category} className="parameter-item">
        <SettingsInput
          label={getTruckCategoryLabel(category)}
          value={value}
          type="number"
          onChange={(e) => handleTruckParameterChange(category, 'mileageLimits', e.target.value)}
        />
      </div>
    ))}
  </div>
  
  <h4 className="parameter-section-title">Cykle serwisowe (km)</h4>
  <div className="parameter-grid">
    {Object.entries(configuration.truckParameters.serviceCycles).map(([category, value]) => (
      <div key={category} className="parameter-item">
        <SettingsInput
          label={getTruckCategoryLabel(category)}
          value={value}
          type="number"
          onChange={(e) => handleTruckParameterChange(category, 'serviceCycles', e.target.value)}
        />
      </div>
    ))}
  </div>
</SettingsCard>

<SettingsCard title="Parametry naczep">
  <p className="settings-description">
    Ustaw standardowe parametry dla różnych typów naczep.
  </p>
  
  <h4 className="parameter-section-title">Cykle serwisowe (km)</h4>
  <div className="parameter-grid">
    {Object.entries(configuration.trailerParameters.serviceCycles).map(([category, value]) => (
      <div key={category} className="parameter-item">
        <SettingsInput
          label={getTrailerCategoryLabel(category)}
          value={value}
          type="number"
          onChange={(e) => handleTrailerParameterChange(category, 'serviceCycles', e.target.value)}
        />
      </div>
    ))}
  </div>
  
  <h4 className="parameter-section-title">Limity przebiegu (km/rok)</h4>
  <div className="parameter-grid">
    {Object.entries(configuration.trailerParameters.mileageLimits).map(([category, value]) => (
      <div key={category} className="parameter-item">
        <SettingsInput
          label={getTrailerCategoryLabel(category)}
          value={value}
          type="number"
          onChange={(e) => handleTrailerParameterChange(category, 'mileageLimits', e.target.value)}
        />
      </div>
    ))}
  </div>
</SettingsCard>

<SettingsCard title="Parametry czasu pracy kierowców">
  <p className="settings-description">
    Ustaw parametry czasu pracy kierowców zgodnie z przepisami.
  </p>
  
  <h4 className="parameter-section-title">Limity czasu jazdy</h4>
  <div className="parameter-grid">
    <div className="parameter-item">
      <SettingsInput
        label="Dzienny limit jazdy (godz.)"
        value={configuration.driverWorkTime.dailyDrivingLimit}
        type="number"
        onChange={(e) => handleWorkTimeParameterChange('dailyDrivingLimit', e.target.value)}
      />
    </div>
    <div className="parameter-item">
      <SettingsInput
        label="Tygodniowy limit jazdy (godz.)"
        value={configuration.driverWorkTime.weeklyDrivingLimit}
        type="number"
        onChange={(e) => handleWorkTimeParameterChange('weeklyDrivingLimit', e.target.value)}
      />
    </div>
    <div className="parameter-item">
      <SettingsInput
        label="Dwutygodniowy limit jazdy (godz.)"
        value={configuration.driverWorkTime.biWeeklyDrivingLimit}
        type="number"
        onChange={(e) => handleWorkTimeParameterChange('biWeeklyDrivingLimit', e.target.value)}
      />
    </div>
  </div>
  
  <h4 className="parameter-section-title">Wymagane przerwy i odpoczynki</h4>
  <div className="parameter-grid">
    <div className="parameter-item">
      <SettingsInput
        label="Przerwa po ciągłej jeździe (min.)"
        value={configuration.driverWorkTime.breakAfterDriving}
        type="number"
        onChange={(e) => handleWorkTimeParameterChange('breakAfterDriving', e.target.value)}
      />
    </div>
    <div className="parameter-item">
      <SettingsInput
        label="Dzienny odpoczynek (godz.)"
        value={configuration.driverWorkTime.dailyRest}
        type="number"
        onChange={(e) => handleWorkTimeParameterChange('dailyRest', e.target.value)}
      />
    </div>
    <div className="parameter-item">
      <SettingsInput
        label="Tygodniowy odpoczynek (godz.)"
        value={configuration.driverWorkTime.weeklyRest}
        type="number"
        onChange={(e) => handleWorkTimeParameterChange('weeklyRest', e.target.value)}
      />
    </div>
  </div>
</SettingsCard>
```

### 2.2. Dodanie nowego komponentu TruckFleetSettings

Należy utworzyć nowy komponent TruckFleetSettings w sekcji Settings:

```jsx
// Nowy komponent TruckFleetSettings.jsx
import React, { useState, useEffect } from 'react';
import './TruckFleetSettings.css';
import SettingsCard from '../common/SettingsCard';
import SettingsInput from '../common/SettingsInput';
import SettingsSelect from '../common/SettingsSelect';
import SettingsToggle from '../common/SettingsToggle';
import SettingsButton from '../common/SettingsButton';
import mockSettingsService from '../../../services/api/mockSettingsService';

/**
 * TruckFleetSettings component
 * 
 * This component allows users to configure truck fleet specific settings:
 * - Toll systems configuration
 * - Tachograph settings
 * - International transport settings
 * - ADR settings
 * 
 * @returns {JSX.Element} TruckFleetSettings component
 */
const TruckFleetSettings = () => {
  // State for truck fleet settings
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saveStatus, setSaveStatus] = useState(null);
  
  // Fetch truck fleet settings
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const data = await mockSettingsService.getTruckFleetSettings();
        setSettings(data);
        setError(null);
      } catch (err) {
        setError('Nie udało się pobrać ustawień floty tirów');
        console.error('Error fetching truck fleet settings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // Handle settings change
  const handleSettingChange = (section, setting, value) => {
    setSettings({
      ...settings,
      [section]: {
        ...settings[section],
        [setting]: value
      }
    });
  };

  // Save settings
  const handleSaveSettings = async () => {
    try {
      setSaveStatus('saving');
      await mockSettingsService.updateTruckFleetSettings(settings);
      setSaveStatus('success');
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setSaveStatus(null);
      }, 3000);
    } catch (err) {
      setSaveStatus('error');
      console.error('Error saving truck fleet settings:', err);
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setSaveStatus(null);
      }, 3000);
    }
  };

  // Show loading state
  if (loading) {
    return <div className="settings-loading">Ładowanie ustawień floty tirów...</div>;
  }

  // Show error state
  if (error) {
    return <div className="settings-error">{error}</div>;
  }

  // Show settings
  return (
    <div className="truck-fleet-settings">
      <SettingsCard title="Systemy opłat drogowych">
        <p className="settings-description">
          Skonfiguruj systemy opłat drogowych używane przez Twoją flotę.
        </p>
        
        {settings.tollSystems.map((system, index) => (
          <div key={index} className="toll-system-item">
            <div className="settings-form-row">
              <SettingsToggle
                label={system.name}
                checked={system.enabled}
                onChange={() => {
                  const updatedSystems = [...settings.tollSystems];
                  updatedSystems[index].enabled = !system.enabled;
                  setSettings({
                    ...settings,
                    tollSystems: updatedSystems
                  });
                }}
              />
            </div>
            
            {system.enabled && (
              <div className="toll-system-details">
                <div className="settings-form-row">
                  <SettingsInput
                    label="Numer konta"
                    value={system.accountNumber}
                    onChange={(e) => {
                      const updatedSystems = [...settings.tollSystems];
                      updatedSystems[index].accountNumber = e.target.value;
                      setSettings({
                        ...settings,
                        tollSystems: updatedSystems
                      });
                    }}
                  />
                </div>
                
                <div className="settings-form-row">
                  <SettingsSelect
                    label="Metoda płatności"
                    value={system.paymentMethod}
                    options={[
                      { value: 'prepaid', label: 'Przedpłata' },
                      { value: 'postpaid', label: 'Płatność po fakcie' },
                      { value: 'card', label: 'Karta płatnicza' }
                    ]}
                    onChange={(e) => {
                      const updatedSystems = [...settings.tollSystems];
                      updatedSystems[index].paymentMethod = e.target.value;
                      setSettings({
                        ...settings,
                        tollSystems: updatedSystems
                      });
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </SettingsCard>

      <SettingsCard title="Ustawienia tachografów">
        <p className="settings-description">
          Skonfiguruj ustawienia związane z tachografami i czasem pracy kierowców.
        </p>
        
        <div className="settings-form-row">
          <SettingsSelect
            label="Domyślny typ tachografu"
            value={settings.tachograph.defaultType}
            options={[
              { value: 'digital', label: 'Cyfrowy' },
              { value: 'analog', label: 'Analogowy' }
            ]}
            onChange={(e) => handleSettingChange('tachograph', 'defaultType', e.target.value)}
          />
        </div>
        
        <div className="settings-form-row">
          <SettingsInput
            label="Częstotliwość pobierania danych (dni)"
            value={settings.tachograph.downloadFrequency}
            type="number"
            onChange={(e) => handleSettingChange('tachograph', 'downloadFrequency', parseInt(e.target.value))}
          />
        </div>
        
        <div className="settings-form-row">
          <SettingsToggle
            label="Automatyczne powiadomienia o naruszeniach"
            checked={settings.tachograph.autoNotifyViolations}
            onChange={() => handleSettingChange('tachograph', 'autoNotifyViolations', !settings.tachograph.autoNotifyViolations)}
          />
        </div>
        
        <div className="settings-form-row">
          <SettingsToggle
            label="Generowanie raportów zgodności"
            checked={settings.tachograph.generateComplianceReports}
            onChange={() => handleSettingChange('tachograph', 'generateComplianceReports', !settings.tachograph.generateComplianceReports)}
          />
        </div>
      </SettingsCard>

      <SettingsCard title="Ustawienia transportu międzynarodowego">
        <p className="settings-description">
          Skonfiguruj ustawienia związane z transportem międzynarodowym.
        </p>
        
        <div className="settings-form-row">
          <SettingsToggle
            label="Karnety TIR"
            checked={settings.international.useTIRCarnets}
            onChange={() => handleSettingChange('international', 'useTIRCarnets', !settings.international.useTIRCarnets)}
          />
        </div>
        
        <div className="settings-form-row">
          <SettingsToggle
            label="Dokumenty T1/T2"
            checked={settings.international.useT1T2Documents}
            onChange={() => handleSettingChange('international', 'useT1T2Documents', !settings.international.useT1T2Documents)}
          />
        </div>
        
        <div className="settings-form-row">
          <SettingsToggle
            label="Dokumenty CMR"
            checked={settings.international.useCMR}
            onChange={() => handleSettingChange('international', 'useCMR', !settings.international.useCMR)}
          />
        </div>
        
        <div className="settings-form-row">
          <SettingsSelect
            label="Domyślna waluta"
            value={settings.international.defaultCurrency}
            options={[
              { value: 'PLN', label: 'PLN - Polski złoty' },
              { value: 'EUR', label: 'EUR - Euro' },
              { value: 'USD', label: 'USD - Dolar amerykański' }
            ]}
            onChange={(e) => handleSettingChange('international', 'defaultCurrency', e.target.value)}
          />
        </div>
      </SettingsCard>

      <SettingsCard title="Ustawienia ADR">
        <p className="settings-description">
          Skonfiguruj ustawienia związane z przewozem materiałów niebezpiecznych (ADR).
        </p>
        
        <div className="settings-form-row">
          <SettingsToggle
            label="Przewóz materiałów niebezpiecznych"
            checked={settings.adr.enabled}
            onChange={() => handleSettingChange('adr', 'enabled', !settings.adr.enabled)}
          />
        </div>
        
        {settings.adr.enabled && (
          <>
            <div className="settings-form-row">
              <SettingsToggle
                label="Automatyczne sprawdzanie kwalifikacji kierowców"
                checked={settings.adr.checkDriverQualifications}
                onChange={() => handleSettingChange('adr', 'checkDriverQualifications', !settings.adr.checkDriverQualifications)}
              />
            </div>
            
            <div className="settings-form-row">
              <SettingsToggle
                label="Automatyczne sprawdzanie wyposażenia pojazdów"
                checked={settings.adr.checkVehicleEquipment}
                onChange={() => handleSettingChange('adr', 'checkVehicleEquipment', !settings.adr.checkVehicleEquipment)}
              />
            </div>
            
            <div className="settings-form-row">
              <SettingsToggle
                label="Powiadomienia o wygasających certyfikatach"
                checked={settings.adr.notifyExpiringCertificates}
                onChange={() => handleSettingChange('adr', 'notifyExpiringCertificates', !settings.adr.notifyExpiringCertificates)}
              />
            </div>
            
            <div className="settings-form-row">
              <SettingsInput
                label="Wyprzedzenie powiadomień (dni)"
                value={settings.adr.notificationAdvanceDays}
                type="number"
                onChange={(e) => handleSettingChange('adr', 'notificationAdvanceDays', parseInt(e.target.value))}
              />
            </div>
          </>
        )}
      </SettingsCard>

      <div className="settings-actions">
        <SettingsButton 
          type="primary" 
          onClick={handleSaveSettings}
          disabled={saveStatus === 'saving'}
        >
          {saveStatus === 'saving' ? 'Zapisywanie...' : 'Zapisz ustawienia'}
        </SettingsButton>
        
        {saveStatus === 'success' && (
          <div className="settings-save-status settings-save-success">
            Ustawienia zostały zapisane pomyślnie.
          </div>
        )}
        
        {saveStatus === 'error' && (
          <div className="settings-save-status settings-save-error">
            Wystąpił błąd podczas zapisywania ustawień.
          </div>
        )}
      </div>
    </div>
  );
};

export default TruckFleetSettings;
```

### 2.3. Dodanie trasy do TruckFleetSettings w App.jsx

```jsx
// Dodanie importu
import TruckFleetSettings from './pages/Settings/TruckFleetSettings';

// Dodanie trasy
<Route path="/settings/truck-fleet" element={
  <Layout>
    <TruckFleetSettings />
  </Layout>
} key="settings-truck-fleet-route" />
```

### 2.4. Dodanie linku do TruckFleetSettings w komponencie Settings

```jsx
// W komponencie Settings.jsx dodać link do ustawień floty tirów
<li>
  <Link to="/settings/truck-fleet" className="settings-link">
    <strong>Flota Tirów</strong>
  </Link> - Konfiguracja ustawień specyficznych dla floty tirów
</li>
```

## 3. Integracja z modułem Statistics

### 3.1. Rozszerzenie StatisticsDashboard

Należy rozszerzyć istniejący komponent StatisticsDashboard o wskaźniki KPI dla floty tirów:

```jsx
// W komponencie StatisticsDashboard.jsx dodać nową sekcję dla KPI floty tirów
<div className="statistics-section">
  <h2 className="statistics-section-title">Flota Tirów - Kluczowe wskaźniki</h2>
  <div className="statistics-cards">
    <StatisticsCard
      title="Średnie zużycie paliwa"
      value={`${truckFleetKPIs.averageFuelConsumption} l/100km`}
      trend={truckFleetKPIs.fuelConsumptionTrend}
      trendInverted={true}
      status={truckFleetKPIs.fuelConsumptionStatus}
    />
    <StatisticsCard
      title="Średni przebieg dzienny"
      value={`${truckFleetKPIs.averageDailyMileage} km`}
      trend={truckFleetKPIs.dailyMileageTrend}
      status={truckFleetKPIs.dailyMileageStatus}
    />
    <StatisticsCard
      title="Wykorzystanie czasu pracy"
      value={`${truckFleetKPIs.workTimeUtilization}%`}
      trend={truckFleetKPIs.workTimeUtilizationTrend}
      status={truckFleetKPIs.workTimeUtilizationStatus}
    />
    <StatisticsCard
      title="Zgodność z czasem pracy"
      value={`${truckFleetKPIs.workTimeCompliance}%`}
      trend={truckFleetKPIs.workTimeComplianceTrend}
      status={truckFleetKPIs.workTimeComplianceStatus}
    />
  </div>
</div>
```

### 3.2. Dodanie nowych komponentów analitycznych

Należy utworzyć nowe komponenty analityczne dla floty tirów:

```jsx
// Nowy komponent TruckFleetPerformanceStats.jsx
import React, { useState, useEffect } from 'react';
import './TruckFleetPerformanceStats.css';
import StatisticsChart from '../common/StatisticsChart';
import StatisticsTable from '../common/StatisticsTable';
import StatisticsFilter from '../common/StatisticsFilter';
import statisticsService from '../../../services/api/statisticsService';

/**
 * TruckFleetPerformanceStats component
 * 
 * This component displays performance statistics for truck fleet
 * 
 * @returns {JSX.Element} TruckFleetPerformanceStats component
 */
const TruckFleetPerformanceStats = () => {
  // State for data
  const [performanceData, setPerformanceData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for filters
  const [timeRange, setTimeRange] = useState('month');
  const [vehicleType, setVehicleType] = useState('all');
  
  // Fetch performance data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await statisticsService.getTruckFleetPerformance({
          timeRange,
          vehicleType
        });
        setPerformanceData(data);
        setError(null);
      } catch (err) {
        setError('Nie udało się pobrać danych wydajności floty tirów');
        console.error('Error fetching truck fleet performance data:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [timeRange, vehicleType]);
  
  // Handle time range change
  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
  };
  
  // Handle vehicle type change
  const handleVehicleTypeChange = (type) => {
    setVehicleType(type);
  };
  
  // Show loading state
  if (isLoading) {
    return <div className="statistics-loading">Ładowanie danych wydajności floty tirów...</div>;
  }
  
  // Show error state
  if (error) {
    return <div className="statistics-error">{error}</div>;
  }
  
  // Prepare chart data
  const fuelConsumptionChartData = {
    labels: performanceData.fuelConsumption.map(item => item.label),
    datasets: [
      {
        label: 'Zużycie paliwa (l/100km)',
        data: performanceData.fuelConsumption.map(item => item.value),
        borderColor: '#3f51b5',
        backgroundColor: 'rgba(63, 81, 181, 0.2)',
        fill: true
      }
    ]
  };
  
  const mileageChartData = {
    labels: performanceData.mileage.map(item => item.label),
    datasets: [
      {
        label: 'Przebieg (km)',
        data: performanceData.mileage.map(item => item.value),
        borderColor: '#4caf50',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        fill: true
      }
    ]
  };
  
  const workTimeChartData = {
    labels: performanceData.workTime.map(item => item.label),
    datasets: [
      {
        label: 'Czas jazdy (godz.)',
        data: performanceData.workTime.map(item => item.driving),
        borderColor: '#f44336',
        backgroundColor: 'rgba(244, 67, 54, 0.2)',
        fill: true
      },
      {
        label: 'Czas odpoczynku (godz.)',
        data: performanceData.workTime.map(item => item.rest),
        borderColor: '#2196f3',
        backgroundColor: 'rgba(33, 150, 243, 0.2)',
        fill: true
      },
      {
        label: 'Inny czas pracy (godz.)',
        data: performanceData.workTime.map(item => item.otherWork),
        borderColor: '#ff9800',
        backgroundColor: 'rgba(255, 152, 0, 0.2)',
        fill: true
      }
    ]
  };
  
  // Prepare table data
  const tableHeaders = ['Pojazd', 'Kierowca', 'Przebieg (km)', 'Zużycie paliwa (l/100km)', 'Czas jazdy (godz.)', 'Zgodność z czasem pracy (%)'];
  const tableData = performanceData.vehicles.map(vehicle => [
    vehicle.registrationNumber,
    vehicle.driver,
    vehicle.mileage.toLocaleString(),
    vehicle.fuelConsumption.toFixed(1),
    vehicle.drivingTime.toFixed(1),
    vehicle.workTimeCompliance.toFixed(0) + '%'
  ]);
  
  return (
    <div className="truck-fleet-performance-stats">
      <div className="statistics-filters">
        <StatisticsFilter
          label="Zakres czasu"
          value={timeRange}
          options={[
            { value: 'week', label: 'Tydzień' },
            { value: 'month', label: 'Miesiąc' },
            { value: 'quarter', label: 'Kwartał' },
            { value: 'year', label: 'Rok' }
          ]}
          onChange={handleTimeRangeChange}
        />
        
        <StatisticsFilter
          label="Typ pojazdu"
          value={vehicleType}
          options={[
            { value: 'all', label: 'Wszystkie' },
            { value: 'truck', label: 'Ciągniki' },
            { value: 'trailer', label: 'Naczepy' }
          ]}
          onChange={handleVehicleTypeChange}
        />
      </div>
      
      <div className="statistics-charts">
        <div className="statistics-chart-container">
          <h3 className="statistics-chart-title">Zużycie paliwa</h3>
          <StatisticsChart
            type="line"
            data={fuelConsumptionChartData}
            options={{
              scales: {
                y: {
                  beginAtZero: false,
                  title: {
                    display: true,
                    text: 'l/100km'
                  }
                }
              }
            }}
          />
        </div>
        
        <div className="statistics-chart-container">
          <h3 className="statistics-chart-title">Przebieg</h3>
          <StatisticsChart
            type="line"
            data={mileageChartData}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: 'km'
                  }
                }
              }
            }}
          />
        </div>
        
        <div className="statistics-chart-container">
          <h3 className="statistics-chart-title">Czas pracy</h3>
          <StatisticsChart
            type="bar"
            data={workTimeChartData}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                  stacked: true,
                  title: {
                    display: true,
                    text: 'godz.'
                  }
                },
                x: {
                  stacked: true
                }
              }
            }}
          />
        </div>
      </div>
      
      <div className="statistics-table-container">
        <h3 className="statistics-table-title">Wydajność pojazdów</h3>
        <StatisticsTable
          headers={tableHeaders}
          data={tableData}
        />
      </div>
    </div>
  );
};

export default TruckFleetPerformanceStats;
```

### 3.3. Dodanie nowego komponentu WorkTimeComplianceStats

```jsx
// Nowy komponent WorkTimeComplianceStats.jsx
import React, { useState, useEffect } from 'react';
import './WorkTimeComplianceStats.css';
import StatisticsChart from '../common/StatisticsChart';
import StatisticsTable from '../common/StatisticsTable';
import StatisticsFilter from '../common/StatisticsFilter';
import statisticsService from '../../../services/api/statisticsService';

/**
 * WorkTimeComplianceStats component
 * 
 * This component displays work time compliance statistics for truck drivers
 * 
 * @returns {JSX.Element} WorkTimeComplianceStats component
 */
const WorkTimeComplianceStats = () => {
  // State for data
  const [complianceData, setComplianceData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for filters
  const [timeRange, setTimeRange] = useState('month');
  const [driverGroup, setDriverGroup] = useState('all');
  
  // Fetch compliance data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await statisticsService.getWorkTimeCompliance({
          timeRange,
          driverGroup
        });
        setComplianceData(data);
        setError(null);
      } catch (err) {
        setError('Nie udało się pobrać danych zgodności czasu pracy');
        console.error('Error fetching work time compliance data:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [timeRange, driverGroup]);
  
  // Handle time range change
  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
  };
  
  // Handle driver group change
  const handleDriverGroupChange = (group) => {
    setDriverGroup(group);
  };
  
  // Show loading state
  if (isLoading) {
    return <div className="statistics-loading">Ładowanie danych zgodności czasu pracy...</div>;
  }
  
  // Show error state
  if (error) {
    return <div className="statistics-error">{error}</div>;
  }
  
  // Prepare chart data
  const complianceChartData = {
    labels: complianceData.compliance.map(item => item.label),
    datasets: [
      {
        label: 'Zgodność z czasem pracy (%)',
        data: complianceData.compliance.map(item => item.value),
        borderColor: '#3f51b5',
        backgroundColor: 'rgba(63, 81, 181, 0.2)',
        fill: true
      }
    ]
  };
  
  const violationsChartData = {
    labels: complianceData.violations.map(item => item.type),
    datasets: [
      {
        label: 'Liczba naruszeń',
        data: complianceData.violations.map(item => item.count),
        backgroundColor: [
          'rgba(244, 67, 54, 0.7)',
          'rgba(255, 152, 0, 0.7)',
          'rgba(255, 193, 7, 0.7)',
          'rgba(76, 175, 80, 0.7)',
          'rgba(33, 150, 243, 0.7)'
        ],
        borderColor: [
          'rgb(244, 67, 54)',
          'rgb(255, 152, 0)',
          'rgb(255, 193, 7)',
          'rgb(76, 175, 80)',
          'rgb(33, 150, 243)'
        ],
        borderWidth: 1
      }
    ]
  };
  
  // Prepare table data
  const tableHeaders = ['Kierowca', 'Zgodność (%)', 'Dzienny limit jazdy', 'Tygodniowy limit jazdy', 'Przerwy', 'Odpoczynki', 'Łączna liczba naruszeń'];
  const tableData = complianceData.drivers.map(driver => [
    driver.name,
    driver.compliance.toFixed(0) + '%',
    driver.violations.dailyDriving,
    driver.violations.weeklyDriving,
    driver.violations.breaks,
    driver.violations.rests,
    driver.violations.total
  ]);
  
  return (
    <div className="work-time-compliance-stats">
      <div className="statistics-filters">
        <StatisticsFilter
          label="Zakres czasu"
          value={timeRange}
          options={[
            { value: 'week', label: 'Tydzień' },
            { value: 'month', label: 'Miesiąc' },
            { value: 'quarter', label: 'Kwartał' },
            { value: 'year', label: 'Rok' }
          ]}
          onChange={handleTimeRangeChange}
        />
        
        <StatisticsFilter
          label="Grupa kierowców"
          value={driverGroup}
          options={[
            { value: 'all', label: 'Wszyscy' },
            { value: 'international', label: 'Międzynarodowi' },
            { value: 'domestic', label: 'Krajowi' }
          ]}
          onChange={handleDriverGroupChange}
        />
      </div>
      
      <div className="statistics-charts">
        <div className="statistics-chart-container">
          <h3 className="statistics-chart-title">Zgodność z czasem pracy</h3>
          <StatisticsChart
            type="line"
            data={complianceChartData}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                  max: 100,
                  title: {
                    display: true,
                    text: '%'
                  }
                }
              }
            }}
          />
        </div>
        
        <div className="statistics-chart-container">
          <h3 className="statistics-chart-title">Typy naruszeń</h3>
          <StatisticsChart
            type="pie"
            data={violationsChartData}
            options={{
              plugins: {
                legend: {
                  position: 'right'
                }
              }
            }}
          />
        </div>
      </div>
      
      <div className="statistics-table-container">
        <h3 className="statistics-table-title">Zgodność kierowców</h3>
        <StatisticsTable
          headers={tableHeaders}
          data={tableData}
        />
      </div>
    </div>
  );
};

export default WorkTimeComplianceStats;
```

### 3.4. Dodanie nowych tras do komponentu Statistics

```jsx
// W komponencie Statistics.jsx dodać nowe zakładki
<div className="statistics-tabs">
  <button 
    className={activeTab === 'dashboard' ? 'active' : ''}
    onClick={() => setActiveTab('dashboard')}
  >
    Dashboard
  </button>
  <button 
    className={activeTab === 'trends' ? 'active' : ''}
    onClick={() => setActiveTab('trends')}
  >
    Analiza trendów
  </button>
  <button 
    className={activeTab === 'comparison' ? 'active' : ''}
    onClick={() => setActiveTab('comparison')}
  >
    Analiza porównawcza
  </button>
  <button 
    className={activeTab === 'truckFleet' ? 'active' : ''}
    onClick={() => setActiveTab('truckFleet')}
  >
    Flota Tirów
  </button>
  <button 
    className={activeTab === 'workTime' ? 'active' : ''}
    onClick={() => setActiveTab('workTime')}
  >
    Czas pracy
  </button>
</div>

{/* Renderowanie zawartości w zależności od aktywnej zakładki */}
{activeTab === 'dashboard' && <StatisticsDashboard />}
{activeTab === 'trends' && <TrendAnalysis />}
{activeTab === 'comparison' && <ComparativeAnalysis />}
{activeTab === 'truckFleet' && <TruckFleetPerformanceStats />}
{activeTab === 'workTime' && <WorkTimeComplianceStats />}
```

## 4. Integracja z modułem AI & Automation

### 4.1. Dodanie nowych komponentów predykcyjnych

```jsx
// Nowy komponent TruckPredictiveMaintenance.jsx
import React, { useState, useEffect } from 'react';
import './TruckPredictiveMaintenance.css';
import aiAutomationService from '../../../services/api/aiAutomationService';

/**
 * TruckPredictiveMaintenance component
 * 
 * This component uses AI to predict maintenance needs for trucks
 * 
 * @returns {JSX.Element} TruckPredictiveMaintenance component
 */
const TruckPredictiveMaintenance = () => {
  // State for data
  const [predictions, setPredictions] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch predictions
  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        setIsLoading(true);
        const data = await aiAutomationService.getTruckMaintenancePredictions();
        setPredictions(data);
        setError(null);
      } catch (err) {
        setError('Nie udało się pobrać prognoz konserwacji');
        console.error('Error fetching maintenance predictions:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPredictions();
  }, []);
  
  // Handle vehicle selection
  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
  };
  
  // Show loading state
  if (isLoading) {
    return <div className="ai-loading">Ładowanie prognoz konserwacji...</div>;
  }
  
  // Show error state
  if (error) {
    return <div className="ai-error">{error}</div>;
  }
  
  return (
    <div className="truck-predictive-maintenance">
      <div className="predictive-maintenance-header">
        <h2>Predykcyjna konserwacja floty tirów</h2>
        <p>System wykorzystuje sztuczną inteligencję do przewidywania potrzeb konserwacyjnych pojazdów na podstawie danych historycznych i telematycznych.</p>
      </div>
      
      <div className="predictive-maintenance-summary">
        <div className="summary-card">
          <div className="summary-icon critical-icon"></div>
          <div className="summary-content">
            <h3>Krytyczne</h3>
            <p className="summary-value">{predictions.summary.critical}</p>
            <p className="summary-description">Pojazdy wymagające natychmiastowej uwagi</p>
          </div>
        </div>
        
        <div className="summary-card">
          <div className="summary-icon warning-icon"></div>
          <div className="summary-content">
            <h3>Ostrzeżenia</h3>
            <p className="summary-value">{predictions.summary.warning}</p>
            <p className="summary-description">Pojazdy wymagające uwagi w ciągu 2 tygodni</p>
          </div>
        </div>
        
        <div className="summary-card">
          <div className="summary-icon upcoming-icon"></div>
          <div className="summary-content">
            <h3>Nadchodzące</h3>
            <p className="summary-value">{predictions.summary.upcoming}</p>
            <p className="summary-description">Pojazdy wymagające uwagi w ciągu miesiąca</p>
          </div>
        </div>
        
        <div className="summary-card">
          <div className="summary-icon ok-icon"></div>
          <div className="summary-content">
            <h3>OK</h3>
            <p className="summary-value">{predictions.summary.ok}</p>
            <p className="summary-description">Pojazdy bez przewidywanych problemów</p>
          </div>
        </div>
      </div>
      
      <div className="predictive-maintenance-content">
        <div className="vehicles-list">
          <h3>Pojazdy</h3>
          <div className="vehicles-filter">
            <select>
              <option value="all">Wszystkie pojazdy</option>
              <option value="critical">Tylko krytyczne</option>
              <option value="warning">Tylko ostrzeżenia</option>
              <option value="upcoming">Tylko nadchodzące</option>
            </select>
          </div>
          
          <div className="vehicles-table">
            <table>
              <thead>
                <tr>
                  <th>Pojazd</th>
                  <th>Status</th>
                  <th>Przewidywany problem</th>
                  <th>Prawdopodobieństwo</th>
                </tr>
              </thead>
              <tbody>
                {predictions.vehicles.map((vehicle) => (
                  <tr 
                    key={vehicle.id} 
                    className={vehicle.status}
                    onClick={() => handleVehicleSelect(vehicle)}
                  >
                    <td>{vehicle.registrationNumber}</td>
                    <td>
                      <span className={`status-indicator ${vehicle.status}`}></span>
                      {getStatusLabel(vehicle.status)}
                    </td>
                    <td>{vehicle.predictedIssue}</td>
                    <td>{vehicle.probability}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {selectedVehicle && (
          <div className="vehicle-details">
            <h3>Szczegóły pojazdu: {selectedVehicle.registrationNumber}</h3>
            
            <div className="vehicle-info">
              <div className="info-group">
                <label>Marka/Model:</label>
                <span>{selectedVehicle.make} {selectedVehicle.model}</span>
              </div>
              <div className="info-group">
                <label>Przebieg:</label>
                <span>{selectedVehicle.mileage.toLocaleString()} km</span>
              </div>
              <div className="info-group">
                <label>Ostatni serwis:</label>
                <span>{selectedVehicle.lastService}</span>
              </div>
            </div>
            
            <div className="prediction-details">
              <h4>Szczegóły predykcji</h4>
              
              <div className="prediction-item">
                <div className="prediction-header">
                  <h5>{selectedVehicle.predictedIssue}</h5>
                  <span className="prediction-probability">{selectedVehicle.probability}%</span>
                </div>
                <p>{selectedVehicle.predictionDetails}</p>
                <div className="prediction-factors">
                  <h6>Czynniki wpływające na predykcję:</h6>
                  <ul>
                    {selectedVehicle.factors.map((factor, index) => (
                      <li key={index}>
                        <span className="factor-name">{factor.name}:</span>
                        <span className="factor-value">{factor.value}</span>
                        <span className="factor-impact" data-impact={factor.impact > 0 ? 'positive' : 'negative'}>
                          {factor.impact > 0 ? '+' : ''}{factor.impact}%
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="recommended-actions">
                <h5>Zalecane działania</h5>
                <ul>
                  {selectedVehicle.recommendedActions.map((action, index) => (
                    <li key={index}>
                      <span className="action-priority" data-priority={action.priority}></span>
                      {action.description}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="prediction-history">
              <h4>Historia predykcji</h4>
              <div className="history-chart">
                {/* Tutaj będzie wykres historii predykcji */}
                <div className="chart-placeholder">Wykres historii predykcji</div>
              </div>
            </div>
            
            <div className="action-buttons">
              <button className="primary-button">Zaplanuj serwis</button>
              <button className="secondary-button">Szczegółowy raport</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function to get status label
const getStatusLabel = (status) => {
  switch (status) {
    case 'critical':
      return 'Krytyczny';
    case 'warning':
      return 'Ostrzeżenie';
    case 'upcoming':
      return 'Nadchodzący';
    case 'ok':
      return 'OK';
    default:
      return status;
  }
};

export default TruckPredictiveMaintenance;
```

### 4.2. Dodanie nowego komponentu TruckRouteOptimizer

```jsx
// Nowy komponent TruckRouteOptimizer.jsx
import React, { useState, useEffect } from 'react';
import './TruckRouteOptimizer.css';
import aiAutomationService from '../../../services/api/aiAutomationService';

/**
 * TruckRouteOptimizer component
 * 
 * This component uses AI to optimize routes for trucks
 * 
 * @returns {JSX.Element} TruckRouteOptimizer component
 */
const TruckRouteOptimizer = () => {
  // State for data
  const [routes, setRoutes] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [optimizationParams, setOptimizationParams] = useState({
    prioritizeFuel: 50,
    prioritizeTime: 50,
    avoidTolls: false,
    considerRestTimes: true,
    considerTraffic: true
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [error, setError] = useState(null);
  
  // Fetch routes
  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        setIsLoading(true);
        const data = await aiAutomationService.getTruckRoutes();
        setRoutes(data);
        setError(null);
      } catch (err) {
        setError('Nie udało się pobrać tras');
        console.error('Error fetching routes:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRoutes();
  }, []);
  
  // Handle route selection
  const handleRouteSelect = (route) => {
    setSelectedRoute(route);
  };
  
  // Handle optimization parameter change
  const handleParamChange = (param, value) => {
    setOptimizationParams({
      ...optimizationParams,
      [param]: value
    });
  };
  
  // Handle slider change
  const handleSliderChange = (e) => {
    const value = parseInt(e.target.value);
    setOptimizationParams({
      ...optimizationParams,
      prioritizeFuel: value,
      prioritizeTime: 100 - value
    });
  };
  
  // Handle route optimization
  const handleOptimizeRoute = async () => {
    if (!selectedRoute) return;
    
    try {
      setIsOptimizing(true);
      const optimizedRoute = await aiAutomationService.optimizeTruckRoute(selectedRoute.id, optimizationParams);
      
      // Update routes list with optimized route
      const updatedRoutes = routes.map(route => {
        if (route.id === selectedRoute.id) {
          return {
            ...route,
            isOptimized: true,
            originalDistance: route.distance,
            originalDuration: route.duration,
            originalFuelConsumption: route.fuelConsumption,
            distance: optimizedRoute.distance,
            duration: optimizedRoute.duration,
            fuelConsumption: optimizedRoute.fuelConsumption,
            waypoints: optimizedRoute.waypoints,
            restStops: optimizedRoute.restStops,
            tollCosts: optimizedRoute.tollCosts
          };
        }
        return route;
      });
      
      setRoutes(updatedRoutes);
      setSelectedRoute({
        ...selectedRoute,
        isOptimized: true,
        originalDistance: selectedRoute.distance,
        originalDuration: selectedRoute.duration,
        originalFuelConsumption: selectedRoute.fuelConsumption,
        distance: optimizedRoute.distance,
        duration: optimizedRoute.duration,
        fuelConsumption: optimizedRoute.fuelConsumption,
        waypoints: optimizedRoute.waypoints,
        restStops: optimizedRoute.restStops,
        tollCosts: optimizedRoute.tollCosts
      });
      
    } catch (err) {
      setError('Nie udało się zoptymalizować trasy');
      console.error('Error optimizing route:', err);
    } finally {
      setIsOptimizing(false);
    }
  };
  
  // Show loading state
  if (isLoading) {
    return <div className="ai-loading">Ładowanie tras...</div>;
  }
  
  // Show error state
  if (error) {
    return <div className="ai-error">{error}</div>;
  }
  
  return (
    <div className="truck-route-optimizer">
      <div className="route-optimizer-header">
        <h2>Optymalizator tras dla floty tirów</h2>
        <p>System wykorzystuje sztuczną inteligencję do optymalizacji tras z uwzględnieniem ograniczeń dla ciężarówek, czasu pracy kierowców i kosztów.</p>
      </div>
      
      <div className="route-optimizer-content">
        <div className="routes-list">
          <h3>Trasy</h3>
          
          <div className="routes-table">
            <table>
              <thead>
                <tr>
                  <th>Nazwa</th>
                  <th>Start</th>
                  <th>Cel</th>
                  <th>Dystans</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {routes.routes.map((route) => (
                  <tr 
                    key={route.id} 
                    className={selectedRoute && selectedRoute.id === route.id ? 'selected' : ''}
                    onClick={() => handleRouteSelect(route)}
                  >
                    <td>{route.name}</td>
                    <td>{route.startLocation}</td>
                    <td>{route.endLocation}</td>
                    <td>{route.distance} km</td>
                    <td>
                      <span className={`route-status ${route.isOptimized ? 'optimized' : 'standard'}`}>
                        {route.isOptimized ? 'Zoptymalizowana' : 'Standardowa'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {selectedRoute && (
          <div className="route-details">
            <h3>Szczegóły trasy: {selectedRoute.name}</h3>
            
            <div className="route-map">
              {/* Tutaj będzie mapa trasy */}
              <div className="map-placeholder">Mapa trasy</div>
            </div>
            
            <div className="route-info">
              <div className="info-group">
                <label>Start:</label>
                <span>{selectedRoute.startLocation}</span>
              </div>
              <div className="info-group">
                <label>Cel:</label>
                <span>{selectedRoute.endLocation}</span>
              </div>
              <div className="info-group">
                <label>Dystans:</label>
                <span>{selectedRoute.distance} km</span>
                {selectedRoute.isOptimized && selectedRoute.originalDistance && (
                  <span className="optimization-diff">
                    {selectedRoute.distance < selectedRoute.originalDistance ? '-' : '+'}
                    {Math.abs(selectedRoute.distance - selectedRoute.originalDistance)} km
                  </span>
                )}
              </div>
              <div className="info-group">
                <label>Czas jazdy:</label>
                <span>{formatDuration(selectedRoute.duration)}</span>
                {selectedRoute.isOptimized && selectedRoute.originalDuration && (
                  <span className="optimization-diff">
                    {selectedRoute.duration < selectedRoute.originalDuration ? '-' : '+'}
                    {formatDuration(Math.abs(selectedRoute.duration - selectedRoute.originalDuration))}
                  </span>
                )}
              </div>
              <div className="info-group">
                <label>Zużycie paliwa:</label>
                <span>{selectedRoute.fuelConsumption} l</span>
                {selectedRoute.isOptimized && selectedRoute.originalFuelConsumption && (
                  <span className="optimization-diff">
                    {selectedRoute.fuelConsumption < selectedRoute.originalFuelConsumption ? '-' : '+'}
                    {Math.abs(selectedRoute.fuelConsumption - selectedRoute.originalFuelConsumption).toFixed(1)} l
                  </span>
                )}
              </div>
              {selectedRoute.tollCosts && (
                <div className="info-group">
                  <label>Opłaty drogowe:</label>
                  <span>{selectedRoute.tollCosts.total} {selectedRoute.tollCosts.currency}</span>
                </div>
              )}
            </div>
            
            <div className="optimization-params">
              <h4>Parametry optymalizacji</h4>
              
              <div className="param-slider">
                <div className="slider-labels">
                  <span>Oszczędność paliwa</span>
                  <span>Oszczędność czasu</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={optimizationParams.prioritizeFuel} 
                  onChange={handleSliderChange}
                />
                <div className="slider-values">
                  <span>{optimizationParams.prioritizeFuel}%</span>
                  <span>{optimizationParams.prioritizeTime}%</span>
                </div>
              </div>
              
              <div className="param-checkboxes">
                <div className="param-checkbox">
                  <input 
                    type="checkbox" 
                    id="avoidTolls" 
                    checked={optimizationParams.avoidTolls} 
                    onChange={(e) => handleParamChange('avoidTolls', e.target.checked)}
                  />
                  <label htmlFor="avoidTolls">Unikaj dróg płatnych</label>
                </div>
                
                <div className="param-checkbox">
                  <input 
                    type="checkbox" 
                    id="considerRestTimes" 
                    checked={optimizationParams.considerRestTimes} 
                    onChange={(e) => handleParamChange('considerRestTimes', e.target.checked)}
                  />
                  <label htmlFor="considerRestTimes">Uwzględnij czas odpoczynku kierowcy</label>
                </div>
                
                <div className="param-checkbox">
                  <input 
                    type="checkbox" 
                    id="considerTraffic" 
                    checked={optimizationParams.considerTraffic} 
                    onChange={(e) => handleParamChange('considerTraffic', e.target.checked)}
                  />
                  <label htmlFor="considerTraffic">Uwzględnij ruch drogowy</label>
                </div>
              </div>
            </div>
            
            <div className="route-waypoints">
              <h4>Punkty trasy</h4>
              <ul className="waypoints-list">
                <li className="waypoint start">
                  <div className="waypoint-time">{selectedRoute.departureTime}</div>
                  <div className="waypoint-marker"></div>
                  <div className="waypoint-info">
                    <div className="waypoint-name">{selectedRoute.startLocation}</div>
                    <div className="waypoint-address">{selectedRoute.startAddress}</div>
                  </div>
                </li>
                
                {selectedRoute.waypoints && selectedRoute.waypoints.map((waypoint, index) => (
                  <li key={index} className={`waypoint ${waypoint.type}`}>
                    <div className="waypoint-time">{waypoint.arrivalTime}</div>
                    <div className="waypoint-marker"></div>
                    <div className="waypoint-info">
                      <div className="waypoint-name">{waypoint.name}</div>
                      <div className="waypoint-address">{waypoint.address}</div>
                      {waypoint.type === 'rest' && (
                        <div className="waypoint-details">
                          Odpoczynek: {formatDuration(waypoint.duration)}
                        </div>
                      )}
                      {waypoint.type === 'toll' && (
                        <div className="waypoint-details">
                          Opłata: {waypoint.cost} {waypoint.currency}
                        </div>
                      )}
                    </div>
                  </li>
                ))}
                
                <li className="waypoint end">
                  <div className="waypoint-time">{selectedRoute.arrivalTime}</div>
                  <div className="waypoint-marker"></div>
                  <div className="waypoint-info">
                    <div className="waypoint-name">{selectedRoute.endLocation}</div>
                    <div className="waypoint-address">{selectedRoute.endAddress}</div>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="action-buttons">
              <button 
                className="primary-button" 
                onClick={handleOptimizeRoute}
                disabled={isOptimizing}
              >
                {isOptimizing ? 'Optymalizacja...' : 'Optymalizuj trasę'}
              </button>
              <button className="secondary-button">Eksportuj trasę</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function to format duration
const formatDuration = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}min`;
};

export default TruckRouteOptimizer;
```

### 4.3. Dodanie nowych komponentów do AIAutomation

```jsx
// W komponencie AIAutomation.jsx dodać nowe komponenty
import TruckPredictiveMaintenance from './TruckPredictiveMaintenance';
import TruckRouteOptimizer from './TruckRouteOptimizer';
import WorkTimeOptimizer from './WorkTimeOptimizer';

// Dodać nowe opcje w menu nawigacyjnym
<button
  className={activeComponent === 'truckPredictiveMaintenance' ? 'active' : ''}
  onClick={() => handleComponentChange('truckPredictiveMaintenance')}
>
  Predykcyjna konserwacja tirów
</button>
<button
  className={activeComponent === 'truckRouteOptimizer' ? 'active' : ''}
  onClick={() => handleComponentChange('truckRouteOptimizer')}
>
  Optymalizator tras dla tirów
</button>
<button
  className={activeComponent === 'workTimeOptimizer' ? 'active' : ''}
  onClick={() => handleComponentChange('workTimeOptimizer')}
>
  Optymalizator czasu pracy
</button>

// Dodać nowe komponenty do renderContent
const renderContent = () => {
  switch (activeComponent) {
    // Istniejące przypadki...
    case 'truckPredictiveMaintenance':
      return <TruckPredictiveMaintenance />;
    case 'truckRouteOptimizer':
      return <TruckRouteOptimizer />;
    case 'workTimeOptimizer':
      return <WorkTimeOptimizer />;
    // Pozostałe przypadki...
    default:
      return renderOverview();
  }
};

// Dodać nowe karty w overview
<div className="ai-feature-card" onClick={() => handleComponentChange('truckPredictiveMaintenance')}>
  <div className="ai-feature-icon truck-maintenance-icon"></div>
  <h3>Predykcyjna konserwacja tirów</h3>
  <p>Przewidywanie awarii i potrzeb serwisowych ciągników i naczep</p>
</div>

<div className="ai-feature-card" onClick={() => handleComponentChange('truckRouteOptimizer')}>
  <div className="ai-feature-icon truck-route-icon"></div>
  <h3>Optymalizator tras dla tirów</h3>
  <p>Optymalizacja tras z uwzględnieniem ograniczeń dla ciężarówek</p>
</div>

<div className="ai-feature-card" onClick={() => handleComponentChange('workTimeOptimizer')}>
  <div className="ai-feature-icon work-time-icon"></div>
  <h3>Optymalizator czasu pracy</h3>
  <p>Optymalizacja harmonogramów pracy kierowców zgodnie z przepisami</p>
</div>
```

## 5. Integracja z modułem Document Management

### 5.1. Dodanie nowych szablonów dokumentów

```jsx
// W komponencie DocumentManagement.jsx dodać nowe typy dokumentów
const documentTypes = [
  // Istniejące typy...
  { value: 'cmr', label: 'List przewozowy CMR' },
  { value: 'tir', label: 'Karnet TIR' },
  { value: 'adr', label: 'Dokument ADR' },
  { value: 'driver_qualification', label: 'Kwalifikacja kierowcy' },
  { value: 'tachograph', label: 'Dane tachografu' },
  { value: 'toll', label: 'Opłaty drogowe' }
];

// Dodać nowe kategorie dokumentów
const documentCategories = [
  // Istniejące kategorie...
  { 
    id: 'international_transport', 
    name: 'Transport międzynarodowy',
    types: ['cmr', 'tir', 'adr', 'toll']
  },
  { 
    id: 'driver_documents', 
    name: 'Dokumenty kierowców',
    types: ['driver_qualification', 'tachograph']
  }
];
```

### 5.2. Dodanie nowego komponentu TransportDocumentTemplates

```jsx
// Nowy komponent TransportDocumentTemplates.jsx
import React, { useState, useEffect } from 'react';
import './TransportDocumentTemplates.css';
import documentManagementService from '../../../services/api/documentManagementService';

/**
 * TransportDocumentTemplates component
 * 
 * This component manages templates for transport documents
 * 
 * @returns {JSX.Element} TransportDocumentTemplates component
 */
const TransportDocumentTemplates = () => {
  // State for templates
  const [templates, setTemplates] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch templates
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setIsLoading(true);
        const data = await documentManagementService.getTransportDocumentTemplates();
        setTemplates(data);
        setError(null);
      } catch (err) {
        setError('Nie udało się pobrać szablonów dokumentów');
        console.error('Error fetching document templates:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTemplates();
  }, []);
  
  // Handle template selection
  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
  };
  
  // Show loading state
  if (isLoading) {
    return <div className="document-loading">Ładowanie szablonów dokumentów...</div>;
  }
  
  // Show error state
  if (error) {
    return <div className="document-error">{error}</div>;
  }
  
  return (
    <div className="transport-document-templates">
      <div className="templates-header">
        <h2>Szablony dokumentów transportowych</h2>
        <p>Zarządzaj szablonami dokumentów używanych w transporcie międzynarodowym.</p>
      </div>
      
      <div className="templates-content">
        <div className="templates-list">
          <h3>Szablony</h3>
          
          <div className="templates-filter">
            <select>
              <option value="all">Wszystkie typy</option>
              <option value="cmr">CMR</option>
              <option value="tir">TIR</option>
              <option value="adr">ADR</option>
              <option value="customs">Dokumenty celne</option>
            </select>
          </div>
          
          <div className="templates-table">
            <table>
              <thead>
                <tr>
                  <th>Nazwa</th>
                  <th>Typ</th>
                  <th>Ostatnia modyfikacja</th>
                </tr>
              </thead>
              <tbody>
                {templates.templates.map((template) => (
                  <tr 
                    key={template.id} 
                    className={selectedTemplate && selectedTemplate.id === template.id ? 'selected' : ''}
                    onClick={() => handleTemplateSelect(template)}
                  >
                    <td>{template.name}</td>
                    <td>{getTemplateTypeLabel(template.type)}</td>
                    <td>{template.lastModified}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="templates-actions">
            <button className="primary-button">Nowy szablon</button>
            <button className="secondary-button">Importuj szablon</button>
          </div>
        </div>
        
        {selectedTemplate && (
          <div className="template-details">
            <h3>Szczegóły szablonu: {selectedTemplate.name}</h3>
            
            <div className="template-info">
              <div className="info-group">
                <label>Typ:</label>
                <span>{getTemplateTypeLabel(selectedTemplate.type)}</span>
              </div>
              <div className="info-group">
                <label>Autor:</label>
                <span>{selectedTemplate.author}</span>
              </div>
              <div className="info-group">
                <label>Data utworzenia:</label>
                <span>{selectedTemplate.createdAt}</span>
              </div>
              <div className="info-group">
                <label>Ostatnia modyfikacja:</label>
                <span>{selectedTemplate.lastModified}</span>
              </div>
            </div>
            
            <div className="template-preview">
              <h4>Podgląd</h4>
              <div className="preview-container">
                {/* Tutaj będzie podgląd szablonu */}
                <div className="preview-placeholder">Podgląd szablonu</div>
              </div>
            </div>
            
            <div className="template-fields">
              <h4>Pola szablonu</h4>
              <div className="fields-list">
                {selectedTemplate.fields.map((field, index) => (
                  <div key={index} className="field-item">
                    <div className="field-name">{field.name}</div>
                    <div className="field-type">{field.type}</div>
                    <div className="field-required">{field.required ? 'Wymagane' : 'Opcjonalne'}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="template-actions">
              <button className="primary-button">Edytuj szablon</button>
              <button className="secondary-button">Generuj dokument</button>
              <button className="danger-button">Usuń szablon</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function to get template type label
const getTemplateTypeLabel = (type) => {
  switch (type) {
    case 'cmr':
      return 'List przewozowy CMR';
    case 'tir':
      return 'Karnet TIR';
    case 'adr':
      return 'Dokument ADR';
    case 'customs_t1':
      return 'Dokument celny T1';
    case 'customs_t2':
      return 'Dokument celny T2';
    case 'customs_ex':
      return 'Dokument celny EX';
    default:
      return type;
  }
};

export default TransportDocumentTemplates;
```

### 5.3. Dodanie nowego komponentu do DocumentManagement

```jsx
// W komponencie DocumentManagement.jsx dodać nowy komponent
import TransportDocumentTemplates from './TransportDocumentTemplates';

// Dodać nową zakładkę
<TabButton 
  active={activeTab === 'templates'} 
  onClick={() => handleTabChange('templates')}
>
  Szablony transportowe
</TabButton>

// Dodać nowy przypadek w renderContent
case 'templates':
  return (
    <TransportDocumentTemplates />
  );
```

## 6. Modyfikacje w backend

### 6.1. Dodanie nowych endpointów API

Należy rozszerzyć plik index.js w katalogu backend o nowe endpointy dla modułu floty tirów:

```javascript
// Dodanie nowych endpointów dla floty tirów
app.get('/api/truck-fleet/trucks', (req, res) => {
  // Implementacja endpointu
  res.json({ status: 'ok', message: 'Trucks API endpoint' });
});

app.get('/api/truck-fleet/trucks/:id', (req, res) => {
  // Implementacja endpointu
  res.json({ status: 'ok', message: 'Truck details API endpoint', id: req.params.id });
});

app.get('/api/truck-fleet/trailers', (req, res) => {
  // Implementacja endpointu
  res.json({ status: 'ok', message: 'Trailers API endpoint' });
});

app.get('/api/truck-fleet/trailers/:id', (req, res) => {
  // Implementacja endpointu
  res.json({ status: 'ok', message: 'Trailer details API endpoint', id: req.params.id });
});

app.get('/api/truck-fleet/drivers', (req, res) => {
  // Implementacja endpointu
  res.json({ status: 'ok', message: 'Drivers API endpoint' });
});

app.get('/api/truck-fleet/work-time', (req, res) => {
  // Implementacja endpointu
  res.json({ status: 'ok', message: 'Work time API endpoint' });
});

app.get('/api/truck-fleet/routes', (req, res) => {
  // Implementacja endpointu
  res.json({ status: 'ok', message: 'Routes API endpoint' });
});

app.get('/api/truck-fleet/cargo', (req, res) => {
  // Implementacja endpointu
  res.json({ status: 'ok', message: 'Cargo API endpoint' });
});

app.get('/api/truck-fleet/tolls', (req, res) => {
  // Implementacja endpointu
  res.json({ status: 'ok', message: 'Tolls API endpoint' });
});

app.get('/api/truck-fleet/service-records', (req, res) => {
  // Implementacja endpointu
  res.json({ status: 'ok', message: 'Service records API endpoint' });
});

app.get('/api/truck-fleet/analytics', (req, res) => {
  // Implementacja endpointu
  res.json({ status: 'ok', message: 'Analytics API endpoint' });
});
```

### 6.2. Dodanie nowych tabel do bazy danych

Należy utworzyć plik init.sql w katalogu db z definicjami tabel dla modułu floty tirów:

```sql
-- Tabela dla ciągników
CREATE TABLE IF NOT EXISTS trucks (
  id SERIAL PRIMARY KEY,
  registration_number VARCHAR(20) NOT NULL,
  make VARCHAR(50) NOT NULL,
  model VARCHAR(50) NOT NULL,
  year INTEGER NOT NULL,
  vin VARCHAR(17) NOT NULL,
  engine_type VARCHAR(50),
  engine_power INTEGER,
  emission_standard VARCHAR(20),
  fuel_tank_capacity INTEGER,
  adblue_tank_capacity INTEGER,
  mileage INTEGER NOT NULL DEFAULT 0,
  status VARCHAR(20) NOT NULL DEFAULT 'active',
  current_trailer_id INTEGER,
  current_driver_id INTEGER,
  technical_inspection_date DATE,
  insurance_expiry_date DATE,
  last_service_date DATE,
  next_service_date DATE,
  next_service_mileage INTEGER,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabela dla naczep
CREATE TABLE IF NOT EXISTS trailers (
  id SERIAL PRIMARY KEY,
  registration_number VARCHAR(20) NOT NULL,
  type VARCHAR(50) NOT NULL,
  make VARCHAR(50) NOT NULL,
  model VARCHAR(50) NOT NULL,
  year INTEGER NOT NULL,
  vin VARCHAR(17) NOT NULL,
  length NUMERIC(5,2),
  width NUMERIC(5,2),
  height NUMERIC(5,2),
  volume_capacity NUMERIC(10,2),
  weight_capacity NUMERIC(10,2),
  status VARCHAR(20) NOT NULL DEFAULT 'active',
  current_truck_id INTEGER,
  technical_inspection_date DATE,
  insurance_expiry_date DATE,
  last_service_date DATE,
  next_service_date DATE,
  has_temperature_control BOOLEAN DEFAULT FALSE,
  min_temperature NUMERIC(5,2),
  max_temperature NUMERIC(5,2),
  temperature_zones INTEGER,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabela dla kierowców tirów
CREATE TABLE IF NOT EXISTS truck_drivers (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  birth_date DATE NOT NULL,
  id_number VARCHAR(20) NOT NULL,
  contact_number VARCHAR(20),
  email VARCHAR(100),
  address TEXT,
  employment_date DATE NOT NULL,
  employment_type VARCHAR(20) NOT NULL,
  position VARCHAR(50) NOT NULL,
  employee_id VARCHAR(20),
  driving_license_number VARCHAR(20) NOT NULL,
  driving_license_categories VARCHAR(50) NOT NULL,
  driving_license_expiry_date DATE NOT NULL,
  driver_cpc_number VARCHAR(20),
  driver_cpc_expiry_date DATE,
  adr_certificate_number VARCHAR(20),
  adr_certificate_classes VARCHAR(50),
  adr_certificate_expiry_date DATE,
  driving_card_number VARCHAR(20),
  driving_card_expiry_date DATE,
  last_medical_exam_date DATE,
  next_medical_exam_date DATE,
  medical_restrictions TEXT,
  current_vehicle_id INTEGER,
  status VARCHAR(20) NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabela dla czasu pracy
CREATE TABLE IF NOT EXISTS work_time (
  id SERIAL PRIMARY KEY,
  driver_id INTEGER NOT NULL,
  date DATE NOT NULL,
  driving_time INTEGER NOT NULL DEFAULT 0,
  rest_time INTEGER NOT NULL DEFAULT 0,
  other_work_time INTEGER NOT NULL DEFAULT 0,
  availability_time INTEGER NOT NULL DEFAULT 0,
  tachograph_file VARCHAR(255),
  notes TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (driver_id) REFERENCES truck_drivers(id)
);

-- Tabela dla tras
CREATE TABLE IF NOT EXISTS routes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'planned',
  truck_id INTEGER,
  trailer_id INTEGER,
  driver_id INTEGER,
  cargo_id INTEGER,
  customer_id INTEGER,
  start_location_name VARCHAR(100) NOT NULL,
  start_location_address TEXT NOT NULL,
  start_location_lat NUMERIC(10,6),
  start_location_lng NUMERIC(10,6),
  end_location_name VARCHAR(100) NOT NULL,
  end_location_address TEXT NOT NULL,
  end_location_lat NUMERIC(10,6),
  end_location_lng NUMERIC(10,6),
  planned_start TIMESTAMP,
  planned_end TIMESTAMP,
  actual_start TIMESTAMP,
  actual_end TIMESTAMP,
  distance INTEGER,
  estimated_fuel_consumption NUMERIC(10,2),
  actual_fuel_consumption NUMERIC(10,2),
  estimated_adblue_consumption NUMERIC(10,2),
  actual_adblue_consumption NUMERIC(10,2),
  notes TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (truck_id) REFERENCES trucks(id),
  FOREIGN KEY (trailer_id) REFERENCES trailers(id),
  FOREIGN KEY (driver_id) REFERENCES truck_drivers(id)
);

-- Tabela dla ładunków
CREATE TABLE IF NOT EXISTS cargo (
  id SERIAL PRIMARY KEY,
  reference VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  type VARCHAR(50) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'planned',
  customer_id INTEGER,
  route_id INTEGER,
  weight NUMERIC(10,2),
  volume NUMERIC(10,2),
  loading_meters NUMERIC(5,2),
  packages INTEGER,
  pallets INTEGER,
  length NUMERIC(5,2),
  width NUMERIC(5,2),
  height NUMERIC(5,2),
  is_hazardous BOOLEAN DEFAULT FALSE,
  un_number VARCHAR(10),
  hazard_class VARCHAR(10),
  packing_group VARCHAR(10),
  requires_temperature_control BOOLEAN DEFAULT FALSE,
  min_temperature NUMERIC(5,2),
  max_temperature NUMERIC(5,2),
  loading_location VARCHAR(100),
  loading_address TEXT,
  loading_date TIMESTAMP,
  loading_contact_person VARCHAR(100),
  loading_contact_phone VARCHAR(20),
  unloading_location VARCHAR(100),
  unloading_address TEXT,
  unloading_date TIMESTAMP,
  unloading_contact_person VARCHAR(100),
  unloading_contact_phone VARCHAR(20),
  value NUMERIC(10,2),
  is_insured BOOLEAN DEFAULT FALSE,
  insurance_policy_number VARCHAR(50),
  insurance_coverage_amount NUMERIC(10,2),
  requires_customs_clearance BOOLEAN DEFAULT FALSE,
  customs_status VARCHAR(20),
  taric_code VARCHAR(20),
  origin_country VARCHAR(2),
  notes TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (route_id) REFERENCES routes(id)
);

-- Tabela dla opłat drogowych
CREATE TABLE IF NOT EXISTS toll_expenses (
  id SERIAL PRIMARY KEY,
  route_id INTEGER,
  truck_id INTEGER,
  trailer_id INTEGER,
  driver_id INTEGER,
  date DATE NOT NULL,
  country VARCHAR(2) NOT NULL,
  toll_system VARCHAR(50) NOT NULL,
  toll_operator VARCHAR(100),
  entry_point VARCHAR(100),
  exit_point VARCHAR(100),
  distance INTEGER,
  amount NUMERIC(10,2) NOT NULL,
  currency VARCHAR(3) NOT NULL,
  payment_method VARCHAR(20) NOT NULL,
  receipt_number VARCHAR(50),
  invoice_number VARCHAR(50),
  notes TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (route_id) REFERENCES routes(id),
  FOREIGN KEY (truck_id) REFERENCES trucks(id),
  FOREIGN KEY (trailer_id) REFERENCES trailers(id),
  FOREIGN KEY (driver_id) REFERENCES truck_drivers(id)
);

-- Tabela dla rekordów serwisowych
CREATE TABLE IF NOT EXISTS service_records (
  id SERIAL PRIMARY KEY,
  vehicle_id INTEGER NOT NULL,
  vehicle_type VARCHAR(10) NOT NULL, -- 'truck' lub 'trailer'
  service_type VARCHAR(20) NOT NULL,
  date DATE NOT NULL,
  mileage INTEGER,
  workshop_name VARCHAR(100) NOT NULL,
  workshop_address TEXT,
  workshop_contact_person VARCHAR(100),
  workshop_contact_phone VARCHAR(20),
  total_parts_cost NUMERIC(10,2) NOT NULL DEFAULT 0,
  total_labor_cost NUMERIC(10,2) NOT NULL DEFAULT 0,
  total_cost NUMERIC(10,2) NOT NULL DEFAULT 0,
  is_warranty BOOLEAN DEFAULT FALSE,
  warranty_number VARCHAR(50),
  warranty_expiry_date DATE,
  next_service_date DATE,
  next_service_mileage INTEGER,
  notes TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabela dla zadań serwisowych
CREATE TABLE IF NOT EXISTS service_tasks (
  id SERIAL PRIMARY KEY,
  service_record_id INTEGER NOT NULL,
  description TEXT NOT NULL,
  labor_hours NUMERIC(5,2) NOT NULL DEFAULT 0,
  labor_cost NUMERIC(10,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (service_record_id) REFERENCES service_records(id)
);

-- Tabela dla części użytych w serwisie
CREATE TABLE IF NOT EXISTS service_parts (
  id SERIAL PRIMARY KEY,
  service_task_id INTEGER NOT NULL,
  name VARCHAR(100) NOT NULL,
  part_number VARCHAR(50),
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price NUMERIC(10,2) NOT NULL DEFAULT 0,
  total_price NUMERIC(10,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (service_task_id) REFERENCES service_tasks(id)
);

-- Tabela dla punktów trasy
CREATE TABLE IF NOT EXISTS route_waypoints (
  id SERIAL PRIMARY KEY,
  route_id INTEGER NOT NULL,
  type VARCHAR(20) NOT NULL,
  name VARCHAR(100) NOT NULL,
  address TEXT NOT NULL,
  lat NUMERIC(10,6),
  lng NUMERIC(10,6),
  planned_arrival TIMESTAMP,
  planned_departure TIMESTAMP,
  actual_arrival TIMESTAMP,
  actual_departure TIMESTAMP,
  notes TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (route_id) REFERENCES routes(id)
);

-- Tabela dla dokumentów transportowych
CREATE TABLE IF NOT EXISTS transport_documents (
  id SERIAL PRIMARY KEY,
  type VARCHAR(20) NOT NULL,
  number VARCHAR(50) NOT NULL,
  issue_date DATE NOT NULL,
  expiry_date DATE,
  route_id INTEGER,
  truck_id INTEGER,
  trailer_id INTEGER,
  driver_id INTEGER,
  cargo_id INTEGER,
  file_path VARCHAR(255),
  notes TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (route_id) REFERENCES routes(id),
  FOREIGN KEY (truck_id) REFERENCES trucks(id),
  FOREIGN KEY (trailer_id) REFERENCES trailers(id),
  FOREIGN KEY (driver_id) REFERENCES truck_drivers(id),
  FOREIGN KEY (cargo_id) REFERENCES cargo(id)
);
```

## 7. Podsumowanie integracji

Integracja modułu zarządzania flotą tirów z istniejącą funkcjonalnością Fleet App obejmuje:

1. **Integracja z główną aplikacją**
   - Dodanie nowych tras w App.jsx
   - Rozszerzenie menu nawigacyjnego o sekcję dla floty tirów
   - Wykorzystanie istniejących komponentów wspólnych

2. **Integracja z modułem Settings**
   - Rozszerzenie FleetConfiguration o parametry specyficzne dla tirów
   - Dodanie nowego komponentu TruckFleetSettings
   - Dodanie trasy do TruckFleetSettings w App.jsx
   - Dodanie linku do TruckFleetSettings w komponencie Settings

3. **Integracja z modułem Statistics**
   - Rozszerzenie StatisticsDashboard o wskaźniki KPI dla floty tirów
   - Dodanie nowych komponentów analitycznych (TruckFleetPerformanceStats, WorkTimeComplianceStats)
   - Dodanie nowych tras do komponentu Statistics

4. **Integracja z modułem AI & Automation**
   - Dodanie nowych komponentów predykcyjnych (TruckPredictiveMaintenance, TruckRouteOptimizer, WorkTimeOptimizer)
   - Dodanie nowych komponentów do AIAutomation

5. **Integracja z modułem Document Management**
   - Dodanie nowych szablonów dokumentów
   - Dodanie nowego komponentu TransportDocumentTemplates
   - Dodanie nowego komponentu do DocumentManagement

6. **Modyfikacje w backend**
   - Dodanie nowych endpointów API
   - Dodanie nowych tabel do bazy danych

Dzięki tej integracji, moduł zarządzania flotą tirów będzie w pełni zintegrowany z istniejącą aplikacją Fleet App, wykorzystując jej architekturę i komponenty, jednocześnie rozszerzając ją o funkcjonalności specyficzne dla tirów.
