# Visa Probability Checker (PoC)

This repository hosts the proof-of-concept for a Visa Probability Checker. It includes:

- A static prototype (`index.html`) to explore the data capture experience.
- A Python FastAPI backend scaffold in `backend/` with SQLAlchemy models for users, visa applications, travel history, uploads, OCR results, and model registry tables.

## Quickstart (Backend)

1. Create and activate a virtual environment (Python 3.11+ recommended).
2. Install dependencies:

   ```bash
   pip install -r backend/requirements.txt
   ```

3. Run the API (uses SQLite by default for easy local bootstrapping):

   ```bash
   uvicorn app.main:app --reload --app-dir backend
   ```

   The interactive docs will be available at `http://127.0.0.1:8000/api/v1/docs`.

For a step-by-step UAT flow (including a browser-only path for non-developers), see [docs/UAT.md](docs/UAT.md).

For a no-setup deployment on Vercel (auto-builds the FastAPI backend as a Serverless Function), follow [docs/VERCEL.md](docs/VERCEL.md)—it now includes a click-by-click checklist for non-developers.

For a no-code walkthrough on how to open, test, and merge pull requests in GitHub (without copy/pasting code), see [docs/PR_WORKFLOW.md](docs/PR_WORKFLOW.md).

### No-local-setup option (recommended if you're not a developer)

If you just want to click a link and try the API without installing anything on your machine, use GitHub Codespaces (browser-based VS Code):

1. Open the repository on GitHub and click **Code** → **Create codespace on main**.
2. Wait for the web editor to open, then open a terminal inside Codespaces (bottom panel).
3. Run `pip install -r backend/requirements.txt` once, then start the API with:

   ```bash
   uvicorn app.main:app --reload --app-dir backend --port 8000
   ```

4. In the Codespaces port panel, expose port **8000** and click **Open in Browser**. The interactive docs will load at `https://<your-codespace-URL>/api/v1/docs`.

This avoids any local setup; everything runs in the cloud and you only need a browser.

## Available Endpoints (v1)

- `GET /api/v1/health` – Health check.
- `POST /api/v1/users` – Register a user (email + optional name; password hashing not yet wired).
- `GET /api/v1/users/{user_id}` – Fetch a user.
- `POST /api/v1/applications` – Create a visa application with optional travel history entries.
- `GET /api/v1/applications` – List all applications.
- `GET /api/v1/applications/{application_id}` – Fetch a single application.

## Notes

- The backend seeds the database schema automatically on startup for development. Use migrations (e.g., Alembic) for production.
- Environment variables can be set via a `.env` file; see `app/core/config.py` for available settings.

## Next Steps & Architecture

- See `docs/ARCHITECTURE.md` for the AI-first, cloud-native reference architecture, guardrails, and prioritized backlog.
- Near-term priorities: add Alembic migrations + Docker Compose for Postgres/Redis/MinIO, wire JWT auth with hashed passwords, introduce presigned uploads + OCR job pipeline, and log feature snapshots for scoring/training parity.

