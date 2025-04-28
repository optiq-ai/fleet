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
 * Component for displaying route heatmap
 * Note: This is a simplified version as Chart.js doesn't natively support heatmaps
 * @param {Object} props Component props
 * @returns {JSX.Element} RouteHeatmapChart component
 */
export const RouteHeatmapChart = ({ data }) => {
  // For a real heatmap, you would use a specialized library
  // This is a simplified representation using a bar chart
  const defaultData = {
    labels: ['Route A1', 'Route E30', 'Route S7', 'Route A4', 'Route S8', 'Route A2'],
    datasets: [
      {
        label: 'Traffic Volume (Vehicles/Hour)',
        data: [1200, 1500, 900, 1800, 1100, 1600],
        backgroundColor: 'rgba(255, 99, 132, 0.7)',
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
        text: 'Most Frequently Used Routes (Traffic Volume)',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Vehicles/Hour'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Route'
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
 * Component for displaying route length distribution
 * @param {Object} props Component props
 * @returns {JSX.Element} RouteLengthDistributionChart component
 */
export const RouteLengthDistributionChart = ({ data }) => {
  // Default data if none provided
  const defaultData = {
    labels: ['< 100 km', '100-300 km', '300-500 km', '500-1000 km', '> 1000 km'],
    datasets: [
      {
        label: 'Number of Routes',
        data: [15, 45, 60, 30, 10],
        backgroundColor: [
          'rgba(75, 192, 192, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(255, 159, 64, 0.7)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
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
        text: 'Route Length Distribution',
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
 * Component for displaying route travel time comparison
 * @param {Object} props Component props
 * @returns {JSX.Element} RouteTravelTimeChart component
 */
export const RouteTravelTimeChart = ({ data }) => {
  // Default data if none provided
  const defaultData = {
    labels: ['Route A1', 'Route E30', 'Route S7', 'Route A4', 'Route S8', 'Route A2'],
    datasets: [
      {
        label: 'Planned Time (h)',
        data: [8.0, 12.5, 6.5, 15.0, 7.0, 13.0],
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
      },
      {
        label: 'Actual Time (h)',
        data: [8.5, 13.2, 6.8, 15.8, 7.5, 13.6],
        backgroundColor: 'rgba(255, 99, 132, 0.7)',
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
        text: 'Planned vs Actual Route Travel Time',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Time (hours)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Route'
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
 * Component for displaying route cost analysis
 * @param {Object} props Component props
 * @returns {JSX.Element} RouteCostAnalysisChart component
 */
export const RouteCostAnalysisChart = ({ data }) => {
  // Default data if none provided
  const defaultData = {
    labels: ['Route A1', 'Route E30', 'Route S7', 'Route A4', 'Route S8', 'Route A2'],
    datasets: [
      {
        label: 'Fuel Cost (€)',
        data: [450, 680, 320, 800, 350, 710],
        backgroundColor: 'rgba(255, 99, 132, 0.7)',
      },
      {
        label: 'Toll Cost (€)',
        data: [120, 250, 80, 300, 90, 280],
        backgroundColor: 'rgba(255, 159, 64, 0.7)',
      },
      {
        label: 'Driver Cost (€)',
        data: [200, 310, 160, 380, 170, 330],
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
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
        text: 'Route Cost Breakdown',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        stacked: true,
        title: {
          display: true,
          text: 'Cost (€)'
        }
      },
      x: {
        stacked: true,
        title: {
          display: true,
          text: 'Route'
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
 * Component for displaying route delay analysis
 * @param {Object} props Component props
 * @returns {JSX.Element} RouteDelayAnalysisChart component
 */
export const RouteDelayAnalysisChart = ({ data }) => {
  // Default data if none provided
  const defaultData = {
    labels: ['Traffic', 'Weather', 'Loading/Unloading', 'Breakdown', 'Driver Related', 'Other'],
    datasets: [
      {
        label: 'Number of Delays (Last Month)',
        data: [45, 15, 30, 8, 12, 5],
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(255, 159, 64, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(75, 192, 192, 0.7)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(75, 192, 192, 1)',
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
        text: 'Route Delay Causes Analysis',
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
 * Component for displaying route efficiency trend
 * @param {Object} props Component props
 * @returns {JSX.Element} RouteEfficiencyTrendChart component
 */
export const RouteEfficiencyTrendChart = ({ data }) => {
  // Default data if none provided
  const defaultData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Route Efficiency Score (0-100)',
        data: [85, 88, 86, 84, 87, 90, 89, 87, 85, 88, 91, 92],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        fill: true,
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
        text: 'Route Efficiency Trend',
      },
    },
    scales: {
      y: {
        min: 70,
        max: 100,
        title: {
          display: true,
          text: 'Efficiency Score'
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

