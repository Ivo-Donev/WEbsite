const API_KEY = 'AIzaSyAuETu2s8P8M2HV1E5tDL8Mt3EtboXE0UQ';
const PLAYLIST_ID = 'PL2Eh2CVp-NvocKH1ofYJqc7q4Y3G6YGyk';
const videoContainer = document.getElementById("video-container");
const songTitle = document.getElementById("song-title");

// Fetch playlist videos from YouTube
async function fetchPlaylistItems() {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${PLAYLIST_ID}&key=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.items;
}

// Pick one video based on the current date
function pickVideoOfTheDay(videos) {
    const today = new Date();
    const index = today.getFullYear() + today.getMonth() + today.getDate();
    return videos[index % videos.length]; // ensures a repeatable "random" pick
}

async function loadVideo() {
    try {
        const videos = await fetchPlaylistItems();
        const video = pickVideoOfTheDay(videos);
        const videoId = video.snippet.resourceId.videoId;
        const title = video.snippet.title;

        videoContainer.innerHTML = `
            <iframe width="560" height="315"
              src="https://www.youtube.com/embed/${videoId}"
              frameborder="0"
              allowfullscreen></iframe>`;
        songTitle.textContent = title;
    } catch (error) {
        console.error('Failed to load video:', error);
        songTitle.textContent = 'Could not load today’s song 😢';
    }// Hide loader and show main content with fade-in
    document.getElementById("loader").style.display = "none";
    document.querySelector(".main-content").classList.remove("hidden");
    document.querySelector(".main-content").classList.add("fade-in");

}

loadVideo();

window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (loader) {
        loader.style.opacity = "0";
        setTimeout(() => loader.style.display = "none", 500);
    }
});

