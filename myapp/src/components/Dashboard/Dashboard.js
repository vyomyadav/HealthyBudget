import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import History from '../../History/History';
import { InnerLayout } from '../../styles/Layouts';
import { dollar } from '../../utils/Icons';
import Chart from '../Chart/Chart';
import ApexChart from '../RadialChart';
import { useGlobalContext } from '../context/globalContext';
import Logo from "../../../public/favicon.ico"


function Dashboard({ setActive }) {

    const [ state, setState ] = useState(0);
    const {
        transactions,
        totalIncome,
        totalExpenses,
        totalBalance,
        getTransactions,
        getBudgets,
    } = useGlobalContext()

    useEffect(() => {
        getTransactions(); // Fetch all transactions on component mount
        getBudgets(); // Fetch all budgets on component mount
        setState(1);
    }, [])

    // Min and Max calculations for transactions based on type
    const minMaxAmount = (type) => {
        const filteredTransactions = transactions.filter(t => t.type === type);
        const amounts = filteredTransactions.map(t => parseFloat(t.amount));
        const minAmount = Math.min(...amounts);
        const maxAmount = Math.max(...amounts);
        return amounts.length ? { min: minAmount, max: maxAmount } : { min: 0, max: 0 };
    };

    const { min: minIncome, max: maxIncome } = minMaxAmount('income');
    const { min: minExpense, max: maxExpense } = minMaxAmount('expense');

    const handleIncomeClick = () => setActive(3); // Change to the appropriate index for Incomes
    const handleExpenseClick = () => setActive(4);
    const handleHistoryClick = () => setActive(2);
    const handleBudgetClick = () => setActive(5);

    return (
        <>
            {((state === 1 ) && (totalIncome() === 0 ) && (totalExpenses() === 0 ) && (totalBalance() === 0)) && (
                <div className='flex justify-center items-center w-full h-full'>
                    <div className='flex flex-col items-center'>
                        <div className='w-40 pb-5'><img src={Logo} alt="" /></div>
                        <div className='font-semibold text-2xl text-black'>Embark on Your Budgeting Adventure with HealthyBudget!</div>
                    </div>
                </div>
            )}  
            {((state === 1 ) && (totalIncome() !== 0 ) && (totalExpenses() !== 0 ) && (totalBalance() !== 0)) && (
                <DashboardStyled>
                    <InnerLayout>
                        <div className="stats-con">
                            <div className="chart-con">
                                <div className="amount-con">
                                    <div className="income" onClick={handleIncomeClick}>
                                        <h2>Total Income</h2>
                                        <p>
                                            {dollar} {totalIncome()}
                                        </p>
                                    </div>
                                    <div className="expense" onClick={handleExpenseClick}>
                                        <h2>Total Expense</h2>
                                        <p>
                                            {dollar} {totalExpenses()}
                                        </p>
                                    </div>
                                    <div className="balance">
                                        <h2>Total Balance</h2>
                                        <p>
                                            {dollar} {totalBalance()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='pt-5 text-3xl font-bold text-black' onClick={handleHistoryClick}> Transactions </div>

                        <div className="stats-con">
                            <div className="chart-container mb-10">
                                <Chart />
                            </div>
                            <div className="radialGraph mb-10">
                                <div className='pt-5 text-3xl font-bold text-black' onClick={handleBudgetClick}> Daily Finance </div>
                                <ApexChart />
                            </div>
                            <div className="history-con">
                                <History />
                                <h2 className="salary-title">Min <span className=' text-3xl font-bold text-black'>Income</span> Max</h2>
                                <div className="salary-item">
                                    <p>${minIncome}</p>
                                    <p>${maxIncome}</p>
                                </div>
                                <h2 className="salary-title">Min <span className=' text-3xl font-bold text-black'>Expense</span> Max</h2>
                                <div className="salary-item">
                                    <p>${minExpense}</p>
                                    <p>${maxExpense}</p>
                                </div>
                            </div>
                        </div>
                    </InnerLayout>
                </DashboardStyled>
            )}
        </>
    )
}
// grid-template-columns: repeat(5, 1fr);

const DashboardStyled = styled.div`
    .stats-con{

        .chart-container {
        }

        .chart-con{
            grid-column: 1/3;
            .amount-con{
                display: flex;
                justify-content: space-between;
                gap: 2rem;
                .income, .expense, .balance{
                    flex: 1;
                    background: #FCF6F9;
                    border: 2px solid #FFFFFF;
                    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                    border-radius: 20px;
                    padding: 1rem;
                }

                .income {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    p{
                        color: var(--color-green);
                        opacity: 0.6;
                        font-size: 2.5rem;
                    }
                }

                .expense {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    p{
                        color: var(--color-green);
                        opacity: 0.6;
                        font-size: 2.5rem;
                    }
                }

                .balance{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    p{
                        color: var(--color-green);
                        opacity: 0.6;
                        font-size: 2.5rem;
                    }
                }
            }
        }

        .radialGraph{ 
            grid-column: 4 / -1;
        }

        .history-con{
            grid-column: 4 / -1;
            h2{
                margin: 1rem 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .salary-title{
                font-size: 1.2rem;
                span{
                    font-size: 1.8rem;
                }
            }
            .salary-item{
                background: #FCF6F9;
                border: 2px solid #FFFFFF;
                box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                padding: 1rem;
                border-radius: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                p{
                    font-weight: 600;
                    font-size: 1.6rem;
                }
            }
        }
    }
`;

export default Dashboard