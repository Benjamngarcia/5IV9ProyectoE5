function SoloLetras(e){ //FUNCIÓN PARA SOLO PERMITIR LA ESCRITURA DE LETRAS
    key = e.keyCode || e.which;
    let teclado = String.fromCharCode(key);
    let letras = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
    let letrasch= "abcdefghijklmnñopqrstuvwxyz";
    let especiales = "8-37-38-46-164";
    let teclado_especial = false;

    for(var i in especiales){
        if(key==especiales[i]){
            teclado_especial = true;
        }
    }
    if(letras&&letrasch.indexOf(teclado)==-1 && !teclado_especial){
        return false;
    }
}
function SoloNumeros(e){ //FUNCIÓN PARA SOLO PERMITIR LA ESCRITURA DE NÚMEROS
    key = e.keyCode || e.which;
    let teclado = String.fromCharCode(key);
    let numero = "0123456789"
    let especiales = "8-37-38-46";
    let teclado_especial = false;

    for(var i in especiales){
        if(key==especiales[i]){
            teclado_especial = true;
        }
    }
    if(numero.indexOf(teclado)==-1 && !teclado_especial){
        return false;
    }
}
function validarContacto(){ //FUNCIÓN PARA VALIDAR FORMULARIO DE CONTACTO
    let asunto, email, mensaje, correoElec, letras;
    asunto = document.getElementById('asunto').value;
    email = document.getElementById('email').value;
    mensaje = document.getElementById('mensaje').value;

    correoElec = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    letras = /[a-zA-Z]/;

    if(asunto === "" || email ==="" || mensaje ==="" || asunto === " " || email ===" " || mensaje ===" " ){
        swal('Advertencia','Para enviar el mensaje es necesario que todos los campos estén llenos','error');
        return false;
    }
    else if(asunto.length>30){
        swal('Advertencia','El asunto es demasiado largo','warning');
        return false;
    }
    else if(!letras.test(asunto)){
        swal('Advertencia','Ingresa unicamente letras en el asunto.','warning');
        return false;
    }
    else if (email.length>50){
        swal('Advertencia','El correo electónico es muy largo.','warning');
        return false;
    }
    else if(!correoElec.test(email)){
        swal('Advertencia','El correo no es un formato válido, prueba insertar otro.','warning');
        return false;
    }
    else if (mensaje.length>500){
        swal('Advertencia','El mensaje solo debe tener máximo 500 caracteres.','warning');
        return false;
    }
}

function validarLoginAlum(){ //FUNCIÓN PARA VALIDAR LOGIN DEL ALUMNO
    let matricula, password, letras, passwordChar;
    matricula = document.getElementById('matricula').value;
    password = document.getElementById('password').value;

    letras = /[a-zA-Z0-9]/;
    passwordChar = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/; //Mínimo ocho caracteres, al menos una letra mayúscula, una letra minúscula y un número

    if(matricula === "" || password ==="" || matricula === " " || password ===" " ){
        swal('Advertencia','Para iniciar sesión es necesario que todos los campos estén llenos','error');
        return false;
    }
    else if(matricula.length>15){
        swal('Advertencia','La matrícula es demasiada larga','warning');
        return false;
    }
    else if(!letras.test(matricula)){
        swal('Advertencia','Ingresa el formato correcto de la matrícula.','warning');
        return false;
    }
    else if (password.length>20){
        swal('Advertencia','La contraseña es muy larga','warning');
        return false;
    }
}

function validarLogin(){ //FUNCIÓN PARA VALIDAR LOGIN DE LOS OTROS 3 USUARIOS
    let email, password, correoElec, passwordChar;
    email = document.getElementById('email').value;
    password = document.getElementById('password').value;

    correoElec = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    passwordChar = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/; //Mínimo ocho caracteres, al menos una letra mayúscula, una letra minúscula y un número

    if(email === "" || password ==="" || email === " " || password ===" " ){
        swal('Advertencia','Para iniciar sesión es necesario que todos los campos estén llenos','error');
        return false;
    }
    else if(email.length>30){
        swal('Advertencia','El correo es demasiado largo','warning');
        return false;
    }
    else if(!correoElec.test(email)){
        swal('Advertencia','Ingresa el formato correcto del correo','warning');
        return false;
    }
    else if (password.length>20){
        swal('Advertencia','La contraseña es muy larga','warning');
        return false;
    }
}

function validarTutor(){ //VALIDA LOS FORMULARIOS QUE CORRESPONDEN AL TUTOR
    let nombre, appat, apmat, parentezco,letras;
    nombre = document.getElementById('nombre').value;
    appat = document.getElementById('appat').value; 
    apmat = document.getElementById('apmat').value; 
    parentezco = document.getElementById('parentezco').value;

    letras = /[a-zA-Z]/;

    if(nombre===""|| appat===""|| apmat===""|| parentezco==="" || nombre===" "|| appat===" "|| apmat===" "|| parentezco===" "){
        swal('Advertencia','Para registrar es necesario que todos los campos estén llenos','error');
        return false;
    }
    else if(nombre.length>30){
        swal('Advertencia','El nombre es demasiado largo','warning');
        return false;
    }
    else if(!letras.test(nombre)){
        swal('Advertencia','Ingresa solo letras en el nombre.','warning');
        return false;
    }
    else if(appat.length>20){
        swal('Advertencia','El apellido paterno es demasiado largo','warning');
        return false;
    }
    else if(!letras.test(appat)){
        swal('Advertencia','Ingresa solo letras en el apelldio paterno.','warning');
        return false;
    }
    else if(apmat.length>20){
        swal('Advertencia','El apellido materno es demasiado largo','warning');
        return false;
    }
    else if(!letras.test(apmat)){
        swal('Advertencia','Ingresa solo letras en el apellido materno.','warning');
        return false;
    }
    else if(parentezco.length>10){
        swal('Advertencia','El parentezco es demasiado largo','warning');
        return false;
    }
    else if(!letras.test(parentezco)){
        swal('Advertencia','Ingresa solo letras en el parentezco.','warning');
        return false;
    }
}

function validarTutorDir(){ //VALIDA LOS FORMULARIOS QUE CORRESPONDEN AL TUTOR Y TIENEN DIRECCION
    let nombre, appat, apmat, parentezco, calle, colonia, alcaldia, codigop, letras,letrasnum;
    nombre = document.getElementById('nombre').value;
    appat = document.getElementById('appat').value; 
    apmat = document.getElementById('apmat').value; 
    calle = document.getElementById('calle').value;
    colonia = document.getElementById('colonia').value; 
    codigop = document.getElementById('codigop').value; 
    alcaldia = document.getElementById('alcaldia').value;

    letras = /[a-zA-Z]/;
    letrasnum = /[a-zA-Z0-9]/;

    if(nombre===""|| appat===""|| apmat===""|| parentezco==="" || calle===""|| colonia===""|| codigop===""|| alcaldia==="" || nombre===" "|| appat===" "|| apmat===" "|| parentezco===" "|| calle===" "|| colonia===" "|| codigop===" "|| alcaldia===" "){
        swal('Advertencia','Para registrar es necesario que todos los campos estén llenos','error');
        return false;
    }
    else if(nombre.length>30){
        swal('Advertencia','El nombre es demasiado largo','warning');
        return false;
    }
    else if(!letras.test(nombre)){
        swal('Advertencia','Ingresa solo letras en el nombre.','warning');
        return false;
    }
    else if(appat.length>20){
        swal('Advertencia','El apellido paterno es demasiado largo','warning');
        return false;
    }
    else if(!letras.test(appat)){
        swal('Advertencia','Ingresa solo letras en el apelldio paterno.','warning');
        return false;
    }
    else if(apmat.length>20){
        swal('Advertencia','El apellido materno es demasiado largo','warning');
        return false;
    }
    else if(!letras.test(apmat)){
        swal('Advertencia','Ingresa solo letras en el apellido materno.','warning');
        return false;
    }
    else if(parentezco.length>10){
        swal('Advertencia','El parentezco es demasiado largo','warning');
        return false;
    }
    else if(!letras.test(parentezco)){
        swal('Advertencia','Ingresa solo letras en el parentezco.','warning');
        return false;
    }
    else if(calle.length>40){
        swal('Advertencia','La calle es demasiado larga','warning');
        return false;
    }
    else if(!letrasnum.test(calle)){
        swal('Advertencia','Ingresa solo letras y numeros en la calle','warning');
        return false;
    }
    else if(colonia.length>40){
        swal('Advertencia','La colonia es demasiado larga','warning');
        return false;
    }
    else if(!letrasnum.test(colonia)){
        swal('Advertencia','Ingresa solo letras y numeros en la colonia','warning');
        return false;
    }
    else if(codigop.length>40){
        swal('Advertencia','El código postal es demasiado largo','warning');
        return false;
    }
    else if(!letrasnum.test(codigop)){
        swal('Advertencia','Ingresa solo letras y numeros en el código postal','warning');
        return false;
    }
    else if(alcaldia.length>40){
        swal('Advertencia','La alcaldía es demasiado larga','warning');
        return false;
    }
    else if(!letrasnum.test(alcaldia)){
        swal('Advertencia','Ingresa solo letras y numeros en la alcaldía/municipio','warning');
        return false;
    }
}

function validarAlum(){
    let nombre, appat, apmat, telefono, matricula, email, password, grupo, inscripcion,
    correoElec, letras, numeros, passwordChar, calleChar;
    nombre = document.getElementById('nombre').value;
    appat = document.getElementById('appat').value; 
    apmat = document.getElementById('apmat').value; 
    telefono = document.getElementById('telefono').value;
    matricula = document.getElementById('matricula').value;
    email = document.getElementById('email').value;
    password = document.getElementById('contraseña').value;
    grupo = document.getElementById('grupo').value;

    correoElec = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    letras = /[a-zA-Z]/;
    numeros = /[0-9]/;
    passwordChar = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/; //Mínimo ocho caracteres, al menos una letra mayúscula, una letra minúscula y un número
    calleChar = /[a-zA-z0-9]/;

    if(nombre==""|| appat===""|| apmat==""|| telefono===""|| matricula === "" || email ==="" || password ==="" || grupo === "" || 
    nombre==" "|| appat===" "|| apmat==" "|| telefono===" "|| matricula === " " || email ===" " || password ===" " || grupo === " "){
        swal('Advertencia','Para registrar es necesario que todos los campos estén llenos','error');
        return false;
    }
    else if(nombre.length>30){
        swal('Advertencia','El nombre es demasiado largo','warning');
        return false;
    }
    else if(!letras.test(nombre)){
        swal('Advertencia','Ingresa solo letras en el nombre.','warning');
        return false;
    }
    else if(appat.length>20){
        swal('Advertencia','El apellido paterno es demasiado largo','warning');
        return false;
    }
    else if(!letras.test(appat)){
        swal('Advertencia','Ingresa solo letras en el apelldio paterno.','warning');
        return false;
    }
    else if(apmat.length>20){
        swal('Advertencia','El apellido materno es demasiado largo','warning');
        return false;
    }
    else if(!letras.test(apmat)){
        swal('Advertencia','Ingresa solo letras en el apellido materno.','warning');
        return false;
    }
    else if(telefono.length>10){
        swal('Advertencia','El telefono es demasiado largo','warning');
        return false;
    }
    else if(!numeros.test(telefono)){
        swal('Advertencia','Ingresa solo números en el telefono.','warning');
        return false;
    }
    else if(matricula.length>15){
        swal('Advertencia','La matrícula es demasiada larga','warning');
        return false;
    }
    else if(!calleChar.test(matricula)){
        swal('Advertencia','Ingresa el formato correcto de la matrícula.','warning');
        return false;
    }
    else if (email.length>50){
        swal('Advertencia','El correo electónico es muy largo.','warning');
        return false;
    }
    else if(!correoElec.test(email)){
        swal('Advertencia','El correo no es un formato válido, prueba insertar otro.','warning');
        return false;
    }
    else if (password.length>20){
        swal('Advertencia','La contraseña es muy larga','warning');
        return false;
    }
    else if(!passwordChar.test(password)){
        swal('Advertencia','La contraseña tiene que tener Mínimo ocho caracteres, al menos una letra mayúscula, una letra minúscula y un número','warning');
        return false;
    }
    else if (grupo.length>5){
        swal('Advertencia','El grupo es muy largo','warning');
        return false;
    }
}

function validarRegistroTeach(){
    let nombre, appat, apmat, calle, colonia, alcaldia,codigop, rfc, nss, telefono, email, password, 
    correoElec, letras, numeros, passwordChar, calleChar;
    nombre = document.getElementById('nombre').value;
    appat = document.getElementById('appat').value; 
    apmat = document.getElementById('apmat').value; 
    telefono = document.getElementById('telefono').value;
    calle = document.getElementById('calle').value;
    colonia = document.getElementById('colonia').value;
    alcaldia = document.getElementById('alcaldia').value;
    codigop = document.getElementById('codigop').value;
    rfc = document.getElementById('rfc').value;
    nss = document.getElementById('nss').value;
    email = document.getElementById('emailprof').value;
    password = document.getElementById('pass_prof').value;

    correoElec = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    letras = /[a-zA-Z]/;
    numeros = /[0-9]/;
    passwordChar = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/; //Mínimo ocho caracteres, al menos una letra mayúscula, una letra minúscula y un número
    calleChar = /[a-zA-z0-9]/;

    if(nombre==""|| appat===""|| apmat==""|| calle===""|| colonia===""|| alcaldia===""||codigop === ""|| rfc===""|| nss===""|| telefono===""|| matricula === "" || email ==="" || password ==="" 
    || nombre==" "|| appat===" "|| apmat==" "|| calle===" "|| colonia===" "|| alcaldia===" "||codigop ===" "|| rfc===" "|| nss===" "|| telefono===" "|| matricula === " " || email ===" " || password ===" " ){
        swal('Advertencia','Para registrar es necesario que todos los campos estén llenos','error');
        return false;
    }
    else if(nombre.length>30){
        swal('Advertencia','El nombre es demasiado largo','warning');
        return false;
    }
    else if(!letras.test(nombre)){
        swal('Advertencia','Ingresa solo letras en el nombre.','warning');
        return false;
    }
    else if(appat.length>20){
        swal('Advertencia','El apellido paterno es demasiado largo','warning');
        return false;
    }
    else if(!letras.test(appat)){
        swal('Advertencia','Ingresa solo letras en el apelldio paterno.','warning');
        return false;
    }
    else if(apmat.length>20){
        swal('Advertencia','El apellido materno es demasiado largo','warning');
        return false;
    }
    else if(!letras.test(apmat)){
        swal('Advertencia','Ingresa solo letras en el apellido materno.','warning');
        return false;
    }
    else if(calle.length>30){
        swal('Advertencia','La calle es demasiado larga','warning');
        return false;
    }
    else if(!calleChar.test(calle)){
        swal('Advertencia','Ingresa la calle con los caracteres permitidos (Letras/Numeros)','warning');
        return false;
    }
    else if(colonia.length>30){
        swal('Advertencia','La colonia es demasiado larga','warning');
        return false;
    }
    else if(!calleChar.test(colonia)){
        swal('Advertencia','Ingresa la colonia con los caracteres permitidos (Letras/Numeros)','warning');
        return false;
    }
    else if(alcaldia.length>30){
        swal('Advertencia','La alcaldia es demasiado larga','warning');
        return false;
    }
    else if(!calleChar.test(alcaldia)){
        swal('Advertencia','Ingresa la alcaldia con los caracteres permitidos (Letras/Numeros)','warning');
        return false;
    }
    else if(rfc.length>10){
        swal('Advertencia','El RFC es demasiado largo','warning');
        return false;
    }
    else if(!calleChar.test(rfc)){
        swal('Advertencia','Ingresa solo caracteres válidos en el RFC.','warning');
        return false;
    }
    else if(nss.length>10){
        swal('Advertencia','El RFC es demasiado largo','warning');
        return false;
    }
    else if(!numeros.test(nss)){
        swal('Advertencia','Ingresa solo números en el NSS.','warning');
        return false;
    }
    else if(telefono.length>10){
        swal('Advertencia','El telefono es demasiado largo','warning');
        return false;
    }
    else if(!numeros.test(telefono)){
        swal('Advertencia','Ingresa solo números en el telefono.','warning');
        return false;
    }
    else if(matricula.length>15){
        swal('Advertencia','La matrícula es demasiada larga','warning');
        return false;
    }
    else if(!calleChar.test(matricula)){
        swal('Advertencia','Ingresa el formato correcto de la matrícula.','warning');
        return false;
    }
    else if (email.length>50){
        swal('Advertencia','El correo electónico es muy largo.','warning');
        return false;
    }
    else if(!correoElec.test(email)){
        swal('Advertencia','El correo no es un formato válido, prueba insertar otro.','warning');
        return false;
    }
    else if (password.length>20){
        swal('Advertencia','La contraseña es muy larga','warning');
        return false;
    }
}