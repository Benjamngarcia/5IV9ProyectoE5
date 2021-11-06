function generador(){
    let nombre, appat, apmat, cumple, nombreAr, appatAr, apmatAr, cumpleAr
    nombre = document.getElementById('nombre').value;
    appat = document.getElementById('appat').value;
    apmat = document.getElementById('apmat').value;
    cumple = document.getElementById('date').value;
    
    nombreAr = [nombre];
    appatAr = [appat];
    apmatAr = [apmat];
    cumpleAr = [cumple];

    console.log(nombreAr, appatAr, apmatAr, cumpleAr);
}