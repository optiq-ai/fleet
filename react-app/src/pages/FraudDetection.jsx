import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Card from '../components/common/Card';
import mockFraudDetectionService from '../services/api/mockFraudDetectionService';

// Nowe importy dla ulepszonych funkcji wykrywania oszustw
import BiometricAuthModal from '../components/fraud/BiometricAuthModal';
import CardPresenceVerification from '../components/fraud/CardPresenceVerification';
import BlockchainLedger from '../components/fraud/BlockchainLedger';
import MultiFactorAuth from '../components/fraud/MultiFactorAuth';
import SuspiciousTransactionsMap from '../components/fraud/SuspiciousTransactionsMap';

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

// Usunięto nieużywany komponent MapOverlay

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
        const alertsResponse = await mockFraudDetectionService.getFraudAlerts();
        setAlerts(alertsResponse.alerts);
        
        // Pobieranie transakcji
        const transactionsResponse = await mockFraudDetectionService.getFraudTransactions({
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
      
      const result = await mockFraudDetectionService.verifyCardPresence(transactionId);
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
    if (isLoading) {
      return <div>Ładowanie alertów...</div>;
    }
    
    if (!alerts || alerts.length === 0) {
      return <div>Brak alertów do wyświetlenia.</div>;
    }
    
    return (
      <AlertsContainer>
        {alerts.map(alert => (
          <AlertItem key={alert.id} priority={alert.priority}>
            <AlertTitle>{alert.title}</AlertTitle>
            <AlertDetails>{alert.details}</AlertDetails>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              marginTop: '8px',
              fontSize: '12px',
              color: '#666'
            }}>
              <div>Data: {alert.date}</div>
              <div>Pojazd: {alert.vehicle}</div>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: '8px'
            }}>
              <ActionButton onClick={() => handleAlertAction(alert.id, 'investigate')}>
                Zbadaj
              </ActionButton>
              <ActionButton onClick={() => handleAlertAction(alert.id, 'resolve')}>
                Rozwiąż
              </ActionButton>
              <ActionButton onClick={() => handleAlertAction(alert.id, 'dismiss')}>
                Odrzuć
              </ActionButton>
            </div>
          </AlertItem>
        ))}
      </AlertsContainer>
    );
  };
  
  // Obsługa akcji alertów
  const handleAlertAction = (alertId, action) => {
    // W rzeczywistej aplikacji tutaj byłoby wywołanie API
    console.log(`Alert ${alertId} action: ${action}`);
    
    // Aktualizacja statusu alertu w stanie lokalnym
    const updatedAlerts = alerts.map(alert => {
      if (alert.id === alertId) {
        let newStatus;
        switch (action) {
          case 'investigate':
            newStatus = 'investigating';
            break;
          case 'resolve':
            newStatus = 'resolved';
            break;
          case 'dismiss':
            newStatus = 'dismissed';
            break;
          default:
            newStatus = alert.status;
        }
        
        return { ...alert, status: newStatus };
      }
      return alert;
    });
    
    setAlerts(updatedAlerts);
  };
  
  // Renderowanie transakcji
  const renderTransactions = () => {
    if (isLoading) {
      return <div>Ładowanie transakcji...</div>;
    }
    
    if (!transactions || transactions.length === 0) {
      return <div>Brak transakcji do wyświetlenia.</div>;
    }
    
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
            <th>Anomalie</th>
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
                {transaction.anomalies && transaction.anomalies.length > 0 ? (
                  <div style={{ color: '#f44336', fontSize: '12px' }}>
                    {transaction.anomalies.map(anomaly => {
                      let anomalyText = '';
                      switch(anomaly) {
                        case 'excessive_quantity':
                          anomalyText = 'Nadmierna ilość';
                          break;
                        case 'price_deviation':
                          anomalyText = 'Odchylenie cenowe';
                          break;
                        case 'location_deviation':
                          anomalyText = 'Poza trasą';
                          break;
                        case 'multiple_transactions':
                          anomalyText = 'Wielokrotne tankowania';
                          break;
                        case 'off_hours':
                          anomalyText = 'Poza godzinami';
                          break;
                        case 'fuel_type_mismatch':
                          anomalyText = 'Niezgodny typ paliwa';
                          break;
                        case 'odometer_manipulation':
                          anomalyText = 'Manipulacja przebiegiem';
                          break;
                        case 'consumption_increase':
                          anomalyText = 'Wzrost zużycia';
                          break;
                        default:
                          anomalyText = anomaly;
                      }
                      return <div key={anomaly}>{anomalyText}</div>;
                    })}
                  </div>
                ) : (
                  <span style={{ color: '#4caf50' }}>Brak</span>
                )}
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
  
  // Stan dla danych analizy wzorców
  const [patternData, setPatternData] = useState(null);
  const [isLoadingPatterns, setIsLoadingPatterns] = useState(false);
  
  // Pobieranie danych analizy wzorców
  useEffect(() => {
    const fetchPatternData = async () => {
      if (activeTab === 'patterns') {
        setIsLoadingPatterns(true);
        try {
          const data = await mockFraudDetectionService.getTransactionPatterns();
          setPatternData(data);
        } catch (error) {
          console.error('Error fetching pattern data:', error);
        } finally {
          setIsLoadingPatterns(false);
        }
      }
    };
    
    fetchPatternData();
  }, [activeTab]);
  
  // Renderowanie analizy wzorców
  const renderPatternAnalysis = () => {
    if (isLoading || isLoadingPatterns) {
      return <div>Ładowanie danych analizy wzorców...</div>;
    }
    
    if (!transactions || transactions.length === 0) {
      return <div>Brak danych do analizy wzorców.</div>;
    }
    
    if (!patternData) {
      return <div>Ładowanie analizy wzorców...</div>;
    }
    
    return (
      <div>
        <div style={{ marginBottom: '20px' }}>
          <h3>Wynik analizy ryzyka</h3>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: '16px' 
          }}>
            <div style={{ 
              width: '80px', 
              height: '80px', 
              borderRadius: '50%', 
              backgroundColor: patternData.riskScores.overall > 70 ? '#f44336' : 
                              patternData.riskScores.overall > 50 ? '#ff9800' : '#4caf50',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '24px',
              fontWeight: 'bold',
              marginRight: '20px'
            }}>
              {patternData.riskScores.overall}
            </div>
            <div>
              <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                Ogólny wskaźnik ryzyka: {patternData.riskScores.overall}/100
              </div>
              <div>
                {patternData.riskScores.overall > 70 ? 'Wysokie ryzyko oszustwa' : 
                 patternData.riskScores.overall > 50 ? 'Średnie ryzyko oszustwa' : 
                 'Niskie ryzyko oszustwa'}
              </div>
            </div>
          </div>
          
          <h4>Wskaźniki ryzyka według kategorii</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
            {patternData.riskScores.byCategory.map((category, index) => (
              <div key={index} style={{ 
                padding: '12px', 
                borderRadius: '4px', 
                backgroundColor: '#f5f5f5',
                minWidth: '150px'
              }}>
                <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>{category.category}</div>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center' 
                }}>
                  <div style={{ 
                    width: '100%', 
                    height: '8px', 
                    backgroundColor: '#e0e0e0',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    marginRight: '8px'
                  }}>
                    <div style={{ 
                      width: `${category.score}%`, 
                      height: '100%', 
                      backgroundColor: category.color
                    }} />
                  </div>
                  <div>{category.score}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <h3>Wykryte wzorce</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
            {[...patternData.timePatterns, ...patternData.locationPatterns, ...patternData.amountPatterns].map((pattern, index) => (
              <div key={index} style={{ 
                border: '1px solid #e0e0e0', 
                borderRadius: '8px',
                overflow: 'hidden'
              }}>
                <div style={{ 
                  padding: '12px 16px',
                  backgroundColor: pattern.riskLevel === 'high' ? '#ffebee' : 
                                  pattern.riskLevel === 'medium' ? '#fff8e1' : '#e8f5e9',
                  color: pattern.riskLevel === 'high' ? '#c62828' : 
                         pattern.riskLevel === 'medium' ? '#f57f17' : '#2e7d32',
                  fontWeight: '500'
                }}>
                  {pattern.title}
                </div>
                <div style={{ padding: '16px' }}>
                  <div style={{ marginBottom: '12px' }}>{pattern.description}</div>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    marginBottom: '12px',
                    fontSize: '14px',
                    color: '#666'
                  }}>
                    <div>Wystąpienia: {pattern.count}</div>
                    <div>Procent: {pattern.percentage}%</div>
                  </div>
                  <div style={{ 
                    height: '100px', 
                    backgroundColor: '#f5f5f5',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: '8px',
                    marginBottom: '12px'
                  }}>
                    {pattern.chart.data.map((value, i) => (
                      <div key={i} style={{ 
                        height: `${(value / Math.max(...pattern.chart.data)) * 80}%`,
                        width: `${100 / pattern.chart.data.length}%`,
                        backgroundColor: pattern.chart.colors[i] || '#3f51b5',
                        margin: '0 2px',
                        borderTopLeftRadius: '2px',
                        borderTopRightRadius: '2px',
                        position: 'relative'
                      }}>
                        <div style={{ 
                          position: 'absolute',
                          top: '-20px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          fontSize: '10px'
                        }}>
                          {value}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    fontSize: '10px',
                    color: '#666',
                    marginBottom: '12px'
                  }}>
                    {pattern.chart.labels.map((label, i) => (
                      <div key={i}>{label}</div>
                    ))}
                  </div>
                  <button style={{ 
                    padding: '8px 16px',
                    backgroundColor: '#3f51b5',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}>
                    Szczegóły
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3>Kierowcy wysokiego ryzyka</h3>
          <div style={{ marginBottom: '20px' }}>
            {patternData.driverPatterns.map((pattern, index) => (
              <div key={index} style={{ 
                border: '1px solid #e0e0e0', 
                borderRadius: '8px',
                overflow: 'hidden',
                marginBottom: '16px'
              }}>
                <div style={{ 
                  padding: '12px 16px',
                  backgroundColor: pattern.riskLevel === 'high' ? '#ffebee' : 
                                  pattern.riskLevel === 'medium' ? '#fff8e1' : '#e8f5e9',
                  color: pattern.riskLevel === 'high' ? '#c62828' : 
                         pattern.riskLevel === 'medium' ? '#f57f17' : '#2e7d32',
                  fontWeight: '500'
                }}>
                  {pattern.title}
                </div>
                <div style={{ padding: '16px' }}>
                  <div style={{ marginBottom: '12px' }}>{pattern.description}</div>
                  <div style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap',
                    gap: '8px',
                    marginBottom: '12px'
                  }}>
                    {pattern.drivers.map((driver, i) => (
                      <div key={i} style={{ 
                        padding: '4px 8px',
                        backgroundColor: '#f5f5f5',
                        borderRadius: '4px',
                        fontSize: '14px'
                      }}>
                        {driver}
                      </div>
                    ))}
                  </div>
                  <div style={{ 
                    height: '100px', 
                    backgroundColor: '#f5f5f5',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: '8px',
                    marginBottom: '12px'
                  }}>
                    {pattern.chart.data.map((value, i) => (
                      <div key={i} style={{ 
                        height: `${(value / Math.max(...pattern.chart.data)) * 80}%`,
                        width: `${100 / pattern.chart.data.length}%`,
                        backgroundColor: pattern.chart.colors[i] || '#3f51b5',
                        margin: '0 2px',
                        borderTopLeftRadius: '2px',
                        borderTopRightRadius: '2px',
                        position: 'relative'
                      }}>
                        <div style={{ 
                          position: 'absolute',
                          top: '-20px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          fontSize: '10px'
                        }}>
                          {value}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    fontSize: '10px',
                    color: '#666',
                    marginBottom: '12px'
                  }}>
                    {pattern.chart.labels.map((label, i) => (
                      <div key={i}>{label}</div>
                    ))}
                  </div>
                  <button style={{ 
                    padding: '8px 16px',
                    backgroundColor: '#3f51b5',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}>
                    Szczegóły
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
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
  
  // Stan dla danych testów jakości paliwa
  const [fuelTestsData, setFuelTestsData] = useState(null);
  const [isLoadingFuelTests, setIsLoadingFuelTests] = useState(false);
  
  // Pobieranie danych testów jakości paliwa
  useEffect(() => {
    const fetchFuelTestsData = async () => {
      if (activeTab === 'fuelTests') {
        setIsLoadingFuelTests(true);
        try {
          const data = await mockFraudDetectionService.getFuelQualityTests();
          setFuelTestsData(data);
        } catch (error) {
          console.error('Error fetching fuel quality tests data:', error);
        } finally {
          setIsLoadingFuelTests(false);
        }
      }
    };
    
    fetchFuelTestsData();
  }, [activeTab]);
  
  // Renderowanie testów jakości paliwa
  const renderFuelQualityTests = () => {
    if (isLoading || isLoadingFuelTests) {
      return <div>Ładowanie danych testów jakości paliwa...</div>;
    }
    
    if (!transactions || transactions.length === 0) {
      return <div>Brak danych do testów jakości paliwa.</div>;
    }
    
    if (!fuelTestsData) {
      return <div>Ładowanie testów jakości paliwa...</div>;
    }
    
    return (
      <div>
        <div style={{ marginBottom: '20px' }}>
          <h3>Podsumowanie testów jakości paliwa</h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '16px',
            marginBottom: '20px'
          }}>
            <div style={{ 
              padding: '16px', 
              backgroundColor: '#e8f5e9', 
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '4px' }}>
                {fuelTestsData.tests.filter(test => test.result === 'passed').length}
              </div>
              <div>Testy zaliczone</div>
            </div>
            <div style={{ 
              padding: '16px', 
              backgroundColor: '#fff8e1', 
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '4px' }}>
                {fuelTestsData.tests.filter(test => test.result === 'suspicious').length}
              </div>
              <div>Testy podejrzane</div>
            </div>
            <div style={{ 
              padding: '16px', 
              backgroundColor: '#ffebee', 
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '4px' }}>
                {fuelTestsData.tests.filter(test => test.result === 'failed').length}
              </div>
              <div>Testy niezaliczone</div>
            </div>
          </div>
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <h3>Wyniki testów</h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
            gap: '16px'
          }}>
            {fuelTestsData.tests.map(test => (
              <div key={test.id} style={{ 
                border: '1px solid #e0e0e0', 
                borderRadius: '8px',
                overflow: 'hidden'
              }}>
                <div style={{ 
                  padding: '12px 16px',
                  backgroundColor: test.result === 'passed' ? '#e8f5e9' : 
                                  test.result === 'suspicious' ? '#fff8e1' : '#ffebee',
                  color: test.result === 'passed' ? '#2e7d32' : 
                         test.result === 'suspicious' ? '#f57f17' : '#c62828',
                  fontWeight: '500',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>Test #{test.id} - {test.fuelType}</div>
                  <div>
                    {test.result === 'passed' && '✓ Zgodne'}
                    {test.result === 'suspicious' && '⚠️ Podejrzane'}
                    {test.result === 'failed' && '✗ Niezgodne'}
                  </div>
                </div>
                <div style={{ padding: '16px' }}>
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', marginBottom: '8px' }}>
                      <div style={{ width: '120px', fontWeight: '500' }}>Data:</div>
                      <div>{test.date}</div>
                    </div>
                    <div style={{ display: 'flex', marginBottom: '8px' }}>
                      <div style={{ width: '120px', fontWeight: '500' }}>Lokalizacja:</div>
                      <div>{test.location}</div>
                    </div>
                    <div style={{ display: 'flex', marginBottom: '8px' }}>
                      <div style={{ width: '120px', fontWeight: '500' }}>Pojazd:</div>
                      <div>{test.vehicle}</div>
                    </div>
                  </div>
                  
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ fontWeight: '500', marginBottom: '8px' }}>Wyniki parametrów:</div>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                      <thead>
                        <tr>
                          <th style={{ 
                            padding: '8px', 
                            textAlign: 'left', 
                            borderBottom: '1px solid #e0e0e0',
                            backgroundColor: '#f5f5f5'
                          }}>
                            Parametr
                          </th>
                          <th style={{ 
                            padding: '8px', 
                            textAlign: 'left', 
                            borderBottom: '1px solid #e0e0e0',
                            backgroundColor: '#f5f5f5'
                          }}>
                            Wartość
                          </th>
                          <th style={{ 
                            padding: '8px', 
                            textAlign: 'left', 
                            borderBottom: '1px solid #e0e0e0',
                            backgroundColor: '#f5f5f5'
                          }}>
                            Norma
                          </th>
                          <th style={{ 
                            padding: '8px', 
                            textAlign: 'left', 
                            borderBottom: '1px solid #e0e0e0',
                            backgroundColor: '#f5f5f5'
                          }}>
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(test.parameters).map(([key, param]) => {
                          if (key === 'additives') return null;
                          
                          let paramName = '';
                          let normText = '';
                          
                          switch(key) {
                            case 'cetaneNumber':
                              paramName = 'Liczba cetanowa';
                              normText = `min ${param.min}`;
                              break;
                            case 'octaneNumber':
                              paramName = 'Liczba oktanowa';
                              normText = `min ${param.min}`;
                              break;
                            case 'density':
                              paramName = 'Gęstość';
                              normText = `${param.min} - ${param.max} ${param.unit}`;
                              break;
                            case 'waterContent':
                              paramName = 'Zawartość wody';
                              normText = `max ${param.max} ${param.unit}`;
                              break;
                            case 'sulfurContent':
                              paramName = 'Zawartość siarki';
                              normText = `max ${param.max} ${param.unit}`;
                              break;
                            case 'particulates':
                              paramName = 'Cząstki stałe';
                              normText = `max ${param.max} ${param.unit}`;
                              break;
                            case 'oxygenates':
                              paramName = 'Związki tlenowe';
                              normText = `max ${param.max} ${param.unit}`;
                              break;
                            case 'aromatics':
                              paramName = 'Węglowodory aromatyczne';
                              normText = `max ${param.max} ${param.unit}`;
                              break;
                            default:
                              paramName = key;
                              normText = param.min && param.max ? `${param.min} - ${param.max}` : 
                                        param.min ? `min ${param.min}` : 
                                        param.max ? `max ${param.max}` : '';
                          }
                          
                          return (
                            <tr key={key}>
                              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>
                                {paramName}
                              </td>
                              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>
                                {typeof param.value === 'number' ? param.value.toFixed(3) : param.value} {param.unit}
                              </td>
                              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>
                                {normText}
                              </td>
                              <td style={{ 
                                padding: '8px', 
                                borderBottom: '1px solid #e0e0e0',
                                color: param.status === 'ok' ? '#2e7d32' : 
                                      param.status === 'warning' ? '#f57f17' : '#c62828',
                                fontWeight: param.status !== 'ok' ? '500' : 'normal'
                              }}>
                                {param.status === 'ok' ? 'OK' : 
                                 param.status === 'warning' ? 'Ostrzeżenie' : 
                                 'Niezgodne'}
                              </td>
                            </tr>
                          );
                        })}
                        {test.parameters.additives && (
                          <tr>
                            <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>
                              Dodatki
                            </td>
                            <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>
                              {test.parameters.additives.value}
                            </td>
                            <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>
                              -
                            </td>
                            <td style={{ 
                              padding: '8px', 
                              borderBottom: '1px solid #e0e0e0',
                              color: '#f57f17',
                              fontWeight: '500'
                            }}>
                              Podejrzane
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ fontWeight: '500', marginBottom: '8px' }}>Historia testów:</div>
                    <div style={{ 
                      display: 'flex', 
                      gap: '8px',
                      overflowX: 'auto',
                      paddingBottom: '8px'
                    }}>
                      {test.history.map((historyItem, index) => (
                        <div key={index} style={{ 
                          padding: '8px', 
                          borderRadius: '4px',
                          backgroundColor: historyItem.result === 'passed' ? '#e8f5e9' : 
                                          historyItem.result === 'suspicious' ? '#fff8e1' : '#ffebee',
                          minWidth: '120px',
                          fontSize: '12px'
                        }}>
                          <div style={{ fontWeight: '500', marginBottom: '4px' }}>{historyItem.date}</div>
                          <div style={{ marginBottom: '4px' }}>{historyItem.location}</div>
                          <div style={{ 
                            color: historyItem.result === 'passed' ? '#2e7d32' : 
                                  historyItem.result === 'suspicious' ? '#f57f17' : '#c62828'
                          }}>
                            {historyItem.result === 'passed' ? 'Zaliczony' : 
                             historyItem.result === 'suspicious' ? 'Podejrzany' : 
                             'Niezaliczony'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button style={{ 
                      padding: '8px 16px',
                      backgroundColor: '#3f51b5',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}>
                      Szczegóły
                    </button>
                    <button style={{ 
                      padding: '8px 16px',
                      backgroundColor: 'white',
                      color: '#3f51b5',
                      border: '1px solid #3f51b5',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}>
                      Eksportuj raport
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
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
            <SuspiciousTransactionsMap 
              transactions={transactions}
              onMarkerClick={(transaction) => {
                setSelectedTransaction(transaction);
                handleCardVerification(transaction.id);
              }}
            />
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
