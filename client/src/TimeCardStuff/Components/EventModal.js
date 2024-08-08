import React, { useContext, useState, useEffect, useRef } from "react";
import GlobalContext from "../../Context/GlobalContext";
import './EventModal.css';
import 'bootstrap/js/dist/dropdown';
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function EventModal(){
    const [isTaskSelected, setIsTaskSelected] = useState(false);
    const [isJobSelected, setIsJobSelected] = useState(false);
    const [jobData, setJobData] = useState(['loading data...', 'loading data...', 'loading data...']);
    const [taskData, setTaskData] = useState(['loading data...', 'loading data...', 'loading data...']);
    const {setShowEventModal, jobSelected, setJobSelected, taskSelected, setTaskSelected} = useContext(GlobalContext);
    const fpStart = useRef(null);
    const fpEnd = useRef(null);
    const [report, setReport] = useState('');
    const [startDateTime, setStartDateTime] = useState('');
    const [endDateTime, setEndDateTime] = useState('');
    const {id} = useParams();

    
    useEffect(()=>{
        axios.get("http://localhost:5000/getJobsData",{
            params: {
                mode: "1",                                      //Read all {active}
                jobName: "",                                    //unnessesary
                quotedHours: "",                                //unnessesary
                calculatedHours: "",                            //unnessesary
                active: 1,                                      //getting all active

            }
        }).then(res=> {                                         //process the data recieved by the backend response
            setJobData(res.data.recordset);
        }).catch(err=> {
            console.log(err);
            console.log(err.message);
        });
    },['']);
    
    function taskSelect(task){
        setIsTaskSelected(true);
        setTaskSelected(task);
    }
    function jobSelect(job){
        setJobSelected(job);
        setIsJobSelected(true);
        setTaskSelected(null);
        setIsTaskSelected(false);
        console.log(jobSelected);
        console.log(jobSelected.JobID);

        setTaskData(['loading data...'])
        // setTimeout(()=>{
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
        // },3000)
    }
    function getTaskButtonText(){
        if(isTaskSelected){
            return(taskSelected.TaskName);
        }else{
            return('Tasks Avaliable');
        }
    }
    function getJobButtonText(){
        if(isJobSelected){
            return(jobSelected.JobName);
        }else{
            return('Jobs Avaliable');
        }
    }
    function closeModal(){
        setTaskSelected(null);
        setJobSelected(null);
        setShowEventModal(false);
    }
    //TODO: selecting job that resets task button text, task selected, and makes sure to rerun dropdowns

    // const mode = req.query.mode;
    // const userID = req.query.userID;
    // const jobID = req.query.jobID;
    // const taskID = req.query.taskID;
    // const startTime = req.query.startTime;
    // const endTime = req.query.endTime;
    // const report = req.query.report;
    function handleSubmit(){
        // axios.get("http://localhost:5000/getUserTasksData",{
        //     params: {
        //         mode: "0",                                                  //insert the following userTask entry
        //         userID: id,                                                 //UserID
        //         jobID: jobSelected.JobID,                                   // selected jobID
        //         taskID: taskSelected.TaskID,                                 // selected taskID
        //         startTime: startDateTime.flatpickr.formatDate
        //         (startDateTime.flatpickr.selectedDates[0],"Y-m-d H:i:S"),        //start date+time
        //         endTime: endDateTime.flatpickr.formatDate
        //         (endDateTime.flatpickr.selectedDates[0],"Y-m-d H:i:S"),            //end date+time
        //         report: report,                                             //progress report user entry 
        //     }
        // }).catch(err=> {
        //     console.log(err);
        //     console.log(err.message);
        // });
        // closeModal();
        console.log(id);
        console.log(jobSelected.JobID);
        console.log(taskSelected.TaskID);
        console.log(startDateTime.flatpickr.formatDate
            (startDateTime.flatpickr.selectedDates[0],"Y-m-d H:i:S"));
        console.log(endDateTime.flatpickr.formatDate
            (endDateTime.flatpickr.selectedDates[0],"Y-m-d H:i:S"));
        console.log(report);
    }

    return(
        <>
            <div id="eventModal" className="modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content bg-dark text-light custom-modal-border">
                        <div className="modal-header">
                            <h5 className="modal-title">New Punch</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal}></button>
                        </div>
                        <div className="modal-body">
                        <div className="row mb-3">
                            <label className="col-4 form-label text-start">Job:</label>
                            <div className="col-8">
                            <div className="dropdown w-100">
                                    <button className="btn btn-secondary dropdown-toggle text-truncate bg-custom w-100"
                                        type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        {getJobButtonText()}
                                    </button>
                                    <ul className="dropdown-menu w-100 full-width-dropdown" aria-labelledby="dropdownMenuButton1">
                                        {jobData.map((job) => {
                                            return(
                                            <li key={job.JobID} className="dropdown-item" value="Action"
                                                onClick={() => jobSelect(job)}>
                                                {job.JobName}
                                            </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-4 form-label text-start">Task:</label>
                            <div className="col-8">
                                <div className="dropdown w-100">
                                    <button className="btn btn-secondary dropdown-toggle text-truncate bg-custom w-100"
                                        type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        {getTaskButtonText()}
                                    </button>
                                    <ul className="dropdown-menu w-100 full-width-dropdown" aria-labelledby="dropdownMenuButton1">
                                    {taskData.map((task) => {
                                        return(
                                            <li key={task.TaskID} className="dropdown-item" value="Action"
                                            onClick={() => taskSelect(task)}>
                                            {task.TaskName}
                                            </li>
                                        )
                                    })}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-4 form-label text-start">Start:</label>
                            <div className="col-8 input-group">
                                <Flatpickr ref={fpStart} className="form-control bg-custom" data-enable-time dateFormat="Y-m-d H:i:S" onChange={() => setStartDateTime(fpStart.current)} />
                                <button className="btn btn-outline-secondary" type="button" onClick={() => {
                                    if (!fpStart?.current?.flatpickr) return;
                                    fpStart.current.flatpickr.clear();
                                    }}>Clear
                                </button>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-4 form-label text-start">End:</label>
                            <div className="col-8 input-group">
                                <Flatpickr ref={fpEnd} className="form-control bg-custom" data-enable-time onChange={() => setEndDateTime(fpEnd.current)} />
                                <button className="btn btn-outline-secondary" type="button" onClick={() => {
                                    if (!fpEnd?.current?.flatpickr) return;
                                    fpEnd.current.flatpickr.clear();
                                    }}>Clear
                                </button>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-4 form-label text-start">Report:</label>
                            <div className="col-8">
                                <textarea className="form-control bg-custom text-light" value={report} placeholder="Anything to report?" onChange={(e) => setReport(e.target.value)} />
                            </div>
                        </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={closeModal}>Close</button>
                            <button type="button" className="btn btn-custom" onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}



