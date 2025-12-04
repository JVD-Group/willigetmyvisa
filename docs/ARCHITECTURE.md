# Architecture & Next Steps (AI-First, Cloud-Native)

This document captures the direction for evolving the Visa Probability Checker into an AI-first, cloud-native platform with minimal technical debt as ownership transitions.

## Guiding Principles
- **AI-first**: Design domain objects and data contracts to support continuous learning (feature logs, labels, model registry) from day one.
- **Cloud-native**: Prefer managed services (PostgreSQL, object storage, managed queues) and stateless application pods; keep local dev parity via containers.
- **Secure-by-default**: Isolate per-tenant data, encrypt secrets, enforce least privilege IAM, and apply input/output validation.
- **Observable**: Centralized structured logging, traces, and metrics; health probes for autoscaling.
- **Extensible pipelines**: Clear adapters for storage, OCR engines, and scoring backends to swap providers without refactors.
- **Migrations & contracts**: Schema changes via migrations; versioned APIs and models to avoid breaking consumers.

## Target Reference Architecture
- **Frontend**: React + TypeScript SPA served from CDN; calls versioned REST APIs; feature-flag hooks for staged rollouts.
- **API layer**: FastAPI service running in containers; JWT-based auth; rate limiting; OpenAPI contract published.
- **Data**: PostgreSQL (core entities + feature snapshots) with Alembic migrations; Redis/Upstash for caching + jobs; S3/MinIO for object storage with presigned upload/download.
- **AI/ML**: Modular scoring service with rules + ML models (scikit-learn/XGBoost) stored in a model registry bucket; feature store table for inference/training parity.
- **Batch/Async**: Background workers (RQ/Celery) for OCR, feature extraction, model training; scheduled retraining jobs.
- **Observability**: Prometheus metrics, OpenTelemetry traces/logs; structured audit log for user actions and data access.

## Immediate Work Plan (prioritized)
1. **Operational foundations**
   - Add Alembic migrations and Docker Compose (API + Postgres + MinIO + Redis) with `.env` templates.
   - Wire JWT auth with password hashing; protect application routes; add rate limiting middleware.
   - Introduce structured logging + request IDs; health/readiness probes.
2. **Storage + uploads**
   - Implement S3/MinIO adapter with presigned URLs; enforce content-type/size limits; store checksums + virus scan hook.
   - Persist upload completion events and connect uploads to applications/users.
3. **OCR pipeline**
   - Add OCR service abstraction; implement local Tesseract + stub cloud provider adapter; store raw text + parsed fields with confidences.
   - Run OCR as background job; surface job status via API; retry/backoff on failures.
4. **Scoring service (AI-first)**
   - Add feature extraction layer and rules-based scorer returning score + explanations; log feature snapshots per inference.
   - Stand up training endpoint for admins to fit a baseline model; store artifacts and model metadata; add model selection/versioning.
5. **Productization**
   - Add frontend forms for applications/uploads; progress indicators for OCR and scoring; user-facing recommendations.
   - Add admin analytics view (model metrics, data quality, job health).

## Technical Debt Guardrails
- Enforce typing (mypy) and linting (ruff/flake8, black, isort) via pre-commit.
- Require API schema changes to include migration + docs updates.
- Keep adapters (storage, OCR, scoring) behind interfaces with unit tests and contract tests.
- Track domain events (application submitted, file uploaded, ocr_completed, score_generated) for observability and ML lineage.
- Document operational runbooks and onboarding steps alongside code changes.
