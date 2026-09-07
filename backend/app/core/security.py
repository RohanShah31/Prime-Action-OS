from datetime import datetime, timedelta
from typing import Any
from jose import jwt
import bcrypt  # We are using pure bcrypt directly now!

# Configuration for the tokens
SECRET_KEY = "super-secret-key-for-prime-action-os-do-not-share"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Check if the provided password matches the hashed one in the database."""
    try:
        return bcrypt.checkpw(
            plain_password.encode("utf-8"), 
            hashed_password.encode("utf-8")
        )
    except Exception:
        return False

def get_password_hash(password: str) -> str:
    """Scramble the password using a secure salt before saving it."""
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode("utf-8"), salt)
    return hashed.decode("utf-8")

def create_access_token(subject: str | Any, expires_delta: timedelta = None) -> str:
    """Generate a secure JWT for the user to stay logged in."""
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode = {"exp": expire, "sub": str(subject)}
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt