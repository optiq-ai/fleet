# Fleet App - Dokumentacja

## Przegląd projektu

Fleet App to zaawansowana aplikacja do zarządzania flotą pojazdów, która integruje funkcje wykrywania oszustw, monitorowania pojazdów, bezpieczeństwa kierowców, komunikacji i współpracy, oraz analizy danych.

## Struktura projektu

Projekt składa się z trzech głównych komponentów:
- **Frontend (react-app)** - aplikacja React z JSX
- **Backend** - serwer Node.js
- **Baza danych** - struktura SQL (PostgreSQL)

## Technologie i konwencje

- **React** - biblioteka JavaScript do budowania interfejsów użytkownika
- **Chart.js** - biblioteka do tworzenia interaktywnych wykresów
- **react-chartjs-2** - wrapper React dla Chart.js
- **Styled Components** - biblioteka do stylowania komponentów React
- **CSS** - do stylowania i ikon (zamiast zewnętrznych bibliotek ikon)
- **JSX** - rozszerzenie składni JavaScript do tworzenia elementów React

## Komponenty aplikacji

### Statistics

Sekcja Statistics dostarcza kompleksowy widok statystyk i analiz dotyczących floty pojazdów, zużycia paliwa, kosztów operacyjnych i wydajności kierowców. Komponenty te umożliwiają analizę trendów czasowych, porównywanie wydajności różnych elementów floty oraz generowanie raportów i eksportowanie danych.

#### Komponenty:
- **StatisticsDashboard** - główny dashboard z kluczowymi wskaźnikami wydajności (KPI) i wykresami trendów dla najważniejszych metryk
- **TrendAnalysis** - zaawansowana analiza trendów czasowych dla różnych metryk z możliwością nakładania wielu metryk na jeden wykres
- **ComparativeAnalysis** - porównywanie wydajności pojazdów, kierowców i tras pod względem różnych metryk
- **StatisticsCard** - komponent prezentujący pojedynczy wskaźnik KPI z wartością, jednostką, trendem i statusem
- **StatisticsChart** - komponent wyświetlający różne typy wykresów (liniowe, słupkowe, kołowe, radarowe) przy użyciu Chart.js
- **StatisticsTable** - komponent wyświetlający dane tabelaryczne z sortowaniem i paginacją
- **StatisticsFilter** - komponent umożliwiający filtrowanie danych według zakresu czasu
- **StatisticsExport** - komponent umożliwiający eksport danych do różnych formatów (CSV, PDF, Excel)

#### Funkcje i metody:
- `getKPIData()` - pobiera dane kluczowych wskaźników wydajności
- `getTrendData()` - pobiera dane trendów czasowych dla różnych metryk
- `getComparisonData()` - pobiera dane porównawcze dla pojazdów, kierowców lub tras
- `getDistributionData()` - pobiera dane dystrybucji dla wykresów kołowych
- `getRadarData()` - pobiera dane dla wykresów radarowych
- `getAnomalyData()` - pobiera dane o wykrytych anomaliach
- `getForecastData()` - pobiera dane prognozowane
- `getCostAnalysisData()` - pobiera dane analizy kosztów
- `exportTrendData()` - eksportuje dane trendów do wybranego formatu
- `exportComparisonData()` - eksportuje dane porównawcze do wybranego formatu
- `handleTimeRangeChange()` - obsługuje zmianę zakresu czasu
- `handleMetricChange()` - obsługuje zmianę wybranej metryki
- `handleComparisonTypeChange()` - obsługuje zmianę typu porównania
- `handleChartTypeChange()` - obsługuje zmianę typu wykresu
- `handleSortOrderChange()` - obsługuje zmianę kolejności sortowania
- `handleLimitChange()` - obsługuje zmianę limitu wyświetlanych elementów
- `handleTabChange()` - obsługuje zmianę aktywnej zakładki
- `handleExport()` - obsługuje eksport danych
- `generateInsights()` - generuje wnioski na podstawie danych trendów
- `generateSummary()` - generuje podsumowanie na podstawie danych porównawczych
- `prepareChartData()` - przygotowuje dane do wyświetlenia na wykresie
- `prepareTableData()` - przygotowuje dane do wyświetlenia w tabeli
- `getChartJsType()` - zwraca typ wykresu dla Chart.js
- `getChartOptions()` - zwraca opcje konfiguracyjne dla Chart.js

#### Stany (hooks):
- `kpiData` - dane kluczowych wskaźników wydajności
- `trendData` - dane trendów czasowych
- `comparisonData` - dane porównawcze
- `isLoading` - stan ładowania danych
- `error` - stan błędu
- `timeRange` - wybrany zakres czasu
- `selectedMetrics` - wybrane metryki
- `comparisonType` - wybrany typ porównania
- `chartType` - wybrany typ wykresu
- `sortOrder` - wybrana kolejność sortowania
- `limit` - wybrany limit elementów
- `activeTab` - aktywna zakładka
- `isMultiMetric` - tryb wielu metryk

#### Źródła danych:
- **API Service**: `statisticsService.js` - zawiera metody do komunikacji z backendem
- **Mock Service**: `mockStatisticsService.js` - zawiera dane testowe używane podczas developmentu

#### Struktury danych:
- **KPIData** - struktura danych KPI zawierająca pola:
  - `id` - identyfikator KPI
  - `name` - nazwa KPI
  - `value` - wartość KPI
  - `unit` - jednostka miary
  - `trend` - zmiana procentowa
  - `trendPeriod` - okres trendu
  - `status` - status (good, warning, critical)

- **TrendData** - struktura danych trendu zawierająca tablicę punktów danych:
  - `date` - data punktu danych
  - `value` - wartość w danym punkcie

- **ComparisonData** - struktura danych porównawczych:
  - `id` - identyfikator elementu
  - `name` - nazwa elementu
  - `value` - wartość metryki
  - `change` - zmiana procentowa
  - `status` - status (good, warning, critical)
  - `rank` - pozycja w rankingu

- **DistributionData** - struktura danych dystrybucji:
  - `category` - nazwa kategorii
  - `value` - wartość kategorii

- **RadarData** - struktura danych dla wykresu radarowego:
  - `categories` - nazwy kategorii
  - `values` - wartości dla każdej kategorii
  - `benchmarkValues` - wartości referencyjne dla porównania

#### Typy wykresów:
- **Liniowy (line)** - do wizualizacji trendów czasowych
- **Słupkowy (bar)** - do porównywania wartości między elementami
- **Słupkowy poziomy (horizontalBar)** - do porównywania wartości między elementami, gdy jest ich dużo
- **Kołowy (pie)** - do wizualizacji dystrybucji danych
- **Radarowy (radar)** - do analizy wielowymiarowej

#### Techniczne aspekty:
- Wszystkie komponenty używają czystego CSS do stylowania i ikon
- Brak zależności od zewnętrznych bibliotek ikon
- Wykresy są implementowane przy użyciu Chart.js i react-chartjs-2
- Komponenty są zintegrowane z API poprzez statisticsService
- Dostępne są również mocki danych w mockStatisticsService
- Komponenty używają React Hooks do zarządzania stanem
- Routing do sekcji Statistics jest zdefiniowany w App.jsx
- Architektura komponentów oparta na wzorcu "matrioszki" z separacją logiki biznesowej od prezentacji

#### Korzyści biznesowe:
1. **Kompleksowy wgląd w dane**
   - Wszystkie istotne statystyki w jednym miejscu
   - Możliwość analizy trendów czasowych
   - Porównywanie wydajności różnych elementów floty
   - Różne typy wizualizacji danych (wykresy liniowe, słupkowe, kołowe, radarowe)

2. **Identyfikacja obszarów do optymalizacji**
   - Wykrywanie nieefektywności
   - Identyfikacja potencjalnych oszczędności
   - Analiza anomalii i odchyleń
   - Porównywanie wydajności między pojazdami, kierowcami i trasami

3. **Podejmowanie decyzji w oparciu o dane**
   - Dostęp do zaawansowanych analiz
   - Interaktywne wykresy z możliwością filtrowania i sortowania
   - Generowanie raportów
   - Eksport danych do dalszej analizy

4. **Uniwersalność rozwiązania**
   - Modułowa struktura
   - Konfigurowalne widoki
   - Elastyczne filtry
   - Skalowalność dla różnych rozmiarów flot
   - Responsywność (desktop, tablet, mobile)

#### Integracja z innymi modułami:
- **Fleet Management** - wykorzystuje dane statystyczne do optymalizacji zarządzania flotą
- **Fuel Analysis** - dostarcza dane o zużyciu paliwa do analizy statystycznej
- **Driver Safety** - dostarcza dane o bezpieczeństwie kierowców do analizy statystycznej
- **Predictive Maintenance** - wykorzystuje analizy statystyczne do prognozowania konserwacji

### AI & Automation

Sekcja AI & Automation dostarcza zaawansowane funkcje sztucznej inteligencji i automatyzacji, które optymalizują zarządzanie flotą pojazdów. Komponenty te wykorzystują uczenie maszynowe, przetwarzanie języka naturalnego, analizę szeregów czasowych i inne technologie AI do przewidywania problemów, automatyzacji procesów, wykrywania anomalii i optymalizacji operacji.

#### Komponenty:
- **PredictiveAnalytics** - zaawansowane modele AI do przewidywania awarii pojazdów, opóźnień w dostawach, zużycia paliwa i emisji CO2 oraz optymalnych terminów wymiany części
- **AutomatedWorkflows** - konfigurowalne przepływy pracy automatyzujące planowanie tras, przydzielanie zadań kierowcom, generowanie raportów i procesy dokumentacyjne
- **AnomalyDetection** - wykrywanie nietypowych wzorców w zachowaniu kierowców, zużyciu paliwa, trasach pojazdów i danych finansowych
- **NaturalLanguageInterface** - interfejs konwersacyjny umożliwiający zadawanie pytań o status floty, wydawanie poleceń, generowanie raportów i asystowanie dyspozytorowi
- **SmartAlerts** - inteligentny system powiadomień priorytetyzujący alerty, dostosowujący kanały komunikacji, agregujący powiązane alerty i uczący się na podstawie reakcji użytkowników
- **ScenarioSimulation** - symulacje różnych scenariuszy operacyjnych, w tym wpływu zmian w flocie, strategii przydziału pojazdów, warunków zewnętrznych i planów awaryjnych
- **ContinuousOptimization** - ciągła optymalizacja procesów poprzez automatyczne dostosowywanie parametrów, identyfikację wąskich gardeł, sugestie usprawnień i benchmarking

#### Funkcje i metody:
- `getPredictiveAnalytics()` - pobiera dane predykcyjne dla różnych kategorii (awarie pojazdów, opóźnienia dostaw, zużycie paliwa, harmonogram konserwacji)
- `getAutomatedWorkflows()` - pobiera dane o zautomatyzowanych przepływach pracy (planowanie tras, przydzielanie kierowców, generowanie raportów, przetwarzanie dokumentów)
- `getAnomalyDetection()` - pobiera dane o wykrytych anomaliach (zachowanie kierowców, zużycie paliwa, odchylenia tras, anomalie finansowe)
- `getNaturalLanguageInterface()` - pobiera dane interfejsu języka naturalnego (ostatnie zapytania, sugerowane zapytania, historia poleceń)
- `getSmartAlerts()` - pobiera dane o inteligentnych alertach (aktywne alerty, ustawienia alertów, historia alertów)
- `getScenarioSimulation()` - pobiera dane symulacji scenariuszy (scenariusze floty, scenariusze przydziału, scenariusze czynników zewnętrznych, plany awaryjne)
- `getContinuousOptimization()` - pobiera dane ciągłej optymalizacji (parametry systemu, wąskie gardła procesów, sugestie usprawnień, dane benchmarkowe)
- `submitNaturalLanguageQuery()` - wysyła zapytanie w języku naturalnym do systemu
- `createWorkflow()` - tworzy nowy zautomatyzowany przepływ pracy
- `runScenarioSimulation()` - uruchamia symulację wybranego scenariusza
- `acknowledgeAlert()` - potwierdza otrzymanie alertu

#### Stany (hooks):
- `activeTab` - aktywna zakładka w poszczególnych komponentach
- `activeComponent` - aktywny komponent w głównym widoku AI & Automation
- `data` - dane specyficzne dla danego komponentu
- `selectedScenario` - wybrany scenariusz do symulacji
- `simulationResults` - wyniki przeprowadzonej symulacji
- `query` - zapytanie w języku naturalnym
- `isLoading` - stan ładowania danych
- `isRunning` - stan uruchomionej symulacji
- `isSubmitting` - stan wysyłania zapytania
- `error` - stan błędu

#### Źródła danych:
- **API Service**: `aiAutomationService.js` - zawiera metody do komunikacji z backendem
- **Mock Service**: `aiAutomationMockData.js` - zawiera dane testowe używane podczas developmentu

#### Techniczne aspekty:
- Wszystkie komponenty używają czystego CSS do stylowania i ikon
- Ikony są implementowane jako elementy span z odpowiednimi klasami CSS
- Brak zależności od zewnętrznych bibliotek ikon
- Komponenty są zintegrowane z API poprzez aiAutomationService
- Dostępne są również mocki danych w aiAutomationMockData
- Komponenty używają React Hooks do zarządzania stanem
- Routing do sekcji AI & Automation jest zdefiniowany w App.jsx

Szczegółowa dokumentacja sekcji AI & Automation znajduje się w pliku [ai_automation_section.md](./ai_automation_section.md).

### Document Management

Sekcja Document Management umożliwia centralne zarządzanie wszystkimi dokumentami związanymi z flotą pojazdów, kierowcami, operacjami i zgodnością z przepisami. Komponent ten zapewnia kompleksowe rozwiązanie do przechowywania, kategoryzowania, wyszukiwania i automatyzacji procesów dokumentacyjnych.

#### Komponenty:
- **DocumentsDashboard** - wyświetla KPI, alerty dokumentów i statystyki zgodności
- **VehicleDocuments** - zarządza dokumentami pojazdów (dowody rejestracyjne, ubezpieczenia, przeglądy)
- **DriverDocuments** - zarządza dokumentami kierowców (prawo jazdy, certyfikaty, badania)
- **OperationalDocuments** - zarządza dokumentami operacyjnymi (umowy, faktury, raporty)
- **ComplianceDocuments** - zarządza dokumentami zgodności z przepisami (licencje, zezwolenia, certyfikaty)
- **DocumentSearch** - zaawansowane wyszukiwanie dokumentów z filtrowaniem i sortowaniem
- **DocumentAutomation** - automatyzacja procesów dokumentacyjnych, szablony i przypomnienia

#### Funkcje i metody:
- `fetchDocumentsDashboard()` - pobiera dane KPI, alerty dokumentów i statystyki zgodności
- `fetchDocuments()` - pobiera listę dokumentów z możliwością filtrowania po typie, kategorii i statusie
- `fetchDocumentDetails()` - pobiera szczegółowe informacje o wybranym dokumencie
- `uploadDocument()` - obsługuje przesyłanie nowych dokumentów
- `updateDocument()` - obsługuje aktualizację istniejących dokumentów
- `deleteDocument()` - obsługuje usuwanie dokumentów
- `createDocumentTemplate()` - tworzy nowy szablon dokumentu
- `generateDocumentFromTemplate()` - generuje dokument na podstawie szablonu
- `setDocumentReminder()` - ustawia przypomnienie o terminie ważności dokumentu
- `createAutomationRule()` - tworzy regułę automatyzacji dla dokumentów
- `handleTabChange()` - obsługuje zmianę głównej zakładki
- `handleFilterChange()` - obsługuje zmianę filtrów dokumentów
- `handleSearch()` - obsługuje wyszukiwanie dokumentów
- `handlePageChange()` - obsługuje zmianę strony w paginacji dokumentów
- `handleToggleDataSource()` - przełącza między danymi z API a danymi mockowymi

#### Stany (hooks):
- `activeTab` - aktywna zakładka główna
- `documents` - lista dokumentów
- `selectedDocument` - wybrany dokument
- `documentCategories` - kategorie dokumentów
- `documentTemplates` - szablony dokumentów
- `automationRules` - reguły automatyzacji
- `reminderSettings` - ustawienia przypomnień
- `dashboardData` - dane dashboardu dokumentów
- `filters` - filtry dla dokumentów (typ, kategoria, status, wyszukiwanie, strona)
- `pagination` - dane paginacji (strona, limit, total, pages)
- `isLoading` - stan ładowania
- `isDetailLoading` - stan ładowania szczegółów
- `error` - stan błędu
- `useMockData` - przełącznik źródła danych (API vs Mock)

#### Źródła danych i przepływy:
- **API Service**: `documentManagementService.js` - zawiera metody do komunikacji z backendem
- **Mock Service**: `mockDocumentManagementService.js` - zawiera dane testowe używane podczas developmentu

#### Techniczne aspekty:
- Wszystkie komponenty używają czystego CSS do stylowania i ikon
- Ikony są implementowane jako elementy span z odpowiednimi klasami CSS
- Brak zależności od zewnętrznych bibliotek ikon
- Komponenty są zintegrowane z API poprzez documentManagementService
- Dostępne są również mocki danych w mockDocumentManagementService
- Komponenty używają React Hooks do zarządzania stanem
- Routing do sekcji Document Management jest zdefiniowany w App.jsx

Szczegółowa dokumentacja sekcji Document Management znajduje się w pliku [document_management_section.md](./document_management_section.md).
