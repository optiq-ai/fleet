import React from 'react';
import styled from 'styled-components';
import Card from '../common/Card';
import { Radar, Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 500;
  color: #333;
  margin: 0 0 16px 0;
`;

const LoadingIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  color: #666;
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 20px;
  overflow-x: auto;
`;

const Tab = styled.div`
  padding: 12px 24px;
  cursor: pointer;
  font-weight: ${props => props.active ? '500' : 'normal'};
  color: ${props => props.active ? '#3f51b5' : '#666'};
  border-bottom: 2px solid ${props => props.active ? '#3f51b5' : 'transparent'};
  transition: all 0.3s ease;
  white-space: nowrap;
  
  &:hover {
    color: #3f51b5;
    background-color: #f5f5f5;
  }
`;

const GridSection = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.columns || 2}, 1fr);
  gap: 20px;
  margin-bottom: 20px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const MetricCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const MetricTitle = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
`;

const MetricValue = styled.div`
  font-size: 24px;
  font-weight: 500;
  color: #333;
  display: flex;
  align-items: center;
`;

const MetricProgress = styled.div`
  margin-top: 8px;
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
`;

const MetricProgressFill = styled.div`
  height: 100%;
  width: ${props => props.percentage}%;
  background-color: ${props => {
    if (props.percentage >= 90) return '#4caf50';
    if (props.percentage >= 70) return '#8bc34a';
    if (props.percentage >= 50) return '#ffc107';
    if (props.percentage >= 30) return '#ff9800';
    return '#f44336';
  }};
  border-radius: 4px;
  transition: width 0.3s ease;
`;

const ChartContainer = styled.div`
  height: 300px;
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  display: flex;
  flex-direction: column;
`;

const ChartTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-bottom: 16px;
`;

const ChartContent = styled.div`
  flex: 1;
  position: relative;
  width: 100%;
  height: 100%;
`;

const RecommendationContainer = styled.div`
  margin-top: 20px;
  padding: 16px;
  background-color: #f5f5f5;
  border-radius: 8px;
`;

const RecommendationTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-bottom: 12px;
`;

const RecommendationItem = styled.div`
  margin-bottom: 8px;
  padding-left: 16px;
  position: relative;
  
  &::before {
    content: '•';
    position: absolute;
    left: 0;
    color: #3f51b5;
  }
`;

/**
 * Component for displaying driver performance data
 * @param {Object} props - Component props
 * @param {Object} props.performanceData - Driver performance data
 * @param {boolean} props.isLoading - Loading state
 * @returns {JSX.Element} DriverPerformance component
 */
const DriverPerformance = ({ performanceData, isLoading }) => {
  const [activeTab, setActiveTab] = React.useState('overview');
  
  if (isLoading) {
    return <LoadingIndicator>Ładowanie danych wydajności kierowcy...</LoadingIndicator>;
  }
  
  if (!performanceData) {
    return <div>Brak danych wydajności.</div>;
  }
  
  // Render radar chart for driving style
  const renderDrivingStyleChart = () => {
    if (!performanceData.drivingStyle || performanceData.drivingStyle.length === 0) {
      return <div>Brak danych stylu jazdy.</div>;
    }
    
    const categories = performanceData.drivingStyle;
    
    const data = {
      labels: categories.map(cat => cat.category),
      datasets: [
        {
          label: 'Styl jazdy',
          data: categories.map(cat => cat.value),
          backgroundColor: 'rgba(63, 81, 181, 0.2)',
          borderColor: categories.map(cat => cat.color || '#3f51b5'),
          borderWidth: 2,
          pointBackgroundColor: categories.map(cat => cat.color || '#3f51b5'),
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: categories.map(cat => cat.color || '#3f51b5'),
          pointRadius: 4,
          pointHoverRadius: 6
        }
      ]
    };
    
    const options = {
      scales: {
        r: {
          angleLines: {
            display: true,
            color: 'rgba(0, 0, 0, 0.1)'
          },
          suggestedMin: 0,
          suggestedMax: 100,
          ticks: {
            stepSize: 20,
            backdropColor: 'transparent'
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.1)'
          },
          pointLabels: {
            font: {
              size: 12
            },
            color: '#666'
          }
        }
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          titleFont: {
            size: 14
          },
          bodyFont: {
            size: 13
          },
          callbacks: {
            label: function(context) {
              return `Wynik: ${context.raw}/100`;
            }
          }
        }
      },
      maintainAspectRatio: false,
      responsive: true
    };
    
    return (
      <ChartContainer>
        <ChartTitle>Analiza stylu jazdy</ChartTitle>
        <ChartContent>
          <Radar data={data} options={options} />
        </ChartContent>
      </ChartContainer>
    );
  };
  
  // Render line chart for history data
  const renderHistoryLineChart = (data, title, unit) => {
    if (!data || !data.history || data.history.length === 0) {
      return <div>Brak danych historycznych.</div>;
    }
    
    const chartData = {
      labels: data.history.map(item => item.month),
      datasets: [
        {
          label: title,
          data: data.history.map(item => item.value),
          fill: true,
          backgroundColor: data.chartColors?.background || 'rgba(63, 81, 181, 0.2)',
          borderColor: data.chartColors?.border || '#3f51b5',
          borderWidth: 2,
          tension: 0.4,
          pointBackgroundColor: data.chartColors?.primary || '#3f51b5',
          pointBorderColor: '#fff',
          pointRadius: 4,
          pointHoverRadius: 6
        }
      ]
    };
    
    const options = {
      scales: {
        y: {
          beginAtZero: false,
          grid: {
            color: 'rgba(0, 0, 0, 0.05)'
          },
          ticks: {
            callback: function(value) {
              return value + (unit || '');
            }
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          titleFont: {
            size: 14
          },
          bodyFont: {
            size: 13
          },
          callbacks: {
            label: function(context) {
              return `${context.dataset.label}: ${context.raw}${unit || ''}`;
            }
          }
        }
      },
      maintainAspectRatio: false,
      responsive: true
    };
    
    return (
      <ChartContainer>
        <ChartTitle>{title}</ChartTitle>
        <ChartContent>
          <Line data={chartData} options={options} />
        </ChartContent>
      </ChartContainer>
    );
  };
  
  // Render bar chart for history data
  const renderHistoryBarChart = (data, title, unit) => {
    if (!data || !data.history || data.history.length === 0) {
      return <div>Brak danych historycznych.</div>;
    }
    
    const chartData = {
      labels: data.history.map(item => item.month),
      datasets: [
        {
          label: title,
          data: data.history.map(item => item.value),
          backgroundColor: data.chartColors?.background || 'rgba(63, 81, 181, 0.7)',
          borderColor: data.chartColors?.border || '#3f51b5',
          borderWidth: 1,
          borderRadius: 4,
          hoverBackgroundColor: data.chartColors?.primary || '#3f51b5'
        }
      ]
    };
    
    const options = {
      scales: {
        y: {
          beginAtZero: false,
          grid: {
            color: 'rgba(0, 0, 0, 0.05)'
          },
          ticks: {
            callback: function(value) {
              return value + (unit || '');
            }
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          titleFont: {
            size: 14
          },
          bodyFont: {
            size: 13
          },
          callbacks: {
            label: function(context) {
              return `${context.dataset.label}: ${context.raw}${unit || ''}`;
            }
          }
        }
      },
      maintainAspectRatio: false,
      responsive: true
    };
    
    return (
      <ChartContainer>
        <ChartTitle>{title}</ChartTitle>
        <ChartContent>
          <Bar data={chartData} options={options} />
        </ChartContent>
      </ChartContainer>
    );
  };
  
  // Render recommendations
  const renderRecommendations = () => {
    if (!performanceData.recommendations || performanceData.recommendations.length === 0) {
      return null;
    }
    
    return (
      <RecommendationContainer>
        <RecommendationTitle>Rekomendacje poprawy wydajności</RecommendationTitle>
        {performanceData.recommendations.map((rec, index) => (
          <RecommendationItem key={index}>
            <strong>{rec.category}:</strong> {rec.recommendation}
          </RecommendationItem>
        ))}
      </RecommendationContainer>
    );
  };
  
  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <>
            <GridSection columns={4}>
              <MetricCard>
                <MetricTitle>Ogólna ocena</MetricTitle>
                <MetricValue>{performanceData.overallScore}%</MetricValue>
                <MetricProgress>
                  <MetricProgressFill percentage={performanceData.overallScore} />
                </MetricProgress>
              </MetricCard>
              
              <MetricCard>
                <MetricTitle>Przejechane kilometry</MetricTitle>
                <MetricValue>
                  {performanceData.mileage?.current?.value || 0} 
                  <span style={{ fontSize: '14px', marginLeft: '4px', color: '#666' }}>
                    / {performanceData.mileage?.current?.target || 0} km
                  </span>
                </MetricValue>
                <MetricProgress>
                  <MetricProgressFill 
                    percentage={
                      performanceData.mileage?.current?.target 
                        ? (performanceData.mileage.current.value / performanceData.mileage.current.target) * 100 
                        : 0
                    } 
                  />
                </MetricProgress>
              </MetricCard>
              
              <MetricCard>
                <MetricTitle>Zużycie paliwa</MetricTitle>
                <MetricValue>
                  {performanceData.fuelConsumption?.current?.value || 0}
                  <span style={{ fontSize: '14px', marginLeft: '4px', color: '#666' }}>
                    l/100km
                  </span>
                </MetricValue>
                <MetricProgress>
                  <MetricProgressFill 
                    percentage={
                      performanceData.fuelConsumption?.current?.target 
                        ? 100 - ((performanceData.fuelConsumption.current.value / performanceData.fuelConsumption.current.target) * 100) 
                        : 0
                    } 
                  />
                </MetricProgress>
              </MetricCard>
              
              <MetricCard>
                <MetricTitle>Terminowość dostaw</MetricTitle>
                <MetricValue>
                  {performanceData.deliveryTimes?.current?.value || 0}%
                </MetricValue>
                <MetricProgress>
                  <MetricProgressFill 
                    percentage={performanceData.deliveryTimes?.current?.value || 0} 
                  />
                </MetricProgress>
              </MetricCard>
            </GridSection>
            
            <GridSection>
              {renderDrivingStyleChart()}
              {renderHistoryLineChart(
                performanceData.mileage, 
                'Historia przejechanych kilometrów', 
                ' km'
              )}
            </GridSection>
            
            {renderRecommendations()}
          </>
        );
      case 'mileage':
        return renderHistoryBarChart(
          performanceData.mileage, 
          'Historia przejechanych kilometrów', 
          ' km'
        );
      case 'fuel':
        return renderHistoryLineChart(
          performanceData.fuelConsumption, 
          'Historia zużycia paliwa', 
          ' l/100km'
        );
      case 'delivery':
        return renderHistoryBarChart(
          performanceData.deliveryTimes, 
          'Historia terminowości dostaw', 
          '%'
        );
      case 'style':
        return (
          <>
            {renderDrivingStyleChart()}
            {renderRecommendations()}
          </>
        );
      case 'ratings':
        return renderHistoryLineChart(
          performanceData.ratings, 
          'Historia ocen', 
          ''
        );
      default:
        return null;
    }
  };
  
  return (
    <Card>
      <SectionTitle>Wydajność kierowcy</SectionTitle>
      
      <TabsContainer>
        <Tab 
          active={activeTab === 'overview'} 
          onClick={() => setActiveTab('overview')}
        >
          Przegląd
        </Tab>
        <Tab 
          active={activeTab === 'mileage'} 
          onClick={() => setActiveTab('mileage')}
        >
          Przejechane kilometry
        </Tab>
        <Tab 
          active={activeTab === 'fuel'} 
          onClick={() => setActiveTab('fuel')}
        >
          Zużycie paliwa
        </Tab>
        <Tab 
          active={activeTab === 'delivery'} 
          onClick={() => setActiveTab('delivery')}
        >
          Terminowość dostaw
        </Tab>
        <Tab 
          active={activeTab === 'style'} 
          onClick={() => setActiveTab('style')}
        >
          Styl jazdy
        </Tab>
        <Tab 
          active={activeTab === 'ratings'} 
          onClick={() => setActiveTab('ratings')}
        >
          Oceny
        </Tab>
      </TabsContainer>
      
      {renderContent()}
    </Card>
  );
};

export default DriverPerformance;
