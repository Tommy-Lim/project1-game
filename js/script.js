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
  if(checkersArray[x][y].color == switchColor(playerTurn)){
    return true;
  } else{
    return false;
  }
}

function isGameOver(){
  var redCheckers = 0;
  var blackCheckers = 0;
  for(x=0; x<checkersArray.length; x++){
    for(y=0; y<checkersArray.length; y++){
      if(checkersArray[x][y].color=="red"){
        redCheckers++;
      } else if(checkersArray[x][y].color=="black"){
        blackCheckers++;
      }
    }
  }
  console.log(redCheckers,blackCheckers);
  if(redCheckers===0){
    $(".header span").text("Black wins!");
    playerTurn = "Paused";
  } else if(blackCheckers===0){
    $(".header span").text("Red wins!");
    playerTurn = "Paused";
  }
}

function switchColor(color){
  if(color=="red"){
    return "black";
  } else if(color=="black"){
    return "red";
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

function addSideClass(playerSide, x, y){
  $("#tile-"+x+"-"+y).addClass(playerSide);
  checkersArray[x][y].side = playerSide;
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

function calcMiddle(p1,p2){
  if((p2-p1)>0){
    return p2-1;
  } else{
    return p2+1;
  }
}

function assignDirection(){
  if(checkersArray[start.x][start.y].side=="top"){
    currentDirection = 1;
  } else{
    currentDirection = -1;
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

function addKingClass(x, y){
  $("#tile-"+x+"-"+y).removeClass(playerTurn);
  $("#tile-"+x+"-"+y).addClass(playerTurn+"-king");
  checkersArray[x][y].king = true;
}

function isKing(x,y){
  if((checkersArray[x][y].side=="top"&&y==7)||(checkersArray[x][y].side=="bottom"&&y===0)||(checkersArray[start.x][start.y].king===true)){
    addKingClass(x,y);
    return true;
  }
}

function switchTurns(){
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
  isKing(end.x,end.y);
}

function setBoard(){
  redScore = 0;
  blackScore = 0;
  start = null;
  middle = null;
  end = null;
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
}


function isDiagonal(x,y){
  assignDirection();

  var dx = x-start.x;
  var dy = y-start.y;

  //check if move is diagonal one
  if((dx==1||dx==-1)&&dy==currentDirection){
    //move is diagonal one in right direction
    return true;
  }else if(checkersArray[start.x][start.y].king&&((dx==1||dx==-1)&&(dy==1||dy==-1))){
    //move is diagonal one for a king in any direction
    return true;
  } else{
  }
}

function areMoreJumps(){
  assignDirection();

  start.x = end.x;
  start.y = end.y;

  var i=0;
  var j=0;

  if(checkersArray[end.x][end.y].king){
    //conditions for if king:
    for(i=-2; i<3; i++){
      for(j=-2; j<3; j++){
        if(i===0||j===0){
          //skip zero position reference
        } else{
          if(isOpponents(start.x+i,start.y+j)&&isOpponents(start.x+2*i,start.y+2*j)){
            console.log("another jump available for king to x:"+i+"and y:"+j);
          }
        }
      }
    }
  }else{
    //conditions for if not king:
    for(i=-2; i<3; i++){
      if(i===0||j===0){
        //skip zero position reference
      } else{
        if(isOpponents(start.x+i,start.y+currentDirection)&&isOpponents(start.x+2*i,start.y+2*currentDirection)){
          console.log("another jump available for regular checker to x:"+i+"and y:"+currentDirection);
        }
      }
    }
  }
}

function isJump(x,y){
  assignDirection();

  var dx = x-start.x;
  var dy = y-start.y;

  if(checkersArray[start.x][start.y].king){
    //code for if a king
    if((dx==2||dx==-2)&&(dy==-2||dy==2)){
      setMiddleCoordinates(calcMiddle(start.x,x),calcMiddle(start.y,y));
      if(isOpponents(middle.x,middle.y)){
        return true;
      }else{
        middle = null;
        //do nothing because nothing to jump
      }
    }else{
      //the square is not diagonal
    }
  }else {
    //code for if not a king
    if((dx==2||dx==-2)&&dy==currentDirection*2){
      setMiddleCoordinates(calcMiddle(start.x,x),calcMiddle(start.y,y));
      if(isOpponents(middle.x,middle.y)){
        return true;
      }
    }else {
      //the square is not diagonal
    }
  }
}

$(".tile").click(function(event){
  if(playerTurn!="Paused"){
    var currentX = parseInt(event.currentTarget.id.split("-")[1],10);
    var currentY = parseInt(event.currentTarget.id.split("-")[2],10);
    console.log(currentX,currentY);
    if(start){
      if(isEmpty(currentX,currentY)){
        if(isDiagonal(currentX,currentY)){
          setEndCoordinates(currentX,currentY);
          movePiece();
          resetTile(start.x,start.y);
          switchTurns();
          isGameOver();
        } else if(isJump(currentX,currentY)){
          countScore();
          resetTile(middle.x,middle.y);
          setEndCoordinates(currentX,currentY);
          movePiece();
          // areMoreJumps();
          resetTile(start.x,start.y);
          switchTurns();
          isGameOver();
        }
        else{
        }
      } else if(isPlayers(currentX,currentY)){
        $("#tile-"+start.x+"-"+start.y+" span").remove();
        setStartCoordinates(currentX,currentY);
      }
    }else{
      if(isPlayers(currentX,currentY)){
        setStartCoordinates(currentX,currentY);
      } else{
      }
    }
  } else{
    //dont play because on pause
  }
});

$("#start-button").click(function(){
  redIsTop();
  setBoard();
});
