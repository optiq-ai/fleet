import React, { useState, useEffect } from 'react';
import './SecuritySettings.css';
import SettingsCard from '../common/SettingsCard';
import SettingsSelect from '../common/SettingsSelect';
import SettingsToggle from '../common/SettingsToggle';
import SettingsButton from '../common/SettingsButton';
import SettingsInput from '../common/SettingsInput';
import mockSettingsService from '../../../services/api/mockSettingsService';

/**
 * SecuritySettings component
 * 
 * This component allows users to configure security and permissions settings:
 * - User roles and permissions
 * - Access control for different modules
 * - Password policies
 * - Session settings
 * 
 * @returns {JSX.Element} SecuritySettings component
 */
const SecuritySettings = () => {
  // State for security settings
  const [security, setSecurity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saveStatus, setSaveStatus] = useState(null);
  
  // State for editing
  const [editingRole, setEditingRole] = useState(null);
  const [showNewRole, setShowNewRole] = useState(false);
  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    permissions: {}
  });

  // Fetch security settings
  useEffect(() => {
    const fetchSecurity = async () => {
      try {
        setLoading(true);
        const data = await mockSettingsService.getSecuritySettings();
        setSecurity(data);
        
        // Initialize newRole permissions based on available modules
        if (data && data.accessControl) {
          const initialPermissions = {};
          Object.keys(data.accessControl).forEach(module => {
            initialPermissions[module] = false;
          });
          setNewRole(prev => ({
            ...prev,
            permissions: initialPermissions
          }));
        }
        
        setError(null);
      } catch (err) {
        setError('Nie udało się pobrać ustawień bezpieczeństwa');
        console.error('Error fetching security settings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSecurity();
  }, []);

  // Handle password policy toggle
  const handlePasswordPolicyToggle = (policy) => {
    setSecurity({
      ...security,
      passwordPolicy: {
        ...security.passwordPolicy,
        [policy]: !security.passwordPolicy[policy]
      }
    });
  };

  // Handle password policy value change
  const handlePasswordPolicyValueChange = (policy, value) => {
    setSecurity({
      ...security,
      passwordPolicy: {
        ...security.passwordPolicy,
        [policy]: parseInt(value, 10)
      }
    });
  };

  // Handle session setting change
  const handleSessionSettingChange = (setting, value) => {
    setSecurity({
      ...security,
      sessionSettings: {
        ...security.sessionSettings,
        [setting]: setting === 'timeout' ? parseInt(value, 10) : value
      }
    });
  };

  // Handle access control toggle
  const handleAccessControlToggle = (module, role) => {
    const updatedAccessControl = {
      ...security.accessControl,
      [module]: {
        ...security.accessControl[module],
        roles: security.accessControl[module].roles.includes(role)
          ? security.accessControl[module].roles.filter(r => r !== role)
          : [...security.accessControl[module].roles, role]
      }
    };

    setSecurity({
      ...security,
      accessControl: updatedAccessControl
    });
  };

  // Start editing role
  const startEditingRole = (role) => {
    // Create permissions object for the role
    const rolePermissions = {};
    Object.keys(security.accessControl).forEach(module => {
      rolePermissions[module] = security.accessControl[module].roles.includes(role.id);
    });

    setEditingRole({
      ...role,
      permissions: rolePermissions
    });
  };

  // Save edited role
  const saveEditedRole = () => {
    // Update roles list
    const updatedRoles = security.roles.map(role => {
      if (role.id === editingRole.id) {
        return {
          id: editingRole.id,
          name: editingRole.name,
          description: editingRole.description
        };
      }
      return role;
    });

    // Update access control based on permissions
    const updatedAccessControl = { ...security.accessControl };
    Object.keys(editingRole.permissions).forEach(module => {
      if (editingRole.permissions[module]) {
        // Add role to module if not already present
        if (!updatedAccessControl[module].roles.includes(editingRole.id)) {
          updatedAccessControl[module].roles = [...updatedAccessControl[module].roles, editingRole.id];
        }
      } else {
        // Remove role from module
        updatedAccessControl[module].roles = updatedAccessControl[module].roles.filter(
          roleId => roleId !== editingRole.id
        );
      }
    });

    setSecurity({
      ...security,
      roles: updatedRoles,
      accessControl: updatedAccessControl
    });

    setEditingRole(null);
  };

  // Cancel editing role
  const cancelEditingRole = () => {
    setEditingRole(null);
  };

  // Add new role
  const addNewRole = () => {
    const newId = Math.max(...security.roles.map(role => role.id)) + 1;
    
    // Create new role object
    const roleToAdd = {
      id: newId,
      name: newRole.name,
      description: newRole.description
    };
    
    // Update roles list
    const updatedRoles = [...security.roles, roleToAdd];
    
    // Update access control based on permissions
    const updatedAccessControl = { ...security.accessControl };
    Object.keys(newRole.permissions).forEach(module => {
      if (newRole.permissions[module]) {
        updatedAccessControl[module].roles = [...updatedAccessControl[module].roles, newId];
      }
    });
    
    setSecurity({
      ...security,
      roles: updatedRoles,
      accessControl: updatedAccessControl
    });
    
    // Reset new role form
    setNewRole({
      name: '',
      description: '',
      permissions: Object.keys(security.accessControl).reduce((acc, module) => {
        acc[module] = false;
        return acc;
      }, {})
    });
    
    setShowNewRole(false);
  };

  // Handle new role permission toggle
  const handleNewRolePermissionToggle = (module) => {
    setNewRole({
      ...newRole,
      permissions: {
        ...newRole.permissions,
        [module]: !newRole.permissions[module]
      }
    });
  };

  // Handle editing role permission toggle
  const handleEditingRolePermissionToggle = (module) => {
    setEditingRole({
      ...editingRole,
      permissions: {
        ...editingRole.permissions,
        [module]: !editingRole.permissions[module]
      }
    });
  };

  // Save security settings
  const handleSaveSecurity = async () => {
    try {
      setSaveStatus('saving');
      await mockSettingsService.updateSecuritySettings(security);
      setSaveStatus('success');
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setSaveStatus(null);
      }, 3000);
    } catch (err) {
      setSaveStatus('error');
      console.error('Error saving security settings:', err);
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setSaveStatus(null);
      }, 3000);
    }
  };

  // Show loading state
  if (loading) {
    return <div className="settings-loading">Ładowanie ustawień bezpieczeństwa...</div>;
  }

  // Show error state
  if (error) {
    return <div className="settings-error">{error}</div>;
  }

  // Show security settings
  return (
    <div className="security-settings">
      <SettingsCard title="Role i uprawnienia">
        <p className="settings-description">
          Zarządzaj rolami użytkowników i ich uprawnieniami.
        </p>
        
        <div className="roles-list">
          <table className="settings-table">
            <thead>
              <tr>
                <th>Nazwa roli</th>
                <th>Opis</th>
                <th>Akcje</th>
              </tr>
            </thead>
            <tbody>
              {security.roles.map((role) => (
                <tr key={role.id}>
                  <td>{role.name}</td>
                  <td>{role.description}</td>
                  <td>
                    <SettingsButton 
                      onClick={() => startEditingRole(role)}
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
            {!showNewRole ? (
              <SettingsButton 
                onClick={() => setShowNewRole(true)}
                type="primary"
              >
                Dodaj nową rolę
              </SettingsButton>
            ) : (
              <div className="add-new-form">
                <h4>Dodaj nową rolę</h4>
                
                <div className="settings-form-row">
                  <SettingsInput
                    label="Nazwa roli"
                    value={newRole.name}
                    onChange={(e) => setNewRole({...newRole, name: e.target.value})}
                  />
                </div>
                
                <div className="settings-form-row">
                  <SettingsInput
                    label="Opis"
                    value={newRole.description}
                    onChange={(e) => setNewRole({...newRole, description: e.target.value})}
                  />
                </div>
                
                <div className="permissions-section">
                  <h5>Uprawnienia</h5>
                  
                  {Object.entries(security.accessControl).map(([module, moduleData]) => (
                    <div key={module} className="permission-item">
                      <SettingsToggle
                        label={moduleData.displayName}
                        checked={newRole.permissions[module] || false}
                        onChange={() => handleNewRolePermissionToggle(module)}
                      />
                    </div>
                  ))}
                </div>
                
                <div className="form-actions">
                  <SettingsButton onClick={() => setShowNewRole(false)}>
                    Anuluj
                  </SettingsButton>
                  <SettingsButton 
                    type="primary" 
                    onClick={addNewRole}
                    disabled={!newRole.name}
                  >
                    Dodaj
                  </SettingsButton>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {editingRole && (
          <div className="edit-modal">
            <div className="edit-modal-content">
              <h3>Edytuj rolę</h3>
              
              <div className="settings-form-row">
                <SettingsInput
                  label="Nazwa roli"
                  value={editingRole.name}
                  onChange={(e) => setEditingRole({...editingRole, name: e.target.value})}
                />
              </div>
              
              <div className="settings-form-row">
                <SettingsInput
                  label="Opis"
                  value={editingRole.description}
                  onChange={(e) => setEditingRole({...editingRole, description: e.target.value})}
                />
              </div>
              
              <div className="permissions-section">
                <h5>Uprawnienia</h5>
                
                {Object.entries(security.accessControl).map(([module, moduleData]) => (
                  <div key={module} className="permission-item">
                    <SettingsToggle
                      label={moduleData.displayName}
                      checked={editingRole.permissions[module] || false}
                      onChange={() => handleEditingRolePermissionToggle(module)}
                    />
                  </div>
                ))}
              </div>
              
              <div className="edit-modal-actions">
                <SettingsButton onClick={cancelEditingRole}>
                  Anuluj
                </SettingsButton>
                <SettingsButton 
                  type="primary" 
                  onClick={saveEditedRole}
                >
                  Zapisz
                </SettingsButton>
              </div>
            </div>
          </div>
        )}
      </SettingsCard>

      <SettingsCard title="Kontrola dostępu">
        <p className="settings-description">
          Zarządzaj dostępem do poszczególnych modułów aplikacji.
        </p>
        
        <div className="access-control">
          {Object.entries(security.accessControl).map(([module, moduleData]) => (
            <div key={module} className="module-access">
              <h4 className="module-name">{moduleData.displayName}</h4>
              
              <div className="module-roles">
                {security.roles.map((role) => (
                  <div key={role.id} className="role-access">
                    <SettingsToggle
                      label={role.name}
                      checked={moduleData.roles.includes(role.id)}
                      onChange={() => handleAccessControlToggle(module, role.id)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SettingsCard>

      <SettingsCard title="Polityka haseł">
        <p className="settings-description">
          Ustaw wymagania dotyczące haseł użytkowników.
        </p>
        
        <div className="password-policy">
          <div className="policy-item">
            <SettingsToggle
              label="Wymagaj dużych liter"
              checked={security.passwordPolicy.requireUppercase}
              onChange={() => handlePasswordPolicyToggle('requireUppercase')}
            />
          </div>
          
          <div className="policy-item">
            <SettingsToggle
              label="Wymagaj małych liter"
              checked={security.passwordPolicy.requireLowercase}
              onChange={() => handlePasswordPolicyToggle('requireLowercase')}
            />
          </div>
          
          <div className="policy-item">
            <SettingsToggle
              label="Wymagaj cyfr"
              checked={security.passwordPolicy.requireNumbers}
              onChange={() => handlePasswordPolicyToggle('requireNumbers')}
            />
          </div>
          
          <div className="policy-item">
            <SettingsToggle
              label="Wymagaj znaków specjalnych"
              checked={security.passwordPolicy.requireSpecialChars}
              onChange={() => handlePasswordPolicyToggle('requireSpecialChars')}
            />
          </div>
          
          <div className="policy-item">
            <SettingsInput
              label="Minimalna długość hasła"
              type="number"
              min="6"
              max="30"
              value={security.passwordPolicy.minLength}
              onChange={(e) => handlePasswordPolicyValueChange('minLength', e.target.value)}
            />
          </div>
          
          <div className="policy-item">
            <SettingsInput
              label="Okres ważności hasła (dni)"
              type="number"
              min="0"
              max="365"
              value={security.passwordPolicy.expiryDays}
              onChange={(e) => handlePasswordPolicyValueChange('expiryDays', e.target.value)}
            />
            <div className="setting-hint">0 = bez wygaśnięcia</div>
          </div>
          
          <div className="policy-item">
            <SettingsInput
              label="Historia haseł (liczba poprzednich haseł)"
              type="number"
              min="0"
              max="10"
              value={security.passwordPolicy.historyCount}
              onChange={(e) => handlePasswordPolicyValueChange('historyCount', e.target.value)}
            />
            <div className="setting-hint">0 = bez historii</div>
          </div>
        </div>
      </SettingsCard>

      <SettingsCard title="Ustawienia sesji">
        <p className="settings-description">
          Konfiguruj ustawienia sesji użytkownika.
        </p>
        
        <div className="session-settings">
          <div className="settings-form-row">
            <SettingsInput
              label="Limit czasu sesji (minuty)"
              type="number"
              min="5"
              max="1440"
              value={security.sessionSettings.timeout}
              onChange={(e) => handleSessionSettingChange('timeout', e.target.value)}
            />
            <div className="setting-hint">Czas bezczynności, po którym sesja wygasa</div>
          </div>
          
          <div className="settings-form-row">
            <SettingsSelect
              label="Maksymalna liczba równoczesnych sesji"
              value={security.sessionSettings.maxConcurrentSessions}
              onChange={(e) => handleSessionSettingChange('maxConcurrentSessions', e.target.value)}
              options={[
                { value: '1', label: '1 sesja' },
                { value: '2', label: '2 sesje' },
                { value: '3', label: '3 sesje' },
                { value: 'unlimited', label: 'Bez limitu' }
              ]}
            />
          </div>
          
          <div className="settings-form-row">
            <SettingsToggle
              label="Wyloguj przy zmianie adresu IP"
              checked={security.sessionSettings.logoutOnIpChange}
              onChange={() => handleSessionSettingChange('logoutOnIpChange', !security.sessionSettings.logoutOnIpChange)}
            />
          </div>
          
          <div className="settings-form-row">
            <SettingsToggle
              label="Wymagaj ponownego logowania przy operacjach krytycznych"
              checked={security.sessionSettings.reAuthForCriticalActions}
              onChange={() => handleSessionSettingChange('reAuthForCriticalActions', !security.sessionSettings.reAuthForCriticalActions)}
            />
          </div>
        </div>
      </SettingsCard>

      <div className="settings-actions">
        <SettingsButton 
          type="primary" 
          onClick={handleSaveSecurity}
          disabled={saveStatus === 'saving'}
        >
          {saveStatus === 'saving' ? 'Zapisywanie...' : 'Zapisz ustawienia bezpieczeństwa'}
        </SettingsButton>
        
        {saveStatus === 'success' && (
          <div className="settings-save-status settings-save-success">
            Ustawienia bezpieczeństwa zostały zapisane pomyślnie.
          </div>
        )}
        
        {saveStatus === 'error' && (
          <div className="settings-save-status settings-save-error">
            Wystąpił błąd podczas zapisywania ustawień bezpieczeństwa.
          </div>
        )}
      </div>
    </div>
  );
};

export default SecuritySettings;
