import { v4 as uuidv4 } from 'uuid';

// Mock data for communication dashboard
const mockDashboardData = {
  stats: {
    activeConversations: 28,
    unreadMessages: 12,
    totalMessages24h: 156
  },
  conversations: [
    {
      id: '1',
      title: 'Jan Kowalski',
      type: 'driver',
      lastMessage: 'Dostarczyłem przesyłkę do klienta.',
      lastMessageTime: new Date(Date.now() - 15 * 60000).toISOString(),
      unreadCount: 0
    },
    {
      id: '2',
      title: 'Zespół logistyczny',
      type: 'group',
      lastMessage: 'Anna: Proszę o aktualizację statusów dostaw.',
      lastMessageTime: new Date(Date.now() - 45 * 60000).toISOString(),
      unreadCount: 3
    },
    {
      id: '3',
      title: 'Piotr Nowak',
      type: 'driver',
      lastMessage: 'Mam problem z pojazdem, nie mogę uruchomić silnika.',
      lastMessageTime: new Date(Date.now() - 2 * 60 * 60000).toISOString(),
      unreadCount: 1
    },
    {
      id: '4',
      title: 'Firma XYZ',
      type: 'customer',
      lastMessage: 'Kiedy możemy spodziewać się dostawy?',
      lastMessageTime: new Date(Date.now() - 3 * 60 * 60000).toISOString(),
      unreadCount: 2
    },
    {
      id: '5',
      title: 'Tomasz Wiśniewski',
      type: 'driver',
      lastMessage: 'Jestem już w drodze do następnego klienta.',
      lastMessageTime: new Date(Date.now() - 5 * 60 * 60000).toISOString(),
      unreadCount: 0
    }
  ],
  alerts: [
    {
      id: '1',
      title: 'Pilna wiadomość od kierowcy',
      description: 'Jan Kowalski zgłasza problem z pojazdem WA12345.',
      timestamp: new Date(Date.now() - 30 * 60000).toISOString(),
      priority: 'high'
    },
    {
      id: '2',
      title: 'Opóźniona dostawa',
      description: 'Dostawa #12345 do klienta Firma XYZ jest opóźniona o 30 minut.',
      timestamp: new Date(Date.now() - 2 * 60 * 60000).toISOString(),
      priority: 'medium'
    },
    {
      id: '3',
      title: 'Nowe zamówienie',
      description: 'Otrzymano nowe zamówienie #54321 od klienta ABC Sp. z o.o.',
      timestamp: new Date(Date.now() - 4 * 60 * 60000).toISOString(),
      priority: 'low'
    }
  ]
};

// Mock data for driver conversations
const mockDriverConversations = [
  {
    id: 'd1',
    title: 'Jan Kowalski',
    lastMessage: 'Dostarczyłem przesyłkę do klienta.',
    lastMessageTime: new Date(Date.now() - 15 * 60000).toISOString(),
    unreadCount: 0,
    isOnline: true
  },
  {
    id: 'd2',
    title: 'Piotr Nowak',
    lastMessage: 'Mam problem z pojazdem, nie mogę uruchomić silnika.',
    lastMessageTime: new Date(Date.now() - 2 * 60 * 60000).toISOString(),
    unreadCount: 1,
    isOnline: true
  },
  {
    id: 'd3',
    title: 'Tomasz Wiśniewski',
    lastMessage: 'Jestem już w drodze do następnego klienta.',
    lastMessageTime: new Date(Date.now() - 5 * 60 * 60000).toISOString(),
    unreadCount: 0,
    isOnline: false
  },
  {
    id: 'd4',
    title: 'Anna Kowalczyk',
    lastMessage: 'Potrzebuję pomocy z nawigacją.',
    lastMessageTime: new Date(Date.now() - 1 * 24 * 60 * 60000).toISOString(),
    unreadCount: 0,
    isOnline: false
  },
  {
    id: 'd5',
    title: 'Marek Lewandowski',
    lastMessage: 'Czy mogę dostać dodatkowe zlecenie na dziś?',
    lastMessageTime: new Date(Date.now() - 2 * 24 * 60 * 60000).toISOString(),
    unreadCount: 0,
    isOnline: true
  }
];

// Mock data for driver messages
const mockDriverMessages = {
  'd1': [
    {
      id: 'm1',
      senderId: 'current-user',
      content: 'Dzień dobry Janie, jak wygląda sytuacja z dzisiejszymi dostawami?',
      sentAt: new Date(Date.now() - 2 * 60 * 60000).toISOString(),
      status: 'read'
    },
    {
      id: 'm2',
      senderId: 'd1',
      content: 'Dzień dobry, wszystko idzie zgodnie z planem. Właśnie dostarczyłem trzecią przesyłkę.',
      sentAt: new Date(Date.now() - 1.5 * 60 * 60000).toISOString(),
      status: 'read'
    },
    {
      id: 'm3',
      senderId: 'current-user',
      content: 'Świetnie! Czy napotkałeś jakieś problemy po drodze?',
      sentAt: new Date(Date.now() - 1 * 60 * 60000).toISOString(),
      status: 'read'
    },
    {
      id: 'm4',
      senderId: 'd1',
      content: 'Nie, wszystko przebiega sprawnie. Ruch jest umiarkowany.',
      sentAt: new Date(Date.now() - 45 * 60000).toISOString(),
      status: 'read'
    },
    {
      id: 'm5',
      senderId: 'current-user',
      content: 'Doskonale. Daj znać, gdy dostarczysz wszystkie przesyłki.',
      sentAt: new Date(Date.now() - 30 * 60000).toISOString(),
      status: 'read'
    },
    {
      id: 'm6',
      senderId: 'd1',
      content: 'Dostarczyłem przesyłkę do klienta.',
      sentAt: new Date(Date.now() - 15 * 60000).toISOString(),
      status: 'read'
    }
  ],
  'd2': [
    {
      id: 'm1',
      senderId: 'd2',
      content: 'Dzień dobry, mam problem z pojazdem. Nie mogę uruchomić silnika.',
      sentAt: new Date(Date.now() - 2 * 60 * 60000).toISOString(),
      status: 'read'
    },
    {
      id: 'm2',
      senderId: 'current-user',
      content: 'Dzień dobry Piotrze. Czy sprawdziłeś poziom paliwa?',
      sentAt: new Date(Date.now() - 1.9 * 60 * 60000).toISOString(),
      status: 'read'
    },
    {
      id: 'm3',
      senderId: 'd2',
      content: 'Tak, paliwo jest. Rozrusznik kręci, ale silnik nie odpala.',
      sentAt: new Date(Date.now() - 1.8 * 60 * 60000).toISOString(),
      status: 'read'
    },
    {
      id: 'm4',
      senderId: 'current-user',
      content: 'Rozumiem. Wysyłam pomoc drogową na Twoją lokalizację. Czy możesz potwierdzić swoje aktualne położenie?',
      sentAt: new Date(Date.now() - 1.7 * 60 * 60000).toISOString(),
      status: 'read'
    },
    {
      id: 'm5',
      senderId: 'd2',
      content: 'Jestem na ulicy Warszawskiej 45 w Krakowie, przy stacji benzynowej.',
      sentAt: new Date(Date.now() - 1.6 * 60 * 60000).toISOString(),
      status: 'read'
    }
  ],
  'd3': [
    {
      id: 'm1',
      senderId: 'current-user',
      content: 'Cześć Tomasz, jak idzie realizacja dzisiejszych dostaw?',
      sentAt: new Date(Date.now() - 6 * 60 * 60000).toISOString(),
      status: 'read'
    },
    {
      id: 'm2',
      senderId: 'd3',
      content: 'Dzień dobry, właśnie zakończyłem dostawę do klienta ABC. Wszystko przebiegło pomyślnie.',
      sentAt: new Date(Date.now() - 5.5 * 60 * 60000).toISOString(),
      status: 'read'
    },
    {
      id: 'm3',
      senderId: 'current-user',
      content: 'Świetnie! Ile dostaw zostało Ci jeszcze na dziś?',
      sentAt: new Date(Date.now() - 5.4 * 60 * 60000).toISOString(),
      status: 'read'
    },
    {
      id: 'm4',
      senderId: 'd3',
      content: 'Mam jeszcze dwie dostawy. Właśnie jadę do następnego klienta.',
      sentAt: new Date(Date.now() - 5 * 60 * 60000).toISOString(),
      status: 'read'
    }
  ],
  'd4': [
    {
      id: 'm1',
      senderId: 'd4',
      content: 'Dzień dobry, mam problem z nawigacją. Pokazuje mi błędną trasę.',
      sentAt: new Date(Date.now() - 25 * 60 * 60000).toISOString(),
      status: 'read'
    },
    {
      id: 'm2',
      senderId: 'current-user',
      content: 'Dzień dobry Anno. Jaki jest adres docelowy?',
      sentAt: new Date(Date.now() - 24.9 * 60 * 60000).toISOString(),
      status: 'read'
    },
    {
      id: 'm3',
      senderId: 'd4',
      content: 'Jadę do ul. Kwiatowa 12, Warszawa, ale nawigacja kieruje mnie na Kwiatową 12 w innej dzielnicy.',
      sentAt: new Date(Date.now() - 24.8 * 60 * 60000).toISOString(),
      status: 'read'
    },
    {
      id: 'm4',
      senderId: 'current-user',
      content: 'Rozumiem problem. Sprawdziłem w systemie, prawidłowy adres to ul. Kwiatowa 12, Warszawa-Mokotów. Wysyłam Ci poprawne współrzędne GPS.',
      sentAt: new Date(Date.now() - 24.7 * 60 * 60000).toISOString(),
      status: 'read'
    },
    {
      id: 'm5',
      senderId: 'd4',
      content: 'Dziękuję, teraz wszystko działa poprawnie.',
      sentAt: new Date(Date.now() - 24 * 60 * 60000).toISOString(),
      status: 'read'
    }
  ],
  'd5': [
    {
      id: 'm1',
      senderId: 'd5',
      content: 'Dzień dobry, czy mogę dostać dodatkowe zlecenie na dziś? Skończyłem wcześniej zaplanowane dostawy.',
      sentAt: new Date(Date.now() - 2 * 24 * 60 * 60000).toISOString(),
      status: 'read'
    },
    {
      id: 'm2',
      senderId: 'current-user',
      content: 'Dzień dobry Marku. Sprawdzę, czy mamy jakieś pilne dostawy w Twojej okolicy.',
      sentAt: new Date(Date.now() - 2 * 24 * 60 * 60000 + 5 * 60000).toISOString(),
      status: 'read'
    },
    {
      id: 'm3',
      senderId: 'current-user',
      content: 'Mamy jedną dostawę na ul. Polna 5 w Warszawie. Czy możesz ją zrealizować?',
      sentAt: new Date(Date.now() - 2 * 24 * 60 * 60000 + 10 * 60000).toISOString(),
      status: 'read'
    },
    {
      id: 'm4',
      senderId: 'd5',
      content: 'Tak, mogę ją zrealizować. Jestem w pobliżu.',
      sentAt: new Date(Date.now() - 2 * 24 * 60 * 60000 + 15 * 60000).toISOString(),
      status: 'read'
    },
    {
      id: 'm5',
      senderId: 'current-user',
      content: 'Świetnie, przypisałem Ci tę dostawę. Szczegóły znajdziesz w aplikacji.',
      sentAt: new Date(Date.now() - 2 * 24 * 60 * 60000 + 20 * 60000).toISOString(),
      status: 'read'
    }
  ]
};

// Mock data for groups
const mockGroups = [
  {
    id: 'g1',
    title: 'Zespół logistyczny',
    lastMessage: 'Anna: Proszę o aktualizację statusów dostaw.',
    lastMessageTime: new Date(Date.now() - 45 * 60000).toISOString(),
    unreadCount: 3,
    membersCount: 8
  },
  {
    id: 'g2',
    title: 'Kierowcy - Warszawa',
    lastMessage: 'Marek: Czy ktoś jest w okolicy Mokotowa?',
    lastMessageTime: new Date(Date.now() - 3 * 60 * 60000).toISOString(),
    unreadCount: 0,
    membersCount: 12
  },
  {
    id: 'g3',
    title: 'Dział obsługi klienta',
    lastMessage: 'Ty: Proszę o przygotowanie raportów z obsługi klientów za ostatni tydzień.',
    lastMessageTime: new Date(Date.now() - 1 * 24 * 60 * 60000).toISOString(),
    unreadCount: 0,
    membersCount: 5
  },
  {
    id: 'g4',
    title: 'Projekt XYZ',
    lastMessage: 'Karolina: Wysłałam aktualizację harmonogramu.',
    lastMessageTime: new Date(Date.now() - 2 * 24 * 60 * 60000).toISOString(),
    unreadCount: 0,
    membersCount: 6
  }
];

// Mock data for group messages
const mockGroupMessages = {
  'g1': [
    {
      id: 'gm1',
      senderId: 'user1',
      senderName: 'Tomasz',
      content: 'Dzień dobry wszystkim, proszę o aktualizację statusów dostaw na dzisiaj.',
      sentAt: new Date(Date.now() - 2 * 60 * 60000).toISOString(),
      status: 'read'
    },
    {
      id: 'gm2',
      senderId: 'user2',
      senderName: 'Marek',
      content: 'Dzień dobry, moje dostawy przebiegają zgodnie z planem. Zrealizowałem już 5 z 8 zaplanowanych.',
      sentAt: new Date(Date.now() - 1.8 * 60 * 60000).toISOString(),
      status: 'read'
    },
    {
      id: 'gm3',
      senderId: 'user3',
      senderName: 'Karolina',
      content: 'U mnie również wszystko idzie dobrze. Mam małe opóźnienie na jednej dostawie ze względu na korki, ale nadrobię to.',
      sentAt: new Date(Date.now() - 1.5 * 60 * 60000).toISOString(),
      status: 'read'
    },
    {
      id: 'gm4',
      senderId: 'current-user',
      senderName: 'Ty',
      content: 'Dziękuję za informacje. Proszę o bieżące aktualizacje, jeśli pojawią się jakieś problemy.',
      sentAt: new Date(Date.now() - 1 * 60 * 60000).toISOString(),
      status: 'read'
    },
    {
      id: 'gm5',
      senderId: 'user4',
      senderName: 'Anna',
      content: 'Proszę o aktualizację statusów dostaw.',
      sentAt: new Date(Date.now() - 45 * 60000).toISOString(),
      status: 'delivered'
    }
  ],
  'g2': [
    {
      id: 'gm1',
      senderId: 'user5',
      senderName: 'Jan',
      content: 'Cześć wszystkim, jak wygląda sytuacja na drogach w Warszawie?',
      sentAt: new Date(Date.now() - 5 * 60 * 60000).toISOString(),
      status: 'read'
    },
    {
      id: 'gm2',
      senderId: 'user6',
      senderName: 'Piotr',
      content: 'Na Trasie Łazienkowskiej duże korki z powodu wypadku.',
      sentAt: new Date(Date.now() - 4.8 * 60 * 60000).toISOString(),
      status: 'read'
    },
    {
      id: 'gm3',
      senderId: 'user7',
      senderName: 'Tomasz',
      content: 'Potwierdzam, lepiej omijać ten obszar. Ja jadę przez Wisłostradę, tu jest w miarę przejezdnie.',
      sentAt: new Date(Date.now() - 4.5 * 60 * 60000).toISOString(),
      status: 'read'
    },
    {
      id: 'gm4',
      senderId: 'user8',
      senderName: 'Marek',
      content: 'Czy ktoś jest w okolicy Mokotowa?',
      sentAt: new Date(Date.now() - 3 * 60 * 60000).toISOString(),
      status: 'read'
    }
  ],
  'g3': [
    {
      id: 'gm1',
      senderId: 'user9',
      senderName: 'Karolina',
      content: 'Dzień dobry, mamy kilka reklamacji do obsłużenia. Kto może się tym zająć?',
      sentAt: new Date(Date.now() - 2 * 24 * 60 * 60000).toISOString(),
      status: 'read'
    },
    {
      id: 'gm2',
      senderId: 'user10',
      senderName: 'Michał',
      content: 'Ja mogę obsłużyć reklamacje od klientów indywidualnych.',
      sentAt: new Date(Date.now() - 2 * 24 * 60 * 60000 + 15 * 60000).toISOString(),
      status: 'read'
    },
    {
      id: 'gm3',
      senderId: 'user11',
      senderName: 'Anna',
      content: 'Ja zajmę się reklamacjami od firm.',
      sentAt: new Date(Date.now() - 2 * 24 * 60 * 60000 + 30 * 60000).toISOString(),
      status: 'read'
    },
    {
      id: 'gm4',
      senderId: 'current-user',
      senderName: 'Ty',
      content: 'Proszę o przygotowanie raportów z obsługi klientów za ostatni tydzień.',
      sentAt: new Date(Date.now() - 1 * 24 * 60 * 60000).toISOString(),
      status: 'read'
    }
  ],
  'g4': [
    {
      id: 'gm1',
      senderId: 'user12',
      senderName: 'Paweł',
      content: 'Witam zespół projektowy. Musimy omówić harmonogram dostaw dla projektu XYZ.',
      sentAt: new Date(Date.now() - 3 * 24 * 60 * 60000).toISOString(),
      status: 'read'
    },
    {
      id: 'gm2',
      senderId: 'user13',
      senderName: 'Monika',
      content: 'Zgadzam się, proponuję spotkanie jutro o 10:00.',
      sentAt: new Date(Date.now() - 3 * 24 * 60 * 60000 + 30 * 60000).toISOString(),
      status: 'read'
    },
    {
      id: 'gm3',
      senderId: 'current-user',
      senderName: 'Ty',
      content: 'Pasuje mi ta godzina. Przygotuję prezentację z aktualnym statusem projektu.',
      sentAt: new Date(Date.now() - 3 * 24 * 60 * 60000 + 45 * 60000).toISOString(),
      status: 'read'
    },
    {
      id: 'gm4',
      senderId: 'user14',
      senderName: 'Karolina',
      content: 'Wysłałam aktualizację harmonogramu.',
      sentAt: new Date(Date.now() - 2 * 24 * 60 * 60000).toISOString(),
      status: 'read'
    }
  ]
};

// Mock data for customer conversations
const mockCustomerConversations = [
  {
    id: 'c1',
    customerName: 'Firma XYZ',
    customerEmail: 'kontakt@firmaxyz.pl',
    orderNumber: 'ORD-12345',
    lastMessage: 'Kiedy możemy spodziewać się dostawy?',
    lastMessageTime: new Date(Date.now() - 3 * 60 * 60000).toISOString(),
    unreadCount: 2,
    status: 'open'
  },
  {
    id: 'c2',
    customerName: 'Jan Nowak',
    customerEmail: 'jan.nowak@example.com',
    orderNumber: 'ORD-12346',
    lastMessage: 'Dziękuję za szybką odpowiedź.',
    lastMessageTime: new Date(Date.now() - 1 * 24 * 60 * 60000).toISOString(),
    unreadCount: 0,
    status: 'resolved'
  },
  {
    id: 'c3',
    customerName: 'ABC Sp. z o.o.',
    customerEmail: 'biuro@abcspzoo.pl',
    orderNumber: 'ORD-12347',
    lastMessage: 'Czy możliwa jest zmiana adresu dostawy?',
    lastMessageTime: new Date(Date.now() - 2 * 24 * 60 * 60000).toISOString(),
    unreadCount: 0,
    status: 'pending'
  },
  {
    id: 'c4',
    customerName: 'Anna Kowalska',
    customerEmail: 'anna.kowalska@example.com',
    orderNumber: 'ORD-12348',
    lastMessage: 'Ty: Przesyłka została dostarczona zgodnie z zamówieniem.',
    lastMessageTime: new Date(Date.now() - 3 * 24 * 60 * 60000).toISOString(),
    unreadCount: 0,
    status: 'closed'
  }
];

// Mock data for customer messages
const mockCustomerMessages = {
  'c1': [
    {
      id: 'cm1',
      senderId: 'customer',
      content: 'Dzień dobry, złożyłem zamówienie ORD-12345 i chciałbym wiedzieć, kiedy mogę spodziewać się dostawy?',
      sentAt: new Date(Date.now() - 4 * 60 * 60000).toISOString(),
      status: 'read'
    },
    {
      id: 'cm2',
      senderId: 'agent',
      content: 'Dzień dobry, dziękujemy za kontakt. Sprawdzę status Pańskiego zamówienia i wrócę z informacją.',
      sentAt: new Date(Date.now() - 3.9 * 60 * 60000).toISOString(),
      status: 'read'
    },
    {
      id: 'cm3',
      type: 'system',
      content: 'Agent sprawdza status zamówienia...',
      sentAt: new Date(Date.now() - 3.8 * 60 * 60000).toISOString()
    },
    {
      id: 'cm4',
      senderId: 'agent',
      content: 'Pańskie zamówienie jest obecnie w trakcie przygotowania do wysyłki. Planowana data dostawy to jutro między 10:00 a 14:00.',
      sentAt: new Date(Date.now() - 3.7 * 60 * 60000).toISOString(),
      status: 'read'
    },
    {
      id: 'cm5',
      senderId: 'customer',
      content: 'Kiedy możemy spodziewać się dostawy?',
      sentAt: new Date(Date.now() - 3 * 60 * 60000).toISOString(),
      status: 'delivered'
    }
  ],
  'c2': [
    {
      id: 'cm1',
      senderId: 'customer',
      content: 'Dzień dobry, nie otrzymałem potwierdzenia zamówienia ORD-12346.',
      sentAt: new Date(Date.now() - 2 * 24 * 60 * 60000).toISOString(),
      status: 'read'
    },
    {
      id: 'cm2',
      senderId: 'agent',
      content: 'Dzień dobry Panie Janie, przepraszamy za niedogodność. Sprawdzę to natychmiast.',
      sentAt: new Date(Date.now() - 2 * 24 * 60 * 60000 + 15 * 60000).toISOString(),
      status: 'read'
    },
    {
      id: 'cm3',
      type: 'system',
      content: 'Agent sprawdza zamówienie...',
      sentAt: new Date(Date.now() - 2 * 24 * 60 * 60000 + 20 * 60000).toISOString()
    },
    {
      id: 'cm4',
      senderId: 'agent',
      content: 'Potwierdzam, że Pańskie zamówienie zostało przyjęte do realizacji. Właśnie wysłałem ponownie potwierdzenie na Pański adres email.',
      sentAt: new Date(Date.now() - 2 * 24 * 60 * 60000 + 30 * 60000).toISOString(),
      status: 'read'
    },
    {
      id: 'cm5',
      senderId: 'customer',
      content: 'Dziękuję za szybką odpowiedź.',
      sentAt: new Date(Date.now() - 1 * 24 * 60 * 60000).toISOString(),
      status: 'read'
    }
  ],
  'c3': [
    {
      id: 'cm1',
      senderId: 'customer',
      content: 'Dzień dobry, czy możliwa jest zmiana adresu dostawy dla zamówienia ORD-12347?',
      sentAt: new Date(Date.now() - 3 * 24 * 60 * 60000).toISOString(),
      status: 'read'
    },
    {
      id: 'cm2',
      senderId: 'agent',
      content: 'Dzień dobry, tak, możemy zmienić adres dostawy. Proszę o podanie nowego adresu.',
      sentAt: new Date(Date.now() - 3 * 24 * 60 * 60000 + 30 * 60000).toISOString(),
      status: 'read'
    },
    {
      id: 'cm3',
      senderId: 'customer',
      content: 'Nowy adres to: ul. Kwiatowa 15, 00-001 Warszawa.',
      sentAt: new Date(Date.now() - 3 * 24 * 60 * 60000 + 45 * 60000).toISOString(),
      status: 'read'
    },
    {
      id: 'cm4',
      senderId: 'agent',
      content: 'Dziękuję za informację. Zmieniłem adres dostawy w systemie. Czy mogę w czymś jeszcze pomóc?',
      sentAt: new Date(Date.now() - 3 * 24 * 60 * 60000 + 60 * 60000).toISOString(),
      status: 'read'
    },
    {
      id: 'cm5',
      senderId: 'customer',
      content: 'Czy możliwa jest zmiana adresu dostawy?',
      sentAt: new Date(Date.now() - 2 * 24 * 60 * 60000).toISOString(),
      status: 'read'
    }
  ],
  'c4': [
    {
      id: 'cm1',
      senderId: 'customer',
      content: 'Dzień dobry, chciałabym potwierdzić, że moje zamówienie ORD-12348 zostało dostarczone.',
      sentAt: new Date(Date.now() - 4 * 24 * 60 * 60000).toISOString(),
      status: 'read'
    },
    {
      id: 'cm2',
      senderId: 'agent',
      content: 'Dzień dobry Pani Anno, sprawdzę to dla Pani.',
      sentAt: new Date(Date.now() - 4 * 24 * 60 * 60000 + 15 * 60000).toISOString(),
      status: 'read'
    },
    {
      id: 'cm3',
      type: 'system',
      content: 'Agent sprawdza status dostawy...',
      sentAt: new Date(Date.now() - 4 * 24 * 60 * 60000 + 20 * 60000).toISOString()
    },
    {
      id: 'cm4',
      senderId: 'agent',
      content: 'Potwierdzam, że Pani zamówienie zostało dostarczone dzisiaj o godzinie 11:23. Czy wszystko jest w porządku z przesyłką?',
      sentAt: new Date(Date.now() - 4 * 24 * 60 * 60000 + 30 * 60000).toISOString(),
      status: 'read'
    },
    {
      id: 'cm5',
      senderId: 'customer',
      content: 'Tak, wszystko jest w porządku. Dziękuję za pomoc.',
      sentAt: new Date(Date.now() - 4 * 24 * 60 * 60000 + 45 * 60000).toISOString(),
      status: 'read'
    },
    {
      id: 'cm6',
      senderId: 'agent',
      content: 'Przesyłka została dostarczona zgodnie z zamówieniem.',
      sentAt: new Date(Date.now() - 3 * 24 * 60 * 60000).toISOString(),
      status: 'read'
    }
  ]
};

// Mock data for notifications
const mockNotifications = {
  all: [
    {
      id: 'n1',
      type: 'message',
      title: 'Nowa wiadomość od kierowcy',
      content: 'Jan Kowalski: Dostarczyłem przesyłkę do klienta.',
      timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
      category: 'Wiadomości',
      read: false,
      actionable: true
    },
    {
      id: 'n2',
      type: 'alert',
      title: 'Pilna wiadomość od kierowcy',
      content: 'Piotr Nowak zgłasza problem z pojazdem WA12345.',
      timestamp: new Date(Date.now() - 2 * 60 * 60000).toISOString(),
      category: 'Alerty',
      read: false,
      actionable: true
    },
    {
      id: 'n3',
      type: 'update',
      title: 'Aktualizacja statusu zamówienia',
      content: 'Zamówienie ORD-12345 zmieniło status na "W trakcie dostawy".',
      timestamp: new Date(Date.now() - 3 * 60 * 60000).toISOString(),
      category: 'Zamówienia',
      read: true,
      actionable: true
    },
    {
      id: 'n4',
      type: 'reminder',
      title: 'Przypomnienie o spotkaniu',
      content: 'Spotkanie zespołu logistycznego za 30 minut.',
      timestamp: new Date(Date.now() - 4 * 60 * 60000).toISOString(),
      category: 'Kalendarz',
      read: true,
      actionable: true
    },
    {
      id: 'n5',
      type: 'message',
      title: 'Nowa wiadomość od klienta',
      content: 'Firma XYZ: Kiedy możemy spodziewać się dostawy?',
      timestamp: new Date(Date.now() - 3 * 60 * 60000).toISOString(),
      category: 'Wiadomości',
      read: false,
      actionable: true
    },
    {
      id: 'n6',
      type: 'update',
      title: 'Aktualizacja systemu',
      content: 'System został zaktualizowany do wersji 2.5.0.',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60000).toISOString(),
      category: 'System',
      read: true,
      actionable: false
    }
  ],
  message: [
    {
      id: 'n1',
      type: 'message',
      title: 'Nowa wiadomość od kierowcy',
      content: 'Jan Kowalski: Dostarczyłem przesyłkę do klienta.',
      timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
      category: 'Wiadomości',
      read: false,
      actionable: true
    },
    {
      id: 'n5',
      type: 'message',
      title: 'Nowa wiadomość od klienta',
      content: 'Firma XYZ: Kiedy możemy spodziewać się dostawy?',
      timestamp: new Date(Date.now() - 3 * 60 * 60000).toISOString(),
      category: 'Wiadomości',
      read: false,
      actionable: true
    }
  ],
  alert: [
    {
      id: 'n2',
      type: 'alert',
      title: 'Pilna wiadomość od kierowcy',
      content: 'Piotr Nowak zgłasza problem z pojazdem WA12345.',
      timestamp: new Date(Date.now() - 2 * 60 * 60000).toISOString(),
      category: 'Alerty',
      read: false,
      actionable: true
    }
  ],
  update: [
    {
      id: 'n3',
      type: 'update',
      title: 'Aktualizacja statusu zamówienia',
      content: 'Zamówienie ORD-12345 zmieniło status na "W trakcie dostawy".',
      timestamp: new Date(Date.now() - 3 * 60 * 60000).toISOString(),
      category: 'Zamówienia',
      read: true,
      actionable: true
    },
    {
      id: 'n6',
      type: 'update',
      title: 'Aktualizacja systemu',
      content: 'System został zaktualizowany do wersji 2.5.0.',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60000).toISOString(),
      category: 'System',
      read: true,
      actionable: false
    }
  ],
  reminder: [
    {
      id: 'n4',
      type: 'reminder',
      title: 'Przypomnienie o spotkaniu',
      content: 'Spotkanie zespołu logistycznego za 30 minut.',
      timestamp: new Date(Date.now() - 4 * 60 * 60000).toISOString(),
      category: 'Kalendarz',
      read: true,
      actionable: true
    }
  ]
};

// Mock notification preferences
const mockNotificationPreferences = {
  categories: {
    messages: true,
    alerts: true,
    updates: true,
    reminders: true
  },
  methods: {
    inApp: true,
    email: true,
    sms: false,
    push: true
  },
  frequency: 'realtime'
};

// Mock message templates
const mockMessageTemplates = [
  {
    id: 't1',
    name: 'Potwierdzenie dostawy',
    category: 'driver',
    description: 'Szablon do potwierdzenia dostawy przez kierowcę',
    content: 'Dzień dobry {{driver_name}}, prosimy o potwierdzenie dostawy zamówienia {{order_number}} do klienta. Dziękujemy!'
  },
  {
    id: 't2',
    name: 'Informacja o opóźnieniu',
    category: 'customer',
    description: 'Szablon do informowania klienta o opóźnieniu dostawy',
    content: 'Szanowny Kliencie, informujemy, że dostawa zamówienia {{order_number}} może być opóźniona o około 30 minut. Przepraszamy za niedogodności i dziękujemy za wyrozumiałość.'
  },
  {
    id: 't3',
    name: 'Przypomnienie o spotkaniu',
    category: 'team',
    description: 'Szablon przypomnienia o spotkaniu zespołu',
    content: 'Przypominamy o spotkaniu zespołu {{team_name}} w dniu {{date}} o godzinie {{time}}. Temat spotkania: {{project_name}}.'
  },
  {
    id: 't4',
    name: 'Alert systemowy',
    category: 'notification',
    description: 'Szablon alertu systemowego',
    content: '{{notification_title}}: {{notification_content}}. Prosimy o pilne sprawdzenie.'
  },
  {
    id: 't5',
    name: 'Raport dzienny',
    category: 'system',
    description: 'Szablon raportu dziennego',
    content: 'Raport dzienny za {{date}}:\n- Liczba dostaw: {{delivery_count}}\n- Liczba problemów: {{issue_count}}\n- Średni czas dostawy: {{average_delivery_time}}'
  }
];

// Mock analytics data
const mockAnalyticsData = {
  messageStats: {
    total: 1256,
    trend: 12,
    resolutionRate: 94,
    resolutionTrend: 3
  },
  responseTime: {
    average: 8,
    trend: -15
  },
  messageVolume: [
    { label: 'Pon', value: 145 },
    { label: 'Wt', value: 132 },
    { label: 'Śr', value: 158 },
    { label: 'Czw', value: 175 },
    { label: 'Pt', value: 201 },
    { label: 'Sob', value: 98 },
    { label: 'Nd', value: 65 }
  ],
  channelDistribution: [
    { channel: 'driver', value: 45, color: '#1a73e8' },
    { channel: 'customer', value: 30, color: '#34a853' },
    { channel: 'team', value: 15, color: '#fbbc04' },
    { channel: 'notification', value: 10, color: '#ea4335' }
  ],
  topPerformers: [
    { name: 'Anna Kowalska', channel: 'customer', messages: 145, responseTime: 5, resolutionRate: 98 },
    { name: 'Tomasz Nowak', channel: 'driver', messages: 132, responseTime: 7, resolutionRate: 95 },
    { name: 'Marek Wiśniewski', channel: 'team', messages: 98, responseTime: 10, resolutionRate: 92 },
    { name: 'Karolina Lewandowska', channel: 'customer', messages: 87, responseTime: 6, resolutionRate: 97 },
    { name: 'Piotr Kowalczyk', channel: 'driver', messages: 76, responseTime: 8, resolutionRate: 94 }
  ],
  messagesByDay: [
    { label: '01.04', value: 120 },
    { label: '02.04', value: 135 },
    { label: '03.04', value: 115 },
    { label: '04.04', value: 145 },
    { label: '05.04', value: 160 },
    { label: '06.04', value: 190 },
    { label: '07.04', value: 170 }
  ],
  messagesByType: [
    { name: 'Zapytania', count: 450, percentage: 35, trend: 5 },
    { name: 'Problemy', count: 320, percentage: 25, trend: -3 },
    { name: 'Aktualizacje statusu', count: 280, percentage: 22, trend: 8 },
    { name: 'Potwierdzenia', count: 150, percentage: 12, trend: 2 },
    { name: 'Inne', count: 56, percentage: 6, trend: 0 }
  ]
};

// API functions
export const getCommunicationDashboard = async (useMockData = true) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (useMockData) {
    return mockDashboardData;
  } else {
    // In a real implementation, this would call the actual API
    throw new Error('Real API not implemented');
  }
};

export const getConversations = async (useMockData = true, type = 'all') => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (useMockData) {
    if (type === 'driver') {
      return mockDriverConversations;
    } else {
      return mockDashboardData.conversations;
    }
  } else {
    // In a real implementation, this would call the actual API
    throw new Error('Real API not implemented');
  }
};

export const getMessages = async (useMockData = true, conversationId) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (useMockData) {
    return mockDriverMessages[conversationId] || [];
  } else {
    // In a real implementation, this would call the actual API
    throw new Error('Real API not implemented');
  }
};

export const sendMessage = async (useMockData = true, conversationId, content) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  if (useMockData) {
    const newMessage = {
      id: uuidv4(),
      senderId: 'current-user',
      content,
      sentAt: new Date().toISOString(),
      status: 'sent'
    };
    
    // In a real implementation, this would update the backend
    return newMessage;
  } else {
    // In a real implementation, this would call the actual API
    throw new Error('Real API not implemented');
  }
};

export const getGroups = async (useMockData = true) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (useMockData) {
    return mockGroups;
  } else {
    // In a real implementation, this would call the actual API
    throw new Error('Real API not implemented');
  }
};

export const getGroupMessages = async (useMockData = true, groupId) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (useMockData) {
    return mockGroupMessages[groupId] || [];
  } else {
    // In a real implementation, this would call the actual API
    throw new Error('Real API not implemented');
  }
};

export const sendGroupMessage = async (useMockData = true, groupId, content) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  if (useMockData) {
    const newMessage = {
      id: uuidv4(),
      senderId: 'current-user',
      senderName: 'Ty',
      content,
      sentAt: new Date().toISOString(),
      status: 'sent'
    };
    
    // In a real implementation, this would update the backend
    return newMessage;
  } else {
    // In a real implementation, this would call the actual API
    throw new Error('Real API not implemented');
  }
};

export const createGroup = async (useMockData = true, name, description) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (useMockData) {
    const newGroup = {
      id: uuidv4(),
      title: name,
      description,
      lastMessage: 'Grupa została utworzona',
      lastMessageTime: new Date().toISOString(),
      unreadCount: 0,
      membersCount: 1
    };
    
    // In a real implementation, this would update the backend
    return newGroup;
  } else {
    // In a real implementation, this would call the actual API
    throw new Error('Real API not implemented');
  }
};

export const getCustomerConversations = async (useMockData = true) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (useMockData) {
    return mockCustomerConversations;
  } else {
    // In a real implementation, this would call the actual API
    throw new Error('Real API not implemented');
  }
};

export const getCustomerMessages = async (useMockData = true, conversationId) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (useMockData) {
    return mockCustomerMessages[conversationId] || [];
  } else {
    // In a real implementation, this would call the actual API
    throw new Error('Real API not implemented');
  }
};

export const sendCustomerMessage = async (useMockData = true, conversationId, content) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  if (useMockData) {
    const newMessage = {
      id: uuidv4(),
      senderId: 'agent',
      content,
      sentAt: new Date().toISOString(),
      status: 'sent'
    };
    
    // In a real implementation, this would update the backend
    return newMessage;
  } else {
    // In a real implementation, this would call the actual API
    throw new Error('Real API not implemented');
  }
};

export const getNotifications = async (useMockData = true, type = 'all') => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (useMockData) {
    return {
      notifications: mockNotifications[type] || mockNotifications.all,
      preferences: mockNotificationPreferences
    };
  } else {
    // In a real implementation, this would call the actual API
    throw new Error('Real API not implemented');
  }
};

export const markNotificationAsRead = async (useMockData = true, notificationId) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  if (useMockData) {
    // In a real implementation, this would update the backend
    return { success: true };
  } else {
    // In a real implementation, this would call the actual API
    throw new Error('Real API not implemented');
  }
};

export const updateNotificationPreferences = async (useMockData = true, category, enabled) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  if (useMockData) {
    // Create a deep copy of the preferences
    const updatedPreferences = JSON.parse(JSON.stringify(mockNotificationPreferences));
    
    // Update the specified category
    if (category in updatedPreferences.categories) {
      updatedPreferences.categories[category] = enabled;
    } else if (category in updatedPreferences.methods) {
      updatedPreferences.methods[category] = enabled;
    } else if (category === 'frequency') {
      updatedPreferences.frequency = enabled;
    }
    
    // In a real implementation, this would update the backend
    return updatedPreferences;
  } else {
    // In a real implementation, this would call the actual API
    throw new Error('Real API not implemented');
  }
};

export const getMessageTemplates = async (useMockData = true) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (useMockData) {
    return mockMessageTemplates;
  } else {
    // In a real implementation, this would call the actual API
    throw new Error('Real API not implemented');
  }
};

export const createMessageTemplate = async (useMockData = true, templateData) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (useMockData) {
    const newTemplate = {
      id: uuidv4(),
      ...templateData
    };
    
    // In a real implementation, this would update the backend
    return newTemplate;
  } else {
    // In a real implementation, this would call the actual API
    throw new Error('Real API not implemented');
  }
};

export const updateMessageTemplate = async (useMockData = true, templateId, templateData) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  if (useMockData) {
    const updatedTemplate = {
      id: templateId,
      ...templateData
    };
    
    // In a real implementation, this would update the backend
    return updatedTemplate;
  } else {
    // In a real implementation, this would call the actual API
    throw new Error('Real API not implemented');
  }
};

export const deleteMessageTemplate = async (useMockData = true, templateId) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (useMockData) {
    // In a real implementation, this would update the backend
    return { success: true };
  } else {
    // In a real implementation, this would call the actual API
    throw new Error('Real API not implemented');
  }
};

export const getCommunicationAnalytics = async (useMockData = true, filters = {}) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (useMockData) {
    // In a real implementation, this would filter the data based on the provided filters
    return mockAnalyticsData;
  } else {
    // In a real implementation, this would call the actual API
    throw new Error('Real API not implemented');
  }
};
