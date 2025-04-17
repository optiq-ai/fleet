import { useState, useEffect } from 'react';
import { mockStatisticsService } from '../../../services/api/mockStatisticsService';

/**
 * Custom hook containing business logic for ComparativeAnalysis component
 * 
 * @returns {Object} State and handlers for ComparativeAnalysis component
 */
export const useComparativeAnalysisLogic = () => {
  // State for comparison data
  const [comparisonData, setComparisonData] = useState([]);
  // State for loading status
  const [isLoading, setIsLoading] = useState(true);
  // State for error message
  const [error, setError] = useState(null);
  // State for selected time range
  const [timeRange, setTimeRange] = useState('month');
  // State for selected comparison type
  const [comparisonType, setComparisonType] = useState('vehicle');
  // State for selected metric
  const [selectedMetric, setSelectedMetric] = useState('fuelConsumption');
  // State for active tab
  const [activeTab, setActiveTab] = useState('chart');
  // State for chart type
  const [chartType, setChartType] = useState('bar');
  // State for sort order
  const [sortOrder, setSortOrder] = useState('best');
  // State for limit
  const [limit, setLimit] = useState(10);
  
  // Available comparison type options
  const comparisonTypeOptions = [
    { id: 'vehicle', name: 'Pojazdy' },
    { id: 'driver', name: 'Kierowcy' },
    { id: 'route', name: 'Trasy' }
  ];
  
  // Available metric options
  const metricOptions = [
    { id: 'fuelConsumption', name: 'Zużycie paliwa', unit: 'l/100km', color: '#4CAF50', lowerIsBetter: true },
    { id: 'operationalCosts', name: 'Koszty operacyjne', unit: 'PLN', color: '#2196F3', lowerIsBetter: true },
    { id: 'co2Emission', name: 'Emisja CO2', unit: 'kg', color: '#FF5722', lowerIsBetter: true },
    { id: 'efficiency', name: 'Efektywność', unit: '%', color: '#9C27B0', lowerIsBetter: false },
    { id: 'utilization', name: 'Wykorzystanie', unit: '%', color: '#FFC107', lowerIsBetter: false },
    { id: 'maintenanceCosts', name: 'Koszty konserwacji', unit: 'PLN', color: '#607D8B', lowerIsBetter: true }
  ];
  
  // Available chart type options
  const chartTypeOptions = [
    { id: 'bar', name: 'Słupkowy' },
    { id: 'horizontalBar', name: 'Słupkowy poziomy' },
    { id: 'pie', name: 'Kołowy' },
    { id: 'radar', name: 'Radarowy' }
  ];
  
  // Available sort order options
  const sortOrderOptions = [
    { id: 'best', name: 'Najlepsze' },
    { id: 'worst', name: 'Najgorsze' },
    { id: 'alphabetical', name: 'Alfabetycznie' }
  ];
  
  /**
   * Fetch comparison data from the statistics service
   * This effect runs when the component mounts and when the timeRange, comparisonType, or selectedMetric change
   */
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch comparison data
        const comparisonResponse = await mockStatisticsService.getComparisonData(
          comparisonType,
          selectedMetric,
          timeRange
        );
        setComparisonData(comparisonResponse);
        setError(null);
      } catch (err) {
        console.error('Error fetching comparison data:', err);
        setError('Nie udało się pobrać danych porównawczych. Spróbuj ponownie później.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [timeRange, comparisonType, selectedMetric]);
  
  /**
   * Handle time range change
   * @param {string} range - New time range
   */
  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
  };
  
  /**
   * Handle comparison type change
   * @param {Event} event - Change event
   */
  const handleComparisonTypeChange = (event) => {
    setComparisonType(event.target.value);
  };
  
  /**
   * Handle metric change
   * @param {Event} event - Change event
   */
  const handleMetricChange = (event) => {
    setSelectedMetric(event.target.value);
  };
  
  /**
   * Handle chart type change
   * @param {string} type - New chart type
   */
  const handleChartTypeChange = (type) => {
    setChartType(type);
  };
  
  /**
   * Handle sort order change
   * @param {string} order - New sort order
   */
  const handleSortOrderChange = (order) => {
    setSortOrder(order);
  };
  
  /**
   * Handle limit change
   * @param {number} newLimit - New limit
   */
  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
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
    console.log(`Exporting comparison data in ${format} format`);
    // In a real implementation, this would call the export method from the service
    alert(`Eksport danych porównawczych w formacie ${format} zostanie zaimplementowany w przyszłości.`);
  };
  
  /**
   * Generate summary for comparison data
   * @returns {Object} Summary object
   */
  const generateSummary = () => {
    if (!comparisonData || comparisonData.length === 0) {
      return {
        text: 'Brak danych do analizy.',
        best: null,
        worst: null,
        average: null,
        median: null
      };
    }
    
    // Get metric info
    const metricInfo = metricOptions.find(option => option.id === selectedMetric);
    if (!metricInfo) {
      return {
        text: 'Brak informacji o wybranej metryce.',
        best: null,
        worst: null,
        average: null,
        median: null
      };
    }
    
    // Calculate average
    const sum = comparisonData.reduce((acc, item) => acc + item.value, 0);
    const average = sum / comparisonData.length;
    
    // Calculate median
    const sortedValues = [...comparisonData].sort((a, b) => a.value - b.value);
    const middle = Math.floor(sortedValues.length / 2);
    const median = sortedValues.length % 2 === 0
      ? (sortedValues[middle - 1].value + sortedValues[middle].value) / 2
      : sortedValues[middle].value;
    
    // Get best and worst performers
    const best = metricInfo.lowerIsBetter ? sortedValues[0] : sortedValues[sortedValues.length - 1];
    const worst = metricInfo.lowerIsBetter ? sortedValues[sortedValues.length - 1] : sortedValues[0];
    
    // Generate summary text
    let text = `Analiza porównawcza dla ${metricInfo.name.toLowerCase()} według ${
      comparisonTypeOptions.find(option => option.id === comparisonType)?.name.toLowerCase() || comparisonType
    }.`;
    
    text += ` Średnia wartość wynosi ${average.toFixed(2)} ${metricInfo.unit}, a mediana ${median.toFixed(2)} ${metricInfo.unit}.`;
    
    if (best && worst) {
      text += ` Najlepszy wynik osiągnął ${best.name} (${best.value} ${metricInfo.unit}), a najgorszy ${worst.name} (${worst.value} ${metricInfo.unit}).`;
    }
    
    // Calculate standard deviation
    const squareDiffs = comparisonData.map(item => {
      const diff = item.value - average;
      return diff * diff;
    });
    const avgSquareDiff = squareDiffs.reduce((acc, val) => acc + val, 0) / squareDiffs.length;
    const stdDev = Math.sqrt(avgSquareDiff);
    
    text += ` Odchylenie standardowe wynosi ${stdDev.toFixed(2)} ${metricInfo.unit}.`;
    
    return {
      text,
      best,
      worst,
      average,
      median,
      stdDev
    };
  };
  
  /**
   * Prepare data for chart
   * @returns {Object} Chart data
   */
  const prepareChartData = () => {
    if (!comparisonData || comparisonData.length === 0) {
      return [];
    }
    
    // Get metric info
    const metricInfo = metricOptions.find(option => option.id === selectedMetric);
    
    // Sort data based on sort order
    let sortedData = [...comparisonData];
    
    if (sortOrder === 'best') {
      sortedData.sort((a, b) => {
        if (metricInfo && metricInfo.lowerIsBetter) {
          return a.value - b.value; // Lower is better, sort ascending
        } else {
          return b.value - a.value; // Higher is better, sort descending
        }
      });
    } else if (sortOrder === 'worst') {
      sortedData.sort((a, b) => {
        if (metricInfo && metricInfo.lowerIsBetter) {
          return b.value - a.value; // Lower is better, sort descending
        } else {
          return a.value - b.value; // Higher is better, sort ascending
        }
      });
    } else if (sortOrder === 'alphabetical') {
      sortedData.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    // Limit to specified number for better visualization
    return sortedData.slice(0, limit);
  };
  
  /**
   * Prepare data for table
   * @returns {Object} Table data and columns
   */
  const prepareTableData = () => {
    if (!comparisonData || comparisonData.length === 0) {
      return {
        data: [],
        columns: []
      };
    }
    
    // Get metric info
    const metricInfo = metricOptions.find(option => option.id === selectedMetric);
    
    // Define columns
    const columns = [
      { id: 'rank', name: 'Pozycja', sortable: true },
      { id: 'name', name: 'Nazwa', sortable: true },
      { id: 'value', name: `${metricInfo ? metricInfo.name : 'Wartość'} (${metricInfo ? metricInfo.unit : ''})`, sortable: true },
      { id: 'change', name: 'Zmiana', sortable: true },
      { 
        id: 'status', 
        name: 'Status', 
        sortable: true,
        render: (row) => (
          <div className="status-cell">
            <div className={`status-indicator status-${row.status}`}></div>
            {row.status === 'good' ? 'Dobry' : row.status === 'warning' ? 'Ostrzeżenie' : 'Krytyczny'}
          </div>
        )
      }
    ];
    
    return {
      data: comparisonData,
      columns
    };
  };
  
  /**
   * Get chart type for Chart.js
   * @returns {string} Chart.js chart type
   */
  const getChartJsType = () => {
    switch (chartType) {
      case 'horizontalBar':
        return 'bar'; // Will be configured as horizontal in options
      default:
        return chartType;
    }
  };
  
  /**
   * Get chart options for Chart.js
   * @returns {Object} Chart.js options
   */
  const getChartOptions = () => {
    const options = {
      indexAxis: chartType === 'horizontalBar' ? 'y' : 'x',
      responsive: true,
      maintainAspectRatio: false
    };
    
    return options;
  };
  
  return {
    comparisonData,
    isLoading,
    error,
    timeRange,
    comparisonType,
    selectedMetric,
    activeTab,
    chartType,
    sortOrder,
    limit,
    comparisonTypeOptions,
    metricOptions,
    chartTypeOptions,
    sortOrderOptions,
    handleTimeRangeChange,
    handleComparisonTypeChange,
    handleMetricChange,
    handleChartTypeChange,
    handleSortOrderChange,
    handleLimitChange,
    handleTabChange,
    handleExport,
    generateSummary,
    prepareChartData,
    prepareTableData,
    getChartJsType,
    getChartOptions
  };
};
