from pydantic import BaseModel
from datetime import date
from typing import Optional

class ExpenseCreate(BaseModel):
    date: date
    item: str
    amount: float
    category: Optional[str] = "Uncategorized"

class Expense(ExpenseCreate):
    id: int

    class Config:
        orm_mode = True
