import React, { useState, useEffect } from 'react';
import { getAnomalyDetection } from '../../services/aiAutomationService';
import './AnomalyDetection.css';

/**
 * AnomalyDetection component displays unusual patterns detected in various fleet data
 * 
 * This component shows anomalies in:
 * - Driver behavior (unsafe driving, unauthorized stops)
 * - Fuel usage (potential theft or leaks)
 * - Route deviations (unauthorized route changes)
 * - Financial data (unusual costs, suspicious transactions)
 * 
 * @returns {JSX.Element} AnomalyDetection component
 */
const AnomalyDetection = () => {
  const [activeTab, setActiveTab] = useState('driverBehavior');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await getAnomalyDetection(activeTab);
        setData(result);
        setError(null);
      } catch (err) {
        setError('Failed to load anomaly detection data');
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

  const renderDriverBehavior = () => {
    return (
      <div className="anomaly-table-container">
        <table className="anomaly-table">
          <thead>
            <tr>
              <th>Driver ID</th>
              <th>Anomaly Type</th>
              <th>Occurrences</th>
              <th>Last Detected</th>
              <th>Severity</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.driverId}</td>
                <td>{item.anomalyType}</td>
                <td>{item.occurrences}</td>
                <td>{new Date(item.lastDetected).toLocaleString()}</td>
                <td>
                  <span className={`severity-badge ${item.severity}`}>
                    {item.severity}
                  </span>
                </td>
                <td>
                  <span className={`status-badge ${item.status.replace(/\s+/g, '-')}`}>
                    {item.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="view-button">View</button>
                    <button className="resolve-button">Resolve</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderFuelUsage = () => {
    return (
      <div className="anomaly-table-container">
        <table className="anomaly-table">
          <thead>
            <tr>
              <th>Vehicle ID</th>
              <th>Anomaly Type</th>
              <th>Detected At</th>
              <th>Deviation</th>
              <th>Potential Cause</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.vehicleId}</td>
                <td>{item.anomalyType}</td>
                <td>{new Date(item.detectedAt).toLocaleString()}</td>
                <td>{item.deviation}</td>
                <td>{item.potentialCause}</td>
                <td>
                  <span className={`status-badge ${item.status.replace(/\s+/g, '-')}`}>
                    {item.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="view-button">View</button>
                    <button className="resolve-button">Resolve</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderRouteDeviations = () => {
    return (
      <div className="anomaly-table-container">
        <table className="anomaly-table">
          <thead>
            <tr>
              <th>Trip ID</th>
              <th>Driver ID</th>
              <th>Detected At</th>
              <th>Deviation Type</th>
              <th>Duration</th>
              <th>Distance</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.tripId}</td>
                <td>{item.driverId}</td>
                <td>{new Date(item.detectedAt).toLocaleString()}</td>
                <td>{item.deviationType}</td>
                <td>{item.duration}</td>
                <td>{item.distance}</td>
                <td>
                  <span className={`status-badge ${item.status.replace(/\s+/g, '-')}`}>
                    {item.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="view-button">View</button>
                    <button className="resolve-button">Resolve</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderFinancialAnomalies = () => {
    return (
      <div className="anomaly-table-container">
        <table className="anomaly-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Detected At</th>
              <th>Anomaly Type</th>
              <th>Amount</th>
              <th>Deviation</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.category}</td>
                <td>{new Date(item.detectedAt).toLocaleDateString()}</td>
                <td>{item.anomalyType}</td>
                <td>{item.amount}</td>
                <td>{item.deviation}</td>
                <td>
                  <span className={`status-badge ${item.status.replace(/\s+/g, '-')}`}>
                    {item.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="view-button">View</button>
                    <button className="resolve-button">Resolve</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderContent = () => {
    if (isLoading) {
      return <div className="loading-indicator">Loading anomaly detection data...</div>;
    }

    if (error) {
      return <div className="error-message">{error}</div>;
    }

    switch (activeTab) {
      case 'driverBehavior':
        return renderDriverBehavior();
      case 'fuelUsage':
        return renderFuelUsage();
      case 'routeDeviations':
        return renderRouteDeviations();
      case 'financialAnomalies':
        return renderFinancialAnomalies();
      default:
        return <div>Select a category to view anomalies</div>;
    }
  };

  return (
    <div className="anomaly-detection-container">
      <div className="anomaly-header">
        <h2>Anomaly Detection</h2>
        <p>AI-powered detection of unusual patterns and potential issues</p>
      </div>

      <div className="anomaly-tabs">
        <button
          className={activeTab === 'driverBehavior' ? 'active' : ''}
          onClick={() => handleTabChange('driverBehavior')}
        >
          <span className="tab-icon driver-behavior-icon"></span>
          Driver Behavior
        </button>
        <button
          className={activeTab === 'fuelUsage' ? 'active' : ''}
          onClick={() => handleTabChange('fuelUsage')}
        >
          <span className="tab-icon fuel-usage-icon"></span>
          Fuel Usage
        </button>
        <button
          className={activeTab === 'routeDeviations' ? 'active' : ''}
          onClick={() => handleTabChange('routeDeviations')}
        >
          <span className="tab-icon route-deviation-icon"></span>
          Route Deviations
        </button>
        <button
          className={activeTab === 'financialAnomalies' ? 'active' : ''}
          onClick={() => handleTabChange('financialAnomalies')}
        >
          <span className="tab-icon financial-icon"></span>
          Financial Anomalies
        </button>
      </div>

      <div className="anomaly-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default AnomalyDetection;
