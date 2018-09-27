import React from "react";
import { Link } from "react-router-dom";

const EventItem = ({
  id,
  title,
  author,
  authorRole,
  body,
  createdAt,
  onDeleteEvent,
  deleting
}) => (
  <li>
    <h4>
      <Link to={`/event/manage/${id}`}>{title}</Link>
    </h4>
    <span>
      <Link to={`/event/manage/${id}`}>Edit</Link>
    </span>
    <span>
      <input
        type="button"
        value={deleting ? "Deleting..." : "Delete"}
        onClick={e => onDeleteEvent(id, e)}
      />
    </span>
    <span>{id}</span>
    <p>{body}</p>
    <p>
      <span>By:</span>
      <span>
        {author}
        {authorRole}
      </span>
    </p>
    <p>
      <span>Created At:</span>
      <span>{createdAt}</span>
    </p>
  </li>
);

export default EventItem;
