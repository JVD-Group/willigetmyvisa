from datetime import date
from typing import List, Optional

from pydantic import BaseModel, Field

from app.schemas.users import UserRead


class TravelHistoryBase(BaseModel):
    country: str
    entry_date: Optional[date] = None
    exit_date: Optional[date] = None
    outcome: Optional[str] = Field(None, description="Outcome of the trip or visa")
    notes: Optional[str] = None


class TravelHistoryCreate(TravelHistoryBase):
    pass


class TravelHistoryRead(TravelHistoryBase):
    id: str

    class Config:
        orm_mode = True


class VisaApplicationBase(BaseModel):
    destination_country: str
    travel_purpose: Optional[str] = None
    travel_start: Optional[date] = None
    travel_end: Optional[date] = None
    occupation: Optional[str] = None
    income_amount: Optional[float] = None
    income_currency: Optional[str] = None
    residence_country: Optional[str] = None
    home_country: Optional[str] = None
    notes: Optional[str] = None


class VisaApplicationCreate(VisaApplicationBase):
    user_id: str
    travel_history: List[TravelHistoryCreate] = []


class VisaApplicationRead(VisaApplicationBase):
    id: str
    user: UserRead
    travel_history: List[TravelHistoryRead] = []

    class Config:
        orm_mode = True
