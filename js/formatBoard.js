$(document).ready(function(){

  function resizeBoard(){
    console.log($(window).width(), $(window).height());
    if($(window).width() >= $(window).height()){

      // SCREEN IS LANDSCAPE
      $('.board-container')
      .css('width', '80vh')
      .css('padding', '1.7vh')

      $('.tile')
      .css('width', '9.48vh')
      .css('height', '9.48vh')

      $('.row')
      .css('padding', "1.7vh")

      $('.nav-row')
      .css('padding', "1.7vh")
      .css('padding-bottom', "0")


    } else{

      // SCREEN IS PORTRAIT
      if($(window).width() < 400){

        // SCREEN IS PORTRAIT SMALL
        $('.board-container')
        .css('width', '100vw')
        .css('padding', '2.12vw')

        $('.tile')
        .css('width', '11.85vw')
        .css('height', '11.85vw')

        $('.row')
        .css('padding', "2.12vw");

        $('.nav-row')
        .css('padding', "2.12vw")
        .css('padding-bottom', "0")
      }else{

        // SCREEN IS PORTRAIT LARGE
        $('.board-container')
        .css('width', '80vw')
        .css('padding', '1.7vw')

        $('.tile')
        .css('width', '9.48vw')
        .css('height', '9.48vw')

        $('.row')
        .css('padding', "1.7vw")

        $('.nav-row')
        .css('padding', "1.7vw")
        .css('padding-bottom', "0")
      }
    }
  }

  resizeBoard();

  window.addEventListener("resize", resizeBoard);

})
