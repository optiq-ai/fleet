import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getMaintenanceSystems, updateMaintenanceSystem, configureMaintenanceSystem, getMaintenanceJobs } from '../../services/api/integrationsService';

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

const SystemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const SystemCard = styled.div`
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

const SystemHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const SystemLogo = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  background-color: #f1f3f4;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  overflow: hidden;

  img {
    max-width: 100%;
    max-height: 100%;
  }

  span {
    font-size: 24px;
    color: #1a73e8;
  }
`;

const SystemInfo = styled.div`
  flex: 1;
`;

const SystemName = styled.h3`
  font-size: 16px;
  color: #333;
  margin: 0 0 5px 0;
`;

const SystemType = styled.div`
  font-size: 12px;
  color: #666;
`;

const SystemDescription = styled.p`
  font-size: 14px;
  color: #555;
  margin: 0 0 15px 0;
  flex: 1;
`;

const SystemFeatures = styled.div`
  margin-bottom: 15px;
`;

const FeatureList = styled.ul`
  padding-left: 20px;
  margin: 10px 0;
`;

const Feature = styled.li`
  font-size: 13px;
  color: #555;
  margin-bottom: 5px;
`;

const SystemFooter = styled.div`
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
      case 'connected': return '#e6f4ea';
      case 'disconnected': return '#f1f3f4';
      case 'error': return '#fce8e6';
      case 'configuring': return '#e8f0fe';
      default: return '#f1f3f4';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'connected': return '#34a853';
      case 'disconnected': return '#5f6368';
      case 'error': return '#ea4335';
      case 'configuring': return '#1a73e8';
      default: return '#5f6368';
    }
  }};
`;

const ConnectButton = styled.button`
  background-color: ${props => props.connected ? 'white' : '#1a73e8'};
  color: ${props => props.connected ? '#1a73e8' : 'white'};
  border: 1px solid ${props => props.connected ? '#1a73e8' : 'transparent'};
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.connected ? '#f0f5ff' : '#1557b0'};
  }

  &:disabled {
    background-color: #ccc;
    border-color: #ccc;
    color: #666;
    cursor: not-allowed;
  }
`;

const ConfigureButton = styled.button`
  background-color: transparent;
  color: #1a73e8;
  border: none;
  padding: 6px 12px;
  font-size: 14px;
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    text-decoration: underline;
  }

  &:disabled {
    color: #ccc;
    cursor: not-allowed;
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
  width: 600px;
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

const FilterContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
`;

const FilterSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  min-width: 150px;
  
  &:focus {
    outline: none;
    border-color: #1a73e8;
  }
`;

const PriorityBadge = styled.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  background-color: ${props => {
    switch(props.priority) {
      case 'high': return '#fce8e6';
      case 'medium': return '#fff8e6';
      case 'low': return '#e6f4ea';
      default: return '#f1f3f4';
    }
  }};
  color: ${props => {
    switch(props.priority) {
      case 'high': return '#ea4335';
      case 'medium': return '#fbbc04';
      case 'low': return '#34a853';
      default: return '#5f6368';
    }
  }};
`;

/**
 * MaintenanceSystemsIntegration component for managing integrations with external
 * maintenance management systems
 * @param {Object} props - Component props
 * @param {boolean} props.useMockData - Flag to use mock data instead of API
 * @returns {JSX.Element} MaintenanceSystemsIntegration component
 */
const MaintenanceSystemsIntegration = ({ useMockData = true }) => {
  const [systems, setSystems] = useState([]);
  const [maintenanceJobs, setMaintenanceJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentSystem, setCurrentSystem] = useState(null);
  const [formData, setFormData] = useState({});
  
  // Filters
  const [systemFilter, setSystemFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchSystems();
    fetchMaintenanceJobs();
  }, [useMockData]);

  useEffect(() => {
    fetchMaintenanceJobs();
  }, [systemFilter, statusFilter]);

  const fetchSystems = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getMaintenanceSystems(useMockData);
      setSystems(data);
    } catch (err) {
      console.error('Error fetching maintenance systems:', err);
      setError('Failed to load maintenance systems. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMaintenanceJobs = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getMaintenanceJobs(useMockData, {
        systemId: systemFilter !== 'all' ? systemFilter : undefined,
        status: statusFilter !== 'all' ? statusFilter : undefined
      });
      
      setMaintenanceJobs(data);
    } catch (err) {
      console.error('Error fetching maintenance jobs:', err);
      setError('Failed to load maintenance jobs. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnectToggle = async (system) => {
    try {
      const newStatus = system.status === 'connected' ? 'disconnected' : 'connected';
      await updateMaintenanceSystem(useMockData, system.id, { status: newStatus });
      
      setSystems(prev => prev.map(s => 
        s.id === system.id ? { ...s, status: newStatus } : s
      ));
    } catch (err) {
      console.error('Error updating system status:', err);
      setError('Failed to update system status. Please try again later.');
    }
  };

  const openConfigureModal = (system) => {
    setCurrentSystem(system);
    
    // Initialize form data based on system configuration
    let initialFormData = system.config || {};
    
    // Set default values if not present
    initialFormData = {
      apiKey: initialFormData.apiKey || '',
      apiUrl: initialFormData.apiUrl || system.defaultApiUrl || '',
      username: initialFormData.username || '',
      password: initialFormData.password || '',
      accountId: initialFormData.accountId || '',
      autoSync: initialFormData.autoSync !== undefined ? initialFormData.autoSync : true,
      syncInterval: initialFormData.syncInterval || '60',
      bidirectionalSync: initialFormData.bidirectionalSync !== undefined ? initialFormData.bidirectionalSync : false,
      autoCreateJobs: initialFormData.autoCreateJobs !== undefined ? initialFormData.autoCreateJobs : false,
      defaultPriority: initialFormData.defaultPriority || 'medium'
    };
    
    setFormData(initialFormData);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentSystem(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await configureMaintenanceSystem(useMockData, currentSystem.id, formData);
      
      // Update system in state
      setSystems(prev => prev.map(s => 
        s.id === currentSystem.id ? { 
          ...s, 
          config: formData,
          status: s.status === 'disconnected' ? 'configuring' : s.status
        } : s
      ));
      
      closeModal();
    } catch (err) {
      console.error('Error configuring system:', err);
      setError('Failed to configure system. Please try again later.');
    }
  };

  const handleSystemFilterChange = (e) => {
    setSystemFilter(e.target.value);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const renderConfigurationForm = () => {
    if (!currentSystem) return null;
    
    return (
      <Form onSubmit={handleSubmit}>
        {currentSystem.authType === 'api_key' && (
          <FormGroup>
            <Label htmlFor="apiKey">API Key *</Label>
            <Input 
              type="password" 
              id="apiKey" 
              name="apiKey" 
              value={formData.apiKey} 
              onChange={handleInputChange} 
              required
            />
          </FormGroup>
        )}
        
        {currentSystem.authType === 'credentials' && (
          <>
            <FormGroup>
              <Label htmlFor="username">Username *</Label>
              <Input 
                type="text" 
                id="username" 
                name="username" 
                value={formData.username} 
                onChange={handleInputChange} 
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="password">Password *</Label>
              <Input 
                type="password" 
                id="password" 
                name="password" 
                value={formData.password} 
                onChange={handleInputChange} 
                required
              />
            </FormGroup>
          </>
        )}
        
        <FormGroup>
          <Label htmlFor="apiUrl">API URL {currentSystem.authType === 'api_key' ? '*' : ''}</Label>
          <Input 
            type="text" 
            id="apiUrl" 
            name="apiUrl" 
            value={formData.apiUrl} 
            onChange={handleInputChange} 
            required={currentSystem.authType === 'api_key'}
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="accountId">Account ID {currentSystem.requiresAccountId ? '*' : ''}</Label>
          <Input 
            type="text" 
            id="accountId" 
            name="accountId" 
            value={formData.accountId} 
            onChange={handleInputChange} 
            required={currentSystem.requiresAccountId}
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="syncInterval">Data Sync Interval</Label>
          <Select 
            id="syncInterval" 
            name="syncInterval" 
            value={formData.syncInterval} 
            onChange={handleInputChange}
          >
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="60">1 hour</option>
            <option value="360">6 hours</option>
            <option value="720">12 hours</option>
            <option value="1440">24 hours</option>
          </Select>
        </FormGroup>
        
        <FormGroup>
          <Checkbox>
            <input 
              type="checkbox" 
              id="autoSync" 
              name="autoSync" 
              checked={formData.autoSync} 
              onChange={handleInputChange}
            />
            <Label htmlFor="autoSync">Enable automatic synchronization</Label>
          </Checkbox>
        </FormGroup>
        
        <FormGroup>
          <Checkbox>
            <input 
              type="checkbox" 
              id="bidirectionalSync" 
              name="bidirectionalSync" 
              checked={formData.bidirectionalSync} 
              onChange={handleInputChange}
            />
            <Label htmlFor="bidirectionalSync">Enable bidirectional synchronization</Label>
          </Checkbox>
          <InfoText>When enabled, changes made in either system will be synchronized to the other system.</InfoText>
        </FormGroup>
        
        <FormGroup>
          <Checkbox>
            <input 
              type="checkbox" 
              id="autoCreateJobs" 
              name="autoCreateJobs" 
              checked={formData.autoCreateJobs} 
              onChange={handleInputChange}
            />
            <Label htmlFor="autoCreateJobs">Automatically create maintenance jobs</Label>
          </Checkbox>
          <InfoText>When enabled, maintenance jobs will be automatically created based on vehicle service schedules.</InfoText>
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="defaultPriority">Default Job Priority</Label>
          <Select 
            id="defaultPriority" 
            name="defaultPriority" 
            value={formData.defaultPriority} 
            onChange={handleInputChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </Select>
        </FormGroup>
        
        <ButtonGroup>
          <CancelButton type="button" onClick={closeModal}>Cancel</CancelButton>
          <SaveButton type="submit">Save Configuration</SaveButton>
        </ButtonGroup>
      </Form>
    );
  };

  if (isLoading && systems.length === 0) {
    return <LoadingContainer>Loading maintenance systems...</LoadingContainer>;
  }

  if (error && systems.length === 0) {
    return <ErrorContainer>{error}</ErrorContainer>;
  }

  return (
    <Container>
      <Header>
        <Title>Maintenance Systems Integration</Title>
      </Header>

      <SectionTitle>Available Maintenance Systems</SectionTitle>
      
      {systems.length === 0 ? (
        <EmptyState>
          <EmptyStateIcon className="icon icon-wrench"></EmptyStateIcon>
          <EmptyStateText>No maintenance systems available. Contact your administrator to add maintenance systems.</EmptyStateText>
        </EmptyState>
      ) : (
        <SystemsGrid>
          {systems.map(system => (
            <SystemCard key={system.id}>
              <SystemHeader>
                <SystemLogo>
                  {system.logoUrl ? (
                    <img src={system.logoUrl} alt={`${system.name} logo`} />
                  ) : (
                    <span className={`icon icon-${system.icon || 'wrench'}`}></span>
                  )}
                </SystemLogo>
                <SystemInfo>
                  <SystemName>{system.name}</SystemName>
                  <SystemType>{system.type}</SystemType>
                </SystemInfo>
              </SystemHeader>
              
              <SystemDescription>{system.description}</SystemDescription>
              
              <SystemFeatures>
                <FeatureList>
                  {system.features.map((feature, index) => (
                    <Feature key={index}>{feature}</Feature>
                  ))}
                </FeatureList>
              </SystemFeatures>
              
              <SystemFooter>
                <StatusBadge status={system.status}>
                  {system.status.charAt(0).toUpperCase() + system.status.slice(1)}
                </StatusBadge>
                <div>
                  <ConfigureButton 
                    onClick={() => openConfigureModal(system)}
                    disabled={system.status === 'configuring'}
                  >
                    Configure
                  </ConfigureButton>
                  <ConnectButton 
                    connected={system.status === 'connected'}
                    onClick={() => handleConnectToggle(system)}
                    disabled={system.status === 'configuring' || (!system.config && system.status !== 'connected')}
                  >
                    {system.status === 'connected' ? 'Disconnect' : 'Connect'}
                  </ConnectButton>
                </div>
              </SystemFooter>
            </SystemCard>
          ))}
        </SystemsGrid>
      )}

      <SectionTitle>Maintenance Jobs</SectionTitle>
      
      <FilterContainer>
        <div>
          <Label htmlFor="systemFilter">System:</Label>
          <FilterSelect 
            id="systemFilter" 
            value={systemFilter} 
            onChange={handleSystemFilterChange}
          >
            <option value="all">All Systems</option>
            {systems.map(system => (
              <option key={system.id} value={system.id}>{system.name}</option>
            ))}
          </FilterSelect>
        </div>
        
        <div>
          <Label htmlFor="statusFilter">Status:</Label>
          <FilterSelect 
            id="statusFilter" 
            value={statusFilter} 
            onChange={handleStatusFilterChange}
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </FilterSelect>
        </div>
      </FilterContainer>
      
      {isLoading && <LoadingContainer>Loading maintenance jobs...</LoadingContainer>}
      
      {error && <ErrorContainer>{error}</ErrorContainer>}
      
      {!isLoading && !error && maintenanceJobs.length === 0 ? (
        <EmptyState>
          <EmptyStateIcon className="icon icon-clipboard-list"></EmptyStateIcon>
          <EmptyStateText>No maintenance jobs found for the selected filters.</EmptyStateText>
        </EmptyState>
      ) : (
        <Table>
          <thead>
            <tr>
              <TableHeader>Job ID</TableHeader>
              <TableHeader>Vehicle</TableHeader>
              <TableHeader>Description</TableHeader>
              <TableHeader>System</TableHeader>
              <TableHeader>Due Date</TableHeader>
              <TableHeader>Priority</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Actions</TableHeader>
            </tr>
          </thead>
          <tbody>
            {maintenanceJobs.map((job, index) => (
              <TableRow key={index}>
                <TableCell>{job.jobId}</TableCell>
                <TableCell>{job.vehicleName}</TableCell>
                <TableCell>{job.description}</TableCell>
                <TableCell>{job.systemName}</TableCell>
                <TableCell>{formatDate(job.dueDate)}</TableCell>
                <TableCell>
                  <PriorityBadge priority={job.priority}>
                    {job.priority.charAt(0).toUpperCase() + job.priority.slice(1)}
                  </PriorityBadge>
                </TableCell>
                <TableCell>
                  <StatusBadge status={
                    job.status === 'completed' ? 'connected' : 
                    job.status === 'in_progress' ? 'configuring' : 
                    job.status === 'cancelled' ? 'error' : 
                    'disconnected'
                  }>
                    {job.status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </StatusBadge>
                </TableCell>
                <TableCell>
                  <ActionButton>View Details</ActionButton>
                  {job.status !== 'completed' && job.status !== 'cancelled' && (
                    <ActionButton>Update Status</ActionButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      )}

      {showModal && currentSystem && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>
                {currentSystem.logoUrl ? (
                  <img 
                    src={currentSystem.logoUrl} 
                    alt={`${currentSystem.name} logo`} 
                    style={{ width: '24px', height: '24px' }}
                  />
                ) : (
                  <span className={`icon icon-${currentSystem.icon || 'wrench'}`}></span>
                )}
                Configure {currentSystem.name}
              </ModalTitle>
              <CloseButton onClick={closeModal}>&times;</CloseButton>
            </ModalHeader>
            
            {renderConfigurationForm()}
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default MaintenanceSystemsIntegration;
