import React from 'react';
import './StatisticsCard.css';

/**
 * StatisticsCard component displays a KPI card with title, value, unit, and trend
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Card title
 * @param {number} props.value - Card value
 * @param {string} props.unit - Unit of measurement
 * @param {number} props.trend - Trend value (percentage)
 * @param {string} props.status - Card status (good, warning, critical, neutral)
 * @returns {JSX.Element} StatisticsCard component
 */
const StatisticsCard = ({ title, value, unit, trend, status = 'neutral' }) => {
  /**
   * Formats the value for display
   * @param {number|string} val - Value to format
   * @returns {string} Formatted value
   */
  const formatValue = (val) => {
    if (typeof val === 'number') {
      if (val >= 1000000) {
        return (val / 1000000).toFixed(1) + ' mln';
      } else if (val >= 1000) {
        return (val / 1000).toFixed(1) + ' tys';
      } else {
        return val.toString();
      }
    }
    return val;
  };
  
  /**
   * Returns the appropriate trend icon based on trend value
   * @returns {JSX.Element} Trend icon
   */
  const getTrendIcon = () => {
    if (trend > 0) {
      return <span className="trend-icon trend-up">↑</span>;
    } else if (trend < 0) {
      return <span className="trend-icon trend-down">↓</span>;
    } else {
      return <span className="trend-icon trend-neutral">→</span>;
    }
  };
  
  /**
   * Returns the appropriate trend class based on trend value and metric type
   * @returns {string} Trend class
   */
  const getTrendClass = () => {
    // For these metrics, lower is better
    const lowerIsBetterMetrics = ['fuelConsumption', 'operationalCosts', 'co2Emission', 'maintenanceCosts'];
    
    const isLowerBetter = lowerIsBetterMetrics.some(metric => 
      title.toLowerCase().includes(metric.toLowerCase())
    );
    
    if (isLowerBetter) {
      return trend < 0 ? 'trend-positive' : trend > 0 ? 'trend-negative' : 'trend-neutral';
    } else {
      // For other metrics, higher is better
      return trend > 0 ? 'trend-positive' : trend < 0 ? 'trend-negative' : 'trend-neutral';
    }
  };
  
  return (
    <div className={`statistics-card status-${status || 'neutral'}`}>
      <div className="card-title">{title}</div>
      <div className="card-value">
        {formatValue(value)}
        <span className="card-unit">{unit}</span>
      </div>
      {trend !== undefined && (
        <div className={`card-trend ${getTrendClass()}`}>
          {getTrendIcon()}
          {Math.abs(trend)}%
        </div>
      )}
    </div>
  );
};

export default StatisticsCard;
