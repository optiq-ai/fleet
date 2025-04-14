import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Card from '../components/common/Card';
import fraudDetectionService from '../services/api/fraudDetectionService';

// Nowe importy dla ulepszonych funkcji wykrywania oszustw
import BiometricAuthModal from '../components/fraud/BiometricAuthModal';
import TransactionPatternAnalysis from '../components/fraud/TransactionPatternAnalysis';
import CardPresenceVerification from '../components/fraud/CardPresenceVerification';
import BlockchainLedger from '../components/fraud/BlockchainLedger';
import FuelQualityTest from '../components/fraud/FuelQualityTest';
import MultiFactorAuth from '../components/fraud/MultiFactorAuth';

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

const GridSection = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 20px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const FilterSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 20px;
  padding: 16px;
  background-color: #f5f5f5;
  border-radius: 8px;
`;

const FilterLabel = styled.div`
  font-weight: 500;
  margin-right: 8px;
  display: flex;
  align-items: center;
`;

const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FilterSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
`;

const FilterInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const FilterButton = styled.button`
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

const MapContainer = styled.div`
  height: 400px;
  background-color: #e9e9e9;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
`;

const MapOverlay = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 12px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const AlertsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const AlertItem = styled.div`
  padding: 12px;
  border-radius: 4px;
  background-color: ${props => 
    props.priority === 'high' ? '#ffebee' : 
    props.priority === 'medium' ? '#fff8e1' : 
    '#e8f5e9'
  };
  border-left: 4px solid ${props => 
    props.priority === 'high' ? '#f44336' : 
    props.priority === 'medium' ? '#ffc107' : 
    '#4caf50'
  };
`;

const AlertTitle = styled.div`
  font-weight: 500;
  margin-bottom: 4px;
`;

const AlertDetails = styled.div`
  font-size: 14px;
  color: #666;
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 20px;
`;

const Tab = styled.div`
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

const TransactionsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 12px 16px;
    text-align: left;
    border-bottom: 1px solid #e0e0e0;
  }
  
  th {
    background-color: #f5f5f5;
    font-weight: 500;
  }
  
  tr:hover {
    background-color: #f9f9f9;
  }
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background-color: ${props => 
    props.status === 'suspicious' ? '#ffebee' : 
    props.status === 'verified' ? '#e8f5e9' : 
    '#fff8e1'
  };
  color: ${props => 
    props.status === 'suspicious' ? '#c62828' : 
    props.status === 'verified' ? '#2e7d32' : 
    '#f57f17'
  };
`;

const ActionButton = styled.button`
  padding: 4px 8px;
  background-color: transparent;
  color: #3f51b5;
  border: 1px solid #3f51b5;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  margin-right: 8px;
  
  &:hover {
    background-color: #e8eaf6;
  }
`;

// Nowe style dla ulepszonych funkcji wykrywania oszustw
const EnhancedFeaturesContainer = styled.div`
  margin-top: 20px;
`;

const FeatureCard = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
`;

const FeatureHeader = styled.div`
  padding: 16px;
  background-color: #3f51b5;
  color: white;
  font-weight: 500;
`;

const FeatureBody = styled.div`
  padding: 16px;
`;

const FeatureDescription = styled.p`
  margin-bottom: 16px;
  color: #666;
`;

const FeatureButton = styled.button`
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

/**
 * FraudDetection component for fraud detection and analysis
 * @returns {JSX.Element} FraudDetection component
 */
const FraudDetection = () => {
  // Stan dla filtrów
  const [dateRange, setDateRange] = useState('last7days');
  const [transactionType, setTransactionType] = useState('all');
  const [locationFilter, setLocationFilter] = useState('');
  const [amountMin, setAmountMin] = useState('');
  const [amountMax, setAmountMax] = useState('');
  
  // Stan dla alertów i transakcji
  const [alerts, setAlerts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  
  // Stan dla aktywnej zakładki
  const [activeTab, setActiveTab] = useState('transactions');
  
  // Stan dla ładowania
  const [isLoading, setIsLoading] = useState(true);
  
  // Nowe stany dla ulepszonych funkcji wykrywania oszustw
  const [showBiometricModal, setShowBiometricModal] = useState(false);
  const [showMultiFactorAuth, setShowMultiFactorAuth] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [verificationResults, setVerificationResults] = useState(null);
  
  // Pobieranie danych przy montowaniu komponentu
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      try {
        // Pobieranie alertów
        const alertsResponse = await fraudDetectionService.getFraudAlerts();
        setAlerts(alertsResponse.alerts);
        
        // Pobieranie transakcji
        const transactionsResponse = await fraudDetectionService.getFraudTransactions({
          dateRange,
          transactionType,
          location: locationFilter,
          amountMin: amountMin ? parseFloat(amountMin) : undefined,
          amountMax: amountMax ? parseFloat(amountMax) : undefined
        });
        setTransactions(transactionsResponse.transactions);
      } catch (error) {
        console.error('Error fetching fraud detection data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [dateRange, transactionType, locationFilter, amountMin, amountMax]);
  
  // Obsługa zmiany filtrów
  const handleFilterChange = () => {
    // Filtrowanie jest obsługiwane przez useEffect
  };
  
  // Obsługa weryfikacji karty
  const handleCardVerification = async (transactionId) => {
    try {
      const transaction = transactions.find(t => t.id === transactionId);
      setSelectedTransaction(transaction);
      
      const result = await fraudDetectionService.verifyCardPresence(transactionId);
      setVerificationResults(result);
    } catch (error) {
      console.error('Error verifying card presence:', error);
    }
  };
  
  // Obsługa uwierzytelniania biometrycznego
  const handleBiometricAuth = (transactionId) => {
    const transaction = transactions.find(t => t.id === transactionId);
    setSelectedTransaction(transaction);
    setShowBiometricModal(true);
  };
  
  // Obsługa wieloczynnikowego uwierzytelniania
  const handleMultiFactorAuth = (transactionId) => {
    const transaction = transactions.find(t => t.id === transactionId);
    setSelectedTransaction(transaction);
    setShowMultiFactorAuth(true);
  };
  
  // Renderowanie alertów
  const renderAlerts = () => {
    return (
      <AlertsContainer>
        {alerts.map(alert => (
          <AlertItem key={alert.id} priority={alert.priority}>
            <AlertTitle>{alert.title}</AlertTitle>
            <AlertDetails>{alert.details}</AlertDetails>
          </AlertItem>
        ))}
      </AlertsContainer>
    );
  };
  
  // Renderowanie transakcji
  const renderTransactions = () => {
    return (
      <TransactionsTable>
        <thead>
          <tr>
            <th>Data</th>
            <th>Kierowca</th>
            <th>Pojazd</th>
            <th>Lokalizacja</th>
            <th>Kwota</th>
            <th>Status</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.date}</td>
              <td>{transaction.driver}</td>
              <td>{transaction.vehicle}</td>
              <td>{transaction.location}</td>
              <td>{transaction.amount.toFixed(2)} {transaction.currency}</td>
              <td>
                <StatusBadge status={transaction.status}>
                  {transaction.status === 'suspicious' ? 'Podejrzana' : 
                   transaction.status === 'verified' ? 'Zweryfikowana' : 
                   'Oznaczona'}
                </StatusBadge>
              </td>
              <td>
                <ActionButton onClick={() => handleCardVerification(transaction.id)}>
                  Weryfikuj kartę
                </ActionButton>
                <ActionButton onClick={() => handleBiometricAuth(transaction.id)}>
                  Biometria
                </ActionButton>
                <ActionButton onClick={() => handleMultiFactorAuth(transaction.id)}>
                  MFA
                </ActionButton>
              </td>
            </tr>
          ))}
        </tbody>
      </TransactionsTable>
    );
  };
  
  // Renderowanie analizy wzorców
  const renderPatternAnalysis = () => {
    return (
      <TransactionPatternAnalysis 
        transactions={transactions} 
        onAnomalyDetected={(anomalies) => console.log('Anomalies detected:', anomalies)} 
      />
    );
  };
  
  // Renderowanie rejestru blockchain
  const renderBlockchainLedger = () => {
    return (
      <BlockchainLedger 
        transactions={transactions} 
        onLedgerVerified={(verified) => console.log('Ledger verified:', verified)} 
      />
    );
  };
  
  // Renderowanie testów jakości paliwa
  const renderFuelQualityTests = () => {
    return (
      <FuelQualityTest 
        transactions={transactions} 
        onTestResults={(results) => console.log('Fuel quality test results:', results)} 
      />
    );
  };
  
  return (
    <PageContainer>
      <SectionTitle>WYKRYWANIE OSZUSTW</SectionTitle>
      
      <FilterSection>
        <FilterGroup>
          <FilterLabel>Okres:</FilterLabel>
          <FilterSelect 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="today">Dzisiaj</option>
            <option value="yesterday">Wczoraj</option>
            <option value="last7days">Ostatnie 7 dni</option>
            <option value="last30days">Ostatnie 30 dni</option>
            <option value="custom">Niestandardowy</option>
          </FilterSelect>
        </FilterGroup>
        
        <FilterGroup>
          <FilterLabel>Typ transakcji:</FilterLabel>
          <FilterSelect 
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
          >
            <option value="all">Wszystkie</option>
            <option value="fuel">Paliwo</option>
            <option value="service">Serwis</option>
            <option value="toll">Opłaty drogowe</option>
            <option value="other">Inne</option>
          </FilterSelect>
        </FilterGroup>
        
        <FilterGroup>
          <FilterLabel>Lokalizacja:</FilterLabel>
          <FilterInput 
            type="text" 
            placeholder="Miasto, kraj..." 
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          />
        </FilterGroup>
        
        <FilterGroup>
          <FilterLabel>Kwota:</FilterLabel>
          <FilterInput 
            type="number" 
            placeholder="Min" 
            value={amountMin}
            onChange={(e) => setAmountMin(e.target.value)}
          />
          <span>-</span>
          <FilterInput 
            type="number" 
            placeholder="Max" 
            value={amountMax}
            onChange={(e) => setAmountMax(e.target.value)}
          />
        </FilterGroup>
        
        <FilterButton onClick={handleFilterChange}>
          Filtruj
        </FilterButton>
      </FilterSection>
      
      <GridSection>
        <Card title="Mapa podejrzanych transakcji">
          <MapContainer>
            {/* Tutaj będzie mapa z Google Maps lub innej biblioteki */}
            <MapOverlay>
              <div>Podejrzane transakcje: {transactions.filter(t => t.status === 'suspicious').length}</div>
              <div>Zweryfikowane transakcje: {transactions.filter(t => t.status === 'verified').length}</div>
            </MapOverlay>
          </MapContainer>
        </Card>
        
        <Card title="Alerty oszustw">
          {renderAlerts()}
        </Card>
      </GridSection>
      
      <Card title="Analiza transakcji" fullWidth>
        <TabsContainer>
          <Tab 
            active={activeTab === 'transactions'} 
            onClick={() => setActiveTab('transactions')}
          >
            Transakcje
          </Tab>
          <Tab 
            active={activeTab === 'patterns'} 
            onClick={() => setActiveTab('patterns')}
          >
            Analiza wzorców
          </Tab>
          <Tab 
            active={activeTab === 'blockchain'} 
            onClick={() => setActiveTab('blockchain')}
          >
            Rejestr blockchain
          </Tab>
          <Tab 
            active={activeTab === 'fuelquality'} 
            onClick={() => setActiveTab('fuelquality')}
          >
            Testy jakości paliwa
          </Tab>
        </TabsContainer>
        
        {activeTab === 'transactions' && renderTransactions()}
        {activeTab === 'patterns' && renderPatternAnalysis()}
        {activeTab === 'blockchain' && renderBlockchainLedger()}
        {activeTab === 'fuelquality' && renderFuelQualityTests()}
      </Card>
      
      <EnhancedFeaturesContainer>
        <SectionTitle>ULEPSZONE FUNKCJE WYKRYWANIA OSZUSTW</SectionTitle>
        
        <GridSection>
          <FeatureCard>
            <FeatureHeader>Weryfikacja obecności karty</FeatureHeader>
            <FeatureBody>
              <FeatureDescription>
                Walidacja, że karta paliwowa i pojazd znajdują się w tej samej lokalizacji w momencie zakupu.
                System wykorzystuje dane GPS pojazdu i lokalizację terminala płatniczego do weryfikacji.
              </FeatureDescription>
              <FeatureButton onClick={() => handleCardVerification(transactions[0]?.id)}>
                Testuj weryfikację
              </FeatureButton>
            </FeatureBody>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureHeader>Uwierzytelnianie biometryczne</FeatureHeader>
            <FeatureBody>
              <FeatureDescription>
                Bezpieczna identyfikacja kierowcy za pomocą danych biometrycznych, takich jak odcisk palca,
                rozpoznawanie twarzy lub skanowanie tęczówki.
              </FeatureDescription>
              <FeatureButton onClick={() => setShowBiometricModal(true)}>
                Testuj biometrię
              </FeatureButton>
            </FeatureBody>
          </FeatureCard>
        </GridSection>
      </EnhancedFeaturesContainer>
      
      {/* Modalne okna dla ulepszonych funkcji */}
      {showBiometricModal && (
        <BiometricAuthModal 
          transaction={selectedTransaction}
          onClose={() => setShowBiometricModal(false)}
          onAuthenticate={(result) => {
            console.log('Biometric auth result:', result);
            setShowBiometricModal(false);
          }}
        />
      )}
      
      {showMultiFactorAuth && (
        <MultiFactorAuth 
          transaction={selectedTransaction}
          onClose={() => setShowMultiFactorAuth(false)}
          onAuthenticate={(result) => {
            console.log('MFA result:', result);
            setShowMultiFactorAuth(false);
          }}
        />
      )}
      
      {verificationResults && (
        <CardPresenceVerification 
          results={verificationResults}
          onClose={() => setVerificationResults(null)}
        />
      )}
    </PageContainer>
  );
};

export default FraudDetection;
