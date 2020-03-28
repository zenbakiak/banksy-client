import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: ""
    };
  }
  componentWillMount() {
    return this.props.loggedInStatus ? this.redirect() : null;
  }
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;
    let user = {
      email: email,
      password: password
    };

    axios
      .post(
        "http://localhost:3001/sessions",
        { user },
        { withCredentials: true }
      )
      .then(response => {
        if (response.data) {
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
    const { email, password } = this.state;
    return (
      <React.Fragment>
        <Navbar />
        <div className="session-form">
          <h1>Log In</h1>
          <form onSubmit={this.handleSubmit}>
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
            <button placeholder="submit" type="submit">
              Log In
            </button>
            <div>
              or <Link to="/signup">sign up</Link>
            </div>
          </form>
          <div>{this.state.errors ? this.handleErrors() : null}</div>
        </div>
      </React.Fragment>
    );
  }
}
export default Login;
