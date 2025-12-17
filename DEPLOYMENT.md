# Render.com Deployment Guide - HR Database Application

## ⚠️ Important: PostgreSQL Required

Render's free tier **only supports PostgreSQL**, not MySQL. You'll need to convert your database schema.

## Prerequisites
- GitHub account with access to `Joydip-007/hr_full`
- Render.com account (sign up at https://render.com)

---

## 🚀 Deployment Methods

### Method 1: Blueprint Deploy (Recommended - One Click)

1. **Push the render.yaml file to your main branch**
2. Go to [Render Dashboard](https://render.com/dashboard)
3. Click **"New +"** button (top right)
4. Select **"Blueprint"**
5. Connect to repository: `Joydip-007/hr_full`
6. Render will read `render.yaml` and create all services automatically
7. Fill in the required environment variables when prompted
8. Click **"Apply"**

**Note:** After deployment, you'll need to:
- Initialize the database with your schema
- Update `FRONTEND_URL` in backend with the deployed frontend URL
- Update `REACT_APP_API_URL` in frontend with the deployed backend URL

---

### Method 2: Manual Step-by-Step Deploy

## Step 1: Create PostgreSQL Database

1. From Render Dashboard, click **"New +"** → **"PostgreSQL"**
2. Configure:
   ```
   Name: hr-database
   Database: hr_database
   User: (auto-generated)
   Region: Oregon (or closest to you)
   PostgreSQL Version: 16
   ```
3. **Plan Selection:** Select **"Free"** ($0/month)
4. Click **"Create Database"**
5. Wait for database creation (~2 minutes)
6. **Save Connection Details** from the "Info" tab:
   - Internal Database URL (use this for backend)
   - Host, Port, Database, Username, Password

---

## Step 2: Convert MySQL Schema to PostgreSQL

Your application uses MySQL, but Render free tier only supports PostgreSQL. Here's how to convert:

### Key Differences:

```sql
-- AUTO_INCREMENT → SERIAL
-- Before (MySQL):
LocationID INT AUTO_INCREMENT PRIMARY KEY

-- After (PostgreSQL):
LocationID SERIAL PRIMARY KEY

-- DATETIME → TIMESTAMP
-- Before (MySQL):
created_at DATETIME

-- After (PostgreSQL):
created_at TIMESTAMP

-- TINYINT(1) → BOOLEAN
-- Before (MySQL):
is_active TINYINT(1)

-- After (PostgreSQL):
is_active BOOLEAN

-- Remove MySQL-specific syntax
-- Before (MySQL):
CREATE TABLE `users` (...)  ENGINE=InnoDB;

-- After (PostgreSQL):
CREATE TABLE users (...);
```

### Quick Conversion Checklist:
- [ ] Replace `INT AUTO_INCREMENT` with `SERIAL`
- [ ] Replace `DATETIME` with `TIMESTAMP`
- [ ] Replace `TINYINT(1)` with `BOOLEAN`
- [ ] Remove backticks around table/column names
- [ ] Remove `ENGINE=InnoDB`
- [ ] Change `AUTO_INCREMENT=1` to nothing

**Save the converted schema as `database/schema_postgres.sql`**

---

## Step 3: Initialize Database

### Option A: Using psql Command Line

1. Install PostgreSQL client:
   ```bash
   # macOS
   brew install postgresql
   
   # Ubuntu/Debian
   sudo apt-get install postgresql-client
   
   # Windows
   Download from https://www.postgresql.org/download/windows/
   ```

2. From your PostgreSQL dashboard, click **"Connect"** dropdown
3. Copy the **External Database URL** (starts with `postgres://`)
4. Run in terminal:
   ```bash
   # Connect and run schema
   psql <your-database-url> -f database/schema_postgres.sql
   
   # Run seed data (if you have PostgreSQL version)
   psql <your-database-url> -f database/seed_postgres.sql
   ```

### Option B: Using Database GUI Tool

1. Download a PostgreSQL GUI client:
   - [pgAdmin](https://www.pgadmin.org/) (free)
   - [DBeaver](https://dbeaver.io/) (free)
   - [TablePlus](https://tableplus.com/) (free trial)

2. Connect using credentials from Step 1
3. Execute your converted SQL schema file
4. Execute seed data file

---

## Step 4: Deploy Backend Web Service

1. Click **"New +"** → **"Web Service"**
2. Select **"Build and deploy from a Git repository"**
3. Connect to `Joydip-007/hr_full` repository
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

5. **Add Environment Variables:**

   Click "Advanced" → "Add Environment Variable" for each:

   ```
   PORT = 5000
   NODE_ENV = production
   JWT_SECRET = (click "Generate" or create 32+ character random string)
   
   # Database credentials from Step 1
   DB_HOST = <hostname from Internal Database URL>
   DB_USER = <username from database>
   DB_PASSWORD = <password from database>
   DB_NAME = hr_database
   DB_PORT = 5432
   
   # Will update after frontend deploy
   FRONTEND_URL = https://hr-frontend.onrender.com
   ```

   **To extract database credentials from Internal URL:**
   ```
   postgres://username:password@hostname:port/database
              ^^^^^^^^  ^^^^^^^^  ^^^^^^^^  ^^^^  ^^^^^^^^
   ```

6. **Instance Type:** Select **"Free"** ($0/month)
7. Click **"Create Web Service"**
8. Wait for deployment (5-10 minutes first time)
9. **Copy Backend URL:** Find it at the top (e.g., `https://hr-backend-abc123.onrender.com`)

---

## Step 5: Deploy Frontend Static Site

1. Click **"New +"** → **"Static Site"**
2. Select **"Build and deploy from a Git repository"**
3. Connect to `Joydip-007/hr_full` repository
4. Configure:
   ```
   Name: hr-frontend
   Branch: main
   Root Directory: frontend
   Build Command: npm install && npm run build
   Publish Directory: build
   ```

5. **Add Environment Variable:**
   ```
   REACT_APP_API_URL = <backend-url-from-step-4>
   ```
   
   Example: `https://hr-backend-abc123.onrender.com`
   
   ⚠️ **Important:** Do NOT include `/api` at the end

6. **No plan selection needed** - static sites are free by default
7. Click **"Create Static Site"**
8. Wait for deployment (~3-5 minutes)
9. **Copy Frontend URL:** (e.g., `https://hr-frontend-xyz789.onrender.com`)

---

## Step 6: Update Backend Environment Variables

Now that you have the frontend URL, update the backend:

1. Go to **hr-backend** service dashboard
2. Click **"Environment"** in left sidebar
3. Update the **FRONTEND_URL** variable:
   ```
   FRONTEND_URL = <frontend-url-from-step-5>
   ```
   Example: `https://hr-frontend-xyz789.onrender.com`

4. Click **"Save Changes"**
5. Backend will automatically redeploy (~2-3 minutes)

---

## 🧪 Testing Your Deployment

1. Visit your frontend URL: `https://hr-frontend-xyz789.onrender.com`
2. The application should load (may take 30-60 seconds on first request)
3. Test login with default credentials:

   **Admin Account:**
   ```
   Email: admin@hrdb.com
   Password: password123
   ```

   **Regular User Accounts:**
   ```
   Email: john.smith@email.com
   Password: password123
   
   Email: emily.johnson@email.com
   Password: password123
   
   Email: michael.williams@email.com
   Password: password123
   ```

4. **Test These Features:**
   - [ ] Browse open positions
   - [ ] Apply to a job (as regular user)
   - [ ] View your applications
   - [ ] Login as admin
   - [ ] View all applications in admin dashboard
   - [ ] Update application status

---

## 🐛 Troubleshooting

### Backend Fails to Start

**Check Logs:**
1. Go to backend service dashboard
2. Click **"Logs"** tab
3. Look for error messages

**Common Issues:**
- ❌ **"Database connection failed"**
  - Solution: Verify all DB_* environment variables are correct
  - Ensure you're using Internal Database URL hostname (not external)
  - Check database is running (green dot in dashboard)

- ❌ **"Cannot find module"**
  - Solution: Check `package.json` has all dependencies listed
  - Try manual deploy trigger

- ❌ **"Port already in use"**
  - Solution: Ensure `PORT` env var is set to 5000
  - Render manages ports automatically

### Frontend Can't Connect to Backend

**Symptoms:** API calls fail, console shows CORS errors

**Solutions:**
1. Verify `REACT_APP_API_URL` is set correctly in frontend
   - Should NOT include `/api` at the end
   - Should use `https://` not `http://`
2. Check backend `FRONTEND_URL` matches your actual frontend URL
3. Verify backend is running (green status)
4. Open browser DevTools (F12) → Network tab → check failing requests

### Database Connection Errors

**"Connection refused" or "Host not reachable":**
- Use **Internal Database URL** hostname for backend (not external)
- Verify `DB_PORT` is `5432` (PostgreSQL default)
- Check database hasn't expired (free tier: 90 days)

**"Authentication failed":**
- Double-check DB_USER and DB_PASSWORD match database credentials
- Copy-paste to avoid typos

### Service Spinning Down (Free Tier)

**Symptom:** First request takes 30-60 seconds

**Explanation:** Free tier services sleep after 15 minutes of inactivity

**Solutions:**
- This is normal for free tier
- Consider upgrading to paid plan ($7/month per service) for always-on
- Use a service like UptimeRobot to ping your app every 14 minutes

### Build Failures

**Frontend build fails with "JavaScript heap out of memory":**
```json
// Add to frontend/package.json
"scripts": {
  "build": "NODE_OPTIONS=--max-old-space-size=4096 react-scripts build"
}
```

**Node version mismatch:**
```json
// Add to package.json
"engines": {
  "node": ">=18.x"
}
```

---

## 📊 Free Tier Limitations

| Resource | Limit | Details |
|----------|-------|---------|
| **Web Services** | 750 hours/month | One service can run 24/7 |
| **Static Sites** | Unlimited | Always free |
| **PostgreSQL** | 90 days | Then expires unless upgraded |
| **Storage** | 1GB | For database |
| **Bandwidth** | 100GB/month | Across all services |
| **Build Time** | 500 minutes/month | Usually enough |
| **Spin Down** | After 15 min | Takes 30-60s to wake up |

### What Happens After 90 Days?

Your **PostgreSQL database will be deleted** unless you:
- Upgrade to paid plan ($7/month)
- Export data and recreate a new free database
- Use external database service

---

## 💰 Upgrade Costs (Optional)

To keep services always-on and database permanent:

| Service | Free Plan | Paid Plan |
|---------|-----------|-----------|
| Backend Web Service | $0 (sleeps) | $7/month (always-on) |
| Frontend Static Site | $0 (always-on) | N/A |
| PostgreSQL Database | $0 (90 days) | $7/month (permanent) |
| **Total to stay free** | **$0/month** | - |
| **Total for always-on** | - | **$14/month** |

---

## 🔒 Security Best Practices

### Before Going Live:

1. **Change Default Passwords**
   ```sql
   -- Update admin password in database
   UPDATE users SET password = '<new-bcrypt-hash>' WHERE email = 'admin@hrdb.com';
   ```

2. **Generate Strong JWT Secret**
   - Use at least 32 characters
   - Include letters, numbers, special characters
   - Never commit to git

3. **Configure CORS Properly**
   - Set specific `FRONTEND_URL` (not `*`)
   - Backend already configured in `src/index.js`

4. **Environment Variables**
   - Never commit `.env` files
   - Use Render's environment variable UI only

5. **Database Security**
   - Use Internal Database URL (not external) for backend
   - External URL is only for your local development

---

## 📝 Deployment Checklist

- [ ] PostgreSQL database created on Render
- [ ] MySQL schema converted to PostgreSQL syntax
- [ ] Database initialized with schema and seed data
- [ ] Backend deployed with all environment variables set
- [ ] Backend health check passing at `/health`
- [ ] Frontend deployed with `REACT_APP_API_URL` set
- [ ] Backend `FRONTEND_URL` updated with actual frontend URL
- [ ] Tested login with admin account
- [ ] Tested login with regular user account
- [ ] Tested browsing positions
- [ ] Tested applying to a job
- [ ] Tested admin dashboard
- [ ] Default passwords changed (before production use)
- [ ] Documentation updated with your service URLs

---

## 📚 Additional Resources

- [Render Documentation](https://render.com/docs)
- [PostgreSQL on Render](https://render.com/docs/databases)
- [Deploying Node.js](https://render.com/docs/deploy-node-express-app)
- [Deploying React Apps](https://render.com/docs/deploy-create-react-app)
- [Environment Variables Guide](https://render.com/docs/environment-variables)
- [Free Tier Limits](https://render.com/docs/free)

---

## 🆘 Getting Help

- **Render Community Forum:** https://community.render.com
- **Render Status Page:** https://status.render.com
- **Support Email:** help@render.com (paid plans get priority)
- **GitHub Issues:** Create issue in your repository

---

## 📋 Your Deployment Information

Fill this in after deployment for future reference:

```
Backend URL: ________________________________________
Frontend URL: ________________________________________
Database Internal Host: ________________________________________

PostgreSQL Credentials:
  Host: ________________________________________
  Port: 5432
  Database: hr_database
  Username: ________________________________________
  Password: ________________________________________ (keep secure!)

Admin Login:
  Email: admin@hrdb.com
  Password: ________________________________________ (change this!)

Deployment Date: ________________________________________
Free Tier Expiry (90 days): ________________________________________
```

---

## ✅ Success!

Your HR Database application is now live and accessible from anywhere! 🎉

**Next Steps:**
1. Share the frontend URL with your team
2. Change default passwords
3. Add more data through the application UI or database
4. Monitor usage in Render dashboard
5. Set up uptime monitoring (optional)

Good luck with your HR Database application! 🚀
