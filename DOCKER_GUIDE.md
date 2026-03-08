# 🐳 Docker Guide for Expense Tracker

This guide explains how to containerize the Expense Tracker application using Docker. The project is already configured with a `docker-compose.yml` file that orchestrates the backend (Rails), frontend (Vite), and database (MySQL).

## 🚀 Prerequisites

1.  **Install Docker Desktop**: 
    -   Download and install [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop/).
    -   **Important**: Ensure Docker Desktop is running. You should see a whale icon in your system tray.

## 🛠️ Getting Started

### 1. Start Docker Desktop
Before running any commands, make sure Docker Desktop is open and the engine is started.

### 2. Launch the Application
Navigate to the root directory `likhait-technical-test` in your terminal and run:

```powershell
docker compose up --build
```

-   `up`: Starts the containers.
-   `--build`: Rebuilds the images (recommended for the first time or when dependencies change).

### 3. Access the Services
Once all containers are running successfully:
-   **Frontend**: [http://localhost:5173](http://localhost:5173)
-   **Backend**: [http://localhost:3000](http://localhost:3000)
-   **Database**: Port `3306` (use `root` / `rootpassword`)

## 🧱 What's Inside?

The system uses three main containers:

| Service | Container Name | Description |
| :--- | :--- | :--- |
| **Database** | `expense_system_db` | MySQL 8.0 instance with persistent storage. |
| **Backend** | `expense_system_backend` | Ruby on Rails API. Handles database migrations and seeds automatically on startup. |
| **Frontend** | `expense_system_frontend` | Vite + React application. |

## 🛠️ Common Commands

| Task | Command |
| :--- | :--- |
| **Stop everything** | `docker compose down` |
| **Start in background** | `docker compose up -d` |
| **View logs** | `docker compose logs -f` |
| **Reset Database** | `docker compose down -v` (Removes volumes) |
| **Run Rails console** | `docker compose exec backend rails c` |
| **Run Migrations** | `docker compose exec backend rails db:migrate` |

## 💡 Troubleshooting

-   **Port Conflicts**: If port `3000` or `5173` is already in use by a local process (like your current `npm run dev`), stop those processes first.
-   **Database Connection**: The backend is configured to wait for the database to be "healthy" before starting. If it hangs, check the `db` logs.
-   **Windows WSL2**: For best performance, it is highly recommended to use the **WSL 2 backend** in Docker Desktop settings.
