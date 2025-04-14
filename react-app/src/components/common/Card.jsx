import React from 'react';
import styled from 'styled-components';

/**
 * @typedef {Object} CardProps
 * @property {string} [title] - Optional title for the card
 * @property {boolean} [fullWidth] - Whether the card should take full width
 * @property {React.ReactNode} children - Child components to render inside the card
 */

const CardContainer = styled.div`
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

/**
 * Card component for displaying content in a contained box
 * @param {CardProps} props - Component props
 * @returns {JSX.Element} Card component
 */
const Card = ({ title, fullWidth, children }) => {
  return (
    <CardContainer fullWidth={fullWidth}>
      {title && <CardTitle>{title}</CardTitle>}
      <CardContent>{children}</CardContent>
    </CardContainer>
  );
};

export default Card;
