import React from 'react'
import "../styles/main.scss"

export default (props) => {
    let allEvents = JSON.parse(localStorage.getItem('allEvents'));
    if (allEvents === null) allEvents = [];

    const deleteEvent = () => {
        const date = props.date;
        const newArray = allEvents.filter((x) => {
            return x.date !== date
        });
        localStorage.setItem("allEvents", JSON.stringify(newArray));
    };

    return (
        <div className="task">
            <i
                onClick={deleteEvent}
                className="far fa-window-close"
            >
            </i>
            <h4 className="task-heading">
                <span
                    className="status green"
                >
                </span>
                {props.eventName}</h4>
            <h4 className="time">
                <i className="far fa-clock">
                </i> {props.eventTime}
            </h4>
        </div>
    )
}