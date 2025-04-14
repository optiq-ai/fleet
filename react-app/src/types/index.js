// Common types for the Fleet App

/**
 * @typedef {Object} DriverShift
 * @property {string} start - Start time of the shift
 * @property {string} end - End time of the shift
 * @property {number} duration - Duration of the shift in hours
 * @property {number} remaining - Remaining time in hours
 */

/**
 * @typedef {Object} DriverMetrics
 * @property {number} blinkRate - Rate of blinking
 * @property {number} yawns - Number of yawns detected
 * @property {string} headPosition - Position of the driver's head
 * @property {number} eyesClosed - Duration of eyes closed in seconds
 * @property {number} distractions - Number of distractions detected
 * @property {number} focusScore - Overall focus score
 */

/**
 * @typedef {Object} Driver
 * @property {string} name - Driver's name
 * @property {string} id - Driver's ID
 * @property {string} vehicle - Vehicle ID assigned to driver
 * @property {DriverShift} shift - Driver's shift information
 * @property {DriverMetrics} metrics - Driver's monitoring metrics
 */

/**
 * @typedef {'low' | 'medium' | 'high'} AlertSeverity
 */

/**
 * @typedef {'normal' | 'warning' | 'danger' | 'inactive'} MonitoringStatus
 */

/**
 * @typedef {Object} Alert
 * @property {string} id - Alert ID
 * @property {string} title - Alert title
 * @property {string} details - Alert details
 * @property {AlertSeverity} severity - Alert severity level
 * @property {string} timestamp - Alert timestamp
 */

/**
 * @typedef {Object} FatigueMonitoringSettings
 * @property {boolean} enableFatigueDetection - Whether fatigue detection is enabled
 * @property {boolean} enableDistractionDetection - Whether distraction detection is enabled
 * @property {boolean} enableAlerts - Whether alerts are enabled
 * @property {number} alertSensitivity - Sensitivity level for alerts
 * @property {number} blinkRateThreshold - Threshold for blink rate
 * @property {number} yawnThreshold - Threshold for yawns
 * @property {number} eyesClosedThreshold - Threshold for eyes closed duration
 * @property {number} distractionThreshold - Threshold for distractions
 */

/**
 * @typedef {Object} Vehicle
 * @property {string} id - Vehicle ID
 * @property {string} registrationNumber - Vehicle registration number
 * @property {string} make - Vehicle make
 * @property {string} model - Vehicle model
 * @property {number} year - Vehicle year
 * @property {string} status - Vehicle status
 */

/**
 * @typedef {Object} FraudAlertDetails
 * @property {string} transactionId - Transaction ID
 * @property {number} amount - Transaction amount
 * @property {string} fuelType - Type of fuel
 * @property {number} quantity - Fuel quantity
 * @property {string} driverId - Driver ID
 * @property {Object} [locationCoordinates] - Location coordinates
 * @property {number} locationCoordinates.latitude - Latitude
 * @property {number} locationCoordinates.longitude - Longitude
 */

/**
 * @typedef {Object} FraudAlert
 * @property {string} id - Alert ID
 * @property {string} priority - Alert priority
 * @property {string} vehicle - Vehicle ID
 * @property {string} description - Alert description
 * @property {string} date - Alert date
 * @property {string} location - Alert location
 * @property {string} status - Alert status
 * @property {FraudAlertDetails} details - Alert details
 */

/**
 * @typedef {Object} SafetyAlertDetails
 * @property {string} incidentType - Type of incident
 * @property {string} severity - Incident severity
 * @property {string} driverState - State of the driver
 * @property {number} vehicleSpeed - Vehicle speed
 * @property {string} [videoUrl] - URL to incident video
 * @property {Object} [locationCoordinates] - Location coordinates
 * @property {number} locationCoordinates.latitude - Latitude
 * @property {number} locationCoordinates.longitude - Longitude
 */

/**
 * @typedef {Object} SafetyAlert
 * @property {string} id - Alert ID
 * @property {string} type - Alert type
 * @property {string} driver - Driver ID
 * @property {string} description - Alert description
 * @property {string} time - Alert time
 * @property {string} location - Alert location
 * @property {string} status - Alert status
 * @property {SafetyAlertDetails} details - Alert details
 */

/**
 * @typedef {Object} MaintenanceForecastDetails
 * @property {string} componentId - Component ID
 * @property {number} currentHealth - Current health percentage
 * @property {string} predictedFailureDate - Predicted failure date
 * @property {string} recommendedAction - Recommended action
 */

/**
 * @typedef {Object} MaintenanceForecast
 * @property {string} id - Forecast ID
 * @property {string} vehicle - Vehicle ID
 * @property {string} component - Component name
 * @property {string} forecast - Forecast description
 * @property {string} confidence - Confidence level
 * @property {MaintenanceForecastDetails} details - Forecast details
 */

/**
 * @typedef {Object} ViewSection
 * @property {string} id - Section ID
 * @property {string} name - Section name
 * @property {string} type - Section type
 * @property {boolean} visible - Whether section is visible
 * @property {number} order - Section order
 */

/**
 * @typedef {Object} View
 * @property {string} id - View ID
 * @property {string} name - View name
 * @property {string} description - View description
 * @property {boolean} isDefault - Whether view is default
 * @property {ViewSection[]} sections - View sections
 * @property {string[]} userGroups - User groups with access to this view
 */

// Export empty object to maintain module structure
export default {};
