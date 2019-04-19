//////////////////////////////
// Below are all variables
/////////////////////////////

// cards inside the deck
let deck = document.querySelector('.deck');
// list of cards
let cardsList = document.getElementsByClassName('card');
// icon name list
let iconList = []
getCardsProperty();
// a list of an opend cards
let openedCard = [];
// restart button
let restartButton = document.getElementsByClassName('restart');
restartButton = restartButton[0];
// number of step
let step = 0;
// get the the class move
let move = document.getElementsByClassName('moves');
//matched card
let matchCard = 0;
// counting time
let t0 = 0;
let t1 = 0;
let time = 0;
// star count
let star = document.getElementsByClassName('stars');
star = star[0]
starSelected = 0;


//////////////////////////////
// Below are all the click listener 
/////////////////////////////
deck.addEventListener("click",clickedCard);
restartButton.addEventListener("click",clickedRestartButton);


//////////////////////////////
// Below are all the function 
/////////////////////////////

// this functin will count star Percentage 
function starPercentage (){
    if(step == 20){
        star.children[0].children[0].classList.remove("fa-star");
        star.children[0].children[0].classList.add("fa-star-o");
    }
    else if(step == 30){
        star.children[1].children[0].classList.remove("fa-star");
        star.children[1].children[0].classList.add("fa-star-o");
    }
    else if (step > 50){
        star.children[2].children[0].classList.remove("fa-star");
        star.children[2].children[0].classList.add("fa-star-o");
    }
}

//this function will count the number of stars
function starNum(){
    for (let index = 0; index < star.children.length; index++) {
        let vote = star.children[index].children[0].className
        if(vote === "fa fa-star"){
            starSelected++;
        }
        
    }
}
// this function will handle the event when the cards is clicked
function clickedCard (event){
    starPercentage();
    if(step === 0){
        t0 = performance.now() + performance.timing.navigationStart;
    }
    step ++; 
    countMoves();
    let currentCard = event.target;
    let secondCard = currentCard.children[0].className;
    openedCard.push(currentCard);
    let firstCard = openedCard[0].children[0].className;
    if(openedCard.length == 1){
        currentCard.classList.add("show","open");
    }
    if(openedCard.length === 2 && (firstCard == secondCard)){

        currentCard.classList.add("show","open");
        openedCard[0].classList.add("match","show","open");
        openedCard[1].classList.add("match","show","open");
        openedCard = [];
        matchCard ++;
        setTimeout(()=>{
            if(matchCard === 8){
                t1 = performance.now() + performance.timing.navigationStart;
                time = t1 - t0;
                time = time/1000;
                time = time.toString();
                time = time.substring(0,4);
                starNum();
                winnerNotifcation();
            }
        }, 300)
    }
    if(openedCard.length === 2 && (firstCard != secondCard)){
        openedCard[0].classList.add("wrong");
        openedCard[1].classList.add("wrong");
        setTimeout(()=>{
            openedCard[0].classList.remove("wrong","open","show");
            openedCard[1].classList.remove("wrong"); 
            openedCard = [];
        },500)

    }
}

// this method count the number of moves
function countMoves(){
    move[0].innerHTML = step

}

// When the restart button is clicked this function will shuffle the list
function clickedRestartButton (){
    iconList = shuffle(iconList);
    for (let outterIndex = 0; outterIndex < iconList.length; outterIndex++) {
        for (let innerIndex = 0; innerIndex < iconList.length; innerIndex++) {
            cardsList[outterIndex].children[0].classList.remove(iconList[innerIndex])
        }
        cardsList[outterIndex].children[0].classList.add(iconList[outterIndex])
        cardsList[outterIndex].classList.remove("match","show","open");
    }
    for (let index = 0; index < star.children.length; index++) {
        star.children[index].children[0].classList.remove("fa-star-o")
        star.children[index].children[0].classList.add("fa-star")
    }
    step = 0;
    matchCard = 0;
    starSelected = 0;
    countMoves();
}

// get the cards icones class name and stored it in an iconList array
function getCardsProperty(){
    iconList = []
    for (let index = 0; index < cardsList.length; index++) {
        let old = cardsList[index].children[0].className;
        iconList.push(old.split(' ')[1]);
    }
}

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

// show this pop-up when the player win the game
function winnerNotifcation() {
    if (confirm(`Congratulations you have won with ${step} moves and it took you ${time} seconds and you got ${starSelected} out of 3 stars. To play the game again press ok`)) {
        clickedRestartButton();
      } else {
        // nothing
      }  
}
