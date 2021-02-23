//Define las letiables que necesites
let pasados, futuros, hoy, eventos = [],
    pasadosInicio, futurosInicio;

$(document).ready(function() {
    //Carga los datos que estan en el JSON (info.json) usando AJAX
    $.ajax({
        url: "info.json"
    }).done(function(resultado) {
        //Guarda el resultado en letiables
        hoy = resultado.fechaActual;
        eventos = resultado.eventos;

        //Clasifica los eventos pasados y proximos segun la fecha actual del JSON
        pasados = eventos.filter((x) => x.fecha < hoy)
        futuros = eventos.filter((x) => x.fecha > hoy)

        //console.log(pasados, futuros)

        //Ordena los eventos segun la fecha (los mas cercanos primero)
        pasados.sort(function(a, b) {
            a = new Date(a.fecha);
            b = new Date(b.fecha);
            return a > b ? -1 : a < b ? 1 : 0;
        });
        //Extrae solo dos eventos
        pasadosInicio = pasados.slice(0, 2);

        //Ordena los eventos segun la fecha (los mas cercanos primero)
        futuros.sort(function(a, b) {
            a = new Date(a.fecha);
            b = new Date(b.fecha);
            return a < b ? -1 : a > b ? 1 : 0;
        });
        //Extrae solo dos eventos
        futurosInicio = futuros.slice(0, 2);

        //Crea un string que contenga el HTML que describe el detalle del evento
        let htmlPasados = "";
        //Recorre el arreglo y concatena el HTML para cada evento
        for (let i = 0; i < pasadosInicio.length; i++) {
            htmlPasados += `
              <div class="col-md-6">
                <div class="card flex-md-row mb-4 h-md-250">
                  <div class="card-body d-flex flex-column align-items-start">
                    <h3 class="mb-0">
                    <a href="detalle.html?id=${pasadosInicio[i].id}">${pasadosInicio[i].nombre}</a>
                    </h3>
                    <div class="mb-1 text-muted">${pasadosInicio[i].fecha}</div>
                      <p class="card-text mb-auto">${pasadosInicio[i].descripcion}</p>
                  </div>
                </div>
              </div>`
        }
        //Modifica el DOM agregando el html generado
        document.getElementById("pasados").innerHTML = htmlPasados;

        //Crea un string que contenga el HTML que describe el detalle del evento
        let htmlFuturos = "";
        //Recorre el arreglo y concatena el HTML para cada evento
        for (let j = 0; j < futurosInicio.length; j++) {
            htmlFuturos += `
              <div class="col-md-6">
                <div class="card flex-md-row mb-4 h-md-250">
                  <div class="card-body d-flex flex-column align-items-start">
                    <h3 class="mb-0">
                    <a href="detalle.html?id=${futurosInicio[j].id}">${futurosInicio[j].nombre}</a>
                    </h3>
                    <div class="mb-1 text-muted">${futurosInicio[j].fecha}</div>
                      <p class="card-text mb-auto">${futurosInicio[j].descripcion}</p>
                  </div>
                </div>
              </div>`
        }
        //Modifica el DOM agregando el html generado
        document.getElementById("proximos").innerHTML = htmlFuturos;


    });

});