import React, { Component } from 'react';
import { connect } from 'react-redux';
import onClickOutside from "react-onclickoutside";


//other components
import Dropdown from '../sharedComponents/dropdown';


//assets and css
import '../../style/filterbar.css';
import extypunselected from '../../assets/filterbar/extypeun.png';
import equipment from '../../assets/filterbar/equipment.png';
import focus from '../../assets/filterbar/focus.png';
import musclegroup from '../../assets/filterbar/musclegroup.png';
import difficulty from '../../assets/filterbar/difficulty.png';

import typese from '../../assets/filterbar/typese.png';
import equipmentse from '../../assets/filterbar/equipmentse.png';
import focusse from '../../assets/filterbar/focusse.png';
import musclegroupse from '../../assets/filterbar/musclegroupse.png';
import difficultyse from '../../assets/filterbar/difficultyse.png';


//list of data
import { exerciseType, equipmentList, focustList, muscleList, difficultyList, sortList } from '../../data/select';



class FilterBar extends Component{
    constructor(props){
        super(props);

        this.state={
            selected:{},
            isOpen: false
        }
    }

    componentDidMount(){
        this.setState({selected:sortList[0]})
    }

    select = (item) => {
        this.setState({selected:item, isOpen:false})
    }
    handleClickOutside = evt => {
        this.setState({isOpen:false})
      };


    render(){
        return(
            <div className="filterbar">
                <hr></hr>
                    <div className="filter-bar-wrapper">
                        <div className="filter-bar-individual">
                            <Dropdown title={"Exercise type"} imgun={extypunselected} imgse={typese} list={exerciseType}/>
                        </div>
                        <div className="filter-bar-individual">
                            <Dropdown title={"Equipment"} imgun ={equipment} imgse={equipmentse} list={equipmentList}/>
                        </div>
                        <div className="filter-bar-individual">
                            <Dropdown title={"Workout Focus"} imgun={focus} imgse={focusse} list={focustList}/>
                        </div>
                        <div className="filter-bar-individual">
                            <Dropdown title={"Muscle Group"} imgun={musclegroup} imgse={musclegroupse} list={muscleList}/>
                        </div>
                        <div className="filter-bar-individual">
                            <Dropdown title={"Difficulty"} imgun={difficulty} imgse={difficultyse} list={difficultyList} />
                        </div>
                        <div className="sort-drop">
                            <div style={{position:"relative"}}>
                                <p onClick={() => this.setState({isOpen:!this.state.isOpen})}>Sort</p>
                                <p style={{fontSize:"12px", fontWeight:"200"}}>{this.state.selected.name}</p>
                                {this.state.isOpen 
                                ? 
                                    <div className="sort-list-drop">
                                        {sortList.map(item => {
                                                return(
                                                    <div key={item.id} onClick={()=> this.select(item)} style={this.state.selected.name === item.name ? {display:"none"} : null}>{item.name}</div>
                                                )
                                            })}
                                    </div>
                                : null                            
                                }
                            </div>

                        </div>
                    </div>
                    
        
                
                <hr></hr>
            </div>
            
        );
    }
}


const mapStateToProps = (state) => {
    return {
      
    }
  }


export default connect(
    mapStateToProps,
    
    
  )( onClickOutside(FilterBar));