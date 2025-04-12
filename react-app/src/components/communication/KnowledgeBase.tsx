import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface KnowledgeBaseProps {
  userId: string;
  onSearch: (query: string) => Promise<any[]>;
  onArticleView: (articleId: string) => Promise<void>;
  onFeedback: (articleId: string, helpful: boolean, comment?: string) => Promise<void>;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 500;
`;

const SearchContainer = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 10px 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  
  &:focus {
    border-color: #3f51b5;
    outline: none;
  }
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  background-color: #3f51b5;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #303f9f;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  gap: 20px;
  height: 600px;
`;

const Sidebar = styled.div`
  width: 280px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const CategoriesList = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const CategoryItem = styled.div<{ active: boolean }>`
  padding: 12px 16px;
  cursor: pointer;
  background-color: ${props => props.active ? '#e8eaf6' : 'white'};
  border-bottom: 1px solid #e0e0e0;
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

const MainContent = styled.div`
  flex: 1;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const ArticlesList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ArticleCard = styled.div`
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
  
  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const ArticleTitle = styled.div`
  font-weight: 500;
  font-size: 16px;
  margin-bottom: 8px;
`;

const ArticleExcerpt = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 12px;
`;

const ArticleMeta = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #999;
`;

const ArticleCategory = styled.span`
  display: inline-block;
  padding: 2px 8px;
  background-color: #e0e0e0;
  border-radius: 12px;
  font-size: 12px;
`;

const ArticleDate = styled.span``;

const ArticleContent = styled.div`
  padding: 24px;
  overflow-y: auto;
  flex: 1;
`;

const ArticleHeader = styled.div`
  margin-bottom: 24px;
`;

const ArticleContentTitle = styled.h2`
  margin: 0 0 16px 0;
  font-size: 24px;
  font-weight: 500;
`;

const ArticleContentMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
`;

const ArticleBody = styled.div`
  line-height: 1.6;
  font-size: 16px;
  
  p {
    margin-bottom: 16px;
  }
  
  h3 {
    margin: 24px 0 16px 0;
    font-size: 18px;
    font-weight: 500;
  }
  
  ul, ol {
    margin-bottom: 16px;
    padding-left: 24px;
  }
  
  li {
    margin-bottom: 8px;
  }
  
  img {
    max-width: 100%;
    margin: 16px 0;
    border-radius: 4px;
  }
  
  code {
    background-color: #f5f5f5;
    padding: 2px 4px;
    border-radius: 4px;
    font-family: monospace;
  }
  
  pre {
    background-color: #f5f5f5;
    padding: 16px;
    border-radius: 4px;
    overflow-x: auto;
    margin-bottom: 16px;
  }
`;

const FeedbackContainer = styled.div`
  margin-top: 32px;
  padding-top: 16px;
  border-top: 1px solid #e0e0e0;
`;

const FeedbackTitle = styled.div`
  font-weight: 500;
  margin-bottom: 12px;
`;

const FeedbackButtons = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
`;

const FeedbackButton = styled.button<{ selected?: boolean }>`
  padding: 8px 16px;
  background-color: ${props => props.selected ? '#e8eaf6' : 'white'};
  color: ${props => props.selected ? '#3f51b5' : '#333'};
  border: 1px solid ${props => props.selected ? '#3f51b5' : '#ddd'};
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.selected ? '#e8eaf6' : '#f5f5f5'};
  }
`;

const FeedbackComment = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-height: 80px;
  margin-bottom: 12px;
  
  &:focus {
    border-color: #3f51b5;
    outline: none;
  }
`;

const SubmitButton = styled.button`
  padding: 8px 16px;
  background-color: #3f51b5;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #303f9f;
  }
  
  &:disabled {
    background-color: #c5cae9;
    cursor: not-allowed;
  }
`;

const RelatedArticles = styled.div`
  margin-top: 32px;
  padding-top: 16px;
  border-top: 1px solid #e0e0e0;
`;

const RelatedTitle = styled.div`
  font-weight: 500;
  margin-bottom: 12px;
`;

const RelatedList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const RelatedItem = styled.div`
  padding: 8px 12px;
  background-color: #f5f5f5;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #e8eaf6;
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #666;
  text-align: center;
  padding: 32px;
`;

const EmptyStateIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
  color: #ccc;
`;

const EmptyStateText = styled.div`
  font-size: 16px;
  margin-bottom: 8px;
`;

const EmptyStateSubtext = styled.div`
  font-size: 14px;
  color: #999;
`;

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  tags: string[];
  relatedArticles?: {
    id: string;
    title: string;
  }[];
}

const KnowledgeBase: React.FC<KnowledgeBaseProps> = ({ 
  userId, 
  onSearch, 
  onArticleView, 
  onFeedback 
}) => {
  // Stan dla kategorii i artykułów
  const [categories, setCategories] = useState<{ id: string; name: string; count: number }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Article[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  
  // Stan dla feedbacku
  const [feedbackHelpful, setFeedbackHelpful] = useState<boolean | null>(null);
  const [feedbackComment, setFeedbackComment] = useState<string>('');
  
  // Przykładowe dane
  useEffect(() => {
    // Symulacja pobrania kategorii
    const sampleCategories = [
      { id: 'cat1', name: 'Pojazdy i flota', count: 15 },
      { id: 'cat2', name: 'Paliwo i tankowanie', count: 12 },
      { id: 'cat3', name: 'Konserwacja i naprawy', count: 18 },
      { id: 'cat4', name: 'Bezpieczeństwo kierowcy', count: 10 },
      { id: 'cat5', name: 'Wykrywanie oszustw', count: 8 },
      { id: 'cat6', name: 'Raportowanie i analityka', count: 14 },
      { id: 'cat7', name: 'Integracje systemów', count: 6 },
      { id: 'cat8', name: 'Administracja i zarządzanie', count: 9 },
    ];
    
    setCategories(sampleCategories);
    
    // Symulacja pobrania artykułów
    const sampleArticles: Article[] = [
      {
        id: 'art1',
        title: 'Jak efektywnie zarządzać flotą pojazdów',
        excerpt: 'Poznaj najlepsze praktyki zarządzania flotą pojazdów, które pomogą Ci zoptymalizować koszty i zwiększyć efektywność.',
        content: `
          <h2>Jak efektywnie zarządzać flotą pojazdów</h2>
          
          <p>Zarządzanie flotą pojazdów to złożony proces, który wymaga uwzględnienia wielu czynników. W tym artykule przedstawiamy najlepsze praktyki, które pomogą Ci zoptymalizować koszty i zwiększyć efektywność zarządzania flotą.</p>
          
          <h3>1. Monitorowanie i analiza danych</h3>
          
          <p>Podstawą efektywnego zarządzania flotą jest regularne monitorowanie i analiza danych. Zbieraj informacje dotyczące:</p>
          
          <ul>
            <li>Zużycia paliwa</li>
            <li>Przebiegów pojazdów</li>
            <li>Kosztów konserwacji i napraw</li>
            <li>Czasu przestoju pojazdów</li>
            <li>Zachowań kierowców</li>
          </ul>
          
          <p>Analiza tych danych pozwoli Ci identyfikować obszary wymagające optymalizacji i podejmować świadome decyzje.</p>
          
          <h3>2. Planowanie konserwacji</h3>
          
          <p>Regularna konserwacja pojazdów jest kluczowa dla utrzymania floty w dobrym stanie technicznym i uniknięcia kosztownych awarii. Wdrożenie systemu planowania konserwacji pozwoli Ci:</p>
          
          <ul>
            <li>Śledzić terminy przeglądów i serwisów</li>
            <li>Planować konserwację w optymalnym czasie</li>
            <li>Minimalizować czas przestoju pojazdów</li>
            <li>Przedłużyć żywotność pojazdów</li>
          </ul>
          
          <h3>3. Optymalizacja tras</h3>
          
          <p>Optymalizacja tras to jeden z najskuteczniejszych sposobów na redukcję kosztów operacyjnych. Wykorzystaj narzędzia do planowania tras, aby:</p>
          
          <ul>
            <li>Minimalizować dystans i czas podróży</li>
            <li>Unikać korków i opłat drogowych</li>
            <li>Optymalizować zużycie paliwa</li>
            <li>Zwiększyć liczbę obsługiwanych punktów</li>
          </ul>
          
          <h3>4. Szkolenie kierowców</h3>
          
          <p>Styl jazdy kierowców ma ogromny wpływ na koszty operacyjne floty. Regularne szkolenia kierowców mogą pomóc w:</p>
          
          <ul>
            <li>Redukcji zużycia paliwa</li>
            <li>Zmniejszeniu liczby wypadków i szkód</li>
            <li>Przedłużeniu żywotności pojazdów</li>
            <li>Poprawie wizerunku firmy na drodze</li>
          </ul>
          
          <h3>5. Wykorzystanie technologii</h3>
          
          <p>Nowoczesne technologie oferują wiele narzędzi wspierających zarządzanie flotą. Rozważ wdrożenie:</p>
          
          <ul>
            <li>Systemów telematycznych</li>
            <li>Oprogramowania do zarządzania flotą</li>
            <li>Aplikacji mobilnych dla kierowców</li>
            <li>Systemów monitorowania paliwa</li>
          </ul>
          
          <p>Technologie te pozwolą Ci automatyzować procesy, zwiększyć kontrolę nad flotą i podejmować lepsze decyzje.</p>
          
          <h3>Podsumowanie</h3>
          
          <p>Efektywne zarządzanie flotą wymaga systematycznego podejścia i wykorzystania dostępnych narzędzi. Wdrożenie powyższych praktyk pomoże Ci zoptymalizować koszty, zwiększyć efektywność i przedłużyć żywotność pojazdów.</p>
        `,
        category: 'Pojazdy i flota',
        date: '2025-03-15',
        tags: ['zarządzanie flotą', 'optymalizacja kosztów', 'efektywność'],
        relatedArticles: [
          { id: 'art2', title: 'Jak wybrać odpowiednie pojazdy do floty' },
          { id: 'art3', title: 'Strategie redukcji kosztów paliwa' },
          { id: 'art4', title: 'Telematyka w zarządzaniu flotą' }
        ]
      },
      {
        id: 'art2',
        title: 'Jak wybrać odpowiednie pojazdy do floty',
        excerpt: 'Dowiedz się, jakie czynniki należy wziąć pod uwagę przy wyborze pojazdów do floty firmowej.',
        content: `
          <h2>Jak wybrać odpowiednie pojazdy do floty</h2>
          
          <p>Wybór odpowiednich pojazdów do floty firmowej to decyzja, która ma długofalowy wpływ na koszty operacyjne i efektywność działania firmy. W tym artykule przedstawiamy kluczowe czynniki, które należy wziąć pod uwagę przy podejmowaniu tej decyzji.</p>
          
          <h3>1. Określenie potrzeb operacyjnych</h3>
          
          <p>Przed rozpoczęciem procesu wyboru pojazdów, należy dokładnie określić potrzeby operacyjne firmy:</p>
          
          <ul>
            <li>Rodzaj przewożonych ładunków lub liczba pasażerów</li>
            <li>Typowe trasy i warunki drogowe</li>
            <li>Wymagana ładowność i pojemność</li>
            <li>Specjalne wymagania (np. chłodnie, windy załadowcze)</li>
          </ul>
          
          <h3>2. Analiza całkowitego kosztu posiadania (TCO)</h3>
          
          <p>Przy wyborze pojazdów należy uwzględnić nie tylko cenę zakupu, ale całkowity koszt posiadania, który obejmuje:</p>
          
          <ul>
            <li>Koszt zakupu lub leasingu</li>
            <li>Zużycie paliwa</li>
            <li>Koszty ubezpieczenia</li>
            <li>Koszty konserwacji i napraw</li>
            <li>Wartość rezydualna</li>
            <li>Podatki i opłaty</li>
          </ul>
          
          <h3>3. Wybór rodzaju napędu</h3>
          
          <p>Rodzaj napędu ma istotny wpływ na koszty operacyjne i wpływ na środowisko:</p>
          
          <ul>
            <li>Silniki benzynowe - niższy koszt zakupu, wyższe zużycie paliwa</li>
            <li>Silniki diesla - wyższy koszt zakupu, niższe zużycie paliwa, dłuższa żywotność</li>
            <li>Pojazdy hybrydowe - niższe zużycie paliwa w mieście, wyższy koszt zakupu</li>
            <li>Pojazdy elektryczne - niskie koszty eksploatacji, ograniczony zasięg, wyższy koszt zakupu</li>
          </ul>
          
          <h3>4. Bezpieczeństwo i wyposażenie</h3>
          
          <p>Bezpieczeństwo kierowców i ładunku powinno być priorytetem. Zwróć uwagę na:</p>
          
          <ul>
            <li>Systemy bezpieczeństwa aktywnego (ABS, ESP, asystent pasa ruchu)</li>
            <li>Systemy bezpieczeństwa pasywnego (poduszki powietrzne, strefy zgniotu)</li>
            <li>Systemy wspomagające kierowcę (tempomat adaptacyjny, asystent parkowania)</li>
            <li>Wyposażenie zwiększające komfort pracy kierowcy</li>
          </ul>
          
          <h3>5. Niezawodność i dostępność serwisu</h3>
          
          <p>Niezawodność pojazdów i łatwy dostęp do serwisu mają kluczowe znaczenie dla minimalizacji przestojów:</p>
          
          <ul>
            <li>Sprawdź rankingi niezawodności marek i modeli</li>
            <li>Oceń dostępność autoryzowanych serwisów w regionach operacyjnych</li>
            <li>Sprawdź koszty i dostępność części zamiennych</li>
            <li>Rozważ umowy serwisowe oferowane przez producentów</li>
          </ul>
          
          <h3>6. Standaryzacja floty</h3>
          
          <p>Standaryzacja floty może przynieść wiele korzyści:</p>
          
          <ul>
            <li>Niższe koszty zakupu dzięki rabatom ilościowym</li>
            <li>Uproszczenie procesów serwisowych</li>
            <li>Łatwiejsze zarządzanie częściami zamiennymi</li>
            <li>Jednolite procedury dla kierowców</li>
          </ul>
          
          <h3>Podsumowanie</h3>
          
          <p>Wybór odpowiednich pojazdów do floty wymaga uwzględnienia wielu czynników i dokładnej analizy potrzeb firmy. Dobrze dobrane pojazdy pozwolą zoptymalizować koszty operacyjne, zwiększyć efektywność i zapewnić bezpieczeństwo.</p>
        `,
        category: 'Pojazdy i flota',
        date: '2025-02-20',
        tags: ['wybór pojazdów', 'flota firmowa', 'TCO']
      },
      {
        id: 'art3',
        title: 'Strategie redukcji kosztów paliwa',
        excerpt: 'Poznaj skuteczne strategie, które pomogą Ci zredukować koszty paliwa w Twojej flocie pojazdów.',
        content: `
          <h2>Strategie redukcji kosztów paliwa</h2>
          
          <p>Koszty paliwa stanowią znaczącą część budżetu operacyjnego floty pojazdów. W tym artykule przedstawiamy skuteczne strategie, które pomogą Ci zredukować te koszty i zwiększyć efektywność wykorzystania paliwa.</p>
          
          <h3>1. Monitorowanie zużycia paliwa</h3>
          
          <p>Podstawą skutecznej redukcji kosztów paliwa jest dokładne monitorowanie jego zużycia:</p>
          
          <ul>
            <li>Wdrożenie systemów telematycznych do śledzenia zużycia paliwa w czasie rzeczywistym</li>
            <li>Regularne analizowanie danych o zużyciu paliwa dla poszczególnych pojazdów i kierowców</li>
            <li>Identyfikacja odchyleń i anomalii wskazujących na potencjalne problemy</li>
            <li>Ustalenie benchmarków i celów redukcji zużycia paliwa</li>
          </ul>
          
          <h3>2. Szkolenie kierowców w zakresie eco-drivingu</h3>
          
          <p>Styl jazdy kierowców ma ogromny wpływ na zużycie paliwa. Programy szkoleniowe z zakresu eco-drivingu mogą przynieść oszczędności rzędu 10-15%:</p>
          
          <ul>
            <li>Płynna jazda i unikanie gwałtownych przyspieszeń i hamowań</li>
            <li>Utrzymywanie optymalnej prędkości</li>
            <li>Właściwe wykorzystanie tempomatu</li>
            <li>Minimalizacja czasu pracy silnika na biegu jałowym</li>
            <li>Prawidłowe używanie skrzyni biegów</li>
          </ul>
          
          <h3>3. Optymalizacja tras i planowanie podróży</h3>
          
          <p>Efektywne planowanie tras może znacząco zmniejszyć liczbę przejechanych kilometrów i zużycie paliwa:</p>
          
          <ul>
            <li>Wykorzystanie oprogramowania do optymalizacji tras</li>
            <li>Unikanie obszarów o dużym natężeniu ruchu</li>
            <li>Łączenie dostaw i odbiorów w jednej trasie</li>
            <li>Planowanie tras z uwzględnieniem warunków drogowych i pogodowych</li>
          </ul>
          
          <h3>4. Regularna konserwacja pojazdów</h3>
          
          <p>Pojazdy w dobrym stanie technicznym zużywają mniej paliwa:</p>
          
          <ul>
            <li>Regularne wymiany oleju i filtrów</li>
            <li>Utrzymywanie prawidłowego ciśnienia w oponach</li>
            <li>Sprawdzanie i regulacja geometrii zawieszenia</li>
            <li>Czyszczenie układu paliwowego i wtryskowego</li>
            <li>Wymiana zużytych części wpływających na spalanie</li>
          </ul>
          
          <h3>5. Polityka tankowania</h3>
          
          <p>Odpowiednia polityka tankowania może przynieść znaczące oszczędności:</p>
          
          <ul>
            <li>Negocjowanie umów z dostawcami paliwa</li>
            <li>Wykorzystanie kart paliwowych z rabatami</li>
            <li>Monitorowanie cen paliw i tankowanie w tańszych lokalizacjach</li>
            <li>Wdrożenie procedur kontroli tankowania</li>
          </ul>
          
          <h3>6. Redukcja masy pojazdów</h3>
          
          <p>Każde dodatkowe 100 kg masy pojazdu zwiększa zużycie paliwa o około 0,5 litra na 100 km:</p>
          
          <ul>
            <li>Usunięcie zbędnego wyposażenia i ładunku</li>
            <li>Optymalizacja załadunku</li>
            <li>Wybór lżejszych materiałów i komponentów</li>
          </ul>
          
          <h3>7. Wykorzystanie technologii</h3>
          
          <p>Nowoczesne technologie mogą pomóc w redukcji zużycia paliwa:</p>
          
          <ul>
            <li>Systemy start-stop</li>
            <li>Ograniczniki prędkości</li>
            <li>Systemy monitorowania ciśnienia w oponach</li>
            <li>Aplikacje do śledzenia stylu jazdy</li>
          </ul>
          
          <h3>Podsumowanie</h3>
          
          <p>Redukcja kosztów paliwa wymaga kompleksowego podejścia i zaangażowania całej organizacji. Wdrożenie powyższych strategii pozwoli Ci znacząco zmniejszyć wydatki na paliwo i zwiększyć efektywność operacyjną floty.</p>
        `,
        category: 'Paliwo i tankowanie',
        date: '2025-01-10',
        tags: ['paliwo', 'redukcja kosztów', 'eco-driving']
      },
      {
        id: 'art4',
        title: 'Telematyka w zarządzaniu flotą',
        excerpt: 'Dowiedz się, jak wykorzystać systemy telematyczne do efektywnego zarządzania flotą pojazdów.',
        content: `
          <h2>Telematyka w zarządzaniu flotą</h2>
          
          <p>Systemy telematyczne rewolucjonizują sposób zarządzania flotą pojazdów, dostarczając w czasie rzeczywistym dane, które pozwalają na podejmowanie lepszych decyzji i optymalizację procesów. W tym artykule przedstawiamy, jak wykorzystać telematykę do efektywnego zarządzania flotą.</p>
          
          <h3>1. Czym jest telematyka?</h3>
          
          <p>Telematyka to połączenie telekomunikacji i informatyki, które umożliwia zdalne monitorowanie pojazdów i zbieranie danych o ich pracy. Typowy system telematyczny składa się z:</p>
          
          <ul>
            <li>Urządzeń GPS zainstalowanych w pojazdach</li>
            <li>Czujników zbierających dane o parametrach pojazdu</li>
            <li>Systemu transmisji danych (zwykle GSM/GPRS)</li>
            <li>Oprogramowania do analizy i wizualizacji danych</li>
          </ul>
          
          <h3>2. Śledzenie lokalizacji i tras</h3>
          
          <p>Podstawową funkcją systemów telematycznych jest śledzenie lokalizacji pojazdów:</p>
          
          <ul>
            <li>Monitorowanie pozycji pojazdów w czasie rzeczywistym</li>
            <li>Rejestrowanie przebytych tras</li>
            <li>Analiza efektywności tras</li>
            <li>Geofencing - definiowanie stref geograficznych i alertów</li>
          </ul>
          
          <h3>3. Monitorowanie zachowań kierowców</h3>
          
          <p>Telematyka pozwala na szczegółową analizę stylu jazdy kierowców:</p>
          
          <ul>
            <li>Rejestrowanie prędkości i przyspieszeń</li>
            <li>Wykrywanie gwałtownych hamowań i przyspieszeń</li>
            <li>Monitorowanie czasu pracy silnika na biegu jałowym</li>
            <li>Tworzenie rankingów i programów motywacyjnych dla kierowców</li>
          </ul>
          
          <h3>4. Analiza zużycia paliwa</h3>
          
          <p>Systemy telematyczne dostarczają precyzyjnych danych o zużyciu paliwa:</p>
          
          <ul>
            <li>Monitorowanie rzeczywistego zużycia paliwa</li>
            <li>Wykrywanie anomalii wskazujących na potencjalne kradzieże</li>
            <li>Korelacja zużycia paliwa ze stylem jazdy</li>
            <li>Optymalizacja procesów tankowania</li>
          </ul>
          
          <h3>5. Diagnostyka pojazdów</h3>
          
          <p>Nowoczesne systemy telematyczne mogą odczytywać dane z komputera pokładowego pojazdu:</p>
          
          <ul>
            <li>Monitorowanie stanu technicznego pojazdu</li>
            <li>Wczesne wykrywanie potencjalnych awarii</li>
            <li>Planowanie konserwacji w oparciu o rzeczywiste dane</li>
            <li>Zdalne odczytywanie kodów błędów</li>
          </ul>
          
          <h3>6. Optymalizacja procesów logistycznych</h3>
          
          <p>Dane telematyczne mogą być wykorzystane do optymalizacji procesów logistycznych:</p>
          
          <ul>
            <li>Dynamiczne planowanie tras w oparciu o aktualne warunki</li>
            <li>Optymalizacja przydziału zadań dla kierowców</li>
            <li>Monitorowanie czasów dostaw i postojów</li>
            <li>Integracja z systemami zarządzania magazynem i ERP</li>
          </ul>
          
          <h3>7. Bezpieczeństwo i zgodność z przepisami</h3>
          
          <p>Telematyka wspiera bezpieczeństwo i zgodność z regulacjami:</p>
          
          <ul>
            <li>Monitorowanie czasu pracy kierowców</li>
            <li>Elektroniczne karty drogowe</li>
            <li>Automatyczne raportowanie dla celów podatkowych</li>
            <li>Alerty bezpieczeństwa i powiadomienia o wypadkach</li>
          </ul>
          
          <h3>8. Analiza danych i raportowanie</h3>
          
          <p>Zaawansowane systemy telematyczne oferują rozbudowane narzędzia analityczne:</p>
          
          <ul>
            <li>Dashboardy z kluczowymi wskaźnikami efektywności</li>
            <li>Raporty okresowe i ad-hoc</li>
            <li>Analiza trendów i prognozowanie</li>
            <li>Benchmarking wewnętrzny i zewnętrzny</li>
          </ul>
          
          <h3>Podsumowanie</h3>
          
          <p>Telematyka oferuje ogromny potencjał dla firm zarządzających flotą pojazdów. Wdrożenie systemu telematycznego pozwala na znaczącą redukcję kosztów, zwiększenie efektywności operacyjnej i poprawę bezpieczeństwa. Kluczem do sukcesu jest nie tylko zbieranie danych, ale ich efektywna analiza i wykorzystanie do podejmowania decyzji.</p>
        `,
        category: 'Pojazdy i flota',
        date: '2025-03-05',
        tags: ['telematyka', 'GPS', 'monitoring floty']
      },
      {
        id: 'art5',
        title: 'Wykrywanie oszustw paliwowych',
        excerpt: 'Poznaj metody wykrywania i zapobiegania oszustwom paliwowym w firmach transportowych.',
        content: `
          <h2>Wykrywanie oszustw paliwowych</h2>
          
          <p>Oszustwa paliwowe stanowią poważny problem dla firm transportowych, generując znaczące straty finansowe. W tym artykule przedstawiamy metody wykrywania i zapobiegania tego typu nadużyciom.</p>
          
          <h3>1. Typowe rodzaje oszustw paliwowych</h3>
          
          <p>Aby skutecznie wykrywać oszustwa, należy zrozumieć ich mechanizmy:</p>
          
          <ul>
            <li>Zawyżanie ilości tankowanego paliwa</li>
            <li>Tankowanie do prywatnych pojemników lub pojazdów</li>
            <li>Odsprzedaż paliwa firmowego</li>
            <li>Manipulacja przebiegiem pojazdu</li>
            <li>Fałszowanie dokumentów tankowania</li>
            <li>Zmowa z pracownikami stacji paliw</li>
          </ul>
          
          <h3>2. Systemy monitorowania paliwa</h3>
          
          <p>Nowoczesne systemy monitorowania paliwa pozwalają na precyzyjną kontrolę:</p>
          
          <ul>
            <li>Sondy paliwowe mierzące poziom paliwa w zbiorniku</li>
            <li>Przepływomierze monitorujące rzeczywiste zużycie paliwa</li>
            <li>Systemy telematyczne korelujące zużycie paliwa z przebytą trasą</li>
            <li>Czujniki wykrywające nagłe ubytki paliwa</li>
          </ul>
          
          <h3>3. Analiza danych i wykrywanie anomalii</h3>
          
          <p>Zaawansowana analityka danych pozwala na identyfikację podejrzanych wzorców:</p>
          
          <ul>
            <li>Porównywanie zużycia paliwa między podobnymi pojazdami</li>
            <li>Analiza historyczna zużycia paliwa dla poszczególnych kierowców</li>
            <li>Wykrywanie nietypowych wzorców tankowania</li>
            <li>Korelacja między tankowaniami a lokalizacją pojazdu</li>
            <li>Identyfikacja odstępstw od normatywnego zużycia paliwa</li>
          </ul>
          
          <h3>4. Karty paliwowe i systemy autoryzacji</h3>
          
          <p>Karty paliwowe z zaawansowanymi funkcjami bezpieczeństwa ograniczają możliwości nadużyć:</p>
          
          <ul>
            <li>Przypisanie karty do konkretnego pojazdu i kierowcy</li>
            <li>Limity dzienne i transakcyjne</li>
            <li>Ograniczenia geograficzne i czasowe tankowania</li>
            <li>Autoryzacja transakcji kodem PIN lub biometrią</li>
            <li>Szczegółowe raporty transakcji</li>
          </ul>
          
          <h3>5. Weryfikacja obecności pojazdu</h3>
          
          <p>Systemy weryfikujące, czy pojazd faktycznie znajduje się na stacji w momencie tankowania:</p>
          
          <ul>
            <li>Integracja danych GPS z systemem kart paliwowych</li>
            <li>Automatyczne odrzucanie transakcji, gdy pojazd nie jest na stacji</li>
            <li>Alerty o podejrzanych transakcjach</li>
            <li>Weryfikacja czasu tankowania w stosunku do pojemności zbiornika</li>
          </ul>
          
          <h3>6. Polityki i procedury</h3>
          
          <p>Odpowiednie polityki i procedury stanowią podstawę systemu zapobiegania oszustwom:</p>
          
          <ul>
            <li>Jasno zdefiniowane zasady tankowania</li>
            <li>Regularne audyty i kontrole</li>
            <li>Procedury raportowania podejrzanych działań</li>
            <li>Konsekwencje dla osób dopuszczających się nadużyć</li>
            <li>Szkolenia uświadamiające dla pracowników</li>
          </ul>
          
          <h3>7. Technologie blockchain</h3>
          
          <p>Innowacyjne rozwiązania oparte na technologii blockchain zwiększają bezpieczeństwo transakcji paliwowych:</p>
          
          <ul>
            <li>Niezmienialny rejestr wszystkich transakcji</li>
            <li>Kryptograficzne zabezpieczenie danych</li>
            <li>Inteligentne kontrakty automatyzujące procesy weryfikacji</li>
            <li>Transparentność i możliwość audytu</li>
          </ul>
          
          <h3>Podsumowanie</h3>
          
          <p>Skuteczne wykrywanie oszustw paliwowych wymaga kompleksowego podejścia łączącego zaawansowane technologie, analizę danych oraz odpowiednie polityki i procedury. Inwestycja w systemy zapobiegania oszustwom zwraca się wielokrotnie poprzez redukcję strat i zwiększenie kontroli nad kosztami paliwa.</p>
        `,
        category: 'Wykrywanie oszustw',
        date: '2025-02-28',
        tags: ['oszustwa paliwowe', 'kontrola paliwa', 'bezpieczeństwo']
      }
    ];
    
    setArticles(sampleArticles);
  }, []);
  
  // Filtrowanie artykułów według kategorii
  useEffect(() => {
    if (selectedCategory) {
      const categoryName = categories.find(cat => cat.id === selectedCategory)?.name;
      const filtered = articles.filter(article => article.category === categoryName);
      setSearchResults(filtered);
      setIsSearching(true);
    } else if (isSearching) {
      setSearchResults([]);
    }
  }, [selectedCategory, categories, articles, isSearching]);
  
  // Obsługa wyszukiwania
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    try {
      setIsSearching(true);
      
      // W rzeczywistej aplikacji, tutaj byłoby wywołanie API
      // const results = await onSearch(searchQuery);
      
      // Symulacja wyników wyszukiwania
      const results = articles.filter(article => 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      
      setSearchResults(results);
      setSelectedCategory(null);
    } catch (error) {
      console.error('Error searching articles:', error);
    }
  };
  
  // Obsługa wyświetlania artykułu
  const handleViewArticle = async (articleId: string) => {
    try {
      await onArticleView(articleId);
      
      const article = articles.find(a => a.id === articleId);
      if (article) {
        setSelectedArticle(article);
        setFeedbackHelpful(null);
        setFeedbackComment('');
      }
    } catch (error) {
      console.error('Error viewing article:', error);
    }
  };
  
  // Obsługa wysyłania feedbacku
  const handleSubmitFeedback = async () => {
    if (selectedArticle && feedbackHelpful !== null) {
      try {
        await onFeedback(selectedArticle.id, feedbackHelpful, feedbackComment);
        
        // Resetowanie stanu feedbacku
        setFeedbackHelpful(null);
        setFeedbackComment('');
        
        // Symulacja potwierdzenia
        alert('Dziękujemy za opinię!');
      } catch (error) {
        console.error('Error submitting feedback:', error);
      }
    }
  };
  
  return (
    <Container>
      <Header>
        <Title>Baza wiedzy</Title>
      </Header>
      
      <SearchContainer>
        <SearchInput 
          type="text" 
          placeholder="Wyszukaj w bazie wiedzy..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <SearchButton onClick={handleSearch}>
          Szukaj
        </SearchButton>
      </SearchContainer>
      
      <ContentContainer>
        <Sidebar>
          <CategoriesList>
            {categories.map(category => (
              <CategoryItem 
                key={category.id} 
                active={selectedCategory === category.id}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name} ({category.count})
              </CategoryItem>
            ))}
          </CategoriesList>
        </Sidebar>
        
        <MainContent>
          {selectedArticle ? (
            <ArticleContent>
              <ArticleHeader>
                <ArticleContentTitle>{selectedArticle.title}</ArticleContentTitle>
                <ArticleContentMeta>
                  <div>Kategoria: {selectedArticle.category}</div>
                  <div>Data publikacji: {new Date(selectedArticle.date).toLocaleDateString()}</div>
                </ArticleContentMeta>
              </ArticleHeader>
              
              <ArticleBody dangerouslySetInnerHTML={{ __html: selectedArticle.content }} />
              
              <FeedbackContainer>
                <FeedbackTitle>Czy ten artykuł był pomocny?</FeedbackTitle>
                <FeedbackButtons>
                  <FeedbackButton 
                    selected={feedbackHelpful === true}
                    onClick={() => setFeedbackHelpful(true)}
                  >
                    Tak
                  </FeedbackButton>
                  <FeedbackButton 
                    selected={feedbackHelpful === false}
                    onClick={() => setFeedbackHelpful(false)}
                  >
                    Nie
                  </FeedbackButton>
                </FeedbackButtons>
                
                {feedbackHelpful !== null && (
                  <>
                    <FeedbackComment 
                      placeholder="Dodatkowe uwagi (opcjonalnie)..." 
                      value={feedbackComment}
                      onChange={(e) => setFeedbackComment(e.target.value)}
                    />
                    <SubmitButton onClick={handleSubmitFeedback}>
                      Wyślij opinię
                    </SubmitButton>
                  </>
                )}
              </FeedbackContainer>
              
              {selectedArticle.relatedArticles && selectedArticle.relatedArticles.length > 0 && (
                <RelatedArticles>
                  <RelatedTitle>Powiązane artykuły</RelatedTitle>
                  <RelatedList>
                    {selectedArticle.relatedArticles.map(related => (
                      <RelatedItem 
                        key={related.id}
                        onClick={() => handleViewArticle(related.id)}
                      >
                        {related.title}
                      </RelatedItem>
                    ))}
                  </RelatedList>
                </RelatedArticles>
              )}
            </ArticleContent>
          ) : isSearching ? (
            <ArticlesList>
              {searchResults.length > 0 ? (
                searchResults.map(article => (
                  <ArticleCard 
                    key={article.id}
                    onClick={() => handleViewArticle(article.id)}
                  >
                    <ArticleTitle>{article.title}</ArticleTitle>
                    <ArticleExcerpt>{article.excerpt}</ArticleExcerpt>
                    <ArticleMeta>
                      <ArticleCategory>{article.category}</ArticleCategory>
                      <ArticleDate>{new Date(article.date).toLocaleDateString()}</ArticleDate>
                    </ArticleMeta>
                  </ArticleCard>
                ))
              ) : (
                <EmptyState>
                  <EmptyStateIcon>🔍</EmptyStateIcon>
                  <EmptyStateText>Brak wyników wyszukiwania</EmptyStateText>
                  <EmptyStateSubtext>Spróbuj zmienić kryteria wyszukiwania lub wybierz kategorię z menu po lewej stronie.</EmptyStateSubtext>
                </EmptyState>
              )}
            </ArticlesList>
          ) : (
            <EmptyState>
              <EmptyStateIcon>📚</EmptyStateIcon>
              <EmptyStateText>Witaj w bazie wiedzy</EmptyStateText>
              <EmptyStateSubtext>Wyszukaj interesujące Cię informacje lub wybierz kategorię z menu po lewej stronie.</EmptyStateSubtext>
            </EmptyState>
          )}
        </MainContent>
      </ContentContainer>
    </Container>
  );
};

export default KnowledgeBase;
