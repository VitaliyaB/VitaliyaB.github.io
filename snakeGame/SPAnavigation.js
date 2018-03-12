"use strict";

window.onbeforeunload = beforeUnload;
window.onhashchange = switchToStateFromURLHash;
var SPAState = {};

function switchToStateFromURLHash() {
    var URLHash = window.location.hash;
    var stateStr = URLHash.substr(1);

    if (stateStr !== "") {
        SPAState = {pageName: stateStr};
    } else {
        SPAState = {pageName: "Main"};
    }

    var pageHTML = "";
    switch (SPAState.pageName) {
        case "Main":
            var containerContent = "";
            containerContent += "<div id='mainPage'>" +
                                    "<h1 id='nameOfGame'>Snake</h1>" +
                                    "<input id='start' type='button' value='START' onclick='switchToGamePage()'>" +
                                    "<input id='highScore' type='button' value='HIGH SCORE'" +
                                    " onclick='switchToHighscoreTablePage()'>" +
                                "</div>";
            pageHTML = containerContent;
            document.getElementById("container").innerHTML = pageHTML;
            mainPage();
            break;
        case "Game":
            var canvas = "";
            canvas += "<div id='can'>";
            canvas += "<canvas id='gameField'>Если Вы не видете игры, обновите Ваш браузер</canvas>";
            canvas += "<div id='scoreHelper'>Score: " + "<span id='score'></span>" + "</div>";
            canvas += "</div>";
            pageHTML = canvas;
            document.getElementById("container").innerHTML = pageHTML;
            startGame();
            break;
        case "HighscoreTable":
            var table = "";
            table += "<table id='table'></table>";
            pageHTML = table;
            document.getElementById("container").innerHTML = pageHTML;
            showHighscore();
            highscoreTable();
            break;
    }
}

function switchToState(newState) {
    var stateStr = newState.pageName;
    location.hash = stateStr;
}

function switchToMainPage() {
    switchToState( {pageName: "Main"} );
}

function switchToGamePage() {
    switchToState( {pageName: "Game"} );
}

function switchToHighscoreTablePage() {
    switchToState( {pageName: "HighscoreTable"} );
}

function beforeUnload (event) {
    event = event || window.event;
    if (SPAState.pageName === "Game") {
        event.returnValue = "You can lose your achievements";
    }
}

switchToStateFromURLHash();