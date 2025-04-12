import React from 'react';
import styled from 'styled-components';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  fullWidth?: boolean;
}

const CardContainer = styled.div<{ fullWidth?: boolean }>`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin-bottom: 20px;
  width: ${props => props.fullWidth ? '100%' : 'auto'};
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const CardTitle = styled.h2`
  font-size: 18px;
  font-weight: 500;
  color: #333;
  margin: 0;
`;

const CardContent = styled.div`
  width: 100%;
`;

const Card: React.FC<CardProps> = ({ title, children, fullWidth }) => {
  return (
    <CardContainer fullWidth={fullWidth}>
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent>{children}</CardContent>
    </CardContainer>
  );
};

export default Card;
