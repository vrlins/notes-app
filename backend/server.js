import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';

let Note = null;

const initDb = async () => {
  const databaseName = 'notes-app';
  const uri = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`;

  await mongoose.connect(uri, {
    user: process.env.MONGO_INITDB_ROOT_USERNAME,
    pass: process.env.MONGO_INITDB_ROOT_PASSWORD,
    dbName: databaseName,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

const setupExpress = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use((_req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
  });
};

const setupServer = async () => {
  const PORT = 8080;

  const app = express();

  setupExpress(app);

  app.get('/notes', async (_req, res) => {
    const notes = await Note.find({});
    res.json(notes);
  });

  app.post('/notes', async (req, res) => {
    const note = new Note({ id: uuidv4(), text: req.body.text });
    await note.save();
    res.json(note);
  });

  app.get('/', (_req, res) => {
    res.send('Hello World');
  });

  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening on the port::${PORT}`);
  });
};

const setupDbModels = async () => {
  const noteSchema = new mongoose.Schema({
    id: String,
    text: String,
  });

  Note = mongoose.model('Note', noteSchema);
};

(async () => {
  await initDb();
  await setupDbModels();
  await setupServer();
})();
