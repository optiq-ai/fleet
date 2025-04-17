import React from 'react';
import './SettingsInput.css';

/**
 * SettingsInput component for text input in settings
 * 
 * @param {Object} props - Component props
 * @param {string} props.value - Current input value
 * @param {Function} props.onChange - Function to call when input changes
 * @param {string} [props.label] - Label for the input
 * @param {string} [props.type='text'] - Input type (text, number, email, etc.)
 * @param {string} [props.placeholder] - Placeholder text
 * @param {boolean} [props.disabled] - Whether the input is disabled
 * @param {string} [props.error] - Error message to display
 * @returns {JSX.Element} SettingsInput component
 */
const SettingsInput = ({ 
  value, 
  onChange, 
  label, 
  type = 'text', 
  placeholder = '', 
  disabled = false,
  error = ''
}) => {
  return (
    <div className="settings-input-container">
      {label && <label className="settings-input-label">{label}</label>}
      <input
        type={type}
        className={`settings-input ${error ? 'settings-input-error' : ''}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
      />
      {error && <div className="settings-input-error-message">{error}</div>}
    </div>
  );
};

export default SettingsInput;
