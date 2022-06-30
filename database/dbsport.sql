CREATE DATABASE database_sports;
USE  database_sports;

-- Tabla Usuarios
CREATE TABLE user(
    id INT(11) NOT NULL,
    nombre VARCHAR(30) NOT NULL,
    apellido VARCHAR(30) NOT NULL,
    correo  VARCHAR(25) NOT NULL,
    clave  VARCHAR(30) NOT NULL,
    clavef  VARCHAR(30) NOT NULL,
    edad INT(2) NOT NULL,
    peso INT(3) NOT NULL,
    altura INT(3) NOT NULL,
    telefono VARCHAR(10) NOT NULL,
    rol VARCHAR(10) NOT NULL
    pregunta VARCHAR(30) NOT NULL,
    respuesta VARCHAR(30) NOT NULL
);



ALTER TABLE user
    ADD PRIMARY KEY(id);

    ALTER TABLE user
     MODIFY respuesta VARCHAR(30) NULL;
    MODIFY pregunta VARCHAR(30) NULL;
    MODIFY respuesta VARCHAR(30) NULL;
ALTER TABLE user
    
    ADD respuesta VARCHAR(30) NOT NULL;
ALTER TABLE user
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT;

-- Tabla Pruebas
CREATE TABLE prueba(
    idp INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombrep  VARCHAR(20) NOT NULL,
    fechai date NULL,
    fechaf  date NULL,
    descrp VARCHAR(50) NOT NULL,
    tipodeprueba VARCHAR(20) NOT NULL,
    user_id INT(11) NOT NULL,
    created_at timestamp  NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES user(id)
);
--ALTER TABLE prueba
    --MODIFY anioingres INT(4) NOT NULL ;

ALTER TABLE prueba
    MODIFY idp INT(11) NOT NULL  AUTO_INCREMENT, AUTO_INCREMENT=1;
    MODIFY user_id INT(11) ;
ALTER TABLE prueba
 MODIFY user_id INT(11) ;


DESCRIBE user;
DESCRIBE prueba;

CREATE TABLE resprueba(
    idp INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nomPrueba  VARCHAR(90)NOT NULL,
    vel  INT(3)NOT NULL,
    tiempo  INT(3)NOT NULL,
    vuelta   INT(3)NOT NULL,
    user_id INT(11) NOT NULL,
    created_at timestamp  NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user2 FOREIGN KEY (user_id) REFERENCES user(id)
);

ALTER TABLE resprueba
    ADD resultado  INT(3) NULL DEFAULT '0',
    ADD  recomendaciones VARCHAR(90) NULL DEFAULT 'No ha sido evaluado';

ALTER TABLE resprueba
 modify  user_id int(11 )null;
