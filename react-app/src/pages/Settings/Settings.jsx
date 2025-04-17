import React from 'react';
import './Settings.css';

/**
 * Settings main component that serves as a landing page for the Settings section
 * This component redirects to sub-sections via the sidebar dropdown menu
 * @returns {JSX.Element} Settings component
 */
const Settings = () => {
  return (
    <div className="settings-container">
      <h1>Settings</h1>
      <div className="settings-intro">
        <p>Welcome to the Settings section. Please select a specific settings category from the sidebar menu:</p>
        <ul className="settings-menu-list">
          <li>
            <strong>Users</strong> - Manage user accounts, permissions, and access control
          </li>
          <li>
            <strong>Roles</strong> - Configure user roles and associated permissions
          </li>
          <li>
            <strong>View Customization</strong> - Customize the appearance and layout of the application
          </li>
          <li>
            <strong>Security</strong> - Configure security settings, password policies, and authentication options
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Settings;
