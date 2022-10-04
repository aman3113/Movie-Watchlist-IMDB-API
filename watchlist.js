let displayEl = document.querySelector(".display-container");

function allStorage() {
  let idList = [];
  for (var i = 0; i < localStorage.length; i++) {
    idList[i] = localStorage.getItem(localStorage.key(i));
  }
  return idList;
}

function templateGenerator(data) {
  displayEl.innerHTML += `
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
          <span><button class="add-movie" id="${data.imdbID}"><img src="images/remove icon.png"  />Remove</button></span>
        </div>
        <div class="plot">${data.Plot}</div>
      </div>
    </div>
    <div class="break"></div>
  `;
}

let id = allStorage();
// let myIdList = [];
id.forEach((id) => {
  let url = ` https://www.omdbapi.com/?i=${id}&apikey=a3a84389`;
  fetch(url)
    .then((res) => res.json())
    .then((movie) => {
      templateGenerator(movie);

      const watchListButton = document.querySelectorAll(".add-movie");
      watchListButton.forEach((btn) =>
        btn.addEventListener("click", function () {
          btn.textContent = "Removed";
          btn.style.backgroundColor = "Red";
          btn.style.Color = "Black";
          window.localStorage.removeItem(this.id);
        })
      );

      //
    });
});
