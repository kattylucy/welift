import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Header from "../header/index";
import { getUser } from "../../actions/userAction";
import { getMyWorkouts, deleteWorkout } from "../../actions/workoutactions";
import Moment from "react-moment";
import Modal from "../modal";
//components
import avatar from "../../assets/avatar.svg";
import loading from "../../assets/creating.gif";

class MyWorkouts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: false,
      tab: "workout"
    };
  }

  componentDidMount() {
    this.props.getMyWorkouts();
  }

  delete = id => {
    this.setState({ modal: true, workoutid: id });
  };

  deleteworkout = () => {
    this.setState({ deleting: true });
    this.props.deleteWorkout(this.state.workoutid);

    setTimeout(() => {
      this.setState({ deleting: false, modal: false });
    }, 2000);
  };

  closeModal = () => {
    this.setState({ modal: false });
  };

  selectTab = title => {
    this.setState({ tab: title });
  };

  render() {
    return (
      <React.Fragment>
        <Header user={this.state.user} />
        <div style={{ backgroundColor: "white", height: "100vh" }}>
          <div className="mypage">
            <div className="banner"></div>

            <div className="mp-header">
              <div className="profile-picture">
                <p>{localStorage.username.slice(0, 1)}</p>
              </div>

              <div>
                <p>{localStorage.username}</p>
                <p>{localStorage.email}</p>
              </div>
            </div>
            <div className="tabs">
              <p
                onClick={() => this.selectTab("workout")}
                className={this.state.tab === "workout" ? "selected-tab" : null}
              >
                My Workouts
              </p>
              <p
                onClick={() => this.selectTab("credentials")}
                className={
                  this.state.tab === "credentials" ? "selected-tab" : null
                }
              >
                Update Credentials
              </p>
            </div>

            {this.props.workouts.length && this.state.tab === "workout" ? (
              this.props.workouts.map(item => {
                const date = item.date;
                return (
                  <div className="mp-workout-card" key={item.id}>
                    <Link to={`/workout/${item._id}`}>
                      <p style={{ fontSize: "20px" }}>{item.workout_name}</p>
                    </Link>
                    <p
                      style={{
                        color: "rgb(220, 53, 69)",
                        textAlign: "right",
                        cursor: "pointer"
                      }}
                      onClick={() => this.delete(item._id)}
                    >
                      Delete Workout
                    </p>
                    <p
                      style={{
                        color: "black",
                        fontSize: "13px",
                        textAlign: "right"
                      }}
                    >
                      Created{" "}
                      <Moment fromNow ago>
                        {date}
                      </Moment>
                    </p>
                  </div>
                );
              })
            ) : (
              <div style={{ textAlign: "center", fontSize: "20px" }}>
                You haven't create any workout, create your first workout{" "}
                <Link to="/createworkout" style={{ color: "var(--blueish)" }}>
                  HERE
                </Link>
              </div>
            )}
          </div>
        </div>

        <Modal show={this.state.modal} onClose={this.closeModal}>
          {this.state.deleting ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "20px"
              }}
            >
              <img
                src={loading}
                alt="your workout is being created"
                style={{ alignSelf: "center", width: "70px", height: "70px" }}
              />
              <p>Deleting your workout...</p>
            </div>
          ) : (
            <div className="delete-workout">
              <h3>Delete Workout</h3>
              <div>
                <p>
                  Your workout helps the community <br></br> are you sure you
                  want to delete it?
                </p>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button
                  style={{
                    backgroundColor: "rgb(220, 53, 69)",
                    color: "white"
                  }}
                  onClick={this.deleteworkout}
                >
                  Delete
                </button>
                <button onClick={this.closeModal}>Cancel</button>
              </div>
            </div>
          )}
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    workouts: state.workouts.my_workouts
  };
};

export default connect(mapStateToProps, {
  getUser,
  getMyWorkouts,
  deleteWorkout
})(MyWorkouts);
