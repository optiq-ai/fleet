import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Card from '../common/Card';
import Table from '../common/Table';
import * as geofencingService from '../../services/api/mockGeofencingService';

const ManagerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: flex-end;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
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

const CreateButton = styled.button`
  background-color: #3f51b5;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-left: auto;
  
  &:hover {
    background-color: #303f9f;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0;
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

const TableActions = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button`
  padding: 6px 12px;
  background-color: ${props => props.delete ? '#f44336' : '#3f51b5'};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: ${props => props.delete ? '#d32f2f' : '#303f9f'};
  }
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
  
  label {
    display: block;
    margin-bottom: 6px;
    font-size: 14px;
    color: #666;
  }
  
  input, select, textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    
    &:focus {
      outline: none;
      border-color: #3f51b5;
    }
  }
  
  textarea {
    min-height: 100px;
    resize: vertical;
  }
`;

const CoordinatesPlaceholder = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  color: #666;
`;

const ScheduleContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
`;

const ScheduleDay = styled.div`
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 12px;
`;

const DayName = styled.div`
  font-weight: 500;
  margin-bottom: 8px;
  color: #333;
`;

const TimeInputs = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  
  input {
    flex: 1;
    padding: 8px;
  }
  
  span {
    color: #666;
  }
`;

const FormActions = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 24px;
  
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const SaveButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px 24px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #388e3c;
  }
  
  @media (max-width: 576px) {
    order: 1;
  }
`;

const CancelButton = styled.button`
  background-color: #f5f5f5;
  color: #666;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 12px 24px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background-color: #e0e0e0;
  }
  
  @media (max-width: 576px) {
    order: 2;
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
    <ManagerContainer>
      {/* Filters */}
      <Card title="Filters">
        <FiltersContainer>
          <FilterGroup>
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
          </FilterGroup>
          
          <FilterGroup>
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
          </FilterGroup>
          
          <FilterGroup>
            <label htmlFor="search-filter">Search:</label>
            <input 
              type="text" 
              id="search-filter" 
              value={filters.search} 
              onChange={(e) => handleFilterChange('search', e.target.value)}
              placeholder="Search by name or description"
            />
          </FilterGroup>
          
          <CreateButton onClick={handleCreateNew}>
            Create New Geofence
          </CreateButton>
        </FiltersContainer>
      </Card>
      
      {/* Geofence List */}
      <Card title="Geofences">
        {isLoading ? (
          <LoadingContainer>Loading geofences...</LoadingContainer>
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : geofences.items && geofences.items.length > 0 ? (
          <>
            <Table
              headers={['Name', 'Type', 'Category', 'Status', 'Actions']}
              data={geofences.items.map(geofence => [
                geofence.name,
                geofence.type,
                geofence.category,
                geofence.status,
                <TableActions>
                  <ActionButton 
                    onClick={() => handleGeofenceSelect(geofence.id)}
                  >
                    Edit
                  </ActionButton>
                  <ActionButton 
                    delete
                    onClick={() => handleDelete(geofence.id)}
                  >
                    Delete
                  </ActionButton>
                </TableActions>
              ])}
              onRowClick={(index) => handleGeofenceSelect(geofences.items[index].id)}
            />
            
            {/* Pagination */}
            <Pagination>
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
            </Pagination>
          </>
        ) : (
          <p>No geofences found.</p>
        )}
      </Card>
      
      {/* Geofence Form */}
      <Card title={isEditing ? `Edit Geofence: ${formData.name}` : "Create New Geofence"}>
        {isDetailLoading ? (
          <LoadingContainer>Loading geofence details...</LoadingContainer>
        ) : (
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <label htmlFor="name">Name:</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <label htmlFor="description">Description:</label>
              <textarea 
                id="description" 
                name="description" 
                value={formData.description} 
                onChange={handleInputChange}
              />
            </FormGroup>
            
            <FormGroup>
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
            </FormGroup>
            
            <FormGroup>
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
            </FormGroup>
            
            <FormGroup>
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
            </FormGroup>
            
            {formData.type === 'circle' && (
              <FormGroup>
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
              </FormGroup>
            )}
            
            <FormGroup>
              <label>Coordinates:</label>
              <CoordinatesPlaceholder>
                <p>Coordinates would be set using an interactive map.</p>
                {formData.type === 'circle' ? (
                  <p>Center point: Lat: {formData.coordinates[0]?.lat || 0}, Lng: {formData.coordinates[0]?.lng || 0}</p>
                ) : (
                  <p>Polygon with {formData.coordinates.length} points</p>
                )}
              </CoordinatesPlaceholder>
            </FormGroup>
            
            <FormGroup>
              <label>Schedule:</label>
              <ScheduleContainer>
                {Object.keys(formData.schedule).map(day => (
                  <ScheduleDay key={day}>
                    <DayName>{day.charAt(0).toUpperCase() + day.slice(1)}</DayName>
                    <TimeInputs>
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
                    </TimeInputs>
                  </ScheduleDay>
                ))}
              </ScheduleContainer>
            </FormGroup>
            
            <FormActions>
              <SaveButton type="submit">
                {isEditing ? 'Update Geofence' : 'Create Geofence'}
              </SaveButton>
              <CancelButton type="button" onClick={handleCreateNew}>
                Cancel
              </CancelButton>
            </FormActions>
          </form>
        )}
      </Card>
    </ManagerContainer>
  );
};

export default GeofenceManager;
