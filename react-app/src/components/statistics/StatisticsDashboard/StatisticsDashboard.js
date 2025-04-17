import { useState, useEffect } from 'react';
import { mockStatisticsService } from '../../../services/api/mockStatisticsService';

/**
 * Custom hook containing business logic for StatisticsDashboard component
 * 
 * @returns {Object} State and handlers for StatisticsDashboard component
 */
export const useStatisticsDashboardLogic = () => {
  // State for KPI data
  const [kpiData, setKpiData] = useState([]);
  // State for trend data
  const [trendData, setTrendData] = useState({});
  // State for loading status
  const [isLoading, setIsLoading] = useState(true);
  // State for error message
  const [error, setError] = useState(null);
  // State for selected time range
  const [timeRange, setTimeRange] = useState('month');
  
  /**
   * Fetch data from the statistics service
   * This effect runs when the component mounts and when the timeRange changes
   */
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch KPI data
        const kpiResponse = await mockStatisticsService.getKPIData(timeRange);
        setKpiData(kpiResponse);
        
        // Fetch trend data for multiple metrics
        const metrics = ['fuelConsumption', 'operationalCosts', 'co2Emission', 'safetyIndex'];
        const trendResponse = await mockStatisticsService.getTrendData(timeRange, metrics);
        setTrendData(trendResponse);
        
        setError(null);
      } catch (err) {
        console.error('Error fetching statistics data:', err);
        setError('Nie udało się pobrać danych statystycznych. Spróbuj ponownie później.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [timeRange]);
  
  /**
   * Handle time range change
   * @param {string} range - New time range
   */
  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
  };
  
  /**
   * Handle export button click
   * @param {string} format - Export format
   */
  const handleExport = (format) => {
    console.log(`Exporting data in ${format} format`);
    // In a real implementation, this would call the export method from the service
    alert(`Eksport danych w formacie ${format} zostanie zaimplementowany w przyszłości.`);
  };
  
  return {
    kpiData,
    trendData,
    isLoading,
    error,
    timeRange,
    handleTimeRangeChange,
    handleExport
  };
};
