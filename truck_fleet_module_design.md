# Projekt modułu zarządzania flotą tirów

## 1. Architektura modułu

Moduł zarządzania flotą tirów będzie zintegrowany z istniejącą aplikacją Fleet App, wykorzystując jej architekturę i komponenty, jednocześnie rozszerzając je o funkcjonalności specyficzne dla tirów. Poniżej przedstawiono projekt architektury modułu.

### 1.1. Struktura katalogów

```
react-app/
├── src/
│   ├── components/
│   │   ├── truck-fleet/                      # Nowy katalog dla komponentów floty tirów
│   │   │   ├── TruckDashboard/               # Dashboard dla floty tirów
│   │   │   ├── TruckVehicleManagement/       # Zarządzanie ciągnikami
│   │   │   ├── TrailerManagement/            # Zarządzanie naczepami
│   │   │   ├── TruckDriverManagement/        # Zarządzanie kierowcami tirów
│   │   │   ├── WorkTimeManagement/           # Zarządzanie czasem pracy
│   │   │   ├── RouteManagement/              # Zarządzanie trasami
│   │   │   ├── CargoManagement/              # Zarządzanie ładunkami
│   │   │   ├── TollManagement/               # Zarządzanie opłatami drogowymi
│   │   │   ├── TruckServiceManagement/       # Zarządzanie serwisem tirów
│   │   │   ├── TruckDocumentManagement/      # Zarządzanie dokumentacją
│   │   │   ├── TruckAnalytics/               # Analityka dla floty tirów
│   │   │   └── common/                       # Wspólne komponenty
│   ├── pages/
│   │   ├── TruckFleet/                       # Strony dla modułu floty tirów
│   │   │   ├── TruckFleetDashboard.jsx       # Główny dashboard
│   │   │   ├── TruckManagement.jsx           # Zarządzanie ciągnikami
│   │   │   ├── TrailerManagement.jsx         # Zarządzanie naczepami
│   │   │   ├── TruckDrivers.jsx              # Zarządzanie kierowcami
│   │   │   ├── WorkTimeTracking.jsx          # Śledzenie czasu pracy
│   │   │   ├── RouteOptimization.jsx         # Optymalizacja tras
│   │   │   ├── CargoPlanning.jsx             # Planowanie ładunków
│   │   │   ├── TollManagement.jsx            # Zarządzanie opłatami
│   │   │   ├── TruckService.jsx              # Serwis i przeglądy
│   │   │   └── TruckDocuments.jsx            # Dokumentacja
│   ├── services/
│   │   ├── api/
│   │   │   ├── truckFleetService.js          # Serwis API dla floty tirów
│   │   │   ├── trailerService.js             # Serwis API dla naczep
│   │   │   ├── driverWorkTimeService.js      # Serwis API dla czasu pracy
│   │   │   ├── tollService.js                # Serwis API dla opłat drogowych
│   │   │   ├── truckRouteService.js          # Serwis API dla tras
│   │   │   ├── mockTruckFleetService.js      # Mock serwisu dla floty tirów
│   │   │   └── ...
│   ├── context/
│   │   ├── TruckFleetContext.js              # Kontekst dla floty tirów
│   ├── hooks/
│   │   ├── useTruckFleet.js                  # Hook dla danych floty tirów
│   │   ├── useTrailers.js                    # Hook dla danych naczep
│   │   ├── useDriverWorkTime.js              # Hook dla czasu pracy
│   │   └── ...
```

### 1.2. Integracja z istniejącą aplikacją

Moduł zarządzania flotą tirów będzie zintegrowany z istniejącą aplikacją poprzez:

1. Dodanie nowych tras w głównym pliku App.jsx
2. Rozszerzenie istniejącego menu nawigacyjnego o sekcję dla floty tirów
3. Wykorzystanie istniejących komponentów wspólnych (Card, Table, KPICard, itp.)
4. Integrację z istniejącymi modułami (Settings, Statistics, AI & Automation, Document Management)

## 2. Komponenty modułu

### 2.1. TruckFleetDashboard

Główny dashboard dla floty tirów, prezentujący kluczowe wskaźniki i szybki dostęp do najważniejszych funkcji.

#### Funkcjonalności:
- Przegląd statusu floty (aktywne ciągniki, naczepy, kierowcy)
- Kluczowe wskaźniki wydajności (KPI) dla floty tirów
- Alerty i powiadomienia (serwis, dokumenty, czas pracy)
- Szybki dostęp do najczęściej używanych funkcji
- Mapa z lokalizacją pojazdów w czasie rzeczywistym

#### Komponenty:
- `TruckFleetStatusCard` - karta statusu floty
- `TruckFleetKPIContainer` - kontener wskaźników KPI
- `TruckFleetAlerts` - alerty i powiadomienia
- `TruckFleetMap` - mapa z lokalizacją pojazdów
- `QuickAccessPanel` - panel szybkiego dostępu

### 2.2. TruckManagement

Komponent do zarządzania ciągnikami siodłowymi.

#### Funkcjonalności:
- Rejestr ciągników z szczegółowymi informacjami
- Monitoring statusu technicznego
- Śledzenie zużycia paliwa i AdBlue
- Zarządzanie przeglądami i serwisem
- Historia użytkowania ciągnika

#### Komponenty:
- `TruckList` - lista ciągników
- `TruckDetails` - szczegóły ciągnika
- `TruckStatusMonitor` - monitoring statusu
- `TruckFuelConsumption` - zużycie paliwa
- `TruckServiceHistory` - historia serwisu

### 2.3. TrailerManagement

Komponent do zarządzania naczepami.

#### Funkcjonalności:
- Rejestr naczep różnych typów
- Przypisywanie naczep do ciągników
- Monitoring statusu technicznego
- Zarządzanie przeglądami i serwisem
- Śledzenie historii użytkowania

#### Komponenty:
- `TrailerList` - lista naczep
- `TrailerDetails` - szczegóły naczepy
- `TrailerTypeFilter` - filtr typów naczep
- `TrailerAssignment` - przypisywanie naczep
- `TrailerStatusMonitor` - monitoring statusu

### 2.4. TruckDrivers

Komponent do zarządzania kierowcami tirów.

#### Funkcjonalności:
- Rejestr kierowców z kwalifikacjami
- Monitoring czasu pracy zgodnie z przepisami
- Zarządzanie dokumentami kierowców
- Analiza stylu jazdy i wydajności
- Planowanie pracy kierowców

#### Komponenty:
- `DriverList` - lista kierowców
- `DriverDetails` - szczegóły kierowcy
- `DriverQualifications` - kwalifikacje kierowcy
- `DriverPerformance` - wydajność kierowcy
- `DriverSchedule` - harmonogram pracy

### 2.5. WorkTimeTracking

Komponent do śledzenia i zarządzania czasem pracy kierowców.

#### Funkcjonalności:
- Integracja z tachografami
- Monitorowanie czasu jazdy, przerw i odpoczynków
- Alerty o zbliżających się limitach
- Raportowanie zgodności z przepisami
- Planowanie czasu pracy z uwzględnieniem limitów

#### Komponenty:
- `WorkTimeCalendar` - kalendarz czasu pracy
- `WorkTimeStats` - statystyki czasu pracy
- `WorkTimeAlerts` - alerty o limitach
- `TachographData` - dane z tachografów
- `WorkTimePlanner` - planer czasu pracy

### 2.6. RouteOptimization

Komponent do optymalizacji tras dla tirów.

#### Funkcjonalności:
- Planowanie tras z uwzględnieniem ograniczeń dla ciężarówek
- Kalkulacja kosztów trasy (paliwo, opłaty, diety)
- Planowanie postojów i odpoczynków
- Monitorowanie realizacji trasy
- Analiza historycznych tras

#### Komponenty:
- `RoutePlanner` - planer tras
- `RouteMap` - mapa trasy
- `RouteCostCalculator` - kalkulator kosztów
- `RestStopPlanner` - planer postojów
- `RouteMonitor` - monitoring realizacji

### 2.7. CargoPlanning

Komponent do planowania i zarządzania ładunkami.

#### Funkcjonalności:
- Planowanie załadunku z uwzględnieniem wagi i wymiarów
- Zarządzanie ładunkami specjalnymi
- Monitoring statusu ładunku
- Dokumentacja ładunku
- Historia przewozów

#### Komponenty:
- `CargoList` - lista ładunków
- `CargoDetails` - szczegóły ładunku
- `LoadPlanner` - planer załadunku
- `SpecialCargoHandler` - obsługa ładunków specjalnych
- `CargoDocuments` - dokumenty ładunku

### 2.8. TollManagement

Komponent do zarządzania opłatami drogowymi.

#### Funkcjonalności:
- Rejestr systemów opłat w różnych krajach
- Kalkulacja opłat dla planowanych tras
- Rozliczanie opłat drogowych
- Analiza kosztów opłat
- Zarządzanie urządzeniami do opłat (viabox, itp.)

#### Komponenty:
- `TollSystemRegistry` - rejestr systemów opłat
- `TollCalculator` - kalkulator opłat
- `TollExpenseTracker` - śledzenie wydatków
- `TollDeviceManager` - zarządzanie urządzeniami
- `TollReports` - raporty opłat

### 2.9. TruckService

Komponent do zarządzania serwisem i przeglądami tirów.

#### Funkcjonalności:
- Planowanie przeglądów i konserwacji
- Rejestr napraw i serwisów
- Zarządzanie częściami zamiennymi
- Monitoring kosztów serwisu
- Przypomnienia o terminach

#### Komponenty:
- `ServiceSchedule` - harmonogram serwisów
- `RepairRegistry` - rejestr napraw
- `SpareParts` - części zamienne
- `ServiceCostTracker` - śledzenie kosztów
- `ServiceReminders` - przypomnienia

### 2.10. TruckDocuments

Komponent do zarządzania dokumentacją związaną z tirami.

#### Funkcjonalności:
- Zarządzanie dokumentami pojazdów
- Zarządzanie dokumentami przewozowymi
- Zarządzanie dokumentami celnymi
- Archiwizacja i wyszukiwanie
- Generowanie raportów

#### Komponenty:
- `VehicleDocuments` - dokumenty pojazdów
- `TransportDocuments` - dokumenty przewozowe
- `CustomsDocuments` - dokumenty celne
- `DocumentArchive` - archiwum dokumentów
- `DocumentGenerator` - generator dokumentów

### 2.11. TruckAnalytics

Komponent do zaawansowanej analityki dla floty tirów.

#### Funkcjonalności:
- Analiza wydajności floty
- Analiza kosztów operacyjnych
- Analiza stylu jazdy kierowców
- Analiza zużycia paliwa
- Prognozowanie i trendy

#### Komponenty:
- `FleetPerformanceAnalytics` - analityka wydajności
- `CostAnalytics` - analityka kosztów
- `DriverBehaviorAnalytics` - analityka stylu jazdy
- `FuelConsumptionAnalytics` - analityka zużycia paliwa
- `PredictiveAnalytics` - analityka predykcyjna

## 3. Integracja z istniejącymi modułami

### 3.1. Integracja z modułem Settings

#### Rozszerzenia:
- Dodanie sekcji `TruckFleetSettings` w komponencie Settings
- Rozszerzenie `FleetConfiguration` o parametry specyficzne dla tirów
- Dodanie konfiguracji dla naczep i czasu pracy

#### Nowe komponenty:
- `TruckParametersSettings` - ustawienia parametrów tirów
- `TrailerSettings` - ustawienia naczep
- `WorkTimeSettings` - ustawienia czasu pracy
- `TollSystemSettings` - ustawienia systemów opłat

### 3.2. Integracja z modułem Statistics

#### Rozszerzenia:
- Dodanie nowych wskaźników KPI dla floty tirów
- Rozszerzenie analiz o dane specyficzne dla tirów
- Dodanie raportów zgodności z czasem pracy

#### Nowe komponenty:
- `TruckFleetKPIs` - wskaźniki KPI dla tirów
- `TruckPerformanceStats` - statystyki wydajności
- `WorkTimeComplianceStats` - statystyki zgodności czasu pracy
- `TollExpenseStats` - statystyki opłat drogowych

### 3.3. Integracja z modułem AI & Automation

#### Rozszerzenia:
- Dodanie modeli predykcyjnych dla awarii specyficznych dla tirów
- Rozszerzenie optymalizacji tras o ograniczenia dla ciężarówek
- Dodanie automatycznego planowania czasu pracy

#### Nowe komponenty:
- `TruckPredictiveMaintenance` - predykcyjna konserwacja
- `TruckRouteOptimizer` - optymalizator tras
- `WorkTimeOptimizer` - optymalizator czasu pracy
- `FuelEfficiencyPredictor` - predyktor efektywności paliwowej

### 3.4. Integracja z modułem Document Management

#### Rozszerzenia:
- Dodanie szablonów dokumentów specyficznych dla transportu międzynarodowego
- Rozszerzenie automatyzacji obiegu dokumentów
- Dodanie archiwizacji zgodnej z wymogami prawnymi

#### Nowe komponenty:
- `TransportDocumentTemplates` - szablony dokumentów
- `CMRGenerator` - generator listów przewozowych
- `CustomsDocumentHandler` - obsługa dokumentów celnych
- `DriverDocumentManager` - zarządzanie dokumentami kierowców

## 4. Model danych

### 4.1. Truck (Ciągnik)

```javascript
{
  id: String,
  registrationNumber: String,
  make: String,
  model: String,
  year: Number,
  vin: String,
  engineType: String,
  enginePower: Number,
  emissionStandard: String,
  fuelTankCapacity: Number,
  adBlueTankCapacity: Number,
  mileage: Number,
  status: String, // active, inactive, maintenance
  currentTrailer: String, // ID naczepy
  currentDriver: String, // ID kierowcy
  currentLocation: {
    latitude: Number,
    longitude: Number,
    timestamp: Date
  },
  technicalInspectionDate: Date,
  insuranceExpiryDate: Date,
  lastServiceDate: Date,
  nextServiceDue: {
    date: Date,
    mileage: Number
  },
  fuelConsumption: {
    average: Number,
    lastTrip: Number,
    lastMonth: Number
  },
  tires: [
    {
      position: String,
      brand: String,
      model: String,
      installationDate: Date,
      mileage: Number,
      treadDepth: Number
    }
  ],
  equipment: [String],
  notes: String,
  documents: [String] // IDs dokumentów
}
```

### 4.2. Trailer (Naczepa)

```javascript
{
  id: String,
  registrationNumber: String,
  type: String, // curtainside, refrigerated, tank, platform, etc.
  make: String,
  model: String,
  year: Number,
  vin: String,
  dimensions: {
    length: Number,
    width: Number,
    height: Number
  },
  capacity: {
    volume: Number,
    weight: Number
  },
  status: String, // active, inactive, maintenance
  currentTruck: String, // ID ciągnika
  technicalInspectionDate: Date,
  insuranceExpiryDate: Date,
  lastServiceDate: Date,
  nextServiceDue: Date,
  tires: [
    {
      position: String,
      brand: String,
      model: String,
      installationDate: Date,
      mileage: Number,
      treadDepth: Number
    }
  ],
  specialFeatures: [String], // e.g. refrigeration, ADR equipment
  temperatureControl: {
    hasTemperatureControl: Boolean,
    minTemperature: Number,
    maxTemperature: Number,
    zones: Number
  },
  notes: String,
  documents: [String] // IDs dokumentów
}
```

### 4.3. TruckDriver (Kierowca)

```javascript
{
  id: String,
  personalInfo: {
    firstName: String,
    lastName: String,
    birthDate: Date,
    idNumber: String,
    contactNumber: String,
    email: String,
    address: String
  },
  employmentInfo: {
    employmentDate: Date,
    employmentType: String,
    position: String,
    employeeId: String
  },
  qualifications: {
    drivingLicense: {
      number: String,
      categories: [String],
      expiryDate: Date
    },
    driverCPC: {
      number: String,
      expiryDate: Date,
      completedModules: [String]
    },
    adrCertificate: {
      has: Boolean,
      number: String,
      classes: [String],
      expiryDate: Date
    },
    otherCertificates: [
      {
        type: String,
        number: String,
        expiryDate: Date
      }
    ]
  },
  medicalInfo: {
    lastMedicalExam: Date,
    nextMedicalExam: Date,
    medicalRestrictions: [String]
  },
  drivingCard: {
    number: String,
    expiryDate: Date
  },
  currentVehicle: String, // ID pojazdu
  status: String, // active, rest, off-duty, sick-leave
  workTime: {
    currentPeriod: {
      start: Date,
      end: Date,
      type: String // driving, rest, other work
    },
    dailyDriving: Number, // w minutach
    weeklyDriving: Number, // w minutach
    biWeeklyDriving: Number, // w minutach
    lastRestPeriod: {
      start: Date,
      end: Date,
      type: String // daily, weekly
    }
  },
  performance: {
    fuelEfficiency: Number,
    averageSpeed: Number,
    harshBrakingEvents: Number,
    harshAccelerationEvents: Number,
    idlingTime: Number,
    overSpeedingEvents: Number
  },
  notes: String,
  documents: [String] // IDs dokumentów
}
```

### 4.4. Route (Trasa)

```javascript
{
  id: String,
  name: String,
  status: String, // planned, in-progress, completed, cancelled
  truck: String, // ID ciągnika
  trailer: String, // ID naczepy
  driver: String, // ID kierowcy
  cargo: String, // ID ładunku
  customer: String, // ID klienta
  startLocation: {
    name: String,
    address: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  endLocation: {
    name: String,
    address: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  waypoints: [
    {
      type: String, // loading, unloading, rest, border, toll
      name: String,
      address: String,
      coordinates: {
        latitude: Number,
        longitude: Number
      },
      plannedArrival: Date,
      plannedDeparture: Date,
      actualArrival: Date,
      actualDeparture: Date,
      notes: String
    }
  ],
  schedule: {
    plannedStart: Date,
    plannedEnd: Date,
    actualStart: Date,
    actualEnd: Date
  },
  distance: Number,
  estimatedFuelConsumption: Number,
  actualFuelConsumption: Number,
  estimatedAdBlueConsumption: Number,
  actualAdBlueConsumption: Number,
  tollCosts: {
    estimated: Number,
    actual: Number,
    breakdown: [
      {
        country: String,
        system: String,
        cost: Number
      }
    ]
  },
  otherCosts: [
    {
      type: String,
      description: String,
      amount: Number
    }
  ],
  restrictions: [
    {
      type: String, // weight, height, width, ADR, time
      description: String
    }
  ],
  notes: String,
  documents: [String] // IDs dokumentów
}
```

### 4.5. Cargo (Ładunek)

```javascript
{
  id: String,
  reference: String,
  description: String,
  type: String,
  status: String, // planned, in-transit, delivered, cancelled
  customer: String, // ID klienta
  route: String, // ID trasy
  properties: {
    weight: Number,
    volume: Number,
    loadingMeters: Number,
    packages: Number,
    pallets: Number
  },
  dimensions: {
    length: Number,
    width: Number,
    height: Number
  },
  hazardous: {
    isHazardous: Boolean,
    unNumber: String,
    class: String,
    packingGroup: String
  },
  temperature: {
    requiresTemperatureControl: Boolean,
    minTemperature: Number,
    maxTemperature: Number
  },
  loadingInfo: {
    location: String,
    address: String,
    date: Date,
    contactPerson: String,
    contactPhone: String,
    notes: String
  },
  unloadingInfo: {
    location: String,
    address: String,
    date: Date,
    contactPerson: String,
    contactPhone: String,
    notes: String
  },
  value: Number,
  insurance: {
    isInsured: Boolean,
    policyNumber: String,
    coverageAmount: Number
  },
  customsInfo: {
    requiresCustomsClearance: Boolean,
    customsStatus: String,
    taricCode: String,
    originCountry: String
  },
  notes: String,
  documents: [String] // IDs dokumentów
}
```

### 4.6. WorkTime (Czas pracy)

```javascript
{
  id: String,
  driver: String, // ID kierowcy
  date: Date,
  activities: [
    {
      type: String, // driving, rest, other work, availability
      start: Date,
      end: Date,
      duration: Number, // w minutach
      location: {
        latitude: Number,
        longitude: Number,
        address: String
      },
      notes: String
    }
  ],
  summary: {
    drivingTime: Number, // w minutach
    restTime: Number, // w minutach
    otherWorkTime: Number, // w minutach
    availabilityTime: Number // w minutach
  },
  tachographFile: String, // URL do pliku
  violations: [
    {
      type: String,
      description: String,
      severity: String
    }
  ],
  notes: String
}
```

### 4.7. TollExpense (Opłata drogowa)

```javascript
{
  id: String,
  route: String, // ID trasy
  truck: String, // ID ciągnika
  trailer: String, // ID naczepy
  driver: String, // ID kierowcy
  date: Date,
  country: String,
  tollSystem: String,
  tollOperator: String,
  entryPoint: String,
  exitPoint: String,
  distance: Number,
  amount: Number,
  currency: String,
  paymentMethod: String,
  receiptNumber: String,
  invoiceNumber: String,
  notes: String,
  document: String // ID dokumentu
}
```

### 4.8. ServiceRecord (Rekord serwisowy)

```javascript
{
  id: String,
  vehicle: String, // ID pojazdu (ciągnik lub naczepa)
  vehicleType: String, // truck lub trailer
  serviceType: String, // maintenance, repair, inspection
  date: Date,
  mileage: Number,
  workshop: {
    name: String,
    address: String,
    contactPerson: String,
    contactPhone: String
  },
  tasks: [
    {
      description: String,
      parts: [
        {
          name: String,
          partNumber: String,
          quantity: Number,
          unitPrice: Number
        }
      ],
      laborHours: Number,
      laborCost: Number
    }
  ],
  totalPartsCost: Number,
  totalLaborCost: Number,
  totalCost: Number,
  warranty: {
    isWarranty: Boolean,
    warrantyNumber: String,
    expiryDate: Date
  },
  nextServiceDue: {
    date: Date,
    mileage: Number
  },
  notes: String,
  documents: [String] // IDs dokumentów
}
```

## 5. API Endpoints

### 5.1. Trucks API

- `GET /api/truck-fleet/trucks` - Lista ciągników
- `GET /api/truck-fleet/trucks/:id` - Szczegóły ciągnika
- `POST /api/truck-fleet/trucks` - Dodanie ciągnika
- `PUT /api/truck-fleet/trucks/:id` - Aktualizacja ciągnika
- `DELETE /api/truck-fleet/trucks/:id` - Usunięcie ciągnika
- `GET /api/truck-fleet/trucks/:id/location` - Aktualna lokalizacja
- `GET /api/truck-fleet/trucks/:id/fuel-consumption` - Zużycie paliwa
- `GET /api/truck-fleet/trucks/:id/service-history` - Historia serwisowa

### 5.2. Trailers API

- `GET /api/truck-fleet/trailers` - Lista naczep
- `GET /api/truck-fleet/trailers/:id` - Szczegóły naczepy
- `POST /api/truck-fleet/trailers` - Dodanie naczepy
- `PUT /api/truck-fleet/trailers/:id` - Aktualizacja naczepy
- `DELETE /api/truck-fleet/trailers/:id` - Usunięcie naczepy
- `GET /api/truck-fleet/trailers/:id/service-history` - Historia serwisowa
- `PUT /api/truck-fleet/trailers/:id/assign` - Przypisanie do ciągnika

### 5.3. Drivers API

- `GET /api/truck-fleet/drivers` - Lista kierowców
- `GET /api/truck-fleet/drivers/:id` - Szczegóły kierowcy
- `POST /api/truck-fleet/drivers` - Dodanie kierowcy
- `PUT /api/truck-fleet/drivers/:id` - Aktualizacja kierowcy
- `DELETE /api/truck-fleet/drivers/:id` - Usunięcie kierowcy
- `GET /api/truck-fleet/drivers/:id/qualifications` - Kwalifikacje
- `GET /api/truck-fleet/drivers/:id/work-time` - Czas pracy
- `GET /api/truck-fleet/drivers/:id/performance` - Wydajność

### 5.4. Work Time API

- `GET /api/truck-fleet/work-time` - Lista rekordów czasu pracy
- `GET /api/truck-fleet/work-time/:id` - Szczegóły rekordu
- `POST /api/truck-fleet/work-time` - Dodanie rekordu
- `PUT /api/truck-fleet/work-time/:id` - Aktualizacja rekordu
- `GET /api/truck-fleet/work-time/driver/:driverId` - Czas pracy kierowcy
- `GET /api/truck-fleet/work-time/violations` - Lista naruszeń
- `POST /api/truck-fleet/work-time/tachograph-import` - Import danych z tachografu

### 5.5. Routes API

- `GET /api/truck-fleet/routes` - Lista tras
- `GET /api/truck-fleet/routes/:id` - Szczegóły trasy
- `POST /api/truck-fleet/routes` - Dodanie trasy
- `PUT /api/truck-fleet/routes/:id` - Aktualizacja trasy
- `DELETE /api/truck-fleet/routes/:id` - Usunięcie trasy
- `GET /api/truck-fleet/routes/:id/waypoints` - Punkty trasy
- `POST /api/truck-fleet/routes/optimize` - Optymalizacja trasy
- `GET /api/truck-fleet/routes/:id/toll-costs` - Koszty opłat drogowych

### 5.6. Cargo API

- `GET /api/truck-fleet/cargo` - Lista ładunków
- `GET /api/truck-fleet/cargo/:id` - Szczegóły ładunku
- `POST /api/truck-fleet/cargo` - Dodanie ładunku
- `PUT /api/truck-fleet/cargo/:id` - Aktualizacja ładunku
- `DELETE /api/truck-fleet/cargo/:id` - Usunięcie ładunku
- `POST /api/truck-fleet/cargo/load-planning` - Planowanie załadunku
- `GET /api/truck-fleet/cargo/:id/documents` - Dokumenty ładunku

### 5.7. Toll API

- `GET /api/truck-fleet/tolls` - Lista opłat drogowych
- `GET /api/truck-fleet/tolls/:id` - Szczegóły opłaty
- `POST /api/truck-fleet/tolls` - Dodanie opłaty
- `PUT /api/truck-fleet/tolls/:id` - Aktualizacja opłaty
- `GET /api/truck-fleet/tolls/systems` - Lista systemów opłat
- `GET /api/truck-fleet/tolls/calculate` - Kalkulacja opłat dla trasy
- `GET /api/truck-fleet/tolls/reports` - Raporty opłat

### 5.8. Service API

- `GET /api/truck-fleet/service-records` - Lista rekordów serwisowych
- `GET /api/truck-fleet/service-records/:id` - Szczegóły rekordu
- `POST /api/truck-fleet/service-records` - Dodanie rekordu
- `PUT /api/truck-fleet/service-records/:id` - Aktualizacja rekordu
- `GET /api/truck-fleet/service-records/vehicle/:vehicleId` - Rekordy dla pojazdu
- `GET /api/truck-fleet/service-schedules` - Harmonogramy serwisowe
- `GET /api/truck-fleet/spare-parts` - Części zamienne

### 5.9. Analytics API

- `GET /api/truck-fleet/analytics/fleet-performance` - Wydajność floty
- `GET /api/truck-fleet/analytics/fuel-consumption` - Zużycie paliwa
- `GET /api/truck-fleet/analytics/driver-performance` - Wydajność kierowców
- `GET /api/truck-fleet/analytics/cost-breakdown` - Podział kosztów
- `GET /api/truck-fleet/analytics/route-efficiency` - Efektywność tras
- `GET /api/truck-fleet/analytics/maintenance-prediction` - Predykcja konserwacji

## 6. Integracje zewnętrzne

### 6.1. Integracja z systemami telematycznymi

- Pobieranie danych lokalizacyjnych w czasie rzeczywistym
- Pobieranie danych z czujników pojazdu
- Pobieranie danych o stylu jazdy
- Pobieranie danych o zużyciu paliwa

### 6.2. Integracja z tachografami

- Import danych z tachografów cyfrowych
- Analiza czasu pracy i odpoczynku
- Wykrywanie naruszeń przepisów
- Generowanie raportów zgodności

### 6.3. Integracja z systemami opłat drogowych

- Automatyczne pobieranie danych o opłatach
- Rozliczanie opłat drogowych
- Zarządzanie urządzeniami do opłat
- Optymalizacja kosztów opłat

### 6.4. Integracja z systemami map i nawigacji

- Planowanie tras z uwzględnieniem ograniczeń dla ciężarówek
- Wyświetlanie lokalizacji pojazdów na mapie
- Nawigacja dla kierowców
- Informacje o ruchu drogowym i utrudnieniach

### 6.5. Integracja z systemami ERP/TMS

- Synchronizacja danych o zleceniach
- Synchronizacja danych o klientach
- Synchronizacja danych o kosztach
- Raportowanie do systemu nadrzędnego

## 7. Interfejs użytkownika

### 7.1. Główny dashboard

![TruckFleetDashboard](https://via.placeholder.com/800x600?text=TruckFleetDashboard)

Dashboard będzie zawierał:
- Górny pasek z kluczowymi wskaźnikami KPI
- Mapę z lokalizacją pojazdów
- Sekcję alertów i powiadomień
- Widżety z najważniejszymi informacjami
- Panel szybkiego dostępu do najczęściej używanych funkcji

### 7.2. Zarządzanie ciągnikami

![TruckManagement](https://via.placeholder.com/800x600?text=TruckManagement)

Ekran zarządzania ciągnikami będzie zawierał:
- Tabelę z listą ciągników
- Filtry i wyszukiwarkę
- Panel szczegółów wybranego ciągnika
- Zakładki z różnymi kategoriami informacji
- Przyciski akcji (edycja, serwis, przypisanie kierowcy/naczepy)

### 7.3. Zarządzanie naczepami

![TrailerManagement](https://via.placeholder.com/800x600?text=TrailerManagement)

Ekran zarządzania naczepami będzie zawierał:
- Tabelę z listą naczep
- Filtry według typów naczep
- Panel szczegółów wybranej naczepy
- Informacje o przypisaniu do ciągnika
- Przyciski akcji (edycja, serwis, przypisanie)

### 7.4. Zarządzanie czasem pracy

![WorkTimeTracking](https://via.placeholder.com/800x600?text=WorkTimeTracking)

Ekran zarządzania czasem pracy będzie zawierał:
- Kalendarz czasu pracy
- Wykres aktywności kierowcy
- Informacje o limitach czasu pracy
- Alerty o zbliżających się limitach
- Panel importu danych z tachografu

### 7.5. Optymalizacja tras

![RouteOptimization](https://via.placeholder.com/800x600?text=RouteOptimization)

Ekran optymalizacji tras będzie zawierał:
- Mapę z trasą
- Panel planowania trasy
- Informacje o ograniczeniach na trasie
- Kalkulator kosztów trasy
- Planer postojów i odpoczynków

## 8. Wdrożenie i rozwój

### 8.1. Plan wdrożenia

1. **Faza 1: Podstawowe zarządzanie flotą tirów**
   - Implementacja TruckFleetDashboard
   - Implementacja TruckManagement
   - Implementacja TrailerManagement
   - Integracja z istniejącymi modułami

2. **Faza 2: Zarządzanie kierowcami i czasem pracy**
   - Implementacja TruckDrivers
   - Implementacja WorkTimeTracking
   - Integracja z tachografami

3. **Faza 3: Zarządzanie trasami i ładunkami**
   - Implementacja RouteOptimization
   - Implementacja CargoPlanning
   - Implementacja TollManagement

4. **Faza 4: Zarządzanie serwisem i dokumentacją**
   - Implementacja TruckService
   - Implementacja TruckDocuments
   - Rozszerzenie integracji z Document Management

5. **Faza 5: Zaawansowana analityka i optymalizacja**
   - Implementacja TruckAnalytics
   - Rozszerzenie integracji z AI & Automation
   - Implementacja predykcyjnej konserwacji

### 8.2. Priorytety rozwoju

1. **Wysoki priorytet**
   - Podstawowe zarządzanie ciągnikami i naczepami
   - Monitoring czasu pracy kierowców
   - Zarządzanie dokumentacją

2. **Średni priorytet**
   - Optymalizacja tras
   - Zarządzanie opłatami drogowymi
   - Integracja z systemami telematycznymi

3. **Niski priorytet**
   - Zaawansowana analityka
   - Predykcyjna konserwacja
   - Integracje z systemami zewnętrznymi

### 8.3. Szacowany czas realizacji

- **Faza 1:** 4-6 tygodni
- **Faza 2:** 3-4 tygodnie
- **Faza 3:** 4-6 tygodni
- **Faza 4:** 3-4 tygodnie
- **Faza 5:** 4-6 tygodni

**Całkowity czas realizacji:** 18-26 tygodni (4-6 miesięcy)
