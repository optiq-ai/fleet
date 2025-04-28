import React, { useEffect, useState, useRef, useMemo } from 'react';
import styled from 'styled-components';
import useGoogleMapsApi from '../../hooks/useGoogleMapsApi';

// Define mock truck data outside the component to prevent recreation on re-renders
const mockTrucks = [
  {
    id: 'T001',
    name: 'Truck WA12345',
    status: 'active',
    currentLocation: { latitude: 52.2297, longitude: 21.0122 }, // Warsaw
    currentDriver: 'John Smith',
    lastUpdate: '2 hours ago',
    nextService: '3 days',
    cargo: 'Electronics'
  },
  {
    id: 'T002',
    name: 'Truck GD54321',
    status: 'active',
    currentLocation: { latitude: 54.3520, longitude: 18.6466 }, // Gdansk
    currentDriver: 'Anna Kowalska',
    lastUpdate: '1 hour ago',
    nextService: '15 days',
    cargo: 'Furniture'
  },
  {
    id: 'T003',
    name: 'Truck KR98765',
    status: 'maintenance',
    currentLocation: { latitude: 50.0647, longitude: 19.9450 }, // Krakow
    currentDriver: 'None',
    lastUpdate: '5 hours ago',
    nextService: 'In progress',
    cargo: 'None'
  },
  {
    id: 'T004',
    name: 'Truck WR45678',
    status: 'loading',
    currentLocation: { latitude: 51.1079, longitude: 17.0385 }, // Wroclaw
    currentDriver: 'Piotr Nowak',
    lastUpdate: '30 minutes ago',
    nextService: '7 days',
    cargo: 'Food products'
  },
  {
    id: 'T005',
    name: 'Truck PO13579',
    status: 'unloading',
    currentLocation: { latitude: 52.4064, longitude: 16.9252 }, // Poznan
    currentDriver: 'Marek Wiśniewski',
    lastUpdate: '45 minutes ago',
    nextService: '10 days',
    cargo: 'Construction materials'
  },
  {
    id: 'T006',
    name: 'Truck LO24680',
    status: 'active',
    currentLocation: { latitude: 51.7592, longitude: 19.4560 }, // Lodz
    currentDriver: 'Katarzyna Zielińska',
    lastUpdate: '1.5 hours ago',
    nextService: '5 days',
    cargo: 'Automotive parts'
  }
];

const MapContainer = styled.div`
  height: 400px;
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

/**
 * Component for displaying truck fleet locations on a map
 * @returns {JSX.Element} FleetMap component
 */
const FleetMap = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [stats, setStats] = useState({
    active: 0,
    maintenance: 0,
    loading: 0,
    unloading: 0
  });
  
  // Use the shared Google Maps API hook
  const { loaded: googleMapsLoaded, error: googleMapsError } = useGoogleMapsApi();
  
  // Memoize the filtered truck data to prevent unnecessary re-renders of the marker effect
  const trucksWithLocation = useMemo(() => mockTrucks.filter(truck => 
    truck.currentLocation && 
    truck.currentLocation.latitude && 
    truck.currentLocation.longitude
  ), []); // Empty dependency array as mockTrucks is constant
  
  // Initialize map when Google Maps API is loaded and mapRef is available
  useEffect(() => {
    if (!googleMapsLoaded || !mapRef.current || map) { // Prevent re-initialization if map already exists
      if (googleMapsError) {
        console.error("Error loading Google Maps API:", googleMapsError);
      }
      return;
    }
    
    console.log("Google Maps API loaded successfully, initializing map...");
    
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
      
      console.log("Setting map state");
      setMap(newMap);
    } catch (error) {
      console.error("Error initializing map:", error);
    }
    
  }, [googleMapsLoaded, googleMapsError, map]); // Add map to dependency array to prevent re-initialization
  
  // Add markers to the map
  useEffect(() => {
    console.log("Adding markers effect triggered", { map, trucksWithLocation });
    if (!map || !trucksWithLocation.length) {
      console.log("Map or trucks not available yet");
      return;
    }
    
    // Store current markers in a local variable to use in cleanup
    let currentMarkers = [];
    
    try {
      console.log("Removing existing markers");
      // Remove existing markers before adding new ones
      markers.forEach(marker => marker.setMap(null));
      
      // Counters for statistics
      let activeCount = 0;
      let maintenanceCount = 0;
      let loadingCount = 0;
      let unloadingCount = 0;
      
      console.log("Creating new markers for trucks:", trucksWithLocation.length);
      // Add new markers
      currentMarkers = trucksWithLocation.map(truck => {
        // Determine marker color based on truck status
        let markerColor;
        
        switch (truck.status) {
          case 'active':
            markerColor = '#4caf50'; // green
            activeCount++;
            break;
          case 'maintenance':
            markerColor = '#f44336'; // red
            maintenanceCount++;
            break;
          case 'loading':
            markerColor = '#2196f3'; // blue
            loadingCount++;
            break;
          case 'unloading':
            markerColor = '#9c27b0'; // purple
            unloadingCount++;
            break;
          default:
            markerColor = '#757575'; // grey
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
        
        console.log(`Creating marker for truck ${truck.name} at position:`, truck.currentLocation);
        // Create marker
        const marker = new window.google.maps.Marker({
          position: {
            lat: parseFloat(truck.currentLocation.latitude),
            lng: parseFloat(truck.currentLocation.longitude)
          },
          map,
          icon: markerIcon,
          title: truck.name,
          animation: window.google.maps.Animation.DROP
        });
        
        // Add infowindow
        const infowindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 8px;">
              <div style="font-weight: bold; margin-bottom: 4px;">${truck.name}</div>
              <div>Kierowca: ${truck.currentDriver || 'Brak'}</div>
              <div>Status: ${
                truck.status === 'active' ? 'Aktywny' : 
                truck.status === 'maintenance' ? 'W serwisie' : 
                truck.status === 'loading' ? 'Załadunek' : 
                truck.status === 'unloading' ? 'Rozładunek' : truck.status
              }</div>
              <div>Ładunek: ${truck.cargo || 'Brak'}</div>
              <div>Następny serwis: ${truck.nextService}</div>
              <div>Ostatnia aktualizacja: ${truck.lastUpdate}</div>
            </div>
          `
        });
        
        // Handle marker click
        marker.addListener('click', () => {
          console.log(`Marker clicked for truck: ${truck.name}`);
          // Close all open infowindows (using currentMarkers)
          currentMarkers.forEach(m => {
            if (m.infowindow) {
              m.infowindow.close();
            }
          });
          
          // Open infowindow for clicked marker
          infowindow.open(map, marker);
        });
        
        // Save infowindow in marker
        marker.infowindow = infowindow;
        
        return marker;
      });
      
      console.log("Updating statistics", { activeCount, maintenanceCount, loadingCount, unloadingCount });
      // Update statistics
      setStats({
        active: activeCount,
        maintenance: maintenanceCount,
        loading: loadingCount,
        unloading: unloadingCount
      });
      
      // Save markers to state
      setMarkers(currentMarkers);
      
      console.log("Fitting map bounds to markers");
      // Fit map view to markers
      if (currentMarkers.length > 0) {
        const bounds = new window.google.maps.LatLngBounds();
        
        currentMarkers.forEach(marker => {
          bounds.extend(marker.getPosition());
        });
        
        map.fitBounds(bounds);
        
        // Adjust zoom if necessary after fitting bounds
        const listener = window.google.maps.event.addListenerOnce(map, 'idle', () => {
          if (map.getZoom() > 12) map.setZoom(12); // Prevent excessive zoom on single marker
          if (currentMarkers.length === 1 && map.getZoom() < 10) map.setZoom(10); // Ensure reasonable zoom for single marker
        });
        // Clean up listener
        // setTimeout(() => window.google.maps.event.removeListener(listener), 2000); 
      }
    } catch (error) {
      console.error("Error adding markers to map:", error);
    }
    
    // Cleanup function for the effect
    return () => {
      console.log("Cleaning up markers from effect");
      // Use the markers stored in the local variable for cleanup
      currentMarkers.forEach(marker => marker.setMap(null));
    };
  // Dependency array: run only when map instance or truck data changes
  }, [map, trucksWithLocation]); 

  return (
    <MapContainer>
      {!googleMapsLoaded ? (
        <MapPlaceholder>
          <div>Loading Map...</div>
        </MapPlaceholder>
      ) : googleMapsError ? (
        <MapPlaceholder>
          <div>Error loading map. Please check the API key and network connection.</div>
          <div style={{ fontSize: '12px', marginTop: '8px' }}>{googleMapsError.message}</div>
        </MapPlaceholder>
      ) : trucksWithLocation.length === 0 ? (
        <MapPlaceholder>
          <div>Brak aktywnych ciężarówek z danymi lokalizacji</div>
          <div style={{ fontSize: '12px', marginTop: '8px' }}>Sprawdź połączenie z systemem monitoringu floty</div>
        </MapPlaceholder>
      ) : (
        <MapContent ref={mapRef} />
      )}
      
      {googleMapsLoaded && !googleMapsError && trucksWithLocation.length > 0 && (
        <>
          <MapOverlay>
            <div>Aktywne ciężarówki: {stats.active}</div>
            <div>W serwisie: {stats.maintenance}</div>
            <div>Załadunek: {stats.loading}</div>
            <div>Rozładunek: {stats.unloading}</div>
          </MapOverlay>
          
          <MapLegend>
            <LegendItem>
              <LegendColor color="#4caf50" />
              <LegendText>Aktywne</LegendText>
            </LegendItem>
            <LegendItem>
              <LegendColor color="#f44336" />
              <LegendText>W serwisie</LegendText>
            </LegendItem>
            <LegendItem>
              <LegendColor color="#2196f3" />
              <LegendText>Załadunek</LegendText>
            </LegendItem>
            <LegendItem>
              <LegendColor color="#9c27b0" />
              <LegendText>Rozładunek</LegendText>
            </LegendItem>
          </MapLegend>
        </>
      )}
    </MapContainer>
  );
};

export default FleetMap;

