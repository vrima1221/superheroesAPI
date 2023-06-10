import { Router } from 'express';
import { catchError } from '../utils/catchError.js';
import { superheroController } from '../controllers/superhero.js';
import multer from 'multer';
import { fileURLToPath } from 'url';
import path from 'path';

export const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDirectory = './uploads';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

router.get('/superheroes', catchError(superheroController.getHeroes));

router.post('/superheroes', upload.array('images') , catchError(superheroController.addHero));

router.get('/superheroes/:nickname', catchError(superheroController.getByName));

router.patch('/superheroes/:nickname', upload.array('newImages'), catchError(superheroController.updateHero));

router.delete('/superheroes/:nickname', catchError(superheroController.removeHero));

