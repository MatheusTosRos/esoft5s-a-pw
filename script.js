let procura = new URLSearchParams(location.search)
document.title = `Página do ${procura.get("name")}` 

const body = document.getElementById("body")
let pokemonImage = fetch()
