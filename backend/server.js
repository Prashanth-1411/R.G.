import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import navbarRoutes from './routes/navbar.js';
import sliderRoutes from './routes/sliders.js';
import pagesRoutes from './routes/pages.js';
import servicesRoutes from './routes/services.js';
import settingsRoutes from './routes/settings.js';
import contactRoutes from './routes/contact.js';
import testimonialsRoutes from './routes/testimonials.js';
import blogRoutes from './routes/blog.js';
import locationsRoutes from './routes/locations.js';
import contactLeadsRoutes from './routes/contactLeads.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/admin', express.static(path.join(__dirname, 'admin')));

app.use('/api', authRoutes);
app.use('/api/navbar', navbarRoutes);
app.use('/api/sliders', sliderRoutes);
app.use('/api/pages', pagesRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/testimonials', testimonialsRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/locations', locationsRoutes);
app.use('/api/contact-leads', contactLeadsRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'R.G. Ambulance API is running.' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
