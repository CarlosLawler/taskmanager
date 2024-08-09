import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import './../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import logo from './../images/Simplex-Logo-Short-Transparent-without-background.png'
import axios from "axios";
import GlobalContext from  './../Context/GlobalContext'
import JobModal from "./Components/JobModal";
import TaskContainer from "./Components/TaskContainer";
import ProgressBar from "./Components/ProgressBar";
import './Components/Card.css'

function Dashboard(){
    const {name} = useParams();
    const [jobData, setJobData] = useState(['loading data...', 'loading data...', 'loading data...']);
    const constant = 0;
    const{showJobModal, setShowJobModal, setJobSelected} = useContext(GlobalContext);
    //FIXME: could use one query at start to populate all necessary data rather than multiple queries throughout. 
    //it would update speed, and potentially cost (query costs)
    useEffect(()=>{
        //should connect before use and make the second attempt not fail?
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
    }, [constant]);

    function openJobModal(job){
        setJobSelected(job);
        setShowJobModal(true);
    }
    
    return(
        <>
        {showJobModal && <JobModal/>}
        <div className="home">
            <div className="container-fluid vh-100 pt-3 justify-content-center align-items-start bg-dark rounded">
                <div className="row pt-2 justify-content-start align-items-start g-2">
                    <h2 className="text-white">
                        Welcome {name}!
                    </h2>
                </div>
                <div className="row pt-2 justify-content-start align-items-start g-2">
                    {jobData.map((job)=>{
                        axios.get("http://localhost:5000/getUserTasksData",{
                            params: {
                                mode: '4',
                                userID: '',
                                jobID: job.JobID,
                                taskID: '',
                                startTime: '',
                                endTime: '',
                                report: '',
                                category: '',
                            }
                        }).then(res=> {                                         //process the data recieved by the backend response
                            const allHours = res.data.recordset;
                            let calculatedHours = 0;
                            allHours.forEach((element) => {
                                calculatedHours += element.Hours;
                            });
                            if(job.CalculatedHours === calculatedHours){
                            }else{
                                axios.get("http://localhost:5000/getJobsData",{
                                    params: {
                                        mode: "2",                                               //Update Jobs with the JobName
                                        jobName: job.JobName,                                    //job to update
                                        quotedHours: job.QuotedHours,                            //quoted hours to update to
                                        calculatedHours: calculatedHours,                        //calculated hours to update to
                                    }
                                }).catch(err=> {
                                    console.log(err)
                                    console.log(err.message)
                                });
                            }

                        }).catch(err=> {
                            console.log(err)
                            console.log(err.message)
                        });
                        let percentage = job.CalculatedHours / job.QuotedHours * 100.0;
                        let percentageString = percentage + ''
                        {percentage<100 ? percentageString = percentage + '' : percentageString = '100'}

                        return (
                            <div key={job.JobID} className="col-6 col-md-4 col-lg-3" onClick={() => openJobModal(job)}>
                                <div className="card text-start text-black bg-secondary">
                                    <img className="card-img-top" src={logo} alt="Title" />
                                    <div className="card-body">
                                        <h4 className="card-title text-truncate">{job.JobName}</h4>
                                        <TaskContainer jobID = {job.JobID}/>
                                        <ProgressBar progress = {percentageString}/>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
        </>
    )
} export default Dashboard