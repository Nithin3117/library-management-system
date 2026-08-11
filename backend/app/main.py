from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app import models
from app.routes import books, students, transactions, dashboard, auth


# Create database tables
Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="Library Management System API",
    version="1.0.0"
)


# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://library-management-system-beta-nine-79.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Register API routers
app.include_router(books.router)
app.include_router(students.router)
app.include_router(transactions.router)
app.include_router(dashboard.router)
app.include_router(auth.router)


# Root endpoint
@app.get("/")
def home():
    return {
        "message": "Welcome to Library Management System API"
    }
