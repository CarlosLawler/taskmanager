import axios from 'axios';
import React, { useState } from 'react';

const Settings = () => {
    const [inputText, setInputText] = useState('');
    const [isInputProvided, setIsInputProvided] = useState(false);
    const [queryResult, setQueryResult] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputText(value);
        setIsInputProvided(value.trim() !== '');
        setQueryResult(null); // Reset queryResult to hide the table
    };

    const handleSubmit = () => {
        axios.get("http://localhost:5000/settings", {
            params: {
                query: inputText,
            }
        }).then(res => {
            console.log(res.data.recordset);
            if (res.data.recordset.length === 0) {
                setErrorMessage('No records to display');
                setQueryResult(null);
            } else if (res.data.recordset == null) {
                setErrorMessage('There was an error with the query, try again');
                setQueryResult(null);
            } else {
                setQueryResult(res.data.recordset);
                setErrorMessage('');
            }
        }).catch(err => {
            console.log(err);
            console.log(err.message);
            setErrorMessage('There was an error with the query, try again');
        });
    };

    return (
        <>
            <div className="settings">
                <div className="container-fluid vh-100 pt-3 d-flex flex-column justify-content-start align-items-center bg-dark rounded text-white">
                    <h1 className="mb-4">Settings</h1>
                    {/* Insert a statement to the user based on JSON */}
                    <div className="alert alert-info w-50 text-center" role="alert">
                        {/* This could be dynamically generated based on JSON data */}
                        Select a table from the list and feel free to query it.
                    </div>
                    <div className="container-fluid bg-light text-black rounded p-4 mt-3 w-50">
                        <h5>Tables</h5>
                        <ul className="list-group mb-3">
                            <li className="list-group-item">Users</li>
                            <li className="list-group-item">Tasks</li>
                            <li className="list-group-item">Jobs</li>
                            <li className="list-group-item">UserTasks</li>
                            <li className="list-group-item">ProjectPartsData</li>
                            {/* Add more tables as needed */}
                        </ul>
                        <div className="form-group">
                            <label htmlFor="settingsTextarea">Your Settings</label>
                            <textarea 
                                className="form-control" 
                                id="settingsTextarea" 
                                rows="5"
                                value={inputText}
                                onChange={handleInputChange}
                            ></textarea>
                        </div>
                        <button 
                            className={`btn mt-3 w-100 ${isInputProvided ? 'btn-primary' : 'btn-secondary'}`} 
                            disabled={!isInputProvided} onClick={handleSubmit}
                        >
                            Submit
                        </button>
                        {errorMessage && <p className="mt-4 text-danger">{errorMessage}</p>}
                    </div>
                    {queryResult && (
                            <div className="mt-4">
                                <h5>Query Results</h5>
                                <table className="table table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            {Object.keys(queryResult[0]).map((key) => (
                                                <th key={key}>{key}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {queryResult.map((row, index) => (
                                            <tr key={index}>
                                                {Object.values(row).map((value, i) => (
                                                    <td key={i}>{value}</td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                </div>
            </div>
        </>
    );
};

export default Settings;
