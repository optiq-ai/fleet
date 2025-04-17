import React from 'react';
import './StatisticsChart.css';

/**
 * StatisticsChart component displays various chart types
 * This is a placeholder component that would be replaced with an actual chart implementation
 * using a library like Chart.js, Recharts, or D3.js in a real implementation
 * 
 * @param {Object} props - Component props
 * @param {Array|Object} props.data - Chart data
 * @param {string} props.type - Chart type (line, bar, pie, multiLine)
 * @param {string} props.xAxis - X-axis data key
 * @param {string} props.yAxis - Y-axis data key
 * @param {Array} props.series - Series names for multiLine charts
 * @param {string} props.color - Chart color for single series
 * @param {Object} props.colors - Chart colors for multiple series
 * @returns {JSX.Element} StatisticsChart component
 */
const StatisticsChart = ({ 
  data, 
  type = 'line', 
  xAxis = 'date', 
  yAxis = 'value',
  series = [],
  color = '#2196F3',
  colors = {}
}) => {
  /**
   * Get data count for display
   * @returns {number} Number of data points
   */
  const getDataCount = () => {
    if (!data) return 0;
    
    if (Array.isArray(data)) {
      return data.length;
    } else if (type === 'multiLine' && typeof data === 'object') {
      return Object.keys(data).reduce((sum, key) => sum + (Array.isArray(data[key]) ? data[key].length : 0), 0);
    }
    
    return 0;
  };
  
  return (
    <div className={`statistics-chart chart-type-${type}`}>
      <div className="chart-placeholder">
        <div className="chart-info">
          <div className="chart-type">Wykres typu: {type}</div>
          <div className="chart-data">
            {type === 'multiLine' ? (
              <div>
                <div>Dane dla wielu serii:</div>
                <ul>
                  {series.map(seriesName => (
                    <li key={seriesName} style={{ color: colors[seriesName] || '#333' }}>
                      {seriesName}: {data[seriesName]?.length || 0} punktów danych
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div>
                Dane: {getDataCount()} punktów danych
              </div>
            )}
          </div>
          <div className="chart-axes">
            Osie: {xAxis} (X) / {yAxis} (Y)
          </div>
        </div>
        <div className="chart-message">
          W rzeczywistej implementacji tutaj byłby wyświetlany interaktywny wykres
          wykorzystujący bibliotekę Chart.js, Recharts lub D3.js.
        </div>
      </div>
    </div>
  );
};

export default StatisticsChart;
