import React, { Component } from "react";
import { connect } from "react-redux";
import { signup } from "../../actions/auth";
import { Link } from "react-router-dom";

import logo from "../../assets/workouts/logo.svg";

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: true,
      errorPassword: false
    };
  }

  create = () => {
    if (this.state.password === this.state.password2) {
      const data = {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      };
      this.props.signup(data);
    } else {
      this.setState({ errorPassword: true });
    }
  };

  setItem = (title, e) => {
    this.setState({ [title]: e.target.value });
    if (this.state.password && this.state.username && this.state.email) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  };

  render() {
    return (
      <div className="auth-page">
        <Link to={"/"}>
          <div className="logo">
            <img src={logo} />
          </div>
        </Link>
        <form>
          {this.state.errorPassword ? (
            <p
              style={{
                color: "var(--alert-red)",
                padding: "10px",
                textAlign: "center"
              }}
            >
              Password dont match
            </p>
          ) : null}
          <div className="form-wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              onChange={e => this.setItem("email", e)}
            ></input>
          </div>
          <div className="form-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              onChange={e => this.setItem("username", e)}
            ></input>
          </div>
          <div className="form-wrapper">
            <label htmlFor="passwordOne">Password</label>
            <input
              type="password"
              id="passwordOne"
              onChange={e => this.setItem("password", e)}
            ></input>
          </div>
          <div className="form-wrapper">
            <label htmlFor="passwordTwo">Repeat Password</label>
            <input
              type="password"
              id="passwordTwo"
              onChange={e => this.setItem("password2", e)}
            ></input>
          </div>
        </form>

        <button
          className="orange-btn"
          disabled={this.state.disabled}
          onClick={this.create}
        >
          Create
        </button>
        <Link to="/signin">
          <button className="white-btn">Login</button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.auth
  };
};

export default connect(mapStateToProps, { signup })(SignUp);
