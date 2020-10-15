import express from 'express';
import path from 'path';
const app = express();
const __dirname = path.resolve();

const port = process.env.PORT || 3002;

app.use('/', express.static(path.join(__dirname, 'build')));

app.listen(port, () => console.log('Listening on Port', port));
