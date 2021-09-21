/*
Important Game Functions

-Player must guess a number btwn min and max
-Player gets a certain number of guesses
-Notify player of guesses remaining
-Notify player of the correst answer of lost
-Let player choose to play again
*/


//Game Values
let min = 1, 
    max = 10,
    winningNum = getWinningNum(min, max),
    guessesLeft = 3;


//UI elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

//Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//listen for play again
game.addEventListener('mousedown', function(e){
  if(e.target.className === 'play-again'){
    window.location.reload();
  }
});


//listen for guess

guessBtn.addEventListener('click', function(){
  let guess = parseInt(guessInput.value);

  //validate
  if(isNaN(guess) || guess < min || guess > max){
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  //check if won
  else if(guess === winningNum){
    //game over - won
    gameOver(true,`${winningNum} is correct, YOU WIN!`);

  }else{
    

    //wrong number
    guessesLeft -= 1;
    if(guessesLeft === 0){
        gameOver(false, `You Lost. The correct number was ${winningNum}.`);
    }else{
      //game continues but guessed wrong

      //set border
      guessInput.style.borderColor = 'red';

      //set message
      setMessage(`${guess} Is Incorrect, You Have ${guessesLeft} Guesses Remaining`, 'red');

      //clear input
      guessInput.value = '';

  

    }
  }
})

//game over
function gameOver(won, msg){
  let color;
  won === true ? color = 'green' : color = 'red';
  guessInput.disabled = true;
    //set border colour
    guessInput.style.borderColor = color;
    message.style.color = color;
    //set message
    setMessage(msg);
    //Play Again
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}



//set message
function setMessage(msg, color){
  message.style.color = color;
  message.textContent = msg;
}

//random winning number
function getWinningNum(min, max){
  return Math.floor(Math.random()*(max-min+1)+min);
}













