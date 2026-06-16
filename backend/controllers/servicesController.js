import pool from '../config/db.js';

const mapServiceRow = (row) => ({
  id: row.id,
  title: row.title,
  description: row.description,
  image: row.image,
  service_type: row.service_type,
  status: row.status,
  order: row.order,
  image_url: row.image,
  is_active: row.status === 'active' ? 1 : 0,
  sort_order: row.order,
});

export const getServices = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM services ORDER BY `order` ASC');
    res.json(rows.map(mapServiceRow));
  } catch (err) {
    console.error('Get services error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
};

export const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM services WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Not found.' });
    res.json(mapServiceRow(rows[0]));
  } catch (err) {
    console.error('Get service by id error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
};

export const createService = async (req, res) => {
  try {
    const { title, description, service_type, status } = req.body;
    const order = req.body.order ?? req.body.sort_order ?? 0;
    let image = null;
    if (req.file) {
      image = 'uploads/' + req.file.filename;
    }
    const serviceStatus = status || (req.body.is_active === '0' || req.body.is_active === 0 ? 'inactive' : 'active');
    const [result] = await pool.query(
      'INSERT INTO services (title, description, image, service_type, status, `order`) VALUES (?, ?, ?, ?, ?, ?)',
      [title, description, image, service_type || 'ambulance', serviceStatus, order]
    );
    const [rows] = await pool.query('SELECT * FROM services WHERE id = ?', [result.insertId]);
    res.status(201).json(mapServiceRow(rows[0]));
  } catch (err) {
    console.error('Create service error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
};

export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, service_type, status } = req.body;
    const order = req.body.order ?? req.body.sort_order;
    let image = req.body.image || req.body.image_url;
    if (req.file) {
      image = 'uploads/' + req.file.filename;
    }
    let serviceStatus = status;
    if (!serviceStatus && req.body.is_active !== undefined) {
      serviceStatus = req.body.is_active === '0' || req.body.is_active === 0 || req.body.is_active === false ? 'inactive' : 'active';
    }
    await pool.query(
      'UPDATE services SET title = COALESCE(?, title), description = COALESCE(?, description), image = COALESCE(?, image), service_type = COALESCE(?, service_type), status = COALESCE(?, status), `order` = COALESCE(?, `order`) WHERE id = ?',
      [title, description, image, service_type, serviceStatus, order, id]
    );
    const [rows] = await pool.query('SELECT * FROM services WHERE id = ?', [id]);
    res.json(mapServiceRow(rows[0]));
  } catch (err) {
    console.error('Update service error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
};

export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM services WHERE id = ?', [id]);
    res.json({ message: 'Service deleted.' });
  } catch (err) {
    console.error('Delete service error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
};
