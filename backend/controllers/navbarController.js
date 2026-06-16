import pool from '../config/db.js';

const mapNavbarRow = (row) => ({
  id: row.id,
  menu_name: row.menu_name,
  menu_link: row.menu_link,
  order: row.order,
  label: row.menu_name,
  link: row.menu_link,
  sort_order: row.order,
});

export const getNavbar = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM navbar ORDER BY `order` ASC');
    res.json(rows.map(mapNavbarRow));
  } catch (err) {
    console.error('Get navbar error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
};

export const getNavbarById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM navbar WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Not found.' });
    res.json(mapNavbarRow(rows[0]));
  } catch (err) {
    console.error('Get navbar by id error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
};

export const createNavbar = async (req, res) => {
  try {
    const menu_name = req.body.menu_name || req.body.label;
    const menu_link = req.body.menu_link || req.body.link;
    const order = req.body.order ?? req.body.sort_order ?? 0;
    const [result] = await pool.query(
      'INSERT INTO navbar (menu_name, menu_link, `order`) VALUES (?, ?, ?)',
      [menu_name, menu_link, order]
    );
    res.status(201).json(mapNavbarRow({ id: result.insertId, menu_name, menu_link, order }));
  } catch (err) {
    console.error('Create navbar error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
};

export const updateNavbar = async (req, res) => {
  try {
    const { id } = req.params;
    const menu_name = req.body.menu_name || req.body.label;
    const menu_link = req.body.menu_link || req.body.link;
    const order = req.body.order ?? req.body.sort_order;
    await pool.query(
      'UPDATE navbar SET menu_name = COALESCE(?, menu_name), menu_link = COALESCE(?, menu_link), `order` = COALESCE(?, `order`) WHERE id = ?',
      [menu_name, menu_link, order, id]
    );
    const [rows] = await pool.query('SELECT * FROM navbar WHERE id = ?', [id]);
    res.json(mapNavbarRow(rows[0]));
  } catch (err) {
    console.error('Update navbar error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
};

export const deleteNavbar = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM navbar WHERE id = ?', [id]);
    res.json({ message: 'Menu item deleted.' });
  } catch (err) {
    console.error('Delete navbar error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
};
