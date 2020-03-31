import React from 'react';
import {
    Form, 
    Row,
    Button,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Col
} from 'reactstrap'
import Api from 'src/api'
import classnames from 'classnames'
import {connect} from "react-redux";
import * as actions from 'src/store/actions/authentication';
import {toast} from 'react-toastify'
import PropTypes from 'prop-types';

class SignInForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            emailFocus: false,
            passwordFocus: false,
            username: '',
            password: ''
        }
        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async submit(e){
        e.preventDefault();
        let response = await Api.Authentication.authenticate(this.state.username, this.state.password)
        let body = response.body
        if(response.success){
            toast.success("You have logged in successfully!")
            let {token} = body.data
            this.props.actions.setCredentials(token)
            if(this.props.afterLogin){
                this.props.afterLogin();
            }
        }else{
            toast.error(body.message)
        }
    }

    handleChange(event){
        const target = event.target;
        const name = target.name;
        const value = target.value
        this.setState({
            [name]: value
          });
    }
 
    render(){
        return(
            <Form role="form" onSubmit={this.submit}>
                <FormGroup className="mb-3">
                <InputGroup
                    className={classnames("input-group-alternative", {
                    "input-group-focus": this.state.emailFocus
                    })}
                >
                    <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                        <i className="tim-icons icon-email-85" />
                    </InputGroupText>
                    </InputGroupAddon>
                    <Input
                    placeholder="Username"
                    type="email"
                    name="username"
                    value={this.state.username}
                    onChange={this.handleChange}
                    onFocus={e => this.setState({ emailFocus: true })}
                    onBlur={e => this.setState({ emailFocus: false })}
                    />
                </InputGroup>
                </FormGroup>
                <FormGroup>
                    <InputGroup
                        className={classnames("input-group-alternative", {
                        "input-group-focus": this.state.passwordFocus
                        })}
                    >
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="tim-icons icon-key-25" />
                            </InputGroupText>
                        </InputGroupAddon>
                        <Input
                        placeholder="Password"
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        onFocus={e => this.setState({ passwordFocus: true })}
                        onBlur={e => this.setState({ passwordFocus: false })}
                        />
                    </InputGroup>
                </FormGroup>
                <FormGroup check className="mt-3">
                    <Row>
                        <Col xs="12" className="text-right">
                            <a href="#/" onClick={this.props.handleForgotPasswordAction}>
                                Forgot your password?
                            </a>
                        </Col>
                    </Row>
                </FormGroup>
                <div className="text-center">
                    <Button className="my-4" color="primary" type="submit">
                        Sign in
                    </Button>
                </div>
            </Form>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            setCredentials: (credentials) => {
                return dispatch({
                    type: actions.SET_CREDENTIALS,
                    payload: credentials
                })
            }
        }
    }
}

SignInForm.propTypes = {
    handleForgotPasswordAction: PropTypes.func.isRequired
};
export default connect(mapStateToProps, mapDispatchToProps)(SignInForm)