import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

/**
 * @typedef {Object} KPICardProps
 * @property {string} title - Title of the KPI card
 * @property {string|number} value - Value to display
 * @property {string} [icon] - Optional icon
 * @property {'up'|'down'|'neutral'} [trend] - Direction of trend
 * @property {string} [trendValue] - Value of the trend
 * @property {boolean} [isLoading] - Whether the card is in loading state
 */

const CardContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
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

const TrendContainer = styled.div`
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

const LoadingPlaceholder = styled.div`
  height: 24px;
  background-color: #f0f0f0;
  border-radius: 4px;
  margin-bottom: 8px;
  animation: pulse 1.5s infinite;
  
  @keyframes pulse {
    0% {
      opacity: 0.6;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.6;
    }
  }
`;

/**
 * KPI Card component for displaying key performance indicators
 * @param {KPICardProps} props - Component props
 * @returns {JSX.Element} KPI Card component
 */
const KPICard = ({ 
  title, 
  value, 
  trend, 
  trendValue,
  isLoading = false 
}) => {
  // Animacja wartości
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    if (isLoading) return;
    
    if (typeof value === 'number') {
      // Animacja dla wartości liczbowych
      const duration = 1000; // ms
      const steps = 20;
      const stepValue = value / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += stepValue;
        if (current >= value) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(current));
        }
      }, duration / steps);
      
      return () => clearInterval(timer);
    } else {
      // Dla wartości tekstowych - bez animacji
      setDisplayValue(value);
    }
  }, [value, isLoading]);
  
  return (
    <CardContainer>
      <CardTitle>{title}</CardTitle>
      {isLoading ? (
        <LoadingPlaceholder />
      ) : (
        <CardValue>{displayValue}</CardValue>
      )}
      {trend && trendValue && !isLoading && (
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
