import React from 'react';
import styled from 'styled-components';

/**
 * @typedef {Object} TableProps
 * @property {string[]} headers - Column headers for the table
 * @property {Array} columns - Alternative way to specify columns with objects containing key and label
 * @property {any[][]} data - Table data as a 2D array
 * @property {function} [onRowClick] - Optional callback when a row is clicked
 * @property {boolean} [isLoading] - Whether the table is in loading state
 * @property {string} [emptyMessage] - Message to display when there's no data
 */

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  background-color: #f5f7fa;
`;

const TableHeaderCell = styled.th`
  padding: 12px 16px;
  text-align: left;
  font-weight: 500;
  color: #333;
  border-bottom: 1px solid #e0e0e0;
`;

const TableRow = styled.tr`
  cursor: ${props => props.clickable ? 'pointer' : 'default'};
  &:hover {
    background-color: ${props => props.clickable ? '#f5f7fa' : 'transparent'};
  }
`;

const TableCell = styled.td`
  padding: 12px 16px;
  border-bottom: 1px solid #e0e0e0;
`;

const LoadingRow = styled.tr`
  height: 200px;
`;

const LoadingCell = styled.td`
  text-align: center;
  color: #666;
`;

const EmptyRow = styled.tr`
  height: 100px;
`;

const EmptyCell = styled.td`
  text-align: center;
  color: #666;
`;

const LoadingPlaceholder = styled.div`
  height: 20px;
  background-color: #f0f0f0;
  border-radius: 4px;
  margin: 8px 0;
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
 * Table component for displaying tabular data
 * @param {TableProps} props - Component props
 * @returns {JSX.Element} Table component
 */
const Table = ({ 
  headers, 
  columns,
  data, 
  onRowClick, 
  isLoading = false,
  emptyMessage = "Brak danych do wyświetlenia"
}) => {
  // Handle both headers and columns props
  const tableHeaders = headers || (columns ? columns.map(col => col.label) : []);
  
  if (isLoading) {
    return (
      <TableContainer>
        <StyledTable>
          <TableHeader>
            <tr>
              {tableHeaders.map((header, index) => (
                <TableHeaderCell key={index}>{header}</TableHeaderCell>
              ))}
            </tr>
          </TableHeader>
          <tbody>
            <LoadingRow>
              <LoadingCell colSpan={tableHeaders.length}>
                <LoadingPlaceholder />
                <LoadingPlaceholder style={{ width: '80%' }} />
                <LoadingPlaceholder style={{ width: '60%' }} />
              </LoadingCell>
            </LoadingRow>
          </tbody>
        </StyledTable>
      </TableContainer>
    );
  }

  if (!data || data.length === 0) {
    return (
      <TableContainer>
        <StyledTable>
          <TableHeader>
            <tr>
              {tableHeaders.map((header, index) => (
                <TableHeaderCell key={index}>{header}</TableHeaderCell>
              ))}
            </tr>
          </TableHeader>
          <tbody>
            <EmptyRow>
              <EmptyCell colSpan={tableHeaders.length}>
                {emptyMessage}
              </EmptyCell>
            </EmptyRow>
          </tbody>
        </StyledTable>
      </TableContainer>
    );
  }

  return (
    <TableContainer>
      <StyledTable>
        <TableHeader>
          <tr>
            {tableHeaders.map((header, index) => (
              <TableHeaderCell key={index}>{header}</TableHeaderCell>
            ))}
          </tr>
        </TableHeader>
        <tbody>
          {data.map((row, rowIndex) => (
            <TableRow 
              key={rowIndex} 
              onClick={() => onRowClick && onRowClick(rowIndex)}
              clickable={!!onRowClick}
            >
              {row.map((cell, cellIndex) => (
                <TableCell key={cellIndex}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
};

export default Table;
