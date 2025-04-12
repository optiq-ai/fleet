import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface DocumentManagementProps {
  onUploadDocument: (document: File, metadata: any) => Promise<void>;
  onDeleteDocument: (documentId: string) => Promise<void>;
  onShareDocument: (documentId: string, recipients: string[]) => Promise<void>;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  
  &:focus {
    border-color: #3f51b5;
    outline: none;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  min-height: 100px;
  
  &:focus {
    border-color: #3f51b5;
    outline: none;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  background-color: white;
  
  &:focus {
    border-color: #3f51b5;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 10px 16px;
  background-color: #3f51b5;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  
  &:hover {
    background-color: #303f9f;
  }
  
  &:disabled {
    background-color: #c5cae9;
    cursor: not-allowed;
  }
`;

const SecondaryButton = styled.button`
  padding: 10px 16px;
  background-color: white;
  color: #3f51b5;
  border: 1px solid #3f51b5;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  
  &:hover {
    background-color: #e8eaf6;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

const UploadArea = styled.div`
  border: 2px dashed #ddd;
  border-radius: 4px;
  padding: 40px;
  text-align: center;
  margin-bottom: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #3f51b5;
    background-color: #f5f5f5;
  }
`;

const UploadIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
  color: #666;
`;

const UploadText = styled.div`
  font-size: 16px;
  color: #666;
  margin-bottom: 8px;
`;

const UploadSubtext = styled.div`
  font-size: 14px;
  color: #999;
`;

const DocumentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const DocumentItem = styled.div`
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  display: flex;
  align-items: center;
  gap: 16px;
`;

const DocumentIcon = styled.div<{ type: string }>`
  width: 40px;
  height: 40px;
  border-radius: 4px;
  background-color: ${props => 
    props.type === 'pdf' ? '#f44336' : 
    props.type === 'doc' || props.type === 'docx' ? '#2196f3' : 
    props.type === 'xls' || props.type === 'xlsx' ? '#4caf50' : 
    props.type === 'ppt' || props.type === 'pptx' ? '#ff9800' : 
    props.type === 'jpg' || props.type === 'png' ? '#9c27b0' : 
    '#757575'
  };
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
`;

const DocumentInfo = styled.div`
  flex: 1;
`;

const DocumentTitle = styled.div`
  font-weight: 500;
  margin-bottom: 4px;
`;

const DocumentMeta = styled.div`
  font-size: 12px;
  color: #666;
  display: flex;
  gap: 16px;
`;

const DocumentActions = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button`
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

const SearchContainer = styled.div`
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  
  &:focus {
    border-color: #3f51b5;
    outline: none;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const FilterButton = styled.button<{ active: boolean }>`
  padding: 6px 12px;
  background-color: ${props => props.active ? '#3f51b5' : 'white'};
  color: ${props => props.active ? 'white' : '#3f51b5'};
  border: 1px solid #3f51b5;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  
  &:hover {
    background-color: ${props => props.active ? '#303f9f' : '#e8eaf6'};
  }
`;

const ShareModal = styled.div`
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
  padding: 24px;
  width: 500px;
  max-width: 90%;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const ModalTitle = styled.div`
  font-weight: 500;
  font-size: 18px;
`;

const ModalCloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  
  &:hover {
    color: #000;
  }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 24px;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
`;

const Tag = styled.div`
  padding: 4px 8px;
  background-color: #e8eaf6;
  color: #3f51b5;
  border-radius: 4px;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const TagRemoveButton = styled.button`
  background: none;
  border: none;
  color: #3f51b5;
  cursor: pointer;
  font-size: 14px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: #f44336;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px;
  color: #666;
`;

const EmptyStateIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
  color: #ddd;
`;

const EmptyStateText = styled.div`
  font-size: 16px;
  margin-bottom: 8px;
`;

const EmptyStateSubtext = styled.div`
  font-size: 14px;
  color: #999;
  margin-bottom: 16px;
`;

const DocumentManagement: React.FC<DocumentManagementProps> = ({
  onUploadDocument,
  onDeleteDocument,
  onShareDocument
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'vehicle' | 'driver' | 'maintenance' | 'insurance'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [documents, setDocuments] = useState<any[]>([]);
  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  const [selectedDocument, setSelectedDocument] = useState<any | null>(null);
  const [shareRecipients, setShareRecipients] = useState<string>('');
  const [documentTitle, setDocumentTitle] = useState<string>('');
  const [documentDescription, setDocumentDescription] = useState<string>('');
  const [documentType, setDocumentType] = useState<string>('vehicle');
  const [documentTags, setDocumentTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  // Przykładowe dane
  useEffect(() => {
    // Symulacja pobrania dokumentów
    const sampleDocuments = [
      {
        id: 'doc1',
        title: 'Polisa ubezpieczeniowa - Ciężarówka #1234',
        type: 'insurance',
        fileType: 'pdf',
        size: '2.4 MB',
        uploadedBy: 'Jan Kowalski',
        uploadedAt: '2025-04-10T10:30:00Z',
        expiresAt: '2026-04-10T10:30:00Z',
        tags: ['ubezpieczenie', 'polisa', 'ciężarówka']
      },
      {
        id: 'doc2',
        title: 'Prawo jazdy - Adam Nowak',
        type: 'driver',
        fileType: 'jpg',
        size: '1.2 MB',
        uploadedBy: 'Maria Wiśniewska',
        uploadedAt: '2025-04-05T14:15:00Z',
        expiresAt: '2030-04-05T14:15:00Z',
        tags: ['prawo jazdy', 'kierowca', 'dokumenty']
      },
      {
        id: 'doc3',
        title: 'Raport serwisowy - Ciężarówka #5678',
        type: 'maintenance',
        fileType: 'docx',
        size: '3.7 MB',
        uploadedBy: 'Piotr Zieliński',
        uploadedAt: '2025-03-15T11:45:00Z',
        expiresAt: null,
        tags: ['serwis', 'naprawa', 'ciężarówka']
      },
      {
        id: 'doc4',
        title: 'Dowód rejestracyjny - Van #9012',
        type: 'vehicle',
        fileType: 'pdf',
        size: '1.8 MB',
        uploadedBy: 'Anna Kowalczyk',
        uploadedAt: '2025-03-20T09:30:00Z',
        expiresAt: '2030-03-20T09:30:00Z',
        tags: ['dowód rejestracyjny', 'van', 'dokumenty']
      },
      {
        id: 'doc5',
        title: 'Faktura za paliwo - Marzec 2025',
        type: 'vehicle',
        fileType: 'pdf',
        size: '0.9 MB',
        uploadedBy: 'Jan Kowalski',
        uploadedAt: '2025-04-01T08:45:00Z',
        expiresAt: null,
        tags: ['faktura', 'paliwo', 'koszty']
      }
    ];
    
    setDocuments(sampleDocuments);
  }, []);
  
  // Filtrowanie dokumentów na podstawie aktywnej zakładki i wyszukiwania
  const filteredDocuments = documents.filter(document => {
    // Filtrowanie według zakładki
    if (activeTab !== 'all' && document.type !== activeTab) {
      return false;
    }
    
    // Filtrowanie według wyszukiwania
    if (searchQuery && !document.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !document.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()))) {
      return false;
    }
    
    return true;
  });
  
  // Obsługa przesyłania pliku
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };
  
  // Obsługa upuszczania pliku
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      setSelectedFile(event.dataTransfer.files[0]);
    }
  };
  
  // Zapobieganie domyślnemu zachowaniu przeglądarki podczas przeciągania
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };
  
  // Obsługa dodawania tagu
  const handleAddTag = () => {
    if (newTag && !documentTags.includes(newTag)) {
      setDocumentTags([...documentTags, newTag]);
      setNewTag('');
    }
  };
  
  // Obsługa usuwania tagu
  const handleRemoveTag = (tag: string) => {
    setDocumentTags(documentTags.filter(t => t !== tag));
  };
  
  // Obsługa przesyłania dokumentu
  const handleUploadDocument = async () => {
    if (!selectedFile || !documentTitle || !documentType) {
      alert('Proszę wypełnić wszystkie wymagane pola i wybrać plik');
      return;
    }
    
    const metadata = {
      title: documentTitle,
      description: documentDescription,
      type: documentType,
      tags: documentTags
    };
    
    try {
      await onUploadDocument(selectedFile, metadata);
      
      // Symulacja dodania dokumentu do listy
      const newDocument = {
        id: `doc${Date.now()}`,
        title: documentTitle,
        type: documentType,
        fileType: selectedFile.name.split('.').pop() || 'unknown',
        size: `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`,
        uploadedBy: 'Aktualny użytkownik',
        uploadedAt: new Date().toISOString(),
        expiresAt: null,
        tags: documentTags
      };
      
      setDocuments([newDocument, ...documents]);
      
      // Resetuj formularz
      setDocumentTitle('');
      setDocumentDescription('');
      setDocumentType('vehicle');
      setDocumentTags([]);
      setSelectedFile(null);
      
      // Przełącz na zakładkę wszystkich dokumentów
      setActiveTab('all');
    } catch (error) {
      console.error('Error uploading document:', error);
      alert('Wystąpił błąd podczas przesyłania dokumentu');
    }
  };
  
  // Obsługa usuwania dokumentu
  const handleDeleteDocument = async (documentId: string) => {
    if (window.confirm('Czy na pewno chcesz usunąć ten dokument?')) {
      try {
        await onDeleteDocument(documentId);
        
        // Usuń dokument z listy
        setDocuments(documents.filter(doc => doc.id !== documentId));
      } catch (error) {
        console.error('Error deleting document:', error);
        alert('Wystąpił błąd podczas usuwania dokumentu');
      }
    }
  };
  
  // Obsługa otwierania modalu udostępniania
  const handleOpenShareModal = (document: any) => {
    setSelectedDocument(document);
    setShareRecipients('');
    setShowShareModal(true);
  };
  
  // Obsługa zamykania modalu udostępniania
  const handleCloseShareModal = () => {
    setShowShareModal(false);
    setSelectedDocument(null);
  };
  
  // Obsługa udostępniania dokumentu
  const handleShareDocument = async () => {
    if (!selectedDocument || !shareRecipients) {
      alert('Proszę wprowadzić adresy e-mail odbiorców');
      return;
    }
    
    const recipients = shareRecipients.split(',').map(email => email.trim());
    
    try {
      await onShareDocument(selectedDocument.id, recipients);
      
      alert(`Dokument został udostępniony ${recipients.length} odbiorcom`);
      handleCloseShareModal();
    } catch (error) {
      console.error('Error sharing document:', error);
      alert('Wystąpił błąd podczas udostępniania dokumentu');
    }
  };
  
  // Formatowanie daty
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Brak';
    
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  
  // Renderowanie zakładki wszystkich dokumentów
  const renderDocumentsTab = () => {
    return (
      <>
        <SearchContainer>
          <SearchInput 
            type="text" 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
            placeholder="Szukaj dokumentów po tytule lub tagach..."
          />
        </SearchContainer>
        
        <FilterContainer>
          <FilterButton 
            active={activeTab === 'all'} 
            onClick={() => setActiveTab('all')}
          >
            Wszystkie
          </FilterButton>
          <FilterButton 
            active={activeTab === 'vehicle'} 
            onClick={() => setActiveTab('vehicle')}
          >
            Pojazdy
          </FilterButton>
          <FilterButton 
            active={activeTab === 'driver'} 
            onClick={() => setActiveTab('driver')}
          >
            Kierowcy
          </FilterButton>
          <FilterButton 
            active={activeTab === 'maintenance'} 
            onClick={() => setActiveTab('maintenance')}
          >
            Konserwacja
          </FilterButton>
          <FilterButton 
            active={activeTab === 'insurance'} 
            onClick={() => setActiveTab('insurance')}
          >
            Ubezpieczenie
          </FilterButton>
        </FilterContainer>
        
        {filteredDocuments.length === 0 ? (
          <EmptyState>
            <EmptyStateIcon>📄</EmptyStateIcon>
            <EmptyStateText>Brak dokumentów</EmptyStateText>
            <EmptyStateSubtext>
              {searchQuery ? 'Brak wyników dla podanego wyszukiwania' : 'Dodaj dokumenty, aby rozpocząć'}
            </EmptyStateSubtext>
            {searchQuery && (
              <SecondaryButton onClick={() => setSearchQuery('')}>
                Wyczyść wyszukiwanie
              </SecondaryButton>
            )}
          </EmptyState>
        ) : (
          <DocumentsList>
            {filteredDocuments.map(document => (
              <DocumentItem key={document.id}>
                <DocumentIcon type={document.fileType}>
                  {document.fileType.toUpperCase()}
                </DocumentIcon>
                <DocumentInfo>
                  <DocumentTitle>{document.title}</DocumentTitle>
                  <DocumentMeta>
                    <div>Rozmiar: {document.size}</div>
                    <div>Dodano: {formatDate(document.uploadedAt)}</div>
                    {document.expiresAt && (
                      <div>Wygasa: {formatDate(document.expiresAt)}</div>
                    )}
                  </DocumentMeta>
                  <TagsContainer>
                    {document.tags.map((tag: string) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </TagsContainer>
                </DocumentInfo>
                <DocumentActions>
                  <ActionButton>Pobierz</ActionButton>
                  <ActionButton onClick={() => handleOpenShareModal(document)}>Udostępnij</ActionButton>
                  <ActionButton onClick={() => handleDeleteDocument(document.id)}>Usuń</ActionButton>
                </DocumentActions>
              </DocumentItem>
            ))}
          </DocumentsList>
        )}
      </>
    );
  };
  
  // Renderowanie zakładki przesyłania dokumentu
  const renderUploadTab = () => {
    return (
      <>
        <UploadArea 
          onClick={() => document.getElementById('file-upload')?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <input 
            id="file-upload" 
            type="file" 
            style={{ display: 'none' }} 
            onChange={handleFileChange} 
          />
          <UploadIcon>📁</UploadIcon>
          <UploadText>
            {selectedFile ? `Wybrany plik: ${selectedFile.name}` : 'Kliknij lub przeciągnij plik tutaj'}
          </UploadText>
          <UploadSubtext>
            {selectedFile ? 
              `Rozmiar: ${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB` : 
              'Obsługiwane formaty: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG'}
          </UploadSubtext>
        </UploadArea>
        
        <FormGroup>
          <Label>Tytuł dokumentu *</Label>
          <Input 
            type="text" 
            value={documentTitle} 
            onChange={(e) => setDocumentTitle(e.target.value)} 
            placeholder="Wprowadź tytuł dokumentu"
          />
        </FormGroup>
        
        <FormGroup>
          <Label>Opis</Label>
          <TextArea 
            value={documentDescription} 
            onChange={(e) => setDocumentDescription(e.target.value)} 
            placeholder="Wprowadź opis dokumentu"
          />
        </FormGroup>
        
        <FormGroup>
          <Label>Typ dokumentu *</Label>
          <Select 
            value={documentType} 
            onChange={(e) => setDocumentType(e.target.value)}
          >
            <option value="vehicle">Pojazd</option>
            <option value="driver">Kierowca</option>
            <option value="maintenance">Konserwacja</option>
            <option value="insurance">Ubezpieczenie</option>
          </Select>
        </FormGroup>
        
        <FormGroup>
          <Label>Tagi</Label>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <Input 
              type="text" 
              value={newTag} 
              onChange={(e) => setNewTag(e.target.value)} 
              placeholder="Dodaj tag"
              onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
            />
            <Button onClick={handleAddTag}>Dodaj</Button>
          </div>
          <TagsContainer>
            {documentTags.map(tag => (
              <Tag key={tag}>
                {tag}
                <TagRemoveButton onClick={() => handleRemoveTag(tag)}>×</TagRemoveButton>
              </Tag>
            ))}
          </TagsContainer>
        </FormGroup>
        
        <ButtonGroup>
          <Button 
            onClick={handleUploadDocument}
            disabled={!selectedFile || !documentTitle || !documentType}
          >
            Prześlij dokument
          </Button>
        </ButtonGroup>
      </>
    );
  };
  
  return (
    <Container>
      <Header>
        <Title>Zarządzanie dokumentami</Title>
      </Header>
      
      <TabsContainer>
        <Tab 
          active={activeTab === 'all' || activeTab === 'vehicle' || activeTab === 'driver' || activeTab === 'maintenance' || activeTab === 'insurance'} 
          onClick={() => setActiveTab('all')}
        >
          Dokumenty
        </Tab>
        <Tab 
          active={activeTab === 'upload'} 
          onClick={() => setActiveTab('upload')}
        >
          Prześlij dokument
        </Tab>
      </TabsContainer>
      
      <Card>
        <CardContent>
          {(activeTab === 'all' || activeTab === 'vehicle' || activeTab === 'driver' || activeTab === 'maintenance' || activeTab === 'insurance') && renderDocumentsTab()}
          {activeTab === 'upload' && renderUploadTab()}
        </CardContent>
      </Card>
      
      {showShareModal && (
        <ShareModal>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Udostępnij dokument</ModalTitle>
              <ModalCloseButton onClick={handleCloseShareModal}>×</ModalCloseButton>
            </ModalHeader>
            
            <div>
              <p>Udostępnianie dokumentu: <strong>{selectedDocument?.title}</strong></p>
              
              <FormGroup>
                <Label>Adresy e-mail odbiorców *</Label>
                <TextArea 
                  value={shareRecipients} 
                  onChange={(e) => setShareRecipients(e.target.value)} 
                  placeholder="Wprowadź adresy e-mail odbiorców oddzielone przecinkami"
                />
              </FormGroup>
              
              <ModalFooter>
                <SecondaryButton onClick={handleCloseShareModal}>Anuluj</SecondaryButton>
                <Button onClick={handleShareDocument}>Udostępnij</Button>
              </ModalFooter>
            </div>
          </ModalContent>
        </ShareModal>
      )}
    </Container>
  );
};

export default DocumentManagement;
