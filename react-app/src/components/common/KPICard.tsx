import React from 'react';
import styled from 'styled-components';

interface KPICardProps {
  title: string;
  value: string | number;
  icon?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

const CardContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const CardTitle = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
`;

const CardValue = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
`;

const TrendContainer = styled.div<{ trend?: 'up' | 'down' | 'neutral' }>`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: ${props => 
    props.trend === 'up' ? '#4caf50' : 
    props.trend === 'down' ? '#f44336' : 
    '#757575'
  };
`;

const TrendIcon = styled.span`
  margin-right: 4px;
`;

const KPICard: React.FC<KPICardProps> = ({ title, value, trend, trendValue }) => {
  return (
    <CardContainer>
      <CardTitle>{title}</CardTitle>
      <CardValue>{value}</CardValue>
      {trend && trendValue && (
        <TrendContainer trend={trend}>
          <TrendIcon>
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'}
          </TrendIcon>
          {trendValue}
        </TrendContainer>
      )}
    </CardContainer>
  );
};

export default KPICard;
