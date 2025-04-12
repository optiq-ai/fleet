import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface TransactionPatternAnalysisProps {
  transactions: any[];
  onAnomalyDetected: (anomalies: any[]) => void;
}

const Container = styled.div`
  padding: 16px;
`;

const PatternGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
`;

const PatternCard = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
`;

const PatternHeader = styled.div<{ anomaly: boolean }>`
  padding: 12px 16px;
  background-color: ${props => props.anomaly ? '#ffebee' : '#e8f5e9'};
  color: ${props => props.anomaly ? '#c62828' : '#2e7d32'};
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PatternBody = styled.div`
  padding: 16px;
`;

const PatternChart = styled.div`
  height: 200px;
  background-color: #f5f5f5;
  border-radius: 4px;
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #9e9e9e;
`;

const PatternDetails = styled.div`
  margin-bottom: 16px;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const DetailLabel = styled.div`
  color: #666;
`;

const DetailValue = styled.div<{ highlight?: boolean }>`
  font-weight: ${props => props.highlight ? '500' : 'normal'};
  color: ${props => props.highlight ? '#c62828' : 'inherit'};
`;

const AnomalyList = styled.div`
  margin-top: 20px;
`;

const AnomalyItem = styled.div`
  padding: 12px;
  background-color: #ffebee;
  border-left: 4px solid #f44336;
  border-radius: 4px;
  margin-bottom: 12px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const AnomalyTitle = styled.div`
  font-weight: 500;
  margin-bottom: 4px;
`;

const AnomalyDescription = styled.div`
  font-size: 14px;
  color: #666;
`;

const Button = styled.button`
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

const TransactionPatternAnalysis: React.FC<TransactionPatternAnalysisProps> = ({ 
  transactions,
  onAnomalyDetected
}) => {
  const [patterns, setPatterns] = useState<any[]>([]);
  const [anomalies, setAnomalies] = useState<any[]>([]);
  
  // Analiza wzorców przy zmianie transakcji
  useEffect(() => {
    // W rzeczywistej aplikacji tutaj byłaby zaawansowana analiza wzorców
    // oparta na algorytmach uczenia maszynowego
    
    // Symulacja analizy wzorców dla celów demonstracyjnych
    const analyzePatterns = () => {
      const driverPatterns = groupTransactionsByDriver();
      const vehiclePatterns = groupTransactionsByVehicle();
      const locationPatterns = groupTransactionsByLocation();
      
      const allPatterns = [
        ...driverPatterns,
        ...vehiclePatterns,
        ...locationPatterns
      ];
      
      setPatterns(allPatterns);
      
      // Wykrywanie anomalii
      const detectedAnomalies = detectAnomalies(allPatterns);
      setAnomalies(detectedAnomalies);
      
      // Powiadomienie o wykrytych anomaliach
      if (detectedAnomalies.length > 0) {
        onAnomalyDetected(detectedAnomalies);
      }
    };
    
    analyzePatterns();
  }, [transactions, onAnomalyDetected]);
  
  // Grupowanie transakcji według kierowcy
  const groupTransactionsByDriver = () => {
    const drivers: { [key: string]: any[] } = {};
    
    transactions.forEach(transaction => {
      if (!drivers[transaction.driver]) {
        drivers[transaction.driver] = [];
      }
      
      drivers[transaction.driver].push(transaction);
    });
    
    return Object.entries(drivers).map(([driver, driverTransactions]) => {
      const totalAmount = driverTransactions.reduce((sum, t) => sum + t.amount, 0);
      const avgAmount = totalAmount / driverTransactions.length;
      const maxAmount = Math.max(...driverTransactions.map(t => t.amount));
      
      // Symulacja wykrywania anomalii
      const hasAnomaly = maxAmount > avgAmount * 2;
      
      return {
        type: 'driver',
        name: driver,
        transactions: driverTransactions,
        stats: {
          count: driverTransactions.length,
          totalAmount,
          avgAmount,
          maxAmount
        },
        hasAnomaly
      };
    });
  };
  
  // Grupowanie transakcji według pojazdu
  const groupTransactionsByVehicle = () => {
    const vehicles: { [key: string]: any[] } = {};
    
    transactions.forEach(transaction => {
      if (!vehicles[transaction.vehicle]) {
        vehicles[transaction.vehicle] = [];
      }
      
      vehicles[transaction.vehicle].push(transaction);
    });
    
    return Object.entries(vehicles).map(([vehicle, vehicleTransactions]) => {
      const totalAmount = vehicleTransactions.reduce((sum, t) => sum + t.amount, 0);
      const avgAmount = totalAmount / vehicleTransactions.length;
      const maxAmount = Math.max(...vehicleTransactions.map(t => t.amount));
      
      // Symulacja wykrywania anomalii
      const hasAnomaly = maxAmount > avgAmount * 1.8;
      
      return {
        type: 'vehicle',
        name: vehicle,
        transactions: vehicleTransactions,
        stats: {
          count: vehicleTransactions.length,
          totalAmount,
          avgAmount,
          maxAmount
        },
        hasAnomaly
      };
    });
  };
  
  // Grupowanie transakcji według lokalizacji
  const groupTransactionsByLocation = () => {
    const locations: { [key: string]: any[] } = {};
    
    transactions.forEach(transaction => {
      if (!locations[transaction.location]) {
        locations[transaction.location] = [];
      }
      
      locations[transaction.location].push(transaction);
    });
    
    return Object.entries(locations).map(([location, locationTransactions]) => {
      const totalAmount = locationTransactions.reduce((sum, t) => sum + t.amount, 0);
      const avgAmount = totalAmount / locationTransactions.length;
      const maxAmount = Math.max(...locationTransactions.map(t => t.amount));
      
      // Symulacja wykrywania anomalii
      const hasAnomaly = locationTransactions.length > 5 && maxAmount > avgAmount * 1.5;
      
      return {
        type: 'location',
        name: location,
        transactions: locationTransactions,
        stats: {
          count: locationTransactions.length,
          totalAmount,
          avgAmount,
          maxAmount
        },
        hasAnomaly
      };
    });
  };
  
  // Wykrywanie anomalii
  const detectAnomalies = (patterns: any[]) => {
    return patterns
      .filter(pattern => pattern.hasAnomaly)
      .map(pattern => {
        let title = '';
        let description = '';
        
        switch (pattern.type) {
          case 'driver':
            title = `Anomalia w transakcjach kierowcy ${pattern.name}`;
            description = `Wykryto nietypowy wzorzec zakupowy. Maksymalna kwota transakcji (${pattern.stats.maxAmount.toFixed(2)}) jest znacznie wyższa niż średnia (${pattern.stats.avgAmount.toFixed(2)}).`;
            break;
          case 'vehicle':
            title = `Anomalia w transakcjach pojazdu ${pattern.name}`;
            description = `Wykryto nietypowy wzorzec zakupowy. Maksymalna kwota transakcji (${pattern.stats.maxAmount.toFixed(2)}) jest znacznie wyższa niż średnia (${pattern.stats.avgAmount.toFixed(2)}).`;
            break;
          case 'location':
            title = `Anomalia w transakcjach w lokalizacji ${pattern.name}`;
            description = `Wykryto nietypowy wzorzec zakupowy. Duża liczba transakcji (${pattern.stats.count}) z maksymalną kwotą (${pattern.stats.maxAmount.toFixed(2)}) znacznie wyższą niż średnia (${pattern.stats.avgAmount.toFixed(2)}).`;
            break;
          default:
            break;
        }
        
        return {
          id: `${pattern.type}-${pattern.name}`,
          title,
          description,
          pattern
        };
      });
  };
  
  // Renderowanie karty wzorca
  const renderPatternCard = (pattern: any) => {
    return (
      <PatternCard key={`${pattern.type}-${pattern.name}`}>
        <PatternHeader anomaly={pattern.hasAnomaly}>
          {pattern.type === 'driver' ? 'Kierowca: ' : 
           pattern.type === 'vehicle' ? 'Pojazd: ' : 
           'Lokalizacja: '}{pattern.name}
          {pattern.hasAnomaly && <span>⚠️ Anomalia</span>}
        </PatternHeader>
        
        <PatternBody>
          <PatternChart>
            [Wykres wzorca transakcji]
          </PatternChart>
          
          <PatternDetails>
            <DetailRow>
              <DetailLabel>Liczba transakcji:</DetailLabel>
              <DetailValue>{pattern.stats.count}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>Suma transakcji:</DetailLabel>
              <DetailValue>{pattern.stats.totalAmount.toFixed(2)}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>Średnia kwota:</DetailLabel>
              <DetailValue>{pattern.stats.avgAmount.toFixed(2)}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>Maksymalna kwota:</DetailLabel>
              <DetailValue highlight={pattern.hasAnomaly}>
                {pattern.stats.maxAmount.toFixed(2)}
              </DetailValue>
            </DetailRow>
          </PatternDetails>
          
          <Button>Szczegóły</Button>
        </PatternBody>
      </PatternCard>
    );
  };
  
  return (
    <Container>
      <PatternGrid>
        {patterns.map(renderPatternCard)}
      </PatternGrid>
      
      {anomalies.length > 0 && (
        <AnomalyList>
          <h3>Wykryte anomalie ({anomalies.length})</h3>
          
          {anomalies.map(anomaly => (
            <AnomalyItem key={anomaly.id}>
              <AnomalyTitle>{anomaly.title}</AnomalyTitle>
              <AnomalyDescription>{anomaly.description}</AnomalyDescription>
            </AnomalyItem>
          ))}
        </AnomalyList>
      )}
    </Container>
  );
};

export default TransactionPatternAnalysis;
