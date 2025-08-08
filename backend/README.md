# Finance App Backend
This is the FastAPI backend of the  Finance App—a tool to upload bank or UPI PDF statements, visualize, edit, and categorize expenses using AI.

## Features
- Upload bank statements and UPI transaction PDFs.
- Automatically extract fields (Date, Item, Amount) using an LLM.
- View and edit transactions in a table.
- Categorize expenses with AI, and manually edit those categories.

## 1. Setup
- Clone repo
- Create `.env` file with OpenAI key and database URL
- Install requirements

pip install -r requirements.txt


## 2. Run
uvicorn app.main:app --reload


## 3. Usage
- POST `/upload/` to upload a PDF - expenses are extracted, categorized, and saved.
- GET `/expenses/` to get all expenses in tabular form.
- PUT `/expense/{id}/` to update an expense.
- PATCH `/expense/{id}/category/` to change category.

## 4. Customization
- Change supported categories in `ai.py` as needed.
- Add table view/editing in frontend (suggest React/Next.js).
