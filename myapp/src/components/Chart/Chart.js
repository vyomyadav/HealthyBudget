import { BarElement, CategoryScale, Chart as ChartJs, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import styled from 'styled-components';
import { dateFormat } from '../../utils/dateFormat';
import { useGlobalContext } from '../context/globalContext';

// Register Chart.js components
ChartJs.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

// Styled component for the chart container
const ChartStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    height: 100%;
    margin-top: 20px;
`;

// Function to sum transaction amounts by date
const sumByDate = (items) => {
    const sum = {};
    items.forEach(({ date, amount }) => {
        const key = dateFormat(new Date(date));
        if (!sum[key]) {
            sum[key] = 0;
        }
        sum[key] += +amount;
    });
    return sum;
};

// Chart component
function Chart() {
    const { transactions, budgets } = useGlobalContext();

    const incomeByDate = sumByDate(transactions.filter(t => t.type === 'income'));
    const expenseByDate = sumByDate(transactions.filter(t => t.type === 'expense'));
    const budgetByDate = sumByDate(budgets);

    // Sorted unique dates from all transactions
    const allDates = [...new Set([...transactions, ...budgets].map(t => dateFormat(new Date(t.date))))];
    allDates.sort((a, b) => new Date(a) - new Date(b));

    const data = {
        labels: allDates,
        datasets: [
            {
                label: 'Income',
                data: allDates.map(date => incomeByDate[date] || 0),
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
            },
            {
                label: 'Expenses',
                data: allDates.map(date => expenseByDate[date] || 0),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Budget',
                data: allDates.map(date => budgetByDate[date] || 0),
                backgroundColor: 'rgba(153, 102, 255, 0.5)',
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                stacked: false,
            },
            y: {
                stacked: false,
            }
        },
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            }
        }
    };

    return (
        <ChartStyled>
            <Bar data={data} options={options} />
        </ChartStyled>
    );
}

export default Chart;

