
-- CREATE DATABASE Manual;  
---USE Manual
---Perfil---
CREATE TABLE Perfil (
	ID bigint identity(1,123) primary key,
	USUARIO varchar(Max),
	CONTRASEÑA varchar(Max),
	NOMBRE varchar(Max), 
	CORREO varchar(Max),
	Rol varchar(60),

);

CREATE TABLE Apuntes (
	ID_PDF bigint identity(1,123) primary key,
	ID bigint,
	NOMBRE varchar(100),
	PDF varchar(MAX),
	APRUBE tinyint,
	Revised tinyint,
	fecha datetime not null default(current_timestamp),

	FOREIGN KEY(ID) REFERENCES Perfil ON DELETE CASCADE,

);

CREATE TABLE Lista (
	ID_LISTA bigint identity(1,123) primary key,
	ID bigint,
	NOMBRE varchar(100),
	FOREIGN KEY(ID) REFERENCES Perfil ON DELETE CASCADE,

);

CREATE TABLE ListaContieneApuntes (
	ID_LISTA bigint,
	ID_PDF bigint,
	fecha datetime not null default(current_timestamp),
	FOREIGN KEY(ID_LISTA) REFERENCES Lista,
	FOREIGN KEY(ID_PDF) REFERENCES Apuntes ON DELETE CASCADE,
);

CREATE TABLE MeGusta(
	ID bigint,
	ID_PDF bigint,
	FOREIGN KEY(ID) REFERENCES Perfil,
	fecha datetime not null default(current_timestamp),
	FOREIGN KEY(ID_PDF) REFERENCES Apuntes  ON DELETE CASCADE
);

CREATE TABLE Historial(
	ID bigint,
	ID_PDF bigint,
	fecha datetime not null default(current_timestamp),
	FOREIGN KEY(ID) REFERENCES Perfil,
	FOREIGN KEY(ID_PDF) REFERENCES Apuntes  ON DELETE CASCADE
);




SELECT L.ID_LISTA, l.NOMBRE, IIF(la.id_lista is null, '', 'checked')  c
	FROM Lista L    join ListaContieneApuntes la on l.ID_LISTA = la.ID_LISTA  and la.ID_PDF = 124
	WHERE L.ID = 1477 ;

SELECT L.ID_LISTA, l.NOMBRE, IIF(la.id_lista is null, 'false', 'true')  c
	FROM Lista L left outer join ListaContieneApuntes la on l.ID_LISTA = la.ID_LISTA  and la.ID_PDF = 124
	WHERE L.ID = 1477 ;





---Listas---
---Historial---
---Apuntes---
---Seguidores---


/*
DROP TABLE Historial;
DROP TABLE MeGusta;
Drop table ListaContieneApuntes
DROP TABLE Lista
DROP TABLE Apuntes;

*/

Select * from Perfil

INSERT INTO Perfil (USUARIO,CONTRASEÑA,NOMBRE,CORREO) VALUES ('admin','0000','H','hola@gmail.com');


DELETE FROM [Manual].[dbo].[Perfil] WHERE ID = 247