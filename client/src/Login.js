import React, { useContext, useEffect, useState } from "react";
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'
import logo from './images/Simplex-Logo-Short-Transparent-without-background.png'
import { useNavigate } from "react-router-dom";
import GlobalContext from './Context/GlobalContext.js'

function Login(){

    //set up state machines
    const [emailInput, setEmail] = useState('');
    const [passwordInput, setPassword] = useState('');
    const [validEmail, setValidEmail] = useState(true);
    const [validPassword, setValidPassword] = useState(true);
    const {setIsAdmin} = useContext(GlobalContext)
    const navigate = useNavigate();
    
    //FIXME: do something to improve connectivity at start of app
    useEffect(()=>{
        //should connect before use and make the second attempt not fail?
        axios.get("https://taskmanager-backend-9oui.onrender.com:5000/getData",{
            params: {
                mode: "5",                                      //defaulter
                email: "",                              //email inputted in form
                password: "",                        //password inputed in form
                firstName: "",                                  //unnessesary
                lastName: ""                                    //unnessesary
            }
        })
    });

    function handleSubmit(event){
        //resetting conditions at the start of each logiin attempt
        event.preventDefault();
        setValidEmail(true);
        setValidPassword(true);

        //send the backend the neccessary data to run the query
        axios.get("https://taskmanager-backend-9oui.onrender.com:5000/getData",{
            params: {
                mode: "1",                                      //read single user data
                email: emailInput,                              //email inputted in form
                password: passwordInput,                        //password inputed in form
                firstName: "",                                  //unnessesary
                lastName: ""                                    //unnessesary
            }
        }).then(res=> {                                         //process the data recieved by the backend response
            if(res.data.recordset.length === 1){                        //invalid email results in an empty query response
                if(passwordInput !== res.data.recordset[0].Password){    //check to see if the password matches
                    setValidPassword(false);                            //error flagging
                }else{
                    const id = res.data.recordset[0].UserID
                    const name = res.data.recordset[0].FirstName
                    console.log(res.data.recordset[0].Role)
                    if(res.data.recordset[0].Role === 'Admin'){
                        setIsAdmin(true);
                    }
                    navigate('/dashboard/'+id+'/'+name, {replace: true});
                }
            }else{
                setValidEmail(false);
            }
        }).catch(err=> {
            console.log(err)
            console.log(err.message)
        });
        
    }

    return(
        <>
            <img src={logo}
                className="col-7 col-md-4 w-sm-75 w-md-25 img-fluid rounded-top"
                alt=""
            />
            <div className="d-flex vh-100 justify-content-center align-items-center bg-dark rounded">
                <div className="p-3 bg-white w-sm-50 w-lg-25 rounded">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email">Email</label>
                            <input type="email" placeholder="Enter Email" className="form-control"
                            onChange={e => setEmail(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password">Password</label>
                            <input type="password" placeholder="Enter Password" className="form-control"
                            onChange={p => setPassword(p.target.value)}/>
                            {!validPassword && <p className="text-danger">Invalid Password</p>}
                            {!validEmail && <p className="text-danger">Email not Registered</p>}
                        </div>
                        <button className="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>
        </>
    )
}
export default Login