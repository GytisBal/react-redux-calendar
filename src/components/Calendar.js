import React from "react";
import RenderCells from './Cells'
import dateFns from "date-fns";
import "../styles/main.scss";
import {useSelector, useDispatch} from "react-redux";
import {SET_MONTH} from "../redux/constants/action-types";

const Calendar = () => {
    const dispatch = useDispatch();
    const currentMonth = useSelector(state=>state.currentMonth);

    const nextMonth = () => {
        dispatch({type: SET_MONTH, payload: dateFns.addMonths(currentMonth, 1)});
    };

    const prevMonth = () => {
        dispatch({type: SET_MONTH, payload: dateFns.subMonths(currentMonth, 1)});
    };

    return (
        <div className="calendar-box">
            <div className="calendar-navigation-row">
                <div className="calendar-nvaigation-row-year-container">
                    <i onClick={prevMonth}
                       className="fas fa-chevron-left"
                       style={{paddingRight: "4rem"}}
                    />
                    <h2 style={{display: "inline-block", width: "20rem", textAlign: "center"}}>
                        {dateFns.format(currentMonth, "MMMM YYYY")}</h2>
                    <i onClick={nextMonth}
                       className="fas fa-chevron-right"
                       style={{paddingLeft: "4rem"}}
                    />
                </div>
            </div>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th scope="col">Sunday</th>
                    <th scope="col">Monday</th>
                    <th scope="col">Tuesday</th>
                    <th scope="col">Wednesday</th>
                    <th scope="col">Thursday</th>
                    <th scope="col">Friday</th>
                    <th scope="col">Saturday</th>
                </tr>
                </thead>
                <RenderCells/>
            </table>
        </div>
    )
};

export default Calendar