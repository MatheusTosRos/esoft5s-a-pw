let procura = new URLSearchParams(location.search)
document.title = `Página do ${procura.get("nome")}`

const body = document.getElementById("body")

async function BuscarImagem(){
    const pokemonImage = await fetch("https://pokeapi.co/api/v2/pokemon/" + procura.get("nome"))

    const dadosPokemon = await pokemonImage.json()
    dadosPokemon.sprites.front_default

    let imagem = document.getElementById("imgBuscada")
    imagem.src = dadosPokemon.sprites.front_default
    imagem.alt = procura.get("nome")

    let info = document.getElementById("informacoes")
    let strongElement = document.createElement("strong");
    strongElement.innerHTML = `Informações sobre: ${procura.get("nome")}`
    info.appendChild(strongElement);

    let elementoPai = document.getElementById("header")

    let titulo = document.createElement("h1")
    titulo.innerHTML = `${procura.get("nome")}`
    elementoPai.appendChild(titulo)

}

BuscarImagem()