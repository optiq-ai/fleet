import React from 'react';
import './ComparativeAnalysis.css';
import { useComparativeAnalysisLogic } from './ComparativeAnalysis.js';
import StatisticsChart from '../common/StatisticsChart';
import StatisticsFilter from '../common/StatisticsFilter';
import StatisticsTable from '../common/StatisticsTable';
import StatisticsExport from '../common/StatisticsExport';

/**
 * ComparativeAnalysis component
 * Displays comparative analysis for various entities (vehicles, drivers, routes)
 * 
 * @returns {JSX.Element} ComparativeAnalysis component
 */
const ComparativeAnalysis = () => {
  const {
    comparisonData,
    isLoading,
    error,
    timeRange,
    comparisonType,
    selectedMetric,
    activeTab,
    comparisonTypeOptions,
    metricOptions,
    handleTimeRangeChange,
    handleComparisonTypeChange,
    handleMetricChange,
    handleTabChange,
    handleExport,
    generateSummary,
    prepareChartData,
    prepareTableData
  } = useComparativeAnalysisLogic();
  
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
  
  // Get metric info
  const metricInfo = metricOptions.find(option => option.id === selectedMetric);
  
  // Get comparison type info
  const comparisonTypeInfo = comparisonTypeOptions.find(option => option.id === comparisonType);
  
  // Get summary
  const summary = generateSummary();
  
  // Get chart data
  const chartData = prepareChartData();
  
  // Get table data and columns
  const { data: tableData, columns: tableColumns } = prepareTableData();
  
  return (
    <div className="comparative-analysis">
      <div className="comparative-header">
        <h2 className="comparative-title">Analiza porównawcza</h2>
        <div className="comparative-controls">
          <StatisticsFilter 
            timeRange={timeRange} 
            onTimeRangeChange={handleTimeRangeChange} 
          />
          
          <div className="comparison-type-selector">
            <span className="selector-label">Typ porównania:</span>
            <select 
              className="selector-select"
              value={comparisonType}
              onChange={handleComparisonTypeChange}
            >
              {comparisonTypeOptions.map(option => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="comparison-metric-selector">
            <span className="selector-label">Metryka:</span>
            <select 
              className="selector-select"
              value={selectedMetric}
              onChange={handleMetricChange}
            >
              {metricOptions.map(option => (
                <option key={option.id} value={option.id}>
                  {option.name} ({option.unit})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      <div className="comparison-tabs">
        <div 
          className={`comparison-tab ${activeTab === 'chart' ? 'active' : ''}`}
          onClick={() => handleTabChange('chart')}
        >
          Wykres
        </div>
        <div 
          className={`comparison-tab ${activeTab === 'table' ? 'active' : ''}`}
          onClick={() => handleTabChange('table')}
        >
          Tabela
        </div>
        <div 
          className={`comparison-tab ${activeTab === 'summary' ? 'active' : ''}`}
          onClick={() => handleTabChange('summary')}
        >
          Podsumowanie
        </div>
      </div>
      
      {/* Summary section - always visible */}
      <div className="comparison-summary">
        <h3 className="summary-title">Podsumowanie analizy</h3>
        <div className="summary-content">
          {summary.text}
        </div>
        
        {summary.best && summary.worst && (
          <div className="summary-highlights">
            <div className="highlight-item">
              <div className="highlight-title">Najlepszy wynik</div>
              <div className="highlight-value">{summary.best.value} {metricInfo?.unit}</div>
              <div className="highlight-description">{summary.best.name}</div>
            </div>
            
            <div className="highlight-item">
              <div className="highlight-title">Najgorszy wynik</div>
              <div className="highlight-value">{summary.worst.value} {metricInfo?.unit}</div>
              <div className="highlight-description">{summary.worst.name}</div>
            </div>
            
            <div className="highlight-item">
              <div className="highlight-title">Średnia</div>
              <div className="highlight-value">{summary.average.toFixed(2)} {metricInfo?.unit}</div>
              <div className="highlight-description">Wszystkie {comparisonTypeInfo?.name.toLowerCase()}</div>
            </div>
            
            <div className="highlight-item">
              <div className="highlight-title">Mediana</div>
              <div className="highlight-value">{summary.median.toFixed(2)} {metricInfo?.unit}</div>
              <div className="highlight-description">Wszystkie {comparisonTypeInfo?.name.toLowerCase()}</div>
            </div>
          </div>
        )}
      </div>
      
      {/* Chart view */}
      {activeTab === 'chart' && (
        <div className="comparison-chart-container">
          <div className="comparison-chart-header">
            <h3 className="comparison-chart-title">
              {`${metricInfo?.name || 'Wartość'} według ${comparisonTypeInfo?.name.toLowerCase() || 'typu'}`}
            </h3>
            <div className="comparison-chart-actions">
              <button className="comparison-chart-action-button">
                <span className="comparison-chart-action-icon">🔍</span>
                Powiększ
              </button>
              <button className="comparison-chart-action-button">
                <span className="comparison-chart-action-icon">⚙️</span>
                Opcje
              </button>
            </div>
          </div>
          
          <StatisticsChart 
            data={chartData}
            type="bar"
            xAxis="name"
            yAxis="value"
            color={metricInfo?.color || '#2196F3'}
          />
        </div>
      )}
      
      {/* Table view */}
      {activeTab === 'table' && (
        <div className="comparison-table-container">
          <StatisticsTable 
            data={tableData}
            columns={tableColumns}
            pageSize={10}
          />
        </div>
      )}
      
      <StatisticsExport onExport={handleExport} />
    </div>
  );
};

export default ComparativeAnalysis;
