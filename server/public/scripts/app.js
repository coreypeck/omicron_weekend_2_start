$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "/data",
        success: function(data) {
            var $el = data.omicron;
            $middleman = $el;
            $(".person").fadeOut("fast", function() {
                getBoxes();
                $(".person").replaceWith("<div class='person'>" + "Student Name: " + $middleman[counter].name + "<p class='personUsername'>Github Account: <a href='https://github.com/'" + $middleman[counter].git_username + ">https://github.com/" + $middleman[counter].git_username + "</a><p class='personShoutout'>Personal Message: " + $middleman[counter].shoutout + "</p></p></div>");
                $(".person").hide().fadeIn("fast");
                $("#Next").focus();
            });
        }
    });
    $("#Next").on("click", goNext);
    $("#Prev").on("click", goPrev);
    timer = setTimeout(autoSwitch, 10000);
});
var $middleman = [];
var counter = 0;
var timer;
var whichBox = [];

function replace() {
    $(".person").fadeOut("fast", function() {
        $(".person").replaceWith("<div class='person'>" + "Student Name: " + $middleman[counter].name + "<p class='personUsername'>Github Account: <a href='https://github.com/'" + $middleman[counter].git_username + ">https://github.com/" + $middleman[counter].git_username + "</a><p class='personShoutout'>Personal Message: " + $middleman[counter].shoutout + "</p></p></div>");
        $(".person").hide().fadeIn("fast");
    });
}

function goNext() {
    counter++;
    resetAutoSwitch();
    movingForward();
    checkCounter();
    replace();
    $("#Next").focus();
}

function goPrev() {
    counter--;
    resetAutoSwitch();
    movingBackward();
    checkCounter();
    replace();
    $("#Prev").focus();
}

function checkCounter() {
    if (counter >= $middleman.length) {
        counter = 0;
    } else if (counter < 0) {
        counter = $middleman.length - 1;
    }
}

function autoSwitch() {
    counter++;
    movingForward();
    checkCounter();
    $(".person").fadeOut("fast", function() {
        $(".person").replaceWith("<div class='person'>" + "Student Name: " + $middleman[counter].name + "<p class='personUsername'>Github Account: <a href='https://github.com/'" + $middleman[counter].git_username + ">https://github.com/" + $middleman[counter].git_username + "</a><p class='personShoutout'>Personal Message: " + $middleman[counter].shoutout + "</p></p></div>");
        $(".person").hide().fadeIn("fast");
    });
    timer = setTimeout(autoSwitch, 10000);
    $("#Next").focus();
}

function resetAutoSwitch() {
    clearTimeout(timer);
    timer = setTimeout(autoSwitch, 10000);
}

function getBoxes() {
    for (var i = 0; i < $middleman.length; i++) {
        $("#boxHome").append("<div id='index" + i + "' class='square'></div>");
    }
    $("#index0").replaceWith("<div id='active' class='square'></div>");
}

function movingForward() {
    if (counter > $middleman.length -1) {
        $('#active').replaceWith("<div id='index" + (counter-1) + "'class='square'></div>");
        $('.square').first().replaceWith("<div id='active' class='square'></div>");
        $("#active").hide().fadeIn("fast");
    } else {
        $('#active').next().replaceWith("<div id='active' class='square'></div>");
        $('#active').replaceWith("<div id='index" + (counter-1) + "'class='square'></div>");
        $("#active").hide().fadeIn("fast");
    }
}

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
