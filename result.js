document.addEventListener("DOMContentLoaded", () => {
    const rawData = sessionStorage.getItem("icc_answers");
    if (!rawData) {
        alert("테스트 기록이 없습니다. 메인으로 이동합니다.");
        location.href = "index.html";
        return;
    }

    const answers = JSON.parse(rawData);
    
    // 점수 및 복원율 계산 (총 100점 만점)
    const totalScore = answers.reduce((sum, item) => sum + item.score, 0);
    document.getElementById("final-score").textContent = `${totalScore}%`;

    // 등급 판정
    const gradeBadge = document.getElementById("grade-badge");
    if (totalScore === 100) {
        gradeBadge.textContent = "GRADE: 최고 지휘관 (Perfect)";
        gradeBadge.style.color = "#00ff88";
    } else if (totalScore >= 60) {
        gradeBadge.textContent = "GRADE: 현장 대응 요원 (Pass)";
        gradeBadge.style.color = "#4dd9ff";
    } else {
        gradeBadge.textContent = "GRADE: 재교육 필요 (Warning)";
        gradeBadge.style.color = "#ff3333";
    }

    // 오답 및 대응 분석 리포트 생성
    const reviewList = document.getElementById("review-list");
    reviewList.innerHTML = "";

    answers.forEach((ans, idx) => {
        const card = document.createElement("div");
        const isCorrect = ans.score > 0;
        
        card.className = `review-card ${isCorrect ? 'correct' : 'wrong'}`;
        card.innerHTML = `
            <div class="review-header">
                <span class="review-num">${ans.icon} [0${idx + 1}] ${ans.category}</span>
                <span class="review-status ${isCorrect ? 'pass' : 'fail'}">
                    ${isCorrect ? '✔ 복원 성공 (+20%)' : '✖ 판단 실패 (0%)'}
                </span>
            </div>
            <div class="review-body">
                <p class="user-choice"><strong>내가 내린 판단:</strong> ${ans.selectedText}</p>
                <div class="feedback-box ${isCorrect ? 'bg-pass' : 'bg-fail'}">
                    <strong>결과:</strong>
                    ${(ans.result || []).map(line => `<div class="result-line">${line}</div>`).join('')}
                </div>
            </div>
        `;
        reviewList.appendChild(card);
    });

    // 다시 하기 버튼
    const retryBtn = document.getElementById("retry-btn");
    if (retryBtn) {
        retryBtn.addEventListener("click", () => {
            sessionStorage.removeItem("icc_answers");
            location.href = "cover.html";
        });
    }
});