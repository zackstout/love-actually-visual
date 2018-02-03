
var ctx, canvas;
// I have no idea why we need this now, I feel like we never needed it before:
(function(window, document, undefined){
  window.onload = init;

    function init() {

      canvas = document.getElementById('canv');
      console.log(canvas);
      ctx = canvas.getContext('2d');

      polygon(1, 1, 14, 260);

    }

})(window, document, undefined);


var actorsData = 'actors,bill_nighy,keira_knightley,andrew_lincoln,hugh_grant,colin_firth,alan_rickman,heike_makatsch,laura_linney,emma_thompson,liam_neeson,kris_marshall,abdul_salis,martin_freeman,rowan_atkinson';

var split = actorsData.split(',');
var actors = [];
for (var i = 1; i < 15; i++) {
  actors.push(split[i]);
}


// var ctx = canv[0].getContext('2d');

// what does it say about me that i'd rather copy this out that figure out how to draw in python or read local csvs in javascript...
var connections = [
  [9],
  [2, 7],
  [2, 7, 8],
  [2, 1, 1, 13],
  [1, 2, 2, 1, 13],
  [1, 1, 2, 3, 1, 13],
  [0, 0, 1, 1, 0, 7, 9],
  [1, 3, 4, 1, 2, 4, 3, 11],
  [1, 1, 2, 3, 1, 9, 3, 2, 12],
  [3, 1, 1, 2, 1, 2, 0, 1, 5, 13],
  [1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 7],
  [1, 2, 2, 1, 1, 1, 0, 1, 1, 1, 5, 7],
  [1, 1, 1, 2, 1, 2, 0, 1, 2, 2, 1, 3 ,7],
  [1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 2]
];

// Ok if i is 2, we go and draw line between 2 and 0 (width 2) and 1 (width 7)

// In our case, x is the number of actors, 14:
function polygon(a, b, x, r) {
  ctx.translate(canvas.width/2, canvas.height/2);
  for (var i = 0; i < x; i++) {
    // I suppose we can ignore the values on the diagonal, because those just count how many scenes each actor appears in. Or we could use that to size their circle...
    var xCoord = r * a * Math.cos(i * 2 * Math.PI/x);
    var yCoord = r * b * Math.sin(i * 2 * Math.PI/x);
    var row = connections[i];
    ctx.beginPath();
    // Move to the ith row in our matrix:
    ctx.moveTo(xCoord, yCoord);
    // Draw circle to represent amount of scenes appeared in (soon to be filled with actor's face):
    ctx.arc(xCoord, yCoord, 4 * row[row.length - 1], 0, 2 * Math.PI);
    ctx.fillStyle = getRandomColor();
    ctx.fill();
    // ctx.lineTo(r*a*Math.cos((i+1)*2*Math.PI/x), r*b*Math.sin((i+1)*2*Math.PI/x));
    ctx.stroke();

    for (var j=0; j < row.length - 1; j++) {
      // Honestly unsure whether either are needed:
      ctx.beginPath();
      ctx.moveTo(xCoord, yCoord);
      var targetDiff = i - j;
      var targetX = r * a * Math.cos((i - targetDiff) * 2 * Math.PI/x);
      var targetY = r * b * Math.sin((i - targetDiff) * 2 * Math.PI/x);
      ctx.lineTo(targetX, targetY);
      ctx.lineWidth = row[j] * 3;
      ctx.stroke();
    }

  }
  ctx.translate(-canvas.width/2, -canvas.height/2);

}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


// console.log(actors);
