import React, { useState, useEffect } from 'react';
import { getScenarioSimulation, runScenarioSimulation } from '../../services/aiAutomationService';
import './ScenarioSimulation.css';

/**
 * ScenarioSimulation component allows simulating different operational scenarios
 * 
 * This component simulates:
 * - Impact of fleet changes on operational costs and CO2 emissions
 * - Different vehicle assignment strategies
 * - Effects of external conditions (weather, fuel prices) on operations
 * - Contingency plans for vehicle or driver unavailability
 * 
 * @returns {JSX.Element} ScenarioSimulation component
 */
const ScenarioSimulation = () => {
  const [activeTab, setActiveTab] = useState('fleetScenarios');
  const [data, setData] = useState([]);
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [simulationResults, setSimulationResults] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await getScenarioSimulation(activeTab);
        setData(result);
        setError(null);
      } catch (err) {
        setError('Failed to load scenario simulation data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedScenario(null);
    setSimulationResults(null);
  };

  const handleScenarioSelect = (scenario) => {
    setSelectedScenario(scenario);
    setSimulationResults(null);
  };

  const handleRunSimulation = async () => {
    if (!selectedScenario) return;
    
    try {
      setIsRunning(true);
      const results = await runScenarioSimulation(selectedScenario.id);
      setSimulationResults(results);
    } catch (err) {
      setError('Failed to run simulation');
      console.error(err);
    } finally {
      setIsRunning(false);
    }
  };

  const renderScenarioList = () => {
    return (
      <div className="scenario-list">
        {data.map((scenario) => (
          <div 
            key={scenario.id} 
            className={`scenario-card ${selectedScenario && selectedScenario.id === scenario.id ? 'selected' : ''}`}
            onClick={() => handleScenarioSelect(scenario)}
          >
            <div className="scenario-header">
              <h3>{scenario.name}</h3>
              <span className={`scenario-status ${scenario.status}`}>{scenario.status}</span>
            </div>
            <p className="scenario-description">{scenario.description}</p>
            <div className="scenario-parameters">
              <h4>Parameters:</h4>
              <ul>
                {Object.entries(scenario.parameters).map(([key, value]) => (
                  <li key={key}>
                    <span className="parameter-name">{key}:</span>
                    <span className="parameter-value">
                      {Array.isArray(value) ? value.join(', ') : value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderScenarioDetail = () => {
    if (!selectedScenario) {
      return <div className="select-scenario-message">Select a scenario to view details and run simulation</div>;
    }

    return (
      <div className="scenario-detail">
        <div className="scenario-detail-header">
          <h3>{selectedScenario.name}</h3>
          <button 
            className="run-simulation-button"
            onClick={handleRunSimulation}
            disabled={isRunning || selectedScenario.status === 'in progress'}
          >
            {isRunning ? 'Running Simulation...' : 'Run Simulation'}
          </button>
        </div>
        
        <p className="scenario-detail-description">{selectedScenario.description}</p>
        
        <div className="scenario-detail-parameters">
          <h4>Simulation Parameters:</h4>
          <table className="parameters-table">
            <tbody>
              {Object.entries(selectedScenario.parameters).map(([key, value]) => (
                <tr key={key}>
                  <td className="parameter-name">{key}</td>
                  <td className="parameter-value">
                    {Array.isArray(value) ? value.join(', ') : value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {simulationResults && (
          <div className="simulation-results">
            <h4>Simulation Results:</h4>
            <div className="results-timestamp">
              <span>Started: {new Date(simulationResults.startedAt).toLocaleString()}</span>
              <span>Completed: {new Date(simulationResults.completedAt).toLocaleString()}</span>
            </div>
            <div className="results-metrics">
              {Object.entries(simulationResults.results).map(([key, value]) => (
                <div key={key} className="result-metric">
                  <span className="metric-name">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                  <span className="metric-value">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderContent = () => {
    if (isLoading) {
      return <div className="loading-indicator">Loading scenario simulation data...</div>;
    }

    if (error) {
      return <div className="error-message">{error}</div>;
    }

    return (
      <div className="scenario-container">
        <div className="scenario-list-container">
          {renderScenarioList()}
        </div>
        <div className="scenario-detail-container">
          {renderScenarioDetail()}
        </div>
      </div>
    );
  };

  return (
    <div className="scenario-simulation-container">
      <div className="scenario-header">
        <h2>Scenario Simulation</h2>
        <p>Simulate different operational scenarios to optimize decision making</p>
      </div>

      <div className="scenario-tabs">
        <button
          className={activeTab === 'fleetScenarios' ? 'active' : ''}
          onClick={() => handleTabChange('fleetScenarios')}
        >
          <span className="tab-icon fleet-icon"></span>
          Fleet Scenarios
        </button>
        <button
          className={activeTab === 'assignmentScenarios' ? 'active' : ''}
          onClick={() => handleTabChange('assignmentScenarios')}
        >
          <span className="tab-icon assignment-icon"></span>
          Assignment Scenarios
        </button>
        <button
          className={activeTab === 'externalFactorsScenarios' ? 'active' : ''}
          onClick={() => handleTabChange('externalFactorsScenarios')}
        >
          <span className="tab-icon external-icon"></span>
          External Factors
        </button>
        <button
          className={activeTab === 'contingencyScenarios' ? 'active' : ''}
          onClick={() => handleTabChange('contingencyScenarios')}
        >
          <span className="tab-icon contingency-icon"></span>
          Contingency Plans
        </button>
      </div>

      <div className="scenario-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default ScenarioSimulation;
