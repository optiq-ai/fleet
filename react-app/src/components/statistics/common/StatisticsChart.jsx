import React from 'react';
import './StatisticsChart.css';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  ArcElement,
  Title, 
  Tooltip, 
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';

// Rejestracja komponentów Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

/**
 * StatisticsChart component displays various chart types using Chart.js
 * 
 * @param {Object} props - Component props
 * @param {Array|Object} props.data - Chart data
 * @param {string} props.type - Chart type (line, bar, pie, multiLine)
 * @param {string} props.xAxis - X-axis data key
 * @param {string} props.yAxis - Y-axis data key
 * @param {Array} props.series - Series names for multiLine charts
 * @param {string} props.color - Chart color for single series
 * @param {Object} props.colors - Chart colors for multiple series
 * @param {string} props.title - Chart title
 * @returns {JSX.Element} StatisticsChart component
 */
const StatisticsChart = ({ 
  data, 
  type = 'line', 
  xAxis = 'date', 
  yAxis = 'value',
  series = [],
  color = '#2196F3',
  colors = {},
  title = ''
}) => {
  // Sprawdzenie czy dane są dostępne
  if (!data || (Array.isArray(data) && data.length === 0) || 
      (type === 'multiLine' && Object.keys(data).length === 0)) {
    return (
      <div className="statistics-chart-empty">
        <p>Brak danych do wyświetlenia</p>
      </div>
    );
  }

  // Przygotowanie danych dla wykresu liniowego
  const prepareLineData = () => {
    const labels = data.map(item => item[xAxis]);
    
    return {
      labels,
      datasets: [
        {
          label: title,
          data: data.map(item => item[yAxis]),
          borderColor: color,
          backgroundColor: `${color}33`, // Dodanie przezroczystości
          fill: true,
          tension: 0.4,
          pointRadius: 3,
          pointHoverRadius: 5
        }
      ]
    };
  };

  // Przygotowanie danych dla wykresu słupkowego
  const prepareBarData = () => {
    const labels = data.map(item => item[xAxis]);
    
    return {
      labels,
      datasets: [
        {
          label: title,
          data: data.map(item => item[yAxis]),
          backgroundColor: color,
          borderColor: color,
          borderWidth: 1
        }
      ]
    };
  };

  // Przygotowanie danych dla wykresu kołowego
  const preparePieData = () => {
    return {
      labels: data.map(item => item[xAxis]),
      datasets: [
        {
          data: data.map(item => item[yAxis]),
          backgroundColor: data.map((_, index) => {
            const hue = (index * 137) % 360; // Złoty kąt dla lepszego rozkładu kolorów
            return `hsl(${hue}, 70%, 60%)`;
          }),
          borderColor: '#fff',
          borderWidth: 1
        }
      ]
    };
  };

  // Przygotowanie danych dla wykresu z wieloma liniami
  const prepareMultiLineData = () => {
    // Zakładamy, że wszystkie serie mają te same etykiety osi X
    const firstSeries = series[0];
    const labels = data[firstSeries]?.map(item => item[xAxis]) || [];
    
    return {
      labels,
      datasets: series.map(seriesName => ({
        label: seriesName,
        data: data[seriesName]?.map(item => item[yAxis]) || [],
        borderColor: colors[seriesName] || getRandomColor(seriesName),
        backgroundColor: `${colors[seriesName] || getRandomColor(seriesName)}33`,
        fill: false,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 5
      }))
    };
  };

  // Generowanie losowego koloru na podstawie nazwy serii
  const getRandomColor = (seed) => {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 60%)`;
  };

  // Opcje wykresu
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            family: "'Roboto', 'Helvetica', 'Arial', sans-serif",
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          family: "'Roboto', 'Helvetica', 'Arial', sans-serif",
          size: 14
        },
        bodyFont: {
          family: "'Roboto', 'Helvetica', 'Arial', sans-serif",
          size: 13
        },
        padding: 10,
        cornerRadius: 4
      }
    },
    scales: type !== 'pie' ? {
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            family: "'Roboto', 'Helvetica', 'Arial', sans-serif",
            size: 11
          }
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          font: {
            family: "'Roboto', 'Helvetica', 'Arial', sans-serif",
            size: 11
          }
        }
      }
    } : undefined
  };

  // Renderowanie odpowiedniego typu wykresu
  const renderChart = () => {
    switch (type) {
      case 'line':
        return <Line data={prepareLineData()} options={options} />;
      case 'bar':
        return <Bar data={prepareBarData()} options={options} />;
      case 'pie':
        return <Pie data={preparePieData()} options={options} />;
      case 'multiLine':
        return <Line data={prepareMultiLineData()} options={options} />;
      default:
        return <Line data={prepareLineData()} options={options} />;
    }
  };

  return (
    <div className={`statistics-chart chart-type-${type}`}>
      <div className="chart-container">
        {renderChart()}
      </div>
    </div>
  );
};

export default StatisticsChart;
