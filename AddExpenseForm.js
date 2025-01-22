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
