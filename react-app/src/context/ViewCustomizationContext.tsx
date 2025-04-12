import React, { createContext, useState, useEffect, ReactNode } from 'react';
import viewCustomizationService, { UserView } from '../services/api/viewCustomizationService';

// Interfejs dla kontekstu personalizacji widoków
interface ViewCustomizationContextType {
  currentView: UserView | null;
  setCurrentView: (view: UserView | null) => void;
  isElementVisible: (elementId: string) => boolean;
}

// Domyślna wartość kontekstu
const defaultContextValue: ViewCustomizationContextType = {
  currentView: null,
  setCurrentView: () => {},
  isElementVisible: () => true
};

// Utworzenie kontekstu
export const ViewCustomizationContext = createContext<ViewCustomizationContextType>(defaultContextValue);

// Interfejs dla props providera
interface ViewCustomizationProviderProps {
  children: ReactNode;
}

// Provider kontekstu personalizacji widoków
export const ViewCustomizationProvider: React.FC<ViewCustomizationProviderProps> = ({ children }) => {
  // Stan dla aktualnego widoku
  const [currentView, setCurrentView] = useState<UserView | null>(null);
  
  // ID użytkownika (w rzeczywistej aplikacji pobierane z kontekstu autoryzacji)
  const userId = "current-user-id";
  
  // Pobieranie domyślnego widoku przy montowaniu komponentu
  useEffect(() => {
    const fetchDefaultView = async () => {
      try {
        // Pobieranie widoków użytkownika
        const viewsResponse = await viewCustomizationService.getUserViews(userId);
        
        // Ustawienie domyślnego widoku
        const defaultView = viewsResponse.views.find(view => view.isDefault);
        if (defaultView) {
          setCurrentView(defaultView);
        } else if (viewsResponse.views.length > 0) {
          setCurrentView(viewsResponse.views[0]);
        }
      } catch (err) {
        console.error('Error fetching default view:', err);
      }
    };
    
    fetchDefaultView();
  }, []);
  
  // Funkcja sprawdzająca, czy element jest widoczny w aktualnym widoku
  const isElementVisible = (elementId: string): boolean => {
    if (!currentView) {
      return true; // Jeśli nie ma aktualnego widoku, wszystkie elementy są widoczne
    }
    
    return currentView.elements.includes(elementId);
  };
  
  // Wartość kontekstu
  const contextValue: ViewCustomizationContextType = {
    currentView,
    setCurrentView,
    isElementVisible
  };
  
  return (
    <ViewCustomizationContext.Provider value={contextValue}>
      {children}
    </ViewCustomizationContext.Provider>
  );
};

export default ViewCustomizationProvider;
