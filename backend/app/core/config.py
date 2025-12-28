from pydantic import BaseSettings, Field


class Settings(BaseSettings):
    app_name: str = Field("Travelstressfree API", description="Application name")
    api_prefix: str = Field("/api/v1", description="API prefix")
    database_url: str = Field(
        "sqlite:///./visa_probability.db",
        description="Database connection string",
        env="DATABASE_URL",
    )

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


def get_settings() -> Settings:
    return Settings()
