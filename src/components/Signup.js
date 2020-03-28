import React, { Component } from "react";
import Navbar from "./Navbar";
import axios from "axios";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
      errors: ""
    };
  }
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    const {
      username,
      first_name,
      last_name,
      email,
      password,
      password_confirmation
    } = this.state;
    let user = {
      username,
      first_name,
      last_name,
      email,
      password,
      password_confirmation
    };
    axios
      .post("http://localhost:3001/users", { user }, { withCredentials: true })
      .then(response => {
        if (response.data.data.id) {
          this.props.handleLogin(response.data.data);
          this.redirect();
        } else {
          this.setState({
            errors: response.data.errors
          });
        }
      })
      .catch(error => console.log("api errors:", error));
  };
  redirect = () => {
    this.props.history.push("/");
  };
  handleErrors = () => {
    return (
      <div>
        <ul>
          {this.state.errors.map(error => {
            return <li key={error}>{error}</li>;
          })}
        </ul>
      </div>
    );
  };
  render() {
    const {
      username,
      first_name,
      last_name,
      email,
      password,
      password_confirmation
    } = this.state;
    return (
      <React.Fragment>
        <Navbar />

        <div className="session-form">
          <h1>Sign Up</h1>
          <form onSubmit={this.handleSubmit}>
            <input
              className="block"
              placeholder="username"
              type="text"
              name="username"
              value={username}
              onChange={this.handleChange}
            />
            <input
              className="block"
              placeholder="first_name"
              type="text"
              name="first_name"
              value={first_name}
              onChange={this.handleChange}
            />
            <input
              className="block"
              placeholder="last_name"
              type="text"
              name="last_name"
              value={last_name}
              onChange={this.handleChange}
            />
            <input
              className="block"
              placeholder="email"
              type="text"
              name="email"
              value={email}
              onChange={this.handleChange}
            />
            <input
              className="block"
              placeholder="password"
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
            />
            <input
              className="block"
              placeholder="password confirmation"
              type="password"
              name="password_confirmation"
              value={password_confirmation}
              onChange={this.handleChange}
            />

            <button placeholder="submit" type="submit">
              Sign Up
            </button>
          </form>
          <div>{this.state.errors ? this.handleErrors() : null}</div>
        </div>
      </React.Fragment>
    );
  }
}
export default Signup;
