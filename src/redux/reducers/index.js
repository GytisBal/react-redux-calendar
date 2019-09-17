import {ADD_EVENT, EVENT_BUTTON, SET_DATE, SET_MONTH} from '../constants/action-types';

const initialState = {
    addEvent: false,
    eventButton: false,
    currentMonth: new Date(),
    selectedDate: new Date(),
};

function rootReducer(state = initialState, action) {
    switch (action.type){
        case ADD_EVENT:
            return {...state, addEvent: action.payload};
        case EVENT_BUTTON:
            return {...state, eventButton: action.payload};
        case SET_MONTH:
            return {...state, currentMonth: action.payload};
        case SET_DATE:
            return {...state, selectedDate: action.payload};
        default:
            return state
    }
}

export default rootReducer;