import React, { useState } from 'react';
import './StatisticsTable.css';

/**
 * StatisticsTable component displays tabular data with sorting and pagination
 * 
 * @param {Object} props - Component props
 * @param {Array} props.data - Table data
 * @param {Array} props.columns - Table columns configuration
 * @param {number} props.pageSize - Number of items per page
 * @param {Function} props.onSort - Callback when sorting changes
 * @param {Function} props.onPageChange - Callback when page changes
 * @returns {JSX.Element} StatisticsTable component
 */
const StatisticsTable = ({ 
  data = [], 
  columns = [], 
  pageSize = 10,
  onSort,
  onPageChange
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  
  /**
   * Handle column header click for sorting
   * @param {string} columnId - Column ID to sort by
   */
  const handleSort = (columnId) => {
    if (sortColumn === columnId) {
      // Toggle sort direction
      const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
      setSortDirection(newDirection);
      if (onSort) onSort(columnId, newDirection);
    } else {
      // Set new sort column
      setSortColumn(columnId);
      setSortDirection('asc');
      if (onSort) onSort(columnId, 'asc');
    }
  };
  
  /**
   * Get sort icon based on current sort state
   * @param {string} columnId - Column ID
   * @returns {string} Sort icon
   */
  const getSortIcon = (columnId) => {
    if (sortColumn !== columnId) return '';
    return sortDirection === 'asc' ? '↑' : '↓';
  };
  
  /**
   * Handle page change
   * @param {number} page - Page number to change to
   */
  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (onPageChange) onPageChange(page);
  };
  
  // Calculate pagination
  const totalPages = Math.ceil(data.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, data.length);
  const currentData = data.slice(startIndex, endIndex);
  
  return (
    <div>
      <div className="statistics-table-container">
        <table className="statistics-table">
          <thead>
            <tr>
              {columns.map(column => (
                <th 
                  key={column.id}
                  className={column.sortable ? 'sortable' : ''}
                  onClick={column.sortable ? () => handleSort(column.id) : undefined}
                >
                  {column.name}
                  {column.sortable && (
                    <span className="sort-icon">{getSortIcon(column.id)}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentData.length > 0 ? (
              currentData.map((row, index) => (
                <tr key={row.id || index}>
                  {columns.map(column => (
                    <td key={column.id}>
                      {column.render ? column.render(row) : row[column.id]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} style={{ textAlign: 'center' }}>
                  Brak danych do wyświetlenia
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {data.length > pageSize && (
        <div className="statistics-table-pagination">
          <div className="pagination-info">
            Wyświetlanie {startIndex + 1}-{endIndex} z {data.length} wyników
          </div>
          <div className="pagination-controls">
            <button 
              className="pagination-button"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(1)}
            >
              &laquo;
            </button>
            <button 
              className="pagination-button"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              &lsaquo;
            </button>
            <span className="pagination-current">{currentPage} / {totalPages}</span>
            <button 
              className="pagination-button"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              &rsaquo;
            </button>
            <button 
              className="pagination-button"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(totalPages)}
            >
              &raquo;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatisticsTable;
