# Specyfikacja API dla aplikacji Fleet

## Wprowadzenie

Ten dokument zawiera specyfikację API dla aplikacji Fleet, która będzie zaimplementowana w backendzie. Specyfikacja obejmuje wszystkie endpointy potrzebne do obsługi funkcjonalności aplikacji, w tym dashboard, wykrywanie oszustw, bezpieczeństwo kierowcy, konserwację predykcyjną oraz personalizację widoków.

## Podstawowe informacje

- Bazowy URL: `/api/v1`
- Format odpowiedzi: JSON
- Autentykacja: Bearer Token w nagłówku `Authorization`
- Kody odpowiedzi:
  - 200: Sukces
  - 201: Utworzono
  - 400: Błędne żądanie
  - 401: Nieautoryzowany dostęp
  - 403: Brak uprawnień
  - 404: Nie znaleziono
  - 500: Błąd serwera

## Endpointy API

### Autentykacja

#### Logowanie

```
POST /auth/login
```

Parametry żądania:
```json
{
  "username": "string",
  "password": "string"
}
```

Odpowiedź:
```json
{
  "token": "string",
  "user": {
    "id": "string",
    "username": "string",
    "role": "string",
    "permissions": ["string"]
  }
}
```

#### Wylogowanie

```
POST /auth/logout
```

Odpowiedź:
```json
{
  "message": "Wylogowano pomyślnie"
}
```

### Dashboard

#### Pobieranie danych KPI

```
GET /dashboard/kpi
```

Parametry zapytania:
- `date_from`: Data początkowa (format: YYYY-MM-DD)
- `date_to`: Data końcowa (format: YYYY-MM-DD)

Odpowiedź:
```json
{
  "activeVehicles": 125,
  "activeDrivers": 98,
  "dailyCosts": 12500,
  "potentialSavings": 3200,
  "safetyIndex": 85,
  "maintenanceForecast": 12
}
```

#### Pobieranie alertów

```
GET /dashboard/alerts
```

Parametry zapytania:
- `type`: Typ alertu (fraud, safety, maintenance)
- `limit`: Limit wyników (domyślnie: 10)

Odpowiedź:
```json
{
  "fraudAlerts": [
    {
      "id": "string",
      "priority": "string",
      "vehicle": "string",
      "description": "string",
      "date": "string",
      "location": "string",
      "status": "string"
    }
  ],
  "safetyAlerts": [
    {
      "id": "string",
      "type": "string",
      "driver": "string",
      "description": "string",
      "time": "string",
      "location": "string",
      "status": "string"
    }
  ],
  "maintenanceAlerts": [
    {
      "id": "string",
      "vehicle": "string",
      "component": "string",
      "forecast": "string",
      "confidence": "string"
    }
  ]
}
```

#### Pobieranie danych mapy

```
GET /dashboard/map
```

Parametry zapytania:
- `type`: Typ danych mapy (vehicles, fraud, safety)

Odpowiedź:
```json
{
  "points": [
    {
      "id": "string",
      "type": "string",
      "latitude": 0,
      "longitude": 0,
      "label": "string"
    }
  ]
}
```

### Wykrywanie oszustw (Fraud Detection)

#### Pobieranie alertów oszustw

```
GET /fraud/alerts
```

Parametry zapytania:
- `priority`: Priorytet (high, medium, low, all)
- `status`: Status (new, inProgress, closed, all)
- `date_from`: Data początkowa (format: YYYY-MM-DD)
- `date_to`: Data końcowa (format: YYYY-MM-DD)
- `search`: Wyszukiwana fraza
- `page`: Numer strony
- `limit`: Limit wyników na stronę

Odpowiedź:
```json
{
  "total": 0,
  "page": 0,
  "limit": 0,
  "alerts": [
    {
      "id": "string",
      "priority": "string",
      "vehicle": "string",
      "description": "string",
      "date": "string",
      "location": "string",
      "status": "string",
      "details": {
        "transactionId": "string",
        "amount": 0,
        "fuelType": "string",
        "quantity": 0,
        "driverId": "string"
      }
    }
  ]
}
```

#### Pobieranie szczegółów alertu

```
GET /fraud/alerts/{id}
```

Odpowiedź:
```json
{
  "id": "string",
  "priority": "string",
  "vehicle": "string",
  "description": "string",
  "date": "string",
  "location": "string",
  "status": "string",
  "details": {
    "transactionId": "string",
    "amount": 0,
    "fuelType": "string",
    "quantity": 0,
    "driverId": "string",
    "locationCoordinates": {
      "latitude": 0,
      "longitude": 0
    },
    "cardVerification": {
      "status": "string",
      "cardLocation": {
        "latitude": 0,
        "longitude": 0
      },
      "distanceFromVehicle": 0
    },
    "transactionHistory": [
      {
        "date": "string",
        "amount": 0,
        "quantity": 0,
        "location": "string"
      }
    ]
  }
}
```

#### Aktualizacja statusu alertu

```
PUT /fraud/alerts/{id}/status
```

Parametry żądania:
```json
{
  "status": "string",
  "comment": "string"
}
```

Odpowiedź:
```json
{
  "id": "string",
  "status": "string",
  "updatedAt": "string"
}
```

#### Pobieranie wzorców transakcji

```
GET /fraud/transactions/patterns
```

Parametry zapytania:
- `vehicle`: ID pojazdu
- `driver`: ID kierowcy
- `date_from`: Data początkowa (format: YYYY-MM-DD)
- `date_to`: Data końcowa (format: YYYY-MM-DD)

Odpowiedź:
```json
{
  "patterns": [
    {
      "date": "string",
      "vehicle": "string",
      "driver": "string",
      "amount": "string",
      "quantity": "string",
      "location": "string",
      "riskLevel": "string"
    }
  ],
  "analysis": {
    "averageAmount": 0,
    "averageQuantity": 0,
    "frequentLocations": [
      {
        "location": "string",
        "count": 0
      }
    ],
    "riskDistribution": [
      {
        "category": "string",
        "percentage": 0,
        "color": "string"
      }
    ]
  }
}
```

### Bezpieczeństwo kierowcy (Driver Safety)

#### Pobieranie alertów bezpieczeństwa

```
GET /safety/alerts
```

Parametry zapytania:
- `type`: Typ alertu (fatigue, distraction, style, collision, all)
- `time`: Czas (morning, afternoon, evening, all)
- `search`: Wyszukiwana fraza
- `page`: Numer strony
- `limit`: Limit wyników na stronę

Odpowiedź:
```json
{
  "total": 0,
  "page": 0,
  "limit": 0,
  "alerts": [
    {
      "id": "string",
      "type": "string",
      "driver": "string",
      "description": "string",
      "time": "string",
      "location": "string",
      "status": "string"
    }
  ]
}
```

#### Pobieranie szczegółów alertu bezpieczeństwa

```
GET /safety/alerts/{id}
```

Odpowiedź:
```json
{
  "id": "string",
  "type": "string",
  "driver": "string",
  "description": "string",
  "time": "string",
  "location": "string",
  "status": "string",
  "details": {
    "incidentType": "string",
    "severity": "string",
    "driverState": "string",
    "vehicleSpeed": 0,
    "videoUrl": "string",
    "locationCoordinates": {
      "latitude": 0,
      "longitude": 0
    }
  }
}
```

#### Pobieranie rankingu bezpieczeństwa kierowców

```
GET /safety/drivers/ranking
```

Parametry zapytania:
- `limit`: Limit wyników (domyślnie: 10)
- `sort`: Sortowanie (score_asc, score_desc)

Odpowiedź:
```json
{
  "rankings": [
    {
      "driver": "string",
      "score": 0,
      "trend": "string",
      "details": {
        "fatigueScore": 0,
        "distractionScore": 0,
        "drivingStyleScore": 0,
        "collisionRiskScore": 0
      }
    }
  ]
}
```

#### Pobieranie analizy stylu jazdy kierowcy

```
GET /safety/drivers/{id}/style
```

Odpowiedź:
```json
{
  "driver": "string",
  "overallScore": 0,
  "drivingStyle": [
    {
      "category": "string",
      "value": 0,
      "angle": 0,
      "labelPosition": {
        "x": 0,
        "y": 0
      }
    }
  ],
  "history": [
    {
      "date": "string",
      "score": 0
    }
  ],
  "recommendations": [
    {
      "category": "string",
      "recommendation": "string"
    }
  ]
}
```

#### Pobieranie sesji coachingowych

```
GET /safety/coaching
```

Parametry zapytania:
- `driver`: ID kierowcy
- `status`: Status (planned, completed, cancelled)

Odpowiedź:
```json
{
  "sessions": [
    {
      "id": "string",
      "driver": "string",
      "type": "string",
      "topic": "string",
      "date": "string",
      "status": "string"
    }
  ]
}
```

### Konserwacja predykcyjna (Predictive Maintenance)

#### Pobieranie prognoz awarii

```
GET /maintenance/forecasts
```

Parametry zapytania:
- `vehicle`: ID pojazdu
- `component`: Typ komponentu
- `search`: Wyszukiwana fraza
- `page`: Numer strony
- `limit`: Limit wyników na stronę

Odpowiedź:
```json
{
  "total": 0,
  "page": 0,
  "limit": 0,
  "forecasts": [
    {
      "id": "string",
      "vehicle": "string",
      "component": "string",
      "forecast": "string",
      "confidence": "string"
    }
  ]
}
```

#### Pobieranie harmonogramu konserwacji

```
GET /maintenance/schedule
```

Parametry zapytania:
- `date_from`: Data początkowa (format: YYYY-MM-DD)
- `date_to`: Data końcowa (format: YYYY-MM-DD)
- `vehicle`: ID pojazdu

Odpowiedź:
```json
{
  "schedule": [
    {
      "id": "string",
      "date": "string",
      "vehicle": "string",
      "serviceType": "string",
      "status": "string"
    }
  ]
}
```

#### Pobieranie stanu komponentów pojazdu

```
GET /maintenance/vehicles/{id}/components
```

Odpowiedź:
```json
{
  "vehicle": "string",
  "components": [
    {
      "id": "string",
      "name": "string",
      "health": 0,
      "lastService": "string",
      "nextService": "string",
      "details": {
        "manufacturer": "string",
        "model": "string",
        "installationDate": "string",
        "expectedLifespan": 0,
        "currentUsage": 0
      }
    }
  ]
}
```

#### Pobieranie stanu magazynu części

```
GET /maintenance/parts
```

Parametry zapytania:
- `search`: Wyszukiwana fraza
- `status`: Status (in_stock, low_stock, out_of_stock)

Odpowiedź:
```json
{
  "parts": [
    {
      "id": "string",
      "part": "string",
      "stock": 0,
      "reorderPoint": 0,
      "onOrder": 0
    }
  ]
}
```

#### Pobieranie historii konserwacji

```
GET /maintenance/history
```

Parametry zapytania:
- `vehicle`: ID pojazdu
- `date_from`: Data początkowa (format: YYYY-MM-DD)
- `date_to`: Data końcowa (format: YYYY-MM-DD)
- `type`: Typ konserwacji (repair, inspection)

Odpowiedź:
```json
{
  "history": [
    {
      "id": "string",
      "vehicle": "string",
      "date": "string",
      "type": "string",
      "description": "string",
      "cost": "string",
      "details": {
        "technician": "string",
        "location": "string",
        "partsUsed": [
          {
            "part": "string",
            "quantity": 0,
            "cost": 0
          }
        ],
        "notes": "string"
      }
    }
  ]
}
```

### Personalizacja widoków (View Customization)

#### Pobieranie dostępnych widoków

```
GET /views
```

Parametry zapytania:
- `user`: ID użytkownika (opcjonalnie)

Odpowiedź:
```json
{
  "views": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "isDefault": true,
      "sections": [
        {
          "id": "string",
          "name": "string",
          "type": "string",
          "visible": true,
          "order": 0
        }
      ],
      "userGroups": ["string"]
    }
  ]
}
```

#### Pobieranie szczegółów widoku

```
GET /views/{id}
```

Odpowiedź:
```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "isDefault": true,
  "sections": [
    {
      "id": "string",
      "name": "string",
      "type": "string",
      "visible": true,
      "order": 0
    }
  ],
  "userGroups": ["string"]
}
```

#### Tworzenie nowego widoku

```
POST /views
```

Parametry żądania:
```json
{
  "name": "string",
  "description": "string",
  "isDefault": false,
  "sections": [
    {
      "id": "string",
      "name": "string",
      "type": "string",
      "visible": true,
      "order": 0
    }
  ],
  "userGroups": ["string"]
}
```

Odpowiedź:
```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "isDefault": false,
  "sections": [
    {
      "id": "string",
      "name": "string",
      "type": "string",
      "visible": true,
      "order": 0
    }
  ],
  "userGroups": ["string"],
  "createdAt": "string"
}
```

#### Aktualizacja widoku

```
PUT /views/{id}
```

Parametry żądania:
```json
{
  "name": "string",
  "description": "string",
  "isDefault": false,
  "sections": [
    {
      "id": "string",
      "name": "string",
      "type": "string",
      "visible": true,
      "order": 0
    }
  ],
  "userGroups": ["string"]
}
```

Odpowiedź:
```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "isDefault": false,
  "sections": [
    {
      "id": "string",
      "name": "string",
      "type": "string",
      "visible": true,
      "order": 0
    }
  ],
  "userGroups": ["string"],
  "updatedAt": "string"
}
```

#### Usuwanie widoku

```
DELETE /views/{id}
```

Odpowiedź:
```json
{
  "message": "Widok usunięty pomyślnie"
}
```

## Modele danych

### User
```json
{
  "id": "string",
  "username": "string",
  "email": "string",
  "role": "string",
  "permissions": ["string"],
  "createdAt": "string",
  "updatedAt": "string"
}
```

### Vehicle
```json
{
  "id": "string",
  "registrationNumber": "string",
  "make": "string",
  "model": "string",
  "year": 0,
  "status": "string",
  "currentDriver": "string",
  "currentLocation": {
    "latitude": 0,
    "longitude": 0
  },
  "lastUpdate": "string"
}
```

### Driver
```json
{
  "id": "string",
  "name": "string",
  "licenseNumber": "string",
  "status": "string",
  "safetyScore": 0,
  "currentVehicle": "string",
  "currentLocation": {
    "latitude": 0,
    "longitude": 0
  },
  "lastUpdate": "string"
}
```

### FraudAlert
```json
{
  "id": "string",
  "priority": "string",
  "vehicle": "string",
  "description": "string",
  "date": "string",
  "location": "string",
  "status": "string",
  "details": {
    "transactionId": "string",
    "amount": 0,
    "fuelType": "string",
    "quantity": 0,
    "driverId": "string",
    "locationCoordinates": {
      "latitude": 0,
      "longitude": 0
    }
  },
  "createdAt": "string",
  "updatedAt": "string"
}
```

### SafetyAlert
```json
{
  "id": "string",
  "type": "string",
  "driver": "string",
  "description": "string",
  "time": "string",
  "location": "string",
  "status": "string",
  "details": {
    "incidentType": "string",
    "severity": "string",
    "driverState": "string",
    "vehicleSpeed": 0,
    "videoUrl": "string",
    "locationCoordinates": {
      "latitude": 0,
      "longitude": 0
    }
  },
  "createdAt": "string",
  "updatedAt": "string"
}
```

### MaintenanceForecast
```json
{
  "id": "string",
  "vehicle": "string",
  "component": "string",
  "forecast": "string",
  "confidence": "string",
  "details": {
    "componentId": "string",
    "currentHealth": 0,
    "predictedFailureDate": "string",
    "recommendedAction": "string"
  },
  "createdAt": "string",
  "updatedAt": "string"
}
```

### View
```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "isDefault": true,
  "sections": [
    {
      "id": "string",
      "name": "string",
      "type": "string",
      "visible": true,
      "order": 0
    }
  ],
  "userGroups": ["string"],
  "createdAt": "string",
  "updatedAt": "string"
}
```
