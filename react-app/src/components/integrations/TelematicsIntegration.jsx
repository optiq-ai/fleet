import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getTelematicsProviders, updateTelematicsProvider, configureTelematicsProvider } from '../../services/api/integrationsService';

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

const ProvidersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const ProviderCard = styled.div`
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

const ProviderHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const ProviderLogo = styled.div`
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

const ProviderInfo = styled.div`
  flex: 1;
`;

const ProviderName = styled.h3`
  font-size: 16px;
  color: #333;
  margin: 0 0 5px 0;
`;

const ProviderType = styled.div`
  font-size: 12px;
  color: #666;
`;

const ProviderDescription = styled.p`
  font-size: 14px;
  color: #555;
  margin: 0 0 15px 0;
  flex: 1;
`;

const ProviderFeatures = styled.div`
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

const ProviderFooter = styled.div`
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

/**
 * TelematicsIntegration component for managing integrations with telematics systems
 * from various providers
 * @param {Object} props - Component props
 * @param {boolean} props.useMockData - Flag to use mock data instead of API
 * @returns {JSX.Element} TelematicsIntegration component
 */
const TelematicsIntegration = ({ useMockData = true }) => {
  const [providers, setProviders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentProvider, setCurrentProvider] = useState(null);
  const [formData, setFormData] = useState({});
  const [deviceMappings, setDeviceMappings] = useState([]);

  useEffect(() => {
    fetchProviders();
  }, [useMockData]);

  const fetchProviders = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getTelematicsProviders(useMockData);
      setProviders(data.providers);
      setDeviceMappings(data.deviceMappings || []);
    } catch (err) {
      console.error('Error fetching telematics providers:', err);
      setError('Failed to load telematics providers. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnectToggle = async (provider) => {
    try {
      const newStatus = provider.status === 'connected' ? 'disconnected' : 'connected';
      await updateTelematicsProvider(useMockData, provider.id, { status: newStatus });
      
      setProviders(prev => prev.map(p => 
        p.id === provider.id ? { ...p, status: newStatus } : p
      ));
    } catch (err) {
      console.error('Error updating provider status:', err);
      setError('Failed to update provider status. Please try again later.');
    }
  };

  const openConfigureModal = (provider) => {
    setCurrentProvider(provider);
    
    // Initialize form data based on provider configuration
    let initialFormData = provider.config || {};
    
    // Set default values if not present
    initialFormData = {
      apiKey: initialFormData.apiKey || '',
      apiUrl: initialFormData.apiUrl || provider.defaultApiUrl || '',
      username: initialFormData.username || '',
      password: initialFormData.password || '',
      accountId: initialFormData.accountId || '',
      refreshToken: initialFormData.refreshToken || '',
      autoSync: initialFormData.autoSync !== undefined ? initialFormData.autoSync : true,
      syncInterval: initialFormData.syncInterval || '15',
      dataPoints: initialFormData.dataPoints || {
        location: true,
        speed: true,
        fuelLevel: true,
        engineStatus: true,
        diagnostics: true,
        driverBehavior: false,
        temperature: false
      }
    };
    
    setFormData(initialFormData);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentProvider(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('dataPoints.')) {
      const dataPoint = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        dataPoints: {
          ...prev.dataPoints,
          [dataPoint]: checked
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await configureTelematicsProvider(useMockData, currentProvider.id, formData);
      
      // Update provider in state
      setProviders(prev => prev.map(p => 
        p.id === currentProvider.id ? { 
          ...p, 
          config: formData,
          status: p.status === 'disconnected' ? 'configuring' : p.status
        } : p
      ));
      
      closeModal();
    } catch (err) {
      console.error('Error configuring provider:', err);
      setError('Failed to configure provider. Please try again later.');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const renderConfigurationForm = () => {
    if (!currentProvider) return null;
    
    return (
      <Form onSubmit={handleSubmit}>
        {currentProvider.authType === 'api_key' && (
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
        
        {currentProvider.authType === 'credentials' && (
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
        
        {currentProvider.authType === 'oauth' && (
          <FormGroup>
            <Label htmlFor="refreshToken">Refresh Token *</Label>
            <Input 
              type="password" 
              id="refreshToken" 
              name="refreshToken" 
              value={formData.refreshToken} 
              onChange={handleInputChange} 
              required
            />
            <InfoText>You'll need to authorize this application in your {currentProvider.name} account first.</InfoText>
          </FormGroup>
        )}
        
        <FormGroup>
          <Label htmlFor="apiUrl">API URL {currentProvider.authType !== 'oauth' ? '*' : ''}</Label>
          <Input 
            type="text" 
            id="apiUrl" 
            name="apiUrl" 
            value={formData.apiUrl} 
            onChange={handleInputChange} 
            required={currentProvider.authType !== 'oauth'}
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="accountId">Account ID {currentProvider.requiresAccountId ? '*' : ''}</Label>
          <Input 
            type="text" 
            id="accountId" 
            name="accountId" 
            value={formData.accountId} 
            onChange={handleInputChange} 
            required={currentProvider.requiresAccountId}
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
            <option value="5">5 minutes</option>
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="60">1 hour</option>
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
        
        <SectionTitle>Data Points to Collect</SectionTitle>
        
        <FormGroup>
          <Checkbox>
            <input 
              type="checkbox" 
              id="dataPoints.location" 
              name="dataPoints.location" 
              checked={formData.dataPoints?.location} 
              onChange={handleInputChange}
            />
            <Label htmlFor="dataPoints.location">Location Data</Label>
          </Checkbox>
        </FormGroup>
        
        <FormGroup>
          <Checkbox>
            <input 
              type="checkbox" 
              id="dataPoints.speed" 
              name="dataPoints.speed" 
              checked={formData.dataPoints?.speed} 
              onChange={handleInputChange}
            />
            <Label htmlFor="dataPoints.speed">Speed Data</Label>
          </Checkbox>
        </FormGroup>
        
        <FormGroup>
          <Checkbox>
            <input 
              type="checkbox" 
              id="dataPoints.fuelLevel" 
              name="dataPoints.fuelLevel" 
              checked={formData.dataPoints?.fuelLevel} 
              onChange={handleInputChange}
            />
            <Label htmlFor="dataPoints.fuelLevel">Fuel Level Data</Label>
          </Checkbox>
        </FormGroup>
        
        <FormGroup>
          <Checkbox>
            <input 
              type="checkbox" 
              id="dataPoints.engineStatus" 
              name="dataPoints.engineStatus" 
              checked={formData.dataPoints?.engineStatus} 
              onChange={handleInputChange}
            />
            <Label htmlFor="dataPoints.engineStatus">Engine Status Data</Label>
          </Checkbox>
        </FormGroup>
        
        <FormGroup>
          <Checkbox>
            <input 
              type="checkbox" 
              id="dataPoints.diagnostics" 
              name="dataPoints.diagnostics" 
              checked={formData.dataPoints?.diagnostics} 
              onChange={handleInputChange}
            />
            <Label htmlFor="dataPoints.diagnostics">Diagnostic Data</Label>
          </Checkbox>
        </FormGroup>
        
        <FormGroup>
          <Checkbox>
            <input 
              type="checkbox" 
              id="dataPoints.driverBehavior" 
              name="dataPoints.driverBehavior" 
              checked={formData.dataPoints?.driverBehavior} 
              onChange={handleInputChange}
            />
            <Label htmlFor="dataPoints.driverBehavior">Driver Behavior Data</Label>
          </Checkbox>
        </FormGroup>
        
        <FormGroup>
          <Checkbox>
            <input 
              type="checkbox" 
              id="dataPoints.temperature" 
              name="dataPoints.temperature" 
              checked={formData.dataPoints?.temperature} 
              onChange={handleInputChange}
            />
            <Label htmlFor="dataPoints.temperature">Temperature Data</Label>
          </Checkbox>
        </FormGroup>
        
        <ButtonGroup>
          <CancelButton type="button" onClick={closeModal}>Cancel</CancelButton>
          <SaveButton type="submit">Save Configuration</SaveButton>
        </ButtonGroup>
      </Form>
    );
  };

  if (isLoading) {
    return <LoadingContainer>Loading telematics providers...</LoadingContainer>;
  }

  if (error) {
    return <ErrorContainer>{error}</ErrorContainer>;
  }

  return (
    <Container>
      <Header>
        <Title>Telematics Integration</Title>
      </Header>

      <SectionTitle>Available Telematics Providers</SectionTitle>
      
      {providers.length === 0 ? (
        <EmptyState>
          <EmptyStateIcon className="icon icon-satellite"></EmptyStateIcon>
          <EmptyStateText>No telematics providers available. Contact your administrator to add telematics providers.</EmptyStateText>
        </EmptyState>
      ) : (
        <ProvidersGrid>
          {providers.map(provider => (
            <ProviderCard key={provider.id}>
              <ProviderHeader>
                <ProviderLogo>
                  {provider.logoUrl ? (
                    <img src={provider.logoUrl} alt={`${provider.name} logo`} />
                  ) : (
                    <span className={`icon icon-${provider.icon || 'satellite'}`}></span>
                  )}
                </ProviderLogo>
                <ProviderInfo>
                  <ProviderName>{provider.name}</ProviderName>
                  <ProviderType>{provider.type}</ProviderType>
                </ProviderInfo>
              </ProviderHeader>
              
              <ProviderDescription>{provider.description}</ProviderDescription>
              
              <ProviderFeatures>
                <FeatureList>
                  {provider.features.map((feature, index) => (
                    <Feature key={index}>{feature}</Feature>
                  ))}
                </FeatureList>
              </ProviderFeatures>
              
              <ProviderFooter>
                <StatusBadge status={provider.status}>
                  {provider.status.charAt(0).toUpperCase() + provider.status.slice(1)}
                </StatusBadge>
                <div>
                  <ConfigureButton 
                    onClick={() => openConfigureModal(provider)}
                    disabled={provider.status === 'configuring'}
                  >
                    Configure
                  </ConfigureButton>
                  <ConnectButton 
                    connected={provider.status === 'connected'}
                    onClick={() => handleConnectToggle(provider)}
                    disabled={provider.status === 'configuring' || (!provider.config && provider.status !== 'connected')}
                  >
                    {provider.status === 'connected' ? 'Disconnect' : 'Connect'}
                  </ConnectButton>
                </div>
              </ProviderFooter>
            </ProviderCard>
          ))}
        </ProvidersGrid>
      )}

      <SectionTitle>Device Mappings</SectionTitle>
      
      {deviceMappings.length === 0 ? (
        <EmptyState>
          <EmptyStateIcon className="icon icon-link"></EmptyStateIcon>
          <EmptyStateText>No device mappings available. Connect a telematics provider to map devices to vehicles.</EmptyStateText>
        </EmptyState>
      ) : (
        <Table>
          <thead>
            <tr>
              <TableHeader>Vehicle</TableHeader>
              <TableHeader>Device ID</TableHeader>
              <TableHeader>Provider</TableHeader>
              <TableHeader>Last Data</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Actions</TableHeader>
            </tr>
          </thead>
          <tbody>
            {deviceMappings.map((mapping, index) => (
              <TableRow key={index}>
                <TableCell>{mapping.vehicleName}</TableCell>
                <TableCell>{mapping.deviceId}</TableCell>
                <TableCell>{mapping.providerName}</TableCell>
                <TableCell>{formatDate(mapping.lastDataReceived)}</TableCell>
                <TableCell>
                  <StatusBadge status={mapping.status}>
                    {mapping.status.charAt(0).toUpperCase() + mapping.status.slice(1)}
                  </StatusBadge>
                </TableCell>
                <TableCell>
                  <ActionButton>View Data</ActionButton>
                  <ActionButton>Edit Mapping</ActionButton>
                  <ActionButton className="delete">Remove</ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      )}

      {showModal && currentProvider && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>
                {currentProvider.logoUrl ? (
                  <img 
                    src={currentProvider.logoUrl} 
                    alt={`${currentProvider.name} logo`} 
                    style={{ width: '24px', height: '24px' }}
                  />
                ) : (
                  <span className={`icon icon-${currentProvider.icon || 'satellite'}`}></span>
                )}
                Configure {currentProvider.name}
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

export default TelematicsIntegration;
