import {getMonth} from './Components/util';
import React, { useContext, useEffect, useState } from 'react';
import Month from './Components/Month'
import GlobalContext from '../Context/GlobalContext';
import EventModal from './Components/EventModal';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Timecard.css';

function Timecard(){
    const [currentMonth, setCurrentMonth] = useState(getMonth());
    const{monthIndex, showEventModal, setUserEvents} = useContext(GlobalContext);
    const {id} = useParams();
    useEffect(()=>{
        setCurrentMonth(getMonth(monthIndex));
        axios.get('https://taskmanager-backend-9oui.onrender.com/getUserTasksData',{
            params: {
                mode: '1',
                userID: id,
                jobID: '',
                taskID: '',
                startTime: '',
                endTime: '',
                report: '',
                
            }
        }).then(res=> {                                         //process the data recieved by the backend response
            setUserEvents(res.data.recordset);
        }).catch(err=> {
            console.log(err)
            console.log(err.message)
        });
    },[monthIndex]);
    return(
        <>
            <React.Fragment>
                {showEventModal && <EventModal/>}
                <div className='timecard'>
                    <div className='container-fluid vh-100 pt-3 justify-content-center align-items-start bg-dark rounded text-white'>
                        <h2 className='text-white'>
                            Timecard
                        </h2>
                        <div className= 'container-fluid text-black bg-white rounded'>
                            <Month  month={currentMonth}/>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        </>
    );
} export default Timecard