import React, { useState } from "react";
import TimecardContext from "./TimecardContext";
import dayjs from "dayjs";

export default function TimecardContextWrapper(props){
    const [monthIndex, setMonthIndex] = useState(dayjs().month());
    const [showEventModal, setShowEventModal] = useState(false);
    const [daySelected, setDaySelected] = useState(null);

    return(
        <>
            <TimecardContext.Provider value={{monthIndex,setMonthIndex, showEventModal, setShowEventModal, daySelected, setDaySelected}}>
                {props.children}
            </TimecardContext.Provider>
        </>
    );
}