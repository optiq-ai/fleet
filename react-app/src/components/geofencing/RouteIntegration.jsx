import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Card from '../common/Card';
import * as geofencingService from '../../services/api/mockGeofencingService';

const IntegrationContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  
  label {
    font-size: 14px;
    color: #666;
  }
  
  input {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    
    &:focus {
      outline: none;
      border-color: #3f51b5;
    }
  }
`;

const OptimizeButton = styled.button`
  background-color: #3f51b5;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  align-self: flex-start;
  margin-top: 8px;
  
  &:hover:not(:disabled) {
    background-color: #303f9f;
  }
  
  &:disabled {
    background-color: #f5f5f5;
    color: #999;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #d32f2f;
  padding: 16px;
  background-color: #ffebee;
  border-radius: 8px;
  margin-top: 16px;
`;

const GeofenceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 300px;
  overflow-y: auto;
  padding-right: 8px;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #aaa;
  }
`;

const GeofenceItem = styled.div`
  padding: 12px;
  border: 1px solid #eee;
  border-radius: 8px;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #f9f9f9;
  }
`;

const GeofenceCheckbox = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
  
  input {
    margin-top: 3px;
  }
`;

const GeofenceInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const GeofenceName = styled.span`
  font-weight: 500;
  color: #333;
`;

const GeofenceDescription = styled.span`
  font-size: 14px;
  color: #666;
`;

const MapPlaceholder = styled.div`
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 24px;
  text-align: center;
  color: #666;
  
  p {
    margin: 8px 0;
  }
`;

const RouteDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

const Label = styled.span`
  font-weight: 500;
  color: #333;
`;

const Value = styled.span`
  color: #666;
`;

const AlternativeRoutes = styled.div`
  margin-top: 16px;
  
  h3 {
    font-size: 16px;
    margin-bottom: 12px;
    color: #333;
  }
`;

const AlternativeRoute = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #666;
  font-size: 16px;
`;

/**
 * RouteIntegration Component
 * 
 * Component for integrating geofences with route optimization.
 */
const RouteIntegration = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [avoidGeofences, setAvoidGeofences] = useState([]);
  const [optimizedRoute, setOptimizedRoute] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [geofences, setGeofences] = useState([]);

  const loadGeofences = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await geofencingService.getGeofences({ category: 'restricted' });
      setGeofences(data.items);
      setError(null);
    } catch (err) {
      console.error('Error fetching geofences:', err);
      setError('Failed to load restricted geofences. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadGeofences();
  }, [loadGeofences]);

  const handleOptimizeRoute = async () => {
    if (!origin || !destination) {
      setError('Origin and destination are required');
      return;
    }
    
    try {
      setIsLoading(true);
      const data = await geofencingService.optimizeRouteWithGeofences({
        origin,
        destination,
        avoidGeofences
      });
      setOptimizedRoute(data);
      setError(null);
    } catch (err) {
      console.error('Error optimizing route:', err);
      setError('Failed to optimize route. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGeofenceToggle = (geofenceId) => {
    setAvoidGeofences(prev => {
      if (prev.includes(geofenceId)) {
        return prev.filter(id => id !== geofenceId);
      } else {
        return [...prev, geofenceId];
      }
    });
  };

  return (
    <IntegrationContainer>
      {/* Route Parameters */}
      <Card title="Route Parameters">
        <FormContainer>
          <FormGroup>
            <label htmlFor="origin">Origin:</label>
            <input 
              type="text" 
              id="origin" 
              value={origin} 
              onChange={(e) => setOrigin(e.target.value)}
              placeholder="Enter origin location"
            />
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="destination">Destination:</label>
            <input 
              type="text" 
              id="destination" 
              value={destination} 
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Enter destination location"
            />
          </FormGroup>
          
          <OptimizeButton 
            onClick={handleOptimizeRoute}
            disabled={isLoading}
          >
            {isLoading ? 'Optimizing...' : 'Optimize Route'}
          </OptimizeButton>
          
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </FormContainer>
      </Card>
      
      {/* Geofences to Avoid */}
      <Card title="Geofences to Avoid">
        {isLoading && !optimizedRoute ? (
          <LoadingContainer>Loading geofences...</LoadingContainer>
        ) : geofences.length > 0 ? (
          <GeofenceList>
            {geofences.map(geofence => (
              <GeofenceItem key={geofence.id}>
                <GeofenceCheckbox>
                  <input 
                    type="checkbox" 
                    checked={avoidGeofences.includes(geofence.id)}
                    onChange={() => handleGeofenceToggle(geofence.id)}
                  />
                  <GeofenceInfo>
                    <GeofenceName>{geofence.name}</GeofenceName>
                    <GeofenceDescription>{geofence.description}</GeofenceDescription>
                  </GeofenceInfo>
                </GeofenceCheckbox>
              </GeofenceItem>
            ))}
          </GeofenceList>
        ) : (
          <p>No restricted geofences available.</p>
        )}
      </Card>
      
      {/* Route Map */}
      <Card title="Route Map">
        {isLoading && optimizedRoute === null ? (
          <LoadingContainer>Optimizing route...</LoadingContainer>
        ) : optimizedRoute ? (
          <MapPlaceholder>
            <p>Interactive map showing the optimized route would be displayed here.</p>
            <p>Route from: {optimizedRoute.origin}</p>
            <p>Route to: {optimizedRoute.destination}</p>
            <p>Total waypoints: {optimizedRoute.waypoints.length}</p>
            <p>Avoided geofences: {optimizedRoute.avoidedGeofences.length}</p>
          </MapPlaceholder>
        ) : (
          <p>No route data available. Please enter origin and destination, then click "Optimize Route".</p>
        )}
      </Card>
      
      {/* Route Details */}
      {optimizedRoute && (
        <Card title="Route Details">
          <RouteDetails>
            <DetailItem>
              <Label>Distance:</Label>
              <Value>{optimizedRoute.distance} km</Value>
            </DetailItem>
            <DetailItem>
              <Label>Estimated Time:</Label>
              <Value>{optimizedRoute.duration} min</Value>
            </DetailItem>
            <DetailItem>
              <Label>Avoided Geofences:</Label>
              <Value>{optimizedRoute.avoidedGeofences.length}</Value>
            </DetailItem>
            
            {optimizedRoute.alternativeRoutes && optimizedRoute.alternativeRoutes.length > 0 && (
              <AlternativeRoutes>
                <h3>Alternative Routes</h3>
                {optimizedRoute.alternativeRoutes.map((route, index) => (
                  <AlternativeRoute key={index}>
                    <DetailItem>
                      <Label>Option {index + 1}:</Label>
                      <Value>{route.distance} km, {route.duration} min</Value>
                    </DetailItem>
                    <DetailItem>
                      <Label>Avoided Geofences:</Label>
                      <Value>{route.avoidedGeofences.length}</Value>
                    </DetailItem>
                  </AlternativeRoute>
                ))}
              </AlternativeRoutes>
            )}
          </RouteDetails>
        </Card>
      )}
    </IntegrationContainer>
  );
};

export default RouteIntegration;
