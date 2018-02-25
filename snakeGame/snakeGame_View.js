"use strict";

function SnakeGameView() {
    var self = this;

    var myModel = null;
    var myField = null;
    var myCanvas = null;
    var apple, heart;
    self.score = null;
    self.snakeView = [];
    self.numHearts = [];
    var turnAudio = new Audio("audio/turn.mp3");
    var eatAudio = new Audio("audio/eatApple.mp3");
    var gameOverAudio = new Audio("audio/bump.mp3");
    // начало игры
    self.start = function(model, field, canvas) {
        myModel = model;
        myField = field;
        myCanvas = canvas;
        loadApple();
        loadHeart();
    };
    // начальное построение
    self.drawCanvas = function() {
        myCanvas.width = myModel.allGameSize.x;
        myCanvas.height = myModel.allGameSize.y;
        myCanvas.style.left = myModel.canvasPos.x + "px"; // позиционируем canvas
        myCanvas.style.top = myModel.canvasPos.y + "px";
        // "шапка"
        myField.fillStyle = "rgba(69, 46, 37, 0.8)";
        myField.fillRect(0, 0, myModel.allGameSize.x, myModel.gamePanelHeight);
        // рамка игрового поля
        myField.lineWidth = myModel.size;
        myField.strokeStyle = "rgba(69, 46, 37, 1)";
        myField.strokeRect(myModel.size / 2, myModel.gamePanelHeight + myModel.size / 2, myModel.allGameSize.x -
            myModel.size, myModel.playGroundHeight - myModel.size);
        // заливка игрового поля
        myField.fillStyle = "rgba(255, 255, 71, 0.87)";
        myField.fillRect(myModel.size, myModel.gamePanelHeight + myModel.size, myModel.gameFieldSize.x,
            myModel.gameFieldSize.y);
        // счёт игры
        self.score = document.getElementById("scoreHelper");
        self.score.style.left = myModel.scorePos.x + "px";
        self.score.style.top = myModel.scorePos.y + "px";
        self.score.style.fontSize = myModel.size * 2 + "px";
    };

    function loadApple() {
        apple = new Image();
        apple.onload = self.drawApple;
        apple.src = "pictures/apple.png";
    }

    function loadHeart() {
        heart = new Image();
        heart.onload = self.drawHearts;
        heart.src = "pictures/heart.png";
    }

    self.drawHearts = function() {
        self.numHearts = myModel.heartPos;
        self.numHearts.forEach(function(everyHeart, i) {
            myField.drawImage(heart, everyHeart.x + i * 0.5 * myModel.size, everyHeart.y, myModel.heartSize,
                myModel.heartSize);
        });
    };

    self.clearHeart = function() {
        myField.clearRect(0, 0, myModel.allGameSize.x, myModel.gamePanelHeight);
        self.numHearts.forEach(function(everyHeart, i) {
            myField.clearRect(everyHeart.x + i * 0.5 * myModel.size, everyHeart.y, myModel.heartSize,
                myModel.heartSize);
        });
        myField.fillStyle = "rgba(69, 46, 37, 0.8)";
        myField.fillRect(0, 0, myModel.allGameSize.x, myModel.gamePanelHeight);
    };

    self.drawScore = function() {
        var score = document.getElementById("score");
        score.innerHTML = myModel.score;
    };

    self.drawApple = function() {
        myField.drawImage(apple, myModel.applePos.x, myModel.applePos.y, myModel.appleSize, myModel.appleSize);
    };

    self.drawSnake = function() {
        self.snakeView = myModel.snake;
        for (var i = 0; i < self.snakeView.length; i++) {
            myField.lineWidth = 1;
            myField.strokeStyle = "black";
            myField.fillStyle = (i === 0) ? "#3F3355" : "#50DEF2";
            myField.strokeRect(self.snakeView[i].x + 0.5, self.snakeView[i].y + 0.5, myModel.snakeSize, myModel.snakeSize);
            myField.fillRect(self.snakeView[i].x + 1, self.snakeView[i].y + 1, myModel.snakeSize - 1, myModel.snakeSize - 1);
        }
    };

    self.clearSnake = function() {
        myField.clearRect(myModel.size, myModel.gamePanelHeight + myModel.size, myModel.gameFieldSize.x,
            myModel.gameFieldSize.y);
        for (var i = 0; i < self.snakeView.length; i++) {
            myField.clearRect(self.snakeView[i].x + 1, self.snakeView[i].y + 1, myModel.snakeSize - 1, myModel.snakeSize - 1);
        }
        myField.fillStyle = "rgba(255, 255, 71, 0.87)";
        myField.fillRect(myModel.size, myModel.gamePanelHeight + myModel.size, myModel.gameFieldSize.x,
            myModel.gameFieldSize.y);
        self.drawApple();
    };

    self.gameOver = function() {
        var container = document.getElementById("container");
        var gameOver = document.createElement("div");
        gameOver.id = "gameOver";
        var playerName = "";
        playerName += "<div id='gameOverText'>Game Over</div>" + "<div id='enterName'>Enter your name</div>" +
                        "<input id='playerName' type='text'>" +
                        "<input id='confirm' type='button' value='OK' onclick='sendHighscore()'>";
        gameOver.innerHTML = playerName;
        gameOver.style.left = myModel.canvasPos.x + "px";
        gameOver.style.top = myModel.canvasPos.y + "px";
        gameOver.style.width = myCanvas.width + "px";
        gameOver.style.height = myCanvas.height + "px";
        container.appendChild(gameOver);
        var gameOverText = document.getElementById("gameOverText");
        gameOverText.style.fontSize = 4 * myModel.size + "px";
        gameOverText.style.margin = 6 * myModel.size + "px" + " " + 0;
        var enterName = document.getElementById("enterName");
        enterName.style.fontSize = 1.5 * myModel.size + "px";
        enterName.style.marginBottom = 2 * myModel.size + "px";
        var playerNameId = document.getElementById("playerName");
        playerNameId.style.fontSize = 1.5 * myModel.size + "px";
        playerNameId.style.width = 20 * myModel.size + "px";
        playerNameId.style.height = 2 * myModel.size + "px";
        var confirm = document.getElementById("confirm");
        confirm.style.fontSize = 1.5 * myModel.size + "px";
        confirm.style.width = 8 * myModel.size + "px";
        confirm.style.height = 2 * myModel.size + "px";
        confirm.style.margin = 2 * myModel.size + "px auto";
    };

    self.turnSoundInit = function() {
        turnAudio.play();
        turnAudio.pause();
    };

    self.eatSoundInit = function() {
        eatAudio.play();
        eatAudio.pause();
    };

    self.gameOverInit = function() {
        gameOverAudio.play();
        gameOverAudio.pause();
    };

    self.turnSound = function() {
        turnAudio.currentTime = 0;
        turnAudio.play();
    };

    self.eatSound = function() {
        eatAudio.currentTime = 0;
        eatAudio.play();
    };

    self.gameOverSound = function() {
      gameOverAudio.currentTime = 0;
      gameOverAudio.play();
    };

    self.vibro = function (kindVibro) {
        if (navigator.vibrate) {
            if (!kindVibro) {
                window.navigator.vibrate(100);
            } else {
                window.navigator.vibrate([100, 50, 100, 50, 100]);
            }
        }
    }
}
