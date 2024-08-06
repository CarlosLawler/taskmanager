import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css"
import logo from './images/Simplex-Logo-Short-Transparent-without-background.png'
import axios from "axios";

function Dashboard(){
    const {name} = useParams();
    const [jobData, setJobData] = useState(['']);
    useEffect(()=>{
        //should connect before use and make the second attempt not fail?
        axios.get("http://localhost:5000/getJobsData",{
            params: {
                mode: "1",                                      //Read all active
                jobName: "",                                    //unnessesary
                quotedHours: "",                                  //unnessesary
                hours: "",                                         //unnessesary
            }
        }).then(res=> {                                         //process the data recieved by the backend response
            setJobData(res.data.recordset);
            console.log(jobData);
            console.log(jobData[0].JobName)
        }).catch(err=> {
            console.log(err)
            console.log(err.message)
        });
    }, ['']);
    
    return(
        <>
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
                            console.log(allHours);
                            let calculatedHours = 0;
                            allHours.forEach((element) => {
                                calculatedHours += element.Hours;
                            });
                            console.log('calc '+ job.JobID +': '+ calculatedHours);
                            console.log('quote '+ job.JobID +': '+ job.QuotedHours);
                            console.log('name '+ job.JobID +': '+ job.JobName);


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
                        }).catch(err=> {
                            console.log(err)
                            console.log(err.message)
                        });
                        let percentage = job.CalculatedHours / job.QuotedHours * 100.0;
                        let percentageString = percentage + '';

                        return (
                            <div key={job.JobID} className="col-6 col-md-4 col-lg-3 col-xl-2">
                                <div className="card text-start text-black bg-secondary">
                                    <img className="card-img-top " src={logo} alt="Title" />
                                    <div className="card-body">
                                        <h4 className="card-title">{job.JobName}</h4>
                                        <p className="card-text">Something about task</p>
                                        <div className="progress bg-black">
                                        <div className="progress-bar progress-bar bg-danger text-black" role="progressbar"
                                        aria-valuenow={percentageString} aria-valuemin="0" aria-valuemax="100" style={{width:"40%"}}>
                                            {percentageString}%
                                        </div>
                                        </div>
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