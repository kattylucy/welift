import React, { Component } from 'react';
import onClickOutside from "react-onclickoutside";


//assets and css
import '../../style/filterbar.css';
import arrow from '../../assets/filterbar/arrow.png';


class Dropdown extends Component{
    constructor(props){
        super(props);

        this.state={
            selected:[],
            isOpen: false
            
        }
    }

    handleClickOutside = evt => {
        this.setState({isOpen:false})
      };

    select = (item) => {
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

        console.log(this.state)
    }

    render(){
        return(
            <div className="shared-dropdown">
                    <div onClick={() => this.setState({isOpen:!this.state.isOpen})} className="wrapper">
                        <img src={this.state.selected.length > 0 ? this.props.imgse : this.props.imgun} alt="exercise type filter" />
                        <p>{this.props.title}</p>
                        <img src={arrow} className="arrow"/>
                    </div>
                    {this.state.isOpen 
                        ?
                            <div className="dropdown-list">
                                {this.props.list.map(item => {
                                    return(
                                        <div onClick={() => this.select(item)} className={this.state.selected.map(x => x.id).includes(item.id) ? "item-already-selected" : null} key={item.id}>{item.name}</div>
                                    )
                                })}
                            </div>
                        : null
                    }

        
                
            </div>
            
        );
    }
}




export default onClickOutside(Dropdown);