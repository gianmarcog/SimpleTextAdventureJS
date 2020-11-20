const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('options-buttons')

let state = {}

// Start function which get called when the game starts
function startGame() {
    // The current state is empty. 
    state = {}
    // This function is responsible for the Question-View
    showTextNode(1)
}

// Function which is going to show the text
function showTextNode(textNodeIndex) {
    // If the transferred value textNodeIndex a id in the Array texNodes is the const textNode getting the value
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    // The text from the Array with the Id from textNode get transfer in the textElement with the (Html)-Id 'text'
    textElement.innerText = textNode.text
    // Function get called 
    // Buttons from the prev. view gettinig deletet
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }
    // From the choosed textNodeIndex the difference answer options getting showed
    textNode.options.forEach(option => {
        // Button get created
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            // Eventlistener which says 'if you click on this option the option get choosen'
            button.addEventListener('click', () => selectOption(option))
            // The choosen buuttons appends
            optionButtonsElement.appendChild(button)
        } 
    })
}

// Function which return the state from the current option
function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

// Function which recognize the selected option
function selectOption(option) {
    // the const nextTextId indicate the next Text which shows up
    const nextTextNodeId = option.nextText
    // if the value less than zero the game is restarting cause you lost the game
    if(nextTextNodeId <= 0) {
        return startGame()
    }
    // state get overwrite from (state and option.setState)
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [{
        id: 1,
        text: 'How do you want travel to hogwarts?',
        options: [{
                text: 'Train',
                setState: {
                    blueGoo: true
                },
                nextText: 5
            },
            {
                text: 'Car',
                nextText: 4
            }
        ]
    },
    {
        id: 2,
        text: 'You venture forth in search of answers to where you are when you come across a merchant.',
        options: [{
                text: 'Trade the goo for a sword',
                // The value requiredState includes the current state with it's values
                requiredState: (currentState) => currentState.blueGoo,
                setState: {
                    blueGoo: false,
                    sword: true
                },
                nextText: 3
            },
            {
                text: 'Trade the goo for a shield',
                requiredState: (currentState) => currentState.blueGoo,
                setState: {
                    blueGoo: false,
                    shield: true
                },
                nextText: 3
            },
            {
                text: 'Ignore the merchant',
                nextText: 3
            }
        ]
    },
    {
        id: 3,
        text: 'After leaving the merchant you start to feel tired and stumble upon a small town next to a dangerous looking castle.',
        options: [{
                text: 'Explore the castle',
                nextText: 4
            },
            {
                text: 'Find a room to sleep at in the town',
                nextText: 5
            },
            {
                text: 'Find some hay in a stable to sleep in',
                nextText: 6
            }
        ]
    },
    {
        id: 4,
        text: 'It´s impossible to travel with a car to hogwarts. You will never arrive there.',
        options: [{
            text: 'Restart',
            nextText: -1
        }]
    },
    {
        id: 5,
        text: 'Congratulation my friend. You arrived Hogwarts!',
        options: [{
            text: 'Restart',
            nextText: -1
        }]
    },
    {
        id: 6,
        text: 'You wake up well rested and full of energy ready to explore the nearby castle.',
        options: [{
            text: 'Explore the castle',
            nextText: 7
        }]
    },
    {
        id: 7,
        text: 'While exploring the castle you come across a horrible monster in your path.',
        options: [{
                text: 'Try to run',
                nextText: 8
            },
            {
                text: 'Attack it with your sword',
                requiredState: (currentState) => currentState.sword,
                nextText: 9
            },
            {
                text: 'Hide behind your shield',
                requiredState: (currentState) => currentState.shield,
                nextText: 10
            },
            {
                text: 'Throw the blue goo at it',
                requiredState: (currentState) => currentState.blueGoo,
                nextText: 11
            }
        ]
    },
    {
        id: 8,
        text: 'Your attempts to run are in vain and the monster easily catches.',
        options: [{
            text: 'Restart',
            nextText: -1
        }]
    },
    {
        id: 9,
        text: 'You foolishly thought this monster could be slain with a single sword.',
        options: [{
            text: 'Restart',
            nextText: -1
        }]
    },
    {
        id: 10,
        text: 'The monster laughed as you hid behind your shield and ate you.',
        options: [{
            text: 'Restart',
            nextText: -1
        }]
    },
    {
        id: 11,
        text: 'You threw your jar of goo at the monster and it exploded. After the dust settled you saw the monster was destroyed. Seeing your victory you decide to claim this castle as your and live out the rest of your days there.',
        options: [{
            text: 'Congratulations. Play Again.',
            nextText: -1
        }]
    }
]

startGame()