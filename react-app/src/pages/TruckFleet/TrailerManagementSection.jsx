import React, { useState, useEffect } from 'react';
import './TrailerManagement.css'; // Reuse the existing CSS

// Mock data for trailers (can be moved to a shared location later)
const mockTrailers = [
  {
    id: 'TRL001',
    registrationNumber: 'NA123BC',
    type: 'Curtainside',
    make: 'Schmitz Cargobull',
    year: 2020,
    status: 'active',
    currentTruck: 'TRK001',
    nextInspection: '2025-09-01'
  },
  {
    id: 'TRL002',
    registrationNumber: 'NB456DE',
    type: 'Refrigerated',
    make: 'Krone',
    year: 2021,
    status: 'active',
    currentTruck: 'TRK002',
    nextInspection: '2025-07-15'
  },
  {
    id: 'TRL003',
    registrationNumber: 'NC789FG',
    type: 'Tank',
    make: 'Feldbinder',
    year: 2019,
    status: 'maintenance',
    currentTruck: 'N/A',
    nextInspection: 'N/A'
  },
  {
    id: 'TRL004',
    registrationNumber: 'ND101HI',
    type: 'Platform',
    make: 'Wielton',
    year: 2022,
    status: 'active',
    currentTruck: 'TRK004',
    nextInspection: '2025-10-20'
  },
  {
    id: 'TRL005',
    registrationNumber: 'NE202JK',
    type: 'Curtainside',
    make: 'Kögel',
    year: 2020,
    status: 'inactive',
    currentTruck: 'N/A',
    nextInspection: '2025-11-05'
  }
];

/**
 * TrailerManagementSection component
 * 
 * Section within the comprehensive dashboard for managing trailers.
 * Displays a list of trailers and allows basic operations.
 * 
 * @returns {JSX.Element} TrailerManagementSection component
 */
const TrailerManagementSection = () => {
  const [trailers, setTrailers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTrailer, setSelectedTrailer] = useState(null);

  // Fetch trailer data
  useEffect(() => {
    const fetchTrailers = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        setTimeout(() => {
          setTrailers(mockTrailers);
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching trailers:', error);
        setIsLoading(false);
      }
    };
    fetchTrailers();
  }, []);

  // Filter trailers based on search term
  const filteredTrailers = trailers.filter(trailer => 
    trailer.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trailer.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trailer.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (trailer.currentTruck && trailer.currentTruck.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Handle viewing trailer details
  const handleViewDetails = (trailer) => {
    setSelectedTrailer(trailer);
    console.log('View details for:', trailer.id);
    // In a real app, this might open a modal or navigate to a details page
  };

  // Handle adding a new trailer (placeholder)
  const handleAddTrailer = () => {
    console.log('Add new trailer clicked');
    // In a real app, this would open a form or modal
  };

  // Handle editing a trailer (placeholder)
  const handleEditTrailer = (trailer) => {
    console.log('Edit trailer clicked:', trailer.id);
    // In a real app, this would open a form or modal with trailer data
  };

  // Handle deleting a trailer (placeholder)
  const handleDeleteTrailer = (trailerId) => {
    console.log('Delete trailer clicked:', trailerId);
    // In a real app, this would show a confirmation dialog and make an API call
    // For now, we'll just filter it out from the local state
    setTrailers(prevTrailers => prevTrailers.filter(trailer => trailer.id !== trailerId));
  };

  if (isLoading) {
    return <div className="loading-container">Loading trailers...</div>;
  }

  return (
    <div className="trailer-management-section">
      <div className="toolbar">
        <input 
          type="text"
          placeholder="Search trailers (Reg. No, Type, Make, Truck ID)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button className="add-button" onClick={handleAddTrailer}>Add New Trailer</button>
      </div>

      <div className="trailer-list-container">
        <table className="trailer-table">
          <thead>
            <tr>
              <th>Reg. Number</th>
              <th>Type</th>
              <th>Make</th>
              <th>Year</th>
              <th>Status</th>
              <th>Current Truck</th>
              <th>Next Inspection</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTrailers.length > 0 ? (
              filteredTrailers.map(trailer => (
                <tr key={trailer.id}>
                  <td>{trailer.registrationNumber}</td>
                  <td>{trailer.type}</td>
                  <td>{trailer.make}</td>
                  <td>{trailer.year}</td>
                  <td>
                    <span className={`status-badge status-${trailer.status.toLowerCase()}`}>
                      {trailer.status}
                    </span>
                  </td>
                  <td>{trailer.currentTruck || 'N/A'}</td>
                  <td>{trailer.nextInspection}</td>
                  <td>
                    <button className="action-button view" onClick={() => handleViewDetails(trailer)}>View</button>
                    <button className="action-button edit" onClick={() => handleEditTrailer(trailer)}>Edit</button>
                    <button className="action-button delete" onClick={() => handleDeleteTrailer(trailer.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="no-results">No trailers found matching your search criteria.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Placeholder for Trailer Details Modal/View */}
      {selectedTrailer && (
        <div className="details-placeholder">
          <h2>Details for {selectedTrailer.registrationNumber}</h2>
          <p>Type: {selectedTrailer.type}</p>
          <p>Make: {selectedTrailer.make}</p>
          <p>Status: {selectedTrailer.status}</p>
          <p>Current Truck: {selectedTrailer.currentTruck || 'N/A'}</p>
          <button onClick={() => setSelectedTrailer(null)}>Close Details</button>
        </div>
      )}
    </div>
  );
};

export default TrailerManagementSection;

