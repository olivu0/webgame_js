const $screen = document.querySelector("#screen");
const $result = document.querySelector("#result");
let startTime;
let endTime;
const records = []; // 평균 반응속도 구하기위해 반응속도 기록하는 배열
let timeoutId;

$screen.addEventListener("click", function () {
  // 태그.classList.contains('클래스') // 태그에 해당 클래스가 들어있는지 확인하는 방법 true, false 반환
  if ($screen.classList.contains("waiting")) {
    $screen.classList.remove("waiting");
    $screen.classList.add("ready");
    $screen.textContent = "초록색이 되면 클릭하세요";
    // 타이머 작동(빨간색에서 초록색으로 바뀌는 시간 random으로)
    timeoutId = setTimeout(function () {
      startTime = new Date();
      $screen.classList.remove("ready");
      $screen.classList.add("now");
      $screen.textContent = "클릭하세요!";
    }, Math.random() * 1000 + 2000); // 2000 - 3000 사이의 수
  } else if ($screen.classList.contains("ready")) {
    clearTimeout(timeoutId);
    $screen.classList.remove("ready");
    $screen.classList.add("waiting");
    $screen.textContent = "너무 성급하시군요!";
  } else if ($screen.classList.contains("now")) {
    endTime = new Date();
    const current = endTime - startTime;
    records.push(current);
    const average = records.reduce((a, c) => a + c, 0) / records.length;
    $result.textContent = `현재 ${current}ms, 평균 ${average}ms`;
    const topFive = records.sort((a, c) => a - c).slice(0, 5);
    topFive.forEach((top, index) => {
      $result.append(document.createElement("br"), `${index + 1}위: ${top}`);
    });

    starTime = null; // 반복해서 측정해야 하므로 측정이 끝날 때마다 null로 비워둠
    endTime = null;
    $screen.classList.remove("now");
    $screen.classList.add("waiting");
    $screen.textContent = "클릭해서 시작하세요!";
  }
});
