import React, { useState, useEffect } from 'react';
import './Security.css';

/**
 * Security settings component for managing security and authentication options
 * @returns {JSX.Element} Security settings component
 */
const Security = () => {
  const [passwordPolicy, setPasswordPolicy] = useState({
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    expiryDays: 90
  });
  
  const [twoFactorAuth, setTwoFactorAuth] = useState({
    enabled: false,
    requiredForAdmins: true,
    requiredForManagers: false,
    requiredForUsers: false,
    methods: ['app', 'email']
  });
  
  const [sessionSettings, setSessionSettings] = useState({
    timeout: 30,
    maxConcurrentSessions: 3,
    rememberMeEnabled: true,
    rememberMeDuration: 14
  });
  
  const [ipRestrictions, setIpRestrictions] = useState({
    enabled: false,
    allowedIps: ['192.168.1.0/24', '10.0.0.0/8'],
    blockUnknownIps: false
  });
  
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(null);

  // Simulate fetching security settings
  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const handlePasswordPolicyChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPasswordPolicy(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (type === 'number' ? parseInt(value, 10) : value)
    }));
  };

  const handleTwoFactorAuthChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTwoFactorAuth(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleTwoFactorMethodChange = (method) => {
    setTwoFactorAuth(prev => {
      const methods = [...prev.methods];
      if (methods.includes(method)) {
        return { ...prev, methods: methods.filter(m => m !== method) };
      } else {
        return { ...prev, methods: [...methods, method] };
      }
    });
  };

  const handleSessionSettingsChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSessionSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : parseInt(value, 10)
    }));
  };

  const handleIpRestrictionsChange = (e) => {
    const { name, value, type, checked } = e.target;
    setIpRestrictions(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleIpListChange = (e) => {
    const ipList = e.target.value.split('\n').map(ip => ip.trim()).filter(ip => ip);
    setIpRestrictions(prev => ({
      ...prev,
      allowedIps: ipList
    }));
  };

  const handleSaveChanges = () => {
    // In a real app, this would send the changes to an API
    console.log('Saving security settings:', {
      passwordPolicy,
      twoFactorAuth,
      sessionSettings,
      ipRestrictions
    });
    
    // Show success message
    setSuccess('Security settings saved successfully!');
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setSuccess(null);
    }, 3000);
  };

  return (
    <div className="security-container">
      <h1>Security Settings</h1>
      
      {loading ? (
        <p>Loading security settings...</p>
      ) : (
        <>
          {success && (
            <div className="success-message">
              {success}
            </div>
          )}
          
          <div className="settings-card">
            <h2>Password Policy</h2>
            <div className="form-group">
              <label htmlFor="minLength">Minimum Password Length:</label>
              <input
                type="number"
                id="minLength"
                name="minLength"
                value={passwordPolicy.minLength}
                onChange={handlePasswordPolicyChange}
                min="6"
                max="24"
                className="settings-input"
              />
            </div>
            
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="requireUppercase"
                  checked={passwordPolicy.requireUppercase}
                  onChange={handlePasswordPolicyChange}
                />
                Require uppercase letters
              </label>
            </div>
            
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="requireLowercase"
                  checked={passwordPolicy.requireLowercase}
                  onChange={handlePasswordPolicyChange}
                />
                Require lowercase letters
              </label>
            </div>
            
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="requireNumbers"
                  checked={passwordPolicy.requireNumbers}
                  onChange={handlePasswordPolicyChange}
                />
                Require numbers
              </label>
            </div>
            
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="requireSpecialChars"
                  checked={passwordPolicy.requireSpecialChars}
                  onChange={handlePasswordPolicyChange}
                />
                Require special characters
              </label>
            </div>
            
            <div className="form-group">
              <label htmlFor="expiryDays">Password Expiry (days):</label>
              <input
                type="number"
                id="expiryDays"
                name="expiryDays"
                value={passwordPolicy.expiryDays}
                onChange={handlePasswordPolicyChange}
                min="0"
                max="365"
                className="settings-input"
              />
              <p className="description">Set to 0 for no expiration</p>
            </div>
          </div>
          
          <div className="settings-card">
            <h2>Two-Factor Authentication</h2>
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="enabled"
                  checked={twoFactorAuth.enabled}
                  onChange={handleTwoFactorAuthChange}
                />
                Enable Two-Factor Authentication
              </label>
            </div>
            
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="requiredForAdmins"
                  checked={twoFactorAuth.requiredForAdmins}
                  onChange={handleTwoFactorAuthChange}
                  disabled={!twoFactorAuth.enabled}
                />
                Required for Administrators
              </label>
            </div>
            
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="requiredForManagers"
                  checked={twoFactorAuth.requiredForManagers}
                  onChange={handleTwoFactorAuthChange}
                  disabled={!twoFactorAuth.enabled}
                />
                Required for Managers
              </label>
            </div>
            
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="requiredForUsers"
                  checked={twoFactorAuth.requiredForUsers}
                  onChange={handleTwoFactorAuthChange}
                  disabled={!twoFactorAuth.enabled}
                />
                Required for Regular Users
              </label>
            </div>
            
            <div className="form-group">
              <label>Authentication Methods:</label>
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={twoFactorAuth.methods.includes('app')}
                    onChange={() => handleTwoFactorMethodChange('app')}
                    disabled={!twoFactorAuth.enabled}
                  />
                  Authenticator App
                </label>
                
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={twoFactorAuth.methods.includes('email')}
                    onChange={() => handleTwoFactorMethodChange('email')}
                    disabled={!twoFactorAuth.enabled}
                  />
                  Email
                </label>
                
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={twoFactorAuth.methods.includes('sms')}
                    onChange={() => handleTwoFactorMethodChange('sms')}
                    disabled={!twoFactorAuth.enabled}
                  />
                  SMS
                </label>
              </div>
            </div>
          </div>
          
          <div className="settings-card">
            <h2>Session Settings</h2>
            <div className="form-group">
              <label htmlFor="timeout">Session Timeout (minutes):</label>
              <input
                type="number"
                id="timeout"
                name="timeout"
                value={sessionSettings.timeout}
                onChange={handleSessionSettingsChange}
                min="5"
                max="240"
                className="settings-input"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="maxConcurrentSessions">Maximum Concurrent Sessions:</label>
              <input
                type="number"
                id="maxConcurrentSessions"
                name="maxConcurrentSessions"
                value={sessionSettings.maxConcurrentSessions}
                onChange={handleSessionSettingsChange}
                min="1"
                max="10"
                className="settings-input"
              />
            </div>
            
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="rememberMeEnabled"
                  checked={sessionSettings.rememberMeEnabled}
                  onChange={handleSessionSettingsChange}
                />
                Enable "Remember Me" Option
              </label>
            </div>
            
            <div className="form-group">
              <label htmlFor="rememberMeDuration">Remember Me Duration (days):</label>
              <input
                type="number"
                id="rememberMeDuration"
                name="rememberMeDuration"
                value={sessionSettings.rememberMeDuration}
                onChange={handleSessionSettingsChange}
                min="1"
                max="90"
                disabled={!sessionSettings.rememberMeEnabled}
                className="settings-input"
              />
            </div>
          </div>
          
          <div className="settings-card">
            <h2>IP Restrictions</h2>
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="enabled"
                  checked={ipRestrictions.enabled}
                  onChange={handleIpRestrictionsChange}
                />
                Enable IP Restrictions
              </label>
            </div>
            
            <div className="form-group">
              <label htmlFor="allowedIps">Allowed IP Addresses (one per line):</label>
              <textarea
                id="allowedIps"
                value={ipRestrictions.allowedIps.join('\n')}
                onChange={handleIpListChange}
                disabled={!ipRestrictions.enabled}
                rows="5"
                className="settings-textarea"
                placeholder="e.g. 192.168.1.0/24"
              ></textarea>
              <p className="description">Enter IP addresses or CIDR notation</p>
            </div>
            
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="blockUnknownIps"
                  checked={ipRestrictions.blockUnknownIps}
                  onChange={handleIpRestrictionsChange}
                  disabled={!ipRestrictions.enabled}
                />
                Block access from unlisted IP addresses
              </label>
            </div>
          </div>
          
          <div className="settings-actions">
            <button className="btn-save" onClick={handleSaveChanges}>
              Save Changes
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Security;
