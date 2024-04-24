import React, { useEffect } from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/Layouts";
import TransactionForm from "../TransactionForm/TransactionForm"; // Assuming you've renamed Form to TransactionForm
import TransactionItem from "../TransactionItem/TransactionItem";
import { useGlobalContext } from "../context/globalContext";

function Incomes() {
    const {
        transactions, 
        getTransactions, 
        deleteTransaction, 
        totalIncome
    } = useGlobalContext();

    useEffect(() => {
        getTransactions(); // This fetches all transactions
    }, [getTransactions]);

    // Filter for income type transactions
    const incomeTransactions = transactions.filter(transaction => transaction.type === 'income');

    return (
        <IncomeStyled>
            <InnerLayout>
                <h1>Incomes</h1>
                <h2 className="total-income">Total Income: <span>${totalIncome()}</span></h2>
                <div className="income-content">
                    <div className="form-container">
                        <TransactionForm type="income" />
                    </div>
                    <div className="incomes">
                        {incomeTransactions.map((transaction) => {
                            const {id, title, amount, date, category, description} = transaction;
                            return <TransactionItem
                                key={id}
                                id={id} 
                                title={title} 
                                description={description} 
                                amount={amount} 
                                date={date} 
                                category={category} 
                                indicatorColor="var(--color-green)"
                                deleteItem={() => deleteTransaction(id)}
                            />
                        })}
                    </div>
                </div>
            </InnerLayout>
        </IncomeStyled>
    )
}

const IncomeStyled = styled.div`
    display: flex;
    overflow: auto;
    .total-income{
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
            color: var(--color-green);
        }
    }
    .income-content{
        display: flex;
        gap: 2rem;
        .incomes{
            flex: 1;
        }
    }
`;

export default Incomes;