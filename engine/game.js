import { Bot } from "./bot.js";
import { tasks } from './task.js';

export class Game {

    //the game object or game engine
    constructor(object) {
        // if (object != {}) {
        //     this.currentBots = object.currentBots
        // } else {
            this.currentBots = []
        //}
       
    }

    //adding a new bot and assigning it a task list to the currently exisitng bots
    addBot(name, type) {
        let taskList = [];
        
        while (taskList.length < 5) {
            let newTask = tasks[Math.floor(Math.random() * tasks.length)];
            if (!taskList.includes(newTask)) {
                taskList.push(newTask); 
            }
            
        }

        let bot = new Bot(name, type, 0, taskList)
        this.currentBots.push(bot)
    }

    // 
    startTasks() { //start all the robots tasks for robots that are not currently busy
        this.currentBots.forEach(x => x.startTasks())
            
      
        
    }



}