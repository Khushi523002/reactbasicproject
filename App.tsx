import React, { useState, useEffect } from 'react';
import './App.css';

//INterface struture
interface Expense {
  category: string;
  amount: number;
  date: string;
}

///app funtion
const App: React.FC = () => {
  //component struture
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [budget, setBudget] = useState<number>();
  const [newExpense, setNewExpense] = useState<Expense>({
    category: '',
    amount: 0,
    date: '',
  });
  const [totalExpense, setTotalExpense] = useState<number>(0);

  // Calculate total expense
  useEffect(() => {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    setTotalExpense(total);
  }, [expenses]);
  //handle expenses
  const handleAddExpense = () => {
    setExpenses([...expenses, newExpense]);
    setNewExpense({ category: '', amount: 0, date: '' });
  };
  //handle delete expenses
  const handleDeleteExpense = (index: number) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };
  //handle budget
  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBudget(Number(e.target.value));
  };
  //hnadle change in expenses
  const handleExpenseChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewExpense((prevExpense) => ({
      ...prevExpense,
      [name]: name === 'amount' ? Number(value) : value,
    }));
  };

  // Check if expenses reach 80% of budget
  const isNearBudgetLimit = totalExpense > 0.8 * budget;
  //JSX Struture
  return (
    <div className="app">
      <h1>Expense Tracker</h1>

      <div className="budget-section">
        <label>
          Set Monthly Budget:
          <input
            type="number"
            value={budget}
            onChange={handleBudgetChange}
            placeholder="Enter budget"
          />
        </label>
      </div>

      <div className="expense-form">
        <label>
          Category:
          {/* <input
            name="category"
            value={newExpense.category}
            onChange={handleExpenseChange}
            placeholder="e.g., Food"
          /> */}
          <select
            name="category"
            value={newExpense.category}
            onChange={handleExpenseChange}
          >
            <option value="">Select a category</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Shopping">Shopping</option>
            <option value="Utilities">Utilities</option>
            <option value="Health">Health</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <label>
          Amount:
          <input
            name="amount"
            type="number"
            value={newExpense.amount}
            onChange={handleExpenseChange}
            placeholder="e.g., 50"
          />
        </label>
        <label>
          Date:
          <input
            name="date"
            type="date"
            value={newExpense.date}
            onChange={handleExpenseChange}
          />
        </label>
        <button onClick={handleAddExpense}>Add Expense</button>
      </div>

      <div className={`budget-alert ${isNearBudgetLimit ? 'near-budget' : ''}`}>
        {isNearBudgetLimit && <p>Warning: You have used 80% of your budget!</p>}
      </div>

      <div className="expense-list">
        <h2>Expenses</h2>
        <ul>
          {expenses.map((expense, index) => (
            <li key={index} className="expense-item">
              <span>{expense.category}</span>
              <span>₹{expense.amount.toFixed(2)}</span>
              <span>{expense.date}</span>
              <button
                onClick={() => handleDeleteExpense(index)}
                className="delete-button"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        Total Expense: ₹{totalExpense.toFixed(2)}
        <p className="total-expense"></p>
        <p className="remaining-budget">
          Remaining Budget: ₹{Math.max(budget - totalExpense, 0).toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default App;
