# 🚀 KrishiDrishti (কৃষি দৃষ্টি) — Complete Production Deployment Guide
### Deploying Next.js on Vercel + Express Backend & AI Model on Render + Cloud PostgreSQL

---

## 📌 1. System Architecture Overview

KrishiDrishti is designed as a decoupled, cloud-native distributed micro-service architecture:

```
[ Farmer / Agronomist Browser ]
               │
               ▼
┌──────────────────────────────────────────────┐
│       Frontend (Next.js 14 App Router)       │
│               Hosted on VERCEL               │
│  - UI Components, Tailwind CSS, Local Cache  │
│  - Server Actions, LLM Crop Doctor Proxy     │
└──────────────┬───────────────────────────────┘
               │
               ├─────────────────────────────────────────┐
               ▼ (REST API / JWT Auth)                   ▼ (Inference Fallback)
┌──────────────────────────────────────────────┐   ┌───────────────────────────┐
│     Backend API (Node.js / Express + TS)     │   │   HuggingFace Inference   │
│               Hosted on RENDER               │   │      (Free Cloud API)     │
│  - Authentication, Scans, Feedback, Library  │   │  ripro805/krishidrishti-  │
│  - Prisma ORM 5.21 Database Layer            │   │       plant-disease       │
└──────────────┬───────────────────────────────┘   └───────────────────────────┘
               │
       ┌───────┴────────────────────────┐
       ▼                                ▼
┌──────────────────────────┐    ┌──────────────────────────────────────────┐
│  PostgreSQL 16 Database  │    │     FastAPI Model Server (Python 3.11)   │
│  Render DB / Neon.tech   │    │             Hosted on RENDER             │
│  - Users, Scans, Reports │    │  - PyTorch ConvNeXt Dual-Stage Engine    │
└──────────────────────────┘    └──────────────────────────────────────────┘
```

---

## 📋 Pre-Deployment Checklist

Before you start, make sure you have:
1. A **GitHub** account with your KrishiDrishti repository pushed.
2. A free account on **[Vercel](https://vercel.com)**.
3. A free account on **[Render](https://render.com)**.
4. API Keys ready:
   - Google Gemini API key ([Google AI Studio](https://aistudio.google.com/app/apikey))
   - Groq API key ([Groq Console](https://console.groq.com/keys))
   - Hugging Face Token ([Hugging Face Settings](https://huggingface.co/settings/tokens))

---

## 🗄️ Phase 1: Deploy PostgreSQL Database (on Render or Neon.tech)

### Option A: Render Managed PostgreSQL (All-in-one on Render)
1. Log in to [Render Dashboard](https://dashboard.render.com).
2. Click **New +** ➔ **PostgreSQL**.
3. Fill in the fields:
   - **Name**: `krishi-drishti-db`
   - **Database**: `krishi_drishti`
   - **User**: `krishi_admin`
   - **Region**: `Singapore` (closest for low latency in South Asia)
   - **Plan**: `Free`
4. Click **Create Database**.
5. Once created, copy the **Internal Database URL** (if backend is on Render) or **External Database URL**:
   ```
   postgresql://krishi_admin:xxxx@dpg-xxxx.render.com/krishi_drishti
   ```

### Option B: Neon.tech Serverless PostgreSQL (Recommended for generous free tier)
1. Go to [Neon.tech](https://neon.tech) and create a free project named `krishi-drishti`.
2. Copy your pooled connection string:
   ```
   postgresql://user:password@ep-cool-fog-123456.ap-southeast-1.aws.neon.tech/krishi_drishti?sslmode=require
   ```

---

## ⚙️ Phase 2: Deploy Backend API on Render

1. On [Render Dashboard](https://dashboard.render.com), click **New +** ➔ **Web Service**.
2. Connect your GitHub repository: `krishi-drishti`.
3. Configure the Web Service:
   - **Name**: `krishi-drishti-backend`
   - **Region**: `Singapore`
   - **Branch**: `main`
   - **Root Directory**: `backend` *(CRITICAL: must set to `backend`)*
   - **Runtime**: `Node`
   - **Build Command**:
     ```bash
     npm install && npx prisma generate && npm run build
     ```
   - **Start Command**:
     ```bash
     npm start
     ```
   - **Instance Type**: `Free`

4. Add **Environment Variables** (under *Environment* tab):

   | Key | Value | Description |
   | :--- | :--- | :--- |
   | `NODE_ENV` | `production` | Production environment |
   | `PORT` | `5000` | Server listening port |
   | `DATABASE_URL` | `postgresql://...` | Connection string from Phase 1 |
   | `JWT_SECRET` | `generate-a-strong-32-char-random-string` | JWT encryption secret |
   | `JWT_EXPIRES_IN` | `7d` | Token expiry duration |
   | `FRONTEND_URL` | `https://krishi-drishti.vercel.app` | Your Vercel frontend URL (for CORS) |
   | `DISEASE_MODEL_API_URL` | `http://localhost:5005/predict` | FastAPI URL (or HF direct) |

5. Click **Create Web Service**.
6. **Push Database Schema**:
   Once the service deploys, open the Render **Shell** tab on your backend service and run:
   ```bash
   npx prisma db push
   ```
   *(Optional: run `npm run prisma:seed` if you want initial admin and sample crop data).*
7. Copy your backend service URL:
   ```
   https://krishi-drishti-backend.onrender.com
   ```

---

## 🧠 Phase 3: AI Model Server Deployment

You have two robust deployment options for the AI vision layer:

### Option A: Direct Hugging Face Cloud Inference (Zero-Cost & Zero-Maintenance)
KrishiDrishti's frontend is already engineered to talk directly to Hugging Face Inference API!
- The ConvNeXt model is publicly hosted at `ripro805/krishidrishti-plant-disease`.
- By setting `NEXT_PUBLIC_HF_TOKEN` in Vercel (Phase 4), predictions execute straight from Hugging Face's global GPU inference infrastructure with no server RAM costs!

### Option B: Dedicated FastAPI Docker Service on Render
If you want complete self-hosted control:
1. Click **New +** ➔ **Web Service**.
2. Connect your repo and set **Runtime** to `Docker`.
3. Set **Dockerfile Path**: `Dockerfile.model_server`
4. Set **Region**: `Singapore`
5. Instance Type: Standard (2GB+ RAM required for PyTorch model weights).
6. Set Environment Variables:
   - `MODEL_NAME`: `ripro805/krishidrishti-plant-disease`
   - `PORT`: `5005`
7. Click **Create Web Service**.

---

## 🌐 Phase 4: Deploy Next.js Frontend on Vercel

1. Log in to [Vercel](https://vercel.com) and click **Add New...** ➔ **Project**.
2. Select your `krishi-drishti` repository and click **Import**.
3. In the project configuration:
   - **Framework Preset**: `Next.js`
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (automatic)
   - **Output Directory**: `.next` (automatic)

4. Open **Environment Variables** and add the following:

   | Key | Value / Source | Description |
   | :--- | :--- | :--- |
   | `NEXT_PUBLIC_API_URL` | `https://krishi-drishti-backend.onrender.com` | Render Express backend URL |
   | `NEXT_PUBLIC_HF_TOKEN` | `hf_xxxxxxxxxxxxxxxxxxxxxxxxx` | Hugging Face user access token |
   | `HF_TOKEN` | `hf_xxxxxxxxxxxxxxxxxxxxxxxxx` | Hugging Face user access token |
   | `GROQ_API_KEY` | `gsk_xxxxxxxxxxxxxxxxxxxxxxxxx` | Groq API key for Crop Doctor AI |
   | `GROQ_MODEL` | `qwen/qwen3.8-27b` | Groq Fast LLM model |
   | `GEMINI_API_KEY` | `AIzaxxxxxxxxxxxxxxxxxxxxxxxxx` | Google Gemini API key |
   | `GEMINI_MODEL` | `gemini-3.8-flash` | Gemini Multimodal model |
   | `AI_PRIMARY_PROVIDER` | `auto` | Auto-selects best available LLM |
   | `AI_FALLBACK_ENABLED` | `true` | Automatic fallback if provider limits hit |

5. Click **Deploy**.
6. In about 60–90 seconds, Vercel will complete the build and assign your live domain:
   ```
   https://krishi-drishti.vercel.app
   ```

---

## 🔄 Phase 5: Connect CORS & Final Verification

1. Go back to your **Render Backend Web Service**.
2. Go to **Environment** ➔ Edit `FRONTEND_URL`.
3. Paste your exact Vercel URL (e.g. `https://krishi-drishti.vercel.app` without a trailing slash).
4. Render will automatically redeploy the backend with the new CORS permissions.
5. **Live Verification Steps**:
   - [x] Open `https://krishi-drishti.vercel.app/`
   - [x] Toggle language button (Bangla ⇄ English) — ensure clean bilingual translation across all sections.
   - [x] Visit `/scan` and test an image (e.g. `apple black rot` sample) — verify disease result card and 98%+ match.
   - [x] Visit `/crop-doctor` and send a prompt (e.g. "টমেটো গাছে পাতা কোঁকড়ানো রোগ দূর করব কীভাবে?") — verify streaming AI agronomist response.
   - [x] Visit `/calculator` and test the Fertilizer Dosage engine for Rice or Potato.

---

## 💡 Free Tier Pro-Tips (Preventing Render Cold Starts)

1. **Keep-Alive Cron**:
   Render free-tier web services sleep after 15 minutes of inactivity and take ~45 seconds to wake up.
   To keep your API warm 24/7 for free:
   - Register on [UptimeRobot.com](https://uptimerobot.com) (free).
   - Add an **HTTP(s)** monitor pointing to:
     ```
     https://krishi-drishti-backend.onrender.com/api/health
     ```
   - Set monitoring interval to **every 10 minutes**. This prevents your Render backend from ever falling asleep!

2. **Frontend Offline Grace**:
   KrishiDrishti features local browser caching via IndexedDB and LocalStorage, meaning farmers can review previously generated scan reports and dosage calculations even when disconnected from the internet!

---

## 🛠️ Troubleshooting FAQ

| Issue | Root Cause | Solution |
| :--- | :--- | :--- |
| **CORS error in browser console** | `FRONTEND_URL` on Render doesn't match Vercel URL | Verify `FRONTEND_URL` has no trailing slash and matches `https://your-app.vercel.app`. |
| **Prisma client initialization error** | Database connection string invalid or SSL issue | Ensure `?sslmode=require` is appended to `DATABASE_URL` in production. |
| **Model inference timeout** | Model server cold start on CPU | Use `NEXT_PUBLIC_HF_TOKEN` direct cloud inference or keep model server awake with UptimeRobot. |
| **Vercel build fails with TypeScript error** | Untyped imports or syntax error | Run `npx tsc --noEmit` locally before committing to verify zero compile errors. |

