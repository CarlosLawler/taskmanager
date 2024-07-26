//import React, { useState } from "react";
import { useParams } from "react-router-dom"
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css"
//import axios from 'axios'
import logo from './images/Simplex-Logo-Short-Transparent-without-background.png'
import { Jobs } from "./Jobs";

function Dashboard(){
    const {name} = useParams();
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
                    <div className="col-6 col-md-4 col-lg-3 col-xl-2">
                        <div className="card text-start text-black bg-secondary">
                            <img className="card-img-top " src={logo} alt="Title" />
                            <div className="card-body">
                                <h4 className="card-title">Task 1</h4>
                                <p className="card-text">Something about task</p>
                                <div className="progress bg-black">
                                <div className="progress-bar progress-bar bg-danger text-black" role="progressbar"
                                aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={{width:"40%"}}>
                                    40%
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 col-md-4 col-lg-3 col-xl-2">
                        <div className="card text-start text-black bg-secondary">
                            <img className="card-img-top" src={logo} alt="Title" />
                            <div className="card-body">
                                <h4 className="card-title">Task 2</h4>
                                <p className="card-text">Something about task</p>
                                <div className="progress bg-black">
                                <div className="progress-bar progress-bar bg-danger text-black" role="progressbar"
                                aria-valuenow="95" aria-valuemin="0" aria-valuemax="100" style={{width:"95%"}}>
                                    95%
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 col-md-4 col-lg-3 col-xl-2">
                        <div className="card text-start text-black bg-secondary">
                            <img className="card-img-top" src={logo} alt="Title" />
                            <div className="card-body">
                                <h4 className="card-title">Task 3</h4>
                                <p className="card-text">Something about task</p>
                                <div className="progress bg-black">
                                <div className="progress-bar progress-bar bg-danger text-black" role="progressbar"
                                aria-valuenow="15" aria-valuemin="0" aria-valuemax="100" style={{width:"15%"}}>
                                    15%
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 col-md-4 col-lg-3 col-xl-2">
                        <div className="card text-start text-black bg-secondary">
                            <img className="card-img-top" src={logo} alt="Title" />
                            <div className="card-body">
                                <h4 className="card-title">Task 4</h4>
                                <p className="card-text">Something about task</p>
                                <div className="progress bg-black">
                                <div className="progress-bar progress-bar bg-danger text-black" role="progressbar"
                                aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style={{width:"45%"}}>
                                    45%
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 col-md-4 col-lg-3 col-xl-2">
                        <div className="card text-start text-black bg-secondary">
                            <img className="card-img-top" src={logo} alt="Title" />
                            <div className="card-body">
                                <h4 className="card-title">Task 5</h4>
                                <p className="card-text">Something about task</p>
                                <div className="progress bg-black">
                                <div className="progress-bar progress-bar bg-danger text-black" role="progressbar"
                                aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style={{width:"80%"}}>
                                    80%
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* {Jobs.map((data,key)=> {
                        return(
                            <div className="col-6 col-md-4 col-lg-3 col-xl-2">
                                <div className="card text-start text-black bg-secondary">
                                    <img className="card-img-top" src={logo} alt="Title" />
                                    <div className="card-body">
                                        <h4 className="card-title">{data.jobName}</h4>
                                        <p className="card-text">{data.jobDescription}</p>
                                        <div className="progress bg-black">
                                        <div className="progress-bar progress-bar bg-danger text-black" role="progressbar"
                                        aria-valuenow={data.progressQuote} aria-valuemin="0" aria-valuemax="100" style={{width:{data.progressQuote} }}>
                                            {data.progressPercent}
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })} */}
                </div>
            </div>
        </div>
        </>
    )
} export default Dashboard