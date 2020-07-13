import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import Header from '../header/index';
import { getUser } from '../../actions/userAction';
import { getMyWorkouts } from '../../actions/workoutactions';
import Moment from 'react-moment';
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
                                            <p style={{color:"rgb(220, 53, 69)", textAlign:"right", cursor:"pointer"}}>Delete Workout</p>
                                            <p style={{color:"black", fontSize:"13px", textAlign:"right"}}>Created <Moment fromNow ago>{date}</Moment></p>
                                        </div>
                                )
                            })
                            : null 
                        }
                    

                    </div>
                </div>

                   



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
    {getUser, getMyWorkouts}
    
  )(MyWorkouts);