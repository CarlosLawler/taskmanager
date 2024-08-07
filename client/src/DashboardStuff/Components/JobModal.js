import React, { useContext, useState, useEffect, useRef } from "react";
import GlobalContext from "./../../Context/GlobalContext";
import './JobModal.css';
import 'bootstrap/js/dist/dropdown';
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";

export default function JobModal(){
    const [task, setTask] = useState('');
    const [job, setJob] = useState('Jobs Availiable');
    const {setShowJobModal} = useContext(GlobalContext);
    const fpStart = useRef(null);
    const fpEnd = useRef(null);
    // useEffect(()=>{
    //     console.log(fpStart);
    //     console.log(fpEnd);
    // },[fpStart, fpEnd]);
    useEffect(()=>{
        console.log(job);
    },[job]);
    useEffect(()=>{
        console.log(task);
    },[task]);
    return(
        <>
            <div id= "eventModal" className="modal" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">New Punch</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowJobModal(false)}></button>
                        </div>
                        <div className="modal-body">
                            {/* //TODO: add options for dropdowns */}
                            <div className="d-flex flex-row justify-content-between align-items-center m-0 p-0">
                                <h5 className="col-4">
                                    Job:
                                </h5>
                                <div className="dropdown col-8">

                                    {/* //FIXME: here I want to use the variable jobs that is changed in setJobs as the text in the button */}
                                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        {job}
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li className="dropdown-item" value="Action" onClick={(e) => setJob(JSON.stringify(e.target.value))}>Action</li>
                                        <li className="dropdown-item" value="Another action" onClick={(e) => setJob(e.target.value)}>Another action</li>
                                        <li className="dropdown-item" value="Something else here" onClick={(e) => setJob(e.target.value)}>Something else here</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="d-flex flex-row justify-content-between align-items-center m-0 pt-2">
                                <h5 className="col-4">
                                    Task:
                                </h5>
                                <div className="dropdown col-8">
                                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        Task Availiable
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li className="dropdown-item" value="Action" onClick={(e) => setTask(e.target.value)}>Action</li>
                                        <li className="dropdown-item" value="Another action" onClick={(e) => setTask(e.target.value)}>Another action</li>
                                        <li className="dropdown-item" value="Something else here" onClick={(e) => setTask(e.target.value)}>Something else here</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="d-flex flex-row justify-content-between align-items-center m-0 pt-2">
                                <h5 className="col-4">
                                    Start:
                                </h5>
                                <div className="col-8 rounded">
                                    <Flatpickr ref={fpStart} className="col-9"  data-enable-time/>
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
                                    <Flatpickr ref={fpEnd} className="col-9"  data-enable-time/>
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
                                <textarea className="col-8 rounded" placeholder="  Anything to report?"/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setShowJobModal(false)}>Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}



