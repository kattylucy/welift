import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getworkouts, likeWorkout, dislikeWorkout } from '../../actions/workoutactions';
import { exerciseType } from '../../data/select';
import Rating from '../sharedComponents/rating';


//components
import Modal from '../modal/index';


//assets and css
import '../../style/workouts.css';
import comments from '../../assets/workouts/commentmain.png';
import like from '../../assets/workouts/likedmain.png';
import liked from '../../assets/workouts/liked.png';





class Workouts extends Component{
    constructor(props){
        super(props);

        this.state={
            showModal:false,
            
        }
    }

    componentDidMount(){
        this.props.getworkouts();
    }

    likeWorkout = (workoutid, likedByCurrentUser) => {
        if(localStorage.id){
            if(likedByCurrentUser){
                this.props.dislikeWorkout(workoutid, "all");
            }else{
                this.props.likeWorkout(workoutid, "all");
            }
        }else{
            this.setState({showModal:true})
        }
    }

    

    closeModal = () => {
        this.setState({showModal:false})
    }

    render(){
        return(
            this.props.workouts ? 
            <div className="workouts-page">
                {this.props.workouts.length ? this.props.workouts.map(item => {
                    //if the workout is liked by current user show a different icon
                    const likedByCurrentUser = item.likes_count ? item.likes_count.user_ids.includes(localStorage.id) : null;
                    //if the workout do not have any likes show 0 otherwise show the number of likes
                    const likesCount = item.likes_count ? item.likes_count.likes : '0';
                    return(
                        <div className="workout-card" key={item._id}>
                            <Link to={`/workout/${item._id}`}>
                                <div className="workout-header">
                                    {exerciseType.map( (element, index) => {
                                        if(element.name === item.type){
                                            return <img src={element.url} key={index}/>
                                        }
                                    })}
                                    <p>{item.workout_name}</p>
                                </div>
                            </Link>
                            <div className="workout-middle">
                                <div className="workout-difficulty">
                                    <Rating item={item.difficulty} />
                                </div>
                                <div className="workout-interaction">
                                    <div>
                                        <Link to={`/workout/${item._id}`}><img src={comments} alt="number of comments in this workout"/></Link>                                     
                                        <p>{item.comments ? item.comments.total_comments : '0'}</p>
                                    </div>
                                    <div onClick={() => this.likeWorkout(item._id, likedByCurrentUser)}>
                                        <img src={likedByCurrentUser ? liked : like} alt="number of comments in this workout" />
                                        <p>{likesCount}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="workout-footer">
                                <div className="tags">
                                    {item.workout_focus.map((item, index) => {
                                        return <div key={index} className="tag">{item}</div>
                                    })}
                                      {item.muscle_group.map((item, index) => {
                                        return <div key={index} className="tag">{item}</div>
                                    })}
                                      {item.required_equipment.map((item, index) => {
                                        return <div key={index} className="tag">{item}</div>
                                    })}
                                </div>
                                {item.author_visible ? 
                                    <p className="author">Posted by <span>{item.workout_author.username}</span></p> 
                                : null}

                            </div>
                            
                        </div>
                    )
                }) : null}

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

    
                

            </div>
            : null
        );
    }
}


const mapStateToProps = (state) => {
    return {
        workouts: state.workouts.workouts
      
    }
  }


export default connect(
    mapStateToProps,
    { getworkouts, likeWorkout, dislikeWorkout }
    
  )(Workouts);