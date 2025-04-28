# Wymagania dla modułu zarządzania flotą tirów

## 1. Specyficzne cechy zarządzania flotą tirów

Zarządzanie flotą tirów różni się od zarządzania standardową flotą pojazdów ze względu na następujące czynniki:

### 1.1. Regulacje prawne i zgodność
- Czas pracy kierowców (AETR, tachografy)
- Ograniczenia wagowe i wymiarowe
- Specjalne zezwolenia i licencje (np. ADR dla materiałów niebezpiecznych)
- Dokumentacja międzynarodowa (CMR, karnety TIR)
- Opłaty drogowe w różnych krajach

### 1.2. Specyfika operacyjna
- Długie trasy międzynarodowe
- Planowanie postojów i odpoczynków kierowców
- Zarządzanie naczepami (często więcej naczep niż ciągników)
- Specjalistyczne ładunki (chłodnie, materiały niebezpieczne, ponadgabarytowe)
- Wyższe koszty eksploatacji i serwisu

### 1.3. Monitorowanie i analityka
- Szczegółowe śledzenie zużycia paliwa i AdBlue
- Monitorowanie stylu jazdy kierowców
- Analiza wydajności na długich trasach
- Śledzenie czasu pracy i odpoczynku kierowców
- Monitorowanie temperatury w naczepach chłodniczych

## 2. Wymagania funkcjonalne dla modułu zarządzania flotą tirów

### 2.1. Zarządzanie pojazdami i naczepami
- **Rejestr ciągników siodłowych** - szczegółowe informacje o ciągnikach, w tym moc, norma emisji spalin, wyposażenie
- **Rejestr naczep** - różne typy naczep (plandeki, chłodnie, cysterny, platformy), ich parametry i status
- **Zarządzanie zestawami** - łączenie ciągników z naczepami, historia połączeń
- **Monitorowanie stanu technicznego** - specyficzne dla tirów elementy do monitorowania (np. piąte koło, systemy hamulcowe naczep)
- **Zarządzanie oponami** - śledzenie zużycia, rotacji i wymiany opon (osobno dla ciągników i naczep)

### 2.2. Zarządzanie kierowcami i czasem pracy
- **Ewidencja czasu pracy** - zgodna z przepisami AETR/UE
- **Integracja z tachografami** - automatyczne pobieranie danych z tachografów
- **Planowanie czasu pracy** - z uwzględnieniem wymaganych przerw i odpoczynków
- **Zarządzanie kwalifikacjami** - prawo jazdy C+E, świadectwa kwalifikacji, ADR, inne certyfikaty
- **Szkolenia i terminy badań** - śledzenie terminów szkoleń okresowych i badań lekarskich

### 2.3. Zarządzanie trasami i ładunkami
- **Planowanie tras międzynarodowych** - z uwzględnieniem ograniczeń dla ruchu ciężarowego
- **Optymalizacja załadunku** - planowanie rozmieszczenia ładunku z uwzględnieniem nacisku na osie
- **Zarządzanie ładunkami specjalnymi** - materiały niebezpieczne, ładunki ponadgabarytowe, towary wymagające kontroli temperatury
- **Kalkulacja kosztów trasy** - paliwo, opłaty drogowe, diety kierowców, inne koszty
- **Monitorowanie realizacji zlecenia** - śledzenie postępu, odchyleń od planu, zdarzeń na trasie

### 2.4. Zarządzanie kosztami i rozliczenia
- **Rozliczanie opłat drogowych** - różne systemy w różnych krajach (viatoll, toll collect, myto, itp.)
- **Rozliczanie paliwa** - tankowania na stacjach partnerskich, karty paliwowe
- **Rozliczanie kierowców** - diety, ryczałty za noclegi, inne dodatki
- **Analiza rentowności tras** - porównanie kosztów planowanych z rzeczywistymi
- **Zarządzanie fakturami i dokumentami** - faktury za paliwo, serwis, części, opłaty drogowe

### 2.5. Monitorowanie i analityka
- **Zaawansowana analiza zużycia paliwa** - z uwzględnieniem obciążenia, trasy, warunków
- **Monitorowanie stylu jazdy** - hamowanie, przyspieszanie, obroty silnika, czas na biegu jałowym
- **Analiza wydajności kierowców** - porównanie kierowców na podobnych trasach
- **Śledzenie pojazdów w czasie rzeczywistym** - pozycja, prędkość, status
- **Monitorowanie parametrów technicznych** - temperatura silnika, ciśnienie oleju, stan AdBlue

### 2.6. Zarządzanie dokumentacją
- **Dokumenty pojazdów** - dowody rejestracyjne, ubezpieczenia, zezwolenia
- **Dokumenty kierowców** - prawa jazdy, świadectwa kwalifikacji, ADR
- **Dokumenty przewozowe** - CMR, listy przewozowe, karnety TIR
- **Dokumenty celne** - T1/T2, EX, deklaracje
- **Archiwizacja i wyszukiwanie** - szybki dostęp do historycznych dokumentów

### 2.7. Zarządzanie serwisem i przeglądami
- **Planowanie przeglądów** - z uwzględnieniem przebiegu i czasu
- **Rejestr napraw** - historia napraw, koszty, części
- **Zarządzanie częściami zamiennymi** - stany magazynowe, zamówienia
- **Przypomnienia o terminach** - przeglądy rejestracyjne, tachografy, legalizacje
- **Zarządzanie gwarancjami** - śledzenie okresów gwarancyjnych pojazdów i części

## 3. Wymagania niefunkcjonalne

### 3.1. Wydajność i skalowalność
- Obsługa dużych flot (100+ pojazdów)
- Szybkie przetwarzanie danych telematycznych
- Efektywne zarządzanie dużą ilością dokumentów

### 3.2. Integracja
- Integracja z systemami telematycznymi
- Integracja z systemami tachografów
- Integracja z systemami opłat drogowych
- Integracja z systemami ERP/TMS
- Integracja z systemami map i nawigacji

### 3.3. Dostępność i mobilność
- Dostęp przez aplikacje mobilne dla kierowców
- Praca offline z synchronizacją po uzyskaniu połączenia
- Wielojęzyczny interfejs (min. polski, angielski, niemiecki, rosyjski)

### 3.4. Bezpieczeństwo
- Zabezpieczenie danych osobowych kierowców
- Ochrona danych biznesowych (trasy, klienci, ładunki)
- Kontrola dostępu oparta na rolach

## 4. Integracja z istniejącymi modułami Fleet App

### 4.1. Integracja z modułem Settings
- Rozszerzenie FleetConfiguration o specyficzne parametry dla tirów
- Dodanie konfiguracji dla naczep
- Konfiguracja parametrów czasu pracy kierowców

### 4.2. Integracja z modułem Statistics
- Dodanie specyficznych KPI dla floty tirów
- Rozszerzenie analiz o dane z tachografów
- Raporty zgodności z czasem pracy

### 4.3. Integracja z modułem AI & Automation
- Predykcja awarii specyficznych dla tirów
- Optymalizacja tras z uwzględnieniem ograniczeń dla ciężarówek
- Automatyczne planowanie czasu pracy kierowców

### 4.4. Integracja z modułem Document Management
- Dodanie szablonów dokumentów specyficznych dla transportu międzynarodowego
- Automatyzacja obiegu dokumentów przewozowych
- Archiwizacja zgodna z wymogami prawnymi
