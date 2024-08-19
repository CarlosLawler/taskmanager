import sql from 'mssql';
const prompt = require('prompt-sync')();

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

/*
    //Use Azure VM Managed Identity to connect to the SQL database
    const config = {
        server: process.env['db_server'],
        port: process.env['db_port'],
        database: process.env['db_database'],
        authentication: {
            type: 'azure-active-directory-msi-vm'
        },
        options: {
            encrypt: true
        }
    }

    //Use Azure App Service Managed Identity to connect to the SQL database
    const config = {
        server: process.env['db_server'],
        port: process.env['db_port'],
        database: process.env['db_database'],
        authentication: {
            type: 'azure-active-directory-msi-app-service'
        },
        options: {
            encrypt: true
        }
    }
*/

console.log('Starting...');
//decide what table function to exicute (read, insert, delete)
let mode = prompt('\nOptions (press 1-4 then enter)\n1: Query Users\n2: Insert Item\n'
+'3: Delete Item\n4: Update Password\n\n');

//type of function and the query established to later be used in prints and querying
let Read = {
    type: 'Read',
    query: 'SELECT * FROM Users'
}
let Insert = {
    type: 'Insert',
    query: 'Insert INTO Users (Email, Password) VALUES (\''
}
let Delete = {
    type: 'Delet',
    query: 'DELETE FROM Users WHERE UserID = \''
}
let Update = {
    type: 'Updat',
    query: 'UPDATE Users SET Password = \''
}
let modeOpts = [Read, Insert, Delete, Update];

//used to hold secondary prompts responses that will alter the design of the query
var secondary = {
    UserID: '',
    Email: '',
    Password: ''
}

//switching to handle prompting for pertinate information
switch(mode){
    
    case '1'://reading
    break;
    
    case '2'://inserting
        secondary.Email += prompt('\nEnter an Email to insert.  ');
        secondary.Password += prompt('\nEnter a Password to insert. ');
        modeOpts[1].query += secondary.Email +'\',\''+ secondary.Password +'\')';
    break;
    
    case '3'://deleting
        secondary.UserID += prompt('\nEnter an UserID to delete.    ');
        modeOpts[2].query += secondary.UserID +'\'';
    break;

    case '4'://updating

        let confirmed = '';
        let invalid = true;
        secondary.Email += prompt('\nWhat is your Email?  ');
        
        while(invalid){
            secondary.Password += prompt('\nEnter a new Password. ');
            confirmed += prompt('\nConfirm new Password. ');
            if(secondary.Password == confirmed){
                invalid = false;
            }else{
                secondary.Password = '';
                confirmed = '';
            }
        }
        modeOpts[3].query += secondary.Password +'\' WHERE Email = \'' + secondary.Email + '\'';
    break;
    
    default:
    break;
}

mode -= 1;

//DEBUG
console.log('\n' + modeOpts[mode].query);

connectAndQuery(mode);

async function connectAndQuery(mode) {
    try {
        //connect to db
        var poolConnection = await sql.connect(config);
        
        //query
        var resultSet = await poolConnection.request().query(modeOpts[mode].query);
        
        //prints 
        console.log('\n%sing rows in the Table...',modeOpts[mode].type);
        if(mode == '0'){
            
            console.log(`\n${resultSet.recordset.length} rows returned.\n`);
        
            // output column headers
            var columns = '';
            for (var column in resultSet.recordset.columns) {
                columns += column + ', ';
            }
            console.log('%s\t', columns.substring(0, columns.length - 2));

            // ouput row contents from default record set
            resultSet.recordset.forEach(row => {
                console.log('%s\t%s\t%s',row.UserID, row.Email, row.Password);
            });
        }
        
        console.log('\nsuccess\n');

        // close connection only when we're certain application is finished
        poolConnection.close();
    } catch (err) {
        console.error(err.message);
    }
}