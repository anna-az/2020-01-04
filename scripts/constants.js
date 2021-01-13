const $formAddTask = $('#formAddTask');
const $modalAddTask = $('#modalAddTask');
const $removeAll = $('#removeAll');
const $modalRemoveAll = $('#modalRemoveAll');
const $modalEditTask = $('#modalEditTask');
const $formEditTask = $('#formEditTask');

const statuses = {
    'TODO': 1,
    'IN_PROGRESS': 2,
    'DONE': 3
};

export {
    $formAddTask,
    $modalAddTask,
    $removeAll,
    $modalRemoveAll,
    statuses,
    $modalEditTask,
    $formEditTask
}