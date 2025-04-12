import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface AutonomousDispatchProps {
  vehicles: any[];
  orders: any[];
  onDispatchPlan: (plan: any) => Promise<void>;
  onApproveDispatch: (planId: string) => Promise<void>;
  onRejectDispatch: (planId: string, reason: string) => Promise<void>;
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

const ActionButton = styled.button`
  padding: 8px 16px;
  background-color: #3f51b5;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #303f9f;
  }
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

const MetricsGrid = styled.div`
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

const MetricCard = styled.div`
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const MetricValue = styled.div`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 8px;
`;

const MetricLabel = styled.div`
  font-size: 14px;
  color: #666;
`;

const DispatchPlanCard = styled.div`
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
`;

const PlanHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`;

const PlanTitle = styled.div`
  font-weight: 500;
`;

const PlanMeta = styled.div`
  font-size: 14px;
  color: #666;
`;

const PlanDetails = styled.div`
  margin-bottom: 16px;
`;

const PlanMetrics = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  flex-wrap: wrap;
`;

const PlanMetric = styled.div`
  background-color: white;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PlanActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const ApproveButton = styled.button`
  padding: 8px 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #388e3c;
  }
`;

const RejectButton = styled.button`
  padding: 8px 16px;
  background-color: white;
  color: #f44336;
  border: 1px solid #f44336;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #ffebee;
  }
`;

const DetailsButton = styled.button`
  padding: 8px 16px;
  background-color: white;
  color: #3f51b5;
  border: 1px solid #3f51b5;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #e8eaf6;
  }
`;

const RoutesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const RouteItem = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const RouteHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const RouteTitle = styled.div`
  font-weight: 500;
`;

const RouteDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 12px;
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const RouteDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const DetailLabel = styled.div`
  font-size: 12px;
  color: #666;
`;

const DetailValue = styled.div`
  font-weight: 500;
`;

const StopsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 12px;
`;

const StopItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  border-bottom: 1px solid #e0e0e0;
  
  &:last-child {
    border-bottom: none;
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
  font-size: 12px;
  font-weight: 500;
`;

const StopDetails = styled.div`
  flex: 1;
`;

const StopAddress = styled.div`
  font-weight: 500;
  margin-bottom: 4px;
`;

const StopTime = styled.div`
  font-size: 12px;
  color: #666;
`;

const StopType = styled.div<{ type: 'pickup' | 'delivery' }>`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  background-color: ${props => props.type === 'pickup' ? '#e8f5e9' : '#e3f2fd'};
  color: ${props => props.type === 'pickup' ? '#2e7d32' : '#1976d2'};
`;

const MapContainer = styled.div`
  height: 400px;
  background-color: #e9e9e9;
  border-radius: 8px;
  margin-bottom: 20px;
  position: relative;
`;

const MapOverlay = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 12px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const ModalOverlay = styled.div`
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
  width: 600px;
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

const ModalHeader = styled.div`
  padding: 16px;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 500;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #666;
  
  &:hover {
    color: #333;
  }
`;

const ModalBody = styled.div`
  padding: 16px;
`;

const ModalFooter = styled.div`
  padding: 16px;
  border-top: 1px solid #e0e0e0;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-height: 100px;
  margin-bottom: 16px;
  
  &:focus {
    border-color: #3f51b5;
    outline: none;
  }
`;

const AutonomousDispatch: React.FC<AutonomousDispatchProps> = ({
  vehicles,
  orders,
  onDispatchPlan,
  onApproveDispatch,
  onRejectDispatch
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'plans' | 'routes'>('dashboard');
  const [dispatchPlans, setDispatchPlans] = useState<any[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<any | null>(null);
  const [showRejectModal, setShowRejectModal] = useState<boolean>(false);
  const [rejectReason, setRejectReason] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  
  // Przykładowe dane
  useEffect(() => {
    // Symulacja pobrania planów wysyłki
    const samplePlans = [
      {
        id: 'plan1',
        title: 'Plan wysyłki - 12.04.2025',
        timestamp: '2025-04-12T08:30:00Z',
        status: 'pending',
        vehiclesCount: 12,
        ordersCount: 45,
        totalDistance: 1250,
        fuelSavings: 15.2,
        co2Reduction: 320,
        routes: [
          {
            id: 'route1',
            vehicle: {
              id: 'v1',
              name: 'Ciężarówka #1234',
              type: 'Ciężarówka 10t',
              driver: 'Jan Kowalski'
            },
            startTime: '2025-04-12T09:00:00Z',
            endTime: '2025-04-12T17:30:00Z',
            distance: 210,
            stops: [
              {
                id: 'stop1',
                type: 'pickup',
                address: 'Magazyn Centralny, ul. Przemysłowa 10, Warszawa',
                time: '2025-04-12T09:00:00Z',
                orderId: 'order1'
              },
              {
                id: 'stop2',
                type: 'delivery',
                address: 'Centrum Dystrybucyjne, ul. Logistyczna 5, Łódź',
                time: '2025-04-12T11:30:00Z',
                orderId: 'order2'
              },
              {
                id: 'stop3',
                type: 'pickup',
                address: 'Fabryka XYZ, ul. Fabryczna 15, Łódź',
                time: '2025-04-12T12:30:00Z',
                orderId: 'order3'
              },
              {
                id: 'stop4',
                type: 'delivery',
                address: 'Hurtownia ABC, ul. Handlowa 8, Poznań',
                time: '2025-04-12T15:00:00Z',
                orderId: 'order4'
              },
              {
                id: 'stop5',
                type: 'delivery',
                address: 'Sklep Firmowy, ul. Kupiecka 22, Poznań',
                time: '2025-04-12T16:30:00Z',
                orderId: 'order5'
              }
            ]
          },
          {
            id: 'route2',
            vehicle: {
              id: 'v2',
              name: 'Ciężarówka #5678',
              type: 'Ciężarówka 15t',
              driver: 'Anna Nowak'
            },
            startTime: '2025-04-12T08:30:00Z',
            endTime: '2025-04-12T16:00:00Z',
            distance: 180,
            stops: [
              {
                id: 'stop6',
                type: 'pickup',
                address: 'Magazyn Centralny, ul. Przemysłowa 10, Warszawa',
                time: '2025-04-12T08:30:00Z',
                orderId: 'order6'
              },
              {
                id: 'stop7',
                type: 'delivery',
                address: 'Centrum Handlowe, ul. Zakupowa 100, Radom',
                time: '2025-04-12T10:30:00Z',
                orderId: 'order7'
              },
              {
                id: 'stop8',
                type: 'delivery',
                address: 'Supermarket XYZ, ul. Spożywcza 5, Kielce',
                time: '2025-04-12T13:00:00Z',
                orderId: 'order8'
              },
              {
                id: 'stop9',
                type: 'pickup',
                address: 'Producent Żywności, ul. Rolnicza 15, Kielce',
                time: '2025-04-12T14:00:00Z',
                orderId: 'order9'
              }
            ]
          }
        ]
      },
      {
        id: 'plan2',
        title: 'Plan wysyłki - 11.04.2025',
        timestamp: '2025-04-11T08:00:00Z',
        status: 'approved',
        vehiclesCount: 10,
        ordersCount: 38,
        totalDistance: 1120,
        fuelSavings: 12.8,
        co2Reduction: 280,
        routes: []
      },
      {
        id: 'plan3',
        title: 'Plan wysyłki - 10.04.2025',
        timestamp: '2025-04-10T08:15:00Z',
        status: 'completed',
        vehiclesCount: 11,
        ordersCount: 42,
        totalDistance: 1180,
        fuelSavings: 13.5,
        co2Reduction: 295,
        routes: []
      }
    ];
    
    setDispatchPlans(samplePlans);
  }, []);
  
  // Generowanie nowego planu wysyłki
  const handleGeneratePlan = async () => {
    setIsGenerating(true);
    
    try {
      // Symulacja generowania planu
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // W rzeczywistej aplikacji, tutaj byłoby wywołanie API
      // const plan = await onDispatchPlan({...});
      
      // Symulacja nowego planu
      const newPlan = {
        id: `plan${Date.now()}`,
        title: `Plan wysyłki - ${new Date().toLocaleDateString()}`,
        timestamp: new Date().toISOString(),
        status: 'pending',
        vehiclesCount: Math.floor(Math.random() * 5) + 8,
        ordersCount: Math.floor(Math.random() * 20) + 30,
        totalDistance: Math.floor(Math.random() * 300) + 1000,
        fuelSavings: Math.floor(Math.random() * 10) + 10 + Math.random(),
        co2Reduction: Math.floor(Math.random() * 100) + 200,
        routes: []
      };
      
      setDispatchPlans(prev => [newPlan, ...prev]);
      setActiveTab('plans');
    } catch (error) {
      console.error('Error generating dispatch plan:', error);
    } finally {
      setIsGenerating(false);
    }
  };
  
  // Obsługa zatwierdzenia planu
  const handleApprovePlan = async (planId: string) => {
    try {
      await onApproveDispatch(planId);
      
      // Aktualizacja stanu planów
      setDispatchPlans(prev => 
        prev.map(plan => 
          plan.id === planId ? { ...plan, status: 'approved' } : plan
        )
      );
    } catch (error) {
      console.error('Error approving dispatch plan:', error);
    }
  };
  
  // Obsługa odrzucenia planu
  const handleRejectPlan = async () => {
    if (!selectedPlan || !rejectReason.trim()) return;
    
    try {
      await onRejectDispatch(selectedPlan.id, rejectReason);
      
      // Aktualizacja stanu planów
      setDispatchPlans(prev => 
        prev.map(plan => 
          plan.id === selectedPlan.id ? { ...plan, status: 'rejected' } : plan
        )
      );
      
      setShowRejectModal(false);
      setRejectReason('');
      setSelectedPlan(null);
    } catch (error) {
      console.error('Error rejecting dispatch plan:', error);
    }
  };
  
  // Obsługa wyświetlania szczegółów planu
  const handleViewPlanDetails = (plan: any) => {
    setSelectedPlan(plan);
  };
  
  // Formatowanie daty
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  
  // Renderowanie dashboardu
  const renderDashboard = () => {
    // Obliczanie metryk
    const totalVehicles = vehicles.length;
    const activeVehicles = vehicles.filter(v => v.status === 'active').length;
    const pendingOrders = orders.filter(o => o.status === 'pending').length;
    const completedOrders = orders.filter(o => o.status === 'completed').length;
    const totalDistance = dispatchPlans.reduce((sum, plan) => sum + plan.totalDistance, 0);
    const totalFuelSavings = dispatchPlans.reduce((sum, plan) => sum + plan.fuelSavings, 0);
    const totalCO2Reduction = dispatchPlans.reduce((sum, plan) => sum + plan.co2Reduction, 0);
    
    return (
      <>
        <Card>
          <CardTitle>Przegląd floty i zamówień</CardTitle>
          <CardContent>
            <MetricsGrid>
              <MetricCard>
                <MetricValue>{totalVehicles}</MetricValue>
                <MetricLabel>Całkowita liczba pojazdów</MetricLabel>
              </MetricCard>
              <MetricCard>
                <MetricValue>{activeVehicles}</MetricValue>
                <MetricLabel>Aktywne pojazdy</MetricLabel>
              </MetricCard>
              <MetricCard>
                <MetricValue>{pendingOrders}</MetricValue>
                <MetricLabel>Oczekujące zamówienia</MetricLabel>
              </MetricCard>
              <MetricCard>
                <MetricValue>{completedOrders}</MetricValue>
                <MetricLabel>Zrealizowane zamówienia</MetricLabel>
              </MetricCard>
              <MetricCard>
                <MetricValue>{totalDistance.toLocaleString()} km</MetricValue>
                <MetricLabel>Całkowity dystans</MetricLabel>
              </MetricCard>
              <MetricCard>
                <MetricValue>{totalFuelSavings.toFixed(1)}%</MetricValue>
                <MetricLabel>Oszczędność paliwa</MetricLabel>
              </MetricCard>
            </MetricsGrid>
          </CardContent>
        </Card>
        
        <Card>
          <CardTitle>Mapa aktywnych tras</CardTitle>
          <MapContainer>
            {/* Tutaj będzie mapa z Google Maps lub innej biblioteki */}
            <MapOverlay>
              <div>Aktywne pojazdy: {activeVehicles}</div>
              <div>Aktywne trasy: {dispatchPlans.filter(p => p.status === 'approved').length}</div>
            </MapOverlay>
          </MapContainer>
        </Card>
        
        <Card>
          <CardTitle>Ostatnie plany wysyłki</CardTitle>
          <CardContent>
            {dispatchPlans.slice(0, 3).map(plan => (
              <DispatchPlanCard key={plan.id}>
                <PlanHeader>
                  <PlanTitle>{plan.title}</PlanTitle>
                  <PlanMeta>
                    Status: {plan.status === 'pending' ? 'Oczekujący' : 
                             plan.status === 'approved' ? 'Zatwierdzony' : 
                             plan.status === 'rejected' ? 'Odrzucony' : 
                             'Zakończony'}
                  </PlanMeta>
                </PlanHeader>
                <PlanMetrics>
                  <PlanMetric>
                    <span>Pojazdy:</span> {plan.vehiclesCount}
                  </PlanMetric>
                  <PlanMetric>
                    <span>Zamówienia:</span> {plan.ordersCount}
                  </PlanMetric>
                  <PlanMetric>
                    <span>Dystans:</span> {plan.totalDistance} km
                  </PlanMetric>
                  <PlanMetric>
                    <span>Oszczędność paliwa:</span> {plan.fuelSavings.toFixed(1)}%
                  </PlanMetric>
                </PlanMetrics>
                <PlanActions>
                  <DetailsButton onClick={() => handleViewPlanDetails(plan)}>
                    Szczegóły
                  </DetailsButton>
                </PlanActions>
              </DispatchPlanCard>
            ))}
          </CardContent>
        </Card>
      </>
    );
  };
  
  // Renderowanie planów wysyłki
  const renderPlans = () => {
    return (
      <>
        <Card>
          <CardTitle>
            Plany wysyłki
            <ActionButton onClick={handleGeneratePlan} disabled={isGenerating}>
              {isGenerating ? 'Generowanie...' : 'Generuj nowy plan'}
            </ActionButton>
          </CardTitle>
          <CardContent>
            {dispatchPlans.map(plan => (
              <DispatchPlanCard key={plan.id}>
                <PlanHeader>
                  <PlanTitle>{plan.title}</PlanTitle>
                  <PlanMeta>
                    Wygenerowano: {formatDate(plan.timestamp)}
                  </PlanMeta>
                </PlanHeader>
                <PlanDetails>
                  Status: {plan.status === 'pending' ? 'Oczekujący' : 
                           plan.status === 'approved' ? 'Zatwierdzony' : 
                           plan.status === 'rejected' ? 'Odrzucony' : 
                           'Zakończony'}
                </PlanDetails>
                <PlanMetrics>
                  <PlanMetric>
                    <span>Pojazdy:</span> {plan.vehiclesCount}
                  </PlanMetric>
                  <PlanMetric>
                    <span>Zamówienia:</span> {plan.ordersCount}
                  </PlanMetric>
                  <PlanMetric>
                    <span>Dystans:</span> {plan.totalDistance} km
                  </PlanMetric>
                  <PlanMetric>
                    <span>Oszczędność paliwa:</span> {plan.fuelSavings.toFixed(1)}%
                  </PlanMetric>
                  <PlanMetric>
                    <span>Redukcja CO2:</span> {plan.co2Reduction} kg
                  </PlanMetric>
                </PlanMetrics>
                <PlanActions>
                  {plan.status === 'pending' && (
                    <>
                      <ApproveButton onClick={() => handleApprovePlan(plan.id)}>
                        Zatwierdź
                      </ApproveButton>
                      <RejectButton onClick={() => {
                        setSelectedPlan(plan);
                        setShowRejectModal(true);
                      }}>
                        Odrzuć
                      </RejectButton>
                    </>
                  )}
                  <DetailsButton onClick={() => handleViewPlanDetails(plan)}>
                    Szczegóły
                  </DetailsButton>
                </PlanActions>
              </DispatchPlanCard>
            ))}
          </CardContent>
        </Card>
      </>
    );
  };
  
  // Renderowanie tras
  const renderRoutes = () => {
    // Pobieranie wszystkich tras ze wszystkich planów
    const allRoutes = dispatchPlans
      .filter(plan => plan.routes && plan.routes.length > 0)
      .flatMap(plan => plan.routes);
    
    return (
      <>
        <Card>
          <CardTitle>Trasy</CardTitle>
          <MapContainer>
            {/* Tutaj będzie mapa z Google Maps lub innej biblioteki */}
            <MapOverlay>
              <div>Liczba tras: {allRoutes.length}</div>
            </MapOverlay>
          </MapContainer>
          
          <RoutesList>
            {allRoutes.map(route => (
              <RouteItem key={route.id}>
                <RouteHeader>
                  <RouteTitle>{route.vehicle.name}</RouteTitle>
                  <div>Kierowca: {route.vehicle.driver}</div>
                </RouteHeader>
                <RouteDetails>
                  <RouteDetail>
                    <DetailLabel>Czas rozpoczęcia</DetailLabel>
                    <DetailValue>{formatDate(route.startTime)}</DetailValue>
                  </RouteDetail>
                  <RouteDetail>
                    <DetailLabel>Czas zakończenia</DetailLabel>
                    <DetailValue>{formatDate(route.endTime)}</DetailValue>
                  </RouteDetail>
                  <RouteDetail>
                    <DetailLabel>Dystans</DetailLabel>
                    <DetailValue>{route.distance} km</DetailValue>
                  </RouteDetail>
                  <RouteDetail>
                    <DetailLabel>Liczba przystanków</DetailLabel>
                    <DetailValue>{route.stops.length}</DetailValue>
                  </RouteDetail>
                </RouteDetails>
                <StopsList>
                  {route.stops.map((stop, index) => (
                    <StopItem key={stop.id}>
                      <StopNumber>{index + 1}</StopNumber>
                      <StopDetails>
                        <StopAddress>{stop.address}</StopAddress>
                        <StopTime>{formatDate(stop.time)}</StopTime>
                      </StopDetails>
                      <StopType type={stop.type}>
                        {stop.type === 'pickup' ? 'Odbiór' : 'Dostawa'}
                      </StopType>
                    </StopItem>
                  ))}
                </StopsList>
              </RouteItem>
            ))}
          </RoutesList>
        </Card>
      </>
    );
  };
  
  return (
    <Container>
      <Header>
        <Title>Autonomiczna wysyłka</Title>
      </Header>
      
      <TabsContainer>
        <Tab 
          active={activeTab === 'dashboard'} 
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </Tab>
        <Tab 
          active={activeTab === 'plans'} 
          onClick={() => setActiveTab('plans')}
        >
          Plany wysyłki
        </Tab>
        <Tab 
          active={activeTab === 'routes'} 
          onClick={() => setActiveTab('routes')}
        >
          Trasy
        </Tab>
      </TabsContainer>
      
      {activeTab === 'dashboard' && renderDashboard()}
      {activeTab === 'plans' && renderPlans()}
      {activeTab === 'routes' && renderRoutes()}
      
      {/* Modal odrzucania planu */}
      {showRejectModal && (
        <ModalOverlay onClick={() => setShowRejectModal(false)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Odrzuć plan</ModalTitle>
              <CloseButton onClick={() => setShowRejectModal(false)}>×</CloseButton>
            </ModalHeader>
            <ModalBody>
              <p>Podaj powód odrzucenia planu:</p>
              <TextArea 
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Wpisz powód odrzucenia..."
              />
            </ModalBody>
            <ModalFooter>
              <RejectButton 
                onClick={handleRejectPlan}
                disabled={!rejectReason.trim()}
              >
                Odrzuć plan
              </RejectButton>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      )}
      
      {/* Modal szczegółów planu */}
      {selectedPlan && !showRejectModal && (
        <ModalOverlay onClick={() => setSelectedPlan(null)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Szczegóły planu</ModalTitle>
              <CloseButton onClick={() => setSelectedPlan(null)}>×</CloseButton>
            </ModalHeader>
            <ModalBody>
              <h4>{selectedPlan.title}</h4>
              <p>Wygenerowano: {formatDate(selectedPlan.timestamp)}</p>
              <p>Status: {selectedPlan.status === 'pending' ? 'Oczekujący' : 
                          selectedPlan.status === 'approved' ? 'Zatwierdzony' : 
                          selectedPlan.status === 'rejected' ? 'Odrzucony' : 
                          'Zakończony'}</p>
              
              <h5>Metryki</h5>
              <PlanMetrics>
                <PlanMetric>
                  <span>Pojazdy:</span> {selectedPlan.vehiclesCount}
                </PlanMetric>
                <PlanMetric>
                  <span>Zamówienia:</span> {selectedPlan.ordersCount}
                </PlanMetric>
                <PlanMetric>
                  <span>Dystans:</span> {selectedPlan.totalDistance} km
                </PlanMetric>
                <PlanMetric>
                  <span>Oszczędność paliwa:</span> {selectedPlan.fuelSavings.toFixed(1)}%
                </PlanMetric>
                <PlanMetric>
                  <span>Redukcja CO2:</span> {selectedPlan.co2Reduction} kg
                </PlanMetric>
              </PlanMetrics>
              
              {selectedPlan.routes && selectedPlan.routes.length > 0 && (
                <>
                  <h5>Trasy</h5>
                  <RoutesList>
                    {selectedPlan.routes.map(route => (
                      <RouteItem key={route.id}>
                        <RouteHeader>
                          <RouteTitle>{route.vehicle.name}</RouteTitle>
                          <div>Kierowca: {route.vehicle.driver}</div>
                        </RouteHeader>
                        <RouteDetails>
                          <RouteDetail>
                            <DetailLabel>Czas rozpoczęcia</DetailLabel>
                            <DetailValue>{formatDate(route.startTime)}</DetailValue>
                          </RouteDetail>
                          <RouteDetail>
                            <DetailLabel>Czas zakończenia</DetailLabel>
                            <DetailValue>{formatDate(route.endTime)}</DetailValue>
                          </RouteDetail>
                          <RouteDetail>
                            <DetailLabel>Dystans</DetailLabel>
                            <DetailValue>{route.distance} km</DetailValue>
                          </RouteDetail>
                          <RouteDetail>
                            <DetailLabel>Liczba przystanków</DetailLabel>
                            <DetailValue>{route.stops.length}</DetailValue>
                          </RouteDetail>
                        </RouteDetails>
                        <StopsList>
                          {route.stops.map((stop, index) => (
                            <StopItem key={stop.id}>
                              <StopNumber>{index + 1}</StopNumber>
                              <StopDetails>
                                <StopAddress>{stop.address}</StopAddress>
                                <StopTime>{formatDate(stop.time)}</StopTime>
                              </StopDetails>
                              <StopType type={stop.type}>
                                {stop.type === 'pickup' ? 'Odbiór' : 'Dostawa'}
                              </StopType>
                            </StopItem>
                          ))}
                        </StopsList>
                      </RouteItem>
                    ))}
                  </RoutesList>
                </>
              )}
            </ModalBody>
            <ModalFooter>
              {selectedPlan.status === 'pending' && (
                <>
                  <ApproveButton onClick={() => {
                    handleApprovePlan(selectedPlan.id);
                    setSelectedPlan(null);
                  }}>
                    Zatwierdź
                  </ApproveButton>
                  <RejectButton onClick={() => {
                    setShowRejectModal(true);
                  }}>
                    Odrzuć
                  </RejectButton>
                </>
              )}
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default AutonomousDispatch;
