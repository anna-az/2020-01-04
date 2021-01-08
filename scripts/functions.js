import {$modalAddTask, $modalRemoveAll, statuses} from './constants.js';


export function addTask(_task) {

    $('<li>')
        .appendTo(`[data-status="${_task.status}"]`)
        .addClass('list-group-item')
        .text(_task.title);
}

export function handleAddFormTask(event) {
    event.preventDefault();

    const task = {
        title: $('[name="title"]', this).val(),
        status: statuses.TODO,
        id: new Date().getTime()
    };

    addTask(task);
    localStorage.setItem(task.id, JSON.stringify(task));
    $modalAddTask.modal('hide');
    this.reset(); // сбрасывает все значения формы до дефолта
    displayCount();
}

export function removeAll() {

    let listNode = document.querySelectorAll('.list-group');
    listNode.forEach(event => event.innerHTML = '');

}

export function handleRemoveAll(event) {
    console.log(event);
    event.preventDefault();

    removeAll();
    localStorage.clear();
    $modalRemoveAll.modal('hide');
    displayCount();
}


export function displayCount() {
    let shouldBeDone = 0;
    let doneSoon = 0;
    let alreadyDone = 0;
    for(let key in localStorage) {
        if(localStorage.hasOwnProperty(key)) {
            const task = JSON.parse(localStorage[key]);
            switch(task['status']) {
                case 1: shouldBeDone++; break;
                case 2: doneSoon++; break;
                case 3: alreadyDone++; break;
            } 
        }
    }
    $('#shouBeDone').text(shouldBeDone);
    $('#doneSoon').text(doneSoon);
    $('#alreadyDone').text(alreadyDone);
}

