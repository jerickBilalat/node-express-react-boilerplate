import React from "react";
import requireAuth from "./hocs/requireAuthHOC";

import EventComponent from "./event/Event";

const Dashboard = () => (
  <div>
    <h1>Dashboard</h1>
    <EventComponent />
  </div>
);

export default requireAuth(Dashboard);
