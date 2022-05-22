var word, wordLetters, letterIndex, chance, index;
var letterStatus = [];
var guessedWord = [];
var grid = [];
var gameRunning;
var baseDate = new Date("02/22/2022"),
  baseValue = 1;
var presentDate = new Date();
presentDate.setHours(00, 00, 00);
var timeDiff = Math.abs(presentDate.getTime() - baseDate.getTime());
var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
var baseValue = baseValue + diffDays;
var contains;
var stats;

function init() {
  startWordle();
}

class Statistics {
  #storage;
  constructor(storage) {
    this.#storage = storage;
    if (this.#storage.getItem("played") === null) this.#storage.played = 0;
    if (this.#storage.getItem("won") === null) this.#storage.won = 0;
    if (this.#storage.getItem("lost") === null) this.#storage.lost = 0;
    if (this.#storage.getItem("day") === null) this.#storage.day = 0;
  }
  getPlayed() {
    return this.#storage.getItem("played");
  }
  getWon() {
    return this.#storage.getItem("won");
  }
  getLost() {
    return this.#storage.getItem("lost");
  }
  getDay() {
    return this.#storage.getItem("day");
  }
  addPlayed() {
    var played = parseInt(this.#storage.getItem("played"));
    this.#storage.setItem("played", ++played);
  }
  addWin() {
    var won = parseInt(this.#storage.getItem("won"));
    this.#storage.setItem("won", ++won);
    this.addPlayed();
  }
  addLose() {
    var lost = parseInt(this.#storage.getItem("lost"));
    this.#storage.setItem("lost", ++lost);
    this.addPlayed();
  }
  setDay() {
    this.#storage.setItem("day", baseValue);
  }
}

function startWordle() {
  stats = new Statistics(localStorage);
  if (parseInt(stats.getDay()) === baseValue) {
    gameRunning = false;
    document.getElementById(
      "popupcontent"
    ).innerHTML = `Helaas, je vandaag al gespeeld, keer morgen terug!<br><br><span>Winstpercentage: ${Math.round(
      (stats.getWon() / stats.getPlayed()) * 100
    )}%<br>Gewonnen: ${stats.getWon()}<br>Verloren: ${stats.getLost()}</span>`;
    document.getElementById("popup").classList.add("win-animation");
  } else {
    chance = 0;
    index = 0;
    letterIndex = 0;
    word = words[baseValue];
    wordLetters = word.split("");
    contains = [...wordLetters];
    gameRunning = true;
  }
}

function guessLetter(guessedLetter) {
  if (letterIndex < 5 && gameRunning === true && grid.length != 6) {
    document.querySelector(`.tile:nth-of-type(${index + 1})`).textContent =
      guessedLetter.toUpperCase();
    guessedWord.push(guessedLetter);

    index++;
    letterIndex++;
  }
}

function removeItem(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

function nextChance() {
  letterIndex = 0;
  guessedWord = [];
}

function checkWord(guessedWord) {
  var colored = [...guessedWord];
  console.log(wordLetters);
  if (guessedWord.length === 5) {
    if (
      words.includes(guessedWord.join("")) ||
      allowedguesses.includes(guessedWord.join(""))
    ) {
      let c = 0;
      for (var i = 0; i < guessedWord.length; i++) {
        document.getElementById(
          guessedWord[i].toString()
        ).style.backgroundColor = "#404040";
      }
      for (var i = 0; i < 5; i++) {
        if (
          wordLetters[i] === guessedWord[i] &&
          contains.includes(guessedWord[i])
        ) {
          contains = removeItem(contains, guessedWord[i]);
          c++;
          document.querySelector(
            `.tile:nth-of-type(${index + i - 4})`
          ).style.backgroundColor = "#45995b";
          document.querySelector(
            `.tile:nth-of-type(${index + i - 4})`
          ).style.border = "none";
          document.getElementById(guessedWord[i]).style.backgroundColor =
            "#45995b";
        }
      }
      for (var i = 0; i < 5; i++) {
        if (
          contains.includes(guessedWord[i]) &&
          document.querySelector(`.tile:nth-of-type(${index + i - 4})`).style
            .backgroundColor == ""
        ) {
          contains = removeItem(contains, guessedWord[i]);
          document.querySelector(
            `.tile:nth-of-type(${index + i - 4})`
          ).style.backgroundColor = "#d4c65f";
          document.querySelector(
            `.tile:nth-of-type(${index + i - 4})`
          ).style.border = "none";
          document.getElementById(guessedWord[i]).style.backgroundColor =
            "#d4c65f";
        }
      }

      grid.push(letterStatus);
      if (c === 5) {
        gameRunning = false;
        stats.addWin();
        document.getElementById(
          "popupcontent"
        ).innerHTML = `Proficiat, je wint!<br><br><span>Winstpercentage: ${Math.round(
          (stats.getWon() / stats.getPlayed()) * 100
        )}%<br>Gewonnen: ${stats.getWon()}<br>Verloren: ${stats.getLost()}</span>`;
        document.getElementById("popup").classList.add("win-animation");
        stats.setDay();
      } else if (grid.length === 6) {
        gameRunning = false;
        stats.addLose();
        document.getElementById(
          "popupcontent"
        ).innerHTML = `Helaas, je hebt het woord niet geraden.<br><br><span>Winstpercentage: ${Math.round(
          (stats.getWon() / stats.getPlayed()) * 100
        )}%<br>Gewonnen: ${stats.getWon()}<br>Verloren: ${stats.getLost()}</span>`;
        document.getElementById("popup").classList.add("win-animation");
        stats.setDay();
      }

      nextChance();
    } else {
      document.getElementById("popupcontent").textContent =
        "Niet in woordlijst";
      if (
        !document.getElementById("popup").classList.contains("active-animation")
      ) {
        document.getElementById("popup").classList.add("active-animation");
        setTimeout(function () {
          document.getElementById("popup").classList.remove("active-animation");
        }, 2000);
      }
    }
  }
  contains = [...wordLetters];
}

function backSpace(i, guessedWord) {
  if (guessedWord.length > 0) {
    document.querySelector(`.tile:nth-of-type(${index})`).textContent = "";
    guessedWord.pop();
    letterStatus.pop();
    letterIndex--;
    index--;
  }
}

window.onload = init;
