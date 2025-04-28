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
 * Component for displaying truck fleet age distribution
 * @param {Object} props Component props
 * @returns {JSX.Element} TruckAgeDistributionChart component
 */
export const TruckAgeDistributionChart = ({ data }) => {
  // Default data if none provided
  const defaultData = {
    labels: ['< 1 year', '1-2 years', '2-3 years', '3-4 years', '4-5 years', '> 5 years'],
    datasets: [
      {
        label: 'Number of Trucks',
        data: [5, 12, 18, 8, 4, 3],
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
        text: 'Truck Age Distribution',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Trucks'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Age Group'
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
 * Component for displaying truck mileage comparison
 * @param {Object} props Component props
 * @returns {JSX.Element} TruckMileageComparisonChart component
 */
export const TruckMileageComparisonChart = ({ data }) => {
  // Default data if none provided
  const defaultData = {
    labels: ['TRK001', 'TRK002', 'TRK003', 'TRK004', 'TRK005', 'TRK006', 'TRK007', 'TRK008', 'TRK009', 'TRK010'],
    datasets: [
      {
        label: 'Current Mileage (km)',
        data: [150000, 210000, 85000, 320000, 110000, 180000, 250000, 95000, 175000, 220000],
        backgroundColor: 'rgba(53, 162, 235, 0.7)',
      },
      {
        label: 'Average Mileage for Model',
        data: [180000, 180000, 120000, 250000, 150000, 180000, 180000, 120000, 180000, 180000],
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
        text: 'Truck Mileage Comparison',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Mileage (km)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Truck ID'
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
 * Component for displaying truck failure heatmap
 * Note: This is a simplified version as Chart.js doesn't natively support heatmaps
 * @param {Object} props Component props
 * @returns {JSX.Element} TruckFailureHeatmapChart component
 */
export const TruckFailureHeatmapChart = ({ data }) => {
  // For a real heatmap, you would use a specialized library
  // This is a simplified representation using a bar chart
  const defaultData = {
    labels: ['Engine', 'Transmission', 'Brakes', 'Electrical', 'Suspension', 'Tires', 'Cooling'],
    datasets: [
      {
        label: 'Volvo FH16',
        data: [3, 1, 2, 5, 2, 4, 2],
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
      },
      {
        label: 'Scania R730',
        data: [2, 3, 1, 4, 1, 3, 1],
        backgroundColor: 'rgba(153, 102, 255, 0.7)',
      },
      {
        label: 'Mercedes Actros',
        data: [1, 2, 3, 3, 4, 2, 3],
        backgroundColor: 'rgba(255, 159, 64, 0.7)',
      },
      {
        label: 'MAN TGX',
        data: [4, 2, 1, 2, 3, 5, 2],
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
        text: 'Failure Frequency by Truck Model and Component',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Failures'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Component'
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
 * Component for displaying truck availability trend
 * @param {Object} props Component props
 * @returns {JSX.Element} TruckAvailabilityTrendChart component
 */
export const TruckAvailabilityTrendChart = ({ data }) => {
  // Default data if none provided
  const defaultData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Truck Availability (%)',
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
        text: 'Truck Availability Trend',
      },
    },
    scales: {
      y: {
        min: 80,
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
 * Component for displaying fuel efficiency by truck
 * @param {Object} props Component props
 * @returns {JSX.Element} FuelEfficiencyByTruckChart component
 */
export const FuelEfficiencyByTruckChart = ({ data }) => {
  // Default data if none provided
  const defaultData = {
    labels: ['TRK001', 'TRK002', 'TRK003', 'TRK004', 'TRK005', 'TRK006', 'TRK007', 'TRK008', 'TRK009', 'TRK010'],
    datasets: [
      {
        label: 'Fuel Consumption (L/100km)',
        data: [32.5, 30.8, 33.2, 31.5, 34.0, 29.8, 32.1, 33.5, 31.2, 30.5],
        backgroundColor: 'rgba(53, 162, 235, 0.7)',
      },
      {
        label: 'Fleet Average',
        data: [32.0, 32.0, 32.0, 32.0, 32.0, 32.0, 32.0, 32.0, 32.0, 32.0],
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
        text: 'Fuel Efficiency by Truck',
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
          text: 'Truck ID'
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
 * Component for displaying average fleet age trend
 * @param {Object} props Component props
 * @returns {JSX.Element} FleetAgeTrendChart component
 */
export const FleetAgeTrendChart = ({ data }) => {
  // Default data if none provided
  const defaultData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Average Fleet Age (years)',
        data: [3.2, 3.3, 3.3, 3.4, 3.5, 3.5, 3.0, 3.1, 3.1, 3.2, 3.2, 3.3],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
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
        text: 'Average Fleet Age Trend',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Age (years)'
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
 * Component for displaying total cost of ownership per truck
 * @param {Object} props Component props
 * @returns {JSX.Element} TCOPerTruckChart component
 */
export const TCOPerTruckChart = ({ data }) => {
  // Default data if none provided
  const defaultData = {
    labels: ['TRK001', 'TRK002', 'TRK003', 'TRK004', 'TRK005', 'TRK006', 'TRK007', 'TRK008', 'TRK009', 'TRK010'],
    datasets: [
      {
        label: 'Fuel',
        data: [15000, 16200, 14500, 17800, 15600, 14900, 16300, 15200, 16100, 15400],
        backgroundColor: 'rgba(255, 99, 132, 0.7)',
      },
      {
        label: 'Maintenance',
        data: [5200, 4800, 6500, 4200, 5800, 5100, 4700, 6200, 5300, 4900],
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
      },
      {
        label: 'Repairs',
        data: [2800, 3200, 4100, 2500, 3600, 2900, 3100, 3800, 2700, 3300],
        backgroundColor: 'rgba(255, 206, 86, 0.7)',
      },
      {
        label: 'Insurance',
        data: [3500, 3500, 3500, 3500, 3500, 3500, 3500, 3500, 3500, 3500],
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
      },
      {
        label: 'Depreciation',
        data: [8000, 7500, 8500, 7000, 8200, 7800, 7600, 8300, 7900, 7700],
        backgroundColor: 'rgba(153, 102, 255, 0.7)',
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
        text: 'Total Cost of Ownership per Truck',
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
          text: 'Truck ID'
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
 * Component for displaying truck reliability index
 * @param {Object} props Component props
 * @returns {JSX.Element} TruckReliabilityIndexChart component
 */
export const TruckReliabilityIndexChart = ({ data }) => {
  // Default data if none provided
  const defaultData = {
    labels: ['TRK001', 'TRK002', 'TRK003', 'TRK004', 'TRK005', 'TRK006', 'TRK007', 'TRK008', 'TRK009', 'TRK010'],
    datasets: [
      {
        label: 'Failures per 10,000 km',
        data: [0.8, 1.2, 1.5, 0.6, 1.3, 0.9, 1.1, 1.4, 0.7, 1.0],
        backgroundColor: 'rgba(255, 99, 132, 0.7)',
      },
      {
        label: 'Fleet Average',
        data: [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0],
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        type: 'line',
        borderColor: 'rgba(54, 162, 235, 1)',
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
        text: 'Truck Reliability Index',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Failures per 10,000 km'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Truck ID'
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
 * Component for displaying truck replacement forecast
 * @param {Object} props Component props
 * @returns {JSX.Element} TruckReplacementForecastChart component
 */
export const TruckReplacementForecastChart = ({ data }) => {
  // Default data if none provided
  const defaultData = {
    labels: ['TRK004', 'TRK002', 'TRK007', 'TRK009', 'TRK005', 'TRK001', 'TRK006', 'TRK010', 'TRK008', 'TRK003'],
    datasets: [
      {
        label: 'Replacement Score',
        data: [85, 78, 72, 65, 58, 52, 45, 38, 32, 25],
        backgroundColor: (context) => {
          const value = context.dataset.data[context.dataIndex];
          return value > 70 ? 'rgba(255, 99, 132, 0.7)' : 
                 value > 50 ? 'rgba(255, 206, 86, 0.7)' : 
                 'rgba(75, 192, 192, 0.7)';
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
        text: 'Truck Replacement Forecast',
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Replacement Score'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Truck ID'
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
 * Component for displaying driver efficiency by truck
 * @param {Object} props Component props
 * @returns {JSX.Element} DriverEfficiencyByTruckChart component
 */
export const DriverEfficiencyByTruckChart = ({ data }) => {
  // Default data if none provided
  const defaultData = {
    labels: ['John Smith', 'Anna Kowalska', 'Peter Jones', 'Marek Wiśniewski', 'Jane Doe'],
    datasets: [
      {
        label: 'Fuel Efficiency Score',
        data: [85, 92, 78, 88, 90],
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
      },
      {
        label: 'Driving Style Score',
        data: [82, 95, 75, 85, 88],
        backgroundColor: 'rgba(153, 102, 255, 0.7)',
      },
      {
        label: 'Maintenance Impact Score',
        data: [88, 90, 80, 86, 92],
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
        text: 'Driver Efficiency Scores',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Score'
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
