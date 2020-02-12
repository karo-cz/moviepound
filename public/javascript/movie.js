// let currentMovie = {
//     title = document.querySelector(".title").innerText;
//     currentMovie.imdbId = document.querySelector(".imdb-id").innerText;
//     currentMovie.releaseDate = document.querySelector(".release-date").innerText;
//     currentMovie.genre = document.querySelector(".title").innerText;
//     currentMovie.image = axiosCall.data.poster_path;
//     currentMovie.trailer = movieTrailer.data.results[0].key;
//     currentMovie.tmdb_id = document.querySelector(".tmdb-id").innerText;
// }

// function addMovieLog() {
//     axios
//         .post("http://localhost:3000/movielog", {
//             currentMovie
//         })
//         .then(response => {
//             document.querySelector(".movielog").innerText = "Added to your log";
//         })
//         .catch(err => {
//             console.log(err);
//         });
// }

// document.querySelector(".movielog").onclick = addMovieLog;

// function addWishlist() {
//     axios
//         .post("http://localhost:3000/wishlist", {
//             currentMovie
//         })
//         .then(response => {
//             document.querySelector(".wishlist").innerText = "Added for later";
//         })
//         .catch(err => {
//             console.log(err);
//         });
// }

// document.querySelector(".wishlist").onclick = addWishlist;
