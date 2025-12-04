# Manual UAT Guide

These steps let you run and test the PoC locally with the same stack your CTO will inherit.

## Prerequisites
- Python 3.11+
- Optional: virtual environment (recommended)

## Install backend requirements
```bash
pip install -r backend/requirements.txt
```

## Run the API locally
```bash
uvicorn app.main:app --reload --app-dir backend --port 8000
```

## UAT entrypoint
- Open the interactive API docs: [http://127.0.0.1:8000/api/v1/docs](http://127.0.0.1:8000/api/v1/docs)
- Health check: `GET /api/v1/health`
- Create a user: `POST /api/v1/users`
- Create and list applications: `POST /api/v1/applications`, `GET /api/v1/applications`

### If the docs link does not load

The Swagger link only works when the API server is running. The easiest way to run it without installing anything locally is via GitHub Codespaces:

1. On GitHub, click **Code** → **Create codespace on main**.
2. When the browser editor opens, use the built-in terminal to run:

   ```bash
   pip install -r backend/requirements.txt
   uvicorn app.main:app --reload --app-dir backend --port 8000
   ```

3. In the Ports panel, make port **8000** public and click **Open in Browser**. The docs will open at `https://<your-codespace-URL>/api/v1/docs`.

If you prefer local testing, you must run the `uvicorn` command above first, then visit `http://127.0.0.1:8000/api/v1/docs`.

## Notes
- The app boots with SQLite by default for easy local testing. Swap `DATABASE_URL` in `.env` for Postgres when ready.
- Schema is auto-created on startup for the PoC; migrations should be added before production.
- The backend depends only on the requirements above—no extra services are required for this UAT path.
