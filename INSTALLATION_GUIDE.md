# Complete Installation & Deployment Guide

Comprehensive guide for setting up and deploying the Fynd Developer Onboarding Portal.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Local Development Setup](#local-development-setup)
3. [Environment Configuration](#environment-configuration)
4. [Running the Application](#running-the-application)
5. [Building for Production](#building-for-production)
6. [Deployment Options](#deployment-options)
7. [Troubleshooting](#troubleshooting)

---

## 🔧 Prerequisites

### Required Software

**Node.js** (version 18.0.0 or higher)
```bash
# Check your Node.js version
node --version

# If not installed, download from:
# https://nodejs.org/
```

**npm** (comes with Node.js) or **yarn**
```bash
# Check npm version
npm --version

# Or if using yarn
yarn --version
```

**Git** (for version control)
```bash
# Check Git version
git --version

# If not installed, download from:
# https://git-scm.com/
```

### System Requirements

- **OS:** Windows 10+, macOS 10.15+, or Linux
- **RAM:** 2GB minimum, 4GB recommended
- **Storage:** 500MB for project + dependencies
- **Browser:** Chrome, Firefox, Safari, or Edge (latest versions)

---

## 💻 Local Development Setup

### Option 1: Direct Installation

1. **Navigate to the project directory**
   ```bash
   cd "/Users/karandesai/Desktop/fynd day"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   
   This installs:
   - Next.js 14.0.4
   - React 18.2.0
   - TypeScript 5.3.3
   - Tailwind CSS 3.4.0
   - react-syntax-highlighter 15.5.0
   - lucide-react 0.303.0

3. **Verify installation**
   ```bash
   # Check if node_modules folder was created
   ls -la node_modules
   ```

### Option 2: Using Yarn

```bash
# Install yarn globally (if not already installed)
npm install -g yarn

# Navigate to project
cd "/Users/karandesai/Desktop/fynd day"

# Install dependencies
yarn install
```

---

## ⚙️ Environment Configuration

### Optional: API Configuration

If you want to connect to real Fynd Platform APIs for testing:

1. **Copy the example environment file**
   ```bash
   cp .env.example .env.local
   ```

2. **Edit `.env.local` with your credentials**
   ```bash
   # Open in your text editor
   nano .env.local
   # or
   code .env.local
   ```

3. **Add your Fynd credentials**
   ```env
   COMPANY_ID=your_company_id
   APPLICATION_ID=your_application_id
   API_KEY=your_api_key
   API_SECRET=your_api_secret
   
   # Optional: For Slack notifications
   SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
   ```

**Note:** The portal works perfectly without these credentials. They're only needed if interns want to test real API calls.

---

## 🚀 Running the Application

### Development Mode (Recommended for Learning)

```bash
npm run dev
```

**What happens:**
- Development server starts on http://localhost:3000
- Hot reload enabled (changes reflect immediately)
- Source maps available for debugging
- Detailed error messages

**Console output should show:**
```
  ▲ Next.js 14.0.4
  - Local:        http://localhost:3000
  - Ready in 2.5s
```

### Production Mode (For Testing Build)

```bash
# Build the application
npm run build

# Start production server
npm start
```

**What happens:**
- Optimized build created in `.next/` folder
- Server starts on http://localhost:3000
- Production-level performance
- Minimal console output

### Using Different Port

```bash
# Development on port 3001
npm run dev -- -p 3001

# Production on port 8080
npm start -- -p 8080
```

---

## 📦 Building for Production

### Standard Build

```bash
npm run build
```

This creates:
- Optimized JavaScript bundles
- Minified CSS
- Compressed assets
- Static HTML pages

**Build output:**
```
Route (app)                              Size     First Load JS
┌ ○ /                                    8.2 kB         92 kB
├ ○ /assignments                         12 kB          96 kB
├ ○ /assignments/boltic                  28 kB         112 kB
├ ○ /assignments/storefront              32 kB         116 kB
├ ○ /boltic                             24 kB         108 kB
├ ○ /overview                           18 kB         102 kB
├ ○ /platform-api                       22 kB         106 kB
├ ○ /storefront                         16 kB         100 kB
└ ○ /storefront/banner-tutorial         20 kB         104 kB

○ (Static) automatically rendered as static HTML
```

### Analyzing Bundle Size

```bash
# Install analyzer
npm install --save-dev @next/bundle-analyzer

# Run analysis
ANALYZE=true npm run build
```

---

## 🌐 Deployment Options

### Option 1: Vercel (Recommended - Easiest)

**Why Vercel?**
- Made by Next.js creators
- Zero configuration
- Automatic deployments
- Free for personal projects
- Built-in CI/CD

**Steps:**

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   cd "/Users/karandesai/Desktop/fynd day"
   vercel
   ```

3. **Follow prompts:**
   - Set up project? → Yes
   - Which scope? → Your account
   - Link to existing? → No
   - Project name? → fynd-onboarding (or your choice)
   - Directory? → Press Enter (use current)
   - Override settings? → No

4. **Get your URL**
   ```
   ✅ Production: https://fynd-onboarding.vercel.app
   ```

**For subsequent deploys:**
```bash
vercel --prod
```

### Option 2: Netlify

**Steps:**

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/fynd-onboarding.git
   git push -u origin main
   ```

2. **Connect to Netlify**
   - Go to https://app.netlify.com
   - Click "New site from Git"
   - Connect GitHub repository
   - Configure:
     - Build command: `npm run build`
     - Publish directory: `.next`
   - Click "Deploy site"

3. **Get your URL**
   ```
   https://fynd-onboarding.netlify.app
   ```

### Option 3: Self-Hosted (VPS)

**Requirements:**
- Ubuntu/Debian server
- SSH access
- Domain name (optional)

**Steps:**

1. **Connect to server**
   ```bash
   ssh user@your-server-ip
   ```

2. **Install Node.js**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. **Install PM2**
   ```bash
   sudo npm install -g pm2
   ```

4. **Clone or upload project**
   ```bash
   git clone your-repo-url fynd-onboarding
   cd fynd-onboarding
   ```

5. **Install and build**
   ```bash
   npm install
   npm run build
   ```

6. **Start with PM2**
   ```bash
   pm2 start npm --name "fynd-onboarding" -- start
   pm2 save
   pm2 startup
   ```

7. **Configure Nginx (optional)**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

### Option 4: Docker (Advanced)

**Create Dockerfile:**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

**Build and run:**
```bash
docker build -t fynd-onboarding .
docker run -p 3000:3000 fynd-onboarding
```

---

## 🔍 Troubleshooting

### Common Issues and Solutions

#### Issue 1: Port Already in Use

**Error:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution:**
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or use different port
npm run dev -- -p 3001
```

#### Issue 2: Module Not Found

**Error:**
```
Module not found: Can't resolve 'X'
```

**Solution:**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

#### Issue 3: TypeScript Errors

**Error:**
```
Type error: Cannot find module 'X'
```

**Solution:**
```bash
# Regenerate types
rm -rf .next
npm run dev
```

#### Issue 4: Build Fails

**Error:**
```
Error: Build failed
```

**Solution:**
```bash
# Clear cache and rebuild
rm -rf .next
rm -rf node_modules
npm install
npm run build
```

#### Issue 5: Styles Not Loading

**Problem:** Tailwind styles not appearing

**Solution:**
```bash
# Restart dev server
# Ctrl+C to stop
npm run dev

# Hard refresh browser
# Mac: Cmd + Shift + R
# Windows/Linux: Ctrl + Shift + R
```

#### Issue 6: Out of Memory

**Error:**
```
FATAL ERROR: Ineffective mark-compacts near heap limit
```

**Solution:**
```bash
# Increase Node memory
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

### Getting Help

If you encounter issues not listed here:

1. Check the [Next.js documentation](https://nextjs.org/docs)
2. Review error messages carefully
3. Search for the error on Google/Stack Overflow
4. Check project dependencies are compatible
5. Try a clean install

---

## ✅ Post-Installation Checklist

After installation, verify everything works:

- [ ] Dependencies installed (`node_modules/` exists)
- [ ] Dev server starts (`npm run dev` works)
- [ ] App loads in browser (http://localhost:3000)
- [ ] Navigation works (click links)
- [ ] Code blocks display with syntax highlighting
- [ ] Copy buttons work on code blocks
- [ ] Responsive design works (resize browser)
- [ ] All pages load without errors
- [ ] Console has no critical errors

---

## 📊 Performance Optimization (Production)

### Enable Production Optimizations

Already configured in `next.config.js`:
- ✅ React Strict Mode
- ✅ Image optimization
- ✅ Font optimization
- ✅ Script optimization

### Additional Optimizations

**Enable compression:**
```bash
npm install compression
```

**Add to production server:**
```javascript
// server.js
const compression = require('compression');
app.use(compression());
```

### Caching Strategy

Configure in your hosting provider:
- Static assets: Cache for 1 year
- HTML pages: Cache for 1 hour
- API routes: No cache or short TTL

---

## 🔒 Security Considerations

### For Production Deployment

1. **Environment Variables**
   - Never commit `.env` files
   - Use hosting provider's environment variables
   - Rotate API keys regularly

2. **API Keys**
   - Keep API secrets server-side only
   - Never expose in client-side code
   - Use appropriate CORS settings

3. **Dependencies**
   ```bash
   # Audit dependencies
   npm audit
   
   # Fix vulnerabilities
   npm audit fix
   ```

4. **HTTPS**
   - Always use HTTPS in production
   - Most hosting providers provide free SSL

---

## 📚 Additional Resources

- **Next.js Docs:** https://nextjs.org/docs
- **React Docs:** https://react.dev
- **Tailwind Docs:** https://tailwindcss.com/docs
- **TypeScript Docs:** https://www.typescriptlang.org/docs
- **Vercel Docs:** https://vercel.com/docs
- **Netlify Docs:** https://docs.netlify.com

---

## 🎉 You're All Set!

The application is now installed and ready to use. Start learning:

```bash
npm run dev
```

Open http://localhost:3000 and begin your Fynd development journey!

---

**Need more help? Check:**
- `README.md` - Project overview
- `QUICKSTART.md` - Quick setup guide  
- `PROJECT_SUMMARY.md` - Complete feature list

Happy coding! 🚀

