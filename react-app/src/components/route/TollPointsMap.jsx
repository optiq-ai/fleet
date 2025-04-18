import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

/**
 * Toll Points Map component for displaying toll points on Google Maps
 * @param {Object} props Component props
 * @param {Array} props.tollPoints Array of toll point objects
 * @returns {JSX.Element} Toll Points Map component
 */
const TollPointsMap = ({ tollPoints = [] }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [infoWindow, setInfoWindow] = useState(null);

  // Initialize Google Maps
  useEffect(() => {
    // Check if Google Maps API is loaded
    if (!window.google || !window.google.maps) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBNLrJhOMz6idD05pzwk_qCXOXsYW9Lrg4&libraries=places`;
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

  // Initialize map when Google Maps API is loaded
  const initializeMap = () => {
    if (!mapRef.current) return;

    const mapInstance = new window.google.maps.Map(mapRef.current, {
      center: { lat: 52.0697, lng: 19.4800 }, // Default center (Poland)
      zoom: 6,
      mapTypeId: window.google.maps.MapTypeId.ROADMAP,
      fullscreenControl: true,
      streetViewControl: true,
      mapTypeControl: true,
      zoomControl: true
    });

    setMap(mapInstance);
    setInfoWindow(new window.google.maps.InfoWindow());
  };

  // Add markers when map and toll points data are available
  useEffect(() => {
    if (!map || !infoWindow) return;

    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    setMarkers([]);

    // Use mock toll points if none provided
    const points = tollPoints.length > 0 ? tollPoints : [
      { id: 'TP001', name: 'A2 - Poznań Wschód', road: 'A2', country: 'Polska', operator: 'ViaTOLL', truckRate: 15.50, carRate: 5.20, paymentMethods: 'Gotówka, Karta, Transponder', lat: 52.4011, lng: 16.9537 },
      { id: 'TP002', name: 'A2 - Świecko', road: 'A2', country: 'Polska', operator: 'ViaTOLL', truckRate: 22.75, carRate: 8.50, paymentMethods: 'Gotówka, Karta, Transponder', lat: 52.3438, lng: 14.5847 },
      { id: 'TP003', name: 'A4 - Wrocław', road: 'A4', country: 'Polska', operator: 'ViaTOLL', truckRate: 18.20, carRate: 6.80, paymentMethods: 'Gotówka, Karta, Transponder', lat: 51.1079, lng: 17.0385 },
      { id: 'TP004', name: 'A10 - Berlin', road: 'A10', country: 'Niemcy', operator: 'TollCollect', truckRate: 25.30, carRate: 0, paymentMethods: 'Transponder, OBU', lat: 52.5200, lng: 13.4050 },
      { id: 'TP005', name: 'A13 - Dresden', road: 'A13', country: 'Niemcy', operator: 'TollCollect', truckRate: 19.80, carRate: 0, paymentMethods: 'Transponder, OBU', lat: 51.0504, lng: 13.7373 },
      { id: 'TP006', name: 'A1 - Gdańsk', road: 'A1', country: 'Polska', operator: 'ViaTOLL', truckRate: 16.40, carRate: 6.10, paymentMethods: 'Gotówka, Karta, Transponder', lat: 54.3520, lng: 18.6466 }
    ];

    const newMarkers = [];
    const bounds = new window.google.maps.LatLngBounds();

    // Add toll point markers
    points.forEach(point => {
      // Skip points without coordinates
      if (!point.lat || !point.lng) return;

      // Determine marker color based on country
      let markerColor = '#FF5722'; // Default orange
      if (point.country === 'Polska') markerColor = '#FF5722';
      else if (point.country === 'Niemcy') markerColor = '#4CAF50';
      else if (point.country === 'Czechy') markerColor = '#2196F3';
      else if (point.country === 'Słowacja') markerColor = '#9C27B0';

      const marker = new window.google.maps.Marker({
        position: { lat: point.lat, lng: point.lng },
        map: map,
        title: point.name,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          fillColor: markerColor,
          fillOpacity: 1,
          strokeWeight: 0,
          scale: 8
        },
        animation: window.google.maps.Animation.DROP
      });

      marker.addListener('click', () => {
        infoWindow.setContent(`
          <div style="padding: 8px;">
            <h3 style="margin: 0 0 8px 0;">${point.name}</h3>
            <p style="margin: 0 0 4px 0;"><strong>Droga:</strong> ${point.road}</p>
            <p style="margin: 0 0 4px 0;"><strong>Kraj:</strong> ${point.country}</p>
            <p style="margin: 0 0 4px 0;"><strong>Operator:</strong> ${point.operator}</p>
            <p style="margin: 0 0 4px 0;"><strong>Stawka dla ciężarówek:</strong> ${point.truckRate.toFixed(2)} PLN</p>
            <p style="margin: 0 0 4px 0;"><strong>Stawka dla samochodów:</strong> ${point.carRate.toFixed(2)} PLN</p>
            <p style="margin: 0;"><strong>Metody płatności:</strong> ${point.paymentMethods}</p>
          </div>
        `);
        infoWindow.open(map, marker);
      });

      newMarkers.push(marker);
      bounds.extend(marker.getPosition());
    });

    // Fit map to bounds if we have markers
    if (newMarkers.length > 0) {
      map.fitBounds(bounds);
      
      // Adjust zoom if too close
      const listener = window.google.maps.event.addListener(map, 'idle', () => {
        if (map.getZoom() > 10) {
          map.setZoom(10);
        }
        window.google.maps.event.removeListener(listener);
      });
    }

    // Save markers for cleanup
    setMarkers(newMarkers);

    // Cleanup function
    return () => {
      newMarkers.forEach(marker => marker.setMap(null));
    };
  }, [map, tollPoints, infoWindow]);

  return (
    <MapContent ref={mapRef} />
  );
};

const MapContent = styled.div`
  width: 100%;
  height: 100%;
`;

export default TollPointsMap;
