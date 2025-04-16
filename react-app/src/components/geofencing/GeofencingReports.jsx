import React, { useState, useEffect, useCallback } from 'react';
import Card from '../common/Card';
import Table from '../common/Table';
import * as geofencingService from '../../services/api/mockGeofencingService';

/**
 * GeofencingReports Component
 * 
 * Component for generating and viewing reports related to geofencing data.
 */
const GeofencingReports = () => {
  const [activeReportType, setActiveReportType] = useState('violations');
  const [reportData, setReportData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    geofenceId: '',
    vehicleId: '',
    driverId: '',
    dateFrom: '',
    dateTo: '',
    groupBy: 'vehicle',
    page: 1,
    limit: 10
  });
  const [geofences, setGeofences] = useState([]);
  const [vehicles] = useState([
    { id: 'veh-001', plate: 'WA 12345' },
    { id: 'veh-002', plate: 'WA 54321' },
    { id: 'veh-003', plate: 'WA 98765' }
  ]);
  const [drivers] = useState([
    { id: 'drv-001', name: 'Adam Nowak' },
    { id: 'drv-002', name: 'Piotr Kowalski' },
    { id: 'drv-003', name: 'Katarzyna Wiśniewska' }
  ]);

  const loadReportData = useCallback(async () => {
    try {
      setIsLoading(true);
      let data;
      
      if (activeReportType === 'violations') {
        data = await geofencingService.getGeofenceViolations(filters);
      } else if (activeReportType === 'timeInZone') {
        data = await geofencingService.getTimeInZoneReport(filters);
      }
      
      setReportData(data);
      setError(null);
    } catch (err) {
      console.error(`Error fetching ${activeReportType} report:`, err);
      setError(`Failed to load ${activeReportType} report. Please try again later.`);
    } finally {
      setIsLoading(false);
    }
  }, [activeReportType, filters]);

  const loadGeofences = useCallback(async () => {
    try {
      const data = await geofencingService.getGeofences({ limit: 100 });
      setGeofences(data.items);
    } catch (err) {
      console.error('Error fetching geofences:', err);
    }
  }, []);

  useEffect(() => {
    loadReportData();
    loadGeofences();
  }, [loadReportData, loadGeofences]);

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value,
      page: name !== 'page' ? 1 : value
    }));
  };

  const handleReportTypeChange = (type) => {
    setActiveReportType(type);
  };

  const handleExportReport = async (format) => {
    try {
      setIsLoading(true);
      const result = await geofencingService.exportGeofencingReport({
        reportType: activeReportType,
        dateFrom: filters.dateFrom,
        dateTo: filters.dateTo,
        format
      });
      
      // In a real implementation, this would trigger a file download
      // For this mock, we'll just show a success message
      alert(`Report exported successfully. Download URL: ${result.downloadUrl}`);
      
      setError(null);
    } catch (err) {
      console.error(`Error exporting ${activeReportType} report:`, err);
      setError(`Failed to export ${activeReportType} report. Please try again later.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="geofencing-reports">
      {/* Report Type Selector */}
      <Card className="report-type-selector-card">
        <div className="report-type-selector">
          <button 
            className={`report-type-button ${activeReportType === 'violations' ? 'active' : ''}`}
            onClick={() => handleReportTypeChange('violations')}
          >
            Violations Report
          </button>
          <button 
            className={`report-type-button ${activeReportType === 'timeInZone' ? 'active' : ''}`}
            onClick={() => handleReportTypeChange('timeInZone')}
          >
            Time in Zone Report
          </button>
        </div>
      </Card>
      
      {/* Filters */}
      <Card title="Report Filters" className="filters-card">
        <div className="filters-container">
          <div className="filter-group">
            <label htmlFor="geofence-filter">Geofence:</label>
            <select 
              id="geofence-filter" 
              value={filters.geofenceId} 
              onChange={(e) => handleFilterChange('geofenceId', e.target.value)}
            >
              <option value="">All Geofences</option>
              {geofences.map(geofence => (
                <option key={geofence.id} value={geofence.id}>{geofence.name}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label htmlFor="vehicle-filter">Vehicle:</label>
            <select 
              id="vehicle-filter" 
              value={filters.vehicleId} 
              onChange={(e) => handleFilterChange('vehicleId', e.target.value)}
            >
              <option value="">All Vehicles</option>
              {vehicles.map(vehicle => (
                <option key={vehicle.id} value={vehicle.id}>{vehicle.plate}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label htmlFor="driver-filter">Driver:</label>
            <select 
              id="driver-filter" 
              value={filters.driverId} 
              onChange={(e) => handleFilterChange('driverId', e.target.value)}
            >
              <option value="">All Drivers</option>
              {drivers.map(driver => (
                <option key={driver.id} value={driver.id}>{driver.name}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label htmlFor="date-from">Date From:</label>
            <input 
              type="date" 
              id="date-from" 
              value={filters.dateFrom} 
              onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
            />
          </div>
          
          <div className="filter-group">
            <label htmlFor="date-to">Date To:</label>
            <input 
              type="date" 
              id="date-to" 
              value={filters.dateTo} 
              onChange={(e) => handleFilterChange('dateTo', e.target.value)}
            />
          </div>
          
          {activeReportType === 'timeInZone' && (
            <div className="filter-group">
              <label htmlFor="group-by">Group By:</label>
              <select 
                id="group-by" 
                value={filters.groupBy} 
                onChange={(e) => handleFilterChange('groupBy', e.target.value)}
              >
                <option value="vehicle">Vehicle</option>
                <option value="driver">Driver</option>
                <option value="geofence">Geofence</option>
                <option value="day">Day</option>
                <option value="week">Week</option>
                <option value="month">Month</option>
              </select>
            </div>
          )}
        </div>
      </Card>
      
      {/* Report Data */}
      <Card 
        title={activeReportType === 'violations' ? 'Violations Report' : 'Time in Zone Report'} 
        className="report-data-card"
      >
        {isLoading ? (
          <div className="loading">Loading report data...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : reportData && reportData.items && reportData.items.length > 0 ? (
          <>
            {activeReportType === 'violations' && (
              <Table
                headers={['Date', 'Geofence', 'Vehicle', 'Driver', 'Type', 'Time']}
                data={reportData.items.map(item => [
                  new Date(item.timestamp).toLocaleDateString(),
                  item.geofenceName,
                  item.vehiclePlate,
                  item.driverName,
                  item.type,
                  new Date(item.timestamp).toLocaleTimeString()
                ])}
              />
            )}
            
            {activeReportType === 'timeInZone' && (
              <Table
                headers={['Geofence', 'Vehicle', 'Driver', 'Date', 'Entries', 'Total Time', 'Avg Time']}
                data={reportData.items.map(item => [
                  item.geofenceName,
                  item.vehiclePlate,
                  item.driverName,
                  item.date,
                  item.entries,
                  `${Math.floor(item.totalTimeInZone / 60)} min`,
                  `${Math.floor(item.averageTimePerVisit / 60)} min`
                ])}
              />
            )}
            
            {/* Pagination */}
            <div className="pagination">
              <button 
                disabled={filters.page === 1}
                onClick={() => handleFilterChange('page', filters.page - 1)}
              >
                Previous
              </button>
              <span>Page {filters.page} of {reportData.totalPages}</span>
              <button 
                disabled={filters.page === reportData.totalPages}
                onClick={() => handleFilterChange('page', filters.page + 1)}
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <p>No report data available for the selected filters.</p>
        )}
      </Card>
      
      {/* Export Options */}
      <Card title="Export Options" className="export-options-card">
        <div className="export-buttons">
          <button 
            className="export-button"
            onClick={() => handleExportReport('pdf')}
            disabled={isLoading || !reportData || !reportData.items || reportData.items.length === 0}
          >
            Export as PDF
          </button>
          <button 
            className="export-button"
            onClick={() => handleExportReport('csv')}
            disabled={isLoading || !reportData || !reportData.items || reportData.items.length === 0}
          >
            Export as CSV
          </button>
          <button 
            className="export-button"
            onClick={() => handleExportReport('xlsx')}
            disabled={isLoading || !reportData || !reportData.items || reportData.items.length === 0}
          >
            Export as Excel
          </button>
        </div>
      </Card>
    </div>
  );
};

export default GeofencingReports;
