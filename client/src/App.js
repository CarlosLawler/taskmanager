import React, { Component } from 'react'
import Login from './Login';
import Dashboard from './Dashboard';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import NavDash from './NavDash';
import Notifications from './Notifications';
import Timecard from './TimeCardStuff/Timecard'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route element={<NavDash />}>
            <Route path='/dashboard/:id/:name' element={<Dashboard/>}/>
            <Route path='/notification/:id/:name' element={<Notifications/>}/>
            <Route path='/timecard/:id/:name' element={<Timecard/>}/>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

