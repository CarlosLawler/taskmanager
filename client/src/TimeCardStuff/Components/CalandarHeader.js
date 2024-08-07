import React, { useContext } from "react";
import * as FaIcons from "react-icons/fa6";
import GlobalContext from "../../Context/GlobalContext";
import dayjs from "dayjs";
import './CalandarHeader.css'

export default function CalandarHeader(){
    const {monthIndex, setMonthIndex, setShowEventModal} = useContext(GlobalContext);

    function goToToday(){
        setMonthIndex(dayjs().month());
    }
    function previousMonth(){
        setMonthIndex(monthIndex - 1);
    }
    function nextMonth(){
        setMonthIndex(monthIndex + 1);
    }
    const daysOfWeek = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"
    ]
    return(
        <>
            <header className="row justify-content-start align-items-center m-0 p-0">
                <button className="col-2 m-3 p-0" onClick={goToToday}>
                    Today
                </button>
                <FaIcons.FaAngleLeft className="col-2 p-0 moveMonth" onClick={previousMonth}/>
                <h3 className="col-4">
                    {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
                </h3>
                <FaIcons.FaAngleRight className="col-2 p-0 moveMonth" onClick={nextMonth}/>
                <button className="col-2" onClick={() => setShowEventModal(true)}>Create</button>
            </header>
            <div className="d-flex row justify-content-start p-0 m-0">
                {daysOfWeek.map((dayLabels)=>{
                    return(
                        <div className="labels">
                            {dayLabels}
                        </div>
                    )
                })}
            </div>
        </>
    )
}