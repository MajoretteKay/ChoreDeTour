export class Bot {

    // a bot object marked by its name, type, tasks assigned and points
    constructor(name, type, points, tasks) {
      this.name = name;
      this.type = type;
      this.points = points;
      this.assigned = tasks;
      this.busy = false;
    }

    // starting an asynchronous called to time out each task whilst letting other bots choose as well
    startTasks() {
      this.doTask(this, this.assigned)
            
    }

    // the timed promise object function to simulate the chore being done
    doTask(bot, tasks) {
      if (tasks.length == 0) { // if passsed array is empty stop
        bot.busy = false;
        return;
      }

      if (bot.busy == true) { // if thebot is busy try again
        return bot.doTask(bot, tasks);
      }

      let task = tasks[0]  
      console.log(bot) 
      let descrip =  task.description
      let time = task.eta
      bot.busy = true; 

      if (task.types.includes(bot.type)) { 
        tasks.shift() //removes task and does it
        setTimeout(function(){ 
          bot.points += 1;
          bot.busy = false;
          
          $('#messages').append(`<p>${descrip}, completed by bot ${bot.name}</p>`) //return a message of what bot completed a task
          return bot.doTask(bot, tasks);
        }, time)
      } else {
        setTimeout(function(){ //if the type isnt accepted times out but doesnt remove task
          bot.busy = false;
          bot.assigned = tasks; // replace the bot's array to note that the task was "compeleted" but dont give credit
          return bot.doTask(bot, tasks.slice(1, tasks.length));
        }, time)
      }

      
      
      
      
    }


  }