# Frontend Deployment Guide (Netlify)

Deploy the **website** and **admin-panel** to Netlify. You'll create **two separate Netlify sites** from the same GitHub repo.

## Prerequisites
- GitHub repo pushed: `sundiata/C-mer`
- Backend deployed at: `https://backend-production-c4b0.up.railway.app/api`

---

## 1. Deploy the Main Website

1. Go to [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import an existing project**
2. Choose **GitHub** and select **sundiata/C-mer**
3. Configure:
   - **Branch:** `main`
   - **Base directory:** `website`
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Under **Environment variables**, add (optional – already in `netlify.toml`):
   - `PUBLIC_API_BASE_URL` = `https://backend-production-c4b0.up.railway.app/api`
5. Click **Deploy site**
6. Save the site URL (e.g. `https://something.netlify.app`)

---

## 2. Deploy the Admin Panel

1. **Add new site** → **Import an existing project**
2. Choose **GitHub** and select **sundiata/C-mer** again
3. Configure:
   - **Branch:** `main`
   - **Base directory:** `admin-panel`
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Environment variables (optional – already in `admin-panel/netlify.toml`):
   - `REACT_APP_API_URL` = `https://backend-production-c4b0.up.railway.app/api`
5. Click **Deploy site**
6. Save the admin URL

---

## 3. Update Backend CORS

Add your Netlify URLs to the backend so it accepts requests:

```bash
cd Backend
railway variables --set "CORS_ORIGINS=https://YOUR-WEBSITE-URL.netlify.app,https://YOUR-ADMIN-URL.netlify.app"
```

Replace with your actual Netlify URLs (no trailing slash).

---

## 4. Verify

- **Website:** Open your site URL and confirm the blog, projects, and Apply form load
- **Admin:** Open the admin URL, log in with `admin` / `admin123`, and change the password
