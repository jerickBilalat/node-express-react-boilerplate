import * as types from "./actionTypes";
import { beginAjaxCall, ajaxCallError } from "./ajaxActions";
import eventAPI from "../api/mockEventAPI";

export function loadEventsSuccess(events) {
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

export function loadEvents() {
  return dispatch => {
    dispatch(beginAjaxCall());
    return eventAPI
      .getAllEvents()
      .then(events => {
        dispatch(loadEventsSuccess(events));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function saveEvent(event) {
  return dispatch => {
    dispatch(beginAjaxCall);
    return eventAPI
      .saveEvent(event)
      .then(savedEvent => {
        event.id // eslint-disable-line no-unused-expressions
          ? dispatch(updateEventSuccess(savedEvent)) // eslint-disable-line no-unused-expressions
          : dispatch(createEventSuccess(savedEvent)); // eslint-disable-line no-unused-expressions
      })
      .catch(error => {
        dispatch(ajaxCallError(error));
        throw error;
      });
  };
}

export function deleteEvent(eventID) {
  return dispatch => {
    dispatch(beginAjaxCall);
    return eventAPI
      .deleteEvent(eventID)
      .then(() => dispatch(deleteEventSuccess(eventID)))
      .catch(error => {
        dispatch(ajaxCallError(error));
        throw error;
      });
  };
}
