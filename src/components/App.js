import React from "react";
import Backlog from "./dashboard/Backlog";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

class App extends React.Component {
  render() {
    return (
      <div>
        <Sidebar />
        <Navbar />
       </div>
      );
  }
}

export default App;
