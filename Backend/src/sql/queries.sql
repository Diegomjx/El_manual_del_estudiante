
-- CREATE DATABASE Manual;  
---USE Manual
---Perfil---
CREATE TABLE Perfil (
	ID bigint identity(1,123) primary key,
	USUARIO varchar(Max),
	CONTRASEÑA varchar(Max),
	NOMBRE varchar(Max), 
	CORREO varchar(Max),

);

CREATE TABLE Apuntes (
	ID_PDF bigint identity(1,123) primary key,
	ID bigint,
	NOMBRE varchar(100),
	PDF varchar(MAX),
	FOREIGN KEY(ID) REFERENCES Perfil,

);

---Listas---
---Historial---
---Apuntes---
---Seguidores---


/*
DROP TABLE Perfil;  
DROP TABLE Apuntes;

*/

Select * from Perfil

INSERT INTO Perfil (USUARIO,CONTRASEÑA,NOMBRE,CORREO) VALUES ('admin','0000','H','hola@gmail.com');


DELETE FROM [Manual].[dbo].[Perfil] WHERE ID = 247