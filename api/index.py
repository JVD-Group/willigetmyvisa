"""Vercel serverless entrypoint for the FastAPI app.

This file lets Vercel deploy the existing FastAPI application as a Python
Serverless Function without changing the core app code. Vercel expects a
``handler`` callable; Mangum adapts the ASGI app for that interface.
"""

import os
import sys

from mangum import Mangum


CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
BACKEND_DIR = os.path.abspath(os.path.join(CURRENT_DIR, "..", "backend"))
if BACKEND_DIR not in sys.path:
    sys.path.insert(0, BACKEND_DIR)


from app.main import app as fastapi_app  # noqa: E402


handler = Mangum(fastapi_app)


__all__ = ["handler"]
