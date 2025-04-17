import React from 'react';
import './StatisticsExport.css';

/**
 * StatisticsExport component provides export functionality for statistics data
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onExport - Callback when export button is clicked
 * @param {Array} props.formats - Available export formats
 * @returns {JSX.Element} StatisticsExport component
 */
const StatisticsExport = ({ onExport, formats = ['csv', 'pdf', 'excel'] }) => {
  /**
   * Handle export button click
   * @param {string} format - Export format
   */
  const handleExport = (format) => {
    if (onExport) {
      onExport(format);
    }
  };
  
  /**
   * Get icon for export format
   * @param {string} format - Export format
   * @returns {string} Icon character
   */
  const getFormatIcon = (format) => {
    switch (format) {
      case 'csv':
        return '📊';
      case 'pdf':
        return '📄';
      case 'excel':
        return '📑';
      default:
        return '📁';
    }
  };
  
  return (
    <div className="statistics-export">
      <span className="export-label">Eksportuj dane:</span>
      <div className="export-buttons">
        {formats.includes('csv') && (
          <button 
            className="export-button export-csv"
            onClick={() => handleExport('csv')}
          >
            <span className="export-icon">{getFormatIcon('csv')}</span>
            CSV
          </button>
        )}
        {formats.includes('pdf') && (
          <button 
            className="export-button export-pdf"
            onClick={() => handleExport('pdf')}
          >
            <span className="export-icon">{getFormatIcon('pdf')}</span>
            PDF
          </button>
        )}
        {formats.includes('excel') && (
          <button 
            className="export-button export-excel"
            onClick={() => handleExport('excel')}
          >
            <span className="export-icon">{getFormatIcon('excel')}</span>
            Excel
          </button>
        )}
      </div>
    </div>
  );
};

export default StatisticsExport;
