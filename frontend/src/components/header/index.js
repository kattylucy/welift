import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import history from '../../history';
import onClickOutside from "react-onclickoutside";
///css and assets
import '../../style/mainpage.css';
import burger from '../../assets/gym.png';
import burgerselected from '../../assets/gymselected.png';
import avatar from  '../../assets/avatar.svg';



class Header extends Component{
    constructor(props){
        super(props);

        this.state={
            toggle: false,
            settings:false

        }
    }

    logout = () => {
        localStorage.clear();
        window.location.reload();
    }

    handleClickOutside = evt => {
        this.setState({settings:false})
      };


    render(){
        const user = localStorage.id ? true : false;
        const username = localStorage.getItem('username');
        return(
            <div className="header">
                <div className="toggle-header">
                    <Link to={'/'}>
                        <div className="header-logo">
                            <p>WeLift</p>
                        </div>
                    </Link>
                    <img src={this.state.toggle ? burgerselected : burger} alt="open menu" className="toggle" onClick={() => this.setState({toggle:!this.state.toggle})}/>
                </div>
                <div className="header-mobile">
                    <div className={this.state.toggle ? "closed-header open-header" : "closed-header"}>
                    {user 
                        ?
                            <React.Fragment>
                                <div style={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
                                    <Link to={`/`}>Workouts</Link>
                                    <Link to={`/${localStorage.id}/myuser`}>My Workouts</Link>
                                    <Link to={`/createworkout`}>Create</Link>
                                    <div>
                                        <p style={{color:"white"}} onClick={() => this.setState({settings:!this.state.settings})}>{username}</p>
                                        {this.state.settings ? <p className="logout" onClick={this.logout}>Logout</p> : null}
                                    </div>
                                </div>
                            </React.Fragment>
                        : 
                        <React.Fragment>
                            <div>
                                    <Link to='/signup'><button className="white-btn" style={{width:"150px"}}>Sign up</button></Link>
                                    <Link to={'/signin'}>Sign in</Link>
                                    <Link to={`/createworkout`}>Create</Link>
                            </div>
                        </React.Fragment>
                    }
                    </div>
            </div>
                {user 
                    ?
                    <React.Fragment>
                        <div className="header-desktop">
                                <div style={{margin:"20px"}}>
                                    <Link to={'/'}>Home</Link>
                                    <Link to={`/${localStorage.id}/myuser`}>Workouts</Link>
                                    <Link to={`/createworkout`}>Create</Link>
                                </div>
                        </div>
                        <div className="header-desktop" style={{position:"relative", margin:"13px"}}>
                                <div style={{display:"flex"}} onClick={() => this.setState({settings:!this.state.settings})}> 
                                    <img src={avatar} alt="default avatar" className="user-avatar-bubble"/>
                                    <p style={{ fontSize:"20px", margin:"0px 10px 0px", color:"white", cursor:"pointer"}}>{username}</p>
                                </div>
                                {this.state.settings ? <div className="logout" onClick={this.logout}>Logout</div> : null}
                        </div>
                    </React.Fragment>
                    : 
                    <React.Fragment>
                        <div className="header-desktop">
                            <div>
                                <Link to='/signup'><button className="white-btn" style={{width:"150px"}}>Sign up</button></Link>
                                <Link to='/createworkout'>Create</Link>
                            </div>
                        </div>
                        <div className="header-desktop">
                            <div>
                                <Link to={'/signin'}>Sign in</Link>
                            </div>
                        </div>
                    </React.Fragment>
                }
                

            </div>
            
        );
    }
}



export default onClickOutside(Header);