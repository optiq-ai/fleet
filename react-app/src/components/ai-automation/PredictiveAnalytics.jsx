import React, { useState, useEffect } from 'react';
import { getPredictiveAnalytics } from '../../services/aiAutomationService';
import './PredictiveAnalytics.css';

/**
 * PredictiveAnalytics component displays advanced AI models for predicting various fleet metrics
 * 
 * This component shows predictions for:
 * - Vehicle failures based on telematic data and service history
 * - Delivery delays based on historical data, weather conditions and traffic
 * - Fuel consumption and CO2 emissions based on routes, driving style and vehicle parameters
 * - Optimal maintenance schedules for parts and fluids
 * 
 * @returns {JSX.Element} PredictiveAnalytics component
 */
const PredictiveAnalytics = () => {
  const [activeTab, setActiveTab] = useState('vehicleFailures');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await getPredictiveAnalytics(activeTab);
        setData(result);
        setError(null);
      } catch (err) {
        setError('Failed to load predictive analytics data');
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

  const renderVehicleFailures = () => {
    return (
      <div className="predictive-table-container">
        <table className="predictive-table">
          <thead>
            <tr>
              <th>Vehicle ID</th>
              <th>Component</th>
              <th>Probability</th>
              <th>Time to Failure</th>
              <th>Suggested Action</th>
              <th>Severity</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className={`severity-${item.severity}`}>
                <td>{item.vehicleId}</td>
                <td>{item.component}</td>
                <td>{(item.probability * 100).toFixed(1)}%</td>
                <td>{item.estimatedTimeToFailure}</td>
                <td>{item.suggestedAction}</td>
                <td>
                  <span className={`severity-indicator ${item.severity}`}>
                    {item.severity.charAt(0).toUpperCase() + item.severity.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderDeliveryDelays = () => {
    return (
      <div className="predictive-table-container">
        <table className="predictive-table">
          <thead>
            <tr>
              <th>Route ID</th>
              <th>Delay Probability</th>
              <th>Estimated Delay</th>
              <th>Cause</th>
              <th>Suggested Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.routeId}</td>
                <td>{(item.probability * 100).toFixed(1)}%</td>
                <td>{item.estimatedDelay}</td>
                <td>{item.cause}</td>
                <td>{item.suggestedAction}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderFuelConsumption = () => {
    return (
      <div className="predictive-table-container">
        <table className="predictive-table">
          <thead>
            <tr>
              <th>Vehicle ID</th>
              <th>Predicted Consumption</th>
              <th>CO2 Emission</th>
              <th>Improvement Suggestion</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.vehicleId}</td>
                <td>{item.predictedConsumption}</td>
                <td>{item.co2Emission}</td>
                <td>{item.improvementSuggestion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderMaintenanceSchedule = () => {
    return (
      <div className="predictive-table-container">
        <table className="predictive-table">
          <thead>
            <tr>
              <th>Vehicle ID</th>
              <th>Component</th>
              <th>Optimal Replacement Date</th>
              <th>Cost Saving</th>
              <th>Extended Lifespan</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.vehicleId}</td>
                <td>{item.component}</td>
                <td>{item.optimalReplacementDate}</td>
                <td>{item.costSaving}</td>
                <td>{item.extendedLifespan}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderContent = () => {
    if (isLoading) {
      return <div className="loading-indicator">Loading predictive analytics data...</div>;
    }

    if (error) {
      return <div className="error-message">{error}</div>;
    }

    switch (activeTab) {
      case 'vehicleFailures':
        return renderVehicleFailures();
      case 'deliveryDelays':
        return renderDeliveryDelays();
      case 'fuelConsumption':
        return renderFuelConsumption();
      case 'maintenanceSchedule':
        return renderMaintenanceSchedule();
      default:
        return <div>Select a category to view predictions</div>;
    }
  };

  return (
    <div className="predictive-analytics-container">
      <div className="predictive-header">
        <h2>Predictive Analytics</h2>
        <p>Advanced AI models to predict and prevent issues before they occur</p>
      </div>

      <div className="predictive-tabs">
        <button
          className={activeTab === 'vehicleFailures' ? 'active' : ''}
          onClick={() => handleTabChange('vehicleFailures')}
        >
          <span className="tab-icon vehicle-icon"></span>
          Vehicle Failures
        </button>
        <button
          className={activeTab === 'deliveryDelays' ? 'active' : ''}
          onClick={() => handleTabChange('deliveryDelays')}
        >
          <span className="tab-icon delay-icon"></span>
          Delivery Delays
        </button>
        <button
          className={activeTab === 'fuelConsumption' ? 'active' : ''}
          onClick={() => handleTabChange('fuelConsumption')}
        >
          <span className="tab-icon fuel-icon"></span>
          Fuel & Emissions
        </button>
        <button
          className={activeTab === 'maintenanceSchedule' ? 'active' : ''}
          onClick={() => handleTabChange('maintenanceSchedule')}
        >
          <span className="tab-icon maintenance-icon"></span>
          Maintenance Schedule
        </button>
      </div>

      <div className="predictive-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default PredictiveAnalytics;
