
// ====search area=====
const searchBtn = document.getElementById("search-btn");
const searchBox = document.getElementById("search-box");
document.getElementById("search-btn").addEventListener("click", () => {
    if(searchBox.value == ""){
        document.getElementById("hidden-area").style.display= "block";
    }
    else{
        document.getElementById("hidden-area").style.display= "none";
        infoFromServer(searchBox.value);
    }
})
// ====Api area===== 
const searchResult = document.getElementById("search-result")
function infoFromServer(searchData) {
    fetch(`https://api.lyrics.ovh/suggest/${searchData}`)
        .then(response => response.json())
        .then(json => displayMusicData(json))
}
// ======Diplaying search result====
function displayMusicData(data){
    searchResult.innerHTML = `
    ${data.data.map(music => `
    <div class="search-result row align-items-center my-3 p-3">                  
    <div class="col-md-9">
        <h3 class="lyrics-name">Title : ${music.title}</h3>
        <p class="author lead">Artist :<span> ${music.artist.name}</span></p>
        <p class="author lead">Album By<span> ${music.album.title}</span></p>
    </div>
    <div class="col-md-3 text-md-right text-center">
        <button data-artist="${music.artist.name}" data-musictitle="${music.title}" class="btn btn-success">Get Lyrics</button>
    </div>
</div> 
    `)
    .join('')}   `
}

searchResult.addEventListener('click', btn => {

    if (btn.target.innerHTML === 'Get Lyrics') {
        const artist = btn.target.getAttribute("data-artist");
        const musicTitle = btn.target.getAttribute("data-musictitle");
        getMusicLyrics(artist, musicTitle);
    }
})

// ======Music lyrics======

const lyricsContent = document.getElementById('lyrics-content');

async function getMusicLyrics(artistName, musicTitle) {
    const response = await fetch(`https://api.lyrics.ovh/v1/${artistName}/${musicTitle}`);
    const data = await response.json();

    const lyrics = data.lyrics;
    const lyricsResult = document.getElementById("lyrics-result");
    lyricsResult.style.display = "block";
    window.onclick = function (event) {
        if (event.target == lyricsResult) {
            lyricsResult.style.display = "none";
        }
    }
    if (lyrics == undefined){
        lyricsContent.innerHTML = `<h2><strong>${artistName}</strong> - ${musicTitle}</h2> <br/> <pre class="lyrics-text">Lyrics not Found!</pre>`;
    }
    else{
        lyricsContent.innerHTML = `<h2><strong>${artistName}</strong> - ${musicTitle}</h2> <br/> <pre class="lyrics-text">${lyrics}</pre>`;
    }
}