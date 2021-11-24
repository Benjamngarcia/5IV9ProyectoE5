CREATE DATABASE CatarinaPr;

USE CatarinaPr;

CREATE TABLE alumno(
    id_alum INT(4) NOT NULL AUTO_INCREMENT,
    nom_alum VARCHAR(30) NOT NULL,
    appat_alum VARCHAR(30) NOT NULL,
    apmat_alum VARCHAR(30) NOT NULL,
    correo_alum VARCHAR(30) NOT NULL,
    cumple_alum DATE NOT NULL,
    pass_alum VARCHAR(100) NOT NULL,
    fecha_ins DATE NOT NULL,
    matricula_alum VARCHAR(11) NOT NULL,
    telefono_alum VARCHAR(15) NOT NULL,
    grupo_alum VARCHAR(5) NOT NULL,
    PRIMARY KEY(id_alum)
);

ALTER TABLE alumno
    MODIFY id_alum INT(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

CREATE TABLE encuesta(
    id_enc INT(4) AUTO_INCREMENT,
    id_alum INT(4),
    fecha_enc TIMESTAMP NOT NULL DEFAULT current_timestamp,
    resultado_enc BOOLEAN NOT NULL,
    PRIMARY KEY (id_enc),
    FOREIGN KEY (id_alum) REFERENCES alumno(id_alum) ON DELETE CASCADE
);

ALTER TABLE encuesta
    MODIFY id_enc INT(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

CREATE TABLE tutor(
    id_tutor INT(4) NOT NULL AUTO_INCREMENT,
    id_alum INT(4) NOT NULL,
    nom_tutor VARCHAR(30) NOT NULL,
    appat_tutor VARCHAR(30) NOT NULL,
    apmat_tutor VARCHAR(30) NOT NULL,
    parentezco VARCHAR(20) NOT NULL,
    PRIMARY KEY(id_tutor),
    FOREIGN KEY (id_alum) REFERENCES alumno(id_alum) ON DELETE CASCADE ON UPDATE CASCADE
);

ALTER TABLE tutor
    MODIFY id_tutor INT(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

CREATE TABLE direccionAlum(
    id_direccion INT(4) NOT NULL AUTO_INCREMENT,
    id_alum INT(4),
    calle VARCHAR(30) NOT NULL,
    colonia VARCHAR(30) NOT NULL,
    codigop VARCHAR(30) NOT NULL,
    alcaldia VARCHAR(30) NOT NULL,
    PRIMARY KEY(id_direccion),
    FOREIGN KEY (id_alum) REFERENCES alumno(id_alum) ON DELETE CASCADE ON UPDATE CASCADE
);

ALTER TABLE direccionAlum
    MODIFY id_direccion INT(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

CREATE TABLE profesor(
    id_prof INT(4) NOT NULL AUTO_INCREMENT,
    nom_prof VARCHAR(30) NOT NULL,
    appat_prof VARCHAR(30) NOT NULL,
    apmat_prof VARCHAR(30) NOT NULL,
    correo_prof VARCHAR(30) NOT NULL,
    pass_prof VARCHAR(100) NOT NULL,
    telefono_prof VARCHAR(15),
    rfc_prof VARCHAR(16),  
    nss_prof INT(12),
    calle_prof VARCHAR(30) NOT NULL,
    colonia_prof VARCHAR(30) NOT NULL,
    codigop_prof VARCHAR(30) NOT NULL,
    alcaldia_prof VARCHAR(30) NOT NULL,
    PRIMARY KEY(id_prof)
);

ALTER TABLE profesor
    MODIFY id_prof INT(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

CREATE TABLE director(
    id_direc INT(4) NOT NULL AUTO_INCREMENT,
    nom_direc VARCHAR(30) NOT NULL,
    appat_direc VARCHAR(30) NOT NULL,
    apmat_direc VARCHAR(30) NOT NULL,
    correo_direc VARCHAR(30) NOT NULL,
    pass_direc VARCHAR(100) NOT NULL,
    telefono_direc VARCHAR(15),
    rfc_direc VARCHAR(16),  
    nss_direc INT(16),
    calle_direc VARCHAR(30) NOT NULL,
    colonia_direc VARCHAR(30) NOT NULL,
    codigop_direc VARCHAR(30) NOT NULL,
    alcaldia_direc VARCHAR(30) NOT NULL,
    PRIMARY KEY(id_direc)
);

ALTER TABLE director
    MODIFY id_direc INT(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

CREATE TABLE admini(
    id_admin INT(4) NOT NULL AUTO_INCREMENT,
    nom_admin VARCHAR(30) NOT NULL,
    appat_admin VARCHAR(30) NOT NULL,
    apmat_admin VARCHAR(30) NOT NULL,
    correo_admin VARCHAR(30) NOT NULL,
    pass_admin VARCHAR(100) NOT NULL,
    PRIMARY KEY(id_admin)
);

INSERT INTO admini VALUES ("1","Benjamín","Pérez","García","bperezg1800@alumno.ipn.mx","$2a$08$7nFpbhVJ4Z49c3Nzo/EC5.Yplq5nNMIgqxO4ok.m0kUsOyZLKMFji");