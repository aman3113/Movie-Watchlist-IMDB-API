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
    genere: "",
    plot: "",
  };
  let url = `
  http://www.omdbapi.com/?t=${text}&apikey=c1f8d76a
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
            <span><img src="images/add icon.png" id="add-movie" onclick="addMovie()" />Watchlist</span>
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
      dataEl.genere = data.Genre;
      dataEl.plot = data.Plot;
    });
  console.log(dataEl);
  if (!myList.includes(dataEl)) {
    myList.push(dataEl);
  }

  localStorage.setItem("myList", JSON.stringify(myList));
  //   function addMovie() {
  //     myList.push(dataEl);
  //     localStorage.setItem("myList", JSON.stringify(myList));
  //   }
});

console.log(myList);
