

let taskList = 
[
    {"id": 1, "taskName": "Task 1", "status": "checked"}
];
let editMode = false;
let editId;
let taskInput = document.querySelector("#taskName");

displayTasks();

function displayTasks()
{

    let ul = document.getElementById("taskList");
    ul.innerHTML = "";
    if(taskList.length == 0)
    {
        ul.innerHTML = `<p class="text-danger p-0 m-3"> Görev listeniz boş </p>`
    }
    else{
        for(let task of taskList)    
        {  
            let li = 
            `
                <li class="task list-group-item">
                    <div class="form-check">
                        <input onclick = "statusTask(this)" type="checkbox" id="${task.id}" class="form-check-input">
                        <label for="${task.id}" class="form-check-label">${task.taskName}</label> 
                        <div class="dropdown">
                        <button class="btn btn-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fa-solid fa-ellipsis"></i>
                        </button>
                        <ul class="dropdown-menu">
                            <li><a onclick = 'editTask(${task.id}, "${task.taskName}")' class="dropdown-item" href="#"><i class="fa-solid fa-pen-to-square"></i> Düzenle</a></li>
                            <li><a onclick = "deleteTask(${task.id})" class="dropdown-item" href="#"><i class="fa-solid fa-trash"></i> Sil</a></li>
                        </ul>
                        </div>
                    </div>
                </li>
            `;
            ul.insertAdjacentHTML("beforeend", li); 
        }
    }

}

document.querySelector("#btnClearAll").addEventListener("click",clearTask)
document.querySelector("#btnAddNewTask").addEventListener("click", newTask);
document.querySelector("#btnAddNewTask").addEventListener("keypress", function(){
    if (event.key == "Enter") {
        document.getElementById("btnAddNewTask").click();
    }
}); 

for(span of filters){
    span.addEventListener("click",function(){

    }
    );
}

function newTask(event)
{
    if(taskInput.value == "")
    {
        alert("Gorev girmelisiniz!");
    }
    else
    {
        if(editMode != true)
        {
            //add
            taskList.push({"id": taskList.length + 1, "taskName": taskInput.value});       
        }
        else
        {
            //update
            for(let task of taskList)
            {
                if(task.id == editId)
                {
                    task.taskName = taskInput.value;
                }
                editMode = false;
                console.log("no problemo");
            }
        }
        taskInput.value = "";
        displayTasks();
    }
    event.preventDefault();
}

function deleteTask(id)
{
    let deletedId;

    for(let i in taskList)
    {
        if(taskList[i].id == id)
        {
            deletedId = i;
        }
    }

    taskList.splice(deletedId, 1);
    displayTasks();
}

function editTask(taskid, taskName){
    editId = taskid;
    editMode = true;
    taskInput.value = taskName;
    taskInput.focus();
    
    console.log("edit id", editId);
    console.log("edit mode :", editMode)
}

function clearTask(){
    taskList.splice(0, taskList.length);
    displayTasks();
}

function statusTask(selectedTask){

    let controlClass = selectedTask.parentNode.children[1].classList;
    let status;
    
    for(let i = 0; i < controlClass.length; i++)
    {
        if(controlClass[i] == 'checked')
        {
            status = true;
        }
        else
        {
            status = false
        }
    }
 
    if(status == false)
    {
        selectedTask.parentNode.children[1].classList.add('checked');
        taskList.status = "checked"
    }
    else
    {
        selectedTask.parentNode.children[1].classList.remove('checked');
        taskList.status = "pending"
    }    
}


