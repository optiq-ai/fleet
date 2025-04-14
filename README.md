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
