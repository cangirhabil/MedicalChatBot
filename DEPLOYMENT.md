# Medical ChatBot Deployment Guide

## Backend Deployment (Render)

### 1. Deploy to Render

1. Push your code to GitHub
2. Go to [render.com](https://render.com)
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Name**: `medical-chatbot-backend`
   - **Environment**: Docker
   - **Dockerfile Path**: `backend/Dockerfile`
   - **Instance Type**: Starter (Free) or Professional

### 2. Environment Variables

Add these in Render dashboard:

```bash
PINECONE_API_KEY=your_pinecone_api_key
GEMINI_API_KEY=your_gemini_api_key
ALLOWED_ORIGINS=https://your-frontend-domain.vercel.app
```

### 3. Get Backend URL

After deployment, copy your backend URL:
```
https://medical-chatbot-backend.onrender.com
```

## Frontend Deployment (Vercel)

### 1. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Select `frontend` folder as root directory
4. Click "Deploy"

### 2. Environment Variables

Add these in Vercel dashboard:

```bash
NEXT_PUBLIC_API_BASE_URL=https://medical-chatbot-backend.onrender.com
NEXT_PUBLIC_API_ENDPOINT=/get
NEXT_PUBLIC_APP_NAME=Medical AI Assistant
NEXT_PUBLIC_APP_DESCRIPTION=Your professional medical AI assistant
```

### 3. Update CORS

After getting your Vercel URL, update backend CORS:
1. Go to Render dashboard
2. Add environment variable:
```bash
ALLOWED_ORIGINS=https://your-frontend-domain.vercel.app
```

## Health Checks

- Backend: `https://your-backend.onrender.com/health`
- Frontend: `https://your-frontend.vercel.app`

## Important Notes

- Render free tier spins down after 15 minutes of inactivity
- First request after spin-down may take 30-60 seconds
- Consider upgrading to paid tier for production use
- Monitor logs in both Render and Vercel dashboards
