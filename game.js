let currentIdx = 0;
let userAnswers = []; // 선택 기록 저장용

function renderQuestion() {
    const q = questions[currentIdx];
    
    // 진행도 및 텍스트 업데이트
    document.getElementById("question-count").textContent = `MISSION 0${currentIdx + 1} / 05`;
    document.getElementById("category-icon").textContent = q.icon;
    document.getElementById("category-name").textContent = q.category;
    document.getElementById("situation-text").textContent = q.situation;

    const fillPct = (currentIdx / questions.length) * 100;
    document.getElementById("progress-bar-fill").style.width = `${fillPct}%`;

    // 선택지 리스트 생성
    const container = document.getElementById("options-container");
    container.innerHTML = "";

    q.options.forEach((opt, idx) => {
        const btn = document.createElement("button");
        btn.className = "option-btn";
        btn.textContent = `${idx + 1}. ${opt.text}`;
        btn.addEventListener("click", () => handleSelectOption(opt, q));
        container.appendChild(btn);
    });
}

// 선택지 클릭 처리
function handleSelectOption(selectedOption, question) {
    // 기록 저장
    userAnswers.push({
        category: question.category,
        icon: question.icon,
        situation: question.situation,
        selectedText: selectedOption.text,
        score: selectedOption.score,
        result: selectedOption.result
    });

    // 팝업 모달 채우기
    const modal = document.getElementById("feedback-modal");
    const badge = document.getElementById("feedback-badge");
    const title = document.getElementById("feedback-title");
    const reason = document.getElementById("feedback-reason");

    if (selectedOption.score > 0) {
        badge.textContent = "SUCCESS";
        badge.style.color = "#00ff88";
        title.textContent = "시스템 복원 성공!";
    } else {
        badge.textContent = "WARNING";
        badge.style.color = "#ff3333";
        title.textContent = "판단 오류 발생";
    }

    reason.innerHTML = (selectedOption.result || [])
        .map(line => `<div class="result-line">${line}</div>`)
        .join("");
    modal.classList.remove("hidden");
}

// 팝업 내 [다음 미션으로] 버튼
document.getElementById("next-btn").addEventListener("click", () => {
    document.getElementById("feedback-modal").classList.add("hidden");
    
    currentIdx++;
    if (currentIdx < questions.length) {
        renderQuestion();
    } else {
        // 모든 문제 종료 시 결과 저장 및 이동
        sessionStorage.setItem("icc_answers", JSON.stringify(userAnswers));
        localStorage.setItem("icc_game_done", "true"); // index.html 연동용
        location.href = "result.html";
    }
});

// 초기화 시작
renderQuestion();