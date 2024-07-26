import React from "react";
import './Day.css'

export default function Day({day, rowIdx}){
    return(
        <div className="col-sm-1 border">
            <header>
                <p>
                    {day.format("DD")}
                </p>
            </header>
        </div>
    )
}