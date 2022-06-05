const form = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const result = document.getElementById("result");

let search = "";
let movies = [];

const fetchMovies = async () => {
  movies = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=c2fe0498488e40ce93fc845765f9e587&query=${search}`
  ).then((res) => res.json());
  console.log(1);
  console.log(movies);
};

const moviesDisplay = async () => {
  await fetchMovies();

  //movies.results.length = 12;

  result.innerHTML = movies.results
    .map(
      (movie) =>
        `
      <li>
        <h2>${movie.title}</h2>
        <div class="card-content">
          <img src=${movie.image}></img>
        </div>
      </li>
    `
    )
    .join("");
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  search = searchInput.value;
  moviesDisplay();
});
