

let question = {
    task: 'Add new task name please: ',
    status: 'Add new status please: ',
    endtime: 'Add end time please: ',
    user:  'Add user please: '
}
 // Array to collect all answer and create new Task

const questions = (question, key) => {
    return new Promise((resolve, reject) => {
      rl.question(question, (answer) => {
        console.log(`${answer} has been added`)
        tempTask.push(answer);
        resolve();
      });
    });
}     

module.exports = [questions, question];