import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getworkout, likeWorkout, commentWorkout } from '../../actions/workoutactions';
import { exerciseType } from '../../data/select';
import Rating from '../sharedComponents/rating';
//components
import Modal from '../modal/index';
import Header from '../header/index';
//assets and css
import '../../style/workouts.css';
import comments from '../../assets/workouts/comments.svg';
import like from '../../assets/workouts/like.png';
import liked from '../../assets/workouts/liked.svg';




class Workout extends Component{
    constructor(props){
        super(props);

        this.state={
            showModal:false,
        }
    }

    componentDidMount(){
        this.props.getworkout(this.props.match.params.id)
    }

    likeWorkout = (workoutid) => {
        if(localStorage.id){
            this.props.likeWorkout(workoutid)
        }else{
            this.setState({showModal:true})
        }
        
    }

    closeModal = () => {
        this.setState({showModal:false})
    }
    
    addComment = (workoutid) => {
        if(localStorage.id){
            this.props.commentWorkout(workoutid, this.state.comment)
            this.setState({comment:''})
        }else{
            this.setState({showModal:true})
        }
    }

    render(){
        const workout = this.props.workout;
        return(
            <React.Fragment>
                <Header />
                {this.props.workout 
                    ? 
                      <div className="single-workout">
                          <div className="sw-header">
                            {exerciseType.map( (element, index) => {
                                    if(element.name === workout.type){
                                        return <img src={element.url} key={index}/>
                                    }
                                })}
                              <h1>{workout.workout_name}</h1>
                          </div>
                          <div className="sw-body">
                              <div className="sw-rating">
                                    <Rating item={workout.difficulty} />
                               </div>
                                <div className="sw-media">
                                    <div>
                                        <img src={comments} alt="number of comments in this workout"/>                                
                                        <p>{workout.comments ? workout.comments.total_comments : '0'}</p>
                                    </div>
                                    <div onClick={() => this.likeWorkout(workout._id)}>
                                        <img src={workout.likes_count ? workout.likes_count.user_ids.includes(localStorage.id) ? liked : null : like} alt="number of comments in this workout" />
                                        <p>{workout.likes_count ? workout.likes_count.likes : '0'}</p>
                                    </div>
                                </div>
                          </div>

                          <div className="sw-description">
                              <div style={{marginBottom:"10px"}}>
                                  <p style={{fontWeight:"600", marginRight:"10px"}}>Workout type</p>
                                  <p>{workout.type}</p>
                              </div>
                              <div style={{marginBottom:"10px"}}>
                                  <p style={{fontWeight:"600", marginRight:"10px"}}>Workout Focus</p>
                                 {workout.workout_focus.map((item, index) => {
                                     return <p key={index}>{item}</p>
                                 })}
                              </div>
                              <div style={{marginBottom:"10px"}}>
                                  <p style={{fontWeight:"600", marginRight:"10px"}}>Muscle Group</p>
                                 {workout.muscle_group.map((item, index) => {
                                     return <p key={index}>{item}</p>
                                 })}
                              </div>
                              <div style={{marginBottom:"10px"}}>
                                  <p style={{fontWeight:"600", marginRight:"10px"}}>Required Equipment</p>
                                 {workout.required_equipment.map((item, index) => {
                                     return <p key={index}>{item}</p>
                                 })}
                              </div>
                          </div>

                          <div className="sw-workout-summary">
                              {workout.type === "HIIT" || workout.type === "Cardio" || workout.type === "EMOM" || workout.type === "Bodyweight" || workout.type === "AMRAP"
                                ?
                                  <React.Fragment>
                                      <div>
                                        <h5>Workout Summary</h5>
                                        <p>{workout.workout_description.details}</p>
                                      </div>
                                      <div>
                                        <h5>Exercises</h5>
                                        {workout.workout_description.exercises.map((item, index) => {
                                            return <p key={index}>{item}</p>
                                        })}
                                      </div>
                                  </React.Fragment>
                                : null 
                              }
                              {workout.type === "TABATA"
                                ?
                                  <React.Fragment>
                                      <div>
                                        <h5>Workout Summary</h5>
                                        <p>{workout.workout_description.details}</p>
                                      </div>
                                      <div>
                                        <h5>Exercises</h5>
                                        {workout.workout_description.exercises.map((item, index) => {
                                            return <p key={index}>{item}</p>
                                        })}
                                      </div>
                                      <div>
                                        <h5>How to</h5>
                                        <p><b>Work</b> for {workout.workout_description.work}</p>
                                        <p><b>Rest</b> for {workout.workout_description.rest}</p>
                                        <p><b>Sets</b> {workout.workout_description.rounds}</p>
                                      </div>
                                  </React.Fragment>
                                : null 
                              }

                          </div>




                          <div className="sw-comments">
                              <h5>Comments</h5>
                                <div>
                                    <textarea 
                                        type="text" 
                                        maxLength="1000" 
                                        onChange={(e) => this.setState({comment:e.target.value})} 
                                        value={this.state.comment}
                                    >    
                                    </textarea>
                                    <button onClick={() => this.addComment(workout._id)}>Add Comment</button>
                                </div>
                                {workout.comments 
                                    ? workout.comments.comments.reverse().map((item, index) => {
                                        return <div key={index} className="comments">{item}</div>
                                    })
                                    : null
                                }

                          </div>
                      </div> 
                    : null
                }

                <Modal 
                    show={this.state.showModal}
                    onClose={this.closeModal}
                >
                   <div style={{display:"flex", flexDirection:"column", padding:"20px"}}>
                       <div>
                            <p style={{fontSize:"20px", fontWeight:"800"}}>Like this workout?</p>
                            <p>Sign in and get the full experience</p>
                       </div>
                        <Link to={'/signin'} style={{alignSelf:"center"}}><button className="orange-btn" style={{width:"250px", height:"40px"}}>Sign in</button></Link>
                   </div>

                </Modal>



            </React.Fragment>
          
        );
    }
}


const mapStateToProps = (state) => {
    return {
        workout: state.workouts.workout,
      
    }
  }


export default connect(
    mapStateToProps,
    { getworkout, likeWorkout, commentWorkout}
    
  )(Workout);