const startDate = new Date("2025-06-04");
const endDate = new Date("2025-08-10");
const totalPhotos = 50;
const revealedCount = getDayIndex();
const usedPositions = [];

function getDayIndex() {
    const now = new Date();
    const daysPassed = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
    return Math.min(daysPassed + 1, totalPhotos);
}

function getRandomNonOverlappingPosition(imgSize = 140, spacing = 20) {
    let attempts = 0;
    while (attempts < 200) {
        const x = Math.floor(Math.random() * (window.innerWidth - imgSize));
        const y = Math.floor(Math.random() * (window.innerHeight - imgSize - 120));
        const tooClose = usedPositions.some(pos => {
            const dx = pos.x - x;
            const dy = pos.y - y;
            return Math.abs(dx) < imgSize + spacing && Math.abs(dy) < imgSize + spacing;
        });
        if (!tooClose) {
            usedPositions.push({ x, y });
            return { x, y };
        }
        attempts++;
    }
    return { x: 0, y: 0 }; // fallback
}

function loadPhotos() {
    const container = document.getElementById("collage");

    for (let i = 1; i <= revealedCount; i++) {
        const img = new Image();
        img.src = `photos/${i}.jpg`;
        img.className = "photo-piece";

        const { x, y } = getRandomNonOverlappingPosition();
        img.style.left = `${x}px`;
        img.style.top = `${y}px`;

        const angle = (Math.random() - 0.5) * 20;
        img.style.transform = `rotate(${angle}deg)`;

        img.onerror = () => img.remove(); // remove broken ones
        container.appendChild(img);
    }
}

loadPhotos();
img.onload = () => console.log(`Loaded: ${img.src}`);
img.onerror = () => console.warn(`Missing: ${img.src}`);

