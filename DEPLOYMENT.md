# Render.com Deployment Guide - HR Database Application

## ⚠️ Important: Use PostgreSQL Instead of MySQL

Render's free tier **only supports PostgreSQL**, not MySQL. We need to adapt the database schema.

## Prerequisites
- GitHub account with access to `Joydip-007/hr_full`
- Render.com account (sign up at https://render.com)

---

## 🚀 Deployment Options

### Option A: Blueprint Deploy (Recommended - One Click)

1. **Push the render.yaml file to your repository**

**Note about Plans:**
- Web services (backend): Use `free` plan
- Static sites (frontend): Use `starter` plan (which is free)
- Databases: Use `free` plan

2. Go to [Render Dashboard](https://render.com/dashboard)
3. Click **"New +"** button (top right)
4. Select **"Blueprint"**
5. Connect to repository: `Joydip-007/hr_full`
6. Render will read `render.yaml` and create all services automatically
7. Fill in the required environment variables:
   - `DB_HOST`: (will be auto-filled from database)
   - `DB_USER`: (will be auto-filled from database)
   - `DB_PASSWORD`: (will be auto-filled from database)
   - `FRONTEND_URL`: (add after frontend is deployed)
8. Click **"Apply"**

**Note:** You'll need to update FRONTEND_URL after deployment completes.

---

### Option B: Manual Deploy (Step-by-Step Control)

## Step 1: Create PostgreSQL Database

1. From Render Dashboard, click **"New +"** → **"PostgreSQL"**
2. Configure:
   ```
   Name: hr-database
   Database: hr_database
   User: hr_user (auto-generated)
   Region: Oregon (or closest to you)
   Plan: Free
   ```
3. Click **"Create Database"**
4. Wait for database to be created (~2 minutes)
5. **Copy Connection Details** from the Info tab:
   - **Internal Database URL** (use this for backend)
   - External Database URL
   - Host, Port, Database, Username, Password

### Step 2: Convert MySQL Schema to PostgreSQL

Since Render only supports PostgreSQL on free tier, you need to convert your MySQL schema.

**Key MySQL to PostgreSQL Changes:**
```sql
-- MySQL: AUTO_INCREMENT
-- PostgreSQL: SERIAL or GENERATED ALWAYS AS IDENTITY

-- Before (MySQL):
LocationID INT AUTO_INCREMENT PRIMARY KEY

-- After (PostgreSQL):
LocationID SERIAL PRIMARY KEY
-- OR
LocationID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY

-- MySQL: VARCHAR
-- PostgreSQL: VARCHAR (same, but check constraints)

-- MySQL: DATETIME
-- PostgreSQL: TIMESTAMP

-- MySQL: TINYINT(1) for boolean
-- PostgreSQL: BOOLEAN
```

**Quick conversion script** (save as `database/schema_postgres.sql`):
- Replace `INT AUTO_INCREMENT` with `SERIAL`
- Replace `DATETIME` with `TIMESTAMP`
- Replace `TINYINT(1)` with `BOOLEAN`
- Replace backticks `` ` `` with double quotes `"`
- Replace `ENGINE=InnoDB` with nothing

### Step 3: Initialize Database

**Method 1: Using Render Shell (Recommended)**
1. In PostgreSQL database dashboard, click **"Connect"** dropdown
2. Copy the **"PSQL Command"**
3. Use a local terminal with PostgreSQL client:
   ```bash
   # Install psql if needed (Mac)
   brew install postgresql
   
   # Connect to database
   psql <paste-connection-string-here>
   
   # Run schema
   \i database/schema_postgres.sql
   
   # Run seeds
   \i database/seed.sql
   ```

**Method 2: Using Web Interface**
1. Click **"Connect"** → **"External Connection"**
2. Use a PostgreSQL GUI tool like pgAdmin, DBeaver, or TablePlus
3. Connect using the credentials
4. Execute the SQL files

## Step 4: Deploy Backend

1. Click **"New +"** → **"Web Service"**
2. Select **"Build and deploy from a Git repository"**
3. Connect to `Joydip-007/hr_full`
4. Configure:
   ```
   Name: hr-backend
   Region: Oregon (same as database)
   Branch: main
   Root Directory: backend
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   ```

5. **Click "Advanced"** and add environment variables:
   ```
   PORT=5000
   NODE_ENV=production
   DB_HOST=<from database Internal Connection - host only>
   DB_USER=<from database>
   DB_PASSWORD=<from database>
   DB_NAME=hr_database
   DB_PORT=5432
   JWT_SECRET=<click "Generate" or create random 32-char string>
   FRONTEND_URL=https://hr-frontend.onrender.com
   ```

   **To get database values:**
   - Go to your PostgreSQL database dashboard
   - Click on "Info" or "Connect" tab
   - Use **Internal Database URL** values:
     ```
     postgres://username:password@host:port/database
     ```
   - Extract: host, username, password, database name

6. Select **Plan: Free**
7. Click **"Create Web Service"**
8. Wait for deployment (~5-10 minutes first time)
9. **Copy your backend URL**: `https://hr-backend-XXXX.onrender.com`

## Step 5: Deploy Frontend

1. Click **"New +"** → **"Static Site"**
2. Select **"Build and deploy from a Git repository"**
3. Connect to `Joydip-007/hr_full`
4. Configure:
   ```
   Name: hr-frontend
   Branch: main
   Root Directory: frontend
   Build Command: npm install && npm run build
   Publish Directory: build
   ```

5. **Add environment variable:**
   ```
   REACT_APP_API_URL=<backend-url-from-step-4>
   ```
   Example: `REACT_APP_API_URL=https://hr-backend-abc123.onrender.com`

6. Select **Plan: Starter** (this is the free tier for static sites)
7. Click **"Create Static Site"**
8. Wait for deployment (~3-5 minutes)
9. **Copy your frontend URL**: `https://hr-frontend-XXXX.onrender.com`

## Step 6: Update Backend CORS

1. Go back to **hr-backend** service
2. Click **"Environment"** tab
3. Update or add:
   ```
   FRONTEND_URL=<frontend-url-from-step-5>
   ```
   Example: `FRONTEND_URL=https://hr-frontend-abc123.onrender.com`

4. Click **"Save Changes"**
5. Backend will automatically redeploy

---

## 🧪 Testing Your Deployment

1. Visit your frontend URL
2. You should see the HR Database application
3. Test login with default credentials:
   ```
   Admin:
   - Email: admin@hrdb.com
   - Password: password123
   
   Regular Users:
   - john.smith@email.com / password123
   - emily.johnson@email.com / password123
   - michael.williams@email.com / password123
   ```

4. Test features:
   - Browse positions
   - Apply to jobs
   - View applications
   - Admin dashboard (with admin account)

---

## 🐛 Troubleshooting

### Backend Fails to Start
**Check Logs:**
1. Go to backend service dashboard
2. Click **"Logs"** tab
3. Look for errors

**Common issues:**
- ❌ Database connection failed → Check DB credentials
- ❌ Module not found → Check build command ran successfully
- ❌ Port already in use → Render handles this, shouldn't happen

### Frontend Can't Connect to Backend
**Check:**
- ✅ `REACT_APP_API_URL` is set correctly (without trailing slash)
- ✅ Backend is running (green status)
- ✅ CORS is configured with correct frontend URL
- ✅ Check browser console for errors (F12)

### Database Connection Errors
**Common fixes:**
- Use **Internal Database URL** for backend (not external)
- Verify all DB credentials are copied correctly
- Check database is running (green status)
- Ensure DB_PORT is `5432` (PostgreSQL default)

### Service Spins Down (Free Tier)
- Free tier services sleep after 15 minutes of inactivity
- First request takes 30-60 seconds to wake up
- Consider upgrading to paid plan ($7/month per service) for always-on

### Build Failures
**Frontend build fails:**
```bash
# Check node version compatibility
# Render uses Node 14 by default
```
Add to `frontend/package.json`:
```json
"engines": {
  "node": ">=18.x"
}
```

**Backend build fails:**
Check `backend/package.json` has all dependencies listed.

### render.yaml Errors

**Error: "no such plan free for service type web" with static sites**
- **Solution:** Static sites use `plan: starter` (not `plan: free`)
- The `starter` plan is free for static sites
- Only web services use `plan: free`

**Error: "static sites cannot have a region"**
- **Solution:** Remove the `region` field from static site configuration
- Static sites are deployed globally, not to specific regions

**Error: "sync: false requires service reference"**
- **Solution:** These env vars will be filled manually after services are created
- Or use `fromService` to reference other services

---

## 📊 Free Tier Limitations

| Resource | Limit |
|----------|-------|
| **Web Services** | 750 hours/month per service |
| **Static Sites** | Unlimited |
| **PostgreSQL** | 90 days, then expires (1GB storage) |
| **Bandwidth** | 100GB/month |
| **Build minutes** | 500 minutes/month |
| **Spin down** | After 15 min inactivity |

**Cost to keep always-on:**
- Web Service: $7/month
- PostgreSQL: $7/month
- **Total: ~$14/month**

---

## 🔒 Security Recommendations

### Before going live:
1. ✅ Change all default passwords in database
2. ✅ Generate strong JWT_SECRET (32+ characters)
3. ✅ Set specific CORS origin (not `*`)
4. ✅ Enable HTTPS only (Render does this by default)
5. ✅ Review database permissions
6. ✅ Add rate limiting to API endpoints
7. ✅ Validate all user inputs

---

## 📚 Additional Resources

- [Render Documentation](https://render.com/docs)
- [PostgreSQL on Render](https://render.com/docs/databases)
- [Node.js on Render](https://render.com/docs/deploy-node-express-app)
- [React on Render](https://render.com/docs/deploy-create-react-app)
- [Environment Variables](https://render.com/docs/environment-variables)

---

## 🆘 Getting Help

- **Render Community**: https://community.render.com
- **Render Status**: https://status.render.com
- **Support**: help@render.com (paid plans only)

---

## ✅ Deployment Checklist

- [ ] PostgreSQL database created
- [ ] Database schema converted to PostgreSQL
- [ ] Database initialized with schema and seed data
- [ ] Backend deployed with all environment variables
- [ ] Backend health check passing (`/health`)
- [ ] Frontend deployed with `REACT_APP_API_URL`
- [ ] Backend CORS updated with frontend URL
- [ ] Test login with default credentials
- [ ] Test job application flow
- [ ] Test admin dashboard
- [ ] Change default passwords
- [ ] Document your service URLs

---

## 📝 Your Deployment URLs

Fill these in after deployment:

```
Backend URL: ________________________________
Frontend URL: ________________________________
Database Host: ________________________________

Admin Login: admin@hrdb.com
```

Good luck with your deployment! 🚀
