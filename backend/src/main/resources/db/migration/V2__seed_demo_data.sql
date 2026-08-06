-- =============================================================================
-- HEMP Demo Edition Seed Data (V2__seed_demo_data.sql)
-- =============================================================================

-- Seed Demo Users (Password: password123 -> BCrypt hash)
INSERT INTO app_user (user_id, username, password_hash, full_name, role) VALUES
('usr-admin-01', 'admin', '$2a$10$7Q9b9c9d9e9f9g9h9i9j9uKxLmM1N2O3P4Q5R6S7T8U9V0W1X2Y3Z', 'Enterprise System Administrator', 'Admin'),
('usr-prv-01', 'provider', '$2a$10$7Q9b9c9d9e9f9g9h9i9j9uKxLmM1N2O3P4Q5R6S7T8U9V0W1X2Y3Z', 'Dr. Sarah Jenkins MD', 'Provider'),
('usr-mbr-01', 'member', '$2a$10$7Q9b9c9d9e9f9g9h9i9j9uKxLmM1N2O3P4Q5R6S7T8U9V0W1X2Y3Z', 'John Healthcare Smith', 'Member');

-- Seed 20 Providers
INSERT INTO provider (provider_id, npi, provider_name, taxonomy_code, status, phone, email) VALUES
('prv-1001', '1093847501', 'St. Jude General Hospital', '282N00000X', 'ACTIVE', '(555) 234-5678', 'contact@stjudehospital.org'),
('prv-1002', '1093847502', 'Apex Cardiology Associates', '207RC0000X', 'ACTIVE', '(555) 345-6789', 'admin@apexcardiology.com'),
('prv-1003', '1093847503', 'Metro Primary Care Group', '207Q00000X', 'ACTIVE', '(555) 456-7890', 'info@metroprimary.org'),
('prv-1004', '1093847504', 'Horizon Orthopedics Clinic', '207X00000X', 'SUSPENDED', '(555) 567-8901', 'billing@horizonortho.com'),
('prv-1005', '1093847505', 'Valley Pediatrics Center', '208000000X', 'ACTIVE', '(555) 678-9012', 'care@valleypediatrics.com'),
('prv-1006', '1093847506', 'Oakridge Diagnostic Radiology', '2085R0202X', 'ACTIVE', '(555) 789-0123', 'scheduling@oakridgerad.com'),
('prv-1007', '1093847507', 'Summit Neurology Institute', '2084N0400X', 'PENDING_VERIFICATION', '(555) 890-1234', 'intake@summitneuro.org'),
('prv-1008', '1093847508', 'Pacific Family Dentistry', '122300000X', 'ACTIVE', '(555) 901-2345', 'smile@pacificdentistry.com'),
('prv-1009', '1093847509', 'Clearview Dermatology', '207N00000X', 'ACTIVE', '(555) 012-3456', 'help@clearviewderm.com'),
('prv-1010', '1093847510', 'Beacon Behavioral Health', '2084P0800X', 'ACTIVE', '(555) 123-4567', 'triage@beaconbehavioral.org'),
('prv-1011', '1093847511', 'Lakeside Surgery Center', '261QS1000X', 'ACTIVE', '(555) 234-8899', 'or@lakesidesurgery.com'),
('prv-1012', '1093847512', 'Tri-County Urgent Care', '261QU0200X', 'ACTIVE', '(555) 345-9900', 'urgent@tricountycare.org'),
('prv-1013', '1093847513', 'Mercy Medical Center', '282N00000X', 'ACTIVE', '(555) 456-1122', 'adm@mercymedical.org'),
('prv-1014', '1093847514', 'Vision Care Specialists', '152W00000X', 'ACTIVE', '(555) 567-2233', 'eyes@visioncare.com'),
('prv-1015', '1093847515', 'Advanced Physical Therapy', '225100000X', 'ACTIVE', '(555) 678-3344', 'pt@advancedrehab.org'),
('prv-1016', '1093847516', 'Pinecrest Oncology Center', '207RX0202X', 'ACTIVE', '(555) 789-4455', 'oncology@pinecrest.com'),
('prv-1017', '1093847517', 'Grace Womens Health Clinic', '207V00000X', 'ACTIVE', '(555) 890-5566', 'obgyn@gracehealth.org'),
('prv-1018', '1093847518', 'Coastal Podiatry Group', '213E00000X', 'ACTIVE', '(555) 901-6677', 'feet@coastalpodiatry.com'),
('prv-1019', '1093847519', 'Riverdale ENT Associates', '207Y00000X', 'ACTIVE', '(555) 012-7788', 'ent@riverdale.org'),
('prv-1020', '1093847520', 'Gastroenterology Consultants', '207RG0100X', 'ACTIVE', '(555) 123-8899', 'gi@gastroconsult.com');

-- Seed 20 Members
INSERT INTO member (member_id, member_number, first_name, last_name, dob, gender, status, phone) VALUES
('mbr-2001', 'MEM-994001', 'John', 'Smith', '1985-04-12', 'MALE', 'ELIGIBLE', '(555) 111-2222'),
('mbr-2002', 'MEM-994002', 'Emily', 'Johnson', '1990-08-23', 'FEMALE', 'ELIGIBLE', '(555) 222-3333'),
('mbr-2003', 'MEM-994003', 'Michael', 'Williams', '1978-11-05', 'MALE', 'ELIGIBLE', '(555) 333-4444'),
('mbr-2004', 'MEM-994004', 'Sarah', 'Brown', '1995-02-17', 'FEMALE', 'INELIGIBLE', '(555) 444-5555'),
('mbr-2005', 'MEM-994005', 'David', 'Jones', '1962-09-30', 'MALE', 'ELIGIBLE', '(555) 555-6666'),
('mbr-2006', 'MEM-994006', 'Jessica', 'Garcia', '1988-06-14', 'FEMALE', 'ELIGIBLE', '(555) 666-7777'),
('mbr-2007', 'MEM-994007', 'James', 'Miller', '2001-01-22', 'MALE', 'PENDING', '(555) 777-8888'),
('mbr-2008', 'MEM-994008', 'Amanda', 'Davis', '1974-07-09', 'FEMALE', 'ELIGIBLE', '(555) 888-9999'),
('mbr-2009', 'MEM-994009', 'Robert', 'Rodriguez', '1992-12-03', 'MALE', 'ELIGIBLE', '(555) 999-0000'),
('mbr-2010', 'MEM-994010', 'Ashley', 'Martinez', '1983-03-27', 'FEMALE', 'ELIGIBLE', '(555) 000-1111'),
('mbr-2011', 'MEM-994011', 'William', 'Hernandez', '1969-05-18', 'MALE', 'ELIGIBLE', '(555) 123-9876'),
('mbr-2012', 'MEM-994012', 'Megan', 'Lopez', '1998-10-11', 'FEMALE', 'ELIGIBLE', '(555) 234-8765'),
('mbr-2013', 'MEM-994013', 'Christopher', 'Gonzalez', '1981-08-04', 'MALE', 'ELIGIBLE', '(555) 345-7654'),
('mbr-2014', 'MEM-994014', 'Stephanie', 'Wilson', '1976-12-25', 'FEMALE', 'ELIGIBLE', '(555) 456-6543'),
('mbr-2015', 'MEM-994015', 'Daniel', 'Anderson', '1993-07-19', 'MALE', 'ELIGIBLE', '(555) 567-5432'),
('mbr-2016', 'MEM-994016', 'Rachel', 'Thomas', '1987-01-08', 'FEMALE', 'INELIGIBLE', '(555) 678-4321'),
('mbr-2017', 'MEM-994017', 'Matthew', 'Taylor', '2003-09-15', 'MALE', 'ELIGIBLE', '(555) 789-3210'),
('mbr-2018', 'MEM-994018', 'Nicole', 'Moore', '1965-11-29', 'FEMALE', 'ELIGIBLE', '(555) 890-2109'),
('mbr-2019', 'MEM-994019', 'Anthony', 'Jackson', '1989-04-02', 'MALE', 'ELIGIBLE', '(555) 901-1098'),
('mbr-2020', 'MEM-994020', 'Samantha', 'Martin', '1994-06-21', 'FEMALE', 'ELIGIBLE', '(555) 012-0987');
