import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Card from '../components/common/Card';
import Table from '../components/common/Table';

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

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin: 20px 0;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;
`;

const Checkbox = styled.input`
  margin-right: 10px;
  cursor: pointer;
`;

const CheckboxLabel = styled.label`
  cursor: pointer;
`;

const ViewCard = styled.div<{ selected?: boolean }>`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin-bottom: 16px;
  border: 2px solid ${props => props.selected ? '#3f51b5' : 'transparent'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

const ViewCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const ViewCardTitle = styled.div`
  font-weight: 500;
  font-size: 16px;
`;

const ViewCardActions = styled.div`
  display: flex;
  gap: 8px;
`;

const ViewCardDescription = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 12px;
`;

const ViewCardTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const ViewCardTag = styled.div`
  background-color: #f0f0f0;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  color: #666;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #3f51b5;
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 14px;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #3f51b5;
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #3f51b5;
  }
`;

const FormOption = styled.option`
  padding: 8px;
`;

const SectionContainer = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const SectionTitle2 = styled.div`
  font-weight: 500;
  font-size: 16px;
`;

const DragHandle = styled.div`
  cursor: move;
  padding: 8px;
  color: #666;
  
  &:hover {
    color: #333;
  }
`;

// Typy danych
interface View {
  id: string;
  name: string;
  description: string;
  isDefault: boolean;
  sections: ViewSection[];
  userGroups: string[];
}

interface ViewSection {
  id: string;
  name: string;
  type: string;
  visible: boolean;
  order: number;
}

interface UserGroup {
  id: string;
  name: string;
}

const ViewCustomizationUser: React.FC = () => {
  const [activeTab, setActiveTab] = useState('myViews');
  const [isLoading, setIsLoading] = useState(true);
  const [views, setViews] = useState<View[]>([]);
  const [selectedView, setSelectedView] = useState<View | null>(null);
  const [editingView, setEditingView] = useState<View | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Symulacja pobierania danych z API
  useEffect(() => {
    const fetchViews = async () => {
      setIsLoading(true);
      try {
        // Symulacja opóźnienia sieciowego
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Dane mockowe
        const mockViews: View[] = [
          {
            id: 'view1',
            name: 'Widok standardowy',
            description: 'Domyślny widok z wszystkimi sekcjami',
            isDefault: true,
            sections: [
              { id: 'section1', name: 'Statystyki KPI', type: 'kpi', visible: true, order: 1 },
              { id: 'section2', name: 'Wykrywanie oszustw', type: 'fraud', visible: true, order: 2 },
              { id: 'section3', name: 'Bezpieczeństwo kierowcy', type: 'safety', visible: true, order: 3 },
              { id: 'section4', name: 'Konserwacja predykcyjna', type: 'maintenance', visible: true, order: 4 },
              { id: 'section5', name: 'Monitoring pojazdów', type: 'monitoring', visible: true, order: 5 }
            ],
            userGroups: ['all']
          },
          {
            id: 'view2',
            name: 'Widok bezpieczeństwa',
            description: 'Widok skupiony na bezpieczeństwie kierowców',
            isDefault: false,
            sections: [
              { id: 'section1', name: 'Statystyki KPI', type: 'kpi', visible: true, order: 1 },
              { id: 'section2', name: 'Wykrywanie oszustw', type: 'fraud', visible: false, order: 2 },
              { id: 'section3', name: 'Bezpieczeństwo kierowcy', type: 'safety', visible: true, order: 2 },
              { id: 'section4', name: 'Konserwacja predykcyjna', type: 'maintenance', visible: false, order: 4 },
              { id: 'section5', name: 'Monitoring pojazdów', type: 'monitoring', visible: true, order: 3 }
            ],
            userGroups: ['managers', 'safety_officers']
          },
          {
            id: 'view3',
            name: 'Widok konserwacji',
            description: 'Widok skupiony na konserwacji pojazdów',
            isDefault: false,
            sections: [
              { id: 'section1', name: 'Statystyki KPI', type: 'kpi', visible: true, order: 1 },
              { id: 'section2', name: 'Wykrywanie oszustw', type: 'fraud', visible: false, order: 2 },
              { id: 'section3', name: 'Bezpieczeństwo kierowcy', type: 'safety', visible: false, order: 3 },
              { id: 'section4', name: 'Konserwacja predykcyjna', type: 'maintenance', visible: true, order: 2 },
              { id: 'section5', name: 'Monitoring pojazdów', type: 'monitoring', visible: true, order: 3 }
            ],
            userGroups: ['managers', 'maintenance_staff']
          }
        ];
        
        setViews(mockViews);
        setSelectedView(mockViews.find(view => view.isDefault) || mockViews[0]);
        setError(null);
      } catch (err) {
        console.error('Error fetching views:', err);
        setError('Nie udało się pobrać widoków. Spróbuj ponownie później.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchViews();
  }, []);

  // Obsługa wyboru widoku
  const handleViewSelect = (view: View) => {
    setSelectedView(view);
  };

  // Obsługa edycji widoku
  const handleEditView = (view: View) => {
    setEditingView({...view, sections: [...view.sections]});
    setIsEditing(true);
    setIsCreating(false);
    setActiveTab('editView');
  };

  // Obsługa tworzenia nowego widoku
  const handleCreateView = () => {
    const newView: View = {
      id: `view${Date.now()}`,
      name: 'Nowy widok',
      description: 'Opis nowego widoku',
      isDefault: false,
      sections: [
        { id: 'section1', name: 'Statystyki KPI', type: 'kpi', visible: true, order: 1 },
        { id: 'section2', name: 'Wykrywanie oszustw', type: 'fraud', visible: true, order: 2 },
        { id: 'section3', name: 'Bezpieczeństwo kierowcy', type: 'safety', visible: true, order: 3 },
        { id: 'section4', name: 'Konserwacja predykcyjna', type: 'maintenance', visible: true, order: 4 },
        { id: 'section5', name: 'Monitoring pojazdów', type: 'monitoring', visible: true, order: 5 }
      ],
      userGroups: []
    };
    
    setEditingView(newView);
    setIsEditing(false);
    setIsCreating(true);
    setActiveTab('editView');
  };

  // Obsługa usuwania widoku
  const handleDeleteView = (viewId: string) => {
    if (window.confirm('Czy na pewno chcesz usunąć ten widok?')) {
      const updatedViews = views.filter(view => view.id !== viewId);
      setViews(updatedViews);
      
      if (selectedView && selectedView.id === viewId) {
        setSelectedView(updatedViews.find(view => view.isDefault) || updatedViews[0]);
      }
    }
  };

  // Obsługa zmiany widoczności sekcji
  const handleSectionVisibilityChange = (sectionId: string, visible: boolean) => {
    if (!editingView) return;
    
    const updatedSections = editingView.sections.map(section => {
      if (section.id === sectionId) {
        return {...section, visible};
      }
      return section;
    });
    
    setEditingView({...editingView, sections: updatedSections});
  };

  // Obsługa zmiany kolejności sekcji
  const handleSectionOrderChange = (sectionId: string, direction: 'up' | 'down') => {
    if (!editingView) return;
    
    const sectionIndex = editingView.sections.findIndex(section => section.id === sectionId);
    if (sectionIndex === -1) return;
    
    const newSections = [...editingView.sections];
    
    if (direction === 'up' && sectionIndex > 0) {
      // Zamiana z sekcją wyżej
      [newSections[sectionIndex], newSections[sectionIndex - 1]] = 
      [newSections[sectionIndex - 1], newSections[sectionIndex]];
    } else if (direction === 'down' && sectionIndex < newSections.length - 1) {
      // Zamiana z sekcją niżej
      [newSections[sectionIndex], newSections[sectionIndex + 1]] = 
      [newSections[sectionIndex + 1], newSections[sectionIndex]];
    }
    
    // Aktualizacja numerów porządkowych
    const updatedSections = newSections.map((section, index) => ({
      ...section,
      order: index + 1
    }));
    
    setEditingView({...editingView, sections: updatedSections});
  };

  // Obsługa zapisu widoku
  const handleSaveView = () => {
    if (!editingView) return;
    
    if (isCreating) {
      // Dodanie nowego widoku
      setViews([...views, editingView]);
    } else if (isEditing) {
      // Aktualizacja istniejącego widoku
      const updatedViews = views.map(view => 
        view.id === editingView.id ? editingView : view
      );
      setViews(updatedViews);
      setSelectedView(editingView);
    }
    
    setIsEditing(false);
    setIsCreating(false);
    setEditingView(null);
    setActiveTab('myViews');
  };

  // Obsługa anulowania edycji
  const handleCancelEdit = () => {
    setIsEditing(false);
    setIsCreating(false);
    setEditingView(null);
    setActiveTab('myViews');
  };

  // Obsługa zmiany pól formularza
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!editingView) return;
    
    const { name, value } = e.target;
    setEditingView({...editingView, [name]: value});
  };

  // Renderowanie listy widoków
  const renderViewsList = () => {
    return (
      <div>
        <ButtonGroup>
          <Button primary onClick={handleCreateView}>Utwórz nowy widok</Button>
        </ButtonGroup>
        
        {views.map(view => (
          <ViewCard 
            key={view.id} 
            selected={selectedView?.id === view.id}
            onClick={() => handleViewSelect(view)}
          >
            <ViewCardHeader>
              <ViewCardTitle>{view.name}</ViewCardTitle>
              <ViewCardActions>
                <Button onClick={(e) => { e.stopPropagation(); handleEditView(view); }}>
                  Edytuj
                </Button>
                {!view.isDefault && (
                  <Button onClick={(e) => { e.stopPropagation(); handleDeleteView(view.id); }}>
                    Usuń
                  </Button>
                )}
              </ViewCardActions>
            </ViewCardHeader>
            <ViewCardDescription>{view.description}</ViewCardDescription>
            <ViewCardTags>
              {view.isDefault && <ViewCardTag>Domyślny</ViewCardTag>}
              <ViewCardTag>{view.sections.filter(s => s.visible).length} sekcji</ViewCardTag>
              {view.userGroups.includes('all') ? (
                <ViewCardTag>Wszyscy użytkownicy</ViewCardTag>
              ) : (
                view.userGroups.map(group => (
                  <ViewCardTag key={group}>{group}</ViewCardTag>
                ))
              )}
            </ViewCardTags>
          </ViewCard>
        ))}
      </div>
    );
  };

  // Renderowanie formularza edycji widoku
  const renderEditView = () => {
    if (!editingView) return null;
    
    return (
      <div>
        <FormGroup>
          <FormLabel>Nazwa widoku</FormLabel>
          <FormInput 
            type="text" 
            name="name" 
            value={editingView.name} 
            onChange={handleInputChange} 
          />
        </FormGroup>
        
        <FormGroup>
          <FormLabel>Opis</FormLabel>
          <FormTextarea 
            name="description" 
            value={editingView.description} 
            onChange={handleInputChange} 
          />
        </FormGroup>
        
        <FormGroup>
          <FormLabel>Widoczne sekcje</FormLabel>
          {editingView.sections
            .sort((a, b) => a.order - b.order)
            .map(section => (
              <SectionContainer key={section.id}>
                <SectionHeader>
                  <SectionTitle2>{section.name}</SectionTitle2>
                  <div>
                    <Button onClick={() => handleSectionOrderChange(section.id, 'up')}>↑</Button>
                    <Button onClick={() => handleSectionOrderChange(section.id, 'down')}>↓</Button>
                  </div>
                </SectionHeader>
                <CheckboxContainer>
                  <Checkbox 
                    type="checkbox" 
                    id={`visible-${section.id}`} 
                    checked={section.visible} 
                    onChange={(e) => handleSectionVisibilityChange(section.id, e.target.checked)} 
                  />
                  <CheckboxLabel htmlFor={`visible-${section.id}`}>
                    Widoczna
                  </CheckboxLabel>
                </CheckboxContainer>
              </SectionContainer>
            ))}
        </FormGroup>
        
        <ButtonGroup>
          <Button primary onClick={handleSaveView}>Zapisz widok</Button>
          <Button onClick={handleCancelEdit}>Anuluj</Button>
        </ButtonGroup>
      </div>
    );
  };

  // Renderowanie podglądu widoku
  const renderViewPreview = () => {
    if (!selectedView) return null;
    
    return (
      <div>
        <SectionTitle>{selectedView.name}</SectionTitle>
        <p>{selectedView.description}</p>
        
        <SectionTitle>Widoczne sekcje:</SectionTitle>
        {selectedView.sections
          .filter(section => section.visible)
          .sort((a, b) => a.order - b.order)
          .map(section => (
            <Card key={section.id} title={section.name}>
              <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
                Podgląd sekcji {section.name}
              </div>
            </Card>
          ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <PageContainer>
        <LoadingIndicator>Ładowanie widoków...</LoadingIndicator>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <Card fullWidth>
          <div style={{ color: 'red', padding: '20px', textAlign: 'center' }}>
            {error}
          </div>
        </Card>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <SectionTitle>PERSONALIZACJA WIDOKÓW</SectionTitle>
      
      <TabsContainer>
        <Tab 
          active={activeTab === 'myViews'} 
          onClick={() => setActiveTab('myViews')}
        >
          Moje widoki
        </Tab>
        <Tab 
          active={activeTab === 'editView'} 
          onClick={() => editingView && setActiveTab('editView')}
        >
          {isCreating ? 'Nowy widok' : isEditing ? 'Edycja widoku' : 'Edycja'}
        </Tab>
        <Tab 
          active={activeTab === 'preview'} 
          onClick={() => setActiveTab('preview')}
        >
          Podgląd
        </Tab>
      </TabsContainer>
      
      {activeTab === 'myViews' && renderViewsList()}
      {activeTab === 'editView' && renderEditView()}
      {activeTab === 'preview' && renderViewPreview()}
    </PageContainer>
  );
};

export default ViewCustomizationUser;
