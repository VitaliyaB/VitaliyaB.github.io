"use strict";
function startGame () {
    var gameModel = new SnakeGameModel();
    var gameView = new SnakeGameView();
    var gameController = new SnakeGameController();

    const gameCanvas = document.getElementById("gameField");
    const gameField = gameCanvas.getContext("2d");

    gameModel.start(gameView);
    gameView.start(gameModel, gameField, gameCanvas);
    gameController.start(gameModel, gameField);
}