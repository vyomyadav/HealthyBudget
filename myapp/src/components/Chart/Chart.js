import {
    ArcElement,
    CategoryScale,
    Chart as ChartJs,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js'
import React from 'react'
import { Line } from 'react-chartjs-2'
import styled from 'styled-components'
import { dateFormat } from '../../utils/dateFormat'
import { useGlobalContext } from '../context/globalContext'

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
)

function Chart() {
    const { transactions } = useGlobalContext()  // Use unified transactions list

    const incomes = transactions.filter(trans => trans.type === 'income');
    const expenses = transactions.filter(trans => trans.type === 'expense');

    const data = {
        labels: transactions.map((trans) => dateFormat(trans.date)),  // Use unified transaction dates
        datasets: [
            {
                label: 'Income',
                data: incomes.map(income => income.amount),
                borderColor: 'green',
                backgroundColor: 'rgba(0, 128, 0, 0.5)',
                tension: 0.2
            },
            {
                label: 'Expenses',
                data: expenses.map(expense => expense.amount),
                borderColor: 'red',
                backgroundColor: 'rgba(255, 0, 0, 0.5)',
                tension: 0.2
            }
        ]
    }

    return (
        <ChartStyled>
            <Line data={data} />
        </ChartStyled>
    )
}

const ChartStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    height: 100%;
`;

export default Chart
