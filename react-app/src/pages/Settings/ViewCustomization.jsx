import React, { useState, useEffect } from 'react';
import './ViewCustomization.css';

/**
 * ViewCustomization settings component for customizing the application appearance and layout
 * @returns {JSX.Element} ViewCustomization settings component
 */
const ViewCustomization = () => {
  const [layouts, setLayouts] = useState([]);
  const [themes, setThemes] = useState([]);
  const [selectedLayout, setSelectedLayout] = useState('default');
  const [selectedTheme, setSelectedTheme] = useState('light');
  const [dashboardElements, setDashboardElements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(null);

  // Simulate fetching view customization data
  useEffect(() => {
    // Mock data - in a real app, this would be an API call
    const mockLayouts = [
      { id: 'default', name: 'Default', description: 'Standard layout with sidebar navigation' },
      { id: 'compact', name: 'Compact', description: 'Condensed layout for smaller screens' },
      { id: 'expanded', name: 'Expanded', description: 'Expanded layout with more details visible' },
      { id: 'minimal', name: 'Minimal', description: 'Minimalist layout with essential elements only' }
    ];
    
    const mockThemes = [
      { id: 'light', name: 'Light', description: 'Default light theme' },
      { id: 'dark', name: 'Dark', description: 'Dark theme for low-light environments' },
      { id: 'blue', name: 'Blue', description: 'Blue-focused theme' },
      { id: 'green', name: 'Green', description: 'Green-focused theme' }
    ];
    
    const mockDashboardElements = [
      { id: 'kpi_cards', name: 'KPI Cards', visible: true, category: 'Dashboard' },
      { id: 'fleet_status', name: 'Fleet Status', visible: true, category: 'Dashboard' },
      { id: 'recent_alerts', name: 'Recent Alerts', visible: true, category: 'Dashboard' },
      { id: 'fuel_consumption', name: 'Fuel Consumption Chart', visible: true, category: 'Dashboard' },
      { id: 'maintenance_schedule', name: 'Maintenance Schedule', visible: true, category: 'Dashboard' },
      { id: 'driver_performance', name: 'Driver Performance', visible: false, category: 'Dashboard' },
      { id: 'vehicle_location', name: 'Vehicle Location Map', visible: true, category: 'Maps' },
      { id: 'route_history', name: 'Route History', visible: false, category: 'Maps' },
      { id: 'cost_analysis', name: 'Cost Analysis', visible: true, category: 'Reports' },
      { id: 'efficiency_metrics', name: 'Efficiency Metrics', visible: false, category: 'Reports' }
    ];
    
    setTimeout(() => {
      setLayouts(mockLayouts);
      setThemes(mockThemes);
      setDashboardElements(mockDashboardElements);
      setLoading(false);
    }, 500);
  }, []);

  const handleLayoutChange = (e) => {
    setSelectedLayout(e.target.value);
  };

  const handleThemeChange = (e) => {
    setSelectedTheme(e.target.value);
  };

  const handleElementVisibilityChange = (elementId) => {
    setDashboardElements(prevElements => 
      prevElements.map(element => 
        element.id === elementId 
          ? { ...element, visible: !element.visible } 
          : element
      )
    );
  };

  const handleSaveChanges = () => {
    // In a real app, this would send the changes to an API
    console.log('Saving changes:', {
      layout: selectedLayout,
      theme: selectedTheme,
      dashboardElements: dashboardElements
    });
    
    // Show success message
    setSuccess('View customization settings saved successfully!');
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setSuccess(null);
    }, 3000);
  };

  const handleResetDefaults = () => {
    setSelectedLayout('default');
    setSelectedTheme('light');
    setDashboardElements(prevElements => 
      prevElements.map(element => ({
        ...element,
        visible: ['kpi_cards', 'fleet_status', 'recent_alerts', 'fuel_consumption', 'maintenance_schedule', 'vehicle_location', 'cost_analysis'].includes(element.id)
      }))
    );
  };

  // Group dashboard elements by category
  const elementsByCategory = dashboardElements.reduce((acc, element) => {
    if (!acc[element.category]) {
      acc[element.category] = [];
    }
    acc[element.category].push(element);
    return acc;
  }, {});

  return (
    <div className="view-customization-container">
      <h1>View Customization</h1>
      
      {loading ? (
        <p>Loading view customization settings...</p>
      ) : (
        <>
          {success && (
            <div className="success-message">
              {success}
            </div>
          )}
          
          <div className="settings-grid">
            <div className="settings-card">
              <h2>Layout Settings</h2>
              <div className="form-group">
                <label htmlFor="layout">Select Layout:</label>
                <select
                  id="layout"
                  value={selectedLayout}
                  onChange={handleLayoutChange}
                  className="settings-select"
                >
                  {layouts.map(layout => (
                    <option key={layout.id} value={layout.id}>
                      {layout.name}
                    </option>
                  ))}
                </select>
                <p className="description">
                  {layouts.find(layout => layout.id === selectedLayout)?.description}
                </p>
              </div>
            </div>
            
            <div className="settings-card">
              <h2>Theme Settings</h2>
              <div className="form-group">
                <label htmlFor="theme">Select Theme:</label>
                <select
                  id="theme"
                  value={selectedTheme}
                  onChange={handleThemeChange}
                  className="settings-select"
                >
                  {themes.map(theme => (
                    <option key={theme.id} value={theme.id}>
                      {theme.name}
                    </option>
                  ))}
                </select>
                <p className="description">
                  {themes.find(theme => theme.id === selectedTheme)?.description}
                </p>
              </div>
              
              <div className="theme-preview">
                <div className={`theme-sample ${selectedTheme}`}>
                  <div className="theme-header">Header</div>
                  <div className="theme-content">
                    <div className="theme-sidebar">Sidebar</div>
                    <div className="theme-main">Main Content</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="settings-card full-width">
            <h2>Dashboard Elements</h2>
            <p className="description">
              Customize which elements are visible on your dashboard.
            </p>
            
            {Object.entries(elementsByCategory).map(([category, elements]) => (
              <div key={category} className="element-category">
                <h3>{category}</h3>
                <div className="element-list">
                  {elements.map(element => (
                    <div key={element.id} className="element-item">
                      <label className="toggle-label">
                        <input
                          type="checkbox"
                          checked={element.visible}
                          onChange={() => handleElementVisibilityChange(element.id)}
                          className="toggle-checkbox"
                        />
                        <span className="toggle-switch"></span>
                        <span className="element-name">{element.name}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="settings-actions">
            <button className="btn-save" onClick={handleSaveChanges}>
              Save Changes
            </button>
            <button className="btn-reset" onClick={handleResetDefaults}>
              Reset to Defaults
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ViewCustomization;
