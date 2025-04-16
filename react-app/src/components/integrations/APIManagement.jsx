import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getAPIKeys, createAPIKey, updateAPIKey, deleteAPIKey } from '../../services/api/integrationsService';

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

const StatusBadge = styled.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  background-color: ${props => props.active ? '#e6f4ea' : '#fce8e6'};
  color: ${props => props.active ? '#34a853' : '#ea4335'};
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
  width: 500px;
  max-width: 90%;
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

const SaveButton = styled(Button)`
  margin: 0;
`;

const KeyDisplay = styled.div`
  background-color: #f1f3f4;
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 15px;
  font-family: monospace;
  word-break: break-all;
  position: relative;
`;

const CopyButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
  cursor: pointer;
  
  &:hover {
    background-color: #f8f9fa;
  }
`;

const InfoText = styled.p`
  font-size: 14px;
  color: #666;
  margin: 5px 0;
`;

const PermissionSection = styled.div`
  margin-top: 15px;
`;

const PermissionTitle = styled.h4`
  font-size: 16px;
  color: #333;
  margin: 0 0 10px 0;
`;

const PermissionGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-bottom: 15px;
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
 * APIManagement component for managing API keys, permissions, and access limits
 * @param {Object} props - Component props
 * @param {boolean} props.useMockData - Flag to use mock data instead of API
 * @returns {JSX.Element} APIManagement component
 */
const APIManagement = ({ useMockData = true }) => {
  const [apiKeys, setApiKeys] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create', 'edit', 'view'
  const [currentKey, setCurrentKey] = useState(null);
  const [newKeyGenerated, setNewKeyGenerated] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    expiresAt: '',
    rateLimit: '100',
    active: true,
    permissions: {
      vehicles: {
        read: false,
        write: false
      },
      drivers: {
        read: false,
        write: false
      },
      routes: {
        read: false,
        write: false
      },
      maintenance: {
        read: false,
        write: false
      },
      telemetry: {
        read: false,
        write: false
      },
      fuel: {
        read: false,
        write: false
      }
    }
  });

  useEffect(() => {
    fetchAPIKeys();
  }, [useMockData]);

  const fetchAPIKeys = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAPIKeys(useMockData);
      setApiKeys(data);
    } catch (err) {
      console.error('Error fetching API keys:', err);
      setError('Failed to load API keys. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name.includes('.')) {
        const [category, permission] = name.split('.');
        setFormData(prev => ({
          ...prev,
          permissions: {
            ...prev.permissions,
            [category]: {
              ...prev.permissions[category],
              [permission]: checked
            }
          }
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: checked
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const openCreateModal = () => {
    setModalMode('create');
    setFormData({
      name: '',
      description: '',
      expiresAt: '',
      rateLimit: '100',
      active: true,
      permissions: {
        vehicles: {
          read: false,
          write: false
        },
        drivers: {
          read: false,
          write: false
        },
        routes: {
          read: false,
          write: false
        },
        maintenance: {
          read: false,
          write: false
        },
        telemetry: {
          read: false,
          write: false
        },
        fuel: {
          read: false,
          write: false
        }
      }
    });
    setNewKeyGenerated(null);
    setShowModal(true);
  };

  const openEditModal = (key) => {
    setModalMode('edit');
    setCurrentKey(key);
    setFormData({
      name: key.name,
      description: key.description || '',
      expiresAt: key.expiresAt ? new Date(key.expiresAt).toISOString().split('T')[0] : '',
      rateLimit: key.rateLimit.toString(),
      active: key.active,
      permissions: key.permissions
    });
    setNewKeyGenerated(null);
    setShowModal(true);
  };

  const openViewModal = (key) => {
    setModalMode('view');
    setCurrentKey(key);
    setFormData({
      name: key.name,
      description: key.description || '',
      expiresAt: key.expiresAt ? new Date(key.expiresAt).toISOString().split('T')[0] : '',
      rateLimit: key.rateLimit.toString(),
      active: key.active,
      permissions: key.permissions
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentKey(null);
    setNewKeyGenerated(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (modalMode === 'create') {
        const newKey = await createAPIKey(useMockData, {
          ...formData,
          rateLimit: parseInt(formData.rateLimit)
        });
        setNewKeyGenerated(newKey.key);
        setApiKeys(prev => [...prev, newKey]);
      } else if (modalMode === 'edit') {
        const updatedKey = await updateAPIKey(useMockData, currentKey.id, {
          ...formData,
          rateLimit: parseInt(formData.rateLimit)
        });
        setApiKeys(prev => prev.map(key => key.id === currentKey.id ? updatedKey : key));
        closeModal();
      }
    } catch (err) {
      console.error('Error saving API key:', err);
      setError('Failed to save API key. Please try again later.');
    }
  };

  const handleDeleteKey = async (keyId) => {
    if (window.confirm('Are you sure you want to delete this API key? This action cannot be undone.')) {
      try {
        await deleteAPIKey(useMockData, keyId);
        setApiKeys(prev => prev.filter(key => key.id !== keyId));
      } catch (err) {
        console.error('Error deleting API key:', err);
        setError('Failed to delete API key. Please try again later.');
      }
    }
  };

  const handleToggleStatus = async (key) => {
    try {
      const updatedKey = await updateAPIKey(useMockData, key.id, {
        ...key,
        active: !key.active
      });
      setApiKeys(prev => prev.map(k => k.id === key.id ? updatedKey : k));
    } catch (err) {
      console.error('Error updating API key status:', err);
      setError('Failed to update API key status. Please try again later.');
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('API key copied to clipboard');
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  if (isLoading) {
    return <LoadingContainer>Loading API keys...</LoadingContainer>;
  }

  if (error) {
    return <ErrorContainer>{error}</ErrorContainer>;
  }

  return (
    <Container>
      <Header>
        <Title>API Key Management</Title>
        <Button onClick={openCreateModal}>
          <span className="icon icon-plus"></span>
          Create New API Key
        </Button>
      </Header>

      {apiKeys.length === 0 ? (
        <EmptyState>
          <EmptyStateIcon className="icon icon-key"></EmptyStateIcon>
          <EmptyStateText>No API keys found. Create your first API key to enable external integrations.</EmptyStateText>
          <Button onClick={openCreateModal}>
            <span className="icon icon-plus"></span>
            Create New API Key
          </Button>
        </EmptyState>
      ) : (
        <Table>
          <thead>
            <tr>
              <TableHeader>Name</TableHeader>
              <TableHeader>Key ID</TableHeader>
              <TableHeader>Created</TableHeader>
              <TableHeader>Expires</TableHeader>
              <TableHeader>Rate Limit</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Actions</TableHeader>
            </tr>
          </thead>
          <tbody>
            {apiKeys.map((key) => (
              <TableRow key={key.id}>
                <TableCell>{key.name}</TableCell>
                <TableCell>{key.id}</TableCell>
                <TableCell>{formatDate(key.createdAt)}</TableCell>
                <TableCell>{formatDate(key.expiresAt)}</TableCell>
                <TableCell>{key.rateLimit} req/min</TableCell>
                <TableCell>
                  <StatusBadge active={key.active}>
                    {key.active ? 'Active' : 'Inactive'}
                  </StatusBadge>
                </TableCell>
                <TableCell>
                  <ActionButton onClick={() => openViewModal(key)}>View</ActionButton>
                  <ActionButton onClick={() => openEditModal(key)}>Edit</ActionButton>
                  <ActionButton onClick={() => handleToggleStatus(key)}>
                    {key.active ? 'Deactivate' : 'Activate'}
                  </ActionButton>
                  <ActionButton className="delete" onClick={() => handleDeleteKey(key.id)}>Delete</ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      )}

      {showModal && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>
                {modalMode === 'create' ? 'Create New API Key' : 
                 modalMode === 'edit' ? 'Edit API Key' : 'View API Key'}
              </ModalTitle>
              <CloseButton onClick={closeModal}>&times;</CloseButton>
            </ModalHeader>

            {newKeyGenerated ? (
              <>
                <InfoText>Your new API key has been created. Please copy this key now as it will not be shown again.</InfoText>
                <KeyDisplay>
                  {newKeyGenerated}
                  <CopyButton onClick={() => copyToClipboard(newKeyGenerated)}>Copy</CopyButton>
                </KeyDisplay>
                <ButtonGroup>
                  <Button onClick={closeModal}>Done</Button>
                </ButtonGroup>
              </>
            ) : (
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label htmlFor="name">Name *</Label>
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
                  <Input 
                    type="text" 
                    id="description" 
                    name="description" 
                    value={formData.description} 
                    onChange={handleInputChange}
                    disabled={modalMode === 'view'}
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="expiresAt">Expiration Date</Label>
                  <Input 
                    type="date" 
                    id="expiresAt" 
                    name="expiresAt" 
                    value={formData.expiresAt} 
                    onChange={handleInputChange}
                    disabled={modalMode === 'view'}
                  />
                  <InfoText>Leave blank for non-expiring key</InfoText>
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="rateLimit">Rate Limit (requests per minute)</Label>
                  <Select 
                    id="rateLimit" 
                    name="rateLimit" 
                    value={formData.rateLimit} 
                    onChange={handleInputChange}
                    disabled={modalMode === 'view'}
                  >
                    <option value="10">10</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="500">500</option>
                    <option value="1000">1000</option>
                  </Select>
                </FormGroup>

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

                <PermissionSection>
                  <PermissionTitle>Permissions</PermissionTitle>
                  
                  <PermissionGroup>
                    <Checkbox>
                      <input 
                        type="checkbox" 
                        id="vehicles.read" 
                        name="vehicles.read" 
                        checked={formData.permissions.vehicles.read} 
                        onChange={handleInputChange}
                        disabled={modalMode === 'view'}
                      />
                      <Label htmlFor="vehicles.read">Vehicles - Read</Label>
                    </Checkbox>
                    
                    <Checkbox>
                      <input 
                        type="checkbox" 
                        id="vehicles.write" 
                        name="vehicles.write" 
                        checked={formData.permissions.vehicles.write} 
                        onChange={handleInputChange}
                        disabled={modalMode === 'view'}
                      />
                      <Label htmlFor="vehicles.write">Vehicles - Write</Label>
                    </Checkbox>
                  </PermissionGroup>

                  <PermissionGroup>
                    <Checkbox>
                      <input 
                        type="checkbox" 
                        id="drivers.read" 
                        name="drivers.read" 
                        checked={formData.permissions.drivers.read} 
                        onChange={handleInputChange}
                        disabled={modalMode === 'view'}
                      />
                      <Label htmlFor="drivers.read">Drivers - Read</Label>
                    </Checkbox>
                    
                    <Checkbox>
                      <input 
                        type="checkbox" 
                        id="drivers.write" 
                        name="drivers.write" 
                        checked={formData.permissions.drivers.write} 
                        onChange={handleInputChange}
                        disabled={modalMode === 'view'}
                      />
                      <Label htmlFor="drivers.write">Drivers - Write</Label>
                    </Checkbox>
                  </PermissionGroup>

                  <PermissionGroup>
                    <Checkbox>
                      <input 
                        type="checkbox" 
                        id="routes.read" 
                        name="routes.read" 
                        checked={formData.permissions.routes.read} 
                        onChange={handleInputChange}
                        disabled={modalMode === 'view'}
                      />
                      <Label htmlFor="routes.read">Routes - Read</Label>
                    </Checkbox>
                    
                    <Checkbox>
                      <input 
                        type="checkbox" 
                        id="routes.write" 
                        name="routes.write" 
                        checked={formData.permissions.routes.write} 
                        onChange={handleInputChange}
                        disabled={modalMode === 'view'}
                      />
                      <Label htmlFor="routes.write">Routes - Write</Label>
                    </Checkbox>
                  </PermissionGroup>

                  <PermissionGroup>
                    <Checkbox>
                      <input 
                        type="checkbox" 
                        id="maintenance.read" 
                        name="maintenance.read" 
                        checked={formData.permissions.maintenance.read} 
                        onChange={handleInputChange}
                        disabled={modalMode === 'view'}
                      />
                      <Label htmlFor="maintenance.read">Maintenance - Read</Label>
                    </Checkbox>
                    
                    <Checkbox>
                      <input 
                        type="checkbox" 
                        id="maintenance.write" 
                        name="maintenance.write" 
                        checked={formData.permissions.maintenance.write} 
                        onChange={handleInputChange}
                        disabled={modalMode === 'view'}
                      />
                      <Label htmlFor="maintenance.write">Maintenance - Write</Label>
                    </Checkbox>
                  </PermissionGroup>

                  <PermissionGroup>
                    <Checkbox>
                      <input 
                        type="checkbox" 
                        id="telemetry.read" 
                        name="telemetry.read" 
                        checked={formData.permissions.telemetry.read} 
                        onChange={handleInputChange}
                        disabled={modalMode === 'view'}
                      />
                      <Label htmlFor="telemetry.read">Telemetry - Read</Label>
                    </Checkbox>
                    
                    <Checkbox>
                      <input 
                        type="checkbox" 
                        id="telemetry.write" 
                        name="telemetry.write" 
                        checked={formData.permissions.telemetry.write} 
                        onChange={handleInputChange}
                        disabled={modalMode === 'view'}
                      />
                      <Label htmlFor="telemetry.write">Telemetry - Write</Label>
                    </Checkbox>
                  </PermissionGroup>

                  <PermissionGroup>
                    <Checkbox>
                      <input 
                        type="checkbox" 
                        id="fuel.read" 
                        name="fuel.read" 
                        checked={formData.permissions.fuel.read} 
                        onChange={handleInputChange}
                        disabled={modalMode === 'view'}
                      />
                      <Label htmlFor="fuel.read">Fuel - Read</Label>
                    </Checkbox>
                    
                    <Checkbox>
                      <input 
                        type="checkbox" 
                        id="fuel.write" 
                        name="fuel.write" 
                        checked={formData.permissions.fuel.write} 
                        onChange={handleInputChange}
                        disabled={modalMode === 'view'}
                      />
                      <Label htmlFor="fuel.write">Fuel - Write</Label>
                    </Checkbox>
                  </PermissionGroup>
                </PermissionSection>

                {modalMode !== 'view' && (
                  <ButtonGroup>
                    <CancelButton type="button" onClick={closeModal}>Cancel</CancelButton>
                    <SaveButton type="submit">
                      {modalMode === 'create' ? 'Create API Key' : 'Save Changes'}
                    </SaveButton>
                  </ButtonGroup>
                )}

                {modalMode === 'view' && (
                  <ButtonGroup>
                    <Button type="button" onClick={closeModal}>Close</Button>
                  </ButtonGroup>
                )}
              </Form>
            )}
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default APIManagement;
