import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  getAssets,
  getAssetCategories,
  getAssetLocations,
  trackAssetLocation,
  generateAssetReport
} from '../../services/api/mockAssetManagementService';
import './IconStyles.css';

const AssetReporting = () => {
  const [assets, setAssets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedAssets, setSelectedAssets] = useState([]);
  const [reportType, setReportType] = useState('inventory');
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });
  const [groupBy, setGroupBy] = useState('none');
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    type: '',
    category: '',
    location: '',
    status: ''
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch assets
        const assetsData = await getAssets();
        setAssets(assetsData.assets);
        
        // Fetch categories
        const categoriesData = await getAssetCategories();
        setCategories(categoriesData);
        
        // Fetch locations
        const locationsData = await getAssetLocations();
        setLocations(locationsData);
        
        setError(null);
      } catch (err) {
        console.error('Error fetching initial data:', err);
        setError('Nie udało się pobrać danych. Spróbuj ponownie później.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
    
    // Set default date range (last 30 days)
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);
    
    setDateRange({
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0]
    });
  }, []);

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateRangeChange = (name, value) => {
    setDateRange(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAssetSelection = (assetId) => {
    setSelectedAssets(prev => {
      if (prev.includes(assetId)) {
        return prev.filter(id => id !== assetId);
      } else {
        return [...prev, assetId];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedAssets.length === filteredAssets.length) {
      setSelectedAssets([]);
    } else {
      setSelectedAssets(filteredAssets.map(asset => asset.id));
    }
  };

  const handleGenerateReport = async () => {
    try {
      setIsGenerating(true);
      
      const reportParams = {
        assets: selectedAssets.length > 0 ? selectedAssets : undefined,
        type: reportType,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        groupBy: groupBy !== 'none' ? groupBy : undefined,
        ...filters
      };
      
      const data = await generateAssetReport(reportParams);
      setReportData(data);
      
      setError(null);
    } catch (err) {
      console.error('Error generating report:', err);
      setError('Nie udało się wygenerować raportu. Spróbuj ponownie później.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExportReport = (format) => {
    // In a real application, this would trigger a download
    alert(`Eksportowanie raportu w formacie ${format}...`);
  };

  // Filter assets based on selected filters
  const filteredAssets = assets.filter(asset => {
    if (filters.type && asset.type !== filters.type) return false;
    if (filters.category && asset.category !== filters.category) return false;
    if (filters.location && asset.location !== filters.location) return false;
    if (filters.status && asset.status !== filters.status) return false;
    return true;
  });

  const getReportTypeName = (type) => {
    switch (type) {
      case 'inventory':
        return 'Inwentaryzacja';
      case 'maintenance':
        return 'Konserwacja';
      case 'utilization':
        return 'Wykorzystanie';
      case 'financial':
        return 'Finansowy';
      case 'location':
        return 'Lokalizacja';
      default:
        return type;
    }
  };

  const getGroupByName = (group) => {
    switch (group) {
      case 'none':
        return 'Brak';
      case 'type':
        return 'Typ';
      case 'category':
        return 'Kategoria';
      case 'location':
        return 'Lokalizacja';
      case 'status':
        return 'Status';
      default:
        return group;
    }
  };

  const formatCurrency = (value) => {
    return value.toLocaleString('pl-PL', { style: 'currency', currency: 'PLN' });
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('pl-PL');
  };

  if (isLoading && assets.length === 0) {
    return <LoadingContainer>Ładowanie danych aktywów...</LoadingContainer>;
  }

  if (error) {
    return <ErrorContainer>{error}</ErrorContainer>;
  }

  return (
    <ReportingContainer>
      <ReportingHeader>
        <h2>Raporty Aktywów</h2>
      </ReportingHeader>

      <ReportingContent>
        <ReportingOptions>
          <OptionsSection>
            <SectionTitle>Typ raportu</SectionTitle>
            <ReportTypeButtons>
              <ReportTypeButton 
                active={reportType === 'inventory'}
                onClick={() => setReportType('inventory')}
              >
                <span className="icon icon-list"></span>
                Inwentaryzacja
              </ReportTypeButton>
              <ReportTypeButton 
                active={reportType === 'maintenance'}
                onClick={() => setReportType('maintenance')}
              >
                <span className="icon icon-wrench"></span>
                Konserwacja
              </ReportTypeButton>
              <ReportTypeButton 
                active={reportType === 'utilization'}
                onClick={() => setReportType('utilization')}
              >
                <span className="icon icon-chart"></span>
                Wykorzystanie
              </ReportTypeButton>
              <ReportTypeButton 
                active={reportType === 'financial'}
                onClick={() => setReportType('financial')}
              >
                <span className="icon icon-money"></span>
                Finansowy
              </ReportTypeButton>
              <ReportTypeButton 
                active={reportType === 'location'}
                onClick={() => setReportType('location')}
              >
                <span className="icon icon-map"></span>
                Lokalizacja
              </ReportTypeButton>
            </ReportTypeButtons>
          </OptionsSection>

          <OptionsSection>
            <SectionTitle>Filtry</SectionTitle>
            <FiltersGrid>
              <FilterGroup>
                <FilterLabel>Typ:</FilterLabel>
                <FilterSelect 
                  value={filters.type}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                >
                  <option value="">Wszystkie typy</option>
                  <option value="vehicle">Pojazdy</option>
                  <option value="equipment">Sprzęt</option>
                  <option value="tool">Narzędzia</option>
                  <option value="part">Części</option>
                  <option value="accessory">Akcesoria</option>
                </FilterSelect>
              </FilterGroup>

              <FilterGroup>
                <FilterLabel>Kategoria:</FilterLabel>
                <FilterSelect 
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                >
                  <option value="">Wszystkie kategorie</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.code}>
                      {category.name}
                    </option>
                  ))}
                </FilterSelect>
              </FilterGroup>

              <FilterGroup>
                <FilterLabel>Lokalizacja:</FilterLabel>
                <FilterSelect 
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                >
                  <option value="">Wszystkie lokalizacje</option>
                  {locations.map(location => (
                    <option key={location.id} value={location.name}>
                      {location.name}
                    </option>
                  ))}
                </FilterSelect>
              </FilterGroup>

              <FilterGroup>
                <FilterLabel>Status:</FilterLabel>
                <FilterSelect 
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                >
                  <option value="">Wszystkie statusy</option>
                  <option value="active">Aktywne</option>
                  <option value="maintenance">W konserwacji</option>
                  <option value="inactive">Nieaktywne</option>
                  <option value="disposed">Wycofane</option>
                </FilterSelect>
              </FilterGroup>
            </FiltersGrid>
          </OptionsSection>

          <OptionsSection>
            <SectionTitle>Zakres dat</SectionTitle>
            <DateRangeContainer>
              <FilterGroup>
                <FilterLabel>Od:</FilterLabel>
                <FilterInput 
                  type="date" 
                  value={dateRange.startDate}
                  onChange={(e) => handleDateRangeChange('startDate', e.target.value)}
                />
              </FilterGroup>
              <FilterGroup>
                <FilterLabel>Do:</FilterLabel>
                <FilterInput 
                  type="date" 
                  value={dateRange.endDate}
                  onChange={(e) => handleDateRangeChange('endDate', e.target.value)}
                />
              </FilterGroup>
            </DateRangeContainer>
          </OptionsSection>

          <OptionsSection>
            <SectionTitle>Grupowanie</SectionTitle>
            <GroupByContainer>
              <FilterGroup>
                <FilterLabel>Grupuj według:</FilterLabel>
                <FilterSelect 
                  value={groupBy}
                  onChange={(e) => setGroupBy(e.target.value)}
                >
                  <option value="none">Brak grupowania</option>
                  <option value="type">Typ</option>
                  <option value="category">Kategoria</option>
                  <option value="location">Lokalizacja</option>
                  <option value="status">Status</option>
                </FilterSelect>
              </FilterGroup>
            </GroupByContainer>
          </OptionsSection>

          <OptionsSection>
            <SectionTitle>Aktywa</SectionTitle>
            <AssetsSelectionContainer>
              <AssetsHeader>
                <SelectAllCheckbox>
                  <input 
                    type="checkbox" 
                    checked={selectedAssets.length === filteredAssets.length && filteredAssets.length > 0}
                    onChange={handleSelectAll}
                  />
                  <span>Zaznacz wszystkie</span>
                </SelectAllCheckbox>
                <SelectedCount>
                  Wybrano: {selectedAssets.length} z {filteredAssets.length}
                </SelectedCount>
              </AssetsHeader>
              <AssetsList>
                {filteredAssets.length > 0 ? (
                  filteredAssets.map(asset => (
                    <AssetItem key={asset.id}>
                      <AssetCheckbox>
                        <input 
                          type="checkbox" 
                          checked={selectedAssets.includes(asset.id)}
                          onChange={() => handleAssetSelection(asset.id)}
                        />
                      </AssetCheckbox>
                      <AssetInfo>
                        <AssetName>{asset.name}</AssetName>
                        <AssetDetails>
                          {asset.serialNumber} | {asset.type} | {asset.location}
                        </AssetDetails>
                      </AssetInfo>
                    </AssetItem>
                  ))
                ) : (
                  <EmptyAssets>Brak aktywów spełniających kryteria filtrowania</EmptyAssets>
                )}
              </AssetsList>
            </AssetsSelectionContainer>
          </OptionsSection>

          <GenerateButtonContainer>
            <GenerateButton 
              onClick={handleGenerateReport}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>Generowanie raportu...</>
              ) : (
                <>
                  <span className="icon icon-file"></span>
                  Generuj raport
                </>
              )}
            </GenerateButton>
          </GenerateButtonContainer>
        </ReportingOptions>

        <ReportPreview>
          <PreviewHeader>
            <PreviewTitle>
              {reportData ? (
                <>Raport: {getReportTypeName(reportType)}</>
              ) : (
                <>Podgląd raportu</>
              )}
            </PreviewTitle>
            {reportData && (
              <ExportButtons>
                <ExportButton onClick={() => handleExportReport('pdf')}>
                  <span className="icon icon-file-pdf"></span> PDF
                </ExportButton>
                <ExportButton onClick={() => handleExportReport('excel')}>
                  <span className="icon icon-file-excel"></span> Excel
                </ExportButton>
                <ExportButton onClick={() => handleExportReport('csv')}>
                  <span className="icon icon-file-csv"></span> CSV
                </ExportButton>
              </ExportButtons>
            )}
          </PreviewHeader>

          <PreviewContent>
            {isGenerating ? (
              <GeneratingMessage>Generowanie raportu...</GeneratingMessage>
            ) : reportData ? (
              <>
                <ReportMetadata>
                  <MetadataItem>
                    <MetadataLabel>Typ raportu:</MetadataLabel>
                    <MetadataValue>{getReportTypeName(reportType)}</MetadataValue>
                  </MetadataItem>
                  <MetadataItem>
                    <MetadataLabel>Zakres dat:</MetadataLabel>
                    <MetadataValue>{formatDate(dateRange.startDate)} - {formatDate(dateRange.endDate)}</MetadataValue>
                  </MetadataItem>
                  <MetadataItem>
                    <MetadataLabel>Grupowanie:</MetadataLabel>
                    <MetadataValue>{getGroupByName(groupBy)}</MetadataValue>
                  </MetadataItem>
                  <MetadataItem>
                    <MetadataLabel>Liczba aktywów:</MetadataLabel>
                    <MetadataValue>{reportData.assetCount}</MetadataValue>
                  </MetadataItem>
                  <MetadataItem>
                    <MetadataLabel>Data wygenerowania:</MetadataLabel>
                    <MetadataValue>{formatDate(reportData.generatedAt)}</MetadataValue>
                  </MetadataItem>
                </ReportMetadata>

                {reportType === 'inventory' && (
                  <InventoryReport data={reportData} />
                )}

                {reportType === 'maintenance' && (
                  <MaintenanceReport data={reportData} />
                )}

                {reportType === 'utilization' && (
                  <UtilizationReport data={reportData} />
                )}

                {reportType === 'financial' && (
                  <FinancialReport data={reportData} formatCurrency={formatCurrency} />
                )}

                {reportType === 'location' && (
                  <LocationReport data={reportData} />
                )}
              </>
            ) : (
              <EmptyPreview>
                <span className="icon icon-file"></span>
                <EmptyPreviewText>
                  Wybierz opcje raportu i kliknij "Generuj raport", aby zobaczyć podgląd
                </EmptyPreviewText>
              </EmptyPreview>
            )}
          </PreviewContent>
        </ReportPreview>
      </ReportingContent>
    </ReportingContainer>
  );
};

// Report Components
const InventoryReport = ({ data }) => (
  <ReportTable>
    <thead>
      <tr>
        <th>Nazwa</th>
        <th>Numer seryjny</th>
        <th>Typ</th>
        <th>Kategoria</th>
        <th>Lokalizacja</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {data.items.map(item => (
        <tr key={item.id}>
          <td>{item.name}</td>
          <td>{item.serialNumber}</td>
          <td>{item.type}</td>
          <td>{item.category}</td>
          <td>{item.location}</td>
          <td>
            <StatusBadge status={item.status}>
              {item.status === 'active' ? 'Aktywny' : 
               item.status === 'maintenance' ? 'W konserwacji' : 
               item.status === 'inactive' ? 'Nieaktywny' : 
               'Wycofany'}
            </StatusBadge>
          </td>
        </tr>
      ))}
    </tbody>
  </ReportTable>
);

const MaintenanceReport = ({ data }) => (
  <ReportTable>
    <thead>
      <tr>
        <th>Aktywo</th>
        <th>Typ konserwacji</th>
        <th>Data</th>
        <th>Wykonawca</th>
        <th>Koszt</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {data.items.map(item => (
        <tr key={item.id}>
          <td>{item.assetName}</td>
          <td>{item.maintenanceType}</td>
          <td>{item.date}</td>
          <td>{item.performedBy}</td>
          <td>{item.cost ? item.cost.toLocaleString() + ' PLN' : '-'}</td>
          <td>
            <StatusBadge status={item.status}>
              {item.status}
            </StatusBadge>
          </td>
        </tr>
      ))}
    </tbody>
  </ReportTable>
);

const UtilizationReport = ({ data }) => (
  <ReportTable>
    <thead>
      <tr>
        <th>Aktywo</th>
        <th>Wykorzystanie</th>
        <th>Godziny użycia</th>
        <th>Dostępne godziny</th>
        <th>Przestój</th>
      </tr>
    </thead>
    <tbody>
      {data.items.map(item => (
        <tr key={item.id}>
          <td>{item.assetName}</td>
          <td>
            <UtilizationBar percentage={item.utilization}>
              <UtilizationValue>{item.utilization}%</UtilizationValue>
            </UtilizationBar>
          </td>
          <td>{item.hoursUsed} h</td>
          <td>{item.totalAvailableHours} h</td>
          <td>{item.downtimeHours} h ({Math.round(item.downtimeHours / item.totalAvailableHours * 100)}%)</td>
        </tr>
      ))}
    </tbody>
  </ReportTable>
);

const FinancialReport = ({ data, formatCurrency }) => (
  <ReportTable>
    <thead>
      <tr>
        <th>Aktywo</th>
        <th>Cena zakupu</th>
        <th>Obecna wartość</th>
        <th>Amortyzacja</th>
        <th>Koszty utrzymania</th>
        <th>TCO</th>
      </tr>
    </thead>
    <tbody>
      {data.items.map(item => (
        <tr key={item.id}>
          <td>{item.assetName}</td>
          <td>{formatCurrency(item.purchasePrice)}</td>
          <td>{formatCurrency(item.currentValue)}</td>
          <td>{formatCurrency(item.totalDepreciation)}</td>
          <td>{formatCurrency(item.maintenanceCosts)}</td>
          <td>{formatCurrency(item.tco)}</td>
        </tr>
      ))}
    </tbody>
    <tfoot>
      <tr>
        <td colSpan="1"><strong>Suma</strong></td>
        <td><strong>{formatCurrency(data.summary.totalPurchasePrice)}</strong></td>
        <td><strong>{formatCurrency(data.summary.totalCurrentValue)}</strong></td>
        <td><strong>{formatCurrency(data.summary.totalDepreciation)}</strong></td>
        <td><strong>{formatCurrency(data.summary.totalMaintenanceCosts)}</strong></td>
        <td><strong>{formatCurrency(data.summary.totalTCO)}</strong></td>
      </tr>
    </tfoot>
  </ReportTable>
);

const LocationReport = ({ data }) => (
  <ReportTable>
    <thead>
      <tr>
        <th>Aktywo</th>
        <th>Lokalizacja</th>
        <th>Adres</th>
        <th>Status</th>
        <th>Ostatnia aktualizacja</th>
      </tr>
    </thead>
    <tbody>
      {data.items.map(item => (
        <tr key={item.id}>
          <td>{item.assetName}</td>
          <td>{item.location}</td>
          <td>{item.address}</td>
          <td>{item.inMotion ? 'W ruchu' : 'Stacjonarny'}</td>
          <td>{new Date(item.lastUpdated).toLocaleString('pl-PL')}</td>
        </tr>
      ))}
    </tbody>
  </ReportTable>
);

// Styled Components
const ReportingContainer = styled.div`
  padding: 20px;
  width: 100%;
`;

const ReportingHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  
  h2 {
    margin: 0;
    color: #333;
  }
`;

const ReportingContent = styled.div`
  display: flex;
  gap: 20px;
  
  @media (max-width: 1200px) {
    flex-direction: column;
  }
`;

const ReportingOptions = styled.div`
  width: 350px;
  flex-shrink: 0;
  
  @media (max-width: 1200px) {
    width: 100%;
  }
`;

const OptionsSection = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
  overflow: hidden;
`;

const SectionTitle = styled.div`
  padding: 15px;
  background: #f8f9fa;
  border-bottom: 1px solid #eee;
  font-weight: 600;
  color: #333;
`;

const ReportTypeButtons = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  gap: 10px;
`;

const ReportTypeButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 15px;
  background-color: ${props => props.active ? '#e3f2fd' : 'white'};
  color: ${props => props.active ? '#2196f3' : '#555'};
  border: 1px solid ${props => props.active ? '#bbdefb' : '#ddd'};
  border-radius: 4px;
  font-weight: ${props => props.active ? '600' : '400'};
  text-align: left;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.active ? '#e3f2fd' : '#f5f5f5'};
  }
  
  .icon {
    font-size: 16px;
    color: ${props => props.active ? '#2196f3' : '#777'};
  }
`;

const FiltersGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
  padding: 15px;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const FilterLabel = styled.label`
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 5px;
  color: #555;
`;

const FilterSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  font-size: 14px;
`;

const FilterInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  font-size: 14px;
`;

const DateRangeContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  padding: 15px;
`;

const GroupByContainer = styled.div`
  padding: 15px;
`;

const AssetsSelectionContainer = styled.div`
  padding: 15px;
`;

const AssetsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const SelectAllCheckbox = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  cursor: pointer;
  
  input {
    cursor: pointer;
  }
`;

const SelectedCount = styled.div`
  font-size: 14px;
  color: #777;
`;

const AssetsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 10px;
`;

const AssetItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

const AssetCheckbox = styled.label`
  cursor: pointer;
  
  input {
    cursor: pointer;
  }
`;

const AssetInfo = styled.div`
  flex: 1;
`;

const AssetName = styled.div`
  font-weight: 500;
  margin-bottom: 3px;
`;

const AssetDetails = styled.div`
  font-size: 12px;
  color: #777;
`;

const EmptyAssets = styled.div`
  padding: 20px;
  text-align: center;
  color: #777;
  font-style: italic;
`;

const GenerateButtonContainer = styled.div`
  margin-top: 20px;
`;

const GenerateButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 12px;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #1976d2;
  }
  
  &:disabled {
    background-color: #90caf9;
    cursor: not-allowed;
  }
  
  .icon {
    font-size: 18px;
  }
`;

const ReportPreview = styled.div`
  flex: 1;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const PreviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: #f8f9fa;
  border-bottom: 1px solid #eee;
`;

const PreviewTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  color: #333;
`;

const ExportButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const ExportButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 8px 12px;
  background-color: white;
  color: #555;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  
  &:hover {
    background-color: #f5f5f5;
  }
  
  .icon {
    font-size: 16px;
  }
`;

const PreviewContent = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`;

const EmptyPreview = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #777;
  
  .icon {
    font-size: 48px;
    margin-bottom: 20px;
    opacity: 0.5;
  }
`;

const EmptyPreviewText = styled.div`
  font-size: 16px;
  text-align: center;
  max-width: 300px;
`;

const GeneratingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 16px;
  color: #555;
`;

const ReportMetadata = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 30px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 8px;
`;

const MetadataItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const MetadataLabel = styled.div`
  font-size: 12px;
  color: #777;
  margin-bottom: 3px;
`;

const MetadataValue = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #333;
`;

const ReportTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 12px 16px;
    text-align: left;
    border-bottom: 1px solid #eee;
  }
  
  th {
    background-color: #f8f9fa;
    font-weight: 600;
    color: #555;
    font-size: 14px;
  }
  
  tbody tr:hover {
    background-color: #f5f5f5;
  }
  
  tfoot {
    background-color: #f8f9fa;
  }
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  color: white;
  background-color: ${props => {
    switch (props.status) {
      case 'active':
        return '#4caf50';
      case 'maintenance':
        return '#ff9800';
      case 'inactive':
        return '#9e9e9e';
      case 'disposed':
        return '#e53935';
      case 'completed':
        return '#4caf50';
      case 'scheduled':
        return '#2196f3';
      case 'in_progress':
        return '#ff9800';
      case 'overdue':
        return '#e53935';
      default:
        return '#9e9e9e';
    }
  }};
`;

const UtilizationBar = styled.div`
  width: 100%;
  height: 20px;
  background-color: #f0f0f0;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${props => props.percentage}%;
    background-color: ${props => {
      if (props.percentage < 30) return '#e53935';
      if (props.percentage < 70) return '#ff9800';
      return '#4caf50';
    }};
    border-radius: 10px;
  }
`;

const UtilizationValue = styled.span`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12px;
  font-weight: 600;
  color: #333;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  font-size: 16px;
  color: #555;
`;

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  font-size: 16px;
  color: #e53935;
  text-align: center;
  padding: 0 20px;
`;

export default AssetReporting;
