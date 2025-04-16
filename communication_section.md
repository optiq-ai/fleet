### Communication

Sekcja Communication (Komunikacja) umożliwia efektywną wymianę informacji między wszystkimi uczestnikami ekosystemu floty: kierowcami, dyspozytorami, menedżerami floty, klientami i partnerami. Komponent ten zapewnia wielokanałową komunikację w czasie rzeczywistym, zarządzanie powiadomieniami oraz archiwizację i analizę historii komunikacji.

#### Komponenty:
- **CommunicationDashboard** - wyświetla statystyki komunikacji, aktywne konwersacje, nieprzeczytane wiadomości i alerty, prezentuje wskaźniki efektywności komunikacji, pokazuje dostępność kierowców i dyspozytorów
- **DriverMessaging** - umożliwia bezpośrednią komunikację z kierowcami, obsługuje wiadomości tekstowe, głosowe i multimedialne, pozwala na komunikację indywidualną i grupową, śledzi status dostarczenia i odczytania wiadomości
- **TeamCollaboration** - wspiera współpracę zespołową, umożliwia tworzenie grup dyskusyjnych, zarządza udostępnianiem dokumentów i plików, obsługuje komentarze i adnotacje, wspiera przydzielanie i śledzenie zadań
- **CustomerCommunication** - zarządza komunikacją z klientami, automatyzuje powiadomienia o statusie dostawy, umożliwia klientom śledzenie przesyłek w czasie rzeczywistym, obsługuje zapytania i reklamacje klientów
- **NotificationCenter** - centralizuje wszystkie powiadomienia systemowe, umożliwia personalizację preferencji powiadomień, obsługuje powiadomienia push, email i SMS, grupuje i kategoryzuje powiadomienia
- **CommunicationTemplates** - zarządza szablonami wiadomości i powiadomień, wspiera wielojęzyczność, umożliwia personalizację szablonów, automatyzuje wysyłanie wiadomości na podstawie zdarzeń
- **CommunicationAnalytics** - analizuje wzorce komunikacji, mierzy czasy odpowiedzi, identyfikuje problematyczne obszary, generuje raporty efektywności komunikacji

#### Funkcje i metody:
- `fetchCommunicationDashboard()` - pobiera dane dashboardu komunikacji
- `fetchConversations()` - pobiera listę konwersacji z możliwością filtrowania
- `fetchConversationDetails()` - pobiera szczegółowe informacje o wybranej konwersacji
- `sendMessage()` - wysyła wiadomość do wybranego odbiorcy lub grupy
- `createGroup()` - tworzy nową grupę komunikacyjną
- `addUserToGroup()` - dodaje użytkownika do grupy
- `removeUserFromGroup()` - usuwa użytkownika z grupy
- `uploadAttachment()` - obsługuje przesyłanie załączników do wiadomości
- `markAsRead()` - oznacza wiadomość jako przeczytaną
- `createNotification()` - tworzy nowe powiadomienie
- `updateNotificationPreferences()` - aktualizuje preferencje powiadomień użytkownika
- `createMessageTemplate()` - tworzy nowy szablon wiadomości
- `generateMessageFromTemplate()` - generuje wiadomość na podstawie szablonu
- `scheduleMessage()` - planuje wysłanie wiadomości w określonym czasie
- `generateCommunicationReport()` - generuje raport dotyczący komunikacji
- `searchMessages()` - wyszukuje wiadomości według różnych kryteriów
- `exportConversation()` - eksportuje konwersację do pliku
- `archiveConversation()` - archiwizuje konwersację
- `handleTabChange()` - obsługuje zmianę głównej zakładki
- `handleFilterChange()` - obsługuje zmianę filtrów konwersacji
- `handleSearch()` - obsługuje wyszukiwanie wiadomości
- `handlePageChange()` - obsługuje zmianę strony w paginacji konwersacji
- `handleToggleDataSource()` - przełącza między danymi z API a danymi mockowymi

#### Stany (hooks):
- `activeTab` - aktywna zakładka główna
- `conversations` - lista konwersacji
- `selectedConversation` - wybrana konwersacja
- `messages` - wiadomości w wybranej konwersacji
- `groups` - grupy komunikacyjne
- `templates` - szablony wiadomości
- `notifications` - powiadomienia
- `notificationPreferences` - preferencje powiadomień
- `dashboardData` - dane dashboardu komunikacji
- `filters` - filtry dla konwersacji (typ, status, data, wyszukiwanie, strona)
- `pagination` - dane paginacji (strona, limit, total, pages)
- `isLoading` - stan ładowania
- `isDetailLoading` - stan ładowania szczegółów
- `isSending` - stan wysyłania wiadomości
- `error` - stan błędu
- `useMockData` - przełącznik źródła danych (API vs Mock)

#### Źródła danych i przepływy:
- **API Service**: `communicationService.js` - zawiera metody do komunikacji z backendem:
  - `getCommunicationDashboard()` - pobiera dane dashboardu z endpointu `/communication/dashboard`
  - `getConversations()` - pobiera listę konwersacji z endpointu `/communication/conversations`
  - `getConversationDetails()` - pobiera szczegóły konwersacji z endpointu `/communication/conversations/{id}`
  - `getMessages()` - pobiera wiadomości z endpointu `/communication/conversations/{id}/messages`
  - `sendMessage()` - wysyła wiadomość przez endpoint `/communication/messages`
  - `createGroup()` - tworzy grupę przez endpoint `/communication/groups`
  - `updateGroup()` - aktualizuje grupę przez endpoint `/communication/groups/{id}`
  - `deleteGroup()` - usuwa grupę przez endpoint `/communication/groups/{id}`
  - `addUserToGroup()` - dodaje użytkownika do grupy przez endpoint `/communication/groups/{id}/users`
  - `removeUserFromGroup()` - usuwa użytkownika z grupy przez endpoint `/communication/groups/{id}/users/{userId}`
  - `uploadAttachment()` - wysyła załącznik przez endpoint `/communication/attachments`
  - `markAsRead()` - oznacza wiadomość jako przeczytaną przez endpoint `/communication/messages/{id}/read`
  - `getNotifications()` - pobiera powiadomienia z endpointu `/communication/notifications`
  - `updateNotificationPreferences()` - aktualizuje preferencje przez endpoint `/communication/notifications/preferences`
  - `getMessageTemplates()` - pobiera szablony z endpointu `/communication/templates`
  - `createMessageTemplate()` - tworzy szablon przez endpoint `/communication/templates`
  - `generateCommunicationReport()` - generuje raport przez endpoint `/communication/reports`
  - `searchMessages()` - wyszukuje wiadomości przez endpoint `/communication/messages/search`
  - `exportConversation()` - eksportuje konwersację przez endpoint `/communication/conversations/{id}/export`
  - `archiveConversation()` - archiwizuje konwersację przez endpoint `/communication/conversations/{id}/archive`

- **Mock Service**: `mockCommunicationService.js` - zawiera dane testowe używane podczas developmentu:
  - Symuluje wszystkie metody API service
  - Zawiera predefiniowane dane konwersacji, wiadomości, grup, szablonów, powiadomień
  - Implementuje podstawową logikę filtrowania, sortowania i paginacji
  - Domyślnie używany w aplikacji (przełączany przez `useMockData`)

- **Współdzielenie danych z innymi komponentami**:
  - **Fleet Management** - wykorzystuje dane komunikacji z kierowcami pojazdów
  - **Drivers** - wykorzystuje dane komunikacji z kierowcami
  - **Route Optimization** - wykorzystuje dane komunikacji dotyczące tras
  - **Customer Management** - wykorzystuje dane komunikacji z klientami
  - **Maintenance** - wykorzystuje dane komunikacji dotyczące konserwacji

#### Struktury danych:
- **Conversation** - struktura konwersacji zawiera pola:
  - `id` - unikalny identyfikator konwersacji
  - `type` - typ konwersacji (individual, group, customer, system)
  - `participants` - uczestnicy konwersacji
  - `title` - tytuł konwersacji (dla grup)
  - `lastMessage` - ostatnia wiadomość
  - `lastMessageTime` - czas ostatniej wiadomości
  - `unreadCount` - liczba nieprzeczytanych wiadomości
  - `status` - status konwersacji (active, archived)
  - `createdAt` - data utworzenia
  - `updatedAt` - data aktualizacji

- **Message** - struktura wiadomości zawiera pola:
  - `id` - unikalny identyfikator wiadomości
  - `conversationId` - identyfikator konwersacji
  - `senderId` - identyfikator nadawcy
  - `content` - treść wiadomości
  - `contentType` - typ treści (text, voice, image, file, location)
  - `attachments` - załączniki
  - `sentAt` - czas wysłania
  - `deliveredAt` - czas dostarczenia
  - `readAt` - czas odczytania
  - `status` - status wiadomości (sending, sent, delivered, read, failed)
  - `isEdited` - czy wiadomość była edytowana
  - `replyTo` - identyfikator wiadomości, na którą jest odpowiedzią

- **Group** - struktura grupy komunikacyjnej
- **Template** - struktura szablonu wiadomości
- **Notification** - struktura powiadomienia
- **NotificationPreference** - struktura preferencji powiadomień

#### Techniczne aspekty:
- Wszystkie komponenty używają czystego CSS do stylowania i ikon (plik IconStyles.css)
- Ikony są implementowane jako elementy span z odpowiednimi klasami CSS
- Brak zależności od zewnętrznych bibliotek ikon
- Komponenty są zintegrowane z API poprzez communicationService
- Dostępne są również mocki danych w mockCommunicationService
- Komponenty używają domyślnych wartości dla props, aby uniknąć błędów przy niezdefiniowanych danych
- Implementacja obsługuje komunikację w czasie rzeczywistym poprzez WebSockets
- Wiadomości są przechowywane lokalnie w IndexedDB dla trybu offline

#### Obsługa błędów:
- Wyświetlanie komunikatu o błędzie, gdy nie można pobrać danych
- Osobna obsługa błędów dla głównych danych i szczegółów
- Automatyczne ponowne próby wysłania wiadomości w przypadku błędu
- Buforowanie wiadomości w trybie offline
- Walidacja formularzy przed wysłaniem danych
- Obsługa błędów przesyłania załączników
- Logowanie błędów do konsoli

#### Korzyści biznesowe:
1. **Poprawa koordynacji operacyjnej**
   - Natychmiastowa wymiana informacji między wszystkimi uczestnikami
   - Szybsze reagowanie na zmiany i problemy
   - Lepsza koordynacja działań zespołowych
   - Redukcja opóźnień operacyjnych

2. **Zwiększenie satysfakcji klientów**
   - Proaktywne informowanie klientów o statusie dostaw
   - Szybsza reakcja na zapytania i problemy klientów
   - Transparentność procesu dostawy
   - Budowanie zaufania i lojalności klientów

3. **Optymalizacja procesów decyzyjnych**
   - Szybszy przepływ informacji do decydentów
   - Lepszy dostęp do danych historycznych
   - Analityka komunikacji wspierająca podejmowanie decyzji
   - Identyfikacja wzorców i trendów w komunikacji

4. **Redukcja kosztów operacyjnych**
   - Zmniejszenie liczby nieporozumień i błędów komunikacyjnych
   - Ograniczenie potrzeby komunikacji telefonicznej
   - Automatyzacja rutynowych powiadomień
   - Efektywniejsze wykorzystanie czasu pracowników
