import {getMonth} from './util';
import React, { useContext, useEffect, useState } from 'react';
import Month from './Components/Month'
import GlobalContext from '../Context/GlobalContext';
import EventModal from './Components/EventModal';

function Timecard(){
    console.table(getMonth());
    const [currentMonth, setCurrentMonth] = useState(getMonth());
    const{monthIndex, showEventModal} = useContext(GlobalContext);
    useEffect(()=>{
        setCurrentMonth(getMonth(monthIndex));
    },[monthIndex]);
    return(
        <>
        <React.Fragment>
            {showEventModal && <EventModal/>}
            <div className="timecard">
                <div className="container-fluid vh-100 pt-3 justify-content-center align-items-start bg-dark rounded text-white">
                    Timecard
                    <div className= 'container-fluid text-black bg-white rounded'>
                        <Month  month={currentMonth}/>
                    </div>
                </div>
            </div>
        </React.Fragment>
        </>
    );
} export default Timecard