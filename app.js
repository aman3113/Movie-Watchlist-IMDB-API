let inputEl = document.getElementById("input-el");
let searchBtn = document.querySelector("#search-el");
let displayEl = document.querySelector(".display-container");
let text = "";
let myList = [];

searchBtn.addEventListener("click", function () {
  let inputStr = inputEl.value.split(" ");
  text = inputStr.join("+");
  let dataEl = {
    poster: "",
    title: "",
    rating: "",
    runTime: "",
    genre: "",
    plot: "",
  };
  let url = `
  http://www.omdbapi.com/?s=${text}&apikey=c1f8d76a
  `;

  console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      let html = "";
      html = `
    <div class="movie-item">
        <div class="movie-poster">
          <img src="${data.Poster}" />
        </div>
        <div class="movie-about">
          <div class="title">
            <span><h3>${data.Title}</h3></span>
            <span>⭐${data.imdbRating}</span>
          </div>
          <div class="type">
            <span>${data.Runtime}</span>
            <span>${data.Genre}</span>
            <span><img src="images/add icon.png" id="add-movie" />Watchlist</span>
          </div>
          <div class="plot">${data.Plot}</div>
        </div>
      </div>
      <div class="break"></div>
    `;
      displayEl.innerHTML = html;

      dataEl.poster = data.Poster;
      dataEl.title = data.Title;
      dataEl.rating = data.imdbRating;
      dataEl.runTime = data.Runtime;
      dataEl.genre = data.Genre;
      dataEl.plot = data.Plot;

      document
        .getElementById("add-movie")
        .addEventListener("click", function () {
          if (!myList.find(({ title }) => title === data.Title)) {
            myList.push(dataEl);
            console.log(true);
          }

          localStorage.setItem("myList", JSON.stringify(myList));
        });
    });
  console.log(dataEl);
});

console.log(myList);
