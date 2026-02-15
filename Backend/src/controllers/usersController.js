const Joi = require('joi');
const bcrypt = require('bcryptjs');

const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().min(6).required(),
  newPassword: Joi.string().min(6).required()
});

const updateProfileSchema = Joi.object({
  username: Joi.string().min(3).max(50).required(),
  name: Joi.string().min(1).max(100).allow('')
});

const createAdminSchema = Joi.object({
  username: Joi.string().min(3).max(50).required(),
  password: Joi.string().min(6).required(),
  email: Joi.string().email().allow(''),
  name: Joi.string().allow('')
});

// PUT /api/users/me/password
const changePassword = (req, res) => {
  const { error, value } = changePasswordSchema.validate(req.body, { abortEarly: false });
  if (error) return res.status(400).json({ success: false, error: 'Validation failed', details: error.details });
  const { currentPassword, newPassword } = value;

  const userId = req.user.userId;
  global.db.get('SELECT id, password_hash FROM users WHERE id = ?', [userId], (err, row) => {
    if (err) return res.status(500).json({ success: false, error: err.message });
    if (!row) return res.status(404).json({ success: false, error: 'User not found' });

    const ok = bcrypt.compareSync(currentPassword, row.password_hash);
    if (!ok) return res.status(400).json({ success: false, error: 'Current password is incorrect' });

    const newHash = bcrypt.hashSync(newPassword, 10);
    global.db.run('UPDATE users SET password_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [newHash, userId], function(updateErr) {
      if (updateErr) return res.status(500).json({ success: false, error: updateErr.message });
      return res.json({ success: true, message: 'Password updated successfully' });
    });
  });
};

// PUT /api/users/me/profile
const updateProfile = (req, res) => {
  const { error, value } = updateProfileSchema.validate(req.body, { abortEarly: false });
  if (error) return res.status(400).json({ success: false, error: 'Validation failed', details: error.details });
  const { username, name } = value;
  const userId = req.user.userId;

  global.db.run('UPDATE users SET username = ?, name = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [username, name, userId], function(err) {
    if (err) {
      const status = /UNIQUE constraint failed: users.username/.test(err.message) ? 409 : 500;
      return res.status(status).json({ success: false, error: err.message });
    }
    if (this.changes === 0) return res.status(404).json({ success: false, error: 'User not found' });
    global.db.get('SELECT id, username, name, email, role FROM users WHERE id = ?', [userId], (getErr, row) => {
      if (getErr) return res.json({ success: true });
      res.json({ success: true, data: row });
    });
  });
};

// POST /api/users/admin
const createAdmin = (req, res) => {
  const { error, value } = createAdminSchema.validate(req.body, { abortEarly: false });
  if (error) return res.status(400).json({ success: false, error: 'Validation failed', details: error.details });
  const { username, password, email, name } = value;
  const hash = bcrypt.hashSync(password, 10);
  global.db.run(
    'INSERT INTO users (username, password_hash, email, name, role) VALUES (?, ?, ?, ?, ?)',
    [username, hash, email || null, name || null, 'admin'],
    function(err) {
      if (err) {
        const status = /UNIQUE constraint failed: users.username/.test(err.message) ? 409 : 500;
        return res.status(status).json({ success: false, error: err.message });
      }
      return res.status(201).json({ success: true, data: { id: this.lastID, username, email, name, role: 'admin' } });
    }
  );
};

module.exports = {
  changePassword,
  updateProfile,
  createAdmin
};















