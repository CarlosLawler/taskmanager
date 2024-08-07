import React from "react";
import './ProgressBar.css'

export default function ProgressBar({progress}){

    return(
        <div className="progress-container">
        <div 
          className="progress-bar" 
          style={{ 
            width: `${progress}%`, 
            color: progress === 0 ? 'white' : 'black' 
          }}
        >
          {progress}%
        </div>
      </div>
    )
}