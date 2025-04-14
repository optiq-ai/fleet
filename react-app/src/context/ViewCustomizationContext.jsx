import React, { createContext, useContext, useState } from 'react';

/**
 * @typedef {Object} ViewSection
 * @property {string} id - Section ID
 * @property {string} name - Section name
 * @property {string} type - Section type
 * @property {boolean} visible - Whether section is visible
 * @property {number} order - Section order
 */

/**
 * @typedef {Object} View
 * @property {string} id - View ID
 * @property {string} name - View name
 * @property {string} description - View description
 * @property {boolean} isDefault - Whether view is default
 * @property {ViewSection[]} sections - View sections
 * @property {string[]} userGroups - User groups with access to this view
 */

/**
 * @typedef {Object} ViewCustomizationContextType
 * @property {View[]} views - All available views
 * @property {string} currentView - Current view ID
 * @property {function} setCurrentView - Function to set current view
 * @property {View[]} userViews - User-created views
 * @property {View[]} defaultViews - Default views
 * @property {function} saveView - Function to save a view
 * @property {function} deleteView - Function to delete a view
 */

// Create context with default value
export const ViewCustomizationContext = createContext(undefined);

/**
 * View customization provider component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} ViewCustomizationProvider component
 */
export const ViewCustomizationProvider = ({ children }) => {
  // Sample views data
  const [views, setViews] = useState([
    {
      id: "default-admin",
      name: "Widok administratora",
      description: "Pełny widok ze wszystkimi sekcjami",
      isDefault: true,
      sections: [
        { id: "kpi", name: "KPI", type: "kpi", visible: true, order: 1 },
        { id: "fraud", name: "Oszustwa", type: "fraud", visible: true, order: 2 },
        { id: "safety", name: "Bezpieczeństwo", type: "safety", visible: true, order: 3 },
        { id: "maintenance", name: "Konserwacja", type: "maintenance", visible: true, order: 4 },
        { id: "map", name: "Mapa", type: "map", visible: true, order: 5 }
      ],
      userGroups: ["admin"]
    },
    {
      id: "default-manager",
      name: "Widok menedżera",
      description: "Widok z naciskiem na zarządzanie flotą",
      isDefault: false,
      sections: [
        { id: "kpi", name: "KPI", type: "kpi", visible: true, order: 1 },
        { id: "vehicles", name: "Pojazdy", type: "vehicles", visible: true, order: 2 },
        { id: "maintenance", name: "Konserwacja", type: "maintenance", visible: true, order: 3 },
        { id: "map", name: "Mapa", type: "map", visible: true, order: 4 }
      ],
      userGroups: ["manager"]
    },
    {
      id: "default-driver",
      name: "Widok kierowcy",
      description: "Uproszczony widok dla kierowców",
      isDefault: false,
      sections: [
        { id: "safety_score", name: "Wynik bezpieczeństwa", type: "safety_score", visible: true, order: 1 },
        { id: "vehicle", name: "Pojazd", type: "vehicle", visible: true, order: 2 },
        { id: "map", name: "Trasa", type: "map", visible: true, order: 3 }
      ],
      userGroups: ["driver"]
    },
    {
      id: "custom-1",
      name: "Mój widok 1",
      description: "Niestandardowy widok użytkownika",
      isDefault: false,
      sections: [
        { id: "kpi", name: "KPI", type: "kpi", visible: true, order: 1 },
        { id: "fraud", name: "Oszustwa", type: "fraud", visible: true, order: 2 },
        { id: "map", name: "Mapa", type: "map", visible: true, order: 3 }
      ],
      userGroups: ["admin", "manager"]
    }
  ]);
  
  const [currentView, setCurrentView] = useState(() => {
    const savedView = localStorage.getItem('currentView');
    return savedView || "default-admin";
  });
  
  // Save current view to localStorage
  React.useEffect(() => {
    localStorage.setItem('currentView', currentView);
  }, [currentView]);
  
  // Filter views by user type (in a real app, this would check user permissions)
  const userViews = views.filter(view => view.id.startsWith('custom'));
  const defaultViews = views.filter(view => view.id.startsWith('default'));
  
  /**
   * Save a new view or update existing one
   * @param {View} view - View to save
   * @returns {Promise<void>} Promise that resolves when view is saved
   */
  const saveView = async (view) => {
    setViews(prevViews => {
      const existingIndex = prevViews.findIndex(v => v.id === view.id);
      if (existingIndex >= 0) {
        // Update existing view
        const updatedViews = [...prevViews];
        updatedViews[existingIndex] = view;
        return updatedViews;
      } else {
        // Add new view
        return [...prevViews, view];
      }
    });
    
    // In a real app, this would make an API call to save the view
    return Promise.resolve();
  };
  
  /**
   * Delete a view
   * @param {string} viewId - ID of view to delete
   * @returns {Promise<void>} Promise that resolves when view is deleted
   */
  const deleteView = async (viewId) => {
    setViews(prevViews => prevViews.filter(view => view.id !== viewId));
    
    // If the deleted view was the current view, switch to default
    if (currentView === viewId) {
      setCurrentView("default-admin");
    }
    
    // In a real app, this would make an API call to delete the view
    return Promise.resolve();
  };
  
  return (
    <ViewCustomizationContext.Provider value={{
      views,
      currentView,
      setCurrentView,
      userViews,
      defaultViews,
      saveView,
      deleteView
    }}>
      {children}
    </ViewCustomizationContext.Provider>
  );
};

/**
 * Custom hook to use view customization context
 * @returns {ViewCustomizationContextType} View customization context
 */
export const useViewCustomization = () => {
  const context = useContext(ViewCustomizationContext);
  if (context === undefined) {
    throw new Error('useViewCustomization must be used within a ViewCustomizationProvider');
  }
  return context;
};

// Also export as default for backward compatibility
export default ViewCustomizationContext;
