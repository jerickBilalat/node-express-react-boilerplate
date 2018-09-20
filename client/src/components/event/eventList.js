import React from "react";
import EventItem from "./eventItem";

const EventList = ({ events, onDeleteEvent }) => (
  <ul>
    {events.map(event => (
      <EventItem key={event.id} {...event} onDeleteEvent={onDeleteEvent} />
    ))}
  </ul>
);

export default EventList;
