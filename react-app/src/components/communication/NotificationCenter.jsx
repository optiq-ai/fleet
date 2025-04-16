import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getNotifications, updateNotificationPreferences, markNotificationAsRead } from '../../services/api/communicationService';

const Container = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 20px;
  height: 600px;
`;

const SidebarContainer = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const SidebarHeader = styled.div`
  padding: 15px;
  font-weight: bold;
  color: #333;
  border-bottom: 1px solid #eee;
`;

const SidebarMenu = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const MenuItem = styled.div`
  padding: 15px;
  cursor: pointer;
  border-bottom: 1px solid #eee;
  background-color: ${props => props.active ? '#e8f0fe' : 'transparent'};
  color: ${props => props.active ? '#1a73e8' : '#333'};
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  display: flex;
  align-items: center;
  gap: 10px;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => props.active ? '#e8f0fe' : '#f5f5f5'};
  }
`;

const MenuIcon = styled.span`
  color: ${props => props.active ? '#1a73e8' : '#666'};
`;

const Badge = styled.div`
  background-color: #1a73e8;
  color: white;
  border-radius: 50%;
  min-width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  margin-left: auto;
`;

const ContentContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #eee;
  display: flex;
  flex-direction: column;
`;

const ContentHeader = styled.div`
  padding: 15px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ContentTitle = styled.div`
  font-weight: bold;
  color: #333;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ContentActions = styled.div`
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
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 13px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f5f5f5;
    color: #1a73e8;
  }
`;

const NotificationsContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 15px;
`;

const NotificationItem = styled.div`
  padding: 15px;
  border-radius: 8px;
  background-color: ${props => props.unread ? '#f0f5ff' : '#f8f9fa'};
  margin-bottom: 10px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e8f0fe;
  }
`;

const NotificationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`;

const NotificationTitle = styled.div`
  font-weight: ${props => props.unread ? 'bold' : 'normal'};
  color: #333;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const NotificationIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: ${props => {
    switch(props.type) {
      case 'message': return '#1a73e8';
      case 'alert': return '#ea4335';
      case 'update': return '#34a853';
      case 'reminder': return '#fbbc04';
      default: return '#5f6368';
    }
  }};
`;

const NotificationTime = styled.div`
  font-size: 12px;
  color: #888;
`;

const NotificationContent = styled.div`
  font-size: 14px;
  color: #666;
  margin-left: 42px;
`;

const NotificationFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  margin-left: 42px;
`;

const NotificationCategory = styled.div`
  font-size: 12px;
  color: #1a73e8;
`;

const NotificationActions = styled.div`
  display: flex;
  gap: 10px;
`;

const NotificationAction = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f5f5f5;
    color: #1a73e8;
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
`;

const PreferencesContainer = styled.div`
  padding: 20px;
`;

const PreferencesSection = styled.div`
  margin-bottom: 20px;
`;

const PreferencesSectionTitle = styled.h3`
  font-size: 16px;
  color: #333;
  margin-bottom: 15px;
  padding-bottom: 5px;
  border-bottom: 1px solid #eee;
`;

const PreferenceItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #f5f5f5;
`;

const PreferenceLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const PreferenceIcon = styled.span`
  color: #666;
`;

const PreferenceText = styled.div`
  font-size: 14px;
  color: #333;
`;

const PreferenceDescription = styled.div`
  font-size: 12px;
  color: #666;
  margin-top: 2px;
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
    border-radius: 20px;
  }

  span:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }

  input:checked + span {
    background-color: #1a73e8;
  }

  input:checked + span:before {
    transform: translateX(20px);
  }
`;

const MethodsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 5px;
`;

const MethodBadge = styled.div`
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 11px;
  background-color: ${props => props.active ? '#e8f0fe' : '#f1f3f4'};
  color: ${props => props.active ? '#1a73e8' : '#5f6368'};
`;

const NotificationCenter = ({ useMockData = true }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [notifications, setNotifications] = useState([]);
  const [preferences, setPreferences] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getNotifications(useMockData, activeTab);
        setNotifications(data.notifications);
        setPreferences(data.preferences);
      } catch (err) {
        console.error('Error fetching notifications:', err);
        setError('Nie udało się pobrać powiadomień.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, [activeTab, useMockData]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      await markNotificationAsRead(useMockData, notificationId);
      
      // Update local state
      setNotifications(notifications.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true } 
          : notification
      ));
    } catch (err) {
      console.error('Error marking notification as read:', err);
      alert('Nie udało się oznaczyć powiadomienia jako przeczytane.');
    }
  };

  const handleTogglePreference = async (category, enabled) => {
    try {
      const updatedPreferences = await updateNotificationPreferences(
        useMockData,
        category,
        enabled
      );
      
      setPreferences(updatedPreferences);
    } catch (err) {
      console.error('Error updating notification preferences:', err);
      alert('Nie udało się zaktualizować preferencji powiadomień.');
    }
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

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'message': return 'icon-message';
      case 'alert': return 'icon-exclamation-triangle';
      case 'update': return 'icon-info-circle';
      case 'reminder': return 'icon-bell';
      default: return 'icon-bell';
    }
  };

  const getUnreadCount = (type) => {
    if (!notifications) return 0;
    
    if (type === 'all') {
      return notifications.filter(n => !n.read).length;
    }
    
    return notifications.filter(n => !n.read && n.type === type).length;
  };

  return (
    <Container>
      <SidebarContainer>
        <SidebarHeader>Centrum powiadomień</SidebarHeader>
        <SidebarMenu>
          <MenuItem 
            active={activeTab === 'all'} 
            onClick={() => handleTabChange('all')}
          >
            <MenuIcon active={activeTab === 'all'} className="icon icon-bell"></MenuIcon>
            Wszystkie powiadomienia
            {getUnreadCount('all') > 0 && <Badge>{getUnreadCount('all')}</Badge>}
          </MenuItem>
          <MenuItem 
            active={activeTab === 'message'} 
            onClick={() => handleTabChange('message')}
          >
            <MenuIcon active={activeTab === 'message'} className="icon icon-message"></MenuIcon>
            Wiadomości
            {getUnreadCount('message') > 0 && <Badge>{getUnreadCount('message')}</Badge>}
          </MenuItem>
          <MenuItem 
            active={activeTab === 'alert'} 
            onClick={() => handleTabChange('alert')}
          >
            <MenuIcon active={activeTab === 'alert'} className="icon icon-exclamation-triangle"></MenuIcon>
            Alerty
            {getUnreadCount('alert') > 0 && <Badge>{getUnreadCount('alert')}</Badge>}
          </MenuItem>
          <MenuItem 
            active={activeTab === 'update'} 
            onClick={() => handleTabChange('update')}
          >
            <MenuIcon active={activeTab === 'update'} className="icon icon-info-circle"></MenuIcon>
            Aktualizacje
            {getUnreadCount('update') > 0 && <Badge>{getUnreadCount('update')}</Badge>}
          </MenuItem>
          <MenuItem 
            active={activeTab === 'reminder'} 
            onClick={() => handleTabChange('reminder')}
          >
            <MenuIcon active={activeTab === 'reminder'} className="icon icon-calendar"></MenuIcon>
            Przypomnienia
            {getUnreadCount('reminder') > 0 && <Badge>{getUnreadCount('reminder')}</Badge>}
          </MenuItem>
          <MenuItem 
            active={activeTab === 'preferences'} 
            onClick={() => handleTabChange('preferences')}
          >
            <MenuIcon active={activeTab === 'preferences'} className="icon icon-cog"></MenuIcon>
            Preferencje powiadomień
          </MenuItem>
        </SidebarMenu>
      </SidebarContainer>

      <ContentContainer>
        {activeTab !== 'preferences' ? (
          <>
            <ContentHeader>
              <ContentTitle>
                {activeTab === 'all' && <span className="icon icon-bell"></span>}
                {activeTab === 'message' && <span className="icon icon-message"></span>}
                {activeTab === 'alert' && <span className="icon icon-exclamation-triangle"></span>}
                {activeTab === 'update' && <span className="icon icon-info-circle"></span>}
                {activeTab === 'reminder' && <span className="icon icon-calendar"></span>}
                {activeTab === 'all' && 'Wszystkie powiadomienia'}
                {activeTab === 'message' && 'Wiadomości'}
                {activeTab === 'alert' && 'Alerty'}
                {activeTab === 'update' && 'Aktualizacje'}
                {activeTab === 'reminder' && 'Przypomnienia'}
              </ContentTitle>
              <ContentActions>
                <ActionButton>
                  <span className="icon icon-check-double"></span>
                  Oznacz wszystkie jako przeczytane
                </ActionButton>
                <ActionButton>
                  <span className="icon icon-filter"></span>
                  Filtruj
                </ActionButton>
              </ContentActions>
            </ContentHeader>

            <NotificationsContainer>
              {isLoading ? (
                <div>Ładowanie powiadomień...</div>
              ) : error ? (
                <div>{error}</div>
              ) : notifications.length === 0 ? (
                <EmptyState>
                  <EmptyStateIcon>
                    <span className="icon icon-bell-slash"></span>
                  </EmptyStateIcon>
                  <EmptyStateTitle>Brak powiadomień</EmptyStateTitle>
                  <EmptyStateText>
                    Nie masz żadnych {activeTab !== 'all' ? `powiadomień typu "${activeTab}"` : 'powiadomień'}.
                  </EmptyStateText>
                </EmptyState>
              ) : (
                notifications.map(notification => (
                  <NotificationItem 
                    key={notification.id}
                    unread={!notification.read}
                    onClick={() => !notification.read && handleMarkAsRead(notification.id)}
                  >
                    <NotificationHeader>
                      <NotificationTitle unread={!notification.read}>
                        <NotificationIcon type={notification.type}>
                          <span className={`icon ${getNotificationIcon(notification.type)}`}></span>
                        </NotificationIcon>
                        {notification.title}
                      </NotificationTitle>
                      <NotificationTime>{formatTime(notification.timestamp)}</NotificationTime>
                    </NotificationHeader>
                    <NotificationContent>
                      {notification.content}
                    </NotificationContent>
                    <NotificationFooter>
                      <NotificationCategory>{notification.category}</NotificationCategory>
                      <NotificationActions>
                        {notification.actionable && (
                          <NotificationAction>
                            <span className="icon icon-external-link"></span>
                            Przejdź
                          </NotificationAction>
                        )}
                        <NotificationAction>
                          <span className="icon icon-times"></span>
                          Usuń
                        </NotificationAction>
                      </NotificationActions>
                    </NotificationFooter>
                  </NotificationItem>
                ))
              )}
            </NotificationsContainer>
          </>
        ) : (
          <>
            <ContentHeader>
              <ContentTitle>
                <span className="icon icon-cog"></span>
                Preferencje powiadomień
              </ContentTitle>
            </ContentHeader>

            <PreferencesContainer>
              {isLoading ? (
                <div>Ładowanie preferencji...</div>
              ) : error ? (
                <div>{error}</div>
              ) : !preferences ? (
                <div>Nie można załadować preferencji powiadomień.</div>
              ) : (
                <>
                  <PreferencesSection>
                    <PreferencesSectionTitle>Kategorie powiadomień</PreferencesSectionTitle>
                    <PreferenceItem>
                      <PreferenceLabel>
                        <PreferenceIcon className="icon icon-message"></PreferenceIcon>
                        <div>
                          <PreferenceText>Wiadomości</PreferenceText>
                          <PreferenceDescription>Powiadomienia o nowych wiadomościach od kierowców i klientów</PreferenceDescription>
                        </div>
                      </PreferenceLabel>
                      <ToggleSwitch>
                        <input 
                          type="checkbox" 
                          checked={preferences.categories.messages} 
                          onChange={(e) => handleTogglePreference('messages', e.target.checked)} 
                        />
                        <span></span>
                      </ToggleSwitch>
                    </PreferenceItem>
                    <PreferenceItem>
                      <PreferenceLabel>
                        <PreferenceIcon className="icon icon-exclamation-triangle"></PreferenceIcon>
                        <div>
                          <PreferenceText>Alerty</PreferenceText>
                          <PreferenceDescription>Powiadomienia o ważnych zdarzeniach wymagających uwagi</PreferenceDescription>
                        </div>
                      </PreferenceLabel>
                      <ToggleSwitch>
                        <input 
                          type="checkbox" 
                          checked={preferences.categories.alerts} 
                          onChange={(e) => handleTogglePreference('alerts', e.target.checked)} 
                        />
                        <span></span>
                      </ToggleSwitch>
                    </PreferenceItem>
                    <PreferenceItem>
                      <PreferenceLabel>
                        <PreferenceIcon className="icon icon-info-circle"></PreferenceIcon>
                        <div>
                          <PreferenceText>Aktualizacje</PreferenceText>
                          <PreferenceDescription>Powiadomienia o zmianach statusu i aktualizacjach systemu</PreferenceDescription>
                        </div>
                      </PreferenceLabel>
                      <ToggleSwitch>
                        <input 
                          type="checkbox" 
                          checked={preferences.categories.updates} 
                          onChange={(e) => handleTogglePreference('updates', e.target.checked)} 
                        />
                        <span></span>
                      </ToggleSwitch>
                    </PreferenceItem>
                    <PreferenceItem>
                      <PreferenceLabel>
                        <PreferenceIcon className="icon icon-calendar"></PreferenceIcon>
                        <div>
                          <PreferenceText>Przypomnienia</PreferenceText>
                          <PreferenceDescription>Powiadomienia o nadchodzących terminach i zadaniach</PreferenceDescription>
                        </div>
                      </PreferenceLabel>
                      <ToggleSwitch>
                        <input 
                          type="checkbox" 
                          checked={preferences.categories.reminders} 
                          onChange={(e) => handleTogglePreference('reminders', e.target.checked)} 
                        />
                        <span></span>
                      </ToggleSwitch>
                    </PreferenceItem>
                  </PreferencesSection>

                  <PreferencesSection>
                    <PreferencesSectionTitle>Metody powiadomień</PreferencesSectionTitle>
                    <PreferenceItem>
                      <PreferenceLabel>
                        <PreferenceIcon className="icon icon-desktop"></PreferenceIcon>
                        <div>
                          <PreferenceText>Powiadomienia w aplikacji</PreferenceText>
                          <PreferenceDescription>Powiadomienia wyświetlane w centrum powiadomień</PreferenceDescription>
                        </div>
                      </PreferenceLabel>
                      <ToggleSwitch>
                        <input 
                          type="checkbox" 
                          checked={preferences.methods.inApp} 
                          onChange={(e) => handleTogglePreference('inApp', e.target.checked)} 
                        />
                        <span></span>
                      </ToggleSwitch>
                    </PreferenceItem>
                    <PreferenceItem>
                      <PreferenceLabel>
                        <PreferenceIcon className="icon icon-envelope"></PreferenceIcon>
                        <div>
                          <PreferenceText>Powiadomienia e-mail</PreferenceText>
                          <PreferenceDescription>Powiadomienia wysyłane na adres e-mail</PreferenceDescription>
                        </div>
                      </PreferenceLabel>
                      <ToggleSwitch>
                        <input 
                          type="checkbox" 
                          checked={preferences.methods.email} 
                          onChange={(e) => handleTogglePreference('email', e.target.checked)} 
                        />
                        <span></span>
                      </ToggleSwitch>
                    </PreferenceItem>
                    <PreferenceItem>
                      <PreferenceLabel>
                        <PreferenceIcon className="icon icon-mobile"></PreferenceIcon>
                        <div>
                          <PreferenceText>Powiadomienia SMS</PreferenceText>
                          <PreferenceDescription>Powiadomienia wysyłane jako wiadomości SMS</PreferenceDescription>
                        </div>
                      </PreferenceLabel>
                      <ToggleSwitch>
                        <input 
                          type="checkbox" 
                          checked={preferences.methods.sms} 
                          onChange={(e) => handleTogglePreference('sms', e.target.checked)} 
                        />
                        <span></span>
                      </ToggleSwitch>
                    </PreferenceItem>
                    <PreferenceItem>
                      <PreferenceLabel>
                        <PreferenceIcon className="icon icon-bell"></PreferenceIcon>
                        <div>
                          <PreferenceText>Powiadomienia push</PreferenceText>
                          <PreferenceDescription>Powiadomienia wysyłane do przeglądarki lub aplikacji mobilnej</PreferenceDescription>
                        </div>
                      </PreferenceLabel>
                      <ToggleSwitch>
                        <input 
                          type="checkbox" 
                          checked={preferences.methods.push} 
                          onChange={(e) => handleTogglePreference('push', e.target.checked)} 
                        />
                        <span></span>
                      </ToggleSwitch>
                    </PreferenceItem>
                  </PreferencesSection>

                  <PreferencesSection>
                    <PreferencesSectionTitle>Częstotliwość powiadomień</PreferencesSectionTitle>
                    <PreferenceItem>
                      <PreferenceLabel>
                        <PreferenceIcon className="icon icon-clock"></PreferenceIcon>
                        <div>
                          <PreferenceText>Częstotliwość</PreferenceText>
                          <PreferenceDescription>Jak często chcesz otrzymywać powiadomienia</PreferenceDescription>
                          <MethodsContainer>
                            <MethodBadge active={preferences.frequency === 'realtime'}>W czasie rzeczywistym</MethodBadge>
                            <MethodBadge active={preferences.frequency === 'hourly'}>Co godzinę</MethodBadge>
                            <MethodBadge active={preferences.frequency === 'daily'}>Codziennie</MethodBadge>
                          </MethodsContainer>
                        </div>
                      </PreferenceLabel>
                    </PreferenceItem>
                  </PreferencesSection>
                </>
              )}
            </PreferencesContainer>
          </>
        )}
      </ContentContainer>
    </Container>
  );
};

export default NotificationCenter;
