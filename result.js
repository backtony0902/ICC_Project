document.addEventListener("DOMContentLoaded", () => {
    const rawData = localStorage.getItem("mission01_result");
    const resultData = rawData ? JSON.parse(rawData) : { totalScore: 0, restoredFeatures: [], userLogs: [] };

    const allCategories = [
        { name: "실종자 수색", icon: "🔭" },
        { name: "해양 구조", icon: "🛟" },
        { name: "불법조업 단속", icon: "🚢" },
        { name: "해양오염 대응", icon: "🛢" },
        { name: "해상교통 안전관리", icon: "⚓" }
    ];

    document.getElementById("final-score").textContent = `${resultData.totalScore}%`;

    const gradeBadge = document.getElementById("grade-badge");
    if (resultData.totalScore >= 90) {
        gradeBadge.textContent = "S등급: 완벽한 해상 지휘관";
        gradeBadge.className = "grade-badge s";
    } else if (resultData.totalScore >= 70) {
        gradeBadge.textContent = "A등급: 우수한 구조대원";
        gradeBadge.className = "grade-badge a";
    } else if (resultData.totalScore >= 50) {
        gradeBadge.textContent = "B등급: 보통의 현장 대응";
        gradeBadge.className = "grade-badge b";
    } else {
        gradeBadge.textContent = "C등급: 대응 체계 재점검 필요";
        gradeBadge.className = "grade-badge c";
    }

    const statusList = document.getElementById("status-list");
    statusList.innerHTML = "";
    allCategories.forEach(cat => {
        const isRestored = resultData.restoredFeatures.includes(cat.name);
        const li = document.createElement("li");
        li.className = "status-item";
        li.innerHTML = `
            <span>${cat.icon} ${cat.name}</span>
            <span class="status-tag ${isRestored ? 'on' : 'off'}">${isRestored ? 'ON (복구됨)' : 'OFF (마비)'}</span>
        `;
        statusList.appendChild(li);
    });

    const reviewList = document.getElementById("review-list");
    reviewList.innerHTML = "";
    
    if (resultData.userLogs) {
        resultData.userLogs.forEach(log => {
            const div = document.createElement("div");
            div.className = `review-item ${log.type}`;
            div.innerHTML = `
                <div class="review-header">
                    <span>${log.icon} ${log.category}</span>
                    <span>획득 점수: ${log.score}점</span>
                </div>
                <p class="review-reason">${log.reason}</p>
            `;
            reviewList.appendChild(div);
        });
    }

    document.getElementById("retry-btn").addEventListener("click", () => {
        window.location.href = "cover.html";
    });
});