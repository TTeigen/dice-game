//User clicks a button -> generates a random # (1-6) and returns the value
//User click a number to save it -> if # clicked is (1,5 or 3 of kind)
//User clicks button -> roll unsaved dice
//if no 1,5, or 3 o.k == bust
var dice = [];
var saved =[];
var points = 0;
var total = 0;
var pool = new Pool;
var savedPool = new Pool;
var players = [];
var player1;
var player2;

//Pool objects & prototypes *******
function Pool (one, two, three, four, five, six) {
  this.one = 0,
  this.two = 0,
  this.three = 0,
  this.four = 0,
  this.five = 0,
  this.six = 0};

Pool.prototype.clearPool = function(){
  this.one = 0,
  this.two = 0,
  this.three = 0,
  this.four = 0,
  this.five = 0,
  this.six = 0
}
//**********************************

//Player Objects & prototypes*************************
function Player (name, total) {
  this.name = name,
  this.total = total,
  this.active = false
}

Player.prototype.makeActive = function() {
    if (this.active === false) {
      this.active = true;
    } else {
      this.active = false;
      this.total += points;
    }
}
//***********************


$(function(){
//generates random #s for dice faces
function rollDice() {
  dice = [];
  for (i=0; i<6;i++)  {
  dice.push(Math.floor(Math.random() * 6) + 1)
  }
  console.log("dice "+dice);
}
//counts dice faces & stores in dice object for initial pool
function poolDice() {
  pool.clearPool();
  for (let i=0; i < dice.length; i++){
    if(dice[i] === 1){
      pool.one++
    } if (dice[i] === 2) {
      pool.two++
    }else if (dice[i] === 3) {
      pool.three++
    }else if (dice[i] === 4) {
      pool.four++
    }else if (dice[i] === 5) {
      pool.five++
    }else if (dice[i] === 6) {
      pool.six++
    }
  }
}
//creates a pool of saved dice values
function saveDice() {
  savedPool.clearPool();
  for (let i=0; i < saved.length; i++){
    if(saved[i] === 1){
      savedPool.one++
    } if (saved[i] === 2) {
      savedPool.two++
    }else if (saved[i] === 3) {
      savedPool.three++
    }else if (saved[i] === 4) {
      savedPool.four++
    }else if (saved[i] === 5) {
      savedPool.five++
    }else if (saved[i] === 6) {
      savedPool.six++
    }
  }
}
//math for scoring points
function math(savedPool) {
  counter = 0;
  console.log(savedPool);
 for (var property in savedPool) {
   counter++;
   if (savedPool[property] === 1) {
     if (counter == 1) {
       points += 100;
     }
     if (counter == 5) {
       points += 50;
     } else if (counter == 2 || counter == 3 || counter == 4 || counter == 6){
       alert ("invalid single");
     }
   }
   if (savedPool[property] === 2) {
     if (counter == 1) {
       points += 200;
     } else if (counter == 5) {
       points += 100;
     } else if (counter == 2 || counter == 3 || counter == 4 || counter == 6){
       alert ("invalid double");
     }
   }
   if (savedPool[property] === 3) {
     if (counter == 1) {
       points+= 1000;
     } else {
       points += counter*100;
     }
   }
   if (savedPool[property] === 4) {
     if (counter === 1) {
       points+= 2000;
     } else {
       points += counter*200;
     }
   }
   if (savedPool[property] === 5) {
     if (counter === 1) {
       points+= 3000;
     } else {
       points += counter*400;
     }
   }

   console.log("counter "+counter);
   console.log("points "+points);
 }
}
//conditions for a bust
function busted() {
  if (pool.one < 1 && pool.five < 1 && pool.two < 3 && pool.three < 3 && pool.four < 3 && pool.six < 3 ) {
    alert("YOU BUST!");
    points = 0;
    $("#bank").text(points);
  }
}
//creates player objects
$(".player").submit(function(event){
  event.preventDefault();
  player1 = new Player ($("#player1").val(), total)
  player2 = new Player ($("#player2").val(), total)
  player1.active = true;
  players.push(player1, player2);
  $("#p1name").text($("#player1").val());
  $("#p2name").text($("#player2").val());
  $("#bank").text(points);
  $("#p1total").text(player1.total);
  $("#p2total").text(player2.total);
  $(".p1").addClass("border");
})
//casts inital pool of dice for the active player
  $("#cast").click(function(){
    $("#res").empty();
    rollDice();
    poolDice();
    for (i=0; i <dice.length ;i++){
      $("#res").append("<input type='checkbox' id='checked' value = '"+dice[i]+"'>"+dice[i]);
    }
    busted(); //checks for bust
    $("#cast").hide();
  })
 //saves and scores selected dice while removing them from the pool
 $("#save").click(function(){
   saved = []
   $("#res input:checked").each(function(){
     saved.push(parseInt($(this).val()));
     dice.splice(0,1);
   });
   saveDice();
   math(savedPool);
   $("#bank").text(points);
   $("#save").hide();
 })
//rerolls all dice still available in pool
 $("#reroll").click(function(){
   $("#res").empty();
   for (i=0; i < dice.length;i++) {
     var newRoll = Math.floor(Math.random() * 6) + 1;
     dice.splice(i, 1, newRoll)
     $("#res").append("<input type='checkbox' value = '"+dice[i]+"'>"+dice[i]);
   }
   poolDice();
   busted(); //checks for bust
   $("#save").show();
 })
 //ends active player's turn, scores points for the round, activates next player
 $("#turn").click(function(){
   player1.makeActive();
   player2.makeActive();
   points = 0;
   if (player1.active == true) {
     $(".p1").addClass("border");
     $(".p2").removeClass("border");
   }
  if (player2.active == true){
     $(".p2").addClass("border");
     $(".p1").removeClass("border");
   }
   $("#bank").text(points);
   $("#p1total").text(player1.total);
   $("#p2total").text(player2.total);
   if (player1.total >= 2000 || player2.total >= 2000) {
     alert("You've Done It! You achieved 2000+ points! You an winner! Way Go!");
   }
   $("#save").show();
   $("#cast").show();
 })
});
