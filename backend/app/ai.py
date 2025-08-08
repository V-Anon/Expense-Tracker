import os
import google.generativeai as genai
from .config import settings

genai.configure(api_key=settings.GOOGLE_API_KEY)

# Define helper for text extraction (expense listing)
def extract_expenses_from_text(text):
    prompt = (
        "You are a financial assistant. Given the following PDF text from a bank statement or UPI transaction history, "
        "extract every expense as a JSON array. Each item must include: date ('YYYY-MM-DD' if possible), item (description), and amount (float)."
        "\nPDF Text:\n"
        f"{text}\n"
        "Strictly return ONLY the JSON array. Example: "
        '[{"date":"2025-07-30","item":"Swiggy Food","amount":400.00}]\n'
    )

    model = genai.GenerativeModel('gemini-pro')
    response = model.generate_content(prompt)
    # Gemini sometimes adds explanation, so extract only the JSON (first code block or bracket)
    import re, json
    m = re.search(r'(\[[\s\S]+?\])', response.text)
    if m:
        return json.loads(m.group(1))
    else:
        raise ValueError("No JSON found in Gemini response.")

# Define helper for categorizing an expense
def categorize_expense(item, amount):
    prompt = (
        f"Categorize this expense. Item: '{item}'. Amount: {amount}. "
        "Possible categories: Groceries, Food, Cat, Fixed Expense, Other. "
        "Return ONLY the category."
    )
    model = genai.GenerativeModel('gemini-pro')
    response = model.generate_content(prompt)
    # Clean response to get category string only
    return response.text.strip().split("\n")[0]
