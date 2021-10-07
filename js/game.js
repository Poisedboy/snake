const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const background = new Image();
background.src = 'img/background.png';

const food = new Image();
food.src = 'img/food.png';

const box = 32;

let score = 0;

let locFood = {
  x: Math.floor((Math.random() * 17 + 1)) * box,
  y: Math.floor((Math.random() * 15 + 3)) * box
};

let snake = [];

snake[0] = {
  x: 9 * box,
  y: 10 * box
};

function gameOver() {
  ctx.fillStyle = 'white';
  ctx.font = '70px Arial';
  ctx.fillText('Game Over', box * 4, box * 10);
};

document.addEventListener('keydown', direction);

let dir;

function direction(e) {
  if (e.keyCode == 37 && dir !== 'right') {
    dir = 'left';
  } else if (e.keyCode == 38 && dir !== 'down') {
    dir = 'up';
  } else if (e.keyCode == 39 && dir !== 'left') {
    dir = 'right';
  } else if (e.keyCode == 40 && dir !== 'up') {
    dir = 'down';
  };
};

function eatTail(head, arr) {
  for (let i = 0; i < arr.length; i++){
    if (head.x == arr[i].x && head.y == arr[i].y) {
      clearInterval(game);
      gameOver();
    };
  };
};

function drawGame() {
  ctx.drawImage(background, 0, 0);
  ctx.drawImage(food, locFood.x, locFood.y);
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i == 0 ? 'green' : 'red';
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  };
  ctx.fillStyle = 'white';
  ctx.font = '50px Arial';
  ctx.fillText(score, box * 2.5, box * 1.7);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (snakeX == locFood.x && snakeY == locFood.y) {
    score++;
    locFood = {
      x: Math.floor((Math.random() * 17 + 1)) * box,
      y: Math.floor((Math.random() * 15 + 3)) * box
    };
  } else {
    snake.pop(); 
  };

  if (snakeX < box || snakeX > box * 17 || snakeY < 3 * box || snakeY > box * 17) {
    clearInterval(game);
    gameOver();
  };

  if (dir === 'left') snakeX -= box;
  if (dir === 'right') snakeX += box;
  if (dir === 'up') snakeY -= box;
  if (dir === 'down') snakeY += box;

  let newHead = {
    x: snakeX,
    y: snakeY
  };

  eatTail(newHead, snake); 

  snake.unshift(newHead);
};

let game = setInterval(drawGame, 100);
