/**
 * Mock data for AI & Automation section
 * Contains sample data for all AI & Automation components
 */

// Predictive Analytics mock data
export const predictiveAnalyticsMockData = {
  vehicleFailures: [
    { id: 1, vehicleId: 'VH-1234', component: 'Brake System', probability: 0.87, estimatedTimeToFailure: '14 days', suggestedAction: 'Schedule maintenance within 7 days', severity: 'high' },
    { id: 2, vehicleId: 'VH-2345', component: 'Battery', probability: 0.65, estimatedTimeToFailure: '30 days', suggestedAction: 'Monitor battery voltage', severity: 'medium' },
    { id: 3, vehicleId: 'VH-3456', component: 'Transmission', probability: 0.42, estimatedTimeToFailure: '45 days', suggestedAction: 'Check during next scheduled maintenance', severity: 'low' },
    { id: 4, vehicleId: 'VH-4567', component: 'Engine Oil', probability: 0.91, estimatedTimeToFailure: '5 days', suggestedAction: 'Immediate oil change required', severity: 'critical' },
    { id: 5, vehicleId: 'VH-5678', component: 'Tire Wear', probability: 0.78, estimatedTimeToFailure: '21 days', suggestedAction: 'Schedule tire rotation', severity: 'medium' }
  ],
  deliveryDelays: [
    { id: 1, routeId: 'RT-1234', probability: 0.75, estimatedDelay: '45 minutes', cause: 'Traffic congestion', suggestedAction: 'Reroute via highway 101' },
    { id: 2, routeId: 'RT-2345', probability: 0.62, estimatedDelay: '30 minutes', cause: 'Weather conditions', suggestedAction: 'Adjust departure time' },
    { id: 3, routeId: 'RT-3456', probability: 0.38, estimatedDelay: '15 minutes', cause: 'Road construction', suggestedAction: 'No action needed' }
  ],
  fuelConsumption: [
    { id: 1, vehicleId: 'VH-1234', predictedConsumption: '32.5 L/100km', co2Emission: '85.3 g/km', improvementSuggestion: 'Reduce idle time by 15%' },
    { id: 2, vehicleId: 'VH-2345', predictedConsumption: '28.7 L/100km', co2Emission: '75.1 g/km', improvementSuggestion: 'Optimize route to avoid steep inclines' },
    { id: 3, vehicleId: 'VH-3456', predictedConsumption: '35.2 L/100km', co2Emission: '92.4 g/km', improvementSuggestion: 'Check tire pressure weekly' }
  ],
  maintenanceSchedule: [
    { id: 1, vehicleId: 'VH-1234', component: 'Air Filter', optimalReplacementDate: '2025-05-15', costSaving: '€120', extendedLifespan: '2 months' },
    { id: 2, vehicleId: 'VH-2345', component: 'Brake Pads', optimalReplacementDate: '2025-04-28', costSaving: '€200', extendedLifespan: '1.5 months' },
    { id: 3, vehicleId: 'VH-3456', component: 'Transmission Fluid', optimalReplacementDate: '2025-06-10', costSaving: '€150', extendedLifespan: '3 months' }
  ]
};

// Automated Workflows mock data
export const automatedWorkflowsMockData = {
  routePlanning: [
    { id: 1, name: 'Optimal Fuel Consumption', description: 'Prioritizes routes with lowest fuel consumption', active: true, createdAt: '2025-01-15', lastRun: '2025-04-16' },
    { id: 2, name: 'Fastest Delivery', description: 'Prioritizes routes with shortest delivery time', active: false, createdAt: '2025-02-10', lastRun: '2025-03-22' },
    { id: 3, name: 'Driver Hours Optimization', description: 'Optimizes routes based on driver working hours', active: true, createdAt: '2025-03-05', lastRun: '2025-04-15' }
  ],
  driverAssignment: [
    { id: 1, name: 'Proximity Based', description: 'Assigns drivers based on proximity to pickup location', active: true, createdAt: '2025-01-20', lastRun: '2025-04-16' },
    { id: 2, name: 'Qualification Priority', description: 'Prioritizes drivers with specific qualifications', active: true, createdAt: '2025-02-15', lastRun: '2025-04-15' },
    { id: 3, name: 'Balanced Workload', description: 'Distributes tasks evenly among available drivers', active: false, createdAt: '2025-03-10', lastRun: '2025-03-25' }
  ],
  reportGeneration: [
    { id: 1, name: 'Daily Operations Summary', description: 'Generates daily summary of fleet operations', schedule: 'Daily at 18:00', recipients: ['operations@fleet.com', 'management@fleet.com'], active: true },
    { id: 2, name: 'Weekly Fuel Consumption', description: 'Analyzes weekly fuel consumption patterns', schedule: 'Monday at 08:00', recipients: ['fleet-managers@fleet.com'], active: true },
    { id: 3, name: 'Monthly Maintenance Report', description: 'Summarizes maintenance activities and costs', schedule: '1st of month at 09:00', recipients: ['maintenance@fleet.com', 'finance@fleet.com'], active: true }
  ],
  documentProcessing: [
    { id: 1, name: 'Invoice Generation', description: 'Automatically generates invoices for completed deliveries', triggers: 'On delivery completion', active: true, lastRun: '2025-04-16' },
    { id: 2, name: 'Maintenance Records', description: 'Creates and archives maintenance records', triggers: 'On maintenance completion', active: true, lastRun: '2025-04-14' },
    { id: 3, name: 'Regulatory Compliance', description: 'Generates required regulatory reports', triggers: 'Monthly and on-demand', active: true, lastRun: '2025-04-01' }
  ]
};

// Anomaly Detection mock data
export const anomalyDetectionMockData = {
  driverBehavior: [
    { id: 1, driverId: 'DR-1234', anomalyType: 'Harsh Braking', occurrences: 12, lastDetected: '2025-04-16 14:23', severity: 'medium', status: 'under review' },
    { id: 2, driverId: 'DR-2345', anomalyType: 'Speeding', occurrences: 8, lastDetected: '2025-04-15 09:45', severity: 'high', status: 'addressed' },
    { id: 3, driverId: 'DR-3456', anomalyType: 'Unauthorized Stop', occurrences: 3, lastDetected: '2025-04-14 16:30', severity: 'low', status: 'monitoring' }
  ],
  fuelUsage: [
    { id: 1, vehicleId: 'VH-1234', anomalyType: 'Sudden Increase', detectedAt: '2025-04-16 10:15', deviation: '+25%', potentialCause: 'Fuel leak', status: 'investigating' },
    { id: 2, vehicleId: 'VH-5678', anomalyType: 'Consistent Overconsumption', detectedAt: '2025-04-15 08:30', deviation: '+15%', potentialCause: 'Engine inefficiency', status: 'scheduled maintenance' }
  ],
  routeDeviations: [
    { id: 1, tripId: 'TR-1234', driverId: 'DR-2345', detectedAt: '2025-04-16 11:20', deviationType: 'Unplanned detour', duration: '45 minutes', distance: '28 km', status: 'justified' },
    { id: 2, tripId: 'TR-2345', driverId: 'DR-1234', detectedAt: '2025-04-15 14:50', deviationType: 'Unauthorized stop', duration: '35 minutes', distance: '0 km', status: 'investigating' }
  ],
  financialAnomalies: [
    { id: 1, category: 'Maintenance', detectedAt: '2025-04-10', anomalyType: 'Unusual expense pattern', amount: '€1,250', deviation: '+40%', status: 'under review' },
    { id: 2, category: 'Fuel', detectedAt: '2025-04-05', anomalyType: 'Duplicate transaction', amount: '€350', deviation: 'N/A', status: 'resolved' }
  ]
};

// Natural Language Interface mock data
export const naturalLanguageInterfaceMockData = {
  recentQueries: [
    { id: 1, query: 'Show me all vehicles due for maintenance next week', timestamp: '2025-04-16 15:30', user: 'Fleet Manager', status: 'completed' },
    { id: 2, query: 'Which drivers have the highest fuel efficiency this month?', timestamp: '2025-04-16 14:15', user: 'Operations Director', status: 'completed' },
    { id: 3, query: 'Generate a report of all delivery delays in the past 7 days', timestamp: '2025-04-16 11:45', user: 'Logistics Coordinator', status: 'completed' },
    { id: 4, query: 'What is the current location of vehicle VH-3456?', timestamp: '2025-04-16 10:20', user: 'Dispatcher', status: 'completed' },
    { id: 5, query: 'Schedule maintenance for all vehicles with brake issues', timestamp: '2025-04-15 16:40', user: 'Maintenance Manager', status: 'completed' }
  ],
  suggestedQueries: [
    'Show vehicles with critical maintenance alerts',
    'List drivers with safety violations this month',
    'Generate fuel consumption report by vehicle type',
    'Show delivery performance metrics for this week',
    'Find routes with frequent traffic delays'
  ],
  commandHistory: [
    { id: 1, command: 'Assign driver DR-1234 to route RT-5678', timestamp: '2025-04-16 09:15', user: 'Dispatcher', status: 'executed' },
    { id: 2, command: 'Reschedule delivery for order #45678 to tomorrow', timestamp: '2025-04-15 14:30', user: 'Customer Service', status: 'executed' },
    { id: 3, command: 'Mark vehicle VH-2345 as out of service', timestamp: '2025-04-15 11:20', user: 'Maintenance Manager', status: 'executed' }
  ]
};

// Smart Alerts mock data
export const smartAlertsMockData = {
  activeAlerts: [
    { id: 1, type: 'Maintenance', priority: 'Critical', message: 'Vehicle VH-4567 requires immediate brake inspection', timestamp: '2025-04-16 08:45', status: 'unacknowledged' },
    { id: 2, type: 'Driver Safety', priority: 'High', message: 'Driver DR-2345 has shown patterns of harsh braking', timestamp: '2025-04-16 10:30', status: 'acknowledged' },
    { id: 3, type: 'Route', priority: 'Medium', message: 'Delivery route RT-3456 has significant traffic delay', timestamp: '2025-04-16 11:15', status: 'in progress' },
    { id: 4, type: 'Compliance', priority: 'High', message: 'Vehicle VH-5678 insurance expires in 3 days', timestamp: '2025-04-16 09:20', status: 'in progress' },
    { id: 5, type: 'Fuel', priority: 'Low', message: 'Unusual fuel consumption detected for vehicle VH-1234', timestamp: '2025-04-16 12:45', status: 'unacknowledged' }
  ],
  alertSettings: [
    { id: 1, category: 'Maintenance', priority: 'Critical', notificationChannels: ['Email', 'SMS', 'Dashboard'], recipients: ['maintenance-team', 'fleet-manager'] },
    { id: 2, category: 'Driver Safety', priority: 'High', notificationChannels: ['Email', 'Dashboard'], recipients: ['safety-officer', 'driver-manager'] },
    { id: 3, category: 'Route', priority: 'Medium', notificationChannels: ['Dashboard'], recipients: ['dispatchers'] },
    { id: 4, category: 'Compliance', priority: 'High', notificationChannels: ['Email', 'Dashboard'], recipients: ['compliance-officer', 'fleet-manager'] },
    { id: 5, category: 'Fuel', priority: 'Low', notificationChannels: ['Dashboard'], recipients: ['fleet-manager'] }
  ],
  alertHistory: [
    { id: 1, type: 'Maintenance', priority: 'High', message: 'Vehicle VH-2345 due for transmission service', timestamp: '2025-04-15 14:20', status: 'resolved', resolvedAt: '2025-04-15 16:45', resolvedBy: 'Maintenance Manager' },
    { id: 2, type: 'Compliance', priority: 'Critical', message: 'Driver DR-3456 license expired', timestamp: '2025-04-14 09:30', status: 'resolved', resolvedAt: '2025-04-14 11:15', resolvedBy: 'Compliance Officer' },
    { id: 3, type: 'Fuel', priority: 'Medium', message: 'Fuel theft suspected for vehicle VH-6789', timestamp: '2025-04-13 16:10', status: 'resolved', resolvedAt: '2025-04-14 10:30', resolvedBy: 'Security Officer' }
  ]
};

// Scenario Simulation mock data
export const scenarioSimulationMockData = {
  fleetScenarios: [
    { id: 1, name: 'Electric Vehicle Transition', description: 'Simulates gradual transition to electric vehicles', parameters: { transitionPeriod: '36 months', replacementRate: '25% per year', vehicleTypes: ['Delivery Vans', 'Light Trucks'] }, status: 'ready' },
    { id: 2, name: 'Fleet Expansion', description: 'Simulates adding 50 new vehicles to the fleet', parameters: { expansionPeriod: '12 months', vehicleTypes: ['Heavy Trucks', 'Refrigerated Vans'], operationalAreas: ['North Region', 'Central Region'] }, status: 'in progress' },
    { id: 3, name: 'Maintenance Strategy Optimization', description: 'Compares preventive vs. predictive maintenance approaches', parameters: { simulationPeriod: '24 months', vehicleSample: 'All', maintenanceStrategies: ['Current', 'Preventive', 'Predictive'] }, status: 'completed' }
  ],
  assignmentScenarios: [
    { id: 1, name: 'Driver Specialization', description: 'Simulates assigning drivers based on route specialization', parameters: { simulationPeriod: '3 months', driverGroups: ['Urban', 'Highway', 'International'], routeTypes: ['Local', 'Regional', 'Long-haul'] }, status: 'ready' },
    { id: 2, name: 'Vehicle-Driver Matching', description: 'Optimizes vehicle assignment based on driver experience', parameters: { simulationPeriod: '6 months', matchingCriteria: ['Experience', 'Safety Record', 'Efficiency'] }, status: 'completed' }
  ],
  externalFactorsScenarios: [
    { id: 1, name: 'Fuel Price Volatility', description: 'Simulates impact of fuel price fluctuations', parameters: { simulationPeriod: '12 months', priceScenarios: ['Stable', 'Increasing', 'Volatile'], impactAreas: ['Operational Costs', 'Route Optimization', 'Vehicle Selection'] }, status: 'ready' },
    { id: 2, name: 'Severe Weather Patterns', description: 'Simulates impact of extreme weather conditions', parameters: { simulationPeriod: '6 months', weatherScenarios: ['Heavy Snow', 'Flooding', 'Heat Waves'], regions: ['North', 'South', 'Coastal'] }, status: 'in progress' }
  ],
  contingencyScenarios: [
    { id: 1, name: 'Driver Shortage', description: 'Simulates operations during 20% driver shortage', parameters: { simulationPeriod: '3 months', shortageSeverity: '20%', mitigationStrategies: ['Overtime', 'Temporary Drivers', 'Route Consolidation'] }, status: 'completed' },
    { id: 2, name: 'Vehicle Downtime Spike', description: 'Simulates handling increased vehicle maintenance issues', parameters: { simulationPeriod: '2 months', downtimeIncrease: '30%', affectedVehicleTypes: ['Heavy Trucks', 'Refrigerated Vans'] }, status: 'ready' }
  ]
};

// Continuous Optimization mock data
export const continuousOptimizationMockData = {
  systemParameters: [
    { id: 1, name: 'Route Planning Algorithm', currentValue: 'Balanced (Time/Fuel)', recommendedValue: 'Fuel Efficiency Priority', potentialImpact: 'Reduce fuel consumption by 7%', confidence: 'High', lastUpdated: '2025-04-15' },
    { id: 2, name: 'Driver Assignment Logic', currentValue: 'Proximity Based', recommendedValue: 'Experience + Proximity', potentialImpact: 'Improve delivery times by 12%', confidence: 'Medium', lastUpdated: '2025-04-10' },
    { id: 3, name: 'Maintenance Scheduling', currentValue: 'Fixed Intervals', recommendedValue: 'Usage-Based Predictive', potentialImpact: 'Reduce maintenance costs by 15%', confidence: 'High', lastUpdated: '2025-04-12' }
  ],
  processBottlenecks: [
    { id: 1, process: 'Loading Procedure', bottleneck: 'Documentation Verification', impact: 'Average 25 min delay per trip', recommendation: 'Implement digital verification system', priority: 'High' },
    { id: 2, process: 'Maintenance Workflow', bottleneck: 'Parts Availability', impact: 'Extended vehicle downtime', recommendation: 'Predictive parts inventory management', priority: 'Medium' },
    { id: 3, process: 'Driver Handover', bottleneck: 'Vehicle Inspection', impact: 'Shift transition delays', recommendation: 'Streamlined digital inspection process', priority: 'Low' }
  ],
  improvementSuggestions: [
    { id: 1, category: 'Fuel Efficiency', suggestion: 'Implement dynamic route adjustment based on real-time traffic', estimatedImpact: '5-8% fuel savings', implementationEffort: 'Medium', priority: 'High' },
    { id: 2, category: 'Driver Productivity', suggestion: 'Mobile app enhancements for faster delivery confirmation', estimatedImpact: '15 min saved per delivery', implementationEffort: 'Low', priority: 'High' },
    { id: 3, category: 'Vehicle Utilization', suggestion: 'Cross-dock operations for multi-region deliveries', estimatedImpact: '20% increase in vehicle utilization', implementationEffort: 'High', priority: 'Medium' }
  ],
  benchmarkData: [
    { id: 1, metric: 'Fuel Efficiency', currentValue: '32.5 L/100km', industryAverage: '35.2 L/100km', topPerformer: '29.8 L/100km', percentile: '65th', trend: 'Improving' },
    { id: 2, metric: 'Vehicle Downtime', currentValue: '8.5%', industryAverage: '12.3%', topPerformer: '6.2%', percentile: '78th', trend: 'Stable' },
    { id: 3, metric: 'On-Time Delivery', currentValue: '92.3%', industryAverage: '88.7%', topPerformer: '97.1%', percentile: '70th', trend: 'Improving' },
    { id: 4, metric: 'Cost per Kilometer', currentValue: '€1.25', industryAverage: '€1.42', topPerformer: '€1.08', percentile: '72nd', trend: 'Improving' }
  ]
};
