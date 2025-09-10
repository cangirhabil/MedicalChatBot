# Medical ChatBot Deployment Guide

## Backend Deployment (Render)

### 1. Deploy to Render

1. Push your code to GitHub:
```bash
git add .
git commit -m "Prepare for production deployment"
git push origin master
```

2. Go to [render.com](https://render.com) and sign up/log in
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Name**: `medical-chatbot-backend`
   - **Environment**: Docker
   - **Dockerfile Path**: `Dockerfile` (root directory)
   - **Instance Type**: Starter (Free) or Professional

### 2. Environment Variables (Render)

Add these in Render dashboard → Environment tab:

```bash
PINECONE_API_KEY="
GEMINI_API_KEY=""
ALLOWED_ORIGINS=https://your-frontend-domain.vercel.app
```

### 3. Get Backend URL

After deployment, copy your backend URL (something like):
```
https://medical-chatbot-backend-xxxx.onrender.com
```

## Frontend Deployment (Vercel)

### 1. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign up/log in
2. Click "Import Git Repository"
3. Select your GitHub repository
4. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - Click "Deploy"

### 2. Environment Variables (Vercel)

Add these in Vercel dashboard → Settings → Environment Variables:

```bash
NEXT_PUBLIC_API_BASE_URL=https://medical-chatbot-backend-xxxx.onrender.com
NEXT_PUBLIC_API_ENDPOINT=/get
NEXT_PUBLIC_APP_NAME=Medical AI Assistant
NEXT_PUBLIC_APP_DESCRIPTION=Your professional medical AI assistant
```

### 3. Update CORS (After Frontend Deploy)

After getting your Vercel URL, update backend CORS:
1. Go to Render dashboard → your backend service → Environment
2. Update `ALLOWED_ORIGINS`:
```bash
ALLOWED_ORIGINS=https://your-actual-frontend-domain.vercel.app
```
3. Redeploy backend

## Health Checks

- Backend: `https://your-backend.onrender.com/`
- Backend Health: `https://your-backend.onrender.com/api/chat/health`
- Frontend: `https://your-frontend.vercel.app`

## API Endpoints

- Chat (New): `POST /api/chat/` (JSON)
- Chat (Legacy): `POST /get` (JSON or Form)
- Health: `GET /api/chat/health`

## Important Notes

- Render free tier spins down after 15 minutes of inactivity
- First request after spin-down may take 30-60 seconds
- Vercel builds are fast and have instant cold starts
- Monitor logs in both Render and Vercel dashboards

## Troubleshooting

1. **CORS Issues**: Make sure ALLOWED_ORIGINS is set correctly
2. **API Not Responding**: Check Render logs and wait for spin-up
3. **Frontend 404**: Check NEXT_PUBLIC_API_BASE_URL is correct
4. **Build Failures**: Check environment variables are set
