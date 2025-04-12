import React from 'react';
import styled from 'styled-components';

interface CardProps {
  title?: string;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const CardContainer = styled.div<{ fullWidth?: boolean }>`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: ${props => props.fullWidth ? '100%' : 'auto'};
`;

const CardTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid #f0f0f0;
`;

const CardContent = styled.div`
  flex: 1;
`;

const Card: React.FC<CardProps> = ({ title, fullWidth, children }) => {
  return (
    <CardContainer fullWidth={fullWidth}>
      {title && <CardTitle>{title}</CardTitle>}
      <CardContent>{children}</CardContent>
    </CardContainer>
  );
};

export default Card;
