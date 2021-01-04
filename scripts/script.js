const $formAddTask = $('#formAddTask');
const $modalAddTask = $('#modalAddTask');

const statuses = {
    'TODO': 1,
    'IN_PROGRESS': 2,
    'DONE': 3
};

$formAddTask.on('submit', function(event) {
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
});

function addTask(_task) {

    $('<li>')
        .appendTo(`[data-status="${_task.status}"]`)
        .addClass('list-group-item')
        .text(_task.title);
    // $(`[data-status="${task.status}"]`)
}

for(let key in localStorage) {
    if(localStorage.hasOwnProperty(key)) {
        const task = JSON.parse(localStorage[key]);
        task && addTask(task); // task не null
    }
    
}