import React, { useState } from 'react';
import PredictiveAnalytics from '../../components/ai-automation/PredictiveAnalytics';
import AutomatedWorkflows from '../../components/ai-automation/AutomatedWorkflows';
import AnomalyDetection from '../../components/ai-automation/AnomalyDetection';
import NaturalLanguageInterface from '../../components/ai-automation/NaturalLanguageInterface';
import SmartAlerts from '../../components/ai-automation/SmartAlerts';
import ScenarioSimulation from '../../components/ai-automation/ScenarioSimulation';
import ContinuousOptimization from '../../components/ai-automation/ContinuousOptimization';
import './AIAutomation.css';

/**
 * AIAutomation page component that integrates all AI & Automation features
 * 
 * This page provides access to:
 * - Predictive Analytics: Advanced AI models for predicting various fleet metrics
 * - Automated Workflows: Configurable workflows that automate repetitive tasks
 * - Anomaly Detection: AI-powered detection of unusual patterns and potential issues
 * - Natural Language Interface: Conversational interface for fleet management
 * - Smart Alerts: Intelligent notification system that prioritizes alerts
 * - Scenario Simulation: Simulation of different operational scenarios
 * - Continuous Optimization: AI-driven process optimization
 * 
 * @returns {JSX.Element} AIAutomation page component
 */
const AIAutomation = () => {
  const [activeComponent, setActiveComponent] = useState('overview');

  const handleComponentChange = (component) => {
    setActiveComponent(component);
  };

  const renderOverview = () => {
    return (
      <div className="ai-overview">
        <div className="ai-overview-header">
          <h2>AI & Automation Overview</h2>
          <p>Leverage artificial intelligence and automation to optimize fleet operations</p>
        </div>

        <div className="ai-feature-cards">
          <div className="ai-feature-card" onClick={() => handleComponentChange('predictiveAnalytics')}>
            <div className="ai-feature-icon predictive-icon"></div>
            <h3>Predictive Analytics</h3>
            <p>Advanced AI models to predict and prevent issues before they occur</p>
          </div>

          <div className="ai-feature-card" onClick={() => handleComponentChange('automatedWorkflows')}>
            <div className="ai-feature-icon workflow-icon"></div>
            <h3>Automated Workflows</h3>
            <p>Configurable workflows that automate repetitive tasks and optimize operations</p>
          </div>

          <div className="ai-feature-card" onClick={() => handleComponentChange('anomalyDetection')}>
            <div className="ai-feature-icon anomaly-icon"></div>
            <h3>Anomaly Detection</h3>
            <p>AI-powered detection of unusual patterns and potential issues</p>
          </div>

          <div className="ai-feature-card" onClick={() => handleComponentChange('naturalLanguageInterface')}>
            <div className="ai-feature-icon language-icon"></div>
            <h3>Natural Language Interface</h3>
            <p>Interact with the fleet management system using natural language</p>
          </div>

          <div className="ai-feature-card" onClick={() => handleComponentChange('smartAlerts')}>
            <div className="ai-feature-icon alerts-icon"></div>
            <h3>Smart Alerts</h3>
            <p>Intelligent notification system that prioritizes and manages alerts</p>
          </div>

          <div className="ai-feature-card" onClick={() => handleComponentChange('scenarioSimulation')}>
            <div className="ai-feature-icon simulation-icon"></div>
            <h3>Scenario Simulation</h3>
            <p>Simulate different operational scenarios to optimize decision making</p>
          </div>

          <div className="ai-feature-card" onClick={() => handleComponentChange('continuousOptimization')}>
            <div className="ai-feature-icon optimization-icon"></div>
            <h3>Continuous Optimization</h3>
            <p>AI-driven process optimization that continuously improves fleet operations</p>
          </div>
        </div>

        <div className="ai-architecture-section">
          <h3>Architecture</h3>
          <ul>
            <li>Modular construction enabling feature toggling</li>
            <li>Integration with existing components</li>
            <li>API-first design for easy external system integration</li>
            <li>Scalable architecture supporting fleets of any size</li>
          </ul>
        </div>

        <div className="ai-technologies-section">
          <h3>AI Technologies</h3>
          <ul>
            <li>Machine learning models for prediction and optimization</li>
            <li>Natural language processing for conversational interfaces</li>
            <li>Time series analysis for anomaly detection and trends</li>
            <li>Computer vision for image analysis from vehicle cameras</li>
          </ul>
        </div>

        <div className="ai-security-section">
          <h3>Security & Privacy</h3>
          <ul>
            <li>Advanced encryption for sensitive data</li>
            <li>Role-based access control</li>
            <li>Data anonymization for AI model training</li>
            <li>GDPR and regulatory compliance</li>
          </ul>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeComponent) {
      case 'predictiveAnalytics':
        return <PredictiveAnalytics />;
      case 'automatedWorkflows':
        return <AutomatedWorkflows />;
      case 'anomalyDetection':
        return <AnomalyDetection />;
      case 'naturalLanguageInterface':
        return <NaturalLanguageInterface />;
      case 'smartAlerts':
        return <SmartAlerts />;
      case 'scenarioSimulation':
        return <ScenarioSimulation />;
      case 'continuousOptimization':
        return <ContinuousOptimization />;
      case 'overview':
      default:
        return renderOverview();
    }
  };

  return (
    <div className="ai-automation-container">
      <div className="ai-sidebar">
        <div className="ai-sidebar-header">
          <h2>AI & Automation</h2>
        </div>
        <nav className="ai-navigation">
          <button
            className={activeComponent === 'overview' ? 'active' : ''}
            onClick={() => handleComponentChange('overview')}
          >
            Overview
          </button>
          <button
            className={activeComponent === 'predictiveAnalytics' ? 'active' : ''}
            onClick={() => handleComponentChange('predictiveAnalytics')}
          >
            Predictive Analytics
          </button>
          <button
            className={activeComponent === 'automatedWorkflows' ? 'active' : ''}
            onClick={() => handleComponentChange('automatedWorkflows')}
          >
            Automated Workflows
          </button>
          <button
            className={activeComponent === 'anomalyDetection' ? 'active' : ''}
            onClick={() => handleComponentChange('anomalyDetection')}
          >
            Anomaly Detection
          </button>
          <button
            className={activeComponent === 'naturalLanguageInterface' ? 'active' : ''}
            onClick={() => handleComponentChange('naturalLanguageInterface')}
          >
            Natural Language Interface
          </button>
          <button
            className={activeComponent === 'smartAlerts' ? 'active' : ''}
            onClick={() => handleComponentChange('smartAlerts')}
          >
            Smart Alerts
          </button>
          <button
            className={activeComponent === 'scenarioSimulation' ? 'active' : ''}
            onClick={() => handleComponentChange('scenarioSimulation')}
          >
            Scenario Simulation
          </button>
          <button
            className={activeComponent === 'continuousOptimization' ? 'active' : ''}
            onClick={() => handleComponentChange('continuousOptimization')}
          >
            Continuous Optimization
          </button>
        </nav>
      </div>
      <div className="ai-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default AIAutomation;
