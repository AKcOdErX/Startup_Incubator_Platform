# Backend Setup

## MongoDB (Docker)

This backend uses MongoDB via the connection string in .env:

- MONGODB_URI=mongodb://localhost:27017/incubator_db

### 1) Start MongoDB

From the backend folder:

```powershell
npm run db:up
```

### 2) Verify MongoDB is reachable

```powershell
Test-NetConnection -ComputerName localhost -Port 27017
```

You should see TcpTestSucceeded: True.

### 3) Start backend API

```powershell
npm run dev
```

### 4) Stop MongoDB

```powershell
npm run db:down
```

### Optional: view MongoDB logs

```powershell
npm run db:logs
```

## If Docker is not installed

Install Docker Desktop, then run the commands above.

Alternative: install MongoDB Community Server locally on Windows.

### Windows local install (winget)

Open PowerShell as Administrator and run:

```powershell
winget install --id MongoDB.Server --exact --accept-package-agreements --accept-source-agreements
winget install --id MongoDB.Shell --exact --accept-package-agreements --accept-source-agreements
```

Then start MongoDB service:

```powershell
net start MongoDB
```

Verify and connect:

```powershell
Test-NetConnection -ComputerName localhost -Port 27017
mongosh "mongodb://localhost:27017/incubator_db"
```

Keep MONGODB_URI as:

- mongodb://localhost:27017/incubator_db
