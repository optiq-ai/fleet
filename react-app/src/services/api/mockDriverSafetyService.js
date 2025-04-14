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
    
    // Sample driving style data
    const drivingStyle = {
      driver: driverId,
      overallScore: Math.floor(Math.random() * 20) + 80,
      drivingStyle: [
        {
          category: 'Przyspieszanie',
          value: Math.floor(Math.random() * 30) + 70,
          angle: 0,
          labelPosition: { x: 85, y: 50 }
        },
        {
          category: 'Hamowanie',
          value: Math.floor(Math.random() * 30) + 70,
          angle: 60,
          labelPosition: { x: 75, y: 20 }
        },
        {
          category: 'Skręcanie',
          value: Math.floor(Math.random() * 30) + 70,
          angle: 120,
          labelPosition: { x: 25, y: 20 }
        },
        {
          category: 'Prędkość',
          value: Math.floor(Math.random() * 30) + 70,
          angle: 180,
          labelPosition: { x: 15, y: 50 }
        },
        {
          category: 'Płynność',
          value: Math.floor(Math.random() * 30) + 70,
          angle: 240,
          labelPosition: { x: 25, y: 80 }
        },
        {
          category: 'Koncentracja',
          value: Math.floor(Math.random() * 30) + 70,
          angle: 300,
          labelPosition: { x: 75, y: 80 }
        }
      ],
      history: [
        { date: '2025-04-07', score: Math.floor(Math.random() * 20) + 70 },
        { date: '2025-04-08', score: Math.floor(Math.random() * 20) + 70 },
        { date: '2025-04-09', score: Math.floor(Math.random() * 20) + 70 },
        { date: '2025-04-10', score: Math.floor(Math.random() * 20) + 70 },
        { date: '2025-04-11', score: Math.floor(Math.random() * 20) + 70 },
        { date: '2025-04-12', score: Math.floor(Math.random() * 20) + 70 },
        { date: '2025-04-13', score: Math.floor(Math.random() * 20) + 70 },
        { date: '2025-04-14', score: Math.floor(Math.random() * 20) + 70 }
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
          { name: 'Ziewanie', count: Math.floor(Math.random() * 10) + 5 },
          { name: 'Zamykanie oczu', count: Math.floor(Math.random() * 5) + 1 },
          { name: 'Opóźniona reakcja', count: Math.floor(Math.random() * 8) + 3 },
          { name: 'Odchylenia od toru jazdy', count: Math.floor(Math.random() * 6) + 2 }
        ]
      },
      distractionData: {
        incidents: Math.floor(Math.random() * 8),
        types: {
          phone: Math.floor(Math.random() * 5),
          eating: Math.floor(Math.random() * 3),
          radio: Math.floor(Math.random() * 4),
          other: Math.floor(Math.random() * 2)
        },
        duration: Math.floor(Math.random() * 20) + 10,
        impact: {
          laneDeviation: Math.floor(Math.random() * 5) + 1,
          speedVariation: Math.floor(Math.random() * 10) + 5,
          reactionTime: Math.floor(Math.random() * 30) + 20
        }
      },
      collisionRiskData: {
        incidents: Math.floor(Math.random() * 3),
        types: {
          frontCollision: Math.floor(Math.random() * 2),
          laneChange: Math.floor(Math.random() * 2),
          intersection: Math.floor(Math.random() * 2)
        },
        averageDistance: Math.floor(Math.random() * 10) + 5,
        riskFactors: [
          { factor: 'Prędkość', value: Math.floor(Math.random() * 30) + 70 },
          { factor: 'Odległość', value: Math.floor(Math.random() * 30) + 70 },
          { factor: 'Czas reakcji', value: Math.floor(Math.random() * 30) + 70 }
        ]
      }
    };
    
    return drivingStyle;
  }
  
  /**
   * Get coaching sessions
   * @param {string} [driver] - Driver filter
   * @param {string} [status] - Status filter
   * @returns {Promise<Object>} Coaching sessions response
   */
  async getCoachingSessions(
    driver,
    status
  ) {
    await delay(600);
    
    // Sample coaching sessions
    const allSessions = [
      {
        id: 'session-001',
        driver: 'Jan Kowalski',
        type: 'Indywidualny',
        topic: 'Zmęczenie podczas jazdy',
        date: '2025-04-16 10:00',
        status: 'scheduled',
        coach: 'Marek Trener',
        duration: 60,
        materials: ['Prezentacja', 'Ćwiczenia praktyczne'],
        goals: ['Rozpoznawanie oznak zmęczenia', 'Techniki przeciwdziałania zmęczeniu']
      },
      {
        id: 'session-002',
        driver: 'Anna Nowak',
        type: 'Grupowy',
        topic: 'Rozproszenie uwagi',
        date: '2025-04-17 14:00',
        status: 'scheduled',
        coach: 'Marek Trener',
        duration: 90,
        materials: ['Prezentacja', 'Symulator jazdy'],
        goals: ['Identyfikacja czynników rozpraszających', 'Techniki koncentracji']
      },
      {
        id: 'session-003',
        driver: 'Piotr Wiśniewski',
        type: 'Indywidualny',
        topic: 'Styl jazdy - hamowanie',
        date: '2025-04-15 09:30',
        status: 'completed',
        coach: 'Karolina Ekspert',
        duration: 45,
        materials: ['Analiza nagrań', 'Jazda z instruktorem'],
        goals: ['Poprawa techniki hamowania', 'Zwiększenie płynności jazdy']
      },
      {
        id: 'session-004',
        driver: 'Magdalena Kaczmarek',
        type: 'Grupowy',
        topic: 'Zapobieganie kolizjom',
        date: '2025-04-18 11:00',
        status: 'scheduled',
        coach: 'Karolina Ekspert',
        duration: 120,
        materials: ['Prezentacja', 'Symulator jazdy', 'Ćwiczenia praktyczne'],
        goals: ['Przewidywanie zagrożeń', 'Techniki unikania kolizji']
      },
      {
        id: 'session-005',
        driver: 'Tomasz Lewandowski',
        type: 'Indywidualny',
        topic: 'Styl jazdy - przyspieszanie',
        date: '2025-04-14 15:30',
        status: 'completed',
        coach: 'Marek Trener',
        duration: 60,
        materials: ['Analiza nagrań', 'Jazda z instruktorem'],
        goals: ['Poprawa techniki przyspieszania', 'Optymalizacja zużycia paliwa']
      },
      {
        id: 'session-006',
        driver: 'Katarzyna Zielińska',
        type: 'Grupowy',
        topic: 'Jazda w trudnych warunkach',
        date: '2025-04-19 13:00',
        status: 'scheduled',
        coach: 'Karolina Ekspert',
        duration: 180,
        materials: ['Prezentacja', 'Symulator jazdy', 'Jazda w terenie'],
        goals: ['Techniki jazdy w deszczu/śniegu', 'Pokonywanie trudnych odcinków']
      },
      {
        id: 'session-007',
        driver: 'Michał Szymański',
        type: 'Indywidualny',
        topic: 'Analiza stylu jazdy',
        date: '2025-04-13 10:00',
        status: 'completed',
        coach: 'Marek Trener',
        duration: 90,
        materials: ['Analiza nagrań', 'Raport telematyczny'],
        goals: ['Identyfikacja obszarów do poprawy', 'Plan rozwoju kierowcy']
      },
      {
        id: 'session-008',
        driver: 'Aleksandra Woźniak',
        type: 'Indywidualny',
        topic: 'Zapobieganie rozproszeniu uwagi',
        date: '2025-04-20 09:00',
        status: 'scheduled',
        coach: 'Karolina Ekspert',
        duration: 60,
        materials: ['Prezentacja', 'Ćwiczenia praktyczne'],
        goals: ['Organizacja kabiny kierowcy', 'Techniki koncentracji']
      }
    ];
    
    // Filter by driver if specified
    let filteredSessions = allSessions;
    if (driver) {
      filteredSessions = filteredSessions.filter(session => 
        session.driver.toLowerCase().includes(driver.toLowerCase())
      );
    }
    
    // Filter by status if specified
    if (status) {
      filteredSessions = filteredSessions.filter(session => 
        session.status === status
      );
    }
    
    return {
      sessions: filteredSessions
    };
  }
  
  /**
   * Get video telematics data
   * @param {string} driverId - Driver ID or name
   * @param {string} [date] - Date filter
   * @returns {Promise<Object>} Video telematics data
   */
  async getVideoTelematics(driverId, date) {
    await delay(800);
    
    // Sample video telematics data
    const videoTelematics = {
      driver: driverId,
      date: date || '2025-04-14',
      videos: [
        {
          id: 'video-001',
          type: 'fatigue',
          timestamp: '08:23:45',
          duration: 30,
          location: 'Warszawa, ul. Marszałkowska',
          thumbnail: 'https://example.com/thumbnails/video-001.jpg',
          url: 'https://example.com/videos/video-001.mp4',
          severity: 'high',
          description: 'Wykryto oznaki zmęczenia - zamykanie oczu'
        },
        {
          id: 'video-002',
          type: 'distraction',
          timestamp: '10:15:22',
          duration: 25,
          location: 'Warszawa, ul. Puławska',
          thumbnail: 'https://example.com/thumbnails/video-002.jpg',
          url: 'https://example.com/videos/video-002.mp4',
          severity: 'medium',
          description: 'Wykryto rozproszenie uwagi - korzystanie z telefonu'
        },
        {
          id: 'video-003',
          type: 'style',
          timestamp: '12:45:10',
          duration: 20,
          location: 'Warszawa, ul. Świętokrzyska',
          thumbnail: 'https://example.com/thumbnails/video-003.jpg',
          url: 'https://example.com/videos/video-003.mp4',
          severity: 'low',
          description: 'Wykryto gwałtowne hamowanie'
        },
        {
          id: 'video-004',
          type: 'collision',
          timestamp: '15:30:05',
          duration: 35,
          location: 'Warszawa, Al. Jerozolimskie',
          thumbnail: 'https://example.com/thumbnails/video-004.jpg',
          url: 'https://example.com/videos/video-004.mp4',
          severity: 'high',
          description: 'Wykryto ryzyko kolizji - zbyt mała odległość'
        }
      ],
      statistics: {
        totalVideos: 4,
        byType: {
          fatigue: 1,
          distraction: 1,
          style: 1,
          collision: 1
        },
        bySeverity: {
          low: 1,
          medium: 1,
          high: 2
        }
      }
    };
    
    return videoTelematics;
  }
}

// Export service instance
const mockDriverSafetyService = new MockDriverSafetyService();
export default mockDriverSafetyService;
