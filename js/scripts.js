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

Die.prototype.Save = function(die) {
  this.save = true;
}

Pool.prototype.assignId = function() {
  this.currentId +=1;
  return this.currentId;
}

Pool.prototype.addToPool = function(die){
  die.id = this.assignId();
  this.dice.push(die);
  }



  $("#cast").click(function(){
    var pool = new Pool();
    $("#res").empty();
    for(i = 0; i <6; i++) {
      var roll = Math.floor(Math.random() * 6) + 1;
      var die = new Die(roll);
      pool.addToPool(die);
      $("#res").append("<li id='"+i+"'>"+die.face+"</li>")
    }
    $("#res").append("<button type='submit' id='reroll'>reroll</button>")

    console.log(pool);

    $("li").click(function(){
      if (pool.dice[this.id].save == false) {
        pool.dice[this.id].save = true;
      } else {
        pool.dice[this.id].save = false
      }
      console.log(pool.dice[this.id]);
    })
  })






















});
