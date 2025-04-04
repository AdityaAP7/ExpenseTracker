import React, { useState, useEffect } from 'react';
import { useExpenses } from '../path-to-useExpenses';
function AddExpenseForm({ editingExpense, onCancelEdit }) {
  const { addExpense, editExpense } = useExpenses();
  const isEditing = Boolean(editingExpense);
  const [formData, setFormData] = useState({
    id: '',
    const [formData, setFormData] = useState({
    category: '',
    amount: '',
    date: '',
  // Populate form when editing an existing expense
  useEffect(() => {
    if (editingExpense) {
      setFormData({
        id: editingExpense.id,
        description: editingExpense.description,
        category: editingExpense.category,
        amount: editingExpense.amount,
        date: editingExpense.date,
      });
    } else {
      // Reset if there's no editingExpense
      setFormData({
        id: '',
        description: '',
        category: '',
        amount: '',
        date: '',
      });
  }
  }, [editingExpense]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { description, category, amount, date, id } = formData;
    // Basic validation
    if (!description || !category || !amount || !date) {
      alert('Please fill out all fields');
      return;
    }
    if (isEditing) {
      // Edit existing expense
      editExpense(id, {
        description,
        category,
        amount: parseFloat(amount),
        date,
      });
      onCancelEdit();
    } else {
      // Add new expense
      addExpense({
        id: Date.now().toString(),
        description,
        category,
        amount: parseFloat(amount),
        date,
      });
    }
    // Reset form after submission
    setFormData({
      id: '',
      description: '',
      category: '',
      amount: '',
      date: '',
    });
  };
  return (
    <div style={{ marginBottom: '2rem' }}>
      <h2>{isEditing ? 'Edit Expense' : 'Add New Expense'}</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem' }}>
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleInputChange}
        />        <input
          type="number"

          name="amount"
        <button type="submit">
          {isEditing ? 'Update Expense' : 'Add Expense'}
        </button>
        {isEditing && (

          <button type="button" onClick={onCancelEdit}>
            Cancel
                   </button>
        )}
      </form>
    </div>

  );
}export default AddExpenseForm;


