import sql from 'mssql';

/*Querys the database based on the following parameters:
{mode:"", email:"", password:"", firstName: "", lastName: ""} 

@param mode
    a string 0-4 with a specific funtion indication following CRUD operations
        0-insert user data
        1-read single user data
        2-update password
        3-delete user
    extra:
        4-read all user data
@param email
    the intended email target
@param password
    the password to be either inserted/updated/deleted
@param firstName
    the first name to be inserted
@param lastName
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
    data:{
        output:{??}
        recordset:[{object holding row data},{object holding row data}...]
        recordsets:[[{object holding row data},{object holding row data}...]]
        rowsAffected:[#of rows interacted with(read/manipulated)]
    }
*/
 export async function queryUserTasks(mode, userID, jobID, taskID, startTime, endTime, report) {
    const config = {
        user: 'CloudSAbd3408f6', // better stored in an app setting such as process.env.DB_USER
        password: 'Simplex123', // better stored in an app setting such as process.env.DB_PASSWORD
        server: 'simplex-task-manager-server.database.windows.net', // better stored in an app setting such as process.env.DB_SERVER
        port: 1433, // optional, defaults to 1433, better stored in an app setting such as process.env.DB_PORT
        database: 'TaskManagerDB', // better stored in an app setting such as process.env.DB_NAME
        authentication: {
            type: 'default'
        },
        options: {
            encrypt: true
        }
    }
    try {
        //connect to db
        var poolConnection = await sql.connect(config);
        console.log('starting User Tasks...')
        switch(mode){
            
            //following CRUD operation ordering
            case("0")://Create/Insert new entry
                //to insert new email and password
                var resultSet = await poolConnection.request().query('Insert INTO UserTasks (UserID, JobID, TaskID, '
                +'StartTime, EndTime, Report) VALUES (\''+userID+'\',\''+jobID+'\',\''+taskID+'\',\''
                +startTime+'\',\''+endTime+'\',\''+report+'\')');
            break;

            case("1")://Read
                //read all entries of a user
                var resultSet = await poolConnection.request().query('SELECT * FROM UserTasks WHERE UserID = \''
                +userID+'\'');
            break;
            //TODO:Update UserTasks
            case("2")://Update
                //update to new passord for email
                var resultSet = await poolConnection.request().query('UPDATE UserTasks SET Password = \''
                +password+'\' WHERE Email = \''+email+'\'');
            break;

            case("3")://Delete
                //delete entry
                var resultSet = await poolConnection.request().query('DELETE FROM UserTasks WHERE JobID = \''+jobID
                    +'\' AND UserID = \''+ userID + '\' AND TaskID = \'' + taskID + '\' AND StartTime = \''+ startTime);
            break;

            case("4")://Read all for a specific Job
                //read all entries of a specific email
                var resultSet = await poolConnection.request().query('SELECT * FROM UserTasks WHERE JobID = \''+
                    jobID + '\'');
            break;

            default://Trash
                console.log('defaulting error in UserTasks');
            break;
        }
        // close connection only when we're certain application is finished
        poolConnection.close();
        console.log("connect close in UserTasks");
        return resultSet;
    } catch (err) {
        console.error(err.message);
    }
}

/*
Prompts:(Im bad at sql)

    Select:
        SELECT * FROM Users
    Insert:
        Insert INTO Users (Email, Password) VALUES (\'valueEmail\',\'valuePassword\')
    Delete:
        DELETE FROM Users WHERE UserID = \'valueUserID\'
    Update:
        UPDATE Users SET Password = \'valueNewPassword\' WHERE Email = \'valueEmail\'


*/