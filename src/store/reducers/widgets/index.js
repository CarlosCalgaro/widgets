import * as actionTypes from 'src/store/actions/widgets';

const initialState = {
    visible: []
}

const reducer = (state = initialState, action) => {

    switch(action.type){
        case actionTypes.SET_VISIBLE_WIDGETS:
            return {
                ...state,
                visible: action.payload
            };
        case actionTypes.REMOVE_VISIBLE_WIDGET:
            return{
                ...state,
                visible: state.visible.filter( widget => widget.id !== action.payload.id),
            }
        case actionTypes.RESET_VISIBLE_WIDGETS:
            return initialState;
        default:
            return state;
    }
}
export default reducer;