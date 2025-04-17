import React, { useState, useEffect } from 'react';
import './FleetConfiguration.css';
import SettingsCard from '../common/SettingsCard';
import SettingsInput from '../common/SettingsInput';
import SettingsButton from '../common/SettingsButton';
import SettingsToggle from '../common/SettingsToggle';
import mockSettingsService from '../../../services/api/mockSettingsService';

/**
 * FleetConfiguration component
 * 
 * This component allows users to configure fleet-related settings:
 * - Vehicle categories
 * - Vehicle parameters (fuel consumption thresholds, mileage limits, service cycles)
 * - Driver groups
 * - Operational regions
 * 
 * @returns {JSX.Element} FleetConfiguration component
 */
const FleetConfiguration = () => {
  // State for fleet configuration
  const [configuration, setConfiguration] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saveStatus, setSaveStatus] = useState(null);
  
  // State for editing
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingGroup, setEditingGroup] = useState(null);
  const [editingRegion, setEditingRegion] = useState(null);

  // Fetch fleet configuration
  useEffect(() => {
    const fetchConfiguration = async () => {
      try {
        setLoading(true);
        const data = await mockSettingsService.getFleetConfiguration();
        setConfiguration(data);
        setError(null);
      } catch (err) {
        setError('Nie udało się pobrać konfiguracji floty');
        console.error('Error fetching fleet configuration:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchConfiguration();
  }, []);

  // Handle vehicle parameter change
  const handleParameterChange = (category, parameter, value) => {
    setConfiguration({
      ...configuration,
      vehicleParameters: {
        ...configuration.vehicleParameters,
        [parameter]: {
          ...configuration.vehicleParameters[parameter],
          [category]: parseFloat(value)
        }
      }
    });
  };

  // Handle region toggle
  const handleRegionToggle = (regionId) => {
    const updatedRegions = configuration.operationalRegions.map(region => {
      if (region.id === regionId) {
        return {
          ...region,
          active: !region.active
        };
      }
      return region;
    });

    setConfiguration({
      ...configuration,
      operationalRegions: updatedRegions
    });
  };

  // Start editing category
  const startEditingCategory = (category) => {
    setEditingCategory({
      ...category
    });
  };

  // Save edited category
  const saveEditedCategory = () => {
    const updatedCategories = configuration.vehicleCategories.map(category => {
      if (category.id === editingCategory.id) {
        return editingCategory;
      }
      return category;
    });

    setConfiguration({
      ...configuration,
      vehicleCategories: updatedCategories
    });

    setEditingCategory(null);
  };

  // Cancel editing category
  const cancelEditingCategory = () => {
    setEditingCategory(null);
  };

  // Start editing driver group
  const startEditingGroup = (group) => {
    setEditingGroup({
      ...group
    });
  };

  // Save edited driver group
  const saveEditedGroup = () => {
    const updatedGroups = configuration.driverGroups.map(group => {
      if (group.id === editingGroup.id) {
        return editingGroup;
      }
      return group;
    });

    setConfiguration({
      ...configuration,
      driverGroups: updatedGroups
    });

    setEditingGroup(null);
  };

  // Cancel editing driver group
  const cancelEditingGroup = () => {
    setEditingGroup(null);
  };

  // Start editing region
  const startEditingRegion = (region) => {
    setEditingRegion({
      ...region
    });
  };

  // Save edited region
  const saveEditedRegion = () => {
    const updatedRegions = configuration.operationalRegions.map(region => {
      if (region.id === editingRegion.id) {
        return editingRegion;
      }
      return region;
    });

    setConfiguration({
      ...configuration,
      operationalRegions: updatedRegions
    });

    setEditingRegion(null);
  };

  // Cancel editing region
  const cancelEditingRegion = () => {
    setEditingRegion(null);
  };

  // Save configuration
  const handleSaveConfiguration = async () => {
    try {
      setSaveStatus('saving');
      await mockSettingsService.updateFleetConfiguration(configuration);
      setSaveStatus('success');
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setSaveStatus(null);
      }, 3000);
    } catch (err) {
      setSaveStatus('error');
      console.error('Error saving fleet configuration:', err);
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setSaveStatus(null);
      }, 3000);
    }
  };

  // Show loading state
  if (loading) {
    return <div className="settings-loading">Ładowanie konfiguracji floty...</div>;
  }

  // Show error state
  if (error) {
    return <div className="settings-error">{error}</div>;
  }

  // Show configuration
  return (
    <div className="fleet-configuration">
      <SettingsCard title="Kategorie pojazdów">
        <p className="settings-description">
          Zarządzaj kategoriami pojazdów w swojej flocie.
        </p>
        
        <div className="vehicle-categories">
          <table className="settings-table">
            <thead>
              <tr>
                <th>Nazwa</th>
                <th>Opis</th>
                <th>Liczba pojazdów</th>
                <th>Akcje</th>
              </tr>
            </thead>
            <tbody>
              {configuration.vehicleCategories.map((category) => (
                <tr key={category.id}>
                  <td>{category.name}</td>
                  <td>{category.description}</td>
                  <td>{category.count}</td>
                  <td>
                    <SettingsButton 
                      onClick={() => startEditingCategory(category)}
                      className="small-button"
                    >
                      Edytuj
                    </SettingsButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {editingCategory && (
          <div className="edit-modal">
            <div className="edit-modal-content">
              <h3>Edytuj kategorię pojazdów</h3>
              
              <div className="settings-form-row">
                <SettingsInput
                  label="Nazwa"
                  value={editingCategory.name}
                  onChange={(e) => setEditingCategory({...editingCategory, name: e.target.value})}
                />
              </div>
              
              <div className="settings-form-row">
                <SettingsInput
                  label="Opis"
                  value={editingCategory.description}
                  onChange={(e) => setEditingCategory({...editingCategory, description: e.target.value})}
                />
              </div>
              
              <div className="edit-modal-actions">
                <SettingsButton onClick={cancelEditingCategory}>
                  Anuluj
                </SettingsButton>
                <SettingsButton 
                  type="primary" 
                  onClick={saveEditedCategory}
                >
                  Zapisz
                </SettingsButton>
              </div>
            </div>
          </div>
        )}
      </SettingsCard>

      <SettingsCard title="Parametry pojazdów">
        <p className="settings-description">
          Ustaw standardowe parametry dla różnych kategorii pojazdów.
        </p>
        
        <h4 className="parameter-section-title">Progi zużycia paliwa (l/100km)</h4>
        <div className="parameter-grid">
          {Object.entries(configuration.vehicleParameters.fuelConsumptionThresholds).map(([category, value]) => (
            <div key={category} className="parameter-item">
              <SettingsInput
                label={getCategoryLabel(category)}
                value={value}
                type="number"
                onChange={(e) => handleParameterChange(category, 'fuelConsumptionThresholds', e.target.value)}
              />
            </div>
          ))}
        </div>
        
        <h4 className="parameter-section-title">Limity przebiegu (km/rok)</h4>
        <div className="parameter-grid">
          {Object.entries(configuration.vehicleParameters.mileageLimits).map(([category, value]) => (
            <div key={category} className="parameter-item">
              <SettingsInput
                label={getCategoryLabel(category)}
                value={value}
                type="number"
                onChange={(e) => handleParameterChange(category, 'mileageLimits', e.target.value)}
              />
            </div>
          ))}
        </div>
        
        <h4 className="parameter-section-title">Cykle serwisowe (km)</h4>
        <div className="parameter-grid">
          {Object.entries(configuration.vehicleParameters.serviceCycles).map(([category, value]) => (
            <div key={category} className="parameter-item">
              <SettingsInput
                label={getCategoryLabel(category)}
                value={value}
                type="number"
                onChange={(e) => handleParameterChange(category, 'serviceCycles', e.target.value)}
              />
            </div>
          ))}
        </div>
      </SettingsCard>

      <SettingsCard title="Grupy kierowców">
        <p className="settings-description">
          Zarządzaj grupami kierowców w swojej flocie.
        </p>
        
        <div className="driver-groups">
          <table className="settings-table">
            <thead>
              <tr>
                <th>Nazwa</th>
                <th>Opis</th>
                <th>Liczba kierowców</th>
                <th>Akcje</th>
              </tr>
            </thead>
            <tbody>
              {configuration.driverGroups.map((group) => (
                <tr key={group.id}>
                  <td>{group.name}</td>
                  <td>{group.description}</td>
                  <td>{group.count}</td>
                  <td>
                    <SettingsButton 
                      onClick={() => startEditingGroup(group)}
                      className="small-button"
                    >
                      Edytuj
                    </SettingsButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {editingGroup && (
          <div className="edit-modal">
            <div className="edit-modal-content">
              <h3>Edytuj grupę kierowców</h3>
              
              <div className="settings-form-row">
                <SettingsInput
                  label="Nazwa"
                  value={editingGroup.name}
                  onChange={(e) => setEditingGroup({...editingGroup, name: e.target.value})}
                />
              </div>
              
              <div className="settings-form-row">
                <SettingsInput
                  label="Opis"
                  value={editingGroup.description}
                  onChange={(e) => setEditingGroup({...editingGroup, description: e.target.value})}
                />
              </div>
              
              <div className="edit-modal-actions">
                <SettingsButton onClick={cancelEditingGroup}>
                  Anuluj
                </SettingsButton>
                <SettingsButton 
                  type="primary" 
                  onClick={saveEditedGroup}
                >
                  Zapisz
                </SettingsButton>
              </div>
            </div>
          </div>
        )}
      </SettingsCard>

      <SettingsCard title="Regiony operacyjne">
        <p className="settings-description">
          Zarządzaj regionami, w których działa Twoja flota.
        </p>
        
        <div className="operational-regions">
          <table className="settings-table">
            <thead>
              <tr>
                <th>Nazwa</th>
                <th>Status</th>
                <th>Akcje</th>
              </tr>
            </thead>
            <tbody>
              {configuration.operationalRegions.map((region) => (
                <tr key={region.id}>
                  <td>{region.name}</td>
                  <td>
                    <SettingsToggle
                      checked={region.active}
                      onChange={() => handleRegionToggle(region.id)}
                    />
                  </td>
                  <td>
                    <SettingsButton 
                      onClick={() => startEditingRegion(region)}
                      className="small-button"
                    >
                      Edytuj
                    </SettingsButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {editingRegion && (
          <div className="edit-modal">
            <div className="edit-modal-content">
              <h3>Edytuj region operacyjny</h3>
              
              <div className="settings-form-row">
                <SettingsInput
                  label="Nazwa"
                  value={editingRegion.name}
                  onChange={(e) => setEditingRegion({...editingRegion, name: e.target.value})}
                />
              </div>
              
              <div className="settings-form-row">
                <SettingsToggle
                  label="Aktywny"
                  checked={editingRegion.active}
                  onChange={() => setEditingRegion({...editingRegion, active: !editingRegion.active})}
                />
              </div>
              
              <div className="edit-modal-actions">
                <SettingsButton onClick={cancelEditingRegion}>
                  Anuluj
                </SettingsButton>
                <SettingsButton 
                  type="primary" 
                  onClick={saveEditedRegion}
                >
                  Zapisz
                </SettingsButton>
              </div>
            </div>
          </div>
        )}
      </SettingsCard>

      <div className="settings-actions">
        <SettingsButton 
          type="primary" 
          onClick={handleSaveConfiguration}
          disabled={saveStatus === 'saving'}
        >
          {saveStatus === 'saving' ? 'Zapisywanie...' : 'Zapisz konfigurację'}
        </SettingsButton>
        
        {saveStatus === 'success' && (
          <div className="settings-save-status settings-save-success">
            Konfiguracja została zapisana pomyślnie.
          </div>
        )}
        
        {saveStatus === 'error' && (
          <div className="settings-save-status settings-save-error">
            Wystąpił błąd podczas zapisywania konfiguracji.
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function to get category label
const getCategoryLabel = (categoryKey) => {
  const categoryLabels = {
    'dostawcze': 'Pojazdy dostawcze',
    'ciezarowe': 'Pojazdy ciężarowe',
    'osobowe': 'Samochody osobowe',
    'specjalistyczne': 'Pojazdy specjalistyczne'
  };
  
  return categoryLabels[categoryKey] || categoryKey;
};

export default FleetConfiguration;
