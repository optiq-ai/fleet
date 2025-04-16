import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getThirdPartyConnectors, updateConnectorStatus, configureConnector } from '../../services/api/integrationsService';

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

const SearchContainer = styled.div`
  position: relative;
  width: 300px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px 12px 8px 36px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #1a73e8;
  }
`;

const SearchIcon = styled.span`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
`;

const CategoryTabs = styled.div`
  display: flex;
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
`;

const CategoryTab = styled.div`
  padding: 10px 20px;
  cursor: pointer;
  white-space: nowrap;
  border-bottom: 2px solid ${props => props.active ? '#1a73e8' : 'transparent'};
  color: ${props => props.active ? '#1a73e8' : '#333'};
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  transition: all 0.3s ease;

  &:hover {
    color: #1a73e8;
  }
`;

const ConnectorsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const ConnectorCard = styled.div`
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

const ConnectorHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const ConnectorLogo = styled.div`
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

const ConnectorInfo = styled.div`
  flex: 1;
`;

const ConnectorName = styled.h3`
  font-size: 16px;
  color: #333;
  margin: 0 0 5px 0;
`;

const ConnectorCategory = styled.div`
  font-size: 12px;
  color: #666;
`;

const ConnectorDescription = styled.p`
  font-size: 14px;
  color: #555;
  margin: 0 0 15px 0;
  flex: 1;
`;

const ConnectorFeatures = styled.div`
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

const ConnectorFooter = styled.div`
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
 * ThirdPartyConnectors component for managing connectors to popular systems
 * like ERP, CRM, accounting systems, and IoT platforms
 * @param {Object} props - Component props
 * @param {boolean} props.useMockData - Flag to use mock data instead of API
 * @returns {JSX.Element} ThirdPartyConnectors component
 */
const ThirdPartyConnectors = ({ useMockData = true }) => {
  const [connectors, setConnectors] = useState([]);
  const [filteredConnectors, setFilteredConnectors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentConnector, setCurrentConnector] = useState(null);
  const [formData, setFormData] = useState({});

  const categories = [
    { id: 'all', name: 'All Connectors' },
    { id: 'erp', name: 'ERP Systems' },
    { id: 'crm', name: 'CRM Systems' },
    { id: 'accounting', name: 'Accounting' },
    { id: 'iot', name: 'IoT Platforms' },
    { id: 'telematics', name: 'Telematics' },
    { id: 'maintenance', name: 'Maintenance' },
    { id: 'fuel', name: 'Fuel Management' },
    { id: 'other', name: 'Other' }
  ];

  useEffect(() => {
    fetchConnectors();
  }, [useMockData]);

  useEffect(() => {
    filterConnectors();
  }, [connectors, activeCategory, searchQuery]);

  const fetchConnectors = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getThirdPartyConnectors(useMockData);
      setConnectors(data);
    } catch (err) {
      console.error('Error fetching connectors:', err);
      setError('Failed to load connectors. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const filterConnectors = () => {
    let filtered = [...connectors];
    
    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(connector => connector.category === activeCategory);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(connector => 
        connector.name.toLowerCase().includes(query) || 
        connector.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredConnectors(filtered);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleConnectToggle = async (connector) => {
    try {
      const newStatus = connector.status === 'connected' ? 'disconnected' : 'connected';
      await updateConnectorStatus(useMockData, connector.id, newStatus);
      
      setConnectors(prev => prev.map(c => 
        c.id === connector.id ? { ...c, status: newStatus } : c
      ));
    } catch (err) {
      console.error('Error updating connector status:', err);
      setError('Failed to update connector status. Please try again later.');
    }
  };

  const openConfigureModal = (connector) => {
    setCurrentConnector(connector);
    
    // Initialize form data based on connector type
    let initialFormData = {};
    
    switch(connector.type) {
      case 'oauth':
        initialFormData = {
          clientId: connector.config?.clientId || '',
          clientSecret: connector.config?.clientSecret || '',
          redirectUri: connector.config?.redirectUri || window.location.origin + '/oauth-callback',
          scope: connector.config?.scope || 'read',
          autoSync: connector.config?.autoSync || false,
          syncInterval: connector.config?.syncInterval || '60'
        };
        break;
      case 'api_key':
        initialFormData = {
          apiKey: connector.config?.apiKey || '',
          apiUrl: connector.config?.apiUrl || connector.defaultApiUrl || '',
          autoSync: connector.config?.autoSync || false,
          syncInterval: connector.config?.syncInterval || '60'
        };
        break;
      case 'credentials':
        initialFormData = {
          username: connector.config?.username || '',
          password: connector.config?.password || '',
          serverUrl: connector.config?.serverUrl || connector.defaultServerUrl || '',
          autoSync: connector.config?.autoSync || false,
          syncInterval: connector.config?.syncInterval || '60'
        };
        break;
      default:
        initialFormData = connector.config || {};
    }
    
    setFormData(initialFormData);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentConnector(null);
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
      await configureConnector(useMockData, currentConnector.id, formData);
      
      // Update connector in state
      setConnectors(prev => prev.map(c => 
        c.id === currentConnector.id ? { 
          ...c, 
          config: formData,
          status: c.status === 'disconnected' ? 'configuring' : c.status
        } : c
      ));
      
      closeModal();
    } catch (err) {
      console.error('Error configuring connector:', err);
      setError('Failed to configure connector. Please try again later.');
    }
  };

  const renderConfigurationForm = () => {
    if (!currentConnector) return null;
    
    switch(currentConnector.type) {
      case 'oauth':
        return (
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="clientId">Client ID *</Label>
              <Input 
                type="text" 
                id="clientId" 
                name="clientId" 
                value={formData.clientId} 
                onChange={handleInputChange} 
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="clientSecret">Client Secret *</Label>
              <Input 
                type="password" 
                id="clientSecret" 
                name="clientSecret" 
                value={formData.clientSecret} 
                onChange={handleInputChange} 
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="redirectUri">Redirect URI *</Label>
              <Input 
                type="text" 
                id="redirectUri" 
                name="redirectUri" 
                value={formData.redirectUri} 
                onChange={handleInputChange} 
                required
              />
              <InfoText>This URL must be registered in your {currentConnector.name} developer account.</InfoText>
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="scope">Scope</Label>
              <Input 
                type="text" 
                id="scope" 
                name="scope" 
                value={formData.scope} 
                onChange={handleInputChange}
              />
              <InfoText>Space-separated list of permissions to request.</InfoText>
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="syncInterval">Sync Interval (minutes)</Label>
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
            
            <ButtonGroup>
              <CancelButton type="button" onClick={closeModal}>Cancel</CancelButton>
              <SaveButton type="submit">Save Configuration</SaveButton>
            </ButtonGroup>
          </Form>
        );
        
      case 'api_key':
        return (
          <Form onSubmit={handleSubmit}>
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
            
            <FormGroup>
              <Label htmlFor="apiUrl">API URL *</Label>
              <Input 
                type="text" 
                id="apiUrl" 
                name="apiUrl" 
                value={formData.apiUrl} 
                onChange={handleInputChange} 
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="syncInterval">Sync Interval (minutes)</Label>
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
            
            <ButtonGroup>
              <CancelButton type="button" onClick={closeModal}>Cancel</CancelButton>
              <SaveButton type="submit">Save Configuration</SaveButton>
            </ButtonGroup>
          </Form>
        );
        
      case 'credentials':
        return (
          <Form onSubmit={handleSubmit}>
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
            
            <FormGroup>
              <Label htmlFor="serverUrl">Server URL *</Label>
              <Input 
                type="text" 
                id="serverUrl" 
                name="serverUrl" 
                value={formData.serverUrl} 
                onChange={handleInputChange} 
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="syncInterval">Sync Interval (minutes)</Label>
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
            
            <ButtonGroup>
              <CancelButton type="button" onClick={closeModal}>Cancel</CancelButton>
              <SaveButton type="submit">Save Configuration</SaveButton>
            </ButtonGroup>
          </Form>
        );
        
      default:
        return (
          <div>
            <p>Custom configuration for {currentConnector.name}</p>
            <ButtonGroup>
              <CancelButton type="button" onClick={closeModal}>Close</CancelButton>
            </ButtonGroup>
          </div>
        );
    }
  };

  if (isLoading) {
    return <LoadingContainer>Loading connectors...</LoadingContainer>;
  }

  if (error) {
    return <ErrorContainer>{error}</ErrorContainer>;
  }

  return (
    <Container>
      <Header>
        <Title>Third-Party Connectors</Title>
        <SearchContainer>
          <SearchIcon className="icon icon-search"></SearchIcon>
          <SearchInput 
            type="text" 
            placeholder="Search connectors..." 
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </SearchContainer>
      </Header>

      <CategoryTabs>
        {categories.map(category => (
          <CategoryTab 
            key={category.id}
            active={activeCategory === category.id}
            onClick={() => handleCategoryChange(category.id)}
          >
            {category.name}
          </CategoryTab>
        ))}
      </CategoryTabs>

      {filteredConnectors.length === 0 ? (
        <EmptyState>
          <EmptyStateIcon className="icon icon-plug"></EmptyStateIcon>
          <EmptyStateText>
            {searchQuery 
              ? `No connectors found matching "${searchQuery}"`
              : activeCategory !== 'all'
                ? `No ${categories.find(c => c.id === activeCategory)?.name || ''} connectors available`
                : 'No connectors available'
            }
          </EmptyStateText>
        </EmptyState>
      ) : (
        <ConnectorsGrid>
          {filteredConnectors.map(connector => (
            <ConnectorCard key={connector.id}>
              <ConnectorHeader>
                <ConnectorLogo>
                  {connector.logoUrl ? (
                    <img src={connector.logoUrl} alt={`${connector.name} logo`} />
                  ) : (
                    <span className={`icon icon-${connector.icon || 'plug'}`}></span>
                  )}
                </ConnectorLogo>
                <ConnectorInfo>
                  <ConnectorName>{connector.name}</ConnectorName>
                  <ConnectorCategory>
                    {categories.find(c => c.id === connector.category)?.name || connector.category}
                  </ConnectorCategory>
                </ConnectorInfo>
              </ConnectorHeader>
              
              <ConnectorDescription>{connector.description}</ConnectorDescription>
              
              <ConnectorFeatures>
                <FeatureList>
                  {connector.features.map((feature, index) => (
                    <Feature key={index}>{feature}</Feature>
                  ))}
                </FeatureList>
              </ConnectorFeatures>
              
              <ConnectorFooter>
                <StatusBadge status={connector.status}>
                  {connector.status.charAt(0).toUpperCase() + connector.status.slice(1)}
                </StatusBadge>
                <div>
                  <ConfigureButton 
                    onClick={() => openConfigureModal(connector)}
                    disabled={connector.status === 'configuring'}
                  >
                    Configure
                  </ConfigureButton>
                  <ConnectButton 
                    connected={connector.status === 'connected'}
                    onClick={() => handleConnectToggle(connector)}
                    disabled={connector.status === 'configuring' || (!connector.config && connector.status !== 'connected')}
                  >
                    {connector.status === 'connected' ? 'Disconnect' : 'Connect'}
                  </ConnectButton>
                </div>
              </ConnectorFooter>
            </ConnectorCard>
          ))}
        </ConnectorsGrid>
      )}

      {showModal && currentConnector && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>
                {currentConnector.logoUrl ? (
                  <img 
                    src={currentConnector.logoUrl} 
                    alt={`${currentConnector.name} logo`} 
                    style={{ width: '24px', height: '24px' }}
                  />
                ) : (
                  <span className={`icon icon-${currentConnector.icon || 'plug'}`}></span>
                )}
                Configure {currentConnector.name}
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

export default ThirdPartyConnectors;
