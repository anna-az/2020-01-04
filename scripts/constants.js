const $formAddTask = $('#formAddTask');
const $modalAddTask = $('#modalAddTask');
const $removeAll = $('#removeAll');
const $modalRemoveAll = $('#modalRemoveAll');

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
    statuses
}