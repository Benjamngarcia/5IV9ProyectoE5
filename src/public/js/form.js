var si = false;
function sumar(){
    obj = document.formulario['form'];
    totalChecks = obj.length;
    totalSumado = 0;
    for( i=0; i<totalChecks; i++){ 
        if( obj[i].checked == true ){
            valor = obj[i].value.split('-');        
            totalSumado = totalSumado + parseInt(valor[0],10);
        }
    }
    if(totalSumado < 4){
        si = 0;
    }else{
        si = 1;
    }
    document.getElementById('bool').value=si;
}