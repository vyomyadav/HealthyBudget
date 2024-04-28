import React, { } from 'react';
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import './transaction.css';

function TransactionPage() {

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
        events={[
          { title: 'event1', 
          start: '2024-04-27T12:30:00.000Z', 
          allDay: false},
          { title: 'event2', 
          start: '2024-04-27T14:30:00.000Z', 
          allDay: false},
          { title: 'event3', 
          start: '2024-04-27T16:30:00.000Z', 
          allDay: false},
          { title: 'event4', 
          start: '2024-04-27T18:30:00.000Z', 
          allDay: false}
        ]}
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