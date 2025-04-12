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

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid #e0e0e0;
`;

const Tab = styled.div<{ active?: boolean }>`
  padding: 12px 24px;
  cursor: pointer;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  color: ${props => props.active ? '#3f51b5' : '#333'};
  border-bottom: 2px solid ${props => props.active ? '#3f51b5' : 'transparent'};
  
  &:hover {
    color: #3f51b5;
  }
`;

const ActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
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

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  background-color: #f5f7fa;
`;

const TableHeaderCell = styled.th`
  padding: 12px 16px;
  text-align: left;
  font-weight: 500;
  color: #333;
  border-bottom: 1px solid #e0e0e0;
`;

const TableRow = styled.tr`
  &:hover {
    background-color: #f5f7fa;
  }
`;

const TableCell = styled.td`
  padding: 12px 16px;
  border-bottom: 1px solid #e0e0e0;
`;

const ActionIcon = styled.span`
  cursor: pointer;
  margin-right: 8px;
  color: #666;
  
  &:hover {
    color: #333;
  }
`;

const SelectContainer = styled.div`
  margin-bottom: 20px;
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  width: 300px;
`;

const ViewCustomizationAdmin: React.FC = () => {
  const [activeTab, setActiveTab] = useState('templates');
  
  // Mock data for templates
  const templateData = [
    { name: 'Standard', role: 'Menedżer', description: 'Pełny widok z wszystkimi sekcjami' },
    { name: 'Monitoring', role: 'Dyspozytor', description: 'Widok tras i monitoringu pojazdów' },
    { name: 'Fraud', role: 'Analityk', description: 'Wykrywanie oszustw i analiza transakcji' },
    { name: 'Bezpieczeństwo', role: 'Specjalista', description: 'Monitoring bezpieczeństwa kierowców' }
  ];
  
  // Mock data for role elements
  const roleElementsData = [
    { section: 'KPI', status: 'Obowiązkowe', components: 'activeVehicles, activeDrivers, dailyCosts' },
    { section: 'Monitoring', status: 'Obowiązkowe', components: 'map, status, alerts' },
    { section: 'Fraud', status: 'Opcjonalne', components: 'alerts, map, transactions' },
    { section: 'Bezpieczeństwo', status: 'Niedostępne', components: '-' }
  ];
  
  return (
    <PageContainer>
      <SectionTitle>ZARZĄDZANIE WIDOKAMI</SectionTitle>
      
      <TabContainer>
        <Tab 
          active={activeTab === 'templates'} 
          onClick={() => setActiveTab('templates')}
        >
          Szablony widoków
        </Tab>
        <Tab 
          active={activeTab === 'elements'} 
          onClick={() => setActiveTab('elements')}
        >
          Elementy dla ról
        </Tab>
      </TabContainer>
      
      {activeTab === 'templates' && (
        <>
          <ActionBar>
            <ButtonGroup>
              <Button primary>+ Nowy szablon</Button>
              <Button>Importuj</Button>
              <Button>Eksportuj</Button>
            </ButtonGroup>
          </ActionBar>
          
          <Card fullWidth>
            <Table>
              <TableHeader>
                <tr>
                  <TableHeaderCell>Nazwa</TableHeaderCell>
                  <TableHeaderCell>Rola</TableHeaderCell>
                  <TableHeaderCell>Opis</TableHeaderCell>
                  <TableHeaderCell>Akcje</TableHeaderCell>
                </tr>
              </TableHeader>
              <tbody>
                {templateData.map((template, index) => (
                  <TableRow key={index}>
                    <TableCell>{template.name}</TableCell>
                    <TableCell>{template.role}</TableCell>
                    <TableCell>{template.description}</TableCell>
                    <TableCell>
                      <ActionIcon title="Edytuj">✏️</ActionIcon>
                      <ActionIcon title="Duplikuj">📋</ActionIcon>
                      <ActionIcon title="Usuń">🗑️</ActionIcon>
                    </TableCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          </Card>
        </>
      )}
      
      {activeTab === 'elements' && (
        <>
          <SelectContainer>
            <Select>
              <option>Dyspozytor</option>
              <option>Menedżer</option>
              <option>Analityk</option>
              <option>Specjalista bezpieczeństwa</option>
              <option>Kierowca</option>
            </Select>
          </SelectContainer>
          
          <Card fullWidth>
            <Table>
              <TableHeader>
                <tr>
                  <TableHeaderCell>Sekcja</TableHeaderCell>
                  <TableHeaderCell>Status</TableHeaderCell>
                  <TableHeaderCell>Komponenty</TableHeaderCell>
                  <TableHeaderCell>Akcje</TableHeaderCell>
                </tr>
              </TableHeader>
              <tbody>
                {roleElementsData.map((element, index) => (
                  <TableRow key={index}>
                    <TableCell>{element.section}</TableCell>
                    <TableCell>{element.status}</TableCell>
                    <TableCell>{element.components}</TableCell>
                    <TableCell>
                      <ActionIcon title="Konfiguruj">⚙️</ActionIcon>
                    </TableCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          </Card>
          
          <ButtonGroup>
            <Button primary>Zapisz zmiany</Button>
            <Button>Anuluj</Button>
          </ButtonGroup>
        </>
      )}
    </PageContainer>
  );
};

export default ViewCustomizationAdmin;
