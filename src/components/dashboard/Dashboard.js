import React from "react";
import ActiveSprint from "./ActiveSprint";
import MessageBoard from "./MessageBoard";
import Navbar from "../Navbar";
import Backlog from "./Backlog";
import Sidebar from "../Sidebar";
import StoryModal from '../StoryModal';

class Dashboard extends React.Component {
  render() {
    console.log(this.props);
    switch (this.props.match.params.dashboard) {
      case "backlog":
        return (
          <>
            <Navbar activeTab="Backlog" />
            <Sidebar activeTab="Backlog" />
            <Backlog />
            <StoryModal/>
          </>
        );
      case "active":
        return (
          <>
            <Navbar activeTab="Active" />
            <Sidebar activeTab="Active" />
            <ActiveSprint />
          </>
        );
      case "board":
        return (
          <>
            <Navbar activeTab="Board" />
            <Sidebar activeTab="Board" />
            <MessageBoard />
          </>
        );
      default:
        return <div>Page not found - Error 404</div>;
    }
  }
}

export default Dashboard;
