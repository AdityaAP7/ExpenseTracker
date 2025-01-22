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
