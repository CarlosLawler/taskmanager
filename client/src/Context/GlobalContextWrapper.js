import React, { useState } from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";

export default function TimecardContextWrapper(props){
    const [monthIndex, setMonthIndex] = useState(dayjs().month());
    const [showEventModal, setShowEventModal] = useState(false);
    const [daySelected, setDaySelected] = useState(null);
    const [showJobModal, setShowJobModal] = useState(false);

    return(
        <>
            <GlobalContext.Provider value={{monthIndex,setMonthIndex, showEventModal,
                 setShowEventModal, daySelected, setDaySelected, showJobModal, setShowJobModal}}>
                {props.children}
            </GlobalContext.Provider>
        </>
    );
}