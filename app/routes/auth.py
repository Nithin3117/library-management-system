from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.auth import login


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


class LoginRequest(BaseModel):
    email: str
    password: str


@router.post("/login")
def login_user(user: LoginRequest):
    result = login(user.email, user.password)

    if result is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    return result