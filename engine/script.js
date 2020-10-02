import { Game } from "./game.js";

let game = {};

$(function() { //initiate the game and check storage for previous game
     if (typeof(storage) != "undefined") {
         game = new Game("empty");
        
       } else {
         game = new Game(JSON.parse(localStorage.getItem("game")))
       }
    
    renderSite();
  });


function renderSite() { //render main site and handlers
    let htmlstring = `<div id="messages">
    <h1>Tour De Chore</h1>
    <button class="start">Start Chores!</button>
    <button class="new">New Game?</button>
    </div>
    <div id="leaderboard"></div>`;

    $('#root').append(htmlstring);
    $('#root').append(renderBotForm());

    setInterval(function() { // updates leaderboard and saves game every second
        $('#leaderboard').html(renderLeaderboard()) 
        localStorage.setItem("game", JSON.stringify(game));

    }, 1000);

    $('#root').on("submit", ".newbot", handleNewBot);
    $('#root').on("click", ".start", handleChores);
    $('#root').on("click", ".new", handleNewGame);

}

function renderBotForm() { //new bot form

    let form = `<div id="newbotform">
    <h2>New Bot...</h2>
    <form class="newbot">
    <label>Give it a name:</label><br>
    <input id="name" type="text" name="name" required><br>

    <label>Choose a bot type:</label><br>
    <select name="type" id="type">
      <option value="Unipedal">Unipedal</option>
      <option value="Bipedal">Bipedal</option>
      <option value="Quadrupedal">Quadrupedal</option>
      <option value="Arachnid">Arachnid</option>
      <option value="Radial">Radial</option>
      <option value="Aeronautical">Aeronautical</option>
    </select><br>

    <input type="submit" value="Submit">
    </form></div>`

    return form;

}

function handleNewBot(e) { //adding new bots
    e.preventDefault();
    let name = $('input[type=text][name=name]').val()
    let type = $('select[id=type]').val()

    game.addBot(name, type)
}

function renderLeaderboard() { //leaderboard sorting
    let board = `<h2>Bot Leaderboard</h2>
    `

    game.currentBots.sort(function (a, b) {
        return b.points - a.points;
      });

    for (let i = 0; i < game.currentBots.length; i++) {
        board += `<p>${game.currentBots[i].name}, ${game.currentBots[i].points}</p>`
    }

    return board;
}

function handleChores() { // starting chores handler
    game.startTasks()
}

function handleNewGame() { //resets game and localstorage
    game = new Game("empty")
    localStorage.clear()
    $('div#messages').replaceWith(`<div id="messages">
    <h1>Tour De Chore</h1>
    <button class="start">Start Chores!</button>
    <button class="new">New Game?</button>
    </div>`)
}
