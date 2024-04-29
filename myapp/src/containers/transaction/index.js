import React, { useState, useEffect } from 'react';
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { useGlobalContext } from '../../components/context/globalContext';
import './transaction.css';

function TransactionPage() {

  const {
      transactions,
      getTransactions
  } = useGlobalContext()

  const [transformedArray, setTransformedArray] = useState([]);


  useEffect(() => {
    getTransactions(); // Fetch all transactions on component mount
  }, [])

    useEffect(() => {
      const transformedData = transactions.map(transaction => {
        let amount = transaction.amount;
        // Check if amount has .00 and remove it if it does
        if (amount.endsWith('.00')) {
          amount = amount.slice(0, -3);
        }
        return {
          title: `${transaction.title} - $${amount}`,
          date: transaction.date,
          // allDay: true
        }});
      setTransformedArray(transformedData);
    }, [transactions])
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
        // events={[
        //   { title: 'event1', 
        //   start: '2024-04-29T12:30:00.000Z', 
        //   allDay: false},
        //   { title: 'event2', 
        //   start: '2024-04-29T14:30:00.000Z', 
        //   allDay: false},
        //   { title: 'event3', 
        //   start: '2024-04-29T16:30:00.000Z', 
        //   allDay: false},
        //   { title: 'event4', 
        //   start: '2024-04-29T18:30:00.000Z', 
        //   allDay: false}
        // ]}
        events= {transformedArray}
        eventTimeFormat={
          { 
            hour: 'numeric',
            minute: '2-digit',
            meridiem: 'short'
        }}
      />
    </div>
  );
}

export default TransactionPage;