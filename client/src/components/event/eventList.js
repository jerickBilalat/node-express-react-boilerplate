import React from "react";
import EventItem from "./eventItem";

const EventList = ({ events, onDeleteEvent, deleting }) => (
  <ul>
    {events.map(event => (
      <EventItem
        key={event._id}
        {...event}
        onDeleteEvent={onDeleteEvent}
        deleting={deleting}
      />
    ))}
  </ul>
);

export default EventList;
