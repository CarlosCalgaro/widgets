import React from 'react';
import {
    Form,
    Button,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
} from 'reactstrap'
import Api from 'src/api'
import classnames from 'classnames'
import {connect} from "react-redux";
import * as authenticationActions from 'src/store/actions/authentication';
import * as userActions from 'src/store/actions/users';
import {toast} from 'react-toastify'

class RegisterForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            emailFocus: false,
            passwordFocus: false,
            passwordConfirmationFocus: false,
            firstNameFocus: false,
            lastNameFocus: false,
            form: {
                first_name: 'Carlos',
                last_name: 'Calgaro',
                email: 'carloscalgarof@gmail.com',
                password: 'password',
                password_confirmation: 'password',
            }
        }
        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async submit(e){
        e.preventDefault();
        try{
            let {valid, message, ...data} = this.state.form
            let response = await Api.Users.create(data)
            let body = response.body
            if(response.success){
                let {token, user} = body.data
                this.props.actions.setUser(user)
                this.props.actions.setCredentials(token)
                toast.success("Your account has been created!")
                if(this.props.afterRegister){
                    this.props.afterRegister();
                }
            }else{
                toast.error(body.message)
            }
        }catch(error){
            console.log(error)
        }
    }

    handleChange(event){
        const target = event.target;
        const name = target.name;
        const value = target.value
        this.setState({
            form: {
                ...this.state.form,
                [name]: value
            }
          });
    }
 
    render(){
        return(
            <Form role="form" onSubmit={this.submit}>
                <FormGroup className="mb-3">
                    <InputGroup
                        className={classnames("input-group-alternative", {
                        "input-group-focus": this.state.firstNameFocus
                        })}
                    >
                        <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                            <i className="tim-icons icon-single-02" />
                        </InputGroupText>
                        </InputGroupAddon>
                        <Input
                            placeholder="First Name"
                            type="text"
                            name="first_name"
                            value={this.state.form.first_name}
                            onChange={this.handleChange}
                            onFocus={e => this.setState({ first_name_focus: true })}
                            onBlur={e => this.setState({ first_name_focus: false })}
                        />
                    </InputGroup>
                </FormGroup>
                <FormGroup className="mb-3">
                    <InputGroup
                        className={classnames("input-group-alternative", {
                        "input-group-focus": this.state.lastNameFocus
                        })}
                    >
                        <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                            <i className="tim-icons icon-single-02" />
                        </InputGroupText>
                        </InputGroupAddon>
                        <Input
                            placeholder="Last Name"
                            type="text"
                            name="last_name"
                            value={this.state.form.last_name}
                            onChange={this.handleChange}
                            onFocus={e => this.setState({lastNameFocus: true })}
                            onBlur={e => this.setState({ lastNameFocus: false })}
                        />
                    </InputGroup>
                </FormGroup>
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
                            placeholder="Email"
                            type="email"
                            name="email"
                            value={this.state.form.email}
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
                        value={this.state.form.password}
                        onChange={this.handleChange}
                        onFocus={e => this.setState({ passwordFocus: true })}
                        onBlur={e => this.setState({ passwordFocus: false })}
                        />
                    </InputGroup>
                </FormGroup> 
                <FormGroup>
                    <InputGroup
                        className={classnames("input-group-alternative", {
                        "input-group-focus": this.state.passwordConfirmationFocus
                        })}
                    >
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="tim-icons icon-key-25" />
                            </InputGroupText>
                        </InputGroupAddon>
                        <Input
                        placeholder="Password Confirmation"
                        type="password"
                        name="password_confirmation"
                        value={this.state.form.password_confirmation}
                        onChange={this.handleChange}
                        onFocus={e => this.setState({ passwordConfirmationFocus: true })}
                        onBlur={e => this.setState({ passwordConfirmationFocus: false })}
                        />
                    </InputGroup>
                </FormGroup>
                <div className="text-center">
                    <Button className="my-4" color="primary" type="submit">
                        Register
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
                    type: authenticationActions.SET_CREDENTIALS,
                    payload: credentials
                })
            },
            setUser: (user) => {
                return dispatch({
                    type: userActions.SET_USER,
                    payload: user
                })
            },
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm)