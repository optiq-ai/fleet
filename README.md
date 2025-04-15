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

### Vehicles Overview (Przegląd Pojazdów)

Podstrona Overview zapewnia kompleksowy widok całej floty pojazdów z kluczowymi wskaźnikami i statystykami. Jest to główny punkt wejścia do zarządzania pojazdami, umożliwiający szybki dostęp do najważniejszych informacji o flocie.

#### Funkcje i metody:
- `fetchFleetData()` - pobiera dane pojazdów, KPI, lokalizacje pojazdów i statystyki floty
- `fetchVehicleDetails()` - pobiera szczegółowe dane wybranego pojazdu
- `handleFilterChange()` - obsługuje zmianę filtrów listy pojazdów (status, wyszukiwanie)
- `handleSearch()` - obsługuje wyszukiwanie pojazdów
- `handleSort()` - obsługuje sortowanie listy pojazdów według wybranej kolumny
- `handlePageChange()` - obsługuje zmianę strony w paginacji listy pojazdów
- `handleVehicleSelect()` - obsługuje wybór pojazdu z listy i wyświetla jego szczegóły
- `handleTabChange()` - obsługuje przełączanie między zakładkami w widoku szczegółów pojazdu
- `handleToggleDataSource()` - przełącza między danymi z API a danymi mockowymi
- `handleExportCSV()` - eksportuje dane pojazdów do pliku CSV
- `handleExportPDF()` - eksportuje dane pojazdów do pliku PDF

#### Komponenty:
- **Dashboard KPI** - wyświetla kluczowe wskaźniki floty (liczba pojazdów, średni wiek, średni przebieg, pojazdy w serwisie, pojazdy nieaktywne, pojazdy wymagające uwagi)
- **Mapa floty** - wizualizuje lokalizacje pojazdów na mapie z kolorowym oznaczeniem statusu
- **Lista pojazdów** - tabela z wszystkimi pojazdami, ich statusem, danymi technicznymi i podstawowymi statystykami
- **Szczegóły pojazdu** - prezentuje szczegółowe informacje o wybranym pojeździe z zakładkami (dane techniczne, historia przeglądów, historia kierowców, zużycie paliwa, przebieg, dokumenty)
- **Statystyki floty** - wykresy i trendy dotyczące struktury floty, wieku pojazdów, zużycia paliwa i kosztów utrzymania

#### Stany (hooks):
- `vehicles` - dane pojazdów
- `selectedVehicle` - wybrany pojazd
- `kpiData` - dane KPI floty
- `vehicleLocations` - lokalizacje pojazdów
- `fleetStats` - statystyki floty
- `filters` - filtry dla listy pojazdów (status, wyszukiwanie, sortowanie, strona)
- `activeTab` - aktywna zakładka w widoku szczegółów pojazdu
- `isLoading` - stan ładowania danych
- `error` - stan błędu
- `useMockData` - przełącznik źródła danych (API vs Mock)

#### Integracja z API:
- Komponent korzysta z `vehiclesService` lub `mockVehiclesService` w zależności od stanu przełącznika `useMockData`
- Domyślnie używane są dane mockowe, co pozwala na działanie aplikacji bez backendu
- API udostępnia metody: `getVehicles()`, `getVehicleDetails()`, `getFleetKPIs()`, `getVehicleLocations()`, `getFleetStatistics()`

#### Obsługa błędów:
- Wyświetlanie komunikatu o błędzie, gdy nie można pobrać danych
- Osobna obsługa błędów dla głównych danych i szczegółów
- Logowanie błędów do konsoli

#### Responsywność:
- Układ dostosowuje się do różnych rozmiarów ekranu
- Zastosowano media queries dla różnych breakpointów
- Tabele i wykresy dostosowują się do dostępnej przestrzeni
- Specjalne widoki dla urządzeń mobilnych

#### Eksport danych:
- Możliwość eksportu listy pojazdów do pliku CSV
- Możliwość eksportu listy pojazdów do pliku PDF
- Możliwość eksportu szczegółów pojazdu do pliku PDF

#### Wydajność:
- Paginacja listy pojazdów dla szybszego ładowania
- Lazy loading dla szczegółów pojazdu
- Optymalizacja renderowania komponentów

#### Bezpieczeństwo:
- Walidacja danych wejściowych
- Sanityzacja danych wyjściowych
- Obsługa błędów API

#### Integracja z innymi modułami:
- Powiązanie z modułem Maintenance (Konserwacja)
- Powiązanie z modułem Drivers (Kierowcy)
- Powiązanie z modułem Fleet Management (Zarządzanie Flotą)

### Maintenance (Konserwacja)

Podstrona Maintenance (Konserwacja) umożliwia zarządzanie konserwacją predykcyjną pojazdów, monitorowanie stanu technicznego, planowanie przeglądów i napraw oraz analizę kosztów utrzymania floty.

#### Funkcje i metody:
- `fetchMaintenanceData()` - pobiera dane alertów, stanu technicznego pojazdów, historii konserwacji, harmonogramu i analizy kosztów
- `handleAlertClick()` - obsługuje kliknięcie wiersza alertu i pobiera szczegóły
- `handleStatusUpdate()` - obsługuje aktualizację statusu alertu konserwacji
- `handleFilterChange()` - obsługuje zmianę filtrów alertów (priorytet, pojazd, komponent, status)
- `handleSearch()` - obsługuje wyszukiwanie alertów
- `handlePageChange()` - obsługuje zmianę strony w paginacji alertów
- `handleTabChange()` - obsługuje przełączanie między zakładkami tematycznymi
- `handleToggleDataSource()` - przełącza między danymi z API a danymi mockowymi

#### Komponenty:
- **Zakładki tematyczne** - umożliwiają przełączanie między różnymi aspektami konserwacji pojazdów
- **Alerty konserwacji** - przewidywanie potencjalnych awarii z priorytetyzacją i szczegółami
- **Stan techniczny pojazdów** - wskaźniki zdrowia komponentów z wizualizacją stanu technicznego
- **Historia konserwacji** - rejestr wykonanych prac serwisowych i napraw
- **Harmonogram konserwacji** - planowane przeglądy i naprawy z priorytetyzacją
- **Analiza kosztów** - koszty konserwacji z podziałem na kategorie i trendy miesięczne

#### Stany (hooks):
- `alerts` - dane alertów konserwacji
- `selectedAlert` - wybrany alert do szczegółowego widoku
- `vehicleHealth` - dane stanu technicznego pojazdów
- `maintenanceHistory` - historia konserwacji
- `maintenanceSchedule` - harmonogram konserwacji
- `costAnalysis` - analiza kosztów konserwacji
- `filters` - filtry dla alertów (priorytet, pojazd, komponent, status, strona)
- `activeTab` - aktywna zakładka tematyczna
- `isLoading` - stan ładowania danych
- `isDetailLoading` - stan ładowania szczegółów
- `error` - stan błędu
- `useMockData` - przełącznik źródła danych (API vs Mock)

#### Integracja z API:
- Komponent korzysta z `predictiveMaintenanceService` lub `mockPredictiveMaintenanceService` w zależności od stanu przełącznika `useMockData`
- Domyślnie używane są dane mockowe, co pozwala na działanie aplikacji bez backendu
- API udostępnia metody: `getAlerts()`, `getAlertDetails()`, `updateAlertStatus()`, `getVehicleHealth()`, `getMaintenanceHistory()`, `getMaintenanceSchedule()`, `getCostAnalysis()`

#### Obsługa błędów:
- Wyświetlanie komunikatu o błędzie, gdy nie można pobrać danych
- Osobna obsługa błędów dla głównych danych i szczegółów
- Logowanie błędów do konsoli

#### Responsywność:
- Układ dostosowuje się do różnych rozmiarów ekranu
- Zastosowano media queries dla różnych breakpointów
- Tabele i wykresy dostosowują się do dostępnej przestrzeni
- Specjalne widoki dla urządzeń mobilnych

#### Eksport danych:
- Możliwość eksportu alertów konserwacji do pliku CSV
- Możliwość eksportu historii konserwacji do pliku PDF
- Możliwość eksportu harmonogramu konserwacji do pliku PDF
- Możliwość eksportu analizy kosztów do pliku PDF

#### Wydajność:
- Paginacja alertów dla szybszego ładowania
- Lazy loading dla szczegółów alertu
- Optymalizacja renderowania komponentów

#### Bezpieczeństwo:
- Walidacja danych wejściowych
- Sanityzacja danych wyjściowych
- Obsługa błędów API

#### Integracja z innymi modułami:
- Powiązanie z modułem Vehicles Overview (Przegląd Pojazdów)
- Powiązanie z modułem Parts (Części)
- Powiązanie z modułem Fleet Management (Zarządzanie Flotą)PDF()` - eksportuje dane pojazdów do pliku PDF

#### Komponenty:
- **Dashboard KPI** - wyświetla kluczowe wskaźniki floty:
  - Liczba pojazdów aktywnych
  - Liczba pojazdów w serwisie
  - Średni wiek floty
  - Średni przebieg
  - Wskaźnik wykorzystania pojazdów
  - Wskaźnik zgodności z harmonogramem przeglądów
  - Każdy wskaźnik zawiera trend procentowy w porównaniu do poprzedniego okresu

- **Mapa floty** - interaktywna mapa pokazująca lokalizacje wszystkich pojazdów:
  - Kolorowe oznaczenia statusu pojazdów (aktywny, w serwisie, nieaktywny)
  - Tooltip z podstawowymi informacjami po najechaniu na punkt
  - Możliwość wyboru pojazdu bezpośrednio z mapy
  - Legenda statusów pojazdów

- **Lista pojazdów** - tabela z zaawansowanym filtrowaniem i sortowaniem:
  - ID/numer rejestracyjny pojazdu
  - Marka i model
  - Rok produkcji
  - Przebieg
  - Status (aktywny, w serwisie, nieaktywny)
  - Stan techniczny (wskaźnik procentowy)
  - Przypisany kierowca
  - Data ostatniego przeglądu
  - Data następnego przeglądu
  - Filtrowanie według statusu
  - Wyszukiwanie według ID, marki, modelu
  - Sortowanie według dowolnej kolumny
  - Paginacja z wyborem liczby wyników na stronę

- **Szczegóły pojazdu** - panel z zakładkami wyświetlający szczegółowe informacje o wybranym pojeździe:
  - **Dane techniczne** - pełne dane techniczne pojazdu (marka, model, rok, VIN, numer rejestracyjny, typ nadwozia, rodzaj paliwa, pojemność silnika, moc, skrzynia biegów, napęd, masa, ładowność)
  - **Historia przeglądów** - lista wszystkich przeglądów i napraw z datami, opisami, kosztami i wykonawcami
  - **Historia kierowców** - lista kierowców przypisanych do pojazdu w przeszłości z datami rozpoczęcia i zakończenia, przebiegiem i liczbą incydentów
  - **Zużycie paliwa** - wykres i tabela zużycia paliwa w czasie, z kosztami i przebiegiem
  - **Przebieg** - wykres przebiegu w czasie z miesięcznymi przyrostami
  - **Dokumenty** - lista dokumentów pojazdu (dowód rejestracyjny, ubezpieczenie, przegląd techniczny) z datami ważności i linkami do plików

- **Statystyki floty** - wykresy i trendy:
  - Struktura floty według marek/modeli
  - Struktura wiekowa pojazdów
  - Trendy zużycia paliwa w czasie
  - Trendy kosztów utrzymania w czasie

#### Stany (hooks):
- `vehicles` - dane pojazdów (lista, paginacja, filtry)
- `selectedVehicle` - wybrany pojazd do wyświetlenia szczegółów
- `kpiData` - dane KPI floty
- `mapData` - dane lokalizacji pojazdów dla mapy
- `fleetStats` - statystyki floty (struktura, trendy)
- `activeTab` - aktywna zakładka w widoku szczegółów pojazdu
- `isLoading` - stan ładowania głównych danych
- `isDetailLoading` - stan ładowania szczegółów pojazdu
- `error` - stan błędu
- `useMockData` - przełącznik źródła danych (API vs Mock)
- `filters` - filtry dla listy pojazdów (status, wyszukiwanie, sortowanie, paginacja)

#### Integracja z API:
- Komponent korzysta z `vehiclesService` lub `mockVehiclesService` w zależności od stanu przełącznika `useMockData`
- Domyślnie używane są dane mockowe, co pozwala na działanie aplikacji bez backendu
- API udostępnia metody:
  - `getVehicles()` - pobiera listę pojazdów z filtrowaniem, sortowaniem i paginacją
  - `getVehicleDetails()` - pobiera szczegółowe dane pojazdu
  - `getFleetKPIs()` - pobiera kluczowe wskaźniki floty
  - `getVehicleLocations()` - pobiera dane lokalizacji pojazdów dla mapy
  - `getFleetStatistics()` - pobiera statystyki floty

#### Obsługa błędów:
- Wyświetlanie komunikatu o błędzie, gdy nie można pobrać danych
- Osobna obsługa błędów dla głównych danych i szczegółów pojazdu
- Logowanie błędów do konsoli
- Automatyczne ponowienie próby pobierania danych w przypadku błędu

#### Responsywność:
- Układ dostosowuje się do różnych rozmiarów ekranu
- Zastosowano media queries dla różnych breakpointów
- Tabele i wykresy dostosowują się do dostępnej przestrzeni
- Specjalne widoki dla urządzeń mobilnych
- Mapa floty zmienia rozmiar w zależności od dostępnej przestrzeni
- Karty KPI układają się w stos na mniejszych ekranach

#### Eksport danych:
- Eksport listy pojazdów do pliku CSV
- Eksport listy pojazdów do pliku PDF (planowana funkcjonalność)
- Eksport szczegółów pojazdu do pliku PDF (planowana funkcjonalność)

#### Wydajność:
- Zastosowano React hooks (useCallback, useMemo) do optymalizacji renderowania
- Paginacja danych zmniejsza obciążenie przeglądarki
- Lazy loading komponentów szczegółów pojazdu
- Opóźnione ładowanie danych mapy i statystyk

#### Bezpieczeństwo:
- Walidacja danych wejściowych
- Sanityzacja danych przed wyświetleniem
- Obsługa błędów API
- Zabezpieczenie przed atakami XSS

#### Integracja z innymi modułami:
- Połączenie z modułem Maintenance (Konserwacja) dla danych o przeglądach
- Połączenie z modułem Drivers (Kierowcy) dla danych o przypisanych kierowcach
- Połączenie z modułem Fleet Management (Zarządzanie Flotą) dla danych o kosztach i wydajnościor` - stan błędu
- `useMockData` - przełącznik źródła danych (API vs Mock)

#### Integracja z API:
- Komponent korzysta z `vehiclesService` lub `mockVehiclesService` w zależności od stanu przełącznika `useMockData`
- Domyślnie używane są dane mockowe, co pozwala na działanie aplikacji bez backendu
- API udostępnia metody: `getVehicles()`, `getVehicleDetails()`, `getFleetKPIs()`, `getVehicleLocations()`, `getFleetStatistics()`

#### Obsługa błędów:
- Wyświetlanie komunikatu o błędzie, gdy nie można pobrać danych
- Osobna obsługa błędów dla głównych danych i szczegółów
- Logowanie błędów do konsoli

#### Responsywność:
- Układ dostosowuje się do różnych rozmiarów ekranu
- Zastosowano media queries dla różnych breakpointów
- Tabele i wykresy dostosowują się do dostępnej przestrzeni
- Specjalne widoki dla urządzeń mobilnych

## Serwisy danych

### dashboardService
Serwis do pobierania danych dla komponentu Dashboard z rzeczywistego API.

### mockDashboardService
Serwis dostarczający dane testowe dla komponentu Dashboard, gdy backend nie jest dostępny.

### monitoringService
Serwis do pobierania danych dla komponentu Monitoring z rzeczywistego API.

### mockMonitoringService
Serwis dostarczający dane testowe dla komponentu Monitoring, gdy backend nie jest dostępny. Zawiera:
- Dane pojazdów z informacjami o statusie, lokalizacji, kierowcy, zużyciu paliwa i wydajności
- Dane alertów różnych typów i priorytetów
- Dane zużycia paliwa z historią i statystykami
- Dane KPI z kluczowymi wskaźnikami floty
- Dane trendów dla różnych metryk

### driverSafetyService
Serwis do pobierania danych dla komponentu Bezpieczeństwo Kierowcy z rzeczywistego API.

### mockDriverSafetyService
Serwis dostarczający dane testowe dla komponentu Bezpieczeństwo Kierowcy, gdy backend nie jest dostępny. Zawiera:
- Dane alertów bezpieczeństwa różnych typów (zmęczenie, rozproszenie uwagi, styl jazdy, kolizje)
- Szczegóły alertów z osią czasu zdarzeń i rekomendacjami
- Dane rankingu kierowców z oceną bezpieczeństwa
- Dane analizy stylu jazdy z wykresem radarowym i rekomendacjami
- Dane monitorowania zmęczenia kierowcy z symptomami i porami dnia
- Dane wykrywania rozproszenia uwagi z typami rozproszenia
- Dane sesji coachingowych z tematami i statusami
- Dane telematyki wideo z nagraniami incydentów i statystykami

### vehiclesService
Serwis do pobierania danych dla komponentu Pojazdy z rzeczywistego API.

### mockVehiclesService
Serwis dostarczający dane testowe dla komponentu Pojazdy, gdy backend nie jest dostępny. Zawiera:
- Dane pojazdów z informacjami o statusie, modelu, roku produkcji, przebiegu, stanie technicznym
- Szczegóły pojazdów z pełnymi danymi technicznymi, historią przeglądów, przypisanymi kierowcami
- Dane KPI floty z kluczowymi wskaźnikami (liczba pojazdów, średni wiek, przebieg, wykorzystanie)
- Dane lokalizacji pojazdów dla mapy z kolorowym oznaczeniem statusu
- Dane statystyk floty z wykresami struktury, wieku, zużycia paliwa, kosztów utrzymania

## Uruchomienie aplikacji

### Z użyciem Docker Compose
```bash
docker-compose up
```

### Ręczne uruchomienie
1. Uruchom bazę danych PostgreSQL
2. Zainicjalizuj bazę danych skryptem `db/init.sql`
3. Uruchom backend:
   ```bash
   cd backend
   npm install
   npm start
   ```
4. Uruchom frontend:
   ```bash
   cd react-app
   npm install
   npm start
   ```

## Tryb testowy
Aplikacja domyślnie działa w trybie testowym, korzystając z danych mockowych. Można przełączać się między danymi z API a danymi mockowymi za pomocą przełącznika w górnej części każdej sekcji.

### partsService
Serwis do pobierania danych dla komponentu Parts (Części) z rzeczywistego API.

### mockPartsService
Serwis dostarczający dane testowe dla komponentu Parts (Części), gdy backend nie jest dostępny. Zawiera:
- Dane inwentarza części z informacjami o ID, nazwie, numerze katalogowym, kompatybilnych modelach, ilości, cenie
- Dane zamówień części z informacjami o ID, dacie, dostawcy, statusie, pozycjach
- Dane analizy zużycia części z wykresami najczęściej wymienianych części, kosztów według kategorii, trendów
- Dane kompatybilności części z informacjami o modelach pojazdów, alternatywnych częściach
- Dane dostawców z informacjami o ID, nazwie, osobie kontaktowej, ocenie, historii współpracy
