const MealService = require('../services/meal.service');
const CustomError = require('../utils/errors/customError');

// class for handling the meal controller
class MealController {
    // get all meals
    static async getAllMeals(req, res) {
        try {
            const meals = await MealService.getAllMeals();
            return res.status(200).json(meals);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    // get meal by id
    static async getMealById(req, res) {
        const { id } = req.params;
        try {
            const meal = await MealService.getMealById(id);
            if (!meal) {
                return res.status(404).json({ error: 'Meal not found' });
            }
            return res.status(200).json(meal);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    // create a meal
    static async createMeal(req, res) {
        const newMeal = req.body;
        try {
            const meal = await MealService.createMeal(newMeal);
            return res.status(201).json(meal);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    // update a meal
    static async updateMeal(req, res) {
        const { id } = req.params;
        const updateMeal = req.body;
        try {
            const meal = await MealService.updateMeal(id, updateMeal);
            return res.status(200).json(meal);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    // delete a meal
    static async deleteMeal(req, res) {
        const { id } = req.params;
        try {
            const meal = await MealService.deleteMeal(id);
            return res.status(200).json(meal);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = MealController;