import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface AdvancedDashboardProps {
  onSaveDashboard: (dashboard: any) => Promise<void>;
  onExportDashboard: (dashboardId: string, format: string) => Promise<void>;
  availableWidgets: any[];
  availableDataSources: any[];
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

const WidgetsList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const WidgetItem = styled.div<{ selected: boolean }>`
  padding: 16px;
  border: 1px solid ${props => props.selected ? '#3f51b5' : '#ddd'};
  border-radius: 4px;
  cursor: pointer;
  background-color: ${props => props.selected ? '#e8eaf6' : 'white'};
  
  &:hover {
    border-color: #3f51b5;
    background-color: #f5f5f5;
  }
`;

const WidgetIcon = styled.div`
  font-size: 24px;
  margin-bottom: 8px;
  text-align: center;
`;

const WidgetTitle = styled.div`
  font-weight: 500;
  margin-bottom: 4px;
  text-align: center;
`;

const WidgetDescription = styled.div`
  font-size: 12px;
  color: #666;
  text-align: center;
`;

const DashboardPreview = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 200px);
  gap: 16px;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const WidgetPreview = styled.div<{ size: 'small' | 'medium' | 'large' }>`
  background-color: #f5f5f5;
  border-radius: 4px;
  padding: 16px;
  grid-column: span ${props => 
    props.size === 'small' ? 1 : 
    props.size === 'medium' ? 2 : 
    4
  };
  display: flex;
  flex-direction: column;
  position: relative;
`;

const WidgetPreviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const WidgetPreviewTitle = styled.div`
  font-weight: 500;
`;

const WidgetPreviewContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
`;

const WidgetPreviewActions = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  gap: 4px;
`;

const WidgetPreviewAction = styled.button`
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  font-size: 16px;
  
  &:hover {
    color: #3f51b5;
  }
`;

const SavedDashboardsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SavedDashboardItem = styled.div`
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
`;

const SavedDashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const SavedDashboardTitle = styled.div`
  font-weight: 500;
`;

const SavedDashboardDate = styled.div`
  font-size: 12px;
  color: #666;
`;

const SavedDashboardDescription = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
`;

const SavedDashboardActions = styled.div`
  display: flex;
  gap: 10px;
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

const ExportFormatContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const ExportFormatButton = styled.button<{ selected: boolean }>`
  padding: 8px 16px;
  background-color: ${props => props.selected ? '#3f51b5' : 'white'};
  color: ${props => props.selected ? 'white' : '#3f51b5'};
  border: 1px solid #3f51b5;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.selected ? '#303f9f' : '#e8eaf6'};
  }
`;

const AdvancedDashboard: React.FC<AdvancedDashboardProps> = ({
  onSaveDashboard,
  onExportDashboard,
  availableWidgets,
  availableDataSources
}) => {
  const [activeTab, setActiveTab] = useState<'create' | 'saved'>('create');
  const [dashboardName, setDashboardName] = useState<string>('');
  const [dashboardDescription, setDashboardDescription] = useState<string>('');
  const [selectedWidgets, setSelectedWidgets] = useState<any[]>([]);
  const [dashboardLayout, setDashboardLayout] = useState<any[]>([]);
  const [savedDashboards, setSavedDashboards] = useState<any[]>([]);
  const [exportFormat, setExportFormat] = useState<string>('pdf');
  
  // Przykładowe dane
  useEffect(() => {
    // Symulacja pobrania zapisanych dashboardów
    const sampleSavedDashboards = [
      {
        id: 'dashboard1',
        name: 'Przegląd floty',
        description: 'Dashboard z ogólnym przeglądem stanu floty',
        widgets: [
          { id: 'widget1', type: 'kpi', title: 'Liczba pojazdów', size: 'small' },
          { id: 'widget2', type: 'chart', title: 'Zużycie paliwa', size: 'medium' },
          { id: 'widget3', type: 'map', title: 'Lokalizacja pojazdów', size: 'large' },
          { id: 'widget4', type: 'table', title: 'Ostatnie zdarzenia', size: 'medium' }
        ],
        createdAt: '2025-04-10T10:30:00Z',
        lastModified: '2025-04-11T08:00:00Z'
      },
      {
        id: 'dashboard2',
        name: 'Analiza bezpieczeństwa',
        description: 'Dashboard z analizą wskaźników bezpieczeństwa kierowców',
        widgets: [
          { id: 'widget5', type: 'kpi', title: 'Wynik bezpieczeństwa', size: 'small' },
          { id: 'widget6', type: 'chart', title: 'Zdarzenia bezpieczeństwa', size: 'medium' },
          { id: 'widget7', type: 'table', title: 'Ranking kierowców', size: 'medium' },
          { id: 'widget8', type: 'heatmap', title: 'Mapa zdarzeń', size: 'large' }
        ],
        createdAt: '2025-04-05T14:15:00Z',
        lastModified: '2025-04-12T07:30:00Z'
      }
    ];
    
    setSavedDashboards(sampleSavedDashboards);
  }, []);
  
  // Obsługa wyboru widgetu
  const handleWidgetSelect = (widget: any) => {
    if (selectedWidgets.find(w => w.id === widget.id)) {
      // Jeśli widget jest już wybrany, usuń go
      setSelectedWidgets(selectedWidgets.filter(w => w.id !== widget.id));
      setDashboardLayout(dashboardLayout.filter(w => w.id !== widget.id));
    } else {
      // W przeciwnym razie dodaj go
      const newWidget = {
        ...widget,
        instanceId: `${widget.id}-${Date.now()}`,
        title: widget.defaultTitle || widget.name,
        size: widget.defaultSize || 'medium',
        dataSource: widget.defaultDataSource || null
      };
      
      setSelectedWidgets([...selectedWidgets, widget]);
      setDashboardLayout([...dashboardLayout, newWidget]);
    }
  };
  
  // Obsługa usuwania widgetu z layoutu
  const handleRemoveWidget = (instanceId: string) => {
    const widget = dashboardLayout.find(w => w.instanceId === instanceId);
    
    if (widget) {
      setDashboardLayout(dashboardLayout.filter(w => w.instanceId !== instanceId));
      
      // Jeśli to ostatnia instancja tego typu widgetu, usuń go również z wybranych widgetów
      const otherInstances = dashboardLayout.filter(w => w.id === widget.id && w.instanceId !== instanceId);
      
      if (otherInstances.length === 0) {
        setSelectedWidgets(selectedWidgets.filter(w => w.id !== widget.id));
      }
    }
  };
  
  // Obsługa zmiany rozmiaru widgetu
  const handleResizeWidget = (instanceId: string) => {
    setDashboardLayout(dashboardLayout.map(widget => {
      if (widget.instanceId === instanceId) {
        const newSize = widget.size === 'small' ? 'medium' :
                        widget.size === 'medium' ? 'large' :
                        'small';
        
        return { ...widget, size: newSize };
      }
      
      return widget;
    }));
  };
  
  // Obsługa zmiany tytułu widgetu
  const handleChangeWidgetTitle = (instanceId: string, title: string) => {
    setDashboardLayout(dashboardLayout.map(widget => {
      if (widget.instanceId === instanceId) {
        return { ...widget, title };
      }
      
      return widget;
    }));
  };
  
  // Obsługa zmiany źródła danych widgetu
  const handleChangeWidgetDataSource = (instanceId: string, dataSourceId: string) => {
    setDashboardLayout(dashboardLayout.map(widget => {
      if (widget.instanceId === instanceId) {
        return { ...widget, dataSource: dataSourceId };
      }
      
      return widget;
    }));
  };
  
  // Obsługa zapisywania dashboardu
  const handleSaveDashboard = async () => {
    if (!dashboardName || dashboardLayout.length === 0) {
      alert('Proszę wypełnić wszystkie wymagane pola');
      return;
    }
    
    const dashboard = {
      name: dashboardName,
      description: dashboardDescription,
      widgets: dashboardLayout,
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString()
    };
    
    try {
      await onSaveDashboard(dashboard);
      
      // Dodaj dashboard do listy zapisanych dashboardów
      const newDashboard = {
        id: `dashboard${Date.now()}`,
        ...dashboard
      };
      
      setSavedDashboards([newDashboard, ...savedDashboards]);
      
      // Resetuj formularz
      setDashboardName('');
      setDashboardDescription('');
      setSelectedWidgets([]);
      setDashboardLayout([]);
      
      // Przełącz na zakładkę zapisanych dashboardów
      setActiveTab('saved');
    } catch (error) {
      console.error('Error saving dashboard:', error);
      alert('Wystąpił błąd podczas zapisywania dashboardu');
    }
  };
  
  // Obsługa eksportu dashboardu
  const handleExportDashboard = async (dashboardId: string) => {
    try {
      await onExportDashboard(dashboardId, exportFormat);
      alert(`Dashboard został wyeksportowany do formatu ${exportFormat.toUpperCase()}`);
    } catch (error) {
      console.error('Error exporting dashboard:', error);
      alert('Wystąpił błąd podczas eksportowania dashboardu');
    }
  };
  
  // Obsługa edycji dashboardu
  const handleEditDashboard = (dashboardId: string) => {
    const dashboard = savedDashboards.find(d => d.id === dashboardId);
    
    if (dashboard) {
      setDashboardName(dashboard.name);
      setDashboardDescription(dashboard.description);
      
      // Odtwórz wybrane widgety i layout
      const uniqueWidgetTypes = new Set();
      dashboard.widgets.forEach((widget: any) => uniqueWidgetTypes.add(widget.type));
      
      const selectedWidgetsFromTypes = availableWidgets.filter(widget => 
        uniqueWidgetTypes.has(widget.type)
      );
      
      setSelectedWidgets(selectedWidgetsFromTypes);
      setDashboardLayout(dashboard.widgets);
      
      // Przełącz na zakładkę tworzenia
      setActiveTab('create');
    }
  };
  
  // Formatowanie daty
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Nigdy';
    
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  
  // Renderowanie zakładki tworzenia dashboardu
  const renderCreateTab = () => {
    return (
      <>
        <Card>
          <CardTitle>Podstawowe informacje</CardTitle>
          <CardContent>
            <FormGroup>
              <Label>Nazwa dashboardu *</Label>
              <Input 
                type="text" 
                value={dashboardName} 
                onChange={(e) => setDashboardName(e.target.value)} 
                placeholder="Wprowadź nazwę dashboardu"
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Opis</Label>
              <TextArea 
                value={dashboardDescription} 
                onChange={(e) => setDashboardDescription(e.target.value)} 
                placeholder="Wprowadź opis dashboardu"
              />
            </FormGroup>
          </CardContent>
        </Card>
        
        <Card>
          <CardTitle>Wybór widgetów *</CardTitle>
          <CardContent>
            <WidgetsList>
              {availableWidgets.map(widget => (
                <WidgetItem 
                  key={widget.id} 
                  selected={selectedWidgets.some(w => w.id === widget.id)}
                  onClick={() => handleWidgetSelect(widget)}
                >
                  <WidgetIcon>{widget.icon}</WidgetIcon>
                  <WidgetTitle>{widget.name}</WidgetTitle>
                  <WidgetDescription>{widget.description}</WidgetDescription>
                </WidgetItem>
              ))}
            </WidgetsList>
          </CardContent>
        </Card>
        
        {dashboardLayout.length > 0 && (
          <Card>
            <CardTitle>Podgląd dashboardu</CardTitle>
            <CardContent>
              <DashboardPreview>
                {dashboardLayout.map(widget => (
                  <WidgetPreview key={widget.instanceId} size={widget.size}>
                    <WidgetPreviewHeader>
                      <WidgetPreviewTitle>{widget.title}</WidgetPreviewTitle>
                    </WidgetPreviewHeader>
                    <WidgetPreviewContent>
                      {widget.type === 'kpi' && 'Wskaźnik KPI'}
                      {widget.type === 'chart' && 'Wykres'}
                      {widget.type === 'table' && 'Tabela'}
                      {widget.type === 'map' && 'Mapa'}
                      {widget.type === 'heatmap' && 'Mapa cieplna'}
                    </WidgetPreviewContent>
                    <WidgetPreviewActions>
                      <WidgetPreviewAction onClick={() => handleResizeWidget(widget.instanceId)}>
                        📏
                      </WidgetPreviewAction>
                      <WidgetPreviewAction onClick={() => handleRemoveWidget(widget.instanceId)}>
                        ❌
                      </WidgetPreviewAction>
                    </WidgetPreviewActions>
                  </WidgetPreview>
                ))}
              </DashboardPreview>
              
              <ButtonGroup>
                <SecondaryButton>Podgląd</SecondaryButton>
                <Button onClick={handleSaveDashboard}>Zapisz dashboard</Button>
              </ButtonGroup>
            </CardContent>
          </Card>
        )}
      </>
    );
  };
  
  // Renderowanie zakładki zapisanych dashboardów
  const renderSavedTab = () => {
    return (
      <Card>
        <CardTitle>Zapisane dashboardy</CardTitle>
        <CardContent>
          {savedDashboards.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
              Brak zapisanych dashboardów
            </div>
          ) : (
            <SavedDashboardsList>
              {savedDashboards.map(dashboard => (
                <SavedDashboardItem key={dashboard.id}>
                  <SavedDashboardHeader>
                    <SavedDashboardTitle>{dashboard.name}</SavedDashboardTitle>
                    <SavedDashboardDate>Ostatnia modyfikacja: {formatDate(dashboard.lastModified)}</SavedDashboardDate>
                  </SavedDashboardHeader>
                  
                  <SavedDashboardDescription>{dashboard.description}</SavedDashboardDescription>
                  
                  <div style={{ marginBottom: '16px' }}>
                    <div><strong>Liczba widgetów:</strong> {dashboard.widgets.length}</div>
                    <div><strong>Utworzono:</strong> {formatDate(dashboard.createdAt)}</div>
                  </div>
                  
                  <SavedDashboardActions>
                    <ActionButton onClick={() => handleEditDashboard(dashboard.id)}>Edytuj</ActionButton>
                    
                    <div style={{ position: 'relative' }}>
                      <ActionButton onClick={() => handleExportDashboard(dashboard.id)}>Eksportuj</ActionButton>
                      <ExportFormatContainer style={{ position: 'absolute', top: '40px', left: 0, zIndex: 10, background: 'white', padding: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderRadius: '4px', display: 'none' }}>
                        <ExportFormatButton 
                          selected={exportFormat === 'pdf'} 
                          onClick={() => setExportFormat('pdf')}
                        >
                          PDF
                        </ExportFormatButton>
                        <ExportFormatButton 
                          selected={exportFormat === 'excel'} 
                          onClick={() => setExportFormat('excel')}
                        >
                          Excel
                        </ExportFormatButton>
                        <ExportFormatButton 
                          selected={exportFormat === 'image'} 
                          onClick={() => setExportFormat('image')}
                        >
                          Obraz
                        </ExportFormatButton>
                      </ExportFormatContainer>
                    </div>
                    
                    <ActionButton>Duplikuj</ActionButton>
                    <ActionButton>Usuń</ActionButton>
                  </SavedDashboardActions>
                </SavedDashboardItem>
              ))}
            </SavedDashboardsList>
          )}
        </CardContent>
      </Card>
    );
  };
  
  return (
    <Container>
      <Header>
        <Title>Zaawansowany dashboard</Title>
      </Header>
      
      <TabsContainer>
        <Tab 
          active={activeTab === 'create'} 
          onClick={() => setActiveTab('create')}
        >
          Utwórz dashboard
        </Tab>
        <Tab 
          active={activeTab === 'saved'} 
          onClick={() => setActiveTab('saved')}
        >
          Zapisane dashboardy
        </Tab>
      </TabsContainer>
      
      {activeTab === 'create' && renderCreateTab()}
      {activeTab === 'saved' && renderSavedTab()}
    </Container>
  );
};

export default AdvancedDashboard;
