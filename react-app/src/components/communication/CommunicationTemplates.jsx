import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getMessageTemplates, createMessageTemplate, updateMessageTemplate, deleteMessageTemplate } from '../../services/api/communicationService';

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
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CreateButton = styled.button`
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

const TemplatesList = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const TemplateItem = styled.div`
  padding: 15px;
  cursor: pointer;
  border-bottom: 1px solid #eee;
  background-color: ${props => props.active ? '#e8f0fe' : 'transparent'};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => props.active ? '#e8f0fe' : '#f5f5f5'};
  }
`;

const TemplateTitle = styled.div`
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  color: #333;
  margin-bottom: 5px;
`;

const TemplatePreview = styled.div`
  font-size: 13px;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TemplateCategory = styled.div`
  display: inline-block;
  font-size: 11px;
  color: #1a73e8;
  background-color: #e8f0fe;
  padding: 2px 8px;
  border-radius: 12px;
  margin-top: 5px;
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
  background: ${props => props.primary ? '#1a73e8' : 'none'};
  color: ${props => props.primary ? 'white' : '#666'};
  border: ${props => props.primary ? 'none' : '1px solid #ddd'};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 13px;
  gap: 5px;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.primary ? '#1765cc' : '#f5f5f5'};
  }

  &:disabled {
    background-color: #dadce0;
    border-color: #dadce0;
    color: #9aa0a6;
    cursor: not-allowed;
  }
`;

const TemplateForm = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
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

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
  outline: none;
  font-size: 14px;
  background-color: white;

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
  min-height: 150px;

  &:focus {
    border-color: #1a73e8;
  }
`;

const VariablesList = styled.div`
  margin-top: 10px;
  background-color: #f8f9fa;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #eee;
`;

const VariablesTitle = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 13px;
  color: #333;
`;

const VariableItem = styled.span`
  display: inline-block;
  background-color: #e8f0fe;
  color: #1a73e8;
  padding: 2px 8px;
  border-radius: 12px;
  margin-right: 5px;
  margin-bottom: 5px;
  font-size: 12px;
  cursor: pointer;

  &:hover {
    background-color: #d2e3fc;
  }
`;

const PreviewContainer = styled.div`
  margin-top: 20px;
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 15px;
`;

const PreviewTitle = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
  font-size: 14px;
  color: #333;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const PreviewContent = styled.div`
  font-size: 14px;
  color: #333;
  line-height: 1.5;
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

const CommunicationTemplates = ({ useMockData = true }) => {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'driver',
    content: '',
    description: ''
  });

  const categories = [
    { value: 'driver', label: 'Kierowcy' },
    { value: 'customer', label: 'Klienci' },
    { value: 'team', label: 'Zespół' },
    { value: 'notification', label: 'Powiadomienia' },
    { value: 'system', label: 'Systemowe' }
  ];

  const variables = {
    driver: ['{{driver_name}}', '{{driver_id}}', '{{vehicle_id}}', '{{route_number}}', '{{date}}', '{{time}}'],
    customer: ['{{customer_name}}', '{{order_number}}', '{{delivery_date}}', '{{delivery_time}}', '{{tracking_link}}'],
    team: ['{{team_name}}', '{{member_name}}', '{{project_name}}', '{{deadline}}', '{{task_description}}'],
    notification: ['{{notification_title}}', '{{notification_content}}', '{{notification_date}}', '{{notification_time}}'],
    system: ['{{system_message}}', '{{error_code}}', '{{error_description}}', '{{support_link}}']
  };

  useEffect(() => {
    const fetchTemplates = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getMessageTemplates(useMockData);
        setTemplates(data);
        if (data.length > 0 && !selectedTemplate) {
          setSelectedTemplate(data[0]);
        }
      } catch (err) {
        console.error('Error fetching templates:', err);
        setError('Nie udało się pobrać szablonów wiadomości.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTemplates();
  }, [useMockData]);

  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template);
    setIsEditing(false);
    setFormData({
      name: template.name,
      category: template.category,
      content: template.content,
      description: template.description
    });
  };

  const handleCreateTemplate = () => {
    setShowCreateModal(true);
    setFormData({
      name: '',
      category: 'driver',
      content: '',
      description: ''
    });
  };

  const handleEditTemplate = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    if (selectedTemplate) {
      setFormData({
        name: selectedTemplate.name,
        category: selectedTemplate.category,
        content: selectedTemplate.content,
        description: selectedTemplate.description
      });
    }
  };

  const handleSaveTemplate = async () => {
    if (!formData.name || !formData.content) return;

    setIsLoading(true);
    try {
      if (isEditing && selectedTemplate) {
        // Update existing template
        const updatedTemplate = await updateMessageTemplate(
          useMockData,
          selectedTemplate.id,
          formData
        );
        
        setTemplates(templates.map(template => 
          template.id === updatedTemplate.id ? updatedTemplate : template
        ));
        setSelectedTemplate(updatedTemplate);
      } else {
        // Create new template
        const newTemplate = await createMessageTemplate(
          useMockData,
          formData
        );
        
        setTemplates([newTemplate, ...templates]);
        setSelectedTemplate(newTemplate);
        setShowCreateModal(false);
      }
      
      setIsEditing(false);
    } catch (err) {
      console.error('Error saving template:', err);
      alert('Nie udało się zapisać szablonu. Spróbuj ponownie.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTemplate = async () => {
    if (!selectedTemplate) return;

    setIsLoading(true);
    try {
      await deleteMessageTemplate(useMockData, selectedTemplate.id);
      
      const updatedTemplates = templates.filter(template => template.id !== selectedTemplate.id);
      setTemplates(updatedTemplates);
      setSelectedTemplate(updatedTemplates.length > 0 ? updatedTemplates[0] : null);
      setShowDeleteModal(false);
    } catch (err) {
      console.error('Error deleting template:', err);
      alert('Nie udało się usunąć szablonu. Spróbuj ponownie.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleInsertVariable = (variable) => {
    setFormData({
      ...formData,
      content: formData.content + ' ' + variable
    });
  };

  const getCategoryLabel = (categoryValue) => {
    const category = categories.find(cat => cat.value === categoryValue);
    return category ? category.label : categoryValue;
  };

  const filteredTemplates = templates.filter(template => 
    template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Container>
        <SidebarContainer>
          <SidebarHeader>
            <span>Szablony wiadomości</span>
            <CreateButton onClick={handleCreateTemplate}>
              <span className="icon icon-plus"></span>
            </CreateButton>
          </SidebarHeader>
          <SearchBox>
            <SearchInput 
              type="text" 
              placeholder="Szukaj szablonu..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchBox>
          <TemplatesList>
            {filteredTemplates.map(template => (
              <TemplateItem 
                key={template.id}
                active={selectedTemplate && selectedTemplate.id === template.id}
                onClick={() => handleSelectTemplate(template)}
              >
                <TemplateTitle active={selectedTemplate && selectedTemplate.id === template.id}>
                  {template.name}
                </TemplateTitle>
                <TemplatePreview>{template.description}</TemplatePreview>
                <TemplateCategory>{getCategoryLabel(template.category)}</TemplateCategory>
              </TemplateItem>
            ))}
          </TemplatesList>
        </SidebarContainer>

        <ContentContainer>
          {selectedTemplate ? (
            <>
              <ContentHeader>
                <ContentTitle>
                  <span className="icon icon-template"></span>
                  {isEditing ? 'Edycja szablonu' : selectedTemplate.name}
                </ContentTitle>
                <ContentActions>
                  {isEditing ? (
                    <>
                      <ActionButton onClick={handleCancelEdit}>
                        <span className="icon icon-times"></span>
                        Anuluj
                      </ActionButton>
                      <ActionButton 
                        primary 
                        onClick={handleSaveTemplate}
                        disabled={!formData.name || !formData.content}
                      >
                        <span className="icon icon-save"></span>
                        Zapisz
                      </ActionButton>
                    </>
                  ) : (
                    <>
                      <ActionButton onClick={() => setShowDeleteModal(true)}>
                        <span className="icon icon-trash"></span>
                        Usuń
                      </ActionButton>
                      <ActionButton primary onClick={handleEditTemplate}>
                        <span className="icon icon-edit"></span>
                        Edytuj
                      </ActionButton>
                    </>
                  )}
                </ContentActions>
              </ContentHeader>

              {isEditing ? (
                <TemplateForm>
                  <FormGroup>
                    <Label htmlFor="name">Nazwa szablonu</Label>
                    <Input 
                      id="name"
                      name="name"
                      type="text" 
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Np. Potwierdzenie dostawy"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="category">Kategoria</Label>
                    <Select 
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                    >
                      {categories.map(category => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </Select>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="description">Opis</Label>
                    <Input 
                      id="description"
                      name="description"
                      type="text" 
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Krótki opis szablonu"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="content">Treść szablonu</Label>
                    <TextArea 
                      id="content"
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      placeholder="Wprowadź treść szablonu..."
                    />
                    <VariablesList>
                      <VariablesTitle>Dostępne zmienne:</VariablesTitle>
                      {variables[formData.category].map((variable, index) => (
                        <VariableItem 
                          key={index}
                          onClick={() => handleInsertVariable(variable)}
                        >
                          {variable}
                        </VariableItem>
                      ))}
                    </VariablesList>
                  </FormGroup>
                  <PreviewContainer>
                    <PreviewTitle>
                      <span className="icon icon-eye"></span>
                      Podgląd
                    </PreviewTitle>
                    <PreviewContent>
                      {formData.content}
                    </PreviewContent>
                  </PreviewContainer>
                </TemplateForm>
              ) : (
                <TemplateForm>
                  <FormGroup>
                    <Label>Kategoria</Label>
                    <div>{getCategoryLabel(selectedTemplate.category)}</div>
                  </FormGroup>
                  <FormGroup>
                    <Label>Opis</Label>
                    <div>{selectedTemplate.description}</div>
                  </FormGroup>
                  <FormGroup>
                    <Label>Treść szablonu</Label>
                    <PreviewContainer>
                      <PreviewContent>
                        {selectedTemplate.content}
                      </PreviewContent>
                    </PreviewContainer>
                  </FormGroup>
                  <FormGroup>
                    <Label>Zmienne</Label>
                    <VariablesList>
                      {variables[selectedTemplate.category].map((variable, index) => (
                        <VariableItem key={index}>
                          {variable}
                        </VariableItem>
                      ))}
                    </VariablesList>
                  </FormGroup>
                </TemplateForm>
              )}
            </>
          ) : (
            <EmptyState>
              <EmptyStateIcon>
                <span className="icon icon-template"></span>
              </EmptyStateIcon>
              <EmptyStateTitle>Brak wybranego szablonu</EmptyStateTitle>
              <EmptyStateText>
                Wybierz szablon z listy po lewej stronie lub utwórz nowy szablon.
              </EmptyStateText>
              <EmptyStateButton onClick={handleCreateTemplate}>
                Utwórz nowy szablon
              </EmptyStateButton>
            </EmptyState>
          )}
        </ContentContainer>
      </Container>

      {showDeleteModal && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Usuń szablon</ModalTitle>
              <CloseButton onClick={() => setShowDeleteModal(false)}>
                <span className="icon icon-times"></span>
              </CloseButton>
            </ModalHeader>
            <p>Czy na pewno chcesz usunąć szablon "{selectedTemplate.name}"?</p>
            <p>Ta operacja jest nieodwracalna.</p>
            <ButtonGroup>
              <CancelButton onClick={() => setShowDeleteModal(false)}>
                Anuluj
              </CancelButton>
              <SubmitButton 
                onClick={handleDeleteTemplate}
                disabled={isLoading}
              >
                {isLoading ? 'Usuwanie...' : 'Usuń'}
              </SubmitButton>
            </ButtonGroup>
          </ModalContent>
        </Modal>
      )}

      {showCreateModal && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Utwórz nowy szablon</ModalTitle>
              <CloseButton onClick={() => setShowCreateModal(false)}>
                <span className="icon icon-times"></span>
              </CloseButton>
            </ModalHeader>
            <FormGroup>
              <Label htmlFor="create-name">Nazwa szablonu</Label>
              <Input 
                id="create-name"
                name="name"
                type="text" 
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Np. Potwierdzenie dostawy"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="create-category">Kategoria</Label>
              <Select 
                id="create-category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </Select>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="create-description">Opis</Label>
              <Input 
                id="create-description"
                name="description"
                type="text" 
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Krótki opis szablonu"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="create-content">Treść szablonu</Label>
              <TextArea 
                id="create-content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="Wprowadź treść szablonu..."
              />
            </FormGroup>
            <ButtonGroup>
              <CancelButton onClick={() => setShowCreateModal(false)}>
                Anuluj
              </CancelButton>
              <SubmitButton 
                onClick={handleSaveTemplate}
                disabled={!formData.name || !formData.content || isLoading}
              >
                {isLoading ? 'Tworzenie...' : 'Utwórz'}
              </SubmitButton>
            </ButtonGroup>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default CommunicationTemplates;
