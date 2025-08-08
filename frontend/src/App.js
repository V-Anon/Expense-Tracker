import React, { useEffect, useState } from "react";
import { uploadFile, getExpenses, updateExpense, changeCategory } from "./api";
import UploadForm from "./components/UploadForm";
import ExpensesTable from "./components/ExpensesTable";
import EditExpenseModal from "./components/EditExpenseModal";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [editExpense, setEditExpense] = useState(null);

  useEffect(() => {
    getExpenses().then(res => setExpenses(res.data));
  }, []);

  const handleUpload = async (file) => {
    await uploadFile(file);
    const res = await getExpenses();
    setExpenses(res.data);
  };

  const handleEdit = (expense) => setEditExpense(expense);

  const handleSave = async (id, data) => {
    await updateExpense(id, data);
    setEditExpense(null);
    const res = await getExpenses();
    setExpenses(res.data);
  };

  const handleCategoryChange = async (id, category) => {
    await changeCategory(id, category);
    const res = await getExpenses();
    setExpenses(res.data);
  };

  return (
    <div>
      <h1>Finance App</h1>
      <UploadForm onUpload={handleUpload} />
      <ExpensesTable
        expenses={expenses}
        onEdit={handleEdit}
        onCategoryChange={handleCategoryChange}
      />
      {editExpense &&
        <EditExpenseModal
          expense={editExpense}
          onSave={(data) => handleSave(editExpense.id, data)}
          onClose={() => setEditExpense(null)}
        />}
    </div>
  );
}

export default App;
