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
 * Component for displaying fuel consumption trend chart
 * @param {Object} props Component props
 * @returns {JSX.Element} FuelConsumptionChart component
 */
export const FuelConsumptionChart = ({ data }) => {
  // Default data if none provided
  const defaultData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Fuel Consumption (L)',
        data: [6500, 6300, 6800, 7100, 6900, 7300, 7500, 7200, 6800, 6500, 6200, 6000],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        tension: 0.3,
      },
      {
        label: 'Trend',
        data: [6600, 6650, 6700, 6750, 6800, 6850, 6900, 6850, 6800, 6750, 6700, 6650],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderDash: [5, 5],
        tension: 0.3,
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
        text: 'Fuel Consumption Trend (Last 12 Months)',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Liters'
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
 * Component for displaying cost comparison chart
 * @param {Object} props Component props
 * @returns {JSX.Element} CostComparisonChart component
 */
export const CostComparisonChart = ({ data }) => {
  // Default data if none provided
  const defaultData = {
    labels: ['Fuel', 'Maintenance', 'Tolls', 'Repairs', 'Insurance', 'Other'],
    datasets: [
      {
        label: 'Current Month',
        data: [45000, 12000, 8500, 6000, 9500, 3000],
        backgroundColor: 'rgba(53, 162, 235, 0.7)',
      },
      {
        label: 'Previous Month',
        data: [42000, 14000, 8000, 7500, 9500, 3500],
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
        text: 'Cost Comparison',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Cost (€)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Category'
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
 * Component for displaying fleet utilization chart
 * @param {Object} props Component props
 * @returns {JSX.Element} FleetUtilizationChart component
 */
export const FleetUtilizationChart = ({ data }) => {
  // Default data if none provided
  const defaultData = {
    labels: ['Active', 'In Maintenance', 'Idle', 'Loading/Unloading'],
    datasets: [
      {
        label: 'Fleet Utilization',
        data: [65, 12, 8, 15],
        backgroundColor: [
          'rgba(75, 192, 192, 0.7)',
          'rgba(255, 99, 132, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(153, 102, 255, 0.7)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
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
        text: 'Fleet Utilization (%)',
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
 * Component for displaying CO2 emissions chart
 * @param {Object} props Component props
 * @returns {JSX.Element} CO2EmissionsChart component
 */
export const CO2EmissionsChart = ({ data }) => {
  // Default data if none provided
  const defaultData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'CO2 Emissions (tons)',
        data: [180, 175, 190, 200, 195, 205, 210, 200, 190, 180, 175, 170],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.3,
      },
      {
        label: 'Target',
        data: [190, 188, 186, 184, 182, 180, 178, 176, 174, 172, 170, 168],
        borderColor: 'rgb(255, 159, 64)',
        backgroundColor: 'rgba(255, 159, 64, 0.5)',
        borderDash: [5, 5],
        tension: 0,
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
        text: 'CO2 Emissions Trend',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'CO2 (tons)'
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
 * Component for displaying fleet activity heatmap
 * Note: This is a simplified version as Chart.js doesn't natively support heatmaps
 * For a real heatmap, consider using a specialized library
 * @param {Object} props Component props
 * @returns {JSX.Element} FleetActivityHeatmap component
 */
export const FleetActivityHeatmap = ({ data }) => {
  // For a real heatmap, you would use a specialized library
  // This is just a placeholder showing a bar chart instead
  const defaultData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Morning (6-12)',
        data: [65, 70, 68, 72, 75, 40, 30],
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
      },
      {
        label: 'Afternoon (12-18)',
        data: [70, 75, 72, 78, 80, 45, 35],
        backgroundColor: 'rgba(153, 102, 255, 0.7)',
      },
      {
        label: 'Evening (18-24)',
        data: [60, 65, 63, 67, 70, 50, 40],
        backgroundColor: 'rgba(255, 159, 64, 0.7)',
      },
      {
        label: 'Night (0-6)',
        data: [30, 35, 33, 37, 40, 25, 20],
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
        text: 'Fleet Activity by Day and Time',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Activity Level (%)'
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
 * Component for displaying safety KPI chart
 * @param {Object} props Component props
 * @returns {JSX.Element} SafetyKPIChart component
 */
export const SafetyKPIChart = ({ data }) => {
  // Default data if none provided
  const defaultData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Days Without Incidents',
        data: [30, 28, 31, 30, 31, 15, 12, 25, 30, 31, 30, 31],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        yAxisID: 'y',
      },
      {
        label: 'Number of Incidents',
        data: [0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        type: 'bar',
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
        text: 'Safety KPIs',
      },
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Days Without Incidents'
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
          text: 'Number of Incidents'
        },
        min: 0,
        max: 5,
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
 * Component for displaying delivery punctuality chart
 * @param {Object} props Component props
 * @returns {JSX.Element} DeliveryPunctualityChart component
 */
export const DeliveryPunctualityChart = ({ data }) => {
  // Default data if none provided
  const defaultData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'On-Time Deliveries (%)',
        data: [92, 94, 91, 89, 93, 95, 94, 92, 90, 93, 95, 96],
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
        text: 'Delivery Punctuality',
      },
    },
    scales: {
      y: {
        min: 80,
        max: 100,
        title: {
          display: true,
          text: 'On-Time Deliveries (%)'
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
 * Component for displaying fleet availability chart
 * @param {Object} props Component props
 * @returns {JSX.Element} FleetAvailabilityChart component
 */
export const FleetAvailabilityChart = ({ data }) => {
  // Default data if none provided
  const defaultData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Fleet Availability (%)',
        data: [95, 94, 96, 93, 92, 90, 91, 93, 95, 96, 97, 95],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        fill: true,
      },
      {
        label: 'Target (%)',
        data: [95, 95, 95, 95, 95, 95, 95, 95, 95, 95, 95, 95],
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
        text: 'Fleet Availability',
      },
    },
    scales: {
      y: {
        min: 85,
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
 * Component for displaying cost forecast chart
 * @param {Object} props Component props
 * @returns {JSX.Element} CostForecastChart component
 */
export const CostForecastChart = ({ data }) => {
  // Default data if none provided
  const defaultData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Actual Costs',
        data: [85000, 82000, 88000, 90000, 92000, 95000, null, null, null, null, null, null],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Forecasted Costs',
        data: [null, null, null, null, null, null, 97000, 96000, 94000, 92000, 90000, 88000],
        borderColor: 'rgb(255, 159, 64)',
        backgroundColor: 'rgba(255, 159, 64, 0.5)',
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
        text: 'Cost Forecast',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Cost (€)'
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
