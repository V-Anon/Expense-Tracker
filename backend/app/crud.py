from sqlalchemy.orm import Session
from .models import Expense

def create_expense(db: Session, expense: Expense):
    db.add(expense)
    db.commit()
    db.refresh(expense)
    return expense

def get_expenses(db: Session):
    return db.query(Expense).all()

def update_expense(db: Session, expense_id: int, updates: dict):
    expense = db.query(Expense).filter(Expense.id == expense_id).first()
    for k, v in updates.items():
        setattr(expense, k, v)
    db.commit()
    db.refresh(expense)
    return expense