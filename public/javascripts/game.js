var pickArr = new Array();
var nextInLine = 1;
var digits;

var setDigits = function(d) { digits = d; };
var init = function ($) {
  (function getRandomInt (min,max) {
    if (pickArr.length == digits) return;
    else {
      var r = Math.floor(Math.random() * (max - min + 1)) + min;
      if (pickArr.indexOf(r) == -1) pickArr.push(r);
      getRandomInt(min,max);
    }   
  })(1,digits);
  $('#request').text(pickArr.join(' ')); 
};

var push = function(position) {
  if (nextInLine > digits) $('#label').text('Can\'t push anymore!');
  else {
    var array = $('#deque').text().replace(/\s/g,'').split('');
    if (position == "top") {
      array.unshift(nextInLine);
      $('#deque').text(array.join('\n'));
      nextInLine += 1;
      $('#top-input').attr('value','').focus();
    }
    else if (position == "bottom") {
      var value = parseInt($('#bottom-input').attr('value'));
      array.push(nextInLine);
      $('#deque').text(array.join('\n'));
      nextInLine += 1;
      $('#bottom-input').attr('value','').focus();
    }
  }
};

var pop = function(position) {
  var array = $('#deque').text().split('\n');
  var output = $('#output').text();
  if (position == "top") {
    var value = array.shift();
    $('#deque').text(array.join('\n'));
    $('#output').text(output+value+' ');
  }
  else if (position == "bottom") {
    var value = array.pop();
    $('#deque').text(array.join('\n'));
    $('#output').text(output+value+' ');
  }
  
  if($('#output').text().replace(/\s/g,'') == $('#request').text().replace(/\s/g,'')) { // If a result was found
    $.ajax({
			type: "POST",
			url: "/submit",
			data:"possible=1&result="+$('#request').text().replace(/\s/g,''),
			success: function() { $('#label').html('Submitted result! <a href="javascript:void(0);" onclick="newgame();">New game</a>'); }
		});
  }
  else if ($('#output').text().replace(/\s/g,'').length == digits)
    $('#label').html('<a href="javascript:void(0);" onclick="restart();">Retry</a> | <a href="javascript:void(0);" onclick="impossible();">Impossible</a>');
};

var newgame = function() {
    pickArr = new Array();
    init(jQuery);
    restart();
};

var restart = function() {
    nextInLine = 1;
    $('#output').text('');
    $('#deque').text('');
    $('#label').text('');
};

var impossible = function() {
  $.ajax({
		type: "POST",
		url: "/check",
		data:"query="+$('#request').text().replace(/\s/g,''),
		success: function(r) { 
		  if (parseInt(r) == 1) $('#label').html('Problem has already been solved! <a href="javascript:void(0);" onclick="newgame();">New game</a>');
		  else {
		    $.ajax({
    			type: "POST",
    			url: "/submit",
    			data:"possible=0&result="+$('#output').text().replace(/\s/g,''),
    			success: function() { $('#label').html('Submitted impossible case! <a href="javascript:void(0);" onclick="newgame();">New game</a>'); }
    		});
		  }
		}
	});
}