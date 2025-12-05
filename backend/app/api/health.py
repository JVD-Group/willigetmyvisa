from fastapi import APIRouter

router = APIRouter()


@router.get("", summary="Health check")
def healthcheck():
    return {"status": "ok"}
