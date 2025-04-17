import React from 'react';
import './SettingsButton.css';

/**
 * SettingsButton component for buttons in settings
 * 
 * @param {Object} props - Component props
 * @param {string} props.children - Button text or content
 * @param {Function} props.onClick - Function to call when button is clicked
 * @param {string} [props.type='default'] - Button type (default, primary, danger)
 * @param {boolean} [props.disabled] - Whether the button is disabled
 * @param {string} [props.className] - Additional CSS class for the button
 * @returns {JSX.Element} SettingsButton component
 */
const SettingsButton = ({ 
  children, 
  onClick, 
  type = 'default', 
  disabled = false,
  className = ''
}) => {
  return (
    <button
      className={`settings-button settings-button-${type} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default SettingsButton;
