//const
const clueHoldTime = 1000; //how long the sound and light of a clue hold
const cluePauseTime = 333;
const nextClueWaitTime = 1000; 
const WinCon = 6;

//global
var pattern = [2, 2, 4, 3, 1, 2, 4];
var progress = 0;
var gamePlay = false;
var startBtn = document.getElementById("startBtn");
var stopBtn = document.getElementById("stopBtn");
var tonePlaying = false;
var volume = 0.5; 
var guessCounter = 0;

//win game
function winGame(){
  stopGame();
  alert("Congrats! You win the game");
}

//lose game
function loseGame(){
  stopGame();
  alert("Game over. You lost");
}

//start the game
function startGame(){
  //set variable
  progress = 0;
  gamePlay = true; 
  startBtn.classList.add("hidden");
  stopBtn.classList.remove("hidden");
  playClueSequence(); 
}

//stop the game
function stopGame(){
  //set variable
  progress = 0;
  gamePlay = false; 
  startBtn.classList.remove("hidden");
  stopBtn.classList.add("hidden");
}

startBtn.onclick = function() {startGame();} 
stopBtn.onclick = function() {stopGame();}


// Sound Synthesis Functions
const freqMap = {
  1: 261.6,
  2: 329.6,
  3: 392,
  4: 466.2
}

function playTone(btn,len){ 
  o.frequency.value = freqMap[btn]
  g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
  tonePlaying = true
  setTimeout(function(){
    stopTone()
  },len)
}

function startTone(btn){
  if(!tonePlaying){
    o.frequency.value = freqMap[btn]
    g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
    tonePlaying = true
  }
}
function stopTone(){
    g.gain.setTargetAtTime(0,context.currentTime + 0.05,0.025)
    tonePlaying = false
}

//Page Initialization
// Init Sound Synthesizer
var context = new AudioContext()
var o = context.createOscillator()
var g = context.createGain()
g.connect(context.destination)
g.gain.setValueAtTime(0,context.currentTime)
o.connect(g)
o.start(0)

//litting

function lightBtn(btn){
  document.getElementById("button" + btn).classList.add("lit")
}
function clearBtn(btn){
  document.getElementById("button" + btn).classList.remove("lit")
}

function playSingleClue(btn)
{
  if(gamePlay)
    {
      //play the light
      lightBtn(btn);
      //play the sound
      playTone(btn, clueHoldTime); 
      setTimeout(clearBtn, clueHoldTime, btn);
    }
}

function playClueSequence(){
  let delay = nextClueWaitTime;
  guessCounter = 0; 
  //depend on the progress 
  for(let i = 0; i <= progress; i++)
    {
      setTimeout(playSingleClue, delay, pattern[i]); 
      delay += clueHoldTime;
      delay += cluePauseTime
    }
}

function guess(btn){
  console.log("user guessed: " + btn);
  if(!gamePlay){
    return;
  }
  
  //guess the right one
  if(btn == pattern[guessCounter]){
    guessCounter++;
  }
  //gues the wrong one
  else{
    loseGame();  
  }
  
  //if past the current round
  if(guessCounter == progress+1){
    //lsat 
    if(progress == WinCon){
      winGame(); 
    }
    else{
      progress++; 
      playClueSequence(); 
    }
  }
}


