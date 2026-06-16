# R.G. Ambulance Service

Emergency ambulance and funeral services provider operating pan India, headquartered in Chennai.

## Project Structure

```
R.G. Ambulance/
├── frontend/   # React + Vite website
└── backend/    # Express API + admin panel (MySQL)
```

## Development

Run the API and frontend in separate terminals:

```bash
# Backend (port 5000)
cd backend
cp .env.example .env   # configure DB + JWT
npm install
npm run dev

# Frontend (port 5173, proxies /api to backend)
cd frontend
npm install
npm run dev
```

- Website: http://localhost:5173
- API health: http://localhost:5000/api/health
- Admin panel: http://localhost:5000/admin

See `frontend/README.md` for frontend details and `backend/.env.example` for API configuration.
