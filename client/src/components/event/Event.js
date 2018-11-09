import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as eventActions from "../../actions/eventActions";

import EventList from "./eventList";

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleting: false
    };
    this.onDeleteEvent = this.onDeleteEvent.bind(this);
  }

  componentDidMount() {
    const { actions } = this.props;
    actions.fetchEvents();
  }

  // eslint-disable-next-line no-unused-vars
  onDeleteEvent(eventID, e) {
    const { actions, notify } = this.props;
    actions
      .deleteEvent(eventID)
      .then(() => notify("success", "Event deleted."))
      .catch(error => {
        notify("error", "Delete event failed.");
        throw error;
      });
  }

  render() {
    const { events } = this.props;
    const { deleting } = this.state;
    if (!events) return null;
    return (
      <div style={{ border: "1px solid black" }}>
        <div>
          <Link to="/event/manage/">Add Event</Link>
        </div>
        <EventList
          events={events}
          onDeleteEvent={this.onDeleteEvent}
          deleting={deleting}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    events: state.eventReducer,
    ajaxCalls: state.ajaxReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(eventActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Event);
