import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import useGoogleMapsApi from '../../hooks/useGoogleMapsApi';

/**
 * @typedef {Object} TollPoint
 * @property {string} id - Toll point ID
 * @property {number} lat - Latitude
 * @property {number} lng - Longitude
 * @property {string} type - Type of toll point
 * @property {string} name - Name of toll point
 * @property {number} amount - Amount of toll
 * @property {number} frequency - Frequency of usage
 */

const MapContainer = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
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
 * Road Tolls Activity Map component for displaying toll points on Google Maps
 * @param {Object} props Component props
 * @param {Array<TollPoint>} props.tollPoints Array of toll point objects
 * @param {Function} props.onMarkerClick Callback when marker is clicked
 * @returns {JSX.Element} Road Tolls Activity Map component
 */
const RoadTollsActivityMap = ({ 
  tollPoints = [],
  onMarkerClick
}) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [stats, setStats] = useState({
    highActivity: 0,
    mediumActivity: 0,
    lowActivity: 0
  });
  const { loaded: googleMapsLoaded, error: googleMapsError } = useGoogleMapsApi();
  
  // Initialize Google Maps
  useEffect(() => {
    if (!googleMapsLoaded || !mapRef.current) {
      if (googleMapsError) {
        console.error("Error loading Google Maps API:", googleMapsError);
      }
      return;
    }
    
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
    
    const newMap = new window.google.maps.Map(mapRef.current, mapOptions);
    setMap(newMap);
  }, [googleMapsLoaded, googleMapsError]);
  
  // Add markers to the map
  useEffect(() => {
    if (!map || !tollPoints.length) return;
    
    // Remove existing markers
    if (markers.length > 0) {
      markers.forEach(marker => marker.setMap(null));
    }
    
    // Counters for statistics
    let highActivityCount = 0;
    let mediumActivityCount = 0;
    let lowActivityCount = 0;
    
    // Add new markers
    const newMarkers = tollPoints.map(point => {
      // Determine marker color and size based on amount/frequency
      let markerColor;
      let markerSize;
      
      // Classify toll points by amount
      if (point.amount > 1000) {
        markerColor = '#f44336'; // red - high amount
        markerSize = 12;
        highActivityCount++;
      } else if (point.amount > 500) {
        markerColor = '#ff9800'; // orange - medium amount
        markerSize = 10;
        mediumActivityCount++;
      } else {
        markerColor = '#4caf50'; // green - low amount
        markerSize = 8;
        lowActivityCount++;
      }
      
      // Create marker icon
      const markerIcon = {
        path: window.google.maps.SymbolPath.CIRCLE,
        fillColor: markerColor,
        fillOpacity: 0.8,
        strokeColor: '#ffffff',
        strokeWeight: 2,
        scale: markerSize
      };
      
      // Create marker
      const marker = new window.google.maps.Marker({
        position: {
          lat: point.lat,
          lng: point.lng
        },
        map,
        icon: markerIcon,
        title: point.name,
        animation: window.google.maps.Animation.DROP
      });
      
      // Add infowindow
      const infowindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 8px;">
            <div style="font-weight: bold; margin-bottom: 4px;">${point.name}</div>
            <div>Kwota: ${point.amount.toFixed(2)} PLN</div>
            <div>Częstotliwość: ${point.frequency} przejazdów</div>
            <div>Typ: ${point.type || 'Punkt poboru opłat'}</div>
          </div>
        `
      });
      
      // Handle marker click
      marker.addListener('click', () => {
        // Close all open infowindows
        newMarkers.forEach(m => {
          if (m.infowindow) {
            m.infowindow.close();
          }
        });
        
        // Open infowindow for clicked marker
        infowindow.open(map, marker);
        
        // Call callback
        if (onMarkerClick) {
          onMarkerClick(point);
        }
      });
      
      // Save infowindow in marker
      marker.infowindow = infowindow;
      
      return marker;
    });
    
    // Update statistics
    setStats({
      highActivity: highActivityCount,
      mediumActivity: mediumActivityCount,
      lowActivity: lowActivityCount
    });
    
    // Save markers
    setMarkers(newMarkers);
    
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
    
    // Cleanup
    return () => {
      if (newMarkers.length > 0) {
        newMarkers.forEach(marker => marker.setMap(null));
      }
    };
  }, [map, tollPoints, onMarkerClick]);
  
  return (
    <MapContainer>
      <div ref={mapRef} style={{ height: '100%', width: '100%' }} />
      
      <MapOverlay>
        <div>Wysokie opłaty: {stats.highActivity}</div>
        <div>Średnie opłaty: {stats.mediumActivity}</div>
        <div>Niskie opłaty: {stats.lowActivity}</div>
      </MapOverlay>
      
      <MapLegend>
        <LegendItem>
          <LegendColor color="#f44336" />
          <LegendText>Wysokie opłaty (&gt;1000 PLN)</LegendText>
        </LegendItem>
        <LegendItem>
          <LegendColor color="#ff9800" />
          <LegendText>Średnie opłaty (&gt;500 PLN)</LegendText>
        </LegendItem>
        <LegendItem>
          <LegendColor color="#4caf50" />
          <LegendText>Niskie opłaty (&lt;500 PLN)</LegendText>
        </LegendItem>
      </MapLegend>
    </MapContainer>
  );
};

export default RoadTollsActivityMap;
