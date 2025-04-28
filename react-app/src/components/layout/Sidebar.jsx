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
  margin: 0 0 0 20px; /* Indentation for sub-items */
  display: none;
`;

const NestedSubMenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 0 20px; /* Further indentation for nested sub-items */
  display: none;
`;

const SubMenuContainer = styled.div`
  & > ${SubMenuList} {
    display: ${props => props.expanded ? 'block' : 'none'};
  }
`;

const NestedSubMenuContainer = styled.div`
  & > ${NestedSubMenuList} {
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

const NestedSubMenuItem = styled.li`
  padding: 6px 20px;
  cursor: pointer;
  font-size: 13px;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  color: ${props => props.active ? 'var(--primary)' : 'var(--textSecondary)'};
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--primary);
  }
`;

/**
 * Sidebar navigation component (Reorganized)
 * @returns {JSX.Element} Sidebar component
 */
const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentTheme } = useTheme();
  
  // State for expanded menus, including nested ones
  const [expandedMenus, setExpandedMenus] = React.useState({
    monitoringSecurity: location.pathname.startsWith("/monitoring") || location.pathname.startsWith("/fraud-detection") || location.pathname.startsWith("/driver-safety") || location.pathname.startsWith("/geofencing"),
    fleetManagement: location.pathname.startsWith("/fleet-management") || location.pathname.startsWith("/vehicles") || location.pathname.startsWith("/truck-fleet") || location.pathname.startsWith("/asset-management"),
    vehiclesSubMenu: location.pathname.startsWith("/vehicles"), // For nested dropdown
    drivers: location.pathname.startsWith("/drivers"), // Keep simple for now
    transportOperations: location.pathname.startsWith("/route-optimization") || location.pathname.startsWith("/fuel-analysis") || location.pathname.startsWith("/road-tolls") || location.pathname.startsWith("/ferry-bookings"),
    docsCommunication: location.pathname.startsWith("/document-management") || location.pathname.startsWith("/communication"),
    analyticsAutomation: location.pathname.startsWith("/statistics") || location.pathname.startsWith("/ai-automation") || location.pathname.startsWith("/integrations"),
    settings: location.pathname.startsWith("/settings")
  });
  
  const isActive = (path) => {
    // Check for exact match or if it's a parent path for an active sub-item
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const isSubMenuActive = (path) => {
    return location.pathname === path;
  }
  
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
          Dashboard
        </MenuItem>

        {/* 2. Monitoring & Bezpieczeństwo */}
        <SubMenuContainer expanded={expandedMenus.monitoringSecurity}>
          <MenuItem 
            active={isActive('/monitoring') || isActive('/fraud-detection') || isActive('/driver-safety') || isActive('/geofencing')} 
            onClick={() => toggleSubMenu('monitoringSecurity')}
          >
            Monitoring & Security
          </MenuItem>
          <SubMenuList>
            <SubMenuItem 
              active={isSubMenuActive('/monitoring')} 
              onClick={() => handleNavigate('/monitoring')}
            >
              Monitoring
            </SubMenuItem>
            <SubMenuItem 
              active={isSubMenuActive('/fraud-detection')} 
              onClick={() => handleNavigate('/fraud-detection')}
            >
              Fraud Detection
            </SubMenuItem>
            <SubMenuItem 
              active={isSubMenuActive('/driver-safety')} 
              onClick={() => handleNavigate('/driver-safety')}
            >
              Driver Safety
            </SubMenuItem>
            <SubMenuItem 
              active={isSubMenuActive('/geofencing')} 
              onClick={() => handleNavigate('/geofencing')}
            >
              Geofencing
            </SubMenuItem>
          </SubMenuList>
        </SubMenuContainer>

        {/* 3. Zarządzanie Flotą */}
        <SubMenuContainer expanded={expandedMenus.fleetManagement}>
          <MenuItem 
            active={isActive('/fleet-management') || isActive('/vehicles') || isActive('/truck-fleet') || isActive('/asset-management')} 
            onClick={() => toggleSubMenu('fleetManagement')}
          >
            Fleet Management
          </MenuItem>
          <SubMenuList>
            <SubMenuItem 
              active={isSubMenuActive('/fleet-management')} 
              onClick={() => handleNavigate('/fleet-management')}
            >
              Fleet Overview
            </SubMenuItem>
            {/* Nested Vehicles Menu */}
            <NestedSubMenuContainer expanded={expandedMenus.vehiclesSubMenu}>
              <SubMenuItem 
                active={isActive('/vehicles')} 
                onClick={() => toggleNestedSubMenu('vehiclesSubMenu')}
              >
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
              Truck Fleet
            </SubMenuItem>
            <SubMenuItem 
              active={isSubMenuActive('/asset-management')} 
              onClick={() => handleNavigate('/asset-management')}
            >
              Asset Management
            </SubMenuItem>
          </SubMenuList>
        </SubMenuContainer>

        {/* 4. Kierowcy */}
        <SubMenuContainer expanded={expandedMenus.drivers}>
           <MenuItem 
            active={isActive('/drivers')} 
            onClick={() => toggleSubMenu('drivers')} // Keep as dropdown for future items
          >
            Drivers
          </MenuItem>
          <SubMenuList>
             <SubMenuItem 
              active={isSubMenuActive('/drivers')} 
              onClick={() => handleNavigate('/drivers')}
            >
              Driver List
            </SubMenuItem>
            {/* Add future driver-related links here e.g.:
            <SubMenuItem active={isSubMenuActive('/drivers/documents')} onClick={() => handleNavigate('/drivers/documents')}>Documents</SubMenuItem>
            <SubMenuItem active={isSubMenuActive('/drivers/performance')} onClick={() => handleNavigate('/drivers/performance')}>Performance</SubMenuItem>
            */}
          </SubMenuList>
        </SubMenuContainer>

        {/* 5. Operacje Transportowe */}
        <SubMenuContainer expanded={expandedMenus.transportOperations}>
          <MenuItem 
            active={isActive('/route-optimization') || isActive('/fuel-analysis') || isActive('/road-tolls') || isActive('/ferry-bookings')} 
            onClick={() => toggleSubMenu('transportOperations')}
          >
            Transport Operations
          </MenuItem>
          <SubMenuList>
            <SubMenuItem 
              active={isSubMenuActive('/route-optimization')} 
              onClick={() => handleNavigate('/route-optimization')}
            >
              Route Optimization
            </SubMenuItem>
            <SubMenuItem 
              active={isSubMenuActive('/fuel-analysis')} 
              onClick={() => handleNavigate('/fuel-analysis')}
            >
              Fuel Analysis
            </SubMenuItem>
            <SubMenuItem 
              active={isSubMenuActive('/road-tolls')} 
              onClick={() => handleNavigate('/road-tolls')}
            >
              Road Tolls
            </SubMenuItem>
            <SubMenuItem 
              active={isSubMenuActive('/ferry-bookings')} 
              onClick={() => handleNavigate('/ferry-bookings')}
            >
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
            Documents & Communication
          </MenuItem>
          <SubMenuList>
            <SubMenuItem 
              active={isSubMenuActive('/document-management')} 
              onClick={() => handleNavigate('/document-management')}
            >
              Document Management
            </SubMenuItem>
            <SubMenuItem 
              active={isSubMenuActive('/communication')} 
              onClick={() => handleNavigate('/communication')}
            >
              Communication
            </SubMenuItem>
          </SubMenuList>
        </SubMenuContainer>

        {/* 7. Analityka & Automatyzacja */}
        <SubMenuContainer expanded={expandedMenus.analyticsAutomation}>
          <MenuItem 
            active={isActive('/statistics') || isActive('/ai-automation') || isActive('/integrations')} 
            onClick={() => toggleSubMenu('analyticsAutomation')}
          >
            Analytics & Automation
          </MenuItem>
          <SubMenuList>
            <SubMenuItem 
              active={isSubMenuActive('/statistics')} 
              onClick={() => handleNavigate('/statistics')}
            >
              Statistics
            </SubMenuItem>
            <SubMenuItem 
              active={isSubMenuActive('/ai-automation')} 
              onClick={() => handleNavigate('/ai-automation')}
            >
              AI & Automation
            </SubMenuItem>
            <SubMenuItem 
              active={isSubMenuActive('/integrations')} 
              onClick={() => handleNavigate('/integrations')}
            >
              Integrations
            </SubMenuItem>
          </SubMenuList>
        </SubMenuContainer>

        {/* 8. Ustawienia */}
        <SubMenuContainer expanded={expandedMenus.settings}>
          <MenuItem 
            active={isActive('/settings')} 
            onClick={() => {
              toggleSubMenu('settings');
              // Optionally navigate to a default settings page or keep it just as toggle
              // handleNavigate('/settings'); 
            }}
          >
            Settings
          </MenuItem>
          <SubMenuList>
            <SubMenuItem 
              active={isSubMenuActive('/settings/users')} 
              onClick={() => handleNavigate('/settings/users')}
            >
              Users
            </SubMenuItem>
            <SubMenuItem 
              active={isSubMenuActive('/settings/roles')} 
              onClick={() => handleNavigate('/settings/roles')}
            >
              Roles
            </SubMenuItem>
            <SubMenuItem 
              active={isSubMenuActive('/settings/view-customization')} 
              onClick={() => handleNavigate('/settings/view-customization')}
            >
              View Customization
            </SubMenuItem>
            <SubMenuItem 
              active={isSubMenuActive('/settings/security')} 
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

