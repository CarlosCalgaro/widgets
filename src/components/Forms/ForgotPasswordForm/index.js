import React from 'react';
import {
    Form,
    Button,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText
} from 'reactstrap'
import Api from 'src/api'
import classnames from 'classnames'
import {connect} from "react-redux";
import * as actions from 'src/store/actions/authentication';
import {toast} from 'react-toastify'
class ForgotPasswordForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            emailFocus: false,
            email: '',
        }
        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async submit(e){
        e.preventDefault();
        let response = await Api.Users.forgotPassword(this.state.email)//(this.state.username, this.state.password)
        let body = response.body
        if(response.success){
            toast.success(body.message)
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
            <p>
                Enter your email and we will send instructions to recover your password

            </p>
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
                        value={this.state.email}
                        onChange={this.handleChange}
                        onFocus={e => this.setState({ emailFocus: true })}
                        onBlur={e => this.setState({ emailFocus: false })}
                    />
                </InputGroup>
            </FormGroup>
            <div className="text-center">
                <Button className="my-4" color="primary" type="submit">
                    Recover my Password
                </Button>
            </div>
        </Form>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
    // return {
    //     help: state.helpQuestions.helpForm,
    // };
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            set_credentials: (credentials) => {
                return dispatch({
                    type: actions.SET_CREDENTIALS,
                    payload: credentials
                })
            }
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordForm)