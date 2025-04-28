import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadarController,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar, Pie, Doughnut, Radar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadarController,
  RadialLinearScale,
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
 * Component for displaying driver work time visualization
 * @param {Object} props Component props
 * @returns {JSX.Element} DriverWorkTimeChart component
 */
export const DriverWorkTimeChart = ({ data }) => {
  // Default data if none provided
  const defaultData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Driving Time (h)',
        data: [8.5, 9.0, 8.0, 9.5, 7.5, 4.0, 0],
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
      },
      {
        label: 'Other Work Time (h)',
        data: [2.0, 1.5, 2.5, 1.0, 3.0, 1.0, 0],
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
      },
      {
        label: 'Rest Time (h)',
        data: [13.5, 13.5, 13.5, 13.5, 13.5, 19.0, 24.0],
        backgroundColor: 'rgba(255, 206, 86, 0.7)',
      },
      {
        label: 'Violations (count)',
        data: [0, 0, 1, 0, 0, 0, 0],
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
        text: 'Driver Work Time Analysis (Last Week)',
      },
    },
    scales: {
      y: {
        stacked: true,
        beginAtZero: true,
        title: {
          display: true,
          text: 'Hours'
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
          text: 'Violations'
        },
        min: 0,
        max: 5,
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
 * Component for displaying driving style radar chart
 * @param {Object} props Component props
 * @returns {JSX.Element} DrivingStyleChart component
 */
export const DrivingStyleChart = ({ data }) => {
  // Default data if none provided
  const defaultData = {
    labels: ['Speeding', 'Harsh Braking', 'Harsh Acceleration', 'Idling Time', 'Cornering', 'Cruise Control Usage'],
    datasets: [
      {
        label: 'Driver Score (Avg = 50)',
        data: [65, 40, 55, 70, 45, 80],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Fleet Average',
        data: [50, 50, 50, 50, 50, 50],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
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
        text: 'Driving Style Analysis',
      },
    },
    scales: {
      r: {
        angleLines: {
          display: true
        },
        suggestedMin: 0,
        suggestedMax: 100,
        pointLabels: {
          font: {
            size: 10
          }
        }
      }
    }
  };

  return (
    <div style={{ height: '300px', width: '100%' }}>
      <Radar options={options} data={chartData} />
    </div>
  );
};

/**
 * Component for displaying driver fuel efficiency comparison
 * @param {Object} props Component props
 * @returns {JSX.Element} DriverFuelEfficiencyChart component
 */
export const DriverFuelEfficiencyChart = ({ data }) => {
  // Default data if none provided
  const defaultData = {
    labels: ['John Smith', 'Anna Kowalska', 'Peter Jones', 'Marek Wiśniewski', 'Jane Doe', 'Katarzyna Zielińska'],
    datasets: [
      {
        label: 'Avg. Fuel Consumption (L/100km)',
        data: [31.5, 29.8, 33.0, 30.5, 32.1, 31.0],
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
      },
      {
        label: 'Fleet Average',
        data: [31.5, 31.5, 31.5, 31.5, 31.5, 31.5],
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
        text: 'Fuel Efficiency by Driver',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Fuel Consumption (L/100km)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Driver'
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
 * Component for displaying driver punctuality trend
 * @param {Object} props Component props
 * @returns {JSX.Element} DriverPunctualityChart component
 */
export const DriverPunctualityChart = ({ data }) => {
  // Default data if none provided
  const defaultData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'On-Time Deliveries (%)',
        data: [95, 96, 94, 92, 95, 97, 96, 94, 93, 95, 97, 98],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        fill: true,
      },
      {
        label: 'Fleet Average (%)',
        data: [92, 94, 91, 89, 93, 95, 94, 92, 90, 93, 95, 96],
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
        text: 'Driver Delivery Punctuality Trend',
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
 * Component for displaying driver safety KPI chart
 * @param {Object} props Component props
 * @returns {JSX.Element} DriverSafetyKPIChart component
 */
export const DriverSafetyKPIChart = ({ data }) => {
  // Default data if none provided
  const defaultData = {
    labels: ['John Smith', 'Anna Kowalska', 'Peter Jones', 'Marek Wiśniewski', 'Jane Doe', 'Katarzyna Zielińska'],
    datasets: [
      {
        label: 'Incidents (Last 12 Months)',
        data: [1, 0, 3, 0, 2, 1],
        backgroundColor: 'rgba(255, 99, 132, 0.7)',
      },
      {
        label: 'Violations (Last 12 Months)',
        data: [5, 2, 8, 3, 6, 4],
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
        text: 'Driver Safety KPIs',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Count'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Driver'
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
 * Component for displaying driver availability chart
 * @param {Object} props Component props
 * @returns {JSX.Element} DriverAvailabilityChart component
 */
export const DriverAvailabilityChart = ({ data }) => {
  // Default data if none provided
  const defaultData = {
    labels: ['Available', 'On Route', 'Resting', 'On Leave', 'Unavailable'],
    datasets: [
      {
        label: 'Driver Status',
        data: [25, 15, 5, 3, 2],
        backgroundColor: [
          'rgba(75, 192, 192, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 99, 132, 0.7)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(153, 102, 255, 1)',
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
        text: 'Current Driver Availability',
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
 * Component for displaying driver ranking chart
 * @param {Object} props Component props
 * @returns {JSX.Element} DriverRankingChart component
 */
export const DriverRankingChart = ({ data }) => {
  // Default data if none provided
  const defaultData = {
    labels: ['Anna Kowalska', 'John Smith', 'Marek Wiśniewski', 'Jane Doe', 'Katarzyna Zielińska', 'Peter Jones'],
    datasets: [
      {
        label: 'Overall Performance Score',
        data: [92, 88, 85, 82, 80, 75],
        backgroundColor: (context) => {
          const value = context.dataset.data[context.dataIndex];
          return value > 90 ? 'rgba(75, 192, 192, 0.7)' : 
                 value > 80 ? 'rgba(54, 162, 235, 0.7)' : 
                 'rgba(255, 206, 86, 0.7)';
        },
      }
    ],
  };

  const chartData = data || defaultData;

  const options = {
    ...commonOptions,
    indexAxis: 'y',
    plugins: {
      ...commonOptions.plugins,
      title: {
        display: true,
        text: 'Driver Performance Ranking',
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Overall Score'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Driver'
        }
      }
    }
  };

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <Bar options={options} data={chartData} />
    </div>
  );
};

/**
 * Component for displaying driver cost analysis
 * @param {Object} props Component props
 * @returns {JSX.Element} DriverCostAnalysisChart component
 */
export const DriverCostAnalysisChart = ({ data }) => {
  // Default data if none provided
  const defaultData = {
    labels: ['John Smith', 'Anna Kowalska', 'Peter Jones', 'Marek Wiśniewski', 'Jane Doe', 'Katarzyna Zielińska'],
    datasets: [
      {
        label: 'Fuel Costs (€)',
        data: [4500, 4200, 4800, 4300, 4600, 4400],
        backgroundColor: 'rgba(255, 99, 132, 0.7)',
      },
      {
        label: 'Violation Fines (€)',
        data: [150, 50, 250, 80, 200, 120],
        backgroundColor: 'rgba(255, 159, 64, 0.7)',
      },
      {
        label: 'Maintenance Impact (€)',
        data: [300, 200, 450, 250, 350, 280],
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
        text: 'Operational Costs per Driver (Last Month)',
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
          text: 'Driver'
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

