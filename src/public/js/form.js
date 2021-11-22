var si = false;
const button = document.getElementById('Submit');
button.disabled = true;
const tiempoTranscurrido = Date.now();
const hoy = new Date(tiempoTranscurrido);
function sumar() {
    obj = document.formulario['form'];
    radios = document.formulario['radio1'];
    totalChecks = obj.length;
    totalSumado = 0;
    for (i = 0; i < totalChecks; i++) {
        if (obj[i].checked == true) {
            valor = obj[i].value.split('-');
            totalSumado = totalSumado + parseInt(valor[0], 10);
        }
    }
    if (totalSumado < 5) {
        si = 0;
    } else {
        si = 1;
    }
    document.getElementById('bool').value = si;
}

function validar() {
    radios = document.formulario['radio'];
    totalChecks = obj.length;
    totalSumado = 0;
    for (i = 0; i < totalChecks; i++) {
        if (radios[i].checked == true) {
            button.disabled = false;
        }
    }
}

function dia() {
    diah = hoy.getDate();
    mes = hoy.getMonth() + 1;
    anio = hoy.getFullYear();
    document.getElementById('day').value = diah + '-' + mes + '-' + anio;
}

function generate() {
    var loc = window.location;
    var pathName = loc.pathname.substring(0, loc.pathname.lastIndexOf('/') + 1);
    document.getElementById('link').value = 
    loc.href.substring(0, loc.href.length - ((loc.pathname + loc.search + loc.hash).length - pathName.length)) + 
    document.getElementById('day').value + '/' + 
    document.getElementById('user').value;
}