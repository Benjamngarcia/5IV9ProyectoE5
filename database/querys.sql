--INSERT ADMIN
INSERT INTO admini VALUES ("1","Benjamín","Pérez","García","bperezg1800@alumno.ipn.mx","$2a$08$7nFpbhVJ4Z49c3Nzo/EC5.Yplq5nNMIgqxO4ok.m0kUsOyZLKMFji");

--INSERT CON DIRECCION
INSERT INTO direccion VALUES ("1","x","Manuel Othon","Obrera","06800","Cuauhtémoc") 
--PETICION DE ULTIMA ENCUESTA
SELECT MAX(id_enc) FROM encuesta INNER JOIN alumno ON encuesta.id_alum = alumno.id_alum WHERE matricula_alum = "JPH2017";

SELECT * FROM alumno a
INNER JOIN (SELECT *, MAX(id_enc)
FROM encuesta) e
ON a.id_alum = e.id_alum;