import React from 'react';
import styled from 'styled-components';
import { useViewCustomization } from '../context/ViewCustomizationContext';

const ViewSelectorContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const ViewSelectorButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const DropdownMenu = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  width: 250px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
  display: ${props => props.isOpen ? 'block' : 'none'};
  margin-top: 5px;
`;

const DropdownSection = styled.div`
  padding: 10px;
  border-bottom: 1px solid #eee;
`;

const SectionTitle = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: #666;
  margin-bottom: 8px;
`;

const ViewItem = styled.div<{ active?: boolean }>`
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 4px;
  background-color: ${props => props.active ? '#f0f4f8' : 'transparent'};
  color: ${props => props.active ? '#3f51b5' : '#333'};
  
  &:hover {
    background-color: #f0f4f8;
  }
`;

const ManageLink = styled.div`
  padding: 8px 12px;
  cursor: pointer;
  color: #3f51b5;
  text-align: center;
  font-size: 14px;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ViewSelector: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { userViews, currentView, setCurrentView, setEditMode } = useViewCustomization();
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  const handleViewSelect = (viewId: string) => {
    setCurrentView(viewId);
    setIsOpen(false);
  };
  
  const handleManageViews = () => {
    setEditMode(true);
    setIsOpen(false);
    // In a real implementation, this would navigate to the customization page
  };
  
  return (
    <ViewSelectorContainer>
      <ViewSelectorButton onClick={toggleDropdown}>
        Widoki ▼
      </ViewSelectorButton>
      
      <DropdownMenu isOpen={isOpen}>
        <DropdownSection>
          <SectionTitle>Moje widoki:</SectionTitle>
          {userViews.map(view => (
            <ViewItem 
              key={view.id}
              active={view.id === currentView}
              onClick={() => handleViewSelect(view.id)}
            >
              {view.name}
            </ViewItem>
          ))}
        </DropdownSection>
        
        <DropdownSection>
          <ManageLink onClick={handleManageViews}>
            Zarządzaj widokami...
          </ManageLink>
        </DropdownSection>
      </DropdownMenu>
    </ViewSelectorContainer>
  );
};

export default ViewSelector;
