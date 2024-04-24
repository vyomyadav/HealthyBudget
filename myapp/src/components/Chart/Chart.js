import { ArcElement, CategoryScale, Chart as ChartJs, Legend, LineElement, LinearScale, PointElement, Title, Tooltip } from 'chart.js';
import React from 'react';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import { dateFormat } from '../../utils/dateFormat';
import { useGlobalContext } from '../context/globalContext';

// Register Chart.js components
ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
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

// Chart component
function Chart() {
    const { transactions } = useGlobalContext();

    const incomes = transactions.filter(trans => trans.type === 'income');
    const expenses = transactions.filter(trans => trans.type === 'expense');

    const data = {
        labels: transactions.map((trans) => dateFormat(trans.date)),
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
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 25,
            easing: 'easeInOutQuart',
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Date',
                    color: '#333',
                    font: {
                        family: 'Helvetica',
                        size: 14,
                        weight: 'bold',
                    },
                },
                ticks: {
                    color: '#666',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Amount',
                    color: '#333',
                    font: {
                        family: 'Helvetica',
                        size: 14,
                        weight: 'bold',
                    },
                },
                ticks: {
                    color: '#666',
                },
            },
        },
        plugins: {
            legend: {
                labels: {
                    color: '#333',
                    font: {
                        family: 'Helvetica',
                        size: 12,
                    },
                },
            },
            tooltip: {
                backgroundColor: '#ffffff',
                titleColor: '#333',
                bodyColor: '#666',
                borderColor: '#ddd',
                borderWidth: 1,
                cornerRadius: 4,
                caretSize: 6,
                xPadding: 10,
                yPadding: 10,
            },
        },
    };

    return (
        <ChartStyled>
            <Line data={data} options={options} />
        </ChartStyled>
    );
}

export default Chart;