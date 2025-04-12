import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ViewSelector from './ViewSelector';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 60px;
  background-color: #3f51b5;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
`;

const PageTitle = styled.div`
  font-size: 18px;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const EditButton = styled.button`
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 14px;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const ProfileButton = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

const Header: React.FC = () => {
  const navigate = useNavigate();
  
  const handleLogoClick = () => {
    navigate('/');
  };
  
  const handleEditClick = () => {
    navigate('/customize-view');
  };
  
  return (
    <HeaderContainer>
      <Logo onClick={handleLogoClick}>Fleet App</Logo>
      <PageTitle>Dashboard</PageTitle>
      <HeaderActions>
        <ViewSelector />
        <EditButton onClick={handleEditClick}>Edytuj</EditButton>
        <ProfileButton>P</ProfileButton>
      </HeaderActions>
    </HeaderContainer>
  );
};

export default Header;
