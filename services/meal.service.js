const Meal = require('../models/meal.model');
const CustomError = require('../utils/errors/customError');
// class for handling the meal services
class MealService {
    // get all meals
    static async getAllMeals() {
        try {
            const meals = await Meal.findAll();
            // group the meals by category
            const groupedMeals = meals.reduce((acc, meal) => {
                if (!acc[meal.category]) {
                    acc[meal.category] = [];
                }
                acc[meal.category].push(meal);
                return acc;
            }, {});
            return groupedMeals;
        } catch (error) {
            throw error;
        }
    }

    // get meal by id
    static async getMealById(id) {
        try {
            return await Meal.findByPk(id);
        } catch (error) {
            throw error;
        }
    }

    // create a meal
    static async createMeal(newMeal) {
        try {
            return await Meal.create(newMeal);
        } catch (error) {
            throw error;
        }
    }

    // update a meal
    static async updateMeal(id, updateMeal) {
        try {
            const meal = await Meal.findByPk(id);
            if (!meal) {
                throw new CustomError(`Meal not found`, 404);
            }
            await meal.update(updateMeal);
            return meal;
        } catch (error) {
            throw error;
        }
    }

    // delete a meal
    static async deleteMeal(id) {
        try {
            const meal = await Meal.findByPk(id);
            if (!meal) {
                throw new CustomError(`Meal not found`, 404);
            }
            await meal.destroy();
            return meal;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = MealService;