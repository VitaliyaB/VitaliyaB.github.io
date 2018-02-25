"use strict";

var ajaxHandlerScript = "https://fe.it-academy.by/AjaxStringStorage2.php";
var scores; // элемент массива {name: "Иванов", score: "100"}
var updatePassword;
var stringName = "BORONTSOVA_SNAKEGAME_HIGHSCORETABLE";

function showTable() {
    var str = "";
    scores.sort(compareFunc);
    function compareFunc(a, b) {return b.score - a.score;}
    for (var s = 0; s < scores.length; s++) {
        var score = scores[s];
        var rowNum = 1 + s;
        str += "<tr class='tableRow'>" +
                    "<td>" + rowNum + "</td>" +
                    "<td>" + escapeHTML(score.name) + "</td>" +
                    "<td>" + escapeHTML(score.score) + "</td>" +
                "</tr>";
    }
    document.getElementById("table").innerHTML = str;
}

function escapeHTML(text) {
    if (!text)
        return text;
    text = text.toString()
        .split("&").join("&amp;")
        .split("<").join("&lt;")
        .split(">").join("&gt;")
        .split('"').join("&quot;")
        .split("'").join("&#039;");
    return text;
}

function showHighscore() {
    $.ajax( {
            url: ajaxHandlerScript,
            type: "POST", dataType: "json",
            data: {f: "READ", n: stringName},
            cache: false,
            success: readReady, complete:complete,
            error: errorHandler
        }
    );
}

function progressBar() {
    progressPerStyle();
    progress();
    var perc = 0;
    function progress() {
        if (perc >= 100) {
            perc = 0;
            return;
        }
        perc += 5;
        document.getElementById("progressPer").style.width = perc + "%";
        setTimeout(progress, 250);
    }

    setTimeout(showHighscore, 4000);
}

function complete() {
    document.getElementById("progress").style.display = "none";
}

function readReady(callresult) {
    ready(callresult);
    showTable();
}

function sendHighscore() {
    updatePassword = Math.random();
    $.ajax( {
            url: ajaxHandlerScript,
            type: "POST", dataType: "json",
            data: {f: "LOCKGET", n: stringName, p: updatePassword},
            cache: false,
            success: lockGetReady,
            error: errorHandler
        }
    );
}

function lockGetReady(callresult) {
    ready(callresult);
    var playerName = document.getElementById("playerName").value;
    var score = document.getElementById("score");
    var playerScore = score.textContent;
    scores.push( {name: playerName, score: playerScore} );
    // scores = [];

    $.ajax( {
            url: ajaxHandlerScript,
            type: "POST", dataType: "json",
            data: {f: "UPDATE", n: stringName, v: JSON.stringify(scores), p: updatePassword},
            cache: false,
            success: updateReady,
            error: errorHandler
        }
    );
}

function ready(callresult) {
    if (callresult.error !== undefined)
        alert(callresult.error);
    else {
        scores = [];
        if (callresult.result !== "") {
            scores = JSON.parse(callresult.result);
            if (!Array.isArray(scores))
                scores = [];
        }
    }
}

function updateReady(callresult) {
    if (callresult.error !== undefined)
        alert(callresult.error);
    switchToMainPage();
}

function errorHandler(jqXHR, statusStr, errorStr) {
    alert(statusStr + " " + errorStr);
}