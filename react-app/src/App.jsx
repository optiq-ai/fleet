import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import FraudDetection from './pages/FraudDetection';
import DriverSafety from './pages/DriverSafety';
import PredictiveMaintenance from './pages/PredictiveMaintenance';
import ViewCustomizationUser from './pages/ViewCustomizationUser';
import ViewCustomizationAdmin from './pages/ViewCustomizationAdmin';
import Monitoring from './pages/Monitoring';
import Drivers from './pages/Drivers';
import FleetManagement from './pages/FleetManagement';
import VehiclesOverview from './pages/VehiclesOverview';
import VehicleParts from './pages/VehicleParts';
import VehicleTires from './pages/VehicleTires';
import FuelAnalysis from './pages/FuelAnalysis';
import RoadTolls from './pages/RoadTolls';
import RouteOptimization from './pages/RouteOptimization';
import FerryBookings from './pages/FerryBookings';
import Geofencing from './pages/Geofencing';
import DocumentManagement from './pages/DocumentManagement';
import AssetManagement from './pages/AssetManagement';
import Communication from './pages/Communication';
import Integrations from './pages/Integrations';
import AIAutomation from './pages/AIAutomation';
import Statistics from './pages/Statistics/Statistics';
import Settings from './pages/Settings/Settings';
import SettingsUsers from './pages/Settings/Users';
import SettingsRoles from './pages/Settings/Roles';
import SettingsSecurity from './pages/Settings/Security';
import SettingsViewCustomization from './pages/Settings/ViewCustomization';
import { ViewCustomizationProvider } from './context/ViewCustomizationContext';
import { ThemeProvider } from './context/ThemeContext';
import './styles/theme.css';

/**
 * Main App component that sets up routing and context providers
 * @returns {JSX.Element} App component
 */
function App() {
  return (
    <ThemeProvider>
      <ViewCustomizationProvider>
        <Router>
          <Routes>
            <Route path="/" element={
              <Layout>
                <Dashboard />
              </Layout>
            } />
            <Route path="/monitoring" element={
              <Layout>
                <Monitoring />
              </Layout>
            } />
            <Route path="/fraud-detection" element={
              <Layout>
                <FraudDetection />
              </Layout>
            } />
            <Route path="/driver-safety" element={
              <Layout>
                <DriverSafety />
              </Layout>
            } />
            <Route path="/drivers" element={
              <Layout>
                <Drivers />
              </Layout>
            } />
            <Route path="/fleet-management" element={
              <Layout>
                <FleetManagement />
              </Layout>
            } />
            <Route path="/vehicles/overview" element={
              <Layout>
                <VehiclesOverview />
              </Layout>
            } />
            <Route path="/vehicles/parts" element={
              <Layout>
                <VehicleParts />
              </Layout>
            } />
            <Route path="/vehicles/tires" element={
              <Layout>
                <VehicleTires />
              </Layout>
            } />
            <Route path="/predictive-maintenance" element={
              <Layout>
                <PredictiveMaintenance />
              </Layout>
            } />
            <Route path="/customize-view" element={
              <Layout>
                <ViewCustomizationUser />
              </Layout>
            } />
            <Route path="/admin/view-customization" element={
              <Layout>
                <ViewCustomizationAdmin />
              </Layout>
            } />
            <Route path="/fuel-analysis" element={
              <Layout>
                <FuelAnalysis />
              </Layout>
            } />
            <Route path="/road-tolls" element={
              <Layout>
                <RoadTolls />
              </Layout>
            } />
            <Route path="/route-optimization" element={
              <Layout>
                <RouteOptimization />
              </Layout>
            } />
            <Route path="/ferry-bookings" element={
              <Layout>
                <FerryBookings />
              </Layout>
            } />
            <Route path="/geofencing" element={
              <Layout>
                <Geofencing />
              </Layout>
            } />
            <Route path="/document-management" element={
              <Layout>
                <DocumentManagement />
              </Layout>
            } />
            <Route path="/asset-management" element={
              <Layout>
                <AssetManagement />
              </Layout>
            } key="asset-management-route" />
            <Route path="/communication" element={
              <Layout>
                <Communication />
              </Layout>
            } key="communication-route" />
            <Route path="/integrations" element={
              <Layout>
                <Integrations />
              </Layout>
            } key="integrations-route" />
            <Route path="/ai-automation" element={
              <Layout>
                <AIAutomation />
              </Layout>
            } key="ai-automation-route" />
            {/* Trasa dla sekcji Statistics */}
            <Route path="/statistics" element={
              <Layout>
                <Statistics />
              </Layout>
            } key="statistics-route" />
            
            {/* Trasy dla sekcji Settings i jej podsekcji */}
            <Route path="/settings" element={
              <Layout>
                <Settings />
              </Layout>
            } key="settings-route" />
            <Route path="/settings/users" element={
              <Layout>
                <SettingsUsers />
              </Layout>
            } key="settings-users-route" />
            <Route path="/settings/roles" element={
              <Layout>
                <SettingsRoles />
              </Layout>
            } key="settings-roles-route" />
            <Route path="/settings/view-customization" element={
              <Layout>
                <SettingsViewCustomization />
              </Layout>
            } key="settings-view-customization-route" />
            <Route path="/settings/security" element={
              <Layout>
                <SettingsSecurity />
              </Layout>
            } key="settings-security-route" />
            
            {/* Fallback route for any unmatched paths */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </ViewCustomizationProvider>
    </ThemeProvider>
  );
}

export default App;
