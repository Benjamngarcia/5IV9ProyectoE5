function generate(){
    var c1 = document.getElementById('nom_alum').value.charAt(0).toUpperCase();
    var c2 = document.getElementById('appat_alum').value.charAt(0).toUpperCase();
    var c3 = document.getElementById('apmat_alum').value.charAt(0).toUpperCase();
    var c4 = document.getElementById('cumple_alum').value.charAt(0) + document.getElementById('cumple_alum').value.charAt(1) + document.getElementById('cumple_alum').value.charAt(2) + document.getElementById('cumple_alum').value.charAt(3);
    var c5 = document.getElementById('nom_alum').value.charAt(1).toUpperCase() + document.getElementById('nom_alum').value.charAt(2);
    var c6 = document.getElementById('appat_alum').value.charAt(1) + document.getElementById('apmat_alum').value.charAt(2);
    var c7 = document.getElementById('apmat_alum').value.charAt(1) + document.getElementById('appat_alum').value.charAt(3).toUpperCase()
    var c8 = document.getElementById('cumple_alum').value.charAt(5) + document.getElementById('cumple_alum').value.charAt(6) + document.getElementById('cumple_alum').value.charAt(8) + document.getElementById('cumple_alum').value.charAt(9);
    var c9 = document.getElementById('fecha_ins').value.charAt(0) + document.getElementById('fecha_ins').value.charAt(1) + document.getElementById('fecha_ins').value.charAt(2) + document.getElementById('fecha_ins').value.charAt(3);
    console.log(document.getElementById('cumple_alum').value);
    document.getElementById('matricula_alum').value = c1+c2+c3+c4;
    document.getElementById('pass_alum').value = c5+c6+c7+c8+c9;
}