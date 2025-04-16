import React, { useState } from 'react';
import styled from 'styled-components';
import AssetDashboard from '../components/asset-management/AssetDashboard';
import AssetInventory from '../components/asset-management/AssetInventory';
import AssetMaintenance from '../components/asset-management/AssetMaintenance';
import AssetUtilization from '../components/asset-management/AssetUtilization';
import AssetAcquisition from '../components/asset-management/AssetAcquisition';
import AssetDisposal from '../components/asset-management/AssetDisposal';
import AssetReporting from '../components/asset-management/AssetReporting';
import '../components/asset-management/IconStyles.css';

const AssetManagement = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <AssetManagementContainer>
      <AssetManagementHeader>
        <h1>Zarządzanie Aktywami</h1>
      </AssetManagementHeader>

      <TabsContainer>
        <TabButton 
          active={activeTab === 'dashboard'} 
          onClick={() => handleTabChange('dashboard')}
        >
          <span className="icon icon-dashboard"></span> Dashboard
        </TabButton>
        <TabButton 
          active={activeTab === 'inventory'} 
          onClick={() => handleTabChange('inventory')}
        >
          <span className="icon icon-list"></span> Inwentarz
        </TabButton>
        <TabButton 
          active={activeTab === 'maintenance'} 
          onClick={() => handleTabChange('maintenance')}
        >
          <span className="icon icon-wrench"></span> Konserwacja
        </TabButton>
        <TabButton 
          active={activeTab === 'utilization'} 
          onClick={() => handleTabChange('utilization')}
        >
          <span className="icon icon-chart"></span> Wykorzystanie
        </TabButton>
        <TabButton 
          active={activeTab === 'acquisition'} 
          onClick={() => handleTabChange('acquisition')}
        >
          <span className="icon icon-money"></span> Zakupy
        </TabButton>
        <TabButton 
          active={activeTab === 'disposal'} 
          onClick={() => handleTabChange('disposal')}
        >
          <span className="icon icon-trash"></span> Wycofanie
        </TabButton>
        <TabButton 
          active={activeTab === 'reporting'} 
          onClick={() => handleTabChange('reporting')}
        >
          <span className="icon icon-file"></span> Raporty
        </TabButton>
      </TabsContainer>

      <ContentContainer>
        {activeTab === 'dashboard' && <AssetDashboard />}
        {activeTab === 'inventory' && <AssetInventory />}
        {activeTab === 'maintenance' && <AssetMaintenance />}
        {activeTab === 'utilization' && <AssetUtilization />}
        {activeTab === 'acquisition' && <AssetAcquisition />}
        {activeTab === 'disposal' && <AssetDisposal />}
        {activeTab === 'reporting' && <AssetReporting />}
      </ContentContainer>
    </AssetManagementContainer>
  );
};

// Styled Components
const AssetManagementContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const AssetManagementHeader = styled.div`
  padding: 20px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #eee;
  
  h1 {
    margin: 0;
    font-size: 24px;
    color: #333;
  }
`;

const TabsContainer = styled.div`
  display: flex;
  padding: 0 20px;
  background-color: white;
  border-bottom: 1px solid #eee;
  overflow-x: auto;
  
  &::-webkit-scrollbar {
    height: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: #ddd;
    border-radius: 2px;
  }
`;

const TabButton = styled.button`
  padding: 15px 20px;
  background: none;
  border: none;
  border-bottom: 3px solid ${props => props.active ? '#2196f3' : 'transparent'};
  color: ${props => props.active ? '#2196f3' : '#555'};
  font-weight: ${props => props.active ? '600' : '400'};
  font-size: 15px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  
  &:hover {
    color: #2196f3;
    background-color: #f5f5f5;
  }
  
  .icon {
    font-size: 18px;
  }
`;

const ContentContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  background-color: #f5f5f5;
`;

export default AssetManagement;
