# Fuel Analysis Component Documentation

## Overview
The Fuel Analysis component provides comprehensive analysis of fuel consumption by fleet vehicles, anomaly detection, cost optimization, and CO2 emissions monitoring. It helps fleet managers identify inefficiencies, detect potential fuel theft, optimize costs, and monitor environmental impact.

## Features
- Dashboard with key performance indicators
- Fuel consumption analysis with time-based charts
- Vehicle/driver/route comparison
- Anomaly detection in fuel consumption patterns
- Cost optimization recommendations
- CO2 emissions monitoring and compliance tracking

## Component Structure
The component is organized into four main tabs:
1. **Fuel Consumption Analysis** - Charts and tables showing fuel usage over time
2. **Anomalies Detection** - Identification of unusual fuel consumption patterns
3. **Cost Optimization** - Recommendations for reducing fuel costs
4. **CO2 Emissions** - Monitoring of carbon emissions and compliance

## Data Services
- `fuelAnalysisService.js` - Service for API communication
- `mockFuelAnalysisService.js` - Mock service providing test data

## Chart Components
- `FuelConsumptionChart.jsx` - Displays fuel consumption over time
- `FuelComparisonChart.jsx` - Compares fuel usage between vehicles/drivers/routes
- `AnomaliesChart.jsx` - Visualizes anomalies in fuel consumption
- `CostOptimizationChart.jsx` - Shows potential cost savings
- `CO2EmissionChart.jsx` - Displays CO2 emissions over time

## State Management
The component uses React hooks for state management:
- `kpiData` - Key performance indicators
- `fuelConsumption` - Fuel consumption data
- `fuelComparison` - Comparison data between vehicles/drivers/routes
- `anomalies` - Anomaly detection data
- `costOptimization` - Cost optimization recommendations
- `co2Emission` - CO2 emissions data
- `activeTab` - Currently active tab
- `filters` - User-selected filters
- `pagination` - Pagination state for tables
- `isLoading` - Loading state
- `error` - Error state
- `useMockData` - Toggle between mock data and API

## Key Functions
- `fetchAllData()` - Fetches all data needed for the component
- `handleFilterChange()` - Handles filter changes
- `handlePageChange()` - Handles pagination
- `handleTabChange()` - Handles tab switching
- `handleExportCSV()` - Exports data to CSV
- `handleExportPDF()` - Exports data to PDF
- `handleToggleMockData()` - Toggles between mock data and API

## Filters
The component supports filtering by:
- Time period (day, week, month, year)
- Vehicle
- Driver
- Comparison type (vehicle, driver, route)
- Anomaly severity

## Export Functionality
Users can export data in two formats:
- CSV - For data analysis in spreadsheet applications
- PDF - For reporting and sharing

## Responsive Design
The component is fully responsive and adapts to different screen sizes:
- Desktop view with multi-column layout
- Tablet view with adjusted column sizes
- Mobile view with stacked layout

## Error Handling
- Displays error messages when data cannot be loaded
- Logs detailed errors to console
- Provides fallback UI when data is unavailable

## Integration with Other Modules
- Connects with Vehicle Overview for detailed vehicle information
- Shares data with Route Optimization for efficiency improvements
- Provides data to Driver Safety for driver behavior analysis
