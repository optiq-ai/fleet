### Asset Management

Sekcja Asset Management umożliwia kompleksowe zarządzanie wszystkimi aktywami floty, nie tylko pojazdami, ale również sprzętem, narzędziami, częściami zamiennymi i innymi zasobami. Komponent ten zapewnia pełną widoczność cyklu życia aktywów od zakupu, przez użytkowanie, konserwację, aż po wycofanie z eksploatacji.

#### Komponenty:
- **AssetDashboard** - wyświetla KPI, alerty konserwacji, statystyki wykorzystania i rozmieszczenie aktywów na mapie
- **AssetInventory** - zarządza kompletnym inwentarzem wszystkich aktywów z kategoryzacją i filtrowaniem
- **AssetMaintenance** - planuje i śledzi konserwację aktywów, zarządza harmonogramami przeglądów
- **AssetAcquisition** - zarządza procesem zakupu nowych aktywów, śledzi zamówienia i dostawy
- **AssetDisposal** - zarządza procesem wycofywania aktywów z eksploatacji, śledzi wartość odsprzedaży
- **AssetUtilization** - analizuje wykorzystanie aktywów, identyfikuje nieefektywnie wykorzystywane zasoby
- **AssetReporting** - generuje raporty dotyczące aktywów, umożliwia eksport danych do różnych formatów

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
- **API Service**: `assetManagementService.js` - zawiera metody do komunikacji z backendem:
  - `getAssetDashboard()` - pobiera dane dashboardu z endpointu `/assets/dashboard`
  - `getAssets()` - pobiera listę aktywów z endpointu `/assets`
  - `getAssetDetails()` - pobiera szczegóły aktywa z endpointu `/assets/{id}`
  - `createAsset()` - tworzy nowe aktywo przez endpoint `/assets`
  - `updateAsset()` - aktualizuje aktywo przez endpoint `/assets/{id}`
  - `deleteAsset()` - usuwa aktywo przez endpoint `/assets/{id}`
  - `assignAsset()` - przypisuje aktywo przez endpoint `/assets/{id}/assign`
  - `unassignAsset()` - usuwa przypisanie przez endpoint `/assets/{id}/unassign`
  - `getAssetMaintenanceSchedule()` - pobiera harmonogram konserwacji z endpointu `/assets/{id}/maintenance/schedule`
  - `getAssetMaintenanceHistory()` - pobiera historię konserwacji z endpointu `/assets/{id}/maintenance/history`
  - `scheduleAssetMaintenance()` - planuje konserwację przez endpoint `/assets/{id}/maintenance/schedule`
  - `recordAssetMaintenance()` - rejestruje konserwację przez endpoint `/assets/{id}/maintenance/record`
  - `getAssetCategories()` - pobiera kategorie z endpointu `/assets/categories`
  - `getAssetLocations()` - pobiera lokalizacje z endpointu `/assets/locations`
  - `getAssetUtilization()` - pobiera dane wykorzystania z endpointu `/assets/utilization`
  - `getAssetDepreciation()` - pobiera dane amortyzacji z endpointu `/assets/depreciation`
  - `getAssetCosts()` - pobiera dane kosztów z endpointu `/assets/costs`
  - `generateAssetReport()` - generuje raport przez endpoint `/assets/reports`
  - `exportAssetData()` - eksportuje dane przez endpoint `/assets/export`
  - `importAssetData()` - importuje dane przez endpoint `/assets/import`

- **Mock Service**: `mockAssetManagementService.js` - zawiera dane testowe używane podczas developmentu:
  - Symuluje wszystkie metody API service
  - Zawiera predefiniowane dane aktywów, kategorii, lokalizacji, harmonogramów konserwacji
  - Implementuje podstawową logikę filtrowania, sortowania i paginacji
  - Domyślnie używany w aplikacji (przełączany przez `useMockData`)

- **Współdzielenie danych z innymi komponentami**:
  - **Fleet Management** - wykorzystuje dane aktywów przypisanych do pojazdów
  - **Drivers** - wykorzystuje dane aktywów przypisanych do kierowców
  - **Maintenance** - wykorzystuje dane harmonogramów konserwacji aktywów
  - **Procurement** - wykorzystuje dane zakupów i dostawców aktywów
  - **Finance** - wykorzystuje dane kosztów i amortyzacji aktywów

#### Struktury danych:
- **Asset** - struktura aktywa zawiera pola:
  - `id` - unikalny identyfikator aktywa
  - `name` - nazwa aktywa
  - `type` - typ aktywa (vehicle, equipment, tool, part, accessory)
  - `category` - kategoria aktywa (np. forklift, trailer)
  - `serialNumber` - numer seryjny
  - `manufacturer/model` - producent i model
  - `purchaseDate/purchasePrice` - data i cena zakupu
  - `currentValue` - aktualna wartość
  - `depreciationMethod/Rate` - metoda i stopa amortyzacji
  - `location` - lokalizacja aktywa
  - `assignedTo` - przypisanie do pojazdu/kierowcy
  - `status` - status aktywa (active, maintenance, inactive, disposed)
  - `maintenanceSchedule` - harmonogram konserwacji
  - `specifications` - specyfikacje techniczne
  - `documents` - powiązane dokumenty
  - `customFields` - niestandardowe pola

- **AssetCategory** - struktura kategorii aktywów
- **AssetMaintenance** - struktura konserwacji aktywa
- **AssetAssignment** - struktura przypisania aktywa
- **AssetCost** - struktura kosztów aktywa

#### Techniczne aspekty:
- Wszystkie komponenty używają czystego CSS do stylowania i ikon (plik IconStyles.css)
- Ikony są implementowane jako elementy span z odpowiednimi klasami CSS
- Brak zależności od zewnętrznych bibliotek ikon
- Komponenty są zintegrowane z API poprzez assetManagementService
- Dostępne są również mocki danych w mockAssetManagementService
- Komponenty używają domyślnych wartości dla props, aby uniknąć błędów przy niezdefiniowanych danych

#### Obsługa błędów:
- Wyświetlanie komunikatu o błędzie, gdy nie można pobrać danych
- Osobna obsługa błędów dla głównych danych i szczegółów
- Walidacja formularzy przed wysłaniem danych
- Obsługa błędów przesyłania plików
- Logowanie błędów do konsoli

#### Korzyści biznesowe:
1. **Optymalizacja wykorzystania aktywów**
   - Pełna widoczność wszystkich aktywów w jednym miejscu
   - Identyfikacja nieefektywnie wykorzystywanych aktywów
   - Optymalne przydzielanie aktywów do zadań i projektów
   - Redukcja czasu przestoju aktywów

2. **Redukcja kosztów operacyjnych**
   - Proaktywne planowanie konserwacji zapobiegające awariom
   - Optymalizacja cyklu życia aktywów
   - Redukcja nieplanowanych napraw i przestojów
   - Lepsze zarządzanie gwarancjami i serwisami

3. **Poprawa planowania finansowego**
   - Dokładne śledzenie kosztów posiadania aktywów
   - Lepsze prognozowanie budżetu na konserwację i wymianę
   - Optymalizacja decyzji o zakupie vs. leasingu
   - Dokładne obliczanie amortyzacji i wartości księgowej

4. **Zwiększenie zgodności z przepisami**
   - Centralne zarządzanie dokumentacją aktywów
   - Automatyczne przypomnienia o wymaganych przeglądach i certyfikacjach
   - Śledzenie zgodności z normami bezpieczeństwa i środowiskowymi
   - Kompletna historia aktywów na potrzeby audytów
