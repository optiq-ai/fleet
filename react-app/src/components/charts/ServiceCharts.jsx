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
 * Component for displaying service costs by type
 * @param {Object} props Component props
 * @returns {JSX.Element} ServiceCostsByTypeChart component
 */
export const ServiceCostsByTypeChart = ({ data }) => {
  // Default data if none provided
  const defaultData = {
    labels: ['Regular Maintenance', 'Repairs', 'Tires', 'Fluids', 'Diagnostics', 'Other'],
    datasets: [
      {
        label: 'Service Costs (€)',
        data: [35000, 25000, 18000, 8000, 12000, 5000],
        backgroundColor: [
          'rgba(75, 192, 192, 0.7)',
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(153, 102, 255, 1)',
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
        text: 'Service Costs by Type',
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
 * Component for displaying service costs trend
 * @param {Object} props Component props
 * @returns {JSX.Element} ServiceCostsTrendChart component
 */
export const ServiceCostsTrendChart = ({ data }) => {
  // Default data if none provided
  const defaultData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Maintenance Costs (€)',
        data: [8500, 7800, 9200, 8900, 9500, 10200, 11000, 10500, 9800, 9200, 8700, 8300],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        fill: false,
      },
      {
        label: 'Repair Costs (€)',
        data: [5200, 4800, 6500, 5800, 7200, 6800, 7500, 6900, 6200, 5500, 5000, 4700],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        fill: false,
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
        text: 'Service Costs Trend',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Costs (€)'
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
 * Component for displaying service frequency by vehicle
 * @param {Object} props Component props
 * @returns {JSX.Element} ServiceFrequencyByVehicleChart component
 */
export const ServiceFrequencyByVehicleChart = ({ data }) => {
  // Default data if none provided
  const defaultData = {
    labels: ['TRK001', 'TRK002', 'TRK003', 'TRK004', 'TRK005', 'TRK006', 'TRK007', 'TRK008', 'TRK009', 'TRK010'],
    datasets: [
      {
        label: 'Number of Services (Last 12 Months)',
        data: [5, 7, 4, 8, 6, 5, 9, 4, 6, 7],
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
      },
      {
        label: 'Fleet Average',
        data: [6.1, 6.1, 6.1, 6.1, 6.1, 6.1, 6.1, 6.1, 6.1, 6.1],
        backgroundColor: 'rgba(255, 99, 132, 0.7)',
        type: 'line',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        fill: false,
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
        text: 'Service Frequency by Vehicle',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Services'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Vehicle ID'
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
 * Component for displaying service provider performance
 * @param {Object} props Component props
 * @returns {JSX.Element} ServiceProviderPerformanceChart component
 */
export const ServiceProviderPerformanceChart = ({ data }) => {
  // Default data if none provided
  const defaultData = {
    labels: ['Provider A', 'Provider B', 'Provider C', 'Provider D', 'Provider E'],
    datasets: [
      {
        label: 'Average Service Time (hours)',
        data: [4.5, 6.2, 3.8, 5.5, 4.2],
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
        yAxisID: 'y',
      },
      {
        label: 'Average Cost per Service (€)',
        data: [850, 720, 980, 800, 890],
        backgroundColor: 'rgba(255, 99, 132, 0.7)',
        yAxisID: 'y1',
      },
      {
        label: 'Quality Score (1-10)',
        data: [8.5, 7.2, 9.1, 7.8, 8.3],
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        yAxisID: 'y2',
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
        text: 'Service Provider Performance Comparison',
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
          text: 'Time (hours)'
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
          text: 'Cost (€)'
        }
      },
      y2: {
        type: 'linear',
        display: false,
        min: 0,
        max: 10,
      },
      x: {
        title: {
          display: true,
          text: 'Service Provider'
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
 * Component for displaying service downtime analysis
 * @param {Object} props Component props
 * @returns {JSX.Element} ServiceDowntimeAnalysisChart component
 */
export const ServiceDowntimeAnalysisChart = ({ data }) => {
  // Default data if none provided
  const defaultData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Total Downtime (days)',
        data: [45, 38, 52, 48, 55, 60, 65, 58, 50, 45, 40, 35],
        backgroundColor: 'rgba(255, 99, 132, 0.7)',
      },
      {
        label: 'Planned Maintenance (days)',
        data: [30, 25, 35, 32, 38, 42, 45, 40, 35, 30, 28, 25],
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
      },
      {
        label: 'Unplanned Repairs (days)',
        data: [15, 13, 17, 16, 17, 18, 20, 18, 15, 15, 12, 10],
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
        text: 'Service Downtime Analysis',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
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
      <Bar options={options} data={chartData} />
    </div>
  );
};

/**
 * Component for displaying service parts consumption
 * @param {Object} props Component props
 * @returns {JSX.Element} ServicePartsConsumptionChart component
 */
export const ServicePartsConsumptionChart = ({ data }) => {
  // Default data if none provided
  const defaultData = {
    labels: ['Filters', 'Brake Parts', 'Engine Parts', 'Transmission Parts', 'Electrical Parts', 'Tires', 'Other'],
    datasets: [
      {
        label: 'Parts Consumption (€)',
        data: [12000, 18000, 25000, 15000, 10000, 22000, 8000],
        backgroundColor: [
          'rgba(75, 192, 192, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 99, 132, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)',
          'rgba(201, 203, 207, 0.7)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(153, 102, 255, 1)',
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
        text: 'Service Parts Consumption',
      },
    },
  };

  return (
    <div style={{ height: '300px', width: '100%' }}>
      <Doughnut options={options} data={chartData} />
    </div>
  );
};
