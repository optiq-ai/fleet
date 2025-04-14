-- Initialize Fleet App Database

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Vehicles table
CREATE TABLE IF NOT EXISTS vehicles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    registration_number VARCHAR(20) NOT NULL UNIQUE,
    make VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    year INTEGER NOT NULL,
    status VARCHAR(20) NOT NULL,
    current_driver UUID,
    latitude DECIMAL(10, 7),
    longitude DECIMAL(10, 7),
    last_update TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Drivers table
CREATE TABLE IF NOT EXISTS drivers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    license_number VARCHAR(50) NOT NULL UNIQUE,
    status VARCHAR(20) NOT NULL,
    safety_score INTEGER,
    current_vehicle UUID,
    latitude DECIMAL(10, 7),
    longitude DECIMAL(10, 7),
    last_update TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (current_vehicle) REFERENCES vehicles(id)
);

-- Add foreign key to vehicles table
ALTER TABLE vehicles ADD CONSTRAINT fk_current_driver FOREIGN KEY (current_driver) REFERENCES drivers(id);

-- Fraud alerts table
CREATE TABLE IF NOT EXISTS fraud_alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    priority VARCHAR(20) NOT NULL,
    vehicle_id UUID NOT NULL,
    description TEXT NOT NULL,
    alert_date TIMESTAMP WITH TIME ZONE NOT NULL,
    location VARCHAR(255),
    status VARCHAR(20) NOT NULL,
    transaction_id VARCHAR(50),
    amount DECIMAL(10, 2),
    fuel_type VARCHAR(20),
    quantity DECIMAL(10, 2),
    driver_id UUID,
    latitude DECIMAL(10, 7),
    longitude DECIMAL(10, 7),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id),
    FOREIGN KEY (driver_id) REFERENCES drivers(id)
);

-- Safety alerts table
CREATE TABLE IF NOT EXISTS safety_alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type VARCHAR(20) NOT NULL,
    driver_id UUID NOT NULL,
    description TEXT NOT NULL,
    alert_time TIMESTAMP WITH TIME ZONE NOT NULL,
    location VARCHAR(255),
    status VARCHAR(20) NOT NULL,
    incident_type VARCHAR(50),
    severity VARCHAR(20),
    driver_state VARCHAR(50),
    vehicle_speed INTEGER,
    video_url VARCHAR(255),
    latitude DECIMAL(10, 7),
    longitude DECIMAL(10, 7),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (driver_id) REFERENCES drivers(id)
);

-- Maintenance forecasts table
CREATE TABLE IF NOT EXISTS maintenance_forecasts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vehicle_id UUID NOT NULL,
    component VARCHAR(50) NOT NULL,
    forecast_date TIMESTAMP WITH TIME ZONE NOT NULL,
    confidence VARCHAR(20) NOT NULL,
    component_id VARCHAR(50),
    current_health INTEGER,
    predicted_failure_date TIMESTAMP WITH TIME ZONE,
    recommended_action TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id)
);

-- Views table
CREATE TABLE IF NOT EXISTS views (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- View sections table
CREATE TABLE IF NOT EXISTS view_sections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    view_id UUID NOT NULL,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL,
    visible BOOLEAN DEFAULT TRUE,
    section_order INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (view_id) REFERENCES views(id)
);

-- User groups table
CREATE TABLE IF NOT EXISTS user_groups (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- View user groups table (many-to-many)
CREATE TABLE IF NOT EXISTS view_user_groups (
    view_id UUID NOT NULL,
    user_group_id UUID NOT NULL,
    PRIMARY KEY (view_id, user_group_id),
    FOREIGN KEY (view_id) REFERENCES views(id),
    FOREIGN KEY (user_group_id) REFERENCES user_groups(id)
);

-- Insert sample data

-- Sample user groups
INSERT INTO user_groups (id, name) VALUES 
    ('11111111-1111-1111-1111-111111111111', 'Administrators'),
    ('22222222-2222-2222-2222-222222222222', 'Fleet Managers'),
    ('33333333-3333-3333-3333-333333333333', 'Drivers'),
    ('44444444-4444-4444-4444-444444444444', 'Analysts');

-- Sample users
INSERT INTO users (id, username, email, password_hash, role) VALUES
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'admin', 'admin@fleet.com', '$2a$10$hACwQ5/HQI6FhbIISOUVeusy3sKyUDhSq36fF5d/54aULe9ksaDC.', 'admin'),
    ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'manager', 'manager@fleet.com', '$2a$10$hACwQ5/HQI6FhbIISOUVeusy3sKyUDhSq36fF5d/54aULe9ksaDC.', 'manager'),
    ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'driver1', 'driver1@fleet.com', '$2a$10$hACwQ5/HQI6FhbIISOUVeusy3sKyUDhSq36fF5d/54aULe9ksaDC.', 'driver'),
    ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'analyst', 'analyst@fleet.com', '$2a$10$hACwQ5/HQI6FhbIISOUVeusy3sKyUDhSq36fF5d/54aULe9ksaDC.', 'analyst');

-- Sample vehicles
INSERT INTO vehicles (id, registration_number, make, model, year, status) VALUES
    ('11111111-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'ABC123', 'Toyota', 'Corolla', 2020, 'active'),
    ('22222222-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'DEF456', 'Ford', 'Transit', 2019, 'active'),
    ('33333333-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'GHI789', 'Volkswagen', 'Transporter', 2021, 'maintenance'),
    ('44444444-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'JKL012', 'Tesla', 'Model 3', 2022, 'active');

-- Sample drivers
INSERT INTO drivers (id, name, license_number, status, safety_score) VALUES
    ('11111111-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'John Smith', 'DL12345', 'active', 85),
    ('22222222-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Jane Doe', 'DL67890', 'active', 92),
    ('33333333-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Mike Johnson', 'DL54321', 'off-duty', 78),
    ('44444444-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Sarah Williams', 'DL09876', 'active', 88);

-- Update vehicle-driver relationships
UPDATE vehicles SET current_driver = '11111111-bbbb-bbbb-bbbb-bbbbbbbbbbbb' WHERE id = '11111111-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
UPDATE vehicles SET current_driver = '22222222-bbbb-bbbb-bbbb-bbbbbbbbbbbb' WHERE id = '22222222-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
UPDATE vehicles SET current_driver = '44444444-bbbb-bbbb-bbbb-bbbbbbbbbbbb' WHERE id = '44444444-aaaa-aaaa-aaaa-aaaaaaaaaaaa';

UPDATE drivers SET current_vehicle = '11111111-aaaa-aaaa-aaaa-aaaaaaaaaaaa' WHERE id = '11111111-bbbb-bbbb-bbbb-bbbbbbbbbbbb';
UPDATE drivers SET current_vehicle = '22222222-aaaa-aaaa-aaaa-aaaaaaaaaaaa' WHERE id = '22222222-bbbb-bbbb-bbbb-bbbbbbbbbbbb';
UPDATE drivers SET current_vehicle = '44444444-aaaa-aaaa-aaaa-aaaaaaaaaaaa' WHERE id = '44444444-bbbb-bbbb-bbbb-bbbbbbbbbbbb';

-- Sample fraud alerts
INSERT INTO fraud_alerts (id, priority, vehicle_id, description, alert_date, location, status, transaction_id, amount, fuel_type, quantity, driver_id, latitude, longitude) VALUES
    ('11111111-cccc-cccc-cccc-cccccccccccc', 'high', '11111111-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Suspicious fuel transaction', '2025-04-10 08:30:00', 'Gas Station A', 'new', 'TX12345', 150.00, 'Diesel', 75.5, '11111111-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 52.2297, 21.0122),
    ('22222222-cccc-cccc-cccc-cccccccccccc', 'medium', '22222222-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Multiple transactions in short time', '2025-04-11 14:15:00', 'Gas Station B', 'in_progress', 'TX67890', 120.00, 'Petrol', 60.0, '22222222-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 52.2297, 21.0122);

-- Sample safety alerts
INSERT INTO safety_alerts (id, type, driver_id, description, alert_time, location, status, incident_type, severity, driver_state, vehicle_speed) VALUES
    ('11111111-dddd-dddd-dddd-dddddddddddd', 'fatigue', '33333333-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Driver showing signs of fatigue', '2025-04-12 22:45:00', 'Highway A4', 'new', 'drowsiness', 'medium', 'tired', 85),
    ('22222222-dddd-dddd-dddd-dddddddddddd', 'distraction', '11111111-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Driver using phone while driving', '2025-04-13 16:20:00', 'Main Street', 'new', 'phone_usage', 'high', 'distracted', 45);

-- Sample maintenance forecasts
INSERT INTO maintenance_forecasts (id, vehicle_id, component, forecast_date, confidence, component_id, current_health, predicted_failure_date, recommended_action) VALUES
    ('11111111-eeee-eeee-eeee-eeeeeeeeeeee', '33333333-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Brake Pads', '2025-04-20 00:00:00', 'high', 'BP-123', 35, '2025-04-25 00:00:00', 'Replace brake pads within 5 days'),
    ('22222222-eeee-eeee-eeee-eeeeeeeeeeee', '22222222-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Oil Filter', '2025-04-30 00:00:00', 'medium', 'OF-456', 50, '2025-05-10 00:00:00', 'Schedule oil change in next 2 weeks');

-- Sample views
INSERT INTO views (id, name, description, is_default) VALUES
    ('11111111-ffff-ffff-ffff-ffffffffffff', 'Admin Dashboard', 'Complete view with all sections', true),
    ('22222222-ffff-ffff-ffff-ffffffffffff', 'Fleet Manager View', 'Focus on vehicle management and maintenance', false),
    ('33333333-ffff-ffff-ffff-ffffffffffff', 'Driver View', 'Simplified view for drivers', false),
    ('44444444-ffff-ffff-ffff-ffffffffffff', 'Analyst View', 'Focus on data analysis and reporting', false);

-- Sample view sections
INSERT INTO view_sections (id, view_id, name, type, visible, section_order) VALUES
    ('11111111-gggg-gggg-gggg-gggggggggggg', '11111111-ffff-ffff-ffff-ffffffffffff', 'KPI Overview', 'kpi', true, 1),
    ('22222222-gggg-gggg-gggg-gggggggggggg', '11111111-ffff-ffff-ffff-ffffffffffff', 'Fraud Alerts', 'fraud', true, 2),
    ('33333333-gggg-gggg-gggg-gggggggggggg', '11111111-ffff-ffff-ffff-ffffffffffff', 'Safety Alerts', 'safety', true, 3),
    ('44444444-gggg-gggg-gggg-gggggggggggg', '11111111-ffff-ffff-ffff-ffffffffffff', 'Maintenance', 'maintenance', true, 4),
    ('55555555-gggg-gggg-gggg-gggggggggggg', '11111111-ffff-ffff-ffff-ffffffffffff', 'Map View', 'map', true, 5),
    
    ('66666666-gggg-gggg-gggg-gggggggggggg', '22222222-ffff-ffff-ffff-ffffffffffff', 'KPI Overview', 'kpi', true, 1),
    ('77777777-gggg-gggg-gggg-gggggggggggg', '22222222-ffff-ffff-ffff-ffffffffffff', 'Vehicle Status', 'vehicles', true, 2),
    ('88888888-gggg-gggg-gggg-gggggggggggg', '22222222-ffff-ffff-ffff-ffffffffffff', 'Maintenance', 'maintenance', true, 3),
    ('99999999-gggg-gggg-gggg-gggggggggggg', '22222222-ffff-ffff-ffff-ffffffffffff', 'Map View', 'map', true, 4),
    
    ('aaaaaaaa-gggg-gggg-gggg-gggggggggggg', '33333333-ffff-ffff-ffff-ffffffffffff', 'Safety Score', 'safety_score', true, 1),
    ('bbbbbbbb-gggg-gggg-gggg-gggggggggggg', '33333333-ffff-ffff-ffff-ffffffffffff', 'Vehicle Status', 'vehicle', true, 2),
    ('cccccccc-gggg-gggg-gggg-gggggggggggg', '33333333-ffff-ffff-ffff-ffffffffffff', 'Route', 'map', true, 3),
    
    ('dddddddd-gggg-gggg-gggg-gggggggggggg', '44444444-ffff-ffff-ffff-ffffffffffff', 'KPI Overview', 'kpi', true, 1),
    ('eeeeeeee-gggg-gggg-gggg-gggggggggggg', '44444444-ffff-ffff-ffff-ffffffffffff', 'Fraud Analysis', 'fraud_analysis', true, 2),
    ('ffffffff-gggg-gggg-gggg-gggggggggggg', '44444444-ffff-ffff-ffff-ffffffffffff', 'Safety Analysis', 'safety_analysis', true, 3),
    ('11111111-hhhh-hhhh-hhhh-hhhhhhhhhhhh', '44444444-ffff-ffff-ffff-ffffffffffff', 'Reports', 'reports', true, 4);

-- Link views to user groups
INSERT INTO view_user_groups (view_id, user_group_id) VALUES
    ('11111111-ffff-ffff-ffff-ffffffffffff', '11111111-1111-1111-1111-111111111111'),
    ('22222222-ffff-ffff-ffff-ffffffffffff', '22222222-2222-2222-2222-222222222222'),
    ('33333333-ffff-ffff-ffff-ffffffffffff', '33333333-3333-3333-3333-333333333333'),
    ('44444444-ffff-ffff-ffff-ffffffffffff', '44444444-4444-4444-4444-444444444444');
