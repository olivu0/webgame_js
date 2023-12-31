// 무작위로 공뽑기, Fisher-Yates Shuffle(피셔 예이츠 셔플) === 숫자를 무작위로 섞는 방법
const candidate = Array(45)
  .fill()
  .map((v, i) => i + 1); // 1에서 45까지 숫자를 추첨하는 코드
const shuffle = [];
while (candidate.length > 0) {
  const random = Math.floor(Math.random() * candidate.length); // 무작위 index 뽑기
  // splice하는 순간 candidate에서는 하나가 제거됨과 동시에 spliceArray에는 숫자 하나가 배열로 들어감
  const spliceArray = candidate.splice(random, 1);
  const value = spliceArray[0]; // 배열에 들어있는 값을 꺼냄
  shuffle.push(value);
}
console.log(shuffle);
// 공 정렬하기
const winBalls = shuffle.slice(0, 6).sort((a, b) => a - b);
const bonus = shuffle[6];
console.log(winBalls, bonus);

// 공에 색깔 입히기
function colorize(number, $tag) {
  if (number < 10) {
    $tag.style.backgroundColor = "red";
    $tag.style.color = "white";
  } else if (number < 20) {
    $tag.style.backgroundColor = "orange";
  } else if (number < 30) {
    $tag.style.backgroundColor = "yellow";
  } else if (number < 40) {
    $tag.style.backgroundColor = "blue";
    $tag.style.color = "white";
  } else {
    $tag.style.backgroundColor = "green";
    $tag.style.color = "white";
  }
}

// 일정시간 후에 실행하기
const $result = document.querySelector("#result");
// setTimeout안에 있던 중복되는 것을 함수로 뽑아내기, 중복되지 않는 것은 매개변수로,,
function drawBall(number, $parent) {
  const $ball = document.createElement("div");
  $ball.className = "ball";
  // 컬러 추가
  colorize(number, $ball);
  $ball.textContent = number;
  $parent.appendChild($ball);
}
for (let i = 0; i < winBalls.length; i++) {
  setTimeout(() => {
    drawBall(winBalls[i], $result);
  }, 1000 * (i + 1));
}
// 보너스공
const $bonus = document.querySelector("#bonus");
setTimeout(() => {
  drawBall(bonus, $bonus);
}, 7000);
