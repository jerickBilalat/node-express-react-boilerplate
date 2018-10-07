import React from "react";
import { Link } from "react-router-dom";

const EventItem = ({
  _id,
  title,
  author,
  authorRole,
  body,
  createdOn,
  onDeleteEvent,
  deleting
}) => (
  <li>
    <h4>
      <Link to={`/event/manage/${_id}`}>{title}</Link>
    </h4>
    <span>
      <Link to={`/event/manage/${_id}`}>Edit</Link>
    </span>
    <span>
      <input
        type="button"
        value={deleting ? "Deleting..." : "Delete"}
        onClick={e => onDeleteEvent(_id, e)}
      />
    </span>
    <span>{_id}</span>
    <p>{body}</p>
    <p>
      <span>
        {author}
        {authorRole}
      </span>
    </p>
    <p>
      <span>Created At:</span>
      <span>{createdOn}</span>
    </p>
  </li>
);

export default EventItem;
