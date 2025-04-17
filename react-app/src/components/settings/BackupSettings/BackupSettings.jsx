import React, { useState, useEffect } from 'react';
import './BackupSettings.css';
import SettingsCard from '../common/SettingsCard';
import SettingsInput from '../common/SettingsInput';
import SettingsSelect from '../common/SettingsSelect';
import SettingsToggle from '../common/SettingsToggle';
import SettingsButton from '../common/SettingsButton';
import mockSettingsService from '../../../services/api/mockSettingsService';

/**
 * BackupSettings component
 * 
 * This component allows users to configure backup and history settings:
 * - Backup schedule
 * - Data retention policies
 * - History export options
 * - Data archiving rules
 * 
 * @returns {JSX.Element} BackupSettings component
 */
const BackupSettings = () => {
  // State for backup settings
  const [backup, setBackup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saveStatus, setSaveStatus] = useState(null);

  // Fetch backup settings
  useEffect(() => {
    const fetchBackup = async () => {
      try {
        setLoading(true);
        const data = await mockSettingsService.getBackupSettings();
        setBackup(data);
        setError(null);
      } catch (err) {
        setError('Nie udało się pobrać ustawień kopii zapasowych');
        console.error('Error fetching backup settings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBackup();
  }, []);

  // Handle backup schedule change
  const handleBackupScheduleChange = (schedule) => {
    setBackup({
      ...backup,
      backupSchedule: {
        ...backup.backupSchedule,
        frequency: schedule
      }
    });
  };

  // Handle backup time change
  const handleBackupTimeChange = (time) => {
    setBackup({
      ...backup,
      backupSchedule: {
        ...backup.backupSchedule,
        time
      }
    });
  };

  // Handle backup location change
  const handleBackupLocationChange = (location) => {
    setBackup({
      ...backup,
      backupSchedule: {
        ...backup.backupSchedule,
        location
      }
    });
  };

  // Handle retention period change
  const handleRetentionPeriodChange = (dataType, period) => {
    const updatedRetentionPolicies = backup.dataRetention.map(policy => {
      if (policy.dataType === dataType) {
        return {
          ...policy,
          retentionPeriod: parseInt(period, 10)
        };
      }
      return policy;
    });

    setBackup({
      ...backup,
      dataRetention: updatedRetentionPolicies
    });
  };

  // Handle export format change
  const handleExportFormatChange = (format) => {
    setBackup({
      ...backup,
      historyExport: {
        ...backup.historyExport,
        defaultFormat: format
      }
    });
  };

  // Handle export schedule toggle
  const handleExportScheduleToggle = () => {
    setBackup({
      ...backup,
      historyExport: {
        ...backup.historyExport,
        scheduledExport: !backup.historyExport.scheduledExport
      }
    });
  };

  // Handle export schedule frequency change
  const handleExportFrequencyChange = (frequency) => {
    setBackup({
      ...backup,
      historyExport: {
        ...backup.historyExport,
        exportFrequency: frequency
      }
    });
  };

  // Handle archiving toggle
  const handleArchivingToggle = () => {
    setBackup({
      ...backup,
      dataArchiving: {
        ...backup.dataArchiving,
        enabled: !backup.dataArchiving.enabled
      }
    });
  };

  // Handle archiving threshold change
  const handleArchivingThresholdChange = (threshold) => {
    setBackup({
      ...backup,
      dataArchiving: {
        ...backup.dataArchiving,
        archiveThreshold: parseInt(threshold, 10)
      }
    });
  };

  // Handle archiving location change
  const handleArchivingLocationChange = (location) => {
    setBackup({
      ...backup,
      dataArchiving: {
        ...backup.dataArchiving,
        archiveLocation: location
      }
    });
  };

  // Save backup settings
  const handleSaveBackup = async () => {
    try {
      setSaveStatus('saving');
      await mockSettingsService.updateBackupSettings(backup);
      setSaveStatus('success');
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setSaveStatus(null);
      }, 3000);
    } catch (err) {
      setSaveStatus('error');
      console.error('Error saving backup settings:', err);
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setSaveStatus(null);
      }, 3000);
    }
  };

  // Handle manual backup
  const handleManualBackup = async () => {
    try {
      await mockSettingsService.createManualBackup();
      
      // Update last backup time
      setBackup({
        ...backup,
        backupSchedule: {
          ...backup.backupSchedule,
          lastBackup: new Date().toLocaleString()
        }
      });
      
      alert('Kopia zapasowa została utworzona pomyślnie.');
    } catch (err) {
      console.error('Error creating manual backup:', err);
      alert('Wystąpił błąd podczas tworzenia kopii zapasowej.');
    }
  };

  // Show loading state
  if (loading) {
    return <div className="settings-loading">Ładowanie ustawień kopii zapasowych...</div>;
  }

  // Show error state
  if (error) {
    return <div className="settings-error">{error}</div>;
  }

  // Show backup settings
  return (
    <div className="backup-settings">
      <SettingsCard title="Harmonogram kopii zapasowych">
        <p className="settings-description">
          Konfiguruj automatyczne tworzenie kopii zapasowych.
        </p>
        
        <div className="backup-schedule">
          <div className="settings-form-row">
            <SettingsSelect
              label="Częstotliwość"
              value={backup.backupSchedule.frequency}
              onChange={(e) => handleBackupScheduleChange(e.target.value)}
              options={[
                { value: 'daily', label: 'Codziennie' },
                { value: 'weekly', label: 'Co tydzień' },
                { value: 'monthly', label: 'Co miesiąc' }
              ]}
            />
          </div>
          
          <div className="settings-form-row">
            <SettingsInput
              label="Godzina"
              type="time"
              value={backup.backupSchedule.time}
              onChange={(e) => handleBackupTimeChange(e.target.value)}
            />
            <div className="setting-hint">Godzina w strefie czasowej serwera</div>
          </div>
          
          <div className="settings-form-row">
            <SettingsInput
              label="Lokalizacja kopii zapasowych"
              value={backup.backupSchedule.location}
              onChange={(e) => handleBackupLocationChange(e.target.value)}
            />
            <div className="setting-hint">Ścieżka do katalogu lub adres URL</div>
          </div>
          
          <div className="last-backup-info">
            Ostatnia kopia zapasowa: {backup.backupSchedule.lastBackup || 'Brak'}
          </div>
          
          <div className="manual-backup">
            <SettingsButton 
              onClick={handleManualBackup}
              type="primary"
            >
              Utwórz kopię zapasową teraz
            </SettingsButton>
          </div>
        </div>
      </SettingsCard>

      <SettingsCard title="Retencja danych">
        <p className="settings-description">
          Określ, jak długo różne typy danych powinny być przechowywane.
        </p>
        
        <div className="data-retention">
          <table className="settings-table">
            <thead>
              <tr>
                <th>Typ danych</th>
                <th>Okres przechowywania (dni)</th>
                <th>Opis</th>
              </tr>
            </thead>
            <tbody>
              {backup.dataRetention.map((policy) => (
                <tr key={policy.dataType}>
                  <td>{policy.displayName}</td>
                  <td>
                    <SettingsInput
                      type="number"
                      min="1"
                      max="3650"
                      value={policy.retentionPeriod}
                      onChange={(e) => handleRetentionPeriodChange(policy.dataType, e.target.value)}
                      className="retention-input"
                    />
                  </td>
                  <td>{policy.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="retention-note">
            Wartość 0 oznacza przechowywanie danych bez ograniczeń czasowych.
          </div>
        </div>
      </SettingsCard>

      <SettingsCard title="Eksport historii">
        <p className="settings-description">
          Konfiguruj opcje eksportu danych historycznych.
        </p>
        
        <div className="history-export">
          <div className="settings-form-row">
            <SettingsSelect
              label="Domyślny format eksportu"
              value={backup.historyExport.defaultFormat}
              onChange={(e) => handleExportFormatChange(e.target.value)}
              options={[
                { value: 'csv', label: 'CSV' },
                { value: 'excel', label: 'Excel' },
                { value: 'pdf', label: 'PDF' },
                { value: 'json', label: 'JSON' }
              ]}
            />
          </div>
          
          <div className="settings-form-row">
            <SettingsToggle
              label="Zaplanowany eksport"
              checked={backup.historyExport.scheduledExport}
              onChange={handleExportScheduleToggle}
            />
          </div>
          
          {backup.historyExport.scheduledExport && (
            <div className="settings-form-row">
              <SettingsSelect
                label="Częstotliwość eksportu"
                value={backup.historyExport.exportFrequency}
                onChange={(e) => handleExportFrequencyChange(e.target.value)}
                options={[
                  { value: 'weekly', label: 'Co tydzień' },
                  { value: 'monthly', label: 'Co miesiąc' },
                  { value: 'quarterly', label: 'Co kwartał' }
                ]}
              />
            </div>
          )}
          
          <div className="export-destinations">
            <h4 className="export-section-title">Miejsca docelowe eksportu</h4>
            
            {backup.historyExport.exportDestinations.map((destination) => (
              <div key={destination.id} className="destination-item">
                <SettingsToggle
                  label={destination.name}
                  checked={destination.enabled}
                  onChange={() => {
                    const updatedDestinations = backup.historyExport.exportDestinations.map(dest => {
                      if (dest.id === destination.id) {
                        return {
                          ...dest,
                          enabled: !dest.enabled
                        };
                      }
                      return dest;
                    });
                    
                    setBackup({
                      ...backup,
                      historyExport: {
                        ...backup.historyExport,
                        exportDestinations: updatedDestinations
                      }
                    });
                  }}
                />
                {destination.enabled && (
                  <div className="destination-config">
                    <SettingsInput
                      label="Ścieżka/URL"
                      value={destination.path}
                      onChange={(e) => {
                        const updatedDestinations = backup.historyExport.exportDestinations.map(dest => {
                          if (dest.id === destination.id) {
                            return {
                              ...dest,
                              path: e.target.value
                            };
                          }
                          return dest;
                        });
                        
                        setBackup({
                          ...backup,
                          historyExport: {
                            ...backup.historyExport,
                            exportDestinations: updatedDestinations
                          }
                        });
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </SettingsCard>

      <SettingsCard title="Archiwizacja">
        <p className="settings-description">
          Konfiguruj zasady archiwizacji starszych danych.
        </p>
        
        <div className="data-archiving">
          <div className="settings-form-row">
            <SettingsToggle
              label="Włącz automatyczną archiwizację"
              checked={backup.dataArchiving.enabled}
              onChange={handleArchivingToggle}
            />
          </div>
          
          {backup.dataArchiving.enabled && (
            <>
              <div className="settings-form-row">
                <SettingsInput
                  label="Próg archiwizacji (dni)"
                  type="number"
                  min="30"
                  max="3650"
                  value={backup.dataArchiving.archiveThreshold}
                  onChange={(e) => handleArchivingThresholdChange(e.target.value)}
                />
                <div className="setting-hint">Dane starsze niż podana liczba dni będą archiwizowane</div>
              </div>
              
              <div className="settings-form-row">
                <SettingsInput
                  label="Lokalizacja archiwum"
                  value={backup.dataArchiving.archiveLocation}
                  onChange={(e) => handleArchivingLocationChange(e.target.value)}
                />
                <div className="setting-hint">Ścieżka do katalogu lub adres URL</div>
              </div>
              
              <div className="archive-types">
                <h4 className="archive-section-title">Typy danych do archiwizacji</h4>
                
                {backup.dataArchiving.dataTypes.map((dataType) => (
                  <div key={dataType.id} className="archive-type-item">
                    <SettingsToggle
                      label={dataType.name}
                      checked={dataType.enabled}
                      onChange={() => {
                        const updatedDataTypes = backup.dataArchiving.dataTypes.map(type => {
                          if (type.id === dataType.id) {
                            return {
                              ...type,
                              enabled: !type.enabled
                            };
                          }
                          return type;
                        });
                        
                        setBackup({
                          ...backup,
                          dataArchiving: {
                            ...backup.dataArchiving,
                            dataTypes: updatedDataTypes
                          }
                        });
                      }}
                    />
                    <div className="archive-type-description">
                      {dataType.description}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </SettingsCard>

      <div className="settings-actions">
        <SettingsButton 
          type="primary" 
          onClick={handleSaveBackup}
          disabled={saveStatus === 'saving'}
        >
          {saveStatus === 'saving' ? 'Zapisywanie...' : 'Zapisz ustawienia kopii zapasowych'}
        </SettingsButton>
        
        {saveStatus === 'success' && (
          <div className="settings-save-status settings-save-success">
            Ustawienia kopii zapasowych zostały zapisane pomyślnie.
          </div>
        )}
        
        {saveStatus === 'error' && (
          <div className="settings-save-status settings-save-error">
            Wystąpił błąd podczas zapisywania ustawień kopii zapasowych.
          </div>
        )}
      </div>
    </div>
  );
};

export default BackupSettings;
