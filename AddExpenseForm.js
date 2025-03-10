import React, { useState, useEffect } from 'react';
import { useExpenses } from '../path-to-useExpenses';
function AddExpenseForm({ editingExpense, onCancelEdit }) {
  const { addExpense, editExpense } = useExpenses();
  const isEditing = Boolean(editingExpense);
  const [formData, setFormData] = useState({
    id: '',
    description: '',
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
