import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Chart from 'chart.js/auto';

/**
 * Ferry Expense Trends Chart component
 * @param {Object} props - Component props
 * @param {Array} props.data - Expense trend data
 * @param {string} props.period - Period for data aggregation (daily, weekly, monthly, quarterly)
 * @param {boolean} props.isLoading - Whether the chart is in loading state
 * @returns {JSX.Element} Ferry Expense Trends Chart component
 */
const FerryExpenseTrendsChart = ({ data, period = 'monthly', isLoading = false }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [activeTab, setActiveTab] = useState(period);
  
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
    gradient.addColorStop(0, 'rgba(75, 192, 192, 0.8)');
    gradient.addColorStop(1, 'rgba(75, 192, 192, 0.1)');
    
    // Create chart
    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Ferry Expenses',
            data: amounts,
            backgroundColor: gradient,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            borderRadius: 8,
            hoverBackgroundColor: 'rgba(75, 192, 192, 0.9)',
            hoverBorderColor: 'rgba(75, 192, 192, 1)',
            hoverBorderWidth: 3
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 1200,
          easing: 'easeOutQuart'
        },
        plugins: {
          title: {
            display: true,
            text: `Ferry Expenses (${getPeriodLabel(period)})`,
            font: {
              size: 16,
              weight: 'bold'
            },
            padding: {
              top: 10,
              bottom: 20
            },
            color: '#333'
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
                return `${label}: €${value.toFixed(2)}`;
              }
            }
          },
          legend: {
            position: 'top',
            labels: {
              font: {
                size: 13
              },
              padding: 16,
              color: '#555'
            }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: getPeriodLabel(period),
              font: {
                size: 14,
                weight: 'bold'
              },
              padding: {
                top: 10
              },
              color: '#555'
            },
            grid: {
              display: false
            },
            ticks: {
              color: '#666',
              font: {
                size: 11
              }
            }
          },
          y: {
            title: {
              display: true,
              text: 'Amount (€)',
              font: {
                size: 14,
                weight: 'bold'
              },
              padding: {
                bottom: 10
              },
              color: '#555'
            },
            beginAtZero: true,
            grid: {
              borderDash: [2, 4],
              color: 'rgba(0, 0, 0, 0.1)'
            },
            ticks: {
              color: '#666',
              font: {
                size: 11
              },
              callback: function(value) {
                return '€' + value.toFixed(0);
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
        return 'Daily';
      case 'weekly':
        return 'Weekly';
      case 'quarterly':
        return 'Quarterly';
      case 'monthly':
      default:
        return 'Monthly';
    }
  };
  
  return (
    <ChartContainer>
      {isLoading ? (
        <LoadingIndicator>Loading chart...</LoadingIndicator>
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
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 16px;
  margin-top: 8px;
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
  font-size: 14px;
`;

export default FerryExpenseTrendsChart;
