import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next'; // Import useTranslation
import ViewSelector from '../common/ViewSelector';
import LanguageSwitcher from '../common/LanguageSwitcher'; // Import LanguageSwitcher

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  background-color: var(--header);
  color: var(--headerText);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, color 0.3s ease;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
`;

const LogoImage = styled.img`
  height: 40px; /* Increased height for better visibility */
  width: auto;
  border-radius: 4px; /* Optional: adds slight rounding to the logo */
`;

const LogoText = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: var(--text);
  transition: color 0.3s ease;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 4px;
  
  &:hover {
    background-color: var(--hover);
    transition: background-color 0.3s ease;
  }
`;

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 500;
  transition: background-color 0.3s ease;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.div`
  font-weight: 500;
  font-size: 14px;
  color: var(--text);
  transition: color 0.3s ease;
`;

const UserRole = styled.div`
  font-size: 12px;
  color: var(--textSecondary);
  transition: color 0.3s ease;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: var(--hover);
    transition: background-color 0.3s ease;
  }
  
  svg {
    width: 24px;
    height: 24px;
    fill: var(--textSecondary);
    transition: fill 0.3s ease;
  }
`;

/**
 * Header component for application with i18n support
 * @returns {JSX.Element} Header component
 */
const Header = () => {
  const navigate = useNavigate();
  const { currentTheme } = useTheme();
  const { t } = useTranslation(); // Initialize useTranslation
  
  const handleSettingsClick = () => {
    navigate('/settings/view-customization');
  };
  
  return (
    <HeaderContainer>
      <Logo onClick={() => navigate('/')}>
        <LogoImage src="/images/fleet_logo.jpg" alt="Fleet App Logo" />
        <LogoText>Fleet App</LogoText> {/* Keeping logo text static for now */}
      </Logo>
      
      <RightSection>
        <ViewSelector />
        
        <IconButton aria-label={t('header.notifications')}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" />
          </svg>
        </IconButton>
        
        <IconButton aria-label={t('sidebar.menu.settings')} onClick={handleSettingsClick}> {/* Using existing sidebar key for settings */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
          </svg>
        </IconButton>

        <LanguageSwitcher /> {/* Added LanguageSwitcher component */}
        
        {/* User section - Assuming user data comes from context/API, not translating name/role here */}
        <UserSection title={t('header.profile')}> {/* Added title for profile hint */}
          <Avatar>JK</Avatar>
          <UserInfo>
            <UserName>Jan Kowalski</UserName>
            <UserRole>Administrator</UserRole>
          </UserInfo>
        </UserSection>
      </RightSection>
    </HeaderContainer>
  );
};

export default Header;
