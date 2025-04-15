import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Chart from 'chart.js/auto';

/**
 * Cost Optimization Chart component
 * @param {Object} props - Component props
 * @param {Object} props.data - Cost optimization data
 * @param {boolean} props.isLoading - Whether the chart is in loading state
 * @returns {JSX.Element} Cost Optimization Chart component
 */
const CostOptimizationChart = ({ data, isLoading }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  
  useEffect(() => {
    if (isLoading || !data) return;
    
    // Destroy previous chart if exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    
    const ctx = chartRef.current.getContext('2d');
    
    // Prepare data for recommendations chart
    const recommendations = data.recommendations || [];
    const labels = recommendations.map(item => item.title);
    const savingsData = recommendations.map(item => item.estimatedSavings);
    const costData = recommendations.map(item => item.implementationCost);
    
    // Create chart
    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Szacowane oszczędności (zł)',
            data: savingsData,
            backgroundColor: 'rgba(75, 192, 192, 0.7)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          },
          {
            label: 'Koszt wdrożenia (zł)',
            data: costData,
            backgroundColor: 'rgba(255, 99, 132, 0.7)',
            borderColor: 'rgba(255, 99, 132, 1)',
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
            text: 'Rekomendacje optymalizacji kosztów',
            font: {
              size: 16
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.dataset.label || '';
                const value = context.parsed.y;
                return `${label}: ${value} zł`;
              },
              afterBody: function(tooltipItems) {
                const index = tooltipItems[0].dataIndex;
                const recommendation = recommendations[index];
                const roi = recommendation.roi;
                return `ROI: ${roi}%`;
              }
            }
          },
          legend: {
            position: 'top',
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Wartość (zł)'
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
  }, [data, isLoading]);
  
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

export default CostOptimizationChart;
