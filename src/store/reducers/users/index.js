
import * as actionTypes from 'src/store/actions/users';

const initialState = {
    id: null,
    name: "",
    images: {
        small_url: "",
        medium_url: "",
        large_url: "",
        original_url: ""
    },
    first_name: "",
    last_name: "",
    date_of_birth: null,
    email: "",
    active: true
}

const reducer = (state = initialState, action) => {

    switch(action.type){
        case actionTypes.SET_USER:
            return {
               ...action.payload
            };
        default:
            return state;
    }
}
export default reducer;