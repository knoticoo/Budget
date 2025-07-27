import React, { useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Plus, TrendingUp, TrendingDown, CreditCard, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
}

interface Budget {
  category: string;
  allocated: number;
  spent: number;
  color: string;
}

const BudgetApp: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'income',
      amount: 3000,
      category: 'Salary',
      description: 'Monthly salary',
      date: '2024-01-01'
    },
    {
      id: '2',
      type: 'expense',
      amount: 800,
      category: 'Rent',
      description: 'Monthly rent payment',
      date: '2024-01-02'
    },
    {
      id: '3',
      type: 'expense',
      amount: 150,
      category: 'Food',
      description: 'Groceries',
      date: '2024-01-03'
    },
    {
      id: '4',
      type: 'expense',
      amount: 50,
      category: 'Transport',
      description: 'Bus pass',
      date: '2024-01-04'
    }
  ]);

  const [budgets, setBudgets] = useState<Budget[]>([
    { category: 'Food', allocated: 500, spent: 150, color: '#FF6384' },
    { category: 'Transport', allocated: 200, spent: 50, color: '#36A2EB' },
    { category: 'Entertainment', allocated: 300, spent: 0, color: '#FFCE56' },
    { category: 'Rent', allocated: 1000, spent: 800, color: '#4BC0C0' },
    { category: 'Utilities', allocated: 200, spent: 0, color: '#9966FF' }
  ]);

  const [newTransaction, setNewTransaction] = useState({
    type: 'expense' as 'income' | 'expense',
    amount: '',
    category: '',
    description: ''
  });

  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const revolutBalance = 2145.67; // Mock Revolut balance

  // Calculate totals
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  // Prepare data for charts
  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  const chartData = Object.entries(expensesByCategory).map(([category, amount]) => ({
    name: category,
    value: amount,
    color: budgets.find(b => b.category === category)?.color || '#8884d8'
  }));

  const monthlyData = [
    { month: 'Jan', income: 3000, expenses: 1000 },
    { month: 'Feb', income: 3200, expenses: 1200 },
    { month: 'Mar', income: 3100, expenses: 1100 },
    { month: 'Apr', income: 3300, expenses: 1300 },
    { month: 'May', income: 3000, expenses: 1000 },
    { month: 'Jun', income: 3400, expenses: 1400 }
  ];

  const handleAddTransaction = () => {
    if (newTransaction.amount && newTransaction.category && newTransaction.description) {
      const transaction: Transaction = {
        id: Date.now().toString(),
        type: newTransaction.type,
        amount: parseFloat(newTransaction.amount),
        category: newTransaction.category,
        description: newTransaction.description,
        date: new Date().toISOString().split('T')[0]
      };

      setTransactions([transaction, ...transactions]);
      
      // Update budget spent amount
      if (newTransaction.type === 'expense') {
        setBudgets(budgets.map(budget => 
          budget.category === newTransaction.category
            ? { ...budget, spent: budget.spent + parseFloat(newTransaction.amount) }
            : budget
        ));
      }

      setNewTransaction({ type: 'expense', amount: '', category: '', description: '' });
      setShowAddTransaction(false);
    }
  };

  const connectToRevolut = () => {
    // Mock Revolut integration
    alert('Revolut integration would require API keys and OAuth setup. This is a demo showing how the UI would look.');
  };

  return (
    <div className="space-y-6">
      {/* Header with Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-green-400 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Total Balance</p>
              <p className="text-2xl font-bold">${balance.toLocaleString()}</p>
            </div>
            <Wallet className="h-8 w-8 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Income</p>
              <p className="text-2xl font-bold">${totalIncome.toLocaleString()}</p>
            </div>
            <ArrowUpRight className="h-8 w-8 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-400 to-red-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm font-medium">Expenses</p>
              <p className="text-2xl font-bold">${totalExpenses.toLocaleString()}</p>
            </div>
            <ArrowDownRight className="h-8 w-8 text-red-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-400 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Revolut</p>
              <p className="text-2xl font-bold">${revolutBalance.toLocaleString()}</p>
            </div>
            <CreditCard className="h-8 w-8 text-purple-200" />
          </div>
          <button
            onClick={connectToRevolut}
            className="mt-2 text-xs bg-white bg-opacity-20 px-3 py-1 rounded-full hover:bg-opacity-30 transition-colors"
          >
            Connect
          </button>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Expense Distribution Pie Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Expense Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Income vs Expenses */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value}`, '']} />
              <Bar dataKey="income" fill="#10B981" name="Income" />
              <Bar dataKey="expenses" fill="#EF4444" name="Expenses" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Budget Overview */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget Overview</h3>
        <div className="space-y-4">
          {budgets.map((budget) => {
            const percentage = (budget.spent / budget.allocated) * 100;
            const isOverBudget = percentage > 100;
            
            return (
              <div key={budget.category} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">{budget.category}</span>
                  <span className={`text-sm ${isOverBudget ? 'text-red-600' : 'text-gray-600'}`}>
                    ${budget.spent} / ${budget.allocated}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      isOverBudget ? 'bg-red-500' : 'bg-blue-500'
                    }`}
                    style={{
                      width: `${Math.min(percentage, 100)}%`,
                      backgroundColor: budget.color
                    }}
                  />
                </div>
                <div className="text-xs text-gray-500">
                  {percentage.toFixed(1)}% used
                  {isOverBudget && <span className="text-red-500 ml-2">Over budget!</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Transactions */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
            <button
              onClick={() => setShowAddTransaction(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Add Transaction</span>
            </button>
          </div>
        </div>

        {/* Add Transaction Form */}
        {showAddTransaction && (
          <div className="p-6 bg-gray-50 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <select
                value={newTransaction.type}
                onChange={(e) => setNewTransaction({...newTransaction, type: e.target.value as 'income' | 'expense'})}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
              <input
                type="number"
                placeholder="Amount"
                value={newTransaction.amount}
                onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={newTransaction.category}
                onChange={(e) => setNewTransaction({...newTransaction, category: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Category</option>
                <option value="Food">Food</option>
                <option value="Transport">Transport</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Rent">Rent</option>
                <option value="Utilities">Utilities</option>
                <option value="Salary">Salary</option>
                <option value="Freelance">Freelance</option>
              </select>
              <input
                type="text"
                placeholder="Description"
                value={newTransaction.description}
                onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex space-x-2">
                <button
                  onClick={handleAddTransaction}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                >
                  Add
                </button>
                <button
                  onClick={() => setShowAddTransaction(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="divide-y divide-gray-200">
          {transactions.slice(0, 10).map((transaction) => (
            <div key={transaction.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-full ${
                    transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {transaction.type === 'income' ? (
                      <TrendingUp className={`h-5 w-5 ${
                        transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                      }`} />
                    ) : (
                      <TrendingDown className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{transaction.description}</p>
                    <p className="text-sm text-gray-500">{transaction.category} • {transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BudgetApp;