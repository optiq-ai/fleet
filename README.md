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
