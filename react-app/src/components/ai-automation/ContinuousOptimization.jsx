import React, { useState, useEffect } from 'react';
import { getContinuousOptimization } from '../../services/aiAutomationService';
import './ContinuousOptimization.css';

/**
 * ContinuousOptimization component displays ongoing process optimization capabilities
 * 
 * This component shows:
 * - Automatic system parameter adjustments based on results
 * - Identification of operational bottlenecks
 * - Suggestions for process improvements based on historical data
 * - Internal and external benchmarking comparisons
 * 
 * @returns {JSX.Element} ContinuousOptimization component
 */
const ContinuousOptimization = () => {
  const [activeTab, setActiveTab] = useState('systemParameters');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await getContinuousOptimization(activeTab);
        setData(result);
        setError(null);
      } catch (err) {
        setError('Failed to load continuous optimization data');
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

  const renderSystemParameters = () => {
    return (
      <div className="parameters-table-container">
        <table className="optimization-table">
          <thead>
            <tr>
              <th>Parameter</th>
              <th>Current Value</th>
              <th>Recommended Value</th>
              <th>Potential Impact</th>
              <th>Confidence</th>
              <th>Last Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((param) => (
              <tr key={param.id}>
                <td>{param.name}</td>
                <td>{param.currentValue}</td>
                <td>{param.recommendedValue}</td>
                <td>{param.potentialImpact}</td>
                <td>
                  <span className={`confidence-badge ${param.confidence.toLowerCase()}`}>
                    {param.confidence}
                  </span>
                </td>
                <td>{new Date(param.lastUpdated).toLocaleDateString()}</td>
                <td>
                  <div className="action-buttons">
                    <button className="apply-button">Apply</button>
                    <button className="ignore-button">Ignore</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderProcessBottlenecks = () => {
    return (
      <div className="bottlenecks-table-container">
        <table className="optimization-table">
          <thead>
            <tr>
              <th>Process</th>
              <th>Bottleneck</th>
              <th>Impact</th>
              <th>Recommendation</th>
              <th>Priority</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((bottleneck) => (
              <tr key={bottleneck.id}>
                <td>{bottleneck.process}</td>
                <td>{bottleneck.bottleneck}</td>
                <td>{bottleneck.impact}</td>
                <td>{bottleneck.recommendation}</td>
                <td>
                  <span className={`priority-badge ${bottleneck.priority.toLowerCase()}`}>
                    {bottleneck.priority}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="view-details-button">Details</button>
                    <button className="implement-button">Implement</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderImprovementSuggestions = () => {
    return (
      <div className="suggestions-table-container">
        <table className="optimization-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Suggestion</th>
              <th>Estimated Impact</th>
              <th>Implementation Effort</th>
              <th>Priority</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((suggestion) => (
              <tr key={suggestion.id}>
                <td>{suggestion.category}</td>
                <td>{suggestion.suggestion}</td>
                <td>{suggestion.estimatedImpact}</td>
                <td>{suggestion.implementationEffort}</td>
                <td>
                  <span className={`priority-badge ${suggestion.priority.toLowerCase()}`}>
                    {suggestion.priority}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="view-details-button">Details</button>
                    <button className="implement-button">Implement</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderBenchmarkData = () => {
    return (
      <div className="benchmark-table-container">
        <table className="optimization-table">
          <thead>
            <tr>
              <th>Metric</th>
              <th>Current Value</th>
              <th>Industry Average</th>
              <th>Top Performer</th>
              <th>Percentile</th>
              <th>Trend</th>
            </tr>
          </thead>
          <tbody>
            {data.map((benchmark) => (
              <tr key={benchmark.id}>
                <td>{benchmark.metric}</td>
                <td>{benchmark.currentValue}</td>
                <td>{benchmark.industryAverage}</td>
                <td>{benchmark.topPerformer}</td>
                <td>{benchmark.percentile}</td>
                <td>
                  <span className={`trend-badge ${benchmark.trend.toLowerCase()}`}>
                    {benchmark.trend}
                  </span>
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
      return <div className="loading-indicator">Loading continuous optimization data...</div>;
    }

    if (error) {
      return <div className="error-message">{error}</div>;
    }

    switch (activeTab) {
      case 'systemParameters':
        return renderSystemParameters();
      case 'processBottlenecks':
        return renderProcessBottlenecks();
      case 'improvementSuggestions':
        return renderImprovementSuggestions();
      case 'benchmarkData':
        return renderBenchmarkData();
      default:
        return <div>Select a category to view optimization data</div>;
    }
  };

  return (
    <div className="continuous-optimization-container">
      <div className="optimization-header">
        <h2>Continuous Optimization</h2>
        <p>AI-driven process optimization that continuously improves fleet operations</p>
      </div>

      <div className="optimization-tabs">
        <button
          className={activeTab === 'systemParameters' ? 'active' : ''}
          onClick={() => handleTabChange('systemParameters')}
        >
          <span className="tab-icon parameters-icon"></span>
          System Parameters
        </button>
        <button
          className={activeTab === 'processBottlenecks' ? 'active' : ''}
          onClick={() => handleTabChange('processBottlenecks')}
        >
          <span className="tab-icon bottlenecks-icon"></span>
          Process Bottlenecks
        </button>
        <button
          className={activeTab === 'improvementSuggestions' ? 'active' : ''}
          onClick={() => handleTabChange('improvementSuggestions')}
        >
          <span className="tab-icon suggestions-icon"></span>
          Improvement Suggestions
        </button>
        <button
          className={activeTab === 'benchmarkData' ? 'active' : ''}
          onClick={() => handleTabChange('benchmarkData')}
        >
          <span className="tab-icon benchmark-icon"></span>
          Benchmark Data
        </button>
      </div>

      <div className="optimization-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default ContinuousOptimization;
