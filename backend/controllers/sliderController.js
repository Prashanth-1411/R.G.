import pool from '../config/db.js';

const mapSliderRow = (row) => ({
  id: row.id,
  image: row.image,
  title: row.title,
  description: row.description,
  button_text: row.button_text,
  button_link: row.button_link,
  order: row.order,
  is_active: row.is_active,
  image_url: row.image,
  subtitle: row.description,
  sort_order: row.order,
});

export const getSliders = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM hero_slider ORDER BY `order` ASC');
    res.json(rows.map(mapSliderRow));
  } catch (err) {
    console.error('Get sliders error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
};

export const getSliderById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM hero_slider WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Not found.' });
    res.json(mapSliderRow(rows[0]));
  } catch (err) {
    console.error('Get slider by id error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
};

export const createSlider = async (req, res) => {
  try {
    const { title, description, button_text, button_link, order, is_active } = req.body;
    const subtitle = req.body.subtitle;
    let image = null;
    if (req.file) {
      image = 'uploads/' + req.file.filename;
    }
    const sortOrder = order ?? req.body.sort_order ?? 0;
    const desc = description ?? subtitle ?? null;
    const [result] = await pool.query(
      'INSERT INTO hero_slider (title, description, image, button_text, button_link, `order`, is_active) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, desc, image, button_text || null, button_link || null, sortOrder, is_active !== undefined ? is_active : 1]
    );
    const [rows] = await pool.query('SELECT * FROM hero_slider WHERE id = ?', [result.insertId]);
    res.status(201).json(mapSliderRow(rows[0]));
  } catch (err) {
    console.error('Create slider error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
};

export const updateSlider = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, button_text, button_link, order, is_active } = req.body;
    const subtitle = req.body.subtitle;
    let image = req.body.image || req.body.image_url;
    if (req.file) {
      image = 'uploads/' + req.file.filename;
    }
    const sortOrder = order ?? req.body.sort_order;
    const desc = description ?? subtitle;
    await pool.query(
      'UPDATE hero_slider SET title = COALESCE(?, title), description = COALESCE(?, description), image = COALESCE(?, image), button_text = COALESCE(?, button_text), button_link = COALESCE(?, button_link), `order` = COALESCE(?, `order`), is_active = COALESCE(?, is_active) WHERE id = ?',
      [title, desc, image, button_text, button_link, sortOrder, is_active, id]
    );
    const [rows] = await pool.query('SELECT * FROM hero_slider WHERE id = ?', [id]);
    res.json(mapSliderRow(rows[0]));
  } catch (err) {
    console.error('Update slider error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
};

export const deleteSlider = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM hero_slider WHERE id = ?', [id]);
    res.json({ message: 'Slider deleted.' });
  } catch (err) {
    console.error('Delete slider error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
};
