import React, { useState, useEffect } from 'react';
import './IntegrationsSettings.css';
import SettingsCard from '../common/SettingsCard';
import SettingsInput from '../common/SettingsInput';
import SettingsSelect from '../common/SettingsSelect';
import SettingsToggle from '../common/SettingsToggle';
import SettingsButton from '../common/SettingsButton';
import mockSettingsService from '../../../services/api/mockSettingsService';

/**
 * IntegrationsSettings component
 * 
 * This component allows users to configure integrations with external systems:
 * - API keys management
 * - External systems connections
 * - Map providers configuration
 * - Data export/import settings
 * 
 * @returns {JSX.Element} IntegrationsSettings component
 */
const IntegrationsSettings = () => {
  // State for integrations settings
  const [integrations, setIntegrations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saveStatus, setSaveStatus] = useState(null);
  
  // State for editing
  const [editingApiKey, setEditingApiKey] = useState(null);
  const [editingSystem, setEditingSystem] = useState(null);
  const [showNewApiKey, setShowNewApiKey] = useState(false);
  const [newApiKey, setNewApiKey] = useState({
    name: '',
    key: '',
    active: true
  });

  // Fetch integrations settings
  useEffect(() => {
    const fetchIntegrations = async () => {
      try {
        setLoading(true);
        const data = await mockSettingsService.getIntegrations();
        setIntegrations(data);
        setError(null);
      } catch (err) {
        setError('Nie udało się pobrać ustawień integracji');
        console.error('Error fetching integrations settings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchIntegrations();
  }, []);

  // Handle map provider change
  const handleMapProviderChange = (providerId) => {
    const updatedProviders = integrations.mapProviders.map(provider => {
      if (provider.id === providerId) {
        return {
          ...provider,
          active: true
        };
      }
      return {
        ...provider,
        active: false
      };
    });

    setIntegrations({
      ...integrations,
      mapProviders: updatedProviders
    });
  };

  // Handle map provider API key change
  const handleMapProviderApiKeyChange = (providerId, apiKey) => {
    const updatedProviders = integrations.mapProviders.map(provider => {
      if (provider.id === providerId) {
        return {
          ...provider,
          apiKey
        };
      }
      return provider;
    });

    setIntegrations({
      ...integrations,
      mapProviders: updatedProviders
    });
  };

  // Handle automatic export toggle
  const handleAutomaticExportToggle = () => {
    setIntegrations({
      ...integrations,
      dataExportImport: {
        ...integrations.dataExportImport,
        automaticExport: {
          ...integrations.dataExportImport.automaticExport,
          enabled: !integrations.dataExportImport.automaticExport.enabled
        }
      }
    });
  };

  // Handle automatic import toggle
  const handleAutomaticImportToggle = () => {
    setIntegrations({
      ...integrations,
      dataExportImport: {
        ...integrations.dataExportImport,
        automaticImport: {
          ...integrations.dataExportImport.automaticImport,
          enabled: !integrations.dataExportImport.automaticImport.enabled
        }
      }
    });
  };

  // Handle export frequency change
  const handleExportFrequencyChange = (e) => {
    setIntegrations({
      ...integrations,
      dataExportImport: {
        ...integrations.dataExportImport,
        automaticExport: {
          ...integrations.dataExportImport.automaticExport,
          frequency: e.target.value
        }
      }
    });
  };

  // Handle export format change
  const handleExportFormatChange = (e) => {
    setIntegrations({
      ...integrations,
      dataExportImport: {
        ...integrations.dataExportImport,
        automaticExport: {
          ...integrations.dataExportImport.automaticExport,
          format: e.target.value
        }
      }
    });
  };

  // Handle export destination change
  const handleExportDestinationChange = (e) => {
    setIntegrations({
      ...integrations,
      dataExportImport: {
        ...integrations.dataExportImport,
        automaticExport: {
          ...integrations.dataExportImport.automaticExport,
          destination: e.target.value
        }
      }
    });
  };

  // Handle import frequency change
  const handleImportFrequencyChange = (e) => {
    setIntegrations({
      ...integrations,
      dataExportImport: {
        ...integrations.dataExportImport,
        automaticImport: {
          ...integrations.dataExportImport.automaticImport,
          frequency: e.target.value
        }
      }
    });
  };

  // Handle import source change
  const handleImportSourceChange = (e) => {
    setIntegrations({
      ...integrations,
      dataExportImport: {
        ...integrations.dataExportImport,
        automaticImport: {
          ...integrations.dataExportImport.automaticImport,
          source: e.target.value
        }
      }
    });
  };

  // Start editing API key
  const startEditingApiKey = (apiKey) => {
    setEditingApiKey({
      ...apiKey
    });
  };

  // Save edited API key
  const saveEditedApiKey = () => {
    const updatedApiKeys = integrations.apiKeys.map(apiKey => {
      if (apiKey.id === editingApiKey.id) {
        return editingApiKey;
      }
      return apiKey;
    });

    setIntegrations({
      ...integrations,
      apiKeys: updatedApiKeys
    });

    setEditingApiKey(null);
  };

  // Cancel editing API key
  const cancelEditingApiKey = () => {
    setEditingApiKey(null);
  };

  // Toggle API key active status
  const toggleApiKeyActive = (apiKeyId) => {
    const updatedApiKeys = integrations.apiKeys.map(apiKey => {
      if (apiKey.id === apiKeyId) {
        return {
          ...apiKey,
          active: !apiKey.active
        };
      }
      return apiKey;
    });

    setIntegrations({
      ...integrations,
      apiKeys: updatedApiKeys
    });
  };

  // Start editing external system
  const startEditingSystem = (system) => {
    setEditingSystem({
      ...system
    });
  };

  // Save edited external system
  const saveEditedSystem = () => {
    const updatedSystems = integrations.externalSystems.map(system => {
      if (system.id === editingSystem.id) {
        return editingSystem;
      }
      return system;
    });

    setIntegrations({
      ...integrations,
      externalSystems: updatedSystems
    });

    setEditingSystem(null);
  };

  // Cancel editing external system
  const cancelEditingSystem = () => {
    setEditingSystem(null);
  };

  // Toggle external system connection status
  const toggleSystemConnection = (systemId) => {
    const updatedSystems = integrations.externalSystems.map(system => {
      if (system.id === systemId) {
        return {
          ...system,
          status: system.status === 'connected' ? 'disconnected' : 'connected'
        };
      }
      return system;
    });

    setIntegrations({
      ...integrations,
      externalSystems: updatedSystems
    });
  };

  // Add new API key
  const addNewApiKey = () => {
    const newId = Math.max(...integrations.apiKeys.map(key => key.id)) + 1;
    const currentDate = new Date().toISOString().split('T')[0];
    
    const apiKeyToAdd = {
      id: newId,
      name: newApiKey.name,
      key: newApiKey.key,
      active: newApiKey.active,
      created: currentDate,
      lastUsed: currentDate
    };
    
    setIntegrations({
      ...integrations,
      apiKeys: [...integrations.apiKeys, apiKeyToAdd]
    });
    
    setNewApiKey({
      name: '',
      key: '',
      active: true
    });
    
    setShowNewApiKey(false);
  };

  // Save integrations settings
  const handleSaveIntegrations = async () => {
    try {
      setSaveStatus('saving');
      await mockSettingsService.updateIntegrations(integrations);
      setSaveStatus('success');
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setSaveStatus(null);
      }, 3000);
    } catch (err) {
      setSaveStatus('error');
      console.error('Error saving integrations settings:', err);
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setSaveStatus(null);
      }, 3000);
    }
  };

  // Show loading state
  if (loading) {
    return <div className="settings-loading">Ładowanie ustawień integracji...</div>;
  }

  // Show error state
  if (error) {
    return <div className="settings-error">{error}</div>;
  }

  // Show integrations settings
  return (
    <div className="integrations-settings">
      <SettingsCard title="Klucze API">
        <p className="settings-description">
          Zarządzaj kluczami API do integracji z zewnętrznymi systemami.
        </p>
        
        <div className="api-keys">
          <table className="settings-table">
            <thead>
              <tr>
                <th>Nazwa</th>
                <th>Klucz</th>
                <th>Status</th>
                <th>Utworzony</th>
                <th>Ostatnio użyty</th>
                <th>Akcje</th>
              </tr>
            </thead>
            <tbody>
              {integrations.apiKeys.map((apiKey) => (
                <tr key={apiKey.id}>
                  <td>{apiKey.name}</td>
                  <td>
                    <span className="masked-key">
                      {apiKey.key.substring(0, 4)}...{apiKey.key.substring(apiKey.key.length - 4)}
                    </span>
                  </td>
                  <td>
                    <SettingsToggle
                      checked={apiKey.active}
                      onChange={() => toggleApiKeyActive(apiKey.id)}
                    />
                  </td>
                  <td>{apiKey.created}</td>
                  <td>{apiKey.lastUsed}</td>
                  <td>
                    <SettingsButton 
                      onClick={() => startEditingApiKey(apiKey)}
                      className="small-button"
                    >
                      Edytuj
                    </SettingsButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="add-new-section">
            {!showNewApiKey ? (
              <SettingsButton 
                onClick={() => setShowNewApiKey(true)}
                type="primary"
              >
                Dodaj nowy klucz API
              </SettingsButton>
            ) : (
              <div className="add-new-form">
                <h4>Dodaj nowy klucz API</h4>
                
                <div className="settings-form-row">
                  <SettingsInput
                    label="Nazwa"
                    value={newApiKey.name}
                    onChange={(e) => setNewApiKey({...newApiKey, name: e.target.value})}
                  />
                </div>
                
                <div className="settings-form-row">
                  <SettingsInput
                    label="Klucz"
                    value={newApiKey.key}
                    onChange={(e) => setNewApiKey({...newApiKey, key: e.target.value})}
                  />
                </div>
                
                <div className="settings-form-row">
                  <SettingsToggle
                    label="Aktywny"
                    checked={newApiKey.active}
                    onChange={() => setNewApiKey({...newApiKey, active: !newApiKey.active})}
                  />
                </div>
                
                <div className="form-actions">
                  <SettingsButton onClick={() => setShowNewApiKey(false)}>
                    Anuluj
                  </SettingsButton>
                  <SettingsButton 
                    type="primary" 
                    onClick={addNewApiKey}
                    disabled={!newApiKey.name || !newApiKey.key}
                  >
                    Dodaj
                  </SettingsButton>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {editingApiKey && (
          <div className="edit-modal">
            <div className="edit-modal-content">
              <h3>Edytuj klucz API</h3>
              
              <div className="settings-form-row">
                <SettingsInput
                  label="Nazwa"
                  value={editingApiKey.name}
                  onChange={(e) => setEditingApiKey({...editingApiKey, name: e.target.value})}
                />
              </div>
              
              <div className="settings-form-row">
                <SettingsInput
                  label="Klucz"
                  value={editingApiKey.key}
                  onChange={(e) => setEditingApiKey({...editingApiKey, key: e.target.value})}
                />
              </div>
              
              <div className="settings-form-row">
                <SettingsToggle
                  label="Aktywny"
                  checked={editingApiKey.active}
                  onChange={() => setEditingApiKey({...editingApiKey, active: !editingApiKey.active})}
                />
              </div>
              
              <div className="edit-modal-actions">
                <SettingsButton onClick={cancelEditingApiKey}>
                  Anuluj
                </SettingsButton>
                <SettingsButton 
                  type="primary" 
                  onClick={saveEditedApiKey}
                >
                  Zapisz
                </SettingsButton>
              </div>
            </div>
          </div>
        )}
      </SettingsCard>

      <SettingsCard title="Systemy zewnętrzne">
        <p className="settings-description">
          Zarządzaj połączeniami z zewnętrznymi systemami.
        </p>
        
        <div className="external-systems">
          <table className="settings-table">
            <thead>
              <tr>
                <th>Nazwa</th>
                <th>Typ</th>
                <th>Status</th>
                <th>Ostatnia synchronizacja</th>
                <th>Akcje</th>
              </tr>
            </thead>
            <tbody>
              {integrations.externalSystems.map((system) => (
                <tr key={system.id}>
                  <td>{system.name}</td>
                  <td>{getSystemTypeLabel(system.type)}</td>
                  <td>
                    <div className="connection-status">
                      <span className={`status-indicator status-${system.status}`}></span>
                      <span>{system.status === 'connected' ? 'Połączony' : 'Rozłączony'}</span>
                    </div>
                  </td>
                  <td>{system.lastSync || 'Nigdy'}</td>
                  <td>
                    <div className="action-buttons">
                      <SettingsButton 
                        onClick={() => toggleSystemConnection(system.id)}
                        className="small-button"
                        type={system.status === 'connected' ? 'danger' : 'primary'}
                      >
                        {system.status === 'connected' ? 'Rozłącz' : 'Połącz'}
                      </SettingsButton>
                      <SettingsButton 
                        onClick={() => startEditingSystem(system)}
                        className="small-button"
                      >
                        Edytuj
                      </SettingsButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {editingSystem && (
          <div className="edit-modal">
            <div className="edit-modal-content">
              <h3>Edytuj system zewnętrzny</h3>
              
              <div className="settings-form-row">
                <SettingsInput
                  label="Nazwa"
                  value={editingSystem.name}
                  onChange={(e) => setEditingSystem({...editingSystem, name: e.target.value})}
                />
              </div>
              
              <div className="settings-form-row">
                <SettingsSelect
                  label="Typ"
                  value={editingSystem.type}
                  onChange={(e) => setEditingSystem({...editingSystem, type: e.target.value})}
                  options={[
                    { value: 'accounting', label: 'System księgowy' },
                    { value: 'crm', label: 'CRM' },
                    { value: 'erp', label: 'System ERP' }
                  ]}
                />
              </div>
              
              <div className="edit-modal-actions">
                <SettingsButton onClick={cancelEditingSystem}>
                  Anuluj
                </SettingsButton>
                <SettingsButton 
                  type="primary" 
                  onClick={saveEditedSystem}
                >
                  Zapisz
                </SettingsButton>
              </div>
            </div>
          </div>
        )}
      </SettingsCard>

      <SettingsCard title="Dostawcy map">
        <p className="settings-description">
          Wybierz dostawcę map dla aplikacji.
        </p>
        
        <div className="map-providers">
          {integrations.mapProviders.map((provider) => (
            <div key={provider.id} className="map-provider">
              <div className="map-provider-header">
                <SettingsToggle
                  checked={provider.active}
                  onChange={() => handleMapProviderChange(provider.id)}
                  label={provider.name}
                />
              </div>
              
              {provider.active && (
                <div className="map-provider-settings">
                  <SettingsInput
                    label="Klucz API"
                    value={provider.apiKey}
                    onChange={(e) => handleMapProviderApiKeyChange(provider.id, e.target.value)}
                    placeholder="Wprowadź klucz API"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </SettingsCard>

      <SettingsCard title="Eksport/import danych">
        <p className="settings-description">
          Konfiguruj automatyczny eksport i import danych.
        </p>
        
        <div className="data-export-import">
          <div className="export-section">
            <h4 className="section-subtitle">Automatyczny eksport danych</h4>
            
            <div className="settings-form-row">
              <SettingsToggle
                checked={integrations.dataExportImport.automaticExport.enabled}
                onChange={handleAutomaticExportToggle}
                label="Włącz automatyczny eksport danych"
              />
            </div>
            
            {integrations.dataExportImport.automaticExport.enabled && (
              <>
                <div className="settings-form-row">
                  <SettingsSelect
                    label="Częstotliwość"
                    value={integrations.dataExportImport.automaticExport.frequency}
                    onChange={handleExportFrequencyChange}
                    options={[
                      { value: 'daily', label: 'Codziennie' },
                      { value: 'weekly', label: 'Co tydzień' },
                      { value: 'monthly', label: 'Co miesiąc' }
                    ]}
                  />
                </div>
                
                <div className="settings-form-row">
                  <SettingsSelect
                    label="Format"
                    value={integrations.dataExportImport.automaticExport.format}
                    onChange={handleExportFormatChange}
                    options={[
                      { value: 'csv', label: 'CSV' },
                      { value: 'json', label: 'JSON' },
                      { value: 'xml', label: 'XML' }
                    ]}
                  />
                </div>
                
                <div className="settings-form-row">
                  <SettingsSelect
                    label="Miejsce docelowe"
                    value={integrations.dataExportImport.automaticExport.destination}
                    onChange={handleExportDestinationChange}
                    options={[
                      { value: 'ftp', label: 'Serwer FTP' },
                      { value: 'email', label: 'Email' },
                      { value: 'api', label: 'API' }
                    ]}
                  />
                </div>
                
                <div className="settings-info">
                  Ostatni eksport: {integrations.dataExportImport.automaticExport.lastExport || 'Nigdy'}
                </div>
              </>
            )}
          </div>
          
          <div className="import-section">
            <h4 className="section-subtitle">Automatyczny import danych</h4>
            
            <div className="settings-form-row">
              <SettingsToggle
                checked={integrations.dataExportImport.automaticImport.enabled}
                onChange={handleAutomaticImportToggle}
                label="Włącz automatyczny import danych"
              />
            </div>
            
            {integrations.dataExportImport.automaticImport.enabled && (
              <>
                <div className="settings-form-row">
                  <SettingsSelect
                    label="Częstotliwość"
                    value={integrations.dataExportImport.automaticImport.frequency}
                    onChange={handleImportFrequencyChange}
                    options={[
                      { value: 'daily', label: 'Codziennie' },
                      { value: 'weekly', label: 'Co tydzień' },
                      { value: 'monthly', label: 'Co miesiąc' }
                    ]}
                  />
                </div>
                
                <div className="settings-form-row">
                  <SettingsSelect
                    label="Źródło"
                    value={integrations.dataExportImport.automaticImport.source}
                    onChange={handleImportSourceChange}
                    options={[
                      { value: 'ftp', label: 'Serwer FTP' },
                      { value: 'api', label: 'API' }
                    ]}
                  />
                </div>
                
                <div className="settings-info">
                  Ostatni import: {integrations.dataExportImport.automaticImport.lastImport || 'Nigdy'}
                </div>
              </>
            )}
          </div>
        </div>
      </SettingsCard>

      <div className="settings-actions">
        <SettingsButton 
          type="primary" 
          onClick={handleSaveIntegrations}
          disabled={saveStatus === 'saving'}
        >
          {saveStatus === 'saving' ? 'Zapisywanie...' : 'Zapisz ustawienia integracji'}
        </SettingsButton>
        
        {saveStatus === 'success' && (
          <div className="settings-save-status settings-save-success">
            Ustawienia integracji zostały zapisane pomyślnie.
          </div>
        )}
        
        {saveStatus === 'error' && (
          <div className="settings-save-status settings-save-error">
            Wystąpił błąd podczas zapisywania ustawień integracji.
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function to get system type label
const getSystemTypeLabel = (type) => {
  const typeLabels = {
    'accounting': 'System księgowy',
    'crm': 'CRM',
    'erp': 'System ERP'
  };
  
  return typeLabels[type] || type;
};

export default IntegrationsSettings;
