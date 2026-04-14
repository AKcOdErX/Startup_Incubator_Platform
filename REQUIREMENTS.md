# Requirements

## System Requirements

- Windows 10/11
- Node.js 18+
- npm 9+
- MongoDB server accessible at `mongodb://localhost:27017`

## Backend Runtime Requirements

- Express
- Mongoose
- bcryptjs
- jsonwebtoken
- cors
- dotenv
- axios
- nodemon (dev)

Install backend dependencies:

```powershell
cd backend
npm install
```

## Frontend Runtime Requirements

- React
- React DOM
- React Router DOM
- Axios
- Lucide React
- React Hot Toast
- Vite
- Tailwind CSS
- PostCSS
- Autoprefixer

Install frontend dependencies:

```powershell
cd frontend
npm install
```

## Environment Requirements

`backend/.env` must include:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/incubator_db
JWT_SECRET=<your-secret>
OPENAI_API_KEY=<optional>
NODE_ENV=development
```
