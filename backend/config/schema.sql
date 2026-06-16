CREATE DATABASE IF NOT EXISTS rg_ambulance;
USE rg_ambulance;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'editor') DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT IGNORE INTO users (name, email, password, role) VALUES
('Admin', 'admin@rgambulance.com', '$2a$10$dummyhashwillbereplaced', 'admin');

CREATE TABLE IF NOT EXISTS site_settings (
  id INT PRIMARY KEY DEFAULT 1,
  logo VARCHAR(255) DEFAULT NULL,
  logo_width INT DEFAULT 140,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT IGNORE INTO site_settings (id, logo, logo_width) VALUES
(1, 'uploads/Logo.png', 140);

CREATE TABLE IF NOT EXISTS navbar (
  id INT AUTO_INCREMENT PRIMARY KEY,
  menu_name VARCHAR(100) NOT NULL,
  menu_link VARCHAR(255) NOT NULL,
  `order` INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT IGNORE INTO navbar (menu_name, menu_link, `order`) VALUES
('Home', '/', 1),
('Ambulance Services', '/ambulance-services', 2),
('Funeral Care', '/funeral-services', 3),
('Testimonials', '/testimonials', 4),
('Blog', '/blog', 5),
('Contact', '/contact', 6);

CREATE TABLE IF NOT EXISTS hero_slider (
  id INT AUTO_INCREMENT PRIMARY KEY,
  image VARCHAR(255) NOT NULL,
  title VARCHAR(255) DEFAULT NULL,
  description TEXT DEFAULT NULL,
  button_text VARCHAR(255) DEFAULT NULL,
  button_link VARCHAR(255) DEFAULT NULL,
  `order` INT DEFAULT 0,
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT IGNORE INTO hero_slider (title, description, image, button_text, button_link, `order`) VALUES
('Emergency Ambulance Services', 'Advanced ICU Ambulances, Trained Medical Staff, and Rapid Emergency Response Across India.', 'uploads/5.jpg', 'Call Now: +91 95516 63530', 'tel:+919551663530', 1),
('ICU on Wheels', 'Fully equipped mobile ICU units with ventilators, cardiac monitors, and critical care paramedics.', 'uploads/4.jpeg', 'Book Ambulance', '#booking-sec', 2),
('Dignified Funeral Care', 'Compassionate funeral services with AC hearses, deceased preservation, and full ritual support.', 'uploads/funeral-6.jpg', 'Funeral Services', '/funeral-services', 3);

CREATE TABLE IF NOT EXISTS pages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  page_name VARCHAR(100) NOT NULL UNIQUE,
  heading VARCHAR(255) DEFAULT NULL,
  content TEXT DEFAULT NULL,
  image VARCHAR(255) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT IGNORE INTO pages (page_name, heading, content) VALUES
('home', 'Emergency Ambulance & Funeral Services', 'Advanced ICU Ambulances, Trained Medical Staff, and Rapid Emergency Response Across India. Trust R.G. Ambulance Service for immediate clinical transfers and dignified funeral arrangements.'),
('about', 'Why Healthcare Providers & Families Trust Us', 'In medical emergencies, every second counts. We maintain the highest standards of safety, clinical expertise, and response velocity.'),
('services', 'Professional Emergency Services', 'Equipped with certified medical gear and designed for safety, comfort, and absolute compliance.'),
('contact', 'Contact Our Emergency Desk', 'Our medical coordinators are standing by 24/7. Call, WhatsApp, or send us an inquiry.'),
('ambulance-services', 'Ambulance Services', 'Professional emergency ambulance fleet with ICU, BLS, and neonatal transport across Chennai and pan India.'),
('funeral-services', 'Funeral Care Services', 'Dignified funeral and homage services including AC hearses, preservation, and ritual support.'),
('testimonials', 'Client Testimonials', 'Stories from families and healthcare partners who trust R.G. Ambulance Service.'),
('blog', 'Health & Homage Blog', 'Educational guides, emergency preparedness tips, and compassionate funeral care advice.');

CREATE TABLE IF NOT EXISTS services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT DEFAULT NULL,
  image VARCHAR(255) DEFAULT NULL,
  service_type ENUM('ambulance', 'funeral') DEFAULT 'ambulance',
  status ENUM('active', 'inactive') DEFAULT 'active',
  `order` INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT IGNORE INTO services (title, description, service_type, image, `order`, status) VALUES
('ICU Ventilator Ambulance', 'Full intensive care support with advanced monitoring rigs.', 'ambulance', 'uploads/1.jpg', 1, 'active'),
('Basic Life Support Rig', 'Oxygen-equipped transport fleet for stable patient transfers.', 'ambulance', 'uploads/2.jpeg', 2, 'active'),
('Neonatal NICU Ambulance', 'Temperature-controlled portable incubator setups for newborns.', 'ambulance', 'uploads/4.jpeg', 3, 'active'),
('AC Funeral Hearse Van', 'Dignified, air-conditioned vehicle for funeral processions.', 'funeral', 'uploads/funeral-1.jpg', 4, 'active');

CREATE TABLE IF NOT EXISTS testimonials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  position VARCHAR(255) DEFAULT '',
  content TEXT NOT NULL,
  rating TINYINT DEFAULT 5,
  verification_url VARCHAR(500) DEFAULT '',
  is_approved TINYINT(1) DEFAULT 1,
  `order` INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS blog_posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  content LONGTEXT,
  featured_image VARCHAR(255) DEFAULT NULL,
  category VARCHAR(100) DEFAULT '',
  tags VARCHAR(500) DEFAULT '',
  meta_title VARCHAR(255) DEFAULT '',
  meta_description TEXT,
  status ENUM('draft', 'published') DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS service_areas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  content_html LONGTEXT,
  faqs JSON,
  meta_title VARCHAR(255) DEFAULT '',
  meta_description TEXT,
  meta_keywords TEXT,
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS contact_leads (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  address VARCHAR(500) DEFAULT '',
  requirements VARCHAR(255) DEFAULT '',
  message TEXT,
  status ENUM('new', 'contacted', 'resolved') DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
