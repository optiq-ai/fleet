import React from 'react';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto auto;
  gap: 20px;
  margin-bottom: 20px;
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const StatCard = styled(Card)`
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 32px;
  font-weight: bold;
  color: #1a73e8;
  margin-bottom: 8px;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: #666;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  color: #333;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
`;

const ConversationsContainer = styled.div`
  grid-column: 1 / 3;
  grid-row: 2 / 3;
`;

const AlertsContainer = styled.div`
  grid-column: 3 / 4;
  grid-row: 2 / 3;
`;

const ConversationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 400px;
  overflow-y: auto;
`;

const ConversationItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
  background-color: ${props => props.unread ? '#f0f5ff' : '#f8f9fa'};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #e8f0fe;
  }
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  font-weight: bold;
  color: #666;
  background-color: ${props => props.color || '#ddd'};
  color: white;
`;

const ConversationDetails = styled.div`
  flex: 1;
`;

const ConversationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
`;

const ConversationTitle = styled.div`
  font-weight: ${props => props.unread ? 'bold' : 'normal'};
  color: #333;
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

const AlertList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 400px;
  overflow-y: auto;
`;

const AlertItem = styled.div`
  display: flex;
  padding: 12px;
  border-radius: 8px;
  background-color: ${props => {
    switch(props.priority) {
      case 'high': return '#fff0f0';
      case 'medium': return '#fff8e6';
      default: return '#f0f5ff';
    }
  }};
  border-left: 4px solid ${props => {
    switch(props.priority) {
      case 'high': return '#e53935';
      case 'medium': return '#fb8c00';
      default: return '#1a73e8';
    }
  }};
`;

const AlertIcon = styled.div`
  margin-right: 12px;
  color: ${props => {
    switch(props.priority) {
      case 'high': return '#e53935';
      case 'medium': return '#fb8c00';
      default: return '#1a73e8';
    }
  }};
`;

const AlertDetails = styled.div`
  flex: 1;
`;

const AlertTitle = styled.div`
  font-weight: bold;
  margin-bottom: 4px;
  color: #333;
`;

const AlertDescription = styled.div`
  font-size: 13px;
  color: #666;
`;

const AlertTime = styled.div`
  font-size: 12px;
  color: #888;
  margin-top: 4px;
`;

const NoDataMessage = styled.div`
  text-align: center;
  padding: 20px;
  color: #666;
  font-style: italic;
`;

const CommunicationDashboard = ({ dashboardData = {} }) => {
  const {
    stats = {
      activeConversations: 0,
      unreadMessages: 0,
      totalMessages24h: 0
    },
    conversations = [],
    alerts = []
  } = dashboardData || {};

  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getAvatarColor = (id) => {
    const colors = ['#1a73e8', '#34a853', '#fbbc04', '#ea4335', '#9c27b0', '#3f51b5'];
    const colorIndex = parseInt(id, 16) % colors.length;
    return colors[colorIndex] || colors[0];
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'teraz';
    if (diffMins < 60) return `${diffMins} min temu`;
    if (diffHours < 24) return `${diffHours} godz temu`;
    if (diffDays === 1) return 'wczoraj';
    return date.toLocaleDateString('pl-PL');
  };

  return (
    <div>
      <DashboardContainer>
        <StatCard>
          <StatValue>{stats.activeConversations}</StatValue>
          <StatLabel>Aktywne konwersacje</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{stats.unreadMessages}</StatValue>
          <StatLabel>Nieprzeczytane wiadomości</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{stats.totalMessages24h}</StatValue>
          <StatLabel>Wiadomości (24h)</StatLabel>
        </StatCard>

        <ConversationsContainer>
          <SectionTitle>Ostatnie konwersacje</SectionTitle>
          {conversations.length > 0 ? (
            <ConversationList>
              {conversations.map(conversation => (
                <ConversationItem key={conversation.id} unread={conversation.unreadCount > 0}>
                  <Avatar color={getAvatarColor(conversation.id)}>
                    {conversation.type === 'group' 
                      ? <span className="icon icon-users"></span> 
                      : getInitials(conversation.title)}
                  </Avatar>
                  <ConversationDetails>
                    <ConversationHeader>
                      <ConversationTitle unread={conversation.unreadCount > 0}>
                        {conversation.title}
                      </ConversationTitle>
                      <ConversationTime>{formatTime(conversation.lastMessageTime)}</ConversationTime>
                    </ConversationHeader>
                    <ConversationPreview>{conversation.lastMessage}</ConversationPreview>
                  </ConversationDetails>
                  {conversation.unreadCount > 0 && (
                    <UnreadBadge>{conversation.unreadCount}</UnreadBadge>
                  )}
                </ConversationItem>
              ))}
            </ConversationList>
          ) : (
            <NoDataMessage>Brak aktywnych konwersacji</NoDataMessage>
          )}
        </ConversationsContainer>

        <AlertsContainer>
          <SectionTitle>Alerty</SectionTitle>
          {alerts.length > 0 ? (
            <AlertList>
              {alerts.map(alert => (
                <AlertItem key={alert.id} priority={alert.priority}>
                  <AlertIcon priority={alert.priority}>
                    <span className={`icon icon-${
                      alert.priority === 'high' ? 'warning' : 
                      alert.priority === 'medium' ? 'info' : 'bell'
                    }`}></span>
                  </AlertIcon>
                  <AlertDetails>
                    <AlertTitle>{alert.title}</AlertTitle>
                    <AlertDescription>{alert.description}</AlertDescription>
                    <AlertTime>{formatTime(alert.timestamp)}</AlertTime>
                  </AlertDetails>
                </AlertItem>
              ))}
            </AlertList>
          ) : (
            <NoDataMessage>Brak alertów</NoDataMessage>
          )}
        </AlertsContainer>
      </DashboardContainer>
    </div>
  );
};

export default CommunicationDashboard;
