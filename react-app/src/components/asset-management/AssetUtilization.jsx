import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  getAssetUtilization,
  getAssets,
  getAssetCategories
} from '../../services/api/mockAssetManagementService';
import './IconStyles.css';

const AssetUtilization = () => {
  const [utilizationData, setUtilizationData] = useState(null);
  const [assets, setAssets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    assetId: '',
    type: '',
    category: ''
  });
  const [activeTab, setActiveTab] = useState('summary');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch utilization data with filters
        const utilization = await getAssetUtilization(filters);
        setUtilizationData(utilization);
        
        // Fetch assets for filter dropdown
        const assetsData = await getAssets();
        setAssets(assetsData.assets);
        
        // Fetch categories for filter dropdown
        const categoriesData = await getAssetCategories();
        setCategories(categoriesData);
        
        setError(null);
      } catch (err) {
        console.error('Error fetching asset utilization data:', err);
        setError('Nie udało się pobrać danych wykorzystania aktywów. Spróbuj ponownie później.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [filters]);

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const getUtilizationColor = (percentage) => {
    if (percentage < 30) return '#e53935'; // Low utilization - red
    if (percentage < 70) return '#ff9800'; // Medium utilization - orange
    return '#4caf50'; // High utilization - green
  };

  const getUtilizationLabel = (percentage) => {
    if (percentage < 30) return 'Niskie';
    if (percentage < 70) return 'Średnie';
    return 'Wysokie';
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'vehicle':
        return 'Pojazdy';
      case 'equipment':
        return 'Sprzęt';
      case 'tool':
        return 'Narzędzia';
      case 'part':
        return 'Części';
      case 'accessory':
        return 'Akcesoria';
      default:
        return type;
    }
  };

  if (isLoading && !utilizationData) {
    return <LoadingContainer>Ładowanie danych wykorzystania aktywów...</LoadingContainer>;
  }

  if (error) {
    return <ErrorContainer>{error}</ErrorContainer>;
  }

  if (!utilizationData) {
    return <EmptyContainer>Brak danych do wyświetlenia</EmptyContainer>;
  }

  return (
    <UtilizationContainer>
      <UtilizationHeader>
        <h2>Wykorzystanie Aktywów</h2>
      </UtilizationHeader>

      <FiltersContainer>
        <FilterGroup>
          <FilterLabel>Aktywo:</FilterLabel>
          <FilterSelect 
            value={filters.assetId} 
            onChange={(e) => handleFilterChange('assetId', e.target.value)}
          >
            <option value="">Wszystkie aktywa</option>
            {assets.map(asset => (
              <option key={asset.id} value={asset.id}>
                {asset.name}
              </option>
            ))}
          </FilterSelect>
        </FilterGroup>

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
      </FiltersContainer>

      <TabsContainer>
        <TabButton 
          active={activeTab === 'summary'} 
          onClick={() => handleTabChange('summary')}
        >
          <span className="icon icon-chart"></span> Podsumowanie
        </TabButton>
        <TabButton 
          active={activeTab === 'details'} 
          onClick={() => handleTabChange('details')}
        >
          <span className="icon icon-list"></span> Szczegóły
        </TabButton>
        <TabButton 
          active={activeTab === 'recommendations'} 
          onClick={() => handleTabChange('recommendations')}
        >
          <span className="icon icon-lightbulb"></span> Rekomendacje
        </TabButton>
      </TabsContainer>

      <ContentContainer>
        {activeTab === 'summary' && (
          <SummarySection>
            <SummaryCard>
              <CardHeader>
                <span className="icon icon-chart"></span>
                <h3>Średnie wykorzystanie</h3>
              </CardHeader>
              <CardContent>
                <UtilizationGauge percentage={utilizationData.summary.averageUtilization}>
                  <GaugeValue>{utilizationData.summary.averageUtilization}%</GaugeValue>
                  <GaugeLabel>
                    {getUtilizationLabel(utilizationData.summary.averageUtilization)}
                  </GaugeLabel>
                </UtilizationGauge>
              </CardContent>
            </SummaryCard>

            <SummaryCard>
              <CardHeader>
                <span className="icon icon-chart"></span>
                <h3>Wykorzystanie według typu</h3>
              </CardHeader>
              <CardContent>
                <UtilizationBars>
                  {Object.entries(utilizationData.summary.utilizationByType)
                    .filter(([_, value]) => value > 0)
                    .map(([type, value]) => (
                      <UtilizationBar key={type}>
                        <UtilizationLabel>
                          {getTypeLabel(type)}:
                        </UtilizationLabel>
                        <UtilizationBarContainer>
                          <UtilizationBarFill 
                            percentage={value} 
                            color={getUtilizationColor(value)}
                          />
                          <UtilizationValue>{value}%</UtilizationValue>
                        </UtilizationBarContainer>
                      </UtilizationBar>
                    ))}
                </UtilizationBars>
              </CardContent>
            </SummaryCard>

            <SummaryCard>
              <CardHeader>
                <span className="icon icon-chart"></span>
                <h3>Wykorzystanie według kategorii</h3>
              </CardHeader>
              <CardContent>
                <UtilizationBars>
                  {Object.entries(utilizationData.summary.utilizationByCategory)
                    .filter(([_, value]) => value > 0)
                    .map(([category, value]) => {
                      const categoryObj = categories.find(cat => cat.code === category);
                      const categoryName = categoryObj ? categoryObj.name : category;
                      
                      return (
                        <UtilizationBar key={category}>
                          <UtilizationLabel>
                            {categoryName}:
                          </UtilizationLabel>
                          <UtilizationBarContainer>
                            <UtilizationBarFill 
                              percentage={value} 
                              color={getUtilizationColor(value)}
                            />
                            <UtilizationValue>{value}%</UtilizationValue>
                          </UtilizationBarContainer>
                        </UtilizationBar>
                      );
                    })}
                </UtilizationBars>
              </CardContent>
            </SummaryCard>

            <SummaryCard fullWidth>
              <CardHeader>
                <span className="icon icon-chart"></span>
                <h3>Trend wykorzystania</h3>
              </CardHeader>
              <CardContent>
                <TrendChart>
                  {utilizationData.summary.utilizationTrend.map((item, index) => (
                    <TrendBar key={item.month}>
                      <TrendBarFill 
                        height={item.utilization} 
                        color={getUtilizationColor(item.utilization)}
                      />
                      <TrendBarLabel>{item.month.split('-')[1]}/{item.month.split('-')[0].substring(2)}</TrendBarLabel>
                      <TrendBarValue>{item.utilization}%</TrendBarValue>
                    </TrendBar>
                  ))}
                </TrendChart>
              </CardContent>
            </SummaryCard>
          </SummarySection>
        )}

        {activeTab === 'details' && (
          <DetailsSection>
            <DetailsTable>
              <thead>
                <tr>
                  <th>Aktywo</th>
                  <th>Wykorzystanie</th>
                  <th>Godziny użycia</th>
                  <th>Dostępne godziny</th>
                  <th>Przestój</th>
                  <th>Powód przestoju</th>
                </tr>
              </thead>
              <tbody>
                {utilizationData.assetUtilization.map(item => (
                  <tr key={item.assetId}>
                    <td>{item.assetName}</td>
                    <td>
                      <UtilizationCell>
                        <UtilizationIndicator 
                          percentage={item.utilization}
                          color={getUtilizationColor(item.utilization)}
                        />
                        <UtilizationPercentage>{item.utilization}%</UtilizationPercentage>
                      </UtilizationCell>
                    </td>
                    <td>{item.hoursUsed} h</td>
                    <td>{item.totalAvailableHours} h</td>
                    <td>{item.downtimeHours} h ({Math.round(item.downtimeHours / item.totalAvailableHours * 100)}%)</td>
                    <td>{item.downtimeReason}</td>
                  </tr>
                ))}
              </tbody>
            </DetailsTable>
          </DetailsSection>
        )}

        {activeTab === 'recommendations' && (
          <RecommendationsSection>
            {utilizationData.recommendations.length > 0 ? (
              <RecommendationsList>
                {utilizationData.recommendations.map(recommendation => (
                  <RecommendationCard key={recommendation.assetId}>
                    <RecommendationHeader>
                      <RecommendationAsset>{recommendation.assetName}</RecommendationAsset>
                      <RecommendationPriority priority={recommendation.priority}>
                        {recommendation.priority === 'high' ? 'Wysoki priorytet' : 
                         recommendation.priority === 'medium' ? 'Średni priorytet' : 
                         'Niski priorytet'}
                      </RecommendationPriority>
                    </RecommendationHeader>
                    <RecommendationContent>
                      <RecommendationText>{recommendation.recommendation}</RecommendationText>
                      <RecommendationMetrics>
                        <RecommendationMetric>
                          <RecommendationMetricLabel>Potencjalny wzrost wykorzystania:</RecommendationMetricLabel>
                          <RecommendationMetricValue>+{recommendation.potentialUtilizationIncrease}%</RecommendationMetricValue>
                        </RecommendationMetric>
                      </RecommendationMetrics>
                    </RecommendationContent>
                    <RecommendationActions>
                      <RecommendationButton>
                        <span className="icon icon-check"></span> Zastosuj
                      </RecommendationButton>
                      <RecommendationButton secondary>
                        <span className="icon icon-times"></span> Odrzuć
                      </RecommendationButton>
                    </RecommendationActions>
                  </RecommendationCard>
                ))}
              </RecommendationsList>
            ) : (
              <EmptyMessage>Brak rekomendacji dla wybranych aktywów</EmptyMessage>
            )}
          </RecommendationsSection>
        )}
      </ContentContainer>
    </UtilizationContainer>
  );
};

// Styled Components
const UtilizationContainer = styled.div`
  padding: 20px;
  width: 100%;
`;

const UtilizationHeader = styled.div`
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

const SummarySection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
`;

const SummaryCard = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  width: ${props => props.fullWidth ? '100%' : 'calc(33.333% - 14px)'};
  
  @media (max-width: 1200px) {
    width: ${props => props.fullWidth ? '100%' : 'calc(50% - 10px)'};
  }
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  background: #f8f9fa;
  border-bottom: 1px solid #eee;
  
  h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    color: #333;
  }
  
  .icon {
    margin-right: 10px;
    font-size: 18px;
    color: #555;
  }
`;

const CardContent = styled.div`
  padding: 20px;
`;

const UtilizationGauge = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  margin: 0 auto;
  border-radius: 50%;
  background: #f5f5f5;
  background-image: ${props => {
    // Inline color calculation
    let color = '#4caf50'; // default green
    if (props.percentage < 30) color = '#e53935'; // red
    else if (props.percentage < 70) color = '#ff9800'; // orange
    
    return `conic-gradient(
      ${color} ${props.percentage}%,
      #f5f5f5 ${props.percentage}%
    )`;
  }};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  &::before {
    content: '';
    position: absolute;
    width: 110px;
    height: 110px;
    background: white;
    border-radius: 50%;
  }
`;

const GaugeValue = styled.div`
  position: relative;
  font-size: 24px;
  font-weight: 700;
  color: #333;
`;

const GaugeLabel = styled.div`
  position: relative;
  font-size: 14px;
  color: #777;
  margin-top: 5px;
`;

const UtilizationBars = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const UtilizationBar = styled.div`
  display: flex;
  align-items: center;
`;

const UtilizationLabel = styled.span`
  width: 100px;
  font-size: 14px;
  color: #555;
`;

const UtilizationBarContainer = styled.div`
  flex: 1;
  height: 20px;
  background-color: #f0f0f0;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
`;

const UtilizationBarFill = styled.div`
  height: 100%;
  width: ${props => props.percentage}%;
  background-color: ${props => props.color || '#2196f3'};
  border-radius: 10px;
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

const TrendChart = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 200px;
  padding: 20px 0;
`;

const TrendBar = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  position: relative;
`;

const TrendBarFill = styled.div`
  width: 30px;
  height: ${props => props.height}%;
  background-color: ${props => props.color || '#2196f3'};
  border-radius: 3px 3px 0 0;
`;

const TrendBarLabel = styled.div`
  margin-top: 10px;
  font-size: 12px;
  color: #777;
`;

const TrendBarValue = styled.div`
  position: absolute;
  top: ${props => 100 - props.height}%;
  transform: translateY(-120%);
  font-size: 12px;
  font-weight: 600;
  color: #333;
`;

const DetailsSection = styled.div`
  padding: 20px;
`;

const DetailsTable = styled.table`
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

const UtilizationCell = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const UtilizationIndicator = styled.div`
  width: 40px;
  height: 8px;
  background-color: ${props => props.color || '#9e9e9e'};
  border-radius: 4px;
`;

const UtilizationPercentage = styled.span`
  font-weight: 600;
`;

const RecommendationsSection = styled.div`
  padding: 20px;
`;

const RecommendationsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const RecommendationCard = styled.div`
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
`;

const RecommendationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #eee;
`;

const RecommendationAsset = styled.div`
  font-weight: 600;
  color: #333;
`;

const RecommendationPriority = styled.div`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  color: white;
  background-color: ${props => 
    props.priority === 'high' ? '#e53935' : 
    props.priority === 'medium' ? '#ff9800' : 
    '#4caf50'};
`;

const RecommendationContent = styled.div`
  padding: 15px;
`;

const RecommendationText = styled.div`
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 15px;
`;

const RecommendationMetrics = styled.div`
  display: flex;
  gap: 20px;
  background-color: #f8f9fa;
  padding: 10px;
  border-radius: 4px;
`;

const RecommendationMetric = styled.div`
  display: flex;
  flex-direction: column;
`;

const RecommendationMetricLabel = styled.div`
  font-size: 12px;
  color: #777;
`;

const RecommendationMetricValue = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #4caf50;
`;

const RecommendationActions = styled.div`
  display: flex;
  gap: 10px;
  padding: 15px;
  border-top: 1px solid #eee;
`;

const RecommendationButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background-color: ${props => props.secondary ? '#f5f5f5' : '#2196f3'};
  color: ${props => props.secondary ? '#333' : 'white'};
  border: ${props => props.secondary ? '1px solid #ddd' : 'none'};
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.secondary ? '#e0e0e0' : '#1976d2'};
  }
  
  .icon {
    font-size: 14px;
  }
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

const EmptyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  font-size: 16px;
  color: #777;
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 20px;
  color: #777;
  font-style: italic;
`;

export default AssetUtilization;
