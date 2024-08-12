import React, { useEffect, useState } from "react";
import './TaskContainer.css'
import axios from "axios";

export default function TaskContainer({jobID}){
    const [taskData, setTaskData] = useState(['loading data...', 'loading data...', 'loading data...' ]);
    const constant = 0;
    useEffect(()=>{
        //should connect before use and make the second attempt not fail?
            setTimeout(()=>{
                axios.get("https://taskmanager-backend-9oui.onrender.com/getTasksData",{
                    params: {
                        mode: "1",                                      //Read all Where {active} and {jobID}
                        taskName: "",                                   //unnessesary
                        jobID: jobID,                       // select from specific jobID
                        quotedHours: "",                                //unnessesary
                        calculatedHours: "",                            //unnessesary
                        active: 1,                                      //choses the active or inactive 
                    }
                }).then(res=> {                                         //process the data recieved by the backend response
                    setTaskData(res.data.recordset);
                }).catch(err=> {
                    console.log(err);
                    console.log(err.message);
                });
            },500)
    }, [constant]);

    return(
        <>
            <div class="task-container">
                <h5>Tasks:</h5>
                <ul class="task-list">
                    {taskData.map((task)=>{
                        return(
                            <li key={task.TaskID} class="task-item">{task.TaskName}</li>
                        )
                    })}
                </ul>
            </div>
        </>
    )
}