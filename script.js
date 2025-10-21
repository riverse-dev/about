const appGrid = document.getElementById("appGrid");
const yearSpan = document.getElementById("year");
const themeToggle = document.getElementById("themeToggle");

yearSpan.textContent = new Date().getFullYear();

fetch("apps.json")
    .then(res => res.json())
    .then(data => {
        data.forEach(app => {
            const card = document.createElement("div");
            card.className = "app-card";
            card.innerHTML = `
        <img src="${app.icon}" alt="${app.name}">
        <h3>${app.name}</h3>
        <p>${app.description || ""}</p>
        <a class="play-btn" href="${app.link}" target="_blank">Lihat di Google Play</a>
      `;
            appGrid.appendChild(card);
        });
    });

function applyTheme(theme) {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
}

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
    applyTheme(savedTheme);
} else {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        applyTheme("dark");
    }
}

themeToggle.addEventListener("click", () => {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
});
