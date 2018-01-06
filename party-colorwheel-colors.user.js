// ==UserScript==
// @name           Party all the time. (colorwheel)
// @description    Party all the time. (colorwheel)
// @include        https://example.com/*
// @require        https://example.com/partymode/jquery-1.6.4.js
// @require        https://example.com/partymode/jquery.color.js
// ==/UserScript==

var partyModeBodyColor = undefined;
var partyModeInterval = undefined;
var partyModeLastAngle = Math.random(6.28);

function partyModeRandomColor () {
  // we choose the brightness LIKE A BOSS
  var average = (1 + Math.random(1)) / 3;

  // we step the angle LIKE A BOSS
  partyModeLastAngle += 1 + Math.random(0.3);
  //partyModeLastAngle += 0.1;

  // we normalize the other axis vectors LIKE A BOSS
  var v0X = 1 / Math.sqrt(2);
  var v0Y = -1 / Math.sqrt(2);
  var v0Z = 0;
  var v1X = 1 / Math.sqrt(6);
  var v1Y = 1 / Math.sqrt(6);
  var v1Z = -2 / Math.sqrt(6);

  // start at (average, average, average)
  var fromX = average;
  var fromY = average;
  var fromZ = average;
  //console.log("from = (" + fromX + ", " + fromY + ", " + fromZ + ")");

  // pick the vector at our angle
  var vX = v0X * Math.cos(partyModeLastAngle) + v1X * Math.sin(partyModeLastAngle);
  var vY = v0Y * Math.cos(partyModeLastAngle) + v1Y * Math.sin(partyModeLastAngle);
  var vZ = v0Z * Math.cos(partyModeLastAngle) + v1Z * Math.sin(partyModeLastAngle);
  //console.log("v = (" + vX + ", " + vY + ", " + vZ + ")");

  // see how "much" of the vector we can add
  var limit = 10;
  if(vX != 0) {
      var limitX1 = (0 - fromX) / vX;
      if(limitX1 > 0 && limitX1 < limit) {
          limit = limitX1;
          //console.log("x lower bound forces limit <= " + limit);
      }

      var limitX2 = (1 - fromX) / vX;
      if(limitX2 > 0 && limitX2 < limit) {
          limit = limitX2;
          //console.log("x upper bound forces limit <= " + limit);
      }
  }
  if(vY != 0) {
      var limitY1 = (0 - fromY) / vY;
      if(limitY1 > 0 && limitY1 < limit) {
          limit = limitY1;
          //console.log("y lower bound forces limit <= " + limit);
      }

      var limitY2 = (1 - fromY) / vY;
      if(limitY2 > 0 && limitY2 < limit) {
          limit = limitY2;
          //console.log("y upper bound forces limit <= " + limit);
      }
  }
  if(vZ != 0) {
      var limitZ1 = (0 - fromZ) / vZ;
      if(limitZ1 > 0 && limitZ1 < limit) {
          limit = limitZ1;
          //console.log("z lower bound forces limit <= " + limit);
      }

      var limitZ2 = (1 - fromZ) / vZ;
      if(limitZ2 > 0 && limitZ2 < limit) {
          limit = limitZ2;
          //console.log("z upper bound forces limit <= " + limit);
      }
  }
  //console.log("limit = " + limit);

  var x = fromX + limit * vX;
  var y = fromY + limit * vY;
  var z = fromZ + limit * vZ;

  // we save ourselves from floating point LIKE A BOSS
  x = Math.floor(x * 256);
  x = Math.max(x, 0);
  x = Math.min(x, 255);

  y = Math.floor(y * 256);
  y = Math.max(y, 0);
  y = Math.min(y, 255);

  z = Math.floor(z * 256);
  z = Math.max(z, 0);
  z = Math.min(z, 255);

  //console.log("final = (" + x + ", " + y + ", " + z + ")");
  var ret = 'rgb(' + x + ',' + y + ',' + z + ')';
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
      $("<img></img>").attr("id","partyModeDiscoBall").attr("src","https://example.com/partymode/discoball.gif").css("position","absolute")
        .css("left",$("body").width()/2-150)
        .css("top",0)
    );
  }
}

start();
togglePartyMode();
