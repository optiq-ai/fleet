import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface BenchmarkingToolProps {
  onSaveBenchmark: (benchmark: any) => Promise<void>;
  onExportBenchmark: (benchmarkId: string, format: string) => Promise<void>;
  availableMetrics: any[];
  fleetData: any;
  industryData: any;
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

const MetricsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

const MetricItem = styled.div<{ selected: boolean }>`
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

const MetricTitle = styled.div`
  font-weight: 500;
  margin-bottom: 4px;
`;

const MetricDescription = styled.div`
  font-size: 12px;
  color: #666;
`;

const SelectedMetricsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
  border: 1px dashed #ddd;
  padding: 16px;
  border-radius: 4px;
  min-height: 100px;
`;

const SelectedMetricItem = styled.div`
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

const ChartContainer = styled.div`
  height: 400px;
  background-color: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 20px;
  padding: 16px;
  display: flex;
  flex-direction: column;
`;

const ChartTitle = styled.div`
  font-weight: 500;
  margin-bottom: 16px;
`;

const ChartContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
`;

const BenchmarkResultsContainer = styled.div`
  margin-top: 20px;
`;

const BenchmarkResultsTitle = styled.div`
  font-weight: 500;
  margin-bottom: 16px;
`;

const BenchmarkResultsGrid = styled.div`
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

const BenchmarkResultCard = styled.div<{ performance: 'good' | 'average' | 'poor' }>`
  padding: 16px;
  border-radius: 8px;
  background-color: ${props => 
    props.performance === 'good' ? '#e8f5e9' : 
    props.performance === 'average' ? '#fff8e1' : 
    '#ffebee'
  };
  border-left: 4px solid ${props => 
    props.performance === 'good' ? '#4caf50' : 
    props.performance === 'average' ? '#ffc107' : 
    '#f44336'
  };
`;

const BenchmarkResultTitle = styled.div`
  font-weight: 500;
  margin-bottom: 8px;
`;

const BenchmarkResultValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 8px;
`;

const BenchmarkResultComparison = styled.div`
  font-size: 14px;
  color: #666;
`;

const BenchmarkResultTrend = styled.div<{ trend: 'up' | 'down' | 'stable' }>`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: ${props => 
    props.trend === 'up' ? '#4caf50' : 
    props.trend === 'down' ? '#f44336' : 
    '#757575'
  };
`;

const SavedBenchmarksList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SavedBenchmarkItem = styled.div`
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
`;

const SavedBenchmarkHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const SavedBenchmarkTitle = styled.div`
  font-weight: 500;
`;

const SavedBenchmarkDate = styled.div`
  font-size: 12px;
  color: #666;
`;

const SavedBenchmarkDescription = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
`;

const SavedBenchmarkActions = styled.div`
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

const ComparisonTypeContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const ComparisonTypeButton = styled.button<{ selected: boolean }>`
  padding: 8px 16px;
  background-color: ${props => props.selected ? '#3f51b5' : 'white'};
  color: ${props => props.selected ? 'white' : '#3f51b5'};
  border: 1px solid #3f51b5;
  border-radius: 4px;
  cursor: pointer;
  flex: 1;
  
  &:hover {
    background-color: ${props => props.selected ? '#303f9f' : '#e8eaf6'};
  }
`;

const TimeRangeContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const TimeRangeButton = styled.button<{ selected: boolean }>`
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

const InsightCard = styled.div`
  padding: 16px;
  border-radius: 8px;
  background-color: #e8eaf6;
  margin-bottom: 16px;
`;

const InsightTitle = styled.div`
  font-weight: 500;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const InsightContent = styled.div`
  font-size: 14px;
  color: #666;
`;

const InsightAction = styled.div`
  margin-top: 8px;
  font-weight: 500;
  color: #3f51b5;
`;

const BenchmarkingTool: React.FC<BenchmarkingToolProps> = ({
  onSaveBenchmark,
  onExportBenchmark,
  availableMetrics,
  fleetData,
  industryData
}) => {
  const [activeTab, setActiveTab] = useState<'create' | 'saved' | 'insights'>('create');
  const [benchmarkName, setBenchmarkName] = useState<string>('');
  const [benchmarkDescription, setBenchmarkDescription] = useState<string>('');
  const [selectedMetrics, setSelectedMetrics] = useState<any[]>([]);
  const [comparisonType, setComparisonType] = useState<'industry' | 'historical' | 'competitors'>('industry');
  const [timeRange, setTimeRange] = useState<'month' | 'quarter' | 'year'>('quarter');
  const [benchmarkResults, setBenchmarkResults] = useState<any[]>([]);
  const [savedBenchmarks, setSavedBenchmarks] = useState<any[]>([]);
  const [insights, setInsights] = useState<any[]>([]);
  const [exportFormat, setExportFormat] = useState<string>('pdf');
  
  // Przykładowe dane
  useEffect(() => {
    // Symulacja pobrania zapisanych benchmarków
    const sampleSavedBenchmarks = [
      {
        id: 'benchmark1',
        name: 'Porównanie zużycia paliwa',
        description: 'Porównanie zużycia paliwa floty z branżowymi standardami',
        metrics: ['fuel_consumption', 'fuel_cost', 'fuel_efficiency'],
        comparisonType: 'industry',
        timeRange: 'quarter',
        createdAt: '2025-04-10T10:30:00Z',
        lastRun: '2025-04-11T08:00:00Z'
      },
      {
        id: 'benchmark2',
        name: 'Analiza bezpieczeństwa kierowców',
        description: 'Porównanie wskaźników bezpieczeństwa kierowców z historycznymi danymi',
        metrics: ['safety_score', 'accident_rate', 'harsh_events'],
        comparisonType: 'historical',
        timeRange: 'year',
        createdAt: '2025-04-05T14:15:00Z',
        lastRun: '2025-04-12T07:30:00Z'
      },
      {
        id: 'benchmark3',
        name: 'Porównanie kosztów utrzymania',
        description: 'Porównanie kosztów utrzymania floty z konkurencją',
        metrics: ['maintenance_cost', 'repair_frequency', 'downtime'],
        comparisonType: 'competitors',
        timeRange: 'month',
        createdAt: '2025-03-15T11:45:00Z',
        lastRun: '2025-04-01T09:00:00Z'
      }
    ];
    
    setSavedBenchmarks(sampleSavedBenchmarks);
    
    // Symulacja wygenerowanych spostrzeżeń
    const sampleInsights = [
      {
        id: 'insight1',
        title: 'Zużycie paliwa powyżej średniej branżowej',
        content: 'Zużycie paliwa Twojej floty jest o 15% wyższe niż średnia branżowa. Główną przyczyną może być starzejąca się flota pojazdów i nieefektywne trasy.',
        action: 'Rozważ optymalizację tras i przegląd pojazdów o najwyższym zużyciu paliwa.',
        severity: 'high',
        createdAt: '2025-04-11T08:00:00Z'
      },
      {
        id: 'insight2',
        title: 'Poprawa wskaźników bezpieczeństwa',
        content: 'Wskaźniki bezpieczeństwa kierowców poprawiły się o 8% w porównaniu z poprzednim kwartałem. Liczba gwałtownych hamowań spadła o 12%.',
        action: 'Kontynuuj program szkoleniowy dla kierowców, który przynosi pozytywne rezultaty.',
        severity: 'low',
        createdAt: '2025-04-12T07:30:00Z'
      },
      {
        id: 'insight3',
        title: 'Koszty utrzymania wyższe od konkurencji',
        content: 'Koszty utrzymania floty są o 10% wyższe niż u głównych konkurentów. Analiza wskazuje, że głównym czynnikiem są częstsze naprawy pojazdów marki X.',
        action: 'Rozważ zmianę dostawcy części zamiennych lub przegląd umów serwisowych dla pojazdów marki X.',
        severity: 'medium',
        createdAt: '2025-04-01T09:00:00Z'
      }
    ];
    
    setInsights(sampleInsights);
  }, []);
  
  // Obsługa wyboru metryki
  const handleMetricSelect = (metric: any) => {
    if (selectedMetrics.find(m => m.id === metric.id)) {
      // Jeśli metryka jest już wybrana, usuń ją
      setSelectedMetrics(selectedMetrics.filter(m => m.id !== metric.id));
    } else {
      // W przeciwnym razie dodaj ją
      setSelectedMetrics([...selectedMetrics, metric]);
    }
  };
  
  // Obsługa usuwania wybranej metryki
  const handleRemoveMetric = (metricId: string) => {
    setSelectedMetrics(selectedMetrics.filter(metric => metric.id !== metricId));
  };
  
  // Obsługa uruchamiania benchmarku
  const handleRunBenchmark = () => {
    if (!benchmarkName || selectedMetrics.length === 0) {
      alert('Proszę wypełnić wszystkie wymagane pola');
      return;
    }
    
    // Symulacja wyników benchmarku
    const sampleResults = [
      {
        id: 'result1',
        metricId: 'fuel_consumption',
        metricName: 'Zużycie paliwa',
        fleetValue: 8.5, // l/100km
        comparisonValue: 7.2, // l/100km
        difference: 18.1, // %
        performance: 'poor' as const,
        trend: 'up' as const
      },
      {
        id: 'result2',
        metricId: 'fuel_cost',
        metricName: 'Koszt paliwa',
        fleetValue: 4.2, // PLN/km
        comparisonValue: 3.8, // PLN/km
        difference: 10.5, // %
        performance: 'average' as const,
        trend: 'stable' as const
      },
      {
        id: 'result3',
        metricId: 'maintenance_cost',
        metricName: 'Koszt utrzymania',
        fleetValue: 0.35, // PLN/km
        comparisonValue: 0.38, // PLN/km
        difference: -7.9, // %
        performance: 'good' as const,
        trend: 'down' as const
      },
      {
        id: 'result4',
        metricId: 'downtime',
        metricName: 'Czas przestoju',
        fleetValue: 3.2, // %
        comparisonValue: 2.8, // %
        difference: 14.3, // %
        performance: 'average' as const,
        trend: 'up' as const
      },
      {
        id: 'result5',
        metricId: 'safety_score',
        metricName: 'Wynik bezpieczeństwa',
        fleetValue: 87, // punkty
        comparisonValue: 82, // punkty
        difference: 6.1, // %
        performance: 'good' as const,
        trend: 'up' as const
      }
    ];
    
    // Filtruj wyniki, aby pokazać tylko te dla wybranych metryk
    const filteredResults = sampleResults.filter(result => 
      selectedMetrics.some(metric => metric.id === result.metricId)
    );
    
    setBenchmarkResults(filteredResults);
  };
  
  // Obsługa zapisywania benchmarku
  const handleSaveBenchmark = async () => {
    if (!benchmarkName || selectedMetrics.length === 0 || benchmarkResults.length === 0) {
      alert('Proszę wypełnić wszystkie wymagane pola i uruchomić benchmark przed zapisaniem');
      return;
    }
    
    const benchmark = {
      name: benchmarkName,
      description: benchmarkDescription,
      metrics: selectedMetrics.map(metric => metric.id),
      comparisonType,
      timeRange,
      results: benchmarkResults,
      createdAt: new Date().toISOString()
    };
    
    try {
      await onSaveBenchmark(benchmark);
      
      // Dodaj benchmark do listy zapisanych benchmarków
      const newBenchmark = {
        id: `benchmark${Date.now()}`,
        ...benchmark,
        lastRun: new Date().toISOString()
      };
      
      setSavedBenchmarks([newBenchmark, ...savedBenchmarks]);
      
      // Resetuj formularz
      setBenchmarkName('');
      setBenchmarkDescription('');
      setSelectedMetrics([]);
      setComparisonType('industry');
      setTimeRange('quarter');
      setBenchmarkResults([]);
      
      // Przełącz na zakładkę zapisanych benchmarków
      setActiveTab('saved');
    } catch (error) {
      console.error('Error saving benchmark:', error);
      alert('Wystąpił błąd podczas zapisywania benchmarku');
    }
  };
  
  // Obsługa eksportu benchmarku
  const handleExportBenchmark = async (benchmarkId: string) => {
    try {
      await onExportBenchmark(benchmarkId, exportFormat);
      alert(`Benchmark został wyeksportowany do formatu ${exportFormat.toUpperCase()}`);
    } catch (error) {
      console.error('Error exporting benchmark:', error);
      alert('Wystąpił błąd podczas eksportowania benchmarku');
    }
  };
  
  // Formatowanie daty
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Nigdy';
    
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  
  // Renderowanie zakładki tworzenia benchmarku
  const renderCreateTab = () => {
    return (
      <>
        <Card>
          <CardTitle>Podstawowe informacje</CardTitle>
          <CardContent>
            <FormGroup>
              <Label>Nazwa benchmarku *</Label>
              <Input 
                type="text" 
                value={benchmarkName} 
                onChange={(e) => setBenchmarkName(e.target.value)} 
                placeholder="Wprowadź nazwę benchmarku"
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Opis</Label>
              <TextArea 
                value={benchmarkDescription} 
                onChange={(e) => setBenchmarkDescription(e.target.value)} 
                placeholder="Wprowadź opis benchmarku"
              />
            </FormGroup>
          </CardContent>
        </Card>
        
        <Card>
          <CardTitle>Wybór metryk *</CardTitle>
          <CardContent>
            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ flex: 1 }}>
                <Label>Dostępne metryki</Label>
                <MetricsList>
                  {availableMetrics.map(metric => (
                    <MetricItem 
                      key={metric.id} 
                      selected={selectedMetrics.some(m => m.id === metric.id)}
                      onClick={() => handleMetricSelect(metric)}
                    >
                      <MetricTitle>{metric.name}</MetricTitle>
                      <MetricDescription>{metric.description}</MetricDescription>
                    </MetricItem>
                  ))}
                </MetricsList>
              </div>
              
              <div style={{ flex: 1 }}>
                <Label>Wybrane metryki</Label>
                <SelectedMetricsList>
                  {selectedMetrics.length === 0 ? (
                    <div style={{ color: '#666', textAlign: 'center', padding: '20px' }}>
                      Wybierz metryki z listy dostępnych metryk
                    </div>
                  ) : (
                    selectedMetrics.map(metric => (
                      <SelectedMetricItem key={metric.id}>
                        <div>{metric.name}</div>
                        <RemoveButton onClick={() => handleRemoveMetric(metric.id)}>×</RemoveButton>
                      </SelectedMetricItem>
                    ))
                  )}
                </SelectedMetricsList>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardTitle>Opcje porównania</CardTitle>
          <CardContent>
            <FormGroup>
              <Label>Typ porównania</Label>
              <ComparisonTypeContainer>
                <ComparisonTypeButton 
                  selected={comparisonType === 'industry'} 
                  onClick={() => setComparisonType('industry')}
                >
                  Standardy branżowe
                </ComparisonTypeButton>
                <ComparisonTypeButton 
                  selected={comparisonType === 'historical'} 
                  onClick={() => setComparisonType('historical')}
                >
                  Dane historyczne
                </ComparisonTypeButton>
                <ComparisonTypeButton 
                  selected={comparisonType === 'competitors'} 
                  onClick={() => setComparisonType('competitors')}
                >
                  Konkurencja
                </ComparisonTypeButton>
              </ComparisonTypeContainer>
            </FormGroup>
            
            <FormGroup>
              <Label>Zakres czasu</Label>
              <TimeRangeContainer>
                <TimeRangeButton 
                  selected={timeRange === 'month'} 
                  onClick={() => setTimeRange('month')}
                >
                  Miesiąc
                </TimeRangeButton>
                <TimeRangeButton 
                  selected={timeRange === 'quarter'} 
                  onClick={() => setTimeRange('quarter')}
                >
                  Kwartał
                </TimeRangeButton>
                <TimeRangeButton 
                  selected={timeRange === 'year'} 
                  onClick={() => setTimeRange('year')}
                >
                  Rok
                </TimeRangeButton>
              </TimeRangeContainer>
            </FormGroup>
            
            <ButtonGroup>
              <Button onClick={handleRunBenchmark}>Uruchom benchmark</Button>
            </ButtonGroup>
          </CardContent>
        </Card>
        
        {benchmarkResults.length > 0 && (
          <Card>
            <CardTitle>Wyniki benchmarku</CardTitle>
            <CardContent>
              <BenchmarkResultsContainer>
                <BenchmarkResultsTitle>Porównanie z {
                  comparisonType === 'industry' ? 'standardami branżowymi' :
                  comparisonType === 'historical' ? 'danymi historycznymi' :
                  'konkurencją'
                } za ostatni {
                  timeRange === 'month' ? 'miesiąc' :
                  timeRange === 'quarter' ? 'kwartał' :
                  'rok'
                }</BenchmarkResultsTitle>
                
                <BenchmarkResultsGrid>
                  {benchmarkResults.map(result => (
                    <BenchmarkResultCard key={result.id} performance={result.performance}>
                      <BenchmarkResultTitle>{result.metricName}</BenchmarkResultTitle>
                      <BenchmarkResultValue>{result.fleetValue}</BenchmarkResultValue>
                      <BenchmarkResultComparison>
                        {result.difference > 0 ? (
                          <span>O {result.difference.toFixed(1)}% wyższe niż {
                            comparisonType === 'industry' ? 'średnia branżowa' :
                            comparisonType === 'historical' ? 'poprzednio' :
                            'konkurencja'
                          } ({result.comparisonValue})</span>
                        ) : (
                          <span>O {Math.abs(result.difference).toFixed(1)}% niższe niż {
                            comparisonType === 'industry' ? 'średnia branżowa' :
                            comparisonType === 'historical' ? 'poprzednio' :
                            'konkurencja'
                          } ({result.comparisonValue})</span>
                        )}
                      </BenchmarkResultComparison>
                      <BenchmarkResultTrend trend={result.trend}>
                        {result.trend === 'up' ? (
                          <>
                            <span>↑</span>
                            <span>Trend wzrostowy</span>
                          </>
                        ) : result.trend === 'down' ? (
                          <>
                            <span>↓</span>
                            <span>Trend spadkowy</span>
                          </>
                        ) : (
                          <>
                            <span>→</span>
                            <span>Trend stabilny</span>
                          </>
                        )}
                      </BenchmarkResultTrend>
                    </BenchmarkResultCard>
                  ))}
                </BenchmarkResultsGrid>
                
                <ChartContainer>
                  <ChartTitle>Porównanie metryk</ChartTitle>
                  <ChartContent>
                    Wykres porównawczy metryk
                  </ChartContent>
                </ChartContainer>
                
                <ButtonGroup>
                  <SecondaryButton>Eksportuj wyniki</SecondaryButton>
                  <Button onClick={handleSaveBenchmark}>Zapisz benchmark</Button>
                </ButtonGroup>
              </BenchmarkResultsContainer>
            </CardContent>
          </Card>
        )}
      </>
    );
  };
  
  // Renderowanie zakładki zapisanych benchmarków
  const renderSavedTab = () => {
    return (
      <Card>
        <CardTitle>Zapisane benchmarki</CardTitle>
        <CardContent>
          {savedBenchmarks.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
              Brak zapisanych benchmarków
            </div>
          ) : (
            <SavedBenchmarksList>
              {savedBenchmarks.map(benchmark => (
                <SavedBenchmarkItem key={benchmark.id}>
                  <SavedBenchmarkHeader>
                    <SavedBenchmarkTitle>{benchmark.name}</SavedBenchmarkTitle>
                    <SavedBenchmarkDate>Utworzono: {formatDate(benchmark.createdAt)}</SavedBenchmarkDate>
                  </SavedBenchmarkHeader>
                  
                  <SavedBenchmarkDescription>{benchmark.description}</SavedBenchmarkDescription>
                  
                  <div style={{ marginBottom: '16px' }}>
                    <div><strong>Typ porównania:</strong> {
                      benchmark.comparisonType === 'industry' ? 'Standardy branżowe' :
                      benchmark.comparisonType === 'historical' ? 'Dane historyczne' :
                      'Konkurencja'
                    }</div>
                    <div><strong>Zakres czasu:</strong> {
                      benchmark.timeRange === 'month' ? 'Miesiąc' :
                      benchmark.timeRange === 'quarter' ? 'Kwartał' :
                      'Rok'
                    }</div>
                    <div><strong>Ostatnie uruchomienie:</strong> {formatDate(benchmark.lastRun)}</div>
                  </div>
                  
                  <SavedBenchmarkActions>
                    <ActionButton onClick={() => handleRunBenchmark()}>Uruchom ponownie</ActionButton>
                    <ActionButton onClick={() => setActiveTab('create')}>Edytuj</ActionButton>
                    
                    <div style={{ position: 'relative' }}>
                      <ActionButton onClick={() => handleExportBenchmark(benchmark.id)}>Eksportuj</ActionButton>
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
                  </SavedBenchmarkActions>
                </SavedBenchmarkItem>
              ))}
            </SavedBenchmarksList>
          )}
        </CardContent>
      </Card>
    );
  };
  
  // Renderowanie zakładki spostrzeżeń
  const renderInsightsTab = () => {
    return (
      <Card>
        <CardTitle>Spostrzeżenia i rekomendacje</CardTitle>
        <CardContent>
          {insights.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
              Brak spostrzeżeń
            </div>
          ) : (
            <div>
              {insights.map(insight => (
                <InsightCard key={insight.id}>
                  <InsightTitle>
                    {insight.severity === 'high' ? '🔴' : 
                     insight.severity === 'medium' ? '🟠' : 
                     '🟢'} 
                    {insight.title}
                  </InsightTitle>
                  <InsightContent>{insight.content}</InsightContent>
                  <InsightAction>Rekomendacja: {insight.action}</InsightAction>
                </InsightCard>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    );
  };
  
  return (
    <Container>
      <Header>
        <Title>Narzędzie benchmarkingu</Title>
      </Header>
      
      <TabsContainer>
        <Tab 
          active={activeTab === 'create'} 
          onClick={() => setActiveTab('create')}
        >
          Utwórz benchmark
        </Tab>
        <Tab 
          active={activeTab === 'saved'} 
          onClick={() => setActiveTab('saved')}
        >
          Zapisane benchmarki
        </Tab>
        <Tab 
          active={activeTab === 'insights'} 
          onClick={() => setActiveTab('insights')}
        >
          Spostrzeżenia
        </Tab>
      </TabsContainer>
      
      {activeTab === 'create' && renderCreateTab()}
      {activeTab === 'saved' && renderSavedTab()}
      {activeTab === 'insights' && renderInsightsTab()}
    </Container>
  );
};

export default BenchmarkingTool;
