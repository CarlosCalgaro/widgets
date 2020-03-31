import React from 'react';
import {
    Form,
    Button,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Label
} from 'reactstrap'
import Api from 'src/api';
import classnames from 'classnames';
import {connect} from "react-redux";
import {toast} from 'react-toastify';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';

class WidgetForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            nameFocus: false, 
            descriptionFocus: false,
            id: '', 
            name: '',
            description: '',
            visible: false
        }
        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.toggleChecked = this.toggleChecked.bind(this);
        this.destroy = this.destroy.bind(this);
        this.getWidget = this.getWidget.bind(this);
    }

    toggleChecked(e){
        this.setState({visible: !this.state.visible})
    }

    async submit(e){
        e.preventDefault();
        let { id, visible, nameFocus, descriptionFocus, ...data} = this.state
        data.kind = visible ? "visible" : "hidden"
        let response = await Api.Widgets.create(data)
        let body = response.body
        if(response.success){
            toast.success("Widget Created Successfully!")
            this.props.history.push("/widgets");
        }else{
            toast.error(body.message)
        }
    }

    getWidget(id){
        return this.props.widgets.filter( widget => widget.id === id )
    }

    async destroy(id){
        try{
            let response = await Api.Widgets.destroy(id)
            let body = response.body
            if(response.success){
                toast.success("Updated!")
            }else{
                toast.error(body.message)
            }
        }catch(error){

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
                            "input-group-focus": this.state.nameFocus
                            })}
                        >
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="tim-icons icon-single-02" />
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input
                            placeholder="Name"
                            type="text"
                            name="name"
                            value={this.state.name}
                            onChange={this.handleChange}
                            onFocus={e => this.setState({ nameFocus: true })}
                            onBlur={e => this.setState({ nameFocus: false })}
                            />
                        </InputGroup>
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <InputGroup
                            className={classnames("input-group-alternative", {
                            "input-group-focus": this.state.lastNameFocus
                            })}
                        >
                        <Input
                        placeholder="Description"
                        type="textarea"
                        name="description"
                        value={this.state.description}
                        onChange={this.handleChange}
                        onFocus={e => this.setState({ lastNameFocus: true })}
                        onBlur={e => this.setState({ lastNameFocus: false })}
                        />
                    </InputGroup>
                    </FormGroup>
                    <FormGroup check className="d-flex mt-5 justify-content-left">
                        <Label check>
                            <Input type="checkbox" checked={this.state.visible} onChange={this.toggleChecked} /> Visible
                            <span className="form-check-sign">
                                <span className="check" />
                            </span>
                        </Label>
                    </FormGroup>
                    <div className="text-center">
                        <Button className="my-4" 
                                color="primary" 
                                type="submit"
                                onClick={this.submit}>
                            Submit
                        </Button>
                        <Link to={"/widgets"} className="btn btn-info my-4"> 
                            Go Back
                        </Link>
                    </div>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        widgets: state.widgets.visible
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
 
        }
    }
}   

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WidgetForm))