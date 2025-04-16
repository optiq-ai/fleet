import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getCustomerConversations, getCustomerMessages, sendCustomerMessage } from '../../services/api/communicationService';

const Container = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 20px;
  height: 600px;
`;

const ConversationsList = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const SearchBox = styled.div`
  padding: 15px;
  border-bottom: 1px solid #eee;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 15px;
  border-radius: 20px;
  border: 1px solid #ddd;
  outline: none;
  font-size: 14px;

  &:focus {
    border-color: #1a73e8;
  }
`;

const ConversationsHeader = styled.div`
  padding: 15px;
  font-weight: bold;
  color: #333;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FilterButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f5f5f5;
    color: #1a73e8;
  }
`;

const ConversationItems = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const ConversationItem = styled.div`
  padding: 15px;
  cursor: pointer;
  border-bottom: 1px solid #eee;
  background-color: ${props => props.active ? '#e8f0fe' : props.unread ? '#f0f5ff' : 'transparent'};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => props.active ? '#e8f0fe' : '#f5f5f5'};
  }
`;

const ConversationItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`;

const ConversationName = styled.div`
  font-weight: ${props => props.unread ? 'bold' : 'normal'};
  color: #333;
  display: flex;
  align-items: center;
`;

const ConversationTime = styled.div`
  font-size: 12px;
  color: #888;
`;

const ConversationPreview = styled.div`
  font-size: 13px;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ConversationMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
  font-size: 12px;
  color: #888;
`;

const OrderNumber = styled.div`
  color: #1a73e8;
`;

const Status = styled.div`
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 11px;
  background-color: ${props => {
    switch(props.status) {
      case 'open': return '#e6f4ea';
      case 'pending': return '#fff8e6';
      case 'resolved': return '#e8f0fe';
      case 'closed': return '#f1f3f4';
      default: return '#f1f3f4';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'open': return '#34a853';
      case 'pending': return '#fb8c00';
      case 'resolved': return '#1a73e8';
      case 'closed': return '#5f6368';
      default: return '#5f6368';
    }
  }};
`;

const UnreadBadge = styled.div`
  background-color: #1a73e8;
  color: white;
  border-radius: 50%;
  min-width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  margin-left: 8px;
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #eee;
`;

const ChatHeader = styled.div`
  padding: 15px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ChatTitle = styled.div`
  font-weight: bold;
  color: #333;
  display: flex;
  flex-direction: column;
`;

const CustomerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CustomerAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #1a73e8;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
`;

const CustomerDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const CustomerName = styled.div`
  font-weight: bold;
  color: #333;
`;

const CustomerEmail = styled.div`
  font-size: 12px;
  color: #666;
`;

const OrderInfo = styled.div`
  margin-top: 8px;
  font-size: 13px;
  color: #666;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ChatActions = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f5f5f5;
    color: #1a73e8;
  }
`;

const StatusButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
  border-radius: 4px;
  border: none;
  background-color: ${props => {
    switch(props.status) {
      case 'open': return '#e6f4ea';
      case 'pending': return '#fff8e6';
      case 'resolved': return '#e8f0fe';
      case 'closed': return '#f1f3f4';
      default: return '#f1f3f4';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'open': return '#34a853';
      case 'pending': return '#fb8c00';
      case 'resolved': return '#1a73e8';
      case 'closed': return '#5f6368';
      default: return '#5f6368';
    }
  }};
  cursor: pointer;
  font-size: 13px;
  transition: background-color 0.2s;

  &:hover {
    filter: brightness(0.95);
  }
`;

const MessagesContainer = styled.div`
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #f8f9fa;
`;

const MessageGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.sent ? 'flex-end' : 'flex-start'};
  max-width: 80%;
  align-self: ${props => props.sent ? 'flex-end' : 'flex-start'};
`;

const MessageBubble = styled.div`
  padding: 10px 15px;
  border-radius: 18px;
  background-color: ${props => props.sent ? '#1a73e8' : '#fff'};
  color: ${props => props.sent ? '#fff' : '#333'};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  margin-bottom: 2px;
  border: ${props => props.sent ? 'none' : '1px solid #eee'};
`;

const MessageTime = styled.div`
  font-size: 11px;
  color: #888;
  margin-top: 2px;
  padding: 0 5px;
`;

const MessageStatus = styled.div`
  font-size: 11px;
  color: #888;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const DateSeparator = styled.div`
  text-align: center;
  margin: 10px 0;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    height: 1px;
    background-color: #eee;
    z-index: 1;
  }
`;

const DateLabel = styled.span`
  background-color: #f8f9fa;
  padding: 0 10px;
  font-size: 12px;
  color: #888;
  position: relative;
  z-index: 2;
`;

const SystemMessage = styled.div`
  text-align: center;
  margin: 10px 0;
  font-size: 12px;
  color: #666;
  font-style: italic;
  background-color: #f1f3f4;
  padding: 5px 10px;
  border-radius: 12px;
  align-self: center;
`;

const InputContainer = styled.div`
  padding: 15px;
  border-top: 1px solid #eee;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const QuickRepliesContainer = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 5px;
`;

const QuickReplyButton = styled.button`
  background-color: #f1f3f4;
  color: #333;
  border: none;
  border-radius: 16px;
  padding: 5px 12px;
  font-size: 12px;
  white-space: nowrap;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e8f0fe;
    color: #1a73e8;
  }
`;

const InputRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const AttachButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f5f5f5;
    color: #1a73e8;
  }
`;

const MessageInput = styled.input`
  flex: 1;
  padding: 10px 15px;
  border-radius: 20px;
  border: 1px solid #ddd;
  outline: none;
  font-size: 14px;

  &:focus {
    border-color: #1a73e8;
  }
`;

const SendButton = styled.button`
  background-color: #1a73e8;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1765cc;
  }

  &:disabled {
    background-color: #dadce0;
    cursor: not-allowed;
  }
`;

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #666;
  text-align: center;
  padding: 20px;
`;

const EmptyStateIcon = styled.div`
  font-size: 48px;
  color: #dadce0;
  margin-bottom: 20px;
`;

const EmptyStateTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const EmptyStateText = styled.div`
  font-size: 14px;
  max-width: 300px;
  margin-bottom: 20px;
`;

const CustomerCommunication = ({ useMockData = true }) => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSending, setIsSending] = useState(false);

  const quickReplies = [
    "Dziękujemy za kontakt z nami.",
    "Sprawdzimy to i wrócimy do Państwa.",
    "Czy mogę prosić o więcej szczegółów?",
    "Przepraszamy za niedogodności.",
    "Potwierdzamy otrzymanie zgłoszenia."
  ];

  useEffect(() => {
    const fetchConversations = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getCustomerConversations(useMockData);
        setConversations(data);
        if (data.length > 0 && !selectedConversation) {
          setSelectedConversation(data[0]);
        }
      } catch (err) {
        console.error('Error fetching customer conversations:', err);
        setError('Nie udało się pobrać listy konwersacji z klientami.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchConversations();
  }, [useMockData]);

  useEffect(() => {
    if (selectedConversation) {
      const fetchMessages = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const data = await getCustomerMessages(useMockData, selectedConversation.id);
          setMessages(data);
        } catch (err) {
          console.error('Error fetching customer messages:', err);
          setError('Nie udało się pobrać wiadomości.');
        } finally {
          setIsLoading(false);
        }
      };

      fetchMessages();
    }
  }, [selectedConversation, useMockData]);

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return;

    setIsSending(true);
    try {
      const sentMessage = await sendCustomerMessage(
        useMockData,
        selectedConversation.id,
        newMessage
      );
      
      setMessages([...messages, sentMessage]);
      setNewMessage('');
      
      // Update the conversation in the list with the new message
      const updatedConversations = conversations.map(conv => 
        conv.id === selectedConversation.id 
          ? { 
              ...conv, 
              lastMessage: `Ty: ${newMessage}`,
              lastMessageTime: new Date().toISOString()
            } 
          : conv
      );
      setConversations(updatedConversations);
    } catch (err) {
      console.error('Error sending message:', err);
      alert('Nie udało się wysłać wiadomości. Spróbuj ponownie.');
    } finally {
      setIsSending(false);
    }
  };

  const handleQuickReply = (reply) => {
    setNewMessage(reply);
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Dzisiaj';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Wczoraj';
    } else {
      return date.toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit', year: 'numeric' });
    }
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const filteredConversations = conversations.filter(conv => 
    conv.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.orderNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupMessagesByDate = (messages) => {
    const groups = {};
    
    messages.forEach(message => {
      const date = new Date(message.sentAt);
      const dateString = date.toDateString();
      
      if (!groups[dateString]) {
        groups[dateString] = [];
      }
      
      groups[dateString].push(message);
    });
    
    return Object.entries(groups).map(([date, messages]) => ({
      date,
      formattedDate: formatDate(date),
      messages
    }));
  };

  const messageGroups = groupMessagesByDate(messages);

  return (
    <Container>
      <ConversationsList>
        <SearchBox>
          <SearchInput 
            type="text" 
            placeholder="Szukaj klienta lub numeru zamówienia..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchBox>
        <ConversationsHeader>
          <span>Klienci ({filteredConversations.length})</span>
          <FilterButton title="Filtruj">
            <span className="icon icon-filter"></span>
          </FilterButton>
        </ConversationsHeader>
        <ConversationItems>
          {filteredConversations.map(conversation => (
            <ConversationItem 
              key={conversation.id}
              active={selectedConversation && selectedConversation.id === conversation.id}
              unread={conversation.unreadCount > 0}
              onClick={() => handleSelectConversation(conversation)}
            >
              <ConversationItemHeader>
                <ConversationName unread={conversation.unreadCount > 0}>
                  {conversation.customerName}
                  {conversation.unreadCount > 0 && (
                    <UnreadBadge>{conversation.unreadCount}</UnreadBadge>
                  )}
                </ConversationName>
                <ConversationTime>{formatTime(conversation.lastMessageTime)}</ConversationTime>
              </ConversationItemHeader>
              <ConversationPreview>{conversation.lastMessage}</ConversationPreview>
              <ConversationMeta>
                <OrderNumber>#{conversation.orderNumber}</OrderNumber>
                <Status status={conversation.status}>
                  {conversation.status === 'open' ? 'Otwarte' : 
                   conversation.status === 'pending' ? 'Oczekujące' :
                   conversation.status === 'resolved' ? 'Rozwiązane' : 'Zamknięte'}
                </Status>
              </ConversationMeta>
            </ConversationItem>
          ))}
        </ConversationItems>
      </ConversationsList>

      <ChatContainer>
        {selectedConversation ? (
          <>
            <ChatHeader>
              <ChatTitle>
                <CustomerInfo>
                  <CustomerAvatar>{getInitials(selectedConversation.customerName)}</CustomerAvatar>
                  <CustomerDetails>
                    <CustomerName>{selectedConversation.customerName}</CustomerName>
                    <CustomerEmail>{selectedConversation.customerEmail}</CustomerEmail>
                  </CustomerDetails>
                </CustomerInfo>
                <OrderInfo>
                  <span className="icon icon-shopping-cart"></span>
                  Zamówienie #{selectedConversation.orderNumber}
                  <StatusButton status={selectedConversation.status}>
                    <span className={`icon icon-${
                      selectedConversation.status === 'open' ? 'circle' : 
                      selectedConversation.status === 'pending' ? 'clock' :
                      selectedConversation.status === 'resolved' ? 'check-circle' : 'times-circle'
                    }`}></span>
                    {selectedConversation.status === 'open' ? 'Otwarte' : 
                     selectedConversation.status === 'pending' ? 'Oczekujące' :
                     selectedConversation.status === 'resolved' ? 'Rozwiązane' : 'Zamknięte'}
                  </StatusButton>
                </OrderInfo>
              </ChatTitle>
              <ChatActions>
                <ActionButton title="Historia zamówień">
                  <span className="icon icon-history"></span>
                </ActionButton>
                <ActionButton title="Notatki">
                  <span className="icon icon-sticky-note"></span>
                </ActionButton>
                <ActionButton title="Informacje o kliencie">
                  <span className="icon icon-info"></span>
                </ActionButton>
              </ChatActions>
            </ChatHeader>

            <MessagesContainer>
              {isLoading ? (
                <div>Ładowanie wiadomości...</div>
              ) : error ? (
                <div>{error}</div>
              ) : (
                messageGroups.map((group, groupIndex) => (
                  <React.Fragment key={group.date}>
                    <DateSeparator>
                      <DateLabel>{group.formattedDate}</DateLabel>
                    </DateSeparator>
                    {group.messages.map((message, messageIndex) => {
                      if (message.type === 'system') {
                        return (
                          <SystemMessage key={message.id}>
                            {message.content}
                          </SystemMessage>
                        );
                      }
                      
                      const isSent = message.senderId === 'agent';
                      
                      return (
                        <MessageGroup key={message.id} sent={isSent}>
                          <MessageBubble sent={isSent}>
                            {message.content}
                          </MessageBubble>
                          <MessageTime>
                            {formatTime(message.sentAt)}
                            {isSent && (
                              <MessageStatus>
                                {message.status === 'read' ? (
                                  <>
                                    <span className="icon icon-check-double"></span>
                                    Przeczytane
                                  </>
                                ) : message.status === 'delivered' ? (
                                  <>
                                    <span className="icon icon-check-double"></span>
                                    Dostarczone
                                  </>
                                ) : message.status === 'sent' ? (
                                  <>
                                    <span className="icon icon-check"></span>
                                    Wysłane
                                  </>
                                ) : (
                                  <>
                                    <span className="icon icon-clock"></span>
                                    Wysyłanie...
                                  </>
                                )}
                              </MessageStatus>
                            )}
                          </MessageTime>
                        </MessageGroup>
                      );
                    })}
                  </React.Fragment>
                ))
              )}
            </MessagesContainer>

            <InputContainer>
              <QuickRepliesContainer>
                {quickReplies.map((reply, index) => (
                  <QuickReplyButton 
                    key={index}
                    onClick={() => handleQuickReply(reply)}
                  >
                    {reply}
                  </QuickReplyButton>
                ))}
              </QuickRepliesContainer>
              <InputRow>
                <AttachButton title="Dodaj załącznik">
                  <span className="icon icon-paperclip"></span>
                </AttachButton>
                <MessageInput 
                  type="text" 
                  placeholder="Napisz wiadomość..." 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <SendButton 
                  onClick={handleSendMessage} 
                  disabled={!newMessage.trim() || isSending}
                >
                  <span className="icon icon-send"></span>
                </SendButton>
              </InputRow>
            </InputContainer>
          </>
        ) : (
          <EmptyStateContainer>
            <EmptyStateIcon>
              <span className="icon icon-customer"></span>
            </EmptyStateIcon>
            <EmptyStateTitle>Brak wybranej konwersacji</EmptyStateTitle>
            <EmptyStateText>
              Wybierz klienta z listy po lewej stronie, aby rozpocząć lub kontynuować rozmowę.
            </EmptyStateText>
          </EmptyStateContainer>
        )}
      </ChatContainer>
    </Container>
  );
};

export default CustomerCommunication;
