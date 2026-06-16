import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ASSET_FILES = [
  'Logo.png',
  '1.jpg',
  '2.jpeg',
  '4.jpeg',
  '5.jpg',
  'funeral-1.jpg',
  'funeral-6.jpg',
];

function loadFrontendExport(exportName, relativePath) {
  const filePath = path.join(__dirname, '..', 'frontend', 'src', 'data', relativePath);
  let raw = fs.readFileSync(filePath, 'utf8');
  raw = raw.replace(/import\s+.*?from\s+['"].*?['"];?\s*/g, '');
  raw = raw.replace(new RegExp(`export const ${exportName}[^=]*=`), `const ${exportName} =`);
  return new Function(`${raw}; return ${exportName};`)();
}

async function seedTestimonials(conn) {
  const [count] = await conn.query('SELECT COUNT(*) AS n FROM testimonials');
  if (count[0].n > 0) return;

  const testimonials = loadFrontendExport('testimonials', 'testimonials.ts');
  for (const t of testimonials) {
    await conn.query(
      'INSERT INTO testimonials (name, position, content, rating, verification_url, is_approved, `order`) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        t.name,
        t.position || '',
        t.content,
        t.rating || 5,
        t.verification_url || '',
        t.is_approved ? 1 : 0,
        t.order || 0,
      ]
    );
  }
  console.log(`Seeded ${testimonials.length} testimonials`);
}

async function seedServiceAreas(conn) {
  const [count] = await conn.query('SELECT COUNT(*) AS n FROM service_areas');
  if (count[0].n > 0) return;

  const areas = loadFrontendExport('serviceAreas', 'service-areas.ts');
  for (const area of areas) {
    await conn.query(
      'INSERT INTO service_areas (name, slug, description, content_html, faqs, meta_title, meta_description, meta_keywords, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        area.name,
        area.slug,
        area.description || '',
        area.content_html || '',
        JSON.stringify(area.faqs || []),
        area.meta_title || '',
        area.meta_description || '',
        area.meta_keywords || '',
        area.is_active ? 1 : 0,
      ]
    );
  }
  console.log(`Seeded ${areas.length} location pages`);
}

async function seed() {
  let conn;
  try {
    conn = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      multipleStatements: true,
    });

    const migrate = fs.readFileSync(path.join(__dirname, 'config', 'migrate.sql'), 'utf8');
    const schema = fs.readFileSync(path.join(__dirname, 'config', 'schema.sql'), 'utf8');
    await conn.query(migrate + schema);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);
    await conn.query(
      "UPDATE rg_ambulance.users SET password = ? WHERE email = 'admin@rgambulance.com'",
      [hashedPassword]
    );

    const uploadsDir = path.join(__dirname, 'uploads');
    const assetsDir = path.join(__dirname, '..', 'frontend', 'src', 'assets');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    for (const file of ASSET_FILES) {
      const src = path.join(assetsDir, file);
      const destName = file === 'funeral-6.jpg' ? 'funeral-6.jpg' : file;
      const dest = path.join(uploadsDir, destName);
      if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
        console.log(`Copied ${file} to uploads/`);
      }
    }

    await seedTestimonials(conn);
    await seedServiceAreas(conn);

    console.log('Database seeded successfully!');
    console.log('Admin login: admin@rgambulance.com / admin123');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  } finally {
    if (conn) await conn.end();
  }
}

seed();
