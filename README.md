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

### Dashboard

Dashboard to główny ekran aplikacji, który prezentuje najważniejsze informacje i wskaźniki dotyczące floty pojazdów. Komponent ten zawiera:

#### Funkcje i metody:
- `fetchDashboardData()` - pobiera dane KPI, alerty, dane mapy i statystyki floty
- `handleMapTypeChange()` - zmienia typ wyświetlanych danych na mapie
- `handleMapPointHover()` - obsługuje najechanie kursorem na punkt na mapie
- `handleMapPointLeave()` - obsługuje opuszczenie kursorem punktu na mapie
- `handleToggleDataSource()` - przełącza między danymi z API a danymi mockowymi

#### Komponenty:
- **Sekcja KPI** - wyświetla kluczowe wskaźniki wydajności floty
- **Sekcja wykrywania oszustw** - prezentuje alerty dotyczące potencjalnych oszustw
- **Sekcja statystyk floty** - pokazuje dane dotyczące zużycia paliwa, efektywności kierowców, kosztów operacyjnych i realizacji tras
- **Mapa floty** - wizualizuje lokalizacje pojazdów i punktów oszustw

#### Stany (hooks):
- `kpiData` - dane KPI
- `alerts` - dane alertów
- `mapData` - dane mapy
- `fleetStats` - statystyki floty
- `activeAlertTab` - aktywna zakładka alertów
- `activeMapTab` - aktywna zakładka mapy
- `tooltip` - dane tooltipa mapy
- `isLoading` - stan ładowania
- `error` - stan błędu
- `useMockData` - przełącznik źródła danych (API vs Mock)

#### Integracja z API:
- Komponent korzysta z `dashboardService` lub `mockDashboardService` w zależności od stanu przełącznika `useMockData`
- Domyślnie używane są dane mockowe, co pozwala na działanie aplikacji bez backendu

#### Obsługa błędów:
- Wyświetlanie komunikatu o błędzie, gdy nie można pobrać danych
- Logowanie błędów do konsoli

#### Responsywność:
- Układ kafelkowy dostosowuje się do różnych rozmiarów ekranu
- Zastosowano media queries dla różnych breakpointów

### Monitoring

Sekcja monitoringu umożliwia śledzenie stanu pojazdów w czasie rzeczywistym, ich lokalizacji GPS, zużycia paliwa oraz generowanie alertów i raportów.

#### Funkcje i metody:
- `fetchMonitoringData()` - pobiera dane pojazdów, alertów, KPI, zużycia paliwa i trendów
- `handleVehicleSelect()` - obsługuje wybór pojazdu
- `handleAcknowledgeAlert()` - obsługuje potwierdzenie alertu
- `handleMapPointHover()` - obsługuje najechanie kursorem na punkt na mapie
- `handleMapPointLeave()` - obsługuje opuszczenie kursorem punktu na mapie
- `handleToggleDataSource()` - przełącza między danymi z API a danymi mockowymi
- `getVehicleStatusCounts()` - oblicza liczby pojazdów w różnych stanach

#### Komponenty:
- **Sekcja KPI** - wyświetla kluczowe wskaźniki monitoringu
- **Mapa GPS** - wizualizuje lokalizacje pojazdów na mapie Polski
- **Sekcja monitorowania pojazdów** - pokazuje listę pojazdów, alertów i dane o zużyciu paliwa
- **Sekcja szczegółów pojazdu** - prezentuje szczegółowe informacje o wybranym pojeździe
- **Sekcja analizy trendów** - wyświetla wykresy trendów zużycia paliwa, przejechanych kilometrów i alertów

#### Stany (hooks):
- `vehicles` - dane pojazdów
- `selectedVehicle` - wybrany pojazd
- `alerts` - dane alertów
- `kpiData` - dane KPI
- `fuelData` - dane zużycia paliwa
- `trendData` - dane trendów
- `tooltip` - dane tooltipa mapy
- `activeTab` - aktywna zakładka
- `isLoading` - stan ładowania
- `error` - stan błędu
- `useMockData` - przełącznik źródła danych (API vs Mock)

#### Integracja z API:
- Komponent korzysta z `monitoringService` lub `mockMonitoringService` w zależności od stanu przełącznika `useMockData`
- Domyślnie używane są dane mockowe, co pozwala na działanie aplikacji bez backendu

#### Obsługa błędów:
- Wyświetlanie komunikatu o błędzie, gdy nie można pobrać danych
- Logowanie błędów do konsoli

#### Responsywność:
- Układ kafelkowy dostosowuje się do różnych rozmiarów ekranu
- Zastosowano media queries dla różnych breakpointów

### Bezpieczeństwo Kierowcy (Driver Safety)

Sekcja bezpieczeństwa kierowcy umożliwia monitorowanie zachowań kierowców, analizę stylu jazdy, wykrywanie niebezpiecznych sytuacji oraz zapewnienie wsparcia w poprawie bezpieczeństwa.

#### Funkcje i metody:
- `fetchSafetyData()` - pobiera dane alertów, rankingu kierowców, sesji coachingowych i stylu jazdy
- `handleFilterChange()` - obsługuje zmianę filtrów alertów
- `handleSearch()` - obsługuje wyszukiwanie alertów
- `handlePageChange()` - obsługuje zmianę strony w paginacji alertów
- `handleAlertClick()` - obsługuje kliknięcie wiersza alertu i pobiera szczegóły
- `handleDriverClick()` - obsługuje kliknięcie wiersza kierowcy i pobiera analizę stylu jazdy
- `handleToggleDataSource()` - przełącza między danymi z API a danymi mockowymi

#### Komponenty:
- **Zakładki tematyczne** - umożliwiają przełączanie między różnymi aspektami bezpieczeństwa kierowcy
- **Monitorowanie zmęczenia kierowcy** - wykrywa oznaki zmęczenia kierowcy poprzez analizę zachowań
- **Wykrywanie rozproszenia uwagi** - identyfikuje sytuacje, gdy kierowca jest rozproszony
- **Analiza stylu jazdy** - monitoruje gwałtowne hamowanie, przyspieszanie i inne wzorce jazdy
- **Alerty zapobiegania kolizjom** - ostrzega o potencjalnych zagrożeniach na drodze
- **System coachingu kierowców** - dostarcza wskazówki i szkolenia dla kierowców
- **Telematyka wideo** - integruje nagrania wideo z danymi telematycznymi
- **Rankingi bezpieczeństwa kierowców** - porównuje wyniki bezpieczeństwa między kierowcami

#### Stany (hooks):
- `alerts` - dane alertów bezpieczeństwa
- `selectedAlert` - wybrany alert do szczegółowego widoku
- `driverRanking` - ranking kierowców
- `drivingStyle` - dane analizy stylu jazdy
- `coachingSessions` - dane sesji coachingowych
- `videoTelematics` - dane telematyki wideo
- `filters` - filtry dla alertów (typ, czas, wyszukiwanie, strona)
- `activeTab` - aktywna zakładka tematyczna
- `isLoading` - stan ładowania
- `isDetailLoading` - stan ładowania szczegółów
- `error` - stan błędu
- `useMockData` - przełącznik źródła danych (API vs Mock)

#### Integracja z API:
- Komponent korzysta z `driverSafetyService` lub `mockDriverSafetyService` w zależności od stanu przełącznika `useMockData`
- Domyślnie używane są dane mockowe, co pozwala na działanie aplikacji bez backendu
- API udostępnia metody: `getAlerts()`, `getAlertDetails()`, `getDriverRanking()`, `getDriverStyle()`, `getCoachingSessions()`, `getVideoTelematics()`

#### Obsługa błędów:
- Wyświetlanie komunikatu o błędzie, gdy nie można pobrać danych
- Osobna obsługa błędów dla głównych danych i szczegółów
- Logowanie błędów do konsoli

#### Responsywność:
- Układ dostosowuje się do różnych rozmiarów ekranu
- Zastosowano media queries dla różnych breakpointów
- Tabele i wykresy dostosowują się do dostępnej przestrzeni
- Specjalne widoki dla urządzeń mobilnych

### Zarządzanie Flotą (Fleet Management)

Sekcja zarządzania flotą umożliwia kompleksowe zarządzanie pojazdami, ich wydajnością, dokumentami, historią serwisową, aktywami oraz optymalizacją tras.

#### Funkcje i metody:
- `fetchFleetData()` - pobiera dane pojazdów, zużycia paliwa, wydajności, historii serwisowej, dokumentów, aktywów i optymalizacji tras
- `handleTabChange()` - obsługuje zmianę zakładki tematycznej
- `handleFilterChange()` - obsługuje zmianę filtrów danych
- `handleSearch()` - obsługuje wyszukiwanie danych
- `handlePageChange()` - obsługuje zmianę strony w paginacji
- `handleVehicleSelect()` - obsługuje wybór pojazdu z listy
- `fetchVehicleDetails()` - pobiera szczegółowe dane wybranego pojazdu
- `handleToggleDataSource()` - przełącza między danymi z API a danymi mockowymi

#### Komponenty:
- **Zakładki tematyczne** - umożliwiają przełączanie między różnymi aspektami zarządzania flotą
- **Inwentaryzacja i śledzenie pojazdów** - prezentuje listę pojazdów z ich statusem, danymi technicznymi i lokalizacją
- **Porównanie zużycia paliwa** - analizuje i porównuje zużycie paliwa między pojazdami
- **Wskaźniki wydajności pojazdów** - monitoruje wykorzystanie, przestoje, koszty utrzymania i ogólną wydajność pojazdów
- **Śledzenie historii serwisowej** - rejestruje wszystkie serwisy, naprawy i przeglądy pojazdów
- **Zarządzanie dokumentami** - przechowuje i monitoruje dokumenty pojazdów (dowody rejestracyjne, ubezpieczenia, przeglądy)
- **Śledzenie aktywów poza pojazdami** - zarządza dodatkowymi aktywami floty (przyczepy, naczepy, wózki widłowe, terminale)
- **Optymalizacja tras** - analizuje i optymalizuje trasy pod kątem zużycia paliwa, czasu i kosztów

#### Stany (hooks):
- `activeTab` - aktywna zakładka tematyczna
- `vehicles` - dane pojazdów
- `selectedVehicle` - wybrany pojazd
- `fuelData` - dane zużycia paliwa
- `performanceData` - dane wydajności pojazdów
- `serviceHistory` - historia serwisowa
- `documents` - dokumenty pojazdów
- `assets` - aktywa poza pojazdami
- `routeData` - dane optymalizacji tras
- `kpiData` - dane KPI floty
- `filters` - filtry dla danych (status, typ, wyszukiwanie, strona)
- `isLoading` - stan ładowania danych
- `isDetailLoading` - stan ładowania szczegółów
- `error` - stan błędu
- `useMockData` - przełącznik źródła danych (API vs Mock)

#### Integracja z API:
- Komponent korzysta z `fleetManagementService` lub `mockFleetManagementService` w zależności od stanu przełącznika `useMockData`
- Domyślnie używane są dane mockowe, co pozwala na działanie aplikacji bez backendu
- API udostępnia metody: `getVehicles()`, `getVehicleDetails()`, `getFuelConsumption()`, `getVehiclePerformance()`, `getServiceHistory()`, `getDocuments()`, `getNonVehicleAssets()`, `getRouteOptimization()`, `getFleetKPIs()`

#### Obsługa błędów:
- Wyświetlanie komunikatu o błędzie, gdy nie można pobrać danych
- Osobna obsługa błędów dla głównych danych i szczegółów
- Logowanie błędów do konsoli

#### Responsywność:
- Układ dostosowuje się do różnych rozmiarów ekranu
- Zastosowano media queries dla różnych breakpointów
- Tabele i wykresy dostosowują się do dostępnej przestrzeni
- Specjalne widoki dla urządzeń mobilnych

### Zarządzanie Kierowcami (Drivers)

Sekcja zarządzania kierowcami umożliwia kompleksowe zarządzanie personelem kierowców, ich profilami, wydajnością, dokumentami, harmonogramem oraz lokalizacją w czasie rzeczywistym.

#### Funkcje i metody:
- `fetchDriversData()` - pobiera listę kierowców, dane KPI i szczegóły wybranego kierowcy
- `handleDriverSelect()` - obsługuje wybór kierowcy z listy
- `fetchDriverDetails()` - pobiera szczegółowe dane wybranego kierowcy
- `handleFilterChange()` - obsługuje zmianę filtrów listy kierowców
- `handleSearch()` - obsługuje wyszukiwanie kierowców
- `handlePageChange()` - obsługuje zmianę strony w paginacji listy kierowców
- `handleToggleDataSource()` - przełącza między danymi z API a danymi mockowymi

#### Komponenty:
- **Zakładki tematyczne** - umożliwiają przełączanie między różnymi widokami (przegląd, szczegóły, wydajność, dokumenty, harmonogram, mapa)
- **Sekcja KPI** - wyświetla kluczowe wskaźniki dotyczące floty kierowców (aktywni kierowcy, średnia ocena wydajności, aktualne dokumenty, wskaźnik absencji)
- **Lista kierowców** - tabela z wszystkimi kierowcami, ich statusem, przypisanymi pojazdami i podstawowymi statystykami
- **Szczegóły kierowcy** - prezentuje szczegółowe informacje o wybranym kierowcy (dane osobowe, zatrudnienie, kwalifikacje)
- **Wydajność kierowcy** - wyświetla dane wydajności kierowcy z wykresami (przejechane kilometry, zużycie paliwa, terminowość dostaw, styl jazdy)
- **Dokumenty kierowcy** - zarządza dokumentami kierowcy (prawo jazdy, certyfikaty, badania) z alertami o zbliżających się terminach ważności
- **Harmonogram kierowcy** - prezentuje zaplanowane trasy, szkolenia, urlopy i inne aktywności
- **Mapa kierowców** - wizualizuje lokalizacje kierowców na mapie Polski w czasie rzeczywistym

#### Komponenty pomocnicze:
- **DriverDetails** - komponent wyświetlający szczegółowe informacje o kierowcy
- **DriverPerformance** - komponent prezentujący dane wydajności kierowcy z wykresami
- **DriverDocuments** - komponent zarządzający dokumentami kierowcy
- **DriverMap** - komponent wizualizujący lokalizacje kierowców na mapie

#### Stany (hooks):
- `drivers` - lista kierowców
- `selectedDriver` - wybrany kierowca
- `driverDocuments` - dokumenty kierowcy
- `performanceData` - dane wydajności kierowcy
- `driverSchedule` - harmonogram kierowcy
- `kpiData` - dane KPI kierowców
- `filters` - filtry dla listy kierowców (status, pojazd, wyszukiwanie, strona)
- `activeTab` - aktywna zakładka tematyczna
- `isLoading` - stan ładowania listy kierowców
- `isDetailLoading` - stan ładowania szczegółów kierowcy
- `error` - stan błędu
- `useMockData` - przełącznik źródła danych (API vs Mock)

#### Integracja z API:
- Komponent korzysta z `driversService` lub `mockDriversService` w zależności od stanu przełącznika `useMockData`
- Domyślnie używane są dane mockowe, co pozwala na działanie aplikacji bez backendu
- API udostępnia metody: `getDrivers()`, `getDriverDetails()`, `getDriverDocuments()`, `getDriverPerformance()`, `getDriverSchedule()`, `getDriversKPI()`

#### Obsługa błędów:
- Wyświetlanie komunikatu o błędzie, gdy nie można pobrać danych
- Osobna obsługa błędów dla głównych danych i szczegółów
- Logowanie błędów do konsoli

#### Responsywność:
- Układ dostosowuje się do różnych rozmiarów ekranu
- Zastosowano media queries dla różnych breakpointów
- Tabele i wykresy dostosowują się do dostępnej przestrzeni
- Specjalne widoki dla urządzeń mobilnych

### Pojazdy (Vehicles)

Sekcja pojazdów umożliwia kompleksowe zarządzanie flotą pojazdów, ich stanem technicznym, częściami, oponami oraz monitorowanie kluczowych wskaźników wydajności.

#### Funkcje i metody:
- `fetchVehiclesData()` - pobiera dane KPI, listę pojazdów i szczegóły wybranego pojazdu
- `handleVehicleSelect()` - obsługuje wybór pojazdu z listy
- `fetchVehicleDetails()` - pobiera szczegółowe dane wybranego pojazdu
- `handleFilterChange()` - obsługuje zmianę filtrów listy pojazdów
- `handleSearch()` - obsługuje wyszukiwanie pojazdów
- `handlePageChange()` - obsługuje zmianę strony w paginacji listy pojazdów
- `handleExportData()` - obsługuje eksport danych do CSV/PDF
- `handleToggleDataSource()` - przełącza między danymi z API a danymi mockowymi

#### Podstrony:
- **Overview (Przegląd)** - główny widok z dashboardem KPI, mapą floty, listą pojazdów i statystykami
- **Maintenance (Konserwacja)** - zarządzanie harmonogramem przeglądów, napraw i serwisów
- **Parts (Części)** - inwentaryzacja i zarządzanie częściami zamiennymi
- **Tires (Opony)** - zarządzanie oponami, ich stanem, rotacją i wymianą sezonową

### Road Tolls (Opłaty Drogowe)

Sekcja Road Tolls umożliwia kompleksowe zarządzanie opłatami drogowymi, transponderami, naruszeniami, raportami wydatków oraz optymalizacją tras w celu minimalizacji kosztów opłat drogowych.

#### Funkcje i metody:
- `loadDashboardData()` - pobiera dane KPI, mapę aktywności opłat drogowych, trendy wydatków i alerty
- `loadTransponders()` - pobiera listę transponderów z możliwością filtrowania
- `loadTransponderDetails()` - pobiera szczegółowe informacje o wybranym transponderze
- `loadViolations()` - pobiera rejestr naruszeń z możliwością filtrowania
- `loadViolationDetails()` - pobiera szczegółowe informacje o wybranym naruszeniu
- `loadExpenseReports()` - pobiera raporty wydatków na opłaty drogowe z różnymi opcjami grupowania
- `loadTollOperators()` - pobiera informacje o operatorach opłat drogowych
- `loadRouteOptimization()` - pobiera dane optymalizacji tras z porównaniem kosztów
- `handleTabChange()` - obsługuje zmianę głównej zakładki
- `handleTransponderFilterChange()` - obsługuje zmianę filtrów transponderów
- `handleViolationFilterChange()` - obsługuje zmianę filtrów naruszeń
- `handleReportFilterChange()` - obsługuje zmianę filtrów raportów
- `handleExportData()` - obsługuje eksport danych do CSV/PDF
- `handleToggleDataSource()` - przełącza między danymi z API a danymi mockowymi

#### Komponenty:
- **Dashboard** - wyświetla KPI, mapę aktywności opłat drogowych, trendy wydatków i alerty
- **Transponders** - zarządza urządzeniami do automatycznego poboru opłat
- **Violations** - monitoruje i zarządza naruszeniami opłat drogowych
- **Expense Reports** - generuje raporty wydatków na opłaty drogowe
- **Toll Operators** - dostarcza informacje o operatorach opłat drogowych
- **Route Optimization** - optymalizuje trasy pod kątem minimalizacji kosztów opłat drogowych

#### Stany (hooks):
- `activeTab` - aktywna zakładka główna
- `dashboardData` - dane dashboardu
- `transponders` - lista transponderów
- `selectedTransponder` - wybrany transponder
- `violations` - lista naruszeń
- `selectedViolation` - wybrane naruszenie
- `expenseReports` - dane raportów wydatków
- `tollOperators` - lista operatorów opłat drogowych
- `routeOptimization` - dane optymalizacji tras
- `filters` - filtry dla różnych list (status, pojazd, data, wyszukiwanie, strona)
- `isLoading` - stan ładowania danych
- `isDetailLoading` - stan ładowania szczegółów
- `error` - stan błędu
- `useMockData` - przełącznik źródła danych (API vs Mock)

#### Integracja z API:
- Komponent korzysta z `roadTollsService` lub `mockRoadTollsService` w zależności od stanu przełącznika `useMockData`
- Domyślnie używane są dane mockowe, co pozwala na działanie aplikacji bez backendu
- API udostępnia metody: `getDashboardData()`, `getTransponders()`, `getTransponderDetails()`, `getViolations()`, `getViolationDetails()`, `getExpenseReports()`, `getTollOperators()`, `getRouteOptimization()`

#### Obsługa błędów:
- Wyświetlanie komunikatu o błędzie, gdy nie można pobrać danych
- Osobna obsługa błędów dla głównych danych i szczegółów
- Logowanie błędów do konsoli

#### Responsywność:
- Układ dostosowuje się do różnych rozmiarów ekranu
- Zastosowano media queries dla różnych breakpointów
- Tabele i wykresy dostosowują się do dostępnej przestrzeni
- Specjalne widoki dla urządzeń mobilnych

### Ferry Bookings (Rezerwacje Promów)

Sekcja Ferry Bookings umożliwia kompleksowe zarządzanie rezerwacjami przepraw promowych, wyszukiwanie połączeń, zarządzanie pojazdami i kierowcami przypisanymi do przepraw, oraz analizę kosztów i optymalizację tras.

#### Funkcje i metody:
- `loadDashboardData()` - pobiera dane KPI, mapę aktywności przepraw, nadchodzące przeprawy i alerty
- `searchConnections()` - wyszukuje dostępne połączenia promowe według kryteriów
- `loadBookings()` - pobiera listę rezerwacji z możliwością filtrowania
- `loadBookingDetails()` - pobiera szczegółowe informacje o wybranej rezerwacji
- `createBooking()` - tworzy nową rezerwację przeprawy
- `updateBooking()` - aktualizuje istniejącą rezerwację
- `cancelBooking()` - anuluje rezerwację
- `loadOperators()` - pobiera informacje o operatorach promowych
- `loadRoutes()` - pobiera informacje o trasach promowych
- `loadPricing()` - pobiera informacje o cennikach przepraw
- `loadVehicleAvailability()` - sprawdza dostępność pojazdów w danym terminie
- `loadDriverAvailability()` - sprawdza dostępność kierowców w danym terminie
- `loadBookingHistory()` - pobiera historię rezerwacji
- `generateReport()` - generuje raport z analizą kosztów przepraw
- `handleTabChange()` - obsługuje zmianę głównej zakładki
- `handleFilterChange()` - obsługuje zmianę filtrów dla różnych list
- `handleExportData()` - obsługuje eksport danych do CSV/PDF
- `handleToggleDataSource()` - przełącza między danymi z API a danymi mockowymi

#### Komponenty:
- **Dashboard** - wyświetla KPI, mapę aktywności przepraw, nadchodzące przeprawy i alerty
- **Search Connections** - wyszukuje dostępne połączenia promowe
- **Bookings Management** - zarządza rezerwacjami przepraw
- **Operators** - dostarcza informacje o operatorach promowych
- **Routes & Pricing** - prezentuje informacje o trasach i cennikach
- **Vehicle & Driver Management** - zarządza przypisaniem pojazdów i kierowców do przepraw
- **Reports & Analytics** - generuje raporty i analizy kosztów przepraw

#### Stany (hooks):
- `activeTab` - aktywna zakładka główna
- `dashboardData` - dane dashboardu
- `searchParams` - parametry wyszukiwania połączeń
- `searchResults` - wyniki wyszukiwania połączeń
- `bookings` - lista rezerwacji
- `selectedBooking` - wybrana rezerwacja
- `operators` - lista operatorów promowych
- `routes` - lista tras promowych
- `pricing` - dane cenników
- `vehicleAvailability` - dostępność pojazdów
- `driverAvailability` - dostępność kierowców
- `bookingHistory` - historia rezerwacji
- `reportData` - dane raportu
- `filters` - filtry dla różnych list (status, operator, trasa, data, wyszukiwanie, strona)
- `isLoading` - stan ładowania danych
- `isDetailLoading` - stan ładowania szczegółów
- `error` - stan błędu
- `useMockData` - przełącznik źródła danych (API vs Mock)

#### Integracja z API:
- Komponent korzysta z `ferryBookingsService` lub `mockFerryBookingsService` w zależności od stanu przełącznika `useMockData`
- Domyślnie używane są dane mockowe, co pozwala na działanie aplikacji bez backendu
- API udostępnia metody: `getDashboardData()`, `searchConnections()`, `getBookings()`, `getBookingDetails()`, `createBooking()`, `updateBooking()`, `cancelBooking()`, `getOperators()`, `getRoutes()`, `getPricing()`, `getVehicleAvailability()`, `getDriverAvailability()`, `getBookingHistory()`, `generateReport()`

#### Obsługa błędów:
- Wyświetlanie komunikatu o błędzie, gdy nie można pobrać danych
- Osobna obsługa błędów dla głównych danych i szczegółów
- Logowanie błędów do konsoli

#### Responsywność:
- Układ dostosowuje się do różnych rozmiarów ekranu
- Zastosowano media queries dla różnych breakpointów
- Tabele i wykresy dostosowują się do dostępnej przestrzeni
- Specjalne widoki dla urządzeń mobilnych

### Geofencing (Strefy Geograficzne)

Sekcja Geofencing umożliwia tworzenie wirtualnych granic geograficznych (geofences) wokół określonych lokalizacji, monitorowanie przekraczania tych granic przez pojazdy floty oraz generowanie alertów i raportów na podstawie tych zdarzeń.

#### Funkcje i metody:
- `loadDashboardData()` - pobiera dane KPI, mapę stref geofencingu, alerty i statystyki wykorzystania stref
- `loadGeofences()` - pobiera listę stref geofencingu z możliwością filtrowania
- `loadGeofenceDetails()` - pobiera szczegółowe informacje o wybranej strefie
- `createGeofence()` - tworzy nową strefę geofencingu
- `updateGeofence()` - aktualizuje istniejącą strefę
- `deleteGeofence()` - usuwa strefę
- `loadViolations()` - pobiera listę naruszeń stref z możliwością filtrowania
- `loadTimeInZoneReports()` - pobiera raporty czasu spędzonego w strefach
- `configureAlertRule()` - konfiguruje regułę alertu dla strefy
- `loadAlertRules()` - pobiera listę reguł alertów
- `updateAlertRule()` - aktualizuje istniejącą regułę alertu
- `deleteAlertRule()` - usuwa regułę alertu
- `optimizeRouteWithGeofences()` - optymalizuje trasę z uwzględnieniem stref geofencingu
- `exportGeofencingReport()` - eksportuje raport geofencingu do wybranego formatu
- `handleTabChange()` - obsługuje zmianę głównej zakładki
- `handleFilterChange()` - obsługuje zmianę filtrów dla różnych list
- `handleExportData()` - obsługuje eksport danych do CSV/PDF/XLSX
- `handleToggleDataSource()` - przełącza między danymi z API a danymi mockowymi

#### Komponenty:
- **GeofencingDashboard** - wyświetla KPI, mapę stref geofencingu, alerty i statystyki wykorzystania stref
- **GeofenceManager** - zarządza strefami geofencingu (tworzenie, edycja, usuwanie)
- **AlertConfiguration** - konfiguruje reguły alertów dla stref
- **GeofencingReports** - generuje i wyświetla raporty związane z geofencingiem
- **RouteIntegration** - integruje strefy geofencingu z optymalizacją tras

#### Stany (hooks):
- `activeTab` - aktywna zakładka główna
- `dashboardData` - dane dashboardu
- `geofences` - lista stref geofencingu
- `selectedGeofence` - wybrana strefa
- `violations` - lista naruszeń stref
- `timeInZoneReports` - raporty czasu spędzonego w strefach
- `alertRules` - lista reguł alertów
- `selectedAlertRule` - wybrana reguła alertu
- `optimizedRoute` - zoptymalizowana trasa z uwzględnieniem stref
- `filters` - filtry dla różnych list (kategoria, status, data, wyszukiwanie, strona)
- `isLoading` - stan ładowania danych
- `isDetailLoading` - stan ładowania szczegółów
- `error` - stan błędu
- `useMockData` - przełącznik źródła danych (API vs Mock)

#### Integracja z API:
- Komponent korzysta z `geofencingService` lub `mockGeofencingService` w zależności od stanu przełącznika `useMockData`
- Domyślnie używane są dane mockowe, co pozwala na działanie aplikacji bez backendu
- API udostępnia metody: `getGeofencingDashboard()`, `getGeofences()`, `getGeofenceDetails()`, `createGeofence()`, `updateGeofence()`, `deleteGeofence()`, `getGeofenceViolations()`, `getTimeInZoneReport()`, `configureAlertRule()`, `getAlertRules()`, `updateAlertRule()`, `deleteAlertRule()`, `optimizeRouteWithGeofences()`, `exportGeofencingReport()`

#### Współdzielenie danych z innymi komponentami:
- **Monitoring** - wykorzystuje dane o lokalizacji pojazdów w czasie rzeczywistym
- **Drivers** - wykorzystuje dane o kierowcach
- **Fleet Management** - integruje się z harmonogramem floty
- **Road Tolls** - współdzieli dane o trasach i kosztach
- **Route Optimization** - integruje strefy z optymalizacją tras

#### Obsługa błędów:
- Wyświetlanie komunikatu o błędzie, gdy nie można pobrać danych
- Osobna obsługa błędów dla głównych danych i szczegółów
- Logowanie błędów do konsoli
- Mechanizm retry dla operacji sieciowych

#### Responsywność:
- Układ dostosowuje się do różnych rozmiarów ekranu
- Zastosowano media queries dla różnych breakpointów
- Tabele i wykresy dostosowują się do dostępnej przestrzeni
- Specjalne widoki dla urządzeń mobilnych

### Ferry Bookings (Rezerwacje Promów)

Sekcja Ferry Bookings umożliwia kompleksowe zarządzanie rezerwacjami promowymi, wyszukiwanie połączeń, zarządzanie pojazdami i kierowcami przypisanymi do przepraw, monitorowanie operatorów promowych oraz analizę kosztów i optymalizację tras.

#### Funkcje i metody:
- `loadDashboardData()` - pobiera dane KPI, mapę aktywności przepraw promowych, trendy wydatków i alerty
- `loadBookingsData()` - pobiera listę rezerwacji promowych z możliwością filtrowania
- `loadBookingDetails()` - pobiera szczegółowe informacje o wybranej rezerwacji
- `loadOperatorsData()` - pobiera listę operatorów promowych z możliwością filtrowania
- `loadOperatorDetails()` - pobiera szczegółowe informacje o wybranym operatorze
- `loadConnectionsData()` - wyszukuje dostępne połączenia promowe według kryteriów
- `loadCalendarEvents()` - pobiera wydarzenia kalendarzowe związane z przeprawami
- `handleTabChange()` - obsługuje zmianę głównej zakładki
- `handleBookingSelect()` - obsługuje wybór rezerwacji z listy
- `handleOperatorSelect()` - obsługuje wybór operatora z listy
- `handleBookingsFilterChange()` - obsługuje zmianę filtrów rezerwacji
- `handleOperatorsFilterChange()` - obsługuje zmianę filtrów operatorów
- `handleConnectionsFilterChange()` - obsługuje zmianę filtrów wyszukiwania połączeń
- `handleSearchConnections()` - obsługuje wyszukiwanie połączeń

#### Komponenty:
- **Dashboard** - wyświetla kluczowe wskaźniki, mapę aktywności przepraw, nadchodzące odjazdy, alerty i trendy wydatków
- **Bookings (Rezerwacje)** - zarządza listą rezerwacji promowych z filtrowaniem i szczegółami
- **Operators (Operatorzy)** - prezentuje informacje o operatorach promowych, ich trasach i warunkach
- **Connections (Połączenia)** - umożliwia wyszukiwanie dostępnych połączeń promowych
- **Calendar (Kalendarz)** - wyświetla harmonogram przepraw w formie kalendarza

#### Stany (hooks):
- `activeTab` - aktywna zakładka główna
- `isLoading` - stan ładowania danych
- `error` - stan błędu
- `dashboardData` - dane dashboardu
- `bookings` - dane rezerwacji
- `bookingDetails` - szczegóły wybranej rezerwacji
- `operators` - dane operatorów
- `operatorDetails` - szczegóły wybranego operatora
- `connections` - dane wyszukanych połączeń
- `calendarEvents` - wydarzenia kalendarzowe
- `selectedBookingId` - ID wybranej rezerwacji
- `selectedOperatorId` - ID wybranego operatora
- `bookingsFilter` - filtry dla rezerwacji (status, wyszukiwanie, daty, strona)
- `operatorsFilter` - filtry dla operatorów (kraj, wyszukiwanie, strona)
- `connectionsFilter` - filtry dla wyszukiwania połączeń (początek, cel, daty, typ pojazdu)
- `dataLoadedRef` - referencja do śledzenia załadowanych danych
- `searchTimerRef` - referencja do timera opóźniającego wyszukiwanie

#### Integracja z API:
- Komponent korzysta z `ferryBookingsService` lub `mockFerryBookingsService` w zależności od konfiguracji
- Domyślnie używane są dane mockowe, co pozwala na działanie aplikacji bez backendu
- API udostępnia metody: `getFerryBookingsDashboard()`, `getFerryBookings()`, `getFerryBookingDetails()`, `getFerryOperators()`, `getFerryOperatorDetails()`, `searchFerryConnections()`, `getCalendarEvents()`

#### Współdzielenie danych z innymi komponentami:
- **Drivers** - wykorzystanie danych o kierowcach i ich dostępności
- **Vehicles** - wykorzystanie danych o pojazdach i ich parametrach
- **Route Optimization** - współdzielenie danych o trasach i kosztach
- **Road Tolls** - współdzielenie danych o kosztach opłat drogowych

#### Obsługa błędów:
- Wyświetlanie komunikatu o błędzie, gdy nie można pobrać danych
- Osobna obsługa błędów dla głównych danych i szczegółów
- Logowanie błędów do konsoli
- Mechanizm debounce dla filtrów wyszukiwania, aby uniknąć zbyt częstych wywołań API

#### Responsywność:
- Układ dostosowuje się do różnych rozmiarów ekranu
- Zastosowano media queries dla różnych breakpointów
- Tabele i wykresy dostosowują się do dostępnej przestrzeni
- Specjalne widoki dla urządzeń mobilnych()` - obsługuje zmianę filtrów naruszeń
- `handleReportFilterChange()` - obsługuje zmianę filtrów raportów
- `handleRouteFilterChange()` - obsługuje zmianę filtrów optymalizacji tras
- `handleToggleDataSource()` - przełącza między danymi z API a danymi mockowymi

#### Zakładki:
- **Dashboard** - główny widok z KPI i mapą aktywności opłat drogowych
- **Transpondery** - zarządzanie transponderami z filtrowaniem i szczegółami
- **Naruszenia** - rejestr naruszeń z filtrowaniem i szczegółami
- **Raporty wydatków** - raporty wydatków z różnymi opcjami grupowania
- **Operatorzy opłat** - informacje o operatorach opłat drogowych
- **Optymalizacja tras** - optymalizacja tras z porównaniem kosztów

#### Stany (hooks):
- `kpiData` - dane KPI
- `mapData` - dane mapy aktywności opłat drogowych
- `expenseTrends` - trendy wydatków na opłaty drogowe
- `alerts` - alerty dotyczące opłat drogowych
- `transponders` - lista transponderów
- `selectedTransponder` - wybrany transponder
- `violations` - rejestr naruszeń
- `selectedViolation` - wybrane naruszenie
- `expenseReports` - raporty wydatków
- `tollOperators` - operatorzy opłat drogowych
- `routeOptimization` - dane optymalizacji tras
- `activeTab` - aktywna zakładka
- `isLoading` - stan ładowania
- `error` - stan błędu
- `useMockData` - przełącznik źródła danych (API vs Mock)

#### Integracja z API:
- Komponent korzysta z `roadTollsService` lub `mockRoadTollsService` w zależności od stanu przełącznika `useMockData`
- Domyślnie używane są dane mockowe, co pozwala na działanie aplikacji bez backendu
- API udostępnia metody: `getRoadTollsDashboard()`, `getTransponders()`, `getTransponderDetails()`, `getViolations()`, `getViolationDetails()`, `getExpenseReports()`, `getTollOperators()`, `getRouteOptimization()`

#### Obsługa błędów:
- Wyświetlanie komunikatu o błędzie, gdy nie można pobrać danych
- Osobna obsługa błędów dla różnych typów danych
- Logowanie błędów do konsoli

#### Responsywność:
- Układ dostosowuje się do różnych rozmiarów ekranu
- Tabele i wykresy dostosowują się do dostępnej przestrzeni
- Mapy są responsywne i dostosowują się do rozmiaru kontenera

### Route Optimization (Optymalizacja Tras)

Sekcja Route Optimization służy do optymalizacji tras pojazdów w celu minimalizacji kosztów opłat drogowych, zużycia paliwa, czasu przejazdu oraz emisji CO2. Umożliwia porównanie tras standardowych z alternatywnymi, wizualizację punktów poboru opłat oraz integrację z systemem transponderów.

#### Funkcje i metody:
- `loadRouteOptimization()` - pobiera dane optymalizacji tras na podstawie podanych filtrów
- `loadTollPoints()` - pobiera dane punktów poboru opłat
- `loadTransponders()` - pobiera dane transponderów (przekierowuje do komponentu Road Tolls)
- `loadRouteDetails()` - pobiera szczegółowe informacje o wybranej trasie
- `handleRouteSearch()` - obsługuje wyszukiwanie tras
- `handleTabChange()` - obsługuje zmianę zakładki (w tym przekierowanie do Road Tolls)
- `handleRouteFilterChange()` - obsługuje zmianę filtrów podstawowych tras
- `handleAdvancedFilterChange()` - obsługuje zmianę filtrów zaawansowanych
- `handleToggleAdvancedFilters()` - obsługuje pokazywanie/ukrywanie filtrów zaawansowanych
- `handleMapViewChange()` - obsługuje zmianę widoku mapy
- `handleToggleTollPoints()` - obsługuje pokazywanie/ukrywanie punktów poboru opłat na mapie
- `handleToggleTrafficData()` - obsługuje pokazywanie/ukrywanie danych o ruchu drogowym
- `handleToggleDataSource()` - przełącza między danymi z API a danymi mockowymi
- `formatCurrency()` - formatuje wartości walutowe
- `formatDate()` - formatuje daty
- `calculateSavingsPercentage()` - oblicza procent oszczędności między trasą standardową a alternatywną

#### Zakładki główne:
- **Wyszukiwanie tras** - umożliwia wyszukiwanie i porównywanie tras
- **Punkty poboru opłat** - wyświetla mapę i listę punktów poboru opłat
- **Transpondery** - przekierowuje do sekcji transponderów w komponencie Road Tolls

#### Podkomponenty:
- **Formularz wyszukiwania** - zawiera filtry podstawowe i zaawansowane
- **Karta trasy** - wyświetla informacje o trasie standardowej i alternatywnej
- **Mapa tras** - wizualizuje trasy standardowe i alternatywne
- **Porównanie tras** - szczegółowe porównanie kosztów, czasu, dystansu i emisji
- **Mapa punktów poboru opłat** - wizualizuje punkty poboru opłat na mapie
- **Lista punktów poboru opłat** - tabela z informacjami o punktach poboru opłat

#### Stany (hooks):
- `routeOptimization` - dane optymalizacji tras
- `selectedRoute` - wybrana trasa do szczegółowego widoku
- `tollPoints` - dane punktów poboru opłat
- `transponders` - dane transponderów
- `routeComparison` - dane porównania tras
- `activeTab` - aktywna zakładka główna
- `activeSubTab` - aktywna podzakładka
- `isLoading` - stan ładowania
- `error` - stan błędu
- `useMockData` - przełącznik źródła danych (API vs Mock)
- `showAdvancedFilters` - stan widoczności filtrów zaawansowanych
- `routeFilters` - filtry podstawowe tras (początek, cel, typ pojazdu, kryterium optymalizacji)
- `advancedFilters` - filtry zaawansowane (czas wyjazdu/przyjazdu, maksymalny objazd, unikanie autostrad/opłat)
- `mapView` - widok mapy
- `showTollPoints` - stan widoczności punktów poboru opłat na mapie
- `showTrafficData` - stan widoczności danych o ruchu drogowym

#### Współdzielone dane i komponenty z Road Tolls:

##### Współdzielone serwisy API:
- `roadTollsService` - serwis API do pobierania danych o opłatach drogowych
- `mockRoadTollsService` - mockowy serwis do testowania bez backendu

##### Współdzielone metody API:
- `getRouteOptimization()` - pobiera dane optymalizacji tras
  - Używane w Road Tolls w zakładce "optimization"
  - Używane w Route Optimization jako główne źródło danych
- `getTransponders()` - pobiera dane transponderów
  - Używane w Road Tolls w zakładce "transponders"
  - Używane w Route Optimization do integracji z transponderami
- `getTollPoints()` - pobiera dane punktów poboru opłat
  - Używane w Road Tolls do wizualizacji na mapie
  - Używane w Route Optimization w zakładce "toll_points"

##### Współdzielone struktury danych:
1. **Punkty poboru opłat (Toll Points)**
   - Identyfikator, nazwa, droga, kraj, operator
   - Stawki dla ciężarówek i samochodów osobowych
   - Metody płatności, współrzędne geograficzne
2. **Transpondery (Transponders)**
   - Identyfikator, numer seryjny, status
   - Przypisany pojazd i kierowca
   - Daty ważności, operator, saldo
3. **Optymalizacja tras (Route Optimization)**
   - Trasy standardowe i alternatywne
   - Koszty opłat drogowych, paliwa i całkowite
   - Potencjalne oszczędności, liczba punktów poboru opłat

##### Mechanizm przekierowania:
- Kliknięcie w zakładkę "Transpondery" w Route Optimization przekierowuje do komponentu Road Tolls z aktywną zakładką "transponders"
- Przekierowanie wykorzystuje hook `useNavigate` z React Router
- Stan przekierowania jest przekazywany przez `location.state`
- Komponent Road Tolls sprawdza `location.state` przy montowaniu i ustawia odpowiednią zakładkę

#### Integracja z API:
- Komponent korzysta z `roadTollsService` lub `mockRoadTollsService` w zależności od stanu przełącznika `useMockData`
- Domyślnie używane są dane mockowe, co pozwala na działanie aplikacji bez backendu
- API udostępnia metody: `getRouteOptimization()`, `getTollPoints()`, `getTransponders()`

#### Obsługa błędów:
- Wyświetlanie komunikatu o błędzie, gdy nie można pobrać danych
- Logowanie błędów do konsoli
- Osobna obsługa błędów dla różnych typów danych

#### Responsywność:
- Układ dostosowuje się do różnych rozmiarów ekranu
- Formularze i tabele dostosowują się do dostępnej przestrzeni
- Mapy są responsywne i dostosowują się do rozmiaru kontenera
### Geofencing (Wirtualne granice geograficzne)

Sekcja Geofencing umożliwia tworzenie wirtualnych granic geograficznych, monitorowanie przekraczania tych granic przez pojazdy floty, generowanie alertów oraz analizę danych związanych z geofencingiem.

#### Funkcje i metody:
- `loadDashboardData()` - pobiera dane KPI, mapę stref, alerty i statystyki wykorzystania stref
- `loadGeofences()` - pobiera listę stref geofencingu z możliwością filtrowania
- `createGeofence()` - tworzy nową strefę geofencingu
- `updateGeofence()` - aktualizuje istniejącą strefę geofencingu
- `deleteGeofence()` - usuwa strefę geofencingu
- `loadViolations()` - pobiera naruszenia stref z możliwością filtrowania
- `loadAlertRules()` - pobiera reguły alertów
- `configureAlertRule()` - konfiguruje nową regułę alertu
- `updateAlertRule()` - aktualizuje istniejącą regułę alertu
- `deleteAlertRule()` - usuwa regułę alertu
- `loadTimeInZoneReport()` - pobiera raport czasu spędzonego w strefach
- `exportReport()` - eksportuje raport w wybranym formacie (PDF, CSV, XLSX)
- `optimizeRoute()` - optymalizuje trasę z uwzględnieniem stref geofencingu
- `handleTabChange()` - obsługuje zmianę zakładki w interfejsie
- `handleToggleDataSource()` - przełącza między danymi z API a danymi mockowymi

#### Komponenty:
- **GeofencingDashboard** - wyświetla KPI, mapę stref i pojazdów, alerty oraz statystyki wykorzystania stref
- **GeofenceManager** - umożliwia zarządzanie strefami geofencingu (tworzenie, edycja, usuwanie)
- **AlertConfiguration** - pozwala na konfigurację reguł alertów dla stref geofencingu
- **GeofencingReports** - generuje i wyświetla raporty związane z geofencingiem
- **RouteIntegration** - integruje strefy geofencingu z optymalizacją tras

#### Stany (hooks):
- `activeTab` - aktywna zakładka w interfejsie
- `geofences` - lista stref geofencingu
- `selectedGeofence` - wybrana strefa geofencingu
- `violations` - lista naruszeń stref
- `alertRules` - lista reguł alertów
- `dashboardData` - dane dashboardu (KPI, mapa, alerty, statystyki)
- `timeInZoneReports` - dane raportów czasu w strefach
- `optimizedRoute` - dane zoptymalizowanej trasy
- `filters` - filtry dla list (kategoria, status, wyszukiwanie, strona)
- `isLoading` - stan ładowania danych
- `error` - stan błędu
- `useMockData` - przełącznik źródła danych (API vs Mock)

#### Źródła danych:
- Komponent korzysta z `geofencingService` lub `mockGeofencingService` w zależności od stanu przełącznika `useMockData`
- Domyślnie używane są dane mockowe, co pozwala na działanie aplikacji bez backendu
- Dane mockowe zawierają przykładowe strefy geofencingu, naruszenia, reguły alertów, raporty i dane dashboardu
- W środowisku produkcyjnym dane byłyby pobierane z rzeczywistego API

#### Struktura danych:
1. **Strefy geofencingu**
   - Każda strefa ma: ID, nazwę, opis, typ (wielokąt/okrąg), współrzędne, kategorię, status, harmonogram i metadane
   - Kategorie stref: magazyn, klient, strefa zakazana, strefa niebezpieczna, korytarz transportowy

2. **Naruszenia stref**
   - Każde naruszenie zawiera: ID, dane strefy, dane pojazdu, dane kierowcy, typ naruszenia (wjazd/wyjazd/przekroczenie czasu), timestamp, współrzędne, czas pobytu, prędkość, kierunek, status potwierdzenia

3. **Reguły alertów**
   - Każda reguła zawiera: ID, dane strefy, nazwę, opis, typ wyzwalacza, próg czasu pobytu, harmonogram, odbiorców, priorytet, status

4. **Raporty czasu w strefie**
   - Każdy raport zawiera: dane strefy, dane pojazdu, dane kierowcy, datę, liczbę wjazdów/wyjazdów, całkowity czas w strefie, średni czas na wizytę, pierwszy wjazd, ostatni wyjazd

#### Integracja z innymi komponentami:
- **Monitoring** - wykorzystuje dane o lokalizacji pojazdów w czasie rzeczywistym
- **Drivers** - wykorzystuje dane o kierowcach
- **Vehicles** - wykorzystuje dane o pojazdach
- **Fleet Management** - integruje się z harmonogramem floty
- **Road Tolls** - wykorzystuje dane o opłatach drogowych do optymalizacji tras

#### Obsługa błędów:
- Wyświetlanie komunikatu o błędzie, gdy nie można pobrać danych
- Osobna obsługa błędów dla różnych operacji (pobieranie, tworzenie, aktualizacja, usuwanie)
- Logowanie błędów do konsoli

#### Responsywność:
- Układ dostosowuje się do różnych rozmiarów ekranu
- Zastosowano styled-components z media queries dla różnych breakpointów
- Mapa i tabele dostosowują się do dostępnej przestrzeni
- Specjalne widoki dla urządzeń mobilnych

#### Korzyści biznesowe:
1. **Zwiększenie bezpieczeństwa**
   - Monitorowanie wjazdu pojazdów do stref niebezpiecznych
   - Alerty o nieautoryzowanym użyciu pojazdów poza godzinami pracy
   - Ochrona przed kradzieżą pojazdów i sprzętu

2. **Optymalizacja operacji**
   - Redukcja czasu oczekiwania poprzez powiadomienia o przybyciu
   - Monitorowanie czasu spędzonego w lokalizacjach klientów
   - Identyfikacja nieefektywnych tras i postojów

3. **Zgodność z przepisami**
   - Monitorowanie przestrzegania ograniczeń drogowych
   - Śledzenie czasu pracy kierowców w określonych strefach
   - Dokumentowanie tras dla celów regulacyjnych

4. **Redukcja kosztów**
   - Zmniejszenie zużycia paliwa poprzez eliminację nieautoryzowanych podróży
   - Optymalizacja tras z uwzględnieniem stref zakazanych
   - Redukcja kar za naruszenia przepisów

5. **Poprawa obsługi klienta**
   - Automatyczne powiadomienia o przybyciu do klienta
   - Dokładniejsze szacowanie czasu dostawy
   - Potwierdzenie wykonania usługi w określonej lokalizacji
## Document Management

Sekcja Document Management umożliwia centralne zarządzanie wszystkimi dokumentami związanymi z flotą pojazdów, kierowcami, operacjami i zgodnością z przepisami. Komponent ten zapewnia kompleksowe rozwiązanie do przechowywania, kategoryzowania, wyszukiwania i automatyzacji procesów dokumentacyjnych.

### Funkcje i metody:
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

### Komponenty:
- **DocumentsDashboard** - wyświetla KPI, alerty dokumentów i statystyki zgodności
- **VehicleDocuments** - zarządza dokumentami pojazdów (dowody rejestracyjne, ubezpieczenia, przeglądy)
- **DriverDocuments** - zarządza dokumentami kierowców (prawo jazdy, certyfikaty, badania)
- **OperationalDocuments** - zarządza dokumentami operacyjnymi (umowy, faktury, raporty)
- **ComplianceDocuments** - zarządza dokumentami zgodności z przepisami (licencje, zezwolenia, certyfikaty)
- **DocumentSearch** - zaawansowane wyszukiwanie dokumentów z filtrowaniem i sortowaniem
- **DocumentAutomation** - automatyzacja procesów dokumentacyjnych, szablony i przypomnienia

### Stany (hooks):
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

### Integracja z API:
- Komponent korzysta z `documentManagementService` lub `mockDocumentManagementService` w zależności od stanu przełącznika `useMockData`
- Domyślnie używane są dane mockowe, co pozwala na działanie aplikacji bez backendu
- API udostępnia metody:
  - `getDocumentsDashboard()` - pobiera dane dashboardu dokumentów
  - `getDocuments()` - pobiera listę dokumentów z filtrowaniem
  - `getDocumentDetails()` - pobiera szczegóły dokumentu
  - `uploadDocument()` - przesyła nowy dokument
  - `updateDocument()` - aktualizuje istniejący dokument
  - `deleteDocument()` - usuwa dokument
  - `getDocumentCategories()` - pobiera kategorie dokumentów
  - `getDocumentTemplates()` - pobiera szablony dokumentów
  - `createDocumentTemplate()` - tworzy nowy szablon
  - `generateDocument()` - generuje dokument z szablonu
  - `getAutomationRules()` - pobiera reguły automatyzacji
  - `createAutomationRule()` - tworzy regułę automatyzacji
  - `getReminderSettings()` - pobiera ustawienia przypomnień
  - `updateReminderSettings()` - aktualizuje ustawienia przypomnień

### Struktury danych:
- **Document** - struktura dokumentu:
  ```javascript
  {
    id: "doc-001",
    name: "Dowód rejestracyjny",
    type: "vehicle", // vehicle, driver, operational, compliance
    category: "registration",
    vehicleId: "veh-001", // tylko dla dokumentów pojazdów
    vehiclePlate: "WA 12345", // tylko dla dokumentów pojazdów
    driverId: "drv-001", // tylko dla dokumentów kierowców
    driverName: "Adam Nowak", // tylko dla dokumentów kierowców
    issueDate: "2024-01-15",
    expiryDate: "2025-01-14",
    status: "active", // active, expired, pending, archived
    fileUrl: "/documents/doc-001.pdf",
    fileType: "pdf",
    fileSize: 1024, // w KB
    tags: ["rejestracja", "pojazd"],
    notes: "Dokument odnowiony w styczniu 2024",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
    createdBy: "user-001",
    lastViewedAt: "2024-03-20T14:45:00Z"
  }
  ```

- **DocumentCategory** - struktura kategorii dokumentów:
  ```javascript
  {
    id: "cat-001",
    code: "registration",
    name: "Dokumenty rejestracyjne",
    type: "vehicle",
    description: "Dokumenty rejestracyjne pojazdów",
    requiredForCompliance: true,
    defaultExpiryPeriod: 365, // w dniach
    reminderDays: [30, 14, 7, 1] // dni przed wygaśnięciem do wysłania przypomnienia
  }
  ```

- **DocumentTemplate** - struktura szablonu dokumentu:
  ```javascript
  {
    id: "template-001",
    name: "Szablon umowy przewozu",
    category: "contracts",
    description: "Standardowa umowa przewozu towarów",
    fileUrl: "/templates/contract-template.docx",
    fields: [
      { name: "companyName", label: "Nazwa firmy", type: "text", required: true },
      { name: "contractDate", label: "Data umowy", type: "date", required: true },
      { name: "vehicleDetails", label: "Dane pojazdu", type: "text", required: true }
    ],
    createdAt: "2024-01-10T09:15:00Z",
    updatedAt: "2024-02-20T11:30:00Z"
  }
  ```

- **AutomationRule** - struktura reguły automatyzacji:
  ```javascript
  {
    id: "rule-001",
    name: "Automatyczne przypomnienia o wygasających dokumentach",
    description: "Wysyła przypomnienia o dokumentach wygasających w ciągu 30 dni",
    active: true,
    trigger: "document_expiry",
    conditions: [
      { field: "daysToExpiry", operator: "<=", value: 30 },
      { field: "status", operator: "==", value: "active" }
    ],
    actions: [
      { type: "notification", description: "Wyślij powiadomienie email" },
      { type: "status_update", description: "Oznacz dokument jako wymagający uwagi" }
    ],
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
    lastRun: "2024-03-20T00:00:00Z"
  }
  ```

- **ReminderSettings** - struktura ustawień przypomnień:
  ```javascript
  {
    defaultSchedule: [30, 14, 7, 1], // dni przed wygaśnięciem
    notificationMethods: [
      { name: "Email", active: true },
      { name: "System", active: true },
      { name: "SMS", active: false }
    ],
    escalationRules: [
      {
        name: "Eskalacja do przełożonego",
        description: "Eskaluj do przełożonego, jeśli dokument wygasa w ciągu 7 dni i nie został odnowiony"
      }
    ]
  }
  ```

### Współdzielenie danych z innymi komponentami:
- **Fleet Management** - wykorzystuje dane dokumentów pojazdów
- **Drivers** - wykorzystuje dane dokumentów kierowców
- **Geofencing** - wykorzystuje dane dokumentów wymaganych dla określonych stref
- **Ferry Bookings** - wykorzystuje dane dokumentów wymaganych do przepraw promowych
- **Road Tolls** - wykorzystuje dane dokumentów wymaganych do opłat drogowych

### Źródła danych:
- Dane dokumentów są pobierane z `documentManagementService` lub `mockDocumentManagementService`
- Dane pojazdów są współdzielone z komponentem Fleet Management
- Dane kierowców są współdzielone z komponentem Drivers
- Dane kategorii dokumentów są przechowywane w mockDocumentManagementService
- Dane szablonów dokumentów są przechowywane w mockDocumentManagementService
- Dane reguł automatyzacji są przechowywane w mockDocumentManagementService

### Obsługa błędów:
- Wyświetlanie komunikatu o błędzie, gdy nie można pobrać danych
- Osobna obsługa błędów dla głównych danych i szczegółów
- Walidacja formularzy przed wysłaniem danych
- Obsługa błędów przesyłania plików
- Logowanie błędów do konsoli

### Responsywność:
- Układ dostosowuje się do różnych rozmiarów ekranu
- Zastosowano media queries dla różnych breakpointów
- Tabele i wykresy dostosowują się do dostępnej przestrzeni
- Specjalne widoki dla urządzeń mobilnych
- Optymalizacja interfejsu dla ekranów dotykowych

### Korzyści biznesowe:
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

4. **Poprawa podejmowania decyzji**
   - Kompleksowy widok statusu dokumentacji
   - Analiza trendów w zarządzaniu dokumentami
   - Identyfikacja obszarów wymagających poprawy
