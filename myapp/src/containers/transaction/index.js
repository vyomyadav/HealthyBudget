import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import Fullcalendar from "@fullcalendar/react";
import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../../components/context/globalContext';
import './transaction.css';

function TransactionPage() {

  const {
    transactions,
    getTransactions,
    budgets,
    getBudgets
  } = useGlobalContext()

  const [transformedArray, setTransformedArray] = useState([]);
  const [transformedBudget, setTransformedBudget] = useState([]);

  const [combinedArray, setCombinedArray] = useState([]);


  useEffect(() => {
    getTransactions(); // Fetch all transactions on component mount
    getBudgets();
  }, [])


  useEffect(() => {
    const transformedData = transactions.map(transaction => {
      let amount = transaction.amount;
      if (amount.endsWith('.00')) {
        amount = amount.slice(0, -3);
      }

      // Assign a color based on the transaction type
      const color = transaction.type === 'income' ? 'green' : 'red';
      const backgroundColor = transaction.type === 'budget' ? 'red' : color; // Assume 'budget' is a possible type

      return {
        title: `${transaction.title} - $${amount}`,
        date: transaction.date,
        backgroundColor, // Set the background color based on the transaction type
        borderColor: backgroundColor, // Optionally, you can also set the border color
        priority: 2
        // allDay: true if you want to mark the event as an all-day event
      };
    });
    setTransformedArray(transformedData);
  }, [transactions]);

  useEffect(() => {
    const transformedData = budgets.map(budget => {
      let amount = budget.amount;
      if (amount.endsWith('.00')) {
        amount = amount.slice(0, -3);
      }

      // Assign a color based on the transaction type
      const color = '#037dff';
      const backgroundColor = color; // Assume 'budget' is a possible type

      return {
        title: `${budget.title} - $${amount}`,
        date: budget.date,
        backgroundColor, // Set the background color based on the transaction type
        borderColor: backgroundColor, // Optionally, you can also set the border color
        priority: 1
        // allDay: true if you want to mark the event as an all-day event
      };
    });
    setTransformedBudget(transformedData);
  }, [budgets]);

  useEffect(() => {
    const combineArray = [...transformedBudget, ...transformedArray];
    // Update the state with the sorted combinedArray
    setCombinedArray(combineArray);

  }, [transformedArray, transformedBudget])

  return (
    <div>
      <Fullcalendar
        plugins={[dayGridPlugin, listPlugin, interactionPlugin]}
        initialView={"dayGridMonth"}
        headerToolbar={{
          start: "today prev,next", // will normally be on the left. if RTL, will be on the right
          center: "title",
          end: "dayGridMonth,dayGridWeek,dayGridDay,listWeek", // will normally be on the right. if RTL, will be on the left
        }}
        height={"90vh"}
        events={combinedArray}
        eventTimeFormat={
          {
            hour: 'numeric',
            minute: '2-digit',
            meridiem: 'short'
          }}
        eventOrder={"priority"}
      />
    </div>
  );
}

export default TransactionPage;