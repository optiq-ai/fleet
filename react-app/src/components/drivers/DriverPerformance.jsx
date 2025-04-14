import React from 'react';
import styled from 'styled-components';
import Card from '../common/Card';

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
`;

const ChartTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-bottom: 16px;
`;

const ChartBars = styled.div`
  display: flex;
  height: 220px;
  align-items: flex-end;
  justify-content: space-around;
  padding: 0 16px;
`;

const ChartBar = styled.div`
  width: 40px;
  height: ${props => props.height}%;
  background-color: #3f51b5;
  border-radius: 4px 4px 0 0;
  position: relative;
  transition: height 0.3s ease;
  
  &:hover {
    background-color: #303f9f;
  }
`;

const ChartBarLabel = styled.div`
  position: absolute;
  bottom: -24px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  color: #666;
  white-space: nowrap;
`;

const ChartBarValue = styled.div`
  position: absolute;
  top: -24px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  color: #333;
  font-weight: 500;
`;

const ChartAxis = styled.div`
  position: absolute;
  left: 0;
  bottom: 40px;
  width: 100%;
  height: 1px;
  background-color: #e0e0e0;
`;

const RadarChartContainer = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  margin: 0 auto;
`;

const RadarChartBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #f5f5f5;
  z-index: 1;
`;

const RadarChartAxis = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 1px;
  background-color: #e0e0e0;
  transform-origin: left center;
  transform: rotate(${props => props.angle}deg);
  z-index: 2;
`;

const RadarChartCircle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: ${props => props.size}%;
  height: ${props => props.size}%;
  border-radius: 50%;
  border: 1px dashed #e0e0e0;
  transform: translate(-50%, -50%);
  z-index: 2;
`;

const RadarChartPoint = styled.div`
  position: absolute;
  top: ${props => 50 + props.y * props.value / 100}%;
  left: ${props => 50 + props.x * props.value / 100}%;
  width: 8px;
  height: 8px;
  background-color: #3f51b5;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  z-index: 4;
`;

const RadarChartPolygon = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
  
  & > svg {
    width: 100%;
    height: 100%;
    
    & > polygon {
      fill: rgba(63, 81, 181, 0.2);
      stroke: #3f51b5;
      stroke-width: 2;
    }
  }
`;

const RadarChartLabel = styled.div`
  position: absolute;
  top: ${props => props.y}%;
  left: ${props => props.x}%;
  transform: translate(-50%, -50%);
  font-size: 12px;
  color: #666;
  z-index: 5;
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
    const numCategories = categories.length;
    const angleStep = 360 / numCategories;
    
    // Calculate polygon points
    const points = categories.map((category, index) => {
      const angle = (index * angleStep - 90) * Math.PI / 180;
      const value = category.value / 100;
      const x = 50 + 40 * value * Math.cos(angle);
      const y = 50 + 40 * value * Math.sin(angle);
      return `${x},${y}`;
    }).join(' ');
    
    return (
      <ChartContainer>
        <ChartTitle>Analiza stylu jazdy</ChartTitle>
        <RadarChartContainer>
          <RadarChartBackground />
          
          {/* Circles */}
          <RadarChartCircle size={20} />
          <RadarChartCircle size={40} />
          <RadarChartCircle size={60} />
          <RadarChartCircle size={80} />
          
          {/* Axes */}
          {categories.map((_, index) => (
            <RadarChartAxis 
              key={index} 
              angle={index * angleStep} 
            />
          ))}
          
          {/* Labels */}
          {categories.map((category, index) => {
            const angle = (index * angleStep - 90) * Math.PI / 180;
            const x = 50 + 48 * Math.cos(angle);
            const y = 50 + 48 * Math.sin(angle);
            
            return (
              <RadarChartLabel 
                key={index} 
                x={x} 
                y={y}
              >
                {category.category}
              </RadarChartLabel>
            );
          })}
          
          {/* Points */}
          {categories.map((category, index) => {
            const angle = (index * angleStep - 90) * Math.PI / 180;
            const x = 40 * Math.cos(angle);
            const y = 40 * Math.sin(angle);
            
            return (
              <RadarChartPoint 
                key={index} 
                x={x} 
                y={y} 
                value={category.value} 
              />
            );
          })}
          
          {/* Polygon */}
          <RadarChartPolygon>
            <svg>
              <polygon points={points} />
            </svg>
          </RadarChartPolygon>
        </RadarChartContainer>
      </ChartContainer>
    );
  };
  
  // Render bar chart for history data
  const renderHistoryChart = (data, title, unit) => {
    if (!data || !data.history || data.history.length === 0) {
      return <div>Brak danych historycznych.</div>;
    }
    
    const maxValue = Math.max(...data.history.map(item => item.value)) * 1.2;
    
    return (
      <ChartContainer>
        <ChartTitle>{title}</ChartTitle>
        <ChartBars>
          {data.history.map((item, index) => {
            const height = (item.value / maxValue) * 100;
            
            return (
              <ChartBar key={index} height={height}>
                <ChartBarValue>{item.value}{unit}</ChartBarValue>
                <ChartBarLabel>{item.month}</ChartBarLabel>
              </ChartBar>
            );
          })}
        </ChartBars>
        <ChartAxis />
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
              {renderHistoryChart(
                performanceData.mileage, 
                'Historia przejechanych kilometrów', 
                ' km'
              )}
            </GridSection>
            
            {renderRecommendations()}
          </>
        );
      case 'mileage':
        return renderHistoryChart(
          performanceData.mileage, 
          'Historia przejechanych kilometrów', 
          ' km'
        );
      case 'fuel':
        return renderHistoryChart(
          performanceData.fuelConsumption, 
          'Historia zużycia paliwa', 
          ' l/100km'
        );
      case 'delivery':
        return renderHistoryChart(
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
        return renderHistoryChart(
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
