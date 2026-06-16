-- Migration: drop legacy tables and recreate with CMS schema
USE rg_ambulance;

DROP TABLE IF EXISTS contact_leads;
DROP TABLE IF EXISTS blog_posts;
DROP TABLE IF EXISTS testimonials;
DROP TABLE IF EXISTS service_areas;
DROP TABLE IF EXISTS services;
DROP TABLE IF EXISTS pages;
DROP TABLE IF EXISTS hero_slider;
DROP TABLE IF EXISTS navbar;
DROP TABLE IF EXISTS site_settings;
