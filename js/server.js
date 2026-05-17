"use strict"; 

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import expressWS from 'express-ws';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const app = express();
const port = 8080;

app.use('/', express.static(__dirname));
app.use(express.json());

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
});

app.get('/api/kurse', async (request, response) => {
  fs.readFile('data/kurse.json', (error, data) => {
    if (error) {
        console.error(error);
        return;
    }
    const kurse = JSON.parse(data.toString()).kurse;
    response.status(200).send(kurse);
  });
});