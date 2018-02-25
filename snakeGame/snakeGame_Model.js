"use strict";

function SnakeGameModel() {
    var self = this;
    var myView = null;

    self.size = 0; // универсальный размер для всех построений
    // свойства для игрового поля
    self.allGameSize = {};
    self.canvasPos = {};
    self.gamePanelHeight = 0;
    self.playGroundHeight = 0;
    self.gameFieldSize = {};
    self.gameFieldBorder = {};
    // свойства для жизней
    var numberOfHearts = 3;
    self.heartSize = 0;
    self.heartPos = [];
    // свойства для яблока
    self.appleSize = 0;
    self.applePos = {};
    // счёт игры
    self.scorePos = {};
    self.score = 0;
    // свойства для змейки
    self.direction = "";
    self.placeX = 0;
    self.placeY = 0;
    self.snake = [];
    self.snakeSize = 0;
    var oldSnake = {};
    var oldClick = {};
    var turn = "";

    var timer = 0; // таймера нет

    self.start = function (view) {
        myView = view;
    };

    self.createCanvas = function (_divContainerWidth, _divContainerHeight) {
        if (_divContainerWidth <= 650) {
            self.size = 10;
        } else {
            self.size = 20;
        }
        // расчёт размера canvas
        var allGamesWidth = _divContainerWidth - 4 * self.size;
        var allGameHeight = _divContainerHeight - 4 * self.size;
        var helperCanvasWidth = countHelperX(allGamesWidth);
        var helperCanvasHeight = countHelperY(allGameHeight);
        self.allGameSize = {
            x: helperCanvasWidth,
            y: helperCanvasHeight
        };
        // построение игрового поля
        self.canvasPos = {
            x: _divContainerWidth / 2 - self.allGameSize.x / 2,
            y: _divContainerHeight / 2 - self.allGameSize.y / 2
        };
        self.gamePanelHeight = 4 * self.size; // высота "шапки"
        self.playGroundHeight = self.allGameSize.y - self.gamePanelHeight; // высота поля без "шапки"
        // размеры поля, где будет игра
        self.gameFieldSize = {
            x: self.allGameSize.x - self.size * 2,
            y: self.playGroundHeight - self.size * 2
        };
        self.gameFieldBorder = {
          left: self.size,
          top: self.gamePanelHeight + self.size,
          right: self.gameFieldSize.x + self.size,
          bottom: self.allGameSize.y - self.size
        };
        // расположение счёта игры
        self.scorePos = {
            x: self.allGameSize.x / 2,
            y: self.canvasPos.y + self.size
        };
        // размер змейки
        self.snakeSize = 2 * self.size;
        // размер яблока
        self.appleSize = 2 * self.size;

        myView.drawCanvas();
        self.createHearts();
        self.countScore();
        self.createSnakeHead();
        self.createRandomApple();
        self.startTimer();
    };

    self.createHearts = function () {
        // расположение жизней в "шапке" игры
        self.heartSize = 2 * self.size;
        self.heartPos = [];
        for (var i = 0; i < numberOfHearts; i++) {
            self.heartPos[i] = {
                x: 2 * self.size + i * self.heartSize,
                y: self.gamePanelHeight - 3 * self.size
            }
        }
        myView.drawHearts();
    };

    self.createSnakeHead = function () {
        // начальное положение головы змейки
        self.snake[0] = {
            x: self.gameFieldBorder.left + 2 * self.snakeSize,
            y: self.gameFieldBorder.top + 3 * self.snakeSize
        };
        myView.drawSnake();
    };

    self.countScore = function () {
        myView.drawScore();
    };

    self.createRandomApple = function () {
        var helperApplePosX = Math.floor(Math.random() * ((self.gameFieldBorder.right - self.appleSize) -
                            self.gameFieldBorder.left + 1)) + self.gameFieldBorder.left;
        var helperApplePosY = Math.floor(Math.random() * ((self.gameFieldBorder.bottom - self.appleSize) -
                            self.gameFieldBorder.top + 1)) + self.gameFieldBorder.top;
        self.applePos = {
            x: countHelperX(helperApplePosX) + self.size,
            y: countHelperY(helperApplePosY) + self.size
        };
        checkApplePos(self.applePos, self.snake);
        myView.drawApple();
    };

    function countHelperX(x) {
        if (self.size === 20 && x >= 20) {
            x = Math.floor(x / 40) * 40;
        } else if (self.size === 10 && x >= 10) {
            x = Math.floor(x / 20) * 20;
        } else {
            x = self.gameFieldBorder.left;
        }
        return x;
    }

    function countHelperY(y) {
        if (self.size === 20 && y >= 20) {
            y = Math.floor(y / 40) * 40;
        } else if (self.size === 10 && y >= 10) {
            y = Math.floor(y / 20) * 20;
        } else {
            y = self.gameFieldBorder.top;
        }
        return y;
    }

    function checkApplePos(apple, snake) {
        for(var i =0; i < snake.length; i++) {
            if(apple.x === snake[i].x && apple.y === snake[i].y) {
                self.createRandomApple();
            }
        }
    }

    self.startTimer = function () {
        if (timer) {
            clearInterval(timer);
            timer = 0;
        }
        myView.turnSoundInit();
        myView.eatSoundInit();
        myView.gameOverInit();
        timer = setInterval(playGame, 150);
    };

    self.setDirection = function (_direction) {
        myView.turnSound();
        self.direction = _direction;
    };

    self.setDirectionClickTouch = function(clickX, clickY) {
        myView.turnSound();
        self.newClickX = clickX;
        self.newClickY = clickY;
    };

    function playGame() {
        myView.clearSnake();
        myView.drawSnake();
        // текущее положенеие головы
        var newSnake = {
            x: self.snake[0].x,
            y: self.snake[0].y
        };
        var snakeHead = {};
        // нажатие кнопки или клик мышью (пальцем)
        if (self.direction !== "") {
            if (self.direction === "left") newSnake.x -= self.snakeSize;
            if (self.direction === "up") newSnake.y -= self.snakeSize;
            if (self.direction === "right") newSnake.x += self.snakeSize;
            if (self.direction === "down") newSnake.y += self.snakeSize;
        } else if (self.newClickX >= 0 && self.newClickY >= 0) {
            turnSnake(newSnake.x, newSnake.y);
            var snakeDirection = turn;
            if (snakeDirection === "left") newSnake.x -= self.snakeSize;
            if (snakeDirection === "up") newSnake.y -= self.snakeSize;
            if (snakeDirection === "right") newSnake.x += self.snakeSize;
            if (snakeDirection === "down") newSnake.y += self.snakeSize;
        }
        // else {
        //     newSnake.x += self.snakeSize;
        // }
        oldSnake = {
            x: self.snake[0].x,
            y: self.snake[0].y
        };
        oldClick = {
            x: self.newClickX,
            y: self.newClickY
        };
        // если змея съела яблоко
        if (newSnake.x === self.applePos.x && newSnake.y === self.applePos.y) {
            myView.eatSound();
            myView.vibro(false);
            self.score++;
            self.countScore();
            self.createRandomApple();
        } else {
            self.snake.pop();
        }
        // если змейка врезалась в стены или сама в себя
        if (newSnake.x < self.gameFieldBorder.left || newSnake.x > self.gameFieldBorder.right - self.snakeSize ||
            newSnake.y < self.gameFieldBorder.top || newSnake.y > self.gameFieldBorder.bottom - self.snakeSize ||
            crashInSnake(newSnake.x, newSnake.y, self.snake)) {
            myView.vibro(true);
            self.gameOver();
            snakeHead = {x: oldSnake.x, y: oldSnake.y};
            self.snake.unshift(snakeHead);
            newSnake.x = self.gameFieldBorder.left + 2 * self.snakeSize; // возврат головы в начальное положение
            newSnake.y = self.gameFieldBorder.top + 3 * self.snakeSize;
            self.snake = [];
            turn = "";
            oldSnake = {};
            oldClick = {};
        }
        // новое положение головы
        snakeHead = {x: newSnake.x, y: newSnake.y};
        self.snake.unshift(snakeHead);
    }

    function crashInSnake(headX, headY, snake) {
        for(var i = 0; i < snake.length; i++) {
            if(headX === snake[i].x && headY === snake[i].y) {
                return true;
            }
        }
        return false;
    }

    function turnSnake(snakeX, snakeY) {
        if (oldClick.x !== self.newClickX && oldClick.y !== self.newClickY) {
            if (snakeX === oldSnake.x && self.newClickX < snakeX) turn = "left";
            if (snakeY === oldSnake.y && self.newClickY < snakeY) turn = "up";
            if (snakeX === oldSnake.x && self.newClickX > snakeX) turn =  "right";
            if (snakeY === oldSnake.y && self.newClickY > snakeY) turn =  "down";
            return turn;
        }
    }

    self.gameOver = function () {
        timer = clearInterval(timer);
        timer = 0;
        numberOfHearts--;
        if (numberOfHearts > 0) {
            myView.clearHeart();
            self.createHearts();
            self.direction = "";
            self.startTimer();
        } else {
            myView.gameOverSound();
            myView.clearHeart();
            myView.gameOver();
            numberOfHearts = 3;
        }
    }
}