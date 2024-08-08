import React, { useContext, useState, useEffect, useRef } from "react";
import GlobalContext from "./../../Context/GlobalContext";
import './JobModal.css';
import 'bootstrap/js/dist/dropdown';
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import './../../../node_modules/flatpickr/dist/themes/airbnb.css'

export default function JobModal(){
    const [isTaskSelected, setIsTaskSelected] = useState(false);
    const [taskData, setTaskData] = useState(['']);
    const {setShowJobModal, jobSelected, setJobSelected, taskSelected, setTaskSelected} = useContext(GlobalContext);
    const fpStart = useRef(null);
    const fpEnd = useRef(null);
    const [report, setReport] = useState('');
    const [startDateTime, setStartDateTime] = useState('');
    const [endDateTime, setEndDateTime] = useState('');
    const {id} = useParams();


    useEffect(()=>{
        //should connect before use and make the second attempt not fail?
        axios.get("http://localhost:5000/getTasksData",{
            params: {
                mode: "1",                                      //Read all Where {active} and {jobID}
                taskName: "",                                   //unnessesary
                jobID: jobSelected.JobID,                       // select from specific jobID
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
    }, ['']);

    function taskSelect(task){
        setIsTaskSelected(true);
        setTaskSelected(task);
    }
    function getButtonText(){
        if(isTaskSelected){
            return(taskSelected.TaskName);
        }else{
            return('Tasks Avaliable');
        }
    }
    function closeModal(){
        setTaskSelected(null);
        setJobSelected(null);
        setShowJobModal(false);
    }

    // const mode = req.query.mode;
    // const userID = req.query.userID;
    // const jobID = req.query.jobID;
    // const taskID = req.query.taskID;
    // const startTime = req.query.startTime;
    // const endTime = req.query.endTime;
    // const report = req.query.report;
    function handleSubmit(){
        axios.get("http://localhost:5000/getUserTasksData",{
            params: {
                mode: "0",                                                  //insert the following userTask entry
                userID: id,                                                 //UserID
                jobID: jobSelected.JobID,                                   // selected jobID
                taskID: taskSelected.TaskID,                                 // selected taskID
                startTime: startDateTime.flatpickr.formatDate
                (startDateTime.flatpickr.selectedDates[0],"Y-m-d H:i:S"),        //start date+time
                endTime: endDateTime.flatpickr.formatDate
                (endDateTime.flatpickr.selectedDates[0],"Y-m-d H:i:S"),            //end date+time
                report: report,                                             //progress report user entry 
            }
        }).catch(err=> {
            console.log(err);
            console.log(err.message);
        });
        closeModal();
    }

    return(
        <>
            <div id= "eventModal" className="modal" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">New Punch</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal}></button>
                        </div>
                        <div className="modal-body">
                            {/* //TODO: add options for dropdowns */}
                            <div className="d-flex flex-row justify-content-between align-items-center m-0 p-0">
                                <h5 className="col-4">
                                    Job:
                                </h5>
                                <div className="dropdown col-8">

                                    {/* //FIXME: here I want to use the variable jobs that is changed in setJobs as the text in the button */}
                                    <h5>{jobSelected.JobName}</h5>
                                </div>
                            </div>
                            <div className="d-flex flex-row justify-content-between align-items-center m-0 pt-2">
                                <h5 className="col-4">
                                    Task:
                                </h5>
                                <div className="dropdown col-8">
                                    <button className="btn btn-secondary dropdown-toggle"
                                        type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        {getButtonText()}
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        {taskData.map((task)=>{
                                            return(
                                                <li key={task.TaskID} className="dropdown-item" value="Action" 
                                                onClick={() => taskSelect(task)}>
                                                    {task.TaskName}</li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </div>
                            <div className="d-flex flex-row justify-content-between align-items-center m-0 pt-2">
                                <h5 className="col-4">
                                    Start:
                                </h5>
                                <div className="col-8 rounded">
                                    <Flatpickr ref={fpStart} className="col-9"  data-enable-time dateFormat = "Y-m-d H:i:S" onChange={() => setStartDateTime(fpStart.current)}/>
                                    <button className="col-3"
                                    type="button"
                                    onClick={() => {
                                        if (!fpStart?.current?.flatpickr) return;
                                        fpStart.current.flatpickr.clear();
                                    }}
                                    >
                                    Clear
                                    </button>
                                </div>
                            </div>
                            <div className="d-flex flex-row justify-content-between align-items-center m-0 pt-2">
                                <h5 className="col-4">
                                    End:
                                </h5>
                                <div className="col-8 rounded">
                                    <Flatpickr ref={fpEnd} className="col-9"  data-enable-time onChange={() => setEndDateTime(fpEnd.current)}/>
                                    <button className="col-3"
                                    type="button"
                                    onClick={() => {
                                        if (!fpEnd?.current?.flatpickr) return;
                                        fpEnd.current.flatpickr.clear();
                                    }}
                                    >
                                    Clear
                                    </button>
                                </div>
                            </div>
                            <div className="d-flex flex-row justify-content-between align-items-center m-0 pt-2">
                                <h5 className="col-4">
                                    Report:
                                </h5>
                                <textarea className="col-8 rounded" value={report} placeholder="  Anything to report?" onChange={(e) => setReport(e.target.value)}/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={closeModal}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}



