import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import useGoogleMapsApi from '../../hooks/useGoogleMapsApi';

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
  const { loaded: googleMapsLoaded, error: googleMapsError } = useGoogleMapsApi();

  // Initialize map when Google Maps API is loaded
  useEffect(() => {
    if (!googleMapsLoaded || !mapRef.current) return;

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
  }, [googleMapsLoaded]);

  // Add markers when map and toll points data are available
  useEffect(() => {
    if (!map || !infoWindow) return;

    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    setMarkers([]);

    // Use mock toll points if none provided
    const points = tollPoints.length > 0 ? tollPoints : [
      { id: 'TP-1001', name: 'Punkt poboru A2 - Konin', road: 'A2', country: 'Polska', operator: 'ViaTOLL', truckRate: 15.50, carRate: 9.90, paymentMethods: 'Transponder, Gotówka, Karta', lat: 52.223, lng: 18.251 },
      { id: 'TP-1002', name: 'Punkt poboru A2 - Poznań Wschód', road: 'A2', country: 'Polska', operator: 'ViaTOLL', truckRate: 22.75, carRate: 12.50, paymentMethods: 'Transponder, Gotówka, Karta', lat: 52.401, lng: 17.068 },
      { id: 'TP-1003', name: 'Punkt poboru A2 - Poznań Zachód', road: 'A2', country: 'Polska', operator: 'ViaTOLL', truckRate: 18.20, carRate: 10.30, paymentMethods: 'Transponder, Gotówka, Karta', lat: 52.390, lng: 16.711 },
      { id: 'TP-1004', name: 'Punkt poboru A2 - Świecko', road: 'A2', country: 'Polska', operator: 'ViaTOLL', truckRate: 12.90, carRate: 8.50, paymentMethods: 'Transponder, Gotówka, Karta', lat: 52.294, lng: 14.685 },
      { id: 'TP-1005', name: 'Punkt poboru A4 - Kraków', road: 'A4', country: 'Polska', operator: 'ViaTOLL', truckRate: 20.00, carRate: 10.00, paymentMethods: 'Transponder, Gotówka, Karta', lat: 50.010, lng: 19.994 },
      { id: 'TP-1006', name: 'Punkt poboru A4 - Katowice', road: 'A4', country: 'Polska', operator: 'ViaTOLL', truckRate: 18.50, carRate: 9.50, paymentMethods: 'Transponder, Gotówka, Karta', lat: 50.214, lng: 19.134 },
      { id: 'TP-1007', name: 'Punkt poboru A4 - Wrocław', road: 'A4', country: 'Polska', operator: 'ViaTOLL', truckRate: 19.30, carRate: 9.80, paymentMethods: 'Transponder, Gotówka, Karta', lat: 51.036, lng: 17.124 },
      { id: 'TP-1008', name: 'Punkt poboru A1 - Gdańsk', road: 'A1', country: 'Polska', operator: 'ViaTOLL', truckRate: 16.70, carRate: 9.20, paymentMethods: 'Transponder, Gotówka, Karta', lat: 54.349, lng: 18.659 },
      { id: 'TP-1009', name: 'Punkt poboru A1 - Toruń', road: 'A1', country: 'Polska', operator: 'ViaTOLL', truckRate: 17.40, carRate: 9.40, paymentMethods: 'Transponder, Gotówka, Karta', lat: 53.035, lng: 18.604 },
      { id: 'TP-1010', name: 'Punkt poboru A1 - Łódź', road: 'A1', country: 'Polska', operator: 'ViaTOLL', truckRate: 18.10, carRate: 9.60, paymentMethods: 'Transponder, Gotówka, Karta', lat: 51.759, lng: 19.461 }
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
    <MapContainer>
      <div ref={mapRef} style={{ height: '100%', width: '100%' }} />
    </MapContainer>
  );
};

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export default TollPointsMap;
