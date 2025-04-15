import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Chart from 'chart.js/auto';

/**
 * CO2 Emission Chart component
 * @param {Object} props - Component props
 * @param {Array} props.data - CO2 emission data
 * @param {string} props.period - Period for data aggregation (day, week, month, year)
 * @param {boolean} props.isLoading - Whether the chart is in loading state
 * @returns {JSX.Element} CO2 Emission Chart component
 */
const CO2EmissionChart = ({ data, period, isLoading }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  
  useEffect(() => {
    if (isLoading || !data || data.length === 0) return;
    
    // Destroy previous chart if exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    
    const ctx = chartRef.current.getContext('2d');
    
    // Prepare data for chart
    const labels = data.map(item => item.date);
    const emissionData = data.map(item => item.emission);
    const emissionPerKmData = data.map(item => item.emissionPerKm);
    
    // Create chart
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Emisja CO2 (kg)',
            data: emissionData,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 2,
            fill: true,
            tension: 0.1,
            yAxisID: 'y'
          },
          {
            label: 'Emisja CO2 na km (kg/km)',
            data: emissionPerKmData,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: false,
            tension: 0.1,
            yAxisID: 'y1'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: `Emisja CO2 (${getPeriodLabel(period)})`,
            font: {
              size: 16
            }
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
              label: function(context) {
                const label = context.dataset.label || '';
                const value = context.parsed.y;
                
                if (label.includes('na km')) {
                  return `${label}: ${value.toFixed(2)} kg/km`;
                } else {
                  return `${label}: ${value} kg`;
                }
              }
            }
          },
          legend: {
            position: 'top',
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: getPeriodLabel(period)
            }
          },
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            title: {
              display: true,
              text: 'Emisja CO2 (kg)'
            },
            min: 0
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            title: {
              display: true,
              text: 'Emisja CO2 na km (kg/km)'
            },
            min: 0,
            grid: {
              drawOnChartArea: false
            }
          }
        }
      }
    });
    
    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, period, isLoading]);
  
  // Helper function to get period label
  const getPeriodLabel = (period) => {
    switch (period) {
      case 'day':
        return 'Dzień';
      case 'week':
        return 'Tydzień';
      case 'year':
        return 'Rok';
      case 'month':
      default:
        return 'Miesiąc';
    }
  };
  
  return (
    <ChartContainer>
      {isLoading ? (
        <LoadingIndicator>Ładowanie wykresu...</LoadingIndicator>
      ) : (
        <Canvas ref={chartRef} />
      )}
    </ChartContainer>
  );
};

const ChartContainer = styled.div`
  width: 100%;
  height: 400px;
  position: relative;
`;

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
`;

const LoadingIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: #666;
`;

export default CO2EmissionChart;
