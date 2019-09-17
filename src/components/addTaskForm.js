import React from 'react'
import useInputForm from '../hooks/useInputForm'
import dateFns from "date-fns";
import "../styles/main.scss"
import {useDispatch, useSelector} from 'react-redux';
import {EVENT_BUTTON, ADD_EVENT} from "../redux/constants/action-types";

export default (props) => {
    const dispatch = useDispatch();
    const eventButton = useSelector(state => state.eventButton);
    const [name, updateEventName] = useInputForm('');
    const [time, updateEventTime] = useInputForm('09:00');
    let allEvents = JSON.parse(localStorage.getItem('allEvents'));
    if (allEvents === null) allEvents = [];

    const addNewEvent = (evt) => {
        evt.preventDefault();
        const id = props.id;
        const date = dateFns.format(id, "MMMMYYYYDD");
        const event = {id, name, time, date};
        const findDate = findObjectByDate(allEvents, 'date', date);
        dispatch({type: EVENT_BUTTON, payload: true});
        if (findDate !== null) {
            allEvents = allEvents.filter((x) => {
                return x.date !== date
            })
        }
        allEvents.push(event);
        localStorage.setItem("allEvents", JSON.stringify(allEvents));
        dispatch({type: ADD_EVENT, payload: false});
    };

    const closeEvent = () => {
        dispatch({type: ADD_EVENT, payload: false})
    };

    let button = "Add";
    let heading = "Add task";
    if (eventButton === true) {
        button = "change";
        heading = "Change event";
    }
    return (
        <div className={`form-container`}>
            <h3 className="form-header"> {heading}
                <i onClick={closeEvent}
                   className="far fa-window-close"
                >
                </i>
            </h3>
            <form onSubmit={addNewEvent}>
                <input
                    name="name"
                    value={name}
                    placeholder="Event name"
                    type="text"
                    autoComplete="off"
                    maxLength={20}
                    onChange={updateEventName}
                    required/>
                <input
                    name="time"
                    value={time}
                    type="time"
                    placeholder="HH:MM"
                    pattern="[0-2]?\d:[0-5]\d"
                    onChange={updateEventTime}
                    required/>
                <button>{button}</button>
            </form>
        </div>)
}

const findObjectByDate = (array, key, value) => {
    for (let i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
            return array[i];
        }
    }
    return null;
};