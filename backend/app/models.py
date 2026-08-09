from datetime import date

from sqlalchemy import Column, Integer, String, ForeignKey, Date
from sqlalchemy.orm import relationship

from app.database import Base


class Book(Base):
    __tablename__ = "books"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    author = Column(String, nullable=False)
    category = Column(String, nullable=False)
    isbn = Column(String, unique=True, nullable=False)
    quantity = Column(Integer, nullable=False)
    available = Column(Integer, nullable=False)


class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    phone = Column(String, unique=True, nullable=False)


class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)

    student_id = Column(
        Integer,
        ForeignKey("students.id")
    )

    book_id = Column(
        Integer,
        ForeignKey("books.id")
    )

    issue_date = Column(
        Date,
        default=date.today
    )

    due_date = Column(Date)

    return_date = Column(
        Date,
        nullable=True
    )

    fine = Column(
        Integer,
        default=0
    )

    student = relationship("Student")
    book = relationship("Book")