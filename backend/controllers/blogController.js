import pool from '../config/db.js';

const mapRow = (row) => ({
  id: row.id,
  title: row.title,
  slug: row.slug,
  content: row.content,
  featured_image: row.featured_image,
  category: row.category || '',
  tags: row.tags || '',
  meta_title: row.meta_title || '',
  meta_description: row.meta_description || '',
  status: row.status,
  created_at: row.created_at,
});

export const getBlogPosts = async (req, res) => {
  try {
    const publishedOnly = req.query.published === '1' || req.query.published === 'true';
    const sql = publishedOnly
      ? 'SELECT * FROM blog_posts WHERE status = ? ORDER BY created_at DESC'
      : 'SELECT * FROM blog_posts ORDER BY created_at DESC';
    const params = publishedOnly ? ['published'] : [];
    const [rows] = await pool.query(sql, params);
    res.json(rows.map(mapRow));
  } catch (err) {
    console.error('Get blog posts error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
};

export const getBlogPostBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const [rows] = await pool.query('SELECT * FROM blog_posts WHERE slug = ?', [slug]);
    if (!rows.length) return res.status(404).json({ error: 'Not found.' });
    res.json(mapRow(rows[0]));
  } catch (err) {
    console.error('Get blog post error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
};

export const getBlogPostById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM blog_posts WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: 'Not found.' });
    res.json(mapRow(rows[0]));
  } catch (err) {
    console.error('Get blog post by id error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
};

export const createBlogPost = async (req, res) => {
  try {
    const { title, slug, content, category, tags, meta_title, meta_description, status } = req.body;
    let featured_image = null;
    if (req.file) featured_image = 'uploads/' + req.file.filename;
    const [result] = await pool.query(
      'INSERT INTO blog_posts (title, slug, content, featured_image, category, tags, meta_title, meta_description, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        title,
        slug,
        content || '',
        featured_image,
        category || '',
        tags || '',
        meta_title || '',
        meta_description || '',
        status || 'draft',
      ]
    );
    const [rows] = await pool.query('SELECT * FROM blog_posts WHERE id = ?', [result.insertId]);
    res.status(201).json(mapRow(rows[0]));
  } catch (err) {
    console.error('Create blog post error:', err);
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Slug already exists.' });
    }
    res.status(500).json({ error: 'Server error.' });
  }
};

export const updateBlogPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, slug, content, category, tags, meta_title, meta_description, status } = req.body;
    let featured_image = req.body.featured_image;
    if (req.file) featured_image = 'uploads/' + req.file.filename;
    await pool.query(
      'UPDATE blog_posts SET title = COALESCE(?, title), slug = COALESCE(?, slug), content = COALESCE(?, content), featured_image = COALESCE(?, featured_image), category = COALESCE(?, category), tags = COALESCE(?, tags), meta_title = COALESCE(?, meta_title), meta_description = COALESCE(?, meta_description), status = COALESCE(?, status) WHERE id = ?',
      [title, slug, content, featured_image, category, tags, meta_title, meta_description, status, id]
    );
    const [rows] = await pool.query('SELECT * FROM blog_posts WHERE id = ?', [id]);
    res.json(mapRow(rows[0]));
  } catch (err) {
    console.error('Update blog post error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
};

export const deleteBlogPost = async (req, res) => {
  try {
    await pool.query('DELETE FROM blog_posts WHERE id = ?', [req.params.id]);
    res.json({ message: 'Blog post deleted.' });
  } catch (err) {
    console.error('Delete blog post error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
};
