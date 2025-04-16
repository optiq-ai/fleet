import React, { useState, useEffect, useCallback } from 'react';
import Card from '../common/Card';
import Table from '../common/Table';
import * as geofencingService from '../../services/api/mockGeofencingService';

/**
 * AlertConfiguration Component
 * 
 * Component for configuring alert rules for geofence violations.
 */
const AlertConfiguration = () => {
  const [alertRules, setAlertRules] = useState([]);
  const [selectedRule, setSelectedRule] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    geofenceId: '',
    page: 1,
    limit: 10
  });
  const [formData, setFormData] = useState({
    geofenceId: '',
    geofenceName: '',
    name: '',
    description: '',
    triggerOn: 'entry',
    dwellThreshold: null,
    schedule: {
      active: true,
      days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
      startTime: "08:00",
      endTime: "18:00"
    },
    recipients: [
      { type: "email", value: "" }
    ],
    priority: "medium",
    status: "active"
  });
  const [isEditing, setIsEditing] = useState(false);
  const [geofences, setGeofences] = useState([]);

  const loadAlertRules = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await geofencingService.getAlertRules(filters);
      setAlertRules(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching alert rules:', err);
      setError('Failed to load alert rules. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  const loadGeofences = useCallback(async () => {
    try {
      const data = await geofencingService.getGeofences({ limit: 100 });
      setGeofences(data.items);
    } catch (err) {
      console.error('Error fetching geofences:', err);
    }
  }, []);

  useEffect(() => {
    loadAlertRules();
    loadGeofences();
  }, [loadAlertRules, loadGeofences]);

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value,
      page: name !== 'page' ? 1 : value
    }));
  };

  const handleRuleSelect = async (id) => {
    try {
      setIsDetailLoading(true);
      // Find the rule in the current list
      const rule = alertRules.items.find(r => r.id === id);
      if (rule) {
        setSelectedRule(rule);
        setFormData(rule);
        setIsEditing(true);
      }
      setError(null);
    } catch (err) {
      console.error(`Error selecting alert rule with ID ${id}:`, err);
      setError(`Failed to load alert rule details. Please try again later.`);
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

  const handleGeofenceChange = (e) => {
    const { value } = e.target;
    const selectedGeofence = geofences.find(g => g.id === value);
    setFormData(prev => ({
      ...prev,
      geofenceId: value,
      geofenceName: selectedGeofence ? selectedGeofence.name : ''
    }));
  };

  const handleTriggerChange = (e) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      triggerOn: value,
      // Reset dwell threshold if not dwell
      dwellThreshold: value === 'dwell' ? 900 : null
    }));
  };

  const handlePriorityChange = (e) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      priority: value
    }));
  };

  const handleStatusChange = (e) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      status: value
    }));
  };

  const handleScheduleChange = (field, value) => {
    if (field === 'days') {
      // Handle days array
      const day = value;
      const newDays = [...formData.schedule.days];
      const index = newDays.indexOf(day);
      
      if (index === -1) {
        newDays.push(day);
      } else {
        newDays.splice(index, 1);
      }
      
      setFormData(prev => ({
        ...prev,
        schedule: {
          ...prev.schedule,
          days: newDays
        }
      }));
    } else {
      // Handle other schedule fields
      setFormData(prev => ({
        ...prev,
        schedule: {
          ...prev.schedule,
          [field]: value
        }
      }));
    }
  };

  const handleRecipientChange = (index, field, value) => {
    const newRecipients = [...formData.recipients];
    newRecipients[index] = {
      ...newRecipients[index],
      [field]: value
    };
    
    setFormData(prev => ({
      ...prev,
      recipients: newRecipients
    }));
  };

  const handleAddRecipient = () => {
    setFormData(prev => ({
      ...prev,
      recipients: [...prev.recipients, { type: "email", value: "" }]
    }));
  };

  const handleRemoveRecipient = (index) => {
    const newRecipients = [...formData.recipients];
    newRecipients.splice(index, 1);
    
    setFormData(prev => ({
      ...prev,
      recipients: newRecipients
    }));
  };

  const handleCreateNew = () => {
    setSelectedRule(null);
    setFormData({
      geofenceId: '',
      geofenceName: '',
      name: '',
      description: '',
      triggerOn: 'entry',
      dwellThreshold: null,
      schedule: {
        active: true,
        days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
        startTime: "08:00",
        endTime: "18:00"
      },
      recipients: [
        { type: "email", value: "" }
      ],
      priority: "medium",
      status: "active"
    });
    setIsEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.geofenceId) {
      setError('Please select a geofence.');
      return;
    }
    
    if (!formData.name) {
      setError('Please enter a name for the alert rule.');
      return;
    }
    
    if (formData.triggerOn === 'dwell' && (!formData.dwellThreshold || formData.dwellThreshold <= 0)) {
      setError('Please enter a valid dwell threshold.');
      return;
    }
    
    if (formData.recipients.length === 0) {
      setError('Please add at least one recipient.');
      return;
    }
    
    for (const recipient of formData.recipients) {
      if (!recipient.value) {
        setError('Please enter a value for all recipients.');
        return;
      }
    }
    
    try {
      setIsDetailLoading(true);
      
      if (isEditing && selectedRule) {
        // Update existing rule
        await geofencingService.updateAlertRule(selectedRule.id, formData);
      } else {
        // Create new rule
        await geofencingService.configureAlertRule(formData);
      }
      
      // Reload alert rules list
      await loadAlertRules();
      
      // Reset form
      handleCreateNew();
      
      setError(null);
    } catch (err) {
      console.error('Error saving alert rule:', err);
      setError('Failed to save alert rule. Please try again later.');
    } finally {
      setIsDetailLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this alert rule?')) {
      return;
    }
    
    try {
      setIsLoading(true);
      await geofencingService.deleteAlertRule(id);
      
      // Reload alert rules list
      await loadAlertRules();
      
      // Reset form if the deleted rule was selected
      if (selectedRule && selectedRule.id === id) {
        handleCreateNew();
      }
      
      setError(null);
    } catch (err) {
      console.error(`Error deleting alert rule with ID ${id}:`, err);
      setError('Failed to delete alert rule. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="alert-configuration">
      {/* Filters */}
      <Card title="Filters" className="filters-card">
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
          
          <button 
            className="create-button"
            onClick={handleCreateNew}
          >
            Create New Alert Rule
          </button>
        </div>
      </Card>
      
      {/* Alert Rules List */}
      <Card title="Alert Rules" className="alert-rules-list-card">
        {isLoading ? (
          <div className="loading">Loading alert rules...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : alertRules.items && alertRules.items.length > 0 ? (
          <>
            <Table
              headers={['Name', 'Geofence', 'Trigger', 'Priority', 'Status', 'Actions']}
              data={alertRules.items.map(rule => [
                rule.name,
                rule.geofenceName,
                rule.triggerOn,
                rule.priority,
                rule.status,
                <div className="table-actions">
                  <button 
                    className="edit-button"
                    onClick={() => handleRuleSelect(rule.id)}
                  >
                    Edit
                  </button>
                  <button 
                    className="delete-button"
                    onClick={() => handleDelete(rule.id)}
                  >
                    Delete
                  </button>
                </div>
              ])}
              onRowClick={(index) => handleRuleSelect(alertRules.items[index].id)}
            />
            
            {/* Pagination */}
            <div className="pagination">
              <button 
                disabled={filters.page === 1}
                onClick={() => handleFilterChange('page', filters.page - 1)}
              >
                Previous
              </button>
              <span>Page {filters.page} of {alertRules.totalPages}</span>
              <button 
                disabled={filters.page === alertRules.totalPages}
                onClick={() => handleFilterChange('page', filters.page + 1)}
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <p>No alert rules found.</p>
        )}
      </Card>
      
      {/* Alert Rule Form */}
      <Card title={isEditing ? `Edit Alert Rule: ${formData.name}` : "Create New Alert Rule"} className="alert-rule-form-card">
        {isDetailLoading ? (
          <div className="loading">Loading alert rule details...</div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="geofenceId">Geofence:</label>
              <select 
                id="geofenceId" 
                name="geofenceId" 
                value={formData.geofenceId} 
                onChange={handleGeofenceChange}
                required
              >
                <option value="">Select Geofence</option>
                {geofences.map(geofence => (
                  <option key={geofence.id} value={geofence.id}>{geofence.name}</option>
                ))}
              </select>
            </div>
            
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
              <label htmlFor="triggerOn">Trigger On:</label>
              <select 
                id="triggerOn" 
                name="triggerOn" 
                value={formData.triggerOn} 
                onChange={handleTriggerChange}
              >
                <option value="entry">Entry</option>
                <option value="exit">Exit</option>
                <option value="dwell">Dwell Time</option>
              </select>
            </div>
            
            {formData.triggerOn === 'dwell' && (
              <div className="form-group">
                <label htmlFor="dwellThreshold">Dwell Threshold (seconds):</label>
                <input 
                  type="number" 
                  id="dwellThreshold" 
                  name="dwellThreshold" 
                  value={formData.dwellThreshold || ''} 
                  onChange={handleInputChange}
                  min="1"
                  required
                />
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="priority">Priority:</label>
              <select 
                id="priority" 
                name="priority" 
                value={formData.priority} 
                onChange={handlePriorityChange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
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
            
            <div className="form-group">
              <label>Schedule:</label>
              <div className="schedule-container">
                <div className="schedule-active">
                  <label>
                    <input 
                      type="checkbox" 
                      checked={formData.schedule.active} 
                      onChange={(e) => handleScheduleChange('active', e.target.checked)}
                    />
                    Active
                  </label>
                </div>
                
                <div className="schedule-days">
                  <label>Days:</label>
                  <div className="days-checkboxes">
                    {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(day => (
                      <label key={day}>
                        <input 
                          type="checkbox" 
                          checked={formData.schedule.days.includes(day)} 
                          onChange={() => handleScheduleChange('days', day)}
                        />
                        {day.charAt(0).toUpperCase() + day.slice(1)}
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="schedule-times">
                  <div className="time-input">
                    <label htmlFor="startTime">Start Time:</label>
                    <input 
                      type="time" 
                      id="startTime" 
                      value={formData.schedule.startTime} 
                      onChange={(e) => handleScheduleChange('startTime', e.target.value)}
                    />
                  </div>
                  
                  <div className="time-input">
                    <label htmlFor="endTime">End Time:</label>
                    <input 
                      type="time" 
                      id="endTime" 
                      value={formData.schedule.endTime} 
                      onChange={(e) => handleScheduleChange('endTime', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="form-group">
              <label>Recipients:</label>
              <div className="recipients-container">
                {formData.recipients.map((recipient, index) => (
                  <div key={index} className="recipient-row">
                    <select 
                      value={recipient.type} 
                      onChange={(e) => handleRecipientChange(index, 'type', e.target.value)}
                    >
                      <option value="email">Email</option>
                      <option value="sms">SMS</option>
                    </select>
                    <input 
                      type={recipient.type === 'email' ? 'email' : 'tel'} 
                      value={recipient.value} 
                      onChange={(e) => handleRecipientChange(index, 'value', e.target.value)}
                      placeholder={recipient.type === 'email' ? 'Email address' : 'Phone number'}
                      required
                    />
                    <button 
                      type="button" 
                      className="remove-button"
                      onClick={() => handleRemoveRecipient(index)}
                      disabled={formData.recipients.length <= 1}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button 
                  type="button" 
                  className="add-button"
                  onClick={handleAddRecipient}
                >
                  Add Recipient
                </button>
              </div>
            </div>
            
            <div className="form-actions">
              <button type="submit" className="save-button">
                {isEditing ? 'Update Alert Rule' : 'Create Alert Rule'}
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

export default AlertConfiguration;
