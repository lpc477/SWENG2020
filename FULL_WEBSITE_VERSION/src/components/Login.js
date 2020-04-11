import React, { Component } from "react";
import { isEmail, isEmpty, isLength, isContainWhiteSpace } from './validator';
import './login.css';
import { Row, FormGroup, FormControl, FormLabel, Button, formtext } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import App  from '../WEB_CHAT/App';

class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            formData: {}, // Contains  login form data
            errors: {}, // Contains login field errors
            formSubmitted: false, // Indicates submit status of login form
            loading: false // In dicates in progress state of login form
        }
    } 

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        let { formData } = this.state;
        formData[name] = value;

        this.setState({
            formData: formData
        });
    }

    validateLoginForm = (e) => {

        let errors = {};
        const { formData } = this.state;

        if (isEmpty(formData.email)) {
            errors.email = "Email can't be blank";
        } else if (!isEmail(formData.email)) {
            errors.email = "Please enter a valid email";
        }

        if (isEmpty(formData.password)) {
            errors.password = "Password can't be blank";
        }  else if (isContainWhiteSpace(formData.password)) {
            errors.password = "Password should not contain white spaces";
        } else if (!isLength(formData.password, { gte: 6, lte: 16, trim: true })) {
            errors.password = "Password's length must between 6 to 16";
        } else if (formData.password != "password"){
            errors.password = "Invalid Password, Try Again";
        }

        if (isEmpty(errors)) {
            return true;
        } else {
            return errors;
        }
    }

    login = (e) => {  

        e.preventDefault();

        let errors = this.validateLoginForm();

        if(errors === true){
           // alert("You are successfully signed in, click ok to proceed!");
           // window.location.reload()
            this.props.history.push('/App');
            //window.open(App);
         } else {
            this.setState({
                errors: errors,
                formSubmitted: true
            });
        }
    }

    render() {
        const { errors, formSubmitted, Login } = this.state;
        return (
            <div className="Login">
              <Row>
                    <form onSubmit={this.login}>
                    <h2>Sign In</h2>
                    <br/>
                        <FormGroup  controlId="email" validationState={ formSubmitted ? (errors.email ? 'error' : 'success') : null }>
                            <h5>Email</h5> 
                            <FormControl size="lg" type="text" name="email" placeholder="Enter your email" onChange={this.handleInputChange} />
                        { errors.email &&
                            <formtext>{errors.email}</formtext>
                        }
                        </FormGroup>
                        <FormGroup controlId="password" validationState={ formSubmitted ? (errors.password ? 'error' : 'success') : null }>
                            <h5>Password</h5>
                            <FormControl size="lg" type="password" name="password" placeholder="Enter your password" onChange={this.handleInputChange} />
                        { errors.password &&
                            <formtext>{errors.password}</formtext>
                        }
                        </FormGroup>
                        <Button type="submit" bsStyle="primary">Sign-In</Button>
                    </form>
                </Row>
            </div>
        )
    }
}

export default Login;