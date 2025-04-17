import { useState, useEffect } from 'react';
import { mockStatisticsService } from '../../../services/api/mockStatisticsService';

/**
 * Custom hook containing business logic for TrendAnalysis component
 * 
 * @returns {Object} State and handlers for TrendAnalysis component
 */
export const useTrendAnalysisLogic = () => {
  // State for trend data
  const [trendData, setTrendData] = useState({});
  // State for loading status
  const [isLoading, setIsLoading] = useState(true);
  // State for error message
  const [error, setError] = useState(null);
  // State for selected time range
  const [timeRange, setTimeRange] = useState('month');
  // State for selected metrics
  const [selectedMetrics, setSelectedMetrics] = useState(['fuelConsumption']);
  // State for active tab
  const [activeTab, setActiveTab] = useState('chart');
  // State for multi-metric mode
  const [isMultiMetric, setIsMultiMetric] = useState(false);
  // State for chart type
  const [chartType, setChartType] = useState('line');
  // State for chart options
  const [showDataLabels, setShowDataLabels] = useState(false);
  
  // Available metrics options
  const metricOptions = [
    { id: 'fuelConsumption', name: 'Zużycie paliwa', unit: 'l/100km', color: '#4CAF50' },
    { id: 'operationalCosts', name: 'Koszty operacyjne', unit: 'PLN', color: '#2196F3' },
    { id: 'co2Emission', name: 'Emisja CO2', unit: 'kg', color: '#FF5722' },
    { id: 'safetyIndex', name: 'Indeks bezpieczeństwa', unit: '%', color: '#9C27B0' },
    { id: 'maintenanceCosts', name: 'Koszty konserwacji', unit: 'PLN', color: '#FFC107' },
    { id: 'vehicleUtilization', name: 'Wykorzystanie pojazdów', unit: '%', color: '#607D8B' },
    { id: 'driverPerformance', name: 'Wydajność kierowców', unit: '%', color: '#00BCD4' }
  ];
  
  // Available chart types
  const chartTypeOptions = [
    { id: 'line', name: 'Liniowy' },
    { id: 'bar', name: 'Słupkowy' },
    { id: 'area', name: 'Obszarowy' }
  ];
  
  /**
   * Fetch trend data from the statistics service
   * This effect runs when the component mounts and when the timeRange or selectedMetrics change
   */
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch trend data for selected metrics
        const trendResponse = await mockStatisticsService.getTrendData(timeRange, selectedMetrics);
        setTrendData(trendResponse);
        setError(null);
      } catch (err) {
        console.error('Error fetching trend data:', err);
        setError('Nie udało się pobrać danych trendów. Spróbuj ponownie później.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [timeRange, selectedMetrics]);
  
  /**
   * Handle time range change
   * @param {string} range - New time range
   */
  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
  };
  
  /**
   * Handle metric selection change
   * @param {Event} event - Change event
   */
  const handleMetricChange = (event) => {
    const metricId = event.target.value;
    
    if (isMultiMetric) {
      // In multi-metric mode, toggle the selected metric
      if (selectedMetrics.includes(metricId)) {
        // Remove metric if already selected
        if (selectedMetrics.length > 1) { // Ensure at least one metric is selected
          setSelectedMetrics(selectedMetrics.filter(id => id !== metricId));
        }
      } else {
        // Add metric if not already selected
        setSelectedMetrics([...selectedMetrics, metricId]);
      }
    } else {
      // In single-metric mode, just set the selected metric
      setSelectedMetrics([metricId]);
    }
  };
  
  /**
   * Handle multi-metric toggle change
   */
  const handleMultiMetricToggle = () => {
    setIsMultiMetric(!isMultiMetric);
    
    // If turning off multi-metric mode, keep only the first selected metric
    if (isMultiMetric && selectedMetrics.length > 1) {
      setSelectedMetrics([selectedMetrics[0]]);
    }
  };
  
  /**
   * Handle chart type change
   * @param {string} type - New chart type
   */
  const handleChartTypeChange = (type) => {
    setChartType(type);
  };
  
  /**
   * Handle data labels toggle
   */
  const handleDataLabelsToggle = () => {
    setShowDataLabels(!showDataLabels);
  };
  
  /**
   * Handle tab change
   * @param {string} tab - New active tab
   */
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  /**
   * Handle export button click
   * @param {string} format - Export format
   */
  const handleExport = (format) => {
    console.log(`Exporting trend data in ${format} format`);
    // In a real implementation, this would call the export method from the service
    alert(`Eksport danych trendów w formacie ${format} zostanie zaimplementowany w przyszłości.`);
  };
  
  /**
   * Generate insights based on trend data
   * @returns {Array} Array of insight strings
   */
  const generateInsights = () => {
    if (!trendData || Object.keys(trendData).length === 0) {
      return [];
    }
    
    const insights = [];
    
    // Generate insights for each selected metric
    selectedMetrics.forEach(metricId => {
      const metricData = trendData[metricId];
      if (!metricData || metricData.length < 2) return;
      
      const metricInfo = metricOptions.find(option => option.id === metricId);
      if (!metricInfo) return;
      
      // Calculate average
      const sum = metricData.reduce((acc, item) => acc + item.value, 0);
      const average = sum / metricData.length;
      
      // Calculate trend (simple linear regression)
      const firstValue = metricData[0].value;
      const lastValue = metricData[metricData.length - 1].value;
      const trend = ((lastValue - firstValue) / firstValue) * 100;
      
      // Find min and max
      const min = Math.min(...metricData.map(item => item.value));
      const max = Math.max(...metricData.map(item => item.value));
      
      // Add insights based on the metric
      insights.push(`Średnia wartość ${metricInfo.name.toLowerCase()} wynosi ${average.toFixed(2)} ${metricInfo.unit}.`);
      
      if (trend > 0) {
        insights.push(`Zaobserwowano wzrost ${metricInfo.name.toLowerCase()} o ${Math.abs(trend).toFixed(2)}% w analizowanym okresie.`);
      } else if (trend < 0) {
        insights.push(`Zaobserwowano spadek ${metricInfo.name.toLowerCase()} o ${Math.abs(trend).toFixed(2)}% w analizowanym okresie.`);
      } else {
        insights.push(`Nie zaobserwowano znaczącej zmiany ${metricInfo.name.toLowerCase()} w analizowanym okresie.`);
      }
      
      insights.push(`Najniższa wartość: ${min.toFixed(2)} ${metricInfo.unit}, najwyższa wartość: ${max.toFixed(2)} ${metricInfo.unit}.`);
      
      // Add metric-specific insights
      switch (metricId) {
        case 'fuelConsumption':
          if (trend < 0) {
            insights.push('Spadek zużycia paliwa może wskazywać na poprawę efektywności floty lub zmianę stylu jazdy kierowców.');
          } else if (trend > 5) {
            insights.push('Znaczący wzrost zużycia paliwa może wskazywać na problemy techniczne pojazdów lub zmianę warunków eksploatacji.');
          }
          break;
        case 'operationalCosts':
          if (trend > 10) {
            insights.push('Znaczący wzrost kosztów operacyjnych wymaga szczegółowej analizy poszczególnych kategorii kosztów.');
          } else if (trend < -5) {
            insights.push('Spadek kosztów operacyjnych może wskazywać na skuteczność wdrożonych optymalizacji.');
          }
          break;
        case 'safetyIndex':
          if (trend > 0) {
            insights.push('Poprawa indeksu bezpieczeństwa świadczy o skuteczności działań prewencyjnych i szkoleń kierowców.');
          } else if (trend < 0) {
            insights.push('Spadek indeksu bezpieczeństwa wymaga natychmiastowej analizy przyczyn i wdrożenia działań naprawczych.');
          }
          break;
        default:
          // No specific insights for other metrics
      }
    });
    
    return insights;
  };
  
  return {
    trendData,
    isLoading,
    error,
    timeRange,
    selectedMetrics,
    activeTab,
    isMultiMetric,
    chartType,
    showDataLabels,
    metricOptions,
    chartTypeOptions,
    handleTimeRangeChange,
    handleMetricChange,
    handleMultiMetricToggle,
    handleChartTypeChange,
    handleDataLabelsToggle,
    handleTabChange,
    handleExport,
    generateInsights
  };
};
