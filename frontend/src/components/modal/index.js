import React, { Component } from 'react';
import { connect } from 'react-redux';
import onClickOutside from "react-onclickoutside";


class Modal extends Component{
    constructor(props){
        super(props);

        this.state={
         
        }
    }

    componentDidMount(){
    }


      onClose = (e) => {
          if(e.target === e.currentTarget){
              this.props.onClose();
          }
      }


    render(){
        return(
            this.props.show ?
            <div className="Modal-Overlay" onClick={this.onClose}>
                <div className="modal-children">{this.props.children}</div>
            </div>
            : null
            
        );
    }
}


const mapStateToProps = (state) => {
    return {
      
    }
  }


export default connect(
    mapStateToProps,
    
    
  )(Modal);