import { superheroService } from "../services/superhero.js";

async function getHeroes(req, res) {
  const page = parseInt(req.query.page) || 1; // Номер страницы
  const pageSize = 5; 

  const heroes = await superheroService.getFivePerLoad(page, pageSize);

  res.send(heroes);
}

async function getByName(req, res) {
  const { nickname } = req.params;

  const hero = await superheroService.getByName(nickname);

  res.send(hero);
}

async function addHero(req, res) {
  const heroData = req.body;
  const images = req.files.map(file => file.path);

  const preparedHero = {
    ...heroData,
    images,
  }

  const newHero = await superheroService.add(preparedHero);
  
  res.send(newHero);
}

async function updateHero(req, res) {
  const { nickname } = req.params;
  const newImages = req.files.map(file => file.path);
  const heroDataToUpdate = req.body;

  const data = {
    ...heroDataToUpdate,
    images: heroDataToUpdate.images ? [...heroDataToUpdate.images, ...newImages] : [...newImages]
  };

  const updatedHero = await superheroService.update({ nickname }, data);
  
  res.send(updatedHero);
}

async function removeHero(req, res) {
  const { nickname } = req.params;

  const removedHero = await superheroService.remove(nickname);

  res.send(removedHero);
}

export const superheroController = {
  getHeroes,
  addHero,
  getByName,
  updateHero,
  removeHero,
}