import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

interface NaturalLanguageProcessingProps {
  onSearch: (query: string) => Promise<any[]>;
  onCommand: (command: string) => Promise<any>;
  onFeedback: (sessionId: string, feedback: string) => Promise<void>;
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

const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
`;

const CardTitle = styled.div`
  font-weight: 500;
  font-size: 16px;
  margin-bottom: 16px;
`;

const CardContent = styled.div``;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 600px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
`;

const ChatHeader = styled.div`
  padding: 16px;
  background-color: #3f51b5;
  color: white;
  font-weight: 500;
`;

const ChatMessages = styled.div`
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background-color: #f5f5f5;
`;

const MessageBubble = styled.div<{ isUser: boolean }>`
  max-width: 70%;
  padding: 12px 16px;
  border-radius: 18px;
  background-color: ${props => props.isUser ? '#3f51b5' : 'white'};
  color: ${props => props.isUser ? 'white' : '#333'};
  align-self: ${props => props.isUser ? 'flex-end' : 'flex-start'};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const MessageText = styled.div`
  white-space: pre-wrap;
`;

const MessageTime = styled.div`
  font-size: 10px;
  color: ${props => props.color || '#999'};
  text-align: right;
  margin-top: 4px;
`;

const ChatInput = styled.div`
  display: flex;
  padding: 12px;
  border-top: 1px solid #e0e0e0;
  background-color: white;
`;

const TextInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 24px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #3f51b5;
  }
`;

const SendButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #3f51b5;
  color: white;
  border: none;
  margin-left: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: #303f9f;
  }
  
  &:disabled {
    background-color: #c5cae9;
    cursor: not-allowed;
  }
`;

const MicButton = styled.button<{ isListening: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.isListening ? '#f44336' : '#e0e0e0'};
  color: ${props => props.isListening ? 'white' : '#333'};
  border: none;
  margin-left: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: ${props => props.isListening ? '#d32f2f' : '#bdbdbd'};
  }
`;

const SuggestionsContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  flex-wrap: wrap;
  padding: 0 12px;
`;

const SuggestionChip = styled.div`
  padding: 6px 12px;
  background-color: #e8eaf6;
  color: #3f51b5;
  border-radius: 16px;
  font-size: 12px;
  cursor: pointer;
  
  &:hover {
    background-color: #c5cae9;
  }
`;

const ResultsContainer = styled.div`
  margin-top: 16px;
`;

const ResultCard = styled.div`
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 12px;
  background-color: white;
`;

const ResultTitle = styled.div`
  font-weight: 500;
  margin-bottom: 8px;
`;

const ResultContent = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 12px;
`;

const ResultActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const ActionButton = styled.button`
  padding: 6px 12px;
  background-color: #3f51b5;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  
  &:hover {
    background-color: #303f9f;
  }
`;

const SecondaryButton = styled.button`
  padding: 6px 12px;
  background-color: white;
  color: #3f51b5;
  border: 1px solid #3f51b5;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  
  &:hover {
    background-color: #e8eaf6;
  }
`;

const LoadingIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

const DotAnimation = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  
  span {
    width: 8px;
    height: 8px;
    background-color: #3f51b5;
    border-radius: 50%;
    display: inline-block;
    animation: bounce 1.4s infinite ease-in-out both;
    
    &:nth-child(1) {
      animation-delay: -0.32s;
    }
    
    &:nth-child(2) {
      animation-delay: -0.16s;
    }
  }
  
  @keyframes bounce {
    0%, 80%, 100% {
      transform: scale(0);
    }
    40% {
      transform: scale(1);
    }
  }
`;

const FeedbackContainer = styled.div`
  margin-top: 16px;
  padding: 16px;
  background-color: #f5f5f5;
  border-radius: 8px;
`;

const FeedbackTitle = styled.div`
  font-weight: 500;
  margin-bottom: 12px;
`;

const FeedbackTextarea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-height: 80px;
  margin-bottom: 12px;
  
  &:focus {
    outline: none;
    border-color: #3f51b5;
  }
`;

const FeedbackButton = styled.button`
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

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  results?: any[];
}

const NaturalLanguageProcessing: React.FC<NaturalLanguageProcessingProps> = ({
  onSearch,
  onCommand,
  onFeedback
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [sessionId, setSessionId] = useState<string>(`session-${Date.now()}`);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [feedbackText, setFeedbackText] = useState<string>('');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Przykładowe sugestie
  const suggestions = [
    'Pokaż aktywne pojazdy',
    'Znajdź zamówienia na dzisiaj',
    'Sprawdź zużycie paliwa w tym miesiącu',
    'Pokaż trasy z opóźnieniami',
    'Analiza kosztów transportu'
  ];
  
  // Przewijanie do najnowszej wiadomości
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Inicjalizacja czatu
  useEffect(() => {
    // Dodanie wiadomości powitalnej
    const welcomeMessage: Message = {
      id: `msg-${Date.now()}`,
      text: 'Witaj! Jestem Twoim asystentem AI. Jak mogę Ci pomóc w zarządzaniu flotą?',
      isUser: false,
      timestamp: new Date()
    };
    
    setMessages([welcomeMessage]);
  }, []);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Obsługa wysyłania wiadomości
  const handleSendMessage = async () => {
    if (!inputText.trim()) return;
    
    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsProcessing(true);
    
    try {
      // Określenie, czy to zapytanie czy komenda
      const isCommand = inputText.toLowerCase().startsWith('wykonaj') || 
                        inputText.toLowerCase().startsWith('uruchom') ||
                        inputText.toLowerCase().startsWith('zrób');
      
      let response;
      if (isCommand) {
        // Wykonanie komendy
        response = await onCommand(inputText);
        
        const aiMessage: Message = {
          id: `msg-${Date.now()}`,
          text: `Wykonałem komendę: "${inputText}"\n\nWynik: ${response.result || 'Komenda wykonana pomyślnie.'}`,
          isUser: false,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, aiMessage]);
      } else {
        // Wyszukiwanie informacji
        const results = await onSearch(inputText);
        
        const aiMessage: Message = {
          id: `msg-${Date.now()}`,
          text: results.length > 0 
            ? `Znalazłem następujące informacje dla zapytania: "${inputText}"`
            : `Niestety, nie znalazłem informacji dla zapytania: "${inputText}". Czy mogę pomóc w inny sposób?`,
          isUser: false,
          timestamp: new Date(),
          results: results
        };
        
        setMessages(prev => [...prev, aiMessage]);
      }
    } catch (error) {
      console.error('Error processing message:', error);
      
      const errorMessage: Message = {
        id: `msg-${Date.now()}`,
        text: 'Przepraszam, wystąpił błąd podczas przetwarzania Twojego zapytania. Proszę spróbuj ponownie.',
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Obsługa rozpoznawania mowy
  const handleVoiceInput = () => {
    if (!isListening) {
      // Rozpoczęcie nasłuchiwania
      setIsListening(true);
      
      // Symulacja rozpoznawania mowy (w rzeczywistej aplikacji użylibyśmy Web Speech API)
      setTimeout(() => {
        setInputText('Pokaż aktywne pojazdy w regionie Warszawa');
        setIsListening(false);
      }, 2000);
    } else {
      // Zatrzymanie nasłuchiwania
      setIsListening(false);
    }
  };
  
  // Obsługa sugestii
  const handleSuggestion = (suggestion: string) => {
    setInputText(suggestion);
  };
  
  // Obsługa wysyłania feedbacku
  const handleSendFeedback = async () => {
    if (!feedbackText.trim()) return;
    
    try {
      await onFeedback(sessionId, feedbackText);
      
      const feedbackMessage: Message = {
        id: `msg-${Date.now()}`,
        text: 'Dziękuję za przekazanie opinii! Twoje uwagi pomogą mi lepiej odpowiadać na Twoje pytania w przyszłości.',
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, feedbackMessage]);
      setShowFeedback(false);
      setFeedbackText('');
    } catch (error) {
      console.error('Error sending feedback:', error);
    }
  };
  
  // Formatowanie czasu
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <Container>
      <Header>
        <Title>Asystent AI z przetwarzaniem języka naturalnego</Title>
      </Header>
      
      <Card>
        <CardTitle>Asystent AI</CardTitle>
        <CardContent>
          <ChatContainer>
            <ChatHeader>
              Asystent Fleet AI
            </ChatHeader>
            
            <ChatMessages>
              {messages.map(message => (
                <React.Fragment key={message.id}>
                  <MessageBubble isUser={message.isUser}>
                    <MessageText>{message.text}</MessageText>
                    <MessageTime color={message.isUser ? 'rgba(255, 255, 255, 0.7)' : undefined}>
                      {formatTime(message.timestamp)}
                    </MessageTime>
                  </MessageBubble>
                  
                  {message.results && message.results.length > 0 && (
                    <ResultsContainer>
                      {message.results.map((result, index) => (
                        <ResultCard key={index}>
                          <ResultTitle>{result.title}</ResultTitle>
                          <ResultContent>{result.description}</ResultContent>
                          <ResultActions>
                            <SecondaryButton>Szczegóły</SecondaryButton>
                            <ActionButton>Wykonaj</ActionButton>
                          </ResultActions>
                        </ResultCard>
                      ))}
                    </ResultsContainer>
                  )}
                </React.Fragment>
              ))}
              
              {isProcessing && (
                <LoadingIndicator>
                  <DotAnimation>
                    <span></span>
                    <span></span>
                    <span></span>
                  </DotAnimation>
                </LoadingIndicator>
              )}
              
              <div ref={messagesEndRef} />
            </ChatMessages>
            
            <SuggestionsContainer>
              {suggestions.map((suggestion, index) => (
                <SuggestionChip 
                  key={index}
                  onClick={() => handleSuggestion(suggestion)}
                >
                  {suggestion}
                </SuggestionChip>
              ))}
            </SuggestionsContainer>
            
            <ChatInput>
              <TextInput 
                type="text" 
                placeholder="Wpisz wiadomość..." 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                disabled={isProcessing}
              />
              <MicButton 
                isListening={isListening}
                onClick={handleVoiceInput}
                disabled={isProcessing}
              >
                <span>🎤</span>
              </MicButton>
              <SendButton 
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isProcessing}
              >
                <span>➤</span>
              </SendButton>
            </ChatInput>
          </ChatContainer>
          
          {!showFeedback ? (
            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <SecondaryButton onClick={() => setShowFeedback(true)}>
                Przekaż opinię o asystencie
              </SecondaryButton>
            </div>
          ) : (
            <FeedbackContainer>
              <FeedbackTitle>Przekaż opinię o asystencie</FeedbackTitle>
              <FeedbackTextarea 
                placeholder="Twoja opinia pomoże nam ulepszyć asystenta..."
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <SecondaryButton onClick={() => setShowFeedback(false)}>
                  Anuluj
                </SecondaryButton>
                <FeedbackButton 
                  onClick={handleSendFeedback}
                  disabled={!feedbackText.trim()}
                >
                  Wyślij opinię
                </FeedbackButton>
              </div>
            </FeedbackContainer>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default NaturalLanguageProcessing;
