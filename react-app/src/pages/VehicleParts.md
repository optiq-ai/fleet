### Vehicles Parts (Części)

Podstrona Parts umożliwia kompleksowe zarządzanie inwentarzem części zamiennych, zamówieniami, analizą zużycia, wyszukiwaniem kompatybilnych części oraz bazą dostawców. Jest to kluczowy moduł dla efektywnego zarządzania zasobami części potrzebnymi do utrzymania floty pojazdów.

#### Funkcje i metody:
- `fetchData()` - pobiera dane w zależności od aktywnej zakładki (inwentarz, zamówienia, analiza zużycia, kompatybilność, dostawcy)
- `handlePartSelect()` - obsługuje wybór części z listy i pobiera jej szczegóły
- `handleOrderSelect()` - obsługuje wybór zamówienia z listy i pobiera jego szczegóły
- `handleSupplierSelect()` - obsługuje wybór dostawcy z listy i pobiera jego szczegóły
- `handleFilterChange()` - obsługuje zmianę filtrów danych (kategoria, dostawca, status)
- `handleSearch()` - obsługuje wyszukiwanie części, zamówień lub dostawców
- `handlePageChange()` - obsługuje zmianę strony w paginacji danych
- `handleCompatibilitySearch()` - obsługuje wyszukiwanie części kompatybilnych z wybranym modelem pojazdu
- `handleExportCSV()` - eksportuje dane do pliku CSV
- `handleExportPDF()` - eksportuje dane do pliku PDF
- `handleToggleDataSource()` - przełącza między danymi z API a danymi mockowymi

#### Komponenty:
- **Zakładki tematyczne** - umożliwiają przełączanie między różnymi funkcjonalnościami (inwentarz, zamówienia, analiza zużycia, kompatybilność, dostawcy)
- **Inwentarz części** - tabela z filtrowaniem i sortowaniem zawierająca wszystkie części w magazynie:
  - ID części
  - Nazwa i numer katalogowy
  - Kompatybilne modele pojazdów
  - Ilość w magazynie
  - Poziom minimalny zapasów
  - Cena jednostkowa
  - Dostawca
  - Status (dostępna, niski stan, zamówiona, brak w magazynie)
  - Filtrowanie według kategorii, dostawcy, statusu
  - Wyszukiwanie według nazwy lub numeru katalogowego
  - Sortowanie według dowolnej kolumny
  - Paginacja z wyborem liczby wyników na stronę

- **Szczegóły części** - wyświetla szczegółowe informacje o wybranej części:
  - Pełne dane części (ID, nazwa, numer katalogowy, kategoria)
  - Kompatybilne modele pojazdów
  - Ilość w magazynie i poziom minimalny
  - Cena jednostkowa
  - Dostawca
  - Status
  - Lokalizacja w magazynie
  - Data ostatniego zamówienia
  - Opis i specyfikacja techniczna
  - Instrukcja montażu (jeśli dostępna)

- **Zarządzanie zamówieniami** - tabela z listą aktywnych i historycznych zamówień części:
  - ID zamówienia
  - Data zamówienia
  - Dostawca
  - Liczba pozycji
  - Koszt całkowity
  - Status (oczekujące, w realizacji, wysłane, dostarczone, anulowane)
  - Filtrowanie według statusu, dostawcy
  - Wyszukiwanie według ID zamówienia
  - Sortowanie według dowolnej kolumny
  - Paginacja z wyborem liczby wyników na stronę

- **Szczegóły zamówienia** - wyświetla szczegółowe informacje o wybranym zamówieniu:
  - Pełne dane zamówienia (ID, data, dostawca, status)
  - Przewidywana data dostawy
  - Koszt całkowity
  - Uwagi
  - Lista pozycji zamówienia (części, ilości, ceny jednostkowe, ceny całkowite)

- **Analiza zużycia części** - wykresy i statystyki dotyczące zużycia części:
  - Najczęściej wymieniane części (wykres i tabela)
  - Koszty części według kategorii (wykres i tabela)
  - Trendy zużycia części w czasie (wykres)
  - Części według dostawców (wykres i tabela)

- **Wyszukiwarka kompatybilności** - umożliwia wyszukiwanie części kompatybilnych z wybranym modelem pojazdu:
  - Pole wyszukiwania modelu pojazdu
  - Lista kompatybilnych części z podstawowymi informacjami
  - Lista alternatywnych części z informacją o stopniu kompatybilności
  - Szczegóły wybranej części z pełnymi danymi technicznymi i instrukcją montażu

- **Zarządzanie dostawcami** - tabela z listą dostawców części:
  - ID dostawcy
  - Nazwa
  - Osoba kontaktowa
  - Email
  - Telefon
  - Liczba kategorii części
  - Ocena (gwiazdki)
  - Wyszukiwanie według nazwy dostawcy
  - Sortowanie według dowolnej kolumny
  - Paginacja z wyborem liczby wyników na stronę

- **Szczegóły dostawcy** - wyświetla szczegółowe informacje o wybranym dostawcy:
  - Pełne dane dostawcy (ID, nazwa, osoba kontaktowa, email, telefon, adres)
  - Kategorie dostarczanych części
  - Ocena ogólna i szczegółowa (terminowość, jakość, ceny)
  - Uwagi
  - Historia zamówień (data, ID zamówienia, liczba pozycji, koszt całkowity, status)

#### Stany (hooks):
- `activeTab` - aktywna zakładka tematyczna (inwentarz, zamówienia, analiza, kompatybilność, dostawcy)
- `parts` - dane inwentarza części
- `selectedPart` - wybrana część
- `orders` - dane zamówień
- `selectedOrder` - wybrane zamówienie
- `usageAnalysis` - dane analizy zużycia
- `compatibleParts` - dane kompatybilnych części
- `vehicleModel` - model pojazdu do wyszukiwania kompatybilnych części
- `suppliers` - dane dostawców
- `selectedSupplier` - wybrany dostawca
- `filters` - filtry dla danych (kategoria, dostawca, status, wyszukiwanie, strona)
- `isLoading` - stan ładowania
- `error` - stan błędu
- `useMockData` - przełącznik źródła danych (API vs Mock)

#### Integracja z API:
- Komponent korzysta z `partsService` lub `mockPartsService` w zależności od stanu przełącznika `useMockData`
- Domyślnie używane są dane mockowe, co pozwala na działanie aplikacji bez backendu
- API udostępnia metody: `getParts()`, `getPartDetails()`, `getOrders()`, `getOrderDetails()`, `getUsageAnalysis()`, `getCompatibleParts()`, `getSuppliers()`, `getSupplierDetails()`

#### Obsługa błędów:
- Wyświetlanie komunikatu o błędzie, gdy nie można pobrać danych
- Osobna obsługa błędów dla różnych typów danych
- Logowanie błędów do konsoli
- Automatyczne ponowienie próby pobierania danych w przypadku błędu

#### Responsywność:
- Układ dostosowuje się do różnych rozmiarów ekranu
- Zastosowano media queries dla różnych breakpointów
- Tabele i wykresy dostosowują się do dostępnej przestrzeni
- Specjalne widoki dla urządzeń mobilnych
- Karty i sekcje układają się w stos na mniejszych ekranach

#### Eksport danych:
- Eksport listy części do pliku CSV
- Eksport listy części do pliku PDF
- Eksport listy zamówień do pliku CSV
- Eksport listy zamówień do pliku PDF
- Eksport analizy zużycia do pliku CSV
- Eksport analizy zużycia do pliku PDF
- Eksport listy dostawców do pliku CSV
- Eksport listy dostawców do pliku PDF

#### Wydajność:
- Zastosowano React hooks (useCallback, useMemo) do optymalizacji renderowania
- Paginacja danych zmniejsza obciążenie przeglądarki
- Lazy loading komponentów szczegółów
- Opóźnione ładowanie danych wykresów i statystyk

#### Bezpieczeństwo:
- Walidacja danych wejściowych
- Sanityzacja danych przed wyświetleniem
- Obsługa błędów API
- Zabezpieczenie przed atakami XSS

#### Integracja z innymi modułami:
- Połączenie z modułem Maintenance (Konserwacja) dla danych o zużyciu części
- Połączenie z modułem Vehicles Overview (Przegląd Pojazdów) dla danych o kompatybilności części
- Połączenie z modułem Fleet Management (Zarządzanie Flotą) dla danych o kosztach części
