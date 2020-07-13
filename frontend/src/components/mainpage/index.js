import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../header/index';
import { getUser } from '../../actions/userAction';
import { getworkouts } from '../../actions/workoutactions';
//components
import Workouts from '../workouts';


class MainPage extends Component{
    constructor(props){
        super(props);

        this.state={
            user: false
        }
    }

    componentDidMount(){
        this.props.getworkouts();
        const id = localStorage.getItem('id');
        if(id){
            this.setState({user:true})
        }
    }

    render(){
        return(
            <React.Fragment>
                <div style={{textAlign:"center", fontWeight:"800", color:"white", backgroundColor:"var(--blueish)"}}>For testing sign in with <br></br>
                    username: test2@user.com <br></br>
                    password: password
                </div>
                <Header user={this.state.user}/>

                <div  className="main-page">
                    <div className="banner"></div>
                    {/* <div className="search-bar">
                        <input type="text" placeholder="Search Workout"/>
                    </div> */}
                    <div className="reccommended-workouts">
                        <h3>Latest Routines</h3>
                        <Workouts />

                    </div>


                </div>

                   



            </React.Fragment>
            
        );
    }
}


const mapStateToProps = (state) => {
    return {
      
    }
  }


export default connect(
    mapStateToProps,
    {getUser, getworkouts}
    
  )(MainPage);