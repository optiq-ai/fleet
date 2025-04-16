import React, { useState } from 'react';
import GeofencingDashboard from '../components/geofencing/GeofencingDashboard';
import GeofenceManager from '../components/geofencing/GeofenceManager';
import AlertConfiguration from '../components/geofencing/AlertConfiguration';
import GeofencingReports from '../components/geofencing/GeofencingReports';
import RouteIntegration from '../components/geofencing/RouteIntegration';
import Card from '../components/common/Card';

/**
 * Geofencing Component
 * 
 * Main component for geofencing functionality that allows creating virtual geographic boundaries,
 * monitoring vehicle crossings, generating alerts, and analyzing data.
 */
const Geofencing = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <GeofencingDashboard />;
      case 'geofences':
        return <GeofenceManager />;
      case 'alerts':
        return <AlertConfiguration />;
      case 'reports':
        return <GeofencingReports />;
      case 'routes':
        return <RouteIntegration />;
      default:
        return <GeofencingDashboard />;
    }
  };

  return (
    <div className="geofencing-container">
      <h1>Geofencing</h1>
      <p className="description">
        Create virtual boundaries, monitor vehicle crossings, and analyze geofencing data.
      </p>
      
      <Card>
        <div className="tabs">
          <button 
            className={`tab-button ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button 
            className={`tab-button ${activeTab === 'geofences' ? 'active' : ''}`}
            onClick={() => setActiveTab('geofences')}
          >
            Manage Geofences
          </button>
          <button 
            className={`tab-button ${activeTab === 'alerts' ? 'active' : ''}`}
            onClick={() => setActiveTab('alerts')}
          >
            Configure Alerts
          </button>
          <button 
            className={`tab-button ${activeTab === 'reports' ? 'active' : ''}`}
            onClick={() => setActiveTab('reports')}
          >
            Reports
          </button>
          <button 
            className={`tab-button ${activeTab === 'routes' ? 'active' : ''}`}
            onClick={() => setActiveTab('routes')}
          >
            Route Integration
          </button>
        </div>
      </Card>
      
      <div className="tab-content">
        {renderActiveTab()}
      </div>
    </div>
  );
};

export default Geofencing;
