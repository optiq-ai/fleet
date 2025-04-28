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
 * Component for displaying toll expenses by country
 * @param {Object} props Component props
 * @returns {JSX.Element} TollExpensesByCountryChart component
 */
export const TollExpensesByCountryChart = ({ data }) => {
  // Default data if none provided
  const defaultData = {
    labels: ['Germany', 'France', 'Poland', 'Italy', 'Austria', 'Switzerland', 'Czech Republic', 'Other'],
    datasets: [
      {
        label: 'Toll Expenses (€)',
        data: [25000, 18000, 12000, 15000, 8000, 10000, 6000, 5000],
        backgroundColor: [
          'rgba(75, 192, 192, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 99, 132, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(255, 159, 64, 0.7)',
          'rgba(201, 203, 207, 0.7)',
          'rgba(100, 100, 100, 0.7)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(201, 203, 207, 1)',
          'rgba(100, 100, 100, 1)',
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
        text: 'Toll Expenses by Country',
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
 * Component for displaying toll expenses trend
 * @param {Object} props Component props
 * @returns {JSX.Element} TollExpensesTrendChart component
 */
export const TollExpensesTrendChart = ({ data }) => {
  // Default data if none provided
  const defaultData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Toll Expenses (€)',
        data: [8500, 7800, 9200, 8900, 9500, 10200, 11000, 10500, 9800, 9200, 8700, 8300],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        fill: true,
      },
      {
        label: 'Budget (€)',
        data: [9000, 9000, 9000, 9000, 9000, 9000, 10000, 10000, 10000, 9000, 9000, 9000],
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
        text: 'Toll Expenses Trend',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Expenses (€)'
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
 * Component for displaying toll expenses by vehicle type
 * @param {Object} props Component props
 * @returns {JSX.Element} TollExpensesByVehicleTypeChart component
 */
export const TollExpensesByVehicleTypeChart = ({ data }) => {
  // Default data if none provided
  const defaultData = {
    labels: ['Heavy Trucks (>12t)', 'Medium Trucks (7.5-12t)', 'Light Trucks (<7.5t)', 'Special Vehicles'],
    datasets: [
      {
        label: 'Toll Expenses (€)',
        data: [75000, 25000, 8000, 12000],
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
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
        text: 'Toll Expenses by Vehicle Type',
      },
    },
  };

  return (
    <div style={{ height: '300px', width: '100%' }}>
      <Doughnut options={options} data={chartData} />
    </div>
  );
};

/**
 * Component for displaying toll expenses by emission class
 * @param {Object} props Component props
 * @returns {JSX.Element} TollExpensesByEmissionClassChart component
 */
export const TollExpensesByEmissionClassChart = ({ data }) => {
  // Default data if none provided
  const defaultData = {
    labels: ['Euro 6', 'Euro 5', 'Euro 4', 'Euro 3 or lower'],
    datasets: [
      {
        label: 'Toll Expenses (€)',
        data: [45000, 35000, 25000, 15000],
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
      },
      {
        label: 'Number of Vehicles',
        data: [35, 20, 10, 5],
        backgroundColor: 'rgba(255, 99, 132, 0.7)',
        yAxisID: 'y1',
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
        text: 'Toll Expenses by Emission Class',
      },
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        beginAtZero: true,
        title: {
          display: true,
          text: 'Expenses (€)'
        }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Vehicles'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Emission Class'
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

/**
 * Component for displaying toll cost per kilometer
 * @param {Object} props Component props
 * @returns {JSX.Element} TollCostPerKilometerChart component
 */
export const TollCostPerKilometerChart = ({ data }) => {
  // Default data if none provided
  const defaultData = {
    labels: ['Germany', 'France', 'Poland', 'Italy', 'Austria', 'Switzerland', 'Czech Republic', 'Average'],
    datasets: [
      {
        label: 'Toll Cost per Kilometer (€/km)',
        data: [0.18, 0.22, 0.10, 0.25, 0.35, 0.60, 0.12, 0.22],
        backgroundColor: (context) => {
          const value = context.dataset.data[context.dataIndex];
          const avg = context.dataset.data[context.dataset.data.length - 1];
          return value > avg ? 'rgba(255, 99, 132, 0.7)' : 'rgba(75, 192, 192, 0.7)';
        },
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
        text: 'Toll Cost per Kilometer by Country',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Cost (€/km)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Country'
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
