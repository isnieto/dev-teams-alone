
const menuOptions =  [ 
        "Please choose an exercise: ",
        "1) Add new task",
        "2) Edit an existing task",
        "3) Delete a task",
        "4) Show all tasks",
        "5) Show a task",
        "6) Exit app"]

const menu = (options) => {
        options.map(option => console.log(option));
}


module.exports = [menuOptions, menu]
               
    
