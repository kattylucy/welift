import React, { Component } from "react";
import { connect } from "react-redux";
import history from "../../history";
import { getworkouts } from "../../actions/workoutactions";
import { exerciseType } from "../../data/select";
//assets and css
import "../../style/workouts.css";
import comments from "../../assets/workouts/commentmain.png";
import like from "../../assets/workouts/likedmain.png";

class Workouts extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.getworkouts();
  }
  go = id => {
    history.push(`/workout/${id}`);
  };
  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    return this.props.workouts ? (
      <div className="workouts-wrapper">
        {this.props.workouts.length ? (
          this.props.workouts.map(item => {
            const background = exerciseType.filter(data =>
              data.name === item.type ? data.url : null
            )[0].url;
            return (
              <div
                className="workout-card"
                style={{ backgroundImage: `url(${background})` }}
                key={item._id}
              >
                <div
                  className="hover-overlay"
                  onClick={() => this.go(item._id)}
                >
                  <div className="workout-name">
                    <h1>{item.workout_name}</h1>
                    <h5>{item.type}</h5>
                  </div>
                  <div className="workout-social">
                    <div>
                      <p>
                        {item.comments ? item.comments.total_comments : "0"}{" "}
                        comments
                      </p>
                      <img src={comments} alt="total workout comments" />
                    </div>
                    <div>
                      <p>
                        {item.likes_count ? item.likes_count.likes : "0"} likes
                      </p>
                      <img src={like} alt="total workout likes" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>no workouts at this moment</p>
        )}
      </div>
    ) : null;
  }
}

const mapStateToProps = state => {
  return {
    workouts: state.workouts.workouts
  };
};

export default connect(mapStateToProps, {
  getworkouts
})(Workouts);
