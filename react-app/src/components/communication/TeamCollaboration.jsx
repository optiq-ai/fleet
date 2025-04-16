import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getGroups, getGroupMessages, sendGroupMessage, createGroup } from '../../services/api/communicationService';

const Container = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 20px;
  height: 600px;
`;

const GroupsList = styled.div`
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

const GroupsHeader = styled.div`
  padding: 15px;
  font-weight: bold;
  color: #333;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CreateGroupButton = styled.button`
  background-color: #1a73e8;
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1765cc;
  }
`;

const GroupItems = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const GroupItem = styled.div`
  padding: 15px;
  cursor: pointer;
  border-bottom: 1px solid #eee;
  background-color: ${props => props.active ? '#e8f0fe' : props.unread ? '#f0f5ff' : 'transparent'};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => props.active ? '#e8f0fe' : '#f5f5f5'};
  }
`;

const GroupItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`;

const GroupName = styled.div`
  font-weight: ${props => props.unread ? 'bold' : 'normal'};
  color: #333;
  display: flex;
  align-items: center;
`;

const GroupTime = styled.div`
  font-size: 12px;
  color: #888;
`;

const GroupPreview = styled.div`
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

const GroupAvatar = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #1a73e8;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  color: white;
  font-size: 12px;
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

const MembersCount = styled.div`
  font-size: 12px;
  color: #666;
  margin-left: 8px;
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

const MessageSender = styled.div`
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 4px;
  color: ${props => props.sent ? '#fff' : '#1a73e8'};
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

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ModalTitle = styled.h3`
  margin: 0;
  color: #333;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  font-size: 20px;
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

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
  outline: none;
  font-size: 14px;

  &:focus {
    border-color: #1a73e8;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
  outline: none;
  font-size: 14px;
  resize: vertical;
  min-height: 80px;

  &:focus {
    border-color: #1a73e8;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

const CancelButton = styled.button`
  background-color: #f5f5f5;
  color: #333;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e5e5e5;
  }
`;

const SubmitButton = styled.button`
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

  &:disabled {
    background-color: #dadce0;
    cursor: not-allowed;
  }
`;

const TeamCollaboration = ({ useMockData = true }) => {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [messages, setMessages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);

  useEffect(() => {
    const fetchGroups = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getGroups(useMockData);
        setGroups(data);
        if (data.length > 0 && !selectedGroup) {
          setSelectedGroup(data[0]);
        }
      } catch (err) {
        console.error('Error fetching groups:', err);
        setError('Nie udało się pobrać listy grup.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchGroups();
  }, [useMockData]);

  useEffect(() => {
    if (selectedGroup) {
      const fetchGroupMessages = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const data = await getGroupMessages(useMockData, selectedGroup.id);
          setMessages(data);
        } catch (err) {
          console.error('Error fetching group messages:', err);
          setError('Nie udało się pobrać wiadomości grupy.');
        } finally {
          setIsLoading(false);
        }
      };

      fetchGroupMessages();
    }
  }, [selectedGroup, useMockData]);

  const handleSelectGroup = (group) => {
    setSelectedGroup(group);
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedGroup) return;

    setIsSending(true);
    try {
      const sentMessage = await sendGroupMessage(
        useMockData,
        selectedGroup.id,
        newMessage
      );
      
      setMessages([...messages, sentMessage]);
      setNewMessage('');
      
      // Update the group in the list with the new message
      const updatedGroups = groups.map(group => 
        group.id === selectedGroup.id 
          ? { 
              ...group, 
              lastMessage: `Ty: ${newMessage}`,
              lastMessageTime: new Date().toISOString()
            } 
          : group
      );
      setGroups(updatedGroups);
    } catch (err) {
      console.error('Error sending message:', err);
      alert('Nie udało się wysłać wiadomości. Spróbuj ponownie.');
    } finally {
      setIsSending(false);
    }
  };

  const handleCreateGroup = async () => {
    if (!newGroupName.trim()) return;

    setIsCreatingGroup(true);
    try {
      const newGroup = await createGroup(
        useMockData,
        newGroupName,
        newGroupDescription
      );
      
      setGroups([newGroup, ...groups]);
      setSelectedGroup(newGroup);
      setShowCreateGroupModal(false);
      setNewGroupName('');
      setNewGroupDescription('');
    } catch (err) {
      console.error('Error creating group:', err);
      alert('Nie udało się utworzyć grupy. Spróbuj ponownie.');
    } finally {
      setIsCreatingGroup(false);
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

  const filteredGroups = groups.filter(group => 
    group.title.toLowerCase().includes(searchQuery.toLowerCase())
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
    <>
      <Container>
        <GroupsList>
          <SearchBox>
            <SearchInput 
              type="text" 
              placeholder="Szukaj grupy..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchBox>
          <GroupsHeader>
            <span>Grupy ({filteredGroups.length})</span>
            <CreateGroupButton onClick={() => setShowCreateGroupModal(true)}>
              <span className="icon icon-plus"></span>
            </CreateGroupButton>
          </GroupsHeader>
          <GroupItems>
            {filteredGroups.map(group => (
              <GroupItem 
                key={group.id}
                active={selectedGroup && selectedGroup.id === group.id}
                unread={group.unreadCount > 0}
                onClick={() => handleSelectGroup(group)}
              >
                <GroupItemHeader>
                  <GroupName unread={group.unreadCount > 0}>
                    <GroupAvatar>
                      <span className="icon icon-users"></span>
                    </GroupAvatar>
                    {group.title}
                    {group.unreadCount > 0 && (
                      <UnreadBadge>{group.unreadCount}</UnreadBadge>
                    )}
                  </GroupName>
                  <GroupTime>{formatTime(group.lastMessageTime)}</GroupTime>
                </GroupItemHeader>
                <GroupPreview>{group.lastMessage}</GroupPreview>
              </GroupItem>
            ))}
          </GroupItems>
        </GroupsList>

        <ChatContainer>
          {selectedGroup ? (
            <>
              <ChatHeader>
                <ChatTitle>
                  <GroupAvatar>
                    <span className="icon icon-users"></span>
                  </GroupAvatar>
                  {selectedGroup.title}
                  <MembersCount>{selectedGroup.membersCount} członków</MembersCount>
                </ChatTitle>
                <ChatActions>
                  <ActionButton title="Dodaj członków">
                    <span className="icon icon-user-plus"></span>
                  </ActionButton>
                  <ActionButton title="Udostępnij pliki">
                    <span className="icon icon-share"></span>
                  </ActionButton>
                  <ActionButton title="Informacje o grupie">
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
                        
                        return (
                          <MessageGroup key={message.id} sent={isSent}>
                            <MessageBubble sent={isSent}>
                              {!isSent && <MessageSender sent={isSent}>{message.senderName}</MessageSender>}
                              {message.content}
                            </MessageBubble>
                            <MessageTime>
                              {formatTime(message.sentAt)}
                              {isSent && (
                                <MessageStatus>
                                  {message.status === 'read' ? (
                                    <>
                                      <span className="icon icon-check-double"></span>
                                      Przeczytane przez wszystkich
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
                <AttachButton title="Dodaj załącznik">
                  <span className="icon icon-paperclip"></span>
                </AttachButton>
                <MessageInput 
                  type="text" 
                  placeholder="Napisz wiadomość do grupy..." 
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
                <span className="icon icon-users"></span>
              </EmptyStateIcon>
              <EmptyStateTitle>Brak wybranej grupy</EmptyStateTitle>
              <EmptyStateText>
                Wybierz grupę z listy po lewej stronie lub utwórz nową grupę, aby rozpocząć współpracę.
              </EmptyStateText>
              <EmptyStateButton onClick={() => setShowCreateGroupModal(true)}>
                Utwórz nową grupę
              </EmptyStateButton>
            </EmptyStateContainer>
          )}
        </ChatContainer>
      </Container>

      {showCreateGroupModal && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Utwórz nową grupę</ModalTitle>
              <CloseButton onClick={() => setShowCreateGroupModal(false)}>
                <span className="icon icon-times"></span>
              </CloseButton>
            </ModalHeader>
            <FormGroup>
              <Label htmlFor="group-name">Nazwa grupy</Label>
              <Input 
                id="group-name"
                type="text" 
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                placeholder="Np. Zespół logistyczny"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="group-description">Opis (opcjonalnie)</Label>
              <TextArea 
                id="group-description"
                value={newGroupDescription}
                onChange={(e) => setNewGroupDescription(e.target.value)}
                placeholder="Opisz cel grupy..."
              />
            </FormGroup>
            <ButtonGroup>
              <CancelButton onClick={() => setShowCreateGroupModal(false)}>
                Anuluj
              </CancelButton>
              <SubmitButton 
                onClick={handleCreateGroup}
                disabled={!newGroupName.trim() || isCreatingGroup}
              >
                {isCreatingGroup ? 'Tworzenie...' : 'Utwórz grupę'}
              </SubmitButton>
            </ButtonGroup>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default TeamCollaboration;
