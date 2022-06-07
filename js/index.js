const form = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const result = document.getElementById("result");

let search = "";
let movies = [];
let bdd = {}

let creation = (pers, livres) => {
  for(var p = 1; p <= pers; p++) {
    bdd['P' + p] = {}
    for(var r = 1; r <= livres; r++){
      if (Math.random() < 0.5 ){
        bdd['P'+p]['R'+r] = 6 * Math.random() | 0 //attribution note au hazard
      }
    }
  }

}


let eucl_sim = (p1,p2,pref) => {
  var commun = Object.keys(pref[p1]).filter(k => pref[p2].hasOwnProperty(k))
  if (commun.length == 0) return 0
  var carres = commun.reduce( (a, v) => a + (pref[p1][v] - pref[p2][v])**2, 0 )
  return 1 / (1 + Math.sqrt(carres))
}


let meilleurs_critiques = (pers, pref, fnct_sim = eucl_sim) => {
  return Object.keys(pref).map(p => p != pers ? [p, fnct_sim(pers,p,pref)] : [p, -1]).sort((a,b) => b[1] - a[1]).slice(0,-1).join('\n')
}

let recommande = (pers, pref, fnct_sim = eucl_sim) => {
  let totaux = {}
  let sommeSim = {}
  for( var p in pref){
    if(p==pers) {continue}
    let sim = fnct_sim(pers, p, pref)
    if(sim == 0) {continue}
    for(var l in pref[p]){
      if(!pref[pers].hasOwnProperty(l)){
        totaux[l] = (totaux[l] || 0) + sim * pref[p][l]
        sommeSim[l] = (sommeSim[l] || 0) + sim
      }
    }
  }
  return Object.entries(totaux).map(([l, v ]) => [l, v / sommeSim[l]]).sort((a,b) => b[1] - a[1])
}





const fetchMovies = async () => {
  movies = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=c2fe0498488e40ce93fc845765f9e587&query=${search}`
  ).then((res) => res.json());
};






const moviesDisplay = async () => {
  await fetchMovies();

  movies.results.length = 12;

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
  //search = searchInput.value;
  //moviesDisplay();
  const create = creation(5,7);
  console.log(bdd)
  console.log(bdd['P1'])
  let mc = meilleurs_critiques('P1',bdd,eucl_sim)
  console.log(mc)
  let recommande_P1 = recommande('P1',bdd,eucl_sim)
  console.log(recommande_P1)
});
