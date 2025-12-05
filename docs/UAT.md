# Manual UAT Guide

These steps let you run and test the PoC locally with the same stack your CTO will inherit.

## If you're not a developer (fastest path)

You only need a browser. Everything runs in GitHub Codespaces (online VS Code):

1. Open the repository on GitHub and click **Code** → **Create codespace on main**.
2. Wait for the browser editor to load, then open a terminal inside Codespaces:
   - In the top bar, click **Terminal** → **New Terminal** (or press ``Ctrl+` `` on Windows/Linux, ``Cmd+` `` on macOS).
   - A panel opens at the bottom with a prompt that ends in `@codespaces`—type commands there (not in the browser address bar).
3. Copy/paste each command below into that terminal (press Enter after each):

   ```bash
   pip install -r backend/requirements.txt
   uvicorn app.main:app --reload --app-dir backend --port 8000
   ```

4. In the right-hand **Ports** panel, find port **8000**, set **Visibility** to **Public**, then click the globe/link icon to **Open in Browser**.
5. The API docs will open at a URL like `https://<your-codespace-url>/api/v1/docs`. Use the **Try it out** buttons to call endpoints (no extra setup needed).

If you close the tab, you can reopen the Codespace from GitHub via **Code** → **Codespaces** and click your existing Codespace.

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

**Where do I type these commands?**

- **Codespaces (no install):** Open the bottom **Terminal** panel in the Codespace (or create one via **Terminal** → **New Terminal**). Paste the commands above there.
- **Your own machine:** Open your system terminal (Command Prompt/PowerShell on Windows, Terminal on macOS/Linux), `cd` into the project folder, then run the commands.

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
