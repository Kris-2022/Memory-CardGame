
/* Imagery provided by user Freepik on Flaticon 
<a href="https://www.flaticon.com/free-icons/human" title="human icons">Human icons created by Freepik - Flaticon</a>
*/


//making the Redo button invisible
document.getElementById("redo").style.display = "none";


// making an array of objects
const cardArray = [
    {
        name: 'artist',
        img: 'images/artist.png'
    },
    {
        name: 'astronaut',
        img: 'images/astronaut.png'
    },
    {
        name: 'chef',
        img: 'images/chef.png'
    },
    {
        name: 'engineer',
        img: 'images/engineer.png'
    },
    {
        name: 'nurse',
        img: 'images/nurse.png'
    },
    {
        name: 'thief',
        img: 'images/thief.png'
    },
    {
        name: 'artist',
        img: 'images/artist.png'
    },
    {
        name: 'astronaut',
        img: 'images/astronaut.png'
    },
    {
        name: 'chef',
        img: 'images/chef.png'
    },
    {
        name: 'engineer',
        img: 'images/engineer.png'
    },
    {
        name: 'nurse',
        img: 'images/nurse.png'
    },
    {
        name: 'thief',
        img: 'images/thief.png'
    },
    {
        name: 'web',
        img: 'images/web.png'
    },
    {
        name: 'web',
        img: 'images/web.png'
    },
    {
        name: 'lumberjack',
        img: 'images/lumberjack.png'
    },
    {
        name: 'lumberjack',
        img: 'images/lumberjack.png'
    }
]

// Easy way to shuffle the contents of an array. The randomization happens everytime we refresh the index.html.
cardArray.sort(() => 0.5 - Math.random())




// -------------------------------------------------------------------
// Making the grid of cards

const gridDisplay = document.querySelector('#grid') // Select the element with id "grid"
function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('img')  // Creating an image
        card.setAttribute('src', 'images/blank.jpg') // Setting every card to the blank.png
        card.setAttribute('data-id', i) // Setting the image id to the current i
        gridDisplay.append(card) // Adding the card to our grid
        card.addEventListener('click', flipCard) // Creating an event where everytime a card is clicked, it launches the function 'flipCard'
    }
}

//calling the function to create the board
createBoard()





// ------------------------------------------------------------------
// Function for flipping the cards

let cardPicked = null
let counter = 0       // We need this counter to know when to display victory message
let moveCounter = 0   // We need this counter to keep track of how many moves the user made
let solved = []       // This is an array to keep track of cards already solved
function flipCard() {

    const cardId = this.getAttribute('data-id')     // Fetch the id of whatever card was clicked (this)
    // Once we have the id, we can fetch the other attributes

    // If the user selected a card that is already solved, do nothing and exit the function
    if (solved.includes(cardArray[cardId].name)) {
        return
    }

    // If the user clicks on a card that's already revealed, do nothing and exit the function
    if (this.getAttribute('src') != 'images/blank.jpg')
        return

    this.setAttribute('src', cardArray[cardId].img) // Reveal the card

    // Adding a delay and verifying if the user has selected two cards
    setTimeout(() => {

        // If this is our 2nd pick
        if (cardPicked != null) {
            // If we have two cards that match, keep the cards revealed and reset 'cardPicked' to null. Update the 'solved' array
            if (cardArray[cardPicked.getAttribute('data-id')].name == cardArray[cardId].name) {
                solved.push(cardArray[cardId].name)
                cardPicked = null
                counter++
                if (counter == cardArray.length / 2) {
                    document.getElementById('result').innerHTML = 'You won with ' + moveCounter + ' moves!  '
                    document.getElementById("redo").style.display = "block"; // making the redo button visible
                    return
                }
            }
            //If we don't have a match, reset the image and the 'cardPicked'
            else {
                this.setAttribute('src', 'images/blank.jpg')
                cardPicked.setAttribute('src', 'images/blank.jpg')
                cardPicked = null
            }
            document.getElementById('result').innerHTML = 'moves: ' + (++moveCounter)
        }
        // Otherwise, store the card because it's a 1st pick
        else
            cardPicked = this

    }, 200);

}