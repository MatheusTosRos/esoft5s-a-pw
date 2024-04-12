function Footer() {

    let data = new Date()
    let qtd = 0

    let contador = localStorage.setItem("count", (qtd))
    let visita = localStorage.setItem("Last visit", new Intl.DateTimeFormat('pt-BR').format(data))

    let elementoPai = document.getElementsByClassName("footer-content")
    let infoFooter = document.createElement("p")
    infoFooter.innerHTML = (`${localStorage.getItem(JSON.stringify(qtd))} , ${localStorage.getItem(JSON.stringify(visita))}`)
    elementoPai.appendChild(infoFooter)
}

Footer()