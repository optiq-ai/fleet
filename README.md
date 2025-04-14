# Fleet App - Dokumentacja

## Sekcja Dashboard

### Streszczenie

Sekcja Dashboard to główny pulpit aplikacji Fleet App, który prezentuje kluczowe wskaźniki, alerty, statystyki floty oraz mapę monitoringu pojazdów. Komponent został zaimplementowany jako responsywny interfejs React, który dostosowuje się do różnych rozmiarów ekranu.

### Komponenty

#### Komponenty główne

- **Dashboard** - Główny komponent pulpitu, który integruje wszystkie sekcje i zarządza pobieraniem danych.

#### Komponenty stylizowane

- `PageContainer` - Główny kontener strony z układem kolumnowym
- `SectionTitle` - Stylizowany nagłówek sekcji
- `GridSection` - Kontener z układem kafelkowym (grid), który zmienia liczbę kolumn w zależności od szerokości ekranu
- `MapContainer` - Kontener dla interaktywnej mapy
- `MapPoint` - Punkt na mapie z efektami hover
- `MapTooltip` - Tooltip wyświetlany po najechaniu na punkt mapy
- `TabsContainer` i `Tab` - Komponenty do przełączania między różnymi widokami
- `ViewAllButton` - Przycisk "Zobacz wszystkie" dla list z paginacją
- `ChartContainer` - Kontener dla wykresów
- `RankingContainer`, `RankingItem`, `RankingName`, `RankingValue` - Komponenty do wyświetlania rankingów

### Funkcje i metody

#### Funkcje pobierania danych

- `fetchDashboardData()` - Asynchroniczna funkcja pobierająca wszystkie dane dashboardu z API
- `handleMapTypeChange(type)` - Funkcja zmieniająca typ danych wyświetlanych na mapie

#### Funkcje obsługi interakcji

- `handleMapPointHover(point, event)` - Obsługuje najechanie na punkt mapy, wyświetlając tooltip
- `handleMapPointLeave()` - Obsługuje opuszczenie punktu mapy, ukrywając tooltip
- `setActiveAlertTab(tab)` - Zmienia aktywną zakładkę w sekcji alertów
- `setActiveMapTab(tab)` - Zmienia aktywną zakładkę w sekcji mapy

#### Funkcje renderujące

- `renderKPISection()` - Renderuje sekcję kluczowych wskaźników (KPI)
- `renderAlertsSection()` - Renderuje sekcję alertów o oszustwach
- `renderFleetStatsSection()` - Renderuje sekcję statystyk floty
- `renderMapSection()` - Renderuje sekcję mapy z monitoringiem pojazdów

#### Funkcje pomocnicze

- `getCoordinates(id)` - Generuje współrzędne punktu na mapie na podstawie ID
- `getPointColor(type)` - Określa kolor punktu na mapie na podstawie typu
- `getAlertsByType()` - Filtruje alerty według wybranego typu

### Stany (Hooks)

- `kpiData` - Przechowuje dane kluczowych wskaźników
- `alerts` - Przechowuje dane alertów różnych typów
- `mapData` - Przechowuje dane punktów na mapie
- `fleetStats` - Przechowuje dane statystyk floty
- `activeAlertTab` - Śledzi aktywną zakładkę w sekcji alertów
- `activeMapTab` - Śledzi aktywną zakładkę w sekcji mapy
- `tooltip` - Zarządza stanem tooltipa na mapie
- `isLoading` - Śledzi stan ładowania danych
- `error` - Przechowuje informacje o błędach

### Integracja z API

Dashboard korzysta z serwisu `dashboardService` do komunikacji z API:

- `getKPIData()` - Pobiera dane kluczowych wskaźników
- `getAlerts()` - Pobiera dane alertów
- `getMapData(type)` - Pobiera dane mapy dla określonego typu

### Obsługa błędów

- Wszystkie zapytania API są zabezpieczone blokami try-catch
- W przypadku błędu wyświetlany jest komunikat dla użytkownika
- Podczas ładowania danych wyświetlany jest wskaźnik ładowania

### Responsywność

Dashboard jest w pełni responsywny:
- Układ grid zmienia liczbę kolumn w zależności od szerokości ekranu (3 kolumny na dużych ekranach, 2 na średnich, 1 na małych)
- Komponenty dostosowują swój rozmiar do dostępnej przestrzeni
- Wszystkie elementy są czytelne na urządzeniach mobilnych

### Rozszerzalność

Komponent został zaprojektowany z myślą o łatwej rozszerzalności:
- Modułowa struktura z oddzielnymi funkcjami renderującymi dla każdej sekcji
- Dane pobierane z API, co umożliwia łatwą zmianę źródła danych
- Możliwość dodawania nowych sekcji bez modyfikacji istniejących
