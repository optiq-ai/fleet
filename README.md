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
- **Styled Components** - biblioteka do stylowania komponentów React
- **CSS** - do stylowania i ikon (zamiast zewnętrznych bibliotek ikon)
- **JSX** - rozszerzenie składni JavaScript do tworzenia elementów React

## Komponenty aplikacji

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
- **API Service**: `documentManagementService.js` - zawiera metody do komunikacji z backendem:
  - `getDocumentsDashboard()` - pobiera dane dashboardu z endpointu `/documents/dashboard`
  - `getDocuments()` - pobiera listę dokumentów z endpointu `/documents`
  - `getDocumentDetails()` - pobiera szczegóły dokumentu z endpointu `/documents/{id}`
  - `uploadDocument()` - wysyła nowy dokument do endpointu `/documents` (multipart/form-data)
  - `updateDocument()` - aktualizuje dokument przez endpoint `/documents/{id}`
  - `deleteDocument()` - usuwa dokument przez endpoint `/documents/{id}`
  - `searchDocuments()` - wyszukuje dokumenty przez endpoint `/documents/search`
  - `getDocumentTemplates()` - pobiera szablony z endpointu `/documents/templates`
  - `createDocumentTemplate()` - tworzy szablon przez endpoint `/documents/templates`
  - `generateDocumentFromTemplate()` - generuje dokument z szablonu przez endpoint `/documents/templates/{id}/generate`
  - `getDocumentCategories()` - pobiera kategorie z endpointu `/documents/categories`
  - `getDocumentAlerts()` - pobiera alerty z endpointu `/documents/alerts`

- **Mock Service**: `mockDocumentManagementService.js` - zawiera dane testowe używane podczas developmentu:
  - Symuluje wszystkie metody API service
  - Zawiera predefiniowane dane dokumentów, szablonów, kategorii, alertów
  - Implementuje podstawową logikę filtrowania, sortowania i paginacji
  - Domyślnie używany w aplikacji (przełączany przez `useMockData`)

- **Współdzielenie danych z innymi komponentami**:
  - **Fleet Management** - wykorzystuje dane dokumentów pojazdów
  - **Drivers** - wykorzystuje dane dokumentów kierowców
  - **Geofencing** - wykorzystuje dane dokumentów wymaganych dla określonych stref
  - **Ferry Bookings** - wykorzystuje dane dokumentów wymaganych do przepraw promowych
  - **Road Tolls** - wykorzystuje dane dokumentów wymaganych do opłat drogowych

#### Struktury danych:
- **Document** - struktura dokumentu zawiera pola:
  - `id` - unikalny identyfikator dokumentu
  - `name` - nazwa dokumentu
  - `type` - typ dokumentu (vehicle, driver, operational, compliance)
  - `category` - kategoria dokumentu (np. registration, insurance)
  - `vehicleId/driverId` - powiązanie z pojazdem lub kierowcą
  - `issueDate/expiryDate` - daty wydania i wygaśnięcia
  - `status` - status dokumentu (active, expired, pending, archived)
  - `fileUrl/fileType/fileSize` - informacje o pliku
  - `tags/notes` - dodatkowe informacje
  - `createdAt/updatedAt/createdBy/lastViewedAt` - metadane

- **DocumentTemplate** - struktura szablonu dokumentu
- **AutomationRule** - struktura reguły automatyzacji
- **ReminderSettings** - struktura ustawień przypomnień

#### Techniczne aspekty:
- Wszystkie komponenty używają czystego CSS do stylowania i ikon (plik IconStyles.css)
- Ikony są implementowane jako elementy span z odpowiednimi klasami CSS
- Brak zależności od zewnętrznych bibliotek ikon jak react-icons/fa
- Komponenty są zintegrowane z API poprzez documentManagementService
- Dostępne są również mocki danych w mockDocumentManagementService
- Komponenty DocumentAutomation używa domyślnych wartości dla props, aby uniknąć błędów przy niezdefiniowanych danych

#### Obsługa błędów:
- Wyświetlanie komunikatu o błędzie, gdy nie można pobrać danych
- Osobna obsługa błędów dla głównych danych i szczegółów
- Walidacja formularzy przed wysłaniem danych
- Obsługa błędów przesyłania plików
- Logowanie błędów do konsoli

#### Korzyści biznesowe:
1. **Zwiększenie zgodności z przepisami**
   - Centralne zarządzanie wszystkimi dokumentami wymaganymi przez przepisy
   - Automatyczne przypomnienia o zbliżających się terminach ważności dokumentów
   - Śledzenie statusu zgodności dokumentacyjnej dla całej floty

2. **Redukcja ryzyka operacyjnego**
   - Eliminacja ryzyka związanego z przeterminowanymi dokumentami
   - Zapobieganie karom i opłatom za brak wymaganych dokumentów
   - Szybki dostęp do dokumentów w przypadku kontroli

3. **Zwiększenie efektywności operacyjnej**
   - Automatyzacja procesów dokumentacyjnych
   - Szybkie wyszukiwanie i dostęp do dokumentów
   - Eliminacja papierowej dokumentacji i związanych z nią kosztów

### Asset Management

Sekcja Asset Management (Zarządzanie Aktywami) umożliwia kompleksowe zarządzanie wszystkimi aktywami floty, nie tylko pojazdami, ale również sprzętem, narzędziami, częściami zamiennymi i innymi zasobami. Komponent ten zapewnia pełną widoczność cyklu życia aktywów od zakupu, przez użytkowanie, konserwację, aż po wycofanie z eksploatacji.

#### Komponenty:
- **AssetDashboard** - wyświetla kluczowe wskaźniki wydajności (KPI) związane z aktywami, prezentuje statystyki wykorzystania, pokazuje alerty dotyczące konserwacji i wygasających gwarancji, wizualizuje rozmieszczenie aktywów na mapie
- **AssetInventory** - zarządza kompletnym inwentarzem wszystkich aktywów, kategoryzuje aktywa według typu, lokalizacji i statusu, umożliwia wyszukiwanie i filtrowanie aktywów, śledzi historię przypisania aktywów do pojazdów/kierowców
- **AssetMaintenance** - planuje i śledzi konserwację aktywów, zarządza harmonogramami przeglądów, rejestruje historię napraw i serwisów, monitoruje koszty konserwacji, generuje przypomnienia o zbliżających się terminach
- **AssetAcquisition** - zarządza procesem zakupu nowych aktywów, śledzi zamówienia i dostawy, rejestruje informacje o dostawcach, monitoruje koszty zakupu, zarządza dokumentacją zakupową
- **AssetDisposal** - zarządza procesem wycofywania aktywów z eksploatacji, śledzi wartość odsprzedaży, rejestruje informacje o nabywcach, monitoruje zgodność z przepisami dotyczącymi utylizacji
- **AssetUtilization** - analizuje wykorzystanie aktywów, identyfikuje nieefektywnie wykorzystywane aktywa, generuje raporty wykorzystania, sugeruje optymalizacje w przydziale aktywów
- **AssetReporting** - generuje raporty dotyczące aktywów, umożliwia eksport danych do różnych formatów, tworzy niestandardowe widoki raportów, automatyzuje dystrybucję raportów

#### Funkcje i metody:
- `fetchAssetDashboard()` - pobiera dane KPI, alerty i statystyki aktywów
- `fetchAssets()` - pobiera listę aktywów z możliwością filtrowania
- `fetchAssetDetails()` - pobiera szczegółowe informacje o wybranym aktywie
- `createAsset()` - tworzy nowy rekord aktywa
- `updateAsset()` - aktualizuje informacje o aktywie
- `deleteAsset()` - usuwa aktywo z systemu
- `assignAsset()` - przypisuje aktywo do pojazdu, kierowcy lub lokalizacji
- `unassignAsset()` - usuwa przypisanie aktywa
- `scheduleAssetMaintenance()` - planuje konserwację aktywa
- `recordAssetMaintenance()` - rejestruje wykonaną konserwację
- `calculateAssetDepreciation()` - oblicza amortyzację aktywa
- `generateAssetReport()` - generuje raport dotyczący aktywów
- `exportAssetData()` - eksportuje dane aktywów do CSV/PDF/XLSX
- `importAssetData()` - importuje dane aktywów z pliku
- `trackAssetLocation()` - śledzi lokalizację aktywa (dla aktywów z GPS)
- `calculateAssetTCO()` - oblicza całkowity koszt posiadania aktywa
- `forecastAssetReplacement()` - prognozuje optymalny czas wymiany aktywa
- `handleTabChange()` - obsługuje zmianę głównej zakładki
- `handleFilterChange()` - obsługuje zmianę filtrów aktywów
- `handleSearch()` - obsługuje wyszukiwanie aktywów
- `handlePageChange()` - obsługuje zmianę strony w paginacji aktywów
- `handleToggleDataSource()` - przełącza między danymi z API a danymi mockowymi

#### Stany (hooks):
- `activeTab` - aktywna zakładka główna
- `assets` - lista aktywów
- `selectedAsset` - wybrane aktywo
- `assetCategories` - kategorie aktywów
- `assetLocations` - lokalizacje aktywów
- `maintenanceSchedules` - harmonogramy konserwacji
- `maintenanceHistory` - historia konserwacji
- `assignmentHistory` - historia przypisań
- `dashboardData` - dane dashboardu aktywów
- `utilizationData` - dane wykorzystania aktywów
- `depreciationData` - dane amortyzacji
- `costData` - dane kosztów
- `filters` - filtry dla aktywów (typ, kategoria, status, lokalizacja, wyszukiwanie, strona)
- `pagination` - dane paginacji (strona, limit, total, pages)
- `isLoading` - stan ładowania
- `isDetailLoading` - stan ładowania szczegółów
- `error` - stan błędu
- `useMockData` - przełącznik źródła danych (API vs Mock)

#### Źródła danych i przepływy:
- **API Service**: `assetManagementService.js` - zawiera metody do komunikacji z backendem
- **Mock Service**: `mockAssetManagementService.js` - zawiera dane testowe używane podczas developmentu

#### Struktury danych:
- **Asset (Aktywo)** - struktura aktywa zawiera pola:
  - `id` - unikalny identyfikator aktywa
  - `name` - nazwa aktywa
  - `type` - typ aktywa (vehicle, equipment, tool, part, accessory)
  - `category` - kategoria aktywa (np. forklift, trailer, scanner)
  - `serialNumber` - numer seryjny aktywa
  - `manufacturer/model` - producent i model aktywa
  - `purchaseDate/purchasePrice` - data i cena zakupu
  - `currentValue` - aktualna wartość aktywa
  - `depreciationMethod/depreciationRate` - metoda i stopa amortyzacji
  - `expectedLifespan` - oczekiwany okres użytkowania
  - `warrantyExpiryDate` - data wygaśnięcia gwarancji
  - `location` - lokalizacja aktywa
  - `assignedTo` - przypisanie aktywa (pojazd, kierowca, lokalizacja)
  - `status` - status aktywa (active, maintenance, inactive, disposed)
  - `maintenanceSchedule` - harmonogram konserwacji
  - `specifications` - specyfikacje techniczne
  - `documents` - powiązane dokumenty
  - `notes/tags` - dodatkowe informacje
  - `customFields` - pola niestandardowe
  - `createdAt/updatedAt/createdBy/lastCheckedAt` - metadane

#### Techniczne aspekty:
- Wszystkie komponenty używają czystego CSS do stylowania i ikon (plik IconStyles.css)
- Ikony są implementowane jako elementy span z odpowiednimi klasami CSS
- Brak zależności od zewnętrznych bibliotek ikon
- Komponenty są zintegrowane z API poprzez assetManagementService
- Dostępne są również mocki danych w mockAssetManagementService
