from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    APP_NAME: str = "Prime Action OS"
    APP_VERSION: str = "1.0.0"
    MYSQL_HOST: str
    MYSQL_PORT: int
    MYSQL_DATABASE: str
    MYSQL_USER: str
    MYSQL_PASSWORD: str = ""
    DEBUG: bool = True
    OPENROUTER_API_KEY: str | None = None

    class Config:
        env_file = ".env"

@lru_cache
def get_settings():
    return Settings()

settings = get_settings()