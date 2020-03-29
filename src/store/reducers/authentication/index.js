
import * as actionTypes from 'src/store/actions/authentication';

const initialState = {
        access_token: "",
        token_type: "",
        expires_in: "",
        refresh_token: "",
        scope: "",
        created_at: ""
}

const reducer = (state = initialState, action) => {

    switch(action.type){
        case actionTypes.SET_CREDENTIALS:
            return {
                ...state,
                ...action.payload
            };
        case actionTypes.REVOKE_CREDENTIALS:
            
            return initialState;
        default:
            return state;
    }
}
export default reducer;