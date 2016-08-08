$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "/data",
        success: function(data) {
            //calls the blocks in and sets up the first person
            var $el = data.omicron;
            $middleman = $el;
            $(".person").fadeOut("fast", function() {
                getBoxes();
                $(".person").replaceWith("<div class='person'>" + "Student Name: " + $middleman[counter].name + "<p class='personUsername'>Github Account: <a href='https://github.com/" + $middleman[counter].git_username + "'>'https://github.com/" + $middleman[counter].git_username + "'</a><p class='personShoutout'>Personal Message: " + $middleman[counter].shoutout + "</p></p></div>");
                $(".person").hide().fadeIn("fast");
                $("#Next").focus();
            });
        }
    });
    //sets event listeners and starts the timer
    $("#Next").on("click", goNext);
    $("#Prev").on("click", goPrev);
    timer = setTimeout(autoSwitch, 10000);
});
//initializes key variables
var $middleman = [];
var counter = 0;
var timer;
//function that replaces the person with the appropriate one based on which button was hit
function replace() {
    $(".person").fadeOut("fast", function() {
        $(".person").replaceWith("<div class='person'>" + "Student Name: " + $middleman[counter].name + "<p class='personUsername'>Github Account: <a href='https://github.com/" + $middleman[counter].git_username + "'>'https://github.com/" + $middleman[counter].git_username + "'</a><p class='personShoutout'>Personal Message: " + $middleman[counter].shoutout + "</p></p></div>");
        $(".person").hide().fadeIn("fast");
    });
}
//function that moves to the next person
function goNext() {
    counter++;
    resetAutoSwitch();
    movingForward();
    checkCounter();
    replace();
    $("#Next").focus();
}
//function that moves to the previous person
function goPrev() {
    counter--;
    resetAutoSwitch();
    movingBackward();
    checkCounter();
    replace();
    $("#Prev").focus();
}
//function to check if the counter is at the point where it needs to get to ther other end of the index or not
function checkCounter() {
    if (counter >= $middleman.length) {
        counter = 0;
    } else if (counter < 0) {
        counter = $middleman.length - 1;
    }
}
//the Function that activates when 10 seconds has passed with no buttons being pressed
function autoSwitch() {
    counter++;
    movingForward();
    checkCounter();
    $(".person").fadeOut("fast", function() {
        $(".person").replaceWith("<div class='person'>" + "Student Name: " + $middleman[counter].name + "<p class='personUsername'>Github Account: <a href='https://github.com/" + $middleman[counter].git_username + "'>'https://github.com/'" + $middleman[counter].git_username + "'</a><p class='personShoutout'>Personal Message: " + $middleman[counter].shoutout + "</p></p></div>");
        $(".person").hide().fadeIn("fast");
    });
    timer = setTimeout(autoSwitch, 10000);
    $("#Next").focus();
}
//resets the 10 second timer when next or prev are hit
function resetAutoSwitch() {
    clearTimeout(timer);
    timer = setTimeout(autoSwitch, 10000);
}
//function that creates a box for each person and assigns them an ID based on the number they come in as
function getBoxes() {
    for (var i = 0; i < $middleman.length; i++) {
        $("#boxHome").append("<div id='index" + i + "' class='square'></div>");
    }
    $("#index0").replaceWith("<div id='active' class='square'></div>");
}
//function to move the box index forward
function movingForward() {
    if (counter > $middleman.length - 1) {
        $('#active').replaceWith("<div id='index" + (counter - 1) + "'class='square'></div>");
        $('.square').first().replaceWith("<div id='active' class='square'></div>");
        $("#active").hide().fadeIn("fast");
    } else {
        $('#active').next().replaceWith("<div id='active' class='square'></div>");
        $('#active').replaceWith("<div id='index" + (counter - 1) + "'class='square'></div>");
        $("#active").hide().fadeIn("fast");
    }
}
//function to move the box index backward
function movingBackward() {
    if (counter < 0) {
        $('#active').replaceWith("<div id='index" + (counter + 1) + "'class='square'></div>");
        $('.square').last().replaceWith("<div id='active' class='square'></div>");
        $("#active").hide().fadeIn("fast");
    } else {
        $('#active').prev().replaceWith("<div id='active' class='square'></div>");
        $('#active').next().replaceWith("<div id='index" + (counter + 1) + "'class='square'></div>");
        $("#active").hide().fadeIn("fast");
    }
}
