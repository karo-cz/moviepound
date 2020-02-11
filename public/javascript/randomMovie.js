async function getAMovie() {
  let randomMovieId = Math.floor(Math.random() * 672000 + 1);
  console.log(randomMovieId);

  try {
    const axiosCall = await axios.get(
      `https://api.themoviedb.org/3/movie/${randomMovieId}?api_key=6cca41f7f8c15f95a4d4a11b0fae6429`
    );

    console.log(axiosCall);
    console.log(axiosCall.data.original_title);

    const movieTrailer = await axios.get(
      `http://api.themoviedb.org/3/movie/${randomMovieId}/videos?api_key=6cca41f7f8c15f95a4d4a11b0fae6429`
    );

    console.log(movieTrailer);

    if (!movieTrailer.data.results.length) {
      return getAMovie();
    }

    // Display title
    document.querySelector(".movie-title").innerText =
      axiosCall.data.original_title;

    // Display description
    document.querySelector(".movie-overview").innerText =
      axiosCall.data.overview;

    // Display trailer
    document
      .querySelector(".trailer")
      .setAttribute(
        "src",
        `https://www.youtube.com/embed/${movieTrailer.data.results[0].key}`
      );
  } catch (error) {
    if (error) return getAMovie();
    // console.log(error);
  }
}

getAMovie();

// axios
//   .get(
//     `http://api.themoviedb.org/3/movie/${randomMovieId}/videos?api_key=6cca41f7f8c15f95a4d4a11b0fae6429`
//   )

// axios
//   .get(
//     `https://api.themoviedb.org/3/movie/${randomMovieId}?api_key=6cca41f7f8c15f95a4d4a11b0fae6429`
//   )
//   .then(res => {
//     const data = res.data;
//     console.log(res);
//     if (!res) {
//       console.log("Here");
//     }
//   })
//   .catch(err => {
//     console.log("ERRRRROOOOOOOOR", err);
//   });

// axios
//   .get(
//     `https://api.themoviedb.org/7/movie/${randomMovieId}?api_key=6cca41f7f8c15f95a4d4a11b0fae6429`
//   )
//   .then(response => {
//     console.log(response);
// if(response.status_code !== 200){

// }

// axios
//   .get(
//     `http://api.themoviedb.org/3/movie/${randomMovieId}/videos?api_key=6cca41f7f8c15f95a4d4a11b0fae6429`
//   )
//   .then(response => {
//     console.log(response.data.results[0].key);
//   });
//   });
//   .catch(err => {
//     console.log(err);
//   });

//                 axios.get(
//                     `https://api.themoviedb.org/3/movie/${movieDocument.omdbId}?api_key=945edfeb81929f1fb50b3191c1073571`
//                 )
//                 .then(response => {
//                     // console.log(response);
//                     let movieDetails = response.data;
//                     axios
//                         .get(
//                             `http://api.themoviedb.org/3/movie/${movieDocument.omdbId}/videos?api_key=945edfeb81929f1fb50b3191c1073571`
//                         )
//                         .then(response => {
//                             // console.log(response.data.results[0].key);
//                             let trailerId = "https://www.youtube.com/watch?v=aDm5WZ3QiIE";
//                             if (response.data.results[0]) {
//                                 trailerId = `https://www.youtube.com/watch?v=${response.data.results[0].key}`;
//                             }
//                             Movie.updateOne(
//                                 { omdbId: movieDocument.omdbId },
//                                 {
//                                     releaseDate: movieDetails.release_date,
//                                     genre: movieDetails.genres,
//                                     image: `https://image.tmdb.org/t/p/w1280${movieDetails.poster_path}`,
//                                     trailer: trailerId
//                                 }
//                             )
//                                 .then(response => {
//                                     console.log("movie done: ", response);
//                                     // console.log(movieDetails.genres);
//                                     movieDetails.genres.forEach(genre => {
//                                         Hashtag.updateOne(
//                                             { tag: genre.name },
//                                             { $push: { movies: movieDocument._id } }
//                                         ).then(response => {
//                                             // hashtagDocument.movies.push(movieDocument._id);
//                                             // console.log(response);
//                                         });
//                                     });
//                                 })

//                                 .catch(err => console.log(err));
//                         })
//                         .catch(err => console.log(err));
//                 })
//                 .catch(err => console.log(err));
//         })
//         .catch(err => console.log(err));
// });
