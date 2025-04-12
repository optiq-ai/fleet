import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface RoleBasedAccessProps {
  onSaveRole: (role: any) => Promise<void>;
  onUpdatePermissions: (roleId: string, permissions: string[]) => Promise<void>;
  onDeleteRole: (roleId: string) => Promise<void>;
  onAssignRole: (userId: string, roleId: string) => Promise<void>;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 500;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
`;

const CardTitle = styled.div`
  font-weight: 500;
  font-size: 16px;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardContent = styled.div``;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 20px;
`;

const Tab = styled.div<{ active: boolean }>`
  padding: 12px 24px;
  cursor: pointer;
  font-weight: ${props => props.active ? '500' : 'normal'};
  color: ${props => props.active ? '#3f51b5' : '#666'};
  border-bottom: 2px solid ${props => props.active ? '#3f51b5' : 'transparent'};
  transition: all 0.3s ease;
  
  &:hover {
    color: #3f51b5;
    background-color: #f5f5f5;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  
  &:focus {
    border-color: #3f51b5;
    outline: none;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  min-height: 100px;
  
  &:focus {
    border-color: #3f51b5;
    outline: none;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  background-color: white;
  
  &:focus {
    border-color: #3f51b5;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 10px 16px;
  background-color: #3f51b5;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  
  &:hover {
    background-color: #303f9f;
  }
  
  &:disabled {
    background-color: #c5cae9;
    cursor: not-allowed;
  }
`;

const SecondaryButton = styled.button`
  padding: 10px 16px;
  background-color: white;
  color: #3f51b5;
  border: 1px solid #3f51b5;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  
  &:hover {
    background-color: #e8eaf6;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

const RolesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const RoleItem = styled.div`
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
`;

const RoleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const RoleTitle = styled.div`
  font-weight: 500;
`;

const RoleActions = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button`
  padding: 6px 12px;
  background-color: white;
  color: #3f51b5;
  border: 1px solid #3f51b5;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  
  &:hover {
    background-color: #e8eaf6;
  }
`;

const RoleDescription = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
`;

const PermissionsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const PermissionGroup = styled.div`
  margin-bottom: 16px;
`;

const PermissionGroupTitle = styled.div`
  font-weight: 500;
  margin-bottom: 8px;
`;

const PermissionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

const Checkbox = styled.input`
  cursor: pointer;
`;

const UsersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const UserItem = styled.div`
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  display: flex;
  align-items: center;
  gap: 16px;
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  color: #666;
`;

const UserInfo = styled.div`
  flex: 1;
`;

const UserName = styled.div`
  font-weight: 500;
  margin-bottom: 4px;
`;

const UserEmail = styled.div`
  font-size: 14px;
  color: #666;
`;

const UserRole = styled.div`
  font-size: 14px;
  color: #3f51b5;
  font-weight: 500;
`;

const SearchContainer = styled.div`
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  
  &:focus {
    border-color: #3f51b5;
    outline: none;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 24px;
  width: 500px;
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const ModalTitle = styled.div`
  font-weight: 500;
  font-size: 18px;
`;

const ModalCloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  
  &:hover {
    color: #000;
  }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 24px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px;
  color: #666;
`;

const EmptyStateIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
  color: #ddd;
`;

const EmptyStateText = styled.div`
  font-size: 16px;
  margin-bottom: 8px;
`;

const EmptyStateSubtext = styled.div`
  font-size: 14px;
  color: #999;
  margin-bottom: 16px;
`;

const RoleBasedAccess: React.FC<RoleBasedAccessProps> = ({
  onSaveRole,
  onUpdatePermissions,
  onDeleteRole,
  onAssignRole
}) => {
  const [activeTab, setActiveTab] = useState<'roles' | 'users'>('roles');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [roles, setRoles] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [showRoleModal, setShowRoleModal] = useState<boolean>(false);
  const [showPermissionsModal, setShowPermissionsModal] = useState<boolean>(false);
  const [showAssignRoleModal, setShowAssignRoleModal] = useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState<any | null>(null);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  
  // Formularz roli
  const [roleName, setRoleName] = useState<string>('');
  const [roleDescription, setRoleDescription] = useState<string>('');
  const [rolePermissions, setRolePermissions] = useState<string[]>([]);
  
  // Przykładowe dane
  useEffect(() => {
    // Symulacja pobrania ról
    const sampleRoles = [
      {
        id: 'role1',
        name: 'Administrator',
        description: 'Pełny dostęp do wszystkich funkcji systemu',
        permissions: [
          'dashboard_view', 'dashboard_edit',
          'vehicles_view', 'vehicles_edit', 'vehicles_delete',
          'drivers_view', 'drivers_edit', 'drivers_delete',
          'reports_view', 'reports_create', 'reports_export',
          'settings_view', 'settings_edit',
          'users_view', 'users_edit', 'users_delete',
          'roles_view', 'roles_edit', 'roles_delete'
        ]
      },
      {
        id: 'role2',
        name: 'Menedżer floty',
        description: 'Zarządzanie pojazdami i kierowcami, dostęp do raportów',
        permissions: [
          'dashboard_view',
          'vehicles_view', 'vehicles_edit',
          'drivers_view', 'drivers_edit',
          'reports_view', 'reports_create', 'reports_export',
          'settings_view'
        ]
      },
      {
        id: 'role3',
        name: 'Kierowca',
        description: 'Ograniczony dostęp tylko do własnych danych i podstawowych informacji',
        permissions: [
          'dashboard_view',
          'vehicles_view',
          'reports_view'
        ]
      },
      {
        id: 'role4',
        name: 'Analityk',
        description: 'Dostęp do raportów i analiz bez możliwości edycji danych',
        permissions: [
          'dashboard_view',
          'vehicles_view',
          'drivers_view',
          'reports_view', 'reports_create', 'reports_export'
        ]
      }
    ];
    
    setRoles(sampleRoles);
    
    // Symulacja pobrania użytkowników
    const sampleUsers = [
      {
        id: 'user1',
        name: 'Jan Kowalski',
        email: 'jan.kowalski@example.com',
        role: {
          id: 'role2',
          name: 'Menedżer floty'
        }
      },
      {
        id: 'user2',
        name: 'Anna Nowak',
        email: 'anna.nowak@example.com',
        role: {
          id: 'role3',
          name: 'Kierowca'
        }
      },
      {
        id: 'user3',
        name: 'Piotr Wiśniewski',
        email: 'piotr.wisniewski@example.com',
        role: {
          id: 'role1',
          name: 'Administrator'
        }
      },
      {
        id: 'user4',
        name: 'Maria Kowalczyk',
        email: 'maria.kowalczyk@example.com',
        role: {
          id: 'role4',
          name: 'Analityk'
        }
      },
      {
        id: 'user5',
        name: 'Tomasz Lewandowski',
        email: 'tomasz.lewandowski@example.com',
        role: {
          id: 'role3',
          name: 'Kierowca'
        }
      }
    ];
    
    setUsers(sampleUsers);
  }, []);
  
  // Filtrowanie ról na podstawie wyszukiwania
  const filteredRoles = roles.filter(role => {
    if (searchQuery && !role.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !role.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  // Filtrowanie użytkowników na podstawie wyszukiwania
  const filteredUsers = users.filter(user => {
    if (searchQuery && !user.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !user.email.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !user.role.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  // Obsługa otwierania modalu roli
  const handleOpenRoleModal = (role: any = null) => {
    if (role) {
      // Edycja istniejącej roli
      setRoleName(role.name);
      setRoleDescription(role.description);
      setSelectedRole(role);
    } else {
      // Dodawanie nowej roli
      setRoleName('');
      setRoleDescription('');
      setSelectedRole(null);
    }
    
    setShowRoleModal(true);
  };
  
  // Obsługa zamykania modalu roli
  const handleCloseRoleModal = () => {
    setShowRoleModal(false);
    setSelectedRole(null);
  };
  
  // Obsługa otwierania modalu uprawnień
  const handleOpenPermissionsModal = (role: any) => {
    setSelectedRole(role);
    setRolePermissions([...role.permissions]);
    setShowPermissionsModal(true);
  };
  
  // Obsługa zamykania modalu uprawnień
  const handleClosePermissionsModal = () => {
    setShowPermissionsModal(false);
    setSelectedRole(null);
  };
  
  // Obsługa otwierania modalu przypisywania roli
  const handleOpenAssignRoleModal = (user: any) => {
    setSelectedUser(user);
    setShowAssignRoleModal(true);
  };
  
  // Obsługa zamykania modalu przypisywania roli
  const handleCloseAssignRoleModal = () => {
    setShowAssignRoleModal(false);
    setSelectedUser(null);
  };
  
  // Obsługa zapisywania roli
  const handleSaveRole = async () => {
    if (!roleName) {
      alert('Proszę wprowadzić nazwę roli');
      return;
    }
    
    const roleData = {
      name: roleName,
      description: roleDescription,
      permissions: selectedRole ? selectedRole.permissions : []
    };
    
    try {
      await onSaveRole(roleData);
      
      if (selectedRole) {
        // Aktualizacja istniejącej roli
        setRoles(roles.map(role => 
          role.id === selectedRole.id ? { ...role, ...roleData } : role
        ));
      } else {
        // Dodanie nowej roli
        const newRole = {
          id: `role${Date.now()}`,
          ...roleData
        };
        
        setRoles([...roles, newRole]);
      }
      
      handleCloseRoleModal();
    } catch (error) {
      console.error('Error saving role:', error);
      alert('Wystąpił błąd podczas zapisywania roli');
    }
  };
  
  // Obsługa usuwania roli
  const handleDeleteRole = async (roleId: string) => {
    // Sprawdź, czy rola jest przypisana do jakiegoś użytkownika
    const usersWithRole = users.filter(user => user.role.id === roleId);
    
    if (usersWithRole.length > 0) {
      alert(`Nie można usunąć roli, ponieważ jest przypisana do ${usersWithRole.length} użytkowników`);
      return;
    }
    
    if (window.confirm('Czy na pewno chcesz usunąć tę rolę?')) {
      try {
        await onDeleteRole(roleId);
        
        // Usuń rolę z listy
        setRoles(roles.filter(role => role.id !== roleId));
      } catch (error) {
        console.error('Error deleting role:', error);
        alert('Wystąpił błąd podczas usuwania roli');
      }
    }
  };
  
  // Obsługa aktualizacji uprawnień
  const handleUpdatePermissions = async () => {
    if (!selectedRole) {
      return;
    }
    
    try {
      await onUpdatePermissions(selectedRole.id, rolePermissions);
      
      // Aktualizuj rolę w liście
      setRoles(roles.map(role => 
        role.id === selectedRole.id ? { ...role, permissions: rolePermissions } : role
      ));
      
      handleClosePermissionsModal();
    } catch (error) {
      console.error('Error updating permissions:', error);
      alert('Wystąpił błąd podczas aktualizacji uprawnień');
    }
  };
  
  // Obsługa przypisywania roli
  const handleAssignRole = async (roleId: string) => {
    if (!selectedUser) {
      return;
    }
    
    try {
      await onAssignRole(selectedUser.id, roleId);
      
      const role = roles.find(r => r.id === roleId);
      
      if (role) {
        // Aktualizuj użytkownika w liście
        setUsers(users.map(user => 
          user.id === selectedUser.id ? { ...user, role: { id: role.id, name: role.name } } : user
        ));
      }
      
      handleCloseAssignRoleModal();
    } catch (error) {
      console.error('Error assigning role:', error);
      alert('Wystąpił błąd podczas przypisywania roli');
    }
  };
  
  // Obsługa zmiany uprawnienia
  const handlePermissionChange = (permission: string, checked: boolean) => {
    if (checked) {
      setRolePermissions([...rolePermissions, permission]);
    } else {
      setRolePermissions(rolePermissions.filter(p => p !== permission));
    }
  };
  
  // Grupowanie uprawnień
  const permissionGroups = {
    dashboard: {
      title: 'Dashboard',
      permissions: [
        { id: 'dashboard_view', name: 'Podgląd dashboardu' },
        { id: 'dashboard_edit', name: 'Edycja dashboardu' }
      ]
    },
    vehicles: {
      title: 'Pojazdy',
      permissions: [
        { id: 'vehicles_view', name: 'Podgląd pojazdów' },
        { id: 'vehicles_edit', name: 'Edycja pojazdów' },
        { id: 'vehicles_delete', name: 'Usuwanie pojazdów' }
      ]
    },
    drivers: {
      title: 'Kierowcy',
      permissions: [
        { id: 'drivers_view', name: 'Podgląd kierowców' },
        { id: 'drivers_edit', name: 'Edycja kierowców' },
        { id: 'drivers_delete', name: 'Usuwanie kierowców' }
      ]
    },
    reports: {
      title: 'Raporty',
      permissions: [
        { id: 'reports_view', name: 'Podgląd raportów' },
        { id: 'reports_create', name: 'Tworzenie raportów' },
        { id: 'reports_export', name: 'Eksport raportów' }
      ]
    },
    settings: {
      title: 'Ustawienia',
      permissions: [
        { id: 'settings_view', name: 'Podgląd ustawień' },
        { id: 'settings_edit', name: 'Edycja ustawień' }
      ]
    },
    users: {
      title: 'Użytkownicy',
      permissions: [
        { id: 'users_view', name: 'Podgląd użytkowników' },
        { id: 'users_edit', name: 'Edycja użytkowników' },
        { id: 'users_delete', name: 'Usuwanie użytkowników' }
      ]
    },
    roles: {
      title: 'Role',
      permissions: [
        { id: 'roles_view', name: 'Podgląd ról' },
        { id: 'roles_edit', name: 'Edycja ról' },
        { id: 'roles_delete', name: 'Usuwanie ról' }
      ]
    }
  };
  
  // Renderowanie zakładki ról
  const renderRolesTab = () => {
    return (
      <>
        <SearchContainer>
          <SearchInput 
            type="text" 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
            placeholder="Szukaj ról..."
          />
        </SearchContainer>
        
        <ButtonGroup style={{ justifyContent: 'flex-start', marginBottom: '20px' }}>
          <Button onClick={() => handleOpenRoleModal()}>Dodaj nową rolę</Button>
        </ButtonGroup>
        
        {filteredRoles.length === 0 ? (
          <EmptyState>
            <EmptyStateIcon>🔍</EmptyStateIcon>
            <EmptyStateText>Brak ról</EmptyStateText>
            <EmptyStateSubtext>
              {searchQuery ? 'Brak wyników dla podanego wyszukiwania' : 'Dodaj role, aby rozpocząć'}
            </EmptyStateSubtext>
            {searchQuery && (
              <SecondaryButton onClick={() => setSearchQuery('')}>
                Wyczyść wyszukiwanie
              </SecondaryButton>
            )}
          </EmptyState>
        ) : (
          <RolesList>
            {filteredRoles.map(role => (
              <RoleItem key={role.id}>
                <RoleHeader>
                  <RoleTitle>{role.name}</RoleTitle>
                  <RoleActions>
                    <ActionButton onClick={() => handleOpenRoleModal(role)}>Edytuj</ActionButton>
                    <ActionButton onClick={() => handleOpenPermissionsModal(role)}>Uprawnienia</ActionButton>
                    <ActionButton onClick={() => handleDeleteRole(role.id)}>Usuń</ActionButton>
                  </RoleActions>
                </RoleHeader>
                
                <RoleDescription>{role.description}</RoleDescription>
                
                <div>
                  <div style={{ fontWeight: 500, marginBottom: '8px' }}>Uprawnienia:</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {role.permissions.map((permission: string) => {
                      // Znajdź nazwę uprawnienia
                      let permissionName = permission;
                      
                      for (const groupKey in permissionGroups) {
                        const group = permissionGroups[groupKey as keyof typeof permissionGroups];
                        const foundPermission = group.permissions.find(p => p.id === permission);
                        
                        if (foundPermission) {
                          permissionName = foundPermission.name;
                          break;
                        }
                      }
                      
                      return (
                        <div 
                          key={permission} 
                          style={{ 
                            padding: '4px 8px', 
                            backgroundColor: '#e8eaf6', 
                            color: '#3f51b5', 
                            borderRadius: '4px', 
                            fontSize: '12px' 
                          }}
                        >
                          {permissionName}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </RoleItem>
            ))}
          </RolesList>
        )}
      </>
    );
  };
  
  // Renderowanie zakładki użytkowników
  const renderUsersTab = () => {
    return (
      <>
        <SearchContainer>
          <SearchInput 
            type="text" 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
            placeholder="Szukaj użytkowników..."
          />
        </SearchContainer>
        
        {filteredUsers.length === 0 ? (
          <EmptyState>
            <EmptyStateIcon>🔍</EmptyStateIcon>
            <EmptyStateText>Brak użytkowników</EmptyStateText>
            <EmptyStateSubtext>
              {searchQuery ? 'Brak wyników dla podanego wyszukiwania' : 'Dodaj użytkowników, aby rozpocząć'}
            </EmptyStateSubtext>
            {searchQuery && (
              <SecondaryButton onClick={() => setSearchQuery('')}>
                Wyczyść wyszukiwanie
              </SecondaryButton>
            )}
          </EmptyState>
        ) : (
          <UsersList>
            {filteredUsers.map(user => (
              <UserItem key={user.id}>
                <UserAvatar>{user.name.charAt(0)}</UserAvatar>
                <UserInfo>
                  <UserName>{user.name}</UserName>
                  <UserEmail>{user.email}</UserEmail>
                </UserInfo>
                <UserRole>{user.role.name}</UserRole>
                <RoleActions>
                  <ActionButton onClick={() => handleOpenAssignRoleModal(user)}>Zmień rolę</ActionButton>
                </RoleActions>
              </UserItem>
            ))}
          </UsersList>
        )}
      </>
    );
  };
  
  return (
    <Container>
      <Header>
        <Title>Kontrola dostępu oparta na rolach</Title>
      </Header>
      
      <TabsContainer>
        <Tab 
          active={activeTab === 'roles'} 
          onClick={() => setActiveTab('roles')}
        >
          Role
        </Tab>
        <Tab 
          active={activeTab === 'users'} 
          onClick={() => setActiveTab('users')}
        >
          Użytkownicy
        </Tab>
      </TabsContainer>
      
      <Card>
        <CardContent>
          {activeTab === 'roles' && renderRolesTab()}
          {activeTab === 'users' && renderUsersTab()}
        </CardContent>
      </Card>
      
      {/* Modal dodawania/edycji roli */}
      {showRoleModal && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>{selectedRole ? 'Edytuj rolę' : 'Dodaj nową rolę'}</ModalTitle>
              <ModalCloseButton onClick={handleCloseRoleModal}>×</ModalCloseButton>
            </ModalHeader>
            
            <FormGroup>
              <Label>Nazwa roli *</Label>
              <Input 
                type="text" 
                value={roleName} 
                onChange={(e) => setRoleName(e.target.value)} 
                placeholder="Wprowadź nazwę roli"
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Opis</Label>
              <TextArea 
                value={roleDescription} 
                onChange={(e) => setRoleDescription(e.target.value)} 
                placeholder="Wprowadź opis roli"
              />
            </FormGroup>
            
            <ModalFooter>
              <SecondaryButton onClick={handleCloseRoleModal}>Anuluj</SecondaryButton>
              <Button onClick={handleSaveRole}>Zapisz</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
      
      {/* Modal uprawnień */}
      {showPermissionsModal && selectedRole && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Uprawnienia roli: {selectedRole.name}</ModalTitle>
              <ModalCloseButton onClick={handleClosePermissionsModal}>×</ModalCloseButton>
            </ModalHeader>
            
            <div>
              <PermissionsContainer>
                {Object.keys(permissionGroups).map(groupKey => {
                  const group = permissionGroups[groupKey as keyof typeof permissionGroups];
                  
                  return (
                    <PermissionGroup key={groupKey}>
                      <PermissionGroupTitle>{group.title}</PermissionGroupTitle>
                      {group.permissions.map(permission => (
                        <PermissionItem key={permission.id}>
                          <CheckboxLabel>
                            <Checkbox 
                              type="checkbox" 
                              checked={rolePermissions.includes(permission.id)} 
                              onChange={(e) => handlePermissionChange(permission.id, e.target.checked)} 
                            />
                            {permission.name}
                          </CheckboxLabel>
                        </PermissionItem>
                      ))}
                    </PermissionGroup>
                  );
                })}
              </PermissionsContainer>
              
              <ModalFooter>
                <SecondaryButton onClick={handleClosePermissionsModal}>Anuluj</SecondaryButton>
                <Button onClick={handleUpdatePermissions}>Zapisz uprawnienia</Button>
              </ModalFooter>
            </div>
          </ModalContent>
        </Modal>
      )}
      
      {/* Modal przypisywania roli */}
      {showAssignRoleModal && selectedUser && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Zmień rolę użytkownika</ModalTitle>
              <ModalCloseButton onClick={handleCloseAssignRoleModal}>×</ModalCloseButton>
            </ModalHeader>
            
            <div>
              <p>Zmiana roli dla użytkownika: <strong>{selectedUser.name}</strong></p>
              <p>Aktualna rola: <strong>{selectedUser.role.name}</strong></p>
              
              <FormGroup>
                <Label>Wybierz nową rolę</Label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {roles.map(role => (
                    <div 
                      key={role.id} 
                      style={{ 
                        padding: '12px', 
                        border: `1px solid ${role.id === selectedUser.role.id ? '#3f51b5' : '#ddd'}`,
                        borderRadius: '4px',
                        backgroundColor: role.id === selectedUser.role.id ? '#e8eaf6' : 'white',
                        cursor: 'pointer'
                      }}
                      onClick={() => handleAssignRole(role.id)}
                    >
                      <div style={{ fontWeight: 500 }}>{role.name}</div>
                      <div style={{ fontSize: '14px', color: '#666' }}>{role.description}</div>
                    </div>
                  ))}
                </div>
              </FormGroup>
              
              <ModalFooter>
                <Button onClick={handleCloseAssignRoleModal}>Zamknij</Button>
              </ModalFooter>
            </div>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default RoleBasedAccess;
