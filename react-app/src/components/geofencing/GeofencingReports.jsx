import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Card from '../common/Card';
import Table from '../common/Table';
import * as geofencingService from '../../services/api/mockGeofencingService';

const ReportsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ReportTypeSelector = styled.div`
  display: flex;
  gap: 16px;
  
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const ReportTypeButton = styled.button`
  flex: 1;
  padding: 12px 16px;
  background-color: ${props => props.active ? '#3f51b5' : '#f5f5f5'};
  color: ${props => props.active ? 'white' : '#666'};
  border: 1px solid ${props => props.active ? '#3f51b5' : '#ddd'};
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background-color: ${props => props.active ? '#303f9f' : '#e0e0e0'};
  }
`;

const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  min-width: 200px;
  
  @media (max-width: 768px) {
    min-width: 100%;
  }
  
  label {
    font-size: 14px;
    color: #666;
  }
  
  select, input {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    
    &:focus {
      outline: none;
      border-color: #3f51b5;
    }
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 20px;
  
  button {
    padding: 8px 16px;
    background-color: ${props => props.disabled ? '#f5f5f5' : '#3f51b5'};
    color: ${props => props.disabled ? '#999' : 'white'};
    border: none;
    border-radius: 4px;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    transition: background-color 0.3s;
    
    &:hover:not(:disabled) {
      background-color: #303f9f;
    }
    
    &:disabled {
      opacity: 0.7;
    }
  }
  
  span {
    color: #666;
  }
`;

const ExportButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const ExportButton = styled.button`
  flex: 1;
  padding: 12px 16px;
  background-color: #3f51b5;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover:not(:disabled) {
    background-color: #303f9f;
  }
  
  &:disabled {
    background-color: #f5f5f5;
    color: #999;
    cursor: not-allowed;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #666;
  font-size: 16px;
`;

const ErrorMessage = styled.div`
  color: #d32f2f;
  padding: 16px;
  background-color: #ffebee;
  border-radius: 8px;
  margin-bottom: 20px;
`;

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
    <ReportsContainer>
      {/* Report Type Selector */}
      <Card>
        <ReportTypeSelector>
          <ReportTypeButton 
            active={activeReportType === 'violations'}
            onClick={() => handleReportTypeChange('violations')}
          >
            Violations Report
          </ReportTypeButton>
          <ReportTypeButton 
            active={activeReportType === 'timeInZone'}
            onClick={() => handleReportTypeChange('timeInZone')}
          >
            Time in Zone Report
          </ReportTypeButton>
        </ReportTypeSelector>
      </Card>
      
      {/* Filters */}
      <Card title="Report Filters">
        <FiltersContainer>
          <FilterGroup>
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
          </FilterGroup>
          
          <FilterGroup>
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
          </FilterGroup>
          
          <FilterGroup>
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
          </FilterGroup>
          
          <FilterGroup>
            <label htmlFor="date-from">Date From:</label>
            <input 
              type="date" 
              id="date-from" 
              value={filters.dateFrom} 
              onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
            />
          </FilterGroup>
          
          <FilterGroup>
            <label htmlFor="date-to">Date To:</label>
            <input 
              type="date" 
              id="date-to" 
              value={filters.dateTo} 
              onChange={(e) => handleFilterChange('dateTo', e.target.value)}
            />
          </FilterGroup>
          
          {activeReportType === 'timeInZone' && (
            <FilterGroup>
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
            </FilterGroup>
          )}
        </FiltersContainer>
      </Card>
      
      {/* Report Data */}
      <Card 
        title={activeReportType === 'violations' ? 'Violations Report' : 'Time in Zone Report'}
      >
        {isLoading ? (
          <LoadingContainer>Loading report data...</LoadingContainer>
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
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
            <Pagination>
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
            </Pagination>
          </>
        ) : (
          <p>No report data available for the selected filters.</p>
        )}
      </Card>
      
      {/* Export Options */}
      <Card title="Export Options">
        <ExportButtons>
          <ExportButton 
            onClick={() => handleExportReport('pdf')}
            disabled={isLoading || !reportData || !reportData.items || reportData.items.length === 0}
          >
            Export as PDF
          </ExportButton>
          <ExportButton 
            onClick={() => handleExportReport('csv')}
            disabled={isLoading || !reportData || !reportData.items || reportData.items.length === 0}
          >
            Export as CSV
          </ExportButton>
          <ExportButton 
            onClick={() => handleExportReport('xlsx')}
            disabled={isLoading || !reportData || !reportData.items || reportData.items.length === 0}
          >
            Export as Excel
          </ExportButton>
        </ExportButtons>
      </Card>
    </ReportsContainer>
  );
};

export default GeofencingReports;
