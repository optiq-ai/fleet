import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getAssetDashboard } from '../../services/api/mockAssetManagementService';
import './IconStyles.css';

const AssetDashboard = ({ timeRange = 'month' }) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const data = await getAssetDashboard({ timeRange });
        setDashboardData(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching asset dashboard data:', err);
        setError('Nie udało się pobrać danych dashboardu. Spróbuj ponownie później.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [timeRange]);

  if (isLoading) {
    return <LoadingContainer>Ładowanie danych dashboardu...</LoadingContainer>;
  }

  if (error) {
    return <ErrorContainer>{error}</ErrorContainer>;
  }

  if (!dashboardData) {
    return <EmptyContainer>Brak danych do wyświetlenia</EmptyContainer>;
  }

  return (
    <DashboardContainer>
      <DashboardHeader>
        <h2>Dashboard Zarządzania Aktywami</h2>
        <TimeRangeSelector>
          <span>Zakres czasu: </span>
          <select defaultValue={timeRange}>
            <option value="day">Dzień</option>
            <option value="week">Tydzień</option>
            <option value="month">Miesiąc</option>
            <option value="year">Rok</option>
          </select>
        </TimeRangeSelector>
      </DashboardHeader>

      <DashboardGrid>
        {/* Asset Counts Card */}
        <DashboardCard>
          <CardHeader>
            <span className="icon icon-file"></span>
            <h3>Podsumowanie Aktywów</h3>
          </CardHeader>
          <CardContent>
            <StatItem>
              <StatLabel>Łącznie aktywów:</StatLabel>
              <StatValue>{dashboardData.assetCounts.total}</StatValue>
            </StatItem>
            <StatGroup>
              <StatTitle>Według typu:</StatTitle>
              <StatList>
                <StatItem>
                  <StatLabel>Pojazdy:</StatLabel>
                  <StatValue>{dashboardData.assetCounts.byType.vehicle}</StatValue>
                </StatItem>
                <StatItem>
                  <StatLabel>Sprzęt:</StatLabel>
                  <StatValue>{dashboardData.assetCounts.byType.equipment}</StatValue>
                </StatItem>
                <StatItem>
                  <StatLabel>Narzędzia:</StatLabel>
                  <StatValue>{dashboardData.assetCounts.byType.tool}</StatValue>
                </StatItem>
                <StatItem>
                  <StatLabel>Części:</StatLabel>
                  <StatValue>{dashboardData.assetCounts.byType.part}</StatValue>
                </StatItem>
                <StatItem>
                  <StatLabel>Akcesoria:</StatLabel>
                  <StatValue>{dashboardData.assetCounts.byType.accessory}</StatValue>
                </StatItem>
              </StatList>
            </StatGroup>
            <StatGroup>
              <StatTitle>Według statusu:</StatTitle>
              <StatList>
                <StatItem>
                  <StatLabel>Aktywne:</StatLabel>
                  <StatValue>{dashboardData.assetCounts.byStatus.active}</StatValue>
                </StatItem>
                <StatItem>
                  <StatLabel>W konserwacji:</StatLabel>
                  <StatValue>{dashboardData.assetCounts.byStatus.maintenance}</StatValue>
                </StatItem>
                <StatItem>
                  <StatLabel>Nieaktywne:</StatLabel>
                  <StatValue>{dashboardData.assetCounts.byStatus.inactive}</StatValue>
                </StatItem>
                <StatItem>
                  <StatLabel>Wycofane:</StatLabel>
                  <StatValue>{dashboardData.assetCounts.byStatus.disposed}</StatValue>
                </StatItem>
              </StatList>
            </StatGroup>
          </CardContent>
        </DashboardCard>

        {/* Maintenance Alerts Card */}
        <DashboardCard>
          <CardHeader>
            <span className="icon icon-bell"></span>
            <h3>Alerty Konserwacji</h3>
          </CardHeader>
          <CardContent>
            {dashboardData.maintenanceAlerts.length > 0 ? (
              <AlertList>
                {dashboardData.maintenanceAlerts.map(alert => (
                  <AlertItem key={alert.id} priority={alert.priority}>
                    <AlertIcon priority={alert.priority}>
                      <span className="icon icon-bell"></span>
                    </AlertIcon>
                    <AlertContent>
                      <AlertTitle>{alert.assetName}</AlertTitle>
                      <AlertDescription>{alert.description}</AlertDescription>
                      {alert.dueDate && (
                        <AlertDate>Termin: {alert.dueDate}</AlertDate>
                      )}
                    </AlertContent>
                  </AlertItem>
                ))}
              </AlertList>
            ) : (
              <EmptyMessage>Brak alertów konserwacji</EmptyMessage>
            )}
          </CardContent>
        </DashboardCard>

        {/* Utilization Stats Card */}
        <DashboardCard>
          <CardHeader>
            <span className="icon icon-chart"></span>
            <h3>Statystyki Wykorzystania</h3>
          </CardHeader>
          <CardContent>
            <StatItem>
              <StatLabel>Średnie wykorzystanie:</StatLabel>
              <StatValue>{dashboardData.utilizationStats.averageUtilization}%</StatValue>
            </StatItem>
            <StatItem>
              <StatLabel>Niedostatecznie wykorzystane aktywa:</StatLabel>
              <StatValue>{dashboardData.utilizationStats.underutilizedAssets}</StatValue>
            </StatItem>
            <StatItem>
              <StatLabel>Nadmiernie wykorzystane aktywa:</StatLabel>
              <StatValue>{dashboardData.utilizationStats.overutilizedAssets}</StatValue>
            </StatItem>
            <StatGroup>
              <StatTitle>Wykorzystanie według typu:</StatTitle>
              <UtilizationBars>
                {Object.entries(dashboardData.utilizationStats.utilizationByType)
                  .filter(([_, value]) => value > 0)
                  .map(([type, value]) => (
                    <UtilizationBar key={type}>
                      <UtilizationLabel>
                        {type === 'vehicle' ? 'Pojazdy' :
                         type === 'equipment' ? 'Sprzęt' :
                         type === 'tool' ? 'Narzędzia' :
                         type === 'part' ? 'Części' :
                         type === 'accessory' ? 'Akcesoria' : type}:
                      </UtilizationLabel>
                      <UtilizationBarContainer>
                        <UtilizationBarFill percentage={value} />
                        <UtilizationValue>{value}%</UtilizationValue>
                      </UtilizationBarContainer>
                    </UtilizationBar>
                  ))}
              </UtilizationBars>
            </StatGroup>
          </CardContent>
        </DashboardCard>

        {/* Cost Summary Card */}
        <DashboardCard>
          <CardHeader>
            <span className="icon icon-money"></span>
            <h3>Podsumowanie Kosztów</h3>
          </CardHeader>
          <CardContent>
            <StatItem>
              <StatLabel>Łączne koszty:</StatLabel>
              <StatValue>{dashboardData.costSummary.totalCosts.toLocaleString()} PLN</StatValue>
            </StatItem>
            <StatGroup>
              <StatTitle>Według typu:</StatTitle>
              <StatList>
                {Object.entries(dashboardData.costSummary.byType).map(([type, amount]) => (
                  <StatItem key={type}>
                    <StatLabel>
                      {type === 'purchase' ? 'Zakup' :
                       type === 'maintenance' ? 'Konserwacja' :
                       type === 'repair' ? 'Naprawa' :
                       type === 'insurance' ? 'Ubezpieczenie' :
                       type === 'tax' ? 'Podatki' :
                       type === 'fuel' ? 'Paliwo' :
                       type === 'other' ? 'Inne' : type}:
                    </StatLabel>
                    <StatValue>{amount.toLocaleString()} PLN</StatValue>
                  </StatItem>
                ))}
              </StatList>
            </StatGroup>
            <StatGroup>
              <StatTitle>Trend miesięczny:</StatTitle>
              <CostTrendChart>
                {dashboardData.costSummary.monthlyTrend.map((month, index) => (
                  <CostTrendBar key={month.month}>
                    <CostTrendBarFill 
                      height={Math.max(
                        5,
                        (month.amount / Math.max(...dashboardData.costSummary.monthlyTrend.map(m => m.amount))) * 100
                      )}
                    />
                    <CostTrendMonth>{month.month.split('-')[1]}</CostTrendMonth>
                  </CostTrendBar>
                ))}
              </CostTrendChart>
            </StatGroup>
          </CardContent>
        </DashboardCard>

        {/* Warranty Expirations Card */}
        <DashboardCard>
          <CardHeader>
            <span className="icon icon-calendar"></span>
            <h3>Wygasające Gwarancje</h3>
          </CardHeader>
          <CardContent>
            {dashboardData.warrantyExpirations.length > 0 ? (
              <WarrantyList>
                {dashboardData.warrantyExpirations.map(warranty => (
                  <WarrantyItem key={warranty.assetId}>
                    <WarrantyAsset>{warranty.assetName}</WarrantyAsset>
                    <WarrantyDetails>
                      <WarrantyDate>Data wygaśnięcia: {warranty.expiryDate}</WarrantyDate>
                      <WarrantyDays days={warranty.daysRemaining}>
                        Pozostało dni: {warranty.daysRemaining}
                      </WarrantyDays>
                    </WarrantyDetails>
                  </WarrantyItem>
                ))}
              </WarrantyList>
            ) : (
              <EmptyMessage>Brak zbliżających się wygaśnięć gwarancji</EmptyMessage>
            )}
          </CardContent>
        </DashboardCard>

        {/* Recent Activities Card */}
        <DashboardCard>
          <CardHeader>
            <span className="icon icon-history"></span>
            <h3>Ostatnie Aktywności</h3>
          </CardHeader>
          <CardContent>
            {dashboardData.recentActivities.length > 0 ? (
              <ActivityList>
                {dashboardData.recentActivities.map(activity => (
                  <ActivityItem key={activity.id}>
                    <ActivityIcon>
                      <span className={`icon icon-${
                        activity.type === 'maintenance' ? 'tools' :
                        activity.type === 'status_change' ? 'refresh' :
                        activity.type === 'assignment' ? 'link' :
                        activity.type === 'creation' ? 'plus' :
                        activity.type === 'update' ? 'edit' :
                        'history'
                      }`}></span>
                    </ActivityIcon>
                    <ActivityContent>
                      <ActivityDescription>{activity.description}</ActivityDescription>
                      <ActivityMeta>
                        <ActivityAsset>{activity.assetName}</ActivityAsset>
                        <ActivityUser>Wykonał: {activity.performedBy}</ActivityUser>
                        <ActivityDate>
                          {new Date(activity.date).toLocaleString('pl-PL', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </ActivityDate>
                      </ActivityMeta>
                    </ActivityContent>
                  </ActivityItem>
                ))}
              </ActivityList>
            ) : (
              <EmptyMessage>Brak ostatnich aktywności</EmptyMessage>
            )}
          </CardContent>
        </DashboardCard>
      </DashboardGrid>
    </DashboardContainer>
  );
};

// Styled Components
const DashboardContainer = styled.div`
  padding: 20px;
  width: 100%;
`;

const DashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  
  h2 {
    margin: 0;
    color: #333;
  }
`;

const TimeRangeSelector = styled.div`
  display: flex;
  align-items: center;
  
  span {
    margin-right: 10px;
    font-weight: 500;
  }
  
  select {
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: white;
    font-size: 14px;
  }
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const DashboardCard = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 20px;
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

const StatGroup = styled.div`
  margin-top: 15px;
`;

const StatTitle = styled.h4`
  margin: 0 0 10px 0;
  font-size: 14px;
  font-weight: 600;
  color: #555;
`;

const StatList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StatItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
`;

const StatLabel = styled.span`
  color: #555;
`;

const StatValue = styled.span`
  font-weight: 600;
  color: #333;
`;

const AlertList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const AlertItem = styled.div`
  display: flex;
  padding: 12px;
  border-radius: 6px;
  background-color: ${props => 
    props.priority === 'high' ? '#fff8f8' : 
    props.priority === 'medium' ? '#fffcf5' : 
    '#f8f9fa'};
  border-left: 4px solid ${props => 
    props.priority === 'high' ? '#e53935' : 
    props.priority === 'medium' ? '#ff9800' : 
    '#4caf50'};
`;

const AlertIcon = styled.div`
  margin-right: 12px;
  
  .icon {
    font-size: 18px;
    color: ${props => 
      props.priority === 'high' ? '#e53935' : 
      props.priority === 'medium' ? '#ff9800' : 
      '#4caf50'};
  }
`;

const AlertContent = styled.div`
  flex: 1;
`;

const AlertTitle = styled.div`
  font-weight: 600;
  margin-bottom: 4px;
`;

const AlertDescription = styled.div`
  font-size: 14px;
  color: #555;
`;

const AlertDate = styled.div`
  font-size: 12px;
  color: #777;
  margin-top: 4px;
`;

const UtilizationBars = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
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
  background-color: ${props => {
    if (props.percentage < 30) return '#e53935';
    if (props.percentage < 70) return '#ff9800';
    return '#4caf50';
  }};
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

const CostTrendChart = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 100px;
  margin-top: 10px;
`;

const CostTrendBar = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

const CostTrendBarFill = styled.div`
  width: 20px;
  height: ${props => props.height}%;
  background-color: #2196f3;
  border-radius: 3px 3px 0 0;
`;

const CostTrendMonth = styled.div`
  margin-top: 5px;
  font-size: 12px;
  color: #777;
`;

const WarrantyList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const WarrantyItem = styled.div`
  padding: 12px;
  border-radius: 6px;
  background-color: #f8f9fa;
  border: 1px solid #eee;
`;

const WarrantyAsset = styled.div`
  font-weight: 600;
  margin-bottom: 8px;
`;

const WarrantyDetails = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
`;

const WarrantyDate = styled.div`
  color: #555;
`;

const WarrantyDays = styled.div`
  font-weight: 600;
  color: ${props => {
    if (props.days < 30) return '#e53935';
    if (props.days < 90) return '#ff9800';
    return '#4caf50';
  }};
`;

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ActivityItem = styled.div`
  display: flex;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    padding-bottom: 0;
    border-bottom: none;
  }
`;

const ActivityIcon = styled.div`
  margin-right: 15px;
  
  .icon {
    font-size: 18px;
    color: #2196f3;
  }
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityDescription = styled.div`
  font-weight: 500;
  margin-bottom: 5px;
`;

const ActivityMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 12px;
  color: #777;
`;

const ActivityAsset = styled.div``;

const ActivityUser = styled.div``;

const ActivityDate = styled.div``;

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

export default AssetDashboard;
