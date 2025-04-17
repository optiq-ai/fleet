import React from 'react';
import './SettingsCard.css';

/**
 * SettingsCard component for displaying a settings section with title and children
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Title of the settings card
 * @param {React.ReactNode} props.children - Content of the settings card
 * @param {string} [props.className] - Additional CSS class for the settings card
 * @returns {JSX.Element} SettingsCard component
 */
const SettingsCard = ({ title, children, className = '' }) => {
  return (
    <div className={`settings-card ${className}`}>
      <div className="settings-card-header">
        <h3 className="settings-card-title">{title}</h3>
      </div>
      <div className="settings-card-content">
        {children}
      </div>
    </div>
  );
};

export default SettingsCard;
