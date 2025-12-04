from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models import TravelHistory, User, VisaApplication
from app.schemas.applications import (
    TravelHistoryCreate,
    TravelHistoryRead,
    VisaApplicationCreate,
    VisaApplicationRead,
)

router = APIRouter()


def _ensure_user(db: Session, user_id: str) -> User:
    user = db.query(User).get(user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return user


def _build_travel_history(
    travel_history_payload: list[TravelHistoryCreate], application: VisaApplication
) -> list[TravelHistory]:
    return [
        TravelHistory(
            visa_application=application,
            country=th.country,
            entry_date=th.entry_date,
            exit_date=th.exit_date,
            outcome=th.outcome,
            notes=th.notes,
        )
        for th in travel_history_payload
    ]


@router.post("", response_model=VisaApplicationRead, status_code=status.HTTP_201_CREATED)
def create_application(payload: VisaApplicationCreate, db: Session = Depends(get_db)):
    user = _ensure_user(db, payload.user_id)

    application = VisaApplication(
        user=user,
        destination_country=payload.destination_country,
        travel_purpose=payload.travel_purpose,
        travel_start=payload.travel_start,
        travel_end=payload.travel_end,
        occupation=payload.occupation,
        income_amount=payload.income_amount,
        income_currency=payload.income_currency,
        residence_country=payload.residence_country,
        home_country=payload.home_country,
        notes=payload.notes,
    )

    application.travel_history = _build_travel_history(payload.travel_history, application)

    db.add(application)
    db.commit()
    db.refresh(application)
    return application


@router.get("", response_model=list[VisaApplicationRead])
def list_applications(db: Session = Depends(get_db)):
    return db.query(VisaApplication).all()


@router.get("/{application_id}", response_model=VisaApplicationRead)
def get_application(application_id: str, db: Session = Depends(get_db)):
    application = db.query(VisaApplication).get(application_id)
    if not application:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Application not found")
    return application
