import React from "react";

function ExpensesTable({ expenses, onEdit, onCategoryChange }) {
  const categories = ["Groceries", "Food", "Cat", "Fixed Expense", "Other"];
  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Item</th>
          <th>Amount</th>
          <th>Category</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map(expense => (
          <tr key={expense.id}>
            <td>{expense.date}</td>
            <td>{expense.item}</td>
            <td>{expense.amount}</td>
            <td>
              <select value={expense.category} onChange={e => onCategoryChange(expense.id, e.target.value)}>
                {categories.map(cat => <option value={cat} key={cat}>{cat}</option>)}
              </select>
            </td>
            <td>
              <button onClick={() => onEdit(expense)}>Edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ExpensesTable;
