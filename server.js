const express = require('express');
const path = require('path');

const app = express();

// Imposta la cartella in cui si trova il progetto Angular compilato (dist)
const distPath = path.join(__dirname, 'dist', 'around-front-end');

// Imposta i middleware per servire i file statici dalla cartella 'dist'
app.use(express.static(distPath));

// Gestisce tutte le altre richieste e invia l'index.html del tuo progetto Angular
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Avvia il server su una determinata porta
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server avviato sulla porta ${port}`);
});
