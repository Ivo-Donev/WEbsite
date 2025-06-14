const startDate = new Date("2025-06-04T00:00:00");
const endDate   = new Date("2025-08-10T00:00:00");
const PIXEL_COUNT = 50;

const row = document.getElementById("pixel-row");

// Create pixel cells
for (let i = 0; i < PIXEL_COUNT; i++) {
    const cell = document.createElement("div");
    cell.className = "pixel-cell";
    row.appendChild(cell);
}

function updateProgress() {
    const now = new Date();
    const total = endDate - startDate;
    const passed = now - startDate;
    const percent = Math.min(Math.max(passed / total, 0), 1);
    const filledCount = Math.round(percent * PIXEL_COUNT);

    row.childNodes.forEach((cell, i) => {
        cell.classList.toggle("filled", i < filledCount);
    });
}

updateProgress();
setInterval(updateProgress, 60000); // Update every 1 min

window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (loader) {
        loader.style.opacity = "0";
        setTimeout(() => loader.style.display = "none", 500);
    }
});

