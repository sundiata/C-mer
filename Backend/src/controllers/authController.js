const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Login controller
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        error: 'Username and password are required'
      });
    }

    // Find user in SQLite database
    const db = global.db;
    db.get(
      "SELECT id, username, password_hash, email, name, role FROM users WHERE username = ?",
      [username],
      async (err, user) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({
            success: false,
            error: 'Database error'
          });
        }

        if (!user) {
          return res.status(401).json({
            success: false,
            error: 'Invalid credentials'
          });
        }

        // Check password using bcrypt
        const bcrypt = require('bcryptjs');
        const isValidPassword = await bcrypt.compare(password, user.password_hash);

        if (!isValidPassword) {
          return res.status(401).json({
            success: false,
            error: 'Invalid credentials'
          });
        }

        // Generate JWT token
        const token = jwt.sign(
          {
            userId: user.id,
            username: user.username,
            role: user.role
          },
          process.env.JWT_SECRET || 'your-secret-key-change-in-production',
          {
            expiresIn: '24h' // Token expires in 24 hours
          }
        );

        // Store session in SQLite database
        db.run(
          "INSERT INTO sessions (user_id, username, ip_address, user_agent) VALUES (?, ?, ?, ?)",
          [user.id, user.username, req.ip, req.get('User-Agent')],
          function(err) {
            if (err) {
              console.log('Session logging failed:', err.message);
            } else {
              console.log('✅ Session logged for user:', user.username);
            }
          }
        );

        // Return success response
        res.json({
          success: true,
          message: 'Login successful',
          data: {
            token,
            user: {
              id: user.id,
              username: user.username,
              name: user.name,
              email: user.email,
              role: user.role
            }
          }
        });

      }
    );

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

// Logout controller
const logout = async (req, res) => {
  try {
    // In a real application, you might want to blacklist the token
    // For now, we'll just return success

    res.json({
      success: true,
      message: 'Logout successful'
    });

  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

// Verify token controller
const verifyToken = async (req, res) => {
  try {
    // The authenticateToken middleware already verified the token
    // and added the user info to req.user

    res.json({
      success: true,
      message: 'Token is valid',
      data: {
        user: req.user
      }
    });

  } catch (error) {
    console.error('Token verification error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

module.exports = {
  login,
  logout,
  verifyToken
};
