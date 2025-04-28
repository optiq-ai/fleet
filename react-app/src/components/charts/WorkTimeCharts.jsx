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
 * Component for displaying fleet work time visualization
 * @param {Object} props Component props
 * @returns {JSX.Element} FleetWorkTimeChart component
 */
export const FleetWorkTimeChart = ({ data }) => {
  // Default data if none provided
  const defaultData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Total Driving Time (h)',
        data: [350, 380, 340, 400, 320, 150, 50],
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
      },
      {
        label: 'Total Other Work Time (h)',
        data: [80, 70, 90, 60, 100, 40, 10],
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
      },
      {
        label: 'Total Rest Time (h)',
        data: [570, 550, 570, 540, 580, 710, 840],
        backgroundColor: 'rgba(255, 206, 86, 0.7)',
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
        text: 'Fleet Work Time Distribution (Last Week)',
      },
    },
    scales: {
      y: {
        stacked: true,
        beginAtZero: true,
        title: {
          display: true,
          text: 'Total Hours'
        }
      },
      x: {
        stacked: true,
        title: {
          display: true,
          text: 'Day of Week'
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
 * Component for displaying driver availability heatmap
 * Note: This is a simplified version as Chart.js doesn't natively support heatmaps
 * @param {Object} props Component props
 * @returns {JSX.Element} DriverAvailabilityHeatmapChart component
 */
export const DriverAvailabilityHeatmapChart = ({ data }) => {
  // For a real heatmap, you would use a specialized library
  // This is a simplified representation using a bar chart
  const defaultData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Morning (6-12)',
        data: [85, 90, 88, 92, 95, 60, 50],
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
      },
      {
        label: 'Afternoon (12-18)',
        data: [90, 95, 92, 98, 100, 65, 55],
        backgroundColor: 'rgba(153, 102, 255, 0.7)',
      },
      {
        label: 'Evening (18-24)',
        data: [80, 85, 83, 87, 90, 70, 60],
        backgroundColor: 'rgba(255, 159, 64, 0.7)',
      },
      {
        label: 'Night (0-6)',
        data: [50, 55, 53, 57, 60, 45, 40],
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
        text: 'Driver Availability by Day and Time (%)',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Availability (%)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Day of Week'
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
 * Component for displaying work time compliance trend
 * @param {Object} props Component props
 * @returns {JSX.Element} WorkTimeComplianceChart component
 */
export const WorkTimeComplianceChart = ({ data }) => {
  // Default data if none provided
  const defaultData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Compliance Rate (%)',
        data: [98, 99, 97, 96, 98, 99, 97, 98, 96, 97, 99, 100],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        fill: true,
      },
      {
        label: 'Number of Violations',
        data: [5, 3, 8, 10, 6, 2, 7, 4, 9, 7, 3, 0],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
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
        text: 'Work Time Compliance Trend',
      },
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        min: 90,
        max: 100,
        title: {
          display: true,
          text: 'Compliance Rate (%)'
        }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: 'Number of Violations'
        },
        min: 0,
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
 * Component for displaying overtime analysis
 * @param {Object} props Component props
 * @returns {JSX.Element} OvertimeAnalysisChart component
 */
export const OvertimeAnalysisChart = ({ data }) => {
  // Default data if none provided
  const defaultData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Total Overtime Hours',
        data: [120, 100, 150, 180, 140, 90, 160, 130, 170, 150, 110, 80],
        backgroundColor: 'rgba(255, 159, 64, 0.7)',
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
        text: 'Monthly Overtime Hours',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Total Hours'
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
      <Bar options={options} data={chartData} />
    </div>
  );
};

/**
 * Component for displaying time utilization breakdown
 * @param {Object} props Component props
 * @returns {JSX.Element} TimeUtilizationBreakdownChart component
 */
export const TimeUtilizationBreakdownChart = ({ data }) => {
  // Default data if none provided
  const defaultData = {
    labels: ['Driving', 'Loading', 'Unloading', 'Other Work', 'Rest'],
    datasets: [
      {
        label: 'Time Utilization (%)',
        data: [45, 10, 8, 12, 25],
        backgroundColor: [
          'rgba(75, 192, 192, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)',
          'rgba(255, 206, 86, 0.7)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 206, 86, 1)',
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
        text: 'Average Time Utilization Breakdown',
      },
    },
  };

  return (
    <div style={{ height: '300px', width: '100%' }}>
      <Pie options={options} data={chartData} />
    </div>
  );
};
