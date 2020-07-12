import React, { Component } from 'react';
import onClickOutside from "react-onclickoutside";
import handleSearch from '../../usefulFunctions/handleSearch';


//assets and css
import '../../style/filterbar.css';
import arrow from '../../assets/workouts/arrowdown.svg';


class Selection extends Component{
    constructor(props){
        super(props);

        this.state={
            selected:[],
            list:[],
            isOpen: false,
            value:''
        }
    }

    componentDidMount(){
        this.setState({list:this.props.list})
        if(this.props.value){
            this.setState({selected:this.props.value})
        }
    }

    handleClickOutside = evt => {
        this.setState({isOpen:false, hide:false})
      };


      ///NEED REFACTOR
    select = (item) => {
        this.setState({value:'', hide:false, isOpen:false, list:this.props.list})
        if(!this.props.multiselect){
            if(this.state.selected.includes(item.id)){
                this.setState({selected:[]})
            }else{
                this.setState({
                    selected: [item]
                })
            }
        }else{
            const ids = this.state.selected.map(item => item.id);
            if(ids.includes(item.id)){
                const filter = this.state.selected.filter(x => x.id !== item.id);
                this.setState({selected:filter})
            }else{
                const add = this.state.selected.concat(item);
                this.setState({
                    selected:add
                })
            }
        }

        setTimeout(() => {
            this.props.send(this.state.selected, this.props.id)
        }, 0.5);
    }

    handleSearch = (e) => {
        this.setState({isOpen:true, value:e.target.value});
        const search = handleSearch(e, this.state.list);
        if(search){
            this.setState({list: search});
        }else{
            this.setState({list:this.props.list})
        }
    }

    render(){
        return(
            <div className="selection-dropdown">
                <div onClick={() => this.setState({isOpen:!this.state.isOpen, hide:true})} className="wrapper">
                    <label htmlFor={this.props.title}>{this.props.title}</label>
                    <div className="input-wrapper" id={this.props.multiselect ? "multiselect" : null}>
                        {this.state.selected.length 
                        ? 
                            <p style={this.state.hide ? {display:"none"} : {display:"block"}} >
                                {this.props.multiselect  ? `${this.state.selected.length} selected `: this.state.selected[0].name}
                            </p>
                            : null
                        }
                        <input 
                            id={this.props.title}
                            placeholder={this.state.selected.length ? null : this.props.placeholder}
                            onChange={this.handleSearch}
                            value={this.state.value}
                        />
                    </div>
                </div>
                {this.state.isOpen 
                    ?
                        <div className={this.state.isOpen ? "dropdown-list open" : "dropdown-list"}>
                            {this.state.list.length ? this.state.list.map(item => {
                                return(
                                    <div 
                                        onClick={() => this.select(item)} 
                                        className={this.state.selected.map(x => x.id).includes(item.id) ? "item-already-selected" : null} 
                                        key={item.id}
                                    >
                                        {item.name}
                                    </div>
                                )
                            }) : <p className="not-matches">Sorry we couldn't find any matches</p>}
                        </div>
                    : null
                }
            </div>
            
        );
    }
}




export default onClickOutside(Selection);