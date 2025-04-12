import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

interface ImageRecognitionProps {
  onImageUpload: (file: File) => Promise<any>;
  onImageAnalysis: (imageUrl: string) => Promise<any>;
  onImageSearch: (query: string) => Promise<any[]>;
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

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 20px;
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

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px;
  border: 2px dashed #e0e0e0;
  border-radius: 8px;
  margin-bottom: 20px;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #3f51b5;
    background-color: #f5f5f5;
  }
`;

const UploadIcon = styled.div`
  font-size: 48px;
  color: #3f51b5;
  margin-bottom: 16px;
`;

const UploadText = styled.div`
  font-size: 16px;
  color: #666;
  margin-bottom: 16px;
  text-align: center;
`;

const UploadButton = styled.button`
  padding: 8px 16px;
  background-color: #3f51b5;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #303f9f;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const ImagePreviewContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 400px;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const AnalysisContainer = styled.div`
  margin-top: 20px;
`;

const AnalysisTitle = styled.div`
  font-weight: 500;
  margin-bottom: 12px;
`;

const AnalysisResults = styled.div`
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 16px;
`;

const ResultItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #e0e0e0;
  
  &:last-child {
    border-bottom: none;
  }
`;

const ResultLabel = styled.div`
  font-weight: 500;
`;

const ResultValue = styled.div`
  color: #666;
`;

const ConfidenceBar = styled.div<{ confidence: number }>`
  height: 8px;
  width: 100px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  margin-left: 16px;
  
  &:after {
    content: '';
    display: block;
    height: 100%;
    width: ${props => props.confidence}%;
    background-color: ${props => 
      props.confidence > 80 ? '#4caf50' : 
      props.confidence > 50 ? '#ffc107' : 
      '#f44336'
    };
  }
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 20px;
`;

const ActionButton = styled.button`
  padding: 8px 16px;
  background-color: #3f51b5;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #303f9f;
  }
`;

const SecondaryButton = styled.button`
  padding: 8px 16px;
  background-color: white;
  color: #3f51b5;
  border: 1px solid #3f51b5;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #e8eaf6;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  gap: 8px;
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

const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const ResultCard = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;

const ResultImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const ResultInfo = styled.div`
  padding: 12px;
`;

const ResultTitle = styled.div`
  font-weight: 500;
  margin-bottom: 4px;
`;

const ResultDescription = styled.div`
  font-size: 12px;
  color: #666;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px;
`;

const Spinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3f51b5;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.div`
  font-size: 16px;
  color: #666;
`;

const DamageAssessmentContainer = styled.div`
  margin-top: 20px;
`;

const DamageItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  background-color: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 12px;
`;

const DamageIcon = styled.div<{ severity: 'low' | 'medium' | 'high' }>`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${props => 
    props.severity === 'low' ? '#4caf50' : 
    props.severity === 'medium' ? '#ffc107' : 
    '#f44336'
  };
  margin-right: 12px;
`;

const DamageInfo = styled.div`
  flex: 1;
`;

const DamageTitle = styled.div`
  font-weight: 500;
  margin-bottom: 4px;
`;

const DamageDescription = styled.div`
  font-size: 12px;
  color: #666;
`;

const DamageCost = styled.div`
  font-weight: 500;
  color: #f44336;
`;

const ImageRecognition: React.FC<ImageRecognitionProps> = ({
  onImageUpload,
  onImageAnalysis,
  onImageSearch
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'search'>('upload');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [analysisResults, setAnalysisResults] = useState<any | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Obsługa wyboru pliku
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedImage(file);
      
      // Tworzenie podglądu
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          setImagePreview(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
      
      // Resetowanie analizy
      setAnalysisResults(null);
    }
  };
  
  // Obsługa upuszczenia pliku
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      const file = event.dataTransfer.files[0];
      setSelectedImage(file);
      
      // Tworzenie podglądu
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          setImagePreview(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
      
      // Resetowanie analizy
      setAnalysisResults(null);
    }
  };
  
  // Zapobieganie domyślnemu zachowaniu podczas przeciągania
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };
  
  // Obsługa analizy obrazu
  const handleAnalyzeImage = async () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    
    try {
      // Wysyłanie obrazu do analizy
      const results = await onImageUpload(selectedImage);
      setAnalysisResults(results);
    } catch (error) {
      console.error('Error analyzing image:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  // Obsługa analizy obrazu z URL
  const handleAnalyzeImageUrl = async (url: string) => {
    setIsAnalyzing(true);
    
    try {
      // Analiza obrazu z URL
      const results = await onImageAnalysis(url);
      
      // Ustawienie podglądu
      setImagePreview(url);
      setSelectedImage(null);
      
      // Ustawienie wyników
      setAnalysisResults(results);
    } catch (error) {
      console.error('Error analyzing image from URL:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  // Obsługa wyszukiwania obrazów
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    try {
      // Wyszukiwanie obrazów
      const results = await onImageSearch(searchQuery);
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching images:', error);
    } finally {
      setIsSearching(false);
    }
  };
  
  // Resetowanie analizy
  const handleReset = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setAnalysisResults(null);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  // Renderowanie zakładki wgrywania obrazu
  const renderUploadTab = () => {
    return (
      <>
        {!imagePreview ? (
          <UploadContainer
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <UploadIcon>📷</UploadIcon>
            <UploadText>
              Przeciągnij i upuść obraz tutaj lub kliknij, aby wybrać plik
            </UploadText>
            <UploadButton onClick={() => fileInputRef.current?.click()}>
              Wybierz obraz
            </UploadButton>
            <HiddenInput
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/*"
            />
          </UploadContainer>
        ) : (
          <ImagePreviewContainer>
            <ImagePreview src={imagePreview} alt="Podgląd" />
            <ActionButtons>
              <SecondaryButton onClick={handleReset}>
                Anuluj
              </SecondaryButton>
              <ActionButton 
                onClick={handleAnalyzeImage}
                disabled={isAnalyzing || !selectedImage}
              >
                {isAnalyzing ? 'Analizowanie...' : 'Analizuj obraz'}
              </ActionButton>
            </ActionButtons>
          </ImagePreviewContainer>
        )}
        
        {isAnalyzing && (
          <LoadingContainer>
            <Spinner />
            <LoadingText>Analizowanie obrazu...</LoadingText>
          </LoadingContainer>
        )}
        
        {analysisResults && (
          <AnalysisContainer>
            <AnalysisTitle>Wyniki analizy</AnalysisTitle>
            
            {/* Rozpoznawanie obiektów */}
            <AnalysisResults>
              <h4>Rozpoznane obiekty</h4>
              {analysisResults.objects && analysisResults.objects.map((obj: any, index: number) => (
                <ResultItem key={index}>
                  <ResultLabel>{obj.label}</ResultLabel>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <ResultValue>{(obj.confidence * 100).toFixed(1)}%</ResultValue>
                    <ConfidenceBar confidence={obj.confidence * 100} />
                  </div>
                </ResultItem>
              ))}
            </AnalysisResults>
            
            {/* Ocena uszkodzeń pojazdu */}
            {analysisResults.damages && (
              <DamageAssessmentContainer>
                <h4>Ocena uszkodzeń pojazdu</h4>
                {analysisResults.damages.map((damage: any, index: number) => (
                  <DamageItem key={index}>
                    <DamageIcon severity={damage.severity} />
                    <DamageInfo>
                      <DamageTitle>{damage.type}</DamageTitle>
                      <DamageDescription>{damage.description}</DamageDescription>
                    </DamageInfo>
                    <DamageCost>{damage.estimatedCost} PLN</DamageCost>
                  </DamageItem>
                ))}
                <div style={{ textAlign: 'right', marginTop: '12px', fontWeight: 500 }}>
                  Szacowany całkowity koszt naprawy: {analysisResults.damages.reduce((sum: number, damage: any) => sum + damage.estimatedCost, 0)} PLN
                </div>
              </DamageAssessmentContainer>
            )}
            
            {/* Rozpoznawanie tekstu */}
            {analysisResults.text && (
              <AnalysisResults style={{ marginTop: '20px' }}>
                <h4>Rozpoznany tekst</h4>
                <div style={{ whiteSpace: 'pre-wrap' }}>
                  {analysisResults.text}
                </div>
              </AnalysisResults>
            )}
            
            {/* Rozpoznawanie tablic rejestracyjnych */}
            {analysisResults.licensePlate && (
              <AnalysisResults style={{ marginTop: '20px' }}>
                <h4>Rozpoznana tablica rejestracyjna</h4>
                <ResultItem>
                  <ResultLabel>Numer</ResultLabel>
                  <ResultValue>{analysisResults.licensePlate.number}</ResultValue>
                </ResultItem>
                <ResultItem>
                  <ResultLabel>Kraj</ResultLabel>
                  <ResultValue>{analysisResults.licensePlate.country}</ResultValue>
                </ResultItem>
                <ResultItem>
                  <ResultLabel>Pewność</ResultLabel>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <ResultValue>{(analysisResults.licensePlate.confidence * 100).toFixed(1)}%</ResultValue>
                    <ConfidenceBar confidence={analysisResults.licensePlate.confidence * 100} />
                  </div>
                </ResultItem>
              </AnalysisResults>
            )}
          </AnalysisContainer>
        )}
      </>
    );
  };
  
  // Renderowanie zakładki wyszukiwania
  const renderSearchTab = () => {
    return (
      <>
        <SearchContainer>
          <SearchInput 
            type="text" 
            placeholder="Wyszukaj obrazy pojazdów, uszkodzeń, części..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <SearchButton onClick={handleSearch}>
            Szukaj
          </SearchButton>
        </SearchContainer>
        
        {isSearching ? (
          <LoadingContainer>
            <Spinner />
            <LoadingText>Wyszukiwanie obrazów...</LoadingText>
          </LoadingContainer>
        ) : searchResults.length > 0 ? (
          <ResultsGrid>
            {searchResults.map((result, index) => (
              <ResultCard 
                key={index}
                onClick={() => handleAnalyzeImageUrl(result.url)}
              >
                <ResultImage src={result.url} alt={result.title} />
                <ResultInfo>
                  <ResultTitle>{result.title}</ResultTitle>
                  <ResultDescription>{result.description}</ResultDescription>
                </ResultInfo>
              </ResultCard>
            ))}
          </ResultsGrid>
        ) : searchQuery && !isSearching ? (
          <div style={{ textAlign: 'center', padding: '32px', color: '#666' }}>
            Brak wyników dla zapytania "{searchQuery}"
          </div>
        ) : null}
      </>
    );
  };
  
  return (
    <Container>
      <Header>
        <Title>Rozpoznawanie obrazów</Title>
      </Header>
      
      <Card>
        <CardTitle>Analiza obrazów z wykorzystaniem AI</CardTitle>
        <CardContent>
          <TabsContainer>
            <Tab 
              active={activeTab === 'upload'} 
              onClick={() => setActiveTab('upload')}
            >
              Wgraj obraz
            </Tab>
            <Tab 
              active={activeTab === 'search'} 
              onClick={() => setActiveTab('search')}
            >
              Wyszukaj obrazy
            </Tab>
          </TabsContainer>
          
          {activeTab === 'upload' && renderUploadTab()}
          {activeTab === 'search' && renderSearchTab()}
        </CardContent>
      </Card>
    </Container>
  );
};

export default ImageRecognition;
