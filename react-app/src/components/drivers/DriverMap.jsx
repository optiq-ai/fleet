import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import Card from '../common/Card';
import useGoogleMapsApi from '../../hooks/useGoogleMapsApi';

const MapContainer = styled.div`
  height: 500px;
  background-color: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  z-index: 0; /* Ensure proper stacking context */
`;

const MapContent = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  z-index: 1; /* Ensure map is above other elements */
`;

const MapPlaceholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #666;
  flex-direction: column;
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
  font-size: 14px;
`;

const MapLegend = styled.div`
  position: absolute;
  bottom: 16px;
  left: 16px;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 12px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;
  font-size: 14px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const LegendColor = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${props => props.color};
  margin-right: 8px;
`;

const LegendText = styled.div`
  font-size: 12px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 500;
  color: #333;
  margin: 0 0 16px 0;
`;

const LoadingIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  color: #666;
`;

const DriverInfo = styled.div`
  margin-top: 16px;
  padding: 16px;
  background-color: #f5f5f5;
  border-radius: 8px;
`;

const InfoRow = styled.div`
  display: flex;
  margin-bottom: 8px;
`;

const InfoLabel = styled.div`
  font-weight: 500;
  width: 150px;
  color: #666;
`;

const InfoValue = styled.div`
  flex: 1;
`;

/**
 * Component for displaying drivers on a map
 * @param {Object} props - Component props
 * @param {Array} props.drivers - List of drivers
 * @param {Object} props.selectedDriver - Selected driver
 * @param {Function} props.onDriverSelect - Function to handle driver selection
 * @returns {JSX.Element} DriverMap component
 */
const DriverMap = ({ drivers, selectedDriver, onDriverSelect }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [stats, setStats] = useState({
    active: 0,
    inactive: 0,
    on_leave: 0
  });
  
  // Use the shared Google Maps API hook
  const { loaded: googleMapsLoaded, error: googleMapsError } = useGoogleMapsApi();
  
  // Filter drivers with location data
  const driversWithLocation = drivers && drivers.length > 0 ? drivers.filter(driver => 
    driver.currentLocation && 
    driver.currentLocation.latitude && 
    driver.currentLocation.longitude
  ) : [];
  
  // Initialize map when Google Maps API is loaded
  useEffect(() => {
    if (!googleMapsLoaded || !mapRef.current) {
      if (googleMapsError) {
        console.error("Error loading Google Maps API:", googleMapsError);
      }
      return;
    }
    
    console.log("Google Maps API loaded successfully, initializing map...");
    initializeMap();
  }, [googleMapsLoaded, googleMapsError]);
  
  // Initialize map
  const initializeMap = () => {
    console.log("Initializing map...");
    if (!mapRef.current) {
      console.error("Map reference is not available");
      return;
    }
    
    try {
      // Center of Poland
      const center = { lat: 52.0692, lng: 19.4803 };
      
      const mapOptions = {
        center,
        zoom: 6,
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
        zoomControl: true,
        gestureHandling: 'greedy', // Makes the map fully draggable
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ]
      };
      
      console.log("Creating new Google Map instance");
      const newMap = new window.google.maps.Map(mapRef.current, mapOptions);
      
      // Add event listener to confirm map is interactive
      newMap.addListener('tilesloaded', () => {
        console.log("Map tiles loaded successfully");
      });
      
      newMap.addListener('click', (event) => {
        console.log("Map clicked at:", event.latLng.lat(), event.latLng.lng());
      });
      
      console.log("Setting map state");
      setMap(newMap);
    } catch (error) {
      console.error("Error initializing map:", error);
    }
  };
  
  // Add markers to the map
  useEffect(() => {
    console.log("Adding markers effect triggered", { map, driversWithLocation });
    if (!map || !driversWithLocation.length) {
      console.log("Map or drivers not available yet");
      return;
    }
    
    try {
      console.log("Removing existing markers");
      // Remove existing markers
      if (markers.length > 0) {
        markers.forEach(marker => marker.setMap(null));
      }
      
      // Counters for statistics
      let activeCount = 0;
      let inactiveCount = 0;
      let onLeaveCount = 0;
      
      console.log("Creating new markers for drivers:", driversWithLocation.length);
      // Add new markers
      const newMarkers = driversWithLocation.map(driver => {
        // Determine marker color based on driver status
        let markerColor;
        
        switch (driver.status) {
          case 'active':
            markerColor = '#4caf50'; // green
            activeCount++;
            break;
          case 'inactive':
            markerColor = '#f44336'; // red
            inactiveCount++;
            break;
          case 'on_leave':
            markerColor = '#ff9800'; // orange
            onLeaveCount++;
            break;
          default:
            markerColor = '#2196f3'; // blue
        }
        
        // Create marker icon
        const markerIcon = {
          path: window.google.maps.SymbolPath.CIRCLE,
          fillColor: markerColor,
          fillOpacity: 0.8,
          strokeColor: '#ffffff',
          strokeWeight: 2,
          scale: 10
        };
        
        console.log(`Creating marker for driver ${driver.name} at position:`, driver.currentLocation);
        // Create marker
        const marker = new window.google.maps.Marker({
          position: {
            lat: parseFloat(driver.currentLocation.latitude),
            lng: parseFloat(driver.currentLocation.longitude)
          },
          map,
          icon: markerIcon,
          title: driver.name,
          animation: window.google.maps.Animation.DROP
        });
        
        // Add infowindow
        const infowindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 8px;">
              <div style="font-weight: bold; margin-bottom: 4px;">${driver.name}</div>
              <div>Pojazd: ${driver.currentVehicle || 'Brak'}</div>
              <div>Status: ${
                driver.status === 'active' ? 'Aktywny' : 
                driver.status === 'inactive' ? 'Nieaktywny' : 
                driver.status === 'on_leave' ? 'Na urlopie' : driver.status
              }</div>
              <div>Ocena bezpieczeństwa: ${driver.safetyScore}%</div>
              <div>Ostatnia aktualizacja: ${driver.lastUpdate}</div>
            </div>
          `
        });
        
        // Handle marker click
        marker.addListener('click', () => {
          console.log(`Marker clicked for driver: ${driver.name}`);
          // Close all open infowindows
          newMarkers.forEach(m => {
            if (m.infowindow) {
              m.infowindow.close();
            }
          });
          
          // Open infowindow for clicked marker
          infowindow.open(map, marker);
          
          // Call callback
          if (onDriverSelect) {
            onDriverSelect(driver);
          }
        });
        
        // Save infowindow in marker
        marker.infowindow = infowindow;
        
        return marker;
      });
      
      console.log("Updating statistics", { activeCount, inactiveCount, onLeaveCount });
      // Update statistics
      setStats({
        active: activeCount,
        inactive: inactiveCount,
        on_leave: onLeaveCount
      });
      
      // Save markers
      setMarkers(newMarkers);
      
      console.log("Fitting map bounds to markers");
      // Fit map view to markers
      if (newMarkers.length > 0) {
        const bounds = new window.google.maps.LatLngBounds();
        
        newMarkers.forEach(marker => {
          bounds.extend(marker.getPosition());
        });
        
        map.fitBounds(bounds);
        
        // If there's only one marker, set zoom
        if (newMarkers.length === 1) {
          map.setZoom(12);
        }
      }
    } catch (error) {
      console.error("Error adding markers to map:", error);
    }
    
    // Cleanup
    return () => {
      if (markers.length > 0) {
        console.log("Cleaning up markers");
        markers.forEach(marker => marker.setMap(null));
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, driversWithLocation, onDriverSelect]);
  
  if (!drivers || drivers.length === 0) {
    return (
      <Card>
        <SectionTitle>Mapa kierowców</SectionTitle>
        <LoadingIndicator>Brak danych kierowców do wyświetlenia na mapie.</LoadingIndicator>
      </Card>
    );
  }

  return (
    <Card>
      <SectionTitle>Mapa kierowców</SectionTitle>
      <MapContainer>
        {driversWithLocation.length === 0 ? (
          <MapPlaceholder>
            <div>Brak aktywnych kierowców z danymi lokalizacji</div>
            <div style={{ fontSize: '12px', marginTop: '8px' }}>Tylko kierowcy ze statusem "aktywny" i przypisanym pojazdem są widoczni na mapie</div>
          </MapPlaceholder>
        ) : (
          <MapContent ref={mapRef} />
        )}
        
        {driversWithLocation.length > 0 && (
          <>
            <MapOverlay>
              <div>Aktywni kierowcy: {stats.active}</div>
              <div>Nieaktywni kierowcy: {stats.inactive}</div>
              <div>Kierowcy na urlopie: {stats.on_leave}</div>
            </MapOverlay>
            
            <MapLegend>
              <LegendItem>
                <LegendColor color="#4caf50" />
                <LegendText>Aktywni</LegendText>
              </LegendItem>
              <LegendItem>
                <LegendColor color="#f44336" />
                <LegendText>Nieaktywni</LegendText>
              </LegendItem>
              <LegendItem>
                <LegendColor color="#ff9800" />
                <LegendText>Na urlopie</LegendText>
              </LegendItem>
            </MapLegend>
          </>
        )}
      </MapContainer>
      
      {selectedDriver && selectedDriver.currentLocation && (
        <DriverInfo>
          <SectionTitle style={{ fontSize: '16px' }}>Informacje o lokalizacji</SectionTitle>
          <InfoRow>
            <InfoLabel>Kierowca:</InfoLabel>
            <InfoValue>{selectedDriver.name}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Pojazd:</InfoLabel>
            <InfoValue>{selectedDriver.currentVehicle || 'Brak przypisanego pojazdu'}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Status:</InfoLabel>
            <InfoValue>
              {selectedDriver.status === 'active' ? 'Aktywny' : 
               selectedDriver.status === 'inactive' ? 'Nieaktywny' : 
               selectedDriver.status === 'on_leave' ? 'Na urlopie' : selectedDriver.status}
            </InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Współrzędne:</InfoLabel>
            <InfoValue>
              {selectedDriver.currentLocation.latitude.toFixed(4)}, {selectedDriver.currentLocation.longitude.toFixed(4)}
            </InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Ocena bezpieczeństwa:</InfoLabel>
            <InfoValue>{selectedDriver.safetyScore}%</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Ostatnia aktualizacja:</InfoLabel>
            <InfoValue>{selectedDriver.lastUpdate}</InfoValue>
          </InfoRow>
        </DriverInfo>
      )}
    </Card>
  );
};

export default DriverMap;
