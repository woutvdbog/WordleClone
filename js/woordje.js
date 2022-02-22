    var word, wordLetters, letterIndex, chance, index;
    var letterStatus = [];
    var guessedWord = [];

    startWoordje();

    function startWoordje() {
        chance = 0;
        index = 0
        letterIndex = 0;
        word = words[Math.floor(Math.random() * words.length)];
        wordLetters = word.split('');
        console.log(word)
    }

    function guessLetter(guessedLetter) {
        if(letterIndex < 5) {
            document.querySelector(`.tile:nth-of-type(${index + 1})`).textContent = guessedLetter.toUpperCase();;
            guessedWord.push(guessedLetter);
            if(guessedLetter == wordLetters[letterIndex]) {
                letterStatus.push("correct")
            }
            else if(wordLetters.includes(guessedLetter)) {
                letterStatus.push("contains")
            } else {
                letterStatus.push("fout")
            }
            index++;
            letterIndex++;
        }
    }
    
    function nextChance() {
        letterIndex = 0
        guessedWord = [];
        letterStatus = [];
    }

    function checkWord(letterStatus, guessedWord) {
        if(guessedWord.length === 5) {
            let c = 0;
            for(var i = 0; i < letterStatus.length; i++) {
                if(letterStatus[i] == "correct") {
                    c++;
                    document.querySelector(`.tile:nth-of-type(${index + i - 4})`).style.backgroundColor = "#45995b";
                    document.querySelector(`.tile:nth-of-type(${index + i - 4})`).style.border = "none";
                    document.getElementById(guessedWord[i]).style.backgroundColor = "#45995b";
                } 
                else if(letterStatus[i] == "contains") {
                    document.querySelector(`.tile:nth-of-type(${index + i - 4})`).style.backgroundColor = "#d6923a";
                    document.querySelector(`.tile:nth-of-type(${index + i - 4})`).style.border = "none";
                    document.getElementById(guessedWord[i]).style.backgroundColor = "#d6923a";
                }
                else {
                    document.getElementById(guessedWord[i]).style.backgroundColor = "#404040";
                }
            }
            if(c === 5)
                alert("je wint!")
            nextChance()
        }
    }

    function backSpace(i) {
        document.querySelector(`.tile:nth-of-type(${index})`).textContent = "";
        guessedWord.pop();
        letterStatus.pop();
        letterIndex--;
        index--;
    }