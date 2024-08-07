import React, { useState } from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";

export default function TimecardContextWrapper(props){
    const [monthIndex, setMonthIndex] = useState(dayjs().month());
    const [showEventModal, setShowEventModal] = useState(false);
    const [daySelected, setDaySelected] = useState(null);
    const [showJobModal, setShowJobModal] = useState(null);
    const [jobSelected, setJobSelected] = useState(null);
    const [taskSelected, setTaskSelected] = useState(null);



    return(
        <>
            <GlobalContext.Provider value={{monthIndex,setMonthIndex, showEventModal,
                 setShowEventModal, daySelected, setDaySelected, showJobModal, setShowJobModal,
                 jobSelected, setJobSelected, taskSelected, setTaskSelected}}>
                {props.children}
            </GlobalContext.Provider>
        </>
    );
}