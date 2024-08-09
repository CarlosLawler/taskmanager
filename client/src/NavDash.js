//import React, { useState } from "react";
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css"
//import axios from 'axios'
import logo from './images/Simplex-Logo-Short-Transparent-without-background.png'
import { Outlet, useNavigate, useParams } from "react-router-dom";
import * as FaIcons from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import ".//Nav.css";
//import { IconContext } from "react-icons";

function NavDash(){

    const navigate = useNavigate();
    const {name, id} = useParams();
    const [sidebar,setSidebar] = useState(false);

    let menuRef = useRef();
    useEffect(() => {
        let handler = (e) =>{
            if(!menuRef.current.contains(e.target)){
                setSidebar(false);
            }
        };
        document.addEventListener('mousedown', handler);
        
        return() =>{
            document.removeEventListener('mousedown', handler);
        }
    });

    const showSidebar = () => setSidebar(!sidebar);

    function logout(){
        console.log("opened logout");
        navigate('/', {replace: true});
    }
    function returnToDash(){
        showSidebar();
        console.log("opened home");
        navigate('/dashboard/'+id+'/'+name);
    }
    function returnToDashFromLogo(){
        console.log("opened home from logo");
        navigate('/dashboard/'+id+'/'+name);
    }
    function openNotifications(){
        console.log("opened notifs");
        navigate('/notification/'+id+'/'+name);
        //FIXME: Do we use email service instead?
    }
    function openTimecard(){
        showSidebar();
        console.log("opened timecard");
        navigate('/timecard/'+id+'/'+name);
    }
    function openSettings(){
        showSidebar();
        console.log("opened settings");
        navigate('/settings/'+id+'/'+name);
    }
    return(
        <>
        {/* <IconContext.Provider value={{color:'fff'}}> */}
            <div className="row justify-content-between align-items-center g-2" id="topBar">
                <div className="col-4 col-md-3 col-lg-2">
                    <div className="row justify-content-center align-items-center g-2">
                        <div className="col-3 offset-1">
                            {/* <Link> */}
                                <FaIcons.FaBars className='menu-bars' onClick={showSidebar}/>
                            {/* </Link> */}
                        </div>
                        <div className="col-8">
                            <img
                                src={logo}
                                className="img-fluid rounded-top"
                                alt=""
                                onClick={returnToDashFromLogo}
                                id="simplexLogo"
                                />
                        </div>
                    </div>
                </div>
                <div className="col-4 col-md-3 col-lg-2">
                    <div className="row justify-content-center align-items-center g-2">
                        <div className="col-3 offset-2">
                            {/* <Link className='menu-bars'> */}
                                <FaIcons.FaRegBell className='menu-bars' onClick={openNotifications}/> 
                            {/* </Link> */}
                        </div>
                        <div className="col-3 offset-1">
                            {/* <Link> */}
                                <FaIcons.FaArrowRightFromBracket className='menu-bars' onClick={logout}/> 
                            {/* </Link> */}
                        </div>
                    </div>
                </div>
            </div>
            <nav className = {sidebar ? 'nav-menu active' : 'nav-menu'} ref={menuRef}>
                <ul className="nav-menu-items">
                    
                    <li className='nav-text' onClick={returnToDash}>
                        {/* <Link> */}
                            <FaIcons.FaHouse/>
                            <span>Home</span>
                        {/* </Link> */}
                    </li>
                    <li className='nav-text' onClick={openTimecard}>
                        {/* <Link> */}
                            <FaIcons.FaClockRotateLeft/>
                            <span>Timecard</span>
                        {/* </Link> */}
                    </li>
                    <li className='nav-text' onClick={openSettings}>
                        {/* <Link> */}
                            <FaIcons.FaGear/>
                            <span>Settings</span>
                        {/* </Link> */}
                    </li>
                </ul>
            </nav>
            <Outlet/>
        {/* </IconContext.Provider> */}
        </>
    )
}export default NavDash