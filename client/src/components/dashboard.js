import React from "react";
import requireAuth from "./hocs/requireAuthHOC";

import EventComponent from "./event/Event";

const Dashboard = props => (
  <div>
    <h1>Dashboard</h1>
    <EventComponent notify={props.notify} />
  </div>
);

export default requireAuth(Dashboard);
