import React, { useState } from 'react';
import styled from 'styled-components';
import Card from '../components/common/Card';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 500;
  color: #333;
  margin: 0 0 16px 0;
`;

const InstructionText = styled.p`
  margin-bottom: 20px;
  color: #555;
`;

const EditModeHeader = styled.div`
  background-color: #f0f4f8;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const SectionCard = styled.div<{ active?: boolean }>`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin-bottom: 20px;
  position: relative;
  border: 2px solid ${props => props.active ? '#3f51b5' : 'transparent'};
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const SectionTitle2 = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin: 0;
`;

const SectionActions = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #666;
  
  &:hover {
    color: #333;
  }
`;

const SectionContent = styled.div`
  background-color: #f5f7fa;
  border-radius: 4px;
  padding: 16px;
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
`;

const AddSectionButton = styled.button`
  background-color: #f0f4f8;
  border: 2px dashed #ccc;
  border-radius: 8px;
  padding: 16px;
  width: 100%;
  text-align: center;
  color: #666;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 20px;
  
  &:hover {
    background-color: #e3e7f1;
    color: #333;
  }
`;

const SaveBar = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ViewNameInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  width: 100%;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button<{ primary?: boolean }>`
  padding: 10px 16px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${props => props.primary ? '#3f51b5' : 'white'};
  color: ${props => props.primary ? 'white' : '#333'};
  border: 1px solid ${props => props.primary ? '#3f51b5' : '#ccc'};
  
  &:hover {
    background-color: ${props => props.primary ? '#303f9f' : '#f5f5f5'};
  }
`;

const ViewCustomizationUser: React.FC = () => {
  const [viewName, setViewName] = useState('Mój widok dyspozytorski');
  
  return (
    <PageContainer>
      <SectionTitle>TRYB EDYCJI DASHBOARDU</SectionTitle>
      
      <EditModeHeader>
        <InstructionText>
          Przeciągnij sekcje, aby zmienić ich układ. 
          Kliknij ✏️, aby edytować sekcję. 
          Kliknij 👁️, aby ukryć sekcję.
        </InstructionText>
      </EditModeHeader>
      
      <DashboardGrid>
        <SectionCard active>
          <SectionHeader>
            <SectionTitle2>Aktywne pojazdy</SectionTitle2>
            <SectionActions>
              <ActionButton title="Edytuj">✏️</ActionButton>
              <ActionButton title="Ukryj">👁️</ActionButton>
            </SectionActions>
          </SectionHeader>
          <SectionContent>125</SectionContent>
        </SectionCard>
        
        <SectionCard>
          <SectionHeader>
            <SectionTitle2>Aktywni kierowcy</SectionTitle2>
            <SectionActions>
              <ActionButton title="Edytuj">✏️</ActionButton>
              <ActionButton title="Ukryj">👁️</ActionButton>
            </SectionActions>
          </SectionHeader>
          <SectionContent>98</SectionContent>
        </SectionCard>
      </DashboardGrid>
      
      <SectionCard>
        <SectionHeader>
          <SectionTitle2>Alerty o oszustwach</SectionTitle2>
          <SectionActions>
            <ActionButton title="Edytuj">✏️</ActionButton>
            <ActionButton title="Ukryj">👁️</ActionButton>
          </SectionActions>
        </SectionHeader>
        <SectionContent>Tabela alertów o oszustwach</SectionContent>
      </SectionCard>
      
      <SectionCard>
        <SectionHeader>
          <SectionTitle2>Bezpieczeństwo kierowcy</SectionTitle2>
          <SectionActions>
            <ActionButton title="Edytuj">✏️</ActionButton>
            <ActionButton title="Ukryj">👁️</ActionButton>
          </SectionActions>
        </SectionHeader>
        <SectionContent>Tabela alertów bezpieczeństwa</SectionContent>
      </SectionCard>
      
      <AddSectionButton>+ Dodaj sekcję</AddSectionButton>
      
      <SaveBar>
        <ViewNameInput 
          value={viewName} 
          onChange={(e) => setViewName(e.target.value)} 
          placeholder="Nazwa widoku"
        />
        <ButtonGroup>
          <Button primary>Zapisz jako nowy</Button>
          <Button>Aktualizuj bieżący</Button>
          <Button>Anuluj</Button>
        </ButtonGroup>
      </SaveBar>
    </PageContainer>
  );
};

export default ViewCustomizationUser;
