from fastapi import FastAPI

from app.api import api_router
from app.core.config import get_settings
from app.db.session import engine
from app.models import Base

settings = get_settings()

# Create tables for quickstarts; production should use migrations
Base.metadata.create_all(bind=engine)

app = FastAPI(title=settings.app_name)
app.include_router(api_router, prefix=settings.api_prefix)


@app.get("/", tags=["root"], summary="Root")
def root():
    return {"message": "Travelstressfree API", "docs_url": f"{settings.api_prefix}/docs"}
