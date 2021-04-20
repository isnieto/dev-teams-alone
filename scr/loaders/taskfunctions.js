// Load module to read file json.
const fs = require ('fs');
// Function to print list of tasks in Json file
const outputList = require('./codeList.js'); 
const taskFactory = require('../models/task.js')

// Declare class TaskFactory
const taskMaker = new taskFactory.TaskFactory();

// Pattern Module
const crudFunctions = (function( ) {

    return {
        getTasklist: ()=>{
            // read list of tasks from file
            let tasks = fs.readFileSync('./models/TASQUES.json');
            // Parse JSON  constructing the JavaScript value or object described by the JSON - string. 
            let taskList = JSON.parse(tasks); 
            // Print on console only the list of tasks with a number
             return taskList; 
        },
        addNewTask: function(newTask, taskList) {
            return new Promise((resolve, reject) => {
            // Create a new Instance of class Task
            taskList.push(taskMaker.createTask(...newTask));
            fs.writeFileSync('./models/TASQUES.json', JSON.stringify(taskList), {flag: "w+"});
            console.log("Task was succesfully added!")  
            resolve() 
            });
        },
        deleteTask : function(input, arrTask) {
            let selectedTask = parseInt(input);
            selectedTaskIndex = (selectedTask-1); //encontrar index del elemento seleccionado
            if(selectedTaskIndex < arrTask.length){
              arrTask.splice(selectedTaskIndex, 1);
              fs.writeFileSync('./models/TASQUES.json', JSON.stringify(arrTask), {flag: "w+"});
              console.log("Task was succesfully deleted!")    
            }else{
              console.log("Task selected doesn't exist")      
            }
        },
        viewTask: function(input, arrTask) {
            let selectedTask = parseInt(input);
            if (selectedTask){
                // Pass selected task and print on console
                let taskToView = outputList(arrTask, selectedTask);
                console.log(taskToView);
                console.log("\n");
            }
        }
    };
})();

   


module.exports = crudFunctions;
