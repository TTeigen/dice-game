//User clicks a button -> generates a random # (1-6) and returns the value
//User click a number to save it -> if # clicked is (1,5 or 3 of kind)
//User clicks button -> roll unsaved dice
//if no 1,5, or 3 o.k == bust




$(function(){

function Pool(){
  this.dice =[]
  this.currentId = 0;
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
let total = 0;
var tally;


// check if one + five === 0 || value of each property is < 3




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
  if (playerRoll.one < 1 && playerRoll.five < 1 && playerRoll.two < 3 && playerRoll.three < 3 && playerRoll.four < 3 && playerRoll.six < 3 ) {
    return false;
  } else {
    return playerRoll;
  }
}
function math() {
  counter = 0;
 for (var property1 in tally) {
   counter++;
   if (tally[property1] === 1) {
     if (counter == 1) {
       total += 100;
     }
     if (counter == 5) {
       total += 50;
     } else if (counter == 2 || counter == 3 || counter == 4 || counter == 6){
       alert ("invalid single");
     }
   }
   if (tally[property1] === 2) {
     if (counter == 1) {
       total += 200;
     } else if (counter == 5) {
       total += 100;
     } else if (counter == 2 || counter == 3 || counter == 4 || counter == 6){
       alert ("invalid double");
     }
   }
   if (tally[property1] === 3) {
     if (counter == 1) {
       total+= 1000;
     } else {
       total += counter*100;
     }
   }
   if (tally[property1] === 4) {
     if (counter == 1) {
       total+= 2000;
     } else {
       total += counter*200;
     }
   }
   if (tally[property1] === 5) {
     if (counter == 1) {
       total+= 3000;
     } else {
       total += counter*400;
     }
   }
   if (tally[property1] == 6) {
    alert ("Cannot have 6 of a kind, return 1 die.")
   }
   console.log(counter);
 }
 console.log(total);
 return total;
}


    //Initial casting of 6 dice
  $("#cast").click(function(){
    console.log("tally: " + tally);
    savedDice =[];
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
        } else if (pool.dice[i].save == true){
          savedDice.push(pool.dice[i].face)
          pool.dice[i].face = 0;
        }
      }
      console.log(pool);
      tally = countDice(savedDice);
      if (tally == false) {
        alert ("you bust");
        roundTotal = 0
        console.log(pool);
      } else {
        var roundTotal = math(tally);
      }
    console.log(roundTotal);
    })
      //scores saved dice and ends turn
    $("#score").click(function(){
      console.log(pool);
      savedDice =[];
      for (i=0; i<6; i++) {
         if (pool.dice[i].save == true){
          savedDice.push(pool.dice[i].face)
        }
      }
      tally = countDice(savedDice);
      var roundTotal = math(tally);
      console.log(roundTotal);
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
