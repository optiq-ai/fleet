import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface ReportBuilderProps {
  onSaveReport: (report: any) => Promise<void>;
  onExportReport: (reportId: string, format: string) => Promise<void>;
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

const DataSourceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

const DataSourceItem = styled.div<{ selected: boolean }>`
  padding: 12px;
  border: 1px solid ${props => props.selected ? '#3f51b5' : '#ddd'};
  border-radius: 4px;
  cursor: pointer;
  background-color: ${props => props.selected ? '#e8eaf6' : 'white'};
  
  &:hover {
    border-color: #3f51b5;
    background-color: #f5f5f5;
  }
`;

const DataSourceTitle = styled.div`
  font-weight: 500;
  margin-bottom: 4px;
`;

const DataSourceDescription = styled.div`
  font-size: 12px;
  color: #666;
`;

const FieldsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
  max-height: 300px;
  overflow-y: auto;
  padding-right: 10px;
`;

const FieldItem = styled.div<{ selected: boolean }>`
  padding: 8px 12px;
  border: 1px solid ${props => props.selected ? '#3f51b5' : '#ddd'};
  border-radius: 4px;
  cursor: pointer;
  background-color: ${props => props.selected ? '#e8eaf6' : 'white'};
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  &:hover {
    border-color: #3f51b5;
    background-color: #f5f5f5;
  }
`;

const FieldName = styled.div`
  font-weight: 500;
`;

const FieldType = styled.div`
  font-size: 12px;
  color: #666;
  padding: 2px 6px;
  background-color: #f5f5f5;
  border-radius: 4px;
`;

const SelectedFieldsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
  border: 1px dashed #ddd;
  padding: 16px;
  border-radius: 4px;
  min-height: 100px;
`;

const SelectedFieldItem = styled.div`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #f44336;
  cursor: pointer;
  font-size: 16px;
  
  &:hover {
    color: #d32f2f;
  }
`;

const FilterContainer = styled.div`
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 16px;
`;

const FilterRow = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  align-items: center;
`;

const FilterSelect = styled.select`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  
  &:focus {
    border-color: #3f51b5;
    outline: none;
  }
`;

const FilterInput = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  
  &:focus {
    border-color: #3f51b5;
    outline: none;
  }
`;

const AddFilterButton = styled.button`
  padding: 8px;
  background-color: white;
  color: #3f51b5;
  border: 1px solid #3f51b5;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #e8eaf6;
  }
`;

const ChartTypeContainer = styled.div`
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

const ChartTypeItem = styled.div<{ selected: boolean }>`
  padding: 16px;
  border: 1px solid ${props => props.selected ? '#3f51b5' : '#ddd'};
  border-radius: 4px;
  cursor: pointer;
  background-color: ${props => props.selected ? '#e8eaf6' : 'white'};
  text-align: center;
  
  &:hover {
    border-color: #3f51b5;
    background-color: #f5f5f5;
  }
`;

const ChartIcon = styled.div`
  font-size: 32px;
  margin-bottom: 8px;
`;

const ChartName = styled.div`
  font-weight: 500;
`;

const PreviewContainer = styled.div`
  height: 400px;
  background-color: #f5f5f5;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const SavedReportsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SavedReportItem = styled.div`
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
`;

const SavedReportHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const SavedReportTitle = styled.div`
  font-weight: 500;
`;

const SavedReportDate = styled.div`
  font-size: 12px;
  color: #666;
`;

const SavedReportDescription = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
`;

const SavedReportActions = styled.div`
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

const ScheduleContainer = styled.div`
  margin-top: 20px;
`;

const ScheduleRow = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  align-items: center;
`;

const ScheduleLabel = styled.div`
  width: 100px;
  font-weight: 500;
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

const ReportBuilder: React.FC<ReportBuilderProps> = ({
  onSaveReport,
  onExportReport,
  availableDataSources
}) => {
  const [activeTab, setActiveTab] = useState<'create' | 'saved' | 'scheduled'>('create');
  const [reportName, setReportName] = useState<string>('');
  const [reportDescription, setReportDescription] = useState<string>('');
  const [selectedDataSource, setSelectedDataSource] = useState<any | null>(null);
  const [availableFields, setAvailableFields] = useState<any[]>([]);
  const [selectedFields, setSelectedFields] = useState<any[]>([]);
  const [filters, setFilters] = useState<any[]>([{ field: '', operator: 'equals', value: '' }]);
  const [selectedChartType, setSelectedChartType] = useState<string>('table');
  const [savedReports, setSavedReports] = useState<any[]>([]);
  const [scheduledReports, setScheduledReports] = useState<any[]>([]);
  const [scheduleFrequency, setScheduleFrequency] = useState<string>('daily');
  const [scheduleTime, setScheduleTime] = useState<string>('09:00');
  const [scheduleRecipients, setScheduleRecipients] = useState<string>('');
  const [exportFormat, setExportFormat] = useState<string>('pdf');
  
  // Przykładowe dane
  useEffect(() => {
    // Symulacja pobrania zapisanych raportów
    const sampleSavedReports = [
      {
        id: 'report1',
        name: 'Raport zużycia paliwa',
        description: 'Miesięczny raport zużycia paliwa według pojazdów',
        dataSource: 'fuel_consumption',
        fields: ['vehicle_id', 'fuel_amount', 'date', 'driver_id'],
        chartType: 'bar',
        createdAt: '2025-04-10T10:30:00Z',
        lastRun: '2025-04-11T08:00:00Z'
      },
      {
        id: 'report2',
        name: 'Raport bezpieczeństwa kierowców',
        description: 'Tygodniowy raport zdarzeń bezpieczeństwa kierowców',
        dataSource: 'driver_safety',
        fields: ['driver_id', 'event_type', 'event_count', 'date'],
        chartType: 'line',
        createdAt: '2025-04-05T14:15:00Z',
        lastRun: '2025-04-12T07:30:00Z'
      },
      {
        id: 'report3',
        name: 'Raport kosztów utrzymania',
        description: 'Kwartalny raport kosztów utrzymania floty',
        dataSource: 'maintenance_costs',
        fields: ['vehicle_id', 'cost_type', 'amount', 'date'],
        chartType: 'pie',
        createdAt: '2025-03-15T11:45:00Z',
        lastRun: '2025-04-01T09:00:00Z'
      }
    ];
    
    setSavedReports(sampleSavedReports);
    
    // Symulacja pobrania zaplanowanych raportów
    const sampleScheduledReports = [
      {
        id: 'schedule1',
        reportId: 'report1',
        name: 'Raport zużycia paliwa',
        frequency: 'monthly',
        time: '08:00',
        recipients: 'fleet.manager@example.com, finance@example.com',
        nextRun: '2025-05-01T08:00:00Z'
      },
      {
        id: 'schedule2',
        reportId: 'report2',
        name: 'Raport bezpieczeństwa kierowców',
        frequency: 'weekly',
        time: '07:30',
        recipients: 'safety.officer@example.com, hr@example.com',
        nextRun: '2025-04-19T07:30:00Z'
      }
    ];
    
    setScheduledReports(sampleScheduledReports);
  }, []);
  
  // Aktualizacja dostępnych pól po wyborze źródła danych
  useEffect(() => {
    if (selectedDataSource) {
      // Symulacja pobrania dostępnych pól dla wybranego źródła danych
      const fields = [
        { name: 'vehicle_id', type: 'string', label: 'ID pojazdu' },
        { name: 'driver_id', type: 'string', label: 'ID kierowcy' },
        { name: 'date', type: 'date', label: 'Data' },
        { name: 'fuel_amount', type: 'number', label: 'Ilość paliwa' },
        { name: 'fuel_cost', type: 'number', label: 'Koszt paliwa' },
        { name: 'distance', type: 'number', label: 'Przejechany dystans' },
        { name: 'avg_speed', type: 'number', label: 'Średnia prędkość' },
        { name: 'idle_time', type: 'number', label: 'Czas na biegu jałowym' },
        { name: 'event_type', type: 'string', label: 'Typ zdarzenia' },
        { name: 'event_count', type: 'number', label: 'Liczba zdarzeń' },
        { name: 'maintenance_type', type: 'string', label: 'Typ konserwacji' },
        { name: 'maintenance_cost', type: 'number', label: 'Koszt konserwacji' },
        { name: 'location', type: 'string', label: 'Lokalizacja' }
      ];
      
      setAvailableFields(fields);
    } else {
      setAvailableFields([]);
    }
  }, [selectedDataSource]);
  
  // Obsługa wyboru źródła danych
  const handleDataSourceSelect = (dataSource: any) => {
    setSelectedDataSource(dataSource);
    setSelectedFields([]);
  };
  
  // Obsługa wyboru pola
  const handleFieldSelect = (field: any) => {
    if (selectedFields.find(f => f.name === field.name)) {
      // Jeśli pole jest już wybrane, usuń je
      setSelectedFields(selectedFields.filter(f => f.name !== field.name));
    } else {
      // W przeciwnym razie dodaj je
      setSelectedFields([...selectedFields, field]);
    }
  };
  
  // Obsługa usuwania wybranego pola
  const handleRemoveField = (fieldName: string) => {
    setSelectedFields(selectedFields.filter(field => field.name !== fieldName));
  };
  
  // Obsługa zmiany filtra
  const handleFilterChange = (index: number, key: string, value: string) => {
    const newFilters = [...filters];
    newFilters[index] = { ...newFilters[index], [key]: value };
    setFilters(newFilters);
  };
  
  // Obsługa dodawania filtra
  const handleAddFilter = () => {
    setFilters([...filters, { field: '', operator: 'equals', value: '' }]);
  };
  
  // Obsługa usuwania filtra
  const handleRemoveFilter = (index: number) => {
    const newFilters = [...filters];
    newFilters.splice(index, 1);
    setFilters(newFilters);
  };
  
  // Obsługa zapisywania raportu
  const handleSaveReport = async () => {
    if (!reportName || !selectedDataSource || selectedFields.length === 0) {
      alert('Proszę wypełnić wszystkie wymagane pola');
      return;
    }
    
    const report = {
      name: reportName,
      description: reportDescription,
      dataSource: selectedDataSource.id,
      fields: selectedFields.map(field => field.name),
      filters,
      chartType: selectedChartType,
      createdAt: new Date().toISOString()
    };
    
    try {
      await onSaveReport(report);
      
      // Dodaj raport do listy zapisanych raportów
      const newReport = {
        id: `report${Date.now()}`,
        ...report,
        lastRun: null
      };
      
      setSavedReports([newReport, ...savedReports]);
      
      // Resetuj formularz
      setReportName('');
      setReportDescription('');
      setSelectedDataSource(null);
      setSelectedFields([]);
      setFilters([{ field: '', operator: 'equals', value: '' }]);
      setSelectedChartType('table');
      
      // Przełącz na zakładkę zapisanych raportów
      setActiveTab('saved');
    } catch (error) {
      console.error('Error saving report:', error);
      alert('Wystąpił błąd podczas zapisywania raportu');
    }
  };
  
  // Obsługa eksportu raportu
  const handleExportReport = async (reportId: string) => {
    try {
      await onExportReport(reportId, exportFormat);
      alert(`Raport został wyeksportowany do formatu ${exportFormat.toUpperCase()}`);
    } catch (error) {
      console.error('Error exporting report:', error);
      alert('Wystąpił błąd podczas eksportowania raportu');
    }
  };
  
  // Obsługa uruchamiania raportu
  const handleRunReport = (reportId: string) => {
    // Symulacja uruchomienia raportu
    alert(`Raport ${reportId} został uruchomiony`);
    
    // Aktualizacja czasu ostatniego uruchomienia
    const updatedReports = savedReports.map(report => 
      report.id === reportId 
        ? { ...report, lastRun: new Date().toISOString() } 
        : report
    );
    
    setSavedReports(updatedReports);
  };
  
  // Obsługa planowania raportu
  const handleScheduleReport = (reportId: string) => {
    const report = savedReports.find(r => r.id === reportId);
    
    if (!report) return;
    
    if (!scheduleRecipients) {
      alert('Proszę podać adresy e-mail odbiorców');
      return;
    }
    
    // Symulacja planowania raportu
    const newSchedule = {
      id: `schedule${Date.now()}`,
      reportId,
      name: report.name,
      frequency: scheduleFrequency,
      time: scheduleTime,
      recipients: scheduleRecipients,
      nextRun: calculateNextRun(scheduleFrequency, scheduleTime)
    };
    
    setScheduledReports([newSchedule, ...scheduledReports]);
    
    // Resetuj formularz planowania
    setScheduleFrequency('daily');
    setScheduleTime('09:00');
    setScheduleRecipients('');
    
    // Przełącz na zakładkę zaplanowanych raportów
    setActiveTab('scheduled');
  };
  
  // Obliczanie następnego uruchomienia na podstawie częstotliwości i czasu
  const calculateNextRun = (frequency: string, time: string) => {
    const now = new Date();
    const [hours, minutes] = time.split(':').map(Number);
    let nextRun = new Date(now);
    
    nextRun.setHours(hours, minutes, 0, 0);
    
    if (nextRun <= now) {
      // Jeśli czas już minął, ustaw na następny dzień
      nextRun.setDate(nextRun.getDate() + 1);
    }
    
    if (frequency === 'weekly') {
      // Ustaw na następny poniedziałek
      const daysUntilMonday = 1 - nextRun.getDay();
      nextRun.setDate(nextRun.getDate() + (daysUntilMonday <= 0 ? daysUntilMonday + 7 : daysUntilMonday));
    } else if (frequency === 'monthly') {
      // Ustaw na pierwszy dzień następnego miesiąca
      nextRun.setDate(1);
      nextRun.setMonth(nextRun.getMonth() + 1);
    }
    
    return nextRun.toISOString();
  };
  
  // Formatowanie daty
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Nigdy';
    
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  
  // Renderowanie zakładki tworzenia raportu
  const renderCreateTab = () => {
    return (
      <>
        <Card>
          <CardTitle>Podstawowe informacje</CardTitle>
          <CardContent>
            <FormGroup>
              <Label>Nazwa raportu *</Label>
              <Input 
                type="text" 
                value={reportName} 
                onChange={(e) => setReportName(e.target.value)} 
                placeholder="Wprowadź nazwę raportu"
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Opis</Label>
              <TextArea 
                value={reportDescription} 
                onChange={(e) => setReportDescription(e.target.value)} 
                placeholder="Wprowadź opis raportu"
              />
            </FormGroup>
          </CardContent>
        </Card>
        
        <Card>
          <CardTitle>Źródło danych *</CardTitle>
          <CardContent>
            <DataSourceList>
              {availableDataSources.map(dataSource => (
                <DataSourceItem 
                  key={dataSource.id} 
                  selected={selectedDataSource?.id === dataSource.id}
                  onClick={() => handleDataSourceSelect(dataSource)}
                >
                  <DataSourceTitle>{dataSource.name}</DataSourceTitle>
                  <DataSourceDescription>{dataSource.description}</DataSourceDescription>
                </DataSourceItem>
              ))}
            </DataSourceList>
          </CardContent>
        </Card>
        
        <Card>
          <CardTitle>Wybór pól *</CardTitle>
          <CardContent>
            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ flex: 1 }}>
                <Label>Dostępne pola</Label>
                <FieldsList>
                  {availableFields.map(field => (
                    <FieldItem 
                      key={field.name} 
                      selected={selectedFields.some(f => f.name === field.name)}
                      onClick={() => handleFieldSelect(field)}
                    >
                      <FieldName>{field.label}</FieldName>
                      <FieldType>{field.type}</FieldType>
                    </FieldItem>
                  ))}
                </FieldsList>
              </div>
              
              <div style={{ flex: 1 }}>
                <Label>Wybrane pola</Label>
                <SelectedFieldsList>
                  {selectedFields.length === 0 ? (
                    <div style={{ color: '#666', textAlign: 'center', padding: '20px' }}>
                      Wybierz pola z listy dostępnych pól
                    </div>
                  ) : (
                    selectedFields.map(field => (
                      <SelectedFieldItem key={field.name}>
                        <div>{field.label}</div>
                        <RemoveButton onClick={() => handleRemoveField(field.name)}>×</RemoveButton>
                      </SelectedFieldItem>
                    ))
                  )}
                </SelectedFieldsList>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardTitle>Filtry</CardTitle>
          <CardContent>
            {filters.map((filter, index) => (
              <FilterRow key={index}>
                <FilterSelect 
                  value={filter.field} 
                  onChange={(e) => handleFilterChange(index, 'field', e.target.value)}
                >
                  <option value="">Wybierz pole</option>
                  {availableFields.map(field => (
                    <option key={field.name} value={field.name}>{field.label}</option>
                  ))}
                </FilterSelect>
                
                <FilterSelect 
                  value={filter.operator} 
                  onChange={(e) => handleFilterChange(index, 'operator', e.target.value)}
                >
                  <option value="equals">równa się</option>
                  <option value="not_equals">nie równa się</option>
                  <option value="greater_than">większe niż</option>
                  <option value="less_than">mniejsze niż</option>
                  <option value="contains">zawiera</option>
                  <option value="starts_with">zaczyna się od</option>
                  <option value="ends_with">kończy się na</option>
                </FilterSelect>
                
                <FilterInput 
                  type="text" 
                  value={filter.value} 
                  onChange={(e) => handleFilterChange(index, 'value', e.target.value)} 
                  placeholder="Wartość"
                />
                
                <RemoveButton onClick={() => handleRemoveFilter(index)}>×</RemoveButton>
              </FilterRow>
            ))}
            
            <AddFilterButton onClick={handleAddFilter}>
              + Dodaj filtr
            </AddFilterButton>
          </CardContent>
        </Card>
        
        <Card>
          <CardTitle>Typ wykresu</CardTitle>
          <CardContent>
            <ChartTypeContainer>
              <ChartTypeItem 
                selected={selectedChartType === 'table'} 
                onClick={() => setSelectedChartType('table')}
              >
                <ChartIcon>📋</ChartIcon>
                <ChartName>Tabela</ChartName>
              </ChartTypeItem>
              
              <ChartTypeItem 
                selected={selectedChartType === 'bar'} 
                onClick={() => setSelectedChartType('bar')}
              >
                <ChartIcon>📊</ChartIcon>
                <ChartName>Wykres słupkowy</ChartName>
              </ChartTypeItem>
              
              <ChartTypeItem 
                selected={selectedChartType === 'line'} 
                onClick={() => setSelectedChartType('line')}
              >
                <ChartIcon>📈</ChartIcon>
                <ChartName>Wykres liniowy</ChartName>
              </ChartTypeItem>
              
              <ChartTypeItem 
                selected={selectedChartType === 'pie'} 
                onClick={() => setSelectedChartType('pie')}
              >
                <ChartIcon>🍩</ChartIcon>
                <ChartName>Wykres kołowy</ChartName>
              </ChartTypeItem>
              
              <ChartTypeItem 
                selected={selectedChartType === 'scatter'} 
                onClick={() => setSelectedChartType('scatter')}
              >
                <ChartIcon>🔢</ChartIcon>
                <ChartName>Wykres punktowy</ChartName>
              </ChartTypeItem>
              
              <ChartTypeItem 
                selected={selectedChartType === 'heatmap'} 
                onClick={() => setSelectedChartType('heatmap')}
              >
                <ChartIcon>🔥</ChartIcon>
                <ChartName>Mapa cieplna</ChartName>
              </ChartTypeItem>
            </ChartTypeContainer>
            
            <PreviewContainer>
              <div>Podgląd wykresu będzie dostępny po wybraniu pól i filtrów</div>
            </PreviewContainer>
            
            <ButtonGroup>
              <SecondaryButton>Podgląd</SecondaryButton>
              <Button onClick={handleSaveReport}>Zapisz raport</Button>
            </ButtonGroup>
          </CardContent>
        </Card>
      </>
    );
  };
  
  // Renderowanie zakładki zapisanych raportów
  const renderSavedTab = () => {
    return (
      <Card>
        <CardTitle>Zapisane raporty</CardTitle>
        <CardContent>
          {savedReports.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
              Brak zapisanych raportów
            </div>
          ) : (
            <SavedReportsList>
              {savedReports.map(report => (
                <SavedReportItem key={report.id}>
                  <SavedReportHeader>
                    <SavedReportTitle>{report.name}</SavedReportTitle>
                    <SavedReportDate>Utworzono: {formatDate(report.createdAt)}</SavedReportDate>
                  </SavedReportHeader>
                  
                  <SavedReportDescription>{report.description}</SavedReportDescription>
                  
                  <div style={{ marginBottom: '16px' }}>
                    <div><strong>Źródło danych:</strong> {report.dataSource}</div>
                    <div><strong>Typ wykresu:</strong> {report.chartType}</div>
                    <div><strong>Ostatnie uruchomienie:</strong> {formatDate(report.lastRun)}</div>
                  </div>
                  
                  <SavedReportActions>
                    <ActionButton onClick={() => handleRunReport(report.id)}>Uruchom</ActionButton>
                    <ActionButton onClick={() => setActiveTab('create')}>Edytuj</ActionButton>
                    
                    <div style={{ position: 'relative' }}>
                      <ActionButton onClick={() => handleExportReport(report.id)}>Eksportuj</ActionButton>
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
                          selected={exportFormat === 'csv'} 
                          onClick={() => setExportFormat('csv')}
                        >
                          CSV
                        </ExportFormatButton>
                      </ExportFormatContainer>
                    </div>
                    
                    <ActionButton>Usuń</ActionButton>
                  </SavedReportActions>
                  
                  <ScheduleContainer>
                    <div style={{ fontWeight: 500, marginBottom: '10px' }}>Zaplanuj raport</div>
                    
                    <ScheduleRow>
                      <ScheduleLabel>Częstotliwość</ScheduleLabel>
                      <Select 
                        value={scheduleFrequency} 
                        onChange={(e) => setScheduleFrequency(e.target.value)}
                      >
                        <option value="daily">Codziennie</option>
                        <option value="weekly">Co tydzień</option>
                        <option value="monthly">Co miesiąc</option>
                      </Select>
                    </ScheduleRow>
                    
                    <ScheduleRow>
                      <ScheduleLabel>Czas</ScheduleLabel>
                      <Input 
                        type="time" 
                        value={scheduleTime} 
                        onChange={(e) => setScheduleTime(e.target.value)}
                      />
                    </ScheduleRow>
                    
                    <ScheduleRow>
                      <ScheduleLabel>Odbiorcy</ScheduleLabel>
                      <Input 
                        type="text" 
                        value={scheduleRecipients} 
                        onChange={(e) => setScheduleRecipients(e.target.value)} 
                        placeholder="Adresy e-mail oddzielone przecinkami"
                      />
                    </ScheduleRow>
                    
                    <ButtonGroup>
                      <Button onClick={() => handleScheduleReport(report.id)}>Zaplanuj</Button>
                    </ButtonGroup>
                  </ScheduleContainer>
                </SavedReportItem>
              ))}
            </SavedReportsList>
          )}
        </CardContent>
      </Card>
    );
  };
  
  // Renderowanie zakładki zaplanowanych raportów
  const renderScheduledTab = () => {
    return (
      <Card>
        <CardTitle>Zaplanowane raporty</CardTitle>
        <CardContent>
          {scheduledReports.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
              Brak zaplanowanych raportów
            </div>
          ) : (
            <SavedReportsList>
              {scheduledReports.map(schedule => (
                <SavedReportItem key={schedule.id}>
                  <SavedReportHeader>
                    <SavedReportTitle>{schedule.name}</SavedReportTitle>
                    <SavedReportDate>Następne uruchomienie: {formatDate(schedule.nextRun)}</SavedReportDate>
                  </SavedReportHeader>
                  
                  <div style={{ marginBottom: '16px' }}>
                    <div><strong>Częstotliwość:</strong> {
                      schedule.frequency === 'daily' ? 'Codziennie' :
                      schedule.frequency === 'weekly' ? 'Co tydzień' :
                      'Co miesiąc'
                    }</div>
                    <div><strong>Czas:</strong> {schedule.time}</div>
                    <div><strong>Odbiorcy:</strong> {schedule.recipients}</div>
                  </div>
                  
                  <SavedReportActions>
                    <ActionButton>Edytuj</ActionButton>
                    <ActionButton>Wstrzymaj</ActionButton>
                    <ActionButton>Usuń</ActionButton>
                  </SavedReportActions>
                </SavedReportItem>
              ))}
            </SavedReportsList>
          )}
        </CardContent>
      </Card>
    );
  };
  
  return (
    <Container>
      <Header>
        <Title>Kreator raportów</Title>
      </Header>
      
      <TabsContainer>
        <Tab 
          active={activeTab === 'create'} 
          onClick={() => setActiveTab('create')}
        >
          Utwórz raport
        </Tab>
        <Tab 
          active={activeTab === 'saved'} 
          onClick={() => setActiveTab('saved')}
        >
          Zapisane raporty
        </Tab>
        <Tab 
          active={activeTab === 'scheduled'} 
          onClick={() => setActiveTab('scheduled')}
        >
          Zaplanowane raporty
        </Tab>
      </TabsContainer>
      
      {activeTab === 'create' && renderCreateTab()}
      {activeTab === 'saved' && renderSavedTab()}
      {activeTab === 'scheduled' && renderScheduledTab()}
    </Container>
  );
};

export default ReportBuilder;
