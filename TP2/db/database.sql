create database if not exists aerocluballen;


use aerocluballen;


create table news(
    id INT(12) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    date DATE,
    title VARCHAR(255),
    description VARCHAR(255),
    img VARCHAR(255)
);
INSERT INTO news VALUES
    (NULL, '2022-08-10','SORTEO POR EL DÍA DEL NIÑO','Estaremos sorteando 90 vuelos junto a: @anallenweb, @RadioLiderFm94.1Mhz. @CarreteraMedios, @eldiariodeallen, facebook.com/fmgabrielag, facebook.com/fmlibra Cada medio dispondrá de 15 vuelos para sortear 🍀¡Suerte para todos!','/assets/news/dia-del-niño.jpg'),
    (NULL, '2022-03-23','¡Show Aereo!','¡ESTE 23 Y 24 DE ABRIL #ALLEN VUELA! 🛩️ 🔵 Show de Acrobacia Aérea 🔵 Paracaidismo 🔵 Globo Aerostático 🔵 Vuelos de Bautismo 🔵 Parque Gastronómico ⏰ Te esperamos este 9 y 10 de Abril de 9 a 20:30hs!','/assets/news/festival.jpg'),
    (NULL, '2022-02-05','San Valentin','En el mes del #amor y la amistad vení a volar a Allen ! ❤️🛩️⁣ Celebrá con tu pareja y amigos viviendo una experiencia única!!! Reservá tu paseo aéreo por whatsapp al 2984 76-0545!','/assets/news/san-valentin.jpg'),
    (NULL, '2021-05-29','¡DIA DEL PADRE!','Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet sunt quis ullam placeat! Adipisci quia deserunt, eos assumenda sit labore fugiat optio voluptate maiores ipsa maxime commodi, aliquid doloribus fugit?','/assets/news/dia-del-niño.jpg'),
    (NULL, '2021-03-15','¡Allen Vuela 2021!','Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet sunt quis ullam placeat! Adipisci quia deserunt, eos assumenda sit labore fugiat optio voluptate maiores ipsa maxime commodi, aliquid doloribus fugit?','/assets/news/festival.jpg'),
    (NULL, '2021-08-10','¡MEGA SORTEO POR EL DÍA DEL NIÑO!','Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet sunt quis ullam placeat! Adipisci quia deserunt, eos assumenda sit labore fugiat optio voluptate maiores ipsa maxime commodi, aliquid doloribus fugit?','/assets/news/dia-del-niño.jpg');


create table fleet(
    plate VARCHAR(255) NOT NULL PRIMARY KEY,
    name VARCHAR(255),
    engine VARCHAR(255),
    brand VARCHAR(255),
    model VARCHAR(255),
    speed INT(12),
    consumption INT(12),
    img VARCHAR(255)
)
INSERT INTO fleet VALUES
    ('LV-FVA','Petrel','Rotex 912i','Petrel','P912','60','14','/assets/fleet/Petrel/petrel-3.jpg'),
    ('LV-IDE','C150','Continental O-200-A','Cessna','C150','80','22','/assets/fleet/C150/c150-2.jpeg'),
    ('LV-ARN','Archer','Lycoming Model O-360-A4A','Piper','Archer','120','32','/assets/fleet/Archer/archer-2.jpeg'),
    ('LV-CXF','C172','LV-CXF','Continental O-300','Cessna','C172','120','22','/assets/fleet/C172/c172-2.jpeg'),
    ('LV-S037','P92','LV-S037','Rotax 912 ULS','Tecnam','P92','80','16','/assets/fleet/P92/p92-1.jpg'),
    ('LV-HZS','PA22','Lycoming O-235-C1B','Piper','PA-22','60','21','/assets/fleet/PA22/pa22-2.jpg');


CREATE TABLE courses (
    class VARCHAR(20) NOT NULL PRIMARY KEY,
    age INT(12),
    duration VARCHAR(255),
    hours INT(12) ,
    studies VARCHAR(255),
    psychophysical VARCHAR(255),
    licenses VARCHAR(255)
);
INSERT INTO courses VALUES
    ('ppa','16 y 9 meses','3 Meses','40','Primario Completo','Clase II','Ninguna'),
    ('comercial','20 años','Indefinida','200','Secundario Completo','Clase III','PPA'),
    ('instructor','21 años','Indefinida','500','Secundario Completo','Clase III','Comercial'),
    ('primera','24 años','Indefinida','900','Secundario Completo','Clase III','Comercial');


CREATE TABLE trajectory (
    type VARCHAR(255) NOT NULL PRIMARY KEY,
    data VARCHAR(255),
    icon VARCHAR(255)
)
INSERT INTO trajectory VALUES 
    ('alumnos','82 Alumnos Activos','./assets/icons/trajectory/alumnos.png'),
    ('socios','151 Socios Activos','./assets/icons/trajectory/socios.png'),
    ('aeronaves','6 Aeronaves','./assets/icons/trajectory/aeronaves.png'),
    ('annos','Mas de 80 años','./assets/icons/trajectory/antiguedad.png')