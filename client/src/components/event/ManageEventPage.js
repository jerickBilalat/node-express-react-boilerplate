import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as eventActions from "../../actions/eventActions";
import InputText from "../common/textInput";
import requireAuth from "../hocs/requireAuthHOC";

class ManageEventPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: { ...props.event },
      errors: {},
      saving: false
    };
    this.updateEventState = this.updateEventState.bind(this);
    this.saveEvent = this.saveEvent.bind(this);
  }

  // handle  input onChange
  updateEventState(e) {
    const { event: currentEvent } = this.state;
    const field = e.target.name;
    const event = { ...currentEvent };
    event[field] = e.target.value;
    return this.setState({ event });
  }

  // handle form onSave
  saveEvent(e) {
    const { actions } = this.props;
    const { event } = this.state;
    e.preventDefault();
    if (!this.eventFormIsValid()) return;

    this.setState({ saving: true });

    actions
      .saveEvent(event)
      .then(() => {
        this.redirect();
      })
      .catch(error => {
        // notify error
        console.log(error);
        this.setState({ saving: false });
      });
  }

  redirect() {
    const { history } = this.props;
    this.setState({ saving: false });
    // notify success
    return history.push("/");
  }

  eventFormIsValid() {
    let isFormValid = true;
    const errors = {};
    const { event } = this.state;

    if (event.title.length < 3) {
      errors.title = "Title must be more than 3 characters";
      isFormValid = false;
    }

    this.setState({ errors });
    return isFormValid;
  }

  render() {
    const { event, errors, saving } = this.state;
    return (
      <div style={{ border: "1px solid black" }}>
        <form>
          <InputText
            label="Title"
            name="title"
            value={event.title}
            onChange={this.updateEventState}
            error={errors.title}
          />
          <InputText
            label="Body"
            name="body"
            value={event.body}
            onChange={this.updateEventState}
            error={errors.body}
          />
          <input
            type="submit"
            value={saving ? "Saving..." : "Save"}
            onClick={this.saveEvent}
          />
        </form>
      </div>
    );
  }
}

function getEventByID(events, id) {
  const event = events.filter(item => item.id === id);
  if (event) return event[0];
  return null;
}

function mapStateToProps(state, ownProps) {
  const events = state.eventReducer;
  const eventID = ownProps.match.params.id;
  let event = {
    id: "",
    title: "",
    body: "",
    author: "Auth User name",
    authorRole: "Auth User role",
    createdAt: ""
  };
  if (eventID && events.length > 0) {
    event = getEventByID(events, eventID);
  }
  return {
    events,
    event
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
)(requireAuth(ManageEventPage));
