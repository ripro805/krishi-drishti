# 🌾 KrishiDrishti Backend API Suite

> **Production-grade Node.js, Express, Prisma ORM & PostgreSQL backend architected in a Modular Pattern for the KrishiDrishti Agricultural Disease Detection Platform.**

---

## 🛠 Tech Stack

- **Runtime**: Node.js (v18+)
- **Framework**: Express.js
- **Language**: TypeScript
- **Database & ORM**: PostgreSQL with Prisma ORM
- **Authentication**: JWT (JSON Web Tokens) with bcrypt password hashing
- **Validation**: Zod schema validation
- **Security & Utilities**: Helmet, CORS, Morgan logger

---

## 📁 Modular Pattern Architecture

The codebase follows the **Modular (Feature-Based / Domain-Driven) Pattern**. Each business domain encapsulates its own routes, controllers, services, and validation schemas:

```text
backend/
├── prisma/
│   ├── schema.prisma                  # PostgreSQL database schema (Users, Diseases, Scans, Feedbacks, Notices)
│   └── seed.ts                        # Database seed with agricultural records & test accounts
├── src/
│   ├── ai/                            # 🧠 AI & Model Subsystems
│   │   ├── disease-detector/          # 🔬 AI Vision Leaf Disease Model (ConvNeXt-Tiny)
│   │   │   ├── README.md              # Vision API contract & model specifications
│   │   │   └── model.stub.ts          # Model bridge interface & fallback inference simulator
│   │   └── chatbot/                   # 🤖 Crop Doctor AI Chatbot Subsystem
│   │       ├── README.md              # Agronomist chatbot prompt guidelines & RAG specs
│   │       └── chatbot.stub.ts        # Conversational agronomist responder stub
│   ├── config/
│   │   ├── db.ts                      # PrismaClient instance with error logging & disconnect hooks
│   │   └── env.ts                     # Strict environment variable parser
│   ├── middlewares/
│   │   ├── auth.middleware.ts         # JWT token verification (authenticate & optionalAuthenticate)
│   │   ├── role.middleware.ts         # Role-based authorization (ADMIN, EXPERT, FARMER)
│   │   ├── error.middleware.ts        # Centralized global exception handler
│   │   └── validate.middleware.ts     # Zod schema validation middleware
│   ├── modules/                       # 📦 Business Domain Modules
│   │   ├── auth/                      # Register, Login, Current User profile
│   │   ├── users/                     # User management (Admin controls, profiles)
│   │   ├── diseases/                  # Pathology catalog & disease knowledge base
│   │   ├── scans/                     # Leaf scan diagnostic engine & history logs
│   │   ├── feedback/                  # Prediction accuracy feedback & quality scoring
│   │   ├── notices/                   # Agricultural notices, cold wave alerts, news
│   │   ├── calculator/                # Precision Urea & N-P-K fertilizer calculation engine
│   │   └── chatbot/                   # Crop Doctor agronomist message endpoints
│   ├── utils/
│   │   ├── apiError.ts                # Structured ApiError class
│   │   ├── apiResponse.ts             # Standardized { success, message, data, meta } envelope
│   │   └── logger.ts                  # Multi-level structured logger
│   ├── routes.ts                      # Central API v1 router mounting all modules
│   ├── app.ts                         # Express application setup
│   └── server.ts                      # HTTP server bootstrap & graceful shutdown
├── .env.example                       # Environment variable template
├── package.json
└── tsconfig.json
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` and set your PostgreSQL connection string:
```bash
cp .env.example .env
```

```env
PORT=5000
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/krishi_drishti?schema=public"
JWT_SECRET="your-secure-jwt-secret-key"
FRONTEND_URL="http://localhost:3000"
```

### 3. Initialize Prisma & PostgreSQL Database
```bash
# Generate the Prisma Client
npm run prisma:generate

# Push schema directly to your PostgreSQL database (or run migrations)
npm run prisma:push

# Seed initial pathology records, demo users, and scan logs
npm run prisma:seed
```

### 4. Start Development Server
```bash
npm run dev
```
The server will boot on `http://localhost:5000` with hot-reloading via `tsx`.

---

## 📡 API Endpoints Reference (`/api/v1`)

| Module | Method | Endpoint | Description | Access |
|---|---|---|---|---|
| **Auth** | `POST` | `/api/v1/auth/register` | Register farmer, expert, or admin | Public |
| | `POST` | `/api/v1/auth/login` | Authenticate & obtain JWT | Public |
| | `GET` | `/api/v1/auth/me` | Fetch authenticated user profile | Authenticated |
| **Users** | `GET` | `/api/v1/users` | List all users (filter by role) | Admin |
| | `GET` | `/api/v1/users/:id` | View user profile & activity | Authenticated |
| | `PUT` | `/api/v1/users/:id` | Update profile information | Authenticated |
| | `DELETE`| `/api/v1/users/:id` | Delete user account | Admin |
| **Diseases** | `GET` | `/api/v1/diseases` | List diseases (filter by crop, pathogen, search) | Public |
| | `GET` | `/api/v1/diseases/:id` | Get disease details with Bangla guidance | Public |
| | `POST` | `/api/v1/diseases` | Add new disease to pathology catalog | Admin / Expert |
| | `PUT` | `/api/v1/diseases/:id` | Update pathology card & treatments | Admin / Expert |
| | `DELETE`| `/api/v1/diseases/:id` | Delete disease record | Admin |
| **Scans** | `POST` | `/api/v1/scans` | Submit leaf image for AI diagnosis | Public / Authenticated |
| | `GET` | `/api/v1/scans` | View scan history logs | Public / Authenticated |
| | `GET` | `/api/v1/scans/:id` | View single scan diagnosis & leaf metrics | Public |
| | `PATCH`| `/api/v1/scans/:id/status`| Update status (`Active`, `Treated`, `Monitoring`) | Public |
| | `DELETE`| `/api/v1/scans/:id` | Delete scan from history | Public |
| **Feedback** | `POST` | `/api/v1/feedback` | Submit prediction rating (`accurate`/`inaccurate`/`unsure`) | Public |
| | `GET` | `/api/v1/feedback/stats`| Get overall model accuracy statistics | Public |
| | `GET` | `/api/v1/feedback` | List submitted feedback for quality review | Admin / Expert |
| | `PATCH`| `/api/v1/feedback/:id/status`| Update review status (`reviewed`, `flagged`) | Admin / Expert |
| **Notices** | `GET` | `/api/v1/notices` | Get agricultural cold-wave & safety alerts | Public |
| | `POST` | `/api/v1/notices` | Post new agricultural notice | Admin |
| | `PUT` | `/api/v1/notices/:id` | Update notice | Admin |
| | `DELETE`| `/api/v1/notices/:id` | Delete notice | Admin |
| **Calculator** | `POST` | `/api/v1/calculator/fertilizer` | Calculate exact Urea, DAP, MOP & split schedule | Public |
| **Chatbot** | `POST` | `/api/v1/chatbot/message` | Ask Crop Doctor agronomist assistant | Public |
