//Define las variables que necesites
var pasados = [];
var hoy;
var eventos;

$(document).ready(function() {
    //Carga los datos que estan en el JSON (info.json) usando AJAX
    $.ajax({
        url: "info.json"
    }).done(function(resultado) {

        //Guarda el resultado en variables
        hoy = resultado.fechaActual;
        eventos = resultado.eventos;

        //Selecciona los eventos que sean anteriores a la fecha actual del JSON
        for (var i = 0; i < eventos.length; i++) {
            if (eventos[i].fecha < hoy) {
                pasados.push(eventos[i]);
            }
        }

        //Ordena los eventos segun la fecha (los mas recientes primero)
        pasados = pasados.sort(function(x, y) {
            if (x.fecha < y.fecha) {
                return 1;
            }
            return -1;
        });

        //Crea un string que contenga el HTML que describe el detalle del evento
        var html = ""

        //Recorre el arreglo y concatena el HTML para cada evento
        for (var j = 0; j < pasados.length; j++) {
            html += `
            <div class="col-md-6">
              <div class="card flex-md-row mb-4 h-md-250">
                <div class="card-body d-flex flex-column align-items-start">
                  <h3 class="mb-0">
                  <a href="detalle.html?id=${pasados[j].id}">${pasados[j].nombre}</a>
                  </h3>
                  <div class="mb-1 text-muted">${pasados[j].fecha}</div>
                    <p class="card-text mb-auto">${pasados[j].descripcion}</p>
                </div>
              </div>
            </div>`
        }

        //Modifica el DOM agregando el html generado
        document.getElementById("pasados").innerHTML = html

    })

});