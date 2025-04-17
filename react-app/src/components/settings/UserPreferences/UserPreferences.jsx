import React, { useState, useEffect } from 'react';
import './UserPreferences.css';
import SettingsCard from '../common/SettingsCard';
import SettingsSelect from '../common/SettingsSelect';
import SettingsToggle from '../common/SettingsToggle';
import SettingsButton from '../common/SettingsButton';
import mockSettingsService from '../../../services/api/mockSettingsService';

/**
 * UserPreferences component
 * 
 * This component allows users to configure their personal preferences:
 * - Notification settings (email, push, SMS)
 * - Report frequency
 * - Data format preferences (distance, volume, currency, temperature)
 * - Timezone settings
 * 
 * @returns {JSX.Element} UserPreferences component
 */
const UserPreferences = () => {
  // State for user preferences
  const [preferences, setPreferences] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saveStatus, setSaveStatus] = useState(null);

  // Fetch user preferences
  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        setLoading(true);
        const data = await mockSettingsService.getUserPreferences();
        setPreferences(data);
        setError(null);
      } catch (err) {
        setError('Nie udało się pobrać preferencji użytkownika');
        console.error('Error fetching user preferences:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPreferences();
  }, []);

  // Handle notification channel toggle
  const handleNotificationChannelToggle = (channel) => {
    setPreferences({
      ...preferences,
      notifications: {
        ...preferences.notifications,
        [channel]: {
          ...preferences.notifications[channel],
          enabled: !preferences.notifications[channel].enabled
        }
      }
    });
  };

  // Handle notification type toggle
  const handleNotificationTypeToggle = (channel, typeId) => {
    const updatedTypes = preferences.notifications[channel].types.map(type => {
      if (type.id === typeId) {
        return {
          ...type,
          enabled: !type.enabled
        };
      }
      return type;
    });

    setPreferences({
      ...preferences,
      notifications: {
        ...preferences.notifications,
        [channel]: {
          ...preferences.notifications[channel],
          types: updatedTypes
        }
      }
    });
  };

  // Handle report frequency change
  const handleReportFrequencyChange = (e) => {
    setPreferences({
      ...preferences,
      reportFrequency: e.target.value
    });
  };

  // Handle data format change
  const handleDataFormatChange = (format, value) => {
    setPreferences({
      ...preferences,
      dataFormat: {
        ...preferences.dataFormat,
        [format]: value
      }
    });
  };

  // Handle timezone automatic toggle
  const handleTimezoneAutomaticToggle = () => {
    setPreferences({
      ...preferences,
      timezone: {
        ...preferences.timezone,
        automatic: !preferences.timezone.automatic
      }
    });
  };

  // Handle timezone selection change
  const handleTimezoneChange = (e) => {
    setPreferences({
      ...preferences,
      timezone: {
        ...preferences.timezone,
        selected: e.target.value
      }
    });
  };

  // Save preferences
  const handleSavePreferences = async () => {
    try {
      setSaveStatus('saving');
      await mockSettingsService.updateUserPreferences(preferences);
      setSaveStatus('success');
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setSaveStatus(null);
      }, 3000);
    } catch (err) {
      setSaveStatus('error');
      console.error('Error saving user preferences:', err);
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setSaveStatus(null);
      }, 3000);
    }
  };

  // Show loading state
  if (loading) {
    return <div className="settings-loading">Ładowanie preferencji użytkownika...</div>;
  }

  // Show error state
  if (error) {
    return <div className="settings-error">{error}</div>;
  }

  // Show preferences
  return (
    <div className="user-preferences">
      <SettingsCard title="Powiadomienia">
        <p className="settings-description">
          Wybierz, jakie powiadomienia chcesz otrzymywać i przez jakie kanały.
        </p>
        
        {/* Email notifications */}
        <div className="notification-channel">
          <div className="notification-channel-header">
            <h4 className="notification-channel-title">Email</h4>
            <SettingsToggle
              checked={preferences.notifications.email.enabled}
              onChange={() => handleNotificationChannelToggle('email')}
            />
          </div>
          
          {preferences.notifications.email.enabled && (
            <div className="notification-types">
              {preferences.notifications.email.types.map((type) => (
                <div key={type.id} className="notification-type">
                  <SettingsToggle
                    checked={type.enabled}
                    onChange={() => handleNotificationTypeToggle('email', type.id)}
                    label={type.name}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Push notifications */}
        <div className="notification-channel">
          <div className="notification-channel-header">
            <h4 className="notification-channel-title">Powiadomienia push</h4>
            <SettingsToggle
              checked={preferences.notifications.push.enabled}
              onChange={() => handleNotificationChannelToggle('push')}
            />
          </div>
          
          {preferences.notifications.push.enabled && (
            <div className="notification-types">
              {preferences.notifications.push.types.map((type) => (
                <div key={type.id} className="notification-type">
                  <SettingsToggle
                    checked={type.enabled}
                    onChange={() => handleNotificationTypeToggle('push', type.id)}
                    label={type.name}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* SMS notifications */}
        <div className="notification-channel">
          <div className="notification-channel-header">
            <h4 className="notification-channel-title">SMS</h4>
            <SettingsToggle
              checked={preferences.notifications.sms.enabled}
              onChange={() => handleNotificationChannelToggle('sms')}
            />
          </div>
          
          {preferences.notifications.sms.enabled && (
            <div className="notification-types">
              {preferences.notifications.sms.types.map((type) => (
                <div key={type.id} className="notification-type">
                  <SettingsToggle
                    checked={type.enabled}
                    onChange={() => handleNotificationTypeToggle('sms', type.id)}
                    label={type.name}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </SettingsCard>

      <SettingsCard title="Częstotliwość raportów">
        <p className="settings-description">
          Wybierz, jak często chcesz otrzymywać raporty.
        </p>
        <div className="settings-form-row">
          <SettingsSelect
            label="Częstotliwość raportów"
            value={preferences.reportFrequency}
            onChange={handleReportFrequencyChange}
            options={[
              { value: 'daily', label: 'Codziennie' },
              { value: 'weekly', label: 'Co tydzień' },
              { value: 'monthly', label: 'Co miesiąc' }
            ]}
          />
        </div>
      </SettingsCard>

      <SettingsCard title="Format danych">
        <p className="settings-description">
          Wybierz preferowane jednostki miary.
        </p>
        
        <div className="settings-form-row">
          <SettingsSelect
            label="Jednostka odległości"
            value={preferences.dataFormat.distance}
            onChange={(e) => handleDataFormatChange('distance', e.target.value)}
            options={[
              { value: 'km', label: 'Kilometry (km)' },
              { value: 'miles', label: 'Mile' }
            ]}
          />
        </div>
        
        <div className="settings-form-row">
          <SettingsSelect
            label="Jednostka objętości"
            value={preferences.dataFormat.volume}
            onChange={(e) => handleDataFormatChange('volume', e.target.value)}
            options={[
              { value: 'liters', label: 'Litry (l)' },
              { value: 'gallons', label: 'Galony' }
            ]}
          />
        </div>
        
        <div className="settings-form-row">
          <SettingsSelect
            label="Waluta"
            value={preferences.dataFormat.currency}
            onChange={(e) => handleDataFormatChange('currency', e.target.value)}
            options={[
              { value: 'PLN', label: 'Złoty (PLN)' },
              { value: 'EUR', label: 'Euro (EUR)' },
              { value: 'USD', label: 'Dolar amerykański (USD)' }
            ]}
          />
        </div>
        
        <div className="settings-form-row">
          <SettingsSelect
            label="Jednostka temperatury"
            value={preferences.dataFormat.temperature}
            onChange={(e) => handleDataFormatChange('temperature', e.target.value)}
            options={[
              { value: 'celsius', label: 'Celsjusz (°C)' },
              { value: 'fahrenheit', label: 'Fahrenheit (°F)' }
            ]}
          />
        </div>
      </SettingsCard>

      <SettingsCard title="Strefa czasowa">
        <p className="settings-description">
          Wybierz strefę czasową dla wyświetlania danych.
        </p>
        
        <div className="settings-form-row">
          <SettingsToggle
            checked={preferences.timezone.automatic}
            onChange={handleTimezoneAutomaticToggle}
            label="Automatyczna strefa czasowa"
          />
        </div>
        
        {!preferences.timezone.automatic && (
          <div className="settings-form-row">
            <SettingsSelect
              label="Wybierz strefę czasową"
              value={preferences.timezone.selected}
              onChange={handleTimezoneChange}
              options={preferences.availableTimezones}
              disabled={preferences.timezone.automatic}
            />
          </div>
        )}
      </SettingsCard>

      <div className="settings-actions">
        <SettingsButton 
          type="primary" 
          onClick={handleSavePreferences}
          disabled={saveStatus === 'saving'}
        >
          {saveStatus === 'saving' ? 'Zapisywanie...' : 'Zapisz preferencje'}
        </SettingsButton>
        
        {saveStatus === 'success' && (
          <div className="settings-save-status settings-save-success">
            Preferencje zostały zapisane pomyślnie.
          </div>
        )}
        
        {saveStatus === 'error' && (
          <div className="settings-save-status settings-save-error">
            Wystąpił błąd podczas zapisywania preferencji.
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPreferences;
