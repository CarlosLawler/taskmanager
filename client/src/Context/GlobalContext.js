import React from "react";

const TimecardContext = React.createContext({
    monthIndex: 0,
    setMonthIndex: (index)=>{},
    showEventModal: false,
    setShowEventModal: () => {},
    daySelected: null,
    setDaySelected: (day) => {},
    showJobModal: false,
    setShowJobModal: () => {},
});export default TimecardContext;