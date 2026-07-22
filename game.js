let currentQuestionIndex = 0;
let totalScore = 0;
let restoredFeatures = [];
let userLogs = [];

document.addEventListener("DOMContentLoaded", () => {
    loadQuestion();
    document.getElementById("next-btn").addEventListener("click", handleNextQuestion);
});

function loadQuestion() {
    const currentQ = questionsData[currentQuestionIndex];

    document.getElementById("question-count").textContent = `MISSION 0${currentQuestionIndex + 1} / 0${questionsData.length}`;
    document.getElementById("category-icon").textContent = currentQ.icon;
    document.getElementById("category-name").textContent = currentQ.category;
    document.getElementById("situation-text").textContent = currentQ.situation;

    const optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = "";

    currentQ.options.forEach((option) => {
        const btn = document.createElement("button");
        btn.className = "option-btn";
        btn.textContent = option.text;
        btn.addEventListener("click", () => handleSelectOption(option, currentQ));
        optionsContainer.appendChild(btn);
    });
}

function handleSelectOption(selectedOption, currentQ) {
    totalScore += selectedOption.score;

    if (selectedOption.restored) {
        restoredFeatures.push(currentQ.category);
    }

    userLogs.push({
        category: currentQ.category,
        icon: currentQ.icon,
        selectedText: selectedOption.text,
        score: selectedOption.score,
        reason: selectedOption.reason,
        type: selectedOption.type
    });

    const progressPercent = ((currentQuestionIndex + 1) / questionsData.length) * 100;
    document.getElementById("progress-bar-fill").style.width = `${progressPercent}%`;
    document.getElementById("restore-rate-text").textContent = `현재 복원율: ${totalScore}%`;

    showFeedbackModal(selectedOption, currentQ.category);
}

function showFeedbackModal(option, categoryName) {
    const modal = document.getElementById("feedback-modal");
    const badge = document.getElementById("feedback-badge");
    const title = document.getElementById("feedback-title");
    const reason = document.getElementById("feedback-reason");

    badge.className = `feedback-badge ${option.type}`;
    
    if (option.type === "best") {
        badge.textContent = "최선의 판단 (+20%)";
        title.textContent = `🎉 [${categoryName}] 기능이 복원되었습니다!`;
    } else if (option.type === "warn") {
        badge.textContent = "부분적 판단 (+10%)";
        title.textContent = `⚠️ [${categoryName}] 복원이 미흡합니다.`;
    } else {
        badge.textContent = "위험한 판단 (+0%)";
        title.textContent = `❌ [${categoryName}] 복원에 실패했습니다.`;
    }

    reason.textContent = option.reason;
    modal.classList.remove("hidden");
}

function handleNextQuestion() {
    document.getElementById("feedback-modal").classList.add("hidden");
    currentQuestionIndex++;

    if (currentQuestionIndex < questionsData.length) {
        loadQuestion();
    } else {
        const resultData = {
            totalScore: totalScore,
            restoredFeatures: restoredFeatures,
            userLogs: userLogs
        };
        localStorage.setItem("mission01_result", JSON.stringify(resultData));
        window.location.href = "result.html";
    }
}