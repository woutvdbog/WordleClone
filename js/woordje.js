    var word, wordLetters, letterIndex, chance, index;
    var letterStatus = [];
    var guessedWord = [];
    var grid = [];
    var gameRunning;
    var baseDate = new Date(("02/22/2022")),baseValue = 1;
    var presentDate = new Date();
    presentDate.setHours(00,00,00)
    var timeDiff = Math.abs(presentDate.getTime() - baseDate.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
    var baseValue = baseValue+diffDays;
    var contains;

    startWoordje();

    function startWoordje() {
        chance = 0;
        index = 0
        letterIndex = 0;
        word = words[baseValue];
        wordLetters = word.split('');
        contains = [...wordLetters];
        gameRunning = true;
        console.log(word)
    }

    function guessLetter(guessedLetter) {

        if(letterIndex < 5 && gameRunning === true && grid.length != 6) {
            document.querySelector(`.tile:nth-of-type(${index + 1})`).textContent = guessedLetter.toUpperCase();;
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
        letterIndex = 0
        guessedWord = [];
    }

    function checkWord(guessedWord) {
        var colored = [...guessedWord]
        console.log(wordLetters)
        if(guessedWord.length === 5) {
            if(words.includes(guessedWord.join("")) || allowedguesses.includes(guessedWord.join(""))) {
                let c = 0;
                for(var i = 0; i < guessedWord.length; i++) {
                    document.getElementById(guessedWord[i].toString()).style.backgroundColor = "#404040";
                }
                for(var i = 0; i < 5; i++) {
                    if(wordLetters[i] === guessedWord[i] && contains.includes(guessedWord[i])) {
                        contains = removeItem(contains, guessedWord[i])
                        c++;
                        document.querySelector(`.tile:nth-of-type(${index + i - 4})`).style.backgroundColor = "#45995b";
                        document.querySelector(`.tile:nth-of-type(${index + i - 4})`).style.border = "none";
                        document.getElementById(guessedWord[i]).style.backgroundColor = "#45995b";
                    } 
                }
                for(var i = 0; i < 5; i++) {
                    if(contains.includes(guessedWord[i]) && document.querySelector(`.tile:nth-of-type(${index + i - 4})`).style.backgroundColor == "") {
                        contains = removeItem(contains, guessedWord[i])
                            document.querySelector(`.tile:nth-of-type(${index + i - 4})`).style.backgroundColor = "#d4c65f";
                            document.querySelector(`.tile:nth-of-type(${index + i - 4})`).style.border = "none";
                            document.getElementById(guessedWord[i]).style.backgroundColor = "#d4c65f";
                    }
                }
                    /*else {
                        document.getElementById(guessedWord[i]).style.backgroundColor = "#404040";
                    }*/
                
                
                grid.push(letterStatus)
                if(c === 5) {
                    
                    gameRunning = false;
                    let msg = `Woordje%20${baseValue}%20${grid.length}/6%0a%0a`;
                    for(let i = 0; i < grid.length; i++) {
                        for(let j = 0; j < grid[i].length; j++) {
                            switch(grid[i][j]) {
                                case "correct":
                                    msg += "🟩";
                                    break;
                                case "contains":
                                    msg += "🟨";
                                    break;
                                case "wrong":
                                    msg += "⬛";
                                     break;
                            }
                        }
                        msg += "%0a";
                    }
                    //document.getElementById("popupcontent").innerHTML = "Proficiat, je wint!</br><a style=' color: #fff;' href='http://twitter.com/intent/tweet?text=" + msg + "'>Tweet</a>";
                    document.getElementById("popupcontent").innerHTML = "Proficiat, je wint!";
                        document.getElementById("popup").classList.add("win-animation");
                } else if (grid.length === 6) {
                    document.getElementById("popupcontent").innerHTML = "Helaas, je hebt het woord niet geraden.";
                        document.getElementById("popup").classList.add("win-animation");
                }
                
                nextChance()
                } else {
                    document.getElementById("popupcontent").textContent = "Niet in woordlijst"
                    if(!document.getElementById("popup").classList.contains("active-animation")) {
                        document.getElementById("popup").classList.add("active-animation");
                        setTimeout(function() {
                            document.getElementById("popup").classList.remove("active-animation");
                        }, 2000);
                    }
                }
            }
            contains = [...wordLetters];
        }
    

    function backSpace(i, guessedWord) {
        if(guessedWord.length > 0) {
            document.querySelector(`.tile:nth-of-type(${index})`).textContent = "";
            guessedWord.pop();
            letterStatus.pop();
            letterIndex--;
            index--;
        }
    }