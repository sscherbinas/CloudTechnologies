import React, { Component } from "react";

import CustomInput from "./CustomInput";

const emptyState = {
  name: "",
  code: 0,
  time: "",
  trajectory: ""
};

class AddForm extends Component {
  state = { ...emptyState };

  onSubmit = e => {
    e.preventDefault();
    this.props.addForm(this.state);
    this.setState({ ...emptyState });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { name, code, time, trajectory } = this.state;

    return (
      <React.Fragment>
        <form onSubmit={this.onSubmit} className="add-panel__container">
          <div>
            <CustomInput name="name" value={name} onChange={this.onChange} />
            <CustomInput
              name="code"
              value={code}
              type="number"
              onChange={this.onChange}
            />
          </div>
          <div>
            <CustomInput name="time" value={time} onChange={this.onChange} />
            <CustomInput
              name="trajectory"
              value={trajectory}
              onChange={this.onChange}
            />
          </div>
          <input
            className="add-panel__submit"
            type="submit"
            value="Add robot"
          />
        </form>
      </React.Fragment>
    );
  }
}

export default AddForm;
