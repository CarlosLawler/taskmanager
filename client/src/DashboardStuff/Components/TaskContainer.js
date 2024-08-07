import React from "react";
import './TaskContainer.css'

export default function TaskContainer(){

    return(
        <>
            <div class="task-container">
                <h3>Tasks</h3>
                <ul class="task-list">
                    <li class="task-item">Task 1: Description of the task.</li>
                    <li class="task-item">Task 2: Description of the task.</li>
                    <li class="task-item">Task 3: Description of the task.</li>
                </ul>
            </div>
        </>
    )
}