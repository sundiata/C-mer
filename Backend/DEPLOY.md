# Backend Deployment Guide

Deploy the C-MER API to Railway (recommended), Render, or Fly.io.

## Option 1: Railway (Recommended)

Railway supports SQLite with persistent storage and has a simple setup.

### Steps

1. **Create a Railway account** at [railway.app](https://railway.app)

2. **Install Railway CLI** (optional, for local deploy):
   ```bash
   npm install -g @railway/cli
   railway login
   ```

3. **Deploy from GitHub**:
   - Go to [railway.app/new](https://railway.app/new)
   - Choose "Deploy from GitHub repo"
   - Select your repo and set **Root Directory** to `Backend`
   - Railway will auto-detect Node.js and run `npm start`

4. **Set environment variables** in Railway dashboard:
   - `JWT_SECRET` – Generate a strong secret: `openssl rand -base64 32`
   - `NODE_ENV` – `production`
   - `CORS_ORIGINS` – Your production URLs, comma-separated:
     - `https://your-website.netlify.app,https://your-admin.netlify.app`

5. **Add a volume** (for SQLite persistence):
   - In your Railway service → Variables → Add Volume
   - Mount path: `/data`
   - Set env: `DATABASE_PATH=/data/admin-panel.db`

6. **Get your API URL** – Railway will assign a URL like `https://your-app.up.railway.app`

7. **Update your website & admin** – Set `PUBLIC_API_BASE_URL` / `REACT_APP_API_URL` to this URL.

---

## Option 2: Render

1. Go to [render.com](https://render.com) → New → Web Service
2. Connect your repo, set **Root Directory** to `Backend`
3. Build: `npm install`
4. Start: `npm start`
5. Add env vars: `JWT_SECRET`, `NODE_ENV=production`, `CORS_ORIGINS`

**Note:** Render's free tier has ephemeral disk. SQLite data resets on restart. Use a paid persistent disk or migrate to PostgreSQL for production.

---

## Option 3: Fly.io

1. Install Fly CLI: `curl -L https://fly.io/install.sh | sh`
2. From project root:
   ```bash
   cd Backend
   fly launch
   ```
3. When prompted, create a volume for the database:
   ```bash
   fly volumes create data --size 1
   ```
4. Set `DATABASE_PATH=/data/admin-panel.db` and mount the volume in `fly.toml`
5. Set `JWT_SECRET`, `CORS_ORIGINS` via `fly secrets set`

---

## Required Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `JWT_SECRET` | Yes | Strong random string for signing tokens |
| `NODE_ENV` | No | `production` in production |
| `PORT` | No | Platform usually sets this (e.g. Railway, Render) |
| `CORS_ORIGINS` | Yes (prod) | Comma-separated URLs of your website and admin panel |
| `DATABASE_PATH` | No | Use for volume paths (e.g. `/data/admin-panel.db`) |

---

## After Deployment

1. Test health: `https://your-api-url/api/health`
2. Default admin: `admin` / `admin123` – **change this immediately** via the admin panel
3. Update `website` and `admin-panel` config to use your API URL
