"use strict";

function SnakeGameController() {
    var self = this;

    var myModel = null;
    var myField = null;

    self.divContainerWidth = 0;
    self.divContainerHeight = 0;
    self.start = function (model, field) {
        myModel = model;
        myField = field;

        windowResize();
        window.addEventListener("resize", windowResize, false);
        window.addEventListener("keydown", directionButton, false);
        document.getElementById("gameField").addEventListener("mousedown", directionClickTouch, false);
        document.getElementById("gameField").addEventListener("touchstart", directionClickTouch, false);
    };

    function windowResize() {
        self.divContainerWidth = window.innerWidth;
        self.divContainerHeight = window.innerHeight;
        myModel.createCanvas(self.divContainerWidth, self.divContainerHeight);
    }

    function directionButton(event) {
        event = event || window.event;
        var direction = "";
        if (event.keyCode === 37 && direction !== "right") {
            direction = "left";
        } else if (event.keyCode === 38 && direction !== "down") {
            direction = "up";
        } else if (event.keyCode === 39 && direction !== "left") {
            direction = "right";
        } else if (event.keyCode === 40 && direction !== "up") {
            direction = "down";
        } else {
            return false;
        }

        myModel.setDirection(direction);
    }

    function directionClickTouch(event) {
        event = event || window.event;
        var placeOfClickX = 0;
        var placeOfClickY = 0;
        placeOfClickX = event.pageX || event.touches[0].pageX;
        placeOfClickY = event.pageY || event.touches[0].pageY;
        myModel.setDirectionClickTouch(placeOfClickX, placeOfClickY);
    }
}