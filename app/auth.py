import os

from dotenv import load_dotenv

from app.security import create_access_token


# Load environment variables
load_dotenv()


# Admin credentials
ADMIN_EMAIL = os.getenv("ADMIN_EMAIL")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD")


def login(email: str, password: str):

    if email != ADMIN_EMAIL:
        return None

    if password != ADMIN_PASSWORD:
        return None

    token = create_access_token(
        {
            "sub": email
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }