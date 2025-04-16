import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getCommunicationAnalytics } from '../../services/api/communicationService';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 18px;
  color: #333;
  margin: 0;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;

const FilterLabel = styled.span`
  font-size: 14px;
  color: #666;
`;

const Select = styled.select`
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #ddd;
  outline: none;
  font-size: 14px;
  background-color: white;

  &:focus {
    border-color: #1a73e8;
  }
`;

const DateRangePicker = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const DateInput = styled.input`
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #ddd;
  outline: none;
  font-size: 14px;

  &:focus {
    border-color: #1a73e8;
  }
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: 20px;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const CardTitle = styled.h3`
  font-size: 16px;
  color: #333;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CardIcon = styled.span`
  color: #1a73e8;
`;

const CardValue = styled.div`
  font-size: 32px;
  font-weight: bold;
  color: #1a73e8;
  margin-bottom: 8px;
`;

const CardTrend = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  color: ${props => props.positive ? '#34a853' : props.negative ? '#ea4335' : '#666'};
`;

const TrendIcon = styled.span`
  font-size: 12px;
`;

const ChartContainer = styled.div`
  height: 200px;
  margin-top: 10px;
  position: relative;
`;

const BarChart = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: 100%;
  padding-top: 20px;
`;

const BarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const Bar = styled.div`
  width: 20px;
  height: ${props => props.height}%;
  background-color: ${props => props.color || '#1a73e8'};
  border-radius: 4px 4px 0 0;
  transition: height 0.3s ease;
  position: relative;
  
  &:hover {
    opacity: 0.8;
  }
`;

const BarLabel = styled.div`
  font-size: 12px;
  color: #666;
  margin-top: 5px;
  text-align: center;
`;

const BarValue = styled.div`
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 11px;
  color: #666;
`;

const LineChart = styled.div`
  height: 100%;
  position: relative;
  padding: 20px 0;
`;

const LineChartSvg = styled.svg`
  width: 100%;
  height: 100%;
  overflow: visible;
`;

const LineChartPath = styled.path`
  fill: none;
  stroke: #1a73e8;
  stroke-width: 2;
`;

const LineChartArea = styled.path`
  fill: rgba(26, 115, 232, 0.1);
  stroke: none;
`;

const LineChartDot = styled.circle`
  fill: #1a73e8;
  r: 4;
  
  &:hover {
    r: 6;
    fill: #1765cc;
  }
`;

const LineChartLabel = styled.div`
  position: absolute;
  bottom: 0;
  font-size: 12px;
  color: #666;
  text-align: center;
  width: ${props => props.width}%;
  left: ${props => props.left}%;
  transform: translateX(-50%);
`;

const PieChart = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const PieChartSvg = styled.svg`
  width: 150px;
  height: 150px;
  transform: rotate(-90deg);
`;

const PieChartSlice = styled.circle`
  fill: transparent;
  stroke-width: 30;
  cx: 75;
  cy: 75;
  r: 60;
`;

const Legend = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 15px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #333;
`;

const LegendColor = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 2px;
  background-color: ${props => props.color};
`;

const TableContainer = styled.div`
  grid-column: 1 / -1;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  padding: 12px 15px;
  text-align: left;
  background-color: #f8f9fa;
  color: #333;
  font-weight: bold;
  border-bottom: 1px solid #eee;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f8f9fa;
  }
  
  &:hover {
    background-color: #f0f5ff;
  }
`;

const TableCell = styled.td`
  padding: 12px 15px;
  border-bottom: 1px solid #eee;
`;

const Badge = styled.span`
  display: inline-block;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  background-color: ${props => {
    switch(props.type) {
      case 'driver': return '#e8f0fe';
      case 'customer': return '#e6f4ea';
      case 'team': return '#fff8e6';
      case 'notification': return '#fce8e6';
      default: return '#f1f3f4';
    }
  }};
  color: ${props => {
    switch(props.type) {
      case 'driver': return '#1a73e8';
      case 'customer': return '#34a853';
      case 'team': return '#fbbc04';
      case 'notification': return '#ea4335';
      default: return '#5f6368';
    }
  }};
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #666;
`;

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #ea4335;
`;

const CommunicationAnalytics = ({ useMockData = true }) => {
  const [timeRange, setTimeRange] = useState('7d');
  const [channelFilter, setChannelFilter] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [analyticsData, setAnalyticsData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getCommunicationAnalytics(useMockData, {
          timeRange,
          channel: channelFilter,
          startDate,
          endDate
        });
        setAnalyticsData(data);
      } catch (err) {
        console.error('Error fetching analytics data:', err);
        setError('Nie udało się pobrać danych analitycznych.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, [useMockData, timeRange, channelFilter, startDate, endDate]);

  const handleTimeRangeChange = (e) => {
    setTimeRange(e.target.value);
    // Clear custom date range when selecting a preset
    if (e.target.value !== 'custom') {
      setStartDate('');
      setEndDate('');
    }
  };

  const handleChannelFilterChange = (e) => {
    setChannelFilter(e.target.value);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('pl-PL').format(num);
  };

  const getChannelLabel = (channel) => {
    switch(channel) {
      case 'driver': return 'Kierowcy';
      case 'customer': return 'Klienci';
      case 'team': return 'Zespół';
      case 'notification': return 'Powiadomienia';
      default: return channel;
    }
  };

  const getMaxValue = (data) => {
    return Math.max(...data.map(item => item.value));
  };

  const calculateBarHeight = (value, maxValue) => {
    return (value / maxValue) * 100;
  };

  const generateLineChartPath = (data) => {
    if (!data || data.length === 0) return '';
    
    const maxValue = getMaxValue(data);
    const width = 100 / (data.length - 1);
    
    let path = `M 0,${100 - (data[0].value / maxValue * 100)}`;
    
    for (let i = 1; i < data.length; i++) {
      const x = i * width;
      const y = 100 - (data[i].value / maxValue * 100);
      path += ` L ${x},${y}`;
    }
    
    return path;
  };

  const generateAreaPath = (data) => {
    if (!data || data.length === 0) return '';
    
    const maxValue = getMaxValue(data);
    const width = 100 / (data.length - 1);
    
    let path = `M 0,${100 - (data[0].value / maxValue * 100)}`;
    
    for (let i = 1; i < data.length; i++) {
      const x = i * width;
      const y = 100 - (data[i].value / maxValue * 100);
      path += ` L ${x},${y}`;
    }
    
    path += ` L ${100},100 L 0,100 Z`;
    
    return path;
  };

  const calculatePieChartProps = (data) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let currentPercent = 0;
    
    return data.map(item => {
      const percent = (item.value / total) * 100;
      const startPercent = currentPercent;
      currentPercent += percent;
      
      return {
        ...item,
        percent,
        dashArray: `${percent} ${100 - percent}`,
        dashOffset: -startPercent
      };
    });
  };

  if (isLoading) {
    return <LoadingContainer>Ładowanie danych analitycznych...</LoadingContainer>;
  }

  if (error) {
    return <ErrorContainer>{error}</ErrorContainer>;
  }

  if (!analyticsData) {
    return <LoadingContainer>Brak danych do wyświetlenia</LoadingContainer>;
  }

  const {
    messageStats,
    messageVolume,
    responseTime,
    channelDistribution,
    topPerformers,
    messagesByDay,
    messagesByType
  } = analyticsData;

  const pieChartData = calculatePieChartProps(channelDistribution);

  return (
    <Container>
      <Header>
        <Title>Analityka komunikacji</Title>
        <FilterContainer>
          <FilterLabel>Kanał:</FilterLabel>
          <Select value={channelFilter} onChange={handleChannelFilterChange}>
            <option value="all">Wszystkie kanały</option>
            <option value="driver">Kierowcy</option>
            <option value="customer">Klienci</option>
            <option value="team">Zespół</option>
            <option value="notification">Powiadomienia</option>
          </Select>
          
          <FilterLabel>Okres:</FilterLabel>
          <Select value={timeRange} onChange={handleTimeRangeChange}>
            <option value="7d">Ostatnie 7 dni</option>
            <option value="30d">Ostatnie 30 dni</option>
            <option value="90d">Ostatnie 90 dni</option>
            <option value="year">Ostatni rok</option>
            <option value="custom">Niestandardowy</option>
          </Select>
          
          {timeRange === 'custom' && (
            <DateRangePicker>
              <DateInput 
                type="date" 
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <span>-</span>
              <DateInput 
                type="date" 
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </DateRangePicker>
          )}
        </FilterContainer>
      </Header>

      <DashboardGrid>
        <Card>
          <CardHeader>
            <CardTitle>
              <CardIcon className="icon icon-message"></CardIcon>
              Łączna liczba wiadomości
            </CardTitle>
          </CardHeader>
          <CardValue>{formatNumber(messageStats.total)}</CardValue>
          <CardTrend positive={messageStats.trend > 0} negative={messageStats.trend < 0}>
            <TrendIcon className={`icon ${messageStats.trend > 0 ? 'icon-arrow-up' : messageStats.trend < 0 ? 'icon-arrow-down' : 'icon-minus'}`}></TrendIcon>
            {Math.abs(messageStats.trend)}% {messageStats.trend > 0 ? 'więcej' : messageStats.trend < 0 ? 'mniej' : ''}
          </CardTrend>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <CardIcon className="icon icon-clock"></CardIcon>
              Średni czas odpowiedzi
            </CardTitle>
          </CardHeader>
          <CardValue>{responseTime.average} min</CardValue>
          <CardTrend positive={responseTime.trend < 0} negative={responseTime.trend > 0}>
            <TrendIcon className={`icon ${responseTime.trend < 0 ? 'icon-arrow-down' : responseTime.trend > 0 ? 'icon-arrow-up' : 'icon-minus'}`}></TrendIcon>
            {Math.abs(responseTime.trend)}% {responseTime.trend < 0 ? 'szybciej' : responseTime.trend > 0 ? 'wolniej' : ''}
          </CardTrend>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <CardIcon className="icon icon-check-circle"></CardIcon>
              Wskaźnik rozwiązania
            </CardTitle>
          </CardHeader>
          <CardValue>{messageStats.resolutionRate}%</CardValue>
          <CardTrend positive={messageStats.resolutionTrend > 0} negative={messageStats.resolutionTrend < 0}>
            <TrendIcon className={`icon ${messageStats.resolutionTrend > 0 ? 'icon-arrow-up' : messageStats.resolutionTrend < 0 ? 'icon-arrow-down' : 'icon-minus'}`}></TrendIcon>
            {Math.abs(messageStats.resolutionTrend)}% {messageStats.resolutionTrend > 0 ? 'więcej' : messageStats.resolutionTrend < 0 ? 'mniej' : ''}
          </CardTrend>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <CardIcon className="icon icon-chart-bar"></CardIcon>
              Wolumen wiadomości
            </CardTitle>
          </CardHeader>
          <ChartContainer>
            <BarChart>
              {messageVolume.map((item, index) => (
                <BarContainer key={index}>
                  <Bar 
                    height={calculateBarHeight(item.value, getMaxValue(messageVolume))}
                    color="#1a73e8"
                  >
                    <BarValue>{item.value}</BarValue>
                  </Bar>
                  <BarLabel>{item.label}</BarLabel>
                </BarContainer>
              ))}
            </BarChart>
          </ChartContainer>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <CardIcon className="icon icon-chart-line"></CardIcon>
              Wiadomości dziennie
            </CardTitle>
          </CardHeader>
          <ChartContainer>
            <LineChart>
              <LineChartSvg viewBox="0 0 100 100" preserveAspectRatio="none">
                <LineChartArea d={generateAreaPath(messagesByDay)} />
                <LineChartPath d={generateLineChartPath(messagesByDay)} />
                {messagesByDay.map((item, index) => {
                  const maxValue = getMaxValue(messagesByDay);
                  const width = 100 / (messagesByDay.length - 1);
                  const x = index * width;
                  const y = 100 - (item.value / maxValue * 100);
                  
                  return (
                    <LineChartDot key={index} cx={x} cy={y} />
                  );
                })}
              </LineChartSvg>
              
              {messagesByDay.map((item, index) => {
                const width = 100 / messagesByDay.length;
                const left = index * (100 / (messagesByDay.length - 1));
                
                return (
                  <LineChartLabel key={index} width={width} left={left}>
                    {item.label}
                  </LineChartLabel>
                );
              })}
            </LineChart>
          </ChartContainer>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <CardIcon className="icon icon-chart-pie"></CardIcon>
              Rozkład kanałów
            </CardTitle>
          </CardHeader>
          <ChartContainer>
            <PieChart>
              <PieChartSvg>
                {pieChartData.map((item, index) => (
                  <PieChartSlice 
                    key={index}
                    stroke={item.color}
                    strokeDasharray={item.dashArray}
                    strokeDashoffset={item.dashOffset}
                  />
                ))}
              </PieChartSvg>
            </PieChart>
            <Legend>
              {pieChartData.map((item, index) => (
                <LegendItem key={index}>
                  <LegendColor color={item.color} />
                  {getChannelLabel(item.channel)} ({item.percent.toFixed(1)}%)
                </LegendItem>
              ))}
            </Legend>
          </ChartContainer>
        </Card>

        <TableContainer>
          <Table>
            <thead>
              <tr>
                <TableHeader>Użytkownik</TableHeader>
                <TableHeader>Kanał</TableHeader>
                <TableHeader>Wiadomości</TableHeader>
                <TableHeader>Średni czas odpowiedzi</TableHeader>
                <TableHeader>Wskaźnik rozwiązania</TableHeader>
              </tr>
            </thead>
            <tbody>
              {topPerformers.map((performer, index) => (
                <TableRow key={index}>
                  <TableCell>{performer.name}</TableCell>
                  <TableCell>
                    <Badge type={performer.channel}>{getChannelLabel(performer.channel)}</Badge>
                  </TableCell>
                  <TableCell>{performer.messages}</TableCell>
                  <TableCell>{performer.responseTime} min</TableCell>
                  <TableCell>{performer.resolutionRate}%</TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </TableContainer>

        <TableContainer>
          <Table>
            <thead>
              <tr>
                <TableHeader>Typ wiadomości</TableHeader>
                <TableHeader>Ilość</TableHeader>
                <TableHeader>Procent</TableHeader>
                <TableHeader>Trend</TableHeader>
              </tr>
            </thead>
            <tbody>
              {messagesByType.map((type, index) => (
                <TableRow key={index}>
                  <TableCell>{type.name}</TableCell>
                  <TableCell>{type.count}</TableCell>
                  <TableCell>{type.percentage}%</TableCell>
                  <TableCell>
                    <CardTrend positive={type.trend > 0} negative={type.trend < 0}>
                      <TrendIcon className={`icon ${type.trend > 0 ? 'icon-arrow-up' : type.trend < 0 ? 'icon-arrow-down' : 'icon-minus'}`}></TrendIcon>
                      {Math.abs(type.trend)}%
                    </CardTrend>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      </DashboardGrid>
    </Container>
  );
};

export default CommunicationAnalytics;
