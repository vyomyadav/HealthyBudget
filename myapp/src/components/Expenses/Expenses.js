import React, { useEffect } from 'react';
import styled from 'styled-components';
import { InnerLayout } from '../../styles/Layouts';
import TransactionItem from '../TransactionItem/TransactionItem';
import { useGlobalContext } from '../context/globalContext';
import ExpenseForm from './ExpenseForm';

function Expenses() {
    const { transactions, getTransactions, deleteTransaction, totalExpenses } = useGlobalContext();

    useEffect(() => {
        getTransactions(); // This now needs to fetch all transactions
    }, [getTransactions]); // Ensure getTransactions is stable and included if needed

    // Filter to only include expenses
    const expenseTransactions = transactions.filter(transaction => transaction.type === 'expense');

    return (
        <ExpenseStyled>
            <InnerLayout>
                <h1>Expenses</h1>
                <h2 className="total-expense">Total Expense: <span>${totalExpenses()}</span></h2>
                <div className="transaction-content">
                    <div className="form-container">
                        <ExpenseForm />
                    </div>
                    <div className="expenses">
                        {expenseTransactions.map((expense) => {
                            const {id, title, amount, date, category, description, type} = expense;
                            return <TransactionItem
                                key={id}
                                id={id} 
                                title={title} 
                                description={description} 
                                amount={amount} 
                                date={date} 
                                category={category} 
                                indicatorColor="var(--color-red)" // Color for expenses, could be different
                                deleteItem={() => deleteTransaction(id)}
                                type={expense.type}
                            />
                        })}
                    </div>
                </div>
            </InnerLayout>
        </ExpenseStyled>
    )
}

const ExpenseStyled = styled.div`
    display: flex;
    overflow: auto;
    .total-expense{
        display: flex;
        justify-content: center;
        align-items: center;
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 2rem;
        gap: .5rem;
        span{
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--color-red); // Adjust color to fit expense theming
        }
    }
    .transaction-content{
        display: flex;
        gap: 2rem;
        .expenses{
            flex: 1;
        }
    }
`;

export default Expenses;