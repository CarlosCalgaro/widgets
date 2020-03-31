
import * as actionTypes from 'src/store/actions/modals';

const initialState = {
    sign_in_modal: false,
    register_modal: false,
    forgot_password_modal: false
}

const reducer = (state = initialState, action) => {

    switch(action.type){
        case actionTypes.TOGGLE:
            return {
                ...state,
                [action.payload]: !state[action.payload]
            };
        default:
            return state;
    }
}
export default reducer;