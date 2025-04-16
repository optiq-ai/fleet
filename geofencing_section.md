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
