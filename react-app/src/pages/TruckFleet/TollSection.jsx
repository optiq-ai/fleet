import React, { useState, useEffect } from 'react';
import './TollManagement.css'; // We'll create this CSS file later if needed

// Mock data for toll expenses
const mockTollExpenses = [
  {
    id: 'TL001',
    routeId: 'RT001',
    truckId: 'TRK001',
    country: 'Germany',
    tollProvider: 'Toll Collect',
    date: '2025-04-28',
    amount: 125.50,
    currency: 'EUR',
    paymentStatus: 'paid'
  },
  {
    id: 'TL002',
    routeId: 'RT002',
    truckId: 'TRK002',
    country: 'France',
    tollProvider: 'ASFA',
    date: '2025-04-27',
    amount: 210.00,
    currency: 'EUR',
    paymentStatus: 'paid'
  },
  {
    id: 'TL003',
    routeId: 'RT002',
    truckId: 'TRK002',
    country: 'Spain',
    tollProvider: 'Via-T',
    date: '2025-04-29',
    amount: 180.75,
    currency: 'EUR',
    paymentStatus: 'pending'
  },
  {
    id: 'TL004',
    routeId: 'RT003',
    truckId: 'TRK004',
    country: 'Italy',
    tollProvider: 'Telepass',
    date: '2025-04-29',
    amount: 95.20,
    currency: 'EUR',
    paymentStatus: 'pending'
  },
  {
    id: 'TL005',
    routeId: 'RT004',
    truckId: 'TRK001',
    country: 'Belgium',
    tollProvider: 'Viapass',
    date: '2025-04-26',
    amount: 65.00,
    currency: 'EUR',
    paymentStatus: 'paid'
  }
];

/**
 * TollSection component
 * 
 * Section within the comprehensive dashboard for managing toll expenses.
 * Displays a list of toll records and allows basic operations.
 * 
 * @returns {JSX.Element} TollSection component
 */
const TollSection = () => {
  const [tollExpenses, setTollExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [filter, setFilter] = useState({ country: 'all', status: 'all' });

  // Fetch toll data
  useEffect(() => {
    const fetchTollExpenses = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        setTimeout(() => {
          setTollExpenses(mockTollExpenses);
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching toll expenses:', error);
        setIsLoading(false);
      }
    };
    fetchTollExpenses();
  }, []);

  // Filter toll expenses
  const filteredExpenses = tollExpenses.filter(expense => 
    (expense.routeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
     expense.truckId.toLowerCase().includes(searchTerm.toLowerCase()) ||
     expense.tollProvider.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filter.country === 'all' || expense.country === filter.country) &&
    (filter.status === 'all' || expense.paymentStatus === filter.status)
  );

  // Format currency
  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(amount);
  };

  // Handle viewing expense details
  const handleViewDetails = (expense) => {
    setSelectedExpense(expense);
    console.log('View details for toll expense:', expense.id);
  };

  // Handle adding a new expense (placeholder)
  const handleAddExpense = () => {
    console.log('Add new toll expense clicked');
    // In a real app, this would open a form or modal
  };

  // Handle editing an expense (placeholder)
  const handleEditExpense = (expense) => {
    console.log('Edit toll expense clicked:', expense.id);
    // In a real app, this would open a form or modal with expense data
  };

  // Handle deleting an expense (placeholder)
  const handleDeleteExpense = (expenseId) => {
    console.log('Delete toll expense clicked:', expenseId);
    // In a real app, this would show a confirmation dialog and make an API call
    setTollExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== expenseId));
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(prevFilter => ({ ...prevFilter, [name]: value }));
  };

  // Get unique countries for filter dropdown
  const countries = [...new Set(mockTollExpenses.map(exp => exp.country))];

  if (isLoading) {
    return <div className="loading-container">Loading toll expenses...</div>;
  }

  return (
    <div className="toll-section">
      <div className="toolbar">
        <div className="search-filters">
          <input 
            type="text"
            placeholder="Search by Route, Truck, Provider..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select 
            name="country"
            value={filter.country}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="all">All Countries</option>
            {countries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
          <select 
            name="status"
            value={filter.status}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="all">All Statuses</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>
        <button className="add-button" onClick={handleAddExpense}>Add Toll Expense</button>
      </div>

      <div className="toll-list-container">
        <table className="toll-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Route ID</th>
              <th>Truck ID</th>
              <th>Country</th>
              <th>Provider</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.length > 0 ? (
              filteredExpenses.map(expense => (
                <tr key={expense.id}>
                  <td>{expense.date}</td>
                  <td>{expense.routeId}</td>
                  <td>{expense.truckId}</td>
                  <td>{expense.country}</td>
                  <td>{expense.tollProvider}</td>
                  <td>{formatCurrency(expense.amount, expense.currency)}</td>
                  <td>
                    <span className={`status-badge status-${expense.paymentStatus.toLowerCase()}`}>
                      {expense.paymentStatus}
                    </span>
                  </td>
                  <td>
                    <button className="action-button view" onClick={() => handleViewDetails(expense)}>View</button>
                    <button className="action-button edit" onClick={() => handleEditExpense(expense)}>Edit</button>
                    <button className="action-button delete" onClick={() => handleDeleteExpense(expense.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="no-results">No toll expenses found matching your search criteria.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Placeholder for Expense Details Modal/View */}
      {selectedExpense && (
        <div className="details-placeholder">
          <h2>Toll Expense Details: {selectedExpense.id}</h2>
          <p>Route: {selectedExpense.routeId}</p>
          <p>Truck: {selectedExpense.truckId}</p>
          <p>Country: {selectedExpense.country}</p>
          <p>Amount: {formatCurrency(selectedExpense.amount, selectedExpense.currency)}</p>
          <p>Status: {selectedExpense.paymentStatus}</p>
          <button onClick={() => setSelectedExpense(null)}>Close Details</button>
        </div>
      )}
    </div>
  );
};

export default TollSection;

