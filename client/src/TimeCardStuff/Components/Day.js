import React, { useContext, useEffect, useState } from "react";
import './Day.css'
import GlobalContext from './../../Context/GlobalContext.js'
import dayjs from "dayjs";

export default function Day({day}){
    const {userEvents} = useContext(GlobalContext);
    const [dayEvents, setDayEvents] = useState([]);
    useEffect(()=>{
        const events = userEvents.filter(evt => dayjs(evt.StartTime).format("DD-MM-YY") === day.format("DD-MM-YY"));
        setDayEvents(events);
        console.log(dayEvents.length !== 0 ? day.format("DD-MM-YY")+": "+dayEvents: '');
    },[userEvents])
    return(
        <div className="day">
            <header className="day-header">
                <p className="day-number">{day.format("DD")}</p>
            </header>
            <div className="event-container">
                {/* The question mark makes sure that the data-set is populated before any attempt to map */}
                {dayEvents?.map((evt, idx) => (
                    <div key={idx} className="event">
                        {evt.JobName}: {evt.TaskName}
                    </div>
                ))}
            </div>
        </div>
    )
}