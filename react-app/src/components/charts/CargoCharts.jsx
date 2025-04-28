import React from 'react';
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
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';

// Register ChartJS components
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

// Common options for all charts
const commonOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
  },
};

/**
 * Component for displaying cargo types distribution
 * @param {Object} props Component props
 * @returns {JSX.Element} CargoTypesChart component
 */
export const CargoTypesChart = ({ data }) => {
  // Default data if none provided
  const defaultData = {
    labels: ['General Goods', 'Refrigerated', 'Hazardous', 'Bulk Liquid', 'Construction', 'Other'],
    datasets: [
      {
        label: 'Number of Shipments (Last Month)',
        data: [120, 80, 30, 45, 60, 25],
        backgroundColor: [
          'rgba(75, 192, 192, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 99, 132, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(255, 159, 64, 0.7)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartData = data || defaultData;

  const options = {
    ...commonOptions,
    plugins: {
      ...commonOptions.plugins,
      title: {
        display: true,
        text: 'Cargo Types Distribution',
      },
    },
  };

  return (
    <div style={{ height: '300px', width: '100%' }}>
      <Pie options={options} data={chartData} />
    </div>
  );
};

/**
 * Component for displaying load capacity utilization trend
 * @param {Object} props Component props
 * @returns {JSX.Element} CargoLoadUtilizationChart component
 */
export const CargoLoadUtilizationChart = ({ data }) => {
  // Default data if none provided
  const defaultData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Average Load Capacity Utilization (%)',
        data: [78, 80, 82, 81, 83, 85, 84, 82, 80, 83, 86, 87],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        fill: true,
      },
      {
        label: 'Target (%)',
        data: [85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0)',
        borderDash: [5, 5],
      }
    ],
  };

  const chartData = data || defaultData;

  const options = {
    ...commonOptions,
    plugins: {
      ...commonOptions.plugins,
      title: {
        display: true,
        text: 'Load Capacity Utilization Trend',
      },
    },
    scales: {
      y: {
        min: 70,
        max: 100,
        title: {
          display: true,
          text: 'Utilization (%)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Month'
        }
      }
    }
  };

  return (
    <div style={{ height: '300px', width: '100%' }}>
      <Line options={options} data={chartData} />
    </div>
  );
};

/**
 * Component for displaying cargo damage analysis
 * @param {Object} props Component props
 * @returns {JSX.Element} CargoDamageChart component
 */
export const CargoDamageChart = ({ data }) => {
  // Default data if none provided
  const defaultData = {
    labels: ['Handling', 'Transit', 'Temperature', 'Packaging', 'Other'],
    datasets: [
      {
        label: 'Number of Damage Incidents (Last Month)',
        data: [12, 8, 5, 10, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartData = data || defaultData;

  const options = {
    ...commonOptions,
    plugins: {
      ...commonOptions.plugins,
      title: {
        display: true,
        text: 'Cargo Damage Causes Analysis',
      },
    },
  };

  return (
    <div style={{ height: '300px', width: '100%' }}>
      <Pie options={options} data={chartData} />
    </div>
  );
};

/**
 * Component for displaying loading/unloading time analysis
 * @param {Object} props Component props
 * @returns {JSX.Element} LoadingTimeChart component
 */
export const LoadingTimeChart = ({ data }) => {
  // Default data if none provided
  const defaultData = {
    labels: ['Warehouse A', 'Warehouse B', 'Port C', 'Factory D', 'Distribution Center E'],
    datasets: [
      {
        label: 'Average Loading Time (min)',
        data: [45, 60, 90, 55, 70],
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
      },
      {
        label: 'Average Unloading Time (min)',
        data: [40, 55, 80, 50, 65],
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
      }
    ],
  };

  const chartData = data || defaultData;

  const options = {
    ...commonOptions,
    plugins: {
      ...commonOptions.plugins,
      title: {
        display: true,
        text: 'Average Loading/Unloading Time by Location',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Time (minutes)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Location'
        }
      }
    }
  };

  return (
    <div style={{ height: '300px', width: '100%' }}>
      <Bar options={options} data={chartData} />
    </div>
  );
};

