var Checkers = (function($,swal){
  ('use strict');
//TODO: reset button
  var root;
  var moves = 0;

  function buildBoard(boardEl){

    root = $(boardEl);
    root.append($('<textarea>',{id:'cehckers-result',readonly:true,rows:4,class:'form-control',html:'balls left:44\nmoves:0'}));
    //root.append($('<button>',{id:'cehckers-reset',readonly:true,rows:2,class:'form-control',html:'balls:44\nmoves:0'}));

    var board =[
    [-1,-1,-1,  1, 1, 1,  -1,-1,-1],
    [-1,-1,-1,  1, 1, 1,  -1,-1,-1],
    [-1,-1,-1,  1, 1, 1,  -1,-1,-1],

    [ 1, 1, 1,  1, 1, 1,   1, 1, 1],
    [ 1, 1, 1,  1, 0, 1,   1, 1, 1],
    [ 1, 1, 1,  1, 1, 1,   1, 1, 1],

    [-1,-1,-1,  1, 1, 1,  -1,-1,-1],
    [-1,-1,-1,  1, 1, 1,  -1,-1,-1],
    [-1,-1,-1,  1, 1, 1,  -1,-1,-1],
    ];

    // board =[
    // [-1,-1,-1,  0, 0, 0,  -1,-1,-1],
    // [-1,-1,-1,  0, 0, 0,  -1,-1,-1],
    // [-1,-1,-1,  0, 0, 0,  -1,-1,-1],
    //
    // [ 0, 0, 0,  0, 0, 0,   0, 0, 0],
    // [ 0, 0, 1,  1, 0, 0,   0, 0, 0],
    // [ 0, 0, 0,  0, 0, 0,   0, 0, 0],
    //
    // [-1,-1,-1,  0, 0, 0,  -1,-1,-1],
    // [-1,-1,-1,  0, 0, 0,  -1,-1,-1],
    // [-1,-1,-1,  0, 0, 0,  -1,-1,-1],
    // ];



    for (i in board){

      if(!board.hasOwnProperty(1)) continue;
      var row = board[i]

      var rowEl = $('<div>',{class:"checkers-row"});
      rowEl.appendTo(boardEl);

      for (j in row){
        if(!row.hasOwnProperty(1)) continue;
        var cell = row[j];
        var cellEl = $('<div>',{class: (cell === -1)?'checkers-border':'checkers-cell','data-state':cell,'data-x':i,'data-y':j});
        $('<div>',{class:"checkers-cell-fill"}).appendTo(cellEl);
        if( cell === 1){
          cellEl.append($('<div>',{class:'checkers-ball','data-x':i,'data-y':j}))
        }
        cellEl.appendTo(rowEl);
      }
    }
  }
  //prepairs draggable - wil be enabled disabled according to
  function hookDraggable(boardEl){
    $( ".checkers-ball",boardEl ).draggable({
      containment:boardEl,
      revert: true,
    });

    $('.checkers-cell').droppable( {
      accept: '.checkers-ball',
      hoverClass: 'hovered',
      drop: resolveMove,
    })
  }

  function isMoveLegal(ball,cell,boardEl){

    if($('.checkers-ball',cell.el).length)
      return false;

    if(!(Math.abs( ball.x - cell.x ) === 2 && ball.y ===cell.y || Math.abs( ball.y - cell.y ) === 2 && ball.x ===cell.x))
      return false;

    var middleBall = $('.checkers-cell[data-x=' + (( ball.x + cell.x)/2) + '][data-y=' + (( ball.y + cell.y)/2) + ']>.checkers-ball',boardEl);
    if( !middleBall.length )
      return false;

    return middleBall;
  }


  function isEndGame(boardEl){
    var endgame = true;
    $('.checkers-ball',boardEl).each(function(ball){
      var ball = {
        x:parseInt($(this).parent().attr('data-x')),
        y:parseInt($(this).parent().attr('data-y')),
      };

      if(
         $('.checkers-cell[data-x=' + (ball.x + 1) + '][data-y=' + (ball.y) + '] > .checkers-ball',boardEl).length &&
        !$('.checkers-cell[data-x=' + (ball.x + 2) + '][data-y=' + (ball.y) + '] > .checkers-ball',boardEl).length &&
        !$('.checkers-border[data-x=' + (ball.x + 2) + '][data-y=' + (ball.y) + ']',boardEl).length
      ){
        endgame = false;
      }

      if(
         $('.checkers-cell[data-x=' + (ball.x - 1) + '][data-y=' + (ball.y) + '] > .checkers-ball',boardEl).length &&
        !$('.checkers-cell[data-x=' + (ball.x - 2) + '][data-y=' + (ball.y) + '] > .checkers-ball',boardEl).length &&
        !$('.checkers-border[data-x=' + (ball.x - 2) + '][data-y=' + (ball.y) + ']',boardEl).length
      ){
        endgame = false;
      }
      if(
         $('.checkers-cell[data-x=' + (ball.x) + '][data-y=' + (ball.y + 1) + '] > .checkers-ball',boardEl).length &&
        !$('.checkers-cell[data-x=' + (ball.x) + '][data-y=' + (ball.y + 2) + '] > .checkers-ball',boardEl).length &&
        !$('.checkers-border[data-x=' + (ball.x) + '][data-y=' + (ball.y + 2) + ']',boardEl).length
      ){
        endgame = false;
      }
      if(
         $('.checkers-cell[data-x=' + (ball.x) + '][data-y=' + (ball.y - 1) + '] > .checkers-ball',boardEl).length &&
        !$('.checkers-cell[data-x=' + (ball.x) + '][data-y=' + (ball.y - 2) + '] > .checkers-ball',boardEl).length &&
        !$('.checkers-border[data-x=' + (ball.x) + '][data-y=' + (ball.y -2) + ']',boardEl).length
      )
      {
        endgame = false;
      }
    })

    return endgame;
  }

  function resolveMove (e,ui){
    var ball = {
      el:$(ui.draggable),
      x:parseInt($(ui.draggable).parent().attr('data-x')),
      y:parseInt($(ui.draggable).parent().attr('data-y')),
    };
    var boardEl = ball.el.parent().parent().parent();
    var cell = {
      el:$(this),
      x:parseInt($(this).attr('data-x')),
      y:parseInt($(this).attr('data-y')),
    };

    var middleBall = isMoveLegal(ball,cell,boardEl)



    if(!middleBall){
      return;
    }


    ball.el.remove();
    ball.el = $('<div>',{class:'checkers-ball','data-x':cell.x,'data-y':cell.y}).appendTo(cell.el)
    ball.el.draggable({
      containment:boardEl,
      revert: true,
    });
    middleBall.remove();
    var results =
    'balls left:' +  $('.checkers-ball',boardEl).length +
    '\nmoves:' + ++moves;
    if (isEndGame()) {
      results = 'best score:' + getScoreLow( $('.checkers-ball',boardEl).length,'checkers' ) + "\n" + results;
      swal('Game over\n' + results);
    }

    $('#cehckers-result',boardEl).html(results);

  }

  function makeResponsive(boardEl){
    $(window).resize( function(event) {
      var size = Math.min(boardEl.parent().width(),boardEl.parent().height())+10;
      boardEl.css({width:size + 'px',height:size + 'px'});
    })
  }


  return{
    initBoard: function(boardEl){
      buildBoard(boardEl);
      hookDraggable(boardEl);
    }
}


}(jQuery,swal));



$(document).ready( function(event) {
  Checkers.initBoard($('#checkers'));
});
