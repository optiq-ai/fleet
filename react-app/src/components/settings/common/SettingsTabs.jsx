import React from 'react';
import './SettingsTabs.css';

/**
 * SettingsTabs component for tab navigation in settings
 * 
 * @param {Object} props - Component props
 * @param {Array} props.tabs - Array of tab objects with id and label properties
 * @param {string} props.activeTab - ID of the currently active tab
 * @param {Function} props.onTabChange - Function to call when tab is changed
 * @returns {JSX.Element} SettingsTabs component
 */
const SettingsTabs = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="settings-tabs">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`settings-tab ${activeTab === tab.id ? 'settings-tab-active' : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </div>
      ))}
    </div>
  );
};

export default SettingsTabs;
