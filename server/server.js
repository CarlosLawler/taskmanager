import express from 'express';
import cors from 'cors';
import { queryUserTasks, querySettings } from './user_tasks_query.js';
import { queryJobs } from './jobs_query.js';
import { queryUsers } from './user_query.js';
import { queryTasks } from './tasks_query.js';

//the combination of express and cors allows us to take advantage HTTP protocols
const app = express();
app.use(cors());

/*Aknowleges the request sent by the front-end and takes the data in the request:
{mode:"", email:"", password:"", firstName: "", lastName: ""},
and Querys the database returning  a response back to the front end 

@param req.query.mode
    an int 0-4 with a specific funtion indication following CRUD operations,
    0-insert user data
    1-read user data
    2-update password
    3-delete user
    4-read all user data
@param req.query.email
    the intended email target
@param req.query.password
    the password to be either inserted/updated/deleted
@param req.query.firstName
    the first name to be inserted
@param req.query.lastName
    the last name to be inserted
@requires
    mode must be 0-4
    mode(0):
        all parameters must be a non-empty string
    mode(1):
        email must be non-empty string
    mode(2):
        email and password must be non-empty string
    mode(3):
        email must be non-empty string
@ensures
    returns responses object or error message
    response:{
        data:{
            output:{??}
            recordset:[{object holding row data},{object holding row data}...]
            recordsets:[[{object holding row data},{object holding row data}...]]
            rowsAffected:{#of rows interacted with(read/manipulated)}
        }
    }
*/
app.get("/getData", async (req,res)=>{
    //gets parameters from request
    const mode = req.query.mode;
    const email = req.query.email;
    const password = req.query.password;
    const firstName = req.query.firstName;
    const lastName = req.query.lastName;

    //establishes connection and querys the database
    const response = await queryUsers(mode, email, password, firstName, lastName);
    //send back the database response
    res.send(response);
})

//getting job info
app.get("/getJobsData", async (req,res)=>{
    //gets parameters from request
    const mode = req.query.mode;
    const jobName = req.query.jobName;
    const quotedHours = req.query.quotedHours;
    const calculatedHours = req.query.calculatedHours;
    const active = req.query.active;


    //establishes connection and querys the database
    const response = await queryJobs(mode, jobName, quotedHours, calculatedHours, active);
    //send back the database response
    res.send(response);
})

//get tasks info
app.get("/getTasksData", async (req,res)=>{
    //gets parameters from request
    const mode = req.query.mode;
    const taskName = req.query.taskName;
    const jobID = req.query.jobID;
    const quotedHours = req.query.quotedHours;
    const calculatedHours = req.query.calculatedHours;
    const active = req.query.active;


    //establishes connection and querys the database
    const response = await queryTasks(mode, jobID, taskName, quotedHours, calculatedHours, active);
    //send back the database response
    res.send(response);
})

//getting User Entries info
app.get("/getUserTasksData", async (req,res)=>{
    //gets parameters from request
    const mode = req.query.mode;
    const userID = req.query.userID;
    const jobID = req.query.jobID;
    const taskID = req.query.taskID;
    const startTime = req.query.startTime;
    const endTime = req.query.endTime;
    const report = req.query.report;

    //establishes connection and querys the database
    const response = await queryUserTasks(mode, userID,jobID,
        taskID,startTime,endTime,report);
    //send back the database response
    res.send(response);
})
app.get("/settings", async (req,res)=>{
    //gets parameters from request
    const query = req.query.query;

    //establishes connection and querys the database
    const response = await querySettings(query);
    //send back the database response
    res.send(response);
})

//starts listening at port 5000
app.listen(5000, () => {
    console.log("Listening...");
})