// Create an instance of readline by configuring the readable and the writable streams
const readline = require('readline');
// Load module to read file json.
const fs = require ('fs');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to print list of tasks in Json file
const outputList = require('./loaders/codeList.js'); 
// Importing clas Task and function getTaskLIst
const TaskFunctions = require('./loaders/taskfunctions.js'); 
// Importing clas Task and function getTaskLIst
const [menuOptions, menu] = require('./services/menu.js');
const [questions, question] = require('./subscribers/questionsEvents.js'); 



const recursiveAsyncReadLine = function () {
    rl.question(menu(menuOptions), function (line) {

            switch (line){
                case "1":
                  console.log("this is option 1");

                  const main = async () => {
                      let tempTask = [];
                      await questions(question.task, 'task')
                      await questions(question.status, 'status')
                      await questions(question.endtime, 'endtime')
                      await questions(question.user, 'user')
                      await TaskFunctions.addNewTask(tempTask, TaskFunctions.getTasklist())
                      recursiveAsyncReadLine();
                  }                          
                  main()                         
                break;                         
                case "2":
                    console.log("this is option 2");
                    // Print list of existing Tasks with numbers
                    outputList(TaskFunctions.getTasklist());
                    // Ask for the number of the task to edit
                    rl.question("Which task would you like to modify? ", (userInput) => {
                        //Covnert the input to a number
                        let selectedTask = parseInt(userInput)
                        if (selectedTask){
                            // Pass selected task and print on console
                            let taskToUpdate = outputList(TaskFunctions.getTasklist(), selectedTask);
                            //console.log(taskToUpdate);
                            rl.question("what would you like to update: status, start time or end time?\n", (updateInput)=> {
                                rl.setPrompt("Please, enter the change: \n");
                                rl.prompt();
                                // Task updated. New update with rest of documents is saved again in Json file. Old contest deleted.
                                rl.on("line", (userUpdate)=>{
                                    if (userUpdate){
                                        taskToUpdate[updateInput] = userUpdate; // update assignment
                                        const newARR  = TaskFunctions.getTasklist();
                                        const X = newARR.splice(userInput-1,1,taskToUpdate );
                                        fs.writeFileSync('TASQUES.json', JSON.stringify(newARR), {flag: "w+"});
                                        console.log("Task was succesfully  updated!")
                                        recursiveAsyncReadLine();

                                    }
                                });
                            });
                        } 
                    });
                    // Update of task is done
                    
                    
                   break;
                case "3":
                    console.log("this is option 3");
                    outputList(TaskFunctions.getTasklist());
                    // Ask for the number of the task to edit
                    rl.question("Which task would you like to delete? ", (userInput) => {
                        TaskFunctions.deleteTask(userInput, TaskFunctions.getTasklist());
                        recursiveAsyncReadLine()                     
                        })   
                   break;
                case "4":
                    console.log("this is option 4");
                    outputList(TaskFunctions.getTasklist());
                    break;
                case "5":
                    outputList(TaskFunctions.getTasklist());
                    rl.question("Which task would you like to view? ", (choice) => {
                        TaskFunctions.viewTask(choice, TaskFunctions.getTasklist());
                        recursiveAsyncReadLine();                    
                    });
                    // Update of task is donecodeList
                    rl.on("close", ()=> console.log("Task was succesfully  updated!"))
                    break;
                case "6":
                    console.log("You're leaving the App. Good bye.");
                    return rl.close();
                default:
                    console.log("No such option. Please enter another: ");
            }
    recursiveAsyncReadLine(); //Calling this function again to ask new question
    });
};

recursiveAsyncReadLine();