"use strict";

function mainPage() {
    window.addEventListener("resize", windowResize, false);
    windowResize();
    function windowResize() {
        var fontSizeH1, paddingTopH1, buttonSizeX, buttonSizeY, fontSizeBut;
        var mainPage = document.getElementById("mainPage");
        var mainPageX = mainPage.offsetWidth;
        var mainPageY = mainPage.offsetHeight;
        if (mainPageX >= mainPageY) {
            fontSizeH1 = mainPageX / 5;
            paddingTopH1 = mainPageY / 10;
            buttonSizeX = mainPageX / 2;
            buttonSizeY = mainPageY / 14;
            fontSizeBut = buttonSizeY / 1.5;
        } else {
            fontSizeH1 = mainPageX / 5;
            paddingTopH1 = mainPageY / 8;
            buttonSizeX = mainPageX / 1.5;
            buttonSizeY = mainPageX / 10;
            fontSizeBut = buttonSizeY / 1.5;
        }
        var nameOfGame = document.getElementById("nameOfGame");
        nameOfGame.style.fontSize = fontSizeH1 + "px";
        nameOfGame.style.paddingTop = paddingTopH1 + "px";
        var startButton = document.getElementById("start");
        startButton.style.width = buttonSizeX + "px";
        startButton.style.height = buttonSizeY + "px";
        startButton.style.fontSize = fontSizeBut + "px";
        var highScoreButton = document.getElementById("highScore");
        highScoreButton.style.width = buttonSizeX + "px";
        highScoreButton.style.height = buttonSizeY + "px";
        highScoreButton.style.fontSize = fontSizeBut + "px";
    }
}

function highscoreTable() {
    window.addEventListener("resize", windowResize, false);
    windowResize();
    function windowResize() {
        var table = document.getElementById("table");
        var containerX = window.innerWidth;
        var tableWidth = containerX / 1.5;
        table.style.width = tableWidth + "px";
        table.style.fontSize = tableWidth / 15 + "px";
        table.style.left = containerX / 2 - tableWidth / 2 + "px";
    }
}

function progressPerStyle() {
    var windowX = window.innerWidth;
    var windowY = window.innerHeight;
    var progress = document.getElementById("progress");
    var progressPer = document.getElementById("progressPer");
    var progressWidth = windowX / 1.5;
    var progressPerHeight = windowY / 10;
    progress.style.width = progressWidth + "px";
    progress.style.top = windowY / 2 - progressPerHeight / 2 + "px";
    progress.style.left = windowX / 2 - progressWidth / 2 + "px";
    progressPer.style.height = progressPerHeight + "px";
}