const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const clearAllButton = document.getElementById("clearAll");
const emptyMessage = document.getElementById("emptyMessage");

const STORAGE_KEY = "minhasTarefas";

let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

function saveTasks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function renderTasks() {

    taskList.innerHTML = "";

    if(tasks.length === 0){
        emptyMessage.style.display = "block";
    }else{

        emptyMessage.style.display = "none";
        tasks.forEach(function(task) {
            const li = document.createElement("li");
            li.classList.add("task-item");
            li.innerHTML = `
                <span class="task-text">${escapeHTML(task.text)}</span>
                <button
                    class="btn-delete"
                    onclick="deleteTask(${task.id})"
                    title="Excluir tarefa"
                >
                </button>
            `;
            taskList.appendChild(li);
        });
    }
    updateTaskCount();
}

taskForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const text = taskInput.value.trim();

    if(text === ""){
        return;
    }

    const newTask = {id: Date.now(),text: text};

    tasks.push(newTask);
    saveTasks();
    renderTasks();

    taskInput.value = "";

    taskInput.focus();
});

function deleteTask(id) {
    tasks = tasks.filter(function(task) {return task.id !== id;});
    saveTasks();
    renderTasks();
}

clearAllButton.addEventListener("click", function() {

    if (tasks.length === 0) {
        return;
    }

    const confirmation = confirm("Tem certeza que deseja excluir todas as tarefas?");

    if (confirmation) {
        tasks = [];
        localStorage.removeItem(STORAGE_KEY);
        renderTasks();
    }
});

function updateTaskCount() {

    const total = tasks.length;

    if(total === 0){
        taskCount.textContent = "0 tarefas";
    }else if (total === 1){
        taskCount.textContent = "1 tarefa";
    }else{
        taskCount.textContent = `${total} tarefas`;
    }
}

function escapeHTML(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

renderTasks();