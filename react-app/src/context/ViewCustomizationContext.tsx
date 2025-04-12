import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define types for our context
interface ViewConfig {
  id: string;
  name: string;
  createdBy: string;
  isDefault: boolean;
  forRole: string;
  layout: SectionConfig[];
}

interface SectionConfig {
  section: string;
  visible: boolean;
  position?: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
  components: string[];
}

interface RoleConfig {
  role: string;
  availableSections: {
    section: string;
    status: 'required' | 'optional' | 'unavailable';
    components: string[];
  }[];
}

interface ViewCustomizationContextType {
  // User views
  userViews: ViewConfig[];
  currentView: string;
  setCurrentView: (viewId: string) => void;
  saveView: (view: ViewConfig) => void;
  updateView: (viewId: string, updates: Partial<ViewConfig>) => void;
  deleteView: (viewId: string) => void;
  
  // Admin configuration
  roleConfigs: RoleConfig[];
  templateViews: ViewConfig[];
  saveRoleConfig: (config: RoleConfig) => void;
  saveTemplateView: (template: ViewConfig) => void;
  deleteTemplateView: (templateId: string) => void;
  
  // Edit mode
  isEditMode: boolean;
  setEditMode: (mode: boolean) => void;
}

// Create the context
const ViewCustomizationContext = createContext<ViewCustomizationContextType | undefined>(undefined);

// Provider component
interface ViewCustomizationProviderProps {
  children: ReactNode;
}

export const ViewCustomizationProvider: React.FC<ViewCustomizationProviderProps> = ({ children }) => {
  // State for user views
  const [userViews, setUserViews] = useState<ViewConfig[]>([
    {
      id: 'default-view',
      name: 'Widok standardowy',
      createdBy: 'system',
      isDefault: true,
      forRole: 'dispatcher',
      layout: [
        {
          section: 'kpi',
          visible: true,
          position: { x: 0, y: 0, w: 12, h: 1 },
          components: ['activeVehicles', 'activeDrivers', 'dailyCosts']
        },
        {
          section: 'vehicleMonitoring',
          visible: true,
          position: { x: 0, y: 1, w: 12, h: 2 },
          components: ['map', 'vehicleStatus', 'alerts']
        },
        {
          section: 'fraudDetection',
          visible: true,
          position: { x: 0, y: 3, w: 12, h: 2 },
          components: ['alerts', 'map', 'verification']
        }
      ]
    }
  ]);
  
  const [currentView, setCurrentView] = useState('default-view');
  
  // State for admin configuration
  const [roleConfigs, setRoleConfigs] = useState<RoleConfig[]>([
    {
      role: 'dispatcher',
      availableSections: [
        { section: 'kpi', status: 'required', components: ['activeVehicles', 'activeDrivers', 'dailyCosts'] },
        { section: 'vehicleMonitoring', status: 'required', components: ['map', 'vehicleStatus', 'alerts'] },
        { section: 'fraudDetection', status: 'optional', components: ['alerts', 'map', 'verification'] },
        { section: 'driverSafety', status: 'unavailable', components: [] }
      ]
    }
  ]);
  
  const [templateViews, setTemplateViews] = useState<ViewConfig[]>([
    {
      id: 'template-dispatcher',
      name: 'Szablon dyspozytora',
      createdBy: 'admin',
      isDefault: true,
      forRole: 'dispatcher',
      layout: [
        {
          section: 'kpi',
          visible: true,
          position: { x: 0, y: 0, w: 12, h: 1 },
          components: ['activeVehicles', 'activeDrivers', 'dailyCosts']
        },
        {
          section: 'vehicleMonitoring',
          visible: true,
          position: { x: 0, y: 1, w: 12, h: 2 },
          components: ['map', 'vehicleStatus', 'alerts']
        }
      ]
    }
  ]);
  
  // Edit mode state
  const [isEditMode, setEditMode] = useState(false);
  
  // Functions for user views
  const saveView = (view: ViewConfig) => {
    setUserViews(prev => [...prev, view]);
  };
  
  const updateView = (viewId: string, updates: Partial<ViewConfig>) => {
    setUserViews(prev => 
      prev.map(view => 
        view.id === viewId ? { ...view, ...updates } : view
      )
    );
  };
  
  const deleteView = (viewId: string) => {
    setUserViews(prev => prev.filter(view => view.id !== viewId));
  };
  
  // Functions for admin configuration
  const saveRoleConfig = (config: RoleConfig) => {
    setRoleConfigs(prev => {
      const index = prev.findIndex(rc => rc.role === config.role);
      if (index >= 0) {
        const newConfigs = [...prev];
        newConfigs[index] = config;
        return newConfigs;
      } else {
        return [...prev, config];
      }
    });
  };
  
  const saveTemplateView = (template: ViewConfig) => {
    setTemplateViews(prev => {
      const index = prev.findIndex(t => t.id === template.id);
      if (index >= 0) {
        const newTemplates = [...prev];
        newTemplates[index] = template;
        return newTemplates;
      } else {
        return [...prev, template];
      }
    });
  };
  
  const deleteTemplateView = (templateId: string) => {
    setTemplateViews(prev => prev.filter(template => template.id !== templateId));
  };
  
  const value = {
    userViews,
    currentView,
    setCurrentView,
    saveView,
    updateView,
    deleteView,
    
    roleConfigs,
    templateViews,
    saveRoleConfig,
    saveTemplateView,
    deleteTemplateView,
    
    isEditMode,
    setEditMode
  };
  
  return (
    <ViewCustomizationContext.Provider value={value}>
      {children}
    </ViewCustomizationContext.Provider>
  );
};

// Custom hook to use the context
export const useViewCustomization = () => {
  const context = useContext(ViewCustomizationContext);
  if (context === undefined) {
    throw new Error('useViewCustomization must be used within a ViewCustomizationProvider');
  }
  return context;
};
