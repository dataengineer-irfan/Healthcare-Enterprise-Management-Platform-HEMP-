-- =============================================================================
-- HEMP Demo Edition Seed Data (V2__seed_demo_data.sql)
-- =============================================================================

-- Seed Users (Password: 'password123' bcrypt hash: $2a$10$e8W/F0lZkE6a0y3lK1s4Iu/U815Y1V65o.g9R5v1L6xK6J3pXWlq2)
INSERT INTO app_user (user_id, username, password_hash, full_name, role) VALUES
('usr-admin-01', 'admin', '$2a$10$e8W/F0lZkE6a0y3lK1s4Iu/U815Y1V65o.g9R5v1L6xK6J3pXWlq2', 'Enterprise System Administrator', 'Admin'),
('usr-prv-01', 'provider', '$2a$10$e8W/F0lZkE6a0y3lK1s4Iu/U815Y1V65o.g9R5v1L6xK6J3pXWlq2', 'Dr. Sarah Jenkins MD', 'Provider'),
('usr-mbr-01', 'member', '$2a$10$e8W/F0lZkE6a0y3lK1s4Iu/U815Y1V65o.g9R5v1L6xK6J3pXWlq2', 'John Healthcare Smith', 'Member');

-- Seed 20 Provider Records
INSERT INTO provider (provider_id, npi, provider_name, taxonomy_code, status, phone, email) VALUES
('prv-1001', '1234567890', 'St. Jude General Hospital', '282N00000X', 'ACTIVE', '555-0101', 'contact@stjudehospital.org'),
('prv-1002', '1234567891', 'Dr. Sarah Jenkins, MD', '207Q00000X', 'ACTIVE', '555-0102', 'sjenkins@medclinic.com'),
('prv-1003', '1234567892', 'Metro Cardiology Associates', '207RC0000X', 'ACTIVE', '555-0103', 'info@metrocardio.com'),
('prv-1004', '1234567893', 'Dr. Robert Chen, DO', '207P00000X', 'ACTIVE', '555-0104', 'rchen@pediatrics.org'),
('prv-1005', '1234567894', 'Sunrise Orthopedic Center', '207X00000X', 'PENDING', '555-0105', 'intake@sunriseortho.com'),
('prv-1006', '1234567895', 'Dr. Emily Watson, MD', '208D00000X', 'ACTIVE', '555-0106', 'ewatson@generalmed.com'),
('prv-1007', '1234567896', 'Valley Imaging & Radiology', '2085R0202X', 'ACTIVE', '555-0107', 'scheduling@valleyradiology.com'),
('prv-1008', '1234567897', 'Dr. Michael Chang, DDS', '1223G0001X', 'ACTIVE', '555-0108', 'mchang@dentalsmiles.com'),
('prv-1009', '1234567898', 'Pinecrest Behavioral Health', '261QM0800X', 'INACTIVE', '555-0109', 'support@pinecresthealth.org'),
('prv-1010', '1234567899', 'Dr. Lisa Patel, MD', '207N00000X', 'ACTIVE', '555-0110', 'lpatel@dermatology.org'),
('prv-1011', '1987654321', 'Apex Surgical Center', '261QS1000X', 'ACTIVE', '555-0111', 'admin@apexsurgical.com'),
('prv-1012', '1987654322', 'Dr. David Miller, MD', '208000000X', 'ACTIVE', '555-0112', 'dmiller@internalmed.com'),
('prv-1013', '1987654323', 'Highland Pharmacy & Supplies', '3336C0003X', 'ACTIVE', '555-0113', 'rx@highlandpharmacy.com'),
('prv-1014', '1987654324', 'Dr. Jessica Taylor, OD', '152W00000X', 'PENDING', '555-0114', 'jtaylor@optometrycare.com'),
('prv-1015', '1987654325', 'Bayview Rehabilitation Services', '261QR0400X', 'ACTIVE', '555-0115', 'info@bayviewrehab.org'),
('prv-1016', '1987654326', 'Dr. James Wilson, MD', '207T00000X', 'ACTIVE', '555-0116', 'jwilson@neurology.com'),
('prv-1017', '1987654327', 'Community Health Clinic', '261QF0400X', 'ACTIVE', '555-0117', 'contact@chcmed.org'),
('prv-1018', '1987654328', 'Dr. Karen Davis, DPM', '213E00000X', 'INACTIVE', '555-0118', 'kdavis@podiatrycenter.com'),
('prv-1019', '1987654329', 'Evergreen Urgent Care', '261QU0200X', 'ACTIVE', '555-0119', 'reception@evergreenurgent.com'),
('prv-1020', '1987654330', 'Dr. Andrew Thomas, MD', '207SG0202X', 'ACTIVE', '555-0120', 'athomas@gastro.com');

-- Seed 20 Member Records
INSERT INTO member (member_id, member_number, first_name, last_name, dob, gender, status, phone) VALUES
('mbr-2001', 'MBR-900101', 'John', 'Smith', '1985-04-12', 'MALE', 'ACTIVE', '555-0201'),
('mbr-2002', 'MBR-900102', 'Jane', 'Doe', '1990-08-25', 'FEMALE', 'ACTIVE', '555-0202'),
('mbr-2003', 'MBR-900103', 'Robert', 'Johnson', '1978-11-03', 'MALE', 'ACTIVE', '555-0203'),
('mbr-2004', 'MBR-900104', 'Emily', 'Williams', '1995-02-17', 'FEMALE', 'ACTIVE', '555-0204'),
('mbr-2005', 'MBR-900105', 'Michael', 'Brown', '1982-06-30', 'MALE', 'SUSPENDED', '555-0205'),
('mbr-2006', 'MBR-900106', 'Amanda', 'Jones', '1988-12-14', 'FEMALE', 'ACTIVE', '555-0206'),
('mbr-2007', 'MBR-900107', 'David', 'Garcia', '1975-09-09', 'MALE', 'ACTIVE', '555-0207'),
('mbr-2008', 'MBR-900108', 'Sarah', 'Miller', '1992-05-22', 'FEMALE', 'ACTIVE', '555-0208'),
('mbr-2009', 'MBR-900109', 'James', 'Davis', '1969-01-19', 'MALE', 'INACTIVE', '555-0209'),
('mbr-2010', 'MBR-900110', 'Jessica', 'Rodriguez', '1998-07-04', 'FEMALE', 'ACTIVE', '555-0210'),
('mbr-2011', 'MBR-900111', 'Daniel', 'Martinez', '1984-03-28', 'MALE', 'ACTIVE', '555-0211'),
('mbr-2012', 'MBR-900112', 'Ashley', 'Hernandez', '1991-10-15', 'FEMALE', 'ACTIVE', '555-0212'),
('mbr-2013', 'MBR-900113', 'Christopher', 'Lopez', '1973-08-01', 'MALE', 'ACTIVE', '555-0213'),
('mbr-2014', 'MBR-900114', 'Stephanie', 'Gonzalez', '1989-06-11', 'FEMALE', 'SUSPENDED', '555-0214'),
('mbr-2015', 'MBR-900115', 'Brian', 'Wilson', '1996-11-20', 'MALE', 'ACTIVE', '555-0215'),
('mbr-2016', 'MBR-900116', 'Nicole', 'Anderson', '1981-04-05', 'FEMALE', 'ACTIVE', '555-0216'),
('mbr-2017', 'MBR-900117', 'Kevin', 'Thomas', '1977-02-28', 'MALE', 'ACTIVE', '555-0217'),
('mbr-2018', 'MBR-900118', 'Megan', 'Taylor', '1994-09-13', 'FEMALE', 'INACTIVE', '555-0218'),
('mbr-2019', 'MBR-900119', 'Jason', 'Moore', '1987-05-07', 'MALE', 'ACTIVE', '555-0219'),
('mbr-2020', 'MBR-900120', 'Rachel', 'Jackson', '1993-01-31', 'FEMALE', 'ACTIVE', '555-0220');
