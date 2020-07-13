import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import Header from '../header/index';
import { getUser } from '../../actions/userAction';
import { getMyWorkouts, deleteWorkout } from '../../actions/workoutactions';
import Moment from 'react-moment';
import Modal from '../modal';
//components
import Workouts from '../workouts';
import avatar from  '../../assets/avatar.svg';



class MyWorkouts extends Component{
    constructor(props){
        super(props);

        this.state={
            user: false
        }
    }

    componentDidMount(){
        this.props.getMyWorkouts();
    }

    delete = (id) => {
        this.setState({modal:true, workoutid:id})
    }

    deleteworkout = () => {
        this.props.deleteWorkout(this.state.workoutid);
    }

    closeModal =() => {this.setState({modal:false})}

    render(){
        console.log(this.props.workouts)
        return(
            <React.Fragment>
                <Header user={this.state.user}/>
                <div  style={{backgroundColor:"white", height:"100vh"}}>
                    <div className="mypage">
                        <div className="banner"></div>

                        <div className="mp-header">
                            <img src={avatar} alt="your avatar"/>
                            <p>{localStorage.username}</p>
                        </div>
                        <hr></hr>
                        {this.props.workouts 
                            ? this.props.workouts.map(item => {
                                const date = item.date;
                                return(
                                        <div className="mp-workout-card" key={item.id}>
                                            <Link to={`/workout/${item._id}`}><p style={{fontSize:"20px"}}>{item.workout_name}</p></Link>
                                            <p style={{color:"rgb(220, 53, 69)", textAlign:"right", cursor:"pointer"}} onClick={() => this.delete(item._id)}>Delete Workout</p>
                                            <p style={{color:"black", fontSize:"13px", textAlign:"right"}}>Created <Moment fromNow ago>{date}</Moment></p>
                                        </div>
                                )
                            })
                            : null 
                        }
                    

                    </div>
                </div>

                <Modal 
                    show={this.state.modal}
                    onClose={this.closeModal}
                >
                   <div className="delete-workout">    
                        <h3>Delete Workout</h3>
                        <div>
                            <p>Your workout helps the community <br></br> are you sure you want to delete it?</p>
                        </div>
                        <div style={{display:"flex", justifyContent:"center"}}>
                            <button style={{backgroundColor:"rgb(220, 53, 69)", color:"white"}} onClick={this.deleteworkout}>Delete</button>
                            <button onClick={this.closeModal}>Cancel</button>
                        </div>
                   </div>

                </Modal>

                   



            </React.Fragment>
            
        );
    }
}


const mapStateToProps = (state) => {
    return {
        workouts : state.workouts.my_workouts
    }
  }


export default connect(
    mapStateToProps,
    {getUser, getMyWorkouts, deleteWorkout}
    
  )(MyWorkouts);