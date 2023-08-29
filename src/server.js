import './Styles.css';

const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = 3000;

app.get('/', async (req, res) => {
  try {
    const searchTerm = 'cat'; // Término de búsqueda en Giphy
    const apiKey = 'API_KEY'; // Reemplaza con tu API key de Giphy

    const response = await fetch(`https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${apiKey}`);
    const data = await response.json();

    const gifs = data.data.map(gif => gif.images.fixed_height.url);

    res.send(`
      <h1>Giffy App</h1>
      ${gifs.map(gif => `<img src="${gif}" alt="GIF">`).join('')}
    `);
  } catch (error) {
    console.error(error);
    res.send('Error al obtener los GIFs');
  }
});

app.listen(port, () => {
  console.log(`Servidor Express funcionando en el puerto ${port}`);
});



