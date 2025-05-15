# Chef Claude 🧑‍🍳

A full-stack AI-powered recipe recommender built with React + Node.js + Hugging Face.

## Features

- Enter a list of ingredients
- Get AI-generated recipes (Mixtral model via Hugging Face)
- Clean markdown display
- Secure backend using Express

## Setup Instructions

### Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
```

### Backend (Node + Express)
```bash
cd backend
cp .env.example .env
# Add your HF_ACCESS_TOKEN to .env
npm install
node index.js
```