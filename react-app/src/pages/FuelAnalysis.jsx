import React from 'react';
import styled from 'styled-components';
import Card from '../components/common/Card';
import KPICard from '../components/common/KPICard';
import Table from '../components/common/Table';

/**
 * Simplified Fuel Analysis component for testing
 * @returns {JSX.Element} Fuel Analysis component
 */
const FuelAnalysis = () => {
  console.log('FuelAnalysis component rendering');
  
  return (
    <Container>
      <Header>
        <Title>Analiza Paliwa (Test)</Title>
      </Header>
      
      <Card title="Test Card">
        <p>To jest uproszczony komponent testowy dla Fuel Analysis.</p>
        <p>Jeśli widzisz ten tekst, podstawowe renderowanie działa poprawnie.</p>
      </Card>
      
      <KpiSection>
        <KPICard 
          title="Średnie zużycie paliwa"
          value="8.7 l/100km"
          change={-2.3}
          icon="fuel"
        />
        <KPICard 
          title="Całkowity koszt paliwa"
          value="125780 zł"
          change={5.7}
          icon="money"
        />
      </KpiSection>
      
      <Card title="Tabela testowa">
        <TableContainer>
          <Table 
            columns={[
              { key: 'id', label: 'ID' },
              { key: 'name', label: 'Nazwa' },
              { key: 'value', label: 'Wartość' }
            ]}
            data={[
              { id: 1, name: 'Test 1', value: 100 },
              { id: 2, name: 'Test 2', value: 200 },
              { id: 3, name: 'Test 3', value: 300 }
            ]}
            isLoading={false}
            emptyMessage="Brak danych"
          />
        </TableContainer>
      </Card>
    </Container>
  );
};

// Styled components
const Container = styled.div`
  padding: 20px;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin: 0;
`;

const KpiSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
`;

const TableContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`;

export default FuelAnalysis;
