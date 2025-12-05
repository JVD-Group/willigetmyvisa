# How to review and merge a pull request (no coding required)

If you opened a pull request (PR) and see code on the right-hand side, you do **not** need to copy-paste anything. GitHub already tracks the changes in that branch. Use the steps below to review, try it in the browser, and merge when ready.

## 1) Open the PR and see what changed
1. On GitHub, open your pull request.
2. Click the **Files changed** tab to see what was added/edited.
3. Expand any file to read the changes. You can add comments inline if something looks off.

## 2) Try the changes without installing anything
Use GitHub Codespaces so everything runs in your browser:

**Where do I type the commands?**

- When the Codespace opens, look for the bottom panel labeled **Terminal** (it behaves like a command prompt). If you don't see it, click the **Terminal** menu → **New Terminal**.
- Paste the commands below into that terminal. Do **not** type them into the PR comment box or your browser’s address bar.

1. On the PR page, click the green **Code** button, then **Create codespace on <branch>**. This opens a web-based VS Code on the PR branch (no local setup).
2. In the bottom terminal, run:
   ```bash
   pip install -r backend/requirements.txt
   uvicorn app.main:app --reload --app-dir backend --port 8000
   ```
3. In the **Ports** panel (usually bottom), find port **8000**, set it to **Public**, then click **Open in Browser**.
4. The interactive API docs will open at `https://<codespace-url>/api/v1/docs`. Use the health check or user/application endpoints to smoke test.

## 3) Merge the PR
1. Go back to the PR page on GitHub.
2. If checks are green, click **Merge pull request** → **Confirm merge**. (If checks are missing, you can still merge for this PoC.)
3. Delete the branch if GitHub suggests it—this keeps things tidy.

## 4) (Optional) Download the code locally
If you prefer a local copy later, you can click **Code** → **Download ZIP**—no git commands needed.

That’s it—no manual copy/paste required. The merge button will move the changes from the PR into `main`.
