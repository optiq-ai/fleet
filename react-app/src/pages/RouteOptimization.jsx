import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Card from '../components/common/Card';
import KPICard from '../components/common/KPICard';
import Table from '../components/common/Table';
import roadTollsService from '../services/api/roadTollsService';
import mockRoadTollsService from '../services/api/mockRoadTollsService';
import RouteDetailsMap from '../components/route/RouteDetailsMap';
import TollPointsMap from '../components/route/TollPointsMap';

/**
 * Route Optimization component for optimizing routes to minimize toll costs, fuel consumption, travel time, and CO2 emissions
 * @returns {JSX.Element} Route Optimization component
 */
const RouteOptimization = () => {
  // React Router navigation hook
  const navigate = useNavigate();
  
  // State for data
  const [routeOptimization, setRouteOptimization] = useState({ routes: [], count: 0 });
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [tollPoints, setTollPoints] = useState([]);
  const [transponders, setTransponders] = useState([]);
  const [routeComparison, setRouteComparison] = useState(null);
  
  // State for UI
  const [activeTab, setActiveTab] = useState('search');
  const [activeSubTab, setActiveSubTab] = useState('map');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [useMockData, setUseMockData] = useState(true);
  
  // Use refs to track loaded data state to avoid re-renders
  const dataLoadedRef = useRef({
    routes: false,
    transponders: false,
    tollPoints: false
  });
  
  // State for filters
  const [routeFilters, setRouteFilters] = useState({
    origin: '',
    destination: '',
    vehicleType: 'truck',
    optimizationCriteria: 'toll_cost'
  });
  
  const [advancedFilters, setAdvancedFilters] = useState({
    departureTime: '',
    arrivalTime: '',
    maxDetour: 10, // in percentage
    avoidHighways: false,
    avoidTolls: false,
    preferredOperators: []
  });
  
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  
  // State for map
  const [mapView, setMapView] = useState('standard');
  const [showTollPoints, setShowTollPoints] = useState(true);
  const [showTrafficData, setShowTrafficData] = useState(false);
  
  // Service selection based on mock data toggle
  const service = useMockData ? mockRoadTollsService : roadTollsService;
  
  // Refs for search debounce timers
  const searchTimerRef = useRef(null);

  // Load route optimization data
  const loadRouteOptimization = useCallback(async (filters = routeFilters) => {
    if (isLoading) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const data = await service.getRouteOptimization(filters);
      setRouteOptimization(data);
      dataLoadedRef.current.routes = true;
    } catch (err) {
      console.error('Error loading route optimization:', err);
      setError('Failed to load route optimization. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [service, isLoading, routeFilters]);

  // Load toll points data
  const loadTollPoints = useCallback(async () => {
    if (isLoading || dataLoadedRef.current.tollPoints) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const data = await service.getTollPoints();
      setTollPoints(data);
      dataLoadedRef.current.tollPoints = true;
    } catch (err) {
      console.error('Error loading toll points:', err);
      setError('Failed to load toll points. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [service, isLoading]);

  // Load transponders data
  const loadTransponders = useCallback(async () => {
    if (isLoading || dataLoadedRef.current.transponders) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const data = await service.getTransponders({ status: 'active', limit: 100 });
      setTransponders(data.items);
      dataLoadedRef.current.transponders = true;
    } catch (err) {
      console.error('Error loading transponders:', err);
      setError('Failed to load transponders. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [service, isLoading]);

  // Load route details
  const loadRouteDetails = useCallback(async (id) => {
    if (isLoading) return;
    
    setIsLoading(true);
    setError(null);
    try {
      // In a real implementation, this would be a separate API call
      // For now, we'll just find the route in the existing data
      const route = routeOptimization.routes.find(r => r.id === id);
      if (route) {
        setSelectedRoute(route);
        
        // Simulate loading additional comparison data
        const comparisonData = {
          time: {
            standard: route.estimatedTime,
            alternative: route.estimatedTime.replace(/(\d+)h (\d+)m/, (_, h, m) => `${parseInt(h) + 1}h ${Math.max(0, parseInt(m) - 15)}m`)
          },
          distance: {
            standard: route.distance,
            alternative: Math.round(route.distance * 1.1)
          },
          emissions: {
            standard: Math.round(route.distance * 0.12 * 100) / 100,
            alternative: Math.round(route.distance * 1.1 * 0.1 * 100) / 100
          },
          fuelConsumption: {
            standard: Math.round(route.distance * 0.3 * 10) / 10,
            alternative: Math.round(route.distance * 1.1 * 0.28 * 10) / 10
          }
        };
        
        setRouteComparison(comparisonData);
      } else {
        throw new Error(`Route with ID ${id} not found`);
      }
    } catch (err) {
      console.error(`Error loading route details for ID ${id}:`, err);
      setError('Failed to load route details. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [routeOptimization.routes, isLoading]);

  // Handle route search
  const handleRouteSearch = useCallback((e) => {
    e.preventDefault();
    loadRouteOptimization(routeFilters);
  }, [routeFilters, loadRouteOptimization]);

  // Handle route filter change
  const handleRouteFilterChange = useCallback((name, value) => {
    setRouteFilters(prev => ({ ...prev, [name]: value }));
  }, []);

  // Handle advanced filter change
  const handleAdvancedFilterChange = useCallback((name, value) => {
    setAdvancedFilters(prev => ({ ...prev, [name]: value }));
  }, []);

  // Handle toggle advanced filters
  const handleToggleAdvancedFilters = useCallback(() => {
    setShowAdvancedFilters(prev => !prev);
  }, []);

  // Handle tab change
  const handleTabChange = useCallback((tab) => {
    if (tab === activeTab) return; // Prevent unnecessary re-renders
    
    // Redirect to Road Tolls transponders tab if transponders tab is selected
    if (tab === 'transponders') {
      navigate('/road-tolls', { state: { activeTab: 'transponders' } });
      return;
    }
    
    setActiveTab(tab);
    setSelectedRoute(null);
    
    // Load data based on selected tab only if not already loaded
    switch (tab) {
      case 'search':
        // No need to load anything for search tab
        break;
      case 'toll_points':
        if (!dataLoadedRef.current.tollPoints) loadTollPoints();
        break;
      default:
        break;
    }
  }, [activeTab, loadTollPoints, navigate]);

  // Handle sub tab change
  const handleSubTabChange = useCallback((tab) => {
    setActiveSubTab(tab);
  }, []);

  // Handle map view change
  const handleMapViewChange = useCallback((view) => {
    setMapView(view);
  }, []);

  // Handle toggle toll points
  const handleToggleTollPoints = useCallback(() => {
    setShowTollPoints(prev => !prev);
  }, []);

  // Handle toggle traffic data
  const handleToggleTrafficData = useCallback(() => {
    setShowTrafficData(prev => !prev);
  }, []);

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(value);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pl-PL');
  };

  // Calculate savings percentage
  const calculateSavingsPercentage = (standardCost, alternativeCost) => {
    if (!standardCost || standardCost === 0) return 0;
    return Math.round(((standardCost - alternativeCost) / standardCost) * 100);
  };

  // Initial data load - only once on component mount
  useEffect(() => {
    // No need to load anything initially, wait for user to search
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reset data loaded state when mock data toggle changes
  useEffect(() => {
    // Reset data loaded state
    dataLoadedRef.current = {
      routes: false,
      transponders: false,
      tollPoints: false
    };
    
    // Load data for current tab after reset
    const currentTab = activeTab;
    switch (currentTab) {
      case 'search':
        // No need to load anything for search tab
        break;
      case 'toll_points':
        loadTollPoints();
        break;
      case 'transponders':
        loadTransponders();
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useMockData]);

  // Toggle between real and mock data
  const handleToggleDataSource = () => {
    setUseMockData(!useMockData);
  };

  // Render search tab
  const renderSearch = () => {
    if (selectedRoute) {
      return renderRouteDetails();
    }

    return (
      <PageContainer>
        <Card title="Wyszukaj trasę">
          <form onSubmit={handleRouteSearch}>
            <FilterContainer>
              <FilterGroup>
                <FilterLabel>Początek</FilterLabel>
                <FilterInput
                  type="text"
                  placeholder="Np. Warszawa, Polska"
                  value={routeFilters.origin}
                  onChange={(e) => handleRouteFilterChange('origin', e.target.value)}
                  required
                />
              </FilterGroup>
              <FilterGroup>
                <FilterLabel>Cel</FilterLabel>
                <FilterInput
                  type="text"
                  placeholder="Np. Berlin, Niemcy"
                  value={routeFilters.destination}
                  onChange={(e) => handleRouteFilterChange('destination', e.target.value)}
                  required
                />
              </FilterGroup>
              <FilterGroup>
                <FilterLabel>Typ pojazdu</FilterLabel>
                <FilterSelect
                  value={routeFilters.vehicleType}
                  onChange={(e) => handleRouteFilterChange('vehicleType', e.target.value)}
                >
                  <option value="truck">Ciężarówka</option>
                  <option value="van">Van</option>
                  <option value="car">Samochód osobowy</option>
                  <option value="bus">Autobus</option>
                </FilterSelect>
              </FilterGroup>
              <FilterGroup>
                <FilterLabel>Kryterium optymalizacji</FilterLabel>
                <FilterSelect
                  value={routeFilters.optimizationCriteria}
                  onChange={(e) => handleRouteFilterChange('optimizationCriteria', e.target.value)}
                >
                  <option value="toll_cost">Koszt opłat drogowych</option>
                  <option value="fuel_consumption">Zużycie paliwa</option>
                  <option value="travel_time">Czas przejazdu</option>
                  <option value="co2_emissions">Emisja CO2</option>
                </FilterSelect>
              </FilterGroup>
            </FilterContainer>
            
            <AdvancedFiltersToggle onClick={handleToggleAdvancedFilters}>
              {showAdvancedFilters ? 'Ukryj filtry zaawansowane' : 'Pokaż filtry zaawansowane'}
            </AdvancedFiltersToggle>
            
            {showAdvancedFilters && (
              <AdvancedFiltersContainer>
                <FilterContainer>
                  <FilterGroup>
                    <FilterLabel>Czas wyjazdu</FilterLabel>
                    <FilterInput
                      type="datetime-local"
                      value={advancedFilters.departureTime}
                      onChange={(e) => handleAdvancedFilterChange('departureTime', e.target.value)}
                    />
                  </FilterGroup>
                  <FilterGroup>
                    <FilterLabel>Czas przyjazdu</FilterLabel>
                    <FilterInput
                      type="datetime-local"
                      value={advancedFilters.arrivalTime}
                      onChange={(e) => handleAdvancedFilterChange('arrivalTime', e.target.value)}
                    />
                  </FilterGroup>
                  <FilterGroup>
                    <FilterLabel>Maksymalny objazd (%)</FilterLabel>
                    <FilterInput
                      type="number"
                      min="0"
                      max="100"
                      value={advancedFilters.maxDetour}
                      onChange={(e) => handleAdvancedFilterChange('maxDetour', e.target.value)}
                    />
                  </FilterGroup>
                </FilterContainer>
                <FilterContainer>
                  <FilterGroup>
                    <FilterCheckbox
                      type="checkbox"
                      id="avoidHighways"
                      checked={advancedFilters.avoidHighways}
                      onChange={(e) => handleAdvancedFilterChange('avoidHighways', e.target.checked)}
                    />
                    <FilterCheckboxLabel htmlFor="avoidHighways">Unikaj autostrad</FilterCheckboxLabel>
                  </FilterGroup>
                  <FilterGroup>
                    <FilterCheckbox
                      type="checkbox"
                      id="avoidTolls"
                      checked={advancedFilters.avoidTolls}
                      onChange={(e) => handleAdvancedFilterChange('avoidTolls', e.target.checked)}
                    />
                    <FilterCheckboxLabel htmlFor="avoidTolls">Unikaj opłat drogowych</FilterCheckboxLabel>
                  </FilterGroup>
                </FilterContainer>
              </AdvancedFiltersContainer>
            )}
            
            <ActionButtonsContainer right>
              <ActionButton primary type="submit">
                Szukaj
              </ActionButton>
            </ActionButtonsContainer>
          </form>
        </Card>

        {isLoading ? (
          <LoadingContainer>
            <LoadingIndicator>Ładowanie danych...</LoadingIndicator>
          </LoadingContainer>
        ) : (
          <>
            {routeOptimization.routes.length > 0 ? (
              routeOptimization.routes.map((route) => (
                <Card key={route.id} title={`${route.origin} → ${route.destination}`}>
                  <RouteHeader>
                    <RouteHeaderInfo>
                      <RouteHeaderItem>
                        <RouteHeaderLabel>Dystans:</RouteHeaderLabel>
                        <RouteHeaderValue>{route.distance} km</RouteHeaderValue>
                      </RouteHeaderItem>
                      <RouteHeaderItem>
                        <RouteHeaderLabel>Szacowany czas:</RouteHeaderLabel>
                        <RouteHeaderValue>{route.estimatedTime}</RouteHeaderValue>
                      </RouteHeaderItem>
                      <RouteHeaderItem>
                        <RouteHeaderLabel>Potencjalne oszczędności:</RouteHeaderLabel>
                        <RouteHeaderValue highlight>{formatCurrency(route.potentialSavings)}</RouteHeaderValue>
                      </RouteHeaderItem>
                    </RouteHeaderInfo>
                  </RouteHeader>
                  
                  <RoutesContainer>
                    <RouteCard>
                      <RouteCardHeader>Trasa standardowa</RouteCardHeader>
                      <RouteCardBody>
                        <DetailsTable>
                          <tbody>
                            <tr>
                              <th>Koszt opłat drogowych</th>
                              <td>{formatCurrency(route.standardRoute.tollCost)}</td>
                            </tr>
                            <tr>
                              <th>Koszt paliwa</th>
                              <td>{formatCurrency(route.standardRoute.fuelCost)}</td>
                            </tr>
                            <tr>
                              <th>Całkowity koszt</th>
                              <td><strong>{formatCurrency(route.standardRoute.totalCost)}</strong></td>
                            </tr>
                            <tr>
                              <th>Punkty poboru opłat</th>
                              <td>{route.standardRoute.tollPoints}</td>
                            </tr>
                          </tbody>
                        </DetailsTable>
                      </RouteCardBody>
                    </RouteCard>
                    <RouteCard>
                      <RouteCardHeader alternative>Trasa alternatywna</RouteCardHeader>
                      <RouteCardBody>
                        <DetailsTable>
                          <tbody>
                            <tr>
                              <th>Koszt opłat drogowych</th>
                              <td>{formatCurrency(route.alternativeRoute.tollCost)}</td>
                            </tr>
                            <tr>
                              <th>Koszt paliwa</th>
                              <td>{formatCurrency(route.alternativeRoute.fuelCost)}</td>
                            </tr>
                            <tr>
                              <th>Całkowity koszt</th>
                              <td><strong>{formatCurrency(route.alternativeRoute.totalCost)}</strong></td>
                            </tr>
                            <tr>
                              <th>Punkty poboru opłat</th>
                              <td>{route.alternativeRoute.tollPoints}</td>
                            </tr>
                          </tbody>
                        </DetailsTable>
                      </RouteCardBody>
                    </RouteCard>
                  </RoutesContainer>
                  
                  <SavingsAlert>
                    <SavingsPercentage>
                      {calculateSavingsPercentage(route.standardRoute.totalCost, route.alternativeRoute.totalCost)}%
                    </SavingsPercentage>
                    <SavingsText>
                      Potencjalne oszczędności: <strong>{formatCurrency(route.potentialSavings)}</strong>
                    </SavingsText>
                  </SavingsAlert>
                  
                  <ActionButtonsContainer right>
                    <ActionButton onClick={() => loadRouteDetails(route.id)}>
                      Szczegóły
                    </ActionButton>
                    <ActionButton primary>
                      Wybierz trasę alternatywną
                    </ActionButton>
                  </ActionButtonsContainer>
                </Card>
              ))
            ) : (
              <InfoAlert>
                Brak danych o trasach. Wprowadź początek i cel, aby wyszukać trasę.
              </InfoAlert>
            )}
          </>
        )}
      </PageContainer>
    );
  };

  // Render route details
  const renderRouteDetails = () => {
    if (!selectedRoute || !routeComparison) return null;

    return (
      <PageContainer>
        <BackButton onClick={() => setSelectedRoute(null)}>
          &larr; Powrót do wyników wyszukiwania
        </BackButton>

        <Card title={`Szczegóły trasy: ${selectedRoute.origin} → ${selectedRoute.destination}`}>
          <TabsContainer>
            <TabsList>
              <TabItem 
                active={activeSubTab === 'map'} 
                onClick={() => handleSubTabChange('map')}
              >
                Mapa
              </TabItem>
              <TabItem 
                active={activeSubTab === 'comparison'} 
                onClick={() => handleSubTabChange('comparison')}
              >
                Porównanie
              </TabItem>
              <TabItem 
                active={activeSubTab === 'toll_points'} 
                onClick={() => handleSubTabChange('toll_points')}
              >
                Punkty poboru opłat
              </TabItem>
              <TabItem 
                active={activeSubTab === 'transponders'} 
                onClick={() => handleSubTabChange('transponders')}
              >
                Transpondery
              </TabItem>
            </TabsList>
            <TabContent>
              {activeSubTab === 'map' && (
                <MapContainer>
                  <MapControls>
                    <MapControlGroup>
                      <MapControlLabel>Widok mapy:</MapControlLabel>
                      <MapControlSelect
                        value={mapView}
                        onChange={(e) => handleMapViewChange(e.target.value)}
                      >
                        <option value="standard">Standardowy</option>
                        <option value="satellite">Satelitarny</option>
                        <option value="terrain">Terenowy</option>
                      </MapControlSelect>
                    </MapControlGroup>
                    <MapControlGroup>
                      <MapControlCheckbox
                        type="checkbox"
                        id="showTollPoints"
                        checked={showTollPoints}
                        onChange={handleToggleTollPoints}
                      />
                      <MapControlLabel htmlFor="showTollPoints">
                        Pokaż punkty poboru opłat
                      </MapControlLabel>
                    </MapControlGroup>
                    <MapControlGroup>
                      <MapControlCheckbox
                        type="checkbox"
                        id="showTrafficData"
                        checked={showTrafficData}
                        onChange={handleToggleTrafficData}
                      />
                      <MapControlLabel htmlFor="showTrafficData">
                        Pokaż dane o ruchu
                      </MapControlLabel>
                    </MapControlGroup>
                  </MapControls>
                  <MapPlaceholder>
                    <RouteDetailsMap route={selectedRoute} />
                    <MapRoutesContainer>
                      <MapRouteLabel standard>Trasa standardowa</MapRouteLabel>
                      <MapRouteLabel alternative>Trasa alternatywna</MapRouteLabel>
                    </MapRoutesContainer>
                  </MapPlaceholder>
                </MapContainer>
              )}
              
              {activeSubTab === 'comparison' && (
                <ComparisonContainer>
                  <ComparisonHeader>
                    <ComparisonTitle>Porównanie tras</ComparisonTitle>
                    <ComparisonSubtitle>
                      Trasa standardowa vs. Trasa alternatywna
                    </ComparisonSubtitle>
                  </ComparisonHeader>
                  
                  <ComparisonGrid>
                    <ComparisonCard>
                      <ComparisonCardHeader>Koszty</ComparisonCardHeader>
                      <ComparisonCardBody>
                        <ComparisonTable>
                          <thead>
                            <tr>
                              <th>Kategoria</th>
                              <th>Trasa standardowa</th>
                              <th>Trasa alternatywna</th>
                              <th>Różnica</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Opłaty drogowe</td>
                              <td>{formatCurrency(selectedRoute.standardRoute.tollCost)}</td>
                              <td>{formatCurrency(selectedRoute.alternativeRoute.tollCost)}</td>
                              <td className={selectedRoute.standardRoute.tollCost > selectedRoute.alternativeRoute.tollCost ? 'positive' : 'negative'}>
                                {formatCurrency(selectedRoute.standardRoute.tollCost - selectedRoute.alternativeRoute.tollCost)}
                              </td>
                            </tr>
                            <tr>
                              <td>Paliwo</td>
                              <td>{formatCurrency(selectedRoute.standardRoute.fuelCost)}</td>
                              <td>{formatCurrency(selectedRoute.alternativeRoute.fuelCost)}</td>
                              <td className={selectedRoute.standardRoute.fuelCost > selectedRoute.alternativeRoute.fuelCost ? 'positive' : 'negative'}>
                                {formatCurrency(selectedRoute.standardRoute.fuelCost - selectedRoute.alternativeRoute.fuelCost)}
                              </td>
                            </tr>
                            <tr>
                              <td><strong>Całkowity koszt</strong></td>
                              <td><strong>{formatCurrency(selectedRoute.standardRoute.totalCost)}</strong></td>
                              <td><strong>{formatCurrency(selectedRoute.alternativeRoute.totalCost)}</strong></td>
                              <td className={selectedRoute.standardRoute.totalCost > selectedRoute.alternativeRoute.totalCost ? 'positive' : 'negative'}>
                                <strong>{formatCurrency(selectedRoute.standardRoute.totalCost - selectedRoute.alternativeRoute.totalCost)}</strong>
                              </td>
                            </tr>
                          </tbody>
                        </ComparisonTable>
                      </ComparisonCardBody>
                    </ComparisonCard>
                    
                    <ComparisonCard>
                      <ComparisonCardHeader>Czas i dystans</ComparisonCardHeader>
                      <ComparisonCardBody>
                        <ComparisonTable>
                          <thead>
                            <tr>
                              <th>Kategoria</th>
                              <th>Trasa standardowa</th>
                              <th>Trasa alternatywna</th>
                              <th>Różnica</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Czas przejazdu</td>
                              <td>{routeComparison.time.standard}</td>
                              <td>{routeComparison.time.alternative}</td>
                              <td className="negative">+1h -15m</td>
                            </tr>
                            <tr>
                              <td>Dystans</td>
                              <td>{routeComparison.distance.standard} km</td>
                              <td>{routeComparison.distance.alternative} km</td>
                              <td className="negative">+{routeComparison.distance.alternative - routeComparison.distance.standard} km</td>
                            </tr>
                            <tr>
                              <td>Punkty poboru opłat</td>
                              <td>{selectedRoute.standardRoute.tollPoints}</td>
                              <td>{selectedRoute.alternativeRoute.tollPoints}</td>
                              <td className={selectedRoute.standardRoute.tollPoints > selectedRoute.alternativeRoute.tollPoints ? 'positive' : 'negative'}>
                                {selectedRoute.standardRoute.tollPoints - selectedRoute.alternativeRoute.tollPoints}
                              </td>
                            </tr>
                          </tbody>
                        </ComparisonTable>
                      </ComparisonCardBody>
                    </ComparisonCard>
                    
                    <ComparisonCard>
                      <ComparisonCardHeader>Środowisko</ComparisonCardHeader>
                      <ComparisonCardBody>
                        <ComparisonTable>
                          <thead>
                            <tr>
                              <th>Kategoria</th>
                              <th>Trasa standardowa</th>
                              <th>Trasa alternatywna</th>
                              <th>Różnica</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Emisja CO2</td>
                              <td>{routeComparison.emissions.standard} ton</td>
                              <td>{routeComparison.emissions.alternative} ton</td>
                              <td className={routeComparison.emissions.standard > routeComparison.emissions.alternative ? 'positive' : 'negative'}>
                                {(routeComparison.emissions.standard - routeComparison.emissions.alternative).toFixed(2)} ton
                              </td>
                            </tr>
                            <tr>
                              <td>Zużycie paliwa</td>
                              <td>{routeComparison.fuelConsumption.standard} l</td>
                              <td>{routeComparison.fuelConsumption.alternative} l</td>
                              <td className={routeComparison.fuelConsumption.standard > routeComparison.fuelConsumption.alternative ? 'positive' : 'negative'}>
                                {(routeComparison.fuelConsumption.standard - routeComparison.fuelConsumption.alternative).toFixed(1)} l
                              </td>
                            </tr>
                          </tbody>
                        </ComparisonTable>
                      </ComparisonCardBody>
                    </ComparisonCard>
                  </ComparisonGrid>
                  
                  <RecommendationContainer>
                    <RecommendationTitle>Rekomendacja</RecommendationTitle>
                    <RecommendationContent>
                      <RecommendationIcon>✓</RecommendationIcon>
                      <RecommendationText>
                        Zalecamy wybranie <strong>trasy alternatywnej</strong>, która pozwoli zaoszczędzić <strong>{formatCurrency(selectedRoute.potentialSavings)}</strong> ({calculateSavingsPercentage(selectedRoute.standardRoute.totalCost, selectedRoute.alternativeRoute.totalCost)}%) na kosztach przejazdu.
                      </RecommendationText>
                    </RecommendationContent>
                  </RecommendationContainer>
                  
                  <ActionButtonsContainer right>
                    <ActionButton primary>Wybierz trasę alternatywną</ActionButton>
                    <ActionButton>Eksportuj porównanie</ActionButton>
                  </ActionButtonsContainer>
                </ComparisonContainer>
              )}
              
              {activeSubTab === 'toll_points' && (
                <TollPointsContainer>
                  <TollPointsHeader>
                    <TollPointsTitle>Punkty poboru opłat na trasie</TollPointsTitle>
                  </TollPointsHeader>
                  
                  <TabsContainer>
                    <TabsList>
                      <TabItem 
                        active={activeSubTab === 'toll_points' && !activeSubTab.endsWith('_alternative')} 
                        onClick={() => handleSubTabChange('toll_points')}
                      >
                        Trasa standardowa
                      </TabItem>
                      <TabItem 
                        active={activeSubTab === 'toll_points_alternative'} 
                        onClick={() => handleSubTabChange('toll_points_alternative')}
                      >
                        Trasa alternatywna
                      </TabItem>
                    </TabsList>
                    <TabContent>
                      <Table 
                        headers={['Nazwa', 'Operator', 'Stawka', 'Metoda płatności', 'Godziny szczytu']}
                        data={[
                          ['Punkt poboru A2 - Konin', 'ViaTOLL', formatCurrency(15.50), 'Transponder, Gotówka, Karta', '7:00-9:00, 16:00-18:00'],
                          ['Punkt poboru A2 - Poznań Wschód', 'ViaTOLL', formatCurrency(22.75), 'Transponder, Gotówka, Karta', '7:00-9:00, 16:00-18:00'],
                          ['Punkt poboru A2 - Poznań Zachód', 'ViaTOLL', formatCurrency(18.20), 'Transponder, Gotówka, Karta', '7:00-9:00, 16:00-18:00'],
                          ['Punkt poboru A2 - Świecko', 'ViaTOLL', formatCurrency(12.90), 'Transponder, Gotówka, Karta', '7:00-9:00, 16:00-18:00']
                        ]}
                      />
                      
                      <TollSummaryContainer>
                        <TollSummaryItem>
                          <TollSummaryLabel>Liczba punktów poboru opłat:</TollSummaryLabel>
                          <TollSummaryValue>{selectedRoute.standardRoute.tollPoints}</TollSummaryValue>
                        </TollSummaryItem>
                        <TollSummaryItem>
                          <TollSummaryLabel>Całkowity koszt opłat:</TollSummaryLabel>
                          <TollSummaryValue>{formatCurrency(selectedRoute.standardRoute.tollCost)}</TollSummaryValue>
                        </TollSummaryItem>
                      </TollSummaryContainer>
                    </TabContent>
                  </TabsContainer>
                </TollPointsContainer>
              )}
              
              {activeSubTab === 'transponders' && (
                <TranspondersContainer>
                  <TranspondersHeader>
                    <TranspondersTitle>Dostępne transpondery</TranspondersTitle>
                    <TranspondersSubtitle>
                      Transpondery, które można przypisać do tej trasy
                    </TranspondersSubtitle>
                  </TranspondersHeader>
                  
                  <Table 
                    headers={['ID', 'Numer seryjny', 'Status', 'Pojazd', 'Saldo', 'Operator', 'Akcje']}
                    data={[
                      [
                        'TRANS-10001',
                        'TP-100001',
                        <StatusBadge color="#28a745">aktywny</StatusBadge>,
                        'WZ 10000 (truck)',
                        formatCurrency(125.50),
                        'ViaTOLL',
                        <ActionButton small>Przypisz</ActionButton>
                      ],
                      [
                        'TRANS-10002',
                        'TP-100002',
                        <StatusBadge color="#28a745">aktywny</StatusBadge>,
                        'WZ 10001 (truck)',
                        formatCurrency(85.20),
                        'ViaTOLL',
                        <ActionButton small>Przypisz</ActionButton>
                      ],
                      [
                        'TRANS-10003',
                        'TP-100003',
                        <StatusBadge color="#28a745">aktywny</StatusBadge>,
                        'WZ 10002 (truck)',
                        formatCurrency(210.75),
                        'ViaTOLL',
                        <ActionButton small>Przypisz</ActionButton>
                      ]
                    ]}
                  />
                  
                  <InfoAlert>
                    <strong>Uwaga:</strong> Upewnij się, że wybrany transponder ma wystarczające saldo do pokrycia opłat drogowych na trasie.
                  </InfoAlert>
                </TranspondersContainer>
              )}
            </TabContent>
          </TabsContainer>
        </Card>
      </PageContainer>
    );
  };

  // Render toll points tab
  const renderTollPoints = () => {
    if (!tollPoints || tollPoints.length === 0) {
      return (
        <LoadingContainer>
          <LoadingIndicator>Ładowanie danych...</LoadingIndicator>
        </LoadingContainer>
      );
    }

    return (
      <PageContainer>
        <Card title="Mapa punktów poboru opłat">
          <MapContainer>
            <MapControls>
              <MapControlGroup>
                <MapControlLabel>Widok mapy:</MapControlLabel>
                <MapControlSelect
                  value={mapView}
                  onChange={(e) => handleMapViewChange(e.target.value)}
                >
                  <option value="standard">Standardowy</option>
                  <option value="satellite">Satelitarny</option>
                  <option value="terrain">Terenowy</option>
                </MapControlSelect>
              </MapControlGroup>
              <MapControlGroup>
                <MapControlCheckbox
                  type="checkbox"
                  id="showTrafficData"
                  checked={showTrafficData}
                  onChange={handleToggleTrafficData}
                />
                <MapControlLabel htmlFor="showTrafficData">
                  Pokaż dane o ruchu
                </MapControlLabel>
              </MapControlGroup>
            </MapControls>
            <MapPlaceholder>
              {/* Simulate toll points on the map */}
              <MapPoint x={25} y={40} color="#FF5722" title="Punkt poboru opłat: A2 - Konin" />
              <MapPoint x={35} y={35} color="#FF5722" title="Punkt poboru opłat: A2 - Poznań Wschód" />
              <MapPoint x={45} y={30} color="#FF5722" title="Punkt poboru opłat: A2 - Poznań Zachód" />
              <MapPoint x={55} y={45} color="#FF5722" title="Punkt poboru opłat: A2 - Świecko" />
              <MapPoint x={30} y={60} color="#FF5722" title="Punkt poboru opłat: A4 - Kraków" />
              <MapPoint x={40} y={65} color="#FF5722" title="Punkt poboru opłat: A4 - Katowice" />
              <MapPoint x={50} y={70} color="#FF5722" title="Punkt poboru opłat: A4 - Wrocław" />
              <MapPoint x={20} y={50} color="#FF5722" title="Punkt poboru opłat: A1 - Gdańsk" />
              <MapPoint x={30} y={55} color="#FF5722" title="Punkt poboru opłat: A1 - Toruń" />
              <MapPoint x={40} y={60} color="#FF5722" title="Punkt poboru opłat: A1 - Łódź" />
              <TollPointsMap tollPoints={[]} />
            </MapPlaceholder>
          </MapContainer>
        </Card>

        <Card title="Lista punktów poboru opłat">
          <FilterContainer>
            <FilterGroup>
              <FilterLabel>Kraj</FilterLabel>
              <FilterSelect>
                <option value="all">Wszystkie</option>
                <option value="poland">Polska</option>
                <option value="germany">Niemcy</option>
                <option value="czech">Czechy</option>
                <option value="slovakia">Słowacja</option>
                <option value="austria">Austria</option>
              </FilterSelect>
            </FilterGroup>
            <FilterGroup>
              <FilterLabel>Operator</FilterLabel>
              <FilterSelect>
                <option value="all">Wszyscy</option>
                <option value="viatoll">ViaTOLL</option>
                <option value="tollcollect">TollCollect</option>
                <option value="myto">MYTO CZ</option>
                <option value="asfinag">ASFINAG</option>
              </FilterSelect>
            </FilterGroup>
            <FilterGroup>
              <FilterLabel>Wyszukaj</FilterLabel>
              <FilterInput
                type="text"
                placeholder="Wyszukaj po nazwie, drodze lub lokalizacji"
              />
            </FilterGroup>
          </FilterContainer>
          
          <Table 
            headers={['Nazwa', 'Droga', 'Kraj', 'Operator', 'Stawka dla ciężarówek', 'Stawka dla samochodów', 'Metody płatności']}
            data={[
              ['Punkt poboru A2 - Konin', 'A2', 'Polska', 'ViaTOLL', formatCurrency(15.50), formatCurrency(9.90), 'Transponder, Gotówka, Karta'],
              ['Punkt poboru A2 - Poznań Wschód', 'A2', 'Polska', 'ViaTOLL', formatCurrency(22.75), formatCurrency(12.50), 'Transponder, Gotówka, Karta'],
              ['Punkt poboru A2 - Poznań Zachód', 'A2', 'Polska', 'ViaTOLL', formatCurrency(18.20), formatCurrency(10.30), 'Transponder, Gotówka, Karta'],
              ['Punkt poboru A2 - Świecko', 'A2', 'Polska', 'ViaTOLL', formatCurrency(12.90), formatCurrency(8.50), 'Transponder, Gotówka, Karta'],
              ['Punkt poboru A4 - Kraków', 'A4', 'Polska', 'ViaTOLL', formatCurrency(20.00), formatCurrency(10.00), 'Transponder, Gotówka, Karta'],
              ['Punkt poboru A4 - Katowice', 'A4', 'Polska', 'ViaTOLL', formatCurrency(18.50), formatCurrency(9.50), 'Transponder, Gotówka, Karta'],
              ['Punkt poboru A4 - Wrocław', 'A4', 'Polska', 'ViaTOLL', formatCurrency(19.30), formatCurrency(9.80), 'Transponder, Gotówka, Karta'],
              ['Punkt poboru A1 - Gdańsk', 'A1', 'Polska', 'ViaTOLL', formatCurrency(16.70), formatCurrency(9.20), 'Transponder, Gotówka, Karta'],
              ['Punkt poboru A1 - Toruń', 'A1', 'Polska', 'ViaTOLL', formatCurrency(17.40), formatCurrency(9.40), 'Transponder, Gotówka, Karta'],
              ['Punkt poboru A1 - Łódź', 'A1', 'Polska', 'ViaTOLL', formatCurrency(18.10), formatCurrency(9.60), 'Transponder, Gotówka, Karta']
            ]}
          />
        </Card>
      </PageContainer>
    );
  };

  return (
    <Container>
      <Header>
        <Title>Optymalizacja Tras</Title>
        <DataSourceToggle>
          <DataSourceLabel>
            Użyj danych testowych
          </DataSourceLabel>
          <DataSourceSwitch 
            checked={useMockData}
            onChange={handleToggleDataSource}
          />
        </DataSourceToggle>
      </Header>

      {error && (
        <ErrorAlert>
          {error}
        </ErrorAlert>
      )}

      <TabsContainer>
        <TabsList>
          <TabItem 
            active={activeTab === 'search'} 
            onClick={() => handleTabChange('search')}
          >
            Wyszukiwanie tras
          </TabItem>
          <TabItem 
            active={activeTab === 'toll_points'} 
            onClick={() => handleTabChange('toll_points')}
          >
            Punkty poboru opłat
          </TabItem>
          <TabItem 
            active={activeTab === 'transponders'} 
            onClick={() => handleTabChange('transponders')}
          >
            Transpondery
          </TabItem>
        </TabsList>
        <TabContent>
          {activeTab === 'search' && renderSearch()}
          {activeTab === 'toll_points' && renderTollPoints()}
          {activeTab === 'transponders' && (
            <PageContainer>
              <Card title="Transpondery">
                <InfoAlert>
                  Sekcja transponderów jest dostępna w zakładce "Transpondery" w głównym menu aplikacji.
                  <ActionButtonsContainer>
                    <ActionButton primary onClick={() => navigate('/road-tolls', { state: { activeTab: 'transponders' } })}>
                      Przejdź do sekcji Transpondery
                    </ActionButton>
                  </ActionButtonsContainer>
                </InfoAlert>
              </Card>
            </PageContainer>
          )}
        </TabContent>
      </TabsContainer>
    </Container>
  );
};

// Styled components
const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin: 0;
`;

const DataSourceToggle = styled.div`
  display: flex;
  align-items: center;
`;

const DataSourceLabel = styled.span`
  margin-right: 10px;
  font-size: 14px;
`;

const DataSourceSwitch = styled.input.attrs({ type: 'checkbox' })`
  position: relative;
  width: 40px;
  height: 20px;
  appearance: none;
  background-color: #ccc;
  border-radius: 20px;
  cursor: pointer;
  outline: none;
  transition: background-color 0.3s;

  &:checked {
    background-color: #2196F3;
  }

  &:before {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: white;
    transition: left 0.3s;
  }

  &:checked:before {
    left: 22px;
  }
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
`;

const TabsList = styled.div`
  display: flex;
  background-color: #f5f5f5;
  border-bottom: 1px solid #e0e0e0;
`;

const TabItem = styled.div`
  padding: 10px 15px;
  cursor: pointer;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  color: ${props => props.active ? '#2196F3' : '#333'};
  border-bottom: ${props => props.active ? '2px solid #2196F3' : 'none'};
  transition: all 0.3s;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const TabContent = styled.div`
  padding: 15px;
  background-color: white;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 15px;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 200px;
`;

const FilterLabel = styled.label`
  margin-bottom: 5px;
  font-size: 14px;
  font-weight: bold;
`;

const FilterInput = styled.input`
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
`;

const FilterSelect = styled.select`
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  background-color: white;
`;

const FilterCheckbox = styled.input.attrs({ type: 'checkbox' })`
  margin-right: 5px;
`;

const FilterCheckboxLabel = styled.label`
  font-size: 14px;
`;

const AdvancedFiltersToggle = styled.div`
  color: #2196F3;
  cursor: pointer;
  margin-bottom: 15px;
  font-size: 14px;
  
  &:hover {
    text-decoration: underline;
  }
`;

const AdvancedFiltersContainer = styled.div`
  margin-bottom: 15px;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
`;

const ActionButtonsContainer = styled.div`
  display: flex;
  justify-content: ${props => props.right ? 'flex-end' : 'flex-start'};
  gap: 10px;
  margin-top: 15px;
`;

const ActionButton = styled.button`
  padding: ${props => props.small ? '5px 10px' : '8px 15px'};
  background-color: ${props => props.primary ? '#2196F3' : props.warning ? '#ff9800' : '#f5f5f5'};
  color: ${props => props.primary || props.warning ? 'white' : '#333'};
  border: 1px solid ${props => props.primary ? '#1976D2' : props.warning ? '#ef6c00' : '#ccc'};
  border-radius: 4px;
  cursor: pointer;
  font-size: ${props => props.small ? '12px' : '14px'};
  transition: all 0.3s;

  &:hover {
    background-color: ${props => props.primary ? '#1976D2' : props.warning ? '#ef6c00' : '#e0e0e0'};
  }

  &:disabled {
    background-color: #cccccc;
    color: #666666;
    cursor: not-allowed;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
`;

const LoadingIndicator = styled.div`
  font-size: 16px;
  color: #666;
`;

const ErrorAlert = styled.div`
  background-color: #ffebee;
  color: #c62828;
  padding: 10px 15px;
  border-radius: 4px;
  margin-bottom: 20px;
  border-left: 4px solid #c62828;
`;

const InfoAlert = styled.div`
  background-color: #e3f2fd;
  color: #0d47a1;
  padding: 10px 15px;
  border-radius: 4px;
  margin-bottom: 20px;
  border-left: 4px solid #0d47a1;
`;

const RouteHeader = styled.div`
  margin-bottom: 15px;
`;

const RouteHeaderInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const RouteHeaderItem = styled.div`
  display: flex;
  align-items: center;
`;

const RouteHeaderLabel = styled.span`
  font-weight: bold;
  margin-right: 5px;
`;

const RouteHeaderValue = styled.span`
  color: ${props => props.highlight ? '#2196F3' : 'inherit'};
  font-weight: ${props => props.highlight ? 'bold' : 'normal'};
`;

const RoutesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 15px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const RouteCard = styled.div`
  flex: 1;
  min-width: 300px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
`;

const RouteCardHeader = styled.div`
  padding: 10px 15px;
  background-color: ${props => props.alternative ? '#4caf50' : '#2196F3'};
  color: white;
  font-weight: bold;
`;

const RouteCardBody = styled.div`
  padding: 15px;
`;

const DetailsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #e0e0e0;
  }
  
  th {
    font-weight: bold;
    width: 40%;
  }
`;

const SavingsAlert = styled.div`
  display: flex;
  align-items: center;
  background-color: #e8f5e9;
  padding: 10px 15px;
  border-radius: 4px;
  margin-bottom: 15px;
  border-left: 4px solid #4caf50;
`;

const SavingsPercentage = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #4caf50;
  margin-right: 15px;
  background-color: white;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #4caf50;
`;

const SavingsText = styled.div`
  font-size: 16px;
  color: #2e7d32;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #2196F3;
  cursor: pointer;
  padding: 5px 0;
  font-size: 14px;
  margin-bottom: 10px;
  
  &:hover {
    text-decoration: underline;
  }
`;

const MapContainer = styled.div`
  position: relative;
  height: 400px;
  background-color: #f5f5f5;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 15px;
`;

const MapControls = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
  background-color: white;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const MapControlGroup = styled.div`
  display: flex;
  align-items: center;
`;

const MapControlLabel = styled.label`
  font-size: 12px;
  margin-right: 5px;
`;

const MapControlSelect = styled.select`
  padding: 4px 6px;
  font-size: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const MapControlCheckbox = styled.input.attrs({ type: 'checkbox' })`
  margin-right: 5px;
`;

const MapPlaceholder = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-style: italic;
`;

const MapPoint = styled.div`
  position: absolute;
  left: ${props => props.x}%;
  top: ${props => props.y}%;
  width: 12px;
  height: 12px;
  background-color: ${props => props.color || '#2196F3'};
  border-radius: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  
  &:before {
    content: attr(title);
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 5px 8px;
    border-radius: 4px;
    font-size: 12px;
    white-space: nowrap;
    visibility: hidden;
    opacity: 0;
    transition: all 0.3s;
  }
  
  &:hover:before {
    visibility: visible;
    opacity: 1;
  }
`;

const MapRoutesContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 10;
  background-color: white;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const MapRouteLabel = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  
  &:before {
    content: '';
    display: inline-block;
    width: 20px;
    height: 3px;
    background-color: ${props => props.alternative ? '#4caf50' : '#2196F3'};
    margin-right: 5px;
  }
`;

const ComparisonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ComparisonHeader = styled.div`
  margin-bottom: 10px;
`;

const ComparisonTitle = styled.h3`
  margin: 0 0 5px 0;
  font-size: 18px;
`;

const ComparisonSubtitle = styled.div`
  color: #666;
  font-size: 14px;
`;

const ComparisonGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ComparisonCard = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
`;

const ComparisonCardHeader = styled.div`
  padding: 10px 15px;
  background-color: #f5f5f5;
  font-weight: bold;
  border-bottom: 1px solid #e0e0e0;
`;

const ComparisonCardBody = styled.div`
  padding: 15px;
`;

const ComparisonTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #e0e0e0;
  }
  
  th {
    font-weight: bold;
    background-color: #f9f9f9;
  }
  
  td.positive {
    color: #4caf50;
    font-weight: bold;
  }
  
  td.negative {
    color: #f44336;
    font-weight: bold;
  }
`;

const RecommendationContainer = styled.div`
  background-color: #e8f5e9;
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 15px;
`;

const RecommendationTitle = styled.h3`
  margin: 0 0 10px 0;
  font-size: 16px;
  color: #2e7d32;
`;

const RecommendationContent = styled.div`
  display: flex;
  align-items: center;
`;

const RecommendationIcon = styled.div`
  font-size: 24px;
  color: #4caf50;
  margin-right: 15px;
  background-color: white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #4caf50;
`;

const RecommendationText = styled.div`
  font-size: 14px;
  color: #2e7d32;
`;

const TollPointsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TollPointsHeader = styled.div`
  margin-bottom: 10px;
`;

const TollPointsTitle = styled.h3`
  margin: 0;
  font-size: 18px;
`;

const TollSummaryContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 4px;
`;

const TollSummaryItem = styled.div`
  display: flex;
  align-items: center;
`;

const TollSummaryLabel = styled.span`
  font-weight: bold;
  margin-right: 5px;
`;

const TollSummaryValue = styled.span`
  font-weight: bold;
  color: #2196F3;
`;

const TranspondersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TranspondersHeader = styled.div`
  margin-bottom: 10px;
`;

const TranspondersTitle = styled.h3`
  margin: 0 0 5px 0;
  font-size: 18px;
`;

const TranspondersSubtitle = styled.div`
  color: #666;
  font-size: 14px;
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 3px 8px;
  border-radius: 12px;
  font-size: 12px;
  background-color: ${props => props.color || '#6c757d'};
  color: white;
`;

const GridSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
`;

export default RouteOptimization;
