import React from 'react';
import styled from 'styled-components';
import Card from '../common/Card';

const MapContainer = styled.div`
  height: 500px;
  background-color: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
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

const DriverMarker = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: ${props => props.selected ? '#3f51b5' : '#666'};
  border-radius: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #3f51b5;
    width: 24px;
    height: 24px;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 30px;
    height: 30px;
    background-color: rgba(63, 81, 181, 0.3);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
    opacity: ${props => props.selected ? 1 : 0};
    transition: opacity 0.3s ease;
  }
`;

const DriverTooltip = styled.div`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  padding: 8px 12px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  font-size: 12px;
  white-space: nowrap;
  z-index: 10;
  
  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 5px;
    border-style: solid;
    border-color: white transparent transparent transparent;
  }
`;

const MapImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Poland_topo.jpg/800px-Poland_topo.jpg');
  background-size: cover;
  background-position: center;
  opacity: 0.8;
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
  const [hoveredDriver, setHoveredDriver] = React.useState(null);
  
  if (!drivers || drivers.length === 0) {
    return (
      <Card>
        <SectionTitle>Mapa kierowców</SectionTitle>
        <LoadingIndicator>Brak danych kierowców do wyświetlenia na mapie.</LoadingIndicator>
      </Card>
    );
  }
  
  // Filter drivers with location data
  const driversWithLocation = drivers.filter(driver => 
    driver.currentLocation && 
    driver.currentLocation.latitude && 
    driver.currentLocation.longitude
  );
  
  // Map boundaries (Poland)
  const mapBounds = {
    minLat: 49.0,
    maxLat: 55.0,
    minLng: 14.0,
    maxLng: 24.0
  };
  
  // Convert geo coordinates to pixel positions
  const getPixelPosition = (lat, lng) => {
    const x = ((lng - mapBounds.minLng) / (mapBounds.maxLng - mapBounds.minLng)) * 100;
    const y = 100 - ((lat - mapBounds.minLat) / (mapBounds.maxLat - mapBounds.minLat)) * 100;
    return { x, y };
  };
  
  return (
    <Card>
      <SectionTitle>Mapa kierowców</SectionTitle>
      <MapContainer>
        <MapImage />
        
        {driversWithLocation.length === 0 ? (
          <MapPlaceholder>
            <div>Brak aktywnych kierowców z danymi lokalizacji</div>
            <div style={{ fontSize: '12px', marginTop: '8px' }}>Tylko kierowcy ze statusem "aktywny" i przypisanym pojazdem są widoczni na mapie</div>
          </MapPlaceholder>
        ) : (
          driversWithLocation.map(driver => {
            const position = getPixelPosition(
              driver.currentLocation.latitude,
              driver.currentLocation.longitude
            );
            
            const isSelected = selectedDriver && selectedDriver.id === driver.id;
            const isHovered = hoveredDriver === driver.id;
            
            return (
              <React.Fragment key={driver.id}>
                <DriverMarker
                  style={{ left: `${position.x}%`, top: `${position.y}%` }}
                  selected={isSelected}
                  onClick={() => onDriverSelect(driver)}
                  onMouseEnter={() => setHoveredDriver(driver.id)}
                  onMouseLeave={() => setHoveredDriver(null)}
                />
                
                {(isHovered || isSelected) && (
                  <DriverTooltip style={{ left: `${position.x}%`, top: `${position.y - 5}%` }}>
                    <div><strong>{driver.name}</strong></div>
                    <div>Pojazd: {driver.currentVehicle || 'Brak'}</div>
                    <div>Status: {
                      driver.status === 'active' ? 'Aktywny' :
                      driver.status === 'inactive' ? 'Nieaktywny' :
                      driver.status === 'on_leave' ? 'Na urlopie' : driver.status
                    }</div>
                  </DriverTooltip>
                )}
              </React.Fragment>
            );
          })
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
            <InfoLabel>Współrzędne:</InfoLabel>
            <InfoValue>
              {selectedDriver.currentLocation.latitude.toFixed(4)}, {selectedDriver.currentLocation.longitude.toFixed(4)}
            </InfoValue>
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
