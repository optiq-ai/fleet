import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

/**
 * Route Details Map component for displaying route details on Google Maps
 * @param {Object} props Component props
 * @param {Object} props.route Route object with origin, destination, and route details
 * @returns {JSX.Element} Route Details Map component
 */
const RouteDetailsMap = ({ route }) => {
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
      center: { lat: 52.2297, lng: 21.0122 }, // Default center (Warsaw)
      zoom: 7,
      mapTypeId: window.google.maps.MapTypeId.ROADMAP,
      fullscreenControl: true,
      streetViewControl: true,
      mapTypeControl: true,
      zoomControl: true
    });

    setMap(mapInstance);
    setInfoWindow(new window.google.maps.InfoWindow());
  };

  // Add markers and routes when map and route data are available
  useEffect(() => {
    if (!map || !route) return;

    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    setMarkers([]);

    const newMarkers = [];
    const bounds = new window.google.maps.LatLngBounds();

    // Add origin marker
    const originMarker = new window.google.maps.Marker({
      position: { lat: 52.2297, lng: 21.0122 }, // Example position for Warsaw
      map: map,
      title: `Początek trasy: ${route.origin}`,
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        fillColor: '#4CAF50',
        fillOpacity: 1,
        strokeWeight: 0,
        scale: 8
      }
    });
    newMarkers.push(originMarker);
    bounds.extend(originMarker.getPosition());

    // Add destination marker
    const destMarker = new window.google.maps.Marker({
      position: { lat: 52.5200, lng: 13.4050 }, // Example position for Berlin
      map: map,
      title: `Koniec trasy: ${route.destination}`,
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        fillColor: '#F44336',
        fillOpacity: 1,
        strokeWeight: 0,
        scale: 8
      }
    });
    newMarkers.push(destMarker);
    bounds.extend(destMarker.getPosition());

    // Add toll point markers
    const tollPoints = [
      { lat: 52.4011, lng: 16.9537, name: 'A2 - Poznań Wschód', cost: 15.50 },
      { lat: 52.3438, lng: 14.5847, name: 'A2 - Świecko', cost: 22.75 }
    ];

    tollPoints.forEach(point => {
      const marker = new window.google.maps.Marker({
        position: { lat: point.lat, lng: point.lng },
        map: map,
        title: `Punkt poboru opłat: ${point.name}`,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          fillColor: '#3F51B5',
          fillOpacity: 1,
          strokeWeight: 0,
          scale: 6
        }
      });

      marker.addListener('click', () => {
        infoWindow.setContent(`
          <div style="padding: 8px;">
            <h3 style="margin: 0 0 8px 0;">${point.name}</h3>
            <p style="margin: 0;">Koszt: ${point.cost.toFixed(2)} PLN</p>
          </div>
        `);
        infoWindow.open(map, marker);
      });

      newMarkers.push(marker);
      bounds.extend(marker.getPosition());
    });

    // Add alternative toll point
    const altTollPoint = { lat: 51.1079, lng: 17.0385, name: 'A4 - Wrocław', cost: 18.20 };
    const altMarker = new window.google.maps.Marker({
      position: { lat: altTollPoint.lat, lng: altTollPoint.lng },
      map: map,
      title: `Punkt poboru opłat: ${altTollPoint.name}`,
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        fillColor: '#FF9800',
        fillOpacity: 1,
        strokeWeight: 0,
        scale: 6
      }
    });

    altMarker.addListener('click', () => {
      infoWindow.setContent(`
        <div style="padding: 8px;">
          <h3 style="margin: 0 0 8px 0;">${altTollPoint.name}</h3>
          <p style="margin: 0;">Koszt: ${altTollPoint.cost.toFixed(2)} PLN</p>
        </div>
      `);
      infoWindow.open(map, altMarker);
    });

    newMarkers.push(altMarker);
    bounds.extend(altMarker.getPosition());

    // Draw standard route
    const standardRoutePath = new window.google.maps.Polyline({
      path: [
        { lat: 52.2297, lng: 21.0122 }, // Warsaw
        { lat: 52.4011, lng: 16.9537 }, // Poznań
        { lat: 52.3438, lng: 14.5847 }, // Świecko
        { lat: 52.5200, lng: 13.4050 }  // Berlin
      ],
      geodesic: true,
      strokeColor: '#3F51B5',
      strokeOpacity: 1.0,
      strokeWeight: 3
    });
    standardRoutePath.setMap(map);

    // Draw alternative route
    const alternativeRoutePath = new window.google.maps.Polyline({
      path: [
        { lat: 52.2297, lng: 21.0122 }, // Warsaw
        { lat: 51.1079, lng: 17.0385 }, // Wrocław
        { lat: 52.5200, lng: 13.4050 }  // Berlin
      ],
      geodesic: true,
      strokeColor: '#FF9800',
      strokeOpacity: 0.8,
      strokeWeight: 3,
      icons: [{
        icon: {
          path: 'M 0,-1 0,1',
          strokeOpacity: 1,
          scale: 3
        },
        offset: '0',
        repeat: '10px'
      }]
    });
    alternativeRoutePath.setMap(map);

    // Fit map to bounds
    map.fitBounds(bounds);

    // Save markers for cleanup
    setMarkers([...newMarkers]);

    // Cleanup function
    return () => {
      standardRoutePath.setMap(null);
      alternativeRoutePath.setMap(null);
      newMarkers.forEach(marker => marker.setMap(null));
    };
  }, [map, route, infoWindow]);

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

export default RouteDetailsMap;
