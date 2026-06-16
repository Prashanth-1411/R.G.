import pool from '../config/db.js';

const parseFaqs = (faqs) => {
  if (!faqs) return [];
  if (Array.isArray(faqs)) return faqs;
  try {
    return JSON.parse(faqs);
  } catch {
    return [];
  }
};

const mapRow = (row) => ({
  id: row.id,
  name: row.name,
  slug: row.slug,
  description: row.description,
  content_html: row.content_html,
  faqs: parseFaqs(row.faqs),
  meta_title: row.meta_title,
  meta_description: row.meta_description,
  meta_keywords: row.meta_keywords,
  is_active: Boolean(row.is_active),
});

export const getLocations = async (req, res) => {
  try {
    const activeOnly = req.query.active === '1' || req.query.active === 'true';
    const search = (req.query.search || '').trim();
    let sql = 'SELECT * FROM service_areas';
    const conditions = [];
    const params = [];
    if (activeOnly) conditions.push('is_active = 1');
    if (search) {
      conditions.push('(name LIKE ? OR slug LIKE ? OR meta_keywords LIKE ?)');
      const term = `%${search}%`;
      params.push(term, term, term);
    }
    if (conditions.length) sql += ' WHERE ' + conditions.join(' AND ');
    sql += ' ORDER BY name ASC';
    const [rows] = await pool.query(sql, params);
    res.json(rows.map(mapRow));
  } catch (err) {
    console.error('Get locations error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
};

export const getLocationBySlug = async (req, res) => {
  try {
    let slug = req.params.slug;
    if (!slug.startsWith('ambulance-service-in-')) {
      slug = `ambulance-service-in-${slug}`;
    }
    const [rows] = await pool.query('SELECT * FROM service_areas WHERE slug = ?', [slug]);
    if (!rows.length) return res.status(404).json({ error: 'Not found.' });
    res.json(mapRow(rows[0]));
  } catch (err) {
    console.error('Get location error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
};

export const getLocationById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM service_areas WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: 'Not found.' });
    res.json(mapRow(rows[0]));
  } catch (err) {
    console.error('Get location by id error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
};

export const createLocation = async (req, res) => {
  try {
    const { name, slug, description, content_html, faqs, meta_title, meta_description, meta_keywords, is_active } = req.body;
    const faqsJson = JSON.stringify(parseFaqs(faqs));
    const [result] = await pool.query(
      'INSERT INTO service_areas (name, slug, description, content_html, faqs, meta_title, meta_description, meta_keywords, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        name,
        slug,
        description || '',
        content_html || '',
        faqsJson,
        meta_title || '',
        meta_description || '',
        meta_keywords || '',
        is_active === '0' || is_active === 0 || is_active === false ? 0 : 1,
      ]
    );
    const [rows] = await pool.query('SELECT * FROM service_areas WHERE id = ?', [result.insertId]);
    res.status(201).json(mapRow(rows[0]));
  } catch (err) {
    console.error('Create location error:', err);
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Slug already exists.' });
    }
    res.status(500).json({ error: 'Server error.' });
  }
};

export const updateLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, description, content_html, faqs, meta_title, meta_description, meta_keywords, is_active } = req.body;
    const faqsJson = faqs !== undefined ? JSON.stringify(parseFaqs(faqs)) : undefined;
    const active =
      is_active === undefined
        ? undefined
        : is_active === '0' || is_active === 0 || is_active === false
          ? 0
          : 1;
    await pool.query(
      'UPDATE service_areas SET name = COALESCE(?, name), slug = COALESCE(?, slug), description = COALESCE(?, description), content_html = COALESCE(?, content_html), faqs = COALESCE(?, faqs), meta_title = COALESCE(?, meta_title), meta_description = COALESCE(?, meta_description), meta_keywords = COALESCE(?, meta_keywords), is_active = COALESCE(?, is_active) WHERE id = ?',
      [name, slug, description, content_html, faqsJson, meta_title, meta_description, meta_keywords, active, id]
    );
    const [rows] = await pool.query('SELECT * FROM service_areas WHERE id = ?', [id]);
    res.json(mapRow(rows[0]));
  } catch (err) {
    console.error('Update location error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
};

export const deleteLocation = async (req, res) => {
  try {
    await pool.query('DELETE FROM service_areas WHERE id = ?', [req.params.id]);
    res.json({ message: 'Location deleted.' });
  } catch (err) {
    console.error('Delete location error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
};
