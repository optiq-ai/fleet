import React from 'react';
import styled from 'styled-components';

interface TableProps {
  headers: string[];
  data: any[][];
  onRowClick?: (index: number) => void;
}

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
  cursor: pointer;
  &:hover {
    background-color: #f5f7fa;
  }
`;

const TableCell = styled.td`
  padding: 12px 16px;
  border-bottom: 1px solid #e0e0e0;
`;

const Table: React.FC<TableProps> = ({ headers, data, onRowClick }) => {
  return (
    <TableContainer>
      <StyledTable>
        <TableHeader>
          <tr>
            {headers.map((header, index) => (
              <TableHeaderCell key={index}>{header}</TableHeaderCell>
            ))}
          </tr>
        </TableHeader>
        <tbody>
          {data.map((row, rowIndex) => (
            <TableRow 
              key={rowIndex} 
              onClick={() => onRowClick && onRowClick(rowIndex)}
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
