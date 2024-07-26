import React from "react";
import Day from "./Day";
import CalandarHeader from "./CalandarHeader";

export default function Month({month}){
    return(
        <>
            <div className="d-flex row">
                <React.Fragment>
                    <CalandarHeader month={month}/>
                </React.Fragment>
            </div>
            {/* //FIXME: issue when month starts on saturday ie. this past june */}
            <div className="d-flex row rounded seven-cols pb-1">
                {month.map((row,i) => (
                    <React.Fragment>
                        {row.map((day,idx) => (
                            <Day day={day} key = {idx} rowIdx = {i}/>
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </>
    )
}