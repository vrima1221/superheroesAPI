import { Hero } from "../models/Superhero.js";

async function getAll() {
  return Hero.find();
}

async function getFivePerLoad(page, pageSize) {
  return Hero
  .find()
  .skip((page - 1) * pageSize)
  .limit(pageSize)
}

async function getByName(nickname) {
  return Hero.findOne({ nickname });
}

async function add(hero) {
  const newHero = new Hero({
    ...hero
  });

  await newHero.save();
  return newHero;
}

async function update(nickname, newData) {
  const updatedHero = await Hero.findOneAndUpdate(nickname, newData, { new: true });

  await updatedHero.save();
  return updatedHero;
}

async function remove(nickname) {
  const removedHero = await Hero.findOneAndRemove({ nickname });

  return removedHero;
}

export const superheroService = {
  getAll,
  getByName,
  add,
  remove,
  update,
  getFivePerLoad,
}