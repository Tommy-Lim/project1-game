console.log("js loaded");

var playerTop;
var playerBottom;
var currentDirection;
var players = ["red","black", "Paused"];
var playerTurn = "Paused";
var start = null;
var end = null;
var middle = null;
var redScore = 0;
var blackScore = 0;

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

function isOpponents(x,y){
  if(checkersArray[x][y].color != playerTurn){
    return true;
  } else{
    return false;
  }
}

function resetTile(x,y){
  $("#tile-"+x+"-"+y).removeClass("black").removeClass("red").removeClass("black-king").removeClass("red-king").removeClass("top").removeClass("bottom");
  checkersArray[x][y].color = "";
  checkersArray[x][y].king = false;
  checkersArray[x][y].side = "";
}

function addCheckerClass(color, x, y){
  $("#tile-"+x+"-"+y).addClass(color);
  checkersArray[x][y].color = color;
}

function addKingClass(x, y){
  $("#tile-"+x+"-"+y).addClass("king");
  checkersArray[x][y].king = true;
}

function addSideClass(playerSide, x, y){
    $("#tile-"+x+"-"+y).addClass(playerSide);
    checkersArray[x][y].side = playerSide;
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

function countScore(){
  this[playerTurn+"Score"] ++;
  $("#"+playerTurn+"Counter").text(this[playerTurn+"Score"]);
}

function setMiddleCoordinates(x,y){
  middle = {
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
  if((x-start.x==1||x-start.x==-1)&&y-start.y==currentDirection){
    console.log("the square is diagonal one");
    return true;
  }else {
    console.log("the square is not diagonal");
  }

  console.log("currentDirection: "+currentDirection);
  if((x-start.x==2||x-start.x==-2)&&y-start.y==currentDirection*2){
    console.log("the square is diagonal two");
      if(start.x-x==2){
        console.log("attempt jump left");
        setMiddleCoordinates(start.x-1,start.y+currentDirection);
        if(isOpponents(middle.x,middle.y)){
          console.log("jump opponent left");
          countScore();
          resetTile(middle.x,middle.y);
          return true;
        }
      } else if(start.x-x==-2){
        console.log("jump right");
        setMiddleCoordinates(start.x+1,start.y+currentDirection);
        if(isOpponents(middle.x,middle.y)){
          console.log("jump opponent right");
          countScore();
          resetTile(middle.x,middle.y);
          return true;
        }
      }



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

function switchTurns(){
  resetTile(start.x,start.y);
  start = null;
  end = null;
  middle = null;
  $("#"+playerTurn+"Counter span").remove();
  $("#"+playerTurn+"Counter").toggleClass("dark");
  $("#"+playerTurn+"Caret").toggleClass("dark");
  if(playerTurn=="red"){
    playerTurn = "black";
  } else{
    playerTurn = "red";
  }
  $(".header span").text(playerTurn+"'s turn!");
  $("#"+playerTurn+"Counter").toggleClass("dark");
  $("#"+playerTurn+"Caret").toggleClass("dark");
}

function movePiece(){
  $("#tile-"+start.x+"-"+start.y+" span").remove();
  $("#tile-"+end.x+"-"+end.y).addClass(playerTurn);
  checkersArray[end.x][end.y].color = checkersArray[start.x][start.y].color;
  checkersArray[end.x][end.y].king = checkersArray[start.x][start.y].king;
  checkersArray[end.x][end.y].side = checkersArray[start.x][start.y].side;
  switchTurns();
}

function setBoard(){
  redScore = 0;
  blackScore = 0;
  $("#redCounter").text("0");
  $("#blackCounter").text("0");
  playerTurn = players[Math.round(Math.random())];
  $(".header span").text(playerTurn+"'s turn!");
  $("#"+playerTurn+"Counter").toggleClass("dark");
  $("#"+playerTurn+"Caret").toggleClass("dark");
  for(y = 0; y<checkersArray.length; y++){
    if(y%2===0){
      for(x=1; x<checkersArray[y].length; x+=2){
        resetTile(x,y);
        if(y<3){
          addCheckerClass(playerTop, x, y);
          addSideClass("top",x, y);
        } else if (y>4) {
          addCheckerClass(playerBottom, x, y);
          addSideClass("bottom", x, y);
        }
      }
    } else{
      for(x=0; x<checkersArray[y].length; x+=2){
        resetTile(x,y);
        if(y<3){
          addCheckerClass(playerTop, x, y);
          addSideClass("top",x, y);
        } else if (y>4) {
          addCheckerClass(playerBottom, x, y);
          addSideClass("bottom", x, y);
        }
      }
    }
  }
  console.log("board reset");
}

$(".tile").click(function(event){
  if(playerTurn!="Paused"){
    var currentX = parseInt(event.currentTarget.id.split("-")[1],10);
    var currentY = parseInt(event.currentTarget.id.split("-")[2],10);
    console.log(currentX,currentY);
    if(start){
      console.log("start already set");
      if(isEmpty(currentX,currentY)){
        console.log("end square is empty");
        if(isDiagonal(currentX,currentY)){
          console.log("end square is diagonal, set end square");
          setEndCoordinates(currentX,currentY);
          movePiece();
        } else{
          console.log("square empty but not diagnoal");
        }
      } else if(isPlayers(currentX,currentY)){
        $("#tile-"+start.x+"-"+start.y+" span").remove();
        setStartCoordinates(currentX,currentY);
        console.log("reset start");
      }
      // } else if(){
      //   //is opponent, then check next position
      // }
    } else{
      console.log("start not set, set start");
      if(isPlayers(currentX,currentY)){
        setStartCoordinates(currentX,currentY);
        console.log("square belongs to player, set start");
      } else{
        console.log("square not players, dont set start");
      }
    }
  } else{
    //dont play because on pause
  }
});

$("#start-button").click(function(){
  console.log("start pushed");
  redIsTop();
  setBoard();
});
