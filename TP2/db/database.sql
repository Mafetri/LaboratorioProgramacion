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