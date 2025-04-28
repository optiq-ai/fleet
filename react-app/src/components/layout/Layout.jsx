import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import Header from './Header';
import Sidebar from './SidebarEnhanced';

// Using CSS variables from theme.css for theming
const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  display: flex;
  flex: 1;
`;

const ContentArea = styled.div`
  flex: 1;
  padding: 20px;
  background-color: var(--surface);
  color: var(--text);
  overflow-y: auto;
  transition: background-color 0.3s ease, color 0.3s ease;
`;

/**
 * Layout component for application structure
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} Layout component
 */
const Layout = ({ children }) => {
  // Use theme context to access current theme
  const { currentTheme } = useTheme();

  return (
    <LayoutContainer className={`theme-${currentTheme}`}>
      <Header />
      <MainContent>
        <Sidebar />
        <ContentArea>{children}</ContentArea>
      </MainContent>
    </LayoutContainer>
  );
};

export default Layout;
