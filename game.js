let currentQuestionIndex = 0;
let totalScore = 0;
let restoredFeatures = [];

document.addEventListener("DOMContentLoaded", () => {
    loadQuestion();
});

function loadQuestion() {
    const currentQ = questionsData[currentQuestionIndex];

    // UI 업데이트
    document.getElementById("question-count").textContent = `MISSION 0${currentQuestionIndex + 1} / 0${questionsData.length}`;
    document.getElementById("category-icon").textContent = currentQ.icon;
    document.getElementById("category-name").textContent = currentQ.category;
    document.getElementById("situation-text").textContent = currentQ.situation;

    const optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = "";

    // 선택지 버튼 생성
    currentQ.options.forEach((option) => {
        const btn = document.createElement("button");
        btn.className = "option-btn";
        btn.textContent = option.text;
        btn.addEventListener("click", () => handleSelectOption(option, currentQ.category));
        optionsContainer.appendChild(btn);
    });
}

function handleSelectOption(selectedOption, categoryName) {
    totalScore += selectedOption.score;

    if (selectedOption.restored) {
        restoredFeatures.push(categoryName);
    }

    // 프로그레스 바 업데이트
    const progressPercent = ((currentQuestionIndex + 1) / questionsData.length) * 100;
    document.getElementById("progress-bar-fill").style.width = `${progressPercent}%`;
    document.getElementById("restore-rate-text").textContent = `현재 복원율: ${totalScore}%`;

    currentQuestionIndex++;

    if (currentQuestionIndex < questionsData.length) {
        loadQuestion();
    } else {
        // 결과 데이터를 저장하고 결과 페이지로 이동
        const resultData = {
            totalScore: totalScore,
            restoredFeatures: restoredFeatures
        };
        localStorage.setItem("mission01_result", JSON.stringify(resultData));
        window.location.href = "result.html";
    }
}