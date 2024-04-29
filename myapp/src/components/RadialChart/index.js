import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useGlobalContext } from '../context/globalContext';

const ApexChart = () => {
  const {
    transactions,
    getTransactions
  } = useGlobalContext()


  const currentDate = new Date().toISOString().slice(0, 10);

  const [totalExpenses, setTotalExpenses] = useState(0);

  const [totalIncomes, setTotalIncomes] = useState(0);

  useEffect(() => {
    getTransactions(); // Fetch all transactions on component mount
  }, [])


  useEffect(() => {
    const filtered = transactions.filter(transaction =>
      transaction.type === "expense" && transaction.date === currentDate
    );

    const amount = filtered.reduce((total, transaction) => {
      return total + parseFloat(transaction.amount);
    }, 0);
    setTotalExpenses(amount ? amount: 0);
  }, [transactions, currentDate]);

  useEffect(() => {
    const filtered = transactions.filter(transaction =>
      transaction.type === "income" && transaction.date === currentDate
    );
    const amount = filtered.reduce((total, transaction) => {
      return total + parseFloat(transaction.amount);
    }, 0);

    setTotalIncomes(amount ? amount: 0);
  }, [transactions, currentDate]);


  const series = [totalIncomes, totalExpenses, 83];
  const options = {
    chart: {
      height: 350,
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: '22px',
          },
          value: {
            fontSize: '16px',
            formatter: function(val) {
              // Simply return the value without any '%' sign
              return val;
            }
          },
          total: {
            show: false,
            label: 'Balance',
            formatter: function (w) {
              return 0
            }
          }
        }
      }
    },
    labels: ['Income', 'Expenses', 'Budget'],
  };

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={options} series={series} type="radialBar" height={350} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}

export default ApexChart;
