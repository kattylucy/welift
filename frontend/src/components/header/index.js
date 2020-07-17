import React, { Component } from "react";
import { Link } from "react-router-dom";
import onClickOutside from "react-onclickoutside";
///css and assets
import "../../style/mainpage.css";
import burger from "../../assets/workouts/gym.png";
import burgerselected from "../../assets/workouts/gymselected.png";
import logo from "../../assets/workouts/logo.svg";
import grip from "../../assets/workouts/grip.png";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggle: false,
      settings: false
    };
  }

  logout = () => {
    localStorage.clear();
  };

  handleClickOutside = evt => {
    this.setState({ settings: false });
  };

  render() {
    const user = localStorage.id ? true : false;
    const username = localStorage.getItem("username");
    return (
      <React.Fragment>
        <div
          style={{
            textAlign: "center",
            fontWeight: "800",
            padding: "20px"
          }}
        >
          FOR TESTING PLEASE USE<br></br>
          email: test@user.com <br></br>
          password: password
        </div>
        <div className="green-banner">
          {user ? (
            <Link to="/" onClick={this.logout}>
              Logout
            </Link>
          ) : (
            <Link to="/signin">Login</Link>
          )}
        </div>

        <div className="header">
          <div className="toggle-header">
            <Link to={"/"}>
              <div className="header-logo">
                <img src={logo} alt="logo we lift" />
              </div>
            </Link>
            <img
              src={this.state.toggle ? burgerselected : burger}
              alt="open menu"
              className="toggle"
              onClick={() => this.setState({ toggle: !this.state.toggle })}
            />
          </div>
          <div className="header-mobile">
            <div
              className={
                this.state.toggle
                  ? "closed-header open-header"
                  : "closed-header"
              }
            >
              {!user ? (
                <React.Fragment>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center"
                    }}
                  >
                    <Link to={`/`}>Workouts</Link>
                    <Link
                      to={`/signup`}
                      style={{
                        border: "3px solid var(--main-green)",
                        margin: "0px 30% "
                      }}
                    >
                      Sign up
                    </Link>
                    <div>
                      <p
                        style={{ color: "white" }}
                        onClick={() =>
                          this.setState({ settings: !this.state.settings })
                        }
                      >
                        {username}
                      </p>
                      {this.state.settings ? (
                        <p className="logout" onClick={this.logout}>
                          Logout
                        </p>
                      ) : null}
                    </div>
                  </div>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <div>
                    <Link to="/">Workouts</Link>
                    <Link to={"/createworkout"}>Create</Link>
                    <Link to={`/profile`}>Profile</Link>
                  </div>
                </React.Fragment>
              )}
            </div>
          </div>
          {user ? (
            <React.Fragment>
              <div className="header-desktop">
                <div>
                  <Link to={"/"}>Workouts</Link>
                  <Link to={`/createworkout`}>Create</Link>
                  <Link to={`/profile`}>Profile</Link>
                </div>
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div className="header-desktop">
                <div>
                  <Link to={"/"} style={{ marginTop: "3px" }}>
                    Workouts
                  </Link>
                  <Link
                    to={`/signup`}
                    style={{
                      border: "3px solid var(--main-green)",
                      padding: "0px 5px"
                    }}
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </React.Fragment>
          )}
        </div>
        <img
          src={grip}
          alt="string separating"
          style={{ width: "100%", height: "25px" }}
        />
      </React.Fragment>
    );
  }
}

export default onClickOutside(Header);
