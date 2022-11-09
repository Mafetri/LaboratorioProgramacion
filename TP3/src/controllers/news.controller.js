
//Obtener noticias
export const getNews = (req, res) => {
    res.send('GET obtener noticias')
}
//Crear noticia
export const createNew = (req, res) => {
    res.send('POST crear noticia')
};
//Actualizar noticia
export const updateNew = (req, res) => {
    const { id, name, description } = req.body;
    res.send(`Name ${id} ${name}, desc ${description}`);
};
//Eliminar noticia
export const deleteNew = (req, res) => {
    const { id } = req.params;
    res.send(`Delete record with id ${id}`);
};
