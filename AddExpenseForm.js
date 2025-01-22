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
