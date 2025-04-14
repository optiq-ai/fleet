import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import FraudDetection from './pages/FraudDetection';
import DriverSafety from './pages/DriverSafety';
import PredictiveMaintenance from './pages/PredictiveMaintenance';
import ViewCustomizationUser from './pages/ViewCustomizationUser';
import ViewCustomizationAdmin from './pages/ViewCustomizationAdmin';
import Monitoring from './pages/Monitoring';
import { ViewCustomizationProvider } from './context/ViewCustomizationContext';

/**
 * Main App component that sets up routing and context providers
 * @returns {JSX.Element} App component
 */
function App() {
  return (
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
        </Routes>
      </Router>
    </ViewCustomizationProvider>
  );
}

export default App;
