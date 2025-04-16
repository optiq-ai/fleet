# Fleet App - Dokumentacja

## Przegląd projektu

Fleet App to zaawansowana aplikacja do zarządzania flotą pojazdów, która integruje funkcje wykrywania oszustw, monitorowania pojazdów, bezpieczeństwa kierowców, komunikacji i współpracy, oraz analizy danych.

## Struktura projektu

Projekt składa się z trzech głównych komponentów:
- **Frontend (react-app)** - aplikacja React z JSX
- **Backend** - serwer Node.js
- **Baza danych** - struktura SQL (PostgreSQL)

## Komponenty aplikacji

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
