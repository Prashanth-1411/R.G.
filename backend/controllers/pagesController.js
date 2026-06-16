import pool from '../config/db.js';

const mapPageRow = (row) => ({
  id: row.id,
  page_name: row.page_name,
  heading: row.heading,
  content: row.content,
  image: row.image,
  banner_image: row.image,
});

export const getPages = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM pages');
    res.json(rows.map(mapPageRow));
  } catch (err) {
    console.error('Get pages error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
};

export const getPageByName = async (req, res) => {
  try {
    const { page_name } = req.params;
    let rows;
    if (/^\d+$/.test(page_name)) {
      [rows] = await pool.query('SELECT * FROM pages WHERE id = ?', [page_name]);
    } else {
      [rows] = await pool.query('SELECT * FROM pages WHERE page_name = ?', [page_name]);
    }
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Page not found.' });
    }
    res.json(mapPageRow(rows[0]));
  } catch (err) {
    console.error('Get page error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
};

export const getPageById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM pages WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Not found.' });
    res.json(mapPageRow(rows[0]));
  } catch (err) {
    console.error('Get page by id error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
};

export const createPage = async (req, res) => {
  try {
    const { page_name, heading, content } = req.body;
    let image = null;
    if (req.file) {
      image = 'uploads/' + req.file.filename;
    }
    const [result] = await pool.query(
      'INSERT INTO pages (page_name, heading, content, image) VALUES (?, ?, ?, ?)',
      [page_name, heading, content, image]
    );
    const [rows] = await pool.query('SELECT * FROM pages WHERE id = ?', [result.insertId]);
    res.status(201).json(mapPageRow(rows[0]));
  } catch (err) {
    console.error('Create page error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
};

export const updatePage = async (req, res) => {
  try {
    const { id } = req.params;
    const { page_name, heading, content } = req.body;
    let image = req.body.image || req.body.banner_image;
    if (req.file) {
      image = 'uploads/' + req.file.filename;
    }
    await pool.query(
      'UPDATE pages SET page_name = COALESCE(?, page_name), heading = COALESCE(?, heading), content = COALESCE(?, content), image = COALESCE(?, image) WHERE id = ?',
      [page_name, heading, content, image, id]
    );
    const [rows] = await pool.query('SELECT * FROM pages WHERE id = ?', [id]);
    res.json(mapPageRow(rows[0]));
  } catch (err) {
    console.error('Update page error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
};

export const deletePage = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM pages WHERE id = ?', [id]);
    res.json({ message: 'Page deleted.' });
  } catch (err) {
    console.error('Delete page error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
};
