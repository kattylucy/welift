import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../../actions/auth';

import logo from '../../assets/logo.png';


class Login extends Component{
    constructor(props){
        super(props);

        this.state={
            disabled: true,
        }
    }

 
    login = () => {
        const data = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.login(data)
    }



    setItem = (title,e) => {
        this.setState({[title]: e.target.value})

        if(!this.state.email || !this.state.password){
            this.setState({disabled:true})
        }else{
            this.setState({disabled:false})
        }
    }



    render(){
        return(
            <div className="auth-page">
                <div className="header-auth">
                    <Link to={'/'}><img src={logo} alt="we lift logo" /></Link>
                </div>
                <div className="overlay">
                    {this.props.error ? <p className="error">{this.props.error.error}</p> : null}

                    <div className="form">
                        <div>
                            <label htmlFor="email">Email</label>
                            <input type="text" id="email" onChange={(e) => this.setItem("email", e)}></input>
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" onChange={(e) => this.setItem("password", e)}></input>
                        </div>
                       
                        <button className="btn-auth" onClick={this.login} disabled={this.state.disabled}>Login</button>
                        <Link to={'/signup'}><button className="btn-auth register-btn">Register</button></Link>
                        
                    </div>
                </div>
            </div>
            
        );
    }
}


const mapStateToProps = (state) => {
    return {
        error: state.auth
      
    }
  }


export default connect(
    mapStateToProps,
    {login}
  )(Login);