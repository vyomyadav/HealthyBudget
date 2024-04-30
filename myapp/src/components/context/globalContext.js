import axios from 'axios';
import React, { useContext, useState } from "react";

const BASE_URL = `${process.env.REACT_APP_BACKEND_PORT}/budget`;

const GlobalContext = React.createContext()

export const GlobalProvider = ({ children }) => {
    const [transactions, setTransactions] = useState([]);
    const [budgets, setBudgets] = useState([]);
    const [error, setError] = useState(null);

    // Fetch all transactions
    const getTransactions = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/transactions/`);
            setTransactions(response.data);
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    // Add a transaction
    const addTransaction = async (transaction) => {
        try {
            await axios.post(`${BASE_URL}/transactions/add/`, transaction);
            getTransactions();  // Refresh the list after adding
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    // Delete a transaction
    const deleteTransaction = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/transactions/delete/${id}/`);
            getTransactions();  // Refresh the list after deletion
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    // Calculate total income
    const totalIncome = () => {
        return transactions
            .filter(t => t.type === 'income')
            .reduce((total, transaction) => total + parseFloat(transaction.amount), 0);
    };

    // Calculate total expenses
    const totalExpenses = () => {
        return transactions
            .filter(t => t.type === 'expense')
            .reduce((total, transaction) => total + parseFloat(transaction.amount), 0);
    };

    // Calculate balance
    const totalBalance = () => {
        return totalIncome() - totalExpenses();
    };

    // Get recent transactions for history
    const transactionHistory = () => {
        const sortedTransactions = transactions.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
        return sortedTransactions.slice(0, 3);  // Get the top 3 recent transactions
    };

    const getBudgets = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/budgets/`);
            setBudgets(response.data);
        } catch (err) {
            setError(err.response ? err.response.data.message : 'Error fetching budgets');
        }
    };

    // Add a budget
    const addBudget = async (budget) => {
        try {
            await axios.post(`${BASE_URL}/budgets/add/`, budget);
            getBudgets();  // Refresh the list after adding
        } catch (err) {
            setError(err.response ? err.response.data.message : 'Error adding budget');
        }
    };

    // Delete a budget
    const deleteBudget = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/budgets/delete/${id}/`);
            getBudgets();  // Refresh the list after deletion
        } catch (err) {
            setError(err.response ? err.response.data.message : 'Error deleting budget');
        }
    };


    return (
        <GlobalContext.Provider value={{
            addTransaction,
            getTransactions,
            transactions,
            deleteTransaction,
            totalIncome,
            totalExpenses,
            totalBalance,
            transactionHistory,
            addBudget,
            getBudgets,
            budgets,
            deleteBudget,
            error,
            setError
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};
