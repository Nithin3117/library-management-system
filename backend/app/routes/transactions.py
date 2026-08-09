from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import crud, schemas
from app.database import get_db


router = APIRouter(
    prefix="/transactions",
    tags=["Transactions"]
)


@router.post("/issue")
def issue_book(
    transaction: schemas.TransactionCreate,
    db: Session = Depends(get_db)
):
    result = crud.issue_book(
        db,
        transaction
    )

    if isinstance(result, dict):
        raise HTTPException(
            status_code=400,
            detail=result["error"]
        )

    return result


@router.get("/overdue")
def get_overdue_transactions(
    db: Session = Depends(get_db)
):
    return crud.get_overdue_transactions(db)


@router.put("/return/{transaction_id}")
def return_book(
    transaction_id: int,
    db: Session = Depends(get_db)
):
    result = crud.return_book(
        db,
        transaction_id
    )

    if isinstance(result, dict):
        raise HTTPException(
            status_code=400,
            detail=result["error"]
        )

    return result


@router.get("/")
def get_transactions(
    db: Session = Depends(get_db)
):
    return crud.get_transactions(db)