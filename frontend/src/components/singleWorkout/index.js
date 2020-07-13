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
import comments from '../../assets/workouts/comments.png';
import like from '../../assets/workouts/like.png';
import liked from '../../assets/workouts/liked.png';
import difficulty from '../../assets/workouts/difficulty.png';
import equip from '../../assets/workouts/equip.png';
import muscle from '../../assets/workouts/muscle.png';
import energy from '../../assets/workouts/energy.png';





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

    likeWorkout = (workoutid) => {
        if(localStorage.id){
            this.props.likeWorkout(workoutid, 'single')
        }else{
            this.setState({showModal:true})
        }
        
    }

    render(){
        const workout = this.props.workout;
        return(
            <React.Fragment>
                <Header />
                <div>
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
                                <div>
                                    <img src={comments} alt="number of comments in this workout"/>                                
                                    <p>{workout.comments ? workout.comments.total_comments : '0'} comments</p>
                                </div>
                                <div onClick={() => this.likeWorkout(workout._id)}>
                                    <img src={workout.likes_count ? workout.likes_count.user_ids.includes(localStorage.id) ? liked : like : like} 
                                            alt="number of comments in this workout" />
                                    <p>{workout.likes_count ? workout.likes_count.likes : '0'} likes</p>
                                </div>
                          </div>

                          <div className="sw-description">
                              <div>
                                  <img src={difficulty} />
                                  <p>{workout.difficulty === 1 || workout.difficulty === 2 ? "Beginner" : null}</p>
                                  <p>{workout.difficulty === 3 || workout.difficulty === 4 ? "Intermediate" : null}</p>
                                  <p>{workout.difficulty === 5 ? "Advanced" : null}</p>
                              </div>
                              <div>
                                  <img src={equip} alt="workout equipment"/>
                                 {workout.required_equipment.map((item, index) => {
                                     return <p key={index}>{item}</p>
                                 })}
                              </div>
                              <div>
                                  <img src={energy} alt="focus"/>
                                 {workout.workout_focus.map((item, index) => {
                                     return <p key={index}>{item}</p>
                                 })}
                              </div>
                              <div>
                                  <img src={muscle} alt="muscle group" />
                                 {workout.muscle_group.map((item, index) => {
                                     return <p key={index}>{item}</p>
                                 })}
                              </div>
                          </div>

                          <div className="sw-summary">
                            <p>The following workout is a <b>{workout.type}</b> workout <br></br>{workout.workout_description.details}</p>
                            <h5>Exercises to follow:</h5>
                            <ul>
                                {workout.workout_description.exercises.map(item => <li>{item}</li>)}
                            </ul>
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
                </div>

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