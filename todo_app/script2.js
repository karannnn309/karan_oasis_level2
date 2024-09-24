// Get DOM elements
const newTaskInput = document.getElementById('new-task');
const addTaskBtn = document.getElementById('add-task-btn');
const pendingTasksList = document.getElementById('pending-tasks');
const completedTasksList = document.getElementById('completed-tasks');

// Event listener for adding tasks
addTaskBtn.addEventListener('click', addTask);

// Function to add a new task
function addTask() {
    const taskText = newTaskInput.value.trim();
    const taskDate = document.getElementById('task-date').value;
    const taskPriority = document.getElementById('task-priority').value;

    if (taskText === '') {
        alert('Please enter a task');
        return;
    }

    const newTask = createTaskElement(taskText, taskDate, taskPriority);
    pendingTasksList.appendChild(newTask);

    newTaskInput.value = '';  // Clear the input field
    document.getElementById('task-date').value = '';
    document.getElementById('task-priority').value = 'low';
}

// Function to create a task element
function createTaskElement(taskText, taskDate, taskPriority) {
    const li = document.createElement('li');

    const taskInfo = document.createElement('div');
    taskInfo.classList.add('task-info');
    
    const taskLabel = document.createElement('span');
    taskLabel.textContent = taskText;

    const dateInfo = document.createElement('span');
    dateInfo.textContent = `Due: ${taskDate || 'No Due Date'}`;

    const priorityInfo = document.createElement('span');
    priorityInfo.textContent = `Priority: ${taskPriority}`;

    taskInfo.appendChild(taskLabel);
    taskInfo.appendChild(dateInfo);
    taskInfo.appendChild(priorityInfo);

    li.appendChild(taskInfo);

    // Add buttons: complete, edit, and delete
    const completeBtn = document.createElement('button');
    completeBtn.textContent = 'Complete';
    completeBtn.classList.add('complete-btn');
    completeBtn.addEventListener('click', markAsComplete);

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('edit-btn');
    editBtn.addEventListener('click', editTask);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', deleteTask);

    li.appendChild(completeBtn);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    return li;
}

// Function to mark a task as complete
function markAsComplete(event) {
    const task = event.target.parentElement;
    const taskLabel = task.querySelector('.task-info span:first-child').textContent;
    task.remove();
    
    const completedTask = createTaskElement(taskLabel);
    completedTask.querySelector('.complete-btn').remove();  // Remove 'complete' button from completed tasks
    completedTasksList.appendChild(completedTask);
}

// Function to edit a task
function editTask(event) {
    const task = event.target.parentElement;
    const taskLabel = task.querySelector('.task-info span:first-child');

    const newTaskText = prompt('Edit your task:', taskLabel.textContent);
    if (newTaskText && newTaskText.trim() !== '') {
        taskLabel.textContent = newTaskText;
    }
}

// Function to delete a task
function deleteTask(event) {
    event.target.parentElement.remove();
}

