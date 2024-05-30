document.querySelector(".control-buttons span").onclick = function () {
    let yourname = prompt("what is your name");

    if(yourname === null || yourname === ""){

        document.querySelector(".info-container .game").innerHTML = "Hello: " + "unknown";
    }else {

        document.querySelector(".info-container .game").innerHTML = "Hello: " + yourname;

    }
    document.querySelector(".control-buttons").remove();
};

let durction = 1000;

let blocksContainer = document.querySelector(".momory-game-block");

let blocks = Array.from(blocksContainer.children);

let orderRange = [...Array(blocks.length).keys()];

shuffle(orderRange);


// add order property to game block 
blocks.forEach((block, index) => {
    block.style.order = orderRange[ index ];


    block.addEventListener("click", function() {
        flipBlock(block);
    })
});



function flipBlock (selectblock) { 
    selectblock.classList.add("is-flipped");


    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains("is-flipped"));

    if (allFlippedBlocks.length === 2) {
        stopClicking();

        
    }checkForMatch(allFlippedBlocks[0], allFlippedBlocks[1])

};


function stopClicking () {
    blocksContainer.classList.add("stop-clicking");

    setTimeout(() => {
        blocksContainer.classList.remove("stop-clicking");
    }, durction);
};



function checkForMatch(fristblock , lastblock) {
let traies = document.querySelector(".tries span");
    if (fristblock.dataset.technology === lastblock.dataset.technology) {

        fristblock.classList.remove("is-flipped");
        lastblock.classList.remove("is-flipped");
        fristblock.classList.add("has-match");
        lastblock.classList.add("has-match");

        document.getElementById("success").play();


    }else {

        traies.innerHTML = parseInt(traies.innerHTML) + 1;
        if (traies.innerHTML === "7") {
            let game = document.querySelector(".game");
            game.innerHTML = "Game Over";
            let allBlocks = document.querySelectorAll(".momory-game-block .game-block");
            allBlocks.forEach(block => {
                block.classList.add("is-flipped");
                lastblock.classList.add("is-flipped");
                setTimeout(() => {
                    document.location.reload();
                }, durction);
            });

            document.querySelector(".info-container .tries").innerHTML = "tries: " + traies.innerHTML;

            setTimeout(() => {
                allBlocks.forEach(block => {
                    block.classList.remove("is-flipped");
                });

                traies.innerHTML = "0";
            }, durction * 2);

            document.getElementById("fall").play();
        }else {
            setTimeout(() => {
                fristblock.classList.remove("is-flipped");
                lastblock.classList.remove("is-flipped");
            }, durction);
        }
    setTimeout(() => {
        fristblock.classList.remove("is-flipped");
        lastblock.classList.remove("is-flipped");
    }, durction);
    document.getElementById("fall").play();

    }
}


function shuffle (arr) {
    let counter = arr.length;
    random = Math.floor(Math.random() * counter);
    temp = arr[counter];
    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;
        let temp = arr[counter];
        arr[counter] = arr[random];
        arr[index] = temp;
    }
    return arr;
};



