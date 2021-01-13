import { addTask,  handleAddFormTask, handleRemoveAll, displayCount, hendleBtnDelete, hendleBtnEdit, handleFormEditTask} from './functions.js';
import {$formAddTask, $removeAll, $formEditTask} from './constants.js';


$formAddTask.on('submit', handleAddFormTask );
$removeAll.on('submit', handleRemoveAll);
$formEditTask.on('submit', handleFormEditTask );

$('body').on('click', '.btn-delete', hendleBtnDelete);
$('body').on('click', '.btn-edit', hendleBtnEdit);



for(let key in localStorage) {
    if(localStorage.hasOwnProperty(key)) {
        const task = JSON.parse(localStorage[key]);
        task && addTask(task); // task не null
    }
    
}

displayCount();

