const Joi = require('joi');

// Validation schema for creating a blog post
const createBlogSchema = Joi.object({
  title: Joi.string().min(3).max(200).required(),
  slug: Joi.string().min(3).max(200).required(),
  content: Joi.string().required(),
  excerpt: Joi.string().allow('').default(''),
  author: Joi.string().allow('').default(''),
  authorBio: Joi.string().allow('').default(''),
  authorImage: Joi.string().allow('').default(''),
  category: Joi.string().allow('').default(''),
  tags: Joi.array().items(Joi.string()).default([]),
  status: Joi.string().valid('draft', 'published', 'scheduled', 'archived').default('draft'),
  publishDate: Joi.string().allow('').default(''),
  featuredImage: Joi.string().allow('').default(''),
  readingTime: Joi.number().integer().min(0).default(0),
  seoTitle: Joi.string().allow('').default(''),
  seoDescription: Joi.string().allow('').default(''),
  seoKeywords: Joi.array().items(Joi.string()).default([]),
  socialTitle: Joi.string().allow('').default(''),
  socialDescription: Joi.string().allow('').default(''),
  socialImage: Joi.string().allow('').default(''),
  views: Joi.number().integer().min(0).default(0),
  likes: Joi.number().integer().min(0).default(0),
  comments: Joi.number().integer().min(0).default(0),
  relatedPosts: Joi.array().items(Joi.number().integer()).default([]),
  isFeatured: Joi.boolean().default(false),
  isBreaking: Joi.boolean().default(false)
});

const updateBlogSchema = createBlogSchema.keys({
  id: Joi.number().integer().required()
});

const createBlogPost = (req, res) => {
  const { error, value } = createBlogSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ success: false, error: 'Validation failed', details: error.details });
  }

  const payload = value;

  const sql = `
    INSERT INTO blogs (
      title, slug, content, excerpt,
      author, author_bio, author_image,
      category, tags, status, publish_date,
      featured_image, reading_time,
      seo_title, seo_description, seo_keywords,
      social_title, social_description, social_image,
      views, likes, comments, related_posts,
      is_featured, is_breaking,
      created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
  `;

  const params = [
    payload.title,
    payload.slug,
    payload.content,
    payload.excerpt,
    payload.author,
    payload.authorBio,
    payload.authorImage,
    payload.category,
    JSON.stringify(payload.tags || []),
    payload.status,
    payload.publishDate,
    payload.featuredImage,
    payload.readingTime,
    payload.seoTitle,
    payload.seoDescription,
    JSON.stringify(payload.seoKeywords || []),
    payload.socialTitle,
    payload.socialDescription,
    payload.socialImage,
    payload.views,
    payload.likes,
    payload.comments,
    JSON.stringify(payload.relatedPosts || []),
    payload.isFeatured ? 1 : 0,
    payload.isBreaking ? 1 : 0
  ];

  global.db.run(sql, params, function(err) {
    if (err) {
      console.error('❌ Error creating blog post:', err.message);
      // Unique constraint on slug is helpful; map constraint error to 409
      const status = /UNIQUE constraint failed: blogs.slug/.test(err.message) ? 409 : 500;
      return res.status(status).json({ success: false, error: err.message });
    }

    const newId = this.lastID;
    global.db.get('SELECT * FROM blogs WHERE id = ?', [newId], (getErr, row) => {
      if (getErr) {
        console.error('❌ Error fetching created blog post:', getErr.message);
        return res.status(201).json({ success: true, data: { id: newId } });
      }

      // Parse JSON fields back to arrays/booleans
      const parsed = {
        ...row,
        tags: safeParseJson(row.tags, []),
        seo_keywords: safeParseJson(row.seo_keywords, []),
        related_posts: safeParseJson(row.related_posts, []),
        is_featured: !!row.is_featured,
        is_breaking: !!row.is_breaking
      };

      return res.status(201).json({ success: true, data: parsed });
    });
  });
};

function safeParseJson(value, fallback) {
  try { return JSON.parse(value); } catch { return fallback; }
}

module.exports = {
  createBlogPost,
  // List blogs with basic pagination and optional status filter
  listBlogs: (req, res) => {
    const { page = 1, limit = 20, status, q } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    const whereClauses = [];
    const params = [];
    if (status) {
      whereClauses.push('status = ?');
      params.push(status);
    }
    if (q) {
      whereClauses.push('(title LIKE ? OR content LIKE ?)');
      params.push(`%${q}%`, `%${q}%`);
    }
    const whereSql = whereClauses.length ? `WHERE ${whereClauses.join(' AND ')}` : '';

    const sql = `SELECT * FROM blogs ${whereSql} ORDER BY created_at DESC LIMIT ? OFFSET ?`;
    const countSql = `SELECT COUNT(*) as count FROM blogs ${whereSql}`;

    global.db.get(countSql, params, (countErr, countRow) => {
      if (countErr) {
        console.error('❌ Error counting blogs:', countErr.message);
        return res.status(500).json({ success: false, error: countErr.message });
      }

      global.db.all(sql, [...params, Number(limit), offset], (err, rows) => {
        if (err) {
          console.error('❌ Error listing blogs:', err.message);
          return res.status(500).json({ success: false, error: err.message });
        }

        const data = rows.map(row => ({
          ...row,
          tags: safeParseJson(row.tags, []),
          seo_keywords: safeParseJson(row.seo_keywords, []),
          related_posts: safeParseJson(row.related_posts, []),
          is_featured: !!row.is_featured,
          is_breaking: !!row.is_breaking
        }));

        res.json({
          success: true,
          data,
          pagination: {
            page: Number(page),
            limit: Number(limit),
            total: countRow.count
          }
        });
      });
    });
  },

  // Get single blog by id
  getBlogById: (req, res) => {
    const { id } = req.params;
    global.db.get('SELECT * FROM blogs WHERE id = ?', [id], (err, row) => {
      if (err) {
        console.error('❌ Error fetching blog:', err.message);
        return res.status(500).json({ success: false, error: err.message });
      }
      if (!row) {
        return res.status(404).json({ success: false, error: 'Blog not found' });
      }

      const data = {
        ...row,
        tags: safeParseJson(row.tags, []),
        seo_keywords: safeParseJson(row.seo_keywords, []),
        related_posts: safeParseJson(row.related_posts, []),
        is_featured: !!row.is_featured,
        is_breaking: !!row.is_breaking
      };
      res.json({ success: true, data });
    });
  },

  // Update blog by id
  updateBlogById: (req, res) => {
    const id = Number(req.params.id);
    const { error, value } = updateBlogSchema.validate({ ...req.body, id }, { abortEarly: false });
    if (error) {
      return res.status(400).json({ success: false, error: 'Validation failed', details: error.details });
    }
    const p = value;
    const sql = `
      UPDATE blogs SET
        title = ?, slug = ?, content = ?, excerpt = ?,
        author = ?, author_bio = ?, author_image = ?,
        category = ?, tags = ?, status = ?, publish_date = ?,
        featured_image = ?, reading_time = ?,
        seo_title = ?, seo_description = ?, seo_keywords = ?,
        social_title = ?, social_description = ?, social_image = ?,
        views = ?, likes = ?, comments = ?, related_posts = ?,
        is_featured = ?, is_breaking = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    const params = [
      p.title, p.slug, p.content, p.excerpt,
      p.author, p.authorBio, p.authorImage,
      p.category, JSON.stringify(p.tags || []), p.status, p.publishDate,
      p.featuredImage, p.readingTime,
      p.seoTitle, p.seoDescription, JSON.stringify(p.seoKeywords || []),
      p.socialTitle, p.socialDescription, p.socialImage,
      p.views, p.likes, p.comments, JSON.stringify(p.relatedPosts || []),
      p.isFeatured ? 1 : 0, p.isBreaking ? 1 : 0,
      id
    ];

    global.db.run(sql, params, function(err) {
      if (err) {
        console.error('❌ Error updating blog post:', err.message);
        const status = /UNIQUE constraint failed: blogs.slug/.test(err.message) ? 409 : 500;
        return res.status(status).json({ success: false, error: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ success: false, error: 'Blog not found' });
      }
      global.db.get('SELECT * FROM blogs WHERE id = ?', [id], (getErr, row) => {
        if (getErr || !row) {
          return res.json({ success: true });
        }
        const data = {
          ...row,
          tags: safeParseJson(row.tags, []),
          seo_keywords: safeParseJson(row.seo_keywords, []),
          related_posts: safeParseJson(row.related_posts, []),
          is_featured: !!row.is_featured,
          is_breaking: !!row.is_breaking
        };
        res.json({ success: true, data });
      });
    });
  },

  // Delete blog by id
  deleteBlogById: (req, res) => {
    const { id } = req.params;
    global.db.run('DELETE FROM blogs WHERE id = ?', [id], function(err) {
      if (err) {
        console.error('❌ Error deleting blog post:', err.message);
        return res.status(500).json({ success: false, error: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ success: false, error: 'Blog not found' });
      }
      res.json({ success: true });
    });
  }
};


