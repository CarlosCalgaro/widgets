import React from 'react'
import Api from 'src/api'
import {toast} from 'react-toastify'
import {
    Row,
    Col,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    Button
} from 'reactstrap';
import classnames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Widget from 'src/components/Widget'
import {connect} from "react-redux";
import * as actions from 'src/store/actions/widgets';
import chunk from 'src/utils/chunk'

/**
 * TODO break this component in more components to make it easier 
 * to maintain
 */
class VisibleWidgetsPagination extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isFocused: false,
            searchTerms: ""
        };
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.searchForWidgets = this.searchForWidgets.bind(this);
        this.handleSearchClick = this.handleSearchClick.bind(this);
    }

    async searchForWidgets(term = ""){
        try{
            let response = await Api.Widgets.visible(term)
            let body = response.body
            if(response.success){
                this.props.actions.set_visible_widgets(body.data);
            }else{
                toast.error(body.message)
            }
        }catch(error){
            console.log(error);
        }
    }

    async componentDidMount(){
        this.searchForWidgets()
    }

    handleSearchClick(){
        this.searchForWidgets(this.state.searchTerms)
    }

    handleChange(event){
        const target = event.target;
        const value = target.value
        this.setState({
            searchTerms: value
        });
    }

    onFocus(){
        this.setState({
            isFocused: true
        });
    };

    onBlur(){
        this.setState({
            isFocused: false
        });
    };
    
    render(){
        let widgets = []
        for(const widget of this.props.visible){
            let {user} = widget
            widgets.push(
                <Col xs="3" key={widget.id}>
                    <Widget kind={widget.kind} userId={user.id} image={user.images.small_url} username={user.name} title={widget.name}>
                        {widget.description}
                    </Widget>
                </Col>
            )
        }
        widgets = chunk(widgets, 8)
        return (
            <div className="wrapper">
                <Row className="mb-4">
                    <Col className="" xs={12}>
                        <InputGroup className={classnames({
                            'd-flex': true, 
                            'justify-content-center': true, 
                            'input-group-focus': this.state.isFocused
                        })}>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                            <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                            </InputGroupText>
                        </InputGroupAddon>
                            <Input
                                type="text"
                                className="col-md-3"
                                name="searchTerms"
                                value={this.state.searchTerms}
                                onChange={this.handleChange}
                                placeholder="Search for widget"
                                onFocus={this.onFocus}
                                onBlur={this.onBlur}
                            />
                        </InputGroup>
                        <Button color="primary" size="md" onClick={this.handleSearchClick}>Search</Button>
                    </Col>
                </Row>
                <Row>
                    {widgets}
                </Row>
            </div>            
        )
    }
}

const mapStateToProps = (state) => {
    return {
        visible: state.widgets.visible
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            set_visible_widgets: (widgets) => {
                return dispatch({
                    type: actions.SET_VISIBLE_WIDGETS,
                    payload: widgets
                })
            }
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(VisibleWidgetsPagination)