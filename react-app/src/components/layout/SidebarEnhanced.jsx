import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { 
  FiHome, FiMonitor, FiShield, FiTruck, FiUsers, 
  FiMap, FiFileText, FiBarChart2, FiSettings,
  FiAlertTriangle, FiUserCheck, FiDatabase, FiLayers,
  FiNavigation, FiDroplet, FiDollarSign, FiAnchor,
  FiMapPin, FiMessageSquare, FiLink, FiCpu,
  FiPieChart, FiPackage, FiTool, FiClipboard
} from 'react-icons/fi';

// Enhanced styling with animations and better visual hierarchy
const SidebarContainer = styled.aside`
  width: 250px;
  background-color: var(--sidebar);
  border-right: 1px solid var(--border);
  height: calc(100vh - 60px);
  overflow-y: auto;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  
  &:hover {
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  }
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 8px 0;
  margin: 0;
`;

// Enhanced menu item with icon support and better hover effects
const MenuItem = styled.li`
  padding: 10px 16px;
  margin: 4px 8px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: ${props => props.active ? '600' : '400'};
  background-color: ${props => props.active ? 'var(--hover)' : 'transparent'};
  border-left: 3px solid ${props => props.active ? 'var(--primary)' : 'transparent'};
  color: var(--sidebarText);
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  
  &:hover {
    background-color: var(--hover);
    transform: translateX(2px);
  }
  
  &:active {
    transform: scale(0.98);
  }
  
  /* Ripple effect */
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 5px;
    height: 5px;
    background: rgba(255, 255, 255, 0.3);
    opacity: 0;
    border-radius: 100%;
    transform: scale(1, 1) translate(-50%);
    transform-origin: 50% 50%;
  }
  
  &:focus:not(:active)::after {
    animation: ripple 1s ease-out;
  }
  
  @keyframes ripple {
    0% {
      transform: scale(0, 0);
      opacity: 0.5;
    }
    20% {
      transform: scale(25, 25);
      opacity: 0.3;
    }
    100% {
      opacity: 0;
      transform: scale(40, 40);
    }
  }
`;

const MenuIcon = styled.span`
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: ${props => props.active ? 'var(--primary)' : 'var(--sidebarText)'};
  transition: color 0.3s ease;
  
  ${MenuItem}:hover & {
    color: var(--primary);
  }
`;

const MenuText = styled.span`
  font-size: 14px;
  transition: all 0.2s ease;
  
  ${MenuItem}:hover & {
    transform: translateX(2px);
  }
`;

// Enhanced submenu with better spacing and animations
const SubMenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 0 36px;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
`;

const SubMenuContainer = styled.div`
  & > ${SubMenuList} {
    max-height: ${props => props.expanded ? '500px' : '0'};
    transition: max-height 0.3s ease-in-out;
  }
`;

// Enhanced nested submenu with better indentation
const NestedSubMenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 0 16px;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
`;

const NestedSubMenuContainer = styled.div`
  & > ${NestedSubMenuList} {
    max-height: ${props => props.expanded ? '500px' : '0'};
    transition: max-height 0.3s ease-in-out;
  }
`;

// Enhanced submenu item with subtle hover effects
const SubMenuItem = styled.li`
  padding: 8px 16px;
  margin: 2px 0;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  font-weight: ${props => props.active ? '600' : '400'};
  color: ${props => props.active ? 'var(--primary)' : 'var(--textSecondary)'};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  
  &:hover {
    color: var(--primary);
    background-color: rgba(0, 0, 0, 0.03);
    padding-left: 18px;
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

// Further nested submenu item with even more subtle styling
const NestedSubMenuItem = styled.li`
  padding: 6px 16px;
  margin: 1px 0;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  font-weight: ${props => props.active ? '600' : '400'};
  color: ${props => props.active ? 'var(--primary)' : 'var(--textSecondary)'};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  
  &:hover {
    color: var(--primary);
    background-color: rgba(0, 0, 0, 0.02);
    padding-left: 18px;
  }
`;

// Section divider for visual grouping
const SectionDivider = styled.div`
  height: 1px;
  background-color: var(--border);
  margin: 8px 16px;
  opacity: 0.5;
`;

// Category label for better organization
const CategoryLabel = styled.div`
  font-size: 11px;
  text-transform: uppercase;
  color: var(--textSecondary);
  opacity: 0.7;
  padding: 8px 24px 4px;
  letter-spacing: 1px;
`;

/**
 * Enhanced Sidebar navigation component with improved visuals
 * @returns {JSX.Element} Enhanced Sidebar component
 */
const SidebarEnhanced = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentTheme } = useTheme();
  
  // State for expanded menus, including nested ones
  const [expandedMenus, setExpandedMenus] = React.useState({
    monitoringSecurity: location.pathname.startsWith("/monitoring") || location.pathname.startsWith("/fraud-detection") || location.pathname.startsWith("/driver-safety") || location.pathname.startsWith("/geofencing"),
    fleetManagement: location.pathname.startsWith("/fleet-management") || location.pathname.startsWith("/vehicles") || location.pathname.startsWith("/truck-fleet") || location.pathname.startsWith("/asset-management"),
    vehiclesSubMenu: location.pathname.startsWith("/vehicles"),
    drivers: location.pathname.startsWith("/drivers"),
    transportOperations: location.pathname.startsWith("/route-optimization") || location.pathname.startsWith("/fuel-analysis") || location.pathname.startsWith("/road-tolls") || location.pathname.startsWith("/ferry-bookings"),
    docsCommunication: location.pathname.startsWith("/document-management") || location.pathname.startsWith("/communication"),
    analyticsAutomation: location.pathname.startsWith("/statistics") || location.pathname.startsWith("/ai-automation") || location.pathname.startsWith("/integrations"),
    settings: location.pathname.startsWith("/settings")
  });
  
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const isSubMenuActive = (path) => {
    return location.pathname === path;
  };
  
  const toggleSubMenu = (menu) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  const toggleNestedSubMenu = (menu) => {
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
        {/* 1. Dashboard */}
        <MenuItem 
          active={isSubMenuActive('/')} 
          onClick={() => handleNavigate('/')}
        >
          <MenuIcon active={isSubMenuActive('/')}>
            <FiHome />
          </MenuIcon>
          <MenuText>Dashboard</MenuText>
        </MenuItem>

        <SectionDivider />
        <CategoryLabel>Monitoring</CategoryLabel>

        {/* 2. Monitoring & Bezpieczeństwo */}
        <SubMenuContainer expanded={expandedMenus.monitoringSecurity}>
          <MenuItem 
            active={isActive('/monitoring') || isActive('/fraud-detection') || isActive('/driver-safety') || isActive('/geofencing')} 
            onClick={() => toggleSubMenu('monitoringSecurity')}
          >
            <MenuIcon active={isActive('/monitoring') || isActive('/fraud-detection') || isActive('/driver-safety') || isActive('/geofencing')}>
              <FiMonitor />
            </MenuIcon>
            <MenuText>Monitoring & Security</MenuText>
          </MenuItem>
          <SubMenuList>
            <SubMenuItem 
              active={isSubMenuActive('/monitoring')} 
              onClick={() => handleNavigate('/monitoring')}
            >
              <FiMonitor style={{ marginRight: '8px', fontSize: '14px' }} />
              Monitoring
            </SubMenuItem>
            <SubMenuItem 
              active={isSubMenuActive('/fraud-detection')} 
              onClick={() => handleNavigate('/fraud-detection')}
            >
              <FiAlertTriangle style={{ marginRight: '8px', fontSize: '14px' }} />
              Fraud Detection
            </SubMenuItem>
            <SubMenuItem 
              active={isSubMenuActive('/driver-safety')} 
              onClick={() => handleNavigate('/driver-safety')}
            >
              <FiShield style={{ marginRight: '8px', fontSize: '14px' }} />
              Driver Safety
            </SubMenuItem>
            <SubMenuItem 
              active={isSubMenuActive('/geofencing')} 
              onClick={() => handleNavigate('/geofencing')}
            >
              <FiMapPin style={{ marginRight: '8px', fontSize: '14px' }} />
              Geofencing
            </SubMenuItem>
          </SubMenuList>
        </SubMenuContainer>

        <SectionDivider />
        <CategoryLabel>Fleet</CategoryLabel>

        {/* 3. Zarządzanie Flotą */}
        <SubMenuContainer expanded={expandedMenus.fleetManagement}>
          <MenuItem 
            active={isActive('/fleet-management') || isActive('/vehicles') || isActive('/truck-fleet') || isActive('/asset-management')} 
            onClick={() => toggleSubMenu('fleetManagement')}
          >
            <MenuIcon active={isActive('/fleet-management') || isActive('/vehicles') || isActive('/truck-fleet') || isActive('/asset-management')}>
              <FiTruck />
            </MenuIcon>
            <MenuText>Fleet Management</MenuText>
          </MenuItem>
          <SubMenuList>
            <SubMenuItem 
              active={isSubMenuActive('/fleet-management')} 
              onClick={() => handleNavigate('/fleet-management')}
            >
              <FiDatabase style={{ marginRight: '8px', fontSize: '14px' }} />
              Fleet Overview
            </SubMenuItem>
            {/* Nested Vehicles Menu */}
            <NestedSubMenuContainer expanded={expandedMenus.vehiclesSubMenu}>
              <SubMenuItem 
                active={isActive('/vehicles')} 
                onClick={() => toggleNestedSubMenu('vehiclesSubMenu')}
              >
                <FiTruck style={{ marginRight: '8px', fontSize: '14px' }} />
                Vehicles
              </SubMenuItem>
              <NestedSubMenuList>
                <NestedSubMenuItem 
                  active={isSubMenuActive('/vehicles/overview')} 
                  onClick={() => handleNavigate('/vehicles/overview')}
                >
                  Overview
                </NestedSubMenuItem>
                <NestedSubMenuItem 
                  active={isSubMenuActive('/predictive-maintenance')} 
                  onClick={() => handleNavigate('/predictive-maintenance')}
                >
                  Maintenance
                </NestedSubMenuItem>
                <NestedSubMenuItem 
                  active={isSubMenuActive('/vehicles/parts')} 
                  onClick={() => handleNavigate('/vehicles/parts')}
                >
                  Parts
                </NestedSubMenuItem>
                <NestedSubMenuItem 
                  active={isSubMenuActive('/vehicles/tires')} 
                  onClick={() => handleNavigate('/vehicles/tires')}
                >
                  Tires
                </NestedSubMenuItem>
              </NestedSubMenuList>
            </NestedSubMenuContainer>
            <SubMenuItem 
              active={isSubMenuActive('/truck-fleet')} 
              onClick={() => handleNavigate('/truck-fleet')}
            >
              <FiPackage style={{ marginRight: '8px', fontSize: '14px' }} />
              Truck Fleet
            </SubMenuItem>
            <SubMenuItem 
              active={isSubMenuActive('/asset-management')} 
              onClick={() => handleNavigate('/asset-management')}
            >
              <FiLayers style={{ marginRight: '8px', fontSize: '14px' }} />
              Asset Management
            </SubMenuItem>
          </SubMenuList>
        </SubMenuContainer>

        {/* 4. Kierowcy */}
        <SubMenuContainer expanded={expandedMenus.drivers}>
           <MenuItem 
            active={isActive('/drivers')} 
            onClick={() => toggleSubMenu('drivers')}
          >
            <MenuIcon active={isActive('/drivers')}>
              <FiUsers />
            </MenuIcon>
            <MenuText>Drivers</MenuText>
          </MenuItem>
          <SubMenuList>
             <SubMenuItem 
              active={isSubMenuActive('/drivers')} 
              onClick={() => handleNavigate('/drivers')}
            >
              <FiUserCheck style={{ marginRight: '8px', fontSize: '14px' }} />
              Driver List
            </SubMenuItem>
          </SubMenuList>
        </SubMenuContainer>

        <SectionDivider />
        <CategoryLabel>Operations</CategoryLabel>

        {/* 5. Operacje Transportowe */}
        <SubMenuContainer expanded={expandedMenus.transportOperations}>
          <MenuItem 
            active={isActive('/route-optimization') || isActive('/fuel-analysis') || isActive('/road-tolls') || isActive('/ferry-bookings')} 
            onClick={() => toggleSubMenu('transportOperations')}
          >
            <MenuIcon active={isActive('/route-optimization') || isActive('/fuel-analysis') || isActive('/road-tolls') || isActive('/ferry-bookings')}>
              <FiMap />
            </MenuIcon>
            <MenuText>Transport Operations</MenuText>
          </MenuItem>
          <SubMenuList>
            <SubMenuItem 
              active={isSubMenuActive('/route-optimization')} 
              onClick={() => handleNavigate('/route-optimization')}
            >
              <FiNavigation style={{ marginRight: '8px', fontSize: '14px' }} />
              Route Optimization
            </SubMenuItem>
            <SubMenuItem 
              active={isSubMenuActive('/fuel-analysis')} 
              onClick={() => handleNavigate('/fuel-analysis')}
            >
              <FiDroplet style={{ marginRight: '8px', fontSize: '14px' }} />
              Fuel Analysis
            </SubMenuItem>
            <SubMenuItem 
              active={isSubMenuActive('/road-tolls')} 
              onClick={() => handleNavigate('/road-tolls')}
            >
              <FiDollarSign style={{ marginRight: '8px', fontSize: '14px' }} />
              Road Tolls
            </SubMenuItem>
            <SubMenuItem 
              active={isSubMenuActive('/ferry-bookings')} 
              onClick={() => handleNavigate('/ferry-bookings')}
            >
              <FiAnchor style={{ marginRight: '8px', fontSize: '14px' }} />
              Ferry Bookings
            </SubMenuItem>
          </SubMenuList>
        </SubMenuContainer>

        {/* 6. Dokumenty & Komunikacja */}
        <SubMenuContainer expanded={expandedMenus.docsCommunication}>
          <MenuItem 
            active={isActive('/document-management') || isActive('/communication')} 
            onClick={() => toggleSubMenu('docsCommunication')}
          >
            <MenuIcon active={isActive('/document-management') || isActive('/communication')}>
              <FiFileText />
            </MenuIcon>
            <MenuText>Docs & Communication</MenuText>
          </MenuItem>
          <SubMenuList>
            <SubMenuItem 
              active={isSubMenuActive('/document-management')} 
              onClick={() => handleNavigate('/document-management')}
            >
              <FiClipboard style={{ marginRight: '8px', fontSize: '14px' }} />
              Document Management
            </SubMenuItem>
            <SubMenuItem 
              active={isSubMenuActive('/communication')} 
              onClick={() => handleNavigate('/communication')}
            >
              <FiMessageSquare style={{ marginRight: '8px', fontSize: '14px' }} />
              Communication
            </SubMenuItem>
          </SubMenuList>
        </SubMenuContainer>

        <SectionDivider />
        <CategoryLabel>Analytics</CategoryLabel>

        {/* 7. Analityka & Automatyzacja */}
        <SubMenuContainer expanded={expandedMenus.analyticsAutomation}>
          <MenuItem 
            active={isActive('/statistics') || isActive('/ai-automation') || isActive('/integrations')} 
            onClick={() => toggleSubMenu('analyticsAutomation')}
          >
            <MenuIcon active={isActive('/statistics') || isActive('/ai-automation') || isActive('/integrations')}>
              <FiBarChart2 />
            </MenuIcon>
            <MenuText>Analytics & Automation</MenuText>
          </MenuItem>
          <SubMenuList>
            <SubMenuItem 
              active={isSubMenuActive('/statistics')} 
              onClick={() => handleNavigate('/statistics')}
            >
              <FiPieChart style={{ marginRight: '8px', fontSize: '14px' }} />
              Statistics
            </SubMenuItem>
            <SubMenuItem 
              active={isSubMenuActive('/ai-automation')} 
              onClick={() => handleNavigate('/ai-automation')}
            >
              <FiCpu style={{ marginRight: '8px', fontSize: '14px' }} />
              AI & Automation
            </SubMenuItem>
            <SubMenuItem 
              active={isSubMenuActive('/integrations')} 
              onClick={() => handleNavigate('/integrations')}
            >
              <FiLink style={{ marginRight: '8px', fontSize: '14px' }} />
              Integrations
            </SubMenuItem>
          </SubMenuList>
        </SubMenuContainer>

        <SectionDivider />

        {/* 8. Ustawienia */}
        <SubMenuContainer expanded={expandedMenus.settings}>
          <MenuItem 
            active={isActive('/settings')} 
            onClick={() => toggleSubMenu('settings')}
          >
            <MenuIcon active={isActive('/settings')}>
              <FiSettings />
            </MenuIcon>
            <MenuText>Settings</MenuText>
          </MenuItem>
          <SubMenuList>
            <SubMenuItem 
              active={isSubMenuActive('/settings/users')} 
              onClick={() => handleNavigate('/settings/users')}
            >
              <FiUsers style={{ marginRight: '8px', fontSize: '14px' }} />
              Users
            </SubMenuItem>
            <SubMenuItem 
              active={isSubMenuActive('/settings/roles')} 
              onClick={() => handleNavigate('/settings/roles')}
            >
              <FiUserCheck style={{ marginRight: '8px', fontSize: '14px' }} />
              Roles
            </SubMenuItem>
            <SubMenuItem 
              active={isSubMenuActive('/settings/view-customization')} 
              onClick={() => handleNavigate('/settings/view-customization')}
            >
              <FiTool style={{ marginRight: '8px', fontSize: '14px' }} />
              View Customization
            </SubMenuItem>
            <SubMenuItem 
              active={isSubMenuActive('/settings/security')} 
              onClick={() => handleNavigate('/settings/security')}
            >
              <FiShield style={{ marginRight: '8px', fontSize: '14px' }} />
              Security
            </SubMenuItem>
          </SubMenuList>
        </SubMenuContainer>

      </MenuList>
    </SidebarContainer>
  );
};

export default SidebarEnhanced;

