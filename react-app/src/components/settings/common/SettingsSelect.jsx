import React from 'react';
import './SettingsSelect.css';

/**
 * SettingsSelect component for selecting from a list of options
 * 
 * @param {Object} props - Component props
 * @param {string} props.value - Currently selected value
 * @param {Function} props.onChange - Function to call when selection changes
 * @param {Array} props.options - Array of options to select from
 * @param {string} [props.label] - Label for the select
 * @param {boolean} [props.disabled] - Whether the select is disabled
 * @param {string} [props.placeholder] - Placeholder text when no option is selected
 * @returns {JSX.Element} SettingsSelect component
 */
const SettingsSelect = ({ 
  value, 
  onChange, 
  options, 
  label, 
  disabled = false, 
  placeholder = 'Wybierz opcję' 
}) => {
  return (
    <div className="settings-select-container">
      {label && <label className="settings-select-label">{label}</label>}
      <select 
        className="settings-select"
        value={value}
        onChange={onChange}
        disabled={disabled}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((option) => (
          <option key={option.value || option.id || option.code || option} value={option.value || option.id || option.code || option}>
            {option.label || option.name || option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SettingsSelect;
