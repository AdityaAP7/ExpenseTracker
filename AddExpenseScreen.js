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
          mode="outlined"
          error={amountError}
        />
        {amountError && (
          <HelperText type="error" visible={amountError}>
            Please enter a valid amount greater than 0.
          </HelperText>
        )}
        {/* CURRENCY PICKER */}
        <Text style={styles.label}>Currency</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={currency}
            style={styles.picker}
            onValueChange={(itemValue) => setCurrency(itemValue)}
          >
            <Picker.Item label="USD" value="USD" />
            <Picker.Item label="EUR" value="EUR" />
            <Picker.Item label="GBP" value="GBP" />
            <Picker.Item label="INR" value="INR" />
            <Picker.Item label="JPY" value="JPY" />
            {/* Add more as needed */}
          </Picker>
        </View>
        {/* INCOME VS EXPENSE TOGGLE */}
        <View style={styles.toggleRow}>
          <Text style={styles.label}>Is this Income?</Text>
          <Switch
            onValueChange={() => setIsIncome(!isIncome)}
          />
        </View>
        {/* DATE PICKER */}
        <Button
          mode="outlined"
          onPress={() => setShowDatePicker(true)}
          style={styles.datePickerButton}
        >
          Select Date
        </Button>
        <Text style={styles.selectedDateText}>
          {`Selected: ${date.toLocaleDateString()}`}
        </Text>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}
        {/* CATEGORY PICKER */}
        <Text style={styles.label}>Category</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={category}
            style={styles.picker}
            onValueChange={(itemValue) => setCategory(itemValue)}
>
            <Picker.Item label="Food" value="Food" />
            <Picker.Item label="Transport" value="Transport" />
            <Picker.Item label="Utilities" value="Utilities" />
            <Picker.Item label="Entertainment" value="Entertainment" />
            <Picker.Item label="Healthcare" value="Healthcare" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
        </View>
        {/* NOTES */}
        <TextInput
          label="Notes (Optional)"
          value={notes}
          onChangeText={(text) => setNotes(text)}
          style={styles.input}
          mode="outlined"
          multiline
          numberOfLines={3}
        />
        {/* ACTION BUTTONS */}
        <View style={styles.buttonRow}>
          <Button mode="contained" onPress={handleAddExpense} style={styles.button}>
Save
          </Button>
          <Button
            mode="text"
            onPress={() => navigation.goBack()}
            style={styles.button}
          >
            Cancel
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};
// STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cont    padding: 16,
entContainer: {
  },
  input: {
    marginBottom: 16,
  },
  label: {
    marginTop: 8,
    fontSize: 16,
    marginBottom: 4,
  },
  pickerContainer: {
    borderWidth: 1,
