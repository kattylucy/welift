import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getworkout, likeWorkout, commentWorkout, createWorkout } from '../../actions/workoutactions';
import Selection from '../sharedComponents/selection';
import { exerciseType, focustList, equipment, difficultyList, author, muscleList} from '../../data/select';
//components
import Modal from '../modal/index';
import Header from '../header/index';
//assets and css
import '../../style/workouts.css';
import lab from '../../assets/lab.svg';
import next from '../../assets/workouts/bluearrow.png';






class Create extends Component{
    constructor(props){
        super(props);

        this.state={
            page: 1,
            exercises:[],
            disabled:true
        }
    }

    handleDate = (data, title) => {
        this.setState({[title]:data})
    }

    addExercises = () => {
        this.setState({exercises:[...this.state.exercises, this.state.exercise]})
    }

    remove = (item) => {
        const filter = this.state.exercises.filter(element => element !== item);
        this.setState({exercises:filter})
    }

   componentWillUpdate(props, state){
        const short = state;
        if(short.title && short.description && short.difficulty && short.equipment && short.exercises && short.focus && short.author){
            state.disabled = false;
        }
    }

    createWorkout = () => {
        if(localStorage.id){
            const visible = this.state.author[0].name === "Yes" ? true : false;
            const workout ={
                workout_name: this.state.title,
                type: this.state.type[0].name,
                required_equipment: this.state.equipment.map(item => item.name),
                workout_focus: this.state.focus.map(item => item.name),
                difficulty: this.state.difficulty[0].number,
                author_visible: visible,
                muscle_group: this.state.group.map(item => item.name),
                workout_description: {
                    exercises: this.state.exercises,
                    details: this.state.description
                }
            }
            this.props.createWorkout(workout)
        }else{
            this.setState({showModal:true})
        }
    }

    closeModal = () => {
        this.setState({showModal:false})
    }



    render(){
        return(
            <React.Fragment>
                <Header />
                <div className="create-workout">
                    <div className="cw-header">
                        <img src={lab} alt="create new workout section" />
                        <div>
                            <h1>Workout Lab</h1>
                            <p>Let's create a new workout to shared with the community<br></br>
                               <span style={{color:"#dc3545"}}>* All fields are required</span><br></br>
                               <span style={{color:"#dc3545"}}>Only registered users can create workouts</span>
                            </p>
                        </div>
                    </div>

                    {this.state.page === 1 
                        ? 
                            <div className="create-workout-form">
                                <div className="separator">
                                    <div className="form-field form-field-not-search">
                                        <label htmlFor="title">Workout Title</label>
                                        <input 
                                            type="text" 
                                            id="title" 
                                            placeholder="E.G Cardio Tuesday"
                                            onChange={(e) => this.handleDate(e.target.value, "title")}
                                            defaultValue={this.state.title ? this.state.title : null}
                                        />
                                    </div>
                                    <div className="form-field">
                                        <Selection 
                                            title="Workout Type" 
                                            list={exerciseType} 
                                            multiselect={false} 
                                            send={this.handleDate} 
                                            placeholder={"Cardio"} 
                                            id={"type"}
                                            value={this.state.type ? this.state.type : null }
                                        />
                                            
                                    </div>
                                </div>
                                <div className="form-field">
                                    <Selection 
                                        title="Workout Focus" 
                                        list={focustList} 
                                        multiselect={true} 
                                        send={this.handleDate} 
                                        placeholder={"Cardio"} 
                                        id={"focus"} 
                                        value={this.state.focus ? this.state.focus : null }
                                    />
                                </div>
                                <div className="form-field">
                                    <Selection 
                                        title="Workout Equipment" 
                                        list={equipment} 
                                        multiselect={true} 
                                        send={this.handleDate} 
                                        placeholder={"Plyo Box"} 
                                        id={"equipment"}
                                        value={this.state.equipment ? this.state.equipment : null }
                                    />
                                </div>
                                <div className="form-field">
                                    <Selection 
                                        title="Workout Difficulty" 
                                        list={difficultyList} 
                                        multiselect={false} 
                                        send={this.handleDate} 
                                        placeholder={"Athlete"} 
                                        id={"difficulty"}
                                        value={this.state.difficulty ? this.state.difficulty : null }
                                    />
                                </div>
                                <div className="form-field">
                                    <Selection 
                                        title="Muscle Group" 
                                        list={muscleList} 
                                        multiselect={false} 
                                        send={this.handleDate} 
                                        placeholder={"Lower-Body"} 
                                        id={"group"}
                                        value={this.state.group ? this.state.group : null }
                                    />
                                </div>

                                <div className="next">
                                    <p onClick={() => this.setState({page:2})}>NEXT</p>
                                    <img src={next} alt="go to the next page"/>
                                </div>

                            </div>
                        : null
                    }
                    {
                        this.state.page === 2 
                        ? 
                            <div>

                                <div className="form-field form-field-not-search">
                                    <label htmlFor="description">Describe the workout - Be explicit!</label>
                                    <textarea 
                                        type="text" 
                                        id="description" 
                                        placeholder="Perform the exercise for 3 sets of 20 reps each" 
                                        maxLength={3000}
                                        onChange={(e) => this.setState({description:e.target.value})}
                                        defaultValue={this.state.description ? this.state.description : null}
                                    >    
                                    </textarea>
                                </div>
                                <div className="form-field form-field-not-search">
                                    <label htmlFor="exercises">What exercises are included in the workout?</label>
                                    <div className="adding-section">
                                        <input 
                                            type="text" 
                                            id="exercises" 
                                            placeholder="Squats, lunges, burpees" 
                                            onChange={(e) => this.setState({exercise:e.target.value})}
                                        />
                                        <button onClick={this.addExercises} disabled={this.state.exercise ? false : true}>Add</button>
                                    </div>
                                </div>
                                <div className="selected-exercises">
                                    {this.state.exercises.map((item, index) => <p key={index}>{item} <span onClick={() => this.remove(item)}>x</span></p>)}
                                </div>
                                <div className="form-field authorField">
                                    <Selection 
                                        title="Do you want to publish your name as the workout creator?" 
                                        list={author} 
                                        multiselect={false} 
                                        send={this.handleDate} 
                                        placeholder={"yes/no"} 
                                        id={"author"}
                                        value={this.state.author ? this.state.author : null} 
                                    />
                                </div>


                                <div className="next" style={{justifyContent:"space-between"}}>
                                    <div style={{display:'flex'}}>
                                        <img src={next} alt="go to the next page" style={{transform:'rotate(180deg)'}}/>
                                        <p style={{marginLeft:"10px"}} onClick={() => this.setState({page:1})}>BACK</p>
                                    </div>
                                    <button disabled={this.state.disabled} onClick={this.createWorkout}>Create</button>
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
    { getworkout, likeWorkout, commentWorkout, createWorkout}
    
  )(Create);