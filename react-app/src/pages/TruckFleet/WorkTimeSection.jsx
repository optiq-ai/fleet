import React, { useState, useEffect } from 'react';
import './WorkTimeTracking.css'; // We'll create this CSS file later if needed
import {
  WorkHoursDistributionChart,
  DrivingVsRestTimeChart,
  OvertimeHoursChart,
  ComplianceStatusChart
} from '../../components/charts/WorkTimeCharts'; // Import work time charts

// Mock data for driver work time
const mockWorkTimeRecords = [
  {
    id: 'WT001',
    driverId: 'DRV001',
    driverName: 'John Smith',
    date: '2025-04-25',
    startTime: '06:00',
    endTime: '14:30',
    breakTime: 45,
    drivingTime: 6.5,
    restTime: 1.5,
    otherWorkTime: 0.5,
    status: 'completed'
  },
  {
    id: 'WT002',
    driverId: 'DRV002',
    driverName: 'Jane Doe',
    date: '2025-04-25',
    startTime: '14:00',
    endTime: '22:00',
    breakTime: 60,
    drivingTime: 5.5,
    restTime: 1.0,
    otherWorkTime: 1.5,
    status: 'completed'
  },
  {
    id: 'WT003',
    driverId: 'DRV003',
    driverName: 'Peter Jones',
    date: '2025-04-26',
    startTime: '07:30',
    endTime: '16:00',
    breakTime: 45,
    drivingTime: 6.0,
    restTime: 1.25,
    otherWorkTime: 0.5,
    status: 'completed'
  },
  {
    id: 'WT004',
    driverId: 'DRV001',
    driverName: 'John Smith',
    date: '2025-04-26',
    startTime: '06:30',
    endTime: '15:00',
    breakTime: 45,
    drivingTime: 6.25,
    restTime: 1.5,
    otherWorkTime: 0.75,
    status: 'completed'
  },
  {
    id: 'WT005',
    driverId: 'DRV002',
    driverName: 'Jane Doe',
    date: '2025-04-26',
    startTime: '14:30',
    endTime: '22:30',
    breakTime: 60,
    drivingTime: 5.75,
    restTime: 1.0,
    otherWorkTime: 1.25,
    status: 'completed'
  },
  {
    id: 'WT006',
    driverId: 'DRV001',
    driverName: 'John Smith',
    date: '2025-04-27',
    startTime: '06:00',
    endTime: null,
    breakTime: 0,
    drivingTime: 0,
    restTime: 0,
    otherWorkTime: 0,
    status: 'in_progress'
  }
];

/**
 * WorkTimeSection component
 * 
 * Section within the comprehensive dashboard for tracking driver work time.
 * Displays work time records, charts, and allows basic operations.
 * 
 * @returns {JSX.Element} WorkTimeSection component
 */
const WorkTimeSection = () => {
  const [workTimeRecords, setWorkTimeRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [dateFilter, setDateFilter] = useState('');

  // Fetch work time data
  useEffect(() => {
    const fetchWorkTimeRecords = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        setTimeout(() => {
          setWorkTimeRecords(mockWorkTimeRecords);
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching work time records:', error);
        setIsLoading(false);
      }
    };
    fetchWorkTimeRecords();
  }, []);

  // Filter work time records based on search term and date
  const filteredRecords = workTimeRecords.filter(record => 
    (record.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     record.driverId.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (dateFilter === '' || record.date === dateFilter)
  );

  // Format time (HH:MM)
  const formatTime = (time) => {
    return time || 'N/A';
  };

  // Format duration (hours)
  const formatDuration = (hours) => {
    return `${hours} h`;
  };

  // Handle viewing record details
  const handleViewDetails = (record) => {
    setSelectedRecord(record);
    console.log('View details for:', record.id);
  };

  // Handle adding a new work time record (placeholder)
  const handleAddRecord = () => {
    console.log('Add new work time record clicked');
    // In a real app, this would open a form or modal
  };

  // Handle editing a work time record (placeholder)
  const handleEditRecord = (record) => {
    console.log('Edit work time record clicked:', record.id);
    // In a real app, this would open a form or modal with record data
  };

  // Handle deleting a work time record (placeholder)
  const handleDeleteRecord = (recordId) => {
    console.log('Delete work time record clicked:', recordId);
    // In a real app, this would show a confirmation dialog and make an API call
    // For now, we'll just filter it out from the local state
    setWorkTimeRecords(prevRecords => prevRecords.filter(record => record.id !== recordId));
  };

  if (isLoading) {
    return <div className="loading-container">Loading work time records...</div>;
  }

  return (
    <div className="work-time-section">
      <div className="toolbar">
        <div className="search-filters">
          <input 
            type="text"
            placeholder="Search by driver name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <input 
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="date-filter"
          />
        </div>
        <button className="add-button" onClick={handleAddRecord}>Add New Record</button>
      </div>

      <div className="work-time-list-container">
        <table className="work-time-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Driver</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Driving Time</th>
              <th>Break Time</th>
              <th>Rest Time</th>
              <th>Other Work</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.length > 0 ? (
              filteredRecords.map(record => (
                <tr key={record.id}>
                  <td>{record.date}</td>
                  <td>{record.driverName}</td>
                  <td>{formatTime(record.startTime)}</td>
                  <td>{formatTime(record.endTime)}</td>
                  <td>{formatDuration(record.drivingTime)}</td>
                  <td>{formatDuration(record.breakTime / 60)}</td>
                  <td>{formatDuration(record.restTime)}</td>
                  <td>{formatDuration(record.otherWorkTime)}</td>
                  <td>
                    <span className={`status-badge status-${record.status.toLowerCase().replace('_', '-')}`}>
                      {record.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td>
                    <button className="action-button view" onClick={() => handleViewDetails(record)}>View</button>
                    <button className="action-button edit" onClick={() => handleEditRecord(record)}>Edit</button>
                    <button className="action-button delete" onClick={() => handleDeleteRecord(record.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="no-results">No work time records found matching your search criteria.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Charts Section */}
      <div className="charts-grid">
        <div className="chart-container"><WorkHoursDistributionChart /></div>
        <div className="chart-container"><DrivingVsRestTimeChart /></div>
        <div className="chart-container"><OvertimeHoursChart /></div>
        <div className="chart-container"><ComplianceStatusChart /></div>
      </div>

      {/* Placeholder for Record Details Modal/View */}
      {selectedRecord && (
        <div className="details-placeholder">
          <h2>Work Time Details</h2>
          <p>Driver: {selectedRecord.driverName} ({selectedRecord.driverId})</p>
          <p>Date: {selectedRecord.date}</p>
          <p>Time: {formatTime(selectedRecord.startTime)} - {formatTime(selectedRecord.endTime)}</p>
          <p>Driving Time: {formatDuration(selectedRecord.drivingTime)}</p>
          <p>Break Time: {formatDuration(selectedRecord.breakTime / 60)}</p>
          <p>Rest Time: {formatDuration(selectedRecord.restTime)}</p>
          <p>Other Work: {formatDuration(selectedRecord.otherWorkTime)}</p>
          <p>Status: {selectedRecord.status.replace('_', ' ')}</p>
          <button onClick={() => setSelectedRecord(null)}>Close Details</button>
        </div>
      )}
    </div>
  );
};

export default WorkTimeSection;
