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

function Pool (one, two, three, four, five, six) {this.one = 0, this.two = 0, this.three = 0, this.four = 0, this.five = 0, this.six = 0};



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
function saveDice() {
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
function math(pool) {
  counter = 0;
 for (var face in pool) {
   counter++;
   if (pool[face] === 1) {
     if (counter == 1) {
       points += 100;
     }
     if (counter == 5) {
       points += 50;
     } else if (counter == 2 || counter == 3 || counter == 4 || counter == 6){
       alert ("invalid single");
     }
   }
   if (pool[face] === 2) {
     if (counter == 1) {
       points += 200;
     } else if (counter == 5) {
       points += 100;
     } else if (counter == 2 || counter == 3 || counter == 4 || counter == 6){
       alert ("invalid double");
     }
   }
   if (pool[face] === 3) {
     if (counter == 1) {
       points+= 1000;
     } else {
       points += counter*100;
     }
   }
   if (pool[face] === 4) {
     if (counter == 1) {
       points+= 2000;
     } else {
       points += counter*200;
     }
   }
   if (pool[face] === 5) {
     if (counter == 1) {
       points+= 3000;
     } else {
       points += counter*400;
     }
   }
   if (pool[face] == 6) {
    alert ("Cannot have 6 of a kind, return 1 die.")
   }
   console.log("counter "+counter);
 }
 console.log("points "+points);
 return points;
}

// function scoreDice() {
//   math(savedPool);
//   console.log("saved " + saved);
//   console.log(savedPool);
//
// }






 $("#cast").click(function(){
   $("#res").empty();
   rollDice();
   poolDice();
   for (i=0; i <dice.length ;i++){
     $("#res").append("<input type='checkbox' value = '"+dice[i]+"'>"+dice[i]);
   }
   console.log("castclicked");
   console.log(pool);
 })
  //when dice are scored splice from pool then reroll values of current pool
  $("#save").click(function(){
    $("#res input:checked").each(function(){
      saved.push(parseInt($(this).val()));
      dice.splice(0,1);
      console.log("saveclicked");
    });
    saveDice();
    math(savedPool);
  })

  $("#reroll").click(function(){
    $("#res").empty();
    for (i=0; i < dice.length;i++) {
      var newRoll = Math.floor(Math.random() * 6) + 1;
      dice.splice(i, 1, newRoll)
      $("#res").append("<input type='checkbox' value = '"+dice[i]+"'>"+dice[i]);
    }
  })
});
