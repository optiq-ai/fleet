import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Chart from 'chart.js/auto';

/**
 * Fuel Comparison Chart component
 * @param {Object} props - Component props
 * @param {Array} props.data - Fuel comparison data
 * @param {string} props.compareBy - Comparison type (vehicle, driver, route)
 * @param {boolean} props.isLoading - Whether the chart is in loading state
 * @returns {JSX.Element} Fuel Comparison Chart component
 */
const FuelComparisonChart = ({ data, compareBy, isLoading }) => {
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
    const labels = data.map(item => item.name);
    const consumptionData = data.map(item => item.consumption);
    const efficiencyData = data.map(item => item.efficiency);
    
    // Create chart
    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Zużycie paliwa (l/100km)',
            data: consumptionData,
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            yAxisID: 'y'
          },
          {
            label: 'Efektywność (%)',
            data: efficiencyData,
            type: 'line',
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
            text: `Porównanie zużycia paliwa według ${getCompareByLabel(compareBy)}`,
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
                  return `${label}: ${value} l/100km`;
                } else if (label.includes('Efektywność')) {
                  return `${label}: ${value}%`;
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
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            title: {
              display: true,
              text: 'Zużycie paliwa (l/100km)'
            },
            min: 0
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            title: {
              display: true,
              text: 'Efektywność (%)'
            },
            min: 0,
            max: 100,
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
  }, [data, compareBy, isLoading]);
  
  // Helper function to get compareBy label
  const getCompareByLabel = (compareBy) => {
    switch (compareBy) {
      case 'driver':
        return 'kierowcy';
      case 'route':
        return 'trasy';
      case 'vehicle':
      default:
        return 'pojazdu';
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

export default FuelComparisonChart;
