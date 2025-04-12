# Fleet App - README

## Przegląd projektu

Fleet App to kompleksowa aplikacja do zarządzania flotą pojazdów, która integruje zaawansowane funkcje takie jak:
- Monitorowanie pojazdów w czasie rzeczywistym
- Wykrywanie oszustw (fraud detection)
- Bezpieczeństwo kierowców
- Konserwacja predykcyjna
- Personalizacja widoków dla różnych grup użytkowników
- I wiele innych

Aplikacja została zbudowana w React z TypeScript, wykorzystując React Router do nawigacji i Context API do zarządzania stanem.

## Struktura projektu

```
src/
├── components/
│   ├── common/         # Współdzielone komponenty UI
│   │   ├── Card.tsx
│   │   ├── KPICard.tsx
│   │   ├── Table.tsx
│   │   └── ViewSelector.tsx
│   └── layout/         # Komponenty układu strony
│       ├── Header.tsx
│       ├── Layout.tsx
│       └── Sidebar.tsx
├── context/
│   └── ViewCustomizationContext.tsx  # Kontekst do personalizacji widoków
├── pages/              # Strony/widoki aplikacji
│   ├── Dashboard.tsx
│   ├── DriverSafety.tsx
│   ├── FraudDetection.tsx
│   ├── PredictiveMaintenance.tsx
│   ├── ViewCustomizationAdmin.tsx
│   └── ViewCustomizationUser.tsx
├── App.tsx             # Główny komponent aplikacji z routingiem
└── index.tsx           # Punkt wejściowy aplikacji
```

## Funkcjonalności

### Układ aplikacji
- Responsywny układ z menu bocznym i nagłówkiem
- Nawigacja między różnymi sekcjami aplikacji
- Wsparcie dla różnych rozmiarów ekranów

### Personalizacja widoków
- System umożliwiający dostosowanie dashboardu do potrzeb różnych grup użytkowników
- Panel administratora do zarządzania dostępnymi elementami dla grup
- Interfejs użytkownika do personalizacji własnego dashboardu
- Możliwość zapisywania i przełączania między widokami

### Główne sekcje
- Dashboard - przegląd kluczowych wskaźników i alertów
- Wykrywanie oszustw - monitorowanie i analiza podejrzanych transakcji
- Bezpieczeństwo kierowcy - monitorowanie zmęczenia, rozproszenia uwagi i stylu jazdy
- Konserwacja predykcyjna - prognozowanie awarii i zarządzanie serwisem

## Jak uruchomić aplikację

1. Zainstaluj zależności:
```
cd fleet_app/react-app
npm install
```

2. Uruchom serwer deweloperski:
```
npm start
```

3. Aplikacja będzie dostępna pod adresem: http://localhost:3000

## Dodawanie funkcjonalności

Struktura aplikacji jest gotowa do rozbudowy o konkretne funkcjonalności. Aby dodać kod funkcjonalności:

1. Zidentyfikuj odpowiedni komponent lub stronę
2. Dodaj potrzebne zmienne stanu i funkcje obsługujące
3. Zaimplementuj logikę biznesową
4. Połącz z API backendu (gdy będzie dostępne)

Przykład dodania funkcjonalności do komponentu Dashboard:

```typescript
// W komponencie Dashboard.tsx

// 1. Dodaj hooki stanu
const [isLoading, setIsLoading] = useState(false);
const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

// 2. Dodaj funkcję pobierającą dane
const fetchDashboardData = async () => {
  setIsLoading(true);
  try {
    // Tutaj będzie wywołanie API
    const data = await api.getDashboardData();
    setDashboardData(data);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
  } finally {
    setIsLoading(false);
  }
};

// 3. Użyj useEffect do pobrania danych przy montowaniu komponentu
useEffect(() => {
  fetchDashboardData();
}, []);

// 4. Wyświetl dane w komponentach
return (
  <DashboardContainer>
    {isLoading ? (
      <LoadingIndicator />
    ) : (
      <>
        <KPISection>
          <KPICard 
            title="Aktywne pojazdy" 
            value={dashboardData?.activeVehicles || 0} 
          />
          {/* Pozostałe karty KPI */}
        </KPISection>
        {/* Pozostałe sekcje */}
      </>
    )}
  </DashboardContainer>
);
```

## Następne kroki

1. Implementacja backendu i API
2. Integracja z rzeczywistymi źródłami danych
3. Dodanie testów jednostkowych i integracyjnych
4. Wdrożenie CI/CD
5. Optymalizacja wydajności
