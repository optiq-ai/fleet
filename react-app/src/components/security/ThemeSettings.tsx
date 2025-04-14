import React, { useState } from 'react';
import styled from 'styled-components';
import { useTheme, ThemeType } from '../context/ThemeContext';

interface ThemeSettingsProps {
  onSavePreferences: (preferences: any) => Promise<void>;
}

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  margin-bottom: 24px;
`;

const SettingsSection = styled.div`
  margin-bottom: 32px;
`;

const SectionTitle = styled.h3`
  margin-bottom: 16px;
  font-size: 18px;
`;

const OptionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
`;

const ThemeOption = styled.div<{ selected: boolean; themeColor: string }>`
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  border: 2px solid ${props => props.selected ? '#3f51b5' : 'transparent'};
  background-color: ${props => {
    switch(props.themeColor) {
      case 'light': return '#ffffff';
      case 'dark': return '#333333';
      case 'blue': return '#e3f2fd';
      case 'green': return '#e8f5e9';
      case 'purple': return '#f3e5f5';
      default: return '#ffffff';
    }
  }};
  color: ${props => props.themeColor === 'dark' ? '#ffffff' : '#333333'};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const ThemeName = styled.div`
  font-weight: 500;
  margin-bottom: 4px;
`;

const ThemeDescription = styled.div`
  font-size: 12px;
  opacity: 0.7;
`;

const SettingRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
`;

const SettingLabel = styled.div`
  font-weight: 500;
`;

const SettingDescription = styled.div`
  font-size: 12px;
  color: #666;
  margin-top: 4px;
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
  
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
    border-radius: 24px;
    
    &:before {
      position: absolute;
      content: "";
      height: 18px;
      width: 18px;
      left: 3px;
      bottom: 3px;
      background-color: white;
      transition: .4s;
      border-radius: 50%;
    }
  }
  
  input:checked + span {
    background-color: #3f51b5;
  }
  
  input:checked + span:before {
    transform: translateX(24px);
  }
`;

const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
`;

const SliderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Slider = styled.input`
  flex: 1;
  -webkit-appearance: none;
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background: #ddd;
  outline: none;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #3f51b5;
    cursor: pointer;
  }
  
  &::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #3f51b5;
    cursor: pointer;
  }
`;

const SliderValue = styled.div`
  width: 40px;
  text-align: right;
  font-size: 14px;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 32px;
`;

const Button = styled.button<{ primary?: boolean }>`
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  background-color: ${props => props.primary ? '#3f51b5' : '#f5f5f5'};
  color: ${props => props.primary ? 'white' : '#333'};
  
  &:hover {
    background-color: ${props => props.primary ? '#303f9f' : '#e0e0e0'};
  }
`;

const ThemeSettings: React.FC<ThemeSettingsProps> = ({ onSavePreferences }) => {
  const { 
    theme, 
    setTheme, 
    isDarkMode, 
    toggleDarkMode, 
    fontSize, 
    setFontSize, 
    highContrast, 
    setHighContrast, 
    reducedMotion, 
    setReducedMotion 
  } = useTheme();
  
  const [localTheme, setLocalTheme] = useState<ThemeType>(theme);
  const [localIsDarkMode, setLocalIsDarkMode] = useState<boolean>(isDarkMode);
  const [localFontSize, setLocalFontSize] = useState<number>(fontSize);
  const [localHighContrast, setLocalHighContrast] = useState<boolean>(highContrast);
  const [localReducedMotion, setLocalReducedMotion] = useState<boolean>(reducedMotion);
  
  const handleSave = async () => {
    // Apply all settings
    setTheme(localTheme);
    if (localIsDarkMode !== isDarkMode) {
      toggleDarkMode();
    }
    setFontSize(localFontSize);
    setHighContrast(localHighContrast);
    setReducedMotion(localReducedMotion);
    
    // Save to backend (if needed)
    await onSavePreferences({
      theme: localTheme,
      isDarkMode: localIsDarkMode,
      fontSize: localFontSize,
      highContrast: localHighContrast,
      reducedMotion: localReducedMotion
    });
  };
  
  const handleReset = () => {
    setLocalTheme(theme);
    setLocalIsDarkMode(isDarkMode);
    setLocalFontSize(fontSize);
    setLocalHighContrast(highContrast);
    setLocalReducedMotion(reducedMotion);
  };
  
  return (
    <Container>
      <Title>Ustawienia wyglądu</Title>
      
      <SettingsSection>
        <SectionTitle>Motyw</SectionTitle>
        <OptionGrid>
          <ThemeOption 
            selected={localTheme === 'light'} 
            themeColor="light"
            onClick={() => setLocalTheme('light')}
          >
            <ThemeName>Jasny</ThemeName>
            <ThemeDescription>Domyślny jasny motyw</ThemeDescription>
          </ThemeOption>
          
          <ThemeOption 
            selected={localTheme === 'dark'} 
            themeColor="dark"
            onClick={() => setLocalTheme('dark')}
          >
            <ThemeName>Ciemny</ThemeName>
            <ThemeDescription>Ciemny motyw, mniej męczący dla oczu</ThemeDescription>
          </ThemeOption>
          
          <ThemeOption 
            selected={localTheme === 'blue'} 
            themeColor="blue"
            onClick={() => setLocalTheme('blue')}
          >
            <ThemeName>Niebieski</ThemeName>
            <ThemeDescription>Spokojny niebieski motyw</ThemeDescription>
          </ThemeOption>
          
          <ThemeOption 
            selected={localTheme === 'green'} 
            themeColor="green"
            onClick={() => setLocalTheme('green')}
          >
            <ThemeName>Zielony</ThemeName>
            <ThemeDescription>Przyjazny dla środowiska</ThemeDescription>
          </ThemeOption>
          
          <ThemeOption 
            selected={localTheme === 'purple'} 
            themeColor="purple"
            onClick={() => setLocalTheme('purple')}
          >
            <ThemeName>Fioletowy</ThemeName>
            <ThemeDescription>Elegancki fioletowy motyw</ThemeDescription>
          </ThemeOption>
        </OptionGrid>
        
        <SettingRow>
          <div>
            <SettingLabel>Tryb ciemny</SettingLabel>
            <SettingDescription>Przełącz na ciemny motyw</SettingDescription>
          </div>
          <ToggleSwitch>
            <input 
              type="checkbox" 
              checked={localIsDarkMode} 
              onChange={() => setLocalIsDarkMode(!localIsDarkMode)} 
            />
            <span></span>
          </ToggleSwitch>
        </SettingRow>
      </SettingsSection>
      
      <SettingsSection>
        <SectionTitle>Dostępność</SectionTitle>
        
        <SettingRow>
          <div>
            <SettingLabel>Rozmiar czcionki: {localFontSize}px</SettingLabel>
            <SettingDescription>Dostosuj rozmiar tekstu</SettingDescription>
          </div>
          <SliderContainer>
            <SliderRow>
              <Slider 
                type="range" 
                min="12" 
                max="24" 
                value={localFontSize} 
                onChange={e => setLocalFontSize(parseInt(e.target.value))} 
              />
              <SliderValue>{localFontSize}px</SliderValue>
            </SliderRow>
          </SliderContainer>
        </SettingRow>
        
        <SettingRow>
          <div>
            <SettingLabel>Wysoki kontrast</SettingLabel>
            <SettingDescription>Zwiększa kontrast kolorów dla lepszej czytelności</SettingDescription>
          </div>
          <ToggleSwitch>
            <input 
              type="checkbox" 
              checked={localHighContrast} 
              onChange={() => setLocalHighContrast(!localHighContrast)} 
            />
            <span></span>
          </ToggleSwitch>
        </SettingRow>
        
        <SettingRow>
          <div>
            <SettingLabel>Zredukowane animacje</SettingLabel>
            <SettingDescription>Wyłącza lub ogranicza animacje interfejsu</SettingDescription>
          </div>
          <ToggleSwitch>
            <input 
              type="checkbox" 
              checked={localReducedMotion} 
              onChange={() => setLocalReducedMotion(!localReducedMotion)} 
            />
            <span></span>
          </ToggleSwitch>
        </SettingRow>
      </SettingsSection>
      
      <ButtonRow>
        <Button onClick={handleReset}>Anuluj</Button>
        <Button primary onClick={handleSave}>Zapisz zmiany</Button>
      </ButtonRow>
    </Container>
  );
};

export default ThemeSettings;
