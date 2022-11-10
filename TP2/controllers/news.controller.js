// Data Base
const news = [
    {
        "date": "10 Agosto, 2022",
        "title": "SORTEO POR EL DÍA DEL NIÑO",
        "description":"Estaremos sorteando 90 vuelos junto a: @anallenweb, @RadioLiderFm94.1Mhz. @CarreteraMedios, @eldiariodeallen, facebook.com/fmgabrielag, facebook.com/fmlibra Cada medio dispondrá de 15 vuelos para sortear 🍀¡Suerte para todos!",
        "img":"/assets/news/dia-del-niño.jpg"
    },
    {
        "date": "23 Marzo, 2022",
        "title": "¡Show Aereo!",
        "description":"¡ESTE 23 Y 24 DE ABRIL #ALLEN VUELA! 🛩️ 🔵 Show de Acrobacia Aérea 🔵 Paracaidismo 🔵 Globo Aerostático 🔵 Vuelos de Bautismo 🔵 Parque Gastronómico ⏰ Te esperamos este 9 y 10 de Abril de 9 a 20:30hs!",
        "img":"/assets/news/festival.jpg"
    },
    {
        "date": "05 Febrero, 2022",
        "title": "San Valentin",
        "description":"En el mes del #amor y la amistad vení a volar a Allen ! ❤️🛩️⁣ Celebrá con tu pareja y amigos viviendo una experiencia única!!! Reservá tu paseo aéreo por whatsapp al 2984 76-0545!",
        "img":"/assets/news/san-valentin.jpg"
    },
    {
        "date": "29 Mayo, 2021",
        "title": "¡DIA DEL PADRE!",
        "description":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet sunt quis ullam placeat! Adipisci quia deserunt, eos assumenda sit labore fugiat optio voluptate maiores ipsa maxime commodi, aliquid doloribus fugit?",
        "img":"/assets/news/dia-del-niño.jpg"
    },
    {
        "date": "15 Marzo, 2021",
        "title": "¡Allen Vuela 2021!",
        "description":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet sunt quis ullam placeat! Adipisci quia deserunt, eos assumenda sit labore fugiat optio voluptate maiores ipsa maxime commodi, aliquid doloribus fugit?",
        "img":"/assets/news/festival.jpg"
    },
    {
        "date": "10 Agosto, 2021",
        "title": "¡MEGA SORTEO POR EL DÍA DEL NIÑO!",
        "description":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet sunt quis ullam placeat! Adipisci quia deserunt, eos assumenda sit labore fugiat optio voluptate maiores ipsa maxime commodi, aliquid doloribus fugit?",
        "img":"/assets/news/dia-del-niño.jpg"
    }
]

// Get news
export const getNews = (req, res) => {
    let {x0, n} = req.query;
    x0 = parseInt(x0);
    n = parseInt(n);
    let result = news.slice(x0, (x0+n));
    res.json(result);
}

// Create news
export const createNew = (req, res) => {
    res.send('POST crear noticia')
};

// Update news
export const updateNew = (req, res) => {
    const { id, name, description } = req.body;
    res.send(`Name ${id} ${name}, desc ${description}`);
};

// Delete news
export const deleteNew = (req, res) => {
    const { id } = req.params;
    res.send(`Delete record with id ${id}`);
};
