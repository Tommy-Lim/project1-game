console.log("js loaded");

var playerTop;
var playerBottom;
var currentDirection;
var players = ["red","black", "Paused"];
var playerTurn = "";
var start = null;
var end = null;

var checkersArray = [
  [
    [],[],[],[],[],[],[],[]
  ],
  [
    [],[],[],[],[],[],[],[]
  ],
  [
    [],[],[],[],[],[],[],[]
  ],
  [
    [],[],[],[],[],[],[],[]
  ],
  [
    [],[],[],[],[],[],[],[]
  ],
  [
    [],[],[],[],[],[],[],[]
  ],
  [
    [],[],[],[],[],[],[],[]
  ],
  [
    [],[],[],[],[],[],[],[]
  ],
];

function isEmpty(x,y){
  console.log("checkers array at"+x+", "+y);
  console.log(checkersArray[x][y]);
  if(checkersArray[x][y].color === ""){
    return true;
  } else{
    return false;
  }
}

function isPlayers(x,y){
  if(checkersArray[x][y].color == playerTurn){
    return true;
  } else{
    return false;
  }
}

function resetClass(i,j){
  $("#tile-"+i+"-"+j).removeClass("black").removeClass("red").removeClass("black-king").removeClass("red-king");
  checkersArray[i][j].color = "";
  checkersArray[i][j].king = false;
  checkersArray[i][j].side = "";
}

function addCheckerClass(color, i, j){
  $("#tile-"+i+"-"+j).addClass(color);
  checkersArray[i][j].color = color;
}

function addKingClass(i, j){
  $("#tile-"+i+"-"+j).addClass("king");
  checkersArray[i][j].king = true;
}

function addSideClass(playerSide, i, j){
    $("#tile-"+i+"-"+j).addClass(playerSide);
    checkersArray[i][j].side = playerSide;
}

function availableSpacesRegular(playerSide){
  //available options takes in are you top or bottom -
}

function availableSpacesKing(){

}

function setStartCoordinates(x,y){
  start = {
    x: x,
    y: y
  };
  $("#tile-"+x+"-"+y).append("<span><img src='./img/checkers-highlight-yellow.svg' /></span>");
}

function setEndCoordinates(x,y){
  end = {
    x: x,
    y: y
  };

}

function isDiagonal(x,y){
  if(checkersArray[start.x][start.y].side=="top"){
    currentDirection = 1;
  } else{
    currentDirection = -1;
  }
  console.log("currentDirection: "+currentDirection);

  if(x-start.x==1||x-start.x==-1&&y-start.y==currentDirection){
    console.log("the square is diagonal");
    return true;
  }else {
    console.log("the square is not diagonal");
  }
}


function redIsTop(){
  if($("#top-side")[0].checked){
    playerTop = "red";
    playerBottom = "black";
  } else{
    playerTop = "black";
    playerBottom = "red";
  }
}

function setBoard(){
  playerTurn = players[Math.round(Math.random())];
  console.log("player is: "+playerTurn);
  for(i = 0; i<checkersArray.length; i++){
    if(i%2===0){
      for(j=1; j<checkersArray[i].length; j+=2){
        resetClass(i,j);
        if(i<3){
          addCheckerClass(playerTop, i, j);
          addSideClass("top",i, j);
        } else if (i>4) {
          addCheckerClass(playerBottom, i, j);
          addSideClass("bottom", i, j);
        }
      }
    } else{
      for(j=0; j<checkersArray[i].length; j+=2){
        resetClass(i,j);
        if(i<3){
          addCheckerClass(playerTop, i, j);
          addSideClass("top",i, j);
        } else if (i>4) {
          addCheckerClass(playerBottom, i, j);
          addSideClass("bottom",i, j);
        }
      }
    }
  }
}

$(".tile").click(function(event){
  var currentX = parseInt(event.currentTarget.id.split("-")[1],10);
  var currentY = parseInt(event.currentTarget.id.split("-")[2],10);
  console.log(currentX,currentY);
  if(start){
    console.log("start was not null");
    if(isEmpty(currentX,currentY)){
      console.log("square was empty");
      if(isDiagonal(currentX,currentY)){
        console.log("square was diagonal");
        setEndCoordinates(currentX,currentY);
      }
        console.log("square was empty, set end");
        setEndCoordinates(currentX,currentY);

    } else if(isPlayers(currentX,currentY)){
      $("#tile-"+start.x+"-"+start.y+" span").remove();
      setStartCoordinates(currentX,currentY);
      console.log("reset start");
    }
    // } else if(){
    //   //is opponent, then check next position
    // }
  } else{
    console.log("start was null");
    if(isPlayers(currentX,currentY)){
      setStartCoordinates(currentX,currentY);
      console.log("square belongs to player, set start");
    }
  }

});

$("#start-button").click(function(){
  console.log("start pushed");
  redIsTop();
  setBoard();
});
