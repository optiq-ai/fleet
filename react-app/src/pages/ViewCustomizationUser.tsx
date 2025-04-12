import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import Card from '../components/common/Card';
import viewCustomizationService, {
  DashboardElement,
  UserView,
  CreateViewRequest,
  UpdateViewRequest
} from '../services/api/viewCustomizationService';
import { ViewCustomizationContext } from '../context/ViewCustomizationContext';

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

const Button = styled.button<{ primary?: boolean }>`
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

const Input = styled.input`
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 14px;
  width: 100%;
  margin-bottom: 16px;
  
  &:focus {
    outline: none;
    border-color: #3f51b5;
  }
`;

const ElementsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
`;

const ElementItem = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: center;
  padding: 12px;
  border: 1px solid ${props => props.selected ? '#3f51b5' : '#e0e0e0'};
  border-radius: 4px;
  background-color: ${props => props.selected ? '#e8eaf6' : 'white'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.selected ? '#e8eaf6' : '#f5f5f5'};
  }
`;

const ElementCheckbox = styled.input`
  margin-right: 12px;
`;

const ElementInfo = styled.div`
  flex: 1;
`;

const ElementTitle = styled.div`
  font-weight: 500;
  margin-bottom: 4px;
`;

const ElementDescription = styled.div`
  font-size: 12px;
  color: #666;
`;

const ElementCategory = styled.div`
  font-size: 12px;
  color: white;
  background-color: #3f51b5;
  padding: 4px 8px;
  border-radius: 4px;
  margin-left: 8px;
`;

const ViewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
`;

const ViewItem = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  padding: 12px;
  border: 1px solid ${props => props.active ? '#3f51b5' : '#e0e0e0'};
  border-radius: 4px;
  background-color: ${props => props.active ? '#e8eaf6' : 'white'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.active ? '#e8eaf6' : '#f5f5f5'};
  }
`;

const ViewInfo = styled.div`
  flex: 1;
`;

const ViewTitle = styled.div`
  font-weight: 500;
`;

const ViewDefault = styled.div`
  font-size: 12px;
  color: white;
  background-color: #4caf50;
  padding: 4px 8px;
  border-radius: 4px;
  margin-left: 8px;
`;

const ViewActions = styled.div`
  display: flex;
  gap: 8px;
`;

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
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  font-weight: 500;
  margin-bottom: 8px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 20px;
`;

const ViewCustomizationUser: React.FC = () => {
  // Kontekst personalizacji widoków
  const { currentView, setCurrentView } = useContext(ViewCustomizationContext);
  
  // Stan dla elementów dashboardu
  const [elements, setElements] = useState<DashboardElement[]>([]);
  
  // Stan dla widoków użytkownika
  const [userViews, setUserViews] = useState<UserView[]>([]);
  
  // Stan dla aktywnego widoku
  const [activeView, setActiveView] = useState<UserView | null>(null);
  
  // Stan dla nowego widoku
  const [newView, setNewView] = useState<{
    name: string;
    elements: string[];
  }>({
    name: '',
    elements: []
  });
  
  // Stan dla edycji widoku
  const [editMode, setEditMode] = useState<boolean>(false);
  
  // Stan dla aktywnej zakładki
  const [activeTab, setActiveTab] = useState<string>('myViews');
  
  // Stany ładowania i komunikatów
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // ID użytkownika (w rzeczywistej aplikacji pobierane z kontekstu autoryzacji)
  const userId = "current-user-id";
  
  // Pobieranie danych przy montowaniu komponentu
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Pobieranie elementów dashboardu
        const elementsResponse = await viewCustomizationService.getDashboardElements();
        setElements(elementsResponse.elements);
        
        // Pobieranie widoków użytkownika
        const viewsResponse = await viewCustomizationService.getUserViews(userId);
        setUserViews(viewsResponse.views);
        
        // Ustawienie domyślnego widoku jako aktywnego
        const defaultView = viewsResponse.views.find(view => view.isDefault);
        if (defaultView) {
          setActiveView(defaultView);
          setCurrentView(defaultView);
        } else if (viewsResponse.views.length > 0) {
          setActiveView(viewsResponse.views[0]);
          setCurrentView(viewsResponse.views[0]);
        }
      } catch (err) {
        console.error('Error fetching customization data:', err);
        setError('Nie udało się pobrać danych personalizacji. Spróbuj odświeżyć stronę.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [setCurrentView]);
  
  // Obsługa zmiany aktywnego widoku
  const handleViewSelect = (view: UserView) => {
    setActiveView(view);
    setCurrentView(view);
    
    // Resetowanie stanu edycji
    setEditMode(false);
    setNewView({
      name: '',
      elements: []
    });
  };
  
  // Obsługa przejścia do trybu edycji
  const handleEditView = (view: UserView) => {
    setEditMode(true);
    setActiveTab('editView');
    setNewView({
      name: view.name,
      elements: [...view.elements]
    });
  };
  
  // Obsługa usuwania widoku
  const handleDeleteView = async (viewId: string) => {
    if (!window.confirm('Czy na pewno chcesz usunąć ten widok?')) {
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);
    
    try {
      await viewCustomizationService.deleteUserView(viewId);
      
      // Odświeżenie listy widoków
      const viewsResponse = await viewCustomizationService.getUserViews(userId);
      setUserViews(viewsResponse.views);
      
      // Jeśli usunięto aktywny widok, wybierz inny
      if (activeView && activeView.id === viewId) {
        const defaultView = viewsResponse.views.find(view => view.isDefault);
        if (defaultView) {
          setActiveView(defaultView);
          setCurrentView(defaultView);
        } else if (viewsResponse.views.length > 0) {
          setActiveView(viewsResponse.views[0]);
          setCurrentView(viewsResponse.views[0]);
        } else {
          setActiveView(null);
          setCurrentView(null);
        }
      }
      
      setSuccess('Widok został pomyślnie usunięty.');
    } catch (err) {
      console.error('Error deleting view:', err);
      setError('Nie udało się usunąć widoku. Spróbuj ponownie.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Obsługa ustawiania widoku jako domyślnego
  const handleSetDefaultView = async (viewId: string) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);
    
    try {
      // Aktualizacja widoku
      const updateData: UpdateViewRequest = {
        isDefault: true
      };
      
      await viewCustomizationService.updateUserView(viewId, updateData);
      
      // Odświeżenie listy widoków
      const viewsResponse = await viewCustomizationService.getUserViews(userId);
      setUserViews(viewsResponse.views);
      
      // Aktualizacja aktywnego widoku
      const updatedView = viewsResponse.views.find(view => view.id === viewId);
      if (updatedView) {
        setActiveView(updatedView);
        setCurrentView(updatedView);
      }
      
      setSuccess('Widok został ustawiony jako domyślny.');
    } catch (err) {
      console.error('Error setting default view:', err);
      setError('Nie udało się ustawić widoku jako domyślnego. Spróbuj ponownie.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Obsługa zmiany zaznaczenia elementu
  const handleElementToggle = (elementId: string) => {
    setNewView(prev => {
      const elements = [...prev.elements];
      
      if (elements.includes(elementId)) {
        return {
          ...prev,
          elements: elements.filter(id => id !== elementId)
        };
      } else {
        return {
          ...prev,
          elements: [...elements, elementId]
        };
      }
    });
  };
  
  // Obsługa zmiany nazwy widoku
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewView(prev => ({
      ...prev,
      name: e.target.value
    }));
  };
  
  // Obsługa tworzenia nowego widoku
  const handleCreateView = async () => {
    if (!newView.name.trim()) {
      setError('Nazwa widoku jest wymagana.');
      return;
    }
    
    if (newView.elements.length === 0) {
      setError('Wybierz co najmniej jeden element do wyświetlenia.');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);
    
    try {
      const createData: CreateViewRequest = {
        name: newView.name,
        elements: newView.elements,
        userId: userId
      };
      
      const createdView = await viewCustomizationService.createUserView(userId, createData);
      
      // Odświeżenie listy widoków
      const viewsResponse = await viewCustomizationService.getUserViews(userId);
      setUserViews(viewsResponse.views);
      
      // Ustawienie nowego widoku jako aktywnego
      setActiveView(createdView);
      setCurrentView(createdView);
      
      // Resetowanie formularza
      setNewView({
        name: '',
        elements: []
      });
      
      // Przejście do zakładki z widokami
      setActiveTab('myViews');
      
      setSuccess('Nowy widok został pomyślnie utworzony.');
    } catch (err) {
      console.error('Error creating view:', err);
      setError('Nie udało się utworzyć widoku. Spróbuj ponownie.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Obsługa aktualizacji widoku
  const handleUpdateView = async () => {
    if (!activeView) {
      return;
    }
    
    if (!newView.name.trim()) {
      setError('Nazwa widoku jest wymagana.');
      return;
    }
    
    if (newView.elements.length === 0) {
      setError('Wybierz co najmniej jeden element do wyświetlenia.');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);
    
    try {
      const updateData: UpdateViewRequest = {
        name: newView.name,
        elements: newView.elements
      };
      
      const updatedView = await viewCustomizationService.updateUserView(activeView.id, updateData);
      
      // Odświeżenie listy widoków
      const viewsResponse = await viewCustomizationService.getUserViews(userId);
      setUserViews(viewsResponse.views);
      
      // Aktualizacja aktywnego widoku
      setActiveView(updatedView);
      setCurrentView(updatedView);
      
      // Resetowanie trybu edycji
      setEditMode(false);
      setNewView({
        name: '',
        elements: []
      });
      
      // Przejście do zakładki z widokami
      setActiveTab('myViews');
      
      setSuccess('Widok został pomyślnie zaktualizowany.');
    } catch (err) {
      console.error('Error updating view:', err);
      setError('Nie udało się zaktualizować widoku. Spróbuj ponownie.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Obsługa anulowania edycji
  const handleCancelEdit = () => {
    setEditMode(false);
    setNewView({
      name: '',
      elements: []
    });
    setActiveTab('myViews');
  };
  
  // Renderowanie listy widoków
  const renderViews = () => {
    if (userViews.length === 0) {
      return (
        <div style={{ padding: '16px', textAlign: 'center', color: '#666' }}>
          Nie masz jeszcze żadnych widoków. Utwórz swój pierwszy widok.
        </div>
      );
    }
    
    return (
      <ViewsContainer>
        {userViews.map(view => (
          <ViewItem 
            key={view.id} 
            active={activeView?.id === view.id}
            onClick={() => handleViewSelect(view)}
          >
            <ViewInfo>
              <ViewTitle>{view.name}</ViewTitle>
              {view.isDefault && <ViewDefault>Domyślny</ViewDefault>}
            </ViewInfo>
            
            <ViewActions>
              {!view.isDefault && (
                <Button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSetDefaultView(view.id);
                  }}
                  disabled={isSubmitting}
                >
                  Ustaw jako domyślny
                </Button>
              )}
              
              <Button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditView(view);
                }}
                disabled={isSubmitting}
              >
                Edytuj
              </Button>
              
              {userViews.length > 1 && (
                <Button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteView(view.id);
                  }}
                  disabled={isSubmitting}
                >
                  Usuń
                </Button>
              )}
            </ViewActions>
          </ViewItem>
        ))}
      </ViewsContainer>
    );
  };
  
  // Renderowanie formularza tworzenia/edycji widoku
  const renderViewForm = () => {
    return (
      <>
        <FormGroup>
          <Label htmlFor="viewName">Nazwa widoku</Label>
          <Input 
            type="text" 
            id="viewName" 
            value={newView.name} 
            onChange={handleNameChange}
            placeholder="Wprowadź nazwę widoku"
          />
        </FormGroup>
        
        <FormGroup>
          <Label>Wybierz elementy do wyświetlenia</Label>
          <ElementsContainer>
            {elements.map(element => (
              <ElementItem 
                key={element.id} 
                selected={newView.elements.includes(element.id)}
                onClick={() => handleElementToggle(element.id)}
              >
                <ElementCheckbox 
                  type="checkbox" 
                  checked={newView.elements.includes(element.id)}
                  onChange={() => {}}
                  onClick={(e) => e.stopPropagation()}
                />
                
                <ElementInfo>
                  <ElementTitle>{element.name}</ElementTitle>
                  <ElementDescription>{element.description}</ElementDescription>
                </ElementInfo>
                
                <ElementCategory>{element.category}</ElementCategory>
              </ElementItem>
            ))}
          </ElementsContainer>
        </FormGroup>
        
        <ButtonGroup>
          {editMode ? (
            <>
              <Button 
                primary 
                onClick={handleUpdateView}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Aktualizowanie...' : 'Aktualizuj widok'}
              </Button>
              
              <Button 
                onClick={handleCancelEdit}
                disabled={isSubmitting}
              >
                Anuluj
              </Button>
            </>
          ) : (
            <>
              <Button 
                primary 
                onClick={handleCreateView}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Tworzenie...' : 'Utwórz widok'}
              </Button>
              
              <Button 
                onClick={() => setActiveTab('myViews')}
                disabled={isSubmitting}
              >
                Anuluj
              </Button>
            </>
          )}
        </ButtonGroup>
      </>
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
      <SectionTitle>PERSONALIZACJA WIDOKÓW</SectionTitle>
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>{success}</SuccessMessage>}
      
      <TabsContainer>
        <Tab 
          active={activeTab === 'myViews'} 
          onClick={() => setActiveTab('myViews')}
        >
          Moje widoki
        </Tab>
        <Tab 
          active={activeTab === 'createView'} 
          onClick={() => {
            setEditMode(false);
            setNewView({
              name: '',
              elements: []
            });
            setActiveTab('createView');
          }}
        >
          Utwórz nowy widok
        </Tab>
        {editMode && (
          <Tab 
            active={activeTab === 'editView'} 
            onClick={() => setActiveTab('editView')}
          >
            Edytuj widok
          </Tab>
        )}
      </TabsContainer>
      
      {activeTab === 'myViews' && (
        <Card title="Moje widoki" fullWidth>
          {renderViews()}
        </Card>
      )}
      
      {(activeTab === 'createView' || activeTab === 'editView') && (
        <Card title={editMode ? 'Edytuj widok' : 'Utwórz nowy widok'} fullWidth>
          {renderViewForm()}
        </Card>
      )}
    </PageContainer>
  );
};

export default ViewCustomizationUser;
