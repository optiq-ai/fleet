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
      labels: {
        font: {
          family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          size: 12,
          weight: 'normal'
        },
        padding: 10
      }
    },
    tooltip: {
      enabled: true,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleFont: {
        family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        size: 14,
        weight: 'bold'
      },
      bodyFont: {
        family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        size: 13,
        weight: 'normal'
      },
      padding: 10,
      cornerRadius: 4,
      displayColors: true,
      caretSize: 6,
      caretPadding: 8,
      titleMarginBottom: 8
    }
  },
};

/**
 * Component for displaying trailer utilization chart
 * @param {Object} props Component props
 * @returns {JSX.Element} TrailerUtilizationChart component
 */
export const TrailerUtilizationChart = ({ data }) => {
  // Default data if none provided
  const defaultData = {
    labels: ['In Use', 'Idle', 'Maintenance'],
    datasets: [
      {
        label: 'Trailer Utilization',
        data: [70, 20, 10],
        backgroundColor: [
          'rgba(75, 192, 192, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(255, 99, 132, 0.7)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
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
        text: 'Trailer Utilization (%)',
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
 * Component for displaying trailer types distribution
 * @param {Object} props Component props
 * @returns {JSX.Element} TrailerTypesChart component
 */
export const TrailerTypesChart = ({ data }) => {
  // Default data if none provided
  const defaultData = {
    labels: ['Curtain Sider', 'Refrigerated', 'Flatbed', 'Tanker', 'Container Chassis', 'Other'],
    datasets: [
      {
        label: 'Number of Trailers',
        data: [35, 20, 15, 8, 12, 5],
        backgroundColor: [
          'rgba(75, 192, 192, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(255, 159, 64, 0.7)',
          'rgba(255, 99, 132, 0.7)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
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
        text: 'Trailer Types Distribution',
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
 * Component for displaying trailer damage heatmap
 * Note: This is a simplified version as Chart.js doesn't natively support heatmaps
 * @param {Object} props Component props
 * @returns {JSX.Element} TrailerDamageHeatmapChart component
 */
export const TrailerDamageHeatmapChart = ({ data }) => {
  // For a real heatmap, you would use a specialized library
  // This is a simplified representation using a bar chart
  const defaultData = {
    labels: ['Side Panels', 'Roof', 'Floor', 'Doors', 'Tires', 'Lights', 'Chassis'],
    datasets: [
      {
        label: 'Number of Damage Reports',
        data: [15, 8, 12, 10, 25, 18, 5],
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
        text: 'Trailer Damage Frequency by Location',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Reports'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Damage Location'
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
 * Component for displaying trailer availability trend
 * @param {Object} props Component props
 * @returns {JSX.Element} TrailerAvailabilityTrendChart component
 */
export const TrailerAvailabilityTrendChart = ({ data }) => {
  // Default data if none provided
  const defaultData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Trailer Availability (%)',
        data: [90, 92, 88, 85, 89, 91, 93, 90, 88, 92, 94, 95],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        fill: true,
      },
      {
        label: 'Target (%)',
        data: [90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90],
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
        text: 'Trailer Availability Trend',
      },
    },
    scales: {
      y: {
        min: 75,
        max: 100,
        title: {
          display: true,
          text: 'Availability (%)'
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
 * Component for displaying trailer load capacity utilization
 * @param {Object} props Component props
 * @returns {JSX.Element} LoadCapacityUtilizationChart component
 */
export const LoadCapacityUtilizationChart = ({ data }) => {
  // Default data if none provided
  const defaultData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Average Load Capacity Utilization (%)',
        data: [75, 78, 80, 82, 79, 85, 83, 81, 78, 80, 84, 86],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        fill: true,
      },
      {
        label: 'Target (%)',
        data: [80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80],
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
        text: 'Average Load Capacity Utilization Trend',
      },
    },
    scales: {
      y: {
        min: 60,
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
 * Component for displaying trailer rotation rate
 * @param {Object} props Component props
 * @returns {JSX.Element} TrailerRotationRateChart component
 */
export const TrailerRotationRateChart = ({ data }) => {
  // Default data if none provided
  const defaultData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Average Rotation Rate (days)',
        data: [5.2, 5.5, 5.0, 4.8, 5.1, 4.5, 4.7, 5.0, 5.3, 5.1, 4.9, 4.6],
        borderColor: 'rgb(153, 102, 255)',
        backgroundColor: 'rgba(153, 102, 255, 0.5)',
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
        text: 'Average Trailer Rotation Rate',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Days'
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
 * Component for displaying trailer downtime analysis
 * @param {Object} props Component props
 * @returns {JSX.Element} TrailerDowntimeChart component
 */
export const TrailerDowntimeChart = ({ data }) => {
  // Default data if none provided
  const defaultData = {
    labels: ['Maintenance', 'Waiting for Load', 'Waiting for Truck', 'Damaged', 'Other'],
    datasets: [
      {
        label: 'Downtime Hours (Last Month)',
        data: [120, 80, 60, 45, 30],
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 159, 64, 0.7)',
          'rgba(153, 102, 255, 0.7)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 159, 64, 1)',
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
        text: 'Trailer Downtime Analysis',
      },
    },
  };

  return (
    <div style={{ height: '300px', width: '100%' }}>
      <Pie options={options} data={chartData} />
    </div>
  );
};

