import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Card from '../common/Card';
import Table from '../common/Table';
import * as geofencingService from '../../services/api/mockGeofencingService';

const ConfigurationContainer = styled.div`
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

const ScheduleContainer = styled.div`
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
`;

const ScheduleActive = styled.div`
  margin-bottom: 16px;
  
  label {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    
    input {
      width: auto;
    }
  }
`;

const ScheduleDays = styled.div`
  margin-bottom: 16px;
  
  label {
    display: block;
    margin-bottom: 8px;
  }
`;

const DaysCheckboxes = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  
  label {
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    margin-bottom: 0;
    
    input {
      width: auto;
    }
  }
`;

const ScheduleTimes = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const TimeInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const RecipientsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const RecipientRow = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-end;
  
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const RecipientType = styled.div`
  flex: 1;
`;

const RecipientValue = styled.div`
  flex: 2;
`;

const RecipientActions = styled.div`
  display: flex;
  gap: 8px;
`;

const AddRecipientButton = styled.button`
  background-color: #3f51b5;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  align-self: flex-start;
  margin-top: 8px;
  
  &:hover {
    background-color: #303f9f;
  }
`;

const RemoveRecipientButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #d32f2f;
  }
  
  @media (max-width: 576px) {
    align-self: flex-end;
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
    <ConfigurationContainer>
      {/* Filters */}
      <Card title="Filters">
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
          
          <CreateButton onClick={handleCreateNew}>
            Create New Alert Rule
          </CreateButton>
        </FiltersContainer>
      </Card>
      
      {/* Alert Rules List */}
      <Card title="Alert Rules">
        {isLoading ? (
          <LoadingContainer>Loading alert rules...</LoadingContainer>
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
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
                <TableActions>
                  <ActionButton 
                    onClick={() => handleRuleSelect(rule.id)}
                  >
                    Edit
                  </ActionButton>
                  <ActionButton 
                    delete
                    onClick={() => handleDelete(rule.id)}
                  >
                    Delete
                  </ActionButton>
                </TableActions>
              ])}
              onRowClick={(index) => handleRuleSelect(alertRules.items[index].id)}
            />
            
            {/* Pagination */}
            <Pagination>
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
            </Pagination>
          </>
        ) : (
          <p>No alert rules found.</p>
        )}
      </Card>
      
      {/* Alert Rule Form */}
      <Card title={isEditing ? `Edit Alert Rule: ${formData.name}` : "Create New Alert Rule"}>
        {isDetailLoading ? (
          <LoadingContainer>Loading alert rule details...</LoadingContainer>
        ) : (
          <form onSubmit={handleSubmit}>
            <FormGroup>
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
            </FormGroup>
            
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
            </FormGroup>
            
            {formData.triggerOn === 'dwell' && (
              <FormGroup>
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
              </FormGroup>
            )}
            
            <FormGroup>
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
            
            <FormGroup>
              <label>Schedule:</label>
              <ScheduleContainer>
                <ScheduleActive>
                  <label>
                    <input 
                      type="checkbox" 
                      checked={formData.schedule.active} 
                      onChange={(e) => handleScheduleChange('active', e.target.checked)}
                    />
                    Active
                  </label>
                </ScheduleActive>
                
                <ScheduleDays>
                  <label>Days:</label>
                  <DaysCheckboxes>
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
                  </DaysCheckboxes>
                </ScheduleDays>
                
                <ScheduleTimes>
                  <TimeInput>
                    <label htmlFor="startTime">Start Time:</label>
                    <input 
                      type="time" 
                      id="startTime" 
                      value={formData.schedule.startTime} 
                      onChange={(e) => handleScheduleChange('startTime', e.target.value)}
                    />
                  </TimeInput>
                  
                  <TimeInput>
                    <label htmlFor="endTime">End Time:</label>
                    <input 
                      type="time" 
                      id="endTime" 
                      value={formData.schedule.endTime} 
                      onChange={(e) => handleScheduleChange('endTime', e.target.value)}
                    />
                  </TimeInput>
                </ScheduleTimes>
              </ScheduleContainer>
            </FormGroup>
            
            <FormGroup>
              <label>Recipients:</label>
              <RecipientsContainer>
                {formData.recipients.map((recipient, index) => (
                  <RecipientRow key={index}>
                    <RecipientType>
                      <label htmlFor={`recipientType-${index}`}>Type:</label>
                      <select 
                        id={`recipientType-${index}`}
                        value={recipient.type} 
                        onChange={(e) => handleRecipientChange(index, 'type', e.target.value)}
                      >
                        <option value="email">Email</option>
                        <option value="sms">SMS</option>
                        <option value="webhook">Webhook</option>
                      </select>
                    </RecipientType>
                    
                    <RecipientValue>
                      <label htmlFor={`recipientValue-${index}`}>Value:</label>
                      <input 
                        type="text" 
                        id={`recipientValue-${index}`}
                        value={recipient.value} 
                        onChange={(e) => handleRecipientChange(index, 'value', e.target.value)}
                        placeholder={recipient.type === 'email' ? 'email@example.com' : recipient.type === 'sms' ? '+1234567890' : 'https://example.com/webhook'}
                        required
                      />
                    </RecipientValue>
                    
                    {formData.recipients.length > 1 && (
                      <RecipientActions>
                        <RemoveRecipientButton 
                          type="button"
                          onClick={() => handleRemoveRecipient(index)}
                        >
                          Remove
                        </RemoveRecipientButton>
                      </RecipientActions>
                    )}
                  </RecipientRow>
                ))}
                
                <AddRecipientButton 
                  type="button"
                  onClick={handleAddRecipient}
                >
                  Add Recipient
                </AddRecipientButton>
              </RecipientsContainer>
            </FormGroup>
            
            <FormActions>
              <SaveButton type="submit">
                {isEditing ? 'Update Alert Rule' : 'Create Alert Rule'}
              </SaveButton>
              <CancelButton type="button" onClick={handleCreateNew}>
                Cancel
              </CancelButton>
            </FormActions>
          </form>
        )}
      </Card>
    </ConfigurationContainer>
  );
};

export default AlertConfiguration;
