import React from 'react';
import './SettingsToggle.css';

/**
 * SettingsToggle component for toggling settings on/off
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.checked - Whether the toggle is checked
 * @param {Function} props.onChange - Function to call when toggle is changed
 * @param {string} [props.label] - Label for the toggle
 * @param {boolean} [props.disabled] - Whether the toggle is disabled
 * @returns {JSX.Element} SettingsToggle component
 */
const SettingsToggle = ({ checked, onChange, label, disabled = false }) => {
  return (
    <div className="settings-toggle-container">
      {label && <span className="settings-toggle-label">{label}</span>}
      <label className="settings-toggle">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
        />
        <span className="settings-toggle-slider"></span>
      </label>
    </div>
  );
};

export default SettingsToggle;
