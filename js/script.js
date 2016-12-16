$(".settings").hide();
$(".overlay").hide();

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
var redWins = 0;
var blackWins = 0;
var doubleJump = false;
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

function displayWinner(){
  //switch color because switch turn has already run
  playerTurn = switchColor(playerTurn);
  window[playerTurn+"Wins"]++;
  $("#"+playerTurn+"WinsCounter").text(window[playerTurn+"Wins"]);
  if($("#messagesYes")[0].checked){
    $(".overlay").text(playerTurn+" wins!");
    $(".overlay").show();
    setTimeout(function(){$(".overlay").hide();},3000);
  }
  playerTurn = "Paused";
}

function displayWhosTurn(){
  if($("#messagesYes")[0].checked){
    $(".overlay").text(playerTurn+"'s turn!");
    $(".overlay").show();
    setTimeout(function(){$(".overlay").hide();},1000);
  }
}

function displayJumpAgain(){
  if($("#messagesYes")[0].checked){
    $(".overlay").text("Jump again, "+playerTurn+"!");
    $(".overlay").show();
    setTimeout(function(){$(".overlay").hide();},2000);
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

  if(redCheckers===0||blackCheckers===0){
    return true;
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

function addKingClass(x, y){
  $("#tile-"+x+"-"+y).removeClass(playerTurn);
  $("#tile-"+x+"-"+y).addClass(playerTurn+"-king");
  checkersArray[x][y].king = true;
}

function isKing(x,y){
  if((checkersArray[x][y].side=="top"&&y==7)||(checkersArray[x][y].side=="bottom"&&y===0)||(checkersArray[start.x][start.y].king===true)){
    return true;
  }
}

function setStartCoordinates(x,y){
  start = {
    x: x,
    y: y
  };

  $("#tile-"+x+"-"+y).append("<span><img src='./img/checkers-highlight-white.svg' /></span>");
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

function checkValid(p1,p2,p3,p4){
  if(p1>=0&&p2>=0&&p3>=0&&p4>=0&&p1<=7&&p2<=7&&p3<=7&&p4<=7){
    return true;
  } else {
    return false;
  }
}

function switchTurns(){
  start = null;
  end = null;
  middle = null;
  doubleJump = false;

  $("#"+playerTurn+"Counter span").remove();
  $("#"+playerTurn+"Caret").addClass("dark");

  if(playerTurn=="red"){
    playerTurn = "black";
  } else{
    playerTurn = "red";
  }

  $("#"+playerTurn+"Caret").removeClass("dark");
}

function movePiece(){
  $("#tile-"+start.x+"-"+start.y+" span").remove();
  $("#tile-"+end.x+"-"+end.y).addClass(playerTurn);

  checkersArray[end.x][end.y].color = checkersArray[start.x][start.y].color;
  checkersArray[end.x][end.y].king = checkersArray[start.x][start.y].king;
  checkersArray[end.x][end.y].side = checkersArray[start.x][start.y].side;

  if(isKing(end.x,end.y)){
    addKingClass(end.x,end.y);
  }
}

function setBoard(){
  if(start!==null){
    $("#tile-"+start.x+"-"+start.y+" span").remove();
  }
  redScore = 0;
  blackScore = 0;
  start = null;
  middle = null;
  end = null;
  playerTurn = players[Math.round(Math.random())];

  $("#redCounter").text("0");
  $("#blackCounter").text("0");
  $("#redCaret").addClass("dark");
  $("#blackCaret").addClass("dark");
  $("#"+playerTurn+"Caret").removeClass("dark");
  displayWhosTurn();

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

function areMoreJumps(x,y){
  start.x = x;
  start.y = y;

  assignDirection();

  var i=0;
  var j=0;

  if(checkersArray[start.x][start.y].king){
    //conditions for if king:
    for(i=-1; i<2; i+=2){
      for(j=-1; j<2; j+=2){

        middle.x = start.x+i;
        middle.y = start.y+j;
        end.x = start.x+2*i;
        end.y = start.y+2*j;

        if(checkValid(middle.x,middle.y,end.x,end.y)){

          if(isOpponents(middle.x,middle.y)&&isEmpty(end.x,end.y)){
            displayJumpAgain();
            $("#tile-"+start.x+"-"+start.y).append("<span><img src='./img/checkers-highlight-white.svg' /></span>");
            doubleJump = true;
            return true;
          } else{
            doubleJump = false;
            console.log("another jump not available for a king");
          }

        }else{
          //do nothing because coordinates off grid
        }

      }
    }
  }else{
    //conditions for if not king:
    for(i=-1; i<2; i+=2){

      middle.x = start.x+i;
      middle.y = start.y+currentDirection;
      end.x = start.x+2*i;
      end.y = start.y+2*currentDirection;

      if(checkValid(middle.x,middle.y,end.x,end.y)){

        if(isOpponents(middle.x,middle.y)&&isEmpty(end.x,end.y)){
          displayJumpAgain();
          $("#tile-"+start.x+"-"+start.y).append("<span><img src='./img/checkers-highlight-white.svg' /></span>");
          doubleJump = true;
          return true;
        } else{
          doubleJump = false;
          console.log("another jump not available for a regular checker");
        }

      }else{
        //do nothing because coordinates off grid
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

    if(start){
      if(isEmpty(currentX,currentY)){

        if(isDiagonal(currentX,currentY)&&!doubleJump){
          setEndCoordinates(currentX,currentY);
          movePiece();
          resetTile(start.x,start.y);
          switchTurns();
          if(isGameOver()){
            displayWinner();
          }
        } else if(isJump(currentX,currentY)){
          countScore();
          resetTile(middle.x,middle.y);
          setEndCoordinates(currentX,currentY);
          movePiece();
          resetTile(start.x,start.y);
          if(areMoreJumps(currentX,currentY)){
            //wait for next jump;
          }else{
            switchTurns();
          }
          if(isGameOver()){
            displayWinner();
          }
        }else{
        }

      }else if(isPlayers(currentX,currentY)&&!doubleJump){
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

$("#settings-button").click(function(){
  $(".settings").toggle();
});

$("#exitSettings").click(function(){
  $(".settings").toggle();
});

$(".overlay").click(function(){
  $(".overlay").hide();
});


//add a simulation script to automate moves which would demonstrate each type of play as well as winning for presentation
//split up JS files in a sensible way
//add win detection for if no moves and one has more pieces jumped
