# 🔐 Data Analytics Admin Backend

Backend API for the Data Analytics Company Admin Panel built with Node.js, Express, and SQLite.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd Backend
npm install
```

### 2. Environment Setup
```bash
# Copy environment file
cp env.example .env

# Edit .env with your configuration
nano .env
```

### 3. Start Development Server
```bash
npm run dev  # With auto-reload
# or
npm start    # Production mode
```

### 4. Test API
```bash
# Health check
curl http://localhost:3001/api/health

# Test SQLite connection
node test-sqlite.js

# Login test
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

---

## 🔧 Configuration

### Required Environment Variables

```bash
# Server
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:3000

# JWT Secret (CHANGE THIS IN PRODUCTION!)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# SQLite Database (Auto-created)
DATABASE_PATH=./data/admin-panel.db
```

### SQLite Setup (Automatic)

**No setup required!** SQLite database is created automatically.

1. **Database Location:**
   ```
   Backend/data/admin-panel.db
   ```

2. **Auto-Created Tables:**
   - `users` - Admin user accounts
   - `sessions` - Login session tracking
   - `blog_posts` - (Future) Blog content
   - `projects` - (Future) Project data
   - `contacts` - (Future) Contact form submissions

3. **Default Admin User:**
   - **Username:** `admin`
   - **Password:** `admin123`
   - **Auto-created** on first run

4. **Database File:**
   - **Location:** `./data/admin-panel.db`
   - **Size:** ~100KB (empty)
   - **Backup:** Just copy the `.db` file

---

## 🔐 Authentication API

### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "jwt-token-here",
    "user": {
      "id": 1,
      "username": "admin",
      "name": "Administrator",
      "email": "admin@dataanalyticspro.com",
      "role": "admin"
    }
  }
}
```

### Verify Token
```bash
GET /api/auth/verify
Authorization: Bearer jwt-token-here
```

**Response:**
```json
{
  "success": true,
  "message": "Token is valid",
  "data": {
    "user": {
      "userId": 1,
      "username": "admin",
      "role": "admin"
    }
  }
}
```

### Logout
```bash
POST /api/auth/logout
Authorization: Bearer jwt-token-here
```

**Response:**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

---

## 🏗️ Project Structure

```
Backend/
├── src/
│   ├── controllers/     # Request handlers
│   │   └── authController.js
│   ├── middleware/      # Express middleware
│   │   └── auth.js
│   ├── routes/         # API routes
│   │   └── auth.js
│   ├── services/       # Business logic
│   ├── utils/          # Helper functions
│   └── server.js       # Main server file
├── config/             # Configuration files
├── env.example         # Environment template
├── package.json        # Dependencies
└── README.md          # Documentation
```

---

## 🛡️ Security Features

- **JWT Authentication** - Secure token-based auth
- **Rate Limiting** - Prevents brute force attacks
- **Helmet Security** - Security headers
- **CORS Protection** - Cross-origin request handling
- **Input Validation** - Request data validation
- **Error Handling** - Comprehensive error responses

---

## 📊 API Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Response data here
  }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error description",
  "code": "ERROR_CODE"
}
```

---

## 🔄 Development Workflow

### Adding New Features

1. **Create Controller:**
   ```javascript
   // src/controllers/newFeatureController.js
   const getData = async (req, res) => {
     // Your logic here
   };
   ```

2. **Create Route:**
   ```javascript
   // src/routes/newFeature.js
   const express = require('express');
   const { getData } = require('../controllers/newFeatureController');

   const router = express.Router();
   router.get('/', getData);

   module.exports = router;
   ```

3. **Register Route:**
   ```javascript
   // src/server.js
   const newFeatureRoutes = require('./routes/newFeature');
   app.use('/api/new-feature', newFeatureRoutes);
   ```

---

## 🚀 Deployment

### Local Development
```bash
npm run dev  # Auto-reload enabled
```

### Production
```bash
npm start
```

### Docker (Optional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
```

---

## 🧪 Testing

### Manual Testing
```bash
# Health check
curl http://localhost:3001/api/health

# Login test
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# Protected route test
curl http://localhost:3001/api/auth/verify \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### API Testing Tools
- **Postman** - Full API testing suite
- **Insomnia** - Lightweight API client
- **Thunder Client** (VS Code) - Built-in testing

---

## 🔮 Future APIs (Ready for Implementation)

### Blog Management
- `GET/POST/PUT/DELETE /api/blog-posts`
- `POST /api/blog-posts/:id/publish`
- `GET /api/blog-posts/search`

### Project Management
- `GET/POST/PUT/DELETE /api/projects`
- `PUT /api/projects/:id/progress`
- `GET /api/projects/analytics`

### Contact Management
- `GET /api/contacts`
- `PUT /api/contacts/:id/status`
- `POST /api/contacts/export`

### Settings
- `GET/PUT /api/settings`

---

## 📈 Monitoring & Logging

### Request Logging
All requests are automatically logged with:
- Timestamp
- HTTP method
- URL
- Response status
- Response time
- IP address

### Error Logging
Errors are logged with:
- Error message
- Stack trace (development only)
- Request details
- User information (if authenticated)

---

## 🔧 Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Find process using port 3001
lsof -i :3001
# Kill process
kill -9 <PID>
```

#### Firebase Connection Issues
```bash
# Check Firebase configuration
cat .env | grep FIREBASE
# Verify service account JSON
node -e "console.log(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY))"
```

#### JWT Token Issues
```bash
# Check JWT secret
echo $JWT_SECRET
# Verify token structure
node -e "const jwt = require('jsonwebtoken'); console.log(jwt.decode('your-token-here'))"
```

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-api`
3. Make changes and test thoroughly
4. Commit with clear messages
5. Push and create pull request

---

## 📄 License

This project is licensed under the MIT License.

---

## 📞 Support

For API documentation and support:
- Check `/api/health` endpoint
- Review error messages in responses
- Check server logs for debugging

---

**Ready to extend the API?** 🚀

The authentication system is now fully functional and ready for you to add more features!
