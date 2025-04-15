import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Chart from 'chart.js/auto';

/**
 * Anomalies Chart component
 * @param {Object} props - Component props
 * @param {Array} props.data - Anomalies data
 * @param {string} props.period - Period for data aggregation (day, week, month, year)
 * @param {boolean} props.isLoading - Whether the chart is in loading state
 * @returns {JSX.Element} Anomalies Chart component
 */
const AnomaliesChart = ({ data, period, isLoading }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  
  useEffect(() => {
    if (isLoading || !data || data.length === 0) return;
    
    // Destroy previous chart if exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    
    const ctx = chartRef.current.getContext('2d');
    
    // Group anomalies by type
    const anomalyTypes = [...new Set(data.map(item => item.type))];
    const groupedData = {};
    
    anomalyTypes.forEach(type => {
      groupedData[type] = data.filter(item => item.type === type).length;
    });
    
    // Create chart
    chartInstance.current = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: anomalyTypes,
        datasets: [
          {
            label: 'Anomalie według typu',
            data: Object.values(groupedData),
            backgroundColor: [
              'rgba(255, 99, 132, 0.7)',
              'rgba(54, 162, 235, 0.7)',
              'rgba(255, 206, 86, 0.7)',
              'rgba(75, 192, 192, 0.7)',
              'rgba(153, 102, 255, 0.7)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Anomalie według typu',
            font: {
              size: 16
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.label || '';
                const value = context.raw;
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percentage = Math.round((value / total) * 100);
                return `${label}: ${value} (${percentage}%)`;
              }
            }
          },
          legend: {
            position: 'right',
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

export default AnomaliesChart;
