const $inputTask = document.getElementById('input-task');
const $add = document.getElementById('add');
const $clear = document.getElementById('clear');

const $item = document.getElementById('item');

$clear.addEventListener('click',clearTask);


$add.addEventListener('click',addTask);
$inputTask.addEventListener('keypress', addTask);

function addTask(e) {

    if(e.type == 'keypress' && e.key !== 'Enter')
            return;
    
    let newTask = $inputTask.value;
    $item.innerHTML += `
        <div class="task">
            <span class="task-item">${newTask}</span>
            <span>
                <img class="done" src="icons8-de-acuerdo-100.png" alt="done" width="30px">
                <img class="edit" src="icons8-lápiz-100.png" alt="edit" width="30px">
                <img class="delete" src="icons8-basura-llena-100.png" alt="delete" width="30px">  
            </span>
        </div>` 
    $inputTask.value = '';

}

function clearTask() {
    $item.innerHTML = ``;
}

$item.addEventListener('click', buttonActions);

function buttonActions(event) {

    let type = event.target.classList;
    let taskDiv = event.target.closest('.task');

    switch (type.value) {
        case 'done':
            taskDiv
                .querySelector('.task-item')
                .classList.add('done-task');
            break;

        case 'edit':
            
            let testTask = taskDiv.querySelector('.task-item').textContent;
            
            $inputTask.value = testTask;
            taskDiv.classList.add('delete-task');
            $inputTask.focus();
            break;

        case 'delete':
            taskDiv.classList.add('delete-task');
            break;    
    }    
}