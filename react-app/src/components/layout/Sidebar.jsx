import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

const SidebarContainer = styled.aside`
  width: 250px;
  background-color: var(--sidebar);
  border-right: 1px solid var(--border);
  height: calc(100vh - 60px);
  overflow-y: auto;
  transition: background-color 0.3s ease, border-color 0.3s ease;
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MenuItem = styled.li`
  padding: 12px 20px;
  cursor: pointer;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  background-color: ${props => props.active ? 'var(--hover)' : 'transparent'};
  border-left: 4px solid ${props => props.active ? 'var(--primary)' : 'transparent'};
  color: var(--sidebarText);
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
  
  &:hover {
    background-color: var(--hover);
  }
`;

const SubMenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 0 20px;
  display: none;
`;

const SubMenuContainer = styled.div`
  & ${SubMenuList} {
    display: ${props => props.expanded ? 'block' : 'none'};
  }
`;

const SubMenuItem = styled.li`
  padding: 8px 20px;
  cursor: pointer;
  font-size: 14px;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  color: ${props => props.active ? 'var(--primary)' : 'var(--textSecondary)'};
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--primary);
  }
`;

/**
 * Sidebar navigation component
 * @returns {JSX.Element} Sidebar component
 */
const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentTheme } = useTheme();
  
  const [expandedMenus, setExpandedMenus] = React.useState({
    vehicles: false,
    settings: location.pathname.startsWith("/settings"),
    truckFleet: location.pathname.startsWith("/truck-fleet") // Add state for truck fleet menu
  });
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  const toggleSubMenu = (menu) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };
  
  const handleNavigate = (path) => {
    navigate(path);
  };
  
  return (
    <SidebarContainer>
      <MenuList>
        <MenuItem 
          active={isActive('/')} 
          onClick={() => handleNavigate('/')}
        >
          Dashboard
        </MenuItem>
        
        <MenuItem 
          active={isActive('/monitoring')} 
          onClick={() => handleNavigate('/monitoring')}
        >
          Monitoring
        </MenuItem>
        
        <MenuItem 
          active={isActive('/fraud-detection')} 
          onClick={() => handleNavigate('/fraud-detection')}
        >
          Fraud Detection
        </MenuItem>
        
        <SubMenuContainer expanded={expandedMenus.vehicles}>
          <MenuItem 
            active={location.pathname.startsWith('/vehicles')} 
            onClick={() => toggleSubMenu('vehicles')}
          >
            Vehicles
          </MenuItem>
          <SubMenuList>
            <SubMenuItem 
              active={isActive('/vehicles/overview')} 
              onClick={() => handleNavigate('/vehicles/overview')}
            >
              Overview
            </SubMenuItem>
            <SubMenuItem 
              active={isActive('/predictive-maintenance')} 
              onClick={() => handleNavigate('/predictive-maintenance')}
            >
              Maintenance
            </SubMenuItem>
            <SubMenuItem 
              active={isActive('/vehicles/parts')} 
              onClick={() => handleNavigate('/vehicles/parts')}
            >
              Parts
            </SubMenuItem>
            <SubMenuItem 
              active={isActive('/vehicles/tires')} 
              onClick={() => handleNavigate('/vehicles/tires')}
            >
              Tires
            </SubMenuItem>
          </SubMenuList>
        </SubMenuContainer>
        
        <MenuItem 
          active={isActive('/driver-safety')} 
          onClick={() => handleNavigate('/driver-safety')}
        >
          Driver Safety
        </MenuItem>
        
        <MenuItem 
          active={isActive('/drivers')} 
          onClick={() => handleNavigate('/drivers')}
        >
          Drivers
        </MenuItem>
        
        <MenuItem 
          active={isActive('/fleet-management')} 
          onClick={() => handleNavigate('/fleet-management')}
        >
          Fleet Management
        </MenuItem>
        
        <MenuItem 
          active={isActive('/fuel-analysis')} 
          onClick={() => handleNavigate('/fuel-analysis')}
        >
          Fuel Analysis
        </MenuItem>
        
        <MenuItem 
          active={isActive('/route-optimization')} 
          onClick={() => handleNavigate('/route-optimization')}
        >
          Route Optimization
        </MenuItem>
        
        <MenuItem 
          active={isActive('/road-tolls')} 
          onClick={() => handleNavigate('/road-tolls')}
        >
          Road Tolls
        </MenuItem>
        
        <MenuItem 
          active={isActive('/ferry-bookings')} 
          onClick={() => handleNavigate('/ferry-bookings')}
        >
          Ferry Bookings
        </MenuItem>
        
        <MenuItem 
          active={isActive('/geofencing')} 
          onClick={() => handleNavigate('/geofencing')}
        >
          Geofencing
        </MenuItem>
        
        <MenuItem 
          active={isActive('/document-management')} 
          onClick={() => handleNavigate('/document-management')}
        >
          Document Management
        </MenuItem>
        
        <MenuItem 
          active={isActive('/asset-management')} 
          onClick={() => handleNavigate('/asset-management')}
        >
          Asset Management
        </MenuItem>
        
        <MenuItem 
          active={isActive('/communication')} 
          onClick={() => handleNavigate('/communication')}
        >
          Communication
        </MenuItem>
        
        <MenuItem 
          active={isActive('/integrations')} 
          onClick={() => handleNavigate('/integrations')}
        >
          Integrations
        </MenuItem>
        
        <MenuItem 
          active={isActive('/ai-automation')} 
          onClick={() => handleNavigate('/ai-automation')}
        >
          AI & Automation
        </MenuItem>
        
        <MenuItem 
          active={isActive('/statistics')} 
          onClick={() => handleNavigate('/statistics')}
        >
          Statistics
        </MenuItem>
        
        {/* Truck Fleet Management Module */}
        <SubMenuContainer expanded={expandedMenus.truckFleet}>
          <MenuItem 
            active={location.pathname.startsWith('/truck-fleet')} 
            onClick={() => toggleSubMenu('truckFleet')}
          >
            Truck Fleet
          </MenuItem>
          <SubMenuList>
            <SubMenuItem 
              active={isActive('/truck-fleet')} 
              onClick={() => handleNavigate('/truck-fleet')}
            >
              Dashboard
            </SubMenuItem>
            <SubMenuItem 
              active={isActive('/truck-fleet/trucks')} 
              onClick={() => handleNavigate('/truck-fleet/trucks')}
            >
              Trucks
            </SubMenuItem>
            <SubMenuItem 
              active={isActive('/truck-fleet/trailers')} 
              onClick={() => handleNavigate('/truck-fleet/trailers')}
            >
              Trailers
            </SubMenuItem>
            <SubMenuItem 
              active={isActive('/truck-fleet/drivers')} 
              onClick={() => handleNavigate('/truck-fleet/drivers')}
            >
              Drivers
            </SubMenuItem>
            <SubMenuItem 
              active={isActive('/truck-fleet/work-time')} 
              onClick={() => handleNavigate('/truck-fleet/work-time')}
            >
              Work Time
            </SubMenuItem>
            <SubMenuItem 
              active={isActive('/truck-fleet/routes')} 
              onClick={() => handleNavigate('/truck-fleet/routes')}
            >
              Routes
            </SubMenuItem>
            <SubMenuItem 
              active={isActive('/truck-fleet/cargo')} 
              onClick={() => handleNavigate('/truck-fleet/cargo')}
            >
              Cargo
            </SubMenuItem>
            <SubMenuItem 
              active={isActive('/truck-fleet/tolls')} 
              onClick={() => handleNavigate('/truck-fleet/tolls')}
            >
              Tolls
            </SubMenuItem>
            <SubMenuItem 
              active={isActive('/truck-fleet/service')} 
              onClick={() => handleNavigate('/truck-fleet/service')}
            >
              Service
            </SubMenuItem>
            <SubMenuItem 
              active={isActive('/truck-fleet/documents')} 
              onClick={() => handleNavigate('/truck-fleet/documents')}
            >
              Documents
            </SubMenuItem>
          </SubMenuList>
        </SubMenuContainer>
        
        <SubMenuContainer expanded={expandedMenus.settings}>
          <MenuItem 
            active={location.pathname.startsWith('/settings')} 
            onClick={() => {
              toggleSubMenu('settings');
              handleNavigate('/settings');
            }}
          >
            Settings
          </MenuItem>
          <SubMenuList>
            <SubMenuItem 
              active={isActive('/settings/users')} 
              onClick={() => handleNavigate('/settings/users')}
            >
              Users
            </SubMenuItem>
            <SubMenuItem 
              active={isActive('/settings/roles')} 
              onClick={() => handleNavigate('/settings/roles')}
            >
              Roles
            </SubMenuItem>
            <SubMenuItem 
              active={isActive('/settings/view-customization')} 
              onClick={() => handleNavigate('/settings/view-customization')}
            >
              View Customization
            </SubMenuItem>
            <SubMenuItem 
              active={isActive('/settings/security')} 
              onClick={() => handleNavigate('/settings/security')}
            >
              Security
            </SubMenuItem>
          </SubMenuList>
        </SubMenuContainer>
      </MenuList>
    </SidebarContainer>
  );
};

export default Sidebar;
