from datetime import date, datetime
from typing import Optional

from sqlalchemy import JSON, Boolean, Date, Enum, Float, ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base
from app.models.mixins import TimestampMixin, UUIDMixin


class User(UUIDMixin, TimestampMixin, Base):
    __tablename__ = "users"

    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    full_name: Mapped[Optional[str]]
    hashed_password: Mapped[Optional[str]]

    applications: Mapped[list["VisaApplication"]] = relationship(back_populates="user")


class VisaApplication(UUIDMixin, TimestampMixin, Base):
    __tablename__ = "visa_applications"

    user_id: Mapped[str] = mapped_column(String(36), ForeignKey("users.id"), nullable=False)
    destination_country: Mapped[str] = mapped_column(String(64), index=True)
    travel_purpose: Mapped[Optional[str]]
    travel_start: Mapped[Optional[date]]
    travel_end: Mapped[Optional[date]]
    occupation: Mapped[Optional[str]]
    income_amount: Mapped[Optional[float]] = mapped_column(Float)
    income_currency: Mapped[Optional[str]] = mapped_column(String(8))
    residence_country: Mapped[Optional[str]] = mapped_column(String(64))
    home_country: Mapped[Optional[str]] = mapped_column(String(64))
    notes: Mapped[Optional[str]] = mapped_column(Text)

    user: Mapped[User] = relationship(back_populates="applications")
    travel_history: Mapped[list["TravelHistory"]] = relationship(
        back_populates="visa_application", cascade="all, delete-orphan"
    )
    file_uploads: Mapped[list["FileUpload"]] = relationship(
        back_populates="visa_application", cascade="all, delete-orphan"
    )
    outcome: Mapped[Optional["VisaOutcome"]] = relationship(back_populates="visa_application")
    feature_snapshots: Mapped[list["FeatureSnapshot"]] = relationship(
        back_populates="visa_application", cascade="all, delete-orphan"
    )


class TravelHistory(UUIDMixin, TimestampMixin, Base):
    __tablename__ = "travel_history"

    visa_application_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("visa_applications.id"), nullable=False
    )
    country: Mapped[str] = mapped_column(String(64))
    entry_date: Mapped[Optional[date]]
    exit_date: Mapped[Optional[date]]
    outcome: Mapped[Optional[str]] = mapped_column(String(32))
    notes: Mapped[Optional[str]] = mapped_column(Text)

    visa_application: Mapped[VisaApplication] = relationship(back_populates="travel_history")


class FileUpload(UUIDMixin, TimestampMixin, Base):
    __tablename__ = "file_uploads"

    visa_application_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("visa_applications.id"), nullable=False
    )
    file_type: Mapped[str] = mapped_column(String(64), index=True)
    original_filename: Mapped[str] = mapped_column(String(255))
    content_type: Mapped[Optional[str]]
    storage_url: Mapped[str] = mapped_column(String(512))
    size_bytes: Mapped[Optional[int]] = mapped_column(Integer)
    checksum: Mapped[Optional[str]] = mapped_column(String(128))
    status: Mapped[str] = mapped_column(String(32), default="uploaded")

    visa_application: Mapped[VisaApplication] = relationship(back_populates="file_uploads")
    ocr_result: Mapped[Optional["OcrResult"]] = relationship(back_populates="file_upload")


class OcrResult(UUIDMixin, TimestampMixin, Base):
    __tablename__ = "ocr_results"

    file_upload_id: Mapped[str] = mapped_column(String(36), ForeignKey("file_uploads.id"), nullable=False)
    raw_text: Mapped[Optional[str]] = mapped_column(Text)
    fields_json: Mapped[Optional[dict]] = mapped_column(JSON)
    ocr_engine: Mapped[Optional[str]] = mapped_column(String(64))
    mean_confidence: Mapped[Optional[float]] = mapped_column(Float)

    file_upload: Mapped[FileUpload] = relationship(back_populates="ocr_result")


class VisaOutcome(UUIDMixin, TimestampMixin, Base):
    __tablename__ = "visa_outcomes"

    visa_application_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("visa_applications.id"), nullable=False, unique=True
    )
    decision: Mapped[str] = mapped_column(String(32))
    decision_date: Mapped[Optional[date]]
    remarks: Mapped[Optional[str]] = mapped_column(Text)
    evidence_file_id: Mapped[Optional[str]] = mapped_column(String(36), ForeignKey("file_uploads.id"))

    visa_application: Mapped[VisaApplication] = relationship(back_populates="outcome")
    evidence_file: Mapped[Optional[FileUpload]] = relationship()


class FeatureSnapshot(UUIDMixin, TimestampMixin, Base):
    __tablename__ = "feature_snapshots"

    visa_application_id: Mapped[str] = mapped_column(String(36), ForeignKey("visa_applications.id"))
    feature_vector: Mapped[Optional[dict]] = mapped_column(JSON)
    label: Mapped[Optional[bool]] = mapped_column(Boolean)
    score: Mapped[Optional[float]] = mapped_column(Float)
    model_version: Mapped[Optional[str]] = mapped_column(String(64))
    computed_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.utcnow)

    visa_application: Mapped[VisaApplication] = relationship(back_populates="feature_snapshots")


class ModelRegistry(UUIDMixin, TimestampMixin, Base):
    __tablename__ = "model_registry"

    model_version: Mapped[str] = mapped_column(String(64), unique=True, index=True)
    training_params: Mapped[Optional[dict]] = mapped_column(JSON)
    metrics_json: Mapped[Optional[dict]] = mapped_column(JSON)
    artifact_path: Mapped[Optional[str]] = mapped_column(String(255))
