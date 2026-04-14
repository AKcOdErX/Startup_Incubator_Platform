# Akshar - Startup Incubator Platform

This repository contains:
- backend: Node.js + Express API with MongoDB
- frontend: React + Vite web app

## Prerequisites

- Node.js 18+ (or newer)
- npm 9+
- MongoDB running on localhost:27017

Optional:
- MongoDB Compass
- Docker Desktop (for db container workflow)

## Quick Start

### 1) Backend setup

```powershell
cd backend
npm install
```

Create or verify `.env` in `backend`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/incubator_db
JWT_SECRET=change_me_to_a_strong_secret
OPENAI_API_KEY=your_openai_api_key_optional
NODE_ENV=development
```

Start backend:

```powershell
npm run dev
```

### 2) Frontend setup

```powershell
cd ../frontend
npm install
npm run dev
```

Frontend default URL: http://localhost:5173

## MongoDB Notes

If `mongosh` is not recognized in PowerShell, run it using full path:

```powershell
C:\Users\User\AppData\Local\Programs\mongosh\mongosh.exe "mongodb://localhost:27017/incubator_db"
```

## Common Commands

Backend:
- `npm run dev`
- `npm start`
- `npm run db:up` (Docker)
- `npm run db:down` (Docker)

Frontend:
- `npm run dev`
- `npm run build`
- `npm run preview`
