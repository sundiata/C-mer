# C-MER | Centre for Monitoring, Evaluation and Research

A data analytics education and evaluation company website with admin panel and backend API.

## 📁 Project Structure

```
├── Backend/        # Express API, SQLite database, auth, blog & project CRUD
├── admin-panel/    # React admin dashboard for content management
└── website/        # Main public-facing website (React, Tailwind)
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### 1. Backend
```bash
cd Backend
cp env.example .env
# Edit .env with your JWT_SECRET and config
npm install
npm start
```
Runs on `http://localhost:3004`

### 2. Website (main user site)
```bash
cd website
npm install
npm start
```
Runs on `http://localhost:3001`

### 3. Admin Panel
```bash
cd admin-panel
npm install
npm start
```
Runs on `http://localhost:3002`

## 📦 Production Build

**Website (for Netlify/deployment):**
```bash
cd website
npm run build
```
Output: `website/dist/`

## 📄 License

ISC
