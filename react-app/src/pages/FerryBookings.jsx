import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/common/Card';
import Table from '../components/common/Table';
import KPICard from '../components/common/KPICard';
import * as ferryBookingsService from '../services/api/mockFerryBookingsService';

/**
 * Ferry Bookings Component
 * 
 * Main component for managing ferry bookings, reservations, and related data.
 */
const FerryBookings = () => {
  // React Router navigation hook
  const navigate = useNavigate();
  
  // State for data
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [operators, setOperators] = useState([]);
  const [operatorDetails, setOperatorDetails] = useState(null);
  const [connections, setConnections] = useState(null);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [selectedOperatorId, setSelectedOperatorId] = useState(null);
  
  // State for filters and pagination
  const [bookingsFilter, setBookingsFilter] = useState({
    status: 'all',
    search: '',
    dateFrom: '',
    dateTo: '',
    page: 1,
    limit: 10
  });
  
  const [operatorsFilter, setOperatorsFilter] = useState({
    country: 'all',
    search: '',
    page: 1,
    limit: 10
  });
  
  const [connectionsFilter, setConnectionsFilter] = useState({
    origin: 'Gdańsk',
    destination: 'Stockholm',
    departureDate: new Date().toISOString().split('T')[0],
    returnDate: '',
    vehicleType: 'truck'
  });
  
  // Refs for tracking loaded data and search timers
  const dataLoadedRef = useRef({
    dashboard: false,
    bookings: false,
    operators: false,
    connections: false,
    calendar: false
  });
  
  const searchTimerRef = useRef(null);
  
  // Load dashboard data
  const loadDashboardData = useCallback(async () => {
    if (isLoading) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      const data = await ferryBookingsService.getFerryBookingsDashboard();
      setDashboardData(data);
      dataLoadedRef.current.dashboard = true;
    } catch (err) {
      console.error('Error loading dashboard data:', err);
      setError('Failed to load dashboard data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);
  
  // Load bookings data
  const loadBookingsData = useCallback(async () => {
    if (isLoading) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      const data = await ferryBookingsService.getFerryBookings(bookingsFilter);
      setBookings(data);
      dataLoadedRef.current.bookings = true;
    } catch (err) {
      console.error('Error loading bookings data:', err);
      setError('Failed to load bookings data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, bookingsFilter]);
  
  // Load booking details
  const loadBookingDetails = useCallback(async (id) => {
    if (isLoading || !id) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      const data = await ferryBookingsService.getFerryBookingDetails(id);
      setBookingDetails(data);
    } catch (err) {
      console.error(`Error loading booking details for ID ${id}:`, err);
      setError(`Failed to load booking details for ID ${id}. Please try again later.`);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);
  
  // Load operators data
  const loadOperatorsData = useCallback(async () => {
    if (isLoading) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      const data = await ferryBookingsService.getFerryOperators(operatorsFilter);
      setOperators(data);
      dataLoadedRef.current.operators = true;
    } catch (err) {
      console.error('Error loading operators data:', err);
      setError('Failed to load operators data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, operatorsFilter]);
  
  // Load operator details
  const loadOperatorDetails = useCallback(async (id) => {
    if (isLoading || !id) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      const data = await ferryBookingsService.getFerryOperatorDetails(id);
      setOperatorDetails(data);
    } catch (err) {
      console.error(`Error loading operator details for ID ${id}:`, err);
      setError(`Failed to load operator details for ID ${id}. Please try again later.`);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);
  
  // Load connections data
  const loadConnectionsData = useCallback(async () => {
    if (isLoading) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      const data = await ferryBookingsService.searchFerryConnections(connectionsFilter);
      setConnections(data);
      dataLoadedRef.current.connections = true;
    } catch (err) {
      console.error('Error loading connections data:', err);
      setError('Failed to load connections data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, connectionsFilter]);
  
  // Load calendar events
  const loadCalendarEvents = useCallback(async () => {
    if (isLoading) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      const today = new Date();
      const oneMonthLater = new Date(today);
      oneMonthLater.setMonth(today.getMonth() + 1);
      
      const data = await ferryBookingsService.getCalendarEvents({
        start: today.toISOString(),
        end: oneMonthLater.toISOString()
      });
      
      setCalendarEvents(data.events);
      dataLoadedRef.current.calendar = true;
    } catch (err) {
      console.error('Error loading calendar events:', err);
      setError('Failed to load calendar events. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);
  
  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    
    // Reset selected items when changing tabs
    setSelectedBookingId(null);
    setSelectedOperatorId(null);
    setBookingDetails(null);
    setOperatorDetails(null);
    
    // Load data for the selected tab if not already loaded
    switch (tab) {
      case 'dashboard':
        if (!dataLoadedRef.current.dashboard) {
          loadDashboardData();
        }
        break;
      case 'bookings':
        if (!dataLoadedRef.current.bookings) {
          loadBookingsData();
        }
        break;
      case 'operators':
        if (!dataLoadedRef.current.operators) {
          loadOperatorsData();
        }
        break;
      case 'connections':
        if (!dataLoadedRef.current.connections) {
          loadConnectionsData();
        }
        break;
      case 'calendar':
        if (!dataLoadedRef.current.calendar) {
          loadCalendarEvents();
        }
        break;
      default:
        break;
    }
  };
  
  // Handle booking selection
  const handleBookingSelect = (id) => {
    setSelectedBookingId(id);
    loadBookingDetails(id);
  };
  
  // Handle operator selection
  const handleOperatorSelect = (id) => {
    setSelectedOperatorId(id);
    loadOperatorDetails(id);
  };
  
  // Handle bookings filter change
  const handleBookingsFilterChange = (name, value) => {
    setBookingsFilter(prev => ({
      ...prev,
      [name]: value,
      page: name !== 'page' ? 1 : value // Reset page when changing other filters
    }));
    
    // Clear any existing timer
    if (searchTimerRef.current) {
      clearTimeout(searchTimerRef.current);
    }
    
    // Set a new timer to delay the API call
    searchTimerRef.current = setTimeout(() => {
      loadBookingsData();
    }, 500);
  };
  
  // Handle operators filter change
  const handleOperatorsFilterChange = (name, value) => {
    setOperatorsFilter(prev => ({
      ...prev,
      [name]: value,
      page: name !== 'page' ? 1 : value // Reset page when changing other filters
    }));
    
    // Clear any existing timer
    if (searchTimerRef.current) {
      clearTimeout(searchTimerRef.current);
    }
    
    // Set a new timer to delay the API call
    searchTimerRef.current = setTimeout(() => {
      loadOperatorsData();
    }, 500);
  };
  
  // Handle connections filter change
  const handleConnectionsFilterChange = (name, value) => {
    setConnectionsFilter(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle search connections button click
  const handleSearchConnections = () => {
    loadConnectionsData();
  };
  
  // Initial data load
  useEffect(() => {
    loadDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // Render dashboard section
  const renderDashboard = () => {
    if (!dashboardData) {
      return <div className="loading">Loading dashboard data...</div>;
    }
    
    return (
      <div className="dashboard-container">
        {/* KPI Cards */}
        <div className="kpi-cards">
          <KPICard 
            title="Active Bookings" 
            value={dashboardData.kpi.activeBookings} 
            icon="calendar-check" 
            color="primary"
          />
          <KPICard 
            title="Upcoming Departures" 
            value={dashboardData.kpi.upcomingDepartures} 
            icon="ship" 
            color="success"
          />
          <KPICard 
            title="Monthly Expenses" 
            value={`€${dashboardData.kpi.monthlyExpenses.toFixed(2)}`} 
            icon="euro-sign" 
            color="warning"
          />
          <KPICard 
            title="Total Savings" 
            value={`€${dashboardData.kpi.totalSavings.toFixed(2)}`} 
            icon="piggy-bank" 
            color="info"
          />
        </div>
        
        {/* Map and Upcoming Departures */}
        <div className="dashboard-row">
          <Card title="Ferry Activity Map" className="map-card">
            <div className="map-placeholder">
              <p>Interactive map showing ferry ports and active bookings</p>
              <ul className="port-list">
                {dashboardData.mapData.map(port => (
                  <li key={port.id} className="port-item">
                    <span className="port-name">{port.name}, {port.country}</span>
                    <span className="port-bookings">{port.activeBookings} active bookings</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
          
          <Card title="Upcoming Departures" className="departures-card">
            {dashboardData.upcomingDepartures && dashboardData.upcomingDepartures.length > 0 ? (
              <Table
                headers={['ID', 'Route', 'Departure', 'Vehicle', 'Driver']}
                data={dashboardData.upcomingDepartures.map(booking => [
                  booking.id,
                  `${booking.route.origin} → ${booking.route.destination}`,
                  new Date(booking.departureDate).toLocaleString(),
                  booking.vehicle.plate,
                  booking.driver.name
                ])}
                onRowClick={(index) => handleBookingSelect(dashboardData.upcomingDepartures[index].id)}
              />
            ) : (
              <p>No upcoming departures found.</p>
            )}
          </Card>
        </div>
        
        {/* Alerts and Expense Trends */}
        <div className="dashboard-row">
          <Card title="Alerts & Notifications" className="alerts-card">
            {dashboardData.alerts && dashboardData.alerts.length > 0 ? (
              <ul className="alerts-list">
                {dashboardData.alerts.map(alert => (
                  <li key={alert.id} className={`alert-item alert-${alert.severity}`}>
                    <div className="alert-header">
                      <span className="alert-title">{alert.title}</span>
                      <span className="alert-date">{new Date(alert.date).toLocaleString()}</span>
                    </div>
                    <p className="alert-message">{alert.message}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No alerts found.</p>
            )}
          </Card>
          
          <Card title="Expense Trends" className="trends-card">
            <div className="trends-container">
              <div className="trends-header">
                <h4>Monthly Expenses (€)</h4>
              </div>
              <div className="trends-chart">
                <div className="chart-placeholder">
                  {dashboardData.expenseTrends.monthly.map((item, index) => (
                    <div key={index} className="chart-bar" style={{ height: `${item.amount / 250}px` }}>
                      <div className="bar-value">{item.amount.toFixed(0)}</div>
                      <div className="bar-label">{item.month}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  };
  
  // Render bookings section
  const renderBookings = () => {
    if (!bookings || !bookings.items) {
      return <div className="loading">Loading bookings data...</div>;
    }
    
    return (
      <div className="bookings-container">
        {/* Bookings filters */}
        <Card title="Bookings Filters" className="filters-card">
          <div className="filters-form">
            <div className="form-group">
              <label htmlFor="status">Status:</label>
              <select 
                id="status" 
                value={bookingsFilter.status} 
                onChange={(e) => handleBookingsFilterChange('status', e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="search">Search:</label>
              <input 
                type="text" 
                id="search" 
                value={bookingsFilter.search} 
                onChange={(e) => handleBookingsFilterChange('search', e.target.value)}
                placeholder="Search bookings..."
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="dateFrom">From:</label>
              <input 
                type="date" 
                id="dateFrom" 
                value={bookingsFilter.dateFrom} 
                onChange={(e) => handleBookingsFilterChange('dateFrom', e.target.value)}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="dateTo">To:</label>
              <input 
                type="date" 
                id="dateTo" 
                value={bookingsFilter.dateTo} 
                onChange={(e) => handleBookingsFilterChange('dateTo', e.target.value)}
              />
            </div>
          </div>
        </Card>
        
        {/* Bookings list */}
        <Card title="Bookings List" className="bookings-list-card">
          {bookings.items.length > 0 ? (
            <>
              <Table
                headers={['ID', 'Route', 'Departure', 'Status', 'Vehicle', 'Driver', 'Price']}
                data={bookings.items.map(booking => [
                  booking.id,
                  `${booking.route.origin} → ${booking.route.destination}`,
                  new Date(booking.departureDate).toLocaleString(),
                  booking.status.charAt(0).toUpperCase() + booking.status.slice(1),
                  booking.vehicle.plate,
                  booking.driver.name,
                  `€${booking.price.amount}`
                ])}
                onRowClick={(index) => handleBookingSelect(bookings.items[index].id)}
              />
              
              {/* Pagination */}
              <div className="pagination">
                <button 
                  disabled={bookings.pagination.page <= 1} 
                  onClick={() => handleBookingsFilterChange('page', bookings.pagination.page - 1)}
                >
                  Previous
                </button>
                <span>
                  Page {bookings.pagination.page} of {bookings.pagination.totalPages}
                </span>
                <button 
                  disabled={bookings.pagination.page >= bookings.pagination.totalPages} 
                  onClick={() => handleBookingsFilterChange('page', bookings.pagination.page + 1)}
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <p>No bookings found matching the current filters.</p>
          )}
        </Card>
        
        {/* Booking details */}
        {selectedBookingId && bookingDetails && (
          <Card title={`Booking Details: ${bookingDetails.id}`} className="booking-details-card">
            <div className="booking-details">
              <div className="booking-header">
                <h3>{bookingDetails.route.origin} → {bookingDetails.route.destination}</h3>
                <span className={`status-badge status-${bookingDetails.status}`}>
                  {bookingDetails.status.charAt(0).toUpperCase() + bookingDetails.status.slice(1)}
                </span>
              </div>
              
              <div className="booking-sections">
                <div className="booking-section">
                  <h4>Route Information</h4>
                  <p><strong>Operator:</strong> {bookingDetails.operator.name}</p>
                  <p><strong>Distance:</strong> {bookingDetails.route.distance} km</p>
                  <p><strong>Duration:</strong> {bookingDetails.route.duration}</p>
                  <p><strong>Departure:</strong> {new Date(bookingDetails.departureDate).toLocaleString()}</p>
                  <p><strong>Arrival:</strong> {new Date(bookingDetails.arrivalDate).toLocaleString()}</p>
                </div>
                
                <div className="booking-section">
                  <h4>Vehicle & Driver</h4>
                  <p><strong>Vehicle:</strong> {bookingDetails.vehicle.plate} ({bookingDetails.vehicle.type})</p>
                  <p><strong>Length:</strong> {bookingDetails.vehicle.length} m</p>
                  <p><strong>Weight:</strong> {bookingDetails.vehicle.weight} t</p>
                  <p><strong>Driver:</strong> {bookingDetails.driver.name}</p>
                  <p><strong>License:</strong> {bookingDetails.driver.licenseNumber}</p>
                </div>
                
                <div className="booking-section">
                  <h4>Payment Information</h4>
                  <p><strong>Amount:</strong> €{bookingDetails.price.amount}</p>
                  <p><strong>Payment Method:</strong> {bookingDetails.price.paymentMethod.replace('_', ' ')}</p>
                  <p><strong>Payment Status:</strong> {bookingDetails.price.paymentStatus}</p>
                  <p><strong>Cabin Type:</strong> {bookingDetails.cabinType.replace('_', ' ')}</p>
                  <p><strong>Meal Plan:</strong> {bookingDetails.mealPlan.replace('_', ' ')}</p>
                </div>
              </div>
              
              <div className="booking-sections">
                <div className="booking-section">
                  <h4>Check-in Information</h4>
                  <p><strong>Check-in Time:</strong> {new Date(bookingDetails.checkInInfo.checkInTime).toLocaleString()}</p>
                  <p><strong>Terminal:</strong> {bookingDetails.checkInInfo.terminal}</p>
                  <p><strong>Boarding Time:</strong> {new Date(bookingDetails.checkInInfo.boardingTime).toLocaleString()}</p>
                  {bookingDetails.checkInInfo.specialInstructions && (
                    <p><strong>Special Instructions:</strong> {bookingDetails.checkInInfo.specialInstructions}</p>
                  )}
                </div>
                
                <div className="booking-section">
                  <h4>Vessel Information</h4>
                  <p><strong>Name:</strong> {bookingDetails.vessel.name}</p>
                  <p><strong>Capacity:</strong> {bookingDetails.vessel.capacity} passengers</p>
                  <p><strong>Built Year:</strong> {bookingDetails.vessel.builtYear}</p>
                  <p><strong>Facilities:</strong> {bookingDetails.vessel.facilities.join(', ')}</p>
                </div>
                
                <div className="booking-section">
                  <h4>Documents</h4>
                  {bookingDetails.documents && bookingDetails.documents.length > 0 ? (
                    <ul className="documents-list">
                      {bookingDetails.documents.map(doc => (
                        <li key={doc.id} className={`document-item document-${doc.status}`}>
                          <span className="document-name">{doc.name}</span>
                          <span className="document-status">{doc.status}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No documents found.</p>
                  )}
                </div>
              </div>
              
              <div className="booking-history">
                <h4>Booking History</h4>
                <ul className="history-list">
                  {bookingDetails.history.map((item, index) => (
                    <li key={index} className="history-item">
                      <span className="history-date">{new Date(item.date).toLocaleString()}</span>
                      <span className="history-action">{item.action}</span>
                      <span className="history-user">{item.user}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="booking-actions">
                <button className="btn btn-primary">Edit Booking</button>
                <button className="btn btn-danger">Cancel Booking</button>
                <button className="btn btn-secondary">Download Documents</button>
              </div>
            </div>
          </Card>
        )}
      </div>
    );
  };
  
  // Render operators section
  const renderOperators = () => {
    if (!operators || !operators.items) {
      return <div className="loading">Loading operators data...</div>;
    }
    
    return (
      <div className="operators-container">
        {/* Operators filters */}
        <Card title="Operators Filters" className="filters-card">
          <div className="filters-form">
            <div className="form-group">
              <label htmlFor="country">Country:</label>
              <select 
                id="country" 
                value={operatorsFilter.country} 
                onChange={(e) => handleOperatorsFilterChange('country', e.target.value)}
              >
                <option value="all">All Countries</option>
                <option value="Poland">Poland</option>
                <option value="Sweden">Sweden</option>
                <option value="Denmark">Denmark</option>
                <option value="Finland">Finland</option>
                <option value="Norway">Norway</option>
                <option value="Germany">Germany</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="operatorSearch">Search:</label>
              <input 
                type="text" 
                id="operatorSearch" 
                value={operatorsFilter.search} 
                onChange={(e) => handleOperatorsFilterChange('search', e.target.value)}
                placeholder="Search operators..."
              />
            </div>
          </div>
        </Card>
        
        {/* Operators list */}
        <Card title="Operators List" className="operators-list-card">
          {operators.items.length > 0 ? (
            <>
              <Table
                headers={['Name', 'Country', 'Routes', 'Fleet Size', 'Founded', 'Headquarters']}
                data={operators.items.map(operator => [
                  operator.name,
                  operator.country,
                  operator.routes.length,
                  operator.fleetSize,
                  operator.foundedYear,
                  operator.headquarters
                ])}
                onRowClick={(index) => handleOperatorSelect(operators.items[index].id)}
              />
              
              {/* Pagination */}
              <div className="pagination">
                <button 
                  disabled={operators.pagination.page <= 1} 
                  onClick={() => handleOperatorsFilterChange('page', operators.pagination.page - 1)}
                >
                  Previous
                </button>
                <span>
                  Page {operators.pagination.page} of {operators.pagination.totalPages}
                </span>
                <button 
                  disabled={operators.pagination.page >= operators.pagination.totalPages} 
                  onClick={() => handleOperatorsFilterChange('page', operators.pagination.page + 1)}
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <p>No operators found matching the current filters.</p>
          )}
        </Card>
        
        {/* Operator details */}
        {selectedOperatorId && operatorDetails && (
          <Card title={`Operator Details: ${operatorDetails.name}`} className="operator-details-card">
            <div className="operator-details">
              <div className="operator-header">
                <h3>{operatorDetails.name}</h3>
                <span className="country-badge">{operatorDetails.country}</span>
              </div>
              
              <div className="operator-sections">
                <div className="operator-section">
                  <h4>Company Information</h4>
                  <p><strong>Founded:</strong> {operatorDetails.foundedYear}</p>
                  <p><strong>Headquarters:</strong> {operatorDetails.headquarters}</p>
                  <p><strong>Fleet Size:</strong> {operatorDetails.fleetSize} vessels</p>
                  <p><strong>Website:</strong> <a href={operatorDetails.website} target="_blank" rel="noopener noreferrer">{operatorDetails.website}</a></p>
                </div>
                
                <div className="operator-section">
                  <h4>Contact Information</h4>
                  <p><strong>Address:</strong> {operatorDetails.contactInfo.address}</p>
                  <p><strong>Phone:</strong> {operatorDetails.contactInfo.phone}</p>
                  <p><strong>Email:</strong> {operatorDetails.contactInfo.email}</p>
                </div>
                
                <div className="operator-section">
                  <h4>Service Quality</h4>
                  <p><strong>Punctuality:</strong> {operatorDetails.serviceQuality.punctuality}%</p>
                  <p><strong>Cleanliness:</strong> {operatorDetails.serviceQuality.cleanliness}%</p>
                  <p><strong>Customer Service:</strong> {operatorDetails.serviceQuality.customerService}%</p>
                  <p><strong>Overall Rating:</strong> {operatorDetails.serviceQuality.overallRating}/5.0</p>
                </div>
              </div>
              
              <div className="operator-routes">
                <h4>Routes</h4>
                {operatorDetails.routes && operatorDetails.routes.length > 0 ? (
                  <Table
                    headers={['Origin', 'Destination', 'Distance', 'Duration', 'Frequency']}
                    data={operatorDetails.routes.map(route => [
                      route.origin,
                      route.destination,
                      `${route.distance} km`,
                      route.duration,
                      route.frequency
                    ])}
                  />
                ) : (
                  <p>No routes found for this operator.</p>
                )}
              </div>
            </div>
          </Card>
        )}
      </div>
    );
  };
  
  // Render connections section
  const renderConnections = () => {
    return (
      <div className="connections-container">
        {/* Connections search */}
        <Card title="Search Ferry Connections" className="connections-search-card">
          <div className="search-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="origin">Origin:</label>
                <input 
                  type="text" 
                  id="origin" 
                  value={connectionsFilter.origin} 
                  onChange={(e) => handleConnectionsFilterChange('origin', e.target.value)}
                  placeholder="Enter origin port"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="destination">Destination:</label>
                <input 
                  type="text" 
                  id="destination" 
                  value={connectionsFilter.destination} 
                  onChange={(e) => handleConnectionsFilterChange('destination', e.target.value)}
                  placeholder="Enter destination port"
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="departureDate">Departure Date:</label>
                <input 
                  type="date" 
                  id="departureDate" 
                  value={connectionsFilter.departureDate} 
                  onChange={(e) => handleConnectionsFilterChange('departureDate', e.target.value)}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="returnDate">Return Date (Optional):</label>
                <input 
                  type="date" 
                  id="returnDate" 
                  value={connectionsFilter.returnDate} 
                  onChange={(e) => handleConnectionsFilterChange('returnDate', e.target.value)}
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="vehicleType">Vehicle Type:</label>
                <select 
                  id="vehicleType" 
                  value={connectionsFilter.vehicleType} 
                  onChange={(e) => handleConnectionsFilterChange('vehicleType', e.target.value)}
                >
                  <option value="truck">Truck</option>
                  <option value="van">Van</option>
                  <option value="car">Car</option>
                  <option value="bus">Bus</option>
                </select>
              </div>
              
              <div className="form-group">
                <button className="btn btn-primary" onClick={handleSearchConnections}>
                  Search Connections
                </button>
              </div>
            </div>
          </div>
        </Card>
        
        {/* Connections results */}
        {connections && (
          <Card title="Available Connections" className="connections-results-card">
            <div className="connections-results">
              <h3>Outbound Connections: {connectionsFilter.origin} → {connectionsFilter.destination}</h3>
              
              {connections.outbound && connections.outbound.length > 0 ? (
                <div className="connections-list">
                  {connections.outbound.map(connection => (
                    <div key={connection.id} className={`connection-item ${connection.recommended ? 'recommended' : ''}`}>
                      {connection.recommended && <div className="recommended-badge">Recommended</div>}
                      
                      <div className="connection-header">
                        <div className="connection-route">
                          <h4>{connection.route.origin} → {connection.route.destination}</h4>
                          <p className="connection-operator">{connection.operator.name}</p>
                        </div>
                        
                        <div className="connection-time">
                          <div className="departure">
                            <span className="time">{new Date(connection.departureDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                            <span className="date">{new Date(connection.departureDate).toLocaleDateString()}</span>
                          </div>
                          <div className="duration">
                            <span className="duration-line"></span>
                            <span className="duration-text">{connection.route.duration}</span>
                          </div>
                          <div className="arrival">
                            <span className="time">{new Date(connection.arrivalDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                            <span className="date">{new Date(connection.arrivalDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                        
                        <div className="connection-price">
                          <span className="price">€{connection.prices[connectionsFilter.vehicleType]}</span>
                          <span className="vehicle-type">{connectionsFilter.vehicleType}</span>
                        </div>
                      </div>
                      
                      <div className="connection-details">
                        <div className="connection-info">
                          <p><strong>Distance:</strong> {connection.route.distance} km</p>
                          <p><strong>Availability:</strong> {connection.availability[connectionsFilter.vehicleType]} spaces left</p>
                          <p><strong>Amenities:</strong> {connection.amenities.join(', ')}</p>
                        </div>
                        
                        <div className="connection-actions">
                          <button className="btn btn-primary">Book Now</button>
                          <button className="btn btn-secondary">Details</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No outbound connections found matching your criteria.</p>
              )}
              
              {connections.return && connections.return.length > 0 && (
                <>
                  <h3>Return Connections: {connectionsFilter.destination} → {connectionsFilter.origin}</h3>
                  
                  <div className="connections-list">
                    {connections.return.map(connection => (
                      <div key={connection.id} className={`connection-item ${connection.recommended ? 'recommended' : ''}`}>
                        {connection.recommended && <div className="recommended-badge">Recommended</div>}
                        
                        <div className="connection-header">
                          <div className="connection-route">
                            <h4>{connection.route.origin} → {connection.route.destination}</h4>
                            <p className="connection-operator">{connection.operator.name}</p>
                          </div>
                          
                          <div className="connection-time">
                            <div className="departure">
                              <span className="time">{new Date(connection.departureDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                              <span className="date">{new Date(connection.departureDate).toLocaleDateString()}</span>
                            </div>
                            <div className="duration">
                              <span className="duration-line"></span>
                              <span className="duration-text">{connection.route.duration}</span>
                            </div>
                            <div className="arrival">
                              <span className="time">{new Date(connection.arrivalDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                              <span className="date">{new Date(connection.arrivalDate).toLocaleDateString()}</span>
                            </div>
                          </div>
                          
                          <div className="connection-price">
                            <span className="price">€{connection.prices[connectionsFilter.vehicleType]}</span>
                            <span className="vehicle-type">{connectionsFilter.vehicleType}</span>
                          </div>
                        </div>
                        
                        <div className="connection-details">
                          <div className="connection-info">
                            <p><strong>Distance:</strong> {connection.route.distance} km</p>
                            <p><strong>Availability:</strong> {connection.availability[connectionsFilter.vehicleType]} spaces left</p>
                            <p><strong>Amenities:</strong> {connection.amenities.join(', ')}</p>
                          </div>
                          
                          <div className="connection-actions">
                            <button className="btn btn-primary">Book Now</button>
                            <button className="btn btn-secondary">Details</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </Card>
        )}
      </div>
    );
  };
  
  // Render calendar section
  const renderCalendar = () => {
    if (!calendarEvents || calendarEvents.length === 0) {
      return <div className="loading">Loading calendar data...</div>;
    }
    
    // Group events by date
    const eventsByDate = {};
    calendarEvents.forEach(event => {
      const date = new Date(event.start).toISOString().split('T')[0];
      if (!eventsByDate[date]) {
        eventsByDate[date] = [];
      }
      eventsByDate[date].push(event);
    });
    
    // Generate calendar days
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    // Get first day of month and number of days
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    // Generate calendar grid
    const calendarDays = [];
    
    // Add empty cells for days before first day of month
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(null);
    }
    
    // Add days of month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentYear, currentMonth, i).toISOString().split('T')[0];
      calendarDays.push({
        day: i,
        date: date,
        events: eventsByDate[date] || []
      });
    }
    
    return (
      <div className="calendar-container">
        <Card title={`Bookings Calendar - ${new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} ${currentYear}`} className="calendar-card">
          <div className="calendar-grid">
            <div className="calendar-header">
              <div className="weekday">Sunday</div>
              <div className="weekday">Monday</div>
              <div className="weekday">Tuesday</div>
              <div className="weekday">Wednesday</div>
              <div className="weekday">Thursday</div>
              <div className="weekday">Friday</div>
              <div className="weekday">Saturday</div>
            </div>
            
            <div className="calendar-days">
              {calendarDays.map((day, index) => (
                <div key={index} className={`calendar-cell ${day ? (day.day === today.getDate() ? 'today' : '') : 'empty'}`}>
                  {day && (
                    <>
                      <div className="day-number">{day.day}</div>
                      <div className="day-events">
                        {day.events.slice(0, 3).map(event => (
                          <div 
                            key={event.id} 
                            className={`event-item event-${event.status}`}
                            onClick={() => handleBookingSelect(event.bookingId)}
                          >
                            <span className="event-time">
                              {new Date(event.start).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </span>
                            <span className="event-title">{event.title}</span>
                          </div>
                        ))}
                        {day.events.length > 3 && (
                          <div className="more-events">+{day.events.length - 3} more</div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Card>
        
        <Card title="Upcoming Bookings" className="upcoming-bookings-card">
          <div className="upcoming-list">
            {calendarEvents
              .filter(event => new Date(event.start) >= today)
              .sort((a, b) => new Date(a.start) - new Date(b.start))
              .slice(0, 10)
              .map(event => (
                <div 
                  key={event.id} 
                  className={`upcoming-item upcoming-${event.status}`}
                  onClick={() => handleBookingSelect(event.bookingId)}
                >
                  <div className="upcoming-date">
                    <span className="date">{new Date(event.start).toLocaleDateString()}</span>
                    <span className="time">{new Date(event.start).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                  </div>
                  <div className="upcoming-details">
                    <h4 className="upcoming-title">{event.title}</h4>
                    <p className="upcoming-info">
                      <span className="vehicle">{event.vehicle}</span>
                      <span className="driver">{event.driver}</span>
                    </p>
                  </div>
                  <div className="upcoming-status">
                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                  </div>
                </div>
              ))}
          </div>
        </Card>
      </div>
    );
  };
  
  // Render reports section
  const renderReports = () => {
    return (
      <div className="reports-container">
        <Card title="Generate Reports" className="reports-card">
          <div className="reports-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="reportDateFrom">From:</label>
                <input type="date" id="reportDateFrom" />
              </div>
              
              <div className="form-group">
                <label htmlFor="reportDateTo">To:</label>
                <input type="date" id="reportDateTo" />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="reportGroupBy">Group By:</label>
                <select id="reportGroupBy">
                  <option value="vehicle">Vehicle</option>
                  <option value="driver">Driver</option>
                  <option value="route">Route</option>
                  <option value="operator">Operator</option>
                  <option value="period">Time Period</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="reportFormat">Format:</label>
                <select id="reportFormat">
                  <option value="pdf">PDF</option>
                  <option value="csv">CSV</option>
                  <option value="xlsx">Excel</option>
                </select>
              </div>
            </div>
            
            <div className="form-actions">
              <button className="btn btn-primary">Generate Report</button>
              <button className="btn btn-secondary">Save Report Settings</button>
            </div>
          </div>
        </Card>
        
        <Card title="Saved Reports" className="saved-reports-card">
          <div className="saved-reports-list">
            <div className="saved-report-item">
              <div className="report-info">
                <h4>Monthly Expenses by Vehicle</h4>
                <p>Last generated: April 10, 2025</p>
              </div>
              <div className="report-actions">
                <button className="btn btn-primary">Generate</button>
                <button className="btn btn-secondary">Edit</button>
              </div>
            </div>
            
            <div className="saved-report-item">
              <div className="report-info">
                <h4>Quarterly Route Analysis</h4>
                <p>Last generated: March 31, 2025</p>
              </div>
              <div className="report-actions">
                <button className="btn btn-primary">Generate</button>
                <button className="btn btn-secondary">Edit</button>
              </div>
            </div>
            
            <div className="saved-report-item">
              <div className="report-info">
                <h4>Driver Performance Report</h4>
                <p>Last generated: April 5, 2025</p>
              </div>
              <div className="report-actions">
                <button className="btn btn-primary">Generate</button>
                <button className="btn btn-secondary">Edit</button>
              </div>
            </div>
          </div>
        </Card>
        
        <Card title="Report Templates" className="report-templates-card">
          <div className="templates-list">
            <div className="template-item">
              <h4>Cost Analysis</h4>
              <p>Detailed breakdown of ferry booking costs by various dimensions</p>
              <button className="btn btn-primary">Use Template</button>
            </div>
            
            <div className="template-item">
              <h4>Route Efficiency</h4>
              <p>Analysis of route efficiency, comparing costs and duration</p>
              <button className="btn btn-primary">Use Template</button>
            </div>
            
            <div className="template-item">
              <h4>Operator Comparison</h4>
              <p>Compare different ferry operators by cost, service quality, and reliability</p>
              <button className="btn btn-primary">Use Template</button>
            </div>
            
            <div className="template-item">
              <h4>Vehicle Utilization</h4>
              <p>Track how vehicles are utilized for ferry crossings</p>
              <button className="btn btn-primary">Use Template</button>
            </div>
          </div>
        </Card>
      </div>
    );
  };
  
  return (
    <div className="ferry-bookings-container">
      <h1>Ferry Bookings</h1>
      
      {/* Tabs */}
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'dashboard' ? 'active' : ''}`} 
          onClick={() => handleTabChange('dashboard')}
        >
          Dashboard
        </button>
        <button 
          className={`tab ${activeTab === 'bookings' ? 'active' : ''}`} 
          onClick={() => handleTabChange('bookings')}
        >
          Bookings
        </button>
        <button 
          className={`tab ${activeTab === 'operators' ? 'active' : ''}`} 
          onClick={() => handleTabChange('operators')}
        >
          Operators
        </button>
        <button 
          className={`tab ${activeTab === 'connections' ? 'active' : ''}`} 
          onClick={() => handleTabChange('connections')}
        >
          Connections
        </button>
        <button 
          className={`tab ${activeTab === 'calendar' ? 'active' : ''}`} 
          onClick={() => handleTabChange('calendar')}
        >
          Calendar
        </button>
        <button 
          className={`tab ${activeTab === 'reports' ? 'active' : ''}`} 
          onClick={() => handleTabChange('reports')}
        >
          Reports
        </button>
      </div>
      
      {/* Error message */}
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      {/* Loading indicator */}
      {isLoading && (
        <div className="loading-indicator">
          Loading...
        </div>
      )}
      
      {/* Content based on active tab */}
      <div className="tab-content">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'bookings' && renderBookings()}
        {activeTab === 'operators' && renderOperators()}
        {activeTab === 'connections' && renderConnections()}
        {activeTab === 'calendar' && renderCalendar()}
        {activeTab === 'reports' && renderReports()}
      </div>
      
      {/* CSS Styles */}
      <style jsx>{`
        .ferry-bookings-container {
          padding: 20px;
          max-width: 100%;
        }
        
        h1 {
          margin-bottom: 20px;
          color: #333;
        }
        
        .tabs {
          display: flex;
          margin-bottom: 20px;
          border-bottom: 1px solid #ddd;
        }
        
        .tab {
          padding: 10px 20px;
          background: none;
          border: none;
          border-bottom: 3px solid transparent;
          cursor: pointer;
          font-size: 16px;
          font-weight: 500;
          color: #555;
          transition: all 0.3s;
        }
        
        .tab:hover {
          color: #007bff;
        }
        
        .tab.active {
          color: #007bff;
          border-bottom-color: #007bff;
        }
        
        .error-message {
          padding: 10px 15px;
          background-color: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
          border-radius: 4px;
          margin-bottom: 20px;
        }
        
        .loading-indicator {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100px;
          font-size: 18px;
          color: #666;
        }
        
        .tab-content {
          min-height: 400px;
        }
        
        /* Dashboard styles */
        .kpi-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 20px;
        }
        
        .dashboard-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
          gap: 20px;
          margin-bottom: 20px;
        }
        
        .map-placeholder {
          height: 300px;
          background-color: #f8f9fa;
          border-radius: 4px;
          padding: 15px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        
        .port-list {
          list-style: none;
          padding: 0;
          width: 100%;
          max-height: 250px;
          overflow-y: auto;
        }
        
        .port-item {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid #eee;
        }
        
        .alerts-list {
          list-style: none;
          padding: 0;
        }
        
        .alert-item {
          padding: 10px;
          margin-bottom: 10px;
          border-radius: 4px;
        }
        
        .alert-high {
          background-color: #f8d7da;
          border-left: 4px solid #dc3545;
        }
        
        .alert-medium {
          background-color: #fff3cd;
          border-left: 4px solid #ffc107;
        }
        
        .alert-info {
          background-color: #d1ecf1;
          border-left: 4px solid #17a2b8;
        }
        
        .alert-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 5px;
        }
        
        .alert-title {
          font-weight: bold;
        }
        
        .alert-date {
          font-size: 0.8em;
          color: #666;
        }
        
        .alert-message {
          margin: 0;
        }
        
        .trends-chart {
          height: 200px;
          display: flex;
          align-items: flex-end;
          padding-top: 20px;
        }
        
        .chart-placeholder {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          width: 100%;
          height: 100%;
        }
        
        .chart-bar {
          width: 30px;
          background-color: #007bff;
          border-radius: 4px 4px 0 0;
          position: relative;
          margin: 0 2px;
          min-height: 20px;
        }
        
        .bar-value {
          position: absolute;
          top: -20px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 10px;
          color: #666;
        }
        
        .bar-label {
          position: absolute;
          bottom: -20px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 10px;
          color: #666;
          white-space: nowrap;
        }
        
        /* Bookings styles */
        .filters-form {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
        }
        
        .form-group {
          flex: 1;
          min-width: 200px;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 5px;
          font-weight: 500;
        }
        
        .form-group input,
        .form-group select {
          width: 100%;
          padding: 8px 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        
        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 20px;
        }
        
        .pagination button {
          padding: 5px 10px;
          background-color: #f8f9fa;
          border: 1px solid #ddd;
          border-radius: 4px;
          cursor: pointer;
          margin: 0 5px;
        }
        
        .pagination button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .pagination span {
          margin: 0 10px;
        }
        
        .booking-details {
          padding: 15px;
        }
        
        .booking-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        
        .booking-header h3 {
          margin: 0;
        }
        
        .status-badge {
          padding: 5px 10px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 500;
        }
        
        .status-confirmed {
          background-color: #d4edda;
          color: #155724;
        }
        
        .status-pending {
          background-color: #fff3cd;
          color: #856404;
        }
        
        .status-cancelled {
          background-color: #f8d7da;
          color: #721c24;
        }
        
        .status-completed {
          background-color: #d1ecf1;
          color: #0c5460;
        }
        
        .booking-sections {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          margin-bottom: 20px;
        }
        
        .booking-section {
          flex: 1;
          min-width: 250px;
          background-color: #f8f9fa;
          padding: 15px;
          border-radius: 4px;
        }
        
        .booking-section h4 {
          margin-top: 0;
          margin-bottom: 10px;
          padding-bottom: 5px;
          border-bottom: 1px solid #ddd;
        }
        
        .documents-list {
          list-style: none;
          padding: 0;
        }
        
        .document-item {
          display: flex;
          justify-content: space-between;
          padding: 5px 0;
          border-bottom: 1px solid #eee;
        }
        
        .document-valid {
          color: #155724;
        }
        
        .document-pending {
          color: #856404;
        }
        
        .document-expired {
          color: #721c24;
        }
        
        .booking-history {
          margin-bottom: 20px;
        }
        
        .history-list {
          list-style: none;
          padding: 0;
        }
        
        .history-item {
          display: flex;
          padding: 8px 0;
          border-bottom: 1px solid #eee;
        }
        
        .history-date {
          width: 200px;
          color: #666;
        }
        
        .history-action {
          flex: 1;
          font-weight: 500;
        }
        
        .history-user {
          width: 100px;
          color: #666;
        }
        
        .booking-actions {
          display: flex;
          gap: 10px;
        }
        
        .btn {
          padding: 8px 15px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 500;
        }
        
        .btn-primary {
          background-color: #007bff;
          color: white;
        }
        
        .btn-danger {
          background-color: #dc3545;
          color: white;
        }
        
        .btn-secondary {
          background-color: #6c757d;
          color: white;
        }
        
        /* Operators styles */
        .country-badge {
          padding: 5px 10px;
          background-color: #e9ecef;
          border-radius: 20px;
          font-size: 14px;
        }
        
        /* Connections styles */
        .search-form {
          padding: 15px;
        }
        
        .form-row {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
          margin-bottom: 15px;
        }
        
        .connections-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin-bottom: 30px;
        }
        
        .connection-item {
          border: 1px solid #ddd;
          border-radius: 4px;
          overflow: hidden;
        }
        
        .connection-item.recommended {
          border-color: #28a745;
          position: relative;
        }
        
        .recommended-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          background-color: #28a745;
          color: white;
          padding: 3px 8px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
        }
        
        .connection-header {
          display: flex;
          justify-content: space-between;
          padding: 15px;
          background-color: #f8f9fa;
          border-bottom: 1px solid #ddd;
        }
        
        .connection-route h4 {
          margin: 0 0 5px 0;
        }
        
        .connection-operator {
          margin: 0;
          color: #666;
        }
        
        .connection-time {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .departure, .arrival {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .time {
          font-size: 18px;
          font-weight: 500;
        }
        
        .date {
          font-size: 12px;
          color: #666;
        }
        
        .duration {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }
        
        .duration-line {
          width: 80px;
          height: 2px;
          background-color: #ddd;
          position: relative;
        }
        
        .duration-line:before, .duration-line:after {
          content: '';
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #ddd;
          top: -2px;
        }
        
        .duration-line:before {
          left: 0;
        }
        
        .duration-line:after {
          right: 0;
        }
        
        .duration-text {
          font-size: 12px;
          color: #666;
          margin-top: 5px;
        }
        
        .connection-price {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
        
        .price {
          font-size: 20px;
          font-weight: 500;
          color: #28a745;
        }
        
        .vehicle-type {
          font-size: 12px;
          color: #666;
        }
        
        .connection-details {
          display: flex;
          justify-content: space-between;
          padding: 15px;
        }
        
        .connection-info p {
          margin: 5px 0;
        }
        
        .connection-actions {
          display: flex;
          gap: 10px;
          align-items: center;
        }
        
        /* Calendar styles */
        .calendar-grid {
          border: 1px solid #ddd;
          border-radius: 4px;
          overflow: hidden;
        }
        
        .calendar-header {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          background-color: #f8f9fa;
          border-bottom: 1px solid #ddd;
        }
        
        .weekday {
          padding: 10px;
          text-align: center;
          font-weight: 500;
        }
        
        .calendar-days {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          grid-auto-rows: minmax(120px, auto);
        }
        
        .calendar-cell {
          border-right: 1px solid #ddd;
          border-bottom: 1px solid #ddd;
          padding: 10px;
          position: relative;
        }
        
        .calendar-cell:nth-child(7n) {
          border-right: none;
        }
        
        .calendar-cell.empty {
          background-color: #f8f9fa;
        }
        
        .calendar-cell.today {
          background-color: #fff8e1;
        }
        
        .day-number {
          font-weight: 500;
          margin-bottom: 10px;
        }
        
        .day-events {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        
        .event-item {
          padding: 5px;
          border-radius: 4px;
          font-size: 12px;
          cursor: pointer;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .event-confirmed {
          background-color: #d4edda;
        }
        
        .event-pending {
          background-color: #fff3cd;
        }
        
        .event-cancelled {
          background-color: #f8d7da;
        }
        
        .event-completed {
          background-color: #d1ecf1;
        }
        
        .event-time {
          font-weight: 500;
          margin-right: 5px;
        }
        
        .more-events {
          font-size: 12px;
          color: #666;
          text-align: center;
        }
        
        .upcoming-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        
        .upcoming-item {
          display: flex;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          cursor: pointer;
        }
        
        .upcoming-confirmed {
          border-left: 4px solid #28a745;
        }
        
        .upcoming-pending {
          border-left: 4px solid #ffc107;
        }
        
        .upcoming-cancelled {
          border-left: 4px solid #dc3545;
        }
        
        .upcoming-completed {
          border-left: 4px solid #17a2b8;
        }
        
        .upcoming-date {
          width: 100px;
          display: flex;
          flex-direction: column;
        }
        
        .upcoming-details {
          flex: 1;
        }
        
        .upcoming-title {
          margin: 0 0 5px 0;
        }
        
        .upcoming-info {
          margin: 0;
          display: flex;
          gap: 15px;
          color: #666;
        }
        
        .upcoming-status {
          width: 100px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }
        
        /* Reports styles */
        .reports-form {
          padding: 15px;
        }
        
        .form-actions {
          display: flex;
          gap: 10px;
          margin-top: 20px;
        }
        
        .saved-reports-list, .templates-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        
        .saved-report-item, .template-item {
          padding: 15px;
          border: 1px solid #ddd;
          border-radius: 4px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .template-item {
          flex-direction: column;
          align-items: flex-start;
        }
        
        .report-info h4, .template-item h4 {
          margin: 0 0 5px 0;
        }
        
        .report-info p, .template-item p {
          margin: 0;
          color: #666;
        }
        
        .template-item button {
          margin-top: 10px;
          align-self: flex-end;
        }
        
        .report-actions {
          display: flex;
          gap: 10px;
        }
      `}</style>
    </div>
  );
};

export default FerryBookings;
