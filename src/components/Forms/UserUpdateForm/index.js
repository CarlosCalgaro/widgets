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
import Datetime from 'react-datetime';
import Api from 'src/api';
import classnames from 'classnames';
import {connect} from "react-redux";
import * as actions from 'src/store/actions/authentication';
import {toast} from 'react-toastify';
import {Link, withRouter} from 'react-router-dom';
import * as moment from 'moment';

class UserUpdateForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            firstNameFocus: false, 
            lastNameFocus: false, 
            birthDateFocus: false, 
            imageUrlFocus: false,
            id: '', 
            first_name: '',
            last_name: '',
            date_of_birth: null,
            image_url: ''
        }
        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    async componentDidMount(){
        try{
            let response = await Api.Users.me()
            let body = response.body
            if(response.success){
                let {id, first_name, date_of_birth, last_name, images} = body.data.user
                this.setState({
                    id: id, 
                    first_name: first_name,
                    last_name: last_name,
                    date_of_birth: (date_of_birth === null) ? "" : moment(date_of_birth),
                    image_url: images.original_url
                })
            }else{
                toast.error(body.message)
            }
        }catch(error){
            console.log(error);
        }
    }

    async submit(e){
        e.preventDefault();
        let {firstNameFocus, lastNameFocus, birthDateFocus, imageUrlFocus, id, ...data} = this.state
        data.date_of_birth = (data.date_of_birth === null) ? "" : data.date_of_birth.unix()
        let response = await Api.Users.update(data)
        let body = response.body
        if(response.success){
            toast.success("Profile updated successfully!")
            this.props.history.push("/me");

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
                            value={this.state.first_name}
                            onChange={this.handleChange}
                            onFocus={e => this.setState({ firstNameFocus: true })}
                            onBlur={e => this.setState({ firstNameFocus: false })}
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
                        value={this.state.last_name}
                        onChange={this.handleChange}
                        onFocus={e => this.setState({ lastNameFocus: true })}
                        onBlur={e => this.setState({ lastNameFocus: false })}
                        />
                    </InputGroup>
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <FormGroup>
                            <InputGroup
                                className={classnames("input-group-alternative", {
                                "input-group-focus": this.state.birthDateFocus
                                })}
                            >
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="tim-icons icon-gift-2" />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Datetime className="md-4 custom-datepicker"
                                    value={this.state.date_of_birth}
                                    timeFormat={false}
                                    onFocus={e => this.setState({ birthDateFocus: true })}
                                    onBlur={e => this.setState({ birthDateFocus: false })}
                                    onChange={this.handleDateChange}
                                    inputProps={{placeholder:"Birth Date"}}
                                />
                            </InputGroup>
                        </FormGroup>
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <InputGroup 
                            className={
                                classnames("input-group-alternative", {
                                        "input-group-focus": this.state.imageUrlFocus
                                })
                            }
                        >
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="tim-icons icon-image-02" />
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input
                                placeholder="Profile Picture URL"
                                type="text"
                                name="image_url"
                                value={this.state.image_url}
                                onChange={this.handleChange}
                                onFocus={e => this.setState({ imageUrlFocus: true })}
                                onBlur={e => this.setState({ imageUrlFocus: false })}
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
            set_credentials: (credentials) => {
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