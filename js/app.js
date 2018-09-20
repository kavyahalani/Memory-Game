/*
 * Create a list that holds all of your cards
 */
const iconArray= ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-anchor", "fa fa-leaf", "fa fa-bicycle", "fa fa-diamond", "fa fa-bomb", "fa fa-leaf", "fa fa-bomb", "fa fa-bolt", "fa fa-bicycle", "fa fa-paper-plane-o", "fa fa-cube"];

const deckOfCards = document.querySelector(".deck");
init();
let opened = [];
let matched = 7,moves=0;
let timer,min=0,sec=0;
let stars=document.getElementsByClassName("fa fa-star");
console.log(stars)

let restart= document.getElementById("restart");
restart.addEventListener("click", function(){
    reset();
})
//creating cards

function init(){
    const iconItems= shuffle(iconArray);
for(let i = 0; i < iconItems.length; i++) {

    const item = document.createElement("li");
    item.classList.add("card");
    item.innerHTML = "<i class='"+ iconItems[i] +"'></i>";

    deckOfCards.appendChild(item);

    //click event
    item.addEventListener("click", function() {

        const current = this;
        const previous = opened[0];

        //if a card is opened already
        if(opened.length === 1) {
            item.classList.add("open", "show");
            opened.push(this);
            movesCount();

            //comparison
            //card matched
            timeout = setTimeout(function(){
                matching(current,previous);
            }, 200);
        }
        //if no card is opened
        else {

            current.classList.add("open", "show");
            current.style.pointerEvents= "none";
            opened.push(item);
        }
    });
}
}
function gameOver() {
   
    swal("Good job!", "Moves: "+moves+" Time: "+min+":"+sec+ " ", "success");
    console.log("win")
    reset()
}

function play(){
    reset();
    
}

function reset(){
    moves=0;
    matched=0;
    min=0;
    sec=0;
    
    clearInterval(timer);
    stars[2].style.color="black";
    stars[1].display="block"
    document.getElementById("moves").innerHTML=0
    deckOfCards.innerHTML='';
    init();
    startTimer();
}

function matching(current,previous){
    if(current.innerHTML === previous.innerHTML) {
        current.classList.add("match");
        previous.classList.add("match");

        //adding matched cards to array for matched cards
        matched+=1;
        console.log(matched)
        opened = [];
        if(matched===8)
        {
        gameOver();
        }
    }
    //card didn't match
    else {
        current.classList.remove("open", "show");
        previous.classList.remove("open", "show");
        current.style.pointerEvents= "auto";
        previous.style.pointerEvents= "auto";
        opened = [];        
    }
}

function movesCount(){
    moves+=1;
    if(moves>10 && moves<15){
        stars[2].style.color="white";
    }
    else if(moves>=15){
        stars[1].style.display="none";
    }
    document.getElementById("moves").innerHTML= moves;}

function startTimer(){
    timer=setInterval(c,1000)
}

function c(){
    let time=document.getElementById("time")

    sec++;

    if(sec===60){
        sec=0;
        min+=1
    }
    if(min===60){
        min=0
    }

    time.innerHTML = min +" : "+sec;

}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
