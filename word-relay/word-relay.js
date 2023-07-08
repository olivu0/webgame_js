const number = Number(prompt("몇 명이 참가하나요?"));
const $button = document.querySelector("button");
const $input = document.querySelector("input");
const $word = document.querySelector("#word");
const $order = document.querySelector("#order");
let word; // 제시어 자바
let newWord; // 새로 입력한 단어 바보

const onClicButton = () => {
  if (!word) {
    // 제시어가 비어 있는가?
    // 비어 있다
    word = newWord; // 입력한 단어가 제시어가 된다.
    $word.textContent = word; // 화면 바꿔줌
    const order = parseInt($order.textContent); // 현재 순서
    if (order === number) {
      $order.textContent = 1;
    } else {
      $order.textContent = order + 1;
    }
    $input.value = ""; // 입력창 비우기
    $input.focus(); // 커서 두기
  } else {
    // 비어 있지 않다
    if (word[word.length - 1] === newWord[0]) {
      // 올바른가
      word = newWord; // 입력한 단어가 제시어가 된다.
      $word.textContent = word; // 화면 바꿔줌
      const order = parseInt($order.textContent); // 현재 순서
      if (order === number) {
        $order.textContent = 1;
      } else {
        $order.textContent = order + 1;
      }
      $input.value = ""; // 입력창 비우기
      $input.focus(); // 커서 두기
    } else {
      // 올바르지 않은가
      alert("올바르지 않은 단어입니다.");
      $input.value = ""; // 입력창 비우기
      $input.focus(); // 커서 두기
    }
  }
};
const onInput = (event) => {
  newWord = event.target.value;
};

$button.addEventListener("click", onClicButton);
$input.addEventListener("input", onInput);
