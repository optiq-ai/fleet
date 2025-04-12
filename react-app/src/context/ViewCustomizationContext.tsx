import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Typy danych
interface ViewSection {
  id: string;
  name: string;
  type: string;
  visible: boolean;
  order: number;
}

interface View {
  id: string;
  name: string;
  description: string;
  isDefault: boolean;
  sections: ViewSection[];
  userGroups: string[];
}

interface ViewCustomizationContextType {
  views: View[];
  currentView: View | null;
  isLoading: boolean;
  error: string | null;
  setCurrentView: (view: View) => void;
  saveView: (view: View) => Promise<boolean>;
  deleteView: (viewId: string) => Promise<boolean>;
  createView: (view: Omit<View, 'id'>) => Promise<View | null>;
}

// Tworzenie kontekstu
const ViewCustomizationContext = createContext<ViewCustomizationContextType | undefined>(undefined);

// Hook do używania kontekstu
export const useViewCustomization = () => {
  const context = useContext(ViewCustomizationContext);
  if (context === undefined) {
    throw new Error('useViewCustomization must be used within a ViewCustomizationProvider');
  }
  return context;
};

// Provider komponent
interface ViewCustomizationProviderProps {
  children: ReactNode;
}

export const ViewCustomizationProvider: React.FC<ViewCustomizationProviderProps> = ({ children }) => {
  const [views, setViews] = useState<View[]>([]);
  const [currentView, setCurrentView] = useState<View | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Pobieranie widoków przy inicjalizacji
  useEffect(() => {
    const fetchViews = async () => {
      setIsLoading(true);
      try {
        // Symulacja opóźnienia sieciowego
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Dane mockowe
        const mockViews: View[] = [
          {
            id: 'view1',
            name: 'Widok standardowy',
            description: 'Domyślny widok z wszystkimi sekcjami',
            isDefault: true,
            sections: [
              { id: 'section1', name: 'Statystyki KPI', type: 'kpi', visible: true, order: 1 },
              { id: 'section2', name: 'Wykrywanie oszustw', type: 'fraud', visible: true, order: 2 },
              { id: 'section3', name: 'Bezpieczeństwo kierowcy', type: 'safety', visible: true, order: 3 },
              { id: 'section4', name: 'Konserwacja predykcyjna', type: 'maintenance', visible: true, order: 4 },
              { id: 'section5', name: 'Monitoring pojazdów', type: 'monitoring', visible: true, order: 5 }
            ],
            userGroups: ['all']
          },
          {
            id: 'view2',
            name: 'Widok bezpieczeństwa',
            description: 'Widok skupiony na bezpieczeństwie kierowców',
            isDefault: false,
            sections: [
              { id: 'section1', name: 'Statystyki KPI', type: 'kpi', visible: true, order: 1 },
              { id: 'section2', name: 'Wykrywanie oszustw', type: 'fraud', visible: false, order: 2 },
              { id: 'section3', name: 'Bezpieczeństwo kierowcy', type: 'safety', visible: true, order: 2 },
              { id: 'section4', name: 'Konserwacja predykcyjna', type: 'maintenance', visible: false, order: 4 },
              { id: 'section5', name: 'Monitoring pojazdów', type: 'monitoring', visible: true, order: 3 }
            ],
            userGroups: ['managers', 'safety_officers']
          },
          {
            id: 'view3',
            name: 'Widok konserwacji',
            description: 'Widok skupiony na konserwacji pojazdów',
            isDefault: false,
            sections: [
              { id: 'section1', name: 'Statystyki KPI', type: 'kpi', visible: true, order: 1 },
              { id: 'section2', name: 'Wykrywanie oszustw', type: 'fraud', visible: false, order: 2 },
              { id: 'section3', name: 'Bezpieczeństwo kierowcy', type: 'safety', visible: false, order: 3 },
              { id: 'section4', name: 'Konserwacja predykcyjna', type: 'maintenance', visible: true, order: 2 },
              { id: 'section5', name: 'Monitoring pojazdów', type: 'monitoring', visible: true, order: 3 }
            ],
            userGroups: ['managers', 'maintenance_staff']
          }
        ];
        
        setViews(mockViews);
        setCurrentView(mockViews.find(view => view.isDefault) || mockViews[0]);
        setError(null);
      } catch (err) {
        console.error('Error fetching views:', err);
        setError('Nie udało się pobrać widoków. Spróbuj ponownie później.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchViews();
  }, []);

  // Zapisywanie widoku
  const saveView = async (view: View): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Symulacja opóźnienia sieciowego
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Aktualizacja lokalnego stanu
      const updatedViews = views.map(v => v.id === view.id ? view : v);
      setViews(updatedViews);
      
      if (currentView && currentView.id === view.id) {
        setCurrentView(view);
      }
      
      return true;
    } catch (err) {
      console.error('Error saving view:', err);
      setError('Nie udało się zapisać widoku. Spróbuj ponownie później.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Usuwanie widoku
  const deleteView = async (viewId: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Symulacja opóźnienia sieciowego
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Sprawdzenie czy widok nie jest domyślny
      const viewToDelete = views.find(v => v.id === viewId);
      if (viewToDelete && viewToDelete.isDefault) {
        setError('Nie można usunąć domyślnego widoku.');
        return false;
      }
      
      // Aktualizacja lokalnego stanu
      const updatedViews = views.filter(v => v.id !== viewId);
      setViews(updatedViews);
      
      // Jeśli usuwany widok jest aktualnie wybrany, przełącz na domyślny
      if (currentView && currentView.id === viewId) {
        const defaultView = updatedViews.find(v => v.isDefault) || updatedViews[0];
        setCurrentView(defaultView);
      }
      
      return true;
    } catch (err) {
      console.error('Error deleting view:', err);
      setError('Nie udało się usunąć widoku. Spróbuj ponownie później.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Tworzenie nowego widoku
  const createView = async (viewData: Omit<View, 'id'>): Promise<View | null> => {
    setIsLoading(true);
    try {
      // Symulacja opóźnienia sieciowego
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Tworzenie nowego widoku z unikalnym ID
      const newView: View = {
        ...viewData,
        id: `view${Date.now()}`
      };
      
      // Aktualizacja lokalnego stanu
      setViews([...views, newView]);
      
      return newView;
    } catch (err) {
      console.error('Error creating view:', err);
      setError('Nie udało się utworzyć widoku. Spróbuj ponownie później.');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Wartość kontekstu
  const value = {
    views,
    currentView,
    isLoading,
    error,
    setCurrentView,
    saveView,
    deleteView,
    createView
  };

  return (
    <ViewCustomizationContext.Provider value={value}>
      {children}
    </ViewCustomizationContext.Provider>
  );
};

export default ViewCustomizationContext;
