import React from 'react';
import './StatisticsFilter.css';

/**
 * StatisticsFilter component provides time range filtering options
 * 
 * @param {Object} props - Component props
 * @param {string} props.timeRange - Current selected time range
 * @param {Function} props.onTimeRangeChange - Callback when time range changes
 * @returns {JSX.Element} StatisticsFilter component
 */
const StatisticsFilter = ({ timeRange, onTimeRangeChange }) => {
  // Available time range options
  const timeRangeOptions = [
    { id: 'day', name: 'Dzień' },
    { id: 'week', name: 'Tydzień' },
    { id: 'month', name: 'Miesiąc' },
    { id: 'year', name: 'Rok' },
    { id: 'custom', name: 'Niestandardowy' }
  ];
  
  return (
    <div className="statistics-filter">
      <div className="time-range-selector">
        <span className="filter-label">Zakres czasu:</span>
        <div className="time-range-buttons">
          {timeRangeOptions.map(option => (
            <button
              key={option.id}
              className={`time-range-button ${timeRange === option.id ? 'active' : ''}`}
              onClick={() => onTimeRangeChange(option.id)}
            >
              {option.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatisticsFilter;
