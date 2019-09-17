import React from 'react'
import AddTaskForm from "./addTaskForm";
import Task from "./Task"
import dateFns from "date-fns";
import "../styles/main.scss";
import {useSelector, useDispatch} from 'react-redux';
import {ADD_EVENT, EVENT_BUTTON, SET_DATE,} from "../redux/constants/action-types";

const RenderCells = () => {
    const dispatch = useDispatch();
    const currentMonth = useSelector(state => state.currentMonth);
    const selectedDate = useSelector(state => state.selectedDate);
    const addEvent = useSelector(state => state.addEvent);

    let allEvents = JSON.parse(localStorage.getItem('allEvents'));
    if (allEvents === null) allEvents = [];

    const onDateClick = (day) => {
        const date = dateFns.format(day, "MMMMYYYYDD");
        const findDate = findObjectByDate(allEvents, 'date', date);
        dispatch({type: SET_DATE, payload: day});

        if (!dateFns.isSameDay(day, selectedDate)) {
            dispatch({type: ADD_EVENT, payload: false});
        }
        if (findDate !== null) {
            dispatch({type: EVENT_BUTTON, payload: true})
        } else {
            dispatch({type: EVENT_BUTTON, payload: false})
        }
    };

    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);
    const dateFormat = "D";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            formattedDate = dateFns.format(day, dateFormat);
            const cloneDay = day;

            let addTaskForm;
            if (addEvent === true &&
                dateFns.isSameDay(day, selectedDate) === true) {
                addTaskForm = <AddTaskForm id={day}/>
            }
            let newTask;
            allEvents.map((x) => {
                if (dateFns.isSameDay(day, x.id)) {
                    return newTask = <Task
                        eventName={x.name}
                        eventTime={x.time}
                        date={x.date}
                    />
                }
            });
            days.push(
                <td
                    className={`${
                        !dateFns.isSameMonth(day, monthStart)
                            ? "disabled"
                            : dateFns.isSameDay(day, selectedDate) ? "highlight" : ""
                        }`}

                    key={day}
                    onClick={() => onDateClick(dateFns.parse(cloneDay))}>

                    {formattedDate}
                    {addTaskForm}
                    {newTask}
                </td>
            );
            day = dateFns.addDays(day, 1);
        }

        rows.push(
            <tr key={day}>
                {days}
            </tr>
        );

        days = [];
    }
    return <tbody className="body">{rows}</tbody>;
};

export default RenderCells;

const findObjectByDate = (array, key, value) => {
    for (let i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
            return array[i];
        }
    }
    return null;
};