import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as eventActions from "../../actions/eventActions";

import EventList from "./eventList";

class Event extends Component {
  constructor(props) {
    super(props);
    this.onDeleteEvent = this.onDeleteEvent.bind(this);
  }

  // eslint-disable-next-line no-unused-vars
  onDeleteEvent(eventID, e) {
    const { actions } = this.props;
    actions
      .deleteEvent(eventID)
      .then(() => console.log("notify delete success"))
      .catch(error => console.log(error));
  }

  render() {
    const { events } = this.props;
    if (!events) return null;
    return (
      <div style={{ border: "1px solid black" }}>
        <div>
          <Link to="/event/manage/">Add Event</Link>
        </div>
        <EventList events={events} onDeleteEvent={this.onDeleteEvent} />
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
