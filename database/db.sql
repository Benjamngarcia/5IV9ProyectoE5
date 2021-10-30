CREATE DATABASE CatarinaPr;

USE CatarinaPr;

CREATE TABLE alumno(
    id_alum INT(4) NOT NULL AUTO_INCREMENT,
    nom_alum VARCHAR(30) NOT NULL,
    appat_alum VARCHAR(30) NOT NULL,
    apmat_alum VARCHAR(30) NOT NULL,
    correo_alum VARCHAR(30) NOT NULL,
    cumple_alum DATE NOT NULL,
    pass_alum VARCHAR(16) NOT NULL,
    fecha_ins DATE NOT NULL,
    matricula_alum VARCHAR(11) NOT NULL,
    telefono_alum INT(11) NOT NULL,
    grupo_alum VARCHAR(5) NOT NULL,
    PRIMARY KEY(id_alum)
);

CREATE TABLE encuesta(
    id_enc INT(4) AUTO_INCREMENT,
    id_alum INT(4),
    fecha_enc TIMESTAMP NOT NULL,
    resultado_enc BOOLEAN NOT NULL,
    PRIMARY KEY (id_enc),
    FOREIGN KEY (id_alum) REFERENCES alumno(id_alum) ON DELETE CASCADE
);

CREATE TABLE calle(
    id_calle INT(4) NOT NULL AUTO_INCREMENT,
    calle VARCHAR(30) NOT NULL,
    PRIMARY KEY (id_calle)
);

CREATE TABLE colonia(
    id_colonia INT(4) NOT NULL AUTO_INCREMENT,
    colonia VARCHAR(30) NOT NULL,
    PRIMARY KEY (id_colonia)
);

CREATE TABLE codigopostal(
    id_codigop INT(4) NOT NULL AUTO_INCREMENT,
    codigop VARCHAR(30) NOT NULL,
    PRIMARY KEY (id_codigop)
);

CREATE TABLE alcaldia(
    id_alcaldia INT(4) NOT NULL AUTO_INCREMENT,
    alcaldia VARCHAR(30) NOT NULL,
    PRIMARY KEY (id_alcaldia)
);

CREATE TABLE direccion(
    id_direccion INT(4) NOT NULL AUTO_INCREMENT,
    id_calle INT(4) NOT NULL,
    id_colonia INT(4) NOT NULL,
    id_codigop INT(4) NOT NULL,
    id_alcaldia INT(4) NOT NULL,
    PRIMARY KEY(id_direccion),
    FOREIGN KEY (id_calle) REFERENCES calle(id_calle) ON DELETE CASCADE,
    FOREIGN KEY (id_colonia) REFERENCES colonia(id_colonia) ON DELETE CASCADE,
    FOREIGN KEY (id_codigop) REFERENCES codigopostal(id_codigop) ON DELETE CASCADE,
    FOREIGN KEY (id_alcaldia) REFERENCES alcaldia(id_alcaldia) ON DELETE CASCADE
);

CREATE TABLE tutor(
    id_tutor INT(4) NOT NULL AUTO_INCREMENT,
    id_alum INT(4) NOT NULL,
    id_direccion INT(4),
    nom_tutor VARCHAR(30) NOT NULL,
    appat_tutor VARCHAR(30) NOT NULL,
    apmat_tutor VARCHAR(30) NOT NULL,
    parentezco VARCHAR(20) NOT NULL,
    PRIMARY KEY(id_tutor),
    FOREIGN KEY (id_alum) REFERENCES alumno(id_alum) ON DELETE CASCADE,
    FOREIGN KEY (id_direccion) REFERENCES direccion(id_direccion) ON DELETE CASCADE
);

CREATE TABLE profesor(
    id_prof INT(4) NOT NULL AUTO_INCREMENT,
    id_direccion INT(4),
    nom_prof VARCHAR(30) NOT NULL,
    appat_prof VARCHAR(30) NOT NULL,
    apmat_prof VARCHAR(30) NOT NULL,
    correo_prof VARCHAR(30) NOT NULL,
    pass_prof VARCHAR(16) NOT NULL,
    telefono_prof INT(11),
    rfc_prof VARCHAR(16),  
    nss_prof INT(12),
    PRIMARY KEY(id_prof),
    FOREIGN KEY (id_direccion) REFERENCES direccion(id_direccion) ON DELETE CASCADE
);

CREATE TABLE director(
    id_direc INT(4) NOT NULL AUTO_INCREMENT,
    id_direccion INT(4),
    nom_direc VARCHAR(30) NOT NULL,
    appat_direc VARCHAR(30) NOT NULL,
    apmat_direc VARCHAR(30) NOT NULL,
    correo_direc VARCHAR(30) NOT NULL,
    pass_direc VARCHAR(16) NOT NULL,
    telefono_direc INT(11),
    rfc_direc VARCHAR(16),  
    nss_direc INT(16),
    PRIMARY KEY(id_direc),
    FOREIGN KEY (id_direccion) REFERENCES direccion(id_direccion) ON DELETE CASCADE
);

CREATE TABLE admini(
    id_admin INT(4) NOT NULL AUTO_INCREMENT,
    nom_admin VARCHAR(30) NOT NULL,
    appat_admin VARCHAR(30) NOT NULL,
    apmat_admin VARCHAR(30) NOT NULL,
    correo_admin VARCHAR(30) NOT NULL,
    pass_admin VARCHAR(16) NOT NULL,
    PRIMARY KEY(id_admin)
);

INSERT alumno VALUES ("1","Alumno","Prueba","Uno","alumno1@gmail.com","2003-03-20","12345a","2021-10-30", "APU2910", "552722470","2");

--ESTO NO LO HE INSERTADO
INSERT tutor VALUES("1","1","1","Tutor", "Prueba", "Uno", "Padre");
INSERT direccion VALUES ("1","1","1","1","1");
INSERT calle VALUES ("1","CallePrueba");
INSERT colonia VALUES ("1","ColoniaPrueba");
INSERT codigopostal VALUES ("1","CodigopPrueba");
INSERT alcaldia VALUES ("1","AlcaldiaPrueba");