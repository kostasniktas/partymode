// ==UserScript==
// @name           Party all the time. (octahedral)
// @description    Party all the time. (octahedral)
// @include        https://example.com/*
// @require        https://example.com/partymode/jquery-1.6.4.js
// @require        https://example.com/partymode/jquery.color.js
// ==/UserScript==

var partyModeBodyColor = undefined;
var partyModeInterval = undefined;

//function partyModeRandomColor () {
//  return 'rgb(' +
//    (Math.floor(Math.random() * 256)) + ',' +
//    (Math.floor(Math.random() * 256)) + ',' +
//    (Math.floor(Math.random() * 256)) + ')';
//}
function partyModeRandomColor () {
  var centerX;
  var centerY;
  var centerZ;
  var v1X;
  var v1Y;
  var v1Z;
  var v2X;
  var v2Y;
  var v2Z;
  if(Math.random() < 0.5) {
      centerX = 1;
      centerY = 1;
      centerZ = 0;

      v1X = -1;
      v1Y = 0;
      v1Z = 0;

      v2X = 0;
      v2Y = -1;
      v2Z = 0;
  }
  else {
      centerX = 1;
      centerY = 0;
      centerZ = 0;

      v1X = 0;
      v1Y = 1;
      v1Z = 0;

      v2X = 0;
      v2Y = 0;
      v2Z = 1;
  }
  var v1w = Math.random();
  var v2w = Math.random();
  if(v1w + v2w > 1) {
      v1w = 1 - v1w;
      v2w = 1 - v2w;
  }
  var x = centerX + v1X * v1w + v2X * v2w;
  var y = centerY + v1Y * v1w + v2Y * v2w;
  var z = centerZ + v1Z * v1w + v2Z * v2w;
  if(Math.random() < 0.5) {
      var t = x;
      x = y;
      y = t;
  }
  var r = 3 * Math.random();
  if(r < 1) {
      var t = x;
      x = y;
      y = z;
      z = t;
  }
  else if(r < 2) {
      var t = x;
      x = z;
      z = y;
      y = t;
  }
  else {
      // nothing
  }
  var ret = 'rgb(' +
    (Math.floor(x * 256)) + ',' +
    (Math.floor(y * 256)) + ',' +
    (Math.floor(z * 256)) + ')';
  return ret;
}

function start() {
  if ($("body").css("background-color") == "transparent") {
    $("body").css("background-color","white");
  }
  partyModeBodyColor = $("body").css("background-color");
}

function togglePartyMode () {
  if (partyModeInterval) {
    clearInterval(partyModeInterval);
    partyModeInterval = undefined;
    $("body").animate({backgroundColor: partyModeBodyColor}, 750);
    $("img#partyModeDiscoBall").remove();
  } else {
    partyModeInterval = setInterval ( function () {
      $("body").animate({backgroundColor: partyModeRandomColor()}, 400);
    }, 500);
    $("body").append(
      s$("<img></img>").attr("id","partyModeDiscoBall").attr("src","https://example.com/partymode/discoball.gif").css("position","absolute")
        .css("left",$("body").width()/2-150)
        .css("top",0)
    );
  }
}

start();
togglePartyMode();
