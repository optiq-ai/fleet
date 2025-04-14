import React from 'react';
import styled from 'styled-components';
import { Alert, Stop, Route, Vehicle } from '../../types';

interface AutonomousDispatchProps {
  onDispatch: (plan: any) => Promise<void>;
}

// Styled components
const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  margin-bottom: 24px;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
`;

const CardHeader = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 500;
`;

const CardContent = styled.div`
  padding: 20px;
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

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const MapContainer = styled.div`
  height: 500px;
  background-color: #f5f5f5;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
`;

const MapPlaceholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 14px;
`;

const FormSection = styled.div`
  margin-bottom: 24px;
`;

const FormTitle = styled.h4`
  margin-bottom: 16px;
  font-weight: 500;
`;

const FormRow = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #3f51b5;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: #3f51b5;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #3f51b5;
  }
`;

const Button = styled.button<{ primary?: boolean }>`
  padding: 10px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  background-color: ${props => props.primary ? '#3f51b5' : '#f5f5f5'};
  color: ${props => props.primary ? 'white' : '#333'};
  
  &:hover {
    background-color: ${props => props.primary ? '#303f9f' : '#e0e0e0'};
  }
  
  &:disabled {
    background-color: #e0e0e0;
    color: #999;
    cursor: not-allowed;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
`;

const StopsList = styled.div`
  margin-top: 16px;
`;

const StopItem = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 12px;
  border: 1px solid #eee;
  border-radius: 4px;
  margin-bottom: 8px;
  
  &:hover {
    background-color: #f9f9f9;
  }
`;

const StopNumber = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #3f51b5;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  margin-right: 12px;
  flex-shrink: 0;
`;

const StopDetails = styled.div`
  flex: 1;
`;

const StopAddress = styled.div`
  font-weight: 500;
  margin-bottom: 4px;
`;

const StopInfo = styled.div`
  font-size: 12px;
  color: #666;
`;

const StopActions = styled.div`
  display: flex;
  gap: 8px;
  margin-left: 12px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: #f0f0f0;
  }
  
  svg {
    width: 18px;
    height: 18px;
    fill: #666;
  }
`;

const RoutesList = styled.div`
  margin-top: 16px;
`;

const RouteItem = styled.div`
  border: 1px solid #eee;
  border-radius: 4px;
  margin-bottom: 16px;
  overflow: hidden;
`;

const RouteHeader = styled.div`
  padding: 12px;
  background-color: #f5f5f5;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RouteTitle = styled.div`
  font-weight: 500;
`;

const RouteDetails = styled.div`
  padding: 12px;
  font-size: 14px;
  
  & > div {
    margin-bottom: 4px;
  }
`;

const Badge = styled.span<{ color?: string }>`
  display: inline-block;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  background-color: ${props => {
    switch(props.color) {
      case 'green': return '#e8f5e9';
      case 'blue': return '#e3f2fd';
      case 'orange': return '#fff3e0';
      case 'red': return '#ffebee';
      default: return '#f5f5f5';
    }
  }};
  color: ${props => {
    switch(props.color) {
      case 'green': return '#2e7d32';
      case 'blue': return '#1565c0';
      case 'orange': return '#ef6c00';
      case 'red': return '#c62828';
      default: return '#757575';
    }
  }};
  margin-left: 8px;
`;

const AlertsList = styled.div`
  margin-top: 16px;
`;

const AlertItem = styled.div<{ severity: 'low' | 'medium' | 'high' }>`
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 8px;
  background-color: ${props => 
    props.severity === 'high' ? '#ffebee' : 
    props.severity === 'medium' ? '#fff8e1' : 
    '#e8f5e9'
  };
  border-left: 4px solid ${props => 
    props.severity === 'high' ? '#f44336' : 
    props.severity === 'medium' ? '#ffc107' : 
    '#4caf50'
  };
`;

const AlertHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const AlertTitle = styled.div`
  font-weight: 500;
`;

const AlertTime = styled.div`
  font-size: 12px;
  color: #666;
`;

const AlertDetails = styled.div`
  font-size: 14px;
  color: #666;
`;

const Divider = styled.div`
  height: 1px;
  background-color: #eee;
  margin: 24px 0;
`;

const InfoBox = styled.div`
  background-color: #e3f2fd;
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 24px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  
  svg {
    width: 24px;
    height: 24px;
    fill: #1565c0;
    flex-shrink: 0;
    margin-top: 2px;
  }
`;

const InfoContent = styled.div`
  flex: 1;
`;

const InfoTitle = styled.div`
  font-weight: 500;
  margin-bottom: 4px;
  color: #1565c0;
`;

const InfoText = styled.div`
  font-size: 14px;
  color: #333;
`;

const ProgressContainer = styled.div`
  margin-top: 24px;
`;

const ProgressSteps = styled.div`
  display: flex;
  margin-bottom: 24px;
`;

const ProgressStep = styled.div<{ active: boolean; completed: boolean }>`
  flex: 1;
  text-align: center;
  position: relative;
  
  &:not(:last-child):after {
    content: '';
    position: absolute;
    top: 12px;
    left: calc(50% + 16px);
    right: calc(50% - 16px);
    height: 2px;
    background-color: ${props => props.completed ? '#4caf50' : '#e0e0e0'};
    z-index: 1;
  }
`;

const StepCircle = styled.div<{ active: boolean; completed: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${props => 
    props.completed ? '#4caf50' : 
    props.active ? '#3f51b5' : 
    '#e0e0e0'
  };
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 8px;
  position: relative;
  z-index: 2;
  
  svg {
    width: 16px;
    height: 16px;
    fill: white;
  }
`;

const StepLabel = styled.div<{ active: boolean; completed: boolean }>`
  font-size: 12px;
  color: ${props => 
    props.completed ? '#4caf50' : 
    props.active ? '#3f51b5' : 
    '#999'
  };
  font-weight: ${props => (props.active || props.completed) ? '500' : 'normal'};
`;

// Define interfaces for the component's state
interface DispatchStop extends Stop {
  id: string;
  address: string;
  timeWindow: string;
  notes: string;
}

interface DispatchRoute extends Route {
  id: string;
  vehicle: Vehicle;
  stops: DispatchStop[];
  distance: number;
  duration: number;
  startTime: string;
  endTime: string;
}

interface DispatchPlan {
  id: string;
  name: string;
  date: string;
  routes: DispatchRoute[];
  totalDistance: number;
  totalDuration: number;
  vehicleCount: number;
  stopCount: number;
}

const AutonomousDispatch: React.FC<AutonomousDispatchProps> = ({ onDispatch }) => {
  const [activeTab, setActiveTab] = React.useState<'create' | 'view'>('create');
  const [step, setStep] = React.useState<number>(1);
  const [isGenerating, setIsGenerating] = React.useState<boolean>(false);
  const [isOptimizing, setIsOptimizing] = React.useState<boolean>(false);
  
  // Form state
  const [date, setDate] = React.useState<string>('');
  const [stops, setStops] = React.useState<DispatchStop[]>([]);
  const [vehicles, setVehicles] = React.useState<Vehicle[]>([]);
  const [constraints, setConstraints] = React.useState<string>('');
  
  // Generated plans
  const [generatedPlans, setGeneratedPlans] = React.useState<DispatchPlan[]>([]);
  const [selectedPlan, setSelectedPlan] = React.useState<DispatchPlan | null>(null);
  
  // Alerts
  const [alerts, setAlerts] = React.useState<Alert[]>([]);
  
  // Sample data for demonstration
  React.useEffect(() => {
    // Sample vehicles
    setVehicles([
      { id: 'v1', registrationNumber: 'WA12345', make: 'Volvo', model: 'FH16', year: 2022, status: 'active' },
      { id: 'v2', registrationNumber: 'WA67890', make: 'Mercedes', model: 'Actros', year: 2021, status: 'active' },
      { id: 'v3', registrationNumber: 'WA54321', make: 'Scania', model: 'R450', year: 2023, status: 'active' }
    ]);
    
    // Sample stops
    setStops([
      { id: 's1', address: 'ul. Marszałkowska 10, Warszawa', timeWindow: '8:00 - 10:00', notes: 'Dostawa towaru' },
      { id: 's2', address: 'ul. Puławska 25, Warszawa', timeWindow: '9:00 - 11:00', notes: 'Odbiór przesyłki' },
      { id: 's3', address: 'ul. Wołoska 5, Warszawa', timeWindow: '10:00 - 12:00', notes: 'Dostawa paczek' },
      { id: 's4', address: 'ul. Świętokrzyska 31, Warszawa', timeWindow: '12:00 - 14:00', notes: 'Odbiór dokumentów' },
      { id: 's5', address: 'ul. Mokotowska 15, Warszawa', timeWindow: '13:00 - 15:00', notes: 'Dostawa materiałów' }
    ]);
    
    // Sample alerts
    setAlerts([
      { 
        id: 'a1', 
        title: 'Wykryto korki na trasie', 
        details: 'Możliwe opóźnienia na trasie Volvo FH16 (WA12345) z powodu korków na ul. Marszałkowskiej.', 
        severity: 'medium',
        timestamp: new Date().toISOString()
      },
      { 
        id: 'a2', 
        title: 'Konflikt czasowy', 
        details: 'Wykryto potencjalny konflikt czasowy dla pojazdu Mercedes Actros (WA67890). Przybycie do punktu może nastąpić po zamknięciu okna czasowego.', 
        severity: 'high',
        timestamp: new Date().toISOString()
      }
    ]);
    
    // Set default date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setDate(tomorrow.toISOString().split('T')[0]);
  }, []);
  
  // Generate sample plans
  const generatePlans = () => {
    setIsGenerating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const plans: DispatchPlan[] = [
        {
          id: 'plan1',
          name: 'Plan optymalny',
          date: date,
          routes: [
            {
              id: 'r1',
              vehicle: vehicles[0],
              stops: [stops[0], stops[2], stops[4]],
              distance: 15.3,
              duration: 75,
              startTime: '08:00',
              endTime: '14:30'
            },
            {
              id: 'r2',
              vehicle: vehicles[1],
              stops: [stops[1], stops[3]],
              distance: 12.7,
              duration: 65,
              startTime: '09:00',
              endTime: '13:45'
            }
          ],
          totalDistance: 28.0,
          totalDuration: 140,
          vehicleCount: 2,
          stopCount: 5
        },
        {
          id: 'plan2',
          name: 'Plan alternatywny',
          date: date,
          routes: [
            {
              id: 'r3',
              vehicle: vehicles[0],
              stops: [stops[0], stops[1]],
              distance: 8.5,
              duration: 45,
              startTime: '08:00',
              endTime: '11:30'
            },
            {
              id: 'r4',
              vehicle: vehicles[1],
              stops: [stops[2], stops[3]],
              distance: 10.2,
              duration: 55,
              startTime: '10:00',
              endTime: '13:15'
            },
            {
              id: 'r5',
              vehicle: vehicles[2],
              stops: [stops[4]],
              distance: 6.8,
              duration: 30,
              startTime: '13:00',
              endTime: '15:30'
            }
          ],
          totalDistance: 25.5,
          totalDuration: 130,
          vehicleCount: 3,
          stopCount: 5
        }
      ];
      
      setGeneratedPlans(plans);
      setSelectedPlan(plans[0]);
      setIsGenerating(false);
      setStep(2);
    }, 2000);
  };
  
  // Optimize selected plan
  const optimizePlan = () => {
    if (!selectedPlan) return;
    
    setIsOptimizing(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const optimizedPlan: DispatchPlan = {
        ...selectedPlan,
        name: 'Plan zoptymalizowany',
        totalDistance: selectedPlan.totalDistance * 0.9,
        totalDuration: selectedPlan.totalDuration * 0.85,
        routes: selectedPlan.routes.map(route => ({
          ...route,
          distance: route.distance * 0.9,
          duration: route.duration * 0.85
        }))
      };
      
      setSelectedPlan(optimizedPlan);
      setIsOptimizing(false);
      setStep(3);
    }, 2000);
  };
  
  // Dispatch the selected plan
  const dispatchSelectedPlan = async () => {
    if (!selectedPlan) return;
    
    try {
      await onDispatch(selectedPlan);
      setStep(4);
    } catch (error) {
      console.error('Error dispatching plan:', error);
      // Handle error
    }
  };
  
  // Add a new stop
  const addStop = () => {
    const newStop: DispatchStop = {
      id: `s${stops.length + 1}`,
      address: '',
      timeWindow: '',
      notes: ''
    };
    
    setStops([...stops, newStop]);
  };
  
  // Remove a stop
  const removeStop = (stopId: string) => {
    setStops(stops.filter(stop => stop.id !== stopId));
  };
  
  // Format time duration
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };
  
  // Render create tab content
  const renderCreateTab = () => {
    return (
      <>
        <ProgressContainer>
          <ProgressSteps>
            <ProgressStep active={step === 1} completed={step > 1}>
              <StepCircle active={step === 1} completed={step > 1}>
                {step > 1 ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                ) : 1}
              </StepCircle>
              <StepLabel active={step === 1} completed={step > 1}>Dane wejściowe</StepLabel>
            </ProgressStep>
            
            <ProgressStep active={step === 2} completed={step > 2}>
              <StepCircle active={step === 2} completed={step > 2}>
                {step > 2 ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                ) : 2}
              </StepCircle>
              <StepLabel active={step === 2} completed={step > 2}>Wybór planu</StepLabel>
            </ProgressStep>
            
            <ProgressStep active={step === 3} completed={step > 3}>
              <StepCircle active={step === 3} completed={step > 3}>
                {step > 3 ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                ) : 3}
              </StepCircle>
              <StepLabel active={step === 3} completed={step > 3}>Optymalizacja</StepLabel>
            </ProgressStep>
            
            <ProgressStep active={step === 4} completed={step > 4}>
              <StepCircle active={step === 4} completed={step > 4}>
                {step > 4 ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                ) : 4}
              </StepCircle>
              <StepLabel active={step === 4} completed={step > 4}>Wysyłka</StepLabel>
            </ProgressStep>
          </ProgressSteps>
        </ProgressContainer>
        
        {step === 1 && (
          <GridContainer>
            <div>
              <FormSection>
                <FormTitle>Informacje podstawowe</FormTitle>
                <FormRow>
                  <Label htmlFor="date">Data</Label>
                  <Input 
                    id="date" 
                    type="date" 
                    value={date} 
                    onChange={e => setDate(e.target.value)} 
                  />
                </FormRow>
              </FormSection>
              
              <FormSection>
                <FormTitle>Przystanki</FormTitle>
                {stops.map((stop, index) => (
                  <StopItem key={stop.id}>
                    <StopNumber>{index + 1}</StopNumber>
                    <StopDetails>
                      <FormRow>
                        <Label htmlFor={`address-${stop.id}`}>Adres</Label>
                        <Input 
                          id={`address-${stop.id}`} 
                          value={stop.address} 
                          onChange={e => {
                            const updatedStops = [...stops];
                            updatedStops[index].address = e.target.value;
                            setStops(updatedStops);
                          }} 
                        />
                      </FormRow>
                      <FormRow>
                        <Label htmlFor={`timeWindow-${stop.id}`}>Okno czasowe</Label>
                        <Input 
                          id={`timeWindow-${stop.id}`} 
                          value={stop.timeWindow} 
                          placeholder="np. 8:00 - 10:00" 
                          onChange={e => {
                            const updatedStops = [...stops];
                            updatedStops[index].timeWindow = e.target.value;
                            setStops(updatedStops);
                          }} 
                        />
                      </FormRow>
                      <FormRow>
                        <Label htmlFor={`notes-${stop.id}`}>Uwagi</Label>
                        <Input 
                          id={`notes-${stop.id}`} 
                          value={stop.notes} 
                          onChange={e => {
                            const updatedStops = [...stops];
                            updatedStops[index].notes = e.target.value;
                            setStops(updatedStops);
                          }} 
                        />
                      </FormRow>
                    </StopDetails>
                    <StopActions>
                      <IconButton onClick={() => removeStop(stop.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                          <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                        </svg>
                      </IconButton>
                    </StopActions>
                  </StopItem>
                ))}
                <Button onClick={addStop}>+ Dodaj przystanek</Button>
              </FormSection>
              
              <FormSection>
                <FormTitle>Dodatkowe ograniczenia</FormTitle>
                <FormRow>
                  <Label htmlFor="constraints">Ograniczenia (opcjonalnie)</Label>
                  <Textarea 
                    id="constraints" 
                    value={constraints} 
                    onChange={e => setConstraints(e.target.value)} 
                    placeholder="Np. Kierowca Jan może obsługiwać tylko trasy na północy miasta. Pojazd WA12345 ma ograniczenie tonażu."
                  />
                </FormRow>
              </FormSection>
              
              <ButtonGroup>
                <Button onClick={() => setActiveTab('view')}>Anuluj</Button>
                <Button 
                  primary 
                  onClick={generatePlans}
                  disabled={isGenerating || stops.length === 0 || !date}
                >
                  {isGenerating ? 'Generowanie...' : 'Wygeneruj plany'}
                </Button>
              </ButtonGroup>
            </div>
            
            <div>
              <MapContainer>
                <MapPlaceholder>
                  Mapa z wizualizacją przystanków zostanie wyświetlona tutaj
                </MapPlaceholder>
              </MapContainer>
              
              <InfoBox>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                </svg>
                <InfoContent>
                  <InfoTitle>Autonomiczne planowanie tras</InfoTitle>
                  <InfoText>
                    System wykorzystuje sztuczną inteligencję do automatycznego planowania optymalnych tras dla floty pojazdów.
                    Wystarczy podać listę przystanków, a system zaproponuje najlepsze rozwiązanie, uwzględniając czas przejazdu,
                    odległości, okna czasowe i inne ograniczenia.
                  </InfoText>
                </InfoContent>
              </InfoBox>
              
              {alerts.length > 0 && (
                <>
                  <FormTitle>Alerty</FormTitle>
                  <AlertsList>
                    {alerts.map(alert => (
                      <AlertItem key={alert.id} severity={alert.severity}>
                        <AlertHeader>
                          <AlertTitle>{alert.title}</AlertTitle>
                          <AlertTime>{new Date(alert.timestamp).toLocaleTimeString()}</AlertTime>
                        </AlertHeader>
                        <AlertDetails>{alert.details}</AlertDetails>
                      </AlertItem>
                    ))}
                  </AlertsList>
                </>
              )}
            </div>
          </GridContainer>
        )}
        
        {step === 2 && (
          <>
            <InfoBox>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
              </svg>
              <InfoContent>
                <InfoTitle>Wybierz plan</InfoTitle>
                <InfoText>
                  System wygenerował kilka wariantów planu. Wybierz ten, który najlepiej odpowiada Twoim potrzebom.
                  Możesz również zoptymalizować wybrany plan, aby jeszcze bardziej poprawić jego efektywność.
                </InfoText>
              </InfoContent>
            </InfoBox>
            
            <GridContainer>
              <div>
                <FormTitle>Wygenerowane plany</FormTitle>
                {generatedPlans.map(plan => (
                  <Card key={plan.id} style={{ cursor: 'pointer' }} onClick={() => setSelectedPlan(plan)}>
                    <CardHeader>
                      <CardTitle>{plan.name}</CardTitle>
                      {selectedPlan?.id === plan.id && (
                        <Badge color="blue">Wybrano</Badge>
                      )}
                    </CardHeader>
                    <CardContent>
                      <div><strong>Data:</strong> {plan.date}</div>
                      <div><strong>Liczba pojazdów:</strong> {plan.vehicleCount}</div>
                      <div><strong>Liczba przystanków:</strong> {plan.stopCount}</div>
                      <div><strong>Całkowita odległość:</strong> {plan.totalDistance.toFixed(1)} km</div>
                      <div><strong>Całkowity czas:</strong> {formatDuration(plan.totalDuration)}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div>
                {selectedPlan && (
                  <>
                    <FormTitle>Szczegóły planu</FormTitle>
                    <Card>
                      <CardHeader>
                        <CardTitle>{selectedPlan.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div><strong>Data:</strong> {selectedPlan.date}</div>
                        <Divider />
                        
                        <h5>Trasy</h5>
                        <RoutesList>
                          {selectedPlan.routes.map(route => (
                            <RouteItem key={route.id}>
                              <RouteHeader>
                                <RouteTitle>{route.vehicle.make} {route.vehicle.model}</RouteTitle>
                                <div>{route.vehicle.registrationNumber}</div>
                              </RouteHeader>
                              <RouteDetails>
                                <div><strong>Czas rozpoczęcia:</strong> {route.startTime}</div>
                                <div><strong>Czas zakończenia:</strong> {route.endTime}</div>
                                <div><strong>Odległość:</strong> {route.distance.toFixed(1)} km</div>
                                <div><strong>Czas trwania:</strong> {formatDuration(route.duration)}</div>
                              </RouteDetails>
                              <StopsList>
                                {route.stops.map((stop, index) => (
                                  <StopItem key={stop.id}>
                                    <StopNumber>{index + 1}</StopNumber>
                                    <StopDetails>
                                      <StopAddress>{stop.address}</StopAddress>
                                      <StopInfo>
                                        <div><strong>Okno czasowe:</strong> {stop.timeWindow}</div>
                                        {stop.notes && <div><strong>Uwagi:</strong> {stop.notes}</div>}
                                      </StopInfo>
                                    </StopDetails>
                                  </StopItem>
                                ))}
                              </StopsList>
                            </RouteItem>
                          ))}
                        </RoutesList>
                      </CardContent>
                    </Card>
                    
                    <ButtonGroup>
                      <Button onClick={() => setStep(1)}>Wróć</Button>
                      <Button 
                        primary 
                        onClick={optimizePlan}
                        disabled={isOptimizing}
                      >
                        {isOptimizing ? 'Optymalizacja...' : 'Optymalizuj plan'}
                      </Button>
                    </ButtonGroup>
                  </>
                )}
              </div>
            </GridContainer>
          </>
        )}
        
        {step === 3 && selectedPlan && (
          <>
            <InfoBox>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
              </svg>
              <InfoContent>
                <InfoTitle>Plan zoptymalizowany</InfoTitle>
                <InfoText>
                  System zoptymalizował wybrany plan, uwzględniając aktualne warunki drogowe, prognozy ruchu i inne czynniki.
                  Możesz teraz wysłać plan do realizacji lub wrócić do poprzednich kroków, aby wprowadzić zmiany.
                </InfoText>
              </InfoContent>
            </InfoBox>
            
            <GridContainer>
              <div>
                <MapContainer>
                  <MapPlaceholder>
                    Mapa z wizualizacją zoptymalizowanych tras zostanie wyświetlona tutaj
                  </MapPlaceholder>
                </MapContainer>
              </div>
              
              <div>
                <FormTitle>Szczegóły zoptymalizowanego planu</FormTitle>
                <Card>
                  <CardHeader>
                    <CardTitle>{selectedPlan.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div><strong>Data:</strong> {selectedPlan.date}</div>
                    <div><strong>Całkowita odległość:</strong> {selectedPlan.totalDistance.toFixed(1)} km</div>
                    <div><strong>Całkowity czas:</strong> {formatDuration(selectedPlan.totalDuration)}</div>
                    <Divider />
                    
                    <h5>Trasy</h5>
                    <RoutesList>
                      {selectedPlan.routes.map(route => (
                        <RouteItem key={route.id}>
                          <RouteHeader>
                            <RouteTitle>{route.vehicle.name}</RouteTitle>
                            <div>{route.vehicle.registrationNumber}</div>
                          </RouteHeader>
                          <RouteDetails>
                            <div><strong>Czas rozpoczęcia:</strong> {route.startTime}</div>
                            <div><strong>Czas zakończenia:</strong> {route.endTime}</div>
                            <div><strong>Odległość:</strong> {route.distance.toFixed(1)} km</div>
                            <div><strong>Czas trwania:</strong> {formatDuration(route.duration)}</div>
                          </RouteDetails>
                          <StopsList>
                            {route.stops.map((stop, index) => (
                              <StopItem key={stop.id}>
                                <StopNumber>{index + 1}</StopNumber>
                                <StopDetails>
                                  <StopAddress>{stop.address}</StopAddress>
                                  <StopInfo>
                                    <div><strong>Okno czasowe:</strong> {stop.timeWindow}</div>
                                    {stop.notes && <div><strong>Uwagi:</strong> {stop.notes}</div>}
                                  </StopInfo>
                                </StopDetails>
                              </StopItem>
                            ))}
                          </StopsList>
                        </RouteItem>
                      ))}
                    </RoutesList>
                  </CardContent>
                </Card>
                
                <ButtonGroup>
                  <Button onClick={() => setStep(2)}>Wróć</Button>
                  <Button primary onClick={dispatchSelectedPlan}>
                    Wyślij plan do realizacji
                  </Button>
                </ButtonGroup>
              </div>
            </GridContainer>
          </>
        )}
        
        {step === 4 && (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ width: '64px', height: '64px', fill: '#4caf50', margin: '0 auto 24px' }}>
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            <h2 style={{ marginBottom: '16px' }}>Plan został wysłany do realizacji</h2>
            <p style={{ fontSize: '16px', color: '#666', marginBottom: '32px' }}>
              Kierowcy otrzymali powiadomienia o nowych trasach. Możesz śledzić postęp realizacji w zakładce "Podgląd".
            </p>
            <Button primary onClick={() => setActiveTab('view')}>
              Przejdź do podglądu
            </Button>
          </div>
        )}
      </>
    );
  };
  
  // Render view tab content
  const renderViewTab = () => {
    return (
      <div>
        <InfoBox>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
          </svg>
          <InfoContent>
            <InfoTitle>Podgląd tras</InfoTitle>
            <InfoText>
              W tej sekcji możesz przeglądać aktywne trasy, śledzić postęp realizacji i reagować na alerty.
              Funkcja podglądu będzie dostępna wkrótce.
            </InfoText>
          </InfoContent>
        </InfoBox>
        
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <p style={{ fontSize: '16px', color: '#666', marginBottom: '32px' }}>
            Funkcja podglądu tras jest w trakcie implementacji i będzie dostępna wkrótce.
          </p>
          <Button primary onClick={() => setActiveTab('create')}>
            Utwórz nowy plan
          </Button>
        </div>
      </div>
    );
  };
  
  return (
    <Container>
      <Title>Autonomiczna wysyłka</Title>
      
      <Card>
        <TabsContainer>
          <Tab 
            active={activeTab === 'create'} 
            onClick={() => setActiveTab('create')}
          >
            Utwórz plan
          </Tab>
          <Tab 
            active={activeTab === 'view'} 
            onClick={() => setActiveTab('view')}
          >
            Podgląd
          </Tab>
        </TabsContainer>
        
        <CardContent>
          {activeTab === 'create' && renderCreateTab()}
          {activeTab === 'view' && renderViewTab()}
        </CardContent>
      </Card>
    </Container>
  );
};

export default AutonomousDispatch;
