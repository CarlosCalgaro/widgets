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
import {Link, withRouter} from 'react-router-dom';

class UserUpdateForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            current_password: '',
            new_password: '',
            currentPasswordFocus: false, 
            newPasswordFocus: false
        }
        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    async submit(e){
        try{
            e.preventDefault();
            let {passwordConfirmationFocus, passwordFocus, ...data} = this.state
            let response = await Api.Users.update_password(data.current_password, data.new_password)
            let body = response.body
            if(response.success){
                toast.success("Password changed successfully!")
                let {token} = body.data
                this.props.actions.setCredentials(token)
                this.props.history.push("/me");
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
            [name]: value
        });
    }
 
    handleDateChange(value){
      this.setState({date_of_birth: value})
    }

    render(){
        return(
            <div>
                <Form role="form" onSubmit={this.submit}>
                    <FormGroup className="mb-3">
                        <InputGroup
                            className={classnames("input-group-alternative", {
                            "input-group-focus": this.state.currentPasswordFocus
                            })}
                        >
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="tim-icons icon-single-02" />
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input
                                placeholder="Current Password"
                                type="password"
                                name="current_password"
                                value={this.state.password}
                                onChange={this.handleChange}
                                onFocus={e => this.setState({ currentPasswordFocus: true })}
                                onBlur={e => this.setState({ currentPasswordFocus: false })}
                            />
                        </InputGroup>
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <InputGroup
                            className={classnames("input-group-alternative", {
                            "input-group-focus": this.state.newPasswordFocus
                            })}
                        >
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="tim-icons icon-single-02" />
                            </InputGroupText>
                        </InputGroupAddon>
                            <Input
                                placeholder="Password Confirmation"
                                type="password"
                                name="new_password"
                                value={this.state.new_password}
                                onChange={this.handleChange}
                                onFocus={e => this.setState({ newPasswordFocus: true })}
                                onBlur={e => this.setState({ newPasswordFocus: false })}
                            />
                        </InputGroup>
                    </FormGroup>
                    <div className="text-center">
                        <Button className="my-4" color="primary" type="submit">
                            Update
                        </Button>

                        <Link to={"/me"} className="btn btn-info my-4"> 
                            Go Back
                        </Link>
                    </div>
                </Form>
            </div>
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

UserUpdateForm.propTypes = {
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserUpdateForm))