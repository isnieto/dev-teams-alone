// Class constructor for newTasks to be added to the list
class Task{
    constructor(task, status, endtime, user){
        this.task = task;
        this.status = status;
        this.starttime = new Date(); // Add current date automically
        this.endtime = endtime;
        this.user = user;
    }
} // End class Task

// Class TaskFactor to create new tasks
class TaskFactory{
    createTask(task, status, endtime, user){
        return new Task(task, status, endtime, user);
    }
}

module.exports = { 
    TaskFactory
};