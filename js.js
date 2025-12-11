$("#melody").attr("src", `menu.mp3`);

let myValue = localStorage.getItem('food');

let gameStart = 'game over';

let gameSize = 300;

let size = 20;

let headX = 0;
let headY = 0;

let moveX = 0;
let moveY = 0;

let moveSpeed = 7;

let headSize = 20;

let foodX = Math.floor(Math.random() * (gameSize / size)) * size;
let foodY = Math.floor(Math.random() * (gameSize / size)) * size;

let speedFoodX;
let speedFoodY;

let tail = [];

let food = 0;
let best_food = myValue || 0;
let food_text = document.getElementById("food");
let best_food_text = document.getElementById("best_food");

let speedFood = 0;
let best_speedFood = 0;
let speedFood_text = document.getElementById("speedFood");

let one = true;
let two = true;

let colorHead = '#3251ec';
let colorTail = '#82aff7';
let colorFood = '#ff5757';

let sec = 10;

let un = 3;
let ut = 19;

let happys = 399;

let speedFoodVisible = false;

$(".bi-gear").click(function () {
    $(".rules").css('display', 'flex');
});

$(".bi-x-lg").click(function () {
    $(".rules").css('display', 'none');
});

$(".Keyboard").click(function () {
    two = true;
    $(".Keyboard").css('opacity', '1');
    $(".Sensor").css('opacity', '0.5');
    $(".btns").hide(); // Скрываем кнопки в режиме клавиатуры
});

$(".Sensor").click(function () {
    two = false;
    $(".Sensor").css('opacity', '1');
    $(".Keyboard").css('opacity', '0.5');
    $(".btns").show(); // Показываем кнопки в режиме сенсора
});

$(".easy_fieldSize").click(function () {
    size = 25;
    happys = 299;
    ut = 11;
    createCanvas(gameSize, gameSize);
    foodX = Math.floor(Math.random() * (gameSize / size)) * size;
    foodY = Math.floor(Math.random() * (gameSize / size)) * size;
    $(".easy_fieldSize").css('opacity', '1');
    $(".normal_fieldSize").css('opacity', '0.5');
    $(".hard_fieldSize").css('opacity', '0.5');
});

$(".normal_fieldSize").click(function () {
    size = 20;
    happys = 399;
    ut = 14;
    createCanvas(gameSize, gameSize);
    foodX = Math.floor(Math.random() * (gameSize / size)) * size;
    foodY = Math.floor(Math.random() * (gameSize / size)) * size;
    $(".easy_fieldSize").css('opacity', '0.5');
    $(".normal_fieldSize").css('opacity', '1');
    $(".hard_fieldSize").css('opacity', '0.5');
});

$(".hard_fieldSize").click(function () {
    size = 15;
    happys = 499;
    ut = 19;
    createCanvas(gameSize, gameSize);
    foodX = Math.floor(Math.random() * (gameSize / size)) * size;
    foodY = Math.floor(Math.random() * (gameSize / size)) * size;
    $(".easy_fieldSize").css('opacity', '0.5');
    $(".normal_fieldSize").css('opacity', '0.5');
    $(".hard_fieldSize").css('opacity', '1');
});

$(".easy_speed").click(function () {
    moveSpeed = 11;
    un = 5;
    $(".easy_speed").css('opacity', '1');
    $(".normal_speed").css('opacity', '0.5');
    $(".hard_speed").css('opacity', '0.5');
});

$(".normal_speed").click(function () {
    moveSpeed = 7;
    un = 3;
    $(".easy_speed").css('opacity', '0.5');
    $(".normal_speed").css('opacity', '1');
    $(".hard_speed").css('opacity', '0.5');
});

$(".hard_speed").click(function () {
    moveSpeed = 3;
    un = 1;
    $(".easy_speed").css('opacity', '0.5');
    $(".normal_speed").css('opacity', '0.5');
    $(".hard_speed").css('opacity', '1');
});

$(".teleport_edge").click(function () {
    one = true;
    $(".teleport_edge").css('opacity', '1');
    $(".end_edge").css('opacity', '0.5');
});

$(".end_edge").click(function () {
    one = false;
    $(".teleport_edge").css('opacity', '0.5');
    $(".end_edge").css('opacity', '1');
});

$('.colorHead').change(function () {
    colorHead = $('.colorHead').val();
});
$('.colorTail').change(function () {
    colorTail = $('.colorTail').val();
});

// Навешиваем клики на сенсорные кнопки один раз при загрузке
$(document).ready(function () {
    $(".clickW").click(function () {
        if (moveY != size) {
            moveX = 0;
            moveY = -size;
        }
        $(".btns").hide();
    });
    $(".clickA").click(function () {
        if (moveX != size) {
            moveX = -size;
            moveY = 0;
        }
        $(".btns").hide();
    });
    $(".clickS").click(function () {
        if (moveY != -size) {
            moveX = 0;
            moveY = size;
        }
        $(".btns").hide();
    });
    $(".clickD").click(function () {
        if (moveX != -size) {
            moveX = size;
            moveY = 0;
        }
        $(".btns").hide();
    });
    $(".btns").hide(); // Скрываем кнопки по умолчанию
});

function setup() {
    createCanvas(gameSize, gameSize);
}

function draw() {
    if (gameStart == 'game') {

        if (two == true) {
            Keyboard();
            $(".btns").hide();
        } else if (two == false) {
            Sensor();
        }

        background(238, 253, 180);

        // Отрисовка еды
        fill(colorFood);
        stroke(0);
        rect(foodX, foodY, size, size);

        // Отрисовка головы змейки
        fill(colorHead);
        stroke(0);
        rect(headX, headY, size, size);

        // Проверка съедания еды
        if (headX == foodX && headY == foodY) {
            foodX = Math.floor(Math.random() * (gameSize / size)) * size;
            foodY = Math.floor(Math.random() * (gameSize / size)) * size;

            addTail();
            food++;

            // Спавн спид фуда с низким шансом
            let spawnChance = Math.floor(Math.random() * 2);
            if (spawnChance === 0 && food >= ut && speedFood < 5 && !speedFoodVisible) {
                speedFoodX = Math.floor(Math.random() * (gameSize / size)) * size;
                speedFoodY = Math.floor(Math.random() * (gameSize / size)) * size;
                speedFoodVisible = true;
            }
        }

        // Отрисовка спид фуда
        if (speedFoodVisible) {
            fill(0, 200, 0);
            stroke(0);
            rect(speedFoodX, speedFoodY, size, size);
        }

        // Съедание спид фуда
        if (speedFoodVisible && headX == speedFoodX && headY == speedFoodY) {
            addTail();
            addTail();
            setTimeout(func, sec * 1000);
            moveSpeed = moveSpeed - un;
            speedFood++;
            food = food + 2;
            sec = sec + 5;
            speedFoodVisible = false;
        }

        if (frameCount % moveSpeed == 0) {
            updateTail(headX, headY);

            headX += moveX;
            headY += moveY;
            checkCollision();
            if (one == true) {
                teleport_edge();
            } else if (one == false) {
                end_edge();
            }
        }

        drawTail();

        food_text.innerHTML = "FOOD: " + food + " ⭐";
        best_food_text.innerHTML = "Best FOOD: " + best_food + " ⭐";
        speedFood_text.innerHTML = "SPEED FOOD: " + speedFood + " ⭐";

        if (happys == food) { happy(); }

    } else if (gameStart == 'game over') {
        background(227, 38, 54);
        if (food > best_food) {
            best_food = food;
            localStorage.setItem('food', best_food);
        }
        food = 0;
        speedFood = 0;
        $(".start").css('display', 'flex');
        $(".bi-gear").css('display', 'flex');
        $(".btns").hide();
    }

    $(".start").click(function () {
        $(".start").css('display', 'none');
        $(".bi-gear").css('display', 'none');
        reload();
    });
}

function addTail() {
    tail.push({
        x: headX,
        y: headY
    });
}

function updateTail(targetX, targetY) {
    if (tail.length > 0) {
        for (let i = tail.length - 1; i > 0; i--) {
            tail[i].x = tail[i - 1].x;
            tail[i].y = tail[i - 1].y;
        }
        tail[0].x = targetX;
        tail[0].y = targetY;
    }
}

function drawTail() {
    fill(colorTail);
    for (let i = 0; i < tail.length; i++) {
        rect(tail[i].x, tail[i].y, size, size);
    }
}

function checkCollision() {
    for (let i = 0; i < tail.length; i++) {
        if (headX == tail[i].x && headY == tail[i].y) {
            gameStart = 'game over';
        }
    }
}

function reload() {
    gameStart = 'game';
    headX = 0;
    headY = 0;
    moveX = 0;
    moveY = 0;
    tail = [];
    speedFoodVisible = false;
}

function end_edge() {
    if (headX >= gameSize) {
        gameStart = 'game over';
    } else if (headX < 0) {
        gameStart = 'game over';
    }
    if (headY >= gameSize) {
        gameStart = 'game over';
    } else if (headY < 0) {
        gameStart = 'game over';
    }
}

function teleport_edge() {
    if (headX >= gameSize) {
        headX = 0;
    } else if (headX < 0) {
        headX = gameSize - size;
    }
    if (headY >= gameSize) {
        headY = 0;
    } else if (headY < 0) {
        headY = gameSize - size;
    }
}

const func = () => {
    moveSpeed = moveSpeed + un;
};

function Keyboard() {
    if ((keyCode == 87) && moveY != size) {
        moveX = 0;
        moveY = -size;
    } else if ((keyCode == 68) && moveX != -size) {
        moveX = size;
        moveY = 0;
    } else if ((keyCode == 65) && moveX != size) {
        moveX = -size;
        moveY = 0;
    } else if ((keyCode == 83) && moveY != -size) {
        moveX = 0;
        moveY = size;
    }
    $(".btns").hide();
}

function Sensor() {
    $(".btns").show();
}

function happy() {
    $(".emoji").css('display', 'flex');
    $(".emoji").html('😃');
}

document.addEventListener('keydown', () => {
    Keyboard();
});
