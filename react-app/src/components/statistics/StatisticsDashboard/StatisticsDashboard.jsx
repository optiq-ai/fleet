import { useStatisticsDashboardLogic } from './StatisticsDashboard.js';
import React from 'react';
import './StatisticsDashboard.css';
import StatisticsCard from '../common/StatisticsCard';
import StatisticsChart from '../common/StatisticsChart';
import StatisticsFilter from '../common/StatisticsFilter';
import StatisticsExport from '../common/StatisticsExport';

/**
 * StatisticsDashboard component
 * Main dashboard for the Statistics section displaying KPIs and charts
 * 
 * @returns {JSX.Element} StatisticsDashboard component
 */
const StatisticsDashboard = () => {
  const {
    kpiData,
    trendData,
    isLoading,
    error,
    timeRange,
    handleTimeRangeChange,
    handleExport
  } = useStatisticsDashboardLogic();
  
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
  
  return (
    <div className="statistics-dashboard">
      <div className="dashboard-header">
        <h2 className="dashboard-title">Dashboard statystyczny</h2>
        <StatisticsFilter 
          timeRange={timeRange} 
          onTimeRangeChange={handleTimeRangeChange} 
        />
      </div>
      
      {/* KPI Cards */}
      <div className="kpi-container">
        {kpiData.map(kpi => (
          <StatisticsCard 
            key={kpi.id}
            title={kpi.name}
            value={kpi.value}
            unit={kpi.unit}
            trend={kpi.trend}
            status={kpi.status}
          />
        ))}
      </div>
      
      {/* Charts */}
      <div className="charts-container">
        <div className="chart-wrapper">
          <h3 className="chart-title">Zużycie paliwa</h3>
          <StatisticsChart 
            data={trendData.fuelConsumption}
            type="line"
            xAxis="date"
            yAxis="value"
            color="#4CAF50"
          />
        </div>
        
        <div className="chart-wrapper">
          <h3 className="chart-title">Koszty operacyjne</h3>
          <StatisticsChart 
            data={trendData.operationalCosts}
            type="line"
            xAxis="date"
            yAxis="value"
            color="#2196F3"
          />
        </div>
        
        <div className="chart-wrapper">
          <h3 className="chart-title">Emisja CO2</h3>
          <StatisticsChart 
            data={trendData.co2Emission}
            type="line"
            xAxis="date"
            yAxis="value"
            color="#FF5722"
          />
        </div>
        
        <div className="chart-wrapper">
          <h3 className="chart-title">Indeks bezpieczeństwa</h3>
          <StatisticsChart 
            data={trendData.safetyIndex}
            type="line"
            xAxis="date"
            yAxis="value"
            color="#9C27B0"
          />
        </div>
      </div>
      
      {/* Export options */}
      <StatisticsExport onExport={handleExport} />
      
      {/* Quick links */}
      <div className="quick-links">
        <h3 className="quick-links-title">Szybkie linki</h3>
        <div className="links-container">
          <a href="#/statistics/trends" className="statistics-link">
            <span className="statistics-link-icon">📈</span>
            Analiza trendów
          </a>
          <a href="#/statistics/comparison" className="statistics-link">
            <span className="statistics-link-icon">🔍</span>
            Analiza porównawcza
          </a>
          <a href="#/statistics/anomalies" className="statistics-link">
            <span className="statistics-link-icon">⚠️</span>
            Wykrywanie anomalii
          </a>
          <a href="#/statistics/predictions" className="statistics-link">
            <span className="statistics-link-icon">🔮</span>
            Analiza predykcyjna
          </a>
          <a href="#/statistics/costs" className="statistics-link">
            <span className="statistics-link-icon">💰</span>
            Analiza kosztów
          </a>
          <a href="#/statistics/reports" className="statistics-link">
            <span className="statistics-link-icon">📊</span>
            Generator raportów
          </a>
        </div>
      </div>
    </div>
  );
};

export default StatisticsDashboard;
