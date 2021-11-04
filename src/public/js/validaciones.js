function SoloLetras(e){
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
function SoloNumeros(e){
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
function validarContacto(){
    let nombres, email, mensaje, correoElec, letras;
    nombres = document.getElementById('nombres').value;
    email = document.getElementById('email').value;
    mensaje = document.getElementById('mensaje').value;

    correoElec = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    letras = /[a-zA-Z]/;

    if(nombres === "" || email ==="" || mensaje ==="" || nombres === " " || email ===" " || mensaje ===" " ){
        swal('Advertencia','Para enviar el mensaje es necesario que todos los campos estén llenos','error');
        return false;
    }
    else if(nombres.length>30){
        swal('Advertencia','El nombre es demasiado largo','warning');
        return false;
    }
    else if(!letras.test(nombres)){
        swal('Advertencia','Ingresa unicamente letras en el nombre.','warning');
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

function validarLoginAlum(){
    let matricula, email, password, correoElec, letras, passwordChar;
    matricula = document.getElementById('matricula').value;
    // email = document.getElementById('email').value;
    password = document.getElementById('password').value;

    // correoElec = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    letras = /[a-zA-Z0-9]/;
    passwordChar = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/; //Mínimo ocho caracteres, al menos una letra mayúscula, una letra minúscula y un número

    if(matricula === "" || email ==="" || password ==="" || matricula === " " || email ===" " || password ===" " ){
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
    // else if (email.length>50){
    //     swal('Advertencia','El correo electónico es muy largo.','warning');
    //     return false;
    // }
    // else if(!correoElec.test(email)){
    //     swal('Advertencia','El correo no es un formato válido, prueba insertar otro.','warning');
    //     return false;
    // }
    else if (password.length>20){
        swal('Advertencia','La contraseña es muy larga','warning');
        return false;
    }
}

function validarTutor(){
    let nombre, appat, apmat, calle, colonia, alcaldia, parentezco, rfc, nss, telefono, matricula, email, password, 
    correoElec, letras, numeros, passwordChar, calleChar;
    nombre = document.getElementById('nombre').value;
    appat = document.getElementById('appat').value; 
    apmat = document.getElementById('apmat').value; 
    calle = document.getElementById('calle').value;
    colonia = document.getElementById('colonia').value;
    alcaldia = document.getElementById('alcaldia').value;
    parentezco = document.getElementById('parentezco').value;
    // rfc = document.getElementById('rfc').value;
    // nss = document.getElementById('nss').value;
    // telefono = document.getElementById('telefono').value;
    // matricula = document.getElementById('matricula').value;
    // email = document.getElementById('email').value;
    // password = document.getElementById('contraseña').value;

    letras = /[a-zA-Z]/;
    passwordChar = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/; //Mínimo ocho caracteres, al menos una letra mayúscula, una letra minúscula y un número
    calleChar = /[a-zA-z0-9]/;

    if(nombre==""|| appat===""|| apmat==""|| calle===""|| colonia===""|| alcaldia===""|| parentezco===""|| rfc===""|| nss===""|| telefono===""|| matricula === "" || email ==="" || password ==="" 
    || nombre==" "|| appat===" "|| apmat==" "|| calle===" "|| colonia===" "|| alcaldia===" "|| parentezco===" "|| rfc===" "|| nss===" "|| telefono===" "|| matricula === " " || email ===" " || password ===" " ){
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
    else if(parentezco.length>10){
        swal('Advertencia','El parentezco es demasiado largo','warning');
        return false;
    }
    else if(!letras.test(parentezco)){
        swal('Advertencia','Ingresa solo letras en el parentezco.','warning');
        return false;
    }
    // else if(rfc.length>10){
    //     swal('Advertencia','El RFC es demasiado largo','warning');
    //     return false;
    // }
    // else if(!calleChar.test(rfc)){
    //     swal('Advertencia','Ingresa solo caracteres válidos en el RFC.','warning');
    //     return false;
    // }
    // else if(nss.length>10){
    //     swal('Advertencia','El RFC es demasiado largo','warning');
    //     return false;
    // }
    // else if(!numeros.test(nss)){
    //     swal('Advertencia','Ingresa solo números en el NSS.','warning');
    //     return false;
    // }
    // else if(telefono.length>10){
    //     swal('Advertencia','El telefono es demasiado largo','warning');
    //     return false;
    // }
    // else if(!numeros.test(telefono)){
    //     swal('Advertencia','Ingresa solo números en el telefono.','warning');
    //     return false;
    // }
    // else if(matricula.length>15){
    //     swal('Advertencia','La matrícula es demasiada larga','warning');
    //     return false;
    // }
    // else if(!calleChar.test(matricula)){
    //     swal('Advertencia','Ingresa el formato correcto de la matrícula.','warning');
    //     return false;
    // }
    // else if (email.length>50){
    //     swal('Advertencia','El correo electónico es muy largo.','warning');
    //     return false;
    // }
    // else if(!correoElec.test(email)){
    //     swal('Advertencia','El correo no es un formato válido, prueba insertar otro.','warning');
    //     return false;
    // }
    // else if (password.length>20){
    //     swal('Advertencia','La contraseña es muy larga','warning');
    //     return false;
    // }
}

function validarUsuario(){
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
    inscripcion = document.getElementById('inscripcion').value;

    correoElec = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    letras = /[a-zA-Z]/;
    numeros = /[0-9]/;
    passwordChar = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/; //Mínimo ocho caracteres, al menos una letra mayúscula, una letra minúscula y un número
    calleChar = /[a-zA-z0-9]/;

    if(nombre==""|| appat===""|| apmat==""|| telefono===""|| matricula === "" || email ==="" || password ==="" || grupo === "" || inscripcion === ""
    || nombre==" "|| appat===" "|| apmat==" "|| telefono===" "|| matricula === " " || email ===" " || password ===" " || grupo === " " || inscripcion === " "){
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
    else if (inscripcion.length>8){
        swal('Advertencia','La inscripcion es muy larga','warning');
        return false;
    }
}

function validarRegistroTeach(){
    let nombre, appat, apmat, calle, colonia, alcaldia, rfc, nss, telefono, email, password, 
    correoElec, letras, numeros, passwordChar, calleChar;
    nombre = document.getElementById('nombre').value;
    appat = document.getElementById('appat').value; 
    apmat = document.getElementById('apmat').value; 
    calle = document.getElementById('calle').value;
    colonia = document.getElementById('colonia').value;
    alcaldia = document.getElementById('alcaldia').value;
    parentezco = document.getElementById('parentezco').value;
    // rfc = document.getElementById('rfc').value;
    // nss = document.getElementById('nss').value;
    // telefono = document.getElementById('telefono').value;
    // email = document.getElementById('email').value;
    // password = document.getElementById('contraseña').value;

    correoElec = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    letras = /[a-zA-Z]/;
    numeros = /[0-9]/;
    passwordChar = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/; //Mínimo ocho caracteres, al menos una letra mayúscula, una letra minúscula y un número
    calleChar = /[a-zA-z0-9]/;

    if(nombre==""|| appat===""|| apmat==""|| calle===""|| colonia===""|| alcaldia===""|| parentezco===""|| rfc===""|| nss===""|| telefono===""|| matricula === "" || email ==="" || password ==="" 
    || nombre==" "|| appat===" "|| apmat==" "|| calle===" "|| colonia===" "|| alcaldia===" "|| parentezco===" "|| rfc===" "|| nss===" "|| telefono===" "|| matricula === " " || email ===" " || password ===" " ){
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
    else if(parentezco.length>10){
        swal('Advertencia','El parentezco es demasiado largo','warning');
        return false;
    }
    else if(!letras.test(parentezco)){
        swal('Advertencia','Ingresa solo letras en el parentezco.','warning');
        return false;
    }
    // else if(rfc.length>10){
    //     swal('Advertencia','El RFC es demasiado largo','warning');
    //     return false;
    // }
    // else if(!calleChar.test(rfc)){
    //     swal('Advertencia','Ingresa solo caracteres válidos en el RFC.','warning');
    //     return false;
    // }
    // else if(nss.length>10){
    //     swal('Advertencia','El RFC es demasiado largo','warning');
    //     return false;
    // }
    // else if(!numeros.test(nss)){
    //     swal('Advertencia','Ingresa solo números en el NSS.','warning');
    //     return false;
    // }
    // else if(telefono.length>10){
    //     swal('Advertencia','El telefono es demasiado largo','warning');
    //     return false;
    // }
    // else if(!numeros.test(telefono)){
    //     swal('Advertencia','Ingresa solo números en el telefono.','warning');
    //     return false;
    // }
    // else if(matricula.length>15){
    //     swal('Advertencia','La matrícula es demasiada larga','warning');
    //     return false;
    // }
    // else if(!calleChar.test(matricula)){
    //     swal('Advertencia','Ingresa el formato correcto de la matrícula.','warning');
    //     return false;
    // }
    // else if (email.length>50){
    //     swal('Advertencia','El correo electónico es muy largo.','warning');
    //     return false;
    // }
    // else if(!correoElec.test(email)){
    //     swal('Advertencia','El correo no es un formato válido, prueba insertar otro.','warning');
    //     return false;
    // }
    // else if (password.length>20){
    //     swal('Advertencia','La contraseña es muy larga','warning');
    //     return false;
    // }
}