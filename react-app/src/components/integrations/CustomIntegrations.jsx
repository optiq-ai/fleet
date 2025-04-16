import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getCustomIntegrations, createCustomIntegration, updateCustomIntegration, deleteCustomIntegration, getIntegrationLogs } from '../../services/api/integrationsService';

const Container = styled.div`
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 18px;
  color: #333;
  margin: 0;
`;

const Button = styled.button`
  background-color: #1a73e8;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1557b0;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const IntegrationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const IntegrationCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const IntegrationHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const IntegrationIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  background-color: #f1f3f4;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  overflow: hidden;

  span {
    font-size: 24px;
    color: #1a73e8;
  }
`;

const IntegrationInfo = styled.div`
  flex: 1;
`;

const IntegrationName = styled.h3`
  font-size: 16px;
  color: #333;
  margin: 0 0 5px 0;
`;

const IntegrationType = styled.div`
  font-size: 12px;
  color: #666;
`;

const IntegrationDescription = styled.p`
  font-size: 14px;
  color: #555;
  margin: 0 0 15px 0;
  flex: 1;
`;

const IntegrationDetails = styled.div`
  margin-bottom: 15px;
`;

const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 13px;
`;

const DetailLabel = styled.span`
  color: #666;
`;

const DetailValue = styled.span`
  color: #333;
  font-weight: 500;
`;

const IntegrationFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  background-color: ${props => {
    switch(props.status) {
      case 'active': return '#e6f4ea';
      case 'inactive': return '#f1f3f4';
      case 'error': return '#fce8e6';
      case 'draft': return '#e8f0fe';
      default: return '#f1f3f4';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'active': return '#34a853';
      case 'inactive': return '#5f6368';
      case 'error': return '#ea4335';
      case 'draft': return '#1a73e8';
      default: return '#5f6368';
    }
  }};
`;

const ActionButton = styled.button`
  background-color: transparent;
  border: none;
  color: #1a73e8;
  cursor: pointer;
  font-size: 14px;
  padding: 5px;
  margin-right: 10px;
  
  &:hover {
    text-decoration: underline;
  }

  &.delete {
    color: #ea4335;
  }
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  color: #333;
  margin: 30px 0 15px 0;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

const TableHeader = styled.th`
  padding: 12px 15px;
  text-align: left;
  background-color: #f8f9fa;
  color: #333;
  font-weight: bold;
  border-bottom: 1px solid #eee;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f8f9fa;
  }
  
  &:hover {
    background-color: #f0f5ff;
  }
`;

const TableCell = styled.td`
  padding: 12px 15px;
  border-bottom: 1px solid #eee;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  width: 800px;
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ModalTitle = styled.h3`
  font-size: 18px;
  color: #333;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #666;
  
  &:hover {
    color: #333;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.label`
  font-size: 14px;
  color: #333;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #1a73e8;
  }
`;

const Textarea = styled.textarea`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #1a73e8;
  }
`;

const Select = styled.select`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #1a73e8;
  }
`;

const Checkbox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  
  input {
    width: 16px;
    height: 16px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
`;

const CancelButton = styled.button`
  background-color: white;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  
  &:hover {
    background-color: #f1f3f4;
  }
`;

const SaveButton = styled.button`
  background-color: #1a73e8;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  
  &:hover {
    background-color: #1557b0;
  }
`;

const InfoText = styled.p`
  font-size: 14px;
  color: #666;
  margin: 5px 0;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #666;
`;

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #ea4335;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background-color: #f8f9fa;
  border-radius: 8px;
  text-align: center;
`;

const EmptyStateIcon = styled.div`
  font-size: 48px;
  color: #dadce0;
  margin-bottom: 16px;
`;

const EmptyStateText = styled.p`
  font-size: 16px;
  color: #5f6368;
  margin-bottom: 24px;
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
`;

const Tab = styled.div`
  padding: 10px 20px;
  cursor: pointer;
  border-bottom: 2px solid ${props => props.active ? '#1a73e8' : 'transparent'};
  color: ${props => props.active ? '#1a73e8' : '#333'};
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  transition: all 0.3s ease;

  &:hover {
    color: #1a73e8;
  }
`;

const CodeEditor = styled.div`
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 15px;
`;

const CodeEditorHeader = styled.div`
  background-color: #f8f9fa;
  padding: 8px 12px;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CodeEditorTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #333;
`;

const CodeEditorContent = styled.textarea`
  width: 100%;
  min-height: 300px;
  padding: 12px;
  font-family: monospace;
  font-size: 14px;
  line-height: 1.5;
  border: none;
  resize: vertical;
  
  &:focus {
    outline: none;
  }
`;

const StepContainer = styled.div`
  margin-bottom: 20px;
`;

const StepHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f8f9fa;
  padding: 10px 15px;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const StepTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #333;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StepActions = styled.div`
  display: flex;
  gap: 5px;
`;

const StepContent = styled.div`
  padding: 0 15px;
`;

const AddStepButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 10px;
  background-color: #f8f9fa;
  border: 1px dashed #ddd;
  border-radius: 4px;
  color: #1a73e8;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 20px;
  
  &:hover {
    background-color: #e8f0fe;
  }
`;

const LogEntry = styled.div`
  padding: 10px 15px;
  border-bottom: 1px solid #eee;
  font-family: monospace;
  font-size: 13px;
  white-space: pre-wrap;
  word-break: break-all;
  
  &.error {
    color: #ea4335;
    background-color: #fce8e6;
  }
  
  &.warning {
    color: #fbbc04;
    background-color: #fff8e6;
  }
  
  &.info {
    color: #1a73e8;
  }
  
  &.success {
    color: #34a853;
  }
`;

const LogTimestamp = styled.span`
  color: #666;
  margin-right: 10px;
`;

/**
 * CustomIntegrations component for creating and managing custom integration workflows
 * @param {Object} props - Component props
 * @param {boolean} props.useMockData - Flag to use mock data instead of API
 * @returns {JSX.Element} CustomIntegrations component
 */
const CustomIntegrations = ({ useMockData = true }) => {
  const [integrations, setIntegrations] = useState([]);
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create', 'edit', 'view'
  const [activeTab, setActiveTab] = useState('config'); // 'config', 'code', 'test'
  const [currentIntegration, setCurrentIntegration] = useState(null);
  const [selectedIntegrationId, setSelectedIntegrationId] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'webhook',
    triggerType: 'scheduled',
    schedule: '0 0 * * *',
    webhookUrl: '',
    active: false,
    steps: [
      {
        id: 1,
        name: 'Data Source',
        type: 'data_source',
        config: {
          source: 'vehicles',
          filter: ''
        }
      },
      {
        id: 2,
        name: 'Transform Data',
        type: 'transform',
        config: {
          script: '// Transform data here\nreturn data;'
        }
      },
      {
        id: 3,
        name: 'Send Data',
        type: 'destination',
        config: {
          destination: 'http',
          url: '',
          method: 'POST',
          headers: '{"Content-Type": "application/json"}',
          body: 'data'
        }
      }
    ]
  });

  useEffect(() => {
    fetchIntegrations();
  }, [useMockData]);

  useEffect(() => {
    if (selectedIntegrationId) {
      fetchIntegrationLogs(selectedIntegrationId);
    } else {
      setLogs([]);
    }
  }, [selectedIntegrationId]);

  const fetchIntegrations = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getCustomIntegrations(useMockData);
      setIntegrations(data);
    } catch (err) {
      console.error('Error fetching custom integrations:', err);
      setError('Failed to load custom integrations. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchIntegrationLogs = async (integrationId) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getIntegrationLogs(useMockData, integrationId);
      setLogs(data);
    } catch (err) {
      console.error('Error fetching integration logs:', err);
      setError('Failed to load integration logs. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleStatus = async (integration) => {
    try {
      const updatedIntegration = {
        ...integration,
        active: !integration.active,
        status: !integration.active ? 'active' : 'inactive'
      };
      
      await updateCustomIntegration(useMockData, integration.id, updatedIntegration);
      
      setIntegrations(prev => prev.map(i => 
        i.id === integration.id ? updatedIntegration : i
      ));
    } catch (err) {
      console.error('Error updating integration status:', err);
      setError('Failed to update integration status. Please try again later.');
    }
  };

  const handleDeleteIntegration = async (integrationId) => {
    if (window.confirm('Are you sure you want to delete this integration? This action cannot be undone.')) {
      try {
        await deleteCustomIntegration(useMockData, integrationId);
        
        setIntegrations(prev => prev.filter(i => i.id !== integrationId));
        
        if (selectedIntegrationId === integrationId) {
          setSelectedIntegrationId(null);
        }
      } catch (err) {
        console.error('Error deleting integration:', err);
        setError('Failed to delete integration. Please try again later.');
      }
    }
  };

  const openCreateModal = () => {
    setModalMode('create');
    setActiveTab('config');
    setCurrentIntegration(null);
    setFormData({
      name: '',
      description: '',
      type: 'webhook',
      triggerType: 'scheduled',
      schedule: '0 0 * * *',
      webhookUrl: '',
      active: false,
      steps: [
        {
          id: 1,
          name: 'Data Source',
          type: 'data_source',
          config: {
            source: 'vehicles',
            filter: ''
          }
        },
        {
          id: 2,
          name: 'Transform Data',
          type: 'transform',
          config: {
            script: '// Transform data here\nreturn data;'
          }
        },
        {
          id: 3,
          name: 'Send Data',
          type: 'destination',
          config: {
            destination: 'http',
            url: '',
            method: 'POST',
            headers: '{"Content-Type": "application/json"}',
            body: 'data'
          }
        }
      ]
    });
    setShowModal(true);
  };

  const openEditModal = (integration) => {
    setModalMode('edit');
    setActiveTab('config');
    setCurrentIntegration(integration);
    setFormData({
      ...integration
    });
    setShowModal(true);
  };

  const openViewModal = (integration) => {
    setModalMode('view');
    setActiveTab('config');
    setCurrentIntegration(integration);
    setFormData({
      ...integration
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentIntegration(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleStepConfigChange = (stepId, field, value) => {
    setFormData(prev => ({
      ...prev,
      steps: prev.steps.map(step => 
        step.id === stepId ? {
          ...step,
          config: {
            ...step.config,
            [field]: value
          }
        } : step
      )
    }));
  };

  const handleAddStep = () => {
    const newStepId = Math.max(0, ...formData.steps.map(s => s.id)) + 1;
    
    setFormData(prev => ({
      ...prev,
      steps: [
        ...prev.steps,
        {
          id: newStepId,
          name: 'New Step',
          type: 'transform',
          config: {
            script: '// Transform data here\nreturn data;'
          }
        }
      ]
    }));
  };

  const handleRemoveStep = (stepId) => {
    if (formData.steps.length <= 1) {
      alert('You must have at least one step in your integration.');
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      steps: prev.steps.filter(step => step.id !== stepId)
    }));
  };

  const handleStepNameChange = (stepId, name) => {
    setFormData(prev => ({
      ...prev,
      steps: prev.steps.map(step => 
        step.id === stepId ? { ...step, name } : step
      )
    }));
  };

  const handleStepTypeChange = (stepId, type) => {
    setFormData(prev => ({
      ...prev,
      steps: prev.steps.map(step => {
        if (step.id !== stepId) return step;
        
        let config = {};
        
        switch(type) {
          case 'data_source':
            config = {
              source: 'vehicles',
              filter: ''
            };
            break;
          case 'transform':
            config = {
              script: '// Transform data here\nreturn data;'
            };
            break;
          case 'destination':
            config = {
              destination: 'http',
              url: '',
              method: 'POST',
              headers: '{"Content-Type": "application/json"}',
              body: 'data'
            };
            break;
          case 'condition':
            config = {
              condition: 'data.length > 0'
            };
            break;
          default:
            config = {};
        }
        
        return {
          ...step,
          type,
          config
        };
      })
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (modalMode === 'create') {
        const newIntegration = await createCustomIntegration(useMockData, {
          ...formData,
          status: formData.active ? 'active' : 'inactive'
        });
        
        setIntegrations(prev => [...prev, newIntegration]);
      } else if (modalMode === 'edit') {
        const updatedIntegration = await updateCustomIntegration(useMockData, currentIntegration.id, {
          ...formData,
          status: formData.active ? 'active' : 'inactive'
        });
        
        setIntegrations(prev => prev.map(i => 
          i.id === currentIntegration.id ? updatedIntegration : i
        ));
      }
      
      closeModal();
    } catch (err) {
      console.error('Error saving integration:', err);
      setError('Failed to save integration. Please try again later.');
    }
  };

  const handleViewLogs = (integrationId) => {
    setSelectedIntegrationId(integrationId === selectedIntegrationId ? null : integrationId);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const renderStepConfig = (step) => {
    switch(step.type) {
      case 'data_source':
        return (
          <StepContent>
            <FormGroup>
              <Label htmlFor={`step-${step.id}-source`}>Data Source</Label>
              <Select 
                id={`step-${step.id}-source`}
                value={step.config.source}
                onChange={(e) => handleStepConfigChange(step.id, 'source', e.target.value)}
                disabled={modalMode === 'view'}
              >
                <option value="vehicles">Vehicles</option>
                <option value="drivers">Drivers</option>
                <option value="maintenance">Maintenance Records</option>
                <option value="fuel">Fuel Records</option>
                <option value="trips">Trip Data</option>
                <option value="telemetry">Telemetry Data</option>
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor={`step-${step.id}-filter`}>Filter (JSON)</Label>
              <Textarea 
                id={`step-${step.id}-filter`}
                value={step.config.filter}
                onChange={(e) => handleStepConfigChange(step.id, 'filter', e.target.value)}
                placeholder='{"status": "active"}'
                disabled={modalMode === 'view'}
              />
              <InfoText>Optional JSON filter to apply to the data source</InfoText>
            </FormGroup>
          </StepContent>
        );
        
      case 'transform':
        return (
          <StepContent>
            <FormGroup>
              <Label htmlFor={`step-${step.id}-script`}>Transformation Script</Label>
              <CodeEditor>
                <CodeEditorHeader>
                  <CodeEditorTitle>JavaScript</CodeEditorTitle>
                </CodeEditorHeader>
                <CodeEditorContent 
                  id={`step-${step.id}-script`}
                  value={step.config.script}
                  onChange={(e) => handleStepConfigChange(step.id, 'script', e.target.value)}
                  disabled={modalMode === 'view'}
                />
              </CodeEditor>
              <InfoText>Use JavaScript to transform the data. The input data is available as 'data' variable.</InfoText>
            </FormGroup>
          </StepContent>
        );
        
      case 'destination':
        return (
          <StepContent>
            <FormGroup>
              <Label htmlFor={`step-${step.id}-destination`}>Destination Type</Label>
              <Select 
                id={`step-${step.id}-destination`}
                value={step.config.destination}
                onChange={(e) => handleStepConfigChange(step.id, 'destination', e.target.value)}
                disabled={modalMode === 'view'}
              >
                <option value="http">HTTP Endpoint</option>
                <option value="email">Email</option>
                <option value="sms">SMS</option>
                <option value="webhook">Webhook</option>
                <option value="database">Database</option>
              </Select>
            </FormGroup>
            
            {step.config.destination === 'http' || step.config.destination === 'webhook' ? (
              <>
                <FormGroup>
                  <Label htmlFor={`step-${step.id}-url`}>URL</Label>
                  <Input 
                    id={`step-${step.id}-url`}
                    value={step.config.url}
                    onChange={(e) => handleStepConfigChange(step.id, 'url', e.target.value)}
                    placeholder="https://example.com/api/endpoint"
                    disabled={modalMode === 'view'}
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor={`step-${step.id}-method`}>Method</Label>
                  <Select 
                    id={`step-${step.id}-method`}
                    value={step.config.method}
                    onChange={(e) => handleStepConfigChange(step.id, 'method', e.target.value)}
                    disabled={modalMode === 'view'}
                  >
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="PATCH">PATCH</option>
                    <option value="DELETE">DELETE</option>
                  </Select>
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor={`step-${step.id}-headers`}>Headers (JSON)</Label>
                  <Textarea 
                    id={`step-${step.id}-headers`}
                    value={step.config.headers}
                    onChange={(e) => handleStepConfigChange(step.id, 'headers', e.target.value)}
                    placeholder='{"Content-Type": "application/json"}'
                    disabled={modalMode === 'view'}
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor={`step-${step.id}-body`}>Body</Label>
                  <Textarea 
                    id={`step-${step.id}-body`}
                    value={step.config.body}
                    onChange={(e) => handleStepConfigChange(step.id, 'body', e.target.value)}
                    placeholder="data"
                    disabled={modalMode === 'view'}
                  />
                  <InfoText>Use 'data' to send the entire data object, or customize the payload</InfoText>
                </FormGroup>
              </>
            ) : step.config.destination === 'email' ? (
              <>
                <FormGroup>
                  <Label htmlFor={`step-${step.id}-to`}>To</Label>
                  <Input 
                    id={`step-${step.id}-to`}
                    value={step.config.to || ''}
                    onChange={(e) => handleStepConfigChange(step.id, 'to', e.target.value)}
                    placeholder="recipient@example.com"
                    disabled={modalMode === 'view'}
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor={`step-${step.id}-subject`}>Subject</Label>
                  <Input 
                    id={`step-${step.id}-subject`}
                    value={step.config.subject || ''}
                    onChange={(e) => handleStepConfigChange(step.id, 'subject', e.target.value)}
                    placeholder="Integration Notification"
                    disabled={modalMode === 'view'}
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor={`step-${step.id}-body`}>Email Body</Label>
                  <Textarea 
                    id={`step-${step.id}-body`}
                    value={step.config.body || ''}
                    onChange={(e) => handleStepConfigChange(step.id, 'body', e.target.value)}
                    placeholder="Data from integration: {{data}}"
                    disabled={modalMode === 'view'}
                  />
                  <InfoText>Use {'{{'} data {'}}' } to include the data in your email</InfoText>
                </FormGroup>
              </>
            ) : (
              <InfoText>Configure the {step.config?.destination || 'selected'} destination settings</InfoText>
            )}
          </StepContent>
        );
        
      case 'condition':
        return (
          <StepContent>
            <FormGroup>
              <Label htmlFor={`step-${step.id}-condition`}>Condition</Label>
              <Textarea 
                id={`step-${step.id}-condition`}
                value={step.config.condition}
                onChange={(e) => handleStepConfigChange(step.id, 'condition', e.target.value)}
                placeholder="data.length > 0"
                disabled={modalMode === 'view'}
              />
              <InfoText>JavaScript condition that evaluates to true or false. The input data is available as 'data' variable.</InfoText>
            </FormGroup>
          </StepContent>
        );
        
      default:
        return <InfoText>Unknown step type</InfoText>;
    }
  };

  if (isLoading && integrations.length === 0) {
    return <LoadingContainer>Loading custom integrations...</LoadingContainer>;
  }

  if (error && integrations.length === 0) {
    return <ErrorContainer>{error}</ErrorContainer>;
  }

  return (
    <Container>
      <Header>
        <Title>Custom Integrations</Title>
        <Button onClick={openCreateModal}>
          <span className="icon icon-plus"></span>
          Create New Integration
        </Button>
      </Header>

      {integrations.length === 0 ? (
        <EmptyState>
          <EmptyStateIcon className="icon icon-cogs"></EmptyStateIcon>
          <EmptyStateText>No custom integrations found. Create your first integration to automate data flows between systems.</EmptyStateText>
          <Button onClick={openCreateModal}>
            <span className="icon icon-plus"></span>
            Create New Integration
          </Button>
        </EmptyState>
      ) : (
        <>
          <IntegrationsGrid>
            {integrations.map(integration => (
              <IntegrationCard key={integration.id}>
                <IntegrationHeader>
                  <IntegrationIcon>
                    <span className={`icon icon-${integration.type === 'webhook' ? 'link' : 'cogs'}`}></span>
                  </IntegrationIcon>
                  <IntegrationInfo>
                    <IntegrationName>{integration.name}</IntegrationName>
                    <IntegrationType>
                      {integration.type.charAt(0).toUpperCase() + integration.type.slice(1)} Integration
                    </IntegrationType>
                  </IntegrationInfo>
                </IntegrationHeader>
                
                <IntegrationDescription>{integration.description}</IntegrationDescription>
                
                <IntegrationDetails>
                  <DetailItem>
                    <DetailLabel>Trigger Type:</DetailLabel>
                    <DetailValue>{integration.triggerType === 'scheduled' ? 'Scheduled' : 'Webhook'}</DetailValue>
                  </DetailItem>
                  
                  {integration.triggerType === 'scheduled' && (
                    <DetailItem>
                      <DetailLabel>Schedule:</DetailLabel>
                      <DetailValue>{integration.schedule}</DetailValue>
                    </DetailItem>
                  )}
                  
                  <DetailItem>
                    <DetailLabel>Steps:</DetailLabel>
                    <DetailValue>{integration.steps.length}</DetailValue>
                  </DetailItem>
                  
                  <DetailItem>
                    <DetailLabel>Last Run:</DetailLabel>
                    <DetailValue>{formatDate(integration.lastRun)}</DetailValue>
                  </DetailItem>
                </IntegrationDetails>
                
                <IntegrationFooter>
                  <StatusBadge status={integration.status}>
                    {integration.status.charAt(0).toUpperCase() + integration.status.slice(1)}
                  </StatusBadge>
                  <div>
                    <ActionButton onClick={() => handleViewLogs(integration.id)}>
                      {selectedIntegrationId === integration.id ? 'Hide Logs' : 'View Logs'}
                    </ActionButton>
                    <ActionButton onClick={() => openViewModal(integration)}>View</ActionButton>
                    <ActionButton onClick={() => openEditModal(integration)}>Edit</ActionButton>
                    <ActionButton onClick={() => handleToggleStatus(integration)}>
                      {integration.active ? 'Deactivate' : 'Activate'}
                    </ActionButton>
                    <ActionButton className="delete" onClick={() => handleDeleteIntegration(integration.id)}>Delete</ActionButton>
                  </div>
                </IntegrationFooter>
              </IntegrationCard>
            ))}
          </IntegrationsGrid>
          
          {selectedIntegrationId && (
            <>
              <SectionTitle>
                Integration Logs: {integrations.find(i => i.id === selectedIntegrationId)?.name}
              </SectionTitle>
              
              {isLoading ? (
                <LoadingContainer>Loading logs...</LoadingContainer>
              ) : error ? (
                <ErrorContainer>{error}</ErrorContainer>
              ) : logs.length === 0 ? (
                <EmptyState>
                  <EmptyStateIcon className="icon icon-file-alt"></EmptyStateIcon>
                  <EmptyStateText>No logs found for this integration.</EmptyStateText>
                </EmptyState>
              ) : (
                <div style={{ maxHeight: '400px', overflowY: 'auto', border: '1px solid #eee', borderRadius: '4px' }}>
                  {logs.map((log, index) => (
                    <LogEntry key={index} className={log.level}>
                      <LogTimestamp>{formatDate(log.timestamp)}</LogTimestamp>
                      {log.message}
                    </LogEntry>
                  ))}
                </div>
              )}
            </>
          )}
        </>
      )}

      {showModal && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>
                <span className={`icon icon-${formData.type === 'webhook' ? 'link' : 'cogs'}`}></span>
                {modalMode === 'create' ? 'Create New Integration' : 
                 modalMode === 'edit' ? 'Edit Integration' : 'View Integration'}
              </ModalTitle>
              <CloseButton onClick={closeModal}>&times;</CloseButton>
            </ModalHeader>
            
            <TabsContainer>
              <Tab 
                active={activeTab === 'config'} 
                onClick={() => setActiveTab('config')}
              >
                Configuration
              </Tab>
              <Tab 
                active={activeTab === 'steps'} 
                onClick={() => setActiveTab('steps')}
              >
                Integration Steps
              </Tab>
              {modalMode !== 'create' && (
                <Tab 
                  active={activeTab === 'logs'} 
                  onClick={() => setActiveTab('logs')}
                >
                  Logs
                </Tab>
              )}
            </TabsContainer>
            
            <Form onSubmit={handleSubmit}>
              {activeTab === 'config' && (
                <>
                  <FormGroup>
                    <Label htmlFor="name">Integration Name *</Label>
                    <Input 
                      type="text" 
                      id="name" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleInputChange} 
                      required
                      disabled={modalMode === 'view'}
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description" 
                      name="description" 
                      value={formData.description} 
                      onChange={handleInputChange}
                      disabled={modalMode === 'view'}
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <Label htmlFor="type">Integration Type</Label>
                    <Select 
                      id="type" 
                      name="type" 
                      value={formData.type} 
                      onChange={handleInputChange}
                      disabled={modalMode === 'view'}
                    >
                      <option value="webhook">Webhook</option>
                      <option value="custom">Custom</option>
                    </Select>
                  </FormGroup>
                  
                  <FormGroup>
                    <Label htmlFor="triggerType">Trigger Type</Label>
                    <Select 
                      id="triggerType" 
                      name="triggerType" 
                      value={formData.triggerType} 
                      onChange={handleInputChange}
                      disabled={modalMode === 'view'}
                    >
                      <option value="scheduled">Scheduled</option>
                      <option value="webhook">Webhook</option>
                    </Select>
                  </FormGroup>
                  
                  {formData.triggerType === 'scheduled' && (
                    <FormGroup>
                      <Label htmlFor="schedule">Schedule (Cron Expression) *</Label>
                      <Input 
                        type="text" 
                        id="schedule" 
                        name="schedule" 
                        value={formData.schedule} 
                        onChange={handleInputChange} 
                        placeholder="0 0 * * *"
                        required
                        disabled={modalMode === 'view'}
                      />
                      <InfoText>Cron expression format: minute hour day month weekday</InfoText>
                    </FormGroup>
                  )}
                  
                  {formData.triggerType === 'webhook' && (
                    <FormGroup>
                      <Label htmlFor="webhookUrl">Webhook URL</Label>
                      <Input 
                        type="text" 
                        id="webhookUrl" 
                        name="webhookUrl" 
                        value={formData.webhookUrl || ''} 
                        onChange={handleInputChange}
                        disabled={true}
                        placeholder={modalMode === 'create' ? 'URL will be generated after creation' : ''}
                      />
                      {formData.webhookUrl && (
                        <InfoText>Use this URL to trigger the integration from external systems</InfoText>
                      )}
                    </FormGroup>
                  )}
                  
                  <FormGroup>
                    <Checkbox>
                      <input 
                        type="checkbox" 
                        id="active" 
                        name="active" 
                        checked={formData.active} 
                        onChange={handleInputChange}
                        disabled={modalMode === 'view'}
                      />
                      <Label htmlFor="active">Active</Label>
                    </Checkbox>
                  </FormGroup>
                </>
              )}
              
              {activeTab === 'steps' && (
                <>
                  {formData.steps.map((step, index) => (
                    <StepContainer key={step.id}>
                      <StepHeader>
                        <StepTitle>
                          <span className={`icon icon-${
                            step.type === 'data_source' ? 'database' : 
                            step.type === 'transform' ? 'code' : 
                            step.type === 'destination' ? 'paper-plane' : 
                            step.type === 'condition' ? 'code-branch' : 'cog'
                          }`}></span>
                          {index + 1}. 
                          {modalMode === 'view' ? (
                            step.name
                          ) : (
                            <Input 
                              type="text" 
                              value={step.name} 
                              onChange={(e) => handleStepNameChange(step.id, e.target.value)}
                              style={{ marginLeft: '8px', width: '200px' }}
                            />
                          )}
                        </StepTitle>
                        
                        {modalMode !== 'view' && (
                          <StepActions>
                            <Select 
                              value={step.type}
                              onChange={(e) => handleStepTypeChange(step.id, e.target.value)}
                              style={{ marginRight: '8px' }}
                            >
                              <option value="data_source">Data Source</option>
                              <option value="transform">Transform</option>
                              <option value="destination">Destination</option>
                              <option value="condition">Condition</option>
                            </Select>
                            
                            <ActionButton 
                              className="delete" 
                              onClick={() => handleRemoveStep(step.id)}
                            >
                              Remove
                            </ActionButton>
                          </StepActions>
                        )}
                      </StepHeader>
                      
                      {renderStepConfig(step)}
                    </StepContainer>
                  ))}
                  
                  {modalMode !== 'view' && (
                    <AddStepButton type="button" onClick={handleAddStep}>
                      <span className="icon icon-plus"></span>
                      Add Step
                    </AddStepButton>
                  )}
                </>
              )}
              
              {activeTab === 'logs' && currentIntegration && (
                <>
                  {isLoading ? (
                    <LoadingContainer>Loading logs...</LoadingContainer>
                  ) : error ? (
                    <ErrorContainer>{error}</ErrorContainer>
                  ) : logs.length === 0 ? (
                    <EmptyState>
                      <EmptyStateIcon className="icon icon-file-alt"></EmptyStateIcon>
                      <EmptyStateText>No logs found for this integration.</EmptyStateText>
                    </EmptyState>
                  ) : (
                    <div style={{ maxHeight: '400px', overflowY: 'auto', border: '1px solid #eee', borderRadius: '4px' }}>
                      {logs.map((log, index) => (
                        <LogEntry key={index} className={log.level}>
                          <LogTimestamp>{formatDate(log.timestamp)}</LogTimestamp>
                          {log.message}
                        </LogEntry>
                      ))}
                    </div>
                  )}
                </>
              )}
              
              {modalMode !== 'view' && (
                <ButtonGroup>
                  <CancelButton type="button" onClick={closeModal}>Cancel</CancelButton>
                  <SaveButton type="submit">
                    {modalMode === 'create' ? 'Create Integration' : 'Save Changes'}
                  </SaveButton>
                </ButtonGroup>
              )}
              
              {modalMode === 'view' && (
                <ButtonGroup>
                  <Button type="button" onClick={closeModal}>Close</Button>
                </ButtonGroup>
              )}
            </Form>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default CustomIntegrations;
