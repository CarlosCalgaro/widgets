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
        case actionTypes.RESET_VISIBLE_WIDGETS:
            return initialState;
        default:
            return state;
    }
}
export default reducer;