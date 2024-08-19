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
    const {setShowJobModal,jobSelected,setJobSelected} = useContext(GlobalContext);
    const fpStart = useRef(null);
    const fpEnd = useRef(null);
    const [report, setReport] = useState('');
    const [startDateTime, setStartDateTime] = useState('');
    const [endDateTime, setEndDateTime] = useState('');
    const {id} = useParams();
    const taskSelected = useRef(null);



    useEffect(()=>{
        //should connect before use and make the second attempt not fail?
        axios.get("http://localhost:8000/getTasksData",{
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
        taskSelected.current = task;
    }
    function getButtonText(){
        if(isTaskSelected){
            return(taskSelected.current.TaskName);
        }else{
            return('Tasks Avaliable');
        }
    }
    function closeModal(){
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
        axios.get("http://localhost:8000/getUserTasksData",{
            params: {
                mode: "0",                                                  //insert the following userTask entry
                userID: id,                                                 //UserID
                jobID: jobSelected.JobID,                                   // selected jobID
                taskID: taskSelected.current.TaskID,                                 // selected taskID
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
                  <h5 className="m-0">{jobSelected.JobName}</h5>
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-4 form-label text-start">Task:</label>
                <div className="col-8">
                  <div className="dropdown w-100">
                    <button className="btn btn-secondary dropdown-toggle text-truncate bg-custom w-100"
                      type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                      {getButtonText()}
                    </button>
                    <ul className="dropdown-menu w-100 full-width-dropdown" aria-labelledby="dropdownMenuButton1">
                      {/* The question mark makes sure that the data-set is populated before any attempt to map */}
                      {taskData?.map((task, idx) => {

                          return(
                              <li key={idx} className="dropdown-item" value="Action"
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
                  }}>Clear</button>
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-4 form-label text-start">End:</label>
                <div className="col-8 input-group">
                  <Flatpickr ref={fpEnd} className="form-control bg-custom" data-enable-time onChange={() => setEndDateTime(fpEnd.current)} />
                  <button className="btn btn-outline-secondary" type="button" onClick={() => {
                    if (!fpEnd?.current?.flatpickr) return;
                    fpEnd.current.flatpickr.clear();
                  }}>Clear</button>
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



