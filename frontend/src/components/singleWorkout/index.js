import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  getworkout,
  likeWorkout,
  commentWorkout,
  dislikeWorkout
} from "../../actions/workoutactions";
import { exerciseType } from "../../data/select";
//components
import Modal from "../modal/index";
import Header from "../header/index";
//assets and css
import "../../style/workouts.css";
import comments from "../../assets/workouts/comment.svg";
import like from "../../assets/workouts/like.svg";
import liked from "../../assets/workouts/liked.svg";
import difficulty from "../../assets/workouts/difficulty.svg";
import equip from "../../assets/workouts/equip.svg";
import muscle from "../../assets/workouts/muscle.svg";
import energy from "../../assets/workouts/energy.svg";
import grip2 from "../../assets/workouts/strip2.png";

class Workout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false
    };
  }

  componentDidMount() {
    this.props.getworkout(this.props.match.params.id);
  }

  closeModal = () => {
    this.setState({ showModal: false });
  };

  addComment = () => {
    const workoutid = this.props.workout._id;
    if (localStorage.id) {
      this.props.commentWorkout(workoutid, this.state.comment);
      this.setState({ comment: "" });
    } else {
      this.setState({ showModal: true });
    }
  };

  likeWorkout = () => {
    const workoutid = this.props.workout._id;
    const likedByCurrentUser = this.props.workout.likes_count
      ? this.props.workout.likes_count.user_ids.includes(localStorage.id)
        ? true
        : false
      : null;
    if (localStorage.id) {
      if (likedByCurrentUser) {
        this.props.dislikeWorkout(workoutid, "single");
      } else {
        this.props.likeWorkout(workoutid, "single");
      }
    } else {
      this.setState({ showModal: true });
    }
  };

  render() {
    const user = localStorage.id;
    const workout = this.props.workout;
    const userid = localStorage.id;
    const imageSrc = workout
      ? exerciseType.filter(item =>
          item.name === workout.type ? item.url : null
        )[0].url
      : null;
    return (
      <React.Fragment>
        <Header />
        <div>
          {this.props.workout ? (
            <div className="single-workout">
              <div className="sw-header">
                <h1>{workout.type}</h1>
                <img src={imageSrc} alt="workout" />
              </div>
              <div className="workout-details">
                <p
                  style={{
                    fontWeight: "bold",
                    textAlign: "right",
                    padding: "10px"
                  }}
                >
                  Posted by{" "}
                  <span
                    style={{
                      color: "var(--main-green)",
                      fontWeight: "800",
                      textTransform: "capitalize"
                    }}
                  >
                    {workout.author_visible
                      ? workout.workout_author.username
                      : "anonymous"}
                  </span>
                </p>
                <h1>{workout.workout_name}</h1>
                <div className="workout-types">
                  <img src={difficulty} alt="difficulty of the workout" />
                  {workout.difficulty === 1 || workout.difficulty === 2 ? (
                    <p>Beginner</p>
                  ) : null}
                  {workout.difficulty === 3 || workout.difficulty === 4 ? (
                    <p>Intermediate</p>
                  ) : null}
                  {workout.difficulty === 5 ? <p>Advanced</p> : null}
                </div>
                <div className="workout-types">
                  <img src={equip} alt="equipment for the workout" />
                  {workout.required_equipment.map((item, index) => (
                    <p key={index} style={{ marginLeft: "5px" }}>
                      {item}
                      {index === workout.required_equipment.length - 1
                        ? null
                        : ","}
                    </p>
                  ))}
                </div>
                <div className="workout-types">
                  <img src={muscle} alt="muscle group for the workout" />
                  {workout.muscle_group.map((item, index) => (
                    <p key={index} style={{ marginLeft: "5px" }}>
                      {item}
                      {index === workout.muscle_group.length - 1 ? null : ","}
                    </p>
                  ))}
                </div>
                <div className="workout-types">
                  <img src={energy} alt="focus for the workout" />
                  {workout.workout_focus.map((item, index) => (
                    <p key={index} style={{ marginLeft: "5px" }}>
                      {item}
                      {index === workout.workout_focus.length - 1 ? null : ","}
                    </p>
                  ))}
                </div>
                <div className="workout-description">
                  <p>{workout.workout_description.details}</p>
                  <p>Exercises to follow:</p>
                  <ul>
                    {workout.workout_description.exercises.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
                <hr></hr>
                <div className="workout-media-wrapper">
                  <div className="workout-media">
                    <img src={comments} alt="workout commenting" />
                    <div>
                      <p>
                        {workout.comments
                          ? workout.comments.total_comments
                          : "0"}{" "}
                        comments
                      </p>
                    </div>
                  </div>
                  <div className="workout-media" onClick={this.likeWorkout}>
                    <img
                      src={
                        workout.likes_count
                          ? workout.likes_count.user_ids.includes(userid)
                            ? liked
                            : like
                          : like
                      }
                      alt="likes on the workout"
                    />
                    <div>
                      <p>
                        {workout.likes_count ? workout.likes_count.likes : "0"}{" "}
                        Likes
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          <img
            src={grip2}
            alt="string separating"
            style={{ width: "100%", height: "25px" }}
          />
          <div className="comments">
            <h3>Comments</h3>
            {this.props.workout && workout.comments ? (
              <div className="comments-iteration">
                {workout.comments.comments.map(item => {
                  return (
                    <div className="each-comment" key={item._id}>
                      <div>{item.user.username.slice(0, 1)}</div>
                      <p>{item.comment}</p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div>No comments yet</div>
            )}
            {user ? (
              <div style={{ padding: "50px 0px 30px" }}>
                <label htmlFor="comment">Make a comment</label>
                <textarea
                  type="text"
                  id="comment"
                  onChange={e => this.setState({ comment: e.target.value })}
                ></textarea>
                <button onClick={this.addComment}>Add Comment</button>
              </div>
            ) : null}
          </div>
        </div>

        <Modal show={this.state.showModal} onClose={this.closeModal}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "20px"
            }}
          >
            <div>
              <p style={{ fontSize: "20px", fontWeight: "800" }}>
                Like this workout?
              </p>
              <p>Sign in and get the full experience</p>
            </div>
            <Link to={"/signin"} style={{ alignSelf: "center" }}>
              <button
                className="orange-btn"
                style={{ width: "250px", height: "40px" }}
              >
                Sign in
              </button>
            </Link>
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    workout: state.workouts.workout
  };
};

export default connect(mapStateToProps, {
  getworkout,
  likeWorkout,
  commentWorkout,
  dislikeWorkout
})(Workout);
