import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface Message {
  id: string;
  sender: string;
  recipient: string;
  content: string;
  timestamp: string;
  read: boolean;
}

interface InAppMessagingProps {
  userId: string;
  onSendMessage: (message: Omit<Message, 'id' | 'timestamp' | 'read'>) => Promise<void>;
  onMarkAsRead: (messageId: string) => Promise<void>;
}

const MessagingContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
`;

const MessagingHeader = styled.div`
  padding: 16px;
  background-color: #3f51b5;
  color: white;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ContactsList = styled.div`
  width: 30%;
  border-right: 1px solid #e0e0e0;
  overflow-y: auto;
  max-height: 500px;
`;

const ContactItem = styled.div<{ active: boolean }>`
  padding: 12px 16px;
  border-bottom: 1px solid #e0e0e0;
  cursor: pointer;
  background-color: ${props => props.active ? '#e8eaf6' : 'white'};
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

const ContactName = styled.div`
  font-weight: 500;
`;

const LastMessage = styled.div`
  font-size: 12px;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const UnreadBadge = styled.span`
  display: inline-block;
  background-color: #f44336;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  font-size: 12px;
  margin-left: 8px;
`;

const MessagesArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const MessagesList = styled.div`
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 400px;
`;

const MessageBubble = styled.div<{ sent: boolean }>`
  max-width: 70%;
  padding: 12px;
  border-radius: 8px;
  background-color: ${props => props.sent ? '#e8eaf6' : '#f5f5f5'};
  align-self: ${props => props.sent ? 'flex-end' : 'flex-start'};
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    ${props => props.sent ? 'right: -8px;' : 'left: -8px;'}
    width: 0;
    height: 0;
    border: 8px solid transparent;
    border-top-color: ${props => props.sent ? '#e8eaf6' : '#f5f5f5'};
    border-bottom: 0;
    margin-bottom: -8px;
  }
`;

const MessageContent = styled.div`
  margin-bottom: 4px;
`;

const MessageTime = styled.div`
  font-size: 10px;
  color: #666;
  text-align: right;
`;

const MessageInput = styled.div`
  display: flex;
  padding: 12px;
  border-top: 1px solid #e0e0e0;
`;

const TextInput = styled.input`
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 8px;
`;

const SendButton = styled.button`
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

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #e0e0e0;
`;

const Tab = styled.div<{ active: boolean }>`
  padding: 12px 24px;
  cursor: pointer;
  font-weight: ${props => props.active ? '500' : 'normal'};
  color: ${props => props.active ? '#3f51b5' : '#666'};
  border-bottom: 2px solid ${props => props.active ? '#3f51b5' : 'transparent'};
  transition: all 0.3s ease;
  
  &:hover {
    color: #3f51b5;
    background-color: #f5f5f5;
  }
`;

const MessagingLayout = styled.div`
  display: flex;
  height: 500px;
`;

const InAppMessaging: React.FC<InAppMessagingProps> = ({ userId, onSendMessage, onMarkAsRead }) => {
  // Stan dla wiadomości i kontaktów
  const [messages, setMessages] = useState<Message[]>([]);
  const [contacts, setContacts] = useState<{ id: string; name: string; unreadCount: number }[]>([]);
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const [messageText, setMessageText] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'messages' | 'teams'>('messages');
  
  // Przykładowe dane
  useEffect(() => {
    // Symulacja pobrania kontaktów
    setContacts([
      { id: 'user1', name: 'Jan Kowalski', unreadCount: 2 },
      { id: 'user2', name: 'Anna Nowak', unreadCount: 0 },
      { id: 'user3', name: 'Piotr Wiśniewski', unreadCount: 1 },
      { id: 'user4', name: 'Katarzyna Dąbrowska', unreadCount: 0 },
      { id: 'user5', name: 'Michał Lewandowski', unreadCount: 3 },
    ]);
    
    // Symulacja pobrania wiadomości
    setMessages([
      {
        id: 'msg1',
        sender: 'user1',
        recipient: userId,
        content: 'Cześć, czy możesz sprawdzić raport z wczorajszego dnia?',
        timestamp: '2025-04-11T14:30:00Z',
        read: false
      },
      {
        id: 'msg2',
        sender: userId,
        recipient: 'user1',
        content: 'Oczywiście, sprawdzę to w ciągu godziny.',
        timestamp: '2025-04-11T14:35:00Z',
        read: true
      },
      {
        id: 'msg3',
        sender: 'user1',
        recipient: userId,
        content: 'Dziękuję, daj znać jak skończysz.',
        timestamp: '2025-04-11T14:40:00Z',
        read: false
      },
      {
        id: 'msg4',
        sender: 'user3',
        recipient: userId,
        content: 'Mamy problem z pojazdem #1234, możesz pomóc?',
        timestamp: '2025-04-11T15:20:00Z',
        read: false
      },
      {
        id: 'msg5',
        sender: 'user5',
        recipient: userId,
        content: 'Przypominam o jutrzejszym spotkaniu zespołu o 10:00.',
        timestamp: '2025-04-11T16:15:00Z',
        read: false
      },
      {
        id: 'msg6',
        sender: 'user5',
        recipient: userId,
        content: 'Proszę przygotować raport miesięczny.',
        timestamp: '2025-04-11T16:20:00Z',
        read: false
      },
      {
        id: 'msg7',
        sender: 'user5',
        recipient: userId,
        content: 'Również potrzebujemy aktualizacji statusu projektu.',
        timestamp: '2025-04-11T16:25:00Z',
        read: false
      },
    ]);
  }, [userId]);
  
  // Filtrowanie wiadomości dla wybranego kontaktu
  const filteredMessages = selectedContact
    ? messages.filter(
        msg => 
          (msg.sender === selectedContact && msg.recipient === userId) || 
          (msg.sender === userId && msg.recipient === selectedContact)
      ).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
    : [];
  
  // Obsługa wysyłania wiadomości
  const handleSendMessage = async () => {
    if (!messageText.trim() || !selectedContact) return;
    
    try {
      await onSendMessage({
        sender: userId,
        recipient: selectedContact,
        content: messageText
      });
      
      // Symulacja dodania wiadomości do stanu
      const newMessage: Message = {
        id: `msg${Date.now()}`,
        sender: userId,
        recipient: selectedContact,
        content: messageText,
        timestamp: new Date().toISOString(),
        read: true
      };
      
      setMessages(prev => [...prev, newMessage]);
      setMessageText('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  
  // Obsługa oznaczania wiadomości jako przeczytane
  const handleMarkAsRead = async (messageId: string) => {
    try {
      await onMarkAsRead(messageId);
      
      // Aktualizacja stanu wiadomości
      setMessages(prev => 
        prev.map(msg => 
          msg.id === messageId ? { ...msg, read: true } : msg
        )
      );
      
      // Aktualizacja licznika nieprzeczytanych wiadomości
      if (selectedContact) {
        setContacts(prev => 
          prev.map(contact => 
            contact.id === selectedContact 
              ? { ...contact, unreadCount: Math.max(0, contact.unreadCount - 1) } 
              : contact
          )
        );
      }
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  };
  
  // Obsługa wyboru kontaktu
  const handleContactSelect = (contactId: string) => {
    setSelectedContact(contactId);
    
    // Oznaczenie wszystkich wiadomości od tego kontaktu jako przeczytane
    messages
      .filter(msg => msg.sender === contactId && msg.recipient === userId && !msg.read)
      .forEach(msg => handleMarkAsRead(msg.id));
  };
  
  // Formatowanie czasu
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <MessagingContainer>
      <MessagingHeader>
        Komunikacja
      </MessagingHeader>
      
      <TabsContainer>
        <Tab 
          active={activeTab === 'messages'} 
          onClick={() => setActiveTab('messages')}
        >
          Wiadomości
        </Tab>
        <Tab 
          active={activeTab === 'teams'} 
          onClick={() => setActiveTab('teams')}
        >
          Zespoły
        </Tab>
      </TabsContainer>
      
      {activeTab === 'messages' && (
        <MessagingLayout>
          <ContactsList>
            {contacts.map(contact => (
              <ContactItem 
                key={contact.id} 
                active={selectedContact === contact.id}
                onClick={() => handleContactSelect(contact.id)}
              >
                <ContactName>
                  {contact.name}
                  {contact.unreadCount > 0 && (
                    <UnreadBadge>{contact.unreadCount}</UnreadBadge>
                  )}
                </ContactName>
                <LastMessage>
                  {messages
                    .filter(msg => msg.sender === contact.id && msg.recipient === userId)
                    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0]?.content || 'Brak wiadomości'}
                </LastMessage>
              </ContactItem>
            ))}
          </ContactsList>
          
          <MessagesArea>
            <MessagesList>
              {filteredMessages.map(message => (
                <MessageBubble 
                  key={message.id} 
                  sent={message.sender === userId}
                >
                  <MessageContent>{message.content}</MessageContent>
                  <MessageTime>{formatTime(message.timestamp)}</MessageTime>
                </MessageBubble>
              ))}
            </MessagesList>
            
            <MessageInput>
              <TextInput 
                type="text" 
                placeholder="Wpisz wiadomość..." 
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                disabled={!selectedContact}
              />
              <SendButton 
                onClick={handleSendMessage}
                disabled={!messageText.trim() || !selectedContact}
              >
                Wyślij
              </SendButton>
            </MessageInput>
          </MessagesArea>
        </MessagingLayout>
      )}
      
      {activeTab === 'teams' && (
        <div style={{ padding: '16px' }}>
          <p>Funkcjonalność zespołów będzie dostępna wkrótce.</p>
        </div>
      )}
    </MessagingContainer>
  );
};

export default InAppMessaging;
