import React, { useState, useEffect, useCallback } from 'react';
import Card from '../common/Card';
import * as geofencingService from '../../services/api/mockGeofencingService';

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
    <div className="route-integration">
      {/* Route Parameters */}
      <Card title="Route Parameters" className="route-params-card">
        <div className="form-container">
          <div className="form-group">
            <label htmlFor="origin">Origin:</label>
            <input 
              type="text" 
              id="origin" 
              value={origin} 
              onChange={(e) => setOrigin(e.target.value)}
              placeholder="Enter origin location"
              className="route-input"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="destination">Destination:</label>
            <input 
              type="text" 
              id="destination" 
              value={destination} 
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Enter destination location"
              className="route-input"
            />
          </div>
          
          <button 
            className="optimize-button"
            onClick={handleOptimizeRoute}
            disabled={isLoading}
          >
            {isLoading ? 'Optimizing...' : 'Optimize Route'}
          </button>
          
          {error && <div className="error-message">{error}</div>}
        </div>
      </Card>
      
      {/* Geofences to Avoid */}
      <Card title="Geofences to Avoid" className="avoid-geofences-card">
        {isLoading && !optimizedRoute ? (
          <div className="loading">Loading geofences...</div>
        ) : geofences.length > 0 ? (
          <div className="geofence-list">
            {geofences.map(geofence => (
              <div key={geofence.id} className="geofence-item">
                <label className="geofence-checkbox">
                  <input 
                    type="checkbox" 
                    checked={avoidGeofences.includes(geofence.id)}
                    onChange={() => handleGeofenceToggle(geofence.id)}
                  />
                  <span className="geofence-name">{geofence.name}</span>
                  <span className="geofence-description">{geofence.description}</span>
                </label>
              </div>
            ))}
          </div>
        ) : (
          <p>No restricted geofences available.</p>
        )}
      </Card>
      
      {/* Route Map */}
      <Card title="Route Map" className="route-map-card">
        {isLoading && optimizedRoute === null ? (
          <div className="loading">Optimizing route...</div>
        ) : optimizedRoute ? (
          <div className="route-map">
            <div className="map-placeholder">
              <p>Interactive map showing the optimized route would be displayed here.</p>
              <p>Route from: {optimizedRoute.origin}</p>
              <p>Route to: {optimizedRoute.destination}</p>
              <p>Total waypoints: {optimizedRoute.waypoints.length}</p>
              <p>Avoided geofences: {optimizedRoute.avoidedGeofences.length}</p>
            </div>
          </div>
        ) : (
          <p>No route data available. Please enter origin and destination, then click "Optimize Route".</p>
        )}
      </Card>
      
      {/* Route Details */}
      {optimizedRoute && (
        <Card title="Route Details" className="route-details-card">
          <div className="route-details">
            <div className="detail-item">
              <span className="label">Distance:</span>
              <span className="value">{optimizedRoute.distance} km</span>
            </div>
            <div className="detail-item">
              <span className="label">Estimated Time:</span>
              <span className="value">{optimizedRoute.duration} min</span>
            </div>
            <div className="detail-item">
              <span className="label">Avoided Geofences:</span>
              <span className="value">{optimizedRoute.avoidedGeofences.length}</span>
            </div>
            
            {optimizedRoute.alternativeRoutes && optimizedRoute.alternativeRoutes.length > 0 && (
              <div className="alternative-routes">
                <h3>Alternative Routes</h3>
                {optimizedRoute.alternativeRoutes.map((route, index) => (
                  <div key={index} className="alternative-route">
                    <div className="detail-item">
                      <span className="label">Option {index + 1}:</span>
                      <span className="value">{route.distance} km, {route.duration} min</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Avoided Geofences:</span>
                      <span className="value">{route.avoidedGeofences.length}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};

export default RouteIntegration;
