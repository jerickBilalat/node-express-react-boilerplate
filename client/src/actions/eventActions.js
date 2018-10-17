import axios from "axios";
import * as types from "./actionTypes";
import { beginAjaxCall, ajaxCallError } from "./ajaxActions";

export function fetchEventsSuccess(events) {
  return { type: types.LOAD_EVENTS_SUCCESS, events };
}

export function createEventSuccess(event) {
  return { type: types.CREATE_EVENT_SUCCESS, event };
}

export function updateEventSuccess(event) {
  return { type: types.UPDATE_EVENT_SUCCESS, event };
}

export function deleteEventSuccess(eventID) {
  return { type: types.DELETE_EVENT_SUCCESS, eventID };
}

export function fetchEvents() {
  return dispatch => {
    dispatch(beginAjaxCall());
    return axios
      .get("http://localhost:9000/api/events")
      .then(res => {
        dispatch(fetchEventsSuccess(res.data));
      })
      .catch(err => {
        dispatch(ajaxCallError());
        throw err;
      });
  };
}

export function createEvent(newEvent) {
  return dispatch => {
    dispatch(beginAjaxCall);
    return axios
      .post("http://localhost:9000/api/events", newEvent)
      .then(res => {
        dispatch(createEventSuccess(res.data));
      })
      .catch(err => {
        dispatch(ajaxCallError());
        throw err.response;
      });
  };
}

export function updateEvent(event) {
  return dispatch => {
    dispatch(beginAjaxCall);
    return axios
      .put(`http://localhost:9000/api/events/${event._id}`, event)
      .then(res => {
        dispatch(updateEventSuccess(res.data));
      })
      .catch(err => {
        dispatch(ajaxCallError());
        throw err;
      });
  };
}

export function deleteEvent(eventID) {
  return dispatch => {
    dispatch(beginAjaxCall);
    return axios
      .delete(`http://localhost:9000/api/events/${eventID}`)
      .then(response => dispatch(deleteEventSuccess(response.data._id)))
      .catch(error => {
        dispatch(ajaxCallError());
        throw error;
      });
  };
}
