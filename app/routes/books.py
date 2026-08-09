from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import crud, schemas
from app.database import get_db


router = APIRouter(
    prefix="/books",
    tags=["Books"]
)


@router.post("/")
def add_book(
    book: schemas.BookCreate,
    db: Session = Depends(get_db)
):
    return crud.create_book(db, book)


@router.get("/")
def get_all_books(
    db: Session = Depends(get_db)
):
    return crud.get_books(db)


@router.get("/{book_id}")
def get_book(
    book_id: int,
    db: Session = Depends(get_db)
):
    book = crud.get_book(db, book_id)

    if not book:
        raise HTTPException(
            status_code=404,
            detail="Book not found"
        )

    return book


@router.put("/{book_id}")
def update_book(
    book_id: int,
    updated_book: schemas.BookCreate,
    db: Session = Depends(get_db)
):
    book = crud.update_book(
        db,
        book_id,
        updated_book
    )

    if not book:
        raise HTTPException(
            status_code=404,
            detail="Book not found"
        )

    return book


@router.delete("/{book_id}")
def delete_book(
    book_id: int,
    db: Session = Depends(get_db)
):
    book = crud.delete_book(db, book_id)

    if not book:
        raise HTTPException(
            status_code=404,
            detail="Book not found"
        )

    return {
        "message": "Book deleted successfully"
    }