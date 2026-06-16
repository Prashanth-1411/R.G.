import pool from '../config/db.js';

const mapRow = (row) => ({
  id: row.id,
  name: row.name,
  position: row.position,
  content: row.content,
  rating: row.rating,
  verification_url: row.verification_url || '',
  is_approved: Boolean(row.is_approved),
  order: row.order,
  created_at: row.created_at,
});

export const getTestimonials = async (req, res) => {
  try {
    const approvedOnly = req.query.approved === '1' || req.query.approved === 'true';
    const sql = approvedOnly
      ? 'SELECT * FROM testimonials WHERE is_approved = 1 ORDER BY `order` ASC, id ASC'
      : 'SELECT * FROM testimonials ORDER BY `order` ASC, id ASC';
    const [rows] = await pool.query(sql);
    res.json(rows.map(mapRow));
  } catch (err) {
    console.error('Get testimonials error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
};

export const getTestimonialById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM testimonials WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: 'Not found.' });
    res.json(mapRow(rows[0]));
  } catch (err) {
    console.error('Get testimonial error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
};

export const createTestimonial = async (req, res) => {
  try {
    const { name, position, content, rating, verification_url, is_approved, order } = req.body;
    const [result] = await pool.query(
      'INSERT INTO testimonials (name, position, content, rating, verification_url, is_approved, `order`) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        name,
        position || '',
        content,
        rating ? parseInt(rating, 10) : 5,
        verification_url || '',
        is_approved === '0' || is_approved === 0 || is_approved === false ? 0 : 1,
        order ? parseInt(order, 10) : 0,
      ]
    );
    const [rows] = await pool.query('SELECT * FROM testimonials WHERE id = ?', [result.insertId]);
    res.status(201).json(mapRow(rows[0]));
  } catch (err) {
    console.error('Create testimonial error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
};

export const updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, position, content, rating, verification_url, is_approved, order } = req.body;
    const approved =
      is_approved === undefined
        ? undefined
        : is_approved === '0' || is_approved === 0 || is_approved === false
          ? 0
          : 1;
    await pool.query(
      'UPDATE testimonials SET name = COALESCE(?, name), position = COALESCE(?, position), content = COALESCE(?, content), rating = COALESCE(?, rating), verification_url = COALESCE(?, verification_url), is_approved = COALESCE(?, is_approved), `order` = COALESCE(?, `order`) WHERE id = ?',
      [
        name,
        position,
        content,
        rating !== undefined ? parseInt(rating, 10) : undefined,
        verification_url,
        approved,
        order !== undefined ? parseInt(order, 10) : undefined,
        id,
      ]
    );
    const [rows] = await pool.query('SELECT * FROM testimonials WHERE id = ?', [id]);
    res.json(mapRow(rows[0]));
  } catch (err) {
    console.error('Update testimonial error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
};

export const deleteTestimonial = async (req, res) => {
  try {
    await pool.query('DELETE FROM testimonials WHERE id = ?', [req.params.id]);
    res.json({ message: 'Testimonial deleted.' });
  } catch (err) {
    console.error('Delete testimonial error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
};
