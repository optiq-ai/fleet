import React, { createContext, useContext, useState, ReactNode } from 'react';
import { View } from '../types';

interface ViewCustomizationContextType {
  views: View[];
  currentView: string;
  setCurrentView: (viewId: string) => void;
  userViews: View[];
  defaultViews: View[];
  saveView: (view: View) => Promise<void>;
  deleteView: (viewId: string) => Promise<void>;
}

const ViewCustomizationContext = createContext<ViewCustomizationContextType | undefined>(undefined);

interface ViewCustomizationProviderProps {
  children: ReactNode;
}

export const ViewCustomizationProvider: React.FC<ViewCustomizationProviderProps> = ({ children }) => {
  // Sample views data
  const [views, setViews] = useState<View[]>([
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
  
  const [currentView, setCurrentView] = useState<string>(() => {
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
  
  // Save a new view or update existing one
  const saveView = async (view: View): Promise<void> => {
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
  
  // Delete a view
  const deleteView = async (viewId: string): Promise<void> => {
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

export const useViewCustomization = (): ViewCustomizationContextType => {
  const context = useContext(ViewCustomizationContext);
  if (context === undefined) {
    throw new Error('useViewCustomization must be used within a ViewCustomizationProvider');
  }
  return context;
};
