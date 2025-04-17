import React, { useState, useEffect } from 'react';
import { getSmartAlerts, acknowledgeAlert } from '../../services/aiAutomationService';
import './SmartAlerts.css';

/**
 * SmartAlerts component displays an intelligent notification system
 * 
 * This component features:
 * - Prioritization of alerts based on importance and context
 * - Communication channel adaptation based on urgency
 * - Aggregation of related alerts to prevent information overload
 * - Learning from user responses to determine which alerts are important
 * 
 * @returns {JSX.Element} SmartAlerts component
 */
const SmartAlerts = () => {
  const [activeTab, setActiveTab] = useState('activeAlerts');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await getSmartAlerts(activeTab);
        setData(result);
        setError(null);
      } catch (err) {
        setError('Failed to load smart alerts data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleAcknowledgeAlert = async (alertId) => {
    try {
      await acknowledgeAlert(alertId);
      
      // Update the local state to reflect the change
      setData(prevData => 
        prevData.map(alert => 
          alert.id === alertId 
            ? { ...alert, status: 'acknowledged' } 
            : alert
        )
      );
    } catch (err) {
      setError('Failed to acknowledge alert');
      console.error(err);
    }
  };

  const renderActiveAlerts = () => {
    return (
      <div className="alerts-list">
        {data.map((alert) => (
          <div key={alert.id} className={`alert-card priority-${alert.priority ? alert.priority.toLowerCase() : 'unknown'}`}>
            <div className="alert-header">
              <div className="alert-type">{alert.type}</div>
              <div className="alert-priority">{alert.priority || 'Unknown'}</div>
            </div>
            <div className="alert-message">{alert.message}</div>
            <div className="alert-meta">
              <div className="alert-timestamp">{new Date(alert.timestamp).toLocaleString()}</div>
              <div className="alert-status">{alert.status}</div>
            </div>
            <div className="alert-actions">
              {alert.status === 'unacknowledged' && (
                <button 
                  className="acknowledge-button"
                  onClick={() => handleAcknowledgeAlert(alert.id)}
                >
                  Acknowledge
                </button>
              )}
              <button className="view-details-button">View Details</button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderAlertSettings = () => {
    return (
      <div className="alert-settings-table-container">
        <table className="alert-settings-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Priority</th>
              <th>Notification Channels</th>
              <th>Recipients</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((setting) => (
              <tr key={setting.id}>
                <td>{setting.category}</td>
                <td>
                  <span className={`priority-badge ${setting.priority ? setting.priority.toLowerCase() : 'unknown'}`}>
                    {setting.priority || 'Unknown'}
                  </span>
                </td>
                <td>{setting.notificationChannels && Array.isArray(setting.notificationChannels) ? setting.notificationChannels.join(', ') : 'None'}</td>
                <td>{setting.recipients && Array.isArray(setting.recipients) ? setting.recipients.join(', ') : 'None'}</td>
                <td>
                  <button className="edit-settings-button">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderAlertHistory = () => {
    return (
      <div className="alert-history-table-container">
        <table className="alert-history-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Priority</th>
              <th>Message</th>
              <th>Timestamp</th>
              <th>Resolved At</th>
              <th>Resolved By</th>
            </tr>
          </thead>
          <tbody>
            {data.map((alert) => (
              <tr key={alert.id}>
                <td>{alert.type}</td>
                <td>
                  <span className={`priority-badge ${alert.priority ? alert.priority.toLowerCase() : 'unknown'}`}>
                    {alert.priority || 'Unknown'}
                  </span>
                </td>
                <td>{alert.message}</td>
                <td>{alert.timestamp ? new Date(alert.timestamp).toLocaleString() : 'Unknown'}</td>
                <td>{alert.resolvedAt ? new Date(alert.resolvedAt).toLocaleString() : 'Not resolved'}</td>
                <td>{alert.resolvedBy || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderContent = () => {
    if (isLoading) {
      return <div className="loading-indicator">Loading smart alerts data...</div>;
    }

    if (error) {
      return <div className="error-message">{error}</div>;
    }

    switch (activeTab) {
      case 'activeAlerts':
        return renderActiveAlerts();
      case 'alertSettings':
        return renderAlertSettings();
      case 'alertHistory':
        return renderAlertHistory();
      default:
        return <div>Select a category to view alerts</div>;
    }
  };

  return (
    <div className="smart-alerts-container">
      <div className="alerts-header">
        <h2>Smart Alerts</h2>
        <p>Intelligent notification system that prioritizes and manages alerts</p>
      </div>

      <div className="alerts-tabs">
        <button
          className={activeTab === 'activeAlerts' ? 'active' : ''}
          onClick={() => handleTabChange('activeAlerts')}
        >
          <span className="tab-icon active-alerts-icon"></span>
          Active Alerts
        </button>
        <button
          className={activeTab === 'alertSettings' ? 'active' : ''}
          onClick={() => handleTabChange('alertSettings')}
        >
          <span className="tab-icon settings-icon"></span>
          Alert Settings
        </button>
        <button
          className={activeTab === 'alertHistory' ? 'active' : ''}
          onClick={() => handleTabChange('alertHistory')}
        >
          <span className="tab-icon history-icon"></span>
          Alert History
        </button>
      </div>

      <div className="alerts-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default SmartAlerts;
