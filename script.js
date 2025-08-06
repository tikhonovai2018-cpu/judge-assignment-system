// URL вашего бэкенда (замените на реальный после деплоя)
const BACKEND_URL = "https://your-railway-app.up.railway.app";

// Загрузка судей
async function loadJudges() {
    try {
        const response = await fetch(`${BACKEND_URL}/judges`);
        const judges = await response.json();
        renderJudges(judges);
    } catch (error) {
        console.error("Ошибка загрузки:", error);
    }
}

// Отображение списка
function renderJudges(judges) {
    const list = document.getElementById("judgesList");
    list.innerHTML = judges.map(judge => `
        <li class="list-group-item">
            ${judge.name} <span class="badge bg-secondary">${judge.specialization}</span>
        </li>
    `).join("");
}

// Добавление судьи
document.getElementById("addJudgeForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("judgeName").value;
    const specialization = document.getElementById("judgeSpecialization").value;

    try {
        await fetch(`${BACKEND_URL}/judges`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, specialization })
        });
        loadJudges(); // Обновляем список
    } catch (error) {
        alert("Ошибка добавления!");
    }
});

// Инициализация
loadJudges();