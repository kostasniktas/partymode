var partyModeBodyColor = undefined;
var partyModeInterval = undefined;

function partyModeRandomColor () {
  return 'rgb(' +
    (Math.floor(Math.random() * 256)) + ',' +
    (Math.floor(Math.random() * 256)) + ',' +
    (Math.floor(Math.random() * 256)) + ')';
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
      $("<img></img>").attr("id","partyModeDiscoBall").attr("src","discoball.gif").css("position","absolute")
        .css("left",$("body").width()/2-150)
    );
  }
}

$(document).ready( function () {
  if ($("body").css("background-color") == "transparent") {
    $("body").css("background-color","white");
  }
  partyModeBodyColor = $("body").css("background-color");
  $("a.partyModeToggle").click ( function (ev) {
    ev.preventDefault();
    togglePartyMode();
  });
});

