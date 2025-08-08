from fastapi import FastAPI, UploadFile, File, Depends
from sqlalchemy.orm import Session
import shutil
import os

from .models import Base
from .dependencies import engine, get_db
from .crud import create_expense, get_expenses, update_expense
from .pdf_utils import extract_text_from_pdf
from .ai import extract_expenses_from_text, categorize_expense
from .schemas import Expense, ExpenseCreate

Base.metadata.create_all(bind=engine)

app = FastAPI()

UPLOAD_DIR = "uploads/"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.post("/upload/")
async def upload_pdf(file: UploadFile = File(...), db: Session = Depends(get_db)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    pdf_text = extract_text_from_pdf(file_path)

    raw_expenses = extract_expenses_from_text(pdf_text)  # LLM returns structured data

    # Parse the returned JSON array
    import json
    expenses = json.loads(raw_expenses)
    results = []
    for exp in expenses:
        category = categorize_expense(exp['item'], exp['amount'])
        expense_obj = ExpenseCreate(**exp, category=category)
        results.append(create_expense(db, Expense(**expense_obj.dict())))
    return {"imported": len(results)}

@app.get("/expenses/", response_model=list[Expense])
def read_expenses(db: Session = Depends(get_db)):
    return get_expenses(db)

@app.put("/expense/{expense_id}/")
def edit_expense(expense_id: int, expense: ExpenseCreate, db: Session = Depends(get_db)):
    return update_expense(db, expense_id, expense.dict())

@app.patch("/expense/{expense_id}/category/")
def change_category(expense_id: int, category: str, db: Session = Depends(get_db)):
    return update_expense(db, expense_id, {"category": category})
