/**
 * Mock data service for tires analytics
 * Provides mock data for tire analytics charts and recommendations
 */

// Mock tire analytics data
const mockTireAnalytics = {
  // Average lifespan by brand in kilometers
  lifespanByBrand: [
    { brand: "Michelin", lifespan: 150000, color: "#4caf50" },
    { brand: "Continental", lifespan: 135000, color: "#2196f3" },
    { brand: "Bridgestone", lifespan: 140000, color: "#ff9800" },
    { brand: "Goodyear", lifespan: 130000, color: "#f44336" },
    { brand: "Pirelli", lifespan: 125000, color: "#9c27b0" },
    { brand: "Hankook", lifespan: 120000, color: "#00bcd4" },
    { brand: "Dunlop", lifespan: 128000, color: "#ffeb3b" }
  ],
  
  // Cost analysis data
  costAnalysis: {
    // Cost breakdown by category
    costBreakdown: [
      { category: "Zakup opon", cost: 450000, percentage: 65, color: "#4caf50" },
      { category: "Wymiana", cost: 120000, percentage: 17, color: "#2196f3" },
      { category: "Naprawy", cost: 85000, percentage: 12, color: "#ff9800" },
      { category: "Przechowywanie", cost: 42000, percentage: 6, color: "#f44336" }
    ],
    
    // Cost trends over time (last 12 months)
    costTrends: [
      { month: "Kwiecień", year: 2023, cost: 58000 },
      { month: "Maj", year: 2023, cost: 52000 },
      { month: "Czerwiec", year: 2023, cost: 48000 },
      { month: "Lipiec", year: 2023, cost: 45000 },
      { month: "Sierpień", year: 2023, cost: 47000 },
      { month: "Wrzesień", year: 2023, cost: 51000 },
      { month: "Październik", year: 2023, cost: 62000 },
      { month: "Listopad", year: 2023, cost: 68000 },
      { month: "Grudzień", year: 2023, cost: 72000 },
      { month: "Styczeń", year: 2024, cost: 75000 },
      { month: "Luty", year: 2024, cost: 65000 },
      { month: "Marzec", year: 2024, cost: 60000 }
    ],
    
    // Cost per kilometer by brand
    costPerKm: [
      { brand: "Michelin", cost: 0.32, color: "#4caf50" },
      { brand: "Continental", cost: 0.29, color: "#2196f3" },
      { brand: "Bridgestone", cost: 0.31, color: "#ff9800" },
      { brand: "Goodyear", cost: 0.28, color: "#f44336" },
      { brand: "Pirelli", cost: 0.33, color: "#9c27b0" },
      { brand: "Hankook", cost: 0.25, color: "#00bcd4" },
      { brand: "Dunlop", cost: 0.27, color: "#ffeb3b" }
    ]
  },
  
  // Fuel efficiency impact data
  fuelEfficiency: {
    // Fuel consumption difference by tire brand (percentage compared to fleet average)
    consumptionByBrand: [
      { brand: "Michelin", difference: -3.2, color: "#4caf50" },
      { brand: "Continental", difference: -2.8, color: "#2196f3" },
      { brand: "Bridgestone", difference: -2.5, color: "#ff9800" },
      { brand: "Goodyear", difference: -2.7, color: "#f44336" },
      { brand: "Pirelli", difference: -1.8, color: "#9c27b0" },
      { brand: "Hankook", difference: -1.2, color: "#00bcd4" },
      { brand: "Dunlop", difference: -2.0, color: "#ffeb3b" }
    ],
    
    // Fuel savings over time with premium tires vs standard tires
    savingsOverTime: [
      { month: "Kwiecień", year: 2023, premium: 8500, standard: 9200 },
      { month: "Maj", year: 2023, premium: 8600, standard: 9300 },
      { month: "Czerwiec", year: 2023, premium: 8800, standard: 9500 },
      { month: "Lipiec", year: 2023, premium: 9000, standard: 9700 },
      { month: "Sierpień", year: 2023, premium: 8900, standard: 9600 },
      { month: "Wrzesień", year: 2023, premium: 8700, standard: 9400 },
      { month: "Październik", year: 2023, premium: 8600, standard: 9300 },
      { month: "Listopad", year: 2023, premium: 8800, standard: 9500 },
      { month: "Grudzień", year: 2023, premium: 9100, standard: 9800 },
      { month: "Styczeń", year: 2024, premium: 9200, standard: 9900 },
      { month: "Luty", year: 2024, premium: 9000, standard: 9700 },
      { month: "Marzec", year: 2024, premium: 8800, standard: 9500 }
    ],
    
    // Projected annual savings with different tire types
    projectedSavings: [
      { tireType: "Premium", savings: 42000, color: "#4caf50" },
      { tireType: "Mid-range", savings: 28000, color: "#2196f3" },
      { tireType: "Budget", savings: 12000, color: "#ff9800" },
      { tireType: "Retreaded", savings: 18000, color: "#f44336" }
    ]
  },
  
  // Tire recommendations based on analysis
  recommendations: [
    {
      id: "REC001",
      title: "Przejście na opony Michelin X Line Energy",
      description: "Analiza wykazuje, że opony Michelin X Line Energy oferują najlepszą kombinację żywotności i efektywności paliwowej dla floty ciężarówek dalekobieżnych.",
      potentialSavings: 38500,
      implementationCost: 120000,
      roi: 3.1,
      priority: "high"
    },
    {
      id: "REC002",
      title: "Optymalizacja ciśnienia w oponach",
      description: "Zwiększenie częstotliwości kontroli ciśnienia w oponach może zmniejszyć zużycie paliwa o 1.5% i wydłużyć żywotność opon o 10%.",
      potentialSavings: 25000,
      implementationCost: 5000,
      roi: 5.0,
      priority: "high"
    },
    {
      id: "REC003",
      title: "Program rotacji opon",
      description: "Wdrożenie systematycznego programu rotacji opon co 30,000 km może wydłużyć ich żywotność o 15-20%.",
      potentialSavings: 32000,
      implementationCost: 18000,
      roi: 1.8,
      priority: "medium"
    },
    {
      id: "REC004",
      title: "Szkolenie kierowców",
      description: "Szkolenie kierowców w zakresie technik jazdy oszczędzających opony może zmniejszyć zużycie opon o 12% i poprawić efektywność paliwową.",
      potentialSavings: 28000,
      implementationCost: 15000,
      roi: 1.9,
      priority: "medium"
    },
    {
      id: "REC005",
      title: "Przejście na opony całoroczne dla pojazdów miejskich",
      description: "Dla pojazdów operujących głównie w obszarach miejskich, przejście na wysokiej jakości opony całoroczne może zmniejszyć koszty i czas przestojów związanych z sezonową wymianą opon.",
      potentialSavings: 18000,
      implementationCost: 22000,
      roi: 0.8,
      priority: "low"
    },
    {
      id: "REC006",
      title: "Centralizacja zakupów opon",
      description: "Negocjowanie umów ramowych z jednym lub dwoma dostawcami opon może przynieść oszczędności rzędu 8-12% na zakupach opon.",
      potentialSavings: 42000,
      implementationCost: 0,
      roi: "∞",
      priority: "high"
    },
    {
      id: "REC007",
      title: "Wdrożenie systemu monitorowania ciśnienia w oponach (TPMS)",
      description: "Instalacja systemów TPMS we wszystkich pojazdach może zapobiec awariom opon, zmniejszyć zużycie paliwa i wydłużyć żywotność opon.",
      potentialSavings: 35000,
      implementationCost: 48000,
      roi: 0.7,
      priority: "medium"
    },
    {
      id: "REC008",
      title: "Testowanie opon bieżnikowanych dla naczep",
      description: "Wykorzystanie wysokiej jakości opon bieżnikowanych na osiach naczep może zmniejszyć koszty opon o 30-40% przy zachowaniu akceptowalnej wydajności.",
      potentialSavings: 28000,
      implementationCost: 5000,
      roi: 5.6,
      priority: "medium"
    }
  ]
};

export default mockTireAnalytics;
