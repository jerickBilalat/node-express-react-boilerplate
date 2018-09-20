import React from "react";
import { Link } from "react-router-dom";

const EventItem = ({
  id,
  title,
  author,
  authorRole,
  body,
  createdAt,
  onDeleteEvent
}) => (
  <li>
    <h4>
      <Link to={`/event/manage/${id}`}>{title}</Link>
    </h4>    {" "}
    |    {" "}
    <span>
      <Link to={`/event/manage/${id}`}>Edit</Link>
    </span>    {" "}
    |    {" "}
    <span>
      <button onClick={e => onDeleteEvent(id, e)}>Delete</button>
    </span>    {" "}
    |     <span>{id}</span>
    <p>{body}</p>
    <p>
      By      {" "}
      <span>
        {author} |         {authorRole}
      </span>
    </p>
    <p>
      Created at:       <span>{createdAt}</span>
    </p>
  </li>
);

export default EventItem;
