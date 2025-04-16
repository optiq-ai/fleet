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
- Komponenty AssetUtilization i AssetReporting używają biblioteki recharts do wizualizacji danych

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
   - Śledzenie zgodności aktywów z wymogami prawnymi
   - Dokumentacja procesu utylizacji aktywów
   - Audytowalność całego cyklu życia aktywów

### Communication

Sekcja Communication (Komunikacja) umożliwia kompleksowe zarządzanie wszystkimi aspektami komunikacji w firmie transportowej, zarówno wewnętrznej jak i zewnętrznej. Komponent ten zapewnia scentralizowaną platformę do komunikacji z kierowcami, zespołami wewnętrznymi i klientami, a także zarządzania powiadomieniami, szablonami wiadomości i analizą komunikacji.

#### Komponenty:
- **CommunicationDashboard** - wyświetla kluczowe wskaźniki komunikacji, aktywne konwersacje, ostatnie wiadomości i alerty, prezentuje statystyki komunikacji, umożliwia szybki dostęp do najważniejszych funkcji
- **DriverMessaging** - zarządza komunikacją z kierowcami, umożliwia wysyłanie i odbieranie wiadomości, wyświetla status kierowców (online/offline), pozwala na filtrowanie i wyszukiwanie konwersacji
- **TeamCollaboration** - wspiera komunikację wewnętrzną między zespołami, umożliwia tworzenie i zarządzanie grupami, wspiera wymianę wiadomości grupowych, pozwala na udostępnianie plików i informacji
- **CustomerCommunication** - zarządza komunikacją z klientami, śledzi historię konwersacji z klientami, kategoryzuje zapytania klientów, umożliwia szybkie odpowiedzi na typowe pytania
- **NotificationCenter** - centralizuje wszystkie powiadomienia systemowe, umożliwia konfigurację preferencji powiadomień, kategoryzuje powiadomienia według typu i priorytetu, zapewnia historię powiadomień
- **CommunicationTemplates** - zarządza szablonami wiadomości, umożliwia tworzenie i edycję szablonów, kategoryzuje szablony według typu i zastosowania, wspiera personalizację szablonów
- **CommunicationAnalytics** - analizuje wzorce komunikacji, generuje raporty dotyczące wydajności komunikacji, identyfikuje obszary wymagające poprawy, wizualizuje trendy komunikacyjne

#### Funkcje i metody:
- `getCommunicationDashboard()` - pobiera dane dashboardu komunikacji
- `getConversations()` - pobiera listę konwersacji z możliwością filtrowania
- `getMessages()` - pobiera wiadomości dla wybranej konwersacji
- `sendMessage()` - wysyła nową wiadomość
- `getGroups()` - pobiera listę grup komunikacyjnych
- `getGroupMessages()` - pobiera wiadomości dla wybranej grupy
- `sendGroupMessage()` - wysyła wiadomość do grupy
- `createGroup()` - tworzy nową grupę komunikacyjną
- `getCustomerConversations()` - pobiera konwersacje z klientami
- `getCustomerMessages()` - pobiera wiadomości z konwersacji z klientem
- `sendCustomerMessage()` - wysyła wiadomość do klienta
- `getNotifications()` - pobiera powiadomienia z możliwością filtrowania
- `markNotificationAsRead()` - oznacza powiadomienie jako przeczytane
- `updateNotificationPreferences()` - aktualizuje preferencje powiadomień
- `getMessageTemplates()` - pobiera szablony wiadomości
- `createMessageTemplate()` - tworzy nowy szablon wiadomości
- `updateMessageTemplate()` - aktualizuje istniejący szablon
- `deleteMessageTemplate()` - usuwa szablon wiadomości
- `getCommunicationAnalytics()` - pobiera dane analityczne komunikacji
- `handleTabChange()` - obsługuje zmianę głównej zakładki
- `handleFilterChange()` - obsługuje zmianę filtrów
- `handleSearch()` - obsługuje wyszukiwanie
- `handleToggleDataSource()` - przełącza między danymi z API a danymi mockowymi

#### Stany (hooks):
- `activeTab` - aktywna zakładka główna
- `conversations` - lista konwersacji
- `selectedConversation` - wybrana konwersacja
- `messages` - wiadomości w konwersacji
- `groups` - grupy komunikacyjne
- `selectedGroup` - wybrana grupa
- `groupMessages` - wiadomości w grupie
- `customerConversations` - konwersacje z klientami
- `selectedCustomerConversation` - wybrana konwersacja z klientem
- `customerMessages` - wiadomości w konwersacji z klientem
- `notifications` - lista powiadomień
- `notificationPreferences` - preferencje powiadomień
- `messageTemplates` - szablony wiadomości
- `selectedTemplate` - wybrany szablon
- `analyticsData` - dane analityczne
- `dashboardData` - dane dashboardu komunikacji
- `filters` - filtry (typ, kategoria, status, wyszukiwanie)
- `isLoading` - stan ładowania
- `error` - stan błędu
- `useMockData` - przełącznik źródła danych (API vs Mock)

#### Źródła danych i przepływy:
- **API Service**: `communicationService.js` - zawiera metody do komunikacji z backendem:
  - `getCommunicationDashboard()` - pobiera dane dashboardu z endpointu `/communication/dashboard`
  - `getConversations()` - pobiera konwersacje z endpointu `/communication/conversations`
  - `getMessages()` - pobiera wiadomości z endpointu `/communication/conversations/{id}/messages`
  - `sendMessage()` - wysyła wiadomość przez endpoint `/communication/conversations/{id}/messages`
  - `getGroups()` - pobiera grupy z endpointu `/communication/groups`
  - `getGroupMessages()` - pobiera wiadomości grupy z endpointu `/communication/groups/{id}/messages`
  - `sendGroupMessage()` - wysyła wiadomość do grupy przez endpoint `/communication/groups/{id}/messages`
  - `createGroup()` - tworzy grupę przez endpoint `/communication/groups`
  - `getCustomerConversations()` - pobiera konwersacje z klientami z endpointu `/communication/customers`
  - `getCustomerMessages()` - pobiera wiadomości z klientem z endpointu `/communication/customers/{id}/messages`
  - `sendCustomerMessage()` - wysyła wiadomość do klienta przez endpoint `/communication/customers/{id}/messages`
  - `getNotifications()` - pobiera powiadomienia z endpointu `/communication/notifications`
  - `markNotificationAsRead()` - oznacza powiadomienie jako przeczytane przez endpoint `/communication/notifications/{id}/read`
  - `updateNotificationPreferences()` - aktualizuje preferencje przez endpoint `/communication/notifications/preferences`
  - `getMessageTemplates()` - pobiera szablony z endpointu `/communication/templates`
  - `createMessageTemplate()` - tworzy szablon przez endpoint `/communication/templates`
  - `updateMessageTemplate()` - aktualizuje szablon przez endpoint `/communication/templates/{id}`
  - `deleteMessageTemplate()` - usuwa szablon przez endpoint `/communication/templates/{id}`
  - `getCommunicationAnalytics()` - pobiera dane analityczne z endpointu `/communication/analytics`

- **Mock Service**: Implementacja w `communicationService.js` - zawiera dane testowe używane podczas developmentu:
  - Symuluje wszystkie metody API service
  - Zawiera predefiniowane dane konwersacji, wiadomości, grup, powiadomień, szablonów
  - Implementuje podstawową logikę filtrowania i wyszukiwania
  - Domyślnie używany w aplikacji (przełączany przez `useMockData`)

- **Współdzielenie danych z innymi komponentami**:
  - **Fleet Management** - wykorzystuje komunikację związaną z pojazdami
  - **Drivers** - wykorzystuje komunikację z kierowcami
  - **Route Optimization** - wykorzystuje komunikację związaną z trasami
  - **Customer Management** - wykorzystuje komunikację z klientami
  - **Document Management** - wykorzystuje powiadomienia o dokumentach

#### Struktury danych:
- **Conversation (Konwersacja)** - struktura konwersacji zawiera pola:
  - `id` - unikalny identyfikator konwersacji
  - `title` - tytuł konwersacji (np. imię i nazwisko kierowcy)
  - `type` - typ konwersacji (driver, group, customer)
  - `lastMessage` - treść ostatniej wiadomości
  - `lastMessageTime` - czas ostatniej wiadomości
  - `unreadCount` - liczba nieprzeczytanych wiadomości
  - `status` - status konwersacji (active, archived)
  - `participants` - uczestnicy konwersacji
  - `createdAt` - data utworzenia konwersacji

- **Message (Wiadomość)** - struktura wiadomości zawiera pola:
  - `id` - unikalny identyfikator wiadomości
  - `conversationId/groupId` - powiązanie z konwersacją lub grupą
  - `senderId` - identyfikator nadawcy
  - `senderName` - nazwa nadawcy (w przypadku grup)
  - `content` - treść wiadomości
  - `sentAt` - czas wysłania
  - `status` - status wiadomości (sent, delivered, read)
  - `attachments` - załączniki do wiadomości
  - `type` - typ wiadomości (text, system)

- **Group (Grupa)** - struktura grupy komunikacyjnej:
  - `id` - unikalny identyfikator grupy
  - `title` - nazwa grupy
  - `description` - opis grupy
  - `membersCount` - liczba członków
  - `lastMessage` - ostatnia wiadomość
  - `lastMessageTime` - czas ostatniej wiadomości
  - `unreadCount` - liczba nieprzeczytanych wiadomości
  - `createdAt/createdBy` - metadane utworzenia

- **Template (Szablon)** - struktura szablonu wiadomości:
  - `id` - unikalny identyfikator szablonu
  - `name` - nazwa szablonu
  - `category` - kategoria szablonu (driver, customer, team, notification, system)
  - `description` - opis szablonu
  - `content` - treść szablonu z placeholderami
  - `createdAt/updatedAt/createdBy` - metadane

- **Notification (Powiadomienie)** - struktura powiadomienia:
  - `id` - unikalny identyfikator powiadomienia
  - `type` - typ powiadomienia (message, alert, update, reminder)
  - `title` - tytuł powiadomienia
  - `content` - treść powiadomienia
  - `timestamp` - czas powiadomienia
  - `category` - kategoria powiadomienia
  - `read` - status przeczytania
  - `actionable` - czy wymaga działania
  - `action` - akcja do wykonania

#### Techniczne aspekty:
- Wszystkie komponenty używają czystego CSS do stylowania i ikon (plik IconStyles.css)
- Ikony są implementowane jako elementy span z odpowiednimi klasami CSS
- Brak zależności od zewnętrznych bibliotek ikon
- Komponenty są zintegrowane z API poprzez communicationService
- Implementacja komunikacji w czasie rzeczywistym przez WebSockets (w przyszłości)
- Przechowywanie wiadomości lokalnie w IndexedDB dla trybu offline (w przyszłości)
- Komponenty CommunicationAnalytics używa styled-components do tworzenia wykresów i wizualizacji

#### Obsługa błędów:
- Wyświetlanie komunikatu o błędzie, gdy nie można pobrać danych
- Osobna obsługa błędów dla różnych typów komunikacji
- Automatyczne ponowne próby wysłania wiadomości w przypadku błędu
- Buforowanie wiadomości do wysłania w trybie offline
- Logowanie błędów do konsoli

#### Korzyści biznesowe:
1. **Poprawa koordynacji operacyjnej**
   - Szybka i efektywna komunikacja z kierowcami
   - Lepsza współpraca między zespołami wewnętrznymi
   - Natychmiastowe powiadomienia o ważnych zdarzeniach

2. **Zwiększenie satysfakcji klientów**
   - Szybsza odpowiedź na zapytania klientów
   - Spójna komunikacja dzięki szablonom wiadomości
   - Pełna historia komunikacji z klientami

3. **Optymalizacja procesów decyzyjnych**
   - Analiza wzorców komunikacji
   - Identyfikacja obszarów wymagających poprawy
   - Dane analityczne wspierające decyzje biznesowe

4. **Redukcja kosztów operacyjnych**
   - Mniej nieporozumień dzięki jasnej komunikacji
   - Mniej opóźnień dzięki szybkiemu przepływowi informacji
   - Mniej błędów dzięki standardowym szablonom komunikacji
