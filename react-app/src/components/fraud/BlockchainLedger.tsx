import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface BlockchainLedgerProps {
  transactions: any[];
  onLedgerVerified: (verified: boolean) => void;
}

const Container = styled.div`
  padding: 16px;
`;

const LedgerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const LedgerTitle = styled.h3`
  margin: 0;
`;

const LedgerStatus = styled.div<{ verified: boolean }>`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background-color: ${props => props.verified ? '#e8f5e9' : '#ffebee'};
  color: ${props => props.verified ? '#2e7d32' : '#c62828'};
  border-radius: 4px;
  font-weight: 500;
  font-size: 14px;
`;

const StatusIcon = styled.span`
  margin-right: 8px;
`;

const LedgerControls = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
`;

const Button = styled.button<{ primary?: boolean }>`
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

const SearchInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  flex-grow: 1;
`;

const LedgerTable = styled.table`
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

const HashCell = styled.td`
  font-family: monospace;
  font-size: 12px;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StatusCell = styled.td<{ verified: boolean }>`
  color: ${props => props.verified ? '#2e7d32' : '#c62828'};
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

const BlockchainInfo = styled.div`
  margin-top: 20px;
  padding: 16px;
  background-color: #f5f5f5;
  border-radius: 8px;
`;

const InfoTitle = styled.h4`
  margin-top: 0;
  margin-bottom: 12px;
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
  width: 180px;
  flex-shrink: 0;
`;

const InfoValue = styled.div`
  color: #666;
  font-family: monospace;
`;

const BlockchainLedger: React.FC<BlockchainLedgerProps> = ({ 
  transactions,
  onLedgerVerified
}) => {
  const [ledgerEntries, setLedgerEntries] = useState<any[]>([]);
  const [isVerified, setIsVerified] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [blockchainStats, setBlockchainStats] = useState<any>({
    lastBlockHeight: 0,
    lastBlockHash: '',
    totalTransactions: 0,
    networkNodes: 0,
    lastVerification: ''
  });
  
  // Generowanie wpisów rejestru przy zmianie transakcji
  useEffect(() => {
    // W rzeczywistej aplikacji tutaj byłoby pobieranie danych z blockchaina
    
    // Symulacja wpisów rejestru dla celów demonstracyjnych
    const generateLedgerEntries = () => {
      const entries = transactions.map(transaction => {
        // Generowanie losowego hasha dla celów demonstracyjnych
        const generateHash = () => {
          const characters = '0123456789abcdef';
          let hash = '0x';
          for (let i = 0; i < 64; i++) {
            hash += characters.charAt(Math.floor(Math.random() * characters.length));
          }
          return hash;
        };
        
        // Symulacja weryfikacji - większość wpisów jest zweryfikowana
        const verified = Math.random() > 0.1;
        
        return {
          id: transaction.id,
          timestamp: transaction.date,
          transactionType: 'fuel_purchase',
          amount: transaction.amount,
          currency: transaction.currency,
          driver: transaction.driver,
          vehicle: transaction.vehicle,
          location: transaction.location,
          blockHeight: Math.floor(Math.random() * 1000000) + 9000000,
          blockHash: generateHash(),
          transactionHash: generateHash(),
          previousHash: generateHash(),
          verified
        };
      });
      
      setLedgerEntries(entries);
      
      // Aktualizacja statystyk blockchaina
      setBlockchainStats({
        lastBlockHeight: 9123456,
        lastBlockHash: '0x7a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2',
        totalTransactions: entries.length,
        networkNodes: 15,
        lastVerification: new Date().toISOString()
      });
      
      // Sprawdzenie, czy wszystkie wpisy są zweryfikowane
      const allVerified = entries.every(entry => entry.verified);
      setIsVerified(allVerified);
      onLedgerVerified(allVerified);
    };
    
    generateLedgerEntries();
  }, [transactions, onLedgerVerified]);
  
  // Filtrowanie wpisów rejestru na podstawie wyszukiwania
  const filteredEntries = ledgerEntries.filter(entry => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return (
      entry.id.toString().includes(searchLower) ||
      entry.driver.toLowerCase().includes(searchLower) ||
      entry.vehicle.toLowerCase().includes(searchLower) ||
      entry.location.toLowerCase().includes(searchLower) ||
      entry.transactionHash.toLowerCase().includes(searchLower)
    );
  });
  
  // Obsługa weryfikacji rejestru
  const handleVerifyLedger = () => {
    // W rzeczywistej aplikacji tutaj byłaby rzeczywista weryfikacja blockchaina
    
    // Symulacja weryfikacji dla celów demonstracyjnych
    setTimeout(() => {
      const allVerified = Math.random() > 0.2;
      setIsVerified(allVerified);
      onLedgerVerified(allVerified);
      
      // Aktualizacja statystyk blockchaina
      setBlockchainStats({
        ...blockchainStats,
        lastVerification: new Date().toISOString()
      });
      
      // Aktualizacja statusu weryfikacji dla poszczególnych wpisów
      if (!allVerified) {
        // Losowo oznacz niektóre wpisy jako niezweryfikowane
        const updatedEntries = ledgerEntries.map(entry => ({
          ...entry,
          verified: Math.random() > 0.1
        }));
        setLedgerEntries(updatedEntries);
      } else {
        // Wszystkie wpisy są zweryfikowane
        const updatedEntries = ledgerEntries.map(entry => ({
          ...entry,
          verified: true
        }));
        setLedgerEntries(updatedEntries);
      }
    }, 1000);
  };
  
  // Obsługa eksportu rejestru
  const handleExportLedger = () => {
    // W rzeczywistej aplikacji tutaj byłby eksport danych do pliku
    
    // Symulacja eksportu dla celów demonstracyjnych
    alert('Eksportowanie rejestru blockchain...');
  };
  
  return (
    <Container>
      <LedgerHeader>
        <LedgerTitle>Rejestr transakcji oparty na blockchain</LedgerTitle>
        <LedgerStatus verified={isVerified}>
          <StatusIcon>{isVerified ? '✓' : '⚠️'}</StatusIcon>
          {isVerified ? 'Rejestr zweryfikowany' : 'Wykryto niezgodności w rejestrze'}
        </LedgerStatus>
      </LedgerHeader>
      
      <LedgerControls>
        <Button primary onClick={handleVerifyLedger}>
          Weryfikuj rejestr
        </Button>
        <Button onClick={handleExportLedger}>
          Eksportuj rejestr
        </Button>
        <SearchInput 
          type="text" 
          placeholder="Szukaj transakcji, kierowcy, pojazdu lub hasha..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </LedgerControls>
      
      <LedgerTable>
        <thead>
          <tr>
            <th>ID</th>
            <th>Data</th>
            <th>Kierowca</th>
            <th>Pojazd</th>
            <th>Kwota</th>
            <th>Hash transakcji</th>
            <th>Blok</th>
            <th>Status</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {filteredEntries.map(entry => (
            <tr key={entry.id}>
              <td>{entry.id}</td>
              <td>{entry.timestamp}</td>
              <td>{entry.driver}</td>
              <td>{entry.vehicle}</td>
              <td>{entry.amount.toFixed(2)} {entry.currency}</td>
              <HashCell title={entry.transactionHash}>{entry.transactionHash}</HashCell>
              <td>{entry.blockHeight}</td>
              <StatusCell verified={entry.verified}>
                {entry.verified ? 'Zweryfikowana' : 'Niezgodność'}
              </StatusCell>
              <td>
                <ActionButton onClick={() => alert(`Szczegóły transakcji ${entry.id}`)}>
                  Szczegóły
                </ActionButton>
              </td>
            </tr>
          ))}
        </tbody>
      </LedgerTable>
      
      <BlockchainInfo>
        <InfoTitle>Informacje o blockchain</InfoTitle>
        <InfoRow>
          <InfoLabel>Wysokość ostatniego bloku:</InfoLabel>
          <InfoValue>{blockchainStats.lastBlockHeight}</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>Hash ostatniego bloku:</InfoLabel>
          <InfoValue>{blockchainStats.lastBlockHash}</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>Liczba transakcji:</InfoLabel>
          <InfoValue>{blockchainStats.totalTransactions}</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>Liczba węzłów sieci:</InfoLabel>
          <InfoValue>{blockchainStats.networkNodes}</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>Ostatnia weryfikacja:</InfoLabel>
          <InfoValue>{blockchainStats.lastVerification}</InfoValue>
        </InfoRow>
      </BlockchainInfo>
    </Container>
  );
};

export default BlockchainLedger;
