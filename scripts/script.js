import { addTask,  handleAddFormTask, handleRemoveAll, displayCount} from './functions.js';
import {$formAddTask, $removeAll} from './constants.js';


$formAddTask.on('submit', handleAddFormTask );
$removeAll.on('submit', handleRemoveAll);



for(let key in localStorage) {
    if(localStorage.hasOwnProperty(key)) {
        const task = JSON.parse(localStorage[key]);
        task && addTask(task); // task не null
    }
    
}

displayCount();