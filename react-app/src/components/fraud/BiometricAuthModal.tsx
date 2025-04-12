import React, { useState } from 'react';
import styled from 'styled-components';

interface BiometricAuthModalProps {
  transaction: any;
  onClose: () => void;
  onAuthenticate: (result: boolean) => void;
}

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
  width: 500px;
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

const TransactionDetails = styled.div`
  margin-bottom: 24px;
  padding: 16px;
  background-color: #f5f5f5;
  border-radius: 4px;
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
  width: 120px;
  flex-shrink: 0;
`;

const DetailValue = styled.div`
  color: #666;
`;

const BiometricSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
`;

const BiometricImage = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #e0e0e0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
  font-size: 48px;
  color: #9e9e9e;
`;

const BiometricText = styled.div`
  text-align: center;
  color: #666;
  margin-bottom: 16px;
`;

const BiometricOptions = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 24px;
`;

const BiometricOption = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 12px;
  border-radius: 4px;
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

const OptionIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #e0e0e0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
  font-size: 24px;
  color: #616161;
`;

const OptionLabel = styled.div`
  font-size: 14px;
  color: #616161;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const Button = styled.button<{ primary?: boolean }>`
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

const BiometricAuthModal: React.FC<BiometricAuthModalProps> = ({ 
  transaction, 
  onClose, 
  onAuthenticate 
}) => {
  const [authMethod, setAuthMethod] = useState<string | null>(null);
  const [authStatus, setAuthStatus] = useState<'idle' | 'scanning' | 'success' | 'failure'>('idle');
  
  const handleMethodSelect = (method: string) => {
    setAuthMethod(method);
    setAuthStatus('scanning');
    
    // Symulacja skanowania biometrycznego
    setTimeout(() => {
      // W rzeczywistej aplikacji tutaj byłaby integracja z rzeczywistym systemem biometrycznym
      const success = Math.random() > 0.3; // 70% szans na sukces dla celów demonstracyjnych
      setAuthStatus(success ? 'success' : 'failure');
    }, 2000);
  };
  
  const handleAuthenticate = () => {
    onAuthenticate(authStatus === 'success');
  };
  
  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          Uwierzytelnianie biometryczne
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        
        <ModalBody>
          {transaction && (
            <TransactionDetails>
              <DetailRow>
                <DetailLabel>Data:</DetailLabel>
                <DetailValue>{transaction.date}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>Kierowca:</DetailLabel>
                <DetailValue>{transaction.driver}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>Pojazd:</DetailLabel>
                <DetailValue>{transaction.vehicle}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>Lokalizacja:</DetailLabel>
                <DetailValue>{transaction.location}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>Kwota:</DetailLabel>
                <DetailValue>{transaction.amount.toFixed(2)} {transaction.currency}</DetailValue>
              </DetailRow>
            </TransactionDetails>
          )}
          
          {authStatus === 'idle' && (
            <>
              <BiometricText>
                Wybierz metodę uwierzytelniania biometrycznego, aby zweryfikować tożsamość kierowcy.
              </BiometricText>
              
              <BiometricOptions>
                <BiometricOption onClick={() => handleMethodSelect('fingerprint')}>
                  <OptionIcon>👆</OptionIcon>
                  <OptionLabel>Odcisk palca</OptionLabel>
                </BiometricOption>
                
                <BiometricOption onClick={() => handleMethodSelect('face')}>
                  <OptionIcon>👤</OptionIcon>
                  <OptionLabel>Rozpoznawanie twarzy</OptionLabel>
                </BiometricOption>
                
                <BiometricOption onClick={() => handleMethodSelect('voice')}>
                  <OptionIcon>🎤</OptionIcon>
                  <OptionLabel>Rozpoznawanie głosu</OptionLabel>
                </BiometricOption>
              </BiometricOptions>
            </>
          )}
          
          {authStatus === 'scanning' && (
            <BiometricSection>
              <BiometricImage>
                {authMethod === 'fingerprint' ? '👆' : 
                 authMethod === 'face' ? '👤' : 
                 authMethod === 'voice' ? '🎤' : '?'}
              </BiometricImage>
              <BiometricText>
                Skanowanie... Proszę czekać.
              </BiometricText>
            </BiometricSection>
          )}
          
          {authStatus === 'success' && (
            <BiometricSection>
              <BiometricImage style={{ backgroundColor: '#e8f5e9', color: '#4caf50' }}>
                ✓
              </BiometricImage>
              <BiometricText style={{ color: '#4caf50', fontWeight: 500 }}>
                Uwierzytelnianie zakończone sukcesem!
              </BiometricText>
              <div>
                Tożsamość kierowcy została potwierdzona. Transakcja może zostać zatwierdzona.
              </div>
            </BiometricSection>
          )}
          
          {authStatus === 'failure' && (
            <BiometricSection>
              <BiometricImage style={{ backgroundColor: '#ffebee', color: '#f44336' }}>
                ✗
              </BiometricImage>
              <BiometricText style={{ color: '#f44336', fontWeight: 500 }}>
                Uwierzytelnianie nie powiodło się!
              </BiometricText>
              <div>
                Nie udało się potwierdzić tożsamości kierowcy. Spróbuj ponownie lub użyj alternatywnej metody weryfikacji.
              </div>
            </BiometricSection>
          )}
          
          <ButtonsContainer>
            <Button onClick={onClose}>Anuluj</Button>
            {(authStatus === 'success' || authStatus === 'failure') && (
              <Button primary onClick={handleAuthenticate}>
                {authStatus === 'success' ? 'Zatwierdź transakcję' : 'Spróbuj ponownie'}
              </Button>
            )}
          </ButtonsContainer>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default BiometricAuthModal;
