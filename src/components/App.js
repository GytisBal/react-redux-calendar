import React from "react";
import Calendar from "./Calendar"
import "../styles/main.scss";
import {useDispatch, useSelector} from 'react-redux';
import {ADD_EVENT} from "../redux/constants/action-types";

const App = () => {
    const dispatch = useDispatch();
    const eventButton = useSelector(state => state.eventButton);

    const addEvent = () => {
        dispatch({type: ADD_EVENT, payload: true});
    };

    const buttonText = eventButton ? "Change event" : "+ Add event"
    return (
        <div className="mainLayout">
            <div className="event-buttons-container">
                <button
                    className="event-button"
                    onClick={addEvent}
                >
                    {buttonText}
                </button>
            </div>
            <Calendar/>
        </div>
    );
};

export default App;
