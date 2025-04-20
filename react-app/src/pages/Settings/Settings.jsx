import React from 'react';
import { Link } from 'react-router-dom';
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
            <Link to="/settings/users" className="settings-link">
              <strong>Users</strong>
            </Link> - Manage user accounts, permissions, and access control
          </li>
          <li>
            <Link to="/settings/roles" className="settings-link">
              <strong>Roles</strong>
            </Link> - Configure user roles and associated permissions
          </li>
          <li>
            <Link to="/settings/view-customization" className="settings-link">
              <strong>View Customization</strong>
            </Link> - Customize the appearance and layout of the application
          </li>
          <li>
            <Link to="/settings/security" className="settings-link">
              <strong>Security</strong>
            </Link> - Configure security settings, password policies, and authentication options
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Settings;
