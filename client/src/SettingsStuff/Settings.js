import axios from 'axios';
import React, { useState } from 'react';
import './Settings.css'; // Import the custom styles

const Settings = () => {
    const [inputText, setInputText] = useState('');
    const [isInputProvided, setIsInputProvided] = useState(false);
    const [queryResult, setQueryResult] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [hoveredTable, setHoveredTable] = useState(null);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputText(value);
        setIsInputProvided(value.trim() !== '');
        setQueryResult(null);
    };

    const handleTableHover = (tableName) => {
        setHoveredTable(tableName);
    };

    const handleTableLeave = () => {
        setHoveredTable(null);
    };

    const handleSubmit = () => {
        axios.get("http://localhost:8000/settings", {
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
                    <div className="alert alert-info w-50 text-center" role="alert">
                        Select a table from the list and feel free to query it.
                    </div>
                    <div className="container-fluid bg-light text-black rounded p-4 mt-3 w-50">
                        <h5>Tables</h5>
                        <ul className="list-group mb-3">
                            <li 
                                className="list-group-item" 
                                onMouseEnter={() => handleTableHover('Users')} 
                                onMouseLeave={handleTableLeave}
                            >
                                Users
                                {hoveredTable === 'Users' && (
                                    <div className="popout row">
                                        <p><strong>UserID</strong> (int): Primary key</p>
                                        <p><strong>Email</strong> (string): Used for login</p>
                                        <p><strong>Password</strong> (string): Used for login</p>
                                        <p><strong>FirstName</strong> (string): Shown on Welcome Screen</p>
                                        <p><strong>LastName</strong> (string): Currently unused</p>
                                        <p><strong>Role</strong> (string): Determines access to settings</p>
                                    </div>
                                )}
                            </li>
                            <li 
                                className="list-group-item" 
                                onMouseEnter={() => handleTableHover('Tasks')} 
                                onMouseLeave={handleTableLeave}
                            >
                                Tasks
                                {hoveredTable === 'Tasks' && (
                                    <div className="popout row">
                                        <p><strong>TaskID</strong> (int): Primary key</p>
                                        <p><strong>JobID</strong> (int): Foreign key</p>
                                        <p><strong>Active</strong> (bit): Active tasks are shown to users</p>
                                        <p><strong>CalculatedHours</strong> (int): Used for task type estimation</p>
                                        <p><strong>TaskType</strong> (string): Categorizes task hours</p>
                                    </div>
                                )}
                            </li>
                            <li 
                                className="list-group-item" 
                                onMouseEnter={() => handleTableHover('Jobs')} 
                                onMouseLeave={handleTableLeave}
                            >
                                Jobs
                                {hoveredTable === 'Jobs' && (
                                    <div className="popout row">
                                        <p><strong>JobID</strong> (int): Foreign key</p>
                                        <p><strong>TaskID</strong> (int): Primary + Foreign key</p>
                                        <p><strong>Active</strong> (bit): Active jobs are shown to users</p>
                                        <p><strong>QuotedHours</strong> (int): Progress towards quote</p>
                                        <p><strong>CalculatedHours</strong> (int): Completed hours</p>
                                    </div>
                                )}
                            </li>
                            <li 
                                className="list-group-item" 
                                onMouseEnter={() => handleTableHover('UserTasks')} 
                                onMouseLeave={handleTableLeave}
                            >
                                UserTasks
                                {hoveredTable === 'UserTasks' && (
                                    <div className="popout row">
                                        <p><strong>JobID</strong> (int): Foreign key</p>
                                        <p><strong>UserID</strong> (int): Primary + Foreign key</p>
                                        <p><strong>TaskID</strong> (int): Primary + Foreign key</p>
                                        <p><strong>StartTime</strong> (datetime): Task session start</p>
                                        <p><strong>EndTime</strong> (datetime): Task session end</p>
                                        <p><strong>Hours</strong> (int): Computed from StartTime and EndTime</p>
                                        <p><strong>Report</strong> (string): Additional task details</p>
                                    </div>
                                )}
                            </li>
                            <li 
                                className="list-group-item" 
                                onMouseEnter={() => handleTableHover('ProjectPartsData')} 
                                onMouseLeave={handleTableLeave}
                            >
                                ProjectPartsData
                                {hoveredTable === 'ProjectPartsData' && (
                                    <div className="popout row">
                                        <p><strong>ProjectRoles</strong> (string): Used to categorize task types and populate dropdowns</p>
                                    </div>
                                )}
                            </li>
                        </ul>
                        <div className="form-group">
                            <label htmlFor="settingsTextarea">Your Query</label>
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