import React, { useState, useEffect } from 'react';
import './PersonalizationSettings.css';
import SettingsCard from '../common/SettingsCard';
import SettingsSelect from '../common/SettingsSelect';
import SettingsToggle from '../common/SettingsToggle';
import SettingsButton from '../common/SettingsButton';
import mockSettingsService from '../../../services/api/mockSettingsService';

/**
 * PersonalizationSettings component
 * 
 * This component allows users to customize the interface appearance:
 * - Theme selection (light, dark, blue, green)
 * - Dashboard layout customization
 * - Information density settings
 * - Language selection
 * 
 * @returns {JSX.Element} PersonalizationSettings component
 */
const PersonalizationSettings = () => {
  // State for personalization settings
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saveStatus, setSaveStatus] = useState(null);

  // Fetch personalization settings
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const data = await mockSettingsService.getPersonalizationSettings();
        setSettings(data);
        setError(null);
      } catch (err) {
        setError('Nie udało się pobrać ustawień personalizacji');
        console.error('Error fetching personalization settings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // Handle theme change
  const handleThemeChange = (e) => {
    setSettings({
      ...settings,
      theme: e.target.value
    });
  };

  // Handle information density change
  const handleDensityChange = (e) => {
    setSettings({
      ...settings,
      informationDensity: e.target.value
    });
  };

  // Handle language change
  const handleLanguageChange = (e) => {
    setSettings({
      ...settings,
      language: e.target.value
    });
  };

  // Handle dashboard widget toggle
  const handleWidgetToggle = (widgetId) => {
    const updatedLayout = settings.dashboardLayout.map(widget => {
      if (widget.id === widgetId) {
        return {
          ...widget,
          enabled: !widget.enabled
        };
      }
      return widget;
    });

    setSettings({
      ...settings,
      dashboardLayout: updatedLayout
    });
  };

  // Save settings
  const handleSaveSettings = async () => {
    try {
      setSaveStatus('saving');
      await mockSettingsService.updatePersonalizationSettings(settings);
      setSaveStatus('success');
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setSaveStatus(null);
      }, 3000);
    } catch (err) {
      setSaveStatus('error');
      console.error('Error saving personalization settings:', err);
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setSaveStatus(null);
      }, 3000);
    }
  };

  // Show loading state
  if (loading) {
    return <div className="settings-loading">Ładowanie ustawień personalizacji...</div>;
  }

  // Show error state
  if (error) {
    return <div className="settings-error">{error}</div>;
  }

  // Show settings
  return (
    <div className="personalization-settings">
      <SettingsCard title="Motyw kolorystyczny">
        <div className="theme-options">
          {settings.availableThemes.map((theme) => (
            <div 
              key={theme.id}
              className={`theme-option ${settings.theme === theme.id ? 'theme-option-selected' : ''}`}
              onClick={() => setSettings({...settings, theme: theme.id})}
            >
              <div 
                className="theme-preview" 
                style={{
                  backgroundColor: theme.primaryColor,
                  borderColor: theme.secondaryColor
                }}
              />
              <div className="theme-name">{theme.name}</div>
            </div>
          ))}
        </div>
        <div className="settings-form-row">
          <SettingsSelect
            label="Wybierz motyw"
            value={settings.theme}
            onChange={handleThemeChange}
            options={settings.availableThemes}
          />
        </div>
      </SettingsCard>

      <SettingsCard title="Układ dashboardu">
        <p className="settings-description">
          Wybierz, które widgety mają być widoczne na dashboardzie i w jakiej kolejności.
        </p>
        <div className="dashboard-widgets">
          {settings.dashboardLayout.map((widget) => (
            <div key={widget.id} className="dashboard-widget">
              <SettingsToggle
                checked={widget.enabled}
                onChange={() => handleWidgetToggle(widget.id)}
                label={getWidgetLabel(widget.id)}
              />
            </div>
          ))}
        </div>
      </SettingsCard>

      <SettingsCard title="Gęstość informacji">
        <p className="settings-description">
          Dostosuj ilość informacji wyświetlanych na ekranie.
        </p>
        <div className="settings-form-row">
          <SettingsSelect
            label="Gęstość informacji"
            value={settings.informationDensity}
            onChange={handleDensityChange}
            options={[
              { value: 'compact', label: 'Kompaktowy' },
              { value: 'standard', label: 'Standardowy' },
              { value: 'expanded', label: 'Rozszerzony' }
            ]}
          />
        </div>
      </SettingsCard>

      <SettingsCard title="Język interfejsu">
        <p className="settings-description">
          Wybierz język interfejsu aplikacji.
        </p>
        <div className="settings-form-row">
          <SettingsSelect
            label="Język"
            value={settings.language}
            onChange={handleLanguageChange}
            options={settings.availableLanguages}
          />
        </div>
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

// Helper function to get widget label
const getWidgetLabel = (widgetId) => {
  const widgetLabels = {
    'kpi-summary': 'Podsumowanie KPI',
    'fleet-status': 'Status floty',
    'recent-alerts': 'Ostatnie alerty',
    'fuel-consumption': 'Zużycie paliwa',
    'maintenance-schedule': 'Harmonogram konserwacji',
    'driver-performance': 'Wydajność kierowców',
    'weather-conditions': 'Warunki pogodowe',
    'route-efficiency': 'Efektywność tras'
  };
  
  return widgetLabels[widgetId] || widgetId;
};

export default PersonalizationSettings;
