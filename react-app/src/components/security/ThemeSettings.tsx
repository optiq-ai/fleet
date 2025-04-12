import React, { useState } from 'react';
import styled from 'styled-components';
import { useTheme, ThemeType } from '../context/ThemeContext';

interface ThemeSettingsProps {
  onSavePreferences: (preferences: any) => Promise<void>;
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
  background-color: var(--color-surface);
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

const ThemeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
`;

const ThemeOption = styled.div<{ selected: boolean; themeColor: string }>`
  border-radius: 8px;
  border: 2px solid ${props => props.selected ? props.themeColor : 'transparent'};
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

const ThemePreview = styled.div<{ bgColor: string; primaryColor: string }>`
  height: 120px;
  background-color: ${props => props.bgColor};
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 20px;
    left: 20px;
    width: 60%;
    height: 20px;
    background-color: ${props => props.primaryColor};
    border-radius: 4px;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 50px;
    left: 20px;
    width: 80%;
    height: 50px;
    background-color: white;
    border-radius: 4px;
  }
`;

const ThemeName = styled.div`
  padding: 12px;
  text-align: center;
  font-weight: 500;
  background-color: white;
`;

const ToggleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: var(--color-background);
  border-radius: 8px;
  margin-bottom: 16px;
`;

const ToggleLabel = styled.div`
  font-weight: 500;
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
`;

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  
  &:checked + span {
    background-color: var(--color-primary);
  }
  
  &:checked + span:before {
    transform: translateX(26px);
  }
`;

const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 34px;
  
  &:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }
`;

const Section = styled.div`
  margin-bottom: 24px;
`;

const SectionTitle = styled.div`
  font-weight: 500;
  margin-bottom: 16px;
`;

const Button = styled.button`
  padding: 10px 16px;
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  
  &:hover {
    opacity: 0.9;
  }
`;

const FontSizeOptions = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
`;

const FontSizeOption = styled.div<{ selected: boolean }>`
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid ${props => props.selected ? 'var(--color-primary)' : 'var(--color-border)'};
  background-color: ${props => props.selected ? 'var(--color-primary)' : 'transparent'};
  color: ${props => props.selected ? 'white' : 'var(--color-text)'};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: var(--color-primary);
  }
`;

const AnimationToggle = styled.div`
  margin-bottom: 16px;
`;

const PreviewContainer = styled.div`
  padding: 16px;
  background-color: var(--color-surface);
  border-radius: 8px;
  margin-bottom: 24px;
  border: 1px solid var(--color-border);
`;

const PreviewTitle = styled.div`
  font-weight: 500;
  margin-bottom: 16px;
  color: var(--color-primary);
`;

const PreviewContent = styled.div`
  color: var(--color-text);
`;

const PreviewButton = styled.button`
  padding: 8px 16px;
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 16px;
  
  &:hover {
    opacity: 0.9;
  }
`;

const ThemeSettings: React.FC<ThemeSettingsProps> = ({
  onSavePreferences
}) => {
  const { currentTheme, changeTheme, isDarkMode, toggleDarkMode, themeColors } = useTheme();
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [reduceAnimations, setReduceAnimations] = useState<boolean>(false);
  const [highContrast, setHighContrast] = useState<boolean>(false);
  
  // Dostępne motywy
  const availableThemes: { type: ThemeType; name: string; primaryColor: string; bgColor: string }[] = [
    { type: 'light', name: 'Jasny', primaryColor: '#3f51b5', bgColor: '#f5f5f5' },
    { type: 'dark', name: 'Ciemny', primaryColor: '#7986cb', bgColor: '#121212' },
    { type: 'blue', name: 'Niebieski', primaryColor: '#1976d2', bgColor: '#e3f2fd' },
    { type: 'green', name: 'Zielony', primaryColor: '#388e3c', bgColor: '#e8f5e9' },
    { type: 'purple', name: 'Fioletowy', primaryColor: '#7b1fa2', bgColor: '#f3e5f5' }
  ];
  
  // Obsługa zapisywania preferencji
  const handleSavePreferences = async () => {
    const preferences = {
      theme: currentTheme,
      darkMode: isDarkMode,
      fontSize,
      reduceAnimations,
      highContrast
    };
    
    try {
      await onSavePreferences(preferences);
      alert('Preferencje zostały zapisane');
    } catch (error) {
      console.error('Error saving preferences:', error);
      alert('Wystąpił błąd podczas zapisywania preferencji');
    }
  };
  
  // Obsługa zmiany rozmiaru czcionki
  const handleFontSizeChange = (size: 'small' | 'medium' | 'large') => {
    setFontSize(size);
    
    // Ustawienie zmiennej CSS dla rozmiaru czcionki
    const root = document.documentElement;
    const fontSizeMap = {
      small: '14px',
      medium: '16px',
      large: '18px'
    };
    
    root.style.setProperty('--font-size-base', fontSizeMap[size]);
  };
  
  // Obsługa przełączania animacji
  const handleToggleAnimations = () => {
    setReduceAnimations(!reduceAnimations);
    
    // Ustawienie zmiennej CSS dla animacji
    const root = document.documentElement;
    root.style.setProperty('--transition-speed', !reduceAnimations ? '0s' : '0.3s');
  };
  
  // Obsługa przełączania wysokiego kontrastu
  const handleToggleHighContrast = () => {
    setHighContrast(!highContrast);
    
    // Ustawienie zmiennych CSS dla wysokiego kontrastu
    const root = document.documentElement;
    
    if (!highContrast) {
      // Włączenie wysokiego kontrastu
      root.style.setProperty('--color-text', '#000000');
      root.style.setProperty('--color-background', '#ffffff');
      root.style.setProperty('--color-border', '#000000');
    } else {
      // Przywrócenie normalnego kontrastu
      root.style.setProperty('--color-text', themeColors.text);
      root.style.setProperty('--color-background', themeColors.background);
      root.style.setProperty('--color-border', themeColors.border);
    }
  };
  
  return (
    <Container>
      <Header>
        <Title>Ustawienia motywu</Title>
      </Header>
      
      <Card>
        <CardTitle>Wybierz motyw</CardTitle>
        <CardContent>
          <ThemeGrid>
            {availableThemes.map(theme => (
              <ThemeOption 
                key={theme.type} 
                selected={currentTheme === theme.type}
                themeColor={theme.primaryColor}
                onClick={() => changeTheme(theme.type)}
              >
                <ThemePreview 
                  bgColor={theme.bgColor}
                  primaryColor={theme.primaryColor}
                />
                <ThemeName>{theme.name}</ThemeName>
              </ThemeOption>
            ))}
          </ThemeGrid>
          
          <ToggleContainer>
            <ToggleLabel>Tryb ciemny</ToggleLabel>
            <ToggleSwitch>
              <ToggleInput 
                type="checkbox" 
                checked={isDarkMode}
                onChange={toggleDarkMode}
              />
              <ToggleSlider />
            </ToggleSwitch>
          </ToggleContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardTitle>Dostępność</CardTitle>
        <CardContent>
          <Section>
            <SectionTitle>Rozmiar czcionki</SectionTitle>
            <FontSizeOptions>
              <FontSizeOption 
                selected={fontSize === 'small'}
                onClick={() => handleFontSizeChange('small')}
              >
                Mały
              </FontSizeOption>
              <FontSizeOption 
                selected={fontSize === 'medium'}
                onClick={() => handleFontSizeChange('medium')}
              >
                Średni
              </FontSizeOption>
              <FontSizeOption 
                selected={fontSize === 'large'}
                onClick={() => handleFontSizeChange('large')}
              >
                Duży
              </FontSizeOption>
            </FontSizeOptions>
          </Section>
          
          <Section>
            <ToggleContainer>
              <ToggleLabel>Wysoki kontrast</ToggleLabel>
              <ToggleSwitch>
                <ToggleInput 
                  type="checkbox" 
                  checked={highContrast}
                  onChange={handleToggleHighContrast}
                />
                <ToggleSlider />
              </ToggleSwitch>
            </ToggleContainer>
            
            <ToggleContainer>
              <ToggleLabel>Ogranicz animacje</ToggleLabel>
              <ToggleSwitch>
                <ToggleInput 
                  type="checkbox" 
                  checked={reduceAnimations}
                  onChange={handleToggleAnimations}
                />
                <ToggleSlider />
              </ToggleSwitch>
            </ToggleContainer>
          </Section>
        </CardContent>
      </Card>
      
      <Card>
        <CardTitle>Podgląd</CardTitle>
        <CardContent>
          <PreviewContainer>
            <PreviewTitle>Przykładowy tytuł</PreviewTitle>
            <PreviewContent>
              To jest przykładowy tekst pokazujący, jak będzie wyglądać zawartość w wybranym motywie.
              Możesz dostosować wygląd aplikacji według swoich preferencji.
            </PreviewContent>
            <PreviewButton>Przykładowy przycisk</PreviewButton>
          </PreviewContainer>
          
          <Button onClick={handleSavePreferences}>Zapisz preferencje</Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ThemeSettings;
