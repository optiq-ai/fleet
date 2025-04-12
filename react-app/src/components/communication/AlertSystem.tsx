import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface Alert {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  timestamp: string;
  read: boolean;
  category: string;
  priority: 'low' | 'medium' | 'high';
  actionRequired: boolean;
  link?: string;
}

interface AlertSystemProps {
  userId: string;
  onMarkAsRead: (alertId: string) => Promise<void>;
  onDismiss: (alertId: string) => Promise<void>;
  onAction: (alertId: string, action: string) => Promise<void>;
}

const AlertContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const AlertHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const AlertTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 500;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const FilterSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
`;

const AlertCard = styled.div<{ type: 'info' | 'warning' | 'error' | 'success'; read: boolean }>`
  padding: 16px;
  border-radius: 8px;
  background-color: ${props => 
    props.type === 'info' ? '#e3f2fd' : 
    props.type === 'warning' ? '#fff8e1' : 
    props.type === 'error' ? '#ffebee' : 
    '#e8f5e9'
  };
  border-left: 4px solid ${props => 
    props.type === 'info' ? '#2196f3' : 
    props.type === 'warning' ? '#ffc107' : 
    props.type === 'error' ? '#f44336' : 
    '#4caf50'
  };
  opacity: ${props => props.read ? 0.7 : 1};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const AlertCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
`;

const AlertCardTitle = styled.div`
  font-weight: 500;
  font-size: 16px;
`;

const AlertCardTime = styled.div`
  font-size: 12px;
  color: #666;
`;

const AlertCardMessage = styled.div`
  margin-bottom: 12px;
`;

const AlertCardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AlertCardMeta = styled.div`
  display: flex;
  gap: 12px;
  font-size: 12px;
  color: #666;
`;

const PriorityBadge = styled.span<{ priority: 'low' | 'medium' | 'high' }>`
  display: inline-block;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  background-color: ${props => 
    props.priority === 'high' ? '#ffebee' : 
    props.priority === 'medium' ? '#fff8e1' : 
    '#e8f5e9'
  };
  color: ${props => 
    props.priority === 'high' ? '#c62828' : 
    props.priority === 'medium' ? '#f57f17' : 
    '#2e7d32'
  };
`;

const CategoryBadge = styled.span`
  display: inline-block;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  background-color: #e0e0e0;
  color: #333;
`;

const AlertCardActions = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button`
  padding: 4px 8px;
  background-color: transparent;
  color: #3f51b5;
  border: 1px solid #3f51b5;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  
  &:hover {
    background-color: #e8eaf6;
  }
`;

const DismissButton = styled.button`
  padding: 4px 8px;
  background-color: transparent;
  color: #666;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

const EmptyState = styled.div`
  padding: 32px;
  text-align: center;
  color: #666;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
`;

const PageButton = styled.button<{ active?: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 4px;
  border: 1px solid ${props => props.active ? '#3f51b5' : '#ddd'};
  background-color: ${props => props.active ? '#e8eaf6' : 'white'};
  color: ${props => props.active ? '#3f51b5' : '#333'};
  cursor: pointer;
  
  &:hover {
    background-color: #f5f5f5;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const AlertSystem: React.FC<AlertSystemProps> = ({ userId, onMarkAsRead, onDismiss, onAction }) => {
  // Stan dla alertów
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [filteredAlerts, setFilteredAlerts] = useState<Alert[]>([]);
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [readFilter, setReadFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const alertsPerPage = 5;
  
  // Przykładowe dane
  useEffect(() => {
    // Symulacja pobrania alertów
    const sampleAlerts: Alert[] = [
      {
        id: 'alert1',
        title: 'Wykryto podejrzaną transakcję',
        message: 'System wykrył podejrzaną transakcję dla pojazdu #1234. Wymagana weryfikacja.',
        type: 'warning',
        timestamp: '2025-04-12T09:30:00Z',
        read: false,
        category: 'Fraud',
        priority: 'high',
        actionRequired: true,
        link: '/fraud-detection'
      },
      {
        id: 'alert2',
        title: 'Pojazd wymaga konserwacji',
        message: 'Pojazd #5678 wymaga planowej konserwacji w ciągu najbliższych 3 dni.',
        type: 'info',
        timestamp: '2025-04-12T10:15:00Z',
        read: false,
        category: 'Maintenance',
        priority: 'medium',
        actionRequired: true
      },
      {
        id: 'alert3',
        title: 'Przekroczenie limitu prędkości',
        message: 'Kierowca Jan Kowalski przekroczył limit prędkości o 20 km/h na trasie A4.',
        type: 'error',
        timestamp: '2025-04-12T11:45:00Z',
        read: false,
        category: 'Safety',
        priority: 'high',
        actionRequired: false
      },
      {
        id: 'alert4',
        title: 'Nowy raport dostępny',
        message: 'Miesięczny raport zużycia paliwa jest już dostępny do pobrania.',
        type: 'info',
        timestamp: '2025-04-11T14:20:00Z',
        read: true,
        category: 'Reports',
        priority: 'low',
        actionRequired: false,
        link: '/reports'
      },
      {
        id: 'alert5',
        title: 'Aktualizacja systemu',
        message: 'System zostanie zaktualizowany dzisiaj o 22:00. Spodziewany czas niedostępności: 30 minut.',
        type: 'info',
        timestamp: '2025-04-11T09:00:00Z',
        read: true,
        category: 'System',
        priority: 'medium',
        actionRequired: false
      },
      {
        id: 'alert6',
        title: 'Nowa wiadomość',
        message: 'Otrzymałeś nową wiadomość od Anny Nowak dotyczącą harmonogramu dostaw.',
        type: 'info',
        timestamp: '2025-04-10T16:30:00Z',
        read: false,
        category: 'Messages',
        priority: 'low',
        actionRequired: true,
        link: '/messages'
      },
      {
        id: 'alert7',
        title: 'Niski poziom paliwa',
        message: 'Pojazd #9012 ma niski poziom paliwa (poniżej 15%). Zalecane tankowanie.',
        type: 'warning',
        timestamp: '2025-04-10T13:10:00Z',
        read: false,
        category: 'Vehicles',
        priority: 'medium',
        actionRequired: false
      },
      {
        id: 'alert8',
        title: 'Zakończone zadanie',
        message: 'Zadanie "Dostawa do Warszawy" zostało zakończone pomyślnie.',
        type: 'success',
        timestamp: '2025-04-09T18:45:00Z',
        read: true,
        category: 'Tasks',
        priority: 'low',
        actionRequired: false
      }
    ];
    
    setAlerts(sampleAlerts);
  }, [userId]);
  
  // Filtrowanie alertów
  useEffect(() => {
    let filtered = [...alerts];
    
    // Filtrowanie po typie
    if (typeFilter !== 'all') {
      filtered = filtered.filter(alert => alert.type === typeFilter);
    }
    
    // Filtrowanie po priorytecie
    if (priorityFilter !== 'all') {
      filtered = filtered.filter(alert => alert.priority === priorityFilter);
    }
    
    // Filtrowanie po statusie przeczytania
    if (readFilter === 'read') {
      filtered = filtered.filter(alert => alert.read);
    } else if (readFilter === 'unread') {
      filtered = filtered.filter(alert => !alert.read);
    }
    
    // Sortowanie po czasie (najnowsze pierwsze)
    filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    
    setFilteredAlerts(filtered);
    setTotalPages(Math.ceil(filtered.length / alertsPerPage));
    setCurrentPage(1);
  }, [alerts, typeFilter, priorityFilter, readFilter]);
  
  // Obsługa oznaczania alertu jako przeczytany
  const handleMarkAsRead = async (alertId: string) => {
    try {
      await onMarkAsRead(alertId);
      
      // Aktualizacja stanu alertów
      setAlerts(prev => 
        prev.map(alert => 
          alert.id === alertId ? { ...alert, read: true } : alert
        )
      );
    } catch (error) {
      console.error('Error marking alert as read:', error);
    }
  };
  
  // Obsługa odrzucania alertu
  const handleDismiss = async (alertId: string) => {
    try {
      await onDismiss(alertId);
      
      // Usunięcie alertu ze stanu
      setAlerts(prev => prev.filter(alert => alert.id !== alertId));
    } catch (error) {
      console.error('Error dismissing alert:', error);
    }
  };
  
  // Obsługa akcji alertu
  const handleAction = async (alertId: string) => {
    try {
      await onAction(alertId, 'primary');
      
      // Oznaczenie alertu jako przeczytany
      handleMarkAsRead(alertId);
    } catch (error) {
      console.error('Error performing alert action:', error);
    }
  };
  
  // Formatowanie czasu
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };
  
  // Paginacja
  const paginatedAlerts = filteredAlerts.slice(
    (currentPage - 1) * alertsPerPage,
    currentPage * alertsPerPage
  );
  
  return (
    <AlertContainer>
      <AlertHeader>
        <AlertTitle>Powiadomienia i alerty</AlertTitle>
        <FilterContainer>
          <FilterSelect 
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">Wszystkie typy</option>
            <option value="info">Informacje</option>
            <option value="warning">Ostrzeżenia</option>
            <option value="error">Błędy</option>
            <option value="success">Sukcesy</option>
          </FilterSelect>
          
          <FilterSelect 
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="all">Wszystkie priorytety</option>
            <option value="high">Wysoki</option>
            <option value="medium">Średni</option>
            <option value="low">Niski</option>
          </FilterSelect>
          
          <FilterSelect 
            value={readFilter}
            onChange={(e) => setReadFilter(e.target.value)}
          >
            <option value="all">Wszystkie</option>
            <option value="read">Przeczytane</option>
            <option value="unread">Nieprzeczytane</option>
          </FilterSelect>
        </FilterContainer>
      </AlertHeader>
      
      {paginatedAlerts.length > 0 ? (
        paginatedAlerts.map(alert => (
          <AlertCard 
            key={alert.id} 
            type={alert.type}
            read={alert.read}
            onClick={() => !alert.read && handleMarkAsRead(alert.id)}
          >
            <AlertCardHeader>
              <AlertCardTitle>{alert.title}</AlertCardTitle>
              <AlertCardTime>{formatTime(alert.timestamp)}</AlertCardTime>
            </AlertCardHeader>
            
            <AlertCardMessage>{alert.message}</AlertCardMessage>
            
            <AlertCardFooter>
              <AlertCardMeta>
                <PriorityBadge priority={alert.priority}>
                  {alert.priority === 'high' ? 'Wysoki' : 
                   alert.priority === 'medium' ? 'Średni' : 
                   'Niski'}
                </PriorityBadge>
                <CategoryBadge>{alert.category}</CategoryBadge>
              </AlertCardMeta>
              
              <AlertCardActions>
                {alert.actionRequired && (
                  <ActionButton onClick={() => handleAction(alert.id)}>
                    {alert.type === 'warning' || alert.type === 'error' ? 'Rozwiąż' : 'Przejdź'}
                  </ActionButton>
                )}
                <DismissButton onClick={() => handleDismiss(alert.id)}>
                  Odrzuć
                </DismissButton>
              </AlertCardActions>
            </AlertCardFooter>
          </AlertCard>
        ))
      ) : (
        <EmptyState>
          Brak alertów spełniających kryteria filtrowania.
        </EmptyState>
      )}
      
      {totalPages > 1 && (
        <Pagination>
          <PageButton 
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            &lt;
          </PageButton>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <PageButton 
              key={page}
              active={page === currentPage}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </PageButton>
          ))}
          
          <PageButton 
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            &gt;
          </PageButton>
        </Pagination>
      )}
    </AlertContainer>
  );
};

export default AlertSystem;
