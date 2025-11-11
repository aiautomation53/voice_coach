bash
    git clone https://github.com/your-username/voice-coach.git
    cd voice-coach
    ```

2.  **Frontend Setup:**
    ```bash
    cd frontend
    npm install # or yarn
    npm run dev # to start the development server
    ```
    The frontend should now be running at `http://localhost:5173`.

3.  **Backend Setup:**
    ```bash
    cd backend
    npm install # or yarn
    npm run dev # to start the backend server
    ```
    The backend should now be running at `http://localhost:3000`.

4.  **Database Setup (using Docker):**
    Ensure Docker is running, then from the project root:
    ```bash
    docker-compose up -d postgres
    ```
    Run Prisma migrations:
    ```bash
    cd backend
    npx prisma migrate dev --name init
    ```

### Configuration

Environment variables are managed using `.env` files. Check `backend/.env.example` and `frontend/.env.example` for required variables.

## Usage

Once both frontend and backend servers are running:

1.  Open your browser to `http://localhost:5173`.
2.  Grant microphone access when prompted.
3.  Start practicing and receive real-time feedback!

## Project Structure

```
voice-coach/
├── frontend/             # React/TypeScript application
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   └── App.tsx
│   ├── vite.config.ts
│   └── package.json
├── backend/              # Node.js/Express server
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── models/       # Prisma schema and generated client
│   │   └── app.ts
│   ├── prisma/
│   ├── .env.example
│   └── package.json
├── python_ml_service/    # (Optional) Python Flask/FastAPI for ML tasks
│   ├── src/
│   ├── Dockerfile
│   └── requirements.txt
├── docker-compose.yml    # Docker setup for database, etc.
├── .gitignore
├── README.md             # This file
└── package.json          # Monorepo root (if applicable, or for general scripts)
