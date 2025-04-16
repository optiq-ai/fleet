import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  getAssetDepreciation,
  getAssets,
  getAssetCategories,
  calculateAssetTCO,
  forecastAssetReplacement
} from '../../services/api/mockAssetManagementService';
import './IconStyles.css';

const AssetAcquisition = () => {
  const [assets, setAssets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [depreciationData, setDepreciationData] = useState(null);
  const [tcoData, setTcoData] = useState(null);
  const [replacementData, setReplacementData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDepreciationLoading, setIsDepreciationLoading] = useState(false);
  const [isTcoLoading, setIsTcoLoading] = useState(false);
  const [isReplacementLoading, setIsReplacementLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('depreciation');
  const [filters, setFilters] = useState({
    type: '',
    category: ''
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
        
        // Set default selected asset if available
        if (assetsData.assets.length > 0 && !selectedAsset) {
          setSelectedAsset(assetsData.assets[0]);
        }
        
        setError(null);
      } catch (err) {
        console.error('Error fetching initial data:', err);
        setError('Nie udało się pobrać danych. Spróbuj ponownie później.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    if (selectedAsset) {
      fetchAssetData();
    }
  }, [selectedAsset, activeTab]);

  const fetchAssetData = async () => {
    if (!selectedAsset) return;

    if (activeTab === 'depreciation') {
      try {
        setIsDepreciationLoading(true);
        const data = await getAssetDepreciation({ assetId: selectedAsset.id });
        setDepreciationData(data);
      } catch (err) {
        console.error('Error fetching depreciation data:', err);
        setError('Nie udało się pobrać danych amortyzacji.');
      } finally {
        setIsDepreciationLoading(false);
      }
    }

    if (activeTab === 'tco') {
      try {
        setIsTcoLoading(true);
        const data = await calculateAssetTCO(selectedAsset.id, { yearsToProject: 5 });
        setTcoData(data);
      } catch (err) {
        console.error('Error calculating TCO:', err);
        setError('Nie udało się obliczyć całkowitego kosztu posiadania.');
      } finally {
        setIsTcoLoading(false);
      }
    }

    if (activeTab === 'replacement') {
      try {
        setIsReplacementLoading(true);
        const data = await forecastAssetReplacement(selectedAsset.id);
        setReplacementData(data);
      } catch (err) {
        console.error('Error forecasting replacement:', err);
        setError('Nie udało się prognozować wymiany aktywa.');
      } finally {
        setIsReplacementLoading(false);
      }
    }
  };

  const handleAssetChange = (e) => {
    const assetId = e.target.value;
    const asset = assets.find(a => a.id === assetId);
    setSelectedAsset(asset);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatCurrency = (value) => {
    return value.toLocaleString('pl-PL', { style: 'currency', currency: 'PLN' });
  };

  const formatDate = (dateString) => {
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
    <AcquisitionContainer>
      <AcquisitionHeader>
        <h2>Zarządzanie Finansami Aktywów</h2>
      </AcquisitionHeader>

      <FiltersContainer>
        <FilterGroup>
          <FilterLabel>Aktywo:</FilterLabel>
          <FilterSelect 
            value={selectedAsset?.id || ''}
            onChange={handleAssetChange}
          >
            <option value="">Wybierz aktywo</option>
            {assets.map(asset => (
              <option key={asset.id} value={asset.id}>
                {asset.name} ({asset.serialNumber})
              </option>
            ))}
          </FilterSelect>
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>Typ:</FilterLabel>
          <FilterSelect 
            value={filters.type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
            disabled={!!selectedAsset}
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
            disabled={!!selectedAsset}
          >
            <option value="">Wszystkie kategorie</option>
            {categories.map(category => (
              <option key={category.id} value={category.code}>
                {category.name}
              </option>
            ))}
          </FilterSelect>
        </FilterGroup>
      </FiltersContainer>

      {selectedAsset ? (
        <>
          <AssetInfoCard>
            <AssetInfoHeader>
              <AssetName>{selectedAsset.name}</AssetName>
              <AssetSerialNumber>S/N: {selectedAsset.serialNumber}</AssetSerialNumber>
            </AssetInfoHeader>
            <AssetInfoDetails>
              <AssetInfoItem>
                <AssetInfoLabel>Data zakupu:</AssetInfoLabel>
                <AssetInfoValue>{selectedAsset.purchaseDate}</AssetInfoValue>
              </AssetInfoItem>
              <AssetInfoItem>
                <AssetInfoLabel>Cena zakupu:</AssetInfoLabel>
                <AssetInfoValue>{formatCurrency(selectedAsset.purchasePrice)}</AssetInfoValue>
              </AssetInfoItem>
              <AssetInfoItem>
                <AssetInfoLabel>Obecna wartość:</AssetInfoLabel>
                <AssetInfoValue>{formatCurrency(selectedAsset.currentValue)}</AssetInfoValue>
              </AssetInfoItem>
              <AssetInfoItem>
                <AssetInfoLabel>Metoda amortyzacji:</AssetInfoLabel>
                <AssetInfoValue>
                  {selectedAsset.depreciationMethod === 'straight-line' ? 'Liniowa' : selectedAsset.depreciationMethod}
                </AssetInfoValue>
              </AssetInfoItem>
              <AssetInfoItem>
                <AssetInfoLabel>Stopa amortyzacji:</AssetInfoLabel>
                <AssetInfoValue>{selectedAsset.depreciationRate}%</AssetInfoValue>
              </AssetInfoItem>
              <AssetInfoItem>
                <AssetInfoLabel>Oczekiwana żywotność:</AssetInfoLabel>
                <AssetInfoValue>{selectedAsset.expectedLifespan} lat</AssetInfoValue>
              </AssetInfoItem>
            </AssetInfoDetails>
          </AssetInfoCard>

          <TabsContainer>
            <TabButton 
              active={activeTab === 'depreciation'} 
              onClick={() => handleTabChange('depreciation')}
            >
              <span className="icon icon-chart"></span> Amortyzacja
            </TabButton>
            <TabButton 
              active={activeTab === 'tco'} 
              onClick={() => handleTabChange('tco')}
            >
              <span className="icon icon-calculator"></span> Całkowity koszt posiadania
            </TabButton>
            <TabButton 
              active={activeTab === 'replacement'} 
              onClick={() => handleTabChange('replacement')}
            >
              <span className="icon icon-refresh"></span> Prognoza wymiany
            </TabButton>
          </TabsContainer>

          <ContentContainer>
            {activeTab === 'depreciation' && (
              <DepreciationSection>
                {isDepreciationLoading ? (
                  <LoadingMessage>Ładowanie danych amortyzacji...</LoadingMessage>
                ) : depreciationData ? (
                  <>
                    <DepreciationSummary>
                      <SummaryCard>
                        <CardHeader>
                          <span className="icon icon-money"></span>
                          <h3>Wartość początkowa</h3>
                        </CardHeader>
                        <CardContent>
                          <CardValue>{formatCurrency(selectedAsset.purchasePrice)}</CardValue>
                        </CardContent>
                      </SummaryCard>
                      
                      <SummaryCard>
                        <CardHeader>
                          <span className="icon icon-money"></span>
                          <h3>Obecna wartość</h3>
                        </CardHeader>
                        <CardContent>
                          <CardValue>{formatCurrency(selectedAsset.currentValue)}</CardValue>
                        </CardContent>
                      </SummaryCard>
                      
                      <SummaryCard>
                        <CardHeader>
                          <span className="icon icon-chart"></span>
                          <h3>Całkowita amortyzacja</h3>
                        </CardHeader>
                        <CardContent>
                          <CardValue>{formatCurrency(depreciationData.assetDepreciation[0].totalDepreciation)}</CardValue>
                        </CardContent>
                      </SummaryCard>
                      
                      <SummaryCard>
                        <CardHeader>
                          <span className="icon icon-calendar"></span>
                          <h3>Pozostały okres użytkowania</h3>
                        </CardHeader>
                        <CardContent>
                          <CardValue>{depreciationData.assetDepreciation[0].remainingLifespan.toFixed(1)} lat</CardValue>
                        </CardContent>
                      </SummaryCard>
                    </DepreciationSummary>
                    
                    <DepreciationChart>
                      <ChartHeader>Prognoza wartości w czasie</ChartHeader>
                      <ChartContent>
                        <ChartYAxis>
                          <YAxisLabel>Wartość (PLN)</YAxisLabel>
                          <YAxisTicks>
                            {[0, 0.25, 0.5, 0.75, 1].map(percent => (
                              <YAxisTick key={percent}>
                                {formatCurrency(selectedAsset.purchasePrice * percent)}
                              </YAxisTick>
                            ))}
                          </YAxisTicks>
                        </ChartYAxis>
                        <ChartBars>
                          {depreciationData.assetDepreciation[0].projectedValues.map((projection, index) => {
                            const heightPercent = (projection.value / selectedAsset.purchasePrice) * 100;
                            return (
                              <ChartBar key={projection.date}>
                                <BarValue>{formatCurrency(projection.value)}</BarValue>
                                <BarFill height={heightPercent} />
                                <BarLabel>{projection.date.split('-')[0]}</BarLabel>
                              </ChartBar>
                            );
                          })}
                        </ChartBars>
                      </ChartContent>
                    </DepreciationChart>
                  </>
                ) : (
                  <EmptyMessage>Brak danych amortyzacji dla wybranego aktywa</EmptyMessage>
                )}
              </DepreciationSection>
            )}

            {activeTab === 'tco' && (
              <TcoSection>
                {isTcoLoading ? (
                  <LoadingMessage>Obliczanie całkowitego kosztu posiadania...</LoadingMessage>
                ) : tcoData ? (
                  <>
                    <TcoSummary>
                      <SummaryCard>
                        <CardHeader>
                          <span className="icon icon-money"></span>
                          <h3>Całkowity koszt posiadania</h3>
                        </CardHeader>
                        <CardContent>
                          <CardValue>{formatCurrency(tcoData.tco)}</CardValue>
                        </CardContent>
                      </SummaryCard>
                      
                      <SummaryCard>
                        <CardHeader>
                          <span className="icon icon-money"></span>
                          <h3>Cena zakupu</h3>
                        </CardHeader>
                        <CardContent>
                          <CardValue>{formatCurrency(tcoData.purchasePrice)}</CardValue>
                          <CardPercent>{Math.round(tcoData.purchasePrice / tcoData.tco * 100)}% TCO</CardPercent>
                        </CardContent>
                      </SummaryCard>
                      
                      <SummaryCard>
                        <CardHeader>
                          <span className="icon icon-wrench"></span>
                          <h3>Koszty utrzymania</h3>
                        </CardHeader>
                        <CardContent>
                          <CardValue>{formatCurrency(tcoData.totalCostsToDate)}</CardValue>
                          <CardPercent>{Math.round(tcoData.totalCostsToDate / tcoData.tco * 100)}% TCO</CardPercent>
                        </CardContent>
                      </SummaryCard>
                      
                      <SummaryCard>
                        <CardHeader>
                          <span className="icon icon-chart"></span>
                          <h3>Prognozowany TCO (5 lat)</h3>
                        </CardHeader>
                        <CardContent>
                          <CardValue>{formatCurrency(tcoData.projectedTCO)}</CardValue>
                        </CardContent>
                      </SummaryCard>
                    </TcoSummary>
                    
                    <TcoBreakdown>
                      <ChartHeader>Struktura kosztów</ChartHeader>
                      <BreakdownContent>
                        <BreakdownPieChart>
                          <PieChartLegend>
                            <LegendItem>
                              <LegendColor color="#2196f3" />
                              <LegendLabel>Zakup: {formatCurrency(tcoData.costBreakdown.purchase)}</LegendLabel>
                            </LegendItem>
                            <LegendItem>
                              <LegendColor color="#4caf50" />
                              <LegendLabel>Konserwacja: {formatCurrency(tcoData.costBreakdown.maintenance)}</LegendLabel>
                            </LegendItem>
                            <LegendItem>
                              <LegendColor color="#ff9800" />
                              <LegendLabel>Ubezpieczenie: {formatCurrency(tcoData.costBreakdown.insurance)}</LegendLabel>
                            </LegendItem>
                            <LegendItem>
                              <LegendColor color="#9c27b0" />
                              <LegendLabel>Inne: {formatCurrency(tcoData.costBreakdown.other)}</LegendLabel>
                            </LegendItem>
                          </PieChartLegend>
                        </BreakdownPieChart>
                        
                        <BreakdownTable>
                          <thead>
                            <tr>
                              <th>Rok</th>
                              <th>Koszty konserwacji</th>
                              <th>Koszty amortyzacji</th>
                              <th>Koszty operacyjne</th>
                              <th>Razem</th>
                            </tr>
                          </thead>
                          <tbody>
                            {tcoData.projectedCosts.map(yearData => (
                              <tr key={yearData.year}>
                                <td>{yearData.year}</td>
                                <td>{formatCurrency(yearData.maintenanceCost)}</td>
                                <td>{formatCurrency(yearData.depreciationCost)}</td>
                                <td>{formatCurrency(yearData.operationalCost)}</td>
                                <td>
                                  <strong>
                                    {formatCurrency(
                                      yearData.maintenanceCost + 
                                      yearData.depreciationCost + 
                                      yearData.operationalCost
                                    )}
                                  </strong>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </BreakdownTable>
                      </BreakdownContent>
                    </TcoBreakdown>
                  </>
                ) : (
                  <EmptyMessage>Brak danych TCO dla wybranego aktywa</EmptyMessage>
                )}
              </TcoSection>
            )}

            {activeTab === 'replacement' && (
              <ReplacementSection>
                {isReplacementLoading ? (
                  <LoadingMessage>Generowanie prognozy wymiany...</LoadingMessage>
                ) : replacementData ? (
                  <>
                    <ReplacementSummary>
                      <SummaryCard>
                        <CardHeader>
                          <span className="icon icon-calendar"></span>
                          <h3>Optymalny termin wymiany</h3>
                        </CardHeader>
                        <CardContent>
                          <CardValue>{formatDate(replacementData.optimalReplacementDate)}</CardValue>
                          <CardSubtext>Za {replacementData.yearsUntilReplacement} lat</CardSubtext>
                        </CardContent>
                      </SummaryCard>
                      
                      <SummaryCard>
                        <CardHeader>
                          <span className="icon icon-money"></span>
                          <h3>Szacowany koszt wymiany</h3>
                        </CardHeader>
                        <CardContent>
                          <CardValue>{formatCurrency(replacementData.estimatedReplacementCost)}</CardValue>
                        </CardContent>
                      </SummaryCard>
                      
                      <SummaryCard>
                        <CardHeader>
                          <span className="icon icon-wrench"></span>
                          <h3>Powód wymiany</h3>
                        </CardHeader>
                        <CardContent>
                          <CardText>{replacementData.reasonForReplacement}</CardText>
                        </CardContent>
                      </SummaryCard>
                    </ReplacementSummary>
                    
                    <ReplacementAnalysis>
                      <AnalysisHeader>Analiza kosztów</AnalysisHeader>
                      <AnalysisContent>
                        <AnalysisItem>
                          <AnalysisLabel>Obecny roczny koszt konserwacji:</AnalysisLabel>
                          <AnalysisValue>{formatCurrency(replacementData.costAnalysis.currentAnnualMaintenanceCost)}</AnalysisValue>
                        </AnalysisItem>
                        <AnalysisItem>
                          <AnalysisLabel>Prognozowany roczny koszt konserwacji w momencie wymiany:</AnalysisLabel>
                          <AnalysisValue>{formatCurrency(replacementData.costAnalysis.projectedAnnualMaintenanceCost)}</AnalysisValue>
                        </AnalysisItem>
                        <AnalysisItem>
                          <AnalysisLabel>Wartość aktywa w momencie wymiany:</AnalysisLabel>
                          <AnalysisValue>{formatCurrency(replacementData.costAnalysis.currentValueAtReplacement)}</AnalysisValue>
                        </AnalysisItem>
                        <AnalysisItem>
                          <AnalysisLabel>Stosunek kosztów konserwacji do wartości:</AnalysisLabel>
                          <AnalysisValue>{replacementData.costAnalysis.costRatio}%</AnalysisValue>
                        </AnalysisItem>
                      </AnalysisContent>
                    </ReplacementAnalysis>
                    
                    <AlternativeOptions>
                      <OptionsHeader>Alternatywne opcje</OptionsHeader>
                      <OptionsContent>
                        {replacementData.alternativeOptions.map((option, index) => (
                          <OptionCard key={index}>
                            <OptionTitle>{option.option}</OptionTitle>
                            <OptionCost>Koszt: {option.cost}</OptionCost>
                            <OptionDetails>
                              <OptionItem>
                                <OptionLabel>Zalety:</OptionLabel>
                                <OptionValue>{option.pros}</OptionValue>
                              </OptionItem>
                              <OptionItem>
                                <OptionLabel>Wady:</OptionLabel>
                                <OptionValue>{option.cons}</OptionValue>
                              </OptionItem>
                            </OptionDetails>
                          </OptionCard>
                        ))}
                      </OptionsContent>
                    </AlternativeOptions>
                  </>
                ) : (
                  <EmptyMessage>Brak danych prognozy wymiany dla wybranego aktywa</EmptyMessage>
                )}
              </ReplacementSection>
            )}
          </ContentContainer>
        </>
      ) : (
        <EmptyContainer>
          <EmptyMessage>Wybierz aktywo, aby zobaczyć dane finansowe</EmptyMessage>
        </EmptyContainer>
      )}
    </AcquisitionContainer>
  );
};

// Styled Components
const AcquisitionContainer = styled.div`
  padding: 20px;
  width: 100%;
`;

const AcquisitionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  
  h2 {
    margin: 0;
    color: #333;
  }
`;

const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 8px;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 200px;
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
  
  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;

const AssetInfoCard = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
  overflow: hidden;
`;

const AssetInfoHeader = styled.div`
  padding: 15px 20px;
  background: #f8f9fa;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AssetName = styled.h3`
  margin: 0;
  color: #333;
  font-size: 18px;
`;

const AssetSerialNumber = styled.div`
  color: #777;
  font-size: 14px;
`;

const AssetInfoDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
  padding: 20px;
`;

const AssetInfoItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const AssetInfoLabel = styled.div`
  font-size: 12px;
  color: #777;
  margin-bottom: 4px;
`;

const AssetInfoValue = styled.div`
  font-size: 14px;
  color: #333;
`;

const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
`;

const TabButton = styled.button`
  padding: 12px 20px;
  background: none;
  border: none;
  border-bottom: 3px solid ${props => props.active ? '#2196f3' : 'transparent'};
  color: ${props => props.active ? '#2196f3' : '#555'};
  font-weight: ${props => props.active ? '600' : '400'};
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    color: #2196f3;
    background-color: #f5f5f5;
  }
  
  .icon {
    font-size: 16px;
  }
`;

const ContentContainer = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

const DepreciationSection = styled.div`
  padding: 20px;
`;

const DepreciationSummary = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const SummaryCard = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  background: #f8f9fa;
  border-bottom: 1px solid #eee;
  
  h3 {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
    color: #333;
  }
  
  .icon {
    margin-right: 10px;
    font-size: 16px;
    color: #555;
  }
`;

const CardContent = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardValue = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #333;
  margin-bottom: 5px;
`;

const CardPercent = styled.div`
  font-size: 14px;
  color: #777;
`;

const CardSubtext = styled.div`
  font-size: 14px;
  color: #777;
`;

const CardText = styled.div`
  font-size: 14px;
  color: #333;
  text-align: center;
`;

const DepreciationChart = styled.div`
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
`;

const ChartHeader = styled.div`
  padding: 15px;
  background: #f8f9fa;
  border-bottom: 1px solid #eee;
  font-weight: 600;
  color: #333;
`;

const ChartContent = styled.div`
  display: flex;
  padding: 20px;
  height: 300px;
`;

const ChartYAxis = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-right: 15px;
  width: 120px;
`;

const YAxisLabel = styled.div`
  font-size: 12px;
  color: #777;
  transform: rotate(-90deg);
  position: absolute;
  left: -40px;
  top: 50%;
`;

const YAxisTicks = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const YAxisTick = styled.div`
  font-size: 12px;
  color: #777;
  text-align: right;
`;

const ChartBars = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  flex: 1;
  height: 100%;
  border-left: 1px solid #eee;
  border-bottom: 1px solid #eee;
  padding-top: 20px;
`;

const ChartBar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60px;
  height: 100%;
  position: relative;
`;

const BarValue = styled.div`
  font-size: 12px;
  color: #333;
  position: absolute;
  top: -20px;
  white-space: nowrap;
`;

const BarFill = styled.div`
  width: 40px;
  height: ${props => props.height}%;
  background-color: #2196f3;
  border-radius: 3px 3px 0 0;
  margin-top: auto;
`;

const BarLabel = styled.div`
  font-size: 12px;
  color: #777;
  margin-top: 10px;
`;

const TcoSection = styled.div`
  padding: 20px;
`;

const TcoSummary = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const TcoBreakdown = styled.div`
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
`;

const BreakdownContent = styled.div`
  padding: 20px;
`;

const BreakdownPieChart = styled.div`
  margin-bottom: 20px;
`;

const PieChartLegend = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const LegendColor = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 4px;
  background-color: ${props => props.color};
`;

const LegendLabel = styled.div`
  font-size: 14px;
  color: #333;
`;

const BreakdownTable = styled.table`
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
  
  tbody tr:last-child td {
    border-bottom: none;
  }
`;

const ReplacementSection = styled.div`
  padding: 20px;
`;

const ReplacementSummary = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const ReplacementAnalysis = styled.div`
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
`;

const AnalysisHeader = styled.div`
  padding: 15px;
  background: #f8f9fa;
  border-bottom: 1px solid #eee;
  font-weight: 600;
  color: #333;
`;

const AnalysisContent = styled.div`
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 15px;
`;

const AnalysisItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const AnalysisLabel = styled.div`
  font-size: 14px;
  color: #777;
  margin-bottom: 5px;
`;

const AnalysisValue = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;

const AlternativeOptions = styled.div`
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
`;

const OptionsHeader = styled.div`
  padding: 15px;
  background: #f8f9fa;
  border-bottom: 1px solid #eee;
  font-weight: 600;
  color: #333;
`;

const OptionsContent = styled.div`
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const OptionCard = styled.div`
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 15px;
`;

const OptionTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
`;

const OptionCost = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #2196f3;
  margin-bottom: 15px;
`;

const OptionDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const OptionItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const OptionLabel = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: #777;
  margin-bottom: 3px;
`;

const OptionValue = styled.div`
  font-size: 14px;
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

const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
  font-size: 14px;
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

const EmptyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 20px;
  color: #777;
  font-style: italic;
`;

export default AssetAcquisition;
