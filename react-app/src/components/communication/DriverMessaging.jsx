import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getConversations, getMessages, sendMessage } from '../../services/api/communicationService';

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

const StatusIndicator = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => props.online ? '#34a853' : '#dadce0'};
  margin-right: 8px;
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
  align-items: center;
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

const InputContainer = styled.div`
  padding: 15px;
  border-top: 1px solid #eee;
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

const EmptyStateButton = styled.button`
  background-color: #1a73e8;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1765cc;
  }
`;

const DriverMessaging = ({ useMockData = true }) => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const fetchConversations = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getConversations(useMockData, 'driver');
        setConversations(data);
        if (data.length > 0 && !selectedConversation) {
          setSelectedConversation(data[0]);
        }
      } catch (err) {
        console.error('Error fetching conversations:', err);
        setError('Nie udało się pobrać listy konwersacji.');
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
          const data = await getMessages(useMockData, selectedConversation.id);
          setMessages(data);
        } catch (err) {
          console.error('Error fetching messages:', err);
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
      const sentMessage = await sendMessage(
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
              lastMessage: newMessage,
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

  const filteredConversations = conversations.filter(conv => 
    conv.title.toLowerCase().includes(searchQuery.toLowerCase())
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
            placeholder="Szukaj kierowcy..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchBox>
        <ConversationsHeader>
          Kierowcy ({filteredConversations.length})
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
                  <StatusIndicator online={conversation.isOnline} />
                  {conversation.title}
                  {conversation.unreadCount > 0 && (
                    <UnreadBadge>{conversation.unreadCount}</UnreadBadge>
                  )}
                </ConversationName>
                <ConversationTime>{formatTime(conversation.lastMessageTime)}</ConversationTime>
              </ConversationItemHeader>
              <ConversationPreview>{conversation.lastMessage}</ConversationPreview>
            </ConversationItem>
          ))}
        </ConversationItems>
      </ConversationsList>

      <ChatContainer>
        {selectedConversation ? (
          <>
            <ChatHeader>
              <ChatTitle>
                <StatusIndicator online={selectedConversation.isOnline} />
                {selectedConversation.title}
              </ChatTitle>
              <ChatActions>
                <ActionButton title="Połączenie głosowe">
                  <span className="icon icon-phone"></span>
                </ActionButton>
                <ActionButton title="Połączenie wideo">
                  <span className="icon icon-video"></span>
                </ActionButton>
                <ActionButton title="Informacje">
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
                      const isSent = message.senderId === 'current-user';
                      const showTime = messageIndex === group.messages.length - 1 || 
                        group.messages[messageIndex + 1].senderId !== message.senderId;
                      
                      return (
                        <MessageGroup key={message.id} sent={isSent}>
                          <MessageBubble sent={isSent}>
                            {message.content}
                          </MessageBubble>
                          {showTime && (
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
                          )}
                        </MessageGroup>
                      );
                    })}
                  </React.Fragment>
                ))
              )}
            </MessagesContainer>

            <InputContainer>
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
            </InputContainer>
          </>
        ) : (
          <EmptyStateContainer>
            <EmptyStateIcon>
              <span className="icon icon-message"></span>
            </EmptyStateIcon>
            <EmptyStateTitle>Brak wybranej konwersacji</EmptyStateTitle>
            <EmptyStateText>
              Wybierz kierowcę z listy po lewej stronie, aby rozpocząć rozmowę.
            </EmptyStateText>
            <EmptyStateButton>
              Nowa wiadomość
            </EmptyStateButton>
          </EmptyStateContainer>
        )}
      </ChatContainer>
    </Container>
  );
};

export default DriverMessaging;
