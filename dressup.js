// ============================================================
// 📌 [이미지 위치 설정 구역]
// 준비하신 이미지 경로(src, thumb)를 아래 데이터 형식에 맞춰 수정해주세요!
// - thumb: 선택창에 보이는 작은 썸네일
// - src: 캐릭터 위에 실제로 착용될 투명 PNG 이미지
// ============================================================

const clothesData = {
    // 1. 모자
    hat: [
        {
            id: 'hat_01',
            name: '해경 정모',
            thumb: 'images/thumb_hat_01.png', // 📌 [이미지 위치] 선택 버튼 썸네일
            src: 'images/hat_01.png'           // 📌 [이미지 위치] 캐릭터 착용 이미지
        },
        {
            id: 'hat_02',
            name: '기동모',
            thumb: 'images/thumb_hat_02.png',
            src: 'images/hat_02.png'
        }
    ],

    // 2. 상의
    top: [
        {
            id: 'top_01',
            name: '정복 상의',
            thumb: 'images/thumb_top_01.png',  // 📌 [이미지 위치]
            src: 'images/top_01.png'            // 📌 [이미지 위치]
        },
        {
            id: 'top_02',
            name: '기동복 상의',
            thumb: 'images/thumb_top_02.png',
            src: 'images/top_02.png'
        }
    ],

    // 3. 하의
    bottom: [
        {
            id: 'bottom_01',
            name: '정복 바지',
            thumb: 'images/thumb_bottom_01.png', // 📌 [이미지 위치]
            src: 'images/bottom_01.png'           // 📌 [이미지 위치]
        }
    ],

    // 4. 아우터
    outer: [
        {
            id: 'outer_01',
            name: '구조 조끼',
            thumb: 'images/thumb_outer_01.png',  // 📌 [이미지 위치]
            src: 'images/outer_01.png'           // 📌 [이미지 위치]
        }
    ],

    // 5. 신발
    shoes: [
        {
            id: 'shoes_01',
            name: '단화',
            thumb: 'images/thumb_shoes_01.png',  // 📌 [이미지 위치]
            src: 'images/shoes_01.png'           // 📌 [이미지 위치]
        }
    ],

    // 6. 악세서리
    acc: [
        {
            id: 'acc_01',
            name: '어깨 패치',
            thumb: 'images/thumb_acc_01.png',    // 📌 [이미지 위치]
            src: 'images/acc_01.png'             // 📌 [이미지 위치]
        }
    ]
};

// 현재 착용 상태 기억 변수
let currentEquipped = {
    hat: null,
    top: null,
    bottom: null,
    outer: null,
    shoes: null,
    acc: null
};

let currentTab = 'hat';

document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    renderItems(currentTab);
    initResetBtn();
});

// 탭 처리
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            currentTab = btn.dataset.category;
            renderItems(currentTab);
        });
    });
}

// 아이템 선택창 그리기
function renderItems(category) {
    const grid = document.getElementById('item-grid');
    grid.innerHTML = '';

    const items = clothesData[category] || [];

    if (items.length === 0) {
        grid.innerHTML = `<p style="color:var(--muted); grid-column: 1/-1; text-align:center; padding: 20px;">준비된 아이템이 없습니다.</p>`;
        return;
    }

    items.forEach(item => {
        const isEquipped = currentEquipped[category] === item.id;

        const card = document.createElement('div');
        card.className = `item-card ${isEquipped ? 'equipped' : ''}`;
        card.innerHTML = `
            <img src="${item.thumb}" alt="${item.name}" class="item-thumb" onerror="this.src='https://via.placeholder.com/60?text=No+Img'">
            <span class="item-name">${item.name}</span>
        `;

        card.addEventListener('click', () => toggleEquip(category, item));
        grid.appendChild(card);
    });
}

// 아이템 착용 / 해제 토글
function toggleEquip(category, item) {
    const layerImg = document.getElementById(`layer-${category}`);

    if (currentEquipped[category] === item.id) {
        // 이미 착용 중이면 벗기
        currentEquipped[category] = null;
        layerImg.src = '';
        layerImg.classList.add('hidden');
    } else {
        // 입히기
        currentEquipped[category] = item.id;
        layerImg.src = item.src;
        layerImg.classList.remove('hidden');
    }

    renderItems(category);
}

// 초기화 (전체 벗기)
function initResetBtn() {
    document.getElementById('reset-btn').addEventListener('click', () => {
        Object.keys(currentEquipped).forEach(cat => {
            currentEquipped[cat] = null;
            const layerImg = document.getElementById(`layer-${cat}`);
            if (layerImg) {
                layerImg.src = '';
                layerImg.classList.add('hidden');
            }
        });
        renderItems(currentTab);
    });
}