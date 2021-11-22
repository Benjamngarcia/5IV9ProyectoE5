var si = false;
const button = document.getElementById('Submit');
button.disabled = true;
function sumar(){
    obj = document.formulario['form'];
    radios = document.formulario['radio1'];
    totalChecks = obj.length;
    totalSumado = 0;
    for( i=0; i<totalChecks; i++){ 
        if( obj[i].checked == true ){
            valor = obj[i].value.split('-');        
            totalSumado = totalSumado + parseInt(valor[0],10);
        }
    }
    if(totalSumado < 5){
        si = 0;
    }else{
        si = 1;
    }
    document.getElementById('bool').value=si;
}
function validar(){
    radios = document.formulario['radio'];
    totalChecks = obj.length;
    totalSumado = 0;
    for( i=0; i<totalChecks; i++){ 
        if (radios[i].checked == true) {
            button.disabled = false;
        }
    }
}