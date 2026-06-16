import pool from '../config/db.js';

export const getSettings = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT logo, logo_width FROM site_settings WHERE id = 1');
    if (rows.length === 0) {
      return res.json({ logo: null, logo_width: 140 });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Get settings error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
};

export const updateSettings = async (req, res) => {
  try {
    let logo = req.body.logo;
    const logo_width = req.body.logo_width ? parseInt(req.body.logo_width, 10) : undefined;

    if (req.file) {
      logo = 'uploads/' + req.file.filename;
    }

    await pool.query(
      'INSERT INTO site_settings (id, logo, logo_width) VALUES (1, ?, ?) ON DUPLICATE KEY UPDATE logo = COALESCE(?, logo), logo_width = COALESCE(?, logo_width)',
      [logo || null, logo_width || 140, logo, logo_width]
    );

    const [rows] = await pool.query('SELECT logo, logo_width FROM site_settings WHERE id = 1');
    res.json(rows[0]);
  } catch (err) {
    console.error('Update settings error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
};
