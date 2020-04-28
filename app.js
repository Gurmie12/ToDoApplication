//Define the UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


//Call a function to load all of the event listeners
loadEventListeners();

//Function to load all of the event listeners
function loadEventListeners(){
    document.addEventListener('DOMContentLoaded', setTasks);
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeTask);
    clearBtn.addEventListener('click', clearTasks);
    filter.addEventListener('keyup', filterTasks);
}

function setTasks(e){
    let tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }


    tasks.forEach((task) =>{
        //Create list item 
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));

        //Create link element
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = "<i class='fa fa-remove'></i>";

        //Append the link to the list item and append the list item to the UL
        li.appendChild(link);
        taskList.appendChild(li);
    })
}

//Function that adds a task
function addTask(e){

    if(taskInput.value === ""){
        console.log(taskInput.value);
        alert("Please enter a task.");
    }

    //Create list item 
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value));

    //Create link element
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = "<i class='fa fa-remove'></i>";

    //Append the link to the list item and append the list item to the UL
    li.appendChild(link);
    taskList.appendChild(li);

    //Store task in local storage
    storeTaskInLocalStorage(taskInput.value);

    //Reset the input field
    taskInput.value = "";


    e.preventDefault();
}

function storeTaskInLocalStorage(taskName){
    let tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = [];    
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(taskName);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        e.target.parentElement.parentElement.remove();
    }


    //Remove from local storage
    removeFromLocalStorage(e.target.parentElement.parentElement);
}

function removeFromLocalStorage(taskItem){
    let tasks;
    
    if(localStorage.getItem('tasks') === null){
        tasks = [];    
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach((task, index) =>{
        if(taskItem.textContent === task){
            tasks.splice(index,1);
        }
    })

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks(e){
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }


    //Clear local storage
    localStorage.clear();
}

function filterTasks(e){
        const input = e.target.value.toLowerCase();

        document.querySelectorAll('.collection-item').forEach((task) =>{
            const item = task.firstChild.textContent;

            console.log(typeof item);
            if(item.toLowerCase().includes(input)){
                task.style.display = 'block';
            }else{
                task.style.display = 'none';
            }
        })
    }
