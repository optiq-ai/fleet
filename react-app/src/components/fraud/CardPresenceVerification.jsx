import React from 'react';
import styled from 'styled-components';

/**
 * @typedef {Object} CardPresenceVerificationProps
 * @property {Object} results - Verification results
 * @property {Function} onClose - Function to close the modal
 */

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  width: 600px;
  max-width: 90%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const ModalHeader = styled.div`
  padding: 16px;
  background-color: #3f51b5;
  color: white;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
`;

const ModalBody = styled.div`
  padding: 24px;
`;

const ResultSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
  padding: 20px;
  background-color: ${props => props.success ? '#e8f5e9' : '#ffebee'};
  border-radius: 8px;
`;

const ResultIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: ${props => props.success ? '#4caf50' : '#f44336'};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  margin-bottom: 16px;
`;

const ResultTitle = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: ${props => props.success ? '#2e7d32' : '#c62828'};
  margin-bottom: 8px;
`;

const ResultDescription = styled.div`
  text-align: center;
  color: #666;
  margin-bottom: 16px;
`;

const DetailsContainer = styled.div`
  margin-bottom: 24px;
`;

const DetailCard = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 16px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const DetailHeader = styled.div`
  padding: 12px 16px;
  background-color: #f5f5f5;
  font-weight: 500;
`;

const DetailBody = styled.div`
  padding: 16px;
`;

const DetailRow = styled.div`
  display: flex;
  margin-bottom: 8px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const DetailLabel = styled.div`
  font-weight: 500;
  width: 180px;
  flex-shrink: 0;
`;

const DetailValue = styled.div`
  color: ${props => props.highlight 
    ? (props.success ? '#2e7d32' : '#c62828') 
    : '#666'};
  font-weight: ${props => props.highlight ? '500' : 'normal'};
`;

const MapContainer = styled.div`
  height: 200px;
  background-color: #e9e9e9;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  margin-bottom: 24px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: ${props => props.primary ? '#3f51b5' : 'white'};
  color: ${props => props.primary ? 'white' : '#3f51b5'};
  border: 1px solid ${props => props.primary ? '#3f51b5' : '#e0e0e0'};
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.primary ? '#303f9f' : '#f5f5f5'};
  }
`;

/**
 * Card presence verification component for fraud detection
 * @param {CardPresenceVerificationProps} props - Component props
 * @returns {JSX.Element} CardPresenceVerification component
 */
const CardPresenceVerification = ({ 
  results, 
  onClose 
}) => {
  const isVerified = results.isVerified;
  
  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          Weryfikacja obecności karty
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        
        <ModalBody>
          <ResultSection success={isVerified}>
            <ResultIcon success={isVerified}>
              {isVerified ? '✓' : '✗'}
            </ResultIcon>
            <ResultTitle success={isVerified}>
              {isVerified 
                ? 'Weryfikacja zakończona sukcesem!' 
                : 'Weryfikacja nie powiodła się!'}
            </ResultTitle>
            <ResultDescription>
              {isVerified 
                ? 'Karta paliwowa i pojazd znajdują się w tej samej lokalizacji. Transakcja jest prawidłowa.' 
                : 'Karta paliwowa i pojazd znajdują się w różnych lokalizacjach. Transakcja może być oszustwem.'}
            </ResultDescription>
          </ResultSection>
          
          <DetailsContainer>
            <DetailCard>
              <DetailHeader>Szczegóły transakcji</DetailHeader>
              <DetailBody>
                <DetailRow>
                  <DetailLabel>ID transakcji:</DetailLabel>
                  <DetailValue>{results.transactionId}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>Data i czas:</DetailLabel>
                  <DetailValue>{results.timestamp}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>Kierowca:</DetailLabel>
                  <DetailValue>{results.driverName}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>Pojazd:</DetailLabel>
                  <DetailValue>{results.vehicleId}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>Numer karty:</DetailLabel>
                  <DetailValue>{results.cardNumber.replace(/\d{12}(\d{4})/, '************$1')}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>Kwota:</DetailLabel>
                  <DetailValue>{results.amount.toFixed(2)} {results.currency}</DetailValue>
                </DetailRow>
              </DetailBody>
            </DetailCard>
            
            <DetailCard>
              <DetailHeader>Szczegóły weryfikacji</DetailHeader>
              <DetailBody>
                <DetailRow>
                  <DetailLabel>Lokalizacja karty:</DetailLabel>
                  <DetailValue>{results.cardLocation}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>Lokalizacja pojazdu:</DetailLabel>
                  <DetailValue>{results.vehicleLocation}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>Odległość:</DetailLabel>
                  <DetailValue 
                    highlight={true} 
                    success={results.distance <= results.maxAllowedDistance}
                  >
                    {results.distance.toFixed(2)} km
                  </DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>Maksymalna dozwolona odległość:</DetailLabel>
                  <DetailValue>{results.maxAllowedDistance.toFixed(2)} km</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>Czas weryfikacji:</DetailLabel>
                  <DetailValue>{results.verificationTime}</DetailValue>
                </DetailRow>
              </DetailBody>
            </DetailCard>
          </DetailsContainer>
          
          <MapContainer>
            {/* Tutaj będzie mapa z Google Maps lub innej biblioteki */}
            <div style={{ 
              position: 'absolute', 
              top: '50%', 
              left: '50%', 
              transform: 'translate(-50%, -50%)',
              color: '#9e9e9e'
            }}>
              [Mapa z lokalizacją karty i pojazdu]
            </div>
          </MapContainer>
          
          <ButtonsContainer>
            <Button onClick={onClose}>Zamknij</Button>
            {!isVerified && (
              <Button primary onClick={() => alert('Zgłoszono do dalszej analizy')}>
                Zgłoś do analizy
              </Button>
            )}
          </ButtonsContainer>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default CardPresenceVerification;
