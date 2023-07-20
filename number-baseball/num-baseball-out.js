const $form = document.querySelector("#form");
const $input = document.querySelector("#input");
const $logs = document.querySelector("#logs");

// 1-9 숫자 나열
const numbers = [];
for (let n = 0; n < 9; n++) {
  numbers.push(n + 1);
}
// answer 랜덤 뽑기
const answer = [];
for (let n = 0; n < 4; n++) {
  // const index = Math.floor(Math.random() * 9);
  const index = Math.floor(Math.random() * numbers.length);
  answer.push(numbers[index]);
  numbers.splice(index, 1);
}
console.log(answer);

//입력창으로 예측값 받음
const tries = [];
function checkInput(input) {
  if (input.length !== 4) {
    return alert("4자리 수를 입력해주세요!");
  }
  if (new Set(input).size !== 4) {
    return alert("중복되지 않게 입력 해주세요!");
  }
  if (tries.includes(input)) {
    return alert("이미 시도된 값입니다.");
    // alert함수 undefined 반환, 즉 return undefined 와 동일
    // undefined는 if문안에서 false로 처리
  }
  return true; // 검사 통과시 true return, 실패시 false 반환
}
// 코드 중복 제거
function defeated() {
  const message = document.createTextNode(`패배! 정답은 ${answer.join("")}`);
  $logs.appendChild(message);
}

let out = 0; // out 횟수
// form태그에 submit 이벤트를 사용하면 버튼을 클릭하지 않고도 엔터를 눌러 값 제출 가능
$form.addEventListener("submit", (event) => {
  event.preventDefault(); // 폼태그의 기본 동작(submit: 브라우저 새로고침) 취소
  const value = $input.value; // 입력값창으로 예측값(value)받음 === 문자열
  $input.value = "";
  const valid = checkInput(value); // 입력된 값 검증

  // 홈런인가?
  if (!valid) return; // 이게 무슨 의미일까?
  if (answer.join("") === value) {
    $logs.textContent = "홈런!";
    return;
  }
  if (tries.length >= 9) {
    // $logs의 내용을 유지하고 밑에 추가, 그냥 textContent쓰면 기존 내용 삭제됨
    defeated();
    return;
  }

  // 몇 스트라이크 몇 볼인지 검사
  let strike = 0;
  let ball = 0;
  // 4번 반복
  for (let i = 0; i < answer.length; i++) {
    const index = value.indexOf(answer[i]);
    // 일치하는 숫자 발견
    if (index > -1) {
      // 자릿수도 같음
      if (index === i) {
        strike += 1;
        //숫자만 같음
      } else {
        ball += 1;
      }
    }
  }
  if (strike === 0 && ball === 0) {
    out++;
    $logs.append(`${value}:${out} 아웃`, document.createElement("br"));
  } else {
    $logs.append(`${value}: ${strike} 스트라이크 ${ball} 볼`, document.createElement("br"));
  }
  if (out === 3) {
    defeated();
    return;
  }
  tries.push(value);
});
