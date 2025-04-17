import React from 'react';
import './TrendAnalysis.css';
import { useTrendAnalysisLogic } from './TrendAnalysis.js';
import StatisticsChart from '../common/StatisticsChart';
import StatisticsFilter from '../common/StatisticsFilter';
import StatisticsExport from '../common/StatisticsExport';

/**
 * TrendAnalysis component
 * Displays trend analysis for various metrics over time
 * 
 * @returns {JSX.Element} TrendAnalysis component
 */
const TrendAnalysis = () => {
  const {
    trendData,
    isLoading,
    error,
    timeRange,
    selectedMetrics,
    activeTab,
    isMultiMetric,
    metricOptions,
    handleTimeRangeChange,
    handleMetricChange,
    handleMultiMetricToggle,
    handleTabChange,
    handleExport,
    generateInsights
  } = useTrendAnalysisLogic();
  
  // Show loading spinner while data is being fetched
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }
  
  // Show error message if there was an error fetching data
  if (error) {
    return (
      <div className="error-container">
        {error}
      </div>
    );
  }
  
  // Get colors for selected metrics
  const getMetricColors = () => {
    const colors = {};
    selectedMetrics.forEach(metricId => {
      const metric = metricOptions.find(option => option.id === metricId);
      if (metric) {
        colors[metricId] = metric.color;
      }
    });
    return colors;
  };
  
  // Get name for selected metric
  const getMetricName = (metricId) => {
    const metric = metricOptions.find(option => option.id === metricId);
    return metric ? metric.name : metricId;
  };
  
  return (
    <div className="trend-analysis">
      <div className="trend-header">
        <h2 className="trend-title">Analiza trendów</h2>
        <div className="trend-controls">
          <StatisticsFilter 
            timeRange={timeRange} 
            onTimeRangeChange={handleTimeRangeChange} 
          />
          
          <div className="metric-selector">
            <span className="metric-label">Metryka:</span>
            <select 
              className="metric-select"
              value={selectedMetrics[0]} // In single-metric mode, use the first selected metric
              onChange={handleMetricChange}
            >
              {metricOptions.map(option => (
                <option key={option.id} value={option.id}>
                  {option.name} ({option.unit})
                </option>
              ))}
            </select>
            
            <div className="multi-metric-toggle">
              <span className="toggle-label">Wiele metryk:</span>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={isMultiMetric}
                  onChange={handleMultiMetricToggle}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="trend-analysis-tabs">
        <div 
          className={`trend-tab ${activeTab === 'chart' ? 'active' : ''}`}
          onClick={() => handleTabChange('chart')}
        >
          Wykres
        </div>
        <div 
          className={`trend-tab ${activeTab === 'insights' ? 'active' : ''}`}
          onClick={() => handleTabChange('insights')}
        >
          Wnioski
        </div>
      </div>
      
      {activeTab === 'chart' ? (
        <div className="chart-container">
          <div className="chart-header">
            <h3 className="chart-title">
              {isMultiMetric 
                ? 'Porównanie trendów' 
                : `Trend: ${getMetricName(selectedMetrics[0])}`}
            </h3>
            <div className="chart-actions">
              <button className="chart-action-button">
                <span className="chart-action-icon">🔍</span>
                Powiększ
              </button>
              <button className="chart-action-button">
                <span className="chart-action-icon">⚙️</span>
                Opcje
              </button>
            </div>
          </div>
          
          {isMultiMetric ? (
            <StatisticsChart 
              data={trendData}
              type="multiLine"
              xAxis="date"
              yAxis="value"
              series={selectedMetrics}
              colors={getMetricColors()}
            />
          ) : (
            <StatisticsChart 
              data={trendData[selectedMetrics[0]]}
              type="line"
              xAxis="date"
              yAxis="value"
              color={metricOptions.find(option => option.id === selectedMetrics[0])?.color || '#2196F3'}
            />
          )}
        </div>
      ) : (
        <div className="trend-insights">
          <h3 className="insights-title">Wnioski z analizy trendów</h3>
          <ul className="insights-list">
            {generateInsights().map((insight, index) => (
              <li key={index} className="insights-item">{insight}</li>
            ))}
          </ul>
        </div>
      )}
      
      <StatisticsExport onExport={handleExport} />
    </div>
  );
};

export default TrendAnalysis;
