const MealController = require('../controllers/meal.controller');

const router = require('express').Router();

// get all meals
router.get('/', MealController.getAllMeals);

// get meal by id
router.get('/:id', MealController.getMealById);

// create a meal
router.post('/', MealController.createMeal);

// update a meal
router.put('/:id', MealController.updateMeal);

// delete a meal
router.delete('/:id', MealController.deleteMeal);

module.exports = router;