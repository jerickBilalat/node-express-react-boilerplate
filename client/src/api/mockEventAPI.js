/* eslint no-param-reassign: 0 */
/* eslint no-unused-vars: 0 */

import delay from "./delay";

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const events = [
  {
    id: "0",
    title: "Putlock Sunday",
    body: "Bring food to share",
    author: "Jane Doe",
    authorRole: "Administrator",
    createdAt: "1536592953966"
  },
  {
    id: "1",
    title: "Gameday Sunday",
    body: "Get ready",
    author: "Jane Doe",
    authorRole: "Administrator",
    createdAt: "1536592953966"
  },
  {
    id: "2",
    title: "Prayer Meeting",
    body: "Prayer Meeting every Wenesday from 7pm to 8pm",
    author: "Jane Doe",
    authorRole: "Administrator",
    createdAt: "1536592953966"
  }
];

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, "g"), replace);
}

// This would be performed on the server in a real app. Just stubbing in.
const generateId = event => replaceAll(event.title, " ", "-");

class EventApi {
  static getAllEvents() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], events));
      }, delay);
    });
  }

  static saveEvent(event) {
    event = Object.assign({}, event); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minEventTitleLength = 1;
        if (event.title.length < minEventTitleLength) {
          reject(`Title must be at least ${minEventTitleLength} characters.`); // eslint-disable-line prefer-promise-reject-errors
        }

        if (event.id) {
          const existingEventIndex = events.findIndex(a => a.id === event.id);
          events.splice(existingEventIndex, 1, event);
        } else {
          // Just simulating creation here.
          // Cloning so copy returned is passed by value rather than by reference.
          event.id = generateId(event);
          event.body = `http://www.pluralsight.com/events/${event.id}`;
          events.push(event);
        }

        resolve(event);
      }, delay);
    });
  }

  static deleteEvent(eventId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfEventToDelete = events.findIndex(
          event => event.eventId === eventId
        );
        events.splice(indexOfEventToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default EventApi;
