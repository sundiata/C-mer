const Joi = require('joi');

const barSchema = Joi.object({
  label: Joi.string().required(),
  value: Joi.number().required(),
  color: Joi.string().required(),
  unit: Joi.string().allow('').default('')
});

const createProjectSchema = Joi.object({
  title: Joi.string().min(3).max(200).required(),
  slug: Joi.string().min(3).max(200).required(),
  client: Joi.string().allow(''),
  category: Joi.string().allow(''),
  description: Joi.string().allow(''),
  image: Joi.string().allow(''),
  technologies: Joi.array().items(Joi.string()).default([]),
  duration: Joi.string().allow(''),
  team: Joi.string().allow(''),
  status: Joi.string().valid('planning','active','on-hold','completed','cancelled').default('planning'),
  featured: Joi.boolean().default(false),
  results: Joi.array().items(Joi.string()).default([]),
  graphData: Joi.object({
    title: Joi.string().allow(''),
    bars: Joi.array().items(barSchema).default([]),
    explanation: Joi.string().allow('')
  }).required()
});

const createProject = (req, res) => {
  const { error, value } = createProjectSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ success: false, error: 'Validation failed', details: error.details });
  }
  const p = value;

  const sql = `
    INSERT INTO projects (
      title, slug, client, category, description, image,
      technologies, duration, team, status, featured,
      results, graph_title, graph_bars, graph_explanation,
      created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
  `;

  const params = [
    p.title,
    p.slug,
    p.client,
    p.category,
    p.description,
    p.image,
    JSON.stringify(p.technologies || []),
    p.duration,
    p.team,
    p.status,
    p.featured ? 1 : 0,
    JSON.stringify(p.results || []),
    p.graphData.title || null,
    JSON.stringify(p.graphData.bars || []),
    p.graphData.explanation || null
  ];

  global.db.run(sql, params, function(err) {
    if (err) {
      const status = /UNIQUE constraint failed: projects.slug/.test(err.message) ? 409 : 500;
      console.error('❌ Project create error:', err.message);
      return res.status(status).json({ success: false, error: err.message });
    }
    const id = this.lastID;
    global.db.get('SELECT * FROM projects WHERE id = ?', [id], (getErr, row) => {
      if (getErr || !row) {
        return res.status(201).json({ success: true, data: { id } });
      }
      const data = rowToProject(row);
      res.status(201).json({ success: true, data });
    });
  });
};

const listProjects = (req, res) => {
  global.db.all('SELECT * FROM projects ORDER BY created_at DESC', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
    res.json({ success: true, data: rows.map(rowToProject) });
  });
};

const getProjectById = (req, res) => {
  const { id } = req.params;
  global.db.get('SELECT * FROM projects WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ success: false, error: err.message });
    if (!row) return res.status(404).json({ success: false, error: 'Project not found' });
    res.json({ success: true, data: rowToProject(row) });
  });
};

function rowToProject(row) {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    client: row.client,
    category: row.category,
    description: row.description,
    image: row.image,
    technologies: safeParse(row.technologies, []),
    duration: row.duration,
    team: row.team,
    status: row.status,
    featured: !!row.featured,
    results: safeParse(row.results, []),
    graphData: {
      title: row.graph_title || '',
      bars: safeParse(row.graph_bars, []),
      explanation: row.graph_explanation || ''
    },
    created_at: row.created_at,
    updated_at: row.updated_at
  };
}

function safeParse(value, fallback) {
  try { return JSON.parse(value); } catch { return fallback; }
}

module.exports = {
  createProject,
  listProjects,
  getProjectById,
  updateProjectById: (req, res) => {
    const id = Number(req.params.id);
    // Reuse schema but id is param; allow partial? Keep full for now like blogs
    const { error, value } = createProjectSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({ success: false, error: 'Validation failed', details: error.details });
    }
    const p = value;
    const sql = `
      UPDATE projects SET
        title = ?, slug = ?, client = ?, category = ?, description = ?, image = ?,
        technologies = ?, duration = ?, team = ?, status = ?, featured = ?,
        results = ?, graph_title = ?, graph_bars = ?, graph_explanation = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    const params = [
      p.title, p.slug, p.client, p.category, p.description, p.image,
      JSON.stringify(p.technologies || []), p.duration, p.team, p.status, p.featured ? 1 : 0,
      JSON.stringify(p.results || []), p.graphData.title || null, JSON.stringify(p.graphData.bars || []), p.graphData.explanation || null,
      id
    ];
    global.db.run(sql, params, function(err) {
      if (err) {
        const status = /UNIQUE constraint failed: projects.slug/.test(err.message) ? 409 : 500;
        return res.status(status).json({ success: false, error: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ success: false, error: 'Project not found' });
      }
      global.db.get('SELECT * FROM projects WHERE id = ?', [id], (getErr, row) => {
        if (getErr || !row) return res.json({ success: true });
        return res.json({ success: true, data: rowToProject(row) });
      });
    });
  },
  deleteProjectById: (req, res) => {
    const { id } = req.params;
    global.db.run('DELETE FROM projects WHERE id = ?', [id], function(err) {
      if (err) return res.status(500).json({ success: false, error: err.message });
      if (this.changes === 0) return res.status(404).json({ success: false, error: 'Project not found' });
      return res.json({ success: true });
    });
  }
};


