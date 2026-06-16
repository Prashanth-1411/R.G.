import pool from '../config/db.js';

export const getContactLeads = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM contact_leads ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error('Get contact leads error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
};

export const updateContactLead = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await pool.query('UPDATE contact_leads SET status = ? WHERE id = ?', [status, id]);
    const [rows] = await pool.query('SELECT * FROM contact_leads WHERE id = ?', [id]);
    res.json(rows[0]);
  } catch (err) {
    console.error('Update contact lead error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
};

export const deleteContactLead = async (req, res) => {
  try {
    await pool.query('DELETE FROM contact_leads WHERE id = ?', [req.params.id]);
    res.json({ message: 'Lead deleted.' });
  } catch (err) {
    console.error('Delete contact lead error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
};
