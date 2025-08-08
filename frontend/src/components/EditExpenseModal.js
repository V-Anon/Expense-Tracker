import React, { useState } from "react";
import Modal from "react-modal";

function EditExpenseModal({ expense, onSave, onClose }) {
  const [form, setForm] = useState({ ...expense });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <Modal isOpen={true} onRequestClose={onClose}>
      <h2>Edit Expense</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Date:
          <input name="date" type="date" value={form.date} onChange={handleChange} />
        </label>
        <br />
        <label>
          Item:
          <input name="item" value={form.item} onChange={handleChange} />
        </label>
        <br />
        <label>
          Amount:
          <input name="amount" type="number" value={form.amount} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </Modal>
  );
}

export default EditExpenseModal;
