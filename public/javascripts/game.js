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
    var array = $('#deque').text().split('\n');
    if (position == "top") {
      var value = parseInt($('#top-input').attr('value'));
      if (value == nextInLine) {
        array.unshift(value);
        $('#deque').text(array.join('\n'));
        nextInLine += 1;
      } else $('#label').text('You need to push a '+nextInLine);
      $('#top-input').attr('value','').focus();
    }
    else if (position == "bottom") {
      var value = parseInt($('#bottom-input').attr('value'));
      if (value == nextInLine) {
        array.push(value);
        $('#deque').text(array.join('\n'));
        nextInLine += 1;
      } else $('#label').text('You need to push a '+nextInLine);
      $('#bottom-input').attr('value','').focus();
    }
  }
  
};

var pop = function(position) {
  var array = $('#deque').text().split('\n');
  var output = $('#output').attr('value');
  if (position == "top") {
    var value = array.shift();
    $('#deque').text(array.join('\n'));
    $('#output').attr('value',(output+value));
  }
  else if (position == "bottom") {
    var value = array.pop();
    $('#deque').text(array.join('\n'));
    $('#output').attr('value',(output+value));
  }
  
  if($('#output').attr('value').replace(/\s/g,'') == $('#request').text().replace(/\s/g,'')) $('#label').text('You won!');
};