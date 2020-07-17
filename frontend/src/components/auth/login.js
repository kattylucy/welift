import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../../actions/auth";

import logo from "../../assets/workouts/logo.svg";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: true
    };
  }

  login = () => {
    const data = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.login(data);
  };

  setItem = (title, e) => {
    this.setState({ [title]: e.target.value });

    if (!this.state.email || !this.state.password) {
      this.setState({ disabled: true });
    } else {
      this.setState({ disabled: false });
    }
  };

  render() {
    return (
      <div className="auth-page">
        <div
          style={{
            backgroundColor: "var(--main-green)",
            textAlign: "center",
            fontWeight: "800",
            padding: "20px"
          }}
        >
          FOR TESTING PLEASE USE<br></br>
          email: test@user.com <br></br>
          password: password
        </div>
        <Link to={"/"}>
          <div className="logo">
            <img src={logo} />
          </div>
        </Link>
        <form>
          <div className="form-wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              onChange={e => this.setItem("email", e)}
            ></input>
          </div>
          <div className="form-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={e => this.setItem("password", e)}
            ></input>
          </div>
        </form>

        <button
          className="orange-btn"
          disabled={this.state.disabled}
          onClick={this.login}
        >
          Login
        </button>
        <Link to="/signup">
          <button className="white-btn">Sign up</button>
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

export default connect(mapStateToProps, { login })(Login);
