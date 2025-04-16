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
