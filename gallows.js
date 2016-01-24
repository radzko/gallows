window.addEventListener("load", function () {
    
    var pass = "No pain no gain".toUpperCase();
    var errors = 0;
    var yes = new Audio("yes.wav");
    var no = new Audio("no.wav");
    
    var hiddenPass = hidePassword(pass);
    printPassword(hidePassword(pass));
    showAlphabet();
    
    function hidePassword (password) {
        var hiddenPass = "";

        for (i = 0; i < password.length; i++) {
            if (password.charAt(i) == " ") hiddenPass += " ";
            else hiddenPass += "-";
        }

        return hiddenPass;
    }

    function printPassword (password) {
        document.getElementById("board").innerHTML = password;
    }

    function showAlphabet () {
        var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var newDivs = new Array(letters.length);
        var alphabet = document.getElementById("alphabet");
        
        var clearBothDivs = new Array(Math.floor(letters.length/6) + 1);
        for (i = 0; i < Math.floor(letters.length/6) + 1; i++){
            clearBothDivs[i] = document.createElement("div");
            clearBothDivs[i].style = "clear:both;"
        }        
        
        // Create 26 DIV elements for each letter of alphabet
        for (i = 0; i < letters.length; i++) {
            newDivs[i] = document.createElement("div");
        }

        // Display alphabet
        for (i = 0; i < letters.length; i++) {
            if (i == 24) { newDivs[i].style = "margin-left:117px;"; }
            newDivs[i].innerHTML = letters.charAt(i);
            newDivs[i].className = "letter";
            newDivs[i].id = "let_" + letters.charAt(i);
            alphabet.appendChild(newDivs[i]);
            if ((i+1) % 6 == 0) {
                alphabet.appendChild(clearBothDivs[(i+1)/6-1]);
            }
        }

        alphabet.addEventListener('click', function (e) {
            if (document.getElementById(e.target.id).style.color == "rgb(192, 0, 0)"){
                e.target.preventDefault();
            }
            checkAnswer(e.target.id);
        }, false);
    }

    String.prototype.setSymbol = function (position, symbol) {
        if (position > this.length - 1) return this.toString();
        else return this.substr(0, position) + symbol + this.substr(position+1);
    }
    
    function checkAnswer (letterId) {
        var letter = letterId.replace("let_", "");
        var selected = false;
        
        for (i = 0; i < pass.length; i++){
            if (pass.charAt(i) == letter) {
                hiddenPass = hiddenPass.setSymbol(i, letter);
                selected = true;
            }
        }
        
        if (selected) {
            yes.play();
            printPassword(hiddenPass);
            document.getElementById("let_" + letter).style.backgroundColor = "#003300";
            document.getElementById("let_" + letter).style.color = "#00C000";
            document.getElementById("let_" + letter).style.border = "3px solid #00C000";
            document.getElementById("let_" + letter).style.cursor = "default";
        } else {
            no.play();
            document.getElementById("let_" + letter).style.backgroundColor = "#330000";
            document.getElementById("let_" + letter).style.color = "#C00000";
            document.getElementById("let_" + letter).style.border = "3px solid #C00000";
            document.getElementById("let_" + letter).style.cursor = "default";
            
            errors++;
            document.getElementById("imgGallows").src = "img/s" + errors + ".jpg";  
        }
        
        if (pass == hiddenPass) {
            document.getElementById("alphabet").innerHTML = 'You won! Congratulations :)<br/> The correct password is:<br/>' + pass + '<br/>             </br><span class="reset" onclick="location.reload()">PLAY AGAIN!</span>';
        }

        if (errors >= 9) {
            document.getElementById("alphabet").innerHTML = 'You lose, sorry :(<br/> The correct password is:<br/>' + pass + '<br/>             </br><span class="reset" onclick="location.reload()">PLAY AGAIN!</span>';
        }        
    }
    
}, false);
