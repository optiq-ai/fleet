import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Chart from 'chart.js/auto';

/**
 * Road Toll Spending Trends Chart component
 * @param {Object} props - Component props
 * @param {Array} props.data - Expense trend data
 * @param {string} props.period - Period for data aggregation (daily, weekly, monthly, quarterly)
 * @param {boolean} props.isLoading - Whether the chart is in loading state
 * @returns {JSX.Element} Road Toll Spending Trends Chart component
 */
const RoadTollSpendingTrendsChart = ({ data, period, isLoading }) => {
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
    const labels = data.map(item => {
      switch(period) {
        case 'daily':
          return item.date;
        case 'weekly':
          return item.week;
        case 'quarterly':
          return item.quarter;
        case 'monthly':
        default:
          return item.month;
      }
    });
    
    const amounts = data.map(item => item.amount);
    
    // Generate gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(54, 162, 235, 0.8)');
    gradient.addColorStop(1, 'rgba(54, 162, 235, 0.1)');
    
    // Create chart
    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Wydatki na opłaty drogowe',
            data: amounts,
            backgroundColor: gradient,
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 2,
            borderRadius: 6,
            hoverBackgroundColor: 'rgba(54, 162, 235, 0.9)',
            hoverBorderColor: 'rgba(54, 162, 235, 1)',
            hoverBorderWidth: 3
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 1000,
          easing: 'easeOutQuart'
        },
        plugins: {
          title: {
            display: true,
            text: `Wydatki na opłaty drogowe (${getPeriodLabel(period)})`,
            font: {
              size: 16,
              weight: 'bold'
            },
            padding: {
              top: 10,
              bottom: 20
            }
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleFont: {
              size: 14
            },
            bodyFont: {
              size: 13
            },
            padding: 12,
            cornerRadius: 6,
            callbacks: {
              label: function(context) {
                const label = context.dataset.label || '';
                const value = context.parsed.y;
                return `${label}: ${value.toFixed(2)} PLN`;
              }
            }
          },
          legend: {
            position: 'top',
            labels: {
              font: {
                size: 13
              },
              padding: 16
            }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: getPeriodLabel(period),
              font: {
                size: 14
              },
              padding: {
                top: 10
              }
            },
            grid: {
              display: false
            }
          },
          y: {
            title: {
              display: true,
              text: 'Kwota (PLN)',
              font: {
                size: 14
              },
              padding: {
                bottom: 10
              }
            },
            beginAtZero: true,
            grid: {
              borderDash: [2, 4],
              color: 'rgba(0, 0, 0, 0.1)'
            },
            ticks: {
              callback: function(value) {
                return value.toFixed(0) + ' PLN';
              }
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
      case 'daily':
        return 'Dziennie';
      case 'weekly':
        return 'Tygodniowo';
      case 'quarterly':
        return 'Kwartalnie';
      case 'monthly':
      default:
        return 'Miesięcznie';
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
  height: 350px;
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

export default RoadTollSpendingTrendsChart;
