import React from 'react';
import StatisticsDashboard from '../components/statistics/StatisticsDashboard/StatisticsDashboard';
import './Statistics.css';

/**
 * Statistics page component
 * Main container for the Statistics section of the application
 * 
 * @returns {JSX.Element} Statistics page component
 */
const Statistics = () => {
  return (
    <div className="statistics-page">
      <h1 className="statistics-title">Statystyki floty</h1>
      <p className="statistics-description">
        Kompleksowy widok statystyk i analiz dotyczących floty pojazdów, zużycia paliwa, 
        kosztów operacyjnych i wydajności kierowców.
      </p>
      
      <StatisticsDashboard />
    </div>
  );
};

export default Statistics;
