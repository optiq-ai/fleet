/**
 * Mock driver safety service with sample data
 * Used when backend is not available
 */

// Delay function to simulate network latency
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Mock driver safety service class
 */
class MockDriverSafetyService {
  /**
   * Get safety alerts
   * @param {string} [type] - Alert type filter
   * @param {string} [time] - Time filter
   * @param {string} [search] - Search term
   * @param {number} [page=1] - Page number
   * @param {number} [limit=10] - Results per page
   * @returns {Promise<Object>} Safety alerts response
   */
  async getAlerts(
    type,
    time,
    search,
    page = 1,
    limit = 10
  ) {
    await delay(800);
    
    // Sample alerts data
    const allAlerts = [
      {
        id: 'alert-001',
        type: 'fatigue',
        driver: 'Jan Kowalski',
        description: 'Wykryto oznaki zmęczenia kierowcy',
        time: '2025-04-14 08:23',
        location: 'Warszawa, ul. Marszałkowska',
        status: 'new'
      },
      {
        id: 'alert-002',
        type: 'distraction',
        driver: 'Anna Nowak',
        description: 'Wykryto rozproszenie uwagi - korzystanie z telefonu',
        time: '2025-04-14 09:45',
        location: 'Kraków, ul. Floriańska',
        status: 'inProgress'
      },
      {
        id: 'alert-003',
        type: 'style',
        driver: 'Piotr Wiśniewski',
        description: 'Gwałtowne hamowanie',
        time: '2025-04-14 10:12',
        location: 'Gdańsk, ul. Długa',
        status: 'closed'
      },
      {
        id: 'alert-004',
        type: 'collision',
        driver: 'Magdalena Kaczmarek',
        description: 'Ostrzeżenie o ryzyku kolizji - zbyt mała odległość',
        time: '2025-04-14 11:30',
        location: 'Poznań, ul. Półwiejska',
        status: 'new'
      },
      {
        id: 'alert-005',
        type: 'fatigue',
        driver: 'Tomasz Lewandowski',
        description: 'Wykryto oznaki zmęczenia - częste ziewanie',
        time: '2025-04-14 12:15',
        location: 'Wrocław, ul. Świdnicka',
        status: 'new'
      },
      {
        id: 'alert-006',
        type: 'distraction',
        driver: 'Katarzyna Zielińska',
        description: 'Wykryto rozproszenie uwagi - jedzenie podczas jazdy',
        time: '2025-04-14 13:40',
        location: 'Łódź, ul. Piotrkowska',
        status: 'inProgress'
      },
      {
        id: 'alert-007',
        type: 'style',
        driver: 'Michał Szymański',
        description: 'Gwałtowne przyspieszanie',
        time: '2025-04-14 14:22',
        location: 'Szczecin, ul. Monte Cassino',
        status: 'closed'
      },
      {
        id: 'alert-008',
        type: 'collision',
        driver: 'Aleksandra Woźniak',
        description: 'Ostrzeżenie o ryzyku kolizji - nagła zmiana pasa',
        time: '2025-04-14 15:10',
        location: 'Bydgoszcz, ul. Gdańska',
        status: 'new'
      },
      {
        id: 'alert-009',
        type: 'fatigue',
        driver: 'Krzysztof Dąbrowski',
        description: 'Wykryto oznaki zmęczenia - zamykanie oczu',
        time: '2025-04-14 16:05',
        location: 'Lublin, ul. Krakowskie Przedmieście',
        status: 'inProgress'
      },
      {
        id: 'alert-010',
        type: 'distraction',
        driver: 'Monika Kozłowska',
        description: 'Wykryto rozproszenie uwagi - rozmowa przez telefon',
        time: '2025-04-14 17:30',
        location: 'Białystok, ul. Lipowa',
        status: 'new'
      },
      {
        id: 'alert-011',
        type: 'style',
        driver: 'Grzegorz Jankowski',
        description: 'Przekroczenie prędkości o 20 km/h',
        time: '2025-04-14 18:15',
        location: 'Katowice, ul. Mariacka',
        status: 'closed'
      },
      {
        id: 'alert-012',
        type: 'collision',
        driver: 'Joanna Majewska',
        description: 'Ostrzeżenie o ryzyku kolizji - niezachowanie bezpiecznej odległości',
        time: '2025-04-14 19:40',
        location: 'Gdynia, ul. Świętojańska',
        status: 'new'
      },
      {
        id: 'alert-013',
        type: 'fatigue',
        driver: 'Paweł Wojciechowski',
        description: 'Wykryto oznaki zmęczenia - opóźniona reakcja',
        time: '2025-04-14 20:25',
        location: 'Częstochowa, Aleja NMP',
        status: 'inProgress'
      },
      {
        id: 'alert-014',
        type: 'distraction',
        driver: 'Natalia Kamińska',
        description: 'Wykryto rozproszenie uwagi - obsługa radia',
        time: '2025-04-14 21:10',
        location: 'Radom, ul. Żeromskiego',
        status: 'closed'
      },
      {
        id: 'alert-015',
        type: 'style',
        driver: 'Marcin Piotrowski',
        description: 'Gwałtowne skręcanie',
        time: '2025-04-14 22:05',
        location: 'Toruń, ul. Szeroka',
        status: 'new'
      }
    ];
    
    // Filter by type if specified
    let filteredAlerts = allAlerts;
    if (type && type !== 'all') {
      filteredAlerts = filteredAlerts.filter(alert => alert.type === type);
    }
    
    // Filter by time if specified
    if (time && time !== 'all') {
      const timeMap = {
        'morning': '08:00',
        'afternoon': '12:00',
        'evening': '18:00'
      };
      
      if (timeMap[time]) {
        const timeHour = parseInt(timeMap[time].split(':')[0]);
        filteredAlerts = filteredAlerts.filter(alert => {
          const alertHour = parseInt(alert.time.split(' ')[1].split(':')[0]);
          
          if (time === 'morning') return alertHour >= 6 && alertHour < 12;
          if (time === 'afternoon') return alertHour >= 12 && alertHour < 18;
          if (time === 'evening') return alertHour >= 18 || alertHour < 6;
          
          return true;
        });
      }
    }
    
    // Filter by search term if specified
    if (search) {
      const searchLower = search.toLowerCase();
      filteredAlerts = filteredAlerts.filter(alert => 
        alert.driver.toLowerCase().includes(searchLower) ||
        alert.location.toLowerCase().includes(searchLower) ||
        alert.description.toLowerCase().includes(searchLower)
      );
    }
    
    // Calculate pagination
    const total = filteredAlerts.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedAlerts = filteredAlerts.slice(startIndex, endIndex);
    
    return {
      total,
      page,
      limit,
      alerts: paginatedAlerts
    };
  }
  
  /**
   * Get alert details
   * @param {string} id - Alert ID
   * @returns {Promise<Object>} Safety alert details
   */
  async getAlertDetails(id) {
    await delay(600);
    
    // Sample alert details
    const alertDetails = {
      id,
      type: id.includes('fatigue') ? 'fatigue' : 
            id.includes('distraction') ? 'distraction' : 
            id.includes('style') ? 'style' : 'collision',
      driver: ['Jan Kowalski', 'Anna Nowak', 'Piotr Wiśniewski', 'Magdalena Kaczmarek'][Math.floor(Math.random() * 4)],
      description: id.includes('fatigue') ? 'Wykryto oznaki zmęczenia kierowcy' : 
                  id.includes('distraction') ? 'Wykryto rozproszenie uwagi' : 
                  id.includes('style') ? 'Nieprawidłowy styl jazdy' : 'Ostrzeżenie o ryzyku kolizji',
      time: '2025-04-14 ' + (Math.floor(Math.random() * 24)).toString().padStart(2, '0') + ':' + 
            (Math.floor(Math.random() * 60)).toString().padStart(2, '0'),
      location: ['Warszawa', 'Kraków', 'Gdańsk', 'Poznań', 'Wrocław'][Math.floor(Math.random() * 5)] + 
                ', ul. ' + ['Marszałkowska', 'Floriańska', 'Długa', 'Półwiejska', 'Świdnicka'][Math.floor(Math.random() * 5)],
      status: ['new', 'inProgress', 'closed'][Math.floor(Math.random() * 3)],
      details: {
        incidentType: id.includes('fatigue') ? 'Zmęczenie kierowcy' : 
                      id.includes('distraction') ? 'Rozproszenie uwagi' : 
                      id.includes('style') ? 'Nieprawidłowy styl jazdy' : 'Ryzyko kolizji',
        severity: ['Niskie', 'Średnie', 'Wysokie', 'Krytyczne'][Math.floor(Math.random() * 4)],
        driverState: id.includes('fatigue') ? 'Zmęczony' : 
                    id.includes('distraction') ? 'Rozproszony' : 'Normalny',
        vehicleSpeed: Math.floor(Math.random() * 100) + 20,
        videoUrl: 'https://example.com/video/' + id,
        locationCoordinates: {
          latitude: 52.0 + Math.random() * 2,
          longitude: 19.0 + Math.random() * 2
        },
        eventTimeline: [
          {
            time: '00:00',
            event: 'Początek nagrania'
          },
          {
            time: '00:05',
            event: id.includes('fatigue') ? 'Wykrycie oznak zmęczenia' : 
                  id.includes('distraction') ? 'Wykrycie rozproszenia uwagi' : 
                  id.includes('style') ? 'Wykrycie nieprawidłowego stylu jazdy' : 'Wykrycie ryzyka kolizji'
          },
          {
            time: '00:10',
            event: 'Wygenerowanie alertu'
          },
          {
            time: '00:15',
            event: 'Koniec nagrania'
          }
        ],
        recommendations: [
          id.includes('fatigue') ? 'Zalecany odpoczynek kierowcy' : 
          id.includes('distraction') ? 'Zalecane szkolenie z koncentracji' : 
          id.includes('style') ? 'Zalecane szkolenie z techniki jazdy' : 'Zalecane szkolenie z bezpiecznej odległości',
          'Przegląd nagrania z kierowcą',
          'Aktualizacja polityki bezpieczeństwa'
        ]
      }
    };
    
    return alertDetails;
  }
  
  /**
   * Get driver safety ranking
   * @param {number} [limit=10] - Results limit
   * @param {string} [sort='score_desc'] - Sort order
   * @returns {Promise<Object>} Driver ranking response
   */
  async getDriverRanking(
    limit = 10,
    sort = 'score_desc'
  ) {
    await delay(700);
    
    // Sample driver rankings
    const allRankings = [
      {
        driver: 'Jan Kowalski',
        score: 92,
        trend: 'up',
        details: {
          fatigueScore: 95,
          distractionScore: 90,
          drivingStyleScore: 88,
          collisionRiskScore: 96
        }
      },
      {
        driver: 'Anna Nowak',
        score: 88,
        trend: 'up',
        details: {
          fatigueScore: 90,
          distractionScore: 85,
          drivingStyleScore: 92,
          collisionRiskScore: 86
        }
      },
      {
        driver: 'Piotr Wiśniewski',
        score: 85,
        trend: 'down',
        details: {
          fatigueScore: 82,
          distractionScore: 88,
          drivingStyleScore: 80,
          collisionRiskScore: 90
        }
      },
      {
        driver: 'Magdalena Kaczmarek',
        score: 90,
        trend: 'stable',
        details: {
          fatigueScore: 92,
          distractionScore: 94,
          drivingStyleScore: 85,
          collisionRiskScore: 88
        }
      },
      {
        driver: 'Tomasz Lewandowski',
        score: 78,
        trend: 'down',
        details: {
          fatigueScore: 75,
          distractionScore: 80,
          drivingStyleScore: 76,
          collisionRiskScore: 82
        }
      },
      {
        driver: 'Katarzyna Zielińska',
        score: 82,
        trend: 'up',
        details: {
          fatigueScore: 85,
          distractionScore: 78,
          drivingStyleScore: 84,
          collisionRiskScore: 80
        }
      },
      {
        driver: 'Michał Szymański',
        score: 75,
        trend: 'down',
        details: {
          fatigueScore: 78,
          distractionScore: 72,
          drivingStyleScore: 70,
          collisionRiskScore: 80
        }
      },
      {
        driver: 'Aleksandra Woźniak',
        score: 86,
        trend: 'up',
        details: {
          fatigueScore: 88,
          distractionScore: 84,
          drivingStyleScore: 90,
          collisionRiskScore: 82
        }
      },
      {
        driver: 'Krzysztof Dąbrowski',
        score: 80,
        trend: 'stable',
        details: {
          fatigueScore: 82,
          distractionScore: 78,
          drivingStyleScore: 84,
          collisionRiskScore: 76
        }
      },
      {
        driver: 'Monika Kozłowska',
        score: 84,
        trend: 'up',
        details: {
          fatigueScore: 86,
          distractionScore: 82,
          drivingStyleScore: 88,
          collisionRiskScore: 80
        }
      }
    ];
    
    // Sort rankings
    let sortedRankings = [...allRankings];
    if (sort === 'score_desc') {
      sortedRankings.sort((a, b) => b.score - a.score);
    } else if (sort === 'score_asc') {
      sortedRankings.sort((a, b) => a.score - b.score);
    } else if (sort === 'name_asc') {
      sortedRankings.sort((a, b) => a.driver.localeCompare(b.driver));
    } else if (sort === 'name_desc') {
      sortedRankings.sort((a, b) => b.driver.localeCompare(a.driver));
    }
    
    // Limit results
    const limitedRankings = sortedRankings.slice(0, limit);
    
    return {
      rankings: limitedRankings
    };
  }
  
  /**
   * Get driver style analysis
   * @param {string} driverId - Driver ID or name
   * @returns {Promise<Object>} Driving style response
   */
  async getDriverStyle(driverId) {
    await delay(900);
    
    // Enhanced driving style data with better positioning and colors
    const drivingStyle = {
      driver: driverId,
      overallScore: Math.floor(Math.random() * 20) + 80,
      drivingStyle: [
        {
          category: 'Przyspieszanie',
          value: Math.floor(Math.random() * 30) + 70,
          angle: 0,
          labelPosition: { x: 90, y: 50 },
          color: '#4CAF50' // Green
        },
        {
          category: 'Hamowanie',
          value: Math.floor(Math.random() * 30) + 70,
          angle: 60,
          labelPosition: { x: 75, y: 15 },
          color: '#2196F3' // Blue
        },
        {
          category: 'Skręcanie',
          value: Math.floor(Math.random() * 30) + 70,
          angle: 120,
          labelPosition: { x: 25, y: 15 },
          color: '#9C27B0' // Purple
        },
        {
          category: 'Prędkość',
          value: Math.floor(Math.random() * 30) + 70,
          angle: 180,
          labelPosition: { x: 10, y: 50 },
          color: '#F44336' // Red
        },
        {
          category: 'Płynność',
          value: Math.floor(Math.random() * 30) + 70,
          angle: 240,
          labelPosition: { x: 25, y: 85 },
          color: '#FF9800' // Orange
        },
        {
          category: 'Koncentracja',
          value: Math.floor(Math.random() * 30) + 70,
          angle: 300,
          labelPosition: { x: 75, y: 85 },
          color: '#00BCD4' // Cyan
        }
      ],
      // Enhanced history data with more data points and consistent trend
      history: [
        { date: '2025-04-01', score: 75 },
        { date: '2025-04-02', score: 76 },
        { date: '2025-04-03', score: 78 },
        { date: '2025-04-04', score: 77 },
        { date: '2025-04-05', score: 79 },
        { date: '2025-04-06', score: 80 },
        { date: '2025-04-07', score: 82 },
        { date: '2025-04-08', score: 81 },
        { date: '2025-04-09', score: 83 },
        { date: '2025-04-10', score: 85 },
        { date: '2025-04-11', score: 84 },
        { date: '2025-04-12', score: 86 },
        { date: '2025-04-13', score: 88 },
        { date: '2025-04-14', score: 90 }
      ],
      recommendations: [
        {
          category: 'Hamowanie',
          recommendation: 'Unikaj gwałtownego hamowania, zacznij hamować wcześniej i bardziej płynnie.'
        },
        {
          category: 'Przyspieszanie',
          recommendation: 'Przyspieszaj bardziej płynnie, unikaj gwałtownego wciskania pedału gazu.'
        },
        {
          category: 'Skręcanie',
          recommendation: 'Zmniejsz prędkość przed zakrętami, unikaj gwałtownych ruchów kierownicą.'
        }
      ],
      fatigueData: {
        incidents: Math.floor(Math.random() * 5),
        averageDuration: Math.floor(Math.random() * 30) + 30,
        timeOfDay: {
          morning: Math.floor(Math.random() * 30),
          afternoon: Math.floor(Math.random() * 30),
          evening: Math.floor(Math.random() * 30),
          night: Math.floor(Math.random() * 30)
        },
        symptoms: [
          {
            name: 'Ziewanie',
            count: Math.floor(Math.random() * 10) + 1
          },
          {
            name: 'Zamykanie oczu',
            count: Math.floor(Math.random() * 10) + 1
          },
          {
            name: 'Opóźniona reakcja',
            count: Math.floor(Math.random() * 10) + 1
          },
          {
            name: 'Odchylenia od toru jazdy',
            count: Math.floor(Math.random() * 10) + 1
          }
        ]
      },
      distractionData: {
        incidents: Math.floor(Math.random() * 10) + 1,
        duration: Math.floor(Math.random() * 10) + 1,
        types: {
          phone: Math.floor(Math.random() * 10) + 1,
          eating: Math.floor(Math.random() * 10) + 1,
          radio: Math.floor(Math.random() * 10) + 1,
          other: Math.floor(Math.random() * 10) + 1
        },
        impact: {
          laneDeviation: Math.floor(Math.random() * 10) + 1,
          speedVariation: Math.floor(Math.random() * 10) + 1,
          reactionTime: Math.floor(Math.random() * 50) + 50
        }
      },
      collisionRiskData: {
        incidents: Math.floor(Math.random() * 5),
        averageDistance: Math.floor(Math.random() * 10) + 5,
        types: {
          frontCollision: Math.floor(Math.random() * 10) + 1,
          laneChange: Math.floor(Math.random() * 10) + 1,
          intersection: Math.floor(Math.random() * 10) + 1
        },
        riskFactors: [
          {
            factor: 'Odległość od pojazdu',
            value: Math.floor(Math.random() * 40) + 60
          },
          {
            factor: 'Prędkość',
            value: Math.floor(Math.random() * 40) + 60
          },
          {
            factor: 'Sygnalizacja manewrów',
            value: Math.floor(Math.random() * 40) + 60
          },
          {
            factor: 'Obserwacja otoczenia',
            value: Math.floor(Math.random() * 40) + 60
          }
        ]
      }
    };
    
    return drivingStyle;
  }
  
  /**
   * Get coaching sessions
   * @returns {Promise<Object>} Coaching sessions response
   */
  async getCoachingSessions() {
    await delay(500);
    
    // Sample coaching sessions
    const sessions = [
      {
        id: 'session-001',
        driver: 'Jan Kowalski',
        type: 'Indywidualny',
        topic: 'Zmęczenie podczas jazdy',
        date: '2025-04-20 10:00',
        status: 'scheduled'
      },
      {
        id: 'session-002',
        driver: 'Anna Nowak',
        type: 'Grupowy',
        topic: 'Rozproszenie uwagi',
        date: '2025-04-18 14:30',
        status: 'completed'
      },
      {
        id: 'session-003',
        driver: 'Piotr Wiśniewski',
        type: 'Indywidualny',
        topic: 'Technika jazdy',
        date: '2025-04-19 09:15',
        status: 'scheduled'
      },
      {
        id: 'session-004',
        driver: 'Magdalena Kaczmarek',
        type: 'Indywidualny',
        topic: 'Zapobieganie kolizjom',
        date: '2025-04-17 11:45',
        status: 'cancelled'
      },
      {
        id: 'session-005',
        driver: 'Tomasz Lewandowski',
        type: 'Grupowy',
        topic: 'Zmęczenie podczas jazdy',
        date: '2025-04-21 13:00',
        status: 'scheduled'
      }
    ];
    
    return {
      sessions
    };
  }
  
  /**
   * Get video telematics data
   * @param {string} driverId - Driver ID or name
   * @returns {Promise<Object>} Video telematics response
   */
  async getVideoTelematics(driverId) {
    await delay(800);
    
    // Sample video telematics data
    const videoTelematics = {
      driver: driverId,
      videos: [
        {
          id: 'video-001',
          description: 'Oznaki zmęczenia podczas jazdy',
          timestamp: '2025-04-14 08:23',
          duration: 15,
          location: 'Warszawa, ul. Marszałkowska',
          severity: 'high'
        },
        {
          id: 'video-002',
          description: 'Korzystanie z telefonu podczas jazdy',
          timestamp: '2025-04-14 09:45',
          duration: 12,
          location: 'Kraków, ul. Floriańska',
          severity: 'medium'
        },
        {
          id: 'video-003',
          description: 'Gwałtowne hamowanie',
          timestamp: '2025-04-14 10:12',
          duration: 8,
          location: 'Gdańsk, ul. Długa',
          severity: 'low'
        },
        {
          id: 'video-004',
          description: 'Zbyt mała odległość od pojazdu',
          timestamp: '2025-04-14 11:30',
          duration: 10,
          location: 'Poznań, ul. Półwiejska',
          severity: 'medium'
        }
      ],
      statistics: {
        totalVideos: 15,
        byType: {
          fatigue: 4,
          distraction: 6,
          style: 3,
          collision: 2
        },
        bySeverity: {
          high: 3,
          medium: 7,
          low: 5
        }
      }
    };
    
    return videoTelematics;
  }
}

// Export instance
const mockDriverSafetyService = new MockDriverSafetyService();
export default mockDriverSafetyService;
