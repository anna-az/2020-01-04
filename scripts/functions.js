import {$modalAddTask, $modalRemoveAll, statuses, $modalEditTask, $formEditTask} from './constants.js';


export function addTask(_task) {
    const $btnDelete = $('<button>').addClass('btn btn-danger btn-xs btn-delete pull-right').html('<i class="glyphicon glyphicon-trash"></i>');
    const $btnEdit = $('<button>').addClass('btn btn-warning btn-xs btn-edit pull-right').html('<i class="glyphicon glyphicon-pencil"></i>');
    const $moreInfo = $('<div>').addClass('text-muted panel-collapse collapse').attr('id', _task.id);
    
    if(_task.info === '') _task.info = 'No description';
    const $textInfo = $('<div>').html(_task.info.replace(/\n/g, '<br>')).addClass('panel-footer');
    const $dateInfo = $('<div>').text(_task.date).addClass('text-muted pull-right');
    
    $moreInfo.append($textInfo);
        

    $('<li>')
        .appendTo(`[data-status="${_task.status}"]`)
        .addClass('list-group-item')
        .text(_task.title)
        .append($btnDelete)
        .append($btnEdit)
        .append($dateInfo)
        .append($moreInfo)
        .attr('data-id', _task.id)
        .attr('data-toggle', 'collapse')
        .attr('data-target', '#' + _task.id);
}

export function handleAddFormTask(event) {
    event.preventDefault();

    const task = {
        title: $('[name="title"]', this).val(),
        status: statuses.TODO,
        id: new Date().getTime(),
        date: $('[name="date"]', this).val(),
        info: $('[name="info"]', this).val()
    };

    if(task.title === '') {
        alert('Title is required');
        return;
    }

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


export function hendleBtnDelete(event) {

    const $parent = $(this).parents('[data-id]');
    const id = $parent.attr('data-id');
    $(this).parents('[data-id]').remove();
    localStorage.removeItem(id);
    displayCount();
}

export function hendleBtnEdit(event) {
    const $parent = $(this).parents('[data-id]');
    const id = $parent.attr('data-id');
    const task = JSON.parse(localStorage.getItem(id));
    $modalEditTask.modal('show');

    for (let key in task) {
        const $element = $formEditTask.find(`[name=${key}]`);
        
        if (!$element.length) continue;

        $element.val(task[key]);
    }
}

export function handleFormEditTask(event) {
    event.preventDefault();

    const newTask = {
        title: $(this).find('[name="title"]').val(),
        status: +$(this).find('[name="status"]').val(),
        id: $(this).find('[name="id"]').val(),
        date: $('[name="date"]', this).val(),
        info: $('[name="info"]', this).val()
    }
    localStorage.setItem(newTask.id, JSON.stringify(newTask));

    $('[data-status]').find(`[data-id = "${newTask.id}"]`).remove();
    addTask(newTask);
    $modalEditTask.modal('hide');
    displayCount();
}