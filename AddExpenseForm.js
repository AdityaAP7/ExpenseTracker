const AddExpenseForm = ({ editingExpense, onCancelEdit }) => {
  const { addExpense, editExpense } = useExpenses();
  const isEditing = Boolean(editingExpense);
  const [formData, setFormData] = useState({
   id: '',
    description: '',
    category: '',
    amount: '',
    date: '',
  });
  useEffect(() => {
    if (editingExpense) {
      setFormData({
        id: editingExpense.id,
        description: editingExpense.description,
        category: editingExpense.category,
        amount: editingExpense.amount,
        date: editingExpense.date,
  });
    }
  }, [editingExpense]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.description || !formData.category || !formData.amount || !formData.date) {
      alert('Please fill out all fields');
 return;
    }
    if (isEditing) {
      // Edit existing expense
      editExpense(formData.id, {
        description: formData.description,
        category: formData.category,
        amount: parseFloat(formData.amount),
   date: formData.date,
      });
      onCancelEdit(); // call parent function to reset editing state
    } else {
      // Add new expense
      addExpense({
        id: Date.now().toString(),
        description: formData.description,
        category: formData.category,
        amount: parseFloat(formData.amount),
  date: formData.date,
      });
    }
    // Reset form
setFormData({
  const handleInputChange = (e) => {
    const { name, value } = e.target;
 setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div style={{ marginBottom: '2rem' }}>
      <h2>{isEditing ? 'Edit Expense' : 'Add New Expense'}</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem' }}>
        <input
