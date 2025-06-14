8765321198765432109876543
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
