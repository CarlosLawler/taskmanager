import React from "react";
import './Day.css'

export default function Day({day}){
    return(
        <div className="day">
      <header className="day-header">
        <p className="day-number">
          {day.format("DD")}
        </p>
      </header>
      {/* Additional content for the day can be added here */}
    </div>
    )
}