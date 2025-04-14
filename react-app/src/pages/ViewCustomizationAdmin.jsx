import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import Card from '../components/common/Card';
import viewCustomizationService from '../services/api/viewCustomizationService';
import { ViewCustomizationContext } from '../context/ViewCustomizationContext';

/**
 * @typedef {Object} DashboardElement
 * @property {string} id - Element ID
 * @property {string} type - Element type
 * @property {string} name - Element name
 * @property {string} description - Element description
 * @property {string} category - Element category
 * @property {boolean} defaultVisible - Whether element is visible by default
 * @property {string[]} [requiredRoles] - Roles required to view element
 */

/**
 * @typedef {Object} UserGroup
 * @property {string} id - Group ID
 * @property {string} name - Group name
 * @property {string} description - Group description
 * @property {string[]} permissions - Group permissions
 */

/**
 * @typedef {Object} ElementPermission
 * @property {string} elementId - Element ID
 * @property {string[]} groupIds - Group IDs
 */

/**
 * @typedef {Object} UpdateElementPermissionsRequest
 * @property {string} elementId - Element ID
 * @property {string[]} groupIds - Group IDs
 */

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 500;
  color: #333;
  margin: 0 0 16px 0;
`;

const GridSection = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 20px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const LoadingIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  color: #666;
`;

const ErrorMessage = styled.div`
  color: #d32f2f;
  padding: 16px;
  background-color: #ffebee;
  border-radius: 4px;
  margin-bottom: 20px;
`;

const SuccessMessage = styled.div`
  color: #388e3c;
  padding: 16px;
  background-color: #e8f5e9;
  border-radius: 4px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: ${props => props.primary ? '#3f51b5' : 'white'};
  color: ${props => props.primary ? 'white' : '#3f51b5'};
  border: 1px solid #3f51b5;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.primary ? '#303f9f' : '#f0f0f0'};
  }
  
  &:disabled {
    background-color: #e0e0e0;
    color: #9e9e9e;
    border-color: #e0e0e0;
    cursor: not-allowed;
  }
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 20px;
`;

const Tab = styled.div`
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

const ElementsContainer = styled.div`
  margin-bottom: 20px;
`;

const ElementItem = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  margin-bottom: 16px;
  overflow: hidden;
`;

const ElementHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #e0e0e0;
`;

const ElementTitle = styled.div`
  font-weight: 500;
`;

const ElementCategory = styled.div`
  font-size: 12px;
  color: white;
  background-color: #3f51b5;
  padding: 4px 8px;
  border-radius: 4px;
`;

const ElementBody = styled.div`
  padding: 16px;
`;

const ElementDescription = styled.div`
  margin-bottom: 16px;
  color: #666;
`;

const GroupsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
`;

const GroupCheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background-color: #f5f5f5;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #e0e0e0;
  }
`;

const GroupCheckbox = styled.input`
  margin-right: 8px;
`;

const SearchContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #3f51b5;
  }
`;

const FilterSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #3f51b5;
  }
`;

/**
 * ViewCustomizationAdmin component for admin dashboard view customization
 * @returns {JSX.Element} ViewCustomizationAdmin component
 */
const ViewCustomizationAdmin = () => {
  // Stan dla elementów dashboardu
  const [elements, setElements] = useState([]);
  
  // Stan dla grup użytkowników
  const [groups, setGroups] = useState([]);
  
  // Stan dla uprawnień elementów
  const [permissions, setPermissions] = useState([]);
  
  // Stan dla filtrowania
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  // Stan dla aktywnej zakładki
  const [activeTab, setActiveTab] = useState('elements');
  
  // Stany ładowania i komunikatów
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  // Pobieranie danych przy montowaniu komponentu
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Pobieranie elementów dashboardu
        const elementsResponse = await viewCustomizationService.getDashboardElements();
        setElements(elementsResponse.elements);
        
        // Pobieranie grup użytkowników
        const groupsResponse = await viewCustomizationService.getUserGroups();
        setGroups(groupsResponse.groups);
        
        // Pobieranie uprawnień elementów
        const permissionsResponse = await viewCustomizationService.getElementPermissions();
        setPermissions(permissionsResponse.permissions);
      } catch (err) {
        console.error('Error fetching customization data:', err);
        setError('Nie udało się pobrać danych personalizacji. Spróbuj odświeżyć stronę.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Obsługa zmiany uprawnień elementu
  const handlePermissionChange = async (elementId, groupId, checked) => {
    // Znajdź aktualne uprawnienia dla elementu
    const elementPermission = permissions.find(p => p.elementId === elementId);
    
    if (!elementPermission) {
      return;
    }
    
    // Utwórz nową listę grup
    let newGroupIds = [...elementPermission.groupIds];
    
    if (checked && !newGroupIds.includes(groupId)) {
      newGroupIds.push(groupId);
    } else if (!checked && newGroupIds.includes(groupId)) {
      newGroupIds = newGroupIds.filter(id => id !== groupId);
    } else {
      return; // Brak zmian
    }
    
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);
    
    try {
      const updateData = {
        elementId,
        groupIds: newGroupIds
      };
      
      await viewCustomizationService.updateElementPermissions(elementId, updateData);
      
      // Aktualizacja lokalnego stanu
      setPermissions(prev => prev.map(p => 
        p.elementId === elementId 
          ? { ...p, groupIds: newGroupIds } 
          : p
      ));
      
      setSuccess('Uprawnienia zostały zaktualizowane.');
      
      // Ukryj komunikat po 3 sekundach
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (err) {
      console.error('Error updating permissions:', err);
      setError('Nie udało się zaktualizować uprawnień. Spróbuj ponownie.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Obsługa zmiany wyszukiwania
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  // Obsługa zmiany filtra kategorii
  const handleCategoryFilterChange = (e) => {
    setCategoryFilter(e.target.value);
  };
  
  // Filtrowanie elementów
  const filteredElements = elements.filter(element => {
    const matchesSearch = element.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         element.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || element.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });
  
  // Unikalne kategorie dla filtra
  const categories = Array.from(new Set(elements.map(element => element.category)));
  
  // Renderowanie elementów dashboardu
  const renderElements = () => {
    if (filteredElements.length === 0) {
      return (
        <div style={{ padding: '16px', textAlign: 'center', color: '#666' }}>
          Nie znaleziono elementów spełniających kryteria wyszukiwania.
        </div>
      );
    }
    
    return (
      <ElementsContainer>
        {filteredElements.map(element => {
          const elementPermission = permissions.find(p => p.elementId === element.id);
          const groupIds = elementPermission ? elementPermission.groupIds : [];
          
          return (
            <ElementItem key={element.id}>
              <ElementHeader>
                <ElementTitle>{element.name}</ElementTitle>
                <ElementCategory>{element.category}</ElementCategory>
              </ElementHeader>
              
              <ElementBody>
                <ElementDescription>{element.description}</ElementDescription>
                
                <div style={{ marginBottom: '8px', fontWeight: 500 }}>Dostępne dla grup:</div>
                
                <GroupsContainer>
                  {groups.map(group => (
                    <GroupCheckboxLabel key={group.id}>
                      <GroupCheckbox 
                        type="checkbox" 
                        checked={groupIds.includes(group.id)}
                        onChange={(e) => handlePermissionChange(element.id, group.id, e.target.checked)}
                        disabled={isSubmitting}
                      />
                      {group.name}
                    </GroupCheckboxLabel>
                  ))}
                </GroupsContainer>
              </ElementBody>
            </ElementItem>
          );
        })}
      </ElementsContainer>
    );
  };
  
  // Renderowanie grup użytkowników
  const renderGroups = () => {
    if (groups.length === 0) {
      return (
        <div style={{ padding: '16px', textAlign: 'center', color: '#666' }}>
          Brak zdefiniowanych grup użytkowników.
        </div>
      );
    }
    
    return (
      <div>
        {groups.map(group => (
          <div key={group.id} style={{ marginBottom: '20px', padding: '16px', border: '1px solid #e0e0e0', borderRadius: '4px' }}>
            <h3 style={{ margin: '0 0 8px 0' }}>{group.name}</h3>
            <p style={{ color: '#666', marginBottom: '16px' }}>{group.description}</p>
            
            <div style={{ marginBottom: '8px', fontWeight: 500 }}>Uprawnienia:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {group.permissions.map((permission, index) => (
                <div key={index} style={{ 
                  padding: '4px 8px', 
                  backgroundColor: '#e8eaf6', 
                  borderRadius: '4px',
                  fontSize: '12px'
                }}>
                  {permission}
                </div>
              ))}
            </div>
            
            <div style={{ marginTop: '16px', marginBottom: '8px', fontWeight: 500 }}>Dostępne elementy:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {permissions
                .filter(permission => permission.groupIds.includes(group.id))
                .map(permission => {
                  const element = elements.find(e => e.id === permission.elementId);
                  return element ? (
                    <div key={element.id} style={{ 
                      padding: '4px 8px', 
                      backgroundColor: '#e8eaf6', 
                      borderRadius: '4px',
                      fontSize: '12px'
                    }}>
                      {element.name}
                    </div>
                  ) : null;
                })}
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  if (isLoading) {
    return (
      <PageContainer>
        <LoadingIndicator>Ładowanie danych personalizacji...</LoadingIndicator>
      </PageContainer>
    );
  }
  
  return (
    <PageContainer>
      <SectionTitle>ZARZĄDZANIE PERSONALIZACJĄ</SectionTitle>
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>{success}</SuccessMessage>}
      
      <TabsContainer>
        <Tab 
          active={activeTab === 'elements'} 
          onClick={() => setActiveTab('elements')}
        >
          Elementy dashboardu
        </Tab>
        <Tab 
          active={activeTab === 'groups'} 
          onClick={() => setActiveTab('groups')}
        >
          Grupy użytkowników
        </Tab>
      </TabsContainer>
      
      {activeTab === 'elements' && (
        <>
          <SearchContainer>
            <SearchInput 
              type="text" 
              placeholder="Szukaj elementów..." 
              value={searchTerm}
              onChange={handleSearchChange}
            />
            
            <FilterSelect 
              value={categoryFilter}
              onChange={handleCategoryFilterChange}
            >
              <option value="all">Wszystkie kategorie</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </FilterSelect>
          </SearchContainer>
          
          <Card title="Elementy dashboardu" fullWidth>
            {renderElements()}
          </Card>
        </>
      )}
      
      {activeTab === 'groups' && (
        <Card title="Grupy użytkowników" fullWidth>
          {renderGroups()}
        </Card>
      )}
    </PageContainer>
  );
};

export default ViewCustomizationAdmin;
