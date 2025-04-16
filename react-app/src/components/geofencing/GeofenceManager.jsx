import React, { useState, useEffect, useCallback } from 'react';
import Card from '../common/Card';
import Table from '../common/Table';
import * as geofencingService from '../../services/api/mockGeofencingService';

/**
 * GeofenceManager Component
 * 
 * Component for managing geofences - creating, editing, and deleting virtual boundaries.
 */
const GeofenceManager = () => {
  const [geofences, setGeofences] = useState([]);
  const [selectedGeofence, setSelectedGeofence] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: 'all',
    status: 'all',
    search: '',
    page: 1,
    limit: 10
  });
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'polygon',
    coordinates: [],
    radius: null,
    category: 'warehouse',
    status: 'active',
    schedule: {
      monday: { start: "08:00", end: "18:00" },
      tuesday: { start: "08:00", end: "18:00" },
      wednesday: { start: "08:00", end: "18:00" },
      thursday: { start: "08:00", end: "18:00" },
      friday: { start: "08:00", end: "18:00" },
      saturday: { start: null, end: null },
      sunday: { start: null, end: null }
    },
    metadata: {}
  });
  const [isEditing, setIsEditing] = useState(false);

  const loadGeofences = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await geofencingService.getGeofences(filters);
      setGeofences(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching geofences:', err);
      setError('Failed to load geofences. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadGeofences();
  }, [loadGeofences]);

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value,
      page: name !== 'page' ? 1 : value
    }));
  };

  const handleGeofenceSelect = async (id) => {
    try {
      setIsDetailLoading(true);
      const data = await geofencingService.getGeofenceDetails(id);
      setSelectedGeofence(data);
      setFormData(data);
      setIsEditing(true);
      setError(null);
    } catch (err) {
      console.error(`Error fetching geofence details for ID ${id}:`, err);
      setError(`Failed to load geofence details. Please try again later.`);
    } finally {
      setIsDetailLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      category: value
    }));
  };

  const handleTypeChange = (e) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      type: value,
      // Reset coordinates and radius based on type
      coordinates: value === 'circle' ? [{ lat: 0, lng: 0 }] : [],
      radius: value === 'circle' ? 500 : null
    }));
  };

  const handleStatusChange = (e) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      status: value
    }));
  };

  const handleScheduleChange = (day, field, value) => {
    setFormData(prev => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        [day]: {
          ...prev.schedule[day],
          [field]: value
        }
      }
    }));
  };

  const handleCreateNew = () => {
    setSelectedGeofence(null);
    setFormData({
      name: '',
      description: '',
      type: 'polygon',
      coordinates: [],
      radius: null,
      category: 'warehouse',
      status: 'active',
      schedule: {
        monday: { start: "08:00", end: "18:00" },
        tuesday: { start: "08:00", end: "18:00" },
        wednesday: { start: "08:00", end: "18:00" },
        thursday: { start: "08:00", end: "18:00" },
        friday: { start: "08:00", end: "18:00" },
        saturday: { start: null, end: null },
        sunday: { start: null, end: null }
      },
      metadata: {}
    });
    setIsEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsDetailLoading(true);
      
      if (isEditing && selectedGeofence) {
        // Update existing geofence
        await geofencingService.updateGeofence(selectedGeofence.id, formData);
      } else {
        // Create new geofence
        await geofencingService.createGeofence(formData);
      }
      
      // Reload geofences list
      await loadGeofences();
      
      // Reset form
      handleCreateNew();
      
      setError(null);
    } catch (err) {
      console.error('Error saving geofence:', err);
      setError('Failed to save geofence. Please try again later.');
    } finally {
      setIsDetailLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this geofence?')) {
      return;
    }
    
    try {
      setIsLoading(true);
      await geofencingService.deleteGeofence(id);
      
      // Reload geofences list
      await loadGeofences();
      
      // Reset form if the deleted geofence was selected
      if (selectedGeofence && selectedGeofence.id === id) {
        handleCreateNew();
      }
      
      setError(null);
    } catch (err) {
      console.error(`Error deleting geofence with ID ${id}:`, err);
      setError('Failed to delete geofence. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="geofence-manager">
      {/* Filters */}
      <Card title="Filters" className="filters-card">
        <div className="filters-container">
          <div className="filter-group">
            <label htmlFor="category-filter">Category:</label>
            <select 
              id="category-filter" 
              value={filters.category} 
              onChange={(e) => handleFilterChange('category', e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="warehouse">Warehouse</option>
              <option value="customer">Customer</option>
              <option value="restricted">Restricted</option>
              <option value="hazardous">Hazardous</option>
              <option value="corridor">Corridor</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label htmlFor="status-filter">Status:</label>
            <select 
              id="status-filter" 
              value={filters.status} 
              onChange={(e) => handleFilterChange('status', e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label htmlFor="search-filter">Search:</label>
            <input 
              type="text" 
              id="search-filter" 
              value={filters.search} 
              onChange={(e) => handleFilterChange('search', e.target.value)}
              placeholder="Search by name or description"
            />
          </div>
          
          <button 
            className="create-button"
            onClick={handleCreateNew}
          >
            Create New Geofence
          </button>
        </div>
      </Card>
      
      {/* Geofence List */}
      <Card title="Geofences" className="geofences-list-card">
        {isLoading ? (
          <div className="loading">Loading geofences...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : geofences.items && geofences.items.length > 0 ? (
          <>
            <Table
              headers={['Name', 'Type', 'Category', 'Status', 'Actions']}
              data={geofences.items.map(geofence => [
                geofence.name,
                geofence.type,
                geofence.category,
                geofence.status,
                <div className="table-actions">
                  <button 
                    className="edit-button"
                    onClick={() => handleGeofenceSelect(geofence.id)}
                  >
                    Edit
                  </button>
                  <button 
                    className="delete-button"
                    onClick={() => handleDelete(geofence.id)}
                  >
                    Delete
                  </button>
                </div>
              ])}
              onRowClick={(index) => handleGeofenceSelect(geofences.items[index].id)}
            />
            
            {/* Pagination */}
            <div className="pagination">
              <button 
                disabled={filters.page === 1}
                onClick={() => handleFilterChange('page', filters.page - 1)}
              >
                Previous
              </button>
              <span>Page {filters.page} of {geofences.totalPages}</span>
              <button 
                disabled={filters.page === geofences.totalPages}
                onClick={() => handleFilterChange('page', filters.page + 1)}
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <p>No geofences found.</p>
        )}
      </Card>
      
      {/* Geofence Form */}
      <Card title={isEditing ? `Edit Geofence: ${formData.name}` : "Create New Geofence"} className="geofence-form-card">
        {isDetailLoading ? (
          <div className="loading">Loading geofence details...</div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea 
                id="description" 
                name="description" 
                value={formData.description} 
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="type">Type:</label>
              <select 
                id="type" 
                name="type" 
                value={formData.type} 
                onChange={handleTypeChange}
              >
                <option value="polygon">Polygon</option>
                <option value="circle">Circle</option>
                <option value="corridor">Corridor</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="category">Category:</label>
              <select 
                id="category" 
                name="category" 
                value={formData.category} 
                onChange={handleCategoryChange}
              >
                <option value="warehouse">Warehouse</option>
                <option value="customer">Customer</option>
                <option value="restricted">Restricted</option>
                <option value="hazardous">Hazardous</option>
                <option value="corridor">Corridor</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="status">Status:</label>
              <select 
                id="status" 
                name="status" 
                value={formData.status} 
                onChange={handleStatusChange}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            
            {formData.type === 'circle' && (
              <div className="form-group">
                <label htmlFor="radius">Radius (meters):</label>
                <input 
                  type="number" 
                  id="radius" 
                  name="radius" 
                  value={formData.radius || ''} 
                  onChange={handleInputChange}
                  min="1"
                  required
                />
              </div>
            )}
            
            <div className="form-group">
              <label>Coordinates:</label>
              <div className="coordinates-placeholder">
                <p>Coordinates would be set using an interactive map.</p>
                {formData.type === 'circle' ? (
                  <p>Center point: Lat: {formData.coordinates[0]?.lat || 0}, Lng: {formData.coordinates[0]?.lng || 0}</p>
                ) : (
                  <p>Polygon with {formData.coordinates.length} points</p>
                )}
              </div>
            </div>
            
            <div className="form-group">
              <label>Schedule:</label>
              <div className="schedule-container">
                {Object.keys(formData.schedule).map(day => (
                  <div key={day} className="schedule-day">
                    <div className="day-name">{day.charAt(0).toUpperCase() + day.slice(1)}</div>
                    <div className="time-inputs">
                      <input 
                        type="time" 
                        value={formData.schedule[day].start || ''} 
                        onChange={(e) => handleScheduleChange(day, 'start', e.target.value)}
                      />
                      <span>to</span>
                      <input 
                        type="time" 
                        value={formData.schedule[day].end || ''} 
                        onChange={(e) => handleScheduleChange(day, 'end', e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="form-actions">
              <button type="submit" className="save-button">
                {isEditing ? 'Update Geofence' : 'Create Geofence'}
              </button>
              <button type="button" className="cancel-button" onClick={handleCreateNew}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
};

export default GeofenceManager;
