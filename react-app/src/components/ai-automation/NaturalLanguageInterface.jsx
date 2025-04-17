import React, { useState, useEffect } from 'react';
import { getNaturalLanguageInterface, submitNaturalLanguageQuery } from '../../services/aiAutomationService';
import './NaturalLanguageInterface.css';

/**
 * NaturalLanguageInterface component provides a conversational interface for fleet management
 * 
 * This component allows:
 * - Asking questions about fleet status in natural language
 * - Issuing commands to the system without knowing advanced functions
 * - Generating reports and analyses based on text queries
 * - Providing assistance for dispatchers and drivers through various channels
 * 
 * @returns {JSX.Element} NaturalLanguageInterface component
 */
const NaturalLanguageInterface = () => {
  const [activeTab, setActiveTab] = useState('queryInterface');
  const [data, setData] = useState({
    recentQueries: [],
    suggestedQueries: [],
    commandHistory: []
  });
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const recentQueries = await getNaturalLanguageInterface('recentQueries');
        const suggestedQueries = await getNaturalLanguageInterface('suggestedQueries');
        const commandHistory = await getNaturalLanguageInterface('commandHistory');
        
        setData({
          recentQueries,
          suggestedQueries,
          commandHistory
        });
        setError(null);
      } catch (err) {
        setError('Failed to load natural language interface data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleQuerySubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      setIsSubmitting(true);
      await submitNaturalLanguageQuery(query);
      
      // Add the new query to the recent queries list
      setData(prevData => ({
        ...prevData,
        recentQueries: [
          {
            id: Date.now(),
            query: query,
            timestamp: new Date().toISOString(),
            user: 'Current User',
            status: 'processing'
          },
          ...prevData.recentQueries
        ]
      }));
      
      setQuery('');
    } catch (err) {
      setError('Failed to submit query');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuggestedQueryClick = (suggestedQuery) => {
    setQuery(suggestedQuery);
  };

  const renderQueryInterface = () => {
    return (
      <div className="query-interface">
        <form onSubmit={handleQuerySubmit} className="query-form">
          <input
            type="text"
            value={query}
            onChange={handleQueryChange}
            placeholder="Ask a question or issue a command..."
            className="query-input"
            disabled={isSubmitting}
          />
          <button 
            type="submit" 
            className="query-submit-button"
            disabled={isSubmitting || !query.trim()}
          >
            {isSubmitting ? 'Processing...' : 'Submit'}
          </button>
        </form>

        <div className="suggested-queries">
          <h3>Suggested Queries</h3>
          <div className="suggested-queries-list">
            {data.suggestedQueries.map((suggestedQuery, index) => (
              <button
                key={index}
                className="suggested-query-button"
                onClick={() => handleSuggestedQueryClick(suggestedQuery)}
              >
                {suggestedQuery}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderRecentQueries = () => {
    return (
      <div className="recent-queries">
        <h3>Recent Queries</h3>
        <div className="query-history-list">
          {data.recentQueries.map((item) => (
            <div key={item.id} className="query-history-item">
              <div className="query-history-header">
                <span className="query-text">{item.query}</span>
                <span className={`query-status ${item.status}`}>{item.status}</span>
              </div>
              <div className="query-history-meta">
                <span className="query-timestamp">{new Date(item.timestamp).toLocaleString()}</span>
                <span className="query-user">{item.user}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderCommandHistory = () => {
    return (
      <div className="command-history">
        <h3>Command History</h3>
        <div className="query-history-list">
          {data.commandHistory.map((item) => (
            <div key={item.id} className="query-history-item">
              <div className="query-history-header">
                <span className="query-text">{item.command}</span>
                <span className={`query-status ${item.status}`}>{item.status}</span>
              </div>
              <div className="query-history-meta">
                <span className="query-timestamp">{new Date(item.timestamp).toLocaleString()}</span>
                <span className="query-user">{item.user}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (isLoading) {
      return <div className="loading-indicator">Loading natural language interface...</div>;
    }

    if (error) {
      return <div className="error-message">{error}</div>;
    }

    return (
      <>
        {activeTab === 'queryInterface' && renderQueryInterface()}
        {renderRecentQueries()}
        {activeTab === 'commandHistory' && renderCommandHistory()}
      </>
    );
  };

  return (
    <div className="natural-language-interface-container">
      <div className="nli-header">
        <h2>Natural Language Interface</h2>
        <p>Interact with the fleet management system using natural language</p>
      </div>

      <div className="nli-tabs">
        <button
          className={activeTab === 'queryInterface' ? 'active' : ''}
          onClick={() => handleTabChange('queryInterface')}
        >
          <span className="tab-icon query-icon"></span>
          Query Interface
        </button>
        <button
          className={activeTab === 'commandHistory' ? 'active' : ''}
          onClick={() => handleTabChange('commandHistory')}
        >
          <span className="tab-icon command-icon"></span>
          Command History
        </button>
      </div>

      <div className="nli-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default NaturalLanguageInterface;
