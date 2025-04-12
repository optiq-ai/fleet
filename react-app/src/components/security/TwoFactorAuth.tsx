import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface TwoFactorAuthProps {
  onEnableDisable2FA: (enabled: boolean) => Promise<void>;
  onVerify2FA: (code: string) => Promise<boolean>;
  onRegenerateBackupCodes: () => Promise<string[]>;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 500;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
`;

const CardTitle = styled.div`
  font-weight: 500;
  font-size: 16px;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardContent = styled.div``;

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
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  
  &:focus {
    border-color: #3f51b5;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 10px 16px;
  background-color: #3f51b5;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  
  &:hover {
    background-color: #303f9f;
  }
  
  &:disabled {
    background-color: #c5cae9;
    cursor: not-allowed;
  }
`;

const SecondaryButton = styled.button`
  padding: 10px 16px;
  background-color: white;
  color: #3f51b5;
  border: 1px solid #3f51b5;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  
  &:hover {
    background-color: #e8eaf6;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

const StatusBadge = styled.div<{ enabled: boolean }>`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  background-color: ${props => props.enabled ? '#e8f5e9' : '#ffebee'};
  color: ${props => props.enabled ? '#2e7d32' : '#c62828'};
`;

const QRCodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
  padding: 20px;
  border: 1px dashed #ddd;
  border-radius: 4px;
`;

const QRCode = styled.div`
  width: 200px;
  height: 200px;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #666;
`;

const SecretKey = styled.div`
  font-family: monospace;
  padding: 8px 16px;
  background-color: #f5f5f5;
  border-radius: 4px;
  font-size: 16px;
  letter-spacing: 2px;
`;

const VerificationCodeInput = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
`;

const CodeInput = styled.input`
  width: 40px;
  height: 48px;
  text-align: center;
  font-size: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  
  &:focus {
    border-color: #3f51b5;
    outline: none;
  }
`;

const BackupCodesContainer = styled.div`
  margin-top: 20px;
`;

const BackupCodesList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  margin-bottom: 16px;
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const BackupCode = styled.div`
  font-family: monospace;
  padding: 8px;
  background-color: #f5f5f5;
  border-radius: 4px;
  text-align: center;
  font-size: 14px;
  letter-spacing: 1px;
`;

const InfoBox = styled.div`
  padding: 16px;
  background-color: #e8eaf6;
  border-radius: 4px;
  margin-bottom: 20px;
`;

const InfoTitle = styled.div`
  font-weight: 500;
  margin-bottom: 8px;
`;

const InfoContent = styled.div`
  font-size: 14px;
  color: #666;
`;

const StepContainer = styled.div`
  margin-bottom: 24px;
`;

const StepTitle = styled.div`
  font-weight: 500;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StepNumber = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #3f51b5;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
`;

const StepContent = styled.div`
  padding-left: 32px;
`;

const TwoFactorAuth: React.FC<TwoFactorAuthProps> = ({
  onEnableDisable2FA,
  onVerify2FA,
  onRegenerateBackupCodes
}) => {
  const [is2FAEnabled, setIs2FAEnabled] = useState<boolean>(false);
  const [setupMode, setSetupMode] = useState<boolean>(false);
  const [secretKey, setSecretKey] = useState<string>('');
  const [verificationCode, setVerificationCode] = useState<string[]>(Array(6).fill(''));
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [verificationError, setVerificationError] = useState<string>('');
  
  // Symulacja pobrania stanu 2FA
  useEffect(() => {
    // W rzeczywistej aplikacji, pobieralibyśmy stan 2FA z API
    setIs2FAEnabled(false);
  }, []);
  
  // Obsługa rozpoczęcia konfiguracji 2FA
  const handleStartSetup = () => {
    // W rzeczywistej aplikacji, pobieralibyśmy klucz tajny z API
    setSecretKey('ABCDEF123456GHIJKL');
    setSetupMode(true);
    setVerificationCode(Array(6).fill(''));
    setVerificationError('');
  };
  
  // Obsługa anulowania konfiguracji 2FA
  const handleCancelSetup = () => {
    setSetupMode(false);
    setSecretKey('');
    setVerificationCode(Array(6).fill(''));
    setVerificationError('');
  };
  
  // Obsługa zmiany cyfry kodu weryfikacyjnego
  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.charAt(0);
    }
    
    if (value && !/^\d+$/.test(value)) {
      return;
    }
    
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);
    
    // Automatyczne przejście do następnego pola
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-input-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };
  
  // Obsługa naciśnięcia klawisza w polu kodu
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      // Jeśli pole jest puste i naciśnięto Backspace, przejdź do poprzedniego pola
      const prevInput = document.getElementById(`code-input-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  };
  
  // Obsługa weryfikacji kodu 2FA
  const handleVerifyCode = async () => {
    const code = verificationCode.join('');
    
    if (code.length !== 6) {
      setVerificationError('Wprowadź 6-cyfrowy kod weryfikacyjny');
      return;
    }
    
    try {
      const isValid = await onVerify2FA(code);
      
      if (isValid) {
        // Generowanie kodów zapasowych
        const newBackupCodes = await onRegenerateBackupCodes();
        setBackupCodes(newBackupCodes);
        
        // Włączenie 2FA
        await onEnableDisable2FA(true);
        setIs2FAEnabled(true);
        setSetupMode(false);
      } else {
        setVerificationError('Nieprawidłowy kod weryfikacyjny. Spróbuj ponownie.');
        setVerificationCode(Array(6).fill(''));
      }
    } catch (error) {
      console.error('Error verifying 2FA code:', error);
      setVerificationError('Wystąpił błąd podczas weryfikacji kodu. Spróbuj ponownie.');
    }
  };
  
  // Obsługa wyłączenia 2FA
  const handleDisable2FA = async () => {
    if (window.confirm('Czy na pewno chcesz wyłączyć uwierzytelnianie dwuskładnikowe? To zmniejszy bezpieczeństwo Twojego konta.')) {
      try {
        await onEnableDisable2FA(false);
        setIs2FAEnabled(false);
        setBackupCodes([]);
      } catch (error) {
        console.error('Error disabling 2FA:', error);
        alert('Wystąpił błąd podczas wyłączania uwierzytelniania dwuskładnikowego');
      }
    }
  };
  
  // Obsługa regeneracji kodów zapasowych
  const handleRegenerateBackupCodes = async () => {
    if (window.confirm('Czy na pewno chcesz wygenerować nowe kody zapasowe? Wszystkie poprzednie kody zapasowe zostaną unieważnione.')) {
      try {
        const newBackupCodes = await onRegenerateBackupCodes();
        setBackupCodes(newBackupCodes);
      } catch (error) {
        console.error('Error regenerating backup codes:', error);
        alert('Wystąpił błąd podczas generowania nowych kodów zapasowych');
      }
    }
  };
  
  return (
    <Container>
      <Header>
        <Title>Uwierzytelnianie dwuskładnikowe</Title>
      </Header>
      
      <Card>
        <CardTitle>
          Status uwierzytelniania dwuskładnikowego
          <StatusBadge enabled={is2FAEnabled}>
            {is2FAEnabled ? 'Włączone' : 'Wyłączone'}
          </StatusBadge>
        </CardTitle>
        <CardContent>
          <InfoBox>
            <InfoTitle>Zwiększ bezpieczeństwo swojego konta</InfoTitle>
            <InfoContent>
              Uwierzytelnianie dwuskładnikowe dodaje dodatkową warstwę zabezpieczeń do Twojego konta. 
              Po włączeniu tej funkcji, oprócz hasła, będziesz musiał podać kod wygenerowany przez aplikację 
              uwierzytelniającą na Twoim telefonie podczas logowania.
            </InfoContent>
          </InfoBox>
          
          {!is2FAEnabled && !setupMode && (
            <ButtonGroup style={{ justifyContent: 'flex-start' }}>
              <Button onClick={handleStartSetup}>Włącz uwierzytelnianie dwuskładnikowe</Button>
            </ButtonGroup>
          )}
          
          {is2FAEnabled && (
            <div>
              <p>Uwierzytelnianie dwuskładnikowe jest włączone dla Twojego konta.</p>
              
              <BackupCodesContainer>
                <CardTitle>Kody zapasowe</CardTitle>
                <p>
                  Kody zapasowe umożliwiają zalogowanie się do konta w przypadku utraty dostępu do urządzenia 
                  z aplikacją uwierzytelniającą. Każdy kod może być użyty tylko raz.
                </p>
                
                <BackupCodesList>
                  {backupCodes.map((code, index) => (
                    <BackupCode key={index}>{code}</BackupCode>
                  ))}
                </BackupCodesList>
                
                <ButtonGroup style={{ justifyContent: 'flex-start' }}>
                  <SecondaryButton onClick={handleRegenerateBackupCodes}>
                    Wygeneruj nowe kody zapasowe
                  </SecondaryButton>
                  <SecondaryButton onClick={handleDisable2FA}>
                    Wyłącz uwierzytelnianie dwuskładnikowe
                  </SecondaryButton>
                </ButtonGroup>
              </BackupCodesContainer>
            </div>
          )}
          
          {!is2FAEnabled && setupMode && (
            <div>
              <StepContainer>
                <StepTitle>
                  <StepNumber>1</StepNumber>
                  Zainstaluj aplikację uwierzytelniającą
                </StepTitle>
                <StepContent>
                  <p>
                    Jeśli jeszcze nie masz aplikacji uwierzytelniającej, zainstaluj jedną z poniższych 
                    na swoim urządzeniu mobilnym:
                  </p>
                  <ul>
                    <li>Google Authenticator (Android, iOS)</li>
                    <li>Microsoft Authenticator (Android, iOS)</li>
                    <li>Authy (Android, iOS, Desktop)</li>
                  </ul>
                </StepContent>
              </StepContainer>
              
              <StepContainer>
                <StepTitle>
                  <StepNumber>2</StepNumber>
                  Zeskanuj kod QR lub wprowadź klucz ręcznie
                </StepTitle>
                <StepContent>
                  <QRCodeContainer>
                    <QRCode>
                      [Kod QR dla 2FA]
                    </QRCode>
                    <div>
                      <p>Nie możesz zeskanować kodu QR? Wprowadź ten klucz ręcznie:</p>
                      <SecretKey>{secretKey}</SecretKey>
                    </div>
                  </QRCodeContainer>
                </StepContent>
              </StepContainer>
              
              <StepContainer>
                <StepTitle>
                  <StepNumber>3</StepNumber>
                  Wprowadź kod weryfikacyjny z aplikacji
                </StepTitle>
                <StepContent>
                  <p>
                    Otwórz aplikację uwierzytelniającą i wprowadź 6-cyfrowy kod wyświetlany dla tego konta:
                  </p>
                  
                  <VerificationCodeInput>
                    {verificationCode.map((digit, index) => (
                      <CodeInput
                        key={index}
                        id={`code-input-${index}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleCodeChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        autoFocus={index === 0}
                      />
                    ))}
                  </VerificationCodeInput>
                  
                  {verificationError && (
                    <div style={{ color: '#f44336', marginBottom: '16px' }}>{verificationError}</div>
                  )}
                  
                  <ButtonGroup>
                    <SecondaryButton onClick={handleCancelSetup}>Anuluj</SecondaryButton>
                    <Button onClick={handleVerifyCode}>Weryfikuj i włącz</Button>
                  </ButtonGroup>
                </StepContent>
              </StepContainer>
            </div>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default TwoFactorAuth;
