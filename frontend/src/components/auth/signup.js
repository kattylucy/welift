import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signup } from '../../actions/auth';
import {Link} from 'react-router-dom';

import logo from '../../assets/logo.png';

class SignUp extends Component{
    constructor(props){
        super(props);

        this.state={
            disabled: true,
            errorPassword:false
        }
    }

    create = () => {
            if(this.state.password === this.state.password2){
                const data = {
                    username: this.state.username,
                    email: this.state.email,
                    password: this.state.password
                }
                this.props.signup(data);
            }else{
                this.setState({errorPassword:true})
            }
    }

    setItem = (title,e) => {
        this.setState({[title]: e.target.value});
        if(this.state.password && this.state.username && this.state.email){
            this.setState({disabled:false})
        }else{
            this.setState({disabled:true})
        }
    }



    render(){
        return(
            <div className="auth-page">
                <div className="header-auth">
                    <Link to={'/'}><img src={logo} alt="we lift logo" /></Link>
                </div>
                <div className="overlay">
                    {this.state.errorPassword ? <p className="error">Password dont match</p> : null}
                    {this.props.error ? <p className="error">{this.props.error.error}</p> : null}

                    <div className="form">
                        <div>
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" onChange={(e) => this.setItem("username", e)}></input>
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input type="text" id="email" onChange={(e) => this.setItem("email", e)}></input>
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" onChange={(e) => this.setItem("password",e)}></input>
                        </div>
                        <div>
                            <label htmlFor="repeatpassword">Repeat Password</label>
                            <input type="password" id="repeatpassword" onChange={(e) => this.setItem("password2",e)}></input>
                        </div>
                        <button className="btn-auth" onClick={this.create} disabled={this.state.disabled}>Create Account</button>
                        <Link to={'/signin'}><button className="btn-auth register-btn">Login</button></Link>

                        
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
    {signup}
  )(SignUp);