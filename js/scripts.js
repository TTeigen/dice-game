//User clicks a button -> generates a random # (1-6) and returns the value
//User click a number to save it -> if # clicked is (1,5 or 3 of kind)
//User clicks button -> roll unsaved dice
//if no 1,5, or 3 o.k == bust




$(function(){

function Pool(){
  this.dice =[],
  this.currentId= 0
}

function Die(roll){
  this.face = roll
  this.save = false;
}

Die.prototype.Roll = function (){
  var roll = Math.floor(Math.random() * 6) + 1;
  return roll;
}

Pool.prototype.assignId = function() {
  this.currentId +=1;
  return this.currentId;
}

Pool.prototype.addToPool = function(die){
  die.id = this.assignId();
  this.dice.push(die);
  }

var savedDice = [];
var roundTotal = 0;
var total = 0;
var tally;

function countDice() {
  let playerRoll = {one: 0, two: 0, three: 0, four: 0, five: 0, six: 0}
  for (let i=0; i < savedDice.length; i++){
    if(savedDice[i] === 1){
      playerRoll.one++
    } if (savedDice[i] === 2) {
      playerRoll.two++
    }else if (savedDice[i] === 3) {
      playerRoll.three++
    }else if (savedDice[i] === 4) {
      playerRoll.four++
    }else if (savedDice[i] === 5) {
      playerRoll.five++
    }else if (savedDice[i] === 6) {
      playerRoll.six++
    }

  }
  return playerRoll
}






}


    //Initial casting of 6 dice
  $("#cast").click(function(){
    savedDice =[];
    total = 0;
    var pool = new Pool();
    $("#res").show().empty();
    for(i = 0; i <6; i++) {
      var roll = Math.floor(Math.random() * 6) + 1;
      var die = new Die(roll);
      pool.addToPool(die); //adds dice to pool
      $("#res").prepend("<li id='"+i+"'>"+die.face+"</li>")
    }
    console.log(pool);
      //Click the dice to 'save' it
    $("li").click(function(){
      if (pool.dice[this.id].save == false) {
        pool.dice[this.id].save = true;
        $("li#"+this.id).addClass('save')
      } else {
        pool.dice[this.id].save = false
        $("li#"+this.id).removeClass('save')
      }
      // console.log(pool.dice[this.id]);
    })
      //rerolls 'unsaved' dice and moves 'saved' dice to right
    $("#reroll").click(function(){
      savedDice =[];
      for (i=0; i<6; i++) {
        if (pool.dice[i].save == false) {
          pool.dice[i].face = die.Roll();
          console.log(pool.dice[i]);
          $("li#"+i).text(pool.dice[i].face)
        }
      }
      console.log(savedDice);
    })
      //scores saved dice and ends turn

    $("#score").click(function(){
      for (i=0; i<6; i++) {
        if (pool.dice[i].save == true){
          savedDice.push(pool.dice[i].face)
          pool.dice[i].save = "scored";
        }
      }
      tally = countDice(savedDice);
      roundTotal = addScore(tally);
      console.log(tally);
    });
  })




  // function score() {
  //   var singleOne = 100;
  //   var singleFive = 50;
  //   var triple = 100*face
  //   for (pool.dice) {
  //     if save < 3 {
  //       test 1 vs 5 add 100 or 50
  //     } else if save ==3 {
  //       this.id * 100
  //     }else if save ==4 {
  //       this.id*200
  //     } else if (save =5) {
  //       this.id*400
  //     } else {
  //       add 6 score
  //     }
  //     }
  //   }




















});
