import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getFuelCardProviders, updateFuelCardProvider, configureFuelCardProvider, getFuelTransactions } from '../../services/api/integrationsService';

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

const DateRangeContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const DateInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #1a73e8;
  }
`;

const SummaryCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: 20px;
  margin-bottom: 20px;
`;

const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SummaryItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const SummaryLabel = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
`;

const SummaryValue = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;

const AmountCell = styled(TableCell)`
  text-align: right;
  font-weight: ${props => props.bold ? 'bold' : 'normal'};
`;

/**
 * FuelCardIntegration component for managing integrations with fuel card systems
 * and automating expense processing
 * @param {Object} props - Component props
 * @param {boolean} props.useMockData - Flag to use mock data instead of API
 * @returns {JSX.Element} FuelCardIntegration component
 */
const FuelCardIntegration = ({ useMockData = true }) => {
  const [providers, setProviders] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    totalTransactions: 0,
    totalAmount: 0,
    totalLiters: 0,
    averagePrice: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentProvider, setCurrentProvider] = useState(null);
  const [formData, setFormData] = useState({});
  
  // Filters
  const [providerFilter, setProviderFilter] = useState('all');
  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days ago
    endDate: new Date().toISOString().split('T')[0] // today
  });

  useEffect(() => {
    fetchProviders();
    fetchTransactions();
  }, [useMockData]);

  useEffect(() => {
    fetchTransactions();
  }, [providerFilter, dateRange]);

  const fetchProviders = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getFuelCardProviders(useMockData);
      setProviders(data);
    } catch (err) {
      console.error('Error fetching fuel card providers:', err);
      setError('Failed to load fuel card providers. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTransactions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getFuelTransactions(useMockData, {
        providerId: providerFilter !== 'all' ? providerFilter : undefined,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate
      });
      
      setTransactions(data.transactions);
      setSummary(data.summary);
    } catch (err) {
      console.error('Error fetching fuel transactions:', err);
      setError('Failed to load fuel transactions. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnectToggle = async (provider) => {
    try {
      const newStatus = provider.status === 'connected' ? 'disconnected' : 'connected';
      await updateFuelCardProvider(useMockData, provider.id, { status: newStatus });
      
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
      autoSync: initialFormData.autoSync !== undefined ? initialFormData.autoSync : true,
      syncInterval: initialFormData.syncInterval || '60',
      autoExpenseMapping: initialFormData.autoExpenseMapping !== undefined ? initialFormData.autoExpenseMapping : true,
      defaultExpenseCategory: initialFormData.defaultExpenseCategory || 'fuel',
      defaultTaxRate: initialFormData.defaultTaxRate || '20'
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
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await configureFuelCardProvider(useMockData, currentProvider.id, formData);
      
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

  const handleProviderFilterChange = (e) => {
    setProviderFilter(e.target.value);
  };

  const handleDateRangeChange = (e) => {
    const { name, value } = e.target;
    setDateRange(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const formatCurrency = (amount, currency = 'EUR') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  const formatNumber = (number, decimals = 2) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(number);
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
        
        <FormGroup>
          <Label htmlFor="apiUrl">API URL {currentProvider.authType === 'api_key' ? '*' : ''}</Label>
          <Input 
            type="text" 
            id="apiUrl" 
            name="apiUrl" 
            value={formData.apiUrl} 
            onChange={handleInputChange} 
            required={currentProvider.authType === 'api_key'}
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
        
        <SectionTitle>Expense Processing</SectionTitle>
        
        <FormGroup>
          <Checkbox>
            <input 
              type="checkbox" 
              id="autoExpenseMapping" 
              name="autoExpenseMapping" 
              checked={formData.autoExpenseMapping} 
              onChange={handleInputChange}
            />
            <Label htmlFor="autoExpenseMapping">Automatically create expense entries</Label>
          </Checkbox>
          <InfoText>When enabled, fuel card transactions will be automatically converted to expense entries.</InfoText>
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="defaultExpenseCategory">Default Expense Category</Label>
          <Select 
            id="defaultExpenseCategory" 
            name="defaultExpenseCategory" 
            value={formData.defaultExpenseCategory} 
            onChange={handleInputChange}
          >
            <option value="fuel">Fuel</option>
            <option value="maintenance">Maintenance</option>
            <option value="toll">Road Toll</option>
            <option value="parking">Parking</option>
            <option value="other">Other</option>
          </Select>
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="defaultTaxRate">Default Tax Rate (%)</Label>
          <Select 
            id="defaultTaxRate" 
            name="defaultTaxRate" 
            value={formData.defaultTaxRate} 
            onChange={handleInputChange}
          >
            <option value="0">0%</option>
            <option value="5">5%</option>
            <option value="8">8%</option>
            <option value="10">10%</option>
            <option value="13">13%</option>
            <option value="20">20%</option>
            <option value="23">23%</option>
            <option value="25">25%</option>
          </Select>
        </FormGroup>
        
        <ButtonGroup>
          <CancelButton type="button" onClick={closeModal}>Cancel</CancelButton>
          <SaveButton type="submit">Save Configuration</SaveButton>
        </ButtonGroup>
      </Form>
    );
  };

  if (isLoading && providers.length === 0) {
    return <LoadingContainer>Loading fuel card providers...</LoadingContainer>;
  }

  if (error && providers.length === 0) {
    return <ErrorContainer>{error}</ErrorContainer>;
  }

  return (
    <Container>
      <Header>
        <Title>Fuel Card Integration</Title>
      </Header>

      <SectionTitle>Available Fuel Card Providers</SectionTitle>
      
      {providers.length === 0 ? (
        <EmptyState>
          <EmptyStateIcon className="icon icon-credit-card"></EmptyStateIcon>
          <EmptyStateText>No fuel card providers available. Contact your administrator to add fuel card providers.</EmptyStateText>
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
                    <span className={`icon icon-${provider.icon || 'credit-card'}`}></span>
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

      <SectionTitle>Fuel Transactions</SectionTitle>
      
      <FilterContainer>
        <div>
          <Label htmlFor="providerFilter">Provider:</Label>
          <FilterSelect 
            id="providerFilter" 
            value={providerFilter} 
            onChange={handleProviderFilterChange}
          >
            <option value="all">All Providers</option>
            {providers.map(provider => (
              <option key={provider.id} value={provider.id}>{provider.name}</option>
            ))}
          </FilterSelect>
        </div>
        
        <DateRangeContainer>
          <Label htmlFor="startDate">From:</Label>
          <DateInput 
            type="date" 
            id="startDate" 
            name="startDate" 
            value={dateRange.startDate} 
            onChange={handleDateRangeChange}
          />
          
          <Label htmlFor="endDate">To:</Label>
          <DateInput 
            type="date" 
            id="endDate" 
            name="endDate" 
            value={dateRange.endDate} 
            onChange={handleDateRangeChange}
          />
        </DateRangeContainer>
      </FilterContainer>
      
      <SummaryCard>
        <SummaryGrid>
          <SummaryItem>
            <SummaryLabel>Total Transactions</SummaryLabel>
            <SummaryValue>{summary.totalTransactions}</SummaryValue>
          </SummaryItem>
          
          <SummaryItem>
            <SummaryLabel>Total Amount</SummaryLabel>
            <SummaryValue>{formatCurrency(summary.totalAmount)}</SummaryValue>
          </SummaryItem>
          
          <SummaryItem>
            <SummaryLabel>Total Liters</SummaryLabel>
            <SummaryValue>{formatNumber(summary.totalLiters)} L</SummaryValue>
          </SummaryItem>
          
          <SummaryItem>
            <SummaryLabel>Average Price per Liter</SummaryLabel>
            <SummaryValue>{formatCurrency(summary.averagePrice)}</SummaryValue>
          </SummaryItem>
        </SummaryGrid>
      </SummaryCard>
      
      {isLoading && <LoadingContainer>Loading transactions...</LoadingContainer>}
      
      {error && <ErrorContainer>{error}</ErrorContainer>}
      
      {!isLoading && !error && transactions.length === 0 ? (
        <EmptyState>
          <EmptyStateIcon className="icon icon-receipt"></EmptyStateIcon>
          <EmptyStateText>No fuel transactions found for the selected filters.</EmptyStateText>
        </EmptyState>
      ) : (
        <Table>
          <thead>
            <tr>
              <TableHeader>Date</TableHeader>
              <TableHeader>Card Number</TableHeader>
              <TableHeader>Vehicle</TableHeader>
              <TableHeader>Driver</TableHeader>
              <TableHeader>Station</TableHeader>
              <TableHeader>Fuel Type</TableHeader>
              <TableHeader>Liters</TableHeader>
              <TableHeader>Price/L</TableHeader>
              <TableHeader>Amount</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Actions</TableHeader>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <TableRow key={index}>
                <TableCell>{formatDate(transaction.date)}</TableCell>
                <TableCell>{transaction.cardNumber}</TableCell>
                <TableCell>{transaction.vehicleName || 'N/A'}</TableCell>
                <TableCell>{transaction.driverName || 'N/A'}</TableCell>
                <TableCell>{transaction.stationName}</TableCell>
                <TableCell>{transaction.fuelType}</TableCell>
                <TableCell>{formatNumber(transaction.liters)} L</TableCell>
                <TableCell>{formatCurrency(transaction.pricePerLiter)}</TableCell>
                <AmountCell>{formatCurrency(transaction.amount)}</AmountCell>
                <TableCell>
                  <StatusBadge status={transaction.status === 'processed' ? 'connected' : transaction.status === 'pending' ? 'configuring' : 'error'}>
                    {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                  </StatusBadge>
                </TableCell>
                <TableCell>
                  <ActionButton>View Details</ActionButton>
                  {transaction.status !== 'processed' && (
                    <ActionButton>Process</ActionButton>
                  )}
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
                  <span className={`icon icon-${currentProvider.icon || 'credit-card'}`}></span>
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

export default FuelCardIntegration;
