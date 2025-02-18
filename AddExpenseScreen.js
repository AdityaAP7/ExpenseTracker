import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import {
  TextInput,
  Button,
  Appbar,
  HelperText,
  Text,
  Switch,
} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
const AddExpenseScreen = ({ navigation, route }) => {
  const { setExpenses } = route.params || {};
  // Local states
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [category, setCategory] = useState('Other');
  const [notes, setNotes] = useState('');
  const [currency, setCurrency] = useState('USD'); // New Feature
  // Toggle for income vs expense
  const [isIncome, setIsIncome] = useState(false); // New Feature
  // Validation states
  const [descriptionError, setDescriptionError] = useState(false);
  const [amountError, setAmountError] = useState(false);
  // Handle date change
  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };
  // Add expense (or income)
  const handleAddExpense = () => {
    const trimmedDescription = description.trim();
    const parsedAmount = parseFloat(amount);
    // 1. Validate description
    if (!trimmedDescription) {
      setDescriptionError(true);
      return;
    } else {
      setDescriptionError(false);
    }
    // 2. Validate amount
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setAmountError(true);
      return;
    } else {
      setAmountError(false);
    }
    // 3. If everything is valid, create the new item
    const newExpense = {
      id: Date.now(),
      description: trimmedDescription,
      // Convert to negative amount if it's an expense, keep positive if it's income
      amount: isIncome ? parsedAmount : -parsedAmount,
      date,
      category,
      notes,
      currency,
      type: isIncome ? 'Income' : 'Expense', // for clarity
    };
    // 4. Update the parent state
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
    // 5. Navigate back
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      {/* Appbar */}
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Add Transaction" />
      </Appbar.Header>
      {/* Form */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* DESCRIPTION */}
        <TextInput
          label="Description"
          value={description}
          onChangeText={(text) => setDescription(text)}
          style={styles.input}
          mode="outlined"
          error={descriptionError}
        />
        {descriptionError && (
          <HelperText type="error" visible={descriptionError}>
            Description cannot be empty.
          </HelperText>
        )}
        {/* AMOUNT */}
        <TextInput
          label="Amount"
          value={amount}
          onChangeText={(text) => setAmount(text)}
          keyboardType="numeric"
          style={styles.input}
