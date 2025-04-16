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

### Asset Management

Sekcja Asset Management (Zarządzanie Aktywami) umożliwia kompleksowe zarządzanie wszystkimi aktywami floty, nie tylko pojazdami, ale również sprzętem, narzędziami, częściami zamiennymi i innymi zasobami. Komponent ten zapewnia pełną widoczność cyklu życia aktywów od zakupu, przez użytkowanie, konserwację, aż po wycofanie z eksploatacji.

#### Komponenty:
- **AssetDashboard** - wyświetla kluczowe wskaźniki wydajności (KPI) związane z aktywami, prezentuje statystyki wykorzystania, pokazuje alerty dotyczące konserwacji i wygasających gwarancji, wizualizuje rozmieszczenie aktywów na mapie
- **AssetInventory** - zarządza kompletnym inwentarzem wszystkich aktywów, kategoryzuje aktywa według typu, lokalizacji i statusu, umożliwia wyszukiwanie i filtrowanie aktywów, śledzi historię przypisania aktywów do pojazdów/kierowców
- **AssetMaintenance** - planuje i śledzi konserwację aktywów, zarządza harmonogramami przeglądów, rejestruje historię napraw i serwisów, monitoruje koszty konserwacji, generuje przypomnienia o zbliżających się terminach
- **AssetAcquisition** - zarządza procesem zakupu nowych aktywów, śledzi zamówienia i dostawy, rejestruje informacje o dostawcach, monitoruje koszty zakupu, zarządza dokumentacją zakupową
- **AssetDisposal** - zarządza procesem wycofywania aktywów z eksploatacji, śledzi wartość odsprzedaży, rejestruje informacje o nabywcach, monitoruje zgodność z przepisami dotyczącymi utylizacji
- **AssetUtilization** - analizuje wykorzystanie aktywów, identyfikuje nieefektywnie wykorzystywane aktywa, generuje raporty wykorzystania, sugeruje optymalizacje w przydziale aktywów
- **AssetReporting** - generuje raporty dotyczące aktywów, umożliwia eksport danych do różnych formatów, tworzy niestandardowe widoki raportów, automatyzuje dystrybucję raportów

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
- **Asset (Aktywo)** - struktura aktywa zawiera pola:
  - `id` - unikalny identyfikator aktywa
  - `name` - nazwa aktywa
  - `type` - typ aktywa (vehicle, equipment, tool, part, accessory)
  - `category` - kategoria aktywa (np. forklift, trailer, scanner)
  - `serialNumber` - numer seryjny aktywa
  - `manufacturer/model` - producent i model aktywa
  - `purchaseDate/purchasePrice` - data i cena zakupu
  - `currentValue` - aktualna wartość aktywa
  - `depreciationMethod/depreciationRate` - metoda i stopa amortyzacji
  - `expectedLifespan` - oczekiwany okres użytkowania
  - `warrantyExpiryDate` - data wygaśnięcia gwarancji
  - `location` - lokalizacja aktywa
  - `assignedTo` - przypisanie aktywa (pojazd, kierowca, lokalizacja)
  - `status` - status aktywa (active, maintenance, inactive, disposed)
  - `maintenanceSchedule` - harmonogram konserwacji
  - `specifications` - specyfikacje techniczne
  - `documents` - powiązane dokumenty
  - `notes/tags` - dodatkowe informacje
  - `customFields` - pola niestandardowe
  - `createdAt/updatedAt/createdBy/lastCheckedAt` - metadane

- **AssetCategory** - struktura kategorii aktywów
- **AssetMaintenance** - struktura konserwacji aktywa
- **AssetAssignment** - struktura przypisania aktywa
- **AssetCost** - struktura kosztu aktywa

#### Techniczne aspekty:
- Wszystkie komponenty używają czystego CSS do stylowania i ikon (plik IconStyles.css)
- Ikony są implementowane jako elementy span z odpowiednimi klasami CSS
- Brak zależności od zewnętrznych bibliotek ikon
- Komponenty są zintegrowane z API poprzez assetManagementService
- Dostępne są również mocki danych w mockAssetManagementService
- Komponenty AssetUtilization i AssetReporting używają biblioteki Chart.js do wizualizacji danych

#### Obsługa błędów:
- Wyświetlanie komunikatu o błędzie, gdy nie można pobrać danych
- Osobna obsługa błędów dla głównych danych i szczegółów
- Walidacja formularzy przed wysłaniem danych
- Obsługa błędów importu/eksportu danych
- Logowanie błędów do konsoli

#### Korzyści biznesowe:
1. **Optymalizacja wykorzystania aktywów**
   - Identyfikacja nieefektywnie wykorzystywanych aktywów
   - Optymalizacja przydziału aktywów do zadań
   - Redukcja kosztów poprzez eliminację zbędnych aktywów

2. **Redukcja kosztów operacyjnych**
   - Planowanie konserwacji zapobiegawczej zamiast napraw awaryjnych
   - Optymalizacja cyklu życia aktywów
   - Redukcja przestojów spowodowanych awariami

3. **Zwiększenie przejrzystości finansowej**
   - Dokładne śledzenie kosztów posiadania aktywów
   - Precyzyjne obliczanie amortyzacji
   - Lepsze planowanie budżetu i prognozowanie wydatków

4. **Poprawa zgodności z przepisami**
   - Śledzenie certyfikatów i przeglądów wymaganych przez przepisy
   - Dokumentacja procesu utylizacji aktywów zgodnie z normami środowiskowymi
   - Audyt i raportowanie stanu aktywów

### Communication

Sekcja Communication (Komunikacja) umożliwia efektywną wymianę informacji między wszystkimi uczestnikami ekosystemu floty: dyspozytorami, kierowcami, zespołami operacyjnymi i klientami. Komponent ten zapewnia scentralizowaną platformę komunikacyjną, która integruje różne kanały komunikacji, automatyzuje powiadomienia i umożliwia współpracę w czasie rzeczywistym.

#### Komponenty:
- **CommunicationDashboard** - wyświetla statystyki komunikacji, aktywne konwersacje, alerty i powiadomienia, prezentuje wskaźniki efektywności komunikacji, wizualizuje trendy w komunikacji
- **DriverMessaging** - umożliwia bezpośrednią komunikację z kierowcami, wysyłanie wiadomości indywidualnych i grupowych, śledzenie statusu dostarczenia i odczytania wiadomości, integrację z systemami mobilnymi kierowców
- **TeamCollaboration** - wspiera współpracę wewnętrzną między zespołami, zarządzanie grupami i kanałami komunikacyjnymi, udostępnianie dokumentów i zasobów, śledzenie zadań i projektów zespołowych
- **CustomerCommunication** - zarządza komunikacją z klientami, automatyzuje powiadomienia o statusie zamówień i dostawach, umożliwia klientom śledzenie przesyłek, zbiera opinie i oceny od klientów
- **NotificationCenter** - centralizuje wszystkie powiadomienia systemowe, zarządza preferencjami powiadomień użytkowników, kategoryzuje powiadomienia według priorytetu i typu, zapewnia historię powiadomień
- **CommunicationTemplates** - zarządza szablonami wiadomości i powiadomień, umożliwia personalizację szablonów, wspiera wielojęzyczność, zapewnia spójność komunikacji
- **CommunicationAnalytics** - analizuje wzorce komunikacji, identyfikuje obszary wymagające poprawy, generuje raporty efektywności komunikacji, monitoruje czas odpowiedzi i rozwiązywania problemów

#### Funkcje i metody:
- `fetchCommunicationDashboard()` - pobiera dane dashboardu komunikacji
- `fetchConversations()` - pobiera listę konwersacji z możliwością filtrowania
- `fetchConversationDetails()` - pobiera szczegółowe informacje o wybranej konwersacji
- `sendMessage()` - wysyła wiadomość do wybranego odbiorcy lub grupy
- `createGroup()` - tworzy nową grupę komunikacyjną
- `addUserToGroup()` - dodaje użytkownika do grupy
- `removeUserFromGroup()` - usuwa użytkownika z grupy
- `fetchNotifications()` - pobiera powiadomienia dla użytkownika
- `markNotificationAsRead()` - oznacza powiadomienie jako przeczytane
- `updateNotificationPreferences()` - aktualizuje preferencje powiadomień użytkownika
- `fetchCommunicationTemplates()` - pobiera szablony komunikacji
- `createCommunicationTemplate()` - tworzy nowy szablon komunikacji
- `updateCommunicationTemplate()` - aktualizuje istniejący szablon
- `generateMessageFromTemplate()` - generuje wiadomość na podstawie szablonu
- `fetchCommunicationAnalytics()` - pobiera dane analityczne komunikacji
- `exportCommunicationData()` - eksportuje dane komunikacji do CSV/PDF/XLSX
- `handleTabChange()` - obsługuje zmianę głównej zakładki
- `handleFilterChange()` - obsługuje zmianę filtrów konwersacji
- `handleSearch()` - obsługuje wyszukiwanie w komunikacji
- `handlePageChange()` - obsługuje zmianę strony w paginacji
- `handleToggleDataSource()` - przełącza między danymi z API a danymi mockowymi

#### Stany (hooks):
- `activeTab` - aktywna zakładka główna
- `conversations` - lista konwersacji
- `selectedConversation` - wybrana konwersacja
- `messages` - wiadomości w konwersacji
- `groups` - grupy komunikacyjne
- `notifications` - powiadomienia użytkownika
- `notificationPreferences` - preferencje powiadomień
- `templates` - szablony komunikacji
- `dashboardData` - dane dashboardu komunikacji
- `analyticsData` - dane analityczne komunikacji
- `filters` - filtry dla konwersacji (typ, status, wyszukiwanie, strona)
- `pagination` - dane paginacji (strona, limit, total, pages)
- `isLoading` - stan ładowania
- `isDetailLoading` - stan ładowania szczegółów
- `error` - stan błędu
- `useMockData` - przełącznik źródła danych (API vs Mock)

#### Źródła danych i przepływy:
- **API Service**: `communicationService.js` - zawiera metody do komunikacji z backendem:
  - `getCommunicationDashboard()` - pobiera dane dashboardu z endpointu `/communication/dashboard`
  - `getConversations()` - pobiera listę konwersacji z endpointu `/communication/conversations`
  - `getConversationDetails()` - pobiera szczegóły konwersacji z endpointu `/communication/conversations/{id}`
  - `sendMessage()` - wysyła wiadomość przez endpoint `/communication/messages`
  - `getMessages()` - pobiera wiadomości z endpointu `/communication/conversations/{id}/messages`
  - `createGroup()` - tworzy grupę przez endpoint `/communication/groups`
  - `getGroups()` - pobiera grupy z endpointu `/communication/groups`
  - `addUserToGroup()` - dodaje użytkownika do grupy przez endpoint `/communication/groups/{id}/users`
  - `removeUserFromGroup()` - usuwa użytkownika z grupy przez endpoint `/communication/groups/{id}/users/{userId}`
  - `getNotifications()` - pobiera powiadomienia z endpointu `/communication/notifications`
  - `markNotificationAsRead()` - oznacza powiadomienie jako przeczytane przez endpoint `/communication/notifications/{id}/read`
  - `updateNotificationPreferences()` - aktualizuje preferencje przez endpoint `/communication/notifications/preferences`
  - `getNotificationPreferences()` - pobiera preferencje z endpointu `/communication/notifications/preferences`
  - `getTemplates()` - pobiera szablony z endpointu `/communication/templates`
  - `createTemplate()` - tworzy szablon przez endpoint `/communication/templates`
  - `updateTemplate()` - aktualizuje szablon przez endpoint `/communication/templates/{id}`
  - `generateMessageFromTemplate()` - generuje wiadomość przez endpoint `/communication/templates/{id}/generate`
  - `getCommunicationAnalytics()` - pobiera dane analityczne z endpointu `/communication/analytics`
  - `exportCommunicationData()` - eksportuje dane przez endpoint `/communication/export`

- **Mock Service**: Dane mockowe są zintegrowane bezpośrednio w `communicationService.js`:
  - Symuluje wszystkie metody API service
  - Zawiera predefiniowane dane konwersacji, wiadomości, grup, powiadomień, szablonów
  - Implementuje podstawową logikę filtrowania, sortowania i paginacji
  - Domyślnie używany w aplikacji (przełączany przez `useMockData`)

- **Współdzielenie danych z innymi komponentami**:
  - **Fleet Management** - wykorzystuje dane komunikacji związane z pojazdami
  - **Drivers** - wykorzystuje dane komunikacji z kierowcami
  - **Route Optimization** - wykorzystuje dane komunikacji dotyczące tras
  - **Customer Management** - wykorzystuje dane komunikacji z klientami
  - **Document Management** - wykorzystuje dane szablonów dokumentów

#### Struktury danych:
- **Conversation (Konwersacja)** - struktura konwersacji zawiera pola:
  - `id` - unikalny identyfikator konwersacji
  - `type` - typ konwersacji (individual, group, customer)
  - `participants` - uczestnicy konwersacji
  - `subject` - temat konwersacji
  - `lastMessage` - ostatnia wiadomość
  - `lastMessageTime` - czas ostatniej wiadomości
  - `unreadCount` - liczba nieprzeczytanych wiadomości
  - `status` - status konwersacji (active, archived, closed)
  - `priority` - priorytet konwersacji (high, medium, low)
  - `tags` - tagi konwersacji
  - `createdAt/updatedAt` - metadane

- **Message (Wiadomość)** - struktura wiadomości zawiera pola:
  - `id` - unikalny identyfikator wiadomości
  - `conversationId` - identyfikator konwersacji
  - `senderId` - identyfikator nadawcy
  - `content` - treść wiadomości
  - `attachments` - załączniki
  - `sentAt` - czas wysłania
  - `deliveredAt` - czas dostarczenia
  - `readAt` - czas odczytania
  - `status` - status wiadomości (sent, delivered, read, failed)
  - `isSystemMessage` - czy jest to wiadomość systemowa

- **Group (Grupa)** - struktura grupy komunikacyjnej
- **Template (Szablon)** - struktura szablonu komunikacji
- **Notification (Powiadomienie)** - struktura powiadomienia

#### Techniczne aspekty:
- Wszystkie komponenty używają czystego CSS do stylowania i ikon (plik IconStyles.css)
- Ikony są implementowane jako elementy span z odpowiednimi klasami CSS
- Brak zależności od zewnętrznych bibliotek ikon
- Komponenty są zintegrowane z API poprzez communicationService
- Implementacja komunikacji w czasie rzeczywistym przez WebSockets
- Przechowywanie wiadomości lokalnie w IndexedDB dla trybu offline
- Komponenty CommunicationAnalytics używają biblioteki Chart.js do wizualizacji danych

#### Obsługa błędów:
- Wyświetlanie komunikatu o błędzie, gdy nie można pobrać danych
- Osobna obsługa błędów dla głównych danych i szczegółów
- Walidacja formularzy przed wysłaniem danych
- Obsługa błędów wysyłania wiadomości z automatycznymi próbami ponowienia
- Logowanie błędów do konsoli

#### Korzyści biznesowe:
1. **Poprawa koordynacji operacyjnej**
   - Szybka i efektywna komunikacja między dyspozytorami a kierowcami
   - Natychmiastowe powiadomienia o zmianach w harmonogramach i trasach
   - Lepsza koordynacja zespołów w sytuacjach awaryjnych

2. **Zwiększenie satysfakcji klientów**
   - Automatyczne powiadomienia o statusie zamówień i dostawach
   - Szybsza reakcja na zapytania i problemy klientów
   - Spersonalizowana komunikacja z klientami

3. **Optymalizacja procesów decyzyjnych**
   - Analiza wzorców komunikacji dla identyfikacji obszarów wymagających poprawy
   - Monitorowanie czasu odpowiedzi i rozwiązywania problemów
   - Identyfikacja najczęstszych problemów i zapytań

4. **Redukcja kosztów operacyjnych**
   - Zmniejszenie liczby nieporozumień i błędów komunikacyjnych
   - Automatyzacja rutynowych powiadomień i komunikatów
   - Eliminacja potrzeby korzystania z wielu niezintegrowanych kanałów komunikacji

### Integrations

Sekcja Integrations (Integracje) umożliwia łączenie systemu Fleet App z zewnętrznymi platformami, usługami i systemami, tworząc kompleksowy ekosystem zarządzania flotą. Komponent ten zapewnia narzędzia do konfiguracji, monitorowania i zarządzania integracjami, automatyzacji przepływu danych oraz rozszerzania funkcjonalności aplikacji.

#### Komponenty:
- **IntegrationsDashboard** - wyświetla status wszystkich integracji, historię synchronizacji i alerty, prezentuje statystyki przepływu danych, monitoruje wydajność integracji, wizualizuje połączenia między systemami
- **APIManagement** - zarządza kluczami API, uprawnieniami i limitami dostępu, dokumentuje dostępne endpointy, monitoruje wykorzystanie API, zapewnia bezpieczeństwo dostępu do danych
- **ThirdPartyConnectors** - konfiguruje i zarządza gotowymi konektorami do popularnych systemów (ERP, CRM, systemy księgowe, platformy IoT), umożliwia mapowanie danych między systemami, monitoruje status połączeń
- **TelematicsIntegration** - integruje dane z różnych systemów telematycznych, normalizuje dane z różnych dostawców, wizualizuje dane telematyczne, umożliwia konfigurację alertów na podstawie danych telematycznych
- **FuelCardIntegration** - łączy system z dostawcami kart paliwowych, automatyzuje import danych o tankowaniach, weryfikuje transakcje pod kątem oszustw, generuje raporty zużycia paliwa
- **MaintenanceSystemsIntegration** - integruje z zewnętrznymi systemami zarządzania serwisem, synchronizuje harmonogramy konserwacji, automatyzuje zlecenia serwisowe, śledzi historię napraw w zewnętrznych warsztatach
- **CustomIntegrations** - umożliwia tworzenie niestandardowych integracji, definiuje przepływy danych między systemami, konfiguruje transformacje danych, tworzy automatyczne akcje na podstawie zdarzeń

#### Funkcje i metody:
- `fetchIntegrationsDashboard()` - pobiera dane dashboardu integracji
- `fetchIntegrations()` - pobiera listę integracji z możliwością filtrowania
- `fetchIntegrationDetails()` - pobiera szczegółowe informacje o wybranej integracji
- `activateIntegration()` - aktywuje integrację
- `deactivateIntegration()` - dezaktywuje integrację
- `configureIntegration()` - konfiguruje parametry integracji
- `testIntegration()` - testuje połączenie z zewnętrznym systemem
- `syncIntegrationData()` - synchronizuje dane z zewnętrznym systemem
- `fetchAPIKeys()` - pobiera klucze API
- `generateAPIKey()` - generuje nowy klucz API
- `revokeAPIKey()` - unieważnia klucz API
- `updateAPIKeyPermissions()` - aktualizuje uprawnienia klucza API
- `fetchConnectors()` - pobiera dostępne konektory
- `installConnector()` - instaluje konektor
- `uninstallConnector()` - odinstalowuje konektor
- `fetchTelematicsProviders()` - pobiera dostawców telematyki
- `configureTelematicsProvider()` - konfiguruje dostawcę telematyki
- `fetchFuelCardProviders()` - pobiera dostawców kart paliwowych
- `configureFuelCardProvider()` - konfiguruje dostawcę kart paliwowych
- `fetchMaintenanceSystems()` - pobiera systemy zarządzania serwisem
- `configureMaintenanceSystem()` - konfiguruje system zarządzania serwisem
- `createCustomIntegration()` - tworzy niestandardową integrację
- `configureDataMapping()` - konfiguruje mapowanie danych
- `configureWebhooks()` - konfiguruje webhooks dla zdarzeń
- `fetchIntegrationLogs()` - pobiera logi integracji
- `fetchSyncHistory()` - pobiera historię synchronizacji
- `handleTabChange()` - obsługuje zmianę głównej zakładki
- `handleFilterChange()` - obsługuje zmianę filtrów integracji
- `handleSearch()` - obsługuje wyszukiwanie integracji
- `handleToggleDataSource()` - przełącza między danymi z API a danymi mockowymi

#### Stany (hooks):
- `activeTab` - aktywna zakładka główna
- `integrations` - lista integracji
- `selectedIntegration` - wybrana integracja
- `apiKeys` - klucze API
- `connectors` - dostępne konektory
- `telematicsProviders` - dostawcy telematyki
- `fuelCardProviders` - dostawcy kart paliwowych
- `maintenanceSystems` - systemy zarządzania serwisem
- `customIntegrations` - niestandardowe integracje
- `integrationLogs` - logi integracji
- `syncHistory` - historia synchronizacji
- `dashboardData` - dane dashboardu integracji
- `filters` - filtry dla integracji (typ, status, wyszukiwanie)
- `isLoading` - stan ładowania
- `isDetailLoading` - stan ładowania szczegółów
- `error` - stan błędu
- `useMockData` - przełącznik źródła danych (API vs Mock)

#### Źródła danych i przepływy:
- **API Service**: `integrationsService.js` - zawiera metody do komunikacji z backendem oraz dane mockowe:
  - `getIntegrationsDashboard()` - pobiera dane dashboardu z endpointu `/integrations/dashboard`
  - `getIntegrations()` - pobiera listę integracji z endpointu `/integrations`
  - `getIntegrationDetails()` - pobiera szczegóły integracji z endpointu `/integrations/{id}`
  - `activateIntegration()` - aktywuje integrację przez endpoint `/integrations/{id}/activate`
  - `deactivateIntegration()` - dezaktywuje integrację przez endpoint `/integrations/{id}/deactivate`
  - `configureIntegration()` - konfiguruje integrację przez endpoint `/integrations/{id}/configure`
  - `testIntegration()` - testuje integrację przez endpoint `/integrations/{id}/test`
  - `syncIntegrationData()` - synchronizuje dane przez endpoint `/integrations/{id}/sync`
  - `getAPIKeys()` - pobiera klucze API z endpointu `/integrations/api-keys`
  - `generateAPIKey()` - generuje klucz API przez endpoint `/integrations/api-keys`
  - `revokeAPIKey()` - unieważnia klucz API przez endpoint `/integrations/api-keys/{id}`
  - `updateAPIKeyPermissions()` - aktualizuje uprawnienia przez endpoint `/integrations/api-keys/{id}/permissions`
  - `getConnectors()` - pobiera konektory z endpointu `/integrations/connectors`
  - `installConnector()` - instaluje konektor przez endpoint `/integrations/connectors/{id}/install`
  - `uninstallConnector()` - odinstalowuje konektor przez endpoint `/integrations/connectors/{id}/uninstall`
  - `getTelematicsProviders()` - pobiera dostawców telematyki z endpointu `/integrations/telematics-providers`
  - `configureTelematicsProvider()` - konfiguruje dostawcę przez endpoint `/integrations/telematics-providers/{id}/configure`
  - `getFuelCardProviders()` - pobiera dostawców kart paliwowych z endpointu `/integrations/fuel-card-providers`
  - `configureFuelCardProvider()` - konfiguruje dostawcę przez endpoint `/integrations/fuel-card-providers/{id}/configure`
  - `getMaintenanceSystems()` - pobiera systemy zarządzania serwisem z endpointu `/integrations/maintenance-systems`
  - `configureMaintenanceSystem()` - konfiguruje system przez endpoint `/integrations/maintenance-systems/{id}/configure`
  - `createCustomIntegration()` - tworzy niestandardową integrację przez endpoint `/integrations/custom`
  - `configureDataMapping()` - konfiguruje mapowanie przez endpoint `/integrations/{id}/data-mapping`
  - `configureWebhooks()` - konfiguruje webhooks przez endpoint `/integrations/{id}/webhooks`
  - `getIntegrationLogs()` - pobiera logi z endpointu `/integrations/{id}/logs`
  - `getSyncHistory()` - pobiera historię synchronizacji z endpointu `/integrations/{id}/sync-history`

- **Mock Data**: Dane mockowe są zintegrowane bezpośrednio w `integrationsService.js`:
  - Symuluje wszystkie metody API service
  - Zawiera predefiniowane dane integracji, kluczy API, konektorów, dostawców
  - Implementuje podstawową logikę filtrowania i sortowania
  - Domyślnie używany w aplikacji (przełączany przez `useMockData`)

- **Współdzielenie danych z innymi komponentami**:
  - **Fleet Management** - wykorzystuje dane z integracji telematycznych
  - **Fuel Analysis** - wykorzystuje dane z integracji kart paliwowych
  - **Maintenance** - wykorzystuje dane z integracji systemów serwisowych
  - **Finance** - wykorzystuje dane z integracji systemów księgowych
  - **Route Optimization** - wykorzystuje dane z integracji systemów GPS

#### Struktury danych:
- **Integration (Integracja)** - struktura integracji zawiera pola:
  - `id` - unikalny identyfikator integracji
  - `name` - nazwa integracji
  - `type` - typ integracji (telematics, fuel_card, maintenance, erp, crm, custom)
  - `provider` - dostawca (np. nazwa firmy telematycznej)
  - `status` - status integracji (active, inactive, error, configuring)
  - `lastSync` - czas ostatniej synchronizacji
  - `nextSync` - czas następnej zaplanowanej synchronizacji
  - `syncFrequency` - częstotliwość synchronizacji
  - `configuration` - konfiguracja integracji (parametry połączenia)
  - `dataMapping` - mapowanie danych między systemami
  - `errorCount` - liczba błędów od ostatniego resetu
  - `createdAt/updatedAt` - metadane

- **APIKey (Klucz API)** - struktura klucza API zawiera pola:
  - `id` - unikalny identyfikator klucza
  - `name` - nazwa klucza (cel użycia)
  - `key` - wartość klucza (częściowo ukryta)
  - `permissions` - uprawnienia klucza
  - `status` - status klucza (active, revoked)
  - `lastUsed` - czas ostatniego użycia
  - `createdAt/expiresAt` - metadane

- **Connector (Konektor)** - struktura konektora do zewnętrznego systemu
- **TelematicsProvider** - struktura dostawcy telematyki
- **FuelCardProvider** - struktura dostawcy kart paliwowych
- **MaintenanceSystem** - struktura systemu zarządzania serwisem
- **CustomIntegration** - struktura niestandardowej integracji
- **IntegrationLog** - struktura logu integracji
- **SyncHistory** - struktura historii synchronizacji

#### Techniczne aspekty:
- Wszystkie komponenty używają czystego CSS do stylowania i ikon (plik IconStyles.css)
- Ikony są implementowane jako elementy span z odpowiednimi klasami CSS
- Brak zależności od zewnętrznych bibliotek ikon
- Komponenty są zintegrowane z API poprzez integrationsService
- Implementacja obsługi webhooków dla zdarzeń w czasie rzeczywistym
- Komponenty IntegrationsDashboard i CustomIntegrations używają biblioteki Chart.js do wizualizacji danych
- Komponenty CustomIntegrations używają interfejsu drag-and-drop do konfiguracji przepływów danych

#### Obsługa błędów:
- Wyświetlanie komunikatu o błędzie, gdy nie można pobrać danych
- Osobna obsługa błędów dla głównych danych i szczegółów
- Walidacja formularzy konfiguracyjnych przed zapisem
- Obsługa błędów synchronizacji z automatycznymi próbami ponowienia
- Logowanie błędów integracji do dedykowanego systemu logów
- Powiadomienia o błędach krytycznych

#### Korzyści biznesowe:
1. **Eliminacja silosów danych**
   - Centralizacja danych z różnych systemów w jednym miejscu
   - Spójny widok na całą flotę niezależnie od źródła danych
   - Eliminacja ręcznego wprowadzania tych samych danych do wielu systemów

2. **Automatyzacja procesów**
   - Automatyczne przesyłanie danych o tankowaniach z kart paliwowych
   - Synchronizacja harmonogramów konserwacji z systemami warsztatowymi
   - Automatyczne księgowanie kosztów w systemach finansowych

3. **Rozszerzenie funkcjonalności**
   - Wykorzystanie danych z systemów telematycznych do analizy stylu jazdy
   - Integracja z systemami prognozy pogody dla optymalizacji tras
   - Połączenie z giełdami transportowymi dla automatyzacji pozyskiwania ładunków

4. **Skalowalność i elastyczność**
   - Łatwe dodawanie nowych integracji w miarę rozwoju firmy
   - Dostosowanie systemu do zmieniających się potrzeb biznesowych
   - Możliwość integracji z nowymi technologiami (np. blockchain, AI)
