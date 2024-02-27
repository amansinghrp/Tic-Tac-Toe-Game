let boxes = document.querySelectorAll(".box");
let rstBtn = document.querySelector("#reset-btn");
let newGame = document.querySelector("#new-game");
let msgCont = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");


let turnO = true;//turn of player O is activated
let count = 0;//to track draw

const winPattern =[
    [0, 1, 2],
    [0, 4, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
    [2, 4, 6],
]

const disableBoxes = () =>{
    for(let box of boxes){
        box.disabled = true;
    }
};

const enableBoxes = () =>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};

const resetGame = () => {
    count = 0;
    turnO = true;
    enableBoxes();
    msgCont.classList.add("hide");
};

const gameDraw =() =>{
    msg.innerText = `Game was a Draw.`;
    msgCont.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () =>{
    for(let pattern of winPattern){
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if(pos1 != '' && pos2 != '' && pos3 != ''){
            if(pos1 === pos2 && pos2 === pos3){
                showWinner(pos1);
                return true;   
            }
        }
    }
};

const showWinner = (winner) =>{
    msg.innerText = `Congratulations!!! Winner is Player ${winner}`;
    msgCont.classList.remove("hide");
    disableBoxes();
};

boxes.forEach(box => {
    box.addEventListener("click", () =>{
        if(turnO == true){
            box.innerText = "O";
            turnO = false;
        }
        else{
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        count ++

        let isWinner = checkWinner();

        if(count == 9 && !isWinner){
            gameDraw();
        }
    });
});

rstBtn.addEventListener("click", resetGame);

newGame.addEventListener("click", resetGame);

