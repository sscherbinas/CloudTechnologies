import React, { Component } from "react";

import API from "./helpers/api";
import List from "./components/List";
import AddForm from "./components/AddForm";
import "./styles/main.scss";

class App extends Component {
  state = {
    items: []
  };

  componentDidMount() {
    API.get("robot").then(data => {
      this.setState({
        items: data.robots
      });
    });
  }

  handleDelete = id => {
    API.delete("robot", id)
      .then(() => {
        return API.get("robot");
      })
      .then(data => {
        this.setState({
          items: data.robots
        });
      });
  };

  addForm = robot => {
    API.post("robot", robot)
      .then(data => {
        console.log("Server data", data);

        return API.get("robot");
      })
      .then(data => {
        this.setState({
          items: data.robots
        });
      });
  };

  render() {
    console.log(this.state.items);
    return (
      <div className="App">
        <div className="content__container">
          <AddForm addForm={this.addForm} />
          <List items={this.state.items} handleDelete={this.handleDelete} />
        </div>
      </div>
    );
  }
}

export default App;
