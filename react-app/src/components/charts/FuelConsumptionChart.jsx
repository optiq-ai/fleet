import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Chart from 'chart.js/auto';

/**
 * Fuel Consumption Chart component
 * @param {Object} props - Component props
 * @param {Array} props.data - Fuel consumption data
 * @param {string} props.period - Period for data aggregation (day, week, month, year)
 * @param {boolean} props.isLoading - Whether the chart is in loading state
 * @returns {JSX.Element} Fuel Consumption Chart component
 */
const FuelConsumptionChart = ({ data, period, isLoading }) => {
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
    const consumptionData = data.map(item => item.consumption);
    const distanceData = data.map(item => item.distance);
    
    // Create chart
    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Zużycie paliwa (l)',
            data: consumptionData,
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            yAxisID: 'y'
          },
          {
            label: 'Dystans (km)',
            data: distanceData,
            type: 'line',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
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
            text: `Zużycie paliwa (${getPeriodLabel(period)})`,
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
                
                if (label.includes('Zużycie')) {
                  return `${label}: ${value} l`;
                } else if (label.includes('Dystans')) {
                  return `${label}: ${value} km`;
                }
                
                return `${label}: ${value}`;
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
              text: 'Zużycie paliwa (l)'
            }
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            title: {
              display: true,
              text: 'Dystans (km)'
            },
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

export default FuelConsumptionChart;
