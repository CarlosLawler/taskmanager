import React from "react";
import Day from "./Day";
import CalendarHeader from "./CalandarHeader";
import './Month.css'

export default function Month({month}){
    // FIXME: issue when month starts on saturday
    return(
        <>
      <div className="calendar-container">
      <CalendarHeader />
      <div className="calendar-days">
        {month.map((row, rowIdx) => (
          <div className="calendar-row" key={rowIdx}>
            {row.map((day, dayIdx) => (
              <Day day={day} key={dayIdx} />
            ))}
          </div>
        ))}
      </div>
    </div>
    </>
    )
}