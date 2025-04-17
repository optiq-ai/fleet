import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

/**
 * @typedef {Object} SuspiciousTransactionsMapProps
 * @property {Array} transactions - List of transactions with coordinates
 * @property {Function} onMarkerClick - Callback when marker is clicked
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
 * Suspicious transactions map component for fraud detection
 * @param {SuspiciousTransactionsMapProps} props - Component props
 * @returns {JSX.Element} SuspiciousTransactionsMap component
 */
const SuspiciousTransactionsMap = ({ 
  transactions = [],
  onMarkerClick
}) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [stats, setStats] = useState({
    suspicious: 0,
    verified: 0,
    flagged: 0
  });
  
  // Inicjalizacja mapy Google Maps
  useEffect(() => {
    // Sprawdzenie, czy Google Maps API jest załadowane
    if (!window.google || !window.google.maps) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initializeMap;
      document.head.appendChild(script);
      
      return () => {
        document.head.removeChild(script);
      };
    } else {
      initializeMap();
    }
  }, []);
  
  // Inicjalizacja mapy
  const initializeMap = () => {
    if (!mapRef.current) return;
    
    // Centrum Polski
    const center = { lat: 52.0692, lng: 19.4803 };
    
    const mapOptions = {
      center,
      zoom: 6,
      mapTypeId: window.google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
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
  };
  
  // Dodawanie markerów na mapie
  useEffect(() => {
    if (!map || !transactions.length) return;
    
    // Usunięcie istniejących markerów
    markers.forEach(marker => marker.setMap(null));
    
    // Liczniki dla statystyk
    let suspiciousCount = 0;
    let verifiedCount = 0;
    let flaggedCount = 0;
    
    // Dodanie nowych markerów
    const newMarkers = transactions.map(transaction => {
      // Określenie koloru markera na podstawie statusu transakcji
      let markerColor;
      
      switch (transaction.status) {
        case 'suspicious':
          markerColor = '#f44336'; // czerwony
          suspiciousCount++;
          break;
        case 'verified':
          markerColor = '#4caf50'; // zielony
          verifiedCount++;
          break;
        default:
          markerColor = '#ff9800'; // pomarańczowy
          flaggedCount++;
      }
      
      // Tworzenie ikony markera
      const markerIcon = {
        path: window.google.maps.SymbolPath.CIRCLE,
        fillColor: markerColor,
        fillOpacity: 0.8,
        strokeColor: '#ffffff',
        strokeWeight: 2,
        scale: 10
      };
      
      // Tworzenie markera
      const marker = new window.google.maps.Marker({
        position: {
          lat: transaction.coordinates.lat,
          lng: transaction.coordinates.lng
        },
        map,
        icon: markerIcon,
        title: `${transaction.location} - ${transaction.amount.toFixed(2)} ${transaction.currency}`
      });
      
      // Dodanie infowindow
      const infowindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 8px;">
            <div style="font-weight: bold; margin-bottom: 4px;">${transaction.location}</div>
            <div>Data: ${transaction.date}</div>
            <div>Kierowca: ${transaction.driver}</div>
            <div>Pojazd: ${transaction.vehicle}</div>
            <div>Kwota: ${transaction.amount.toFixed(2)} ${transaction.currency}</div>
            <div>Status: ${
              transaction.status === 'suspicious' ? 'Podejrzana' : 
              transaction.status === 'verified' ? 'Zweryfikowana' : 
              'Oznaczona'
            }</div>
            ${transaction.anomalies && transaction.anomalies.length > 0 ? 
              `<div style="margin-top: 4px; color: #f44336;">Anomalie: ${transaction.anomalies.join(', ')}</div>` : 
              ''
            }
          </div>
        `
      });
      
      // Obsługa kliknięcia markera
      marker.addListener('click', () => {
        // Zamknięcie wszystkich otwartych infowindow
        newMarkers.forEach(m => m.infowindow.close());
        
        // Otwarcie infowindow dla klikniętego markera
        infowindow.open(map, marker);
        
        // Wywołanie callbacku
        if (onMarkerClick) {
          onMarkerClick(transaction);
        }
      });
      
      // Zapisanie infowindow w markerze
      marker.infowindow = infowindow;
      
      return marker;
    });
    
    // Aktualizacja statystyk
    setStats({
      suspicious: suspiciousCount,
      verified: verifiedCount,
      flagged: flaggedCount
    });
    
    // Zapisanie markerów
    setMarkers(newMarkers);
    
    // Dopasowanie widoku mapy do markerów
    if (newMarkers.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      
      newMarkers.forEach(marker => {
        bounds.extend(marker.getPosition());
      });
      
      map.fitBounds(bounds);
      
      // Jeśli jest tylko jeden marker, ustaw zoom
      if (newMarkers.length === 1) {
        map.setZoom(12);
      }
    }
    
    // Cleanup
    return () => {
      newMarkers.forEach(marker => marker.setMap(null));
    };
  }, [map, transactions, onMarkerClick]);
  
  return (
    <MapContainer>
      <div ref={mapRef} style={{ height: '100%', width: '100%' }} />
      
      <MapOverlay>
        <div>Podejrzane transakcje: {stats.suspicious}</div>
        <div>Zweryfikowane transakcje: {stats.verified}</div>
        <div>Oznaczone transakcje: {stats.flagged}</div>
      </MapOverlay>
      
      <MapLegend>
        <LegendItem>
          <LegendColor color="#f44336" />
          <LegendText>Podejrzane</LegendText>
        </LegendItem>
        <LegendItem>
          <LegendColor color="#4caf50" />
          <LegendText>Zweryfikowane</LegendText>
        </LegendItem>
        <LegendItem>
          <LegendColor color="#ff9800" />
          <LegendText>Oznaczone</LegendText>
        </LegendItem>
      </MapLegend>
    </MapContainer>
  );
};

export default SuspiciousTransactionsMap;
