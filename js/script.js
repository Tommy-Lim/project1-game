console.log("js loaded");

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

function setBoard(player1, player2){
  for(i = 0; i<checkersArray.length; i++){
    if(i%2===0){
      for(j=1; j<checkersArray[i].length; j+=2){
        resetClass(i,j);
        if(i<3){
          addCheckerClass(player1, i, j);
          addPlayerClass("top",i, j);
        } else if (i>4) {
          addCheckerClass(player2, i, j);
          addPlayerClass("bottom",i, j);
        }
      }
    } else{
      for(j=0; j<checkersArray[i].length; j+=2){
        resetClass(i,j);
        if(i<3){
          addCheckerClass(player1, i, j);
        } else if (i>4) {
          addCheckerClass(player2, i, j);
        }
      }
    }
  }
}

function resetClass(i,j){
  $("#tile-"+i+"-"+j).removeClass("black").removeClass("red").removeClass("black-king").removeClass("red-king");
  checkersArray[i][j] = "";
}

function addCheckerClass(player, i, j){
  $("#tile-"+i+"-"+j).addClass(player);
  checkersArray[i][j] = player;
}

function addPlayerClass(playerSide, i, j){
    $("#tile-"+i+"-"+j).addClass(playerSide);
}
