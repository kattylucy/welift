import React, { Component } from "react";
import Header from "../header/index";
//components
import Workouts from "../workouts";
//assets
import grip from "../../assets/workouts/grip.png";
class MainPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: false
    };
  }

  componentDidMount() {
    const id = localStorage.getItem("id");
    if (id) {
      this.setState({ user: true });
    }
  }

  render() {
    return (
      <React.Fragment>
        <Header user={this.state.user} />

        <div className="main-page">
          <div className="banner">
            <h1>WeLift</h1>
            <p>We are a platform for workout collaboration</p>
          </div>
          <img
            src={grip}
            alt="string separating"
            style={{ width: "100%", height: "25px" }}
          />

          <Workouts />
        </div>
      </React.Fragment>
    );
  }
}

export default MainPage;
