const Joi = require('joi');

const contactSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().allow(''),
  company: Joi.string().allow(''),
  position: Joi.string().allow(''),
  serviceType: Joi.string().allow(''),
  projectDescription: Joi.string().allow(''),
  budget: Joi.string().allow(''),
  timeline: Joi.string().allow(''),
  additionalInfo: Joi.string().allow('')
});

const submitContact = (req, res) => {
  const { error, value } = contactSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ success: false, error: 'Validation failed', details: error.details });
  }

  const p = value;
  const sql = `
    INSERT INTO contacts (
      first_name, last_name, email, phone, company, position,
      service_type, project_description, budget, timeline, additional_info
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const params = [
    p.firstName, p.lastName, p.email, p.phone, p.company, p.position,
    p.serviceType, p.projectDescription, p.budget, p.timeline, p.additionalInfo
  ];
  global.db.run(sql, params, function(err) {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
    res.status(201).json({ success: true, data: { id: this.lastID } });
  });
};

const listContacts = (req, res) => {
  global.db.all('SELECT * FROM contacts ORDER BY submitted_at DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ success: false, error: err.message });
    res.json({ success: true, data: rows });
  });
};

module.exports = {
  submitContact,
  listContacts
};















