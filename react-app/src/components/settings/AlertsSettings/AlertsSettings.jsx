import React, { useState, useEffect } from 'react';
import './AlertsSettings.css';
import SettingsCard from '../common/SettingsCard';
import SettingsInput from '../common/SettingsInput';
import SettingsSelect from '../common/SettingsSelect';
import SettingsToggle from '../common/SettingsToggle';
import SettingsButton from '../common/SettingsButton';
import mockSettingsService from '../../../services/api/mockSettingsService';

/**
 * AlertsSettings component
 * 
 * This component allows users to configure alerts and thresholds:
 * - Alert types and thresholds
 * - Notification channels for alerts
 * - Alert priorities
 * - Alert schedule
 * 
 * @returns {JSX.Element} AlertsSettings component
 */
const AlertsSettings = () => {
  // State for alerts settings
  const [alerts, setAlerts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saveStatus, setSaveStatus] = useState(null);
  
  // State for editing
  const [editingAlert, setEditingAlert] = useState(null);

  // Fetch alerts settings
  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        setLoading(true);
        const data = await mockSettingsService.getAlertsSettings();
        setAlerts(data);
        setError(null);
      } catch (err) {
        setError('Nie udało się pobrać ustawień alertów');
        console.error('Error fetching alerts settings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  // Handle alert threshold change
  const handleThresholdChange = (alertId, value) => {
    const updatedAlertTypes = alerts.alertTypes.map(alert => {
      if (alert.id === alertId) {
        return {
          ...alert,
          threshold: parseFloat(value)
        };
      }
      return alert;
    });

    setAlerts({
      ...alerts,
      alertTypes: updatedAlertTypes
    });
  };

  // Handle alert enabled toggle
  const handleAlertEnabledToggle = (alertId) => {
    const updatedAlertTypes = alerts.alertTypes.map(alert => {
      if (alert.id === alertId) {
        return {
          ...alert,
          enabled: !alert.enabled
        };
      }
      return alert;
    });

    setAlerts({
      ...alerts,
      alertTypes: updatedAlertTypes
    });
  };

  // Handle notification channel toggle
  const handleNotificationChannelToggle = (alertId, channel) => {
    const updatedAlertTypes = alerts.alertTypes.map(alert => {
      if (alert.id === alertId) {
        return {
          ...alert,
          notificationChannels: alert.notificationChannels.includes(channel)
            ? alert.notificationChannels.filter(c => c !== channel)
            : [...alert.notificationChannels, channel]
        };
      }
      return alert;
    });

    setAlerts({
      ...alerts,
      alertTypes: updatedAlertTypes
    });
  };

  // Handle priority change
  const handlePriorityChange = (alertId, priority) => {
    const updatedAlertTypes = alerts.alertTypes.map(alert => {
      if (alert.id === alertId) {
        return {
          ...alert,
          priority
        };
      }
      return alert;
    });

    setAlerts({
      ...alerts,
      alertTypes: updatedAlertTypes
    });
  };

  // Start editing alert
  const startEditingAlert = (alert) => {
    setEditingAlert({
      ...alert
    });
  };

  // Save edited alert
  const saveEditedAlert = () => {
    const updatedAlertTypes = alerts.alertTypes.map(alert => {
      if (alert.id === editingAlert.id) {
        return editingAlert;
      }
      return alert;
    });

    setAlerts({
      ...alerts,
      alertTypes: updatedAlertTypes
    });

    setEditingAlert(null);
  };

  // Cancel editing alert
  const cancelEditingAlert = () => {
    setEditingAlert(null);
  };

  // Handle schedule day toggle
  const handleScheduleDayToggle = (day) => {
    setAlerts({
      ...alerts,
      alertSchedule: {
        ...alerts.alertSchedule,
        days: alerts.alertSchedule.days.includes(day)
          ? alerts.alertSchedule.days.filter(d => d !== day)
          : [...alerts.alertSchedule.days, day]
      }
    });
  };

  // Handle schedule time change
  const handleScheduleTimeChange = (type, value) => {
    setAlerts({
      ...alerts,
      alertSchedule: {
        ...alerts.alertSchedule,
        time: {
          ...alerts.alertSchedule.time,
          [type]: value
        }
      }
    });
  };

  // Save alerts settings
  const handleSaveAlerts = async () => {
    try {
      setSaveStatus('saving');
      await mockSettingsService.updateAlertsSettings(alerts);
      setSaveStatus('success');
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setSaveStatus(null);
      }, 3000);
    } catch (err) {
      setSaveStatus('error');
      console.error('Error saving alerts settings:', err);
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setSaveStatus(null);
      }, 3000);
    }
  };

  // Show loading state
  if (loading) {
    return <div className="settings-loading">Ładowanie ustawień alertów...</div>;
  }

  // Show error state
  if (error) {
    return <div className="settings-error">{error}</div>;
  }

  // Show alerts settings
  return (
    <div className="alerts-settings">
      <SettingsCard title="Typy alertów i progi">
        <p className="settings-description">
          Zarządzaj typami alertów i ich progami.
        </p>
        
        <div className="alert-types">
          <table className="settings-table">
            <thead>
              <tr>
                <th>Nazwa</th>
                <th>Próg</th>
                <th>Jednostka</th>
                <th>Priorytet</th>
                <th>Status</th>
                <th>Akcje</th>
              </tr>
            </thead>
            <tbody>
              {alerts.alertTypes.map((alert) => (
                <tr key={alert.id}>
                  <td>{alert.name}</td>
                  <td>
                    <SettingsInput
                      type="number"
                      value={alert.threshold}
                      onChange={(e) => handleThresholdChange(alert.id, e.target.value)}
                      disabled={!alert.enabled}
                      className="threshold-input"
                    />
                  </td>
                  <td>{alert.unit}</td>
                  <td>
                    <SettingsSelect
                      value={alert.priority}
                      onChange={(e) => handlePriorityChange(alert.id, e.target.value)}
                      options={[
                        { value: 'low', label: 'Niski' },
                        { value: 'medium', label: 'Średni' },
                        { value: 'high', label: 'Wysoki' },
                        { value: 'critical', label: 'Krytyczny' }
                      ]}
                      disabled={!alert.enabled}
                      className="priority-select"
                    />
                  </td>
                  <td>
                    <SettingsToggle
                      checked={alert.enabled}
                      onChange={() => handleAlertEnabledToggle(alert.id)}
                    />
                  </td>
                  <td>
                    <SettingsButton 
                      onClick={() => startEditingAlert(alert)}
                      className="small-button"
                      disabled={!alert.enabled}
                    >
                      Edytuj
                    </SettingsButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {editingAlert && (
          <div className="edit-modal">
            <div className="edit-modal-content">
              <h3>Edytuj alert: {editingAlert.name}</h3>
              
              <div className="settings-form-row">
                <SettingsInput
                  label="Próg"
                  type="number"
                  value={editingAlert.threshold}
                  onChange={(e) => setEditingAlert({...editingAlert, threshold: parseFloat(e.target.value)})}
                />
                <span className="unit-label">{editingAlert.unit}</span>
              </div>
              
              <div className="settings-form-row">
                <SettingsSelect
                  label="Priorytet"
                  value={editingAlert.priority}
                  onChange={(e) => setEditingAlert({...editingAlert, priority: e.target.value})}
                  options={[
                    { value: 'low', label: 'Niski' },
                    { value: 'medium', label: 'Średni' },
                    { value: 'high', label: 'Wysoki' },
                    { value: 'critical', label: 'Krytyczny' }
                  ]}
                />
              </div>
              
              <div className="notification-channels-section">
                <h5>Kanały powiadomień</h5>
                
                <div className="channels-grid">
                  {alerts.availableChannels.map((channel) => (
                    <div key={channel.id} className="channel-item">
                      <SettingsToggle
                        label={channel.name}
                        checked={editingAlert.notificationChannels.includes(channel.id)}
                        onChange={() => setEditingAlert({
                          ...editingAlert,
                          notificationChannels: editingAlert.notificationChannels.includes(channel.id)
                            ? editingAlert.notificationChannels.filter(c => c !== channel.id)
                            : [...editingAlert.notificationChannels, channel.id]
                        })}
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="edit-modal-actions">
                <SettingsButton onClick={cancelEditingAlert}>
                  Anuluj
                </SettingsButton>
                <SettingsButton 
                  type="primary" 
                  onClick={saveEditedAlert}
                >
                  Zapisz
                </SettingsButton>
              </div>
            </div>
          </div>
        )}
      </SettingsCard>

      <SettingsCard title="Kanały powiadomień">
        <p className="settings-description">
          Wybierz kanały powiadomień dla poszczególnych typów alertów.
        </p>
        
        <div className="notification-channels">
          <table className="settings-table">
            <thead>
              <tr>
                <th>Alert</th>
                {alerts.availableChannels.map((channel) => (
                  <th key={channel.id}>{channel.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {alerts.alertTypes.filter(alert => alert.enabled).map((alert) => (
                <tr key={alert.id}>
                  <td>{alert.name}</td>
                  {alerts.availableChannels.map((channel) => (
                    <td key={channel.id}>
                      <SettingsToggle
                        checked={alert.notificationChannels.includes(channel.id)}
                        onChange={() => handleNotificationChannelToggle(alert.id, channel.id)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SettingsCard>

      <SettingsCard title="Harmonogram alertów">
        <p className="settings-description">
          Ustaw, kiedy alerty mają być aktywne.
        </p>
        
        <div className="alert-schedule">
          <div className="schedule-days">
            <h4 className="schedule-section-title">Dni tygodnia</h4>
            
            <div className="days-grid">
              {[
                { id: 'monday', name: 'Poniedziałek' },
                { id: 'tuesday', name: 'Wtorek' },
                { id: 'wednesday', name: 'Środa' },
                { id: 'thursday', name: 'Czwartek' },
                { id: 'friday', name: 'Piątek' },
                { id: 'saturday', name: 'Sobota' },
                { id: 'sunday', name: 'Niedziela' }
              ].map((day) => (
                <div key={day.id} className="day-item">
                  <SettingsToggle
                    label={day.name}
                    checked={alerts.alertSchedule.days.includes(day.id)}
                    onChange={() => handleScheduleDayToggle(day.id)}
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div className="schedule-time">
            <h4 className="schedule-section-title">Godziny</h4>
            
            <div className="time-range">
              <div className="time-input">
                <SettingsInput
                  label="Od"
                  type="time"
                  value={alerts.alertSchedule.time.start}
                  onChange={(e) => handleScheduleTimeChange('start', e.target.value)}
                />
              </div>
              
              <div className="time-input">
                <SettingsInput
                  label="Do"
                  type="time"
                  value={alerts.alertSchedule.time.end}
                  onChange={(e) => handleScheduleTimeChange('end', e.target.value)}
                />
              </div>
            </div>
            
            <div className="schedule-note">
              Alerty będą aktywne tylko w wybranych dniach i godzinach.
              Poza tym czasem alerty będą gromadzone, ale powiadomienia nie będą wysyłane.
            </div>
          </div>
        </div>
      </SettingsCard>

      <div className="settings-actions">
        <SettingsButton 
          type="primary" 
          onClick={handleSaveAlerts}
          disabled={saveStatus === 'saving'}
        >
          {saveStatus === 'saving' ? 'Zapisywanie...' : 'Zapisz ustawienia alertów'}
        </SettingsButton>
        
        {saveStatus === 'success' && (
          <div className="settings-save-status settings-save-success">
            Ustawienia alertów zostały zapisane pomyślnie.
          </div>
        )}
        
        {saveStatus === 'error' && (
          <div className="settings-save-status settings-save-error">
            Wystąpił błąd podczas zapisywania ustawień alertów.
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertsSettings;
