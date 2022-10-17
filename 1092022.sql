select * from Lista
select * from Perfil
select * from ListaContieneApuntes
select * from Apuntes

insert into ListaContieneApuntes VALUES (124,247)

Select L.ID_LISTA,L.ID,L.NOMBRE, LCA.ID_PDF from Lista L , ListaContieneApuntes LCA where L.ID_LISTA = LCA.ID_LISTA and LCA.ID_PDF = 124 and L.ID_LISTA = 1;






SELECT CASE WHEN EXISTS (
    SELECT *
    FROM Lista L , ListaContieneApuntes LCA
    WHERE L.ID = 1477 and L.ID_LISTA = LCA.ID_LISTA and LCA.ID_PDF = 124 
)
THEN CAST(1 AS BIT)
ELSE CAST(0 AS BIT) END AS bool  

Select L.ID_LISTA,L.ID,L.NOMBRE, LCA.ID_PDF from Lista L , ListaContieneApuntes LCA where L.ID_LISTA = LCA.ID_LISTA and LCA.ID_PDF = 124 and L.ID_LISTA = 1;





SELECT L.ID_LISTA, l.NOMBRE, IIF(la.id_lista is null, '', 'checked')  c
	FROM Lista L    join ListaContieneApuntes la on l.ID_LISTA = la.ID_LISTA  and la.ID_PDF = 124
	WHERE L.ID = 1477 ;

SELECT L.ID_LISTA, l.NOMBRE, IIF(la.id_lista is null, 'false', 'true')  c
	FROM Lista L left outer join ListaContieneApuntes la on l.ID_LISTA = la.ID_LISTA  and la.ID_PDF = 124
	WHERE L.ID = 1477 ;