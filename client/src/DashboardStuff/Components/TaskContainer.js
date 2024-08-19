import React, { useEffect, useState } from 'react';
import './TaskContainer.css'
import axios from 'axios';

export default function TaskContainer({jobID}){
    const [taskData, setTaskData] = useState([{TaskName: 'Loading data...'}]);
    useEffect(()=>{
        setTimeout(() => {
            
            axios.get('https://taskmanager-backend-9oui.onrender.com/getTasksData',{
                params: {
                    mode: '1',                                      //Read all Where {active} and {jobID}
                    taskName: '',                                   //unnessesary
                    jobID: jobID,                                   // select from specific jobID
                    quotedHours: '',                                //unnessesary
                    calculatedHours: '',                            //unnessesary
                    active: 1,                                      //choses the active or inactive 
                }
            }).then(res=> {                                         //process the data recieved by the backend response
                setTaskData(res.data.recordset);
            }).catch(err=> {
                console.log(err);
                console.log(err.message);
            });
        }, 300);
    }, []);

    return(
        <>
            <div className='task-container'>
                <h5>Tasks:</h5>
                <ul className='task-list'>
                    {/* The question mark makes sure that the data-set is populated before any attempt to map */}
                    {taskData?.map((task, idx)=>{
                        return(
                            <li key={idx} className='task-item'>{task.TaskName}</li>
                        )
                    })}
                </ul>
            </div>
        </>
    )
}