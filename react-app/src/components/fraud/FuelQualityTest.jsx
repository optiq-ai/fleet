import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

/**
 * @typedef {Object} FuelQualityTestProps
 * @property {Array} transactions - List of transactions to analyze
 * @property {Function} onTestResults - Callback when test results are generated
 */

const Container = styled.div`
  padding: 16px;
`;

const TestHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const TestTitle = styled.h3`
  margin: 0;
`;

const TestControls = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: ${props => props.primary ? '#3f51b5' : 'white'};
  color: ${props => props.primary ? 'white' : '#3f51b5'};
  border: 1px solid ${props => props.primary ? '#3f51b5' : '#e0e0e0'};
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.primary ? '#303f9f' : '#f5f5f5'};
  }
`;

const FilterSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
`;

const TestGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
`;

const TestCard = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
`;

const TestCardHeader = styled.div`
  padding: 12px 16px;
  background-color: ${props => 
    props.status === 'pass' ? '#e8f5e9' : 
    props.status === 'warning' ? '#fff8e1' : 
    '#ffebee'
  };
  color: ${props => 
    props.status === 'pass' ? '#2e7d32' : 
    props.status === 'warning' ? '#f57f17' : 
    '#c62828'
  };
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TestCardBody = styled.div`
  padding: 16px;
`;

const TestInfo = styled.div`
  margin-bottom: 16px;
`;

const InfoRow = styled.div`
  display: flex;
  margin-bottom: 8px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const InfoLabel = styled.div`
  font-weight: 500;
  width: 120px;
  flex-shrink: 0;
`;

const InfoValue = styled.div`
  color: #666;
`;

const TestResults = styled.div`
  margin-bottom: 16px;
`;

const ResultTitle = styled.div`
  font-weight: 500;
  margin-bottom: 8px;
`;

const ResultsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  
  th, td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #e0e0e0;
  }
  
  th {
    background-color: #f5f5f5;
    font-weight: 500;
  }
`;

const ResultValue = styled.td`
  color: ${props => 
    props.status === 'pass' ? '#2e7d32' : 
    props.status === 'warning' ? '#f57f17' : 
    '#c62828'
  };
  font-weight: ${props => props.status !== 'pass' ? '500' : 'normal'};
`;

const TestChart = styled.div`
  height: 150px;
  background-color: #f5f5f5;
  border-radius: 4px;
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #9e9e9e;
`;

const ActionButton = styled.button`
  padding: 4px 8px;
  background-color: transparent;
  color: #3f51b5;
  border: 1px solid #3f51b5;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  
  &:hover {
    background-color: #e8eaf6;
  }
`;

const SummarySection = styled.div`
  margin-top: 20px;
  padding: 16px;
  background-color: #f5f5f5;
  border-radius: 8px;
`;

const SummaryTitle = styled.h4`
  margin-top: 0;
  margin-bottom: 12px;
`;

const SummaryStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 16px;
`;

const StatCard = styled.div`
  padding: 16px;
  background-color: ${props => 
    props.status === 'pass' ? '#e8f5e9' : 
    props.status === 'warning' ? '#fff8e1' : 
    '#ffebee'
  };
  border-radius: 4px;
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 4px;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: #666;
`;

/**
 * Fuel quality test component for fraud detection
 * @param {FuelQualityTestProps} props - Component props
 * @returns {JSX.Element} FuelQualityTest component
 */
const FuelQualityTest = ({ 
  transactions,
  onTestResults
}) => {
  const [testResults, setTestResults] = useState([]);
  const [fuelType, setFuelType] = useState('all');
  const [timeRange, setTimeRange] = useState('last30days');
  
  // Generowanie wyników testów przy zmianie transakcji, typu paliwa lub zakresu czasu
  useEffect(() => {
    // W rzeczywistej aplikacji tutaj byłoby pobieranie danych z systemu testowania paliwa
    
    // Symulacja wyników testów dla celów demonstracyjnych
    const generateTestResults = () => {
      // Filtrowanie transakcji na podstawie typu paliwa
      const filteredTransactions = transactions.filter(transaction => {
        if (fuelType === 'all') return true;
        
        // W rzeczywistej aplikacji transakcje miałyby informację o typie paliwa
        // Tutaj symulujemy to na podstawie kwoty transakcji
        const isFuelTypeMatch = 
          (fuelType === 'diesel' && transaction.amount > 100) ||
          (fuelType === 'petrol' && transaction.amount <= 100) ||
          (fuelType === 'lpg' && transaction.amount > 50 && transaction.amount <= 80);
        
        return isFuelTypeMatch;
      });
      
      // Generowanie wyników testów dla przefiltrowanych transakcji
      const results = filteredTransactions.map(transaction => {
        // Generowanie losowych wyników testów dla celów demonstracyjnych
        const generateTestValue = (min, max) => {
          return Math.round((Math.random() * (max - min) + min) * 100) / 100;
        };
        
        // Określenie typu paliwa na podstawie kwoty transakcji (symulacja)
        const determineFuelType = () => {
          if (transaction.amount > 100) return 'Diesel';
          if (transaction.amount > 50 && transaction.amount <= 80) return 'LPG';
          return 'Benzyna';
        };
        
        const fuelType = determineFuelType();
        
        // Parametry testów w zależności od typu paliwa
        let densityRange, waterContentRange, sulfurContentRange, cetaneNumberRange;
        
        switch (fuelType) {
          case 'Diesel':
            densityRange = { min: 0.82, max: 0.845, unit: 'g/cm³' };
            waterContentRange = { min: 0, max: 200, unit: 'ppm' };
            sulfurContentRange = { min: 0, max: 10, unit: 'ppm' };
            cetaneNumberRange = { min: 51, max: 55, unit: '' };
            break;
          case 'Benzyna':
            densityRange = { min: 0.72, max: 0.775, unit: 'g/cm³' };
            waterContentRange = { min: 0, max: 150, unit: 'ppm' };
            sulfurContentRange = { min: 0, max: 10, unit: 'ppm' };
            cetaneNumberRange = { min: 0, max: 0, unit: '' }; // Nie dotyczy benzyny
            break;
          case 'LPG':
            densityRange = { min: 0.5, max: 0.58, unit: 'g/cm³' };
            waterContentRange = { min: 0, max: 100, unit: 'ppm' };
            sulfurContentRange = { min: 0, max: 10, unit: 'ppm' };
            cetaneNumberRange = { min: 0, max: 0, unit: '' }; // Nie dotyczy LPG
            break;
          default:
            densityRange = { min: 0.7, max: 0.9, unit: 'g/cm³' };
            waterContentRange = { min: 0, max: 200, unit: 'ppm' };
            sulfurContentRange = { min: 0, max: 10, unit: 'ppm' };
            cetaneNumberRange = { min: 0, max: 55, unit: '' };
        }
        
        // Generowanie wartości testów
        const density = generateTestValue(
          densityRange.min - 0.05, 
          densityRange.max + 0.05
        );
        
        const waterContent = generateTestValue(
          0, 
          waterContentRange.max * 1.5
        );
        
        const sulfurContent = generateTestValue(
          0, 
          sulfurContentRange.max * 1.5
        );
        
        const cetaneNumber = fuelType === 'Diesel' 
          ? generateTestValue(cetaneNumberRange.min - 5, cetaneNumberRange.max + 2) 
          : null;
        
        // Określenie statusu dla każdego parametru
        const getDensityStatus = () => {
          if (density < densityRange.min || density > densityRange.max) {
            return 'fail';
          }
          return 'pass';
        };
        
        const getWaterContentStatus = () => {
          if (waterContent > waterContentRange.max) {
            return 'fail';
          } else if (waterContent > waterContentRange.max * 0.8) {
            return 'warning';
          }
          return 'pass';
        };
        
        const getSulfurContentStatus = () => {
          if (sulfurContent > sulfurContentRange.max) {
            return 'fail';
          } else if (sulfurContent > sulfurContentRange.max * 0.8) {
            return 'warning';
          }
          return 'pass';
        };
        
        const getCetaneNumberStatus = () => {
          if (cetaneNumber === null) return null;
          if (cetaneNumber < cetaneNumberRange.min) {
            return 'fail';
          } else if (cetaneNumber < cetaneNumberRange.min + 2) {
            return 'warning';
          }
          return 'pass';
        };
        
        // Określenie ogólnego statusu testu
        const getOverallStatus = () => {
          const statuses = [
            getDensityStatus(),
            getWaterContentStatus(),
            getSulfurContentStatus()
          ];
          
          if (cetaneNumber !== null) {
            statuses.push(getCetaneNumberStatus());
          }
          
          if (statuses.includes('fail')) {
            return 'fail';
          } else if (statuses.includes('warning')) {
            return 'warning';
          }
          return 'pass';
        };
        
        return {
          id: transaction.id,
          transactionId: transaction.id,
          date: transaction.date,
          station: transaction.location,
          vehicle: transaction.vehicle,
          driver: transaction.driver,
          fuelType,
          amount: transaction.amount,
          currency: transaction.currency,
          testDate: transaction.date, // W rzeczywistej aplikacji byłaby inna data testu
          density: {
            value: density,
            unit: densityRange.unit,
            min: densityRange.min,
            max: densityRange.max,
            status: getDensityStatus()
          },
          waterContent: {
            value: waterContent,
            unit: waterContentRange.unit,
            max: waterContentRange.max,
            status: getWaterContentStatus()
          },
          sulfurContent: {
            value: sulfurContent,
            unit: sulfurContentRange.unit,
            max: sulfurContentRange.max,
            status: getSulfurContentStatus()
          },
          cetaneNumber: cetaneNumber !== null ? {
            value: cetaneNumber,
            min: cetaneNumberRange.min,
            status: getCetaneNumberStatus()
          } : null,
          overallStatus: getOverallStatus()
        };
      });
      
      setTestResults(results);
      onTestResults(results);
    };
    
    generateTestResults();
  }, [transactions, fuelType, timeRange, onTestResults]);
  
  // Obliczanie statystyk podsumowujących
  const passCount = testResults.filter(result => result.overallStatus === 'pass').length;
  const warningCount = testResults.filter(result => result.overallStatus === 'warning').length;
  const failCount = testResults.filter(result => result.overallStatus === 'fail').length;
  
  // Obsługa zmiany filtrów
  const handleFuelTypeChange = (e) => {
    setFuelType(e.target.value);
  };
  
  const handleTimeRangeChange = (e) => {
    setTimeRange(e.target.value);
  };
  
  // Obsługa uruchomienia nowych testów
  const handleRunTests = () => {
    // W rzeczywistej aplikacji tutaj byłoby uruchamianie rzeczywistych testów
    
    // Symulacja uruchamiania testów dla celów demonstracyjnych
    alert('Uruchamianie nowych testów jakości paliwa...');
    
    // Odświeżenie wyników testów
    const updatedTransactions = [...transactions];
    setTestResults([]);
    setTimeout(() => {
      // W rzeczywistej aplikacji tutaj byłoby pobieranie nowych wyników testów
      // Symulacja przez ponowne ustawienie transakcji
      setTestResults([]);
    }, 1000);
  };
  
  // Renderowanie karty testu
  const renderTestCard = (result) => {
    return (
      <TestCard key={result.id}>
        <TestCardHeader status={result.overallStatus}>
          Test #{result.id} - {result.fuelType}
          {result.overallStatus === 'pass' && <span>✓ Zgodne</span>}
          {result.overallStatus === 'warning' && <span>⚠️ Ostrzeżenie</span>}
          {result.overallStatus === 'fail' && <span>✗ Niezgodne</span>}
        </TestCardHeader>
        
        <TestCardBody>
          <TestInfo>
            <InfoRow>
              <InfoLabel>Data:</InfoLabel>
              <InfoValue>{result.date}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>Stacja:</InfoLabel>
              <InfoValue>{result.station}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>Pojazd:</InfoLabel>
              <InfoValue>{result.vehicle}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>Kierowca:</InfoLabel>
              <InfoValue>{result.driver}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>Ilość:</InfoLabel>
              <InfoValue>{result.amount.toFixed(2)} {result.currency}</InfoValue>
            </InfoRow>
          </TestInfo>
          
          <TestChart>
            [Wykres parametrów paliwa]
          </TestChart>
          
          <TestResults>
            <ResultTitle>Wyniki testów:</ResultTitle>
            <ResultsTable>
              <thead>
                <tr>
                  <th>Parametr</th>
                  <th>Wartość</th>
                  <th>Norma</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Gęstość</td>
                  <td>{result.density.value.toFixed(3)} {result.density.unit}</td>
                  <td>{result.density.min.toFixed(3)} - {result.density.max.toFixed(3)} {result.density.unit}</td>
                  <ResultValue status={result.density.status}>
                    {result.density.status === 'pass' ? 'OK' : 
                     result.density.status === 'warning' ? 'Ostrzeżenie' : 
                     'Niezgodne'}
                  </ResultValue>
                </tr>
                <tr>
                  <td>Zawartość wody</td>
                  <td>{result.waterContent.value.toFixed(1)} {result.waterContent.unit}</td>
                  <td>max {result.waterContent.max} {result.waterContent.unit}</td>
                  <ResultValue status={result.waterContent.status}>
                    {result.waterContent.status === 'pass' ? 'OK' : 
                     result.waterContent.status === 'warning' ? 'Ostrzeżenie' : 
                     'Niezgodne'}
                  </ResultValue>
                </tr>
                <tr>
                  <td>Zawartość siarki</td>
                  <td>{result.sulfurContent.value.toFixed(1)} {result.sulfurContent.unit}</td>
                  <td>max {result.sulfurContent.max} {result.sulfurContent.unit}</td>
                  <ResultValue status={result.sulfurContent.status}>
                    {result.sulfurContent.status === 'pass' ? 'OK' : 
                     result.sulfurContent.status === 'warning' ? 'Ostrzeżenie' : 
                     'Niezgodne'}
                  </ResultValue>
                </tr>
                {result.cetaneNumber && (
                  <tr>
                    <td>Liczba cetanowa</td>
                    <td>{result.cetaneNumber.value.toFixed(1)}</td>
                    <td>min {result.cetaneNumber.min}</td>
                    <ResultValue status={result.cetaneNumber.status || 'pass'}>
                      {result.cetaneNumber.status === 'pass' ? 'OK' : 
                       result.cetaneNumber.status === 'warning' ? 'Ostrzeżenie' : 
                       'Niezgodne'}
                    </ResultValue>
                  </tr>
                )}
              </tbody>
            </ResultsTable>
          </TestResults>
          
          <ActionButton onClick={() => alert(`Szczegółowy raport dla testu #${result.id}`)}>
            Pełny raport
          </ActionButton>
        </TestCardBody>
      </TestCard>
    );
  };
  
  return (
    <Container>
      <TestHeader>
        <TestTitle>Testy jakości paliwa</TestTitle>
      </TestHeader>
      
      <TestControls>
        <Button primary onClick={handleRunTests}>
          Uruchom nowe testy
        </Button>
        
        <FilterSelect 
          value={fuelType}
          onChange={handleFuelTypeChange}
        >
          <option value="all">Wszystkie typy paliwa</option>
          <option value="diesel">Diesel</option>
          <option value="petrol">Benzyna</option>
          <option value="lpg">LPG</option>
        </FilterSelect>
        
        <FilterSelect 
          value={timeRange}
          onChange={handleTimeRangeChange}
        >
          <option value="last7days">Ostatnie 7 dni</option>
          <option value="last30days">Ostatnie 30 dni</option>
          <option value="last90days">Ostatnie 90 dni</option>
          <option value="lastYear">Ostatni rok</option>
        </FilterSelect>
      </TestControls>
      
      <SummarySection>
        <SummaryTitle>Podsumowanie testów ({testResults.length})</SummaryTitle>
        <SummaryStats>
          <StatCard status="pass">
            <StatValue>{passCount}</StatValue>
            <StatLabel>Zgodne z normą</StatLabel>
          </StatCard>
          
          <StatCard status="warning">
            <StatValue>{warningCount}</StatValue>
            <StatLabel>Ostrzeżenia</StatLabel>
          </StatCard>
          
          <StatCard status="fail">
            <StatValue>{failCount}</StatValue>
            <StatLabel>Niezgodne z normą</StatLabel>
          </StatCard>
        </SummaryStats>
      </SummarySection>
      
      <TestGrid>
        {testResults.map(renderTestCard)}
      </TestGrid>
    </Container>
  );
};

export default FuelQualityTest;
