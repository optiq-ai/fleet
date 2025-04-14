# Dokumentacja komponentu Dashboard

## Opis ogólny

Komponent Dashboard jest głównym pulpitem aplikacji Fleet App, prezentującym kluczowe wskaźniki, alerty, statystyki floty oraz mapę monitoringu pojazdów. Został zaprojektowany zgodnie z wymaganiami określonymi w `dashboard_structure_proposal.md` i zaimplementowany jako responsywny komponent React.

## Struktura komponentu

Dashboard składa się z czterech głównych sekcji:

1. **Kluczowe wskaźniki (KPI)** - Kafelki prezentujące najważniejsze metryki
2. **Wykrywanie oszustw** - Sekcja poświęcona alertom o oszustwach i analizie ryzyka
3. **Statystyki floty** - Sekcja prezentująca dane dotyczące zużycia paliwa, efektywności kierowców, kosztów i realizacji tras
4. **Monitoring pojazdów** - Interaktywna mapa z lokalizacją pojazdów i statystykami statusów

## Komponenty i funkcje

### Komponenty stylizowane

- `PageContainer` - Główny kontener strony
- `SectionTitle` - Tytuł sekcji
- `GridSection` - Kontener z układem kafelkowym (grid)
- `MapContainer` - Kontener mapy
- `MapPoint` - Punkt na mapie
- `MapTooltip` - Tooltip wyświetlany po najechaniu na punkt mapy
- `LoadingIndicator` - Wskaźnik ładowania
- `ErrorMessage` - Komunikat o błędzie
- `TabsContainer` - Kontener zakładek
- `Tab` - Pojedyncza zakładka
- `ViewAllButton` - Przycisk "Zobacz wszystkie"
- `ChartContainer` - Kontener wykresu
- `RankingContainer` - Kontener rankingu
- `RankingItem` - Element rankingu
- `RankingName` - Nazwa w rankingu
- `RankingValue` - Wartość w rankingu

### Hooki stanu

- `kpiData` - Dane KPI
- `alerts` - Dane alertów
- `mapData` - Dane mapy
- `fleetStats` - Dane statystyk floty
- `activeAlertTab` - Aktywna zakładka alertów
- `activeMapTab` - Aktywna zakładka mapy
- `tooltip` - Stan tooltipa mapy
- `isLoading` - Stan ładowania
- `error` - Stan błędu

### Funkcje

- `fetchDashboardData()` - Pobiera wszystkie dane dashboardu
- `handleMapTypeChange(type)` - Obsługuje zmianę typu danych mapy
- `handleMapPointHover(point, event)` - Obsługuje najechanie na punkt mapy
- `handleMapPointLeave()` - Obsługuje opuszczenie punktu mapy
- `renderKPISection()` - Renderuje sekcję KPI
- `renderAlertsSection()` - Renderuje sekcję alertów
- `renderFleetStatsSection()` - Renderuje sekcję statystyk floty
- `renderMapSection()` - Renderuje sekcję mapy
- `getCoordinates(id)` - Generuje współrzędne punktu na podstawie ID
- `getPointColor(type)` - Określa kolor punktu na podstawie typu

## Przepływ danych

1. Komponent pobiera dane z API za pomocą serwisu `dashboardService`
2. Dane są przechowywane w stanach komponentu
3. Funkcje renderujące wykorzystują dane do wyświetlenia odpowiednich sekcji
4. Interakcje użytkownika (np. zmiana zakładki) powodują aktualizację stanu i ponowne renderowanie

## Responsywność

Komponent jest w pełni responsywny dzięki:
- Użyciu `styled-components` z media queries
- Dynamicznemu układowi grid, który zmienia liczbę kolumn w zależności od szerokości ekranu
- Adaptacyjnym komponentom, które dostosowują się do dostępnej przestrzeni

## Obsługa błędów

- Wszystkie zapytania API są opakowane w bloki try-catch
- W przypadku błędu, użytkownik widzi komunikat z informacją o problemie
- Podczas ładowania danych wyświetlany jest wskaźnik ładowania

## Typy danych

Komponent wykorzystuje następujące typy danych:

```javascript
/**
 * @typedef {Object} KPIData
 * @property {number} activeVehicles - Number of active vehicles
 * @property {number} activeDrivers - Number of active drivers
 * @property {number} dailyCosts - Daily costs
 * @property {number} potentialSavings - Potential savings
 * @property {number} safetyIndex - Safety index
 * @property {number} maintenanceForecast - Maintenance forecast
 * @property {number} fraudAlerts - Number of fraud alerts
 */

/**
 * @typedef {Object} Alert
 * @property {string} id - Alert ID
 * @property {string} priority - Alert priority
 * @property {string} description - Alert description
 * @property {string} vehicle - Vehicle ID
 * @property {string} date - Alert date
 * @property {string} status - Alert status
 */

/**
 * @typedef {Object} MapData
 * @property {Array} points - Map points
 */

/**
 * @typedef {Object} FleetStatistics
 * @property {Object} fuelConsumption - Fuel consumption data
 * @property {Object} driverEfficiency - Driver efficiency data
 * @property {Object} operationalCosts - Operational costs data
 * @property {Object} routeCompletion - Route completion data
 */
```

## Integracja z API

Komponent korzysta z serwisu `dashboardService` do komunikacji z API:

- `getKPIData()` - Pobiera dane KPI
- `getAlerts()` - Pobiera alerty
- `getMapData(type)` - Pobiera dane mapy dla określonego typu

## Rozszerzalność

Komponent został zaprojektowany z myślą o łatwej rozszerzalności:

- Każda sekcja jest renderowana przez osobną funkcję
- Nowe sekcje można łatwo dodać, tworząc nową funkcję renderującą
- Dane są pobierane z API, co umożliwia łatwą zmianę źródła danych
