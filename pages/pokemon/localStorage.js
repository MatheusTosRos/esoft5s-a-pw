
async function QuantidadeVisitas() {
    let contador = 1
    let ultimaData = new Date()

    if (localStorage !== null) {
        let visitaObject = { count: contador, data: ultimaData}

        if(localStorage.getItem('contador')) {
            contador = JSON.parse(localStorage.getItem('contador')).count + 1
            visitaObject.count = contador
        }

        var dataTratada = new Intl.DateTimeFormat('pt-BR', {
            dateStyle: 'short',
            timeStyle: 'short',
            timeZone: 'America/Belem',
        });

        localStorage.setItem('contador', JSON.stringify(visitaObject))
        localStorage.setItem('ultimaData', JSON.stringify(visitaObject))
   
        let qtdVisitas = document.getElementById('qtdAcessos')
        let contadorVisita = JSON.parse(localStorage.getItem('contador')).count
        qtdVisitas.innerHTML = "Está página foi visitada: " + contadorVisita + 
        " vezes. A Última visita foi: " + dataTratada.format(ultimaData)
    }
}

QuantidadeVisitas();