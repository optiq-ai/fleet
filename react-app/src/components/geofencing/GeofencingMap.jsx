import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import useGoogleMapsApi from '../../hooks/useGoogleMapsApi';

/**
 * GeofencingMap Component
 * 
 * Interactive map showing geofences and vehicles
 * 
 * @param {Object} props - Component props
 * @param {Array} props.geofences - Array of geofence objects
 * @param {Array} props.vehicles - Array of vehicle objects
 * @returns {JSX.Element} GeofencingMap component
 */
const GeofencingMap = ({ geofences = [], vehicles = [] }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [geofencePolygons, setGeofencePolygons] = useState([]);
  const [geofenceCircles, setGeofenceCircles] = useState([]);
  const [vehicleMarkers, setVehicleMarkers] = useState([]);
  const [infoWindow, setInfoWindow] = useState(null);
  const { loaded: googleMapsLoaded, error: googleMapsError } = useGoogleMapsApi();
  
  // Initialize map
  useEffect(() => {
    if (!googleMapsLoaded || !mapRef.current) return;
    
    const mapOptions = {
      center: { lat: 52.2297, lng: 21.0122 }, // Default center (Warsaw)
      zoom: 10,
      mapTypeId: window.google.maps.MapTypeId.ROADMAP,
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: window.google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: window.google.maps.ControlPosition.TOP_RIGHT
      },
      zoomControl: true,
      zoomControlOptions: {
        position: window.google.maps.ControlPosition.RIGHT_CENTER
      },
      scaleControl: true,
      streetViewControl: true,
      streetViewControlOptions: {
        position: window.google.maps.ControlPosition.RIGHT_BOTTOM
      },
      fullscreenControl: true
    };
    
    const newMap = new window.google.maps.Map(mapRef.current, mapOptions);
    setMap(newMap);
    
    const newInfoWindow = new window.google.maps.InfoWindow();
    setInfoWindow(newInfoWindow);
    
    return () => {
      // Cleanup
      if (infoWindow) infoWindow.close();
    };
  }, [googleMapsLoaded]);
  
  // Render geofences
  useEffect(() => {
    if (!googleMapsLoaded || !map || !geofences.length) return;
    
    // Clear existing geofences
    geofencePolygons.forEach(polygon => polygon.setMap(null));
    geofenceCircles.forEach(circle => circle.setMap(null));
    
    const newPolygons = [];
    const newCircles = [];
    
    geofences.forEach(geofence => {
      if (geofence.type === 'polygon') {
        // Create polygon
        const polygonPath = geofence.coordinates.map(coord => ({
          lat: coord.lat,
          lng: coord.lng
        }));
        
        const polygonColor = getGeofenceColor(geofence.category);
        
        const polygon = new window.google.maps.Polygon({
          paths: polygonPath,
          strokeColor: polygonColor,
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: polygonColor,
          fillOpacity: 0.35,
          map: map
        });
        
        // Add click listener
        polygon.addListener('click', () => {
          const contentString = `
            <div class="info-window">
              <h3>${geofence.name}</h3>
              <p>${geofence.description}</p>
              <p><strong>Category:</strong> ${geofence.category}</p>
              <p><strong>Status:</strong> ${geofence.status}</p>
            </div>
          `;
          
          infoWindow.setContent(contentString);
          infoWindow.setPosition(polygonPath[0]);
          infoWindow.open(map);
        });
        
        newPolygons.push(polygon);
      } else if (geofence.type === 'circle') {
        // Create circle
        const center = {
          lat: geofence.coordinates[0].lat,
          lng: geofence.coordinates[0].lng
        };
        
        const circleColor = getGeofenceColor(geofence.category);
        
        const circle = new window.google.maps.Circle({
          strokeColor: circleColor,
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: circleColor,
          fillOpacity: 0.35,
          map: map,
          center: center,
          radius: geofence.radius
        });
        
        // Add click listener
        circle.addListener('click', () => {
          const contentString = `
            <div class="info-window">
              <h3>${geofence.name}</h3>
              <p>${geofence.description}</p>
              <p><strong>Category:</strong> ${geofence.category}</p>
              <p><strong>Status:</strong> ${geofence.status}</p>
              <p><strong>Radius:</strong> ${geofence.radius}m</p>
            </div>
          `;
          
          infoWindow.setContent(contentString);
          infoWindow.setPosition(center);
          infoWindow.open(map);
        });
        
        newCircles.push(circle);
      }
    });
    
    setGeofencePolygons(newPolygons);
    setGeofenceCircles(newCircles);
    
    // Fit bounds to include all geofences
    if (newPolygons.length > 0 || newCircles.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      
      geofences.forEach(geofence => {
        geofence.coordinates.forEach(coord => {
          bounds.extend(new window.google.maps.LatLng(coord.lat, coord.lng));
        });
        
        // If it's a circle, extend bounds to include the radius
        if (geofence.type === 'circle' && geofence.radius) {
          const center = geofence.coordinates[0];
          const northEast = new window.google.maps.geometry.spherical.computeOffset(
            new window.google.maps.LatLng(center.lat, center.lng),
            geofence.radius * 1.1, // Add 10% to ensure circle is fully visible
            45 // Northeast direction
          );
          const southWest = new window.google.maps.geometry.spherical.computeOffset(
            new window.google.maps.LatLng(center.lat, center.lng),
            geofence.radius * 1.1,
            225 // Southwest direction
          );
          
          bounds.extend(northEast);
          bounds.extend(southWest);
        }
      });
      
      map.fitBounds(bounds);
    }
    
    return () => {
      // Cleanup
      newPolygons.forEach(polygon => polygon.setMap(null));
      newCircles.forEach(circle => circle.setMap(null));
    };
  }, [googleMapsLoaded, map, geofences, infoWindow]);
  
  // Render vehicles
  useEffect(() => {
    if (!googleMapsLoaded || !map || !vehicles.length) return;
    
    // Clear existing markers
    vehicleMarkers.forEach(marker => marker.setMap(null));
    
    const newMarkers = [];
    
    vehicles.forEach(vehicle => {
      const position = {
        lat: vehicle.coordinates.lat,
        lng: vehicle.coordinates.lng
      };
      
      // Create marker
      const marker = new window.google.maps.Marker({
        position: position,
        map: map,
        title: vehicle.plate,
        icon: {
          path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
          scale: 6,
          fillColor: getVehicleColor(vehicle.status),
          fillOpacity: 1,
          strokeWeight: 2,
          strokeColor: '#FFFFFF',
          rotation: vehicle.heading
        }
      });
      
      // Add click listener
      marker.addListener('click', () => {
        const contentString = `
          <div class="info-window">
            <h3>Vehicle: ${vehicle.plate}</h3>
            <p><strong>Type:</strong> ${vehicle.type}</p>
            <p><strong>Driver:</strong> ${vehicle.driver}</p>
            <p><strong>Status:</strong> ${vehicle.status}</p>
            <p><strong>Speed:</strong> ${vehicle.speed} km/h</p>
            ${vehicle.zone ? `<p><strong>Current Zone:</strong> ${vehicle.zone}</p>` : ''}
          </div>
        `;
        
        infoWindow.setContent(contentString);
        infoWindow.open(map, marker);
      });
      
      newMarkers.push(marker);
    });
    
    setVehicleMarkers(newMarkers);
    
    return () => {
      // Cleanup
      newMarkers.forEach(marker => marker.setMap(null));
    };
  }, [googleMapsLoaded, map, vehicles, infoWindow]);
  
  // Helper function to get color based on geofence category
  const getGeofenceColor = (category) => {
    switch (category) {
      case 'warehouse':
        return '#4285F4'; // Blue
      case 'customer':
        return '#34A853'; // Green
      case 'restricted':
        return '#EA4335'; // Red
      case 'hazardous':
        return '#FBBC05'; // Yellow
      case 'corridor':
        return '#9C27B0'; // Purple
      default:
        return '#4285F4'; // Default blue
    }
  };
  
  // Helper function to get color based on vehicle status
  const getVehicleColor = (status) => {
    switch (status) {
      case 'in-zone':
        return '#34A853'; // Green
      case 'moving':
        return '#4285F4'; // Blue
      case 'stopped':
        return '#FBBC05'; // Yellow
      case 'violation':
        return '#EA4335'; // Red
      default:
        return '#4285F4'; // Default blue
    }
  };
  
  // Render stats panel
  const renderStatsPanel = () => {
    if (!googleMapsLoaded || !map) return null;
    
    const geofenceCount = geofences.length;
    const vehicleCount = vehicles.length;
    
    // Count vehicles by status
    const vehiclesByStatus = vehicles.reduce((acc, vehicle) => {
      acc[vehicle.status] = (acc[vehicle.status] || 0) + 1;
      return acc;
    }, {});
    
    // Count geofences by category
    const geofencesByCategory = geofences.reduce((acc, geofence) => {
      acc[geofence.category] = (acc[geofence.category] || 0) + 1;
      return acc;
    }, {});
    
    return (
      <StatsPanel>
        <StatsPanelTitle>Map Statistics</StatsPanelTitle>
        <StatsPanelContent>
          <StatItem>
            <StatLabel>Total Geofences:</StatLabel>
            <StatValue>{geofenceCount}</StatValue>
          </StatItem>
          <StatItem>
            <StatLabel>Vehicles Tracked:</StatLabel>
            <StatValue>{vehicleCount}</StatValue>
          </StatItem>
          
          {Object.entries(vehiclesByStatus).map(([status, count]) => (
            <StatItem key={`vehicle-${status}`}>
              <StatLabel>{status}:</StatLabel>
              <StatValue>{count}</StatValue>
            </StatItem>
          ))}
        </StatsPanelContent>
      </StatsPanel>
    );
  };
  
  // Render legend
  const renderLegend = () => {
    if (!googleMapsLoaded || !map) return null;
    
    return (
      <Legend>
        <LegendTitle>Legend</LegendTitle>
        <LegendContent>
          <LegendSection>
            <LegendSectionTitle>Geofences</LegendSectionTitle>
            <LegendItem>
              <LegendColor color="#4285F4" />
              <LegendLabel>Warehouse</LegendLabel>
            </LegendItem>
            <LegendItem>
              <LegendColor color="#34A853" />
              <LegendLabel>Customer</LegendLabel>
            </LegendItem>
            <LegendItem>
              <LegendColor color="#EA4335" />
              <LegendLabel>Restricted</LegendLabel>
            </LegendItem>
            <LegendItem>
              <LegendColor color="#FBBC05" />
              <LegendLabel>Hazardous</LegendLabel>
            </LegendItem>
            <LegendItem>
              <LegendColor color="#9C27B0" />
              <LegendLabel>Corridor</LegendLabel>
            </LegendItem>
          </LegendSection>
          
          <LegendSection>
            <LegendSectionTitle>Vehicles</LegendSectionTitle>
            <LegendItem>
              <LegendColor color="#34A853" />
              <LegendLabel>In Zone</LegendLabel>
            </LegendItem>
            <LegendItem>
              <LegendColor color="#4285F4" />
              <LegendLabel>Moving</LegendLabel>
            </LegendItem>
            <LegendItem>
              <LegendColor color="#FBBC05" />
              <LegendLabel>Stopped</LegendLabel>
            </LegendItem>
            <LegendItem>
              <LegendColor color="#EA4335" />
              <LegendLabel>Violation</LegendLabel>
            </LegendItem>
          </LegendSection>
        </LegendContent>
      </Legend>
    );
  };
  
  if (googleMapsError) {
    return (
      <ErrorContainer>
        <ErrorMessage>Error loading Google Maps: {googleMapsError}</ErrorMessage>
      </ErrorContainer>
    );
  }
  
  return (
    <MapContainer>
      {!googleMapsLoaded && (
        <LoadingContainer>
          <LoadingMessage>Loading map...</LoadingMessage>
        </LoadingContainer>
      )}
      <div ref={mapRef} style={{ height: '100%', width: '100%' }} />
      {renderStatsPanel()}
      {renderLegend()}
    </MapContainer>
  );
};

const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  border-radius: 8px;
  overflow: hidden;
`;

const LoadingContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 10;
`;

const LoadingMessage = styled.div`
  font-size: 16px;
  color: #666;
`;

const ErrorContainer = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffebee;
  border-radius: 8px;
`;

const ErrorMessage = styled.div`
  color: #d32f2f;
  font-size: 16px;
  text-align: center;
  padding: 20px;
`;

const StatsPanel = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  padding: 10px;
  z-index: 5;
  max-width: 200px;
`;

const StatsPanelTitle = styled.div`
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 8px;
  color: #333;
  border-bottom: 1px solid #eee;
  padding-bottom: 4px;
`;

const StatsPanelContent = styled.div`
  font-size: 12px;
`;

const StatItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
`;

const StatLabel = styled.div`
  color: #666;
`;

const StatValue = styled.div`
  font-weight: bold;
  color: #333;
`;

const Legend = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  padding: 10px;
  z-index: 5;
  max-width: 200px;
`;

const LegendTitle = styled.div`
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 8px;
  color: #333;
  border-bottom: 1px solid #eee;
  padding-bottom: 4px;
`;

const LegendContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const LegendSection = styled.div`
  margin-bottom: 4px;
`;

const LegendSectionTitle = styled.div`
  font-weight: bold;
  font-size: 12px;
  margin-bottom: 4px;
  color: #333;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2px;
`;

const LegendColor = styled.div`
  width: 12px;
  height: 12px;
  background-color: ${props => props.color};
  border-radius: 2px;
  margin-right: 6px;
`;

const LegendLabel = styled.div`
  font-size: 11px;
  color: #666;
`;

export default GeofencingMap;
