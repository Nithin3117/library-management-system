from datetime import date

from sqlalchemy import func
from sqlalchemy.orm import Session

from app import models, schemas


def create_book(
    db: Session,
    book: schemas.BookCreate
):
    db_book = models.Book(
        title=book.title,
        author=book.author,
        category=book.category,
        isbn=book.isbn,
        quantity=book.quantity,
        available=book.available
    )

    db.add(db_book)
    db.commit()
    db.refresh(db_book)

    return db_book


def get_books(db: Session):
    return db.query(models.Book).all()


def get_book(
    db: Session,
    book_id: int
):
    return (
        db.query(models.Book)
        .filter(models.Book.id == book_id)
        .first()
    )


def update_book(
    db: Session,
    book_id: int,
    updated_book: schemas.BookCreate
):
    book = (
        db.query(models.Book)
        .filter(models.Book.id == book_id)
        .first()
    )

    if not book:
        return None

    book.title = updated_book.title
    book.author = updated_book.author
    book.category = updated_book.category
    book.isbn = updated_book.isbn
    book.quantity = updated_book.quantity
    book.available = updated_book.available

    db.commit()
    db.refresh(book)

    return book


def delete_book(
    db: Session,
    book_id: int
):
    book = (
        db.query(models.Book)
        .filter(models.Book.id == book_id)
        .first()
    )

    if not book:
        return None

    db.delete(book)
    db.commit()

    return book


def create_student(
    db: Session,
    student: schemas.StudentCreate
):
    db_student = models.Student(
        name=student.name,
        email=student.email,
        phone=student.phone
    )

    db.add(db_student)
    db.commit()
    db.refresh(db_student)

    return db_student


def get_students(db: Session):
    return db.query(models.Student).all()


def get_student(
    db: Session,
    student_id: int
):
    return (
        db.query(models.Student)
        .filter(models.Student.id == student_id)
        .first()
    )


def update_student(
    db: Session,
    student_id: int,
    updated_student: schemas.StudentCreate
):
    student = (
        db.query(models.Student)
        .filter(models.Student.id == student_id)
        .first()
    )

    if not student:
        return None

    student.name = updated_student.name
    student.email = updated_student.email
    student.phone = updated_student.phone

    db.commit()
    db.refresh(student)

    return student


def delete_student(
    db: Session,
    student_id: int
):
    student = (
        db.query(models.Student)
        .filter(models.Student.id == student_id)
        .first()
    )

    if not student:
        return None

    db.delete(student)
    db.commit()

    return student


def issue_book(
    db: Session,
    transaction: schemas.TransactionCreate
):
    student = (
        db.query(models.Student)
        .filter(
            models.Student.id == transaction.student_id
        )
        .first()
    )

    if not student:
        return {
            "error": "Student not found"
        }

    book = (
        db.query(models.Book)
        .filter(
            models.Book.id == transaction.book_id
        )
        .first()
    )

    if not book:
        return {
            "error": "Book not found"
        }

    if book.available <= 0:
        return {
            "error": "Book not available"
        }

    book.available -= 1

    new_transaction = models.Transaction(
        student_id=transaction.student_id,
        book_id=transaction.book_id,
        issue_date=date.today(),
        due_date=transaction.due_date,
        fine=0
    )

    db.add(new_transaction)
    db.commit()
    db.refresh(new_transaction)

    return new_transaction


def return_book(
    db: Session,
    transaction_id: int
):
    transaction = (
        db.query(models.Transaction)
        .filter(
            models.Transaction.id == transaction_id
        )
        .first()
    )

    if not transaction:
        return {
            "error": "Transaction not found"
        }

    if transaction.return_date:
        return {
            "error": "Book already returned"
        }

    book = (
        db.query(models.Book)
        .filter(
            models.Book.id == transaction.book_id
        )
        .first()
    )

    book.available += 1

    transaction.return_date = date.today()

    if transaction.return_date > transaction.due_date:
        days = (
            transaction.return_date - transaction.due_date
        ).days

        transaction.fine = days * 10
    else:
        transaction.fine = 0

    db.commit()
    db.refresh(transaction)

    return transaction


def get_dashboard(db: Session):
    total_books = db.query(models.Book).count()

    available_books = (
        db.query(func.sum(models.Book.available))
        .scalar()
        or 0
    )

    issued_books = (
        db.query(models.Transaction)
        .filter(
            models.Transaction.return_date.is_(None)
        )
        .count()
    )

    students = db.query(models.Student).count()

    return {
        "total_books": total_books,
        "available_books": available_books,
        "issued_books": issued_books,
        "students": students
    }


def get_transactions(db: Session):
    transactions = (
        db.query(models.Transaction)
        .all()
    )

    result = []

    for transaction in transactions:
        result.append({
            "id": transaction.id,
            "issue_date": transaction.issue_date,
            "due_date": transaction.due_date,
            "return_date": transaction.return_date,
            "fine": transaction.fine,
            "student_id": transaction.student_id,
            "book_id": transaction.book_id,
            "student_name": transaction.student.name,
            "book_title": transaction.book.title
        })

    return result


def get_overdue_transactions(db: Session):
    today = date.today()

    transactions = (
        db.query(models.Transaction)
        .filter(
            models.Transaction.return_date.is_(None),
            models.Transaction.due_date < today
        )
        .all()
    )

    result = []

    for transaction in transactions:
        days_overdue = (
            today - transaction.due_date
        ).days

        estimated_fine = days_overdue * 10

        result.append({
            "id": transaction.id,
            "student_id": transaction.student_id,
            "student_name": transaction.student.name,
            "book_id": transaction.book_id,
            "book_title": transaction.book.title,
            "issue_date": transaction.issue_date,
            "due_date": transaction.due_date,
            "days_overdue": days_overdue,
            "estimated_fine": estimated_fine
        })

    return result