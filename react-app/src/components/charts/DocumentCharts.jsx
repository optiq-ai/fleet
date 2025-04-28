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
 * Component for displaying document status distribution
 * @param {Object} props Component props
 * @returns {JSX.Element} DocumentStatusChart component
 */
export const DocumentStatusChart = ({ data }) => {
  // Default data if none provided
  const defaultData = {
    labels: ['Valid', 'Expiring Soon', 'Expired', 'Missing'],
    datasets: [
      {
        label: 'Document Status',
        data: [250, 30, 15, 5], // Example counts
        backgroundColor: [
          'rgba(75, 192, 192, 0.7)', // Valid
          'rgba(255, 206, 86, 0.7)', // Expiring Soon
          'rgba(255, 99, 132, 0.7)',  // Expired
          'rgba(153, 102, 255, 0.7)', // Missing
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
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
        text: 'Document Status Distribution',
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
 * Component for displaying document type distribution
 * @param {Object} props Component props
 * @returns {JSX.Element} DocumentTypeChart component
 */
export const DocumentTypeChart = ({ data }) => {
  // Default data if none provided
  const defaultData = {
    labels: [
      'Vehicle Registration',
      'Insurance',
      'Driver License',
      'Tachograph Card',
      'Transport Permit',
      'ADR Certificate',
      'Other'
    ],
    datasets: [
      {
        label: 'Number of Documents',
        data: [50, 50, 48, 45, 40, 20, 10], // Example counts per type
        backgroundColor: [
          'rgba(75, 192, 192, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 99, 132, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(255, 159, 64, 0.7)',
          'rgba(201, 203, 207, 0.7)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(201, 203, 207, 1)',
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
        text: 'Document Type Distribution',
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
 * Component for displaying upcoming document expirations trend
 * @param {Object} props Component props
 * @returns {JSX.Element} UpcomingExpirationsChart component
 */
export const UpcomingExpirationsChart = ({ data }) => {
  // Default data if none provided
  const defaultData = {
    labels: ['Next 7 Days', 'Next 14 Days', 'Next 30 Days', 'Next 60 Days', 'Next 90 Days'],
    datasets: [
      {
        label: 'Number of Expiring Documents',
        data: [5, 12, 30, 55, 80], // Cumulative counts
        borderColor: 'rgb(255, 159, 64)',
        backgroundColor: 'rgba(255, 159, 64, 0.5)',
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
        text: 'Upcoming Document Expirations',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Documents'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Timeframe'
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
 * Component for displaying document compliance rate trend
 * @param {Object} props Component props
 * @returns {JSX.Element} DocumentComplianceChart component
 */
export const DocumentComplianceChart = ({ data }) => {
  // Default data if none provided
  const defaultData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Compliance Rate (%)',
        data: [95, 96, 94, 93, 95, 97, 96, 98, 97, 99, 98, 99],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        fill: true,
      },
      {
        label: 'Target (%)',
        data: [98, 98, 98, 98, 98, 98, 98, 98, 98, 98, 98, 98],
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
        text: 'Document Compliance Rate Trend',
      },
    },
    scales: {
      y: {
        min: 85,
        max: 100,
        title: {
          display: true,
          text: 'Compliance Rate (%)'
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
