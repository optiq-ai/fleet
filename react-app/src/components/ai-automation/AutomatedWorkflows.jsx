import React, { useState, useEffect } from 'react';
import { getAutomatedWorkflows } from '../../services/aiAutomationService';
import './AutomatedWorkflows.css';

/**
 * AutomatedWorkflows component displays configurable workflows that automate various fleet operations
 * 
 * This component shows automation for:
 * - Route planning considering multiple variables (delivery time, fuel consumption, driver hours)
 * - Driver task assignment based on location, qualifications and availability
 * - Report generation and distribution to stakeholders
 * - Document processes (generation, approval, archiving)
 * 
 * @returns {JSX.Element} AutomatedWorkflows component
 */
const AutomatedWorkflows = () => {
  const [activeTab, setActiveTab] = useState('routePlanning');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await getAutomatedWorkflows(activeTab);
        setData(result);
        setError(null);
      } catch (err) {
        setError('Failed to load automated workflows data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const renderWorkflowCards = () => {
    return (
      <div className="workflow-cards">
        {data.map((workflow) => (
          <div key={workflow.id} className="workflow-card">
            <div className="workflow-card-header">
              <h3>{workflow.name}</h3>
              <div className={`workflow-status ${workflow.active ? 'active' : 'inactive'}`}>
                {workflow.active ? 'Active' : 'Inactive'}
              </div>
            </div>
            <div className="workflow-card-body">
              <p>{workflow.description}</p>
              {workflow.createdAt && (
                <div className="workflow-meta">
                  <span>Created: {new Date(workflow.createdAt).toLocaleDateString()}</span>
                  {workflow.lastRun && (
                    <span>Last run: {new Date(workflow.lastRun).toLocaleDateString()}</span>
                  )}
                </div>
              )}
              {workflow.schedule && (
                <div className="workflow-schedule">
                  <span className="schedule-icon"></span>
                  <span>{workflow.schedule}</span>
                </div>
              )}
              {workflow.recipients && (
                <div className="workflow-recipients">
                  <span className="recipients-icon"></span>
                  <span>{workflow.recipients.join(', ')}</span>
                </div>
              )}
              {workflow.triggers && (
                <div className="workflow-triggers">
                  <span className="triggers-icon"></span>
                  <span>{workflow.triggers}</span>
                </div>
              )}
            </div>
            <div className="workflow-card-actions">
              <button className="edit-button">Edit</button>
              <button className="run-button">Run Now</button>
              <button className={`toggle-button ${workflow.active ? 'active' : 'inactive'}`}>
                {workflow.active ? 'Deactivate' : 'Activate'}
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderContent = () => {
    if (isLoading) {
      return <div className="loading-indicator">Loading automated workflows...</div>;
    }

    if (error) {
      return <div className="error-message">{error}</div>;
    }

    return renderWorkflowCards();
  };

  return (
    <div className="automated-workflows-container">
      <div className="workflows-header">
        <h2>Automated Workflows</h2>
        <p>Configurable workflows that automate repetitive tasks and optimize operations</p>
        <button className="create-workflow-button">Create New Workflow</button>
      </div>

      <div className="workflows-tabs">
        <button
          className={activeTab === 'routePlanning' ? 'active' : ''}
          onClick={() => handleTabChange('routePlanning')}
        >
          <span className="tab-icon route-icon"></span>
          Route Planning
        </button>
        <button
          className={activeTab === 'driverAssignment' ? 'active' : ''}
          onClick={() => handleTabChange('driverAssignment')}
        >
          <span className="tab-icon driver-icon"></span>
          Driver Assignment
        </button>
        <button
          className={activeTab === 'reportGeneration' ? 'active' : ''}
          onClick={() => handleTabChange('reportGeneration')}
        >
          <span className="tab-icon report-icon"></span>
          Report Generation
        </button>
        <button
          className={activeTab === 'documentProcessing' ? 'active' : ''}
          onClick={() => handleTabChange('documentProcessing')}
        >
          <span className="tab-icon document-icon"></span>
          Document Processing
        </button>
      </div>

      <div className="workflows-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default AutomatedWorkflows;
