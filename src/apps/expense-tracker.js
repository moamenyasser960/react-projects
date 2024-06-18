
import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import PropTypes from "prop-types";

const ExpenseForm = ({ onAddExpense }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    const expenseData = {
      id: Math.random().toString(),
      title,
      amount: parseFloat(amount),
      category,
      date: new Date(),
    };
    onAddExpense(expenseData);
    setTitle("");
    setAmount("");
    setCategory("");
  };

  return (
    <form
      onSubmit={submitHandler}
      className="mb-8 bg-gray-100 text-gray-800 p-6 rounded-lg shadow-md"
    >
      <h2 className="text-xl font-bold mb-4">Add New Expense</h2>
      <div className="mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full p-2 rounded border border-gray-300 bg-opacity-10 focus:outline-none focus:bg-opacity-30"
        />
      </div>
      <div className="mb-4">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="w-full p-2 rounded border border-gray-300 bg-opacity-10 focus:outline-none focus:bg-opacity-30"
        />
      </div>
      <div className="mb-4">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 rounded border border-gray-300 bg-opacity-10 focus:outline-none focus:bg-opacity-30"
        >
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Health">Health</option>
        </select>
      </div>
      <div className="text-right">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none"
        >
          Add Expense
        </button>
      </div>
    </form>
  );
};

ExpenseForm.propTypes = {
  onAddExpense: PropTypes.func.isRequired,
};

const ExpenseList = ({ expenses }) => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Expense List</h2>
      <ul className="divide-y divide-gray-300">
        {expenses.map((expense) => (
          <li key={expense.id} className="py-2">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{expense.title}</h3>
                <p className="text-sm text-gray-400">{expense.category}</p>
              </div>
              <div className="text-lg text-gray-800 font-semibold">
                ${expense.amount.toFixed(2)}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

ExpenseList.propTypes = {
  expenses: PropTypes.array.isRequired,
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ExpenseChart = ({ expenses }) => {
  const categories = ["Food", "Transport", "Entertainment", "Health"];
  const expenseData = categories.map((cat) => {
    return expenses
      .filter((expense) => expense.category === cat)
      .reduce((sum, expense) => sum + expense.amount, 0);
  });

  const data = {
    labels: categories,
    datasets: [
      {
        label: "Expenses",
        data: expenseData,
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Expense Chart</h2>
      <Bar data={data} />
    </div>
  );
};

ExpenseChart.propTypes = {
  expenses: PropTypes.array.isRequired,
};

function App() {
  const [expenses, setExpenses] = useState([]);

  const addExpenseHandler = (expense) => {
    setExpenses((prevExpenses) => [...prevExpenses, expense]);
  };

  return (
    <div className="bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 min-h-screen text-white">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-center mb-8">Expense Tracker</h1>
        <ExpenseForm onAddExpense={addExpenseHandler} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ExpenseChart expenses={expenses} />
          <ExpenseList expenses={expenses} />
        </div>
      </div>
    </div>
  );
}
export default App;
