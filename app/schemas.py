from datetime import date
from pydantic import BaseModel


class BookCreate(BaseModel):
    title: str
    author: str
    category: str
    isbn: str
    quantity: int
    available: int


class BookResponse(BookCreate):
    id: int

    class Config:
        from_attributes = True


class StudentCreate(BaseModel):
    name: str
    email: str
    phone: str


class StudentResponse(StudentCreate):
    id: int

    class Config:
        from_attributes = True


class TransactionCreate(BaseModel):
    student_id: int
    book_id: int
    due_date: date


class TransactionResponse(BaseModel):
    id: int
    issue_date: date
    due_date: date
    return_date: date | None
    fine: int

    student_id: int
    book_id: int

    student_name: str
    book_title: str

    class Config:
        from_attributes = True