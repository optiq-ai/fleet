import React, { useState } from 'react';
import styled from 'styled-components';

interface MultiFactorAuthProps {
  onVerify: (verified: boolean) => void;
  onClose: () => void;
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

const StepIndicator = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
`;

const StepDot = styled.div<{ active: boolean; completed: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => 
    props.completed ? '#4caf50' : 
    props.active ? '#3f51b5' : 
    '#e0e0e0'
  };
  margin: 0 8px;
`;

const StepTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 16px;
  text-align: center;
`;

const StepDescription = styled.p`
  margin-bottom: 24px;
  text-align: center;
  color: #666;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: #3f51b5;
  }
`;

const OtpContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 24px;
`;

const OtpInput = styled.input`
  width: 40px;
  height: 50px;
  text-align: center;
  font-size: 24px;
  border: 1px solid #ddd;
  border-radius: 4px;
  
  &:focus {
    outline: none;
    border-color: #3f51b5;
  }
`;

const BiometricContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
`;

const BiometricIcon = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
  font-size: 40px;
  color: #3f51b5;
`;

const ResultContainer = styled.div<{ success: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
  padding: 20px;
  background-color: ${props => props.success ? '#e8f5e9' : '#ffebee'};
  border-radius: 8px;
`;

const ResultIcon = styled.div<{ success: boolean }>`
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

const ResultTitle = styled.div<{ success: boolean }>`
  font-size: 20px;
  font-weight: 500;
  color: ${props => props.success ? '#2e7d32' : '#c62828'};
  margin-bottom: 8px;
`;

const ResultDescription = styled.div`
  text-align: center;
  color: #666;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const Button = styled.button<{ primary?: boolean }>`
  padding: 10px 16px;
  background-color: ${props => props.primary ? '#3f51b5' : 'white'};
  color: ${props => props.primary ? 'white' : '#3f51b5'};
  border: 1px solid ${props => props.primary ? '#3f51b5' : '#e0e0e0'};
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  
  &:hover {
    background-color: ${props => props.primary ? '#303f9f' : '#f5f5f5'};
  }
  
  &:disabled {
    background-color: #e0e0e0;
    color: #9e9e9e;
    border-color: #e0e0e0;
    cursor: not-allowed;
  }
`;

const ResendLink = styled.button`
  background: none;
  border: none;
  color: #3f51b5;
  cursor: pointer;
  font-size: 14px;
  padding: 0;
  text-decoration: underline;
  
  &:hover {
    color: #303f9f;
  }
`;

const MultiFactorAuth: React.FC<MultiFactorAuthProps> = ({ 
  onVerify, 
  onClose 
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [otpCode, setOtpCode] = useState<string[]>(Array(6).fill(''));
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  
  // Obsługa zmiany kodu OTP
  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(0, 1);
    }
    
    const newOtp = [...otpCode];
    newOtp[index] = value;
    setOtpCode(newOtp);
    
    // Automatyczne przejście do następnego pola
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };
  
  // Obsługa klawisza Backspace w polach OTP
  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpCode[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  };
  
  // Obsługa przycisku "Dalej"
  const handleNext = () => {
    if (currentStep === 1) {
      // W rzeczywistej aplikacji tutaj byłaby weryfikacja danych logowania
      setCurrentStep(2);
    } else if (currentStep === 2) {
      // W rzeczywistej aplikacji tutaj byłaby weryfikacja kodu OTP
      setCurrentStep(3);
    } else if (currentStep === 3) {
      // W rzeczywistej aplikacji tutaj byłaby weryfikacja biometryczna
      
      // Symulacja weryfikacji dla celów demonstracyjnych
      const success = Math.random() > 0.2; // 80% szans na sukces
      setIsVerified(success);
      setCurrentStep(4);
      onVerify(success);
    }
  };
  
  // Obsługa przycisku "Wstecz"
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  // Obsługa przycisku "Ponów"
  const handleRetry = () => {
    setIsVerified(null);
    setCurrentStep(1);
    setUsername('');
    setPassword('');
    setOtpCode(Array(6).fill(''));
  };
  
  // Sprawdzenie, czy przycisk "Dalej" powinien być aktywny
  const isNextButtonDisabled = () => {
    if (currentStep === 1) {
      return !username || !password;
    } else if (currentStep === 2) {
      return otpCode.some(digit => !digit);
    }
    return false;
  };
  
  // Renderowanie kroku 1: Dane logowania
  const renderStep1 = () => {
    return (
      <>
        <StepTitle>Weryfikacja danych logowania</StepTitle>
        <StepDescription>
          Wprowadź swoje dane logowania, aby rozpocząć proces autoryzacji.
        </StepDescription>
        
        <FormGroup>
          <Label htmlFor="username">Nazwa użytkownika</Label>
          <Input 
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Wprowadź nazwę użytkownika"
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="password">Hasło</Label>
          <Input 
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Wprowadź hasło"
          />
        </FormGroup>
      </>
    );
  };
  
  // Renderowanie kroku 2: Kod OTP
  const renderStep2 = () => {
    return (
      <>
        <StepTitle>Weryfikacja dwuetapowa</StepTitle>
        <StepDescription>
          Wprowadź 6-cyfrowy kod, który został wysłany na Twój telefon.
        </StepDescription>
        
        <OtpContainer>
          {otpCode.map((digit, index) => (
            <OtpInput
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleOtpKeyDown(index, e)}
              autoFocus={index === 0}
            />
          ))}
        </OtpContainer>
        
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <ResendLink onClick={() => alert('Wysłano nowy kod')}>
            Wyślij kod ponownie
          </ResendLink>
        </div>
      </>
    );
  };
  
  // Renderowanie kroku 3: Weryfikacja biometryczna
  const renderStep3 = () => {
    return (
      <>
        <StepTitle>Weryfikacja biometryczna</StepTitle>
        <StepDescription>
          Użyj czytnika linii papilarnych lub skanu twarzy, aby potwierdzić swoją tożsamość.
        </StepDescription>
        
        <BiometricContainer>
          <BiometricIcon>
            👆
          </BiometricIcon>
          <div>Przyłóż palec do czytnika linii papilarnych</div>
        </BiometricContainer>
      </>
    );
  };
  
  // Renderowanie kroku 4: Wynik weryfikacji
  const renderStep4 = () => {
    return (
      <>
        <ResultContainer success={isVerified === true}>
          <ResultIcon success={isVerified === true}>
            {isVerified === true ? '✓' : '✗'}
          </ResultIcon>
          <ResultTitle success={isVerified === true}>
            {isVerified === true 
              ? 'Weryfikacja zakończona sukcesem!' 
              : 'Weryfikacja nie powiodła się!'}
          </ResultTitle>
          <ResultDescription>
            {isVerified === true 
              ? 'Twoja tożsamość została potwierdzona. Możesz kontynuować.' 
              : 'Nie udało się potwierdzić Twojej tożsamości. Spróbuj ponownie.'}
          </ResultDescription>
        </ResultContainer>
      </>
    );
  };
  
  // Renderowanie przycisków nawigacyjnych
  const renderButtons = () => {
    if (currentStep === 4) {
      return (
        <ButtonsContainer>
          <Button onClick={onClose}>
            Zamknij
          </Button>
          {isVerified === false && (
            <Button primary onClick={handleRetry}>
              Spróbuj ponownie
            </Button>
          )}
        </ButtonsContainer>
      );
    }
    
    return (
      <ButtonsContainer>
        {currentStep > 1 && (
          <Button onClick={handleBack}>
            Wstecz
          </Button>
        )}
        <Button 
          primary 
          onClick={handleNext}
          disabled={isNextButtonDisabled()}
        >
          {currentStep === 3 ? 'Weryfikuj' : 'Dalej'}
        </Button>
      </ButtonsContainer>
    );
  };
  
  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          Autoryzacja wieloczynnikowa
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        
        <ModalBody>
          <StepIndicator>
            <StepDot active={currentStep === 1} completed={currentStep > 1} />
            <StepDot active={currentStep === 2} completed={currentStep > 2} />
            <StepDot active={currentStep === 3} completed={currentStep > 3} />
            <StepDot active={currentStep === 4} completed={currentStep > 4} />
          </StepIndicator>
          
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
          
          {renderButtons()}
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default MultiFactorAuth;
